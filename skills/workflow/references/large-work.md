# Large work in detail

Goal: spend thinking where a wrong choice is costly (requirements, options, spec), save it where the work follows a plan (writing code), and never skip an owner gate.

## The steps

1. **Understand the request.** Read the code, look at the real thing, find causes. Output: a findings report with evidence (file:line, measurements). Mode: Plan.
2. **Options.** Groups of choices. For UI work, review the options against the layout and aesthetic rules of the project's UX principles before showing them. If the owner picks several options, merge them into one design; do not stack blocks. Mode: Plan. The owner chooses.
3. **Mockup (UI only).** Leave Plan, High effort. First fill a screen inventory per page (see `ui-gate.md`), then draw on the project's design system: all states, 375 and desktop widths, light and dark, the full page length, real content at its heaviest. The owner approves, possibly over several rounds. No code before approval.
4. **Spec, ADR, plan.** High effort. Spec in `docs/04-design/`, ADR in `docs/03-decisions/` for new decisions, plan for the first wave only in `docs/05-plans/`. Use Ultracode, if the owner turned it on, only for cross-reviewing the designs. For UI work the spec has an "Experience" section (`ui-gate.md`).
5. **Write code, one wave at a time.** Auto mode. Each task: one writer agent, one reviewer agent (`review.md`, `model-choice.md`). Commit per task. Run the project's test, typecheck and lint commands. UI tasks pass the screenshot gate.
6. **End-of-wave review.** Two passes over the whole branch (`review.md`). Fix defects and record them in the plan or progress log.
7. **Check in a browser or the running app.** Medium effort. Hand the owner: screenshots already self-reviewed and set beside the approved design, measurements, and the list of what could not be checked. The owner tries the branch.
8. **Ship.** Only when the owner says "ship to main". Add a CHANGELOG entry (changes, migrations, things the owner must do), update the status table in `docs/README.md` if a doc was added or changed state, run the size check (`token-saving.md`), push. The owner pulls.

## Plan mode cannot write files

Plan mode forbids writing, including specs and mockups. So steps 1-2 run in Plan; from step 3 leave Plan. Why: otherwise the work stalls on the first file write.

## Plan only one wave ahead

When a feature has several waves, write the plan for exactly one wave. Start the plan for wave N+1 only when wave N is nearly done: its pages exist and passed review, and only docs and the final review remain. Do not write plans two or more waves ahead.

Why: code keeps changing while a wave runs, so an early plan has to be rewritten, which costs time and tokens. Waiting a little is cheaper.

Exception: when two jobs are deliberately run in parallel (`parallel-work.md`), the plan of the second chosen wave may be written early.

## Ultracode: expensive, use it narrowly

Ultracode launches many agents and is very costly (drawing mockup screens used millions of tokens across agents). The owner turns it on; Claude reminds at steps 1-2.

Worth it for: step 1 (when there really are several directions), step 2, and cross-reviewing designs at step 4. Not worth it for: writing code, routine tasks, anything Medium or Small.

## Hard spots: use High effort when writing code

- Focus, keyboard handling, and library components with their own focus logic (menus, dialogs, popovers).
- Data sync, background jobs, queues.
- Migrations, access rules, secret keys.
- Operations that can lose data: delete, overwrite, publish-state changes.
- Performance: first-load bundle, heavy queries.

Why: these are the places where a plausible-looking wrong answer survives tests. Everything else follows the plan and runs at Medium.

## Effort per role (summary)

Writer: Medium (High on hard spots). Per-task reviewer: High. End-of-wave reviewer: highest. Plan writer: High. Always set effort explicitly per agent; do not inherit the session's level. Why: defects are caught at review; real bugs were found by reviewers that writer agents running at the highest effort had missed, so spend on review, not on writing. Models: `model-choice.md`.
