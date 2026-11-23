import re,json,urllib.parse,importlib.util,os
spec=importlib.util.spec_from_file_location('b','build.py'); b=importlib.util.module_from_spec(spec); spec.loader.exec_module(b)
s=open('/home/claude/film/site/counsel/value-in-challenges/index.html').read()
new=open('out/counsel/jesus-is-a-tomorrow-thinker/index.html').read()
s=s.replace(s[s.index('<style>')+7:s.index('</style>')], b.CSS)
url='https://brotherjimi.com/counsel/value-in-challenges'
desc="You see that situation that looks impossible? There is value in it. On trials, faith and James 1:2-3."
ld={"@context":"https://schema.org","@type":"Article","headline":"There is value in challenges","description":desc,
 "datePublished":"2026-11-21T05:00:00+00:00","image":"https://brotherjimi.com/images/counsel/value-in-challenges-og.jpg","mainEntityOfPage":url,
 "author":{"@type":"Person","name":"Brother Jimi","url":"https://brotherjimi.com/"},"publisher":{"@type":"Person","name":"Brother Jimi","url":"https://brotherjimi.com/"}}
s=s.replace('<style>','<script type="application/ld+json">'+json.dumps(ld,ensure_ascii=False)+'</script>\n<style>',1)
old='<meta name="description" content="You see that situation that looks impossible? There is value in it. Counsel from Brother Jimi.">'
assert old in s; s=s.replace(old,f'<meta name="description" content="{desc}">')
band=new[new.index('  <section class="bring"'):new.index('  </section>')+13]
k='  </article>\n\n  <div class="col">'; assert k in s
s=s.replace(k,'  </article>\n\n'+band+'\n\n  <div class="col">',1)
sc=new[new.index('/* Become an evangelist: the same engine'):new.index('</script>\n\n</body>')]
s=s.replace('<p><a href="/">Home</a></p><nav aria-label="More"><a href="/privacy">Privacy</a></nav>','<p><a href="/">Home</a></p><nav aria-label="More"><a data-next hidden></a><a href="/privacy">Privacy</a></nav>')
k2='</script>\n\n</body>'; assert k2 in s; s=s.replace(k2,sc+'</script>\n\n</body>',1)
assert s.count('type="button" data-status')==1 and s.count('type="button" data-send')==1
os.makedirs('out/counsel/value-in-challenges',exist_ok=True)
open('out/counsel/value-in-challenges/index.html','w').write(s)
print('ok')
