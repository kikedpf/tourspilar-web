from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "detector"))

from detector_v0_1 import detect, Status


def load_jsonl(path: Path):
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            rows.append(json.loads(line))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--rows", default=str(ROOT / "detector" / "calibration_rows_v0_1.jsonl"))
    ap.add_argument("--params", default=str(ROOT / "detector" / "parameters_v0_1.json"))
    ap.add_argument("--json-out", default=str(ROOT / "detector" / "calibration_report_v0_1.json"))
    ap.add_argument("--md-out", default=str(ROOT / "detector" / "CALIBRATION_REPORT_v0_1.md"))
    args = ap.parse_args()

    rows = load_jsonl(Path(args.rows))
    params = json.loads(Path(args.params).read_text(encoding="utf-8"))

    counts = Counter()
    reason_counts = Counter()
    expected_reason_counts = Counter()
    unresolved_counts = Counter()
    by_week = defaultdict(lambda: Counter())
    mismatches = []

    for row in rows:
        if not row.get("independent_sample", True):
            counts["excluded_duplicate"] += 1
            continue
        expected = row["instructor_label"]
        result = detect(row["features"], params)
        pred = result.setup_status.value
        week = str(row["week_number"])
        by_week[week]["rows"] += 1

        for x in result.reason_codes:
            reason_counts[x] += 1
        for x in row.get("expected_reason_codes", []):
            expected_reason_counts[x] += 1
        for x in result.unresolved:
            unresolved_counts[x] += 1

        if pred == "UNRESOLVED":
            counts["UNRESOLVED"] += 1
            by_week[week]["UNRESOLVED"] += 1
        elif expected == "valid" and pred == "PASS":
            counts["TP"] += 1
            by_week[week]["TP"] += 1
        elif expected == "invalid" and pred == "FAIL":
            counts["TN"] += 1
            by_week[week]["TN"] += 1
        elif expected == "invalid" and pred == "PASS":
            counts["FP"] += 1
            by_week[week]["FP"] += 1
        elif expected == "valid" and pred == "FAIL":
            counts["FN"] += 1
            by_week[week]["FN"] += 1
        else:
            counts["OTHER"] += 1

        expected_reasons = set(row.get("expected_reason_codes", []))
        actual_reasons = set(result.reason_codes)
        reason_missing = sorted(expected_reasons - actual_reasons)
        if pred == "UNRESOLVED" or (expected == "valid" and pred != "PASS") or (expected == "invalid" and pred != "FAIL") or reason_missing:
            mismatches.append({
                "sample_id": row["sample_id"],
                "week_number": row["week_number"],
                "expected": expected,
                "predicted": pred,
                "expected_reason_codes": sorted(expected_reasons),
                "actual_reason_codes": sorted(actual_reasons),
                "missing_expected_reasons": reason_missing,
                "unresolved": result.unresolved,
            })

    scored = counts["TP"] + counts["TN"] + counts["FP"] + counts["FN"]
    accuracy = (counts["TP"] + counts["TN"]) / scored if scored else None
    precision = counts["TP"] / (counts["TP"] + counts["FP"]) if counts["TP"] + counts["FP"] else None
    recall = counts["TP"] / (counts["TP"] + counts["FN"]) if counts["TP"] + counts["FN"] else None

    report = {
        "detector_version": params["detector_version"],
        "dataset_role": "discovery/calibration; NOT independent validation",
        "rows_total": len(rows),
        "counts": dict(counts),
        "accuracy_on_calibration_rows": accuracy,
        "precision_on_calibration_rows": precision,
        "recall_on_calibration_rows": recall,
        "reason_counts": dict(reason_counts),
        "expected_reason_counts": dict(expected_reason_counts),
        "unresolved_counts": dict(unresolved_counts),
        "by_week": {k: dict(v) for k, v in sorted(by_week.items(), key=lambda x: int(x[0]))},
        "mismatches": mismatches,
        "warning": "Perfect or high calibration agreement is NOT evidence of market edge or forward replication because Weeks 1-20 were used to construct these rules/features.",
    }

    Path(args.json_out).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Detector v0.1 calibration report",
        "",
        "**Dataset role: discovery/calibration, not independent validation.**",
        "",
        f"- Rows: **{len(rows)}**",
        f"- TP: **{counts['TP']}**",
        f"- TN: **{counts['TN']}**",
        f"- FP: **{counts['FP']}**",
        f"- FN: **{counts['FN']}**",
        f"- UNRESOLVED: **{counts['UNRESOLVED']}**",
        f"- Calibration agreement: **{accuracy:.3%}**" if accuracy is not None else "- Calibration agreement: n/a",
        "",
        "A high/perfect value here is expected because Weeks 1-20 are the construction/calibration corpus. It must not be presented as forward accuracy, profitability, or market edge.",
        "",
        "## Hard-rule coverage",
        "",
    ]
    for key, value in sorted(expected_reason_counts.items(), key=lambda x: (-x[1], x[0])):
        lines.append(f"- `{key}`: {value} instructor-negative calibration examples")
    lines += ["", "## Remaining numerical calibration work", ""]
    for key, value in params.get("unresolved_thresholds", {}).items():
        if value is None:
            lines.append(f"- `{key}`: unresolved pending instructor-labeled OHLC measurement")
    lines += ["", "## Mismatches / unresolved rows", ""]
    if not mismatches:
        lines.append("- None in the logical calibration snapshot.")
    else:
        for m in mismatches:
            lines.append(f"- {m['sample_id']}: expected {m['expected']}, predicted {m['predicted']}, unresolved={m['unresolved']}")
    Path(args.md_out).write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
