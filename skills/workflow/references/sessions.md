# Sessions: feature, wave, task

Every session re-reads its whole history on every turn. The longer it is, the more tokens it costs and the more old detail it forgets. So each level runs in its own place and logs progress in a file, never in Claude's memory.

| Level | Source of truth | Where it runs | Where progress is logged |
| --- | --- | --- | --- |
| Project | `docs/README.md`, `CHANGELOG.md`, Claude's memory | - | Status table in `docs/README.md` |
| Feature | Spec in `docs/04-design/` (with a table of waves and reserved migration numbers), ADRs | **One design session**: steps 1-4 (options, mockup, spec, plan of the first wave) | "Status" line of the spec |
| Wave | Plan in `docs/05-plans/` | **One session, one worktree, one branch per wave**: steps 5-7 | Progress log `.superpowers/sdd/<plan-name>/progress.md` |
| Task | Brief extracted from the plan | **One writer agent and one reviewer agent**, dispatched from the wave session | Line `Task N: complete` in the progress log, with the commit |

## Rules

- **A design session may be long**, because it ends in documents. When the plan is written, the first wave runs in a **new session**: it reads the spec, the plan and the progress log, and does not inherit the design history.
- **Each wave gets a fresh session.** Never stretch one session across waves. The handoff is one page: which plan, which worktree, which task to start with, the verdicts already in the progress log, and the exact spec sections to read. A mockup becomes a written screen inventory before it is handed to the coding session.
- **Switch session mid-wave only when no subagent is running**, because a subagent reports back only to the session that launched it. The new session reads the progress log and `git log` to see which tasks are done.
- **Archive long sessions when done**, so a child's report does not wake a long parent (each wake re-reads everything). If a child session is still running, detach it into an independent session first: archiving the parent also archives idle children with no PR, and archiving stops processes.
- **Never work directly in the main checkout.** Use it only to read, pull and try. Why: unfinished files left uncommitted in main cause conflicts on every pull. Put half-written specs or notes on the branch of the job they belong to.
- Start each wave's log from `docs/06-operations/progress-template.md` if present.
- Use `superpowers:using-git-worktrees` to create each wave's worktree and branch.
- With several features at once, group sessions by feature in the app's sidebar. Details: `parallel-work.md`.
- Measure: at the end of each wave log tokens per agent in the progress log. If a session cost an unusual amount, investigate its usage.
