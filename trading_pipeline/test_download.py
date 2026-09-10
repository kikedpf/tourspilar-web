import subprocess, hashlib, json
from pathlib import Path
import pandas as pd
import numpy as np

START_DATE='2026-07-01'
END_DATE='2026-07-03'
INSTRUMENTS={'EURUSD':'eurusd','DXY_DUKASCOPY':'dollaridxusd'}
ROOT=Path('output')
RAW=ROOT/'raw'
REPORTS=ROOT/'reports'
RAW.mkdir(parents=True, exist_ok=True)
REPORTS.mkdir(parents=True, exist_ok=True)

def stem(label, tf, side):
    return f'{label}_{tf}_{side}_{START_DATE}_{END_DATE}'

def download(label, instrument, tf, side):
    s=stem(label,tf,side)
    target=RAW/f'{s}.csv'
    cmd=['dukascopy-node','-i',instrument,'-from',START_DATE,'-to',END_DATE,'-t',tf,'-p',side,'-f','csv','-dir',str(RAW),'-fn',s,'-bs','4','-bp','1200','-r','4','-rp','2500']
    print('RUN', ' '.join(cmd), flush=True)
    subprocess.run(cmd, check=True)
    if not target.exists():
        matches=list(RAW.glob(s+'*.csv'))
        if not matches:
            raise FileNotFoundError(s)
        matches[0].rename(target)
    if target.stat().st_size < 50:
        raise RuntimeError(f'Too small: {target}')
    return target

def compact(csv_path):
    df=pd.read_csv(csv_path)
    pq=csv_path.with_suffix('.parquet')
    df.to_parquet(pq,index=False,compression='zstd')
    vr=pd.read_parquet(pq)
    if list(df.columns)!=list(vr.columns) or len(df)!=len(vr):
        raise RuntimeError(f'Verification failed: {pq}')
    for c in df.columns:
        if pd.api.types.is_numeric_dtype(df[c]):
            if not np.array_equal(df[c].to_numpy(),vr[c].to_numpy(),equal_nan=True):
                raise RuntimeError(f'Numeric mismatch {c} in {pq}')
    csv_path.unlink()
    return pq

created=[]
for label,inst in INSTRUMENTS.items():
    for tf,side in [('m1','bid'),('m1','ask'),('tick','bid')]:
        created.append(compact(download(label,inst,tf,side)))

rows=[]
for p in created:
    h=hashlib.sha256()
    with open(p,'rb') as f:
        for chunk in iter(lambda:f.read(8*1024*1024),b''):
            h.update(chunk)
    rows.append({'file':str(p),'bytes':p.stat().st_size,'sha256':h.hexdigest()})
pd.DataFrame(rows).to_csv(REPORTS/'checksums.csv',index=False)
manifest={'start':START_DATE,'end':END_DATE,'instruments':INSTRUMENTS,'files':[str(p) for p in created]}
(REPORTS/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps(manifest,indent=2))
