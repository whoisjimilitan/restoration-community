"""Writes site/sitemap.xml: the main pages plus every counsel letter whose morning has arrived.
Letters before their date stay out, so Google never meets a letter that is not live yet.
Run daily just after 05:00 UTC (5 a.m. Accra) by .github/workflows/sitemap.yml."""
import re, datetime, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
js = (root/'site/assets/letters.js').read_text(encoding='utf-8')
today = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=5)).date().isoformat()
letters = [(d, s) for d, s in re.findall(r'date:\s*"(\d{4}-\d{2}-\d{2})",\s*slug:\s*"([^"]+)"', js) if d <= today]
pages = [('https://brotherjimi.com/', None), ('https://brotherjimi.com/accra', None), ('https://brotherjimi.com/privacy', None)]
pages += [(f'https://brotherjimi.com/counsel/{s}', d) for d, s in letters]
rows = ''.join(f'  <url><loc>{u}</loc>' + (f'<lastmod>{d}</lastmod>' if d else '') + '</url>\n' for u, d in pages)
xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + rows + '</urlset>\n'
out = root/'site/sitemap.xml'
if not out.exists() or out.read_text(encoding='utf-8') != xml:
    out.write_text(xml, encoding='utf-8'); print('sitemap updated:', len(pages), 'pages')
else:
    print('sitemap unchanged')
