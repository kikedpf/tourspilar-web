import os, subprocess, time, hashlib, json
from pathlib import Path
import pandas as pd
import numpy as np

window=os.environ['WINDOW']
START_DATE, END_DATE=window.split('__',1)
ROOT=Path('output'); RAW=ROOT/'raw'; REPORTS=ROOT/'reports'
RAW.mkdir(parents=True,exist_ok=True); REPORTS.mkdir(parents=True,exist_ok=True)
label='EURUSD'; instrument='eurusd'; stem=f'{label}_tick_{START_DATE}_{END_DATE}'
csv=RAW/f'{stem}.csv'

delays=[0,90,240]
for attempt,delay in enumerate(delays,1):
    if delay: time.sleep(delay)
    cmd=['dukascopy-node','-i',instrument,'-from',START_DATE,'-to',END_DATE,'-t','tick','-p','bid','-f','csv','-dir',str(RAW),'-fn',stem,'-bs','1','-bp','6000','-r','2','-rp','9000']
    print(f'ATTEMPT {attempt}/{len(delays)}:', ' '.join(cmd), flush=True)
    rc=subprocess.run(cmd).returncode
    if rc==0 and csv.exists() and csv.stat().st_size>50: break
    csv.unlink(missing_ok=True)
else:
    raise RuntimeError(f'tick download failed {START_DATE} {END_DATE}')

df=pd.read_csv(csv)
req={'timestamp','askPrice','bidPrice'}
miss=req.difference(df.columns)
if miss: raise RuntimeError(f'missing tick columns {miss}')
neg=int((df['askPrice']<df['bidPrice']).sum())
if neg: raise RuntimeError(f'negative spread rows={neg}')
pq=csv.with_suffix('.parquet')
df.to_parquet(pq,index=False,compression='zstd')
vr=pd.read_parquet(pq)
if list(df.columns)!=list(vr.columns) or len(df)!=len(vr): raise RuntimeError('parquet structural mismatch')
for c in df.columns:
    if pd.api.types.is_numeric_dtype(df[c]) and not np.array_equal(df[c].to_numpy(),vr[c].to_numpy(),equal_nan=True):
        raise RuntimeError(f'parquet numeric mismatch {c}')
csv.unlink()
ts=pd.to_datetime(df['timestamp'],unit='ms',utc=True)
quality={'instrument':'EURUSD','kind':'tick','rows':len(df),'negative_spread':neg,'start_utc':str(ts.min()),'end_utc':str(ts.max())}
pd.DataFrame([quality]).to_csv(REPORTS/f'quality_ticks_{START_DATE}_{END_DATE}.csv',index=False)
h=hashlib.sha256()
with open(pq,'rb') as f:
    for chunk in iter(lambda:f.read(8*1024*1024),b''): h.update(chunk)
pd.DataFrame([{'file':str(pq.relative_to(ROOT)),'bytes':pq.stat().st_size,'sha256':h.hexdigest()}]).to_csv(REPORTS/f'checksums_ticks_{START_DATE}_{END_DATE}.csv',index=False)
manifest={'source':'Dukascopy public historical data feed','instrument':'EURUSD','kind':'tick','start_inclusive':START_DATE,'end_exclusive':END_DATE,'timezone':'UTC','file':str(pq.relative_to(ROOT))}
(REPORTS/f'manifest_ticks_{START_DATE}_{END_DATE}.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps(manifest,indent=2))
