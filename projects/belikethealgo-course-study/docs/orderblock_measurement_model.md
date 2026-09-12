# Modelo de medición — Orderblocks

Este documento formaliza únicamente lo que el módulo 5 permite medir sin inventar reglas que Benjamín no haya definido.

## Principio de modelado

Separar siempre:

1. **detección geométrica/candidata** de una orderblock;
2. **elegibilidad como POI** dentro del método de Benjamín;
3. **confirmación/entrada LTF**, que sigue siendo una capa distinta.

Una vela puede parecer una orderblock visualmente y aun así no ser un POI operativo válido para Benjamín si falta liquidez/inducement previo al retest.

## Campos comunes

Para cada candidata almacenar:

```text
orderblock_id
instrument
tf
direction ∈ {bullish,bearish}
type ∈ {classic,rejection,breaker}
candidate_candle_time
known_time
open, high, low, close
zone_low
zone_high
zone_geometry_status ∈ {confirmed,unresolved}
creation_displacement_metrics
prior_liquidity_taken_at_creation
inducement_exists_before_retest
inducement_time
inducement_price
inducement_kind
first_retest_time
clean_before_first_retest
session_eligible_at_retest
ltf_reaction_present
used_as_primary_poi
used_as_secondary_confluence
invalid_reason
```

`known_time` no puede situarse antes de que exista evidencia suficiente de que el desplazamiento posterior realmente se ha producido. El número exacto de velas requerido para confirmarlo sigue sin estar fijado.

## Classic orderblock

La definición conceptual confirmada es:

```text
vela candidata de dirección opuesta
-> desplazamiento fuerte posterior en la otra dirección
```

Para candidato bajista:

```text
candidate_close > candidate_open
AND strong_bearish_displacement_follows
```

Para candidato alcista:

```text
candidate_close < candidate_open
AND strong_bullish_displacement_follows
```

`strong_*_displacement_follows` no tiene todavía un umbral numérico confirmado. Debe medirse con el vector ya definido para desplazamiento: range/ATR, body ratio, directional efficiency, expansion, overlap, follow-through, etc., y calibrarse con ejemplos etiquetados.

### Geometría de zona clásica

El curso confirma que Benjamín piensa en **una vela**, pero no define todavía de forma suficientemente objetiva si la zona operativa es:

- high-low completo;
- cuerpo;
- open-extreme;
- otra subzona.

Por tanto:

```text
zone_geometry_status = unresolved
```

hasta nueva evidencia.

## Inducement / liquidez antes del retest

Campo fundamental:

```text
inducement_exists_before_retest ∈ {true,false}
```

Un inducement es un máximo/mínimo relevante disponible antes de la llegada a la orderblock.

No se fija todavía el algoritmo exacto de selección del máximo/mínimo: el módulo 9 de liquidez deberá resolver prioridad, sweep y tolerancias.

La jerarquía práctica de módulo 5 queda representada como:

```text
if orderblock_present and not inducement_exists_before_retest:
    actionable_orderblock_poi = false / lower_quality
```

La etiqueta exacta entre `false` y `lower_quality` puede variar según el estudio descriptivo, porque en vídeos 1–2 Benjamín habla de menor probabilidad y en vídeo 3 endurece su práctica diciendo que no la quiere sin liquidez.

Para backtest principal de su método actual se recomienda mantener el filtro conservador:

```text
actionable_orderblock_poi = inducement_exists_before_retest
```

hasta que ejemplos held-out contradigan esta interpretación.

## Rejection block

Definición confirmada:

- una mecha liquida la mecha/extremo anterior;
- después se produce desplazamiento fuerte en sentido opuesto;
- la zona debe mantenerse sin tocar antes del retest que se pretende operar.

Candidato bajista conceptual:

```text
current_high > previous_high
AND strong_bearish_displacement_follows
```

Candidato alcista simétrico:

```text
current_low < previous_low
AND strong_bullish_displacement_follows
```

### Estado limpio

```text
state = CLEAN after creation

if later_price_intersects(rejection_zone):
    state = TOUCHED
    future_first_touch_eligibility = false
```

La invalidez tras el primer toque es instructor-explicit para rejection blocks.

### Geometría pendiente

Benjamín dice que la rejection block es la **mecha**, pero todavía debemos fijar exactamente si el rango de la zona es:

- extremo a cuerpo/open;
- extremo a close;
- toda la vela;
- otra convención.

Hasta entonces almacenar por separado:

```text
wick_extreme
body_edge
full_candle_low/high
```

y no colapsarlos prematuramente.

## Breaker block

Representarlo como patrón de rol estructural, no como simple vela rota:

```text
prior_poi_exists
AND decisive_break_through_relevant_side
AND strong_displacement
AND later_retest_from_opposite_side
```

Campos adicionales:

```text
source_poi_type
source_poi_time
break_time
break_close_penetration_atr
break_body_ratio
break_displacement_metrics
retest_time
imbalance_confluence
```

Los criterios de `decisive_break` deben reutilizar el modelo de Estructura, no crear una definición paralela.

## Papel dentro del trade

Después de módulo 5:

```text
orderblock_required_for_trade = false
```

La arquitectura correcta es:

```text
liquidity_event
+ valid_session
+ LTF reaction/confirmation
+ optional orderblock confluence
```

Registrar:

```text
orderblock_present
orderblock_type
orderblock_confluence_only
trade_valid_without_orderblock
```

Esto permitirá probar objetivamente si las orderblocks mejoran precisión/expectancy sin imponerlas a setups que Benjamín considera válidos sin ellas.

## No-trade / invalidación

Campos de exclusión:

```text
no_prior_inducement
rejection_already_touched
out_of_session
no_ltf_reaction
breaker_without_supporting_context
zone_geometry_unresolved
```

No toda exclusión tiene el mismo estatus:

- `rejection_already_touched`: regla fuerte confirmada;
- `out_of_session`: regla fuerte ya confirmada por módulos 2 y 5;
- `no_prior_inducement`: filtro fuerte para usar la orderblock como POI, especialmente tras vídeo 3;
- `breaker_without_supporting_context`: preferencia fuerte, pero no una prohibición matemática universal todavía.

## Métricas de investigación

Sin convertirlas aún en reglas de curso, almacenar:

```text
ob_candle_range_atr
ob_candle_body_ratio
ob_wick_ratio
post_ob_net_move_atr
post_ob_efficiency
post_ob_range_expansion
bars_to_inducement
bars_inducement_to_retest
distance_inducement_to_ob_atr
retest_penetration_fraction
reaction_distance_atr_after_retest
max_adverse_excursion_after_retest
max_favorable_excursion_after_retest
imbalance_overlap_fraction
```

Estas son **métricas auxiliares** para descubrir qué características separan ejemplos buenos de malos. No son reglas de Benjamín hasta validación.

## Próxima validación

1. Reusar estas etiquetas en módulo 6 sin alterar la definición de orderblock.
2. Refinar `inducement` en módulo 9 Liquidez del Mercado.
3. Validar en Trades Semanales Explicados si:
   - Benjamin toma trades sin orderblock;
   - rejection blocks limpias superan realmente a classic/breaker;
   - orderblock + imbalance aporta más que imbalance solo;
   - el filtro de inducement reduce falsos positivos.
4. No congelar umbrales numéricos hasta held-out validation.
