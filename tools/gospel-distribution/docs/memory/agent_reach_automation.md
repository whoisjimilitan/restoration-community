---
name: agent-reach-automation
description: Automation setup to make Agent Reach available by default in all projects
metadata: 
  node_type: memory
  type: reference
  originSessionId: 8d24422f-6d6b-4792-9952-d6e71877bfae
---

# Agent Reach Automation Setup

Configures Agent Reach to be available automatically in all Claude Code sessions, so you can access web/YouTube content without manual setup.

## Installation Checklist

### 1. Global Agent Reach Installation (Done ✓)

```bash
git clone https://github.com/Panniantong/agent-reach ~/agent-reach
cd ~/agent-reach
npm install
```

Location: `~/agent-reach`

### 2. Update Global MCP Settings

Edit `~/.claude/mcp-settings.json` to include Agent Reach:

```json
{
  "mcpServers": {
    "claude-flow": {
      "command": "npx",
      "args": ["claude-flow@latest", "mcp", "start"],
      "env": {
        "CLAUDE_FLOW_MEMORY_DIR": "~/.claude/flow-memory",
        "CLAUDE_FLOW_MODE": "hierarchical"
      }
    },
    "agentReach": {
      "command": "node",
      "args": ["~/agent-reach/dist/index.js"]
    }
  },
  "settings": {
    "autoStartMCP": true,
    "tokenOptimization": true,
    "modelRouting": "auto",
    "maxConcurrentAgents": 8,
    "memoryCompression": true
  }
}
```

### 3. Optional: Add to Project CLAUDE.md

In any project's `CLAUDE.md`, reference Agent Reach:

```markdown
## Agent Reach Integration

Agent Reach is installed globally and available for:
- Fetching web pages: `/fetch [URL]`
- YouTube content: `/youtube [URL]`
- Web research: `/research [topic] at [URL]`

See `~/.claude/skills/agent-reach/SKILL.md` for full usage.
```

### 4. Optional: Create Pre-Session Hook

To auto-verify Agent Reach is available, add to `.claude/hooks/session-start.sh`:

```bash
#!/bin/bash
# Verify Agent Reach is installed
if [ ! -d "$HOME/agent-reach" ]; then
  echo "⚠️  Agent Reach not found. Install with: git clone https://github.com/Panniantong/agent-reach ~/agent-reach"
  exit 1
fi

echo "✓ Agent Reach ready"
```

## Usage After Setup

Once configured, you can:

### In Any Project
```
Access this webpage: https://example.com
What's in this video: https://youtube.com/watch?v=xyz
Research X on: https://docs.example.com
```

### For Research Workflows
```
Pull customer case studies from: [URL]
Extract testimonials from: [URL]
Summarize competitor features from: [URL]
```

### For Content Work
```
Get YouTube transcript for: [URL]
Extract key quotes from: [URL]
Pull data from: [URL]
```

## Verification

To test Agent Reach is working:

```bash
cd ~/agent-reach && npm run test
```

Or in Claude:
```
Test Agent Reach with: https://example.com
```

## Updating Agent Reach

To get the latest version:

```bash
cd ~/agent-reach
git pull origin main
npm install
```

## Troubleshooting

**Agent Reach not appearing in new projects:**
- Verify `~/.claude/mcp-settings.json` has the configuration
- Restart Claude Code completely
- Check `~/agent-reach` directory exists

**MCP not loading:**
- Run `npm install` in `~/agent-reach`
- Verify Node.js is installed: `node --version`
- Check for errors: `cat ~/.claude/logs/` (if logs exist)

**Specific URLs don't work:**
- Some sites block bot access (expected)
- YouTube videos need captions enabled for transcripts
- Try the home page instead of deep links

## Related Skills & Automations

- [[graphify]] — builds knowledge graphs from content
- [[agent-reach]] — the skill documentation
- [[higgsfield-generate]] — generate content from research
