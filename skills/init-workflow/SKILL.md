---
name: init-workflow
description: "Set up the dev-workflow process in the current project: CLAUDE.md snippet, docs/00–09 layout, CHANGELOG, progress-log template, optional UI templates and doc-size check."
disable-model-invocation: true
argument-hint: "[--ui | --no-ui]"
---

# Set up the dev-workflow process

Templates live in `${CLAUDE_SKILL_DIR}/templates/` (if that variable is empty, use this skill's own directory). Work in the current project root. Never commit.

## 1. Inspect the project

Check, without changing anything:
- Is it a git repo? Is there a `CLAUDE.md`, `docs/`, `CHANGELOG.md`, `docs/README.md`, `package.json`?
- Detect commands: `package.json` scripts (`test`, `typecheck` or `tsc`, `lint`), `pyproject.toml` (pytest, mypy, ruff), `Makefile` targets, `Cargo.toml` (`cargo test`, `cargo clippy`), `go.mod` (`go test ./...`, `go vet ./...`). Use `n/a` for any command you cannot find.
- Is Node available (`node --version`)? Is there a UI (web or mobile front end, templates, components)?

## 2. Ask once

Use AskUserQuestion with one batch of questions:
1. Does the project have a UI? Skip if `--ui` (yes) or `--no-ui` (no) is in the arguments passed to this skill (`$ARGUMENTS`).
2. Are the detected test, typecheck and lint commands right? Show them; allow edits.
3. Reply language for Claude (default: English).
4. Add the doc-size check (`scripts/check-doc-size.mjs`)? Only ask when Node is available.

## 3. Show the plan and wait

List every file you will create or change, marking each as new, appended, or left alone. Wait for an explicit yes. Do nothing before it.

## 4. Create the files

Rule: **never overwrite a file.** The only edits to existing files are: appending the marked block to `CLAUDE.md`, replacing that block with consent, and adding one `check:docs` script key to `package.json`.

- `CLAUDE.md`: read `templates/CLAUDE-snippet.md` and fill the placeholders `{{TEST_CMD}}`, `{{TYPECHECK_CMD}}`, `{{LINT_CMD}}`, `{{REPLY_LANGUAGE}}`.
  - `{{UI_RULES}}`: for a UI project, replace that line with the contents of `templates/ui-rules.md`; for a non-UI project, delete that line.
  - No `CLAUDE.md`: create it with the filled snippet.
  - `CLAUDE.md` exists without the markers: append the snippet (with a blank line before it).
  - Markers `<!-- dev-workflow:start -->` / `<!-- dev-workflow:end -->` already exist as one pair: show the diff between the existing block and the new one, ask, and replace only that block if the owner agrees. If the markers are unpaired or appear more than once, stop and ask; never guess a range.
  - Check the filled block is about 2.5 KB. If it is far over, propose shorter command text and ask; never change approved content silently.
- `docs/00-overview` … `docs/09-ideas` (names: `00-overview`, `01-requirements`, `02-architecture`, `03-decisions`, `04-design`, `05-plans`, `06-operations`, `07-user-guide`, `08-testing`, `09-ideas`): create each folder with an empty `.gitkeep` only if the folder is missing. If `docs/` already has other top-level folders, ask before creating the 00–09 set (offer: create, skip).
- `docs/README.md` from `templates/docs-README.md` and `CHANGELOG.md` from `templates/CHANGELOG.md`: create if missing. If one exists, leave it and say so in the summary.
- `docs/06-operations/progress-template.md` from `templates/progress.md`, if missing. Real logs are written later to `.superpowers/sdd/<plan-name>/progress.md`; add `.superpowers/` to `.gitignore` only if the owner wants logs untracked (ask in the summary, do not decide).
- UI projects only: `docs/06-operations/screen-inventory.md` from `templates/screen-inventory.md` and `docs/06-operations/ux-checklist.md` from `templates/ux-checklist.md`, if missing.

## 5. Doc-size check (only if chosen)

- Copy `templates/check-doc-size.mjs` to `scripts/check-doc-size.mjs` if missing (create `scripts/` if needed).
- In `package.json`, add `"check:docs": "node scripts/check-doc-size.mjs"` under `scripts` only if that key is absent, by a targeted text insertion that keeps the file's indentation and line endings; never parse and rewrite the whole JSON. Skip this when there is no `package.json` or no `scripts` object, and tell the owner to run `node scripts/check-doc-size.mjs` directly.
- Run `node scripts/check-doc-size.mjs` once and report the result. If an existing spec is already over the limit, tell the owner that `--write-baseline` records it as a ratchet.

## 6. Finish

Do not commit. Print a short summary: files created, appended, left alone, the commands you wrote into `CLAUDE.md`, and anything the owner should decide. Then give the next step: start a design session for the first feature (see `/dev-workflow:workflow`). Remind the owner that the process also uses the `superpowers` plugin and `/code-review`.
