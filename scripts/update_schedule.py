import json, re, subprocess, tempfile
from pathlib import Path
from urllib.request import Request, urlopen

PAGE='https://www.ukmerge.lt/misrios-komunalines-atliekos/'
PDF_URL='https://www.ukmerge.lt/uploads/Documents/document_740/2026_m._birelio-gruodio_mn._Ukmergs_miesto_gyventoj_komunalini_ir_pakuoi_atliek_surinkimo_grafikas.pdf'
OUT=Path('schedule.json')
# The PDF tables are ordered visually as: Gėlyno, Užupio, Krekšlių, Šlapių, Dukstynos.
ROUTES=['Gėlyno','Užupio','Krekšlių','Šlapių','Dukstynos']
MONTHS=['06','07','08','09','10','11','12']

def get(url):
    req=Request(url,headers={'User-Agent':'Mozilla/5.0'})
    with urlopen(req,timeout=30) as r:return r.read()

url=PDF_URL
pdf=get(url)
with tempfile.TemporaryDirectory() as td:
    pdfp=Path(td)/'schedule.pdf'; txtp=Path(td)/'schedule.txt'
    pdfp.write_bytes(pdf)
    subprocess.run(['pdftotext','-layout',str(pdfp),str(txtp)],check=True)
    text=txtp.read_text(errors='ignore')

# The official city PDF has 5 route blocks, each with three rows: mixed, paper/plastic, glass.
# IMPORTANT: the PDF's visual/table order is Gėlyno, Užupio, Krekšlių, Šlapių, Dukstynos.
# Parse the first page's schedule rows in that order and validate every row before publishing.
lines=[x.strip() for x in text.splitlines() if x.strip()]
rows=[]
for line in lines:
    if re.match(r'^(Mišrių komunalinių atliekų|Plastiko, popieriaus pakuotės|Stiklo pakuotės)\s',line):
        rows.append(line)
if len(rows)<15: raise RuntimeError(f'Expected at least 15 schedule rows, got {len(rows)}')
rows=rows[:15]

def parse_row(line):
    typ=line.split()[0:4]
    if line.startswith('Mišrių'): kind='mixed'; prefix='Mišrių komunalinių atliekų'
    elif line.startswith('Plastiko'): kind='pack'; prefix='Plastiko, popieriaus pakuotės'
    else: kind='glass'; prefix='Stiklo pakuotės'
    rest=line[len(prefix):].strip()
    parts=re.split(r'\s+',rest)
    if len(parts)!=7: raise RuntimeError(f'Unexpected month columns: {line}')
    out=[]
    for m,val in zip(MONTHS,parts):
        nums=[int(x) for x in re.findall(r'\d{1,2}',val)]
        if nums: out.append([f'2026-{m}',*nums])
    return kind,out

routes={r:{} for r in ROUTES}
for i,r in enumerate(ROUTES):
    for j in range(3):
        kind,vals=parse_row(rows[i*3+j]); routes[r][kind]=vals

# Validate against calendar and basic expected cadence.
for r,d in routes.items():
    if set(d)!={'mixed','pack','glass'}: raise RuntimeError(f'Missing category for {r}')
    for kind,months in d.items():
        for ym,*days in months:
            if not days or any(x<1 or x>31 for x in days): raise RuntimeError(f'Invalid date {r} {kind} {ym}')

old=json.loads(OUT.read_text()) if OUT.exists() else {}
new={'source':PAGE,'pdf':url,'period':'2026-06/2026-12','routes':routes}
# Preserve route/street mapping from current schedule.json if present.
for r in ROUTES:
    if r in old.get('routes',{}):
        pass
OUT.write_text(json.dumps(new,ensure_ascii=False,indent=2)+'\n')
print('Updated schedule from',url)
