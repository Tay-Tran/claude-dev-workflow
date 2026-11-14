# Several big jobs in parallel

Run at most **2, at most 3** big jobs at once. Why: the owner must still approve and try each one, and tokens grow with the number of jobs.

## One session, one worktree, one branch per job

| Job | Claude session | Directory | Branch |
| --- | --- | --- | --- |
| Each wave or big job | its own session | its own worktree | its own branch |
| Main checkout | no work assigned | - | `main` |

- **A session is locked to its worktree:** subagents cannot write into another worktree. So parallel work needs a separate session per job; do not use one session to coordinate two worktrees. Claude cannot open a new session itself: it writes a `HANDOFF.md` in the progress-log folder, and the owner opens a new session on the right directory and pastes one opening sentence.
- A new session started in the main directory must enter the job's worktree **before doing anything**.
- **Never work directly in the main checkout** (read, pull, try only). Put half-written specs and notes on the branch of their job.
- Each session keeps its own progress log in `.superpowers/sdd/<plan-name>/` of its own directory. To agree on shared parts, sessions message each other and record the result in both logs.
- If the project has a dev server per checkout, give each job its own port, and no session stops another session's server.

## Reserve what collides

- **Migration numbers:** reserve a range per job when writing the plan. Migrations of parallel jobs must be independent: either order works. The owner still runs each file.
- **ADR numbers:** reserve ahead too. Check uncommitted files in the main directory as well.
- **Shared files** (navigation config, global styles, list registries, generated types): the plan states which job **owns** which part; the other job only adds. A new shared helper must be byte-identical on both branches.
- **Preflight:** before running in parallel, one agent scans **both plans** together and writes an "between the two" section into each job's `preflight.md`.

## Shipping

- Ship each job separately, on the owner's "ship to main". The job that ships later fetches, merges the new main into its branch, re-runs tests and build, and only then pushes (fast-forward).
- Ship waves early; do not keep branches alive for long. Why: shared files then conflict on merge.
- When a job is done: archive its session and remove its worktree, then open a fresh session for the next job (a fresh session costs less per turn than a long one).
- The "plan only one wave ahead" rule (`large-work.md`) is relaxed only for the wave chosen to run in parallel.
