# Screen inventory template

Fill this in **for each page** before a mockup is drawn. It is the only input to the mockup: whatever is missing here, the designer will guess, and guesses go wrong exactly where it is hard (long names, long lists, phones). Use only the component and token names of the project's design system. If there is none, draw plain HTML with a small token set (colors, type scale, spacing, radius).

Rule codes (LAY, DEV, A11Y, COPY, DARK) are explained in `ux-checklist.md`.

## Template

```markdown
## [Page name] — `[route or path]`

**Purpose:** one sentence: who finishes what on this page.
**Main users and device:** [role] · [phone 375 px / laptop] · [guest or signed in]
**One main action:** [verb + object]. The only primary button: "[label]" in [page bar / form footer / card].
**Page pattern:** [name of the existing layout, or "new"]
**Area and density:** [public / app / admin; airy or dense]

### Blocks in order (top to bottom)
Each block: component name, real text on it, and what differs between 375 px and 1280 px (columns, hidden, sticky).
1. [Header (height, sticky?)]
2. [Block name, real text]
3. ...
n. [Footer]
Blocks before the main content: [n]

### States
| State | What it looks like | Text |
| --- | --- | --- |
| Loading (first load) | skeleton in the real shape | screen-reader text "Loading…" |
| Loading in place (filter, save, next page) | keep old content, dimmed, `aria-busy`; button "Saving…" | |
| With data | | |
| Longest content | longest name or list, drawn as its own frame | |
| Empty (nothing yet) | empty state with illustration | "No [items] yet" + invitation |
| No match (filtered) | empty state | "No matching [items]" + "Clear filters" |
| Error | [field error / notice / toast / error page] | "Could not [do X]. [Next step]" |
| Guest (signed out) | [same / differs in … / redirect to sign-in] | |
| No permission / not found | | |
| Success after action | [no message because the result is visible / toast "Saved"] | |

### Real content: the heaviest case (with numbers)
Measure from real data just before drawing; do not guess.
- Longest title or name: "[real string]" ([n] characters); longest without spaces
- Largest number of items in one list or page: [n]
- Widest table: [n] columns, widest column "[…]"
- Largest or tallest image: [size]
- Longest description; most chips or badges on one card
- Largest number to display (for example "1,204")

### Frames to draw
- [ ] 375 px, **full page length**
- [ ] 1280 px, **full page length**
- [ ] Light
- [ ] Dark
- [ ] Every state above at least at 375 px
- [ ] Guest and signed in (if the page differs)

### Points to review
- LAY (layout): [codes at risk on this page, and why]
- DEV (device): [fixed heights, possible horizontal overflow, buttons needing 44 px, hover-only things]
- A11Y / DARK / COPY: [if any]
```

**Draw the full page length.** Do not draw only the first screen: pagination, card footers, the footer and a sticky bottom bar are where layout bugs hide. Each 375 px and 1280 px frame runs from header to footer, with the heaviest real content.
