# UI: screenshot gate, screen design, spec "Experience"

Only for projects with a UI. Skip it otherwise.

## 1. Screenshot gate

Any change that alters what a user sees (a task, a wave, a UI bug fix, even a wave that only adds content or imports data) is **not "done"** until all four steps pass.

1. **Screenshot the real page** at 375 px and 1280 px. Add dark mode if colours changed; add 768 px if the page layout changed. Use real Chrome, for example Playwright with `channel: "chrome"` (or the owner's Chrome). An embedded preview pane may block frames or iframes, so it is not reliable for this.
2. **Use the heaviest real content:** the longest page/document, the most images, the longest list, the longest name, the widest table. Not short sample data. Mockups follow the same rule.
3. **Self-review the screenshots** against the "Layout" and "Phone" parts of the UX checklist below, including content inside iframes (an overflow script cannot see overflow inside a frame). If there is an approved design, put the screenshot beside it at the same width and note every difference. Fix defects first, or record them as known UX debt with a reason.
4. **The reviewer agent gets the screenshots** together with the changed code. The report to the owner includes the screenshots and the list of defects fixed.

Numbers (tests, load metrics, a feature checklist) do not replace looking. The owner's look is the final approval, not the first review.

Why: a page shipped with images and tables overflowing on phones, three font families, boxes inside boxes and two sticky bars, although the spec said layout rules were mandatory. Nobody looked at the real page with real content at 375 px before saying "done".

Token saving: take self-check screenshots at half scale and read text from the page's accessibility tree; save the full-size shots beside the approved design as files for the reviewer; for one block, crop instead of shooting the whole page.

## 2. Designing screens

1. **Screen inventory first,** per page: purpose in one sentence; main user and device; the one main action (and its single primary button); page pattern; area and density; blocks top to bottom by the design system's component names (with real text and what differs at 375 vs 1280); number of blocks before the main content; states table (first load, in-page loading, data, longest content, empty, no match with a "clear filters" action, error, signed-out, no permission, success); heaviest real content with measured numbers; frames to draw; points to check. The inventory is the only input to the drawing: whatever is missing, the drawer guesses, usually wrong in the hardest place (long names, long lists, phones).
2. **Draw on the project's design system,** using only its tokens and named components. If a needed part is missing, propose a change to the shared component and write it in the spec; do not draw a one-off style. Do not copy something that is known debt. Draw the **full page length** (header to footer), at 375 and 1280, light and dark, all states. If the project has no design system, draw plain HTML with a small token set (colours, type scale, spacing, radius) and use only those.
3. **The owner approves** the drawing. No approval, no code.
4. **Write code** to the approved design. Where it must differ, add a "differs from design" note in the spec; for specs near the size cap, in the appendix `…-differs-from-design.md`.
5. **Put real screenshots beside the design** at the screenshot gate.

Keep the design system in step with the code: a wave that changes tokens or shared components rebuilds the design system and lists that in the CHANGELOG.

## 3. UX checklist (for mockups and before shipping)

The canonical checklists are in `docs/06-operations/ux-checklist.md` (installed by `init-workflow`): one for mockup approval, one for code before shipping. Use it for every UI change. In short:
- Every block has all states; frames at 375 and desktop, light and dark, with the heaviest real content.
- Layout: first row or field visible without scrolling, one primary button, no box inside a box.
- Phone: touch targets, sticky bars, no horizontal overflow.
- Accessibility: keyboard flow, labels, live regions, colour never the only signal; passages in another language carry a matching `lang` attribute.
- Copy, forms, unsaved work, URLs for search and filters, dark mode.

## 4. Spec section "Experience"

Copy into each UI spec as section N. Intent: "Follows the project's UX principles. Deliberate deviations are written as `(deviation: code — reason)`."

- **N.1 User flow:** who, on what device, wanting to finish what; main steps from entry to done (a diagram if there are branches); path of each screen, what is in the URL, what Back/Forward do; the container of each screen.
- **N.2 States:** table, rows are blocks, columns are Loading / None yet / No match / Error / No permission or not found / Success. Also: which actions update optimistically and which wait for the server; where unsaved work is kept and what is asked on leaving; for data-losing actions, undo or confirm and the dialog text.
- **N.3 Phone:** layout at 375 and 320 (what wraps, what moves into a menu, which bar sticks); touch targets, Back gesture, what the on-screen keyboard covers.
- **N.4 Keyboard:** Tab order; where focus goes after each action; Enter, Esc, save shortcut; new shortcuts and the line added to the shortcuts list.
- **N.5 Accessibility (WCAG 2.2 AA):** names for icon buttons, page regions and embedded frames; status and error announcements; no-drag alternative; contrast ratios of new colours; reduced-motion variant.
- **N.6 Layout:** blocks of each screen top to bottom and how many come before the main content; the primary button and where secondary actions live; where each status and number shows, once and in one style; density and shared components reused.
- **N.7 UI copy:** table with rows: page title; primary button and its running state; empty states (none yet / no match); errors by kind ("Could not X — do Y"); confirm dialog (title / description / two buttons); success toast. Add new terms to the glossary.

## 5. UX debt

Do not mass-fix old UX debt while doing other work. Record deviations as "(deviation: code — reason)" in the spec or in the project's "known UX debt" list, and fix them in their own task. Do not copy known debt into new screens.
