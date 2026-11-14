<!-- dev-workflow:start -->
## Dev workflow
Details and reasons: invoke the `dev-workflow:workflow` skill.

**Size** (say it in the first reply; never downgrade midway): **Large** (new feature, many pages): design, spec, plan by wave. **Medium**: Plan at High, then Auto, then `/code-review`. **Small**: Medium effort directly; run tests, typecheck, lint. Remind the owner to switch mode and effort at each new step.

**Steps (Large):** 1-2 understand + options (Plan; Ultracode only when there are real alternatives; owner picks) · 3 mockup (leave Plan, High; owner approves) · 4 spec, ADR, plan (High; one cross-check) · 5 build per wave (Auto; writer + reviewer agent per task) · 6 end-of-wave review (`/code-review high`, then one strongest-model agent for spec + security) · 7 browser check (owner tries the branch) · 8 on "ship to main": CHANGELOG, docs index.

**Subagent model:** code already in the plan, UI from a pattern: cheaper model, medium effort. Many files, keyboard, drag and drop: cheaper model, high effort. Data loss or security (delete, undo, locks, sync, new migration, access rules, uploads): strongest model, high effort. Reviewer: copy tasks cheaper model High, others strongest High. Always name the model. 3 failed fix rounds: strongest model.

**Sessions:** feature, wave, task. One design session per feature; one session, worktree and branch per wave; never work in the main checkout. Progress goes in `.superpowers/sdd/<plan>/progress.md`, not memory. Plan only the next wave.

**Fixed rules:** no production build while the checkout's dev server runs; owner runs migrations (Claude only on explicit request); Claude never types passwords; ship to main only on the owner's word.

**Tokens:** specs about 60 KB (split at 100 KB); don't edit CLAUDE.md mid-session; grep, then read by line range; pass prompts, reports, diffs as files; archive sessions when done.
{{UI_RULES}}
**Commands:** test `{{TEST_CMD}}` · typecheck `{{TYPECHECK_CMD}}` · lint `{{LINT_CMD}}`
**Reply language:** {{REPLY_LANGUAGE}}
<!-- dev-workflow:end -->
