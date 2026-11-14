---
name: workflow
description: "Use when starting a feature, change, bug fix or Small task, sizing a request, choosing Plan/Auto mode, effort or subagent models, splitting work into sessions, waves and tasks, reviewing, or shipping to main. Do not use when the project's CLAUDE.md has no dev-workflow block."
---

# Dev workflow

A process for working with Claude Code that spends thinking where a mistake is expensive (requirements, design, spec) and saves it where the work follows a plan (writing code). The owner (the human) always approves the gates.

**First answer of every request:** state the size (Large / Medium / Small). Never lower the size mid-way; if the work turns out bigger, raise it and say so. The owner may change it.

## Sizes

| Size | Examples | Mockup | Spec and plan |
| --- | --- | --- | --- |
| **Large** | New feature, redesign of several pages, a new area | Required (if it has a UI) | Spec in `docs/04-design/`, ADR if a new decision, plan split into waves in `docs/05-plans/` |
| **Medium** | A small feature, change to one flow | When the UI visibly changes | Short plan; spec/ADR only if it touches a shared decision |
| **Small** | Typo, clear bug, one colour | No | No |

## Large work: 8 steps

| # | Step | Mode · effort | Output | Owner |
| --- | --- | --- | --- | --- |
| 1 | Understand: read code, look at the real thing, find causes | Plan; Ultracode only if there are really several directions | Findings with evidence (file:line, measurements) | Reads |
| 2 | Options | Plan | Groups of options | **Chooses** |
| 3 | Mockup (UI only) | Leave Plan · High | Screen inventory, then drawings | **Approves** |
| 4 | Spec, ADR, plan for the first wave | High; one cross-review pass | Files in `docs/04-design`, `03-decisions`, `05-plans` | Looks |
| 5 | Write code, one wave at a time | Auto; wave session on the strongest model, High (Medium if the plan holds the code) | Commit per task; tests, typecheck, lint | - |
| 6 | End-of-wave review | `/code-review high`, then one strongest-model max-effort agent | Fixed defects, verdicts in progress log | - |
| 7 | Check in a browser or the running app | Medium | Screenshot gate (UI), measurements, list of unchecked items | **Tries the branch** |
| 8 | Ship | On the owner's words "ship to main" | CHANGELOG, `docs/README.md`, push | Pulls |

## Medium work

1. Plan · High: find the cause, offer options; the owner chooses.
2. Mockup only if the UI visibly changes; otherwise describe it in words using the design system's token and component names.
3. Code in Auto · Medium (High for hard spots). At the end run `/code-review` and the screenshot gate if the UI changed.
4. The owner tries it, then says "ship to main".

## Small work

Do it directly at Medium: no Plan, no mockup. Still run the project's test, typecheck and lint commands (listed in CLAUDE.md) and report the results before shipping.

## Rules for every size

- **Never skip an owner gate:** options, mockup, branch trial, "ship to main". Why: the owner is the only one who knows what is wanted; a skipped gate costs a rewrite.
- **Every UI passes the UX checklist** (see `references/ui-gate.md`). Why: a page shipped with tables overflowing on phones because nobody looked at it at 375 px with real content.
- **Fixed rules:**
  - no production build while the dev server of that checkout runs (Why: a build in the same checkout can break the running dev server);
  - the owner runs database and data migrations; Claude runs one only on the owner's explicit request (Why: they change shared state and may not be undone);
  - Claude never types passwords or signs in for the owner (Why: credentials stay with the owner);
  - ship to main only on the owner's word (Why: main is what users get).
- **Read only the part you need:** list headings with `grep -n "^## "`, then read by line range. Hand wide scans to a cheaper agent and take only the conclusion. Why: each turn re-reads the whole context.
- **Report progress** while waiting on long background work: what runs, for how long, what is awaited.

## Automatic, or turned on by the owner

| Thing | Who |
| --- | --- |
| Sizing, following the steps, offering options, waiting for approval, final review, browser check | Claude does it itself (CLAUDE.md is loaded each session and points here) |
| Entering Plan mode | Claude proposes; the owner accepts (or enters it) |
| Ultracode | **The owner turns it on**; Claude reminds at steps 1-2 of Large work |
| Effort (High, Medium) and Auto mode | **The owner picks** in the app; Claude says at each step which to use, and asks for the change if a tool allows it |
| `/code-review` | Claude runs it at the end of a wave if it can; if only the owner can call it, Claude reminds |

Related skills used along the way (from the `superpowers` plugin): brainstorming (steps 1-2), writing-plans (step 4), using-git-worktrees (each wave), subagent-driven-development (step 5), requesting-code-review (step 6).

## Read next

- `references/large-work.md` - the 8 steps in detail, plan cadence, Ultracode cost, hard spots. Read when starting a Large feature.
- `references/sessions.md` - feature, wave, task; where each runs and where progress is logged. Read when opening or handing off a session.
- `references/model-choice.md` - model and effort per agent role. Read before dispatching any subagent.
- `references/review.md` - writer/reviewer pairs and the two-pass wave review. Read at the end of each task and each wave.
- `references/ui-gate.md` - screenshot gate, screen design, spec "Experience" section, UX debt. Read for any change a user can see.
- `references/token-saving.md` - what to keep small and the size caps. Read when writing docs, plans, or running many agents.
- `references/parallel-work.md` - several big jobs at once. Read before starting a second job while one runs.
