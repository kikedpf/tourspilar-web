# Detector v0.1.0 backup — 2026-09-20

Branch: `belikethealgo-course-study`  
Status: ACTIVE instructor-replication detector baseline through Week 20.

## Immutable file map

- `projects/belikethealgo-course-study/docs/detector_v0_1_spec.md` — blob `2ea6bbddf6d0abebf5597fe96419a006d34b86ef`
- `projects/belikethealgo-course-study/detector/parameters_v0_1.json` — blob `a7d52e3243f6dce3bc616df23169bb1045eb8e87`
- `projects/belikethealgo-course-study/detector/detector_v0_1.py` — blob `24551346e4f4f2bf3ca03a1bfeefafbda5e3bdce`
- `projects/belikethealgo-course-study/detector/CALIBRATION_LOG.md` — blob `48c2caaf523d846aa2b84fd27d1c7922a1d61054`
- `projects/belikethealgo-course-study/detector/CHANGELOG.md` — blob `a779943c8bbd912a69acfd9319b87bbe0b56d7ba`

## Recovery principles

- L0/L1 determine setup eligibility; L2/L3 never leak backward.
- Output per layer: PASS / FAIL / UNRESOLVED.
- No P&L-derived thresholds.
- Wick-only structure violation is not body structure confirmation.
- Required liquidity event precedes activation.
- Impulse and displacement remain separate.
- Imbalance existence alone never activates an entry.
- Orderblock without inducement is non-actionable in the conservative baseline.
- No chasing after missed entry.
- All unresolved numeric boundaries remain null until calibrated against Benjamin labels.
- Every future weekly video is tested against the current detector BEFORE rule changes.
- Behavioral changes create new versions; prior predictions remain immutable.

This backup is a recovery pointer. Canonical content remains in the blobs listed above.
