# dev-workflow

A Claude Code plugin for a staged, owner-approved way of working. It grew out of building a real product solo with Claude Code. Every rule is here because skipping it once cost time, tokens or a broken release.

**In one paragraph:** Claude sizes every request (Large / Medium / Small) in its first reply. Large work goes through options → mockup → spec → plan, with the owner approving each gate. Code is written wave by wave, each wave in a fresh session with its own worktree and branch, and each task gets one writer agent and one reviewer agent. Models are picked by the cost of a mistake. UI work is not "done" until real pages have been screenshotted with the heaviest real content. Docs that load every session stay small.

## What you get

| Piece | What it does |
| --- | --- |
| `/dev-workflow:init-workflow` | Sets up a project: a short process snippet in `CLAUDE.md` (≤ 2.5 KB, loaded every session), the `docs/00–09` layout, `CHANGELOG.md`, a progress-log template, and, optionally, UI templates (screen inventory, UX checklist) and a doc-size check script. It asks before it writes and never overwrites a file (it only appends a marked block to `CLAUDE.md`, replaces that block with your consent, and adds one `check:docs` script key). |
| `workflow` skill | The full process reference: steps, sessions, model choice, review, screenshot gate, token savings, parallel work. Claude loads it when it needs it, so it costs almost nothing per session. You can also call `/dev-workflow:workflow`. |

## Requirements

- Claude Code with plugin support.
- The **superpowers** plugin (brainstorming, writing-plans, subagent-driven-development, git worktrees). It is declared as a dependency and installed with this plugin.
- Optional: `/code-review` (end-of-wave review) and Ultracode (only for the options and spec cross-check steps of Large work).
- Optional for UI projects: Playwright with real Chrome, for screenshots.

## Install

In Claude Code:

```
/plugin marketplace add Tay-Tran/claude-dev-workflow
/plugin install dev-workflow@dev-workflow-marketplace
```

Then, in each project where you want the process:

```
/dev-workflow:init-workflow
```

Update later with `/plugin` → Marketplaces → Update, or `claude plugin update dev-workflow@dev-workflow-marketplace`.

## How a feature runs

1. **Design session** (one per feature): understand the request, propose options (owner picks), mockup (owner approves), spec and a plan for the first wave only.
2. **Wave session** (fresh session, own worktree and branch, for each wave): tasks run with one writer and one reviewer agent each; progress goes to `.superpowers/sdd/<plan>/progress.md`, not to Claude's memory.
3. **End of wave**: two review passes over the whole branch, then the screenshot gate for UI changes, then the owner tries the branch.
4. **Ship to main** only when the owner says so: CHANGELOG entry, docs index updated.

Details and the reason behind each rule: `skills/workflow/`.

## Customising

The snippet in your `CLAUDE.md` sits between `<!-- dev-workflow:start -->` and `<!-- dev-workflow:end -->`. Edit it freely: it is yours after setup. Keep it under 2.5 KB, because it loads in every session.

## License

MIT
