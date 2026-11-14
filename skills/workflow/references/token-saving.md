# Saving tokens

Every turn Claude re-reads the whole session context, so tokens go into what must be read, not into answers. In the source project a spec grew to hundreds of KB and every session paid to read it.

## Size caps

| File | Cap |
| --- | --- |
| `CLAUDE.md` | 2.5 KB |
| Short process doc loaded every session | 3 KB |
| Memory index (one line per entry, about 150 chars) | keep short; details live in each entry's file |
| New spec | about 60 KB; one file per feature or large wave; do not append sections to a big file |
| Spec already past 100 KB | split before opening a new wave |
| Plan main file | about 40 KB, hand-over text only |
| `CHANGELOG.md` | 200 KB |

If the project installed `npm run check:docs`, run it before shipping. If not, check the sizes by hand (`ls -l` or `wc -c`).

## Rules

- **Small always-loaded docs.** CLAUDE.md is short and points to the skill for detail. Why: it is paid for on every turn of every session.
- **Specs have a cap.** When a wave is done, write its "differs from design" notes in an appendix `…-differs-from-design.md` next to the spec, not in the main spec.
- **Read only the part you need.** `grep -n "^## "` for the headings, then read by line range. Filter long command output with `head`, `tail`, `grep`.
- **Wide scans, inventories and searches for old wording go to a cheaper agent** that returns only the conclusion. Never a "fork" agent (it carries the whole context).
- **Keep the beginning of the context stable.** Do not edit CLAUDE.md, the memory index or loaded docs mid-session unless needed: changing the start forces a re-read at full price.
- **Run long jobs in the background** and wait for the notification; do not ask for tiny updates.
- **Hand over in one page.** A new session gets: which plan, decisions already made, the exact spec sections to read. It does not re-read history. Finished sessions are archived (`sessions.md`). A mockup is turned into a written screen inventory before it is handed to the coding session.
- **Screenshots** only at the screenshot gate, only the widths needed; one block means crop, not a full-page shot.
- **Measure:** at the end of a wave log tokens per agent in the progress log. For an unusually expensive session, check where its tokens went.

## Saving by kind of work

Each line has a condition; if it does not hold, skip the line.

- **Every plan:** main file up to about 40 KB, hand-over text only. Pre-written code (SQL, pure modules, tests) goes in a **companion file** with the plan's name; each task's agent reads the companion part for its task. The plan's model table has a task type "copy" for tasks that only copy a companion file.
- **When the plan has pre-written code:** a "copy" task needs no writer agent. The controller copies it by command, runs tests, replays SQL if needed, compares bytes with the companion file. Whatever still needs thinking (types, error names, docs) goes to one cheaper-model agent. Review: cheaper model Medium, checking only function names, RPC arguments and wording against the spec (the code was already reviewed when the plan was written).
- **Waves with a migration:** replaying the SQL on a scratch database, including a deliberate-failure test, is mandatory **when writing the plan**. When running the wave, replay only if a newer migration touching the same tables landed after the plan was written; otherwise log "used result from plan time". Claude may run the migration for the owner, following the project's migration doc, only when the owner asks.
- **UI waves:** self-check with half-scale screenshots and read text from the accessibility tree; only the shots set beside the design at the screenshot gate are full size, saved as files for the reviewer.
- **Orchestrating session (any wave with subagents):** prompt templates, shared rules, reports and diffs are files in the progress-log folder. Agents read files; the controller gets one short status line. When waiting for an agent, say one line. Questions about the process go to their own session, not into the orchestrating session.

## Never cut

The strongest-model High reviewer on tasks that write data, locks or security; deliberate-failure tests; the screenshot gate before saying "done"; the owner trying the branch.
