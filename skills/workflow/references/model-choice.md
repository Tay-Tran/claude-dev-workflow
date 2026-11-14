# Choosing model and effort for subagents

Always set the model and effort of each subagent explicitly. Do not let them inherit the session's level (often the highest). Model names age, so this file says "cheaper model (e.g. Sonnet)" and "strongest model (e.g. Opus)".

**Principle:** choose by the cost of a mistake, not by how hard the task feels. Why: most important bugs came from the plan, not from the model that wrote the code, and a reviewer catches what a writer at maximum effort misses. So spend on review.

## Effort per role

| Role | Effort |
| --- | --- |
| Writer agent | Medium; High on hard spots (`large-work.md`) |
| Per-task reviewer | High |
| End-of-wave reviewer | Highest (`review.md`) |
| Plan writer | High |

## Writer: model by cost of a mistake

| Kind of task | Model · effort |
| --- | --- |
| Copy code that already exists in the plan; UI following a template; simple wording | Cheaper model · Medium |
| Many files, or a new interaction (filtering, keyboard, focus, drag and drop) | Cheaper model · High |
| A mistake loses data or opens a hole: delete/restore, undo, optimistic locks, sync, queues, newly written migrations, access rules, privileged keys, checks on uploaded files | Strongest model · High (Medium when the code is fully written in the plan) |

Finding from trials: a cheaper model at Medium is enough for tasks whose code is already written in the plan. Put the model in a column of the plan's task table, with a task type "copy" for tasks that only copy a companion file.

## Reviewer

| Task | Reviewer |
| --- | --- |
| Copy tasks | Cheaper model · High |
| Everything else | Strongest model · High, time-boxed (give it a scope and a time limit) |
| End of wave | Two passes, see `review.md` |

Why time-box: unbounded reviews on Medium tasks cost more than the task. Keep the review proportionate.

## Escalation

After **3 failed fix rounds** (the reviewer keeps rejecting), switch the writer to the strongest model.

## Never

- Never use a "fork" agent to write code, and never for wide scans. A fork carries the whole parent context (expensive and polluting). Give writers a fresh agent with a short brief; give wide scans to a cheaper fresh agent and take only the conclusion.
- Never cut: the strongest-model High reviewer on tasks that write data, locks or security; deliberate-failure tests; the screenshot gate before saying "done"; the owner trying the branch.
