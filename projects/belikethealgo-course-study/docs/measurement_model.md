# Modelo de medición cuantitativa — BeLikeTheAlgo

## Regla de nomenclatura

La terminología principal debe ser la de Benjamín Carmona. Si añadimos un término auxiliar para medir algo, debe ir marcado como **métrica auxiliar** y explicarse en lenguaje simple. Nunca se debe presentar una métrica auxiliar como si fuera un término del curso.

## Principio central

No basta con reconocer visualmente que ocurrió un evento. El objetivo es construir detectores que puedan reconocerlo usando únicamente la información disponible hasta ese instante, sin mirar velas futuras.

Cada evento tendrá dos tiempos cuando aplique:
- `event_time`: vela donde ocurre/formalmente se sitúa el evento.
- `known_time`: primera vela en la que el evento podía conocerse sin mirar al futuro.

## Representación matemática general

Cada situación de mercado se representa mediante un vector de características:

`X_t = [estructura, liquidez, desplazamiento_pre, desplazamiento_post, velas, imbalance, orderblock, sesion, contexto_HTF, riesgo, ...]`

La decisión final será una función:

`trade_t = F(X_t, reglas_confirmadas_por_el_curso)`

No se fijarán umbrales definitivos hasta haberlos inferido y validado con ejemplos del curso.

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

## Desplazamiento

"Desplazamiento" es término de Benjamín. Para poder detectarlo objetivamente se describirá mediante varias métricas auxiliares, no mediante una sola cifra.

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

### Retroceso post-evento

`pullback_k = retroceso_maximo_en_k_velas / net_move`

No se construirá un único `displacement_score` hasta comprobar qué combinación reproduce mejor los ejemplos que Benjamín llama desplazamiento.

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
- `entry_price`;
- `stop_price`;
- `target_price`;
- `stop_reference_type`;
- `target_reference_type`;
- `be_trigger_event`;
- `exit_reason`.

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

El ejemplo de Vol. 2 usa la siguiente liquidez/mínimo como referencia de target y advierte de posible reacción allí.

### Break-even

Por ahora BE se registra como evento, no como regla fija:

- `be_moved = true/false`;
- `be_time`;
- `be_trigger_type`;
- `rr_available_at_be`;
- `liquidity_event_at_be`.

Vídeos posteriores deberán determinar si existe un disparador universal o varias reglas contextuales.

## Antes y después de liquidez / quiebre

Para cada evento principal se medirán ventanas separadas:

- `pre_event`: comportamiento antes del evento.
- `event`: vela(s) donde ocurre.
- `post_event`: comportamiento posterior.

Esto permitirá distinguir, por ejemplo:

`liquidez -> desplazamiento -> quiebre`

frente a

`quiebre -> desplazamiento`

u otras secuencias que enseñe Benjamín.

## Condiciones de entrada y no entrada

Cada setup se representará como una lista ordenada de condiciones booleanas y valores:

`C = [C1, C2, C3, ... Cn]`

La entrada solo será válida si se cumplen las condiciones obligatorias confirmadas por el curso.

También se registrará explícitamente `no_trade_reason` cuando Benjamín rechace o no tome un setup aparente.

## Validación

Ninguna definición pasa a backtesting hasta superar:

1. ejemplos positivos del curso;
2. ejemplos negativos del curso;
3. ejemplos no usados para construir la regla;
4. ejecución sin datos futuros;
5. revisión de falsos positivos y falsos negativos;
6. corrección de la definición si el detector no coincide suficientemente con la interpretación de Benjamín.

## Regla final

El vídeo aporta significado y etiquetado. Los datos OHLC aportan medición exacta. La estrategia final deberá poder ser ejecutada por código sobre velas históricas sin depender de interpretar visualmente una captura a posteriori.
