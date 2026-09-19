# 14 Trades Semanales Explicados — Semana 17 (se repite)

Status: **COMPLETE — DUPLICATE SOURCE / NON-INDEPENDENT SAMPLE**

## Evidence reviewed

- Published source: `17) Trades Semana 17 (se repite).mp4`.
- Full source duration: **2421.65 s (~40m22s)**.
- Dense evidence regenerated successfully: **2,422 frames at 1 fps + 4,844 frames at 2 fps**.
- Reduced Week 16 and Week 17 transcripts were both inspected directly.
- Both transcript streams report **362 segments** and **2422.52 s**.
- After text normalization, full-transcript similarity is approximately **99.0%**. Differences are consistent with ASR variation, not a distinct weekly lesson.
- All **41 paired periodic contact sheets** for Weeks 16 and 17 were compared. Every pair had mean absolute grayscale difference below 1/255; mean across pairs was ~0.14/255, consistent with the same visual sequence under encoding/compression noise.
- The source container files are not byte-identical, so file hash/size alone was correctly not used to collapse the samples.

## Duplicate resolution

```text
source_video_number = 17
duplicate_of = 16
duplicate_group_id = module14-week16-week17-repeat
independent_sample = false
rules_added = none
```

Week 17 is a semantic republication of Week 16. It remains traceable as a published source but contributes **zero additional independent trades/examples/no-trades** to the corpus.

## v2 treatment

The canonical event reconstruction remains `016-semana-16.md`; Week 17 does not create duplicate event rows.

- L0/L1 entry evidence remains exactly the Week 16 evidence.
- L2 execution variants remain separate from entry validity.
- L3 TP/BE/SL outcomes are not used to justify original entries.
- `impulse` and `displacement` remain separate fields as recorded canonically.
- `event_time` / `known_time`, approach quality, validity, pre-entry quality and result are not rewritten because of the duplicate publication.
- Unobservable fills, spread/slippage, OHLC/ATR, MFE/MAE and other unresolved fields remain unresolved; nothing is guessed.

## Methodological finding

Publisher labels and container hashes are insufficient duplicate tests by themselves. A re-encoded/re-uploaded lesson can have different bytes while carrying the same semantic and visual sample. Duplicate resolution therefore uses transcript/content evidence plus distributed visual evidence, and duplicates are explicitly marked `independent_sample = false` to avoid inflating setup frequency or expectancy evidence.

## v2 completeness gate

- [x] Published order respected.
- [x] Transcript compared against the suspected canonical source.
- [x] Visual evidence compared across the lesson.
- [x] Duplicate/correlation group resolved explicitly.
- [x] No detector threshold selected from P&L.
- [x] L0/L1 separated from L2/L3.
- [x] Unresolved fields left unresolved.
- [x] No new rules inferred from duplicate evidence.

**Week 17 is closed. The next permitted material in published order is Week 18.**
