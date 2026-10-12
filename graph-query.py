#!/usr/bin/env python3
"""Local graph query - zero token cost, completely offline."""
import json, sys
from pathlib import Path
from collections import defaultdict, deque

class CodeGraph:
    def __init__(self):
        data = json.loads(Path("graphify-out/graph.json").read_text())
        self.nodes = {n["id"]: n for n in data.get("nodes", [])}
        self.links = data.get("links", [])
        self.adj_out, self.adj_in = defaultdict(list), defaultdict(list)
        for link in self.links:
            s, t = link.get("source"), link.get("target")
            if s and t:
                rel = link.get("relation", "")
                self.adj_out[s].append((t, rel))
                self.adj_in[t].append((s, rel))
        print(f"✓ {len(self.nodes)} nodes, {len(self.links)} links")

    def find(self, q):
        q = q.lower()
        return [(nid, node) for nid, node in self.nodes.items() 
                if q in nid.lower() or q in node.get("label", "").lower()]

    def format_node(self, nid):
        if nid not in self.nodes: return f"❌ {nid}"
        node = self.nodes[nid]
        return f"📍 {node.get('label', nid)} ({node.get('community_name', 'Unknown')})"

g = CodeGraph()
print("\n" + "="*60)
print("BROTHERJIMI GRAPH QUERY — ZERO TOKENS, FULLY OFFLINE")
print("="*60)

if len(sys.argv) < 2:
    print("\nQueries:\n  find <term>  calls <node>  callers <node>  trace <from> <to>\n")
    print("Examples:\n  python3 graph-query.py find addSubscriber")
    print("  python3 graph-query.py callers addSubscriber")
    print("  python3 graph-query.py trace subscribe mailerlite\n")
    sys.exit(0)

cmd = sys.argv[1].lower()

if cmd == "find":
    m = g.find(" ".join(sys.argv[2:]))
    print(f"\n✓ {len(m)} nodes match:\n")
    for nid, node in m[:10]:
        print(f"  • {node.get('label', nid)}")
        print(f"    Community: {node.get('community_name')}\n")

elif cmd == "calls" and len(sys.argv) > 2:
    m = g.find(sys.argv[2])
    if not m: print("❌ Not found"); sys.exit(1)
    nid = m[0][0]
    print(f"\n{g.format_node(nid)}\n")
    calls = g.adj_out.get(nid, [])
    if not calls: print("  → Calls nothing")
    else:
        print(f"  → Calls {len(calls)} nodes:")
        for t, r in calls[:10]:
            label = g.nodes.get(t, {}).get('label', t)
            print(f"     • {label} [{r}]")

elif cmd == "callers" and len(sys.argv) > 2:
    m = g.find(sys.argv[2])
    if not m: print("❌ Not found"); sys.exit(1)
    nid = m[0][0]
    print(f"\n{g.format_node(nid)}\n")
    callers = g.adj_in.get(nid, [])
    if not callers: print("  ← Called by nothing")
    else:
        print(f"  ← Called by {len(callers)} nodes:")
        for s, r in callers[:10]:
            label = g.nodes.get(s, {}).get('label', s)
            print(f"     • {label} [{r}]")

elif cmd == "trace" and len(sys.argv) > 3:
    sm, em = g.find(sys.argv[2]), g.find(sys.argv[3])
    if not sm or not em: print("❌ Node not found"); sys.exit(1)
    start, end = sm[0][0], em[0][0]
    queue = deque([(start, [start])])
    visited = {start}
    path = None
    while queue and not path:
        node, p = queue.popleft()
        if node == end:
            path = p
            break
        for next_n, _ in g.adj_out.get(node, []):
            if next_n not in visited:
                visited.add(next_n)
                queue.append((next_n, p + [next_n]))
    if not path: print("❌ No path found"); sys.exit(1)
    print(f"\n📍 Data flow ({len(path)} nodes):\n")
    for i, nid in enumerate(path):
        label = g.nodes.get(nid, {}).get('label', nid)
        indent = "  " * i
        if i == len(path) - 1:
            print(f"{indent}└→ {label}")
        else:
            print(f"{indent}┌→ {label}")
