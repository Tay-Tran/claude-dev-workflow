# Review

Two layers: per task, then per wave. Models and effort for each: `model-choice.md`.

## Per task

- **One writer agent and one reviewer agent per task.** The reviewer is a separate fresh agent, never the writer. Why: a writer re-reads its own work as correct.
- The reviewer gets the task brief from the plan and the changed code. Tests, typecheck and lint must already pass.
- **UI tasks:** the reviewer also gets the screenshots from the screenshot gate (`ui-gate.md`) and reviews against the UX checklist. Why: the reviewer cannot see layout problems from code alone.
- Record the verdict as a line in the progress log (`.superpowers/sdd/<plan-name>/progress.md`), with the commit.
- After 3 failed fix rounds, move the writer to the strongest model.

## End of wave: two passes over the whole branch

Why two: the first is cheap and wide for correctness; the second is one expensive reader for what only a deep read finds (spec compliance, security, things the spec never mentioned).

1. **`/code-review high`** over the whole branch: errors of correctness.
2. **ONE agent on the strongest model at maximum effort.** It reads the whole branch for:
   - compliance with the spec;
   - **security**, following the security section of the project's pre-ship checklist (if any) and the OWASP Top 10;
   - things the spec does not mention at all.

   It receives the `/code-review` results and the small-defect lines already logged, records its verdicts in the progress log, and does not re-review what the first pass already covered.

Fix the defects and note them in the plan. If `/code-review` can only be invoked by the owner, remind the owner; if it can be run by Claude, run it.

Use `superpowers:requesting-code-review` for the dispatch mechanics.

## Keep it proportionate

Medium tasks get scoped, time-boxed reviewers. Never cut the strongest-model review on tasks that write data, locks or security.
