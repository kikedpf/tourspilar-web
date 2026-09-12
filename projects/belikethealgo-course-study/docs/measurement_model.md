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
