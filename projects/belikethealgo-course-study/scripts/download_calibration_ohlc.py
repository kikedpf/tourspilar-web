#!/usr/bin/env python3
import csv, json, os, subprocess, time
from datetime import date, timedelta
from pathlib import Path

ROOT=Path('projects/belikethealgo-course-study').resolve()
OUT=ROOT/'processed'/'calibration-market-data'
OUT.mkdir(parents=True,exist_ok=True)

START=date(2023,4,24)
END=date(2023,9,9)
STEP=timedelta(days=14)
INSTRUMENTS=[('EURUSD','eurusd'),('DXY','dollaridxusd')]

subprocess.run(['npm','install','--no-save','dukascopy-node@1.50.0'],cwd=ROOT,check=True)

manifest=[]
for label,instrument in INSTRUMENTS:
    cur=START
    while cur<END:
        nxt=min(cur+STEP,END)
        stem=f'{label}_m1_bid_{cur.isoformat()}_{nxt.isoformat()}'
        csv_path=OUT/f'{stem}.csv'
        cmd=['npx','dukascopy-node','-i',instrument,'-from',cur.isoformat(),'-to',nxt.isoformat(),
             '-t','m1','-p','bid','-f','csv','-dir',str(OUT),'-fn',stem,
             '-bs','1','-bp','10000','-r','1','-rp','15000']
        print('RUN',' '.join(cmd),flush=True)
        ok=False
        last=None
        for delay in [0,30,90]:
            if delay: time.sleep(delay)
            try:
                r=subprocess.run(cmd,cwd=ROOT,timeout=900)
                last=r.returncode
            except subprocess.TimeoutExpired:
                last='timeout'
            if last==0 and csv_path.exists() and csv_path.stat().st_size>100:
                ok=True; break
        if not ok:
            raise RuntimeError(f'failed {label} {cur}..{nxt}; rc={last}')
        with csv_path.open(newline='',encoding='utf-8') as fh:
            reader=csv.DictReader(fh)
            rows=list(reader)
        required={'timestamp','open','high','low','close'}
        if not rows or not required.issubset(reader.fieldnames or []):
            raise RuntimeError(f'bad csv {csv_path}')
        bad=0; dups=0; seen=set()
        for row in rows:
            ts=row['timestamp']
            if ts in seen: dups+=1
            seen.add(ts)
            o,h,l,c=map(float,[row['open'],row['high'],row['low'],row['close']])
            if h<l or h+1e-9<max(o,c) or l-1e-9>min(o,c): bad+=1
        if dups or bad:
            raise RuntimeError(f'quality fail {csv_path}: dups={dups}, bad={bad}')
        manifest.append({'instrument':label,'source_instrument':instrument,'side':'bid','timeframe':'m1',
                         'start':cur.isoformat(),'end':nxt.isoformat(),'rows':len(rows),
                         'file':str(csv_path.relative_to(ROOT)),'duplicates':dups,'invalid_ohlc':bad})
        cur=nxt
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'files':len(manifest),'rows':sum(x['rows'] for x in manifest)},indent=2))
