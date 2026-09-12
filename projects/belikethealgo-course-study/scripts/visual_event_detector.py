#!/usr/bin/env python3
"""Visual event detector for BeLikeTheAlgo course videos.

This is an auxiliary evidence tool, not part of Benjamin's trading terminology.
It combines:
1) PySceneDetect AdaptiveDetector for true scene/layout changes.
2) OpenCV chart-state differencing for screen-recording changes that are too subtle
   to count as cinematic scene cuts (panning, zooming, timeframe/layout changes,
   large annotations, chart updates).

The detector only proposes timestamps. Dense frame extraction around trading events
is still mandatory before a rule is accepted.
"""
import argparse
import csv
import json
from pathlib import Path

import cv2
from scenedetect import AdaptiveDetector, SceneManager, open_video


def detect_adaptive_scenes(video_path: Path, output_dir: Path, threshold: float = 2.2):
    scene_dir = output_dir / "adaptive_scenes"
    scene_dir.mkdir(parents=True, exist_ok=True)

    video = open_video(str(video_path))
    manager = SceneManager()
    manager.add_detector(AdaptiveDetector(adaptive_threshold=threshold, min_scene_len=8))
    manager.detect_scenes(video=video, show_progress=False)
    scenes = manager.get_scene_list(start_in_scene=True)

    cap = cv2.VideoCapture(str(video_path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    records = []
    for i, (start, end) in enumerate(scenes, 1):
        start_s = start.get_seconds()
        end_s = end.get_seconds()
        mid_s = (start_s + end_s) / 2.0
        cap.set(cv2.CAP_PROP_POS_MSEC, mid_s * 1000.0)
        ok, frame = cap.read()
        fname = None
        if ok:
            fname = f"scene_{i:04d}_{mid_s:010.3f}s.jpg"
            cv2.imwrite(str(scene_dir / fname), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
        records.append({
            "scene": i,
            "start_seconds": round(start_s, 3),
            "end_seconds": round(end_s, 3),
            "duration_seconds": round(end_s - start_s, 3),
            "representative_frame": fname,
            "fps": fps,
        })
    cap.release()
    (output_dir / "adaptive_scenes.json").write_text(
        json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return records


def _prep(frame, width=480):
    h, w = frame.shape[:2]
    nh = max(1, int(h * width / w))
    small = cv2.resize(frame, (width, nh), interpolation=cv2.INTER_AREA)
    gray = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(gray, 60, 150)
    return gray, edges


def detect_chart_state_changes(
    video_path: Path,
    output_dir: Path,
    sample_fps: float = 2.0,
    pixel_delta: int = 18,
    changed_ratio_threshold: float = 0.028,
    edge_ratio_threshold: float = 0.007,
    min_gap_seconds: float = 0.75,
):
    """Detect meaningful screen/chart changes in screen-recorded lessons.

    Two signals are used:
    - changed_ratio: proportion of pixels changing materially between samples.
    - edge_ratio: changes in line/edge structure, useful for annotations and chart redraws.

    These are OUR AUXILIARY visual metrics, not Benjamin strategy metrics.
    """
    state_dir = output_dir / "state_changes"
    state_dir.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(video_path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    duration = total / fps if fps else 0.0
    step = max(1, int(round(fps / sample_fps)))

    prev_gray = None
    prev_edges = None
    last_saved_t = -1e9
    rows = []
    frame_idx = 0
    event_idx = 0

    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if frame_idx % step != 0:
            frame_idx += 1
            continue
        t = frame_idx / fps
        gray, edges = _prep(frame)
        if prev_gray is not None:
            diff = cv2.absdiff(gray, prev_gray)
            changed_ratio = float((diff >= pixel_delta).mean())
            edge_diff = cv2.bitwise_xor(edges, prev_edges)
            edge_ratio = float((edge_diff > 0).mean())
            mean_delta = float(diff.mean())

            triggered = (
                changed_ratio >= changed_ratio_threshold
                or edge_ratio >= edge_ratio_threshold
            ) and (t - last_saved_t >= min_gap_seconds)

            if triggered:
                event_idx += 1
                fname = f"state_{event_idx:05d}_{t:010.3f}s.jpg"
                cv2.imwrite(str(state_dir / fname), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 94])
                rows.append({
                    "event": event_idx,
                    "seconds": round(t, 3),
                    "changed_ratio": round(changed_ratio, 6),
                    "edge_ratio": round(edge_ratio, 6),
                    "mean_gray_delta": round(mean_delta, 4),
                    "frame": fname,
                })
                last_saved_t = t
        prev_gray, prev_edges = gray, edges
        frame_idx += 1

    cap.release()
    payload = {
        "video": str(video_path),
        "duration_seconds": round(duration, 3),
        "sample_fps": sample_fps,
        "pixel_delta": pixel_delta,
        "changed_ratio_threshold": changed_ratio_threshold,
        "edge_ratio_threshold": edge_ratio_threshold,
        "min_gap_seconds": min_gap_seconds,
        "events": rows,
    }
    (output_dir / "state_changes.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    with (output_dir / "state_changes.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["event", "seconds", "changed_ratio", "edge_ratio", "mean_gray_delta", "frame"])
        writer.writeheader()
        writer.writerows(rows)
    return rows


def main():
    p = argparse.ArgumentParser()
    p.add_argument("video")
    p.add_argument("output")
    p.add_argument("--adaptive-threshold", type=float, default=2.2)
    p.add_argument("--sample-fps", type=float, default=2.0)
    p.add_argument("--changed-ratio", type=float, default=0.028)
    p.add_argument("--edge-ratio", type=float, default=0.007)
    args = p.parse_args()

    video = Path(args.video)
    out = Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    scenes = detect_adaptive_scenes(video, out, args.adaptive_threshold)
    states = detect_chart_state_changes(
        video, out, sample_fps=args.sample_fps,
        changed_ratio_threshold=args.changed_ratio,
        edge_ratio_threshold=args.edge_ratio,
    )
    print(json.dumps({"adaptive_scenes": len(scenes), "state_changes": len(states)}, indent=2))


if __name__ == "__main__":
    main()
