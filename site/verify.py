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
    "assets/cities.js", "assets/letters.js",
    "assets/fonts/albert-sans-latin-wght-normal.woff2", "assets/fonts/libre-caslon-text-latin-400-italic.woff2", "assets/fonts/libre-caslon-text-latin-400-normal.woff2",
    "images/favicon.png", "images/apple-touch-icon.png",
    "images/film/dust-edge.jpg", "images/film/jimi-face.jpg", "images/film/key-art-760.jpg", "images/film/key-art-1200.jpg", "images/film/og-2.jpg", "images/film/og-accra-2.jpg", "images/film/og-partner.jpg", "images/film/trailer-poster.jpg",
    "images/counsel/counsel-og.jpg", "images/counsel/value-in-challenges-og.jpg", "images/counsel/value-in-challenges-post.jpg", "images/counsel/value-in-challenges-status.jpg",
    "images/counsel/warfare-and-salvation-og.jpg", "images/counsel/warfare-and-salvation-post.jpg", "images/counsel/warfare-and-salvation-status.jpg",
    "images/counsel/one-anothers-strength-og.jpg", "images/counsel/one-anothers-strength-post.jpg", "images/counsel/one-anothers-strength-status.jpg",
    "images/counsel/jesus-is-a-tomorrow-thinker-og.jpg", "images/counsel/jesus-is-a-tomorrow-thinker-post.jpg", "images/counsel/jesus-is-a-tomorrow-thinker-status.jpg",
    "images/counsel/do-you-want-to-speak-og.jpg", "images/counsel/do-you-want-to-speak-post.jpg", "images/counsel/do-you-want-to-speak-status.jpg",
    "images/counsel/your-future-has-to-move-into-you-og.jpg", "images/counsel/your-future-has-to-move-into-you-post.jpg", "images/counsel/your-future-has-to-move-into-you-status.jpg",
    "images/counsel/beyond-offence-there-god-is-og.jpg", "images/counsel/beyond-offence-there-god-is-post.jpg", "images/counsel/beyond-offence-there-god-is-status.jpg",
    "images/counsel/meditation-is-a-visit-with-him-og.jpg", "images/counsel/meditation-is-a-visit-with-him-post.jpg", "images/counsel/meditation-is-a-visit-with-him-status.jpg",
    "images/counsel/the-weapon-of-testimony-og.jpg", "images/counsel/the-weapon-of-testimony-post.jpg", "images/counsel/the-weapon-of-testimony-status.jpg",
    "images/counsel/gods-time-is-the-best-og.jpg", "images/counsel/gods-time-is-the-best-post.jpg", "images/counsel/gods-time-is-the-best-status.jpg",
    "images/partner/listening-phone.jpg", "images/partner/listening-wide.jpg",
    "index.html", "accra/index.html", "counsel/index.html", "counsel/value-in-challenges/index.html", "counsel/warfare-and-salvation/index.html", "counsel/one-anothers-strength/index.html", "counsel/jesus-is-a-tomorrow-thinker/index.html", "counsel/do-you-want-to-speak/index.html", "counsel/your-future-has-to-move-into-you/index.html", "counsel/beyond-offence-there-god-is/index.html", "counsel/meditation-is-a-visit-with-him/index.html", "counsel/the-weapon-of-testimony/index.html", "counsel/gods-time-is-the-best/index.html", "privacy/index.html", "partner/index.html", "404.html", "robots.txt",
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
