# Documentation index

Docs live in `docs/`. Keep always-loaded files small; put detail in the numbered folders.

| Folder | What goes there |
| --- | --- |
| `00-overview/` | What the project is, glossary, how to start |
| `01-requirements/` | What users and the owner need |
| `02-architecture/` | How the system is built; principles and conventions |
| `03-decisions/` | ADRs, one decision each: `NNNN-name.md` |
| `04-design/` | Specs: `YYYY-MM-DD-name-design.md` (appendix: `...-differs-from-design.md`) |
| `05-plans/` | Implementation plans, one per wave or feature: `YYYY-MM-DD-name.md` |
| `06-operations/` | Process, deploy, backup, runbooks |
| `07-user-guide/` | Guides for end users; update when the UI changes |
| `08-testing/` | Test strategy, owner checklists |
| `09-ideas/` | Ideas not started yet; move out when work begins |

## Conventions

- Names in lowercase with hyphens. Dates are ISO (`YYYY-MM-DD`).
- One spec per feature, one plan per wave. Specs over 100 KB: split into an appendix file.
- Progress logs are not docs: they live in `.superpowers/sdd/<plan-name>/progress.md`.

## Status

Status values: Draft, Approved, In progress, Done, Superseded.

| Document | Status | Updated |
| --- | --- | --- |
| _(add a row for each document)_ | | |

**Rule:** every ship to main adds an entry to `CHANGELOG.md` and updates this table.
