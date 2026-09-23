#!/usr/bin/env python3
import json, math, re, subprocess
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path('projects/belikethealgo-course-study').resolve()
RAW = ROOT / 'work' / 'raw'
OUT = ROOT / 'processed' / 'calibration-events'
MAP = ROOT / 'detector' / 'calibration_interval_map_v0_1.jsonl'


def week_from_name(name: str):
    m = re.search(r'(?:^|\b)(?:Semana\s*)?(\d{1,3})(?:\b|\))', name, re.I)
    if not m:
        m = re.search(r'^\s*(\d{1,3})\s*[)._-]', name)
    return int(m.group(1)) if m else None


def ffmpeg_frame(video: Path, t: float, out: Path):
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([
        'ffmpeg','-hide_banner','-loglevel','error','-y',
        '-ss',f'{max(0,t):.3f}','-i',str(video),
        '-frames:v','1','-q:v','2',str(out)
    ], check=True)


def ffmpeg_series(video: Path, start: float, end: float, out_dir: Path, step=5.0):
    out_dir.mkdir(parents=True, exist_ok=True)
    duration=max(0.5,end-start)
    fps=1.0/step
    subprocess.run([
        'ffmpeg','-hide_banner','-loglevel','error','-y',
        '-ss',f'{max(0,start):.3f}','-t',f'{duration:.3f}','-i',str(video),
        '-vf',f'fps={fps},scale=1280:-2','-q:v','4',str(out_dir/'frame_%04d.jpg')
    ], check=True)


def make_sheets(frame_dir: Path, sheet_dir: Path, start: float, step=5.0):
    frames=sorted(frame_dir.glob('*.jpg'))
    sheet_dir.mkdir(parents=True, exist_ok=True)
    per=12; cols=3; cw=640; ch=360; lh=34
    names=[]
    for page in range(math.ceil(len(frames)/per)):
        batch=frames[page*per:(page+1)*per]
        rows=math.ceil(len(batch)/cols)
        canvas=Image.new('RGB',(cols*cw,rows*(ch+lh)),'white')
        draw=ImageDraw.Draw(canvas)
        for i,f in enumerate(batch):
            im=Image.open(f).convert('RGB'); im.thumbnail((cw-8,ch-8))
            col=i%cols; row=i//cols
            x=col*cw+(cw-im.width)//2; y=row*(ch+lh)+(ch-im.height)//2
            canvas.paste(im,(x,y))
            idx=int(f.stem.split('_')[-1])
            t=start+(idx-1)*step
            draw.text((col*cw+8,row*(ch+lh)+ch+5),f't={t:.1f}s {f.name}',fill='black')
        p=sheet_dir/f'sheet_{page+1:03d}.jpg'; canvas.save(p,quality=90,optimize=True); names.append(p.name)
    return names


def main():
    rows=[json.loads(x) for x in MAP.read_text(encoding='utf-8').splitlines() if x.strip()]
    videos=list(RAW.rglob('*.mp4'))
    manifest=[]
    for video in videos:
        w=week_from_name(video.name)
        if w is None:
            continue
        targets=[r for r in rows if r.get('week_number')==w and isinstance(r.get('video_start_seconds'),(int,float)) and isinstance(r.get('video_end_seconds'),(int,float))]
        if not targets:
            print(f'Week {w}: no mapped calibration targets')
            continue
        for r in targets:
            sid=r['sample_id']; start=float(r['video_start_seconds']); end=float(r['video_end_seconds'])
            if end<=start: continue
            d=OUT/f'week-{w:03d}'/sid
            series=d/'series'; sheets=d/'contact_sheets'; keys=d/'keyframes'
            print(f'Extracting {sid}: {start:.1f}-{end:.1f}s from {video.name}', flush=True)
            ffmpeg_series(video,start,end,series,step=5.0)
            sheet_names=make_sheets(series,sheets,start,step=5.0)
            # Three high-resolution reference states plus a near-end frame.
            points=[start+0.20*(end-start),start+0.50*(end-start),start+0.80*(end-start),max(start,end-1.0)]
            key_names=[]
            for i,t in enumerate(points,1):
                p=keys/f'key_{i:02d}_t{t:010.3f}s.jpg'; ffmpeg_frame(video,t,p); key_names.append(p.name)
            # raw series is redundant after contact sheet creation
            for p in series.glob('*.jpg'): p.unlink()
            try: series.rmdir()
            except OSError: pass
            item={
                'sample_id':sid,'week_number':w,'instructor_label':r.get('instructor_label'),
                'source_video':video.name,'video_start_seconds':start,'video_end_seconds':end,
                'mapping_status':r.get('mapping_status'),'mapping_score':r.get('mapping_score'),
                'keyframes':[str((keys/x).relative_to(OUT)) for x in key_names],
                'contact_sheets':[str((sheets/x).relative_to(OUT)) for x in sheet_names],
                'sampling_step_seconds':5.0
            }
            (d/'manifest.json').write_text(json.dumps(item,ensure_ascii=False,indent=2),encoding='utf-8')
            manifest.append(item)
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'index.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f'Calibration targets extracted: {len(manifest)}')


if __name__=='__main__':
    main()
