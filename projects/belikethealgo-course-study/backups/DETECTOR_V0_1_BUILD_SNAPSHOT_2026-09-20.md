# Detector v0.1 recovery snapshot — 2026-09-20

Branch: `belikethealgo-course-study`
Purpose: immutable recovery map for the detector build before forward Week-21 study.

## Calibration corpus
- Weeks 1–20 discovery/calibration.
- 112 independent labeled rows: 50 valid/recognized, 62 invalid/no-trade.
- Week 2 and Week 17 duplicates excluded.
- Week 6 source gap excluded.
- Logical construction agreement: TP=50, TN=62, FP=0, FN=0.
- This is calibration consistency, not forward accuracy or market edge.

## Files / blob SHAs

- `projects/belikethealgo-course-study/detector/BUILD_STATUS_v0_1.md` — `432a8652006fc7510fdd9a46ff4a6ec9e14e3d4c` (3326 bytes)
- `projects/belikethealgo-course-study/detector/CALIBRATION_LOG.md` — `1e1c7b2657f019ef99312f37437f32e535c5a79f` (2387 bytes)
- `projects/belikethealgo-course-study/detector/CALIBRATION_REPORT_v0_1.md` — `77ade60f939c9f42b854adb85a21ac790180ccb2` (4392 bytes)
- `projects/belikethealgo-course-study/detector/CHANGELOG.md` — `a779943c8bbd912a69acfd9319b87bbe0b56d7ba` (810 bytes)
- `projects/belikethealgo-course-study/detector/calibrate_detector_v0_1.py` — `3db1f02e1dae2761c417d8dc8f4e3d682cc61a4d` (6242 bytes)
- `projects/belikethealgo-course-study/detector/calibration_report_v0_1.json` — `20c550f6a53d2e86d7d2bd604ec7091d19f849e1` (2000 bytes)
- `projects/belikethealgo-course-study/detector/calibration_rows_v0_1.jsonl` — `cfea71a79663feb9be1c9ba827f18d75a1a1e768` (117169 bytes)
- `projects/belikethealgo-course-study/detector/detector_v0_1.py` — `0f76e0b0a29d3a85d20834e50046ddaa7e9b422d` (9442 bytes)
- `projects/belikethealgo-course-study/detector/market_measurements_v0_1.py` — `04352e527b29c75c6737440f84e8f4bf1538fda2` (9773 bytes)
- `projects/belikethealgo-course-study/detector/parameters_v0_1.json` — `89039d1b27f3217ae2a9e0fa1aa3d3a24876b2a1` (2979 bytes)
- `projects/belikethealgo-course-study/docs/detector_v0_1_spec.md` — `3af1021a3f63d07805e778916585064fbc916d44` (11148 bytes)
- `projects/belikethealgo-course-study/tests/test_detector_v0_1.py` — `caa1a8c2f81d84a7a9a4f886af4934b09bf38563` (4126 bytes)
- `projects/belikethealgo-course-study/tests/test_market_measurements_v0_1.py` — `180c861a07cd8e2fe8f68143f36327ad0cef7638` (3075 bytes)

## Freeze gate

Do not study Week 21+ until numeric OHLC calibration is completed as far as source evidence permits and v0.1 parameters are frozen. Any remaining unknowable threshold must be explicitly declared discretionary/unresolved rather than invented.

`main` is not part of this work.
