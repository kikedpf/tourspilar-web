# Modelo de medición cuantitativa — BeLikeTheAlgo

## Estado v2

Este documento conserva las fórmulas/componentes cuantitativos base. La orquestación canónica desde ahora está definida en:

- `docs/measurement_architecture_v2.md`
- `docs/weekly_trade_event_schema_v2.md`

Reglas obligatorias v2:

- separar **reproducción de Benjamin** de **optimización de rentabilidad**;
- separar **impulso** de **desplazamiento**;
- separar `setup_validity`, calidad pre-entrada y resultado;
- clasificar variables por disponibilidad `L0/L1/L2/L3`;
- modelar la estrategia como secuencia/estado, no solo como vector estático;
- impedir que variables post-entrada/outcome entren en la decisión original;
- modelar fill, spread, slippage y órdenes no ejecutadas;
- controlar duplicados/correlación y validar cronológicamente.

## Regla de nomenclatura

La terminología principal debe ser la de Benjamín Carmona. Si añadimos un término auxiliar para medir algo, debe ir marcado como **métrica auxiliar** y explicarse en lenguaje simple. Nunca se debe presentar una métrica auxiliar como si fuera un término del curso.

## Principio central

No basta con reconocer visualmente que ocurrió un evento. El objetivo es construir detectores que puedan reconocerlo usando únicamente la información disponible hasta ese instante, sin mirar velas futuras.

Cada evento tendrá dos tiempos cuando aplique:
- `event_time`: vela donde ocurre/formalmente se sitúa el evento.
- `known_time`: primera vela en la que el evento podía conocerse sin mirar al futuro.

## Disponibilidad de información

Cada variable debe ser clasificada o heredar una clasificación inequívoca:

- `L0`: contexto disponible antes del setup;
- `L1`: activación/confirmación disponible antes de decidir la entrada;
- `L2`: ejecución/fill;
- `L3`: trayectoria y resultado posterior.

Solo `L0 + L1` pueden decidir si se entra. `L2` determina cómo se ejecuta. `L3` se usa para gestión, diagnóstico y resultado, nunca para justificar retrospectivamente la entrada.

## Representación matemática general

La situación de mercado mantiene un vector de características, pero la decisión se interpreta además como una **secuencia temporal de estados**:

`X_t = [estructura, liquidez, impulso, desplazamiento_pre, desplazamiento_post, velas, imbalance, orderblock, sesion, contexto_HTF, aproximacion, riesgo, ...]`

La decisión final será una función:

`trade_t = F(X_t, secuencia_eventos_t, reglas_confirmadas_por_el_curso)`

No se fijarán umbrales definitivos hasta haberlos inferido y validado con ejemplos del curso. Los umbrales de detectores se calibran para reproducir labels/decisiones del instructor, no para maximizar P&L.

## Liquidez

Para cada punto candidato de liquidez se almacenará, como mínimo:

- `tf`: temporalidad.
- `price`: precio del nivel.
- `created_at`: momento de creación.
- `known_at`: momento en que podía identificarse.
- `kind`: tipo según la terminología exacta usada por Benjamín.
- `age_bars`: antigüedad en velas.
- `distance_atr = |P_actual - P_liquidez| / ATR_ref` (**métrica auxiliar**: distancia normalizada por volatilidad).
- `touch_count`: número de contactos válidos según definición futura del curso.
- `price_dispersion_atr`: dispersión entre niveles si se trata de máximos/mínimos similares.
- `prominence_atr`: cuánto sobresale el punto respecto a su entorno (**métrica auxiliar**).
- `session_origin`: sesión en la que se formó.
- `swept`: si ya fue tomado.
- `priority`: jerarquía inferida y validada a partir del curso.

Además, v2 enlaza niveles mediante relaciones de rango/jerarquía (`parent_range_id`, `contained_by_liquidity_id`, `same_pool_group_id`, `higher_priority_competing_id`) para evitar tratar la liquidez como una lista plana.

La definición de `liquidity_taken` no se fijará por adelantado. Se aprenderá de ejemplos etiquetados del curso: mecha, cierre, tolerancia, retorno, contexto, etc.

## Quiebre de estructura

Cada candidato a quiebre registrará:

- nivel estructural que se rompe;
- temporalidad;
- `event_time` y `known_time` del nivel;
- ruptura por mecha/cierre;
- `penetration_atr = distancia_de_ruptura / ATR_ref` (**métrica auxiliar**);
- `close_penetration_atr`;
- cuerpo y rango de la vela de ruptura;
- relación cuerpo/rango;
- posición del cierre dentro de la vela;
- desplazamiento antes del quiebre;
- desplazamiento después del quiebre;
- creación de imbalance;
- continuación y retroceso posterior.

La regla exacta de qué considera Benjamín un quiebre válido se derivará de sus ejemplos y lenguaje, no de definiciones externas.

## Impulso

Desde v2, **impulso y desplazamiento son objetos distintos**.

`impulse_confirmed` representa el evento local de decisión/confirmación que Benjamin describe repetidamente y que suele estar asociado a creación de imbalance. No se define simplemente como “vela grande”.

Para cada candidato a impulso se almacenará:

- `impulse_start_time`;
- `impulse_end_time`;
- `impulse_known_time`;
- `impulse_candle_count`;
- `impulse_net_move_atr`;
- `impulse_max_candle_range_atr`;
- `impulse_median_body_ratio`;
- `impulse_directional_fraction`;
- `impulse_overlap_ratio`;
- `impulse_created_imbalance`;
- `bars_from_liquidity_event_to_impulse`;
- `structure_interaction_during_impulse`;
- `impulse_label_source ∈ {instructor_explicit, visual_confirmed, provisional, unresolved}`.

No se congela un umbral numérico hasta que el detector reproduzca ejemplos positivos y negativos de Benjamin en holdout cronológico.

## Desplazamiento

"Desplazamiento" es término de Benjamín. En v2 se reserva para la **calidad del tramo direccional más amplio**, no como sinónimo automático del impulso local.

Para un tramo desde `P0` hasta `Pn` de `N` velas:

### Inclinación normalizada

`inclination = (Pn - P0) / (N * ATR_ref)`

Interpreta cuánto avanza el precio por vela en relación con la volatilidad normal.

### Eficiencia direccional

`efficiency = |Pn - P0| / sum(|P_i - P_{i-1}|)`

Cerca de 1 = movimiento muy directo. Bajo = mucho zigzag.

### Dominancia de cuerpos

`body_dominance = sum(|close-open|) / sum(high-low)`

Mide cuánto del movimiento está formado por cuerpos en vez de mechas.

### Consistencia direccional

`directional_consistency = velas_en_direccion / N`

### Solapamiento

`overlap_ratio = solapamiento_total_entre_velas / rango_total_del_tramo`

Menor solapamiento puede corresponder a un desplazamiento más limpio; la relación real deberá validarse con el curso.

### Expansión relativa

`range_expansion = mediana(rango_velas_tramo) / mediana(rango_N_velas_previas)`

### Distancia neta

`net_move_atr = |Pn - P0| / ATR_ref`

### Continuación post-evento

`follow_through_k = avance_maximo_favorable_en_k_velas / ATR_ref`

**Disponibilidad:** `L3` si requiere velas posteriores al instante de decisión. No puede ser feature de entrada de ese mismo instante.

### Retroceso post-evento

`pullback_k = retroceso_maximo_en_k_velas / net_move`

**Disponibilidad:** `L3` cuando usa futuro respecto de la decisión original.

No se construirá un único `displacement_score` hasta comprobar qué combinación reproduce mejor los ejemplos que Benjamín llama desplazamiento.

## Calidad de aproximación a la zona

V2 añade un objeto específico para medir cómo llega el precio al POI/imbalance:

- duración en velas;
- movimiento neto/ATR;
- eficiencia direccional;
- solapamiento;
- dominancia de cuerpos;
- expansión de rango;
- número de retrocesos internos;
- número/prominencia de nuevas liquidez(es) generadas;
- liquidez objetivo consumida durante la aproximación;
- liquidez contraria generada detrás del precio;
- etiqueta cualitativa del instructor cuando exista (`correctiva/liquidity_building`, `impulsiva`, `neutral`, `unresolved`).

Estas métricas describen la aproximación; no se fijará un filtro numérico porque mejore el P&L.

## Imbalances

La geometría base ya está confirmada en `Imbalances Vol 1`: Benjamín define el imbalance mediante **tres velas consecutivas** y la ausencia de contacto entre el rango/mecha de la vela 1 y el rango/mecha de la vela 3.

### Detector geométrico base

Para velas consecutivas `c1, c2, c3`:

**Imbalance alcista:**

`high(c1) < low(c3)`

con zona:

`zone = [high(c1), low(c3)]`

**Imbalance bajista:**

`low(c1) > high(c3)`

con zona:

`zone = [high(c3), low(c1)]`

Si vela 1 y vela 3 se tocan o solapan, no existe el hueco/ineficiencia que Benjamín está definiendo en esa lección.

No se añade por ahora ningún umbral mínimo de pips, ATR o porcentaje porque el curso todavía no lo ha establecido.

### Tamaño normalizado — métrica auxiliar

`gap_size = zone_high - zone_low`

`gap_size_atr = gap_size / ATR_ref`

Esta medida permitirá investigar si el tamaño de la ineficiencia cambia la probabilidad o magnitud de la reacción, pero **no forma parte aún de la definición mínima de Benjamín**.

### Estado limpio / mitigado

Vol. 1 establece una regla fuerte: el imbalance que Benjamín quiere usar debe permanecer **limpio**, es decir, no haber sido tocado desde su formación.

Para una zona `[zone_low, zone_high]`, una vela posterior `k` intersecta/toca la zona cuando:

`touch(k) = (high_k >= zone_low) AND (low_k <= zone_high)`

Estado:

`clean = true` al quedar formado/conocido el imbalance.

En el primer `touch(k)` posterior:

`clean = false`

`first_touch_time = k`

`state = mitigated`

Benjamín trata esa primera interacción como suficiente para perder el estatus de imbalance limpio; no exige que la zona se rellene al 50% o al 100%.

Por prudencia, hasta que otra lección diga lo contrario, la igualdad exacta con el borde se contará como toque.

### Profundidad de mitigación — métricas auxiliares

Aunque la primera interacción ya invalide el estado `clean` para el uso enseñado, almacenaremos cuánto entra el precio:

`fill_fraction = penetration_into_zone / gap_size`

acotado descriptivamente entre 0 y 1 para el relleno de la zona; sobrepasar totalmente la zona puede registrarse por separado.

También se guardarán:

- `bars_until_first_touch`;
- `reaction_distance_atr` después del primer toque;
- `max_penetration_before_reaction`;
- `touch_count` para análisis, aunque el segundo toque ya no sea una entrada limpia bajo Vol. 1.

Las métricas que requieren reacción posterior son `L3` respecto de la primera interacción y no pueden filtrarla retrospectivamente.

### Contexto de creación — métricas auxiliares

Para comprobar la asociación que Benjamín hace entre impulso e imbalance se guardará:

- `middle_candle_range_atr`;
- `middle_candle_body_ratio`;
- `creation_displacement_efficiency`;
- `creation_range_expansion`;
- número de imbalances creados dentro del impulso;
- relación con el quiebre/cambio de estructura.

No se fija aún qué valores hacen obligatorio un imbalance de alta calidad.

### Jerarquía y función

Cada imbalance debe guardar:

- `tf`;
- `role ∈ {zona_HTF, entrada_LTF}`;
- `liquidity_confluence`;
- `structure_context`;
- `direction`;
- `created_at`;
- `known_time` (no anterior a que la vela 3 esté disponible/cerrada conforme a la lógica usada en el backtest);
- `clean/mitigated`.

Vol. 1 da prioridad contextual a timeframes mayores (Daily > 4H > 1H en el ejemplo de búsqueda descendente), pero todavía no existe una fórmula numérica de ranking.

## Construcción del trade, stop, target y R

`Imbalances Vol. 2` aporta el primer ejemplo integrado suficientemente claro para empezar a registrar la geometría completa de una operación.

### Variables de construcción

Para cada trade se almacenará:

- `session_eligible`;
- `htf_zone_tf`;
- `zone_type ∈ {liquidity, imbalance, confluence}`;
- `zone_clean_at_entry`;
- `ltf_tf`;
- `structure_change_confirmed`;
- `entry_imbalance_created`;
- `entry_mode ∈ {limit, candle_confirmation, other}`;
- `decision_time`;
- `order_time`;
- `requested_entry_price`;
- `entry_price`;
- `fill_time`;
- `filled`;
- `spread/slippage model`;
- `stop_price`;
- `target_price`;
- `stop_reference_type`;
- `target_reference_type`;
- `be_trigger_event`;
- `exit_reason`.

Un backtest no puede asumir que toda limit ideal se ejecuta. Debe registrar órdenes no llenadas/canceladas y separar variantes de ejecución soportadas por el curso.

### Distancias

Para largos:

`risk_distance = entry_price - stop_price`

`reward_distance = target_price - entry_price`

Para cortos:

`risk_distance = stop_price - entry_price`

`reward_distance = entry_price - target_price`

### Riesgo-beneficio inicial

`initial_RR = reward_distance / risk_distance`

En Vol. 2 Benjamín utiliza **~1:2 como mínimo deseado en el ejemplo/forma de plantear la operación**, pero esto se mantiene como regla del material observado pendiente de validación masiva; no se fuerza todavía sobre todos los trades históricos.

### Resultado en múltiplos R

Si `R = risk_distance`, el resultado de cada operación se almacenará como:

`realized_R = pnl_price_distance / R`

con signo positivo para beneficio y negativo para pérdida.

Esto permite comparar operaciones con stops distintos sin confundir pips con rendimiento relativo.

`realized_R` es `L3`: jamás puede decidir retrospectivamente si el setup era válido.

### Stop — mediciones auxiliares

Además del precio exacto:

- `stop_distance_pips`;
- `stop_distance_atr`;
- `stop_beyond_structure_distance_atr`;
- `rr_if_wider_stop`;
- `rr_if_tighter_stop`.

Benjamin rechaza seleccionar el stop por una cifra fija de pips en Vol. 2; la ubicación debe equilibrar protección/invalidation con un R:R razonable.

### Target y liquidez

Guardar:

- `target_liquidity_type`;
- `distance_to_target_liquidity_at_entry`;
- `rr_at_first_target_liquidity`;
- `target_hit_before_stop`;
- `reaction_after_target_liquidity`.

Los dos últimos son `L3`; el target elegido en la entrada debe basarse solo en liquidez ya visible/conocida.

### Break-even

Por ahora BE se registra como evento, no como regla fija:

- `be_moved = true/false`;
- `be_time`;
- `be_trigger_type`;
- `rr_available_at_be`;
- `liquidity_event_at_be`.

Vídeos posteriores deberán determinar si existe un disparador universal o varias reglas contextuales.

## Trayectoria post-entrada: MFE/MAE y milestones

Para cada trade ejecutado guardar, como `L3`:

- `MFE_R`;
- `MAE_R`;
- `time_to_0_5R`;
- `time_to_1R`;
- `time_to_2R`;
- `time_to_3R`;
- máximo retroceso después de 1R y 2R;
- primera liquidez objetivo alcanzada y momento;
- nueva liquidez contraria creada después de entrada;
- nueva estructura favorable/adversa;
- eventos de BE/parcial/runner;
- `realized_R`.

Estas variables sirven para investigar gestión sin contaminar el detector de entrada.

## Antes y después de liquidez / quiebre

Para cada evento principal se medirán ventanas separadas:

- `pre_event`: comportamiento antes del evento.
- `event`: vela(s) donde ocurre.
- `post_event`: comportamiento posterior.

Esto permitirá distinguir, por ejemplo:

`liquidez -> impulso -> desplazamiento -> quiebre`

frente a

`quiebre -> impulso/desplazamiento`

u otras secuencias que enseñe Benjamín.

Se guardarán además diferencias temporales entre eventos (`bars/seconds liquidity->impulse`, `impulse->break`, `imbalance->retrace`, `decision->fill`).

## Condiciones de entrada y no entrada

Cada setup se representará como una lista ordenada de condiciones booleanas y valores:

`C = [C1, C2, C3, ... Cn]`

La entrada solo será válida si se cumplen las condiciones obligatorias confirmadas por el curso.

También se registrará explícitamente `no_trade_reason` cuando Benjamín rechace o no tome un setup aparente.

Además se separará siempre:

- `setup_validity`;
- `setup_quality_pre_entry`;
- `trade_taken`;
- `trade_result_R`.

## Independencia de muestras

Cada ejemplo semanal debe identificar:

- `canonical_example_id`;
- `duplicate_of`;
- `independent_sample`;
- grupo por mismo día;
- grupo por misma semana;
- grupo por mismo movimiento subyacente.

Una repetición exacta cuenta una vez. Las estadísticas de incertidumbre no asumirán independencia entre múltiples ejemplos del mismo movimiento/día.

## Validación

Ninguna definición pasa a backtesting hasta superar:

1. ejemplos positivos del curso;
2. ejemplos negativos del curso;
3. ejemplos cronológicos no usados para construir la regla;
4. ejecución sin datos futuros;
5. revisión de falsos positivos y falsos negativos;
6. corrección de la definición si el detector no coincide suficientemente con la interpretación de Benjamín;
7. separación estricta entre calibración contra labels del instructor y evaluación de P&L;
8. prueba de sensibilidad alrededor de umbrales congelados;
9. verificación de que ninguna variable `L3` entra en la decisión original.

El holdout final no será un random split. Si se usa para corregir una regla, deja de ser holdout y debe reservarse un nuevo bloque cronológico intacto.

## Ablation testing posterior

Después de congelar y backtestear la estrategia original de Benjamin, podremos crear versiones nuevas eliminando/cambiando una pieza cada vez (DXY, estructura, velas, orderblock, horario preferido, filtro de aproximación, variante de entrada, etc.).

La mejora se acepta solo si supera una comparación out-of-sample contra el baseline sin mezclar múltiples cambios a la vez.

## Regla final

El vídeo aporta significado y etiquetado. Los datos OHLC aportan medición exacta. La estrategia final deberá poder ser ejecutada por código sobre velas históricas sin depender de interpretar visualmente una captura a posteriori.

Primero se aprende y congela **la estrategia de Benjamin**. Después se mide su edge. Solo entonces se hacen cambios pequeños, aislados y versionados.