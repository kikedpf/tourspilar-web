# Imbalances Vol. 2 — estudio y evidencia

## Estado
COMPLETE

## Fuente
- Vídeo: `4) Imbalances/2) Imbalances Vol 2.mp4`
- Duración: ~584 s (~9.7 min)
- Evidencia densa: vídeo completo a 2 fps, 1,169 frames timestamped.

## Función de la lección
Benjamin presenta un trade resumido para integrar la teoría ya enseñada. El objetivo no es introducir todavía todo el modelo de entrada definitivo, sino enseñar la secuencia de búsqueda de una operación.

## Secuencia explícita enseñada
1. **Horario primero.** Benjamin dice que si no estamos dentro del horario no se busca operación y llega a describir el horario como el 70–80% de su estrategia. Esto se registra como importancia verbal del instructor, no como peso matemático probado.
2. **Zona HTF.** Buscar máximo/mínimo con liquidez o imbalance. Para alumnos que empiezan recomienda ubicar zonas como mínimo en 1H; alumnos avanzados pueden bajar a 15m.
3. **Confluencia liquidez + imbalance.** Si un máximo/mínimo coincide con imbalance lo llama un “combo perfecto”, pero no convierte esa confluencia en requisito universal.
4. **Entrada LTF.** Una vez el precio entra/liquida la zona, bajar a 1–5m para buscar la entrada.
5. **Cambio de estructura LTF.** En el ejemplo utiliza 1m y espera cambio de estructura.
6. **Imbalance LTF posterior.** Tras el cambio de estructura espera que se forme un imbalance utilizable para entrada.
7. **Ejecución.** Dos alternativas explícitas: orden límite en el imbalance o entrada con vela de confirmación; esta última se enseñará con más detalle después.
8. **Stop y objetivo.** El stop no se elige por un número fijo de pips; se equilibra protección estructural y R:R. El objetivo se relaciona con la siguiente liquidez/mínimo.
9. **Gestión.** Cuando el precio alcanza una zona de máximo/mínimo puede reaccionar; Benjamin propone proteger en break-even cuando corresponda para no devolver una operación que ya avanzó.

## Jerarquía temporal explícita
- Contexto estructural: 4H.
- Zona principal: 4H / 1H; 15m se usa como refinamiento avanzado.
- Entrada: 1m en el ejemplo, dentro del rango general de 1–5m enseñado anteriormente.

## Ejemplo integrado — 30 Nov 2023
### Contexto HTF
- EUR/USD.
- 4H: Benjamin identifica estructura, máximos/mínimos, liquidez y un imbalance de 4H.
- Proyección contextual: precio potencialmente atraído hacia liquidez inferior.
- 1H: identifica un imbalance que coincide con un máximo; describe la confluencia máximo + imbalance como especialmente favorable.
- 15m: la misma zona sigue siendo visible/refinable.

### Entrada LTF
- TradingView muestra `EURUSD 1m`.
- Fecha visible: **30 Nov 2023**.
- Timezone visible: **UTC-5**.
- En torno a 08:20–08:21 ya está dentro de la sesión de Nueva York según la lección.
- Benjamin espera una noticia de las 08:30 antes de buscar la ejecución.
- Tras el movimiento de noticia se produce un cambio de estructura de 1m.
- Benjamin señala que inicialmente no hay imbalance de entrada; después aparece el primero.
- Ese primer imbalance es el candidato para una orden límite; alternativamente puede esperarse vela de confirmación.

## Stop
- Benjamin evita colocar un stop excesivamente amplio simplemente por “cubrirse”.
- La referencia defensiva se relaciona con el máximo/estructura cercana, pero la posición exacta debe conservar un R:R razonable.
- Regla explícita de proceso: **no fijar stop por una cantidad arbitraria de pips**; balancear invalidación/protección con riesgo-beneficio.

## Target y R:R
- El objetivo se alinea con el siguiente mínimo/liquidez relevante.
- Benjamin repite que quiere **como mínimo 1:2 R:R** o estar muy próximo a 1:2 cuando el precio alcance la liquidez objetivo.
- En el montaje final del ejemplo se observa una herramienta de posición corta con aproximadamente:
  - stop: ~9.2 pips,
  - target: ~19.0 pips,
  - relación mostrada: ~**2.07R**.
- Esto se registra como resultado/parametrización del ejemplo, NO como esperanza estadística de la estrategia.

## Break-even
- Benjamin señala que máximos y mínimos pueden producir reacción.
- Si el precio llega a esa liquidez y la operación ya permite aproximadamente el R:R buscado, propone proteger en BE.
- No se infiere todavía un algoritmo universal de BE basado únicamente en R; vídeos posteriores deben aclarar la gestión.

## Qué queda confirmado de Vol. 1
- Imbalance HTF = zona de interés.
- Imbalance LTF = herramienta posible de entrada tras confirmación estructural.
- La confluencia con liquidez aumenta calidad, pero no se ha demostrado que sea obligatoria.
- Se mantiene la necesidad de trabajar con zonas limpias/no mitigadas según Vol. 1.

## Qué NO convertimos todavía en regla universal
- La afirmación “horario = 70–80%” no es un coeficiente cuantitativo.
- La confluencia máximo/mínimo + imbalance no se obliga en todos los trades.
- El ejemplo de 1:2 no prueba todavía que toda operación del curso use exactamente el mismo target/management.
- Orden límite y vela de confirmación son dos caminos válidos mostrados; todavía no sabemos cuándo Benjamin prefiere uno sobre otro en cada contexto.
- El stop de ~9.2 pips del ejemplo no es un stop fijo para futuras operaciones.

## Variables para el modelo matemático
Registrar por trade:
- `session_eligible`
- `htf_zone_tf`
- `zone_type = liquidity | imbalance | confluence`
- `zone_clean_at_entry`
- `ltf_tf`
- `structure_change_confirmed`
- `break_quality_vector`
- `entry_imbalance_created`
- `entry_mode = limit | candle_confirmation`
- `stop_distance_pips`
- `stop_distance_atr`
- `stop_reference_type`
- `target_liquidity_distance`
- `initial_rr`
- `be_trigger_event`
- `realized_r`

No se fijan umbrales matemáticos adicionales hasta analizar muchos trades semanales etiquetados por Benjamin.

## Inventario
- 1 trade integrado positivo explicado casi de principio a fin.
- 0 ejemplos negativos completos adicionales en esta lección.
- 1 comparación explícita entre dos métodos de entrada (limit vs candle confirmation).
- 1 ejemplo de gestión stop/target/BE.
