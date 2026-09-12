#!/usr/bin/env python3
import json, math, os, re, subprocess
from pathlib import Path
from faster_whisper import WhisperModel
from PIL import Image, ImageOps, ImageDraw

ROOT = Path('projects/belikethealgo-course-study').resolve()
RAW = ROOT / 'work' / 'raw'
OUT = ROOT / 'processed'
MODEL_NAME = os.environ.get('WHISPER_MODEL', 'base')
FRAME_INTERVAL = int(os.environ.get('FRAME_INTERVAL', '12'))
SCENE_THRESHOLD = float(os.environ.get('SCENE_THRESHOLD', '0.32'))


def safe(s):
    return re.sub(r'[^A-Za-z0-9._-]+', '_', s).strip('_') or 'lesson'


def run(cmd):
    subprocess.run(cmd, check=True)


def probe(video):
    p = subprocess.run([
        'ffprobe','-v','error','-show_format','-show_streams','-of','json',str(video)
    ], capture_output=True, text=True, check=True)
    return json.loads(p.stdout)


def make_contact_sheets(frame_dir: Path, sheet_dir: Path, prefix: str):
    frames = sorted(frame_dir.glob('*.jpg'))
    if not frames:
        return []
    sheet_dir.mkdir(parents=True, exist_ok=True)
    out_files=[]
    per_sheet=12
    cols=3
    cell_w, cell_h = 640, 390
    label_h=34
    for page in range(math.ceil(len(frames)/per_sheet)):
        batch=frames[page*per_sheet:(page+1)*per_sheet]
        rows=math.ceil(len(batch)/cols)
        canvas=Image.new('RGB',(cols*cell_w, rows*(cell_h+label_h)),'white')
        draw=ImageDraw.Draw(canvas)
        for i,f in enumerate(batch):
            im=Image.open(f).convert('RGB')
            im.thumbnail((cell_w-10,cell_h-10))
            x=(i%cols)*cell_w+(cell_w-im.width)//2
            y=(i//cols)*(cell_h+label_h)+(cell_h-im.height)//2
            canvas.paste(im,(x,y))
            draw.text(((i%cols)*cell_w+8,(i//cols)*(cell_h+label_h)+cell_h+4),f.name,fill='black')
        out=sheet_dir/f'{prefix}_sheet_{page+1:03d}.jpg'
        canvas.save(out,quality=88,optimize=True)
        out_files.append(str(out.relative_to(ROOT)))
    return out_files


def to_srt_time(seconds):
    ms=int(round(seconds*1000))
    h, rem=divmod(ms,3600000)
    m, rem=divmod(rem,60000)
    s, ms=divmod(rem,1000)
    return f'{h:02d}:{m:02d}:{s:02d},{ms:03d}'


def main():
    videos=sorted(RAW.rglob('*.mp4'))
    if not videos:
        raise SystemExit('No mp4 videos found')
    print(f'Loading faster-whisper model: {MODEL_NAME}')
    model=WhisperModel(MODEL_NAME, device='cpu', compute_type='int8')
    index=[]
    for video in videos:
        module=video.parent.name
        stem=safe(video.stem)
        lesson_dir=OUT/module/stem
        frames_dir=lesson_dir/'frames'
        scene_dir=lesson_dir/'scenes'
        sheets_dir=lesson_dir/'contact_sheets'
        lesson_dir.mkdir(parents=True, exist_ok=True)
        frames_dir.mkdir(parents=True, exist_ok=True)
        scene_dir.mkdir(parents=True, exist_ok=True)
        print(f'Processing {module}/{video.name}')

        meta=probe(video)
        (lesson_dir/'ffprobe.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')

        run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(video),
             '-vf',f'fps=1/{FRAME_INTERVAL},scale=1280:-2', '-q:v','4',str(frames_dir/'frame_%05d.jpg')])
        run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(video),
             '-vf',f"select='gt(scene,{SCENE_THRESHOLD})',scale=1280:-2",'-vsync','vfr','-q:v','4',str(scene_dir/'scene_%05d.jpg')])

        segments_gen, info = model.transcribe(str(video), language='es', vad_filter=True, beam_size=5,
                                             word_timestamps=False, condition_on_previous_text=True)
        segments=[]
        srt=[]
        text=[]
        for idx, seg in enumerate(segments_gen,1):
            t=seg.text.strip()
            if not t:
                continue
            row={'id':idx,'start':round(seg.start,3),'end':round(seg.end,3),'text':t}
            segments.append(row)
            text.append(f'[{seg.start:8.2f}-{seg.end:8.2f}] {t}')
            srt.extend([str(idx),f'{to_srt_time(seg.start)} --> {to_srt_time(seg.end)}',t,''])
        transcript={
            'language': info.language,
            'language_probability': info.language_probability,
            'duration': info.duration,
            'duration_after_vad': info.duration_after_vad,
            'segments': segments,
        }
        (lesson_dir/'transcript.json').write_text(json.dumps(transcript,ensure_ascii=False,indent=2),encoding='utf-8')
        (lesson_dir/'transcript.txt').write_text('\n'.join(text),encoding='utf-8')
        (lesson_dir/'transcript.srt').write_text('\n'.join(srt),encoding='utf-8')

        periodic_sheets=make_contact_sheets(frames_dir,sheets_dir,'periodic')
        scene_sheets=make_contact_sheets(scene_dir,sheets_dir,'scene')

        duration=float(meta.get('format',{}).get('duration') or 0)
        index.append({
            'module':module,'video':video.name,'duration_seconds':duration,
            'periodic_frames':len(list(frames_dir.glob('*.jpg'))),
            'scene_frames':len(list(scene_dir.glob('*.jpg'))),
            'transcript_segments':len(segments),
            'contact_sheets':periodic_sheets+scene_sheets,
        })

    (OUT/'index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2),encoding='utf-8')
    with (OUT/'INDEX.md').open('w',encoding='utf-8') as f:
        f.write('# Processed lessons\n\n')
        for x in index:
            f.write(f"- **{x['module']} / {x['video']}** — {x['duration_seconds']/60:.1f} min; {x['transcript_segments']} transcript segments; {x['periodic_frames']} periodic frames; {x['scene_frames']} scene frames.\n")

if __name__=='__main__':
    main()
