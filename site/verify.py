#!/usr/bin/env python3
"""Design lock for brotherjimi.com.

Run:  python3 verify.py          -> checks every locked file; exits 1 on ANY change.
      python3 verify.py --lock   -> (Jimi only) re-records the lock after an approved design change.

What is locked: the stylesheet, the front-end script, the images, and every page's HTML.
What may change: assets/config.js (endpoints) and the content inside elements marked
data-slot="..." on /today (date, subject, body, share text), which the back end fills daily.
"""
import hashlib, json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
LOCK = ROOT / "design-lock.json"
FILES = [
    "assets/styles.css", "assets/site.js",
    "images/bible-hero.jpg", "images/jimi-avatar.jpg",
    "index.html", "today/index.html", "start/index.html",
    "welcome/index.html", "welcome/received/index.html", "partner/index.html",
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
        return f'<{tag}{attrs} data-slot="{name}"></{tag}>'
    text = SLOT.sub(blank, text)
    text = re.sub(r'(<a[^>]*?)\sdata-wa="[^"]*"([^>]*data-slot="share")', r'\1 data-wa=""\2', text)
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
