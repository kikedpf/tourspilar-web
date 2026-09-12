#!/usr/bin/env python3
"""Extract dense timestamped visual evidence from a course video.

This is an evidence utility. It samples the source video sequentially at a fixed
rate inside one or more time intervals, preserving absolute source timestamps,
and builds labeled contact sheets for review.
"""
import argparse
import json
import math
from pathlib import Path

import cv2
from PIL import Image, ImageDraw


def parse_interval(value: str):
    try:
        start_s, end_s = value.split(":", 1)
        start, end = float(start_s), float(end_s)
    except Exception as exc:
        raise argparse.ArgumentTypeError("interval must be START:END in seconds") from exc
    if start < 0 or end <= start:
        raise argparse.ArgumentTypeError("interval requires 0 <= START < END")
    return start, end


def make_contact_sheets(records, output_dir: Path, per_sheet=12, cols=3):
    if not records:
        return []
    sheet_dir = output_dir / "contact_sheets"
    sheet_dir.mkdir(parents=True, exist_ok=True)
    cell_w, cell_h, label_h = 640, 360, 34
    out = []
    for page in range(math.ceil(len(records) / per_sheet)):
        batch = records[page * per_sheet:(page + 1) * per_sheet]
        rows = math.ceil(len(batch) / cols)
        canvas = Image.new("RGB", (cols * cell_w, rows * (cell_h + label_h)), "white")
        draw = ImageDraw.Draw(canvas)
        for i, rec in enumerate(batch):
            im = Image.open(output_dir / rec["file"]).convert("RGB")
            im.thumbnail((cell_w - 8, cell_h - 8))
            col = i % cols
            row = i // cols
            x = col * cell_w + (cell_w - im.width) // 2
            y = row * (cell_h + label_h) + (cell_h - im.height) // 2
            canvas.paste(im, (x, y))
            draw.text((col * cell_w + 8, row * (cell_h + label_h) + cell_h + 5),
                      f"t={rec['seconds']:.3f}s  {rec['file']}", fill="black")
        name = f"dense_sheet_{page + 1:03d}.jpg"
        canvas.save(sheet_dir / name, quality=90, optimize=True)
        out.append(str(Path("contact_sheets") / name))
    return out


def extract(video_path: Path, output_dir: Path, intervals, sample_fps: float):
    output_dir.mkdir(parents=True, exist_ok=True)
    frames_dir = output_dir / "frames"
    frames_dir.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(video_path))
    native_fps = float(cap.get(cv2.CAP_PROP_FPS) or 25.0)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    duration = total_frames / native_fps if native_fps else 0.0
    step = max(1, int(round(native_fps / sample_fps)))

    intervals = sorted(intervals)
    records = []
    frame_idx = 0
    saved = 0
    active_idx = 0

    while True:
        ok, frame = cap.read()
        if not ok:
            break
        t = frame_idx / native_fps
        while active_idx < len(intervals) and t > intervals[active_idx][1]:
            active_idx += 1
        if active_idx >= len(intervals):
            break
        start, end = intervals[active_idx]
        if t >= start and t <= end and frame_idx % step == 0:
            saved += 1
            fname = f"frame_{saved:05d}_t{t:010.3f}s.jpg"
            cv2.imwrite(str(frames_dir / fname), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 94])
            records.append({
                "index": saved,
                "seconds": round(t, 3),
                "frame_index": frame_idx,
                "file": str(Path("frames") / fname),
                "interval_start": start,
                "interval_end": end,
            })
        frame_idx += 1

    cap.release()
    sheets = make_contact_sheets(records, output_dir)
    payload = {
        "video": str(video_path),
        "native_fps": native_fps,
        "duration_seconds": round(duration, 3),
        "requested_sample_fps": sample_fps,
        "effective_step_frames": step,
        "intervals": [{"start": a, "end": b} for a, b in intervals],
        "frame_count": len(records),
        "frames": records,
        "contact_sheets": sheets,
    }
    (output_dir / "dense_index.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return payload


def main():
    p = argparse.ArgumentParser()
    p.add_argument("video")
    p.add_argument("output")
    p.add_argument("--interval", action="append", type=parse_interval, required=True,
                   help="START:END seconds; may be repeated")
    p.add_argument("--fps", type=float, default=1.0)
    args = p.parse_args()
    if args.fps <= 0:
        raise SystemExit("--fps must be > 0")
    payload = extract(Path(args.video), Path(args.output), args.interval, args.fps)
    print(json.dumps({
        "video": payload["video"],
        "frames": payload["frame_count"],
        "contact_sheets": len(payload["contact_sheets"]),
    }, indent=2))


if __name__ == "__main__":
    main()
