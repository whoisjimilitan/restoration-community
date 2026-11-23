"""Build counsel letter pages from the letter dicts. Template = the live value-in-challenges page plus the agreed share band."""
import re, json, html, datetime as dt, urllib.parse, sys
E=lambda s: html.escape(s, quote=True)
SRC=open('/home/claude/film/site/counsel/value-in-challenges/index.html').read()
HEAD_CSS=SRC[SRC.index('<style>')+7:SRC.index('</style>')]
SHARE_CSS='''
/* Become an evangelist: the same three-step engine as /accra, on the band where readers act */
.bring{background:var(--band)}
.bring .in{display:flex;flex-direction:column;gap:16px;padding-top:56px;padding-bottom:56px}
.bring h2{margin:0;font:400 28px/1.2 var(--sans);letter-spacing:-.02em}
.plain{color:var(--ink-2)}
.ways{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:10px}
.ways button{display:grid;grid-template-columns:32px minmax(0,1fr) 20px;gap:14px;align-items:center;width:100%;min-height:64px;padding:12px 16px;border:1px solid var(--ink-2);box-shadow:0 1px 0 rgba(11,10,9,.10);border-radius:4px;background:var(--field);color:var(--ink);text-align:left;cursor:pointer;font:500 17px/1.3 var(--sans);transition:border-color .2s,background .2s}
.ways button:hover{border-color:var(--ink-2)}
.ways .n{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;border:1px solid var(--ink-2);font:600 14px/1 var(--sans);color:var(--ink);font-variant-numeric:tabular-nums}
.ways svg{width:18px;height:18px;color:var(--ink);transition:transform .2s}
.ways button:hover svg{transform:translateX(3px)}
.ways .done button{background:var(--paper)}
.ways .done .n{background:var(--ink) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4 8-9' fill='none' stroke='%23ece5d8' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/18px no-repeat;border-color:var(--ink);color:transparent}
.tally{margin-top:2px;font-weight:600}
.on{margin-top:16px;font-size:15px;color:var(--ink-2)}
.copied{min-height:1.4em;font-size:14px;color:var(--dim)}
.copied:empty{min-height:0}
.icons{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}
.icons a,.icons button{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--ink-2);background:var(--field);color:var(--ink);cursor:pointer;transition:border-color .15s}
.icons a:hover,.icons button:hover{border-color:var(--ink)}
.icons svg{width:18px;height:18px}
.next{padding-top:48px}
.btn.wa{gap:10px;text-align:center}.btn.wa svg{width:19px;height:19px;flex:none}
.foot .back svg{display:inline-block;width:15px;height:15px;margin-right:8px;vertical-align:-2px}
'''
EXTRA='/* The hero: no picture. The night with one faint shaft of light, crossed by a softer glow, as on /accra; the title in Caslon */\n.dark{position:relative;overflow:hidden;isolation:isolate}\n.dark::before{content:"";position:absolute;z-index:-1;pointer-events:none;inset:-10% -10% -40% auto;width:min(70vw,780px);\n  background:\n    radial-gradient(ellipse 46% 7% at 58% 38%,rgba(236,229,216,.10),rgba(236,229,216,0) 70%),\n    linear-gradient(90deg,rgba(236,229,216,0) 52%,rgba(236,229,216,.09) 57.5%,rgba(236,229,216,.13) 58%,rgba(236,229,216,.09) 58.5%,rgba(236,229,216,0) 64%);\n  -webkit-mask:linear-gradient(180deg,rgba(0,0,0,.2),#000 25%,#000 55%,rgba(0,0,0,0) 80%);mask:linear-gradient(180deg,rgba(0,0,0,.2),#000 25%,#000 55%,rgba(0,0,0,0) 80%);\n  transform:rotate(8deg);transform-origin:top right}\n.dark .kicker{padding-top:calc(48px + env(safe-area-inset-top))}\n.dark h1{margin:0;padding-top:min(28vh,200px);font:400 clamp(40px,11vw,60px)/1.1 "Caslon",Georgia,serif;letter-spacing:-.012em;color:var(--bone);text-wrap:balance}\n.dark .hr{margin:18px 0 0;padding-bottom:56px;font:400 18px/1 "Caslon",Georgia,serif;font-variant:small-caps;letter-spacing:.08em;color:var(--soft)}\n/* BOOK: Jimi\'s words are set in Caslon, the typeface the site already gives a real person speaking.\n   Everything you act on stays in Albert Sans. Only what a book does for reading: the serif, the indent, the quiet page. */\n@font-face{font-family:"Caslon";src:url(/assets/fonts/libre-caslon-text-latin-400-normal.woff2) format("woff2");font-weight:400;font-style:normal;font-display:swap}\n@font-face{font-family:"Caslon";src:url(/assets/fonts/libre-caslon-text-latin-400-italic.woff2) format("woff2");font-weight:400;font-style:italic;font-display:swap}\n.letter{display:block;font:400 19px/1.7 "Caslon",Georgia,serif;color:#1d1a16;padding-top:48px}\n.letter p{margin:0;text-indent:1.3em}\n.letter .open{font:400 21px/1.55 "Caslon",Georgia,serif;letter-spacing:0;text-indent:0;margin-bottom:6px}\n.letter .verse{font-style:italic;line-height:1.6;text-indent:0;margin:24px 0;padding:0 0 0 1.2em}\n.letter .verse+p{text-indent:0}\n.letter .ref{font-style:normal;font-variant:small-caps;letter-spacing:.06em;font-size:16px;margin-top:8px;color:var(--ink-2)}\n.letter .today{margin-top:28px;text-indent:0}\n.letter .today b{font-weight:400;font-variant:small-caps;letter-spacing:.06em;font-size:1.05em}\n'
CSS=HEAD_CSS.replace('--night:#0b0a09;','--night:#0b0a09; --band:#ebe3d5; --field:#fbf8f2;')+SHARE_CSS+EXTRA
CHANNEL='https://whatsapp.com/channel/0029VbCgjedBA1f6YQ0DvB3s'
def mk(s): return E(re.sub(r'\{\{|\}\}','',s)).replace('&#x27;','&rsquo;')
def smart(s): return s
def long_date(d): return f'{d.day} {d.strftime("%B")} {d.year}'
def page(l):
    d=dt.date.fromisoformat(l['date']); slug=l['slug']; t=l['title']; url=f'https://brotherjimi.com/counsel/{slug}'
    og=f'https://brotherjimi.com/images/counsel/{slug}-og.jpg'
    verse=[x for x in l['body'] if not isinstance(x,str)][0]
    hook=l.get('hook') or re.sub(r'\{\{|\}\}','',next(x for x in l['body'] if isinstance(x,str)))
    body=[]; first=True
    for x in l['body']:
        if isinstance(x,str):
            body.append(f'<p{" class=\"open\"" if first else ""}>{mk(x)}</p>'); first=False
        else:
            body.append(f'<p class="verse">{mk(x[0])}<span class="ref">{E(x[1])}</span></p>')
    ld={"@context":"https://schema.org","@type":"Article","headline":t,"description":l['desc'],
        "datePublished":f"{l['date']}T05:00:00+00:00","image":og,"mainEntityOfPage":url,
        "author":{"@type":"Person","name":"Brother Jimi","url":"https://brotherjimi.com/"},
        "publisher":{"@type":"Person","name":"Brother Jimi","url":"https://brotherjimi.com/"}}
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{E(t)} · Brother Jimi</title>
<meta name="description" content="{E(l['desc'])}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Brother Jimi">
<meta property="og:title" content="{E(t)}">
<meta property="og:description" content="{E(hook)}">
<meta property="og:url" content="{url}">
<link rel="canonical" href="{url}">
<meta property="og:image" content="{og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f4efe6">
<link rel="icon" href="/images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/albert-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/libre-caslon-text-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">{json.dumps(ld,ensure_ascii=False)}</script>
<style>{CSS}</style>
</head>
<body>

<main>
  <article aria-labelledby="t">
    <div class="dark">
      <div class="col">
        <p class="kicker wrap"><time datetime="{l['date']}">{long_date(d)}</time></p>
        <h1 class="wrap" id="t">{E(t)}</h1>
        <p class="hr wrap">{E(verse[1])}</p>
      </div>
    </div>
    <img class="dust" src="/images/film/dust-edge.jpg" alt="" width="2400" height="560">
    <div class="col">
    <div class="letter wrap">
      {chr(10).join('      '+b if i else b for i,b in enumerate(body))}
      <p class="today"><b>Today, say:</b> {mk(l['pray'])}</p>
    </div>
    </div>
  </article>

  <section class="bring" aria-labelledby="bring-title">
    <div class="col"><div class="in wrap">
      <h2 id="bring-title">Become an evangelist.</h2>
      <p class="plain">This letter goes as far as you share it.<br>Each one takes a moment.</p>
      <ol class="ways">
        <li><button type="button" data-send><span class="n">1</span><span>Send it to someone</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></li>
        <li><button type="button" data-status><span class="n">2</span><span>Post it to my Status</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></li>
        <li><button type="button" data-pastor><span class="n">3</span><span>Send it to my pastor</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></li>
      </ol>
      <p class="tally" data-tally aria-live="polite">0 of 3 done</p>
      <p class="on">Then share it everywhere else</p>
      <div class="icons">
        <a data-share="whatsapp" target="_blank" rel="noopener" aria-label="Share on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 19.5l1.2-3.6A7.8 7.8 0 1 1 8.4 18.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></a>
        <a data-share="facebook" target="_blank" rel="noopener" aria-label="Share on Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2V5h-2.4C11 5 10 6.6 10 8.8V10.5H8V14h2v6h3.5v-6H16l.5-3.5h-3V9.3c0-.5.3-.8.5-.8z" fill="currentColor"/></svg></a>
        <a data-share="telegram" target="_blank" rel="noopener" aria-label="Share on Telegram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 4.5L3.5 11.3l5.3 1.9m11.7-8.7l-3 14.5-6.2-4.6m9.2-9.9L8.8 13.2l1.5 5.3 2-3.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg></a>
        <a data-share="x" target="_blank" rel="noopener" aria-label="Share on X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></a>
        <a data-share="email" target="_blank" rel="noopener" aria-label="Share on Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></a>
        <button type="button" data-copy aria-label="Copy link"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
      </div>
      <p class="copied" data-copied aria-live="polite"></p>
    </div></div>
  </section>

  <div class="col">
  <div class="next wrap">
    <a class="btn wa" href="{CHANNEL}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 19.5l1.2-3.6A7.8 7.8 0 1 1 8.4 18.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>Get tomorrow&rsquo;s letter from Brother Jimi</a>
  </div>

  <footer class="wrap foot">
    <p><a class="back" href="/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Brother Jimi</a></p><nav aria-label="More"><a data-next hidden></a><a href="/privacy">Privacy</a></nav>
  </footer>
  </div>
</main>

<script src="/assets/letters.js"></script>
<script>
/* Before its morning, a letter is not shown: send the reader to today's */
(function(){{ var me=document.querySelector('time[datetime]'), t=window.todaysLetter&&window.todaysLetter();
  if(me&&t&&me.getAttribute('datetime')>t.date) location.replace('/counsel/'+t.slug); }})();
/* Become an evangelist: the same engine as /accra. Nothing is sent anywhere but where the reader chooses. */
(function(){{
  var $=function(q){{return document.querySelector(q)}}, $$=function(q){{return [].slice.call(document.querySelectorAll(q))}};
  var title=document.querySelector('h1').textContent, url=document.querySelector('link[rel=canonical]').href, enc=encodeURIComponent;
  var msg=title+'\\n'+url, pastor='I thought this might be for you. '+url, copied=$('[data-copied]');
  var links={{
    whatsapp:'https://wa.me/?text='+enc(msg),
    facebook:'https://www.facebook.com/sharer/sharer.php?u='+enc(url),
    telegram:'https://t.me/share/url?url='+enc(url)+'&text='+enc(title),
    x:'https://twitter.com/intent/tweet?text='+enc(msg),
    email:'mailto:?subject='+enc(title)+'&body='+enc(msg)
  }};
  $$('[data-share]').forEach(function(a){{ a.href=links[a.getAttribute('data-share')]; }});
  function copy(text,done){{
    if(navigator.clipboard&&navigator.clipboard.writeText){{ navigator.clipboard.writeText(text).then(function(){{ copied.textContent=done; }},function(){{ copied.textContent=text; }}); }}
    else copied.textContent=text;
  }}
  $('[data-copy]').addEventListener('click',function(){{ copy(url,'Link copied.'); }});
  function send(text){{
    if(navigator.share){{ navigator.share({{text:text}}).catch(function(){{}}); }}
    else window.open('https://wa.me/?text='+enc(text),'_blank','noopener');
  }}
  $('[data-send]').addEventListener('click',function(){{ send(msg); }});
  $('[data-pastor]').addEventListener('click',function(){{ send(pastor); }});
  /* Status: hand the letter's picture to the phone's share sheet, or save it */
  $('[data-status]').addEventListener('click',function(){{
    var src='/images/counsel/'+location.pathname.split('/').filter(Boolean).pop()+'-status.jpg', name=src.split('/').pop();
    fetch(src).then(function(r){{ return r.blob(); }}).then(function(blob){{
      var file=new File([blob],name,{{type:'image/jpeg'}});
      if(navigator.canShare&&navigator.canShare({{files:[file]}})){{ navigator.share({{files:[file]}}).catch(function(){{}}); return; }}
      var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){{ URL.revokeObjectURL(a.href); }},4000);
    }}).catch(function(){{ location.href=src; }});
  }});
  /* The tasks tick off as they are done. Sending to a pastor is remembered on the reader's own phone
     (nothing is sent anywhere), so a returning reader finds it already ticked and has two left. */
  var tally=$('[data-tally]');
  function count(){{ var n=$$('.ways .done').length; tally.textContent=n<3?n+' of 3 done':'All three done. Thank you, evangelist.'; }}
  try{{ if(localStorage.getItem('counsel-pastor')==='1') $('[data-pastor]').parentNode.classList.add('done'); }}catch(e){{}}
  count();
  $('[data-pastor]').addEventListener('click',function(){{ try{{ localStorage.setItem('counsel-pastor','1'); }}catch(e){{}} }});
  $$('.ways button').forEach(function(b){{ b.addEventListener('click',function(){{ b.parentNode.classList.add('done'); count(); }}); }});
  /* The coming city, set once in letters.js, so old letters never go out of date */
  var nx=$('[data-next]'), ev=window.NEXT_ENCOUNTER;
  if(nx&&ev&&ev.label&&!(ev.until&&new Date().toISOString().slice(0,10)>ev.until)){{ nx.textContent=ev.label; nx.href=ev.href; nx.hidden=false; }}
}})();
</script>

</body>
</html>
'''
if __name__=='__main__':
    import os
    exec(open('week1.py').read()); exec(open('moves.py').read()); exec(open('vic.py').read()); exec(open('hooks.py').read())
    D=json.load(open('desc.json'))
    for l in L:
        l['desc']=D[l['slug']]
        os.makedirs(f'out/counsel/{l["slug"]}',exist_ok=True)
        open(f'out/counsel/{l["slug"]}/index.html','w').write(page(l))
    print('built',len(L))
