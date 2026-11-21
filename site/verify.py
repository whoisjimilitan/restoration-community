#!/usr/bin/env python3
"""Design lock for brotherjimi.com.

Run:  python3 verify.py          -> checks every locked file; exits 1 on ANY change.
      python3 verify.py --lock   -> (Jimi only) re-records the lock after an approved design change.

What is locked: the stylesheet, the front-end script, the fonts, the images, and every page's HTML.
What may change: assets/config.js (endpoints) and the content inside elements marked
data-slot="..." on /today (topic, date, question, subject, body, action), which the back end fills daily, and the daily
data file today/today.json (not locked).
"""
import hashlib, json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
LOCK = ROOT / "design-lock.json"
FILES = [
    "assets/cities.js",
    "assets/fonts/albert-sans-latin-wght-normal.woff2", "assets/fonts/libre-caslon-text-latin-400-italic.woff2",
    "images/favicon.png", "images/apple-touch-icon.png",
    "images/film/dust-edge.jpg", "images/film/jimi-face.jpg", "images/film/key-art-760.jpg", "images/film/key-art-1200.jpg", "images/film/og.jpg", "images/film/og-accra.jpg", "images/film/og-partner.jpg", "images/film/trailer-poster.jpg",
    "images/counsel/value-in-challenges-og.jpg", "images/counsel/value-in-challenges-post.jpg",
    "images/partner/listening-phone.jpg", "images/partner/listening-wide.jpg",
    "index.html", "accra/index.html", "counsel/index.html", "privacy/index.html", "partner/index.html", "404.html",
    "video/hero-loop.mp4", "video/brother-jimi-trailer.mp4",
]
SLOT = re.compile(r'<(\w+)([^>]*?)\sdata-slot="(\w+)"([^>]*)>(.*?)</\1>', re.S)

def normalise(path: str, data: bytes) -> bytes:
    if not path.endswith(".html"):
        return data
    text = data.decode("utf-8")
    def blank(m):
        tag, pre, name, post, _inner = m.groups()
        attrs = (pre + post)
        attrs = re.sub(r'\sdata-wa="[^"]*"', ' data-wa=""', attrs)
        attrs = re.sub(r'\s(data-topic|href)="[^"]*"', r' \1=""', attrs)
        return f'<{tag}{attrs} data-slot="{name}"></{tag}>'
    text = SLOT.sub(blank, text)
    text = re.sub(r'(<a[^>]*?)\sdata-wa="[^"]*"([^>]*data-slot="share")', r'\1 data-wa=""\2', text)
    text = re.sub(r'\s(data-env|data-len)="[^"]*"', r' \1=""', text)  # the welcome voice note (tools/set-welcome-voice.py)
    return text.encode("utf-8")

def digest(path: str) -> str:
    return hashlib.sha256(normalise(path, (ROOT / path).read_bytes())).hexdigest()

def main():
    if "--lock" in sys.argv:
        LOCK.write_text(json.dumps({p: digest(p) for p in FILES}, indent=2) + "\n")
        print(f"Locked {len(FILES)} files.")
        return
    lock = json.loads(LOCK.read_text())
    failed = []
    for p in FILES:
        if not (ROOT / p).exists():
            failed.append(f"MISSING  {p}")
        elif digest(p) != lock.get(p):
            failed.append(f"CHANGED  {p}")
    if failed:
        print("DESIGN LOCK FAILED. These files no longer match the approved design:")
        print("\n".join("  " + f for f in failed))
        print("\nUndo these changes. Design changes need Jimi's approval and a new lock.")
        sys.exit(1)
    print(f"Design lock OK: all {len(FILES)} files match the approved design.")

if __name__ == "__main__":
    main()
