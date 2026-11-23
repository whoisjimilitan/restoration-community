import asyncio, sys, json, os
WITH=os.environ.get('DUST')=='1'
DUSTP,BANDP=(230,120) if WITH else (0,0)
DUSTS,BANDS=(260,140) if WITH else (0,0)
DUSTO,BANDO=(140,64) if WITH else (0,0)
from playwright.async_api import async_playwright
BASE='file:///home/claude/film/work/cards2/'
CSS='''@font-face{font-family:C;src:url(caslon.woff2)}@font-face{font-family:A;src:url(albert.woff2);font-weight:100 900}
*{margin:0;box-sizing:border-box}html,body{background:#0b0a09;color:#ece5d8}
.c{position:relative;overflow:hidden;isolation:isolate;background:#0b0a09;display:flex;flex-direction:column;justify-content:center}
.k{font:500 SMALLpx/1 A;letter-spacing:.42em;text-transform:uppercase;color:#a99f8f}
.t{font:400 TITLEpx/1.14 C;letter-spacing:-.01em;text-wrap:balance;color:#ece5d8}
.r{font:400 REFpx/1 C;font-variant:small-caps;letter-spacing:.08em;color:#c9c0b1}
.u{font:500 SMALLpx/1 A;letter-spacing:.06em;color:#8f8678}
.dust{position:absolute;left:0;right:0;bottom:0;width:100%;height:DUSTpx;object-fit:cover;object-position:50% 0;z-index:0}.paper{position:absolute;left:0;right:0;bottom:0;background:#f4efe6;z-index:0}

.c::before{content:"";position:absolute;z-index:-1;inset:-10% -10% -40% auto;width:72%;
  background:radial-gradient(ellipse 46% 7% at 58% 20%,rgba(236,229,216,.12),rgba(236,229,216,0) 70%),
    linear-gradient(90deg,rgba(236,229,216,0) 52%,rgba(236,229,216,.10) 57.5%,rgba(236,229,216,.15) 58%,rgba(236,229,216,.10) 58.5%,rgba(236,229,216,0) 64%);
  -webkit-mask:linear-gradient(180deg,rgba(0,0,0,.2),#000 22%,#000 40%,rgba(0,0,0,0) 62%);transform:rotate(8deg);transform-origin:top right}
'''
def html(t,ref,w,h,s):
    css=CSS.replace('TITLE',str(s['title'])).replace('SMALL',str(s['small'])).replace('REF',str(s['ref'])).replace('DUST',str(s['dust']))
    return f'''<meta charset=utf-8><style>{css}</style><div class="c" style="width:{w}px;height:{h}px;padding:{s['pad']}px">
<p class="k" style="position:absolute;top:{s['pad']}px;left:{s['pad']}px">Counsel</p>
<h1 class="t" style="max-width:{s['maxw']}px">{t}</h1>
<p class="r" style="margin-top:{s['gap']}px">{ref}</p>
{dust(s,h)}</div>'''
def dust(s,h):
    if not s['dust']:
        return f'''<p class="k" style="position:absolute;bottom:{s['pad']}px;left:{s['pad']}px;color:#ece5d8">Brother Jimi</p><p class="u" style="position:absolute;bottom:{s['pad']}px;right:{s['pad']}px">brotherjimi.com/counsel</p>'''
    d=s['dust']; band=s['band']
    return f'''<div class="paper" style="height:{band}px"></div><img class="dust" src="dust.jpg" style="bottom:{band-2}px;height:{d}px">
<p class="k" style="position:absolute;z-index:1;bottom:{s['pad']*0.7:.0f}px;left:{s['pad']}px;color:#0b0a09">Brother Jimi</p><p class="u" style="position:absolute;z-index:1;bottom:{s['pad']*0.7:.0f}px;right:{s['pad']}px;color:#4a443c">brotherjimi.com/counsel</p>'''
POST=dict(title=96,small=22,ref=34,pad=88,maxw=880,gap=44,dust=DUSTP,band=BANDP)
STATUS=dict(title=104,small=24,ref=36,pad=96,maxw=880,gap=48,dust=DUSTS,band=BANDS)
OG=dict(title=64,small=16,ref=24,pad=64,maxw=900,gap=28,dust=DUSTO,band=BANDO)
async def main(items):
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for slug,t,ref in items:
            for kind,(w,h,s) in {'post':(1080,1350,POST),'status':(1080,1920,STATUS),'og':(1200,630,OG)}.items():
                pg=await b.new_page(viewport={'width':w,'height':h})
                open(f'{slug}-{kind}.html','w').write(html(t,ref,w,h,s))
                await pg.goto(BASE+f'{slug}-{kind}.html'); await pg.evaluate('document.fonts.ready'); await pg.wait_for_timeout(150)
                await pg.screenshot(path=f'{slug}-{kind}.png'); await pg.close()
        await b.close()
asyncio.run(main(json.loads(sys.argv[1])))
