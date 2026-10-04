---
name: agent-reach-mcp-setup
description: Agent Reach MCP installed and configured for web/YouTube access
metadata: 
  node_type: memory
  type: project
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

# Agent Reach MCP Setup

**Status:** Installed Sept 3, 2026

## What It Does

Agent Reach is an MCP (Model Context Protocol) server that gives Claude direct access to:
- Web pages (fetch & read URLs)
- YouTube videos (transcripts & content)
- Online resources (articles, docs, data)

No manual copy-paste needed — reference URLs directly in conversation.

## Installation

Already installed at: `~/agent-reach`

**Installation command (if needed):**
```bash
git clone https://github.com/Panniantong/agent-reach ~/agent-reach
cd ~/agent-reach
npm install
```

## Configuration

Registered in `~/.claude/mcp-settings.json`:
```json
"agentReach": {
  "command": "node",
  "args": ["~/agent-reach/dist/index.js"]
}
```

**Why:** The MCP server runs as a Node process that intercepts URL requests and fetches content cleanly.

## Usage Examples

- **Read a web article:** "Summarize: https://example.com/article"
- **Extract YouTube content:** "What's this video about: https://youtube.com/watch?v=xyz"
- **Research online:** "Pull the key points from: https://docs.example.com"

## When to Use

- **Feature research** — read product docs, competitor analysis
- **Content mining** — extract data from articles, tables, lists
- **Video analysis** — understand YouTube video content without watching
- **Monitoring** — track blog posts, news, competitor updates
- **Documentation** — read API docs, guides, technical specs directly

## Integration with Workflows

Agent Reach is particularly useful for:
1. **Testimonials workflows** — research customer case studies online
2. **Content generation** — pull inspiration from web sources
3. **Competitive analysis** — analyze competitor websites
4. **Data extraction** — pull structured info from tables/lists
5. **Video transcription** — understand YouTube content automatically

## Troubleshooting

**Not working after installation?**
- Verify `~/.claude/mcp-settings.json` has the entry
- Check `~/agent-reach` directory exists
- Restart Claude Code
- Run `npm install` in ~/agent-reach if needed

**Some URLs don't work?**
- Some sites block automated access (this is expected)
- YouTube videos without captions can't be transcribed
- Try fetching the main page instead of deep links

## Related Skills

- [[graphify]] — builds knowledge graphs of content
- [[higgsfield-generate]] — generates content based on web research
