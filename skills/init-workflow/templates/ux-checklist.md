# UX checklists

Two lists: review a **mockup** before approving it, review **code** before shipping. Rule groups used in screen inventories and reviews: **LAY** layout, **DEV** device and touch, **A11Y** accessibility, **COPY** copy, **STATE** states, **RISK** risky actions, **NAV** navigation, **FORM** forms, **KEY** keyboard, **MOT** motion, **DARK** dark theme.

## 1. Mockup review

States and frames
- [ ] Every block has all states: loading, data, empty, no match, error, no permission or not found (STATE).
- [ ] Frames at 375 px (also 320 px) and desktop, in light and dark (DEV, DARK).
- [ ] Hard cases drawn, not only the pretty screen: longest text, two-line title, scrolled page, first open at 320x568, 768x1024, landscape if anything is sticky (DEV).
- [ ] Real content, the heaviest case (longest title, longest list, widest table or image), not short sample data.
- [ ] Each screen has a filled screen inventory, is drawn for the full page length, and uses only the design system's tokens and named components.

Copy and behaviour
- [ ] Buttons are verb + object; titles have no full stop; error text says the next step; terms match the glossary (COPY).
- [ ] Data-losing actions: is there undo or archive? If a confirm is needed: title, consequence, names of both buttons (RISK, COPY).
- [ ] Unsaved work: where the saved state shows; what happens on close, Back, link click (STATE, RISK).
- [ ] Right container (page, sheet, dialog, toast) and a URL for each screen (NAV).
- [ ] Nothing only on hover; touch targets at least 24 px, main buttons 44 px on phones (DEV).
- [ ] Every drag and drop has a way to do it without dragging (A11Y).
- [ ] Color is never the only status signal; new colors reach 4.5:1 for text, 3:1 for borders and icons (A11Y).
- [ ] What moves, and what happens with reduced motion (MOT).

Layout
- [ ] Count blocks before the main content: a list page shows its first row without scrolling; an edit page shows its first field (LAY).
- [ ] At most one primary button per screen, in a fixed place; each row has one "next step" button (LAY).
- [ ] No number or status shows twice, or in two styles, on one screen; status uses the shared icon, text and color (LAY).
- [ ] Technical details sit behind a panel, popover, menu or settings page (LAY).
- [ ] Three clear type levels; no color, size or spacing outside the tokens; no box inside a box (LAY).
- [ ] Lists, filters, save bars and confirm dialogs use the shared components (LAY).
- [ ] Each number helps one decision; funnel numbers add up to the total (LAY).
- [ ] Could a new user misread anything? If an option confuses, a simpler one was proposed (LAY).

## 2. Code review before shipping

Copy
- [ ] No untranslated text reaches the user, including `aria-label`, `title`, `alt` and error messages; database errors go through one friendly-message function, never raw `error.message` (COPY).
- [ ] Numbers, dates and time zones are formatted for the locale, also in server-rendered code (COPY).

States
- [ ] Empty lists use the shared empty state and separate "nothing yet" from "no match"; "no match" offers "Clear filters" (STATE).
- [ ] Slow routes have a loading view in the page's shape, with `role="status"` and screen-reader text (STATE).
- [ ] Running buttons change text ("Saving…") and are disabled (STATE).
- [ ] Errors sit where they belong: field errors with `aria-invalid` and `aria-describedby`; form errors not only in a toast (STATE).
- [ ] Actions return a result object instead of throwing; optimistic updates roll back on failure (STATE).

Actions and forms
- [ ] Data-losing actions have undo, or a confirm dialog whose destructive button repeats the verb and states the consequence (RISK).
- [ ] Long forms warn about unsaved changes. Tried: click a link, close the tab, Esc, phone Back (RISK).
- [ ] A failed submit keeps the typed text; forms use `noValidate` and show their own messages (FORM).
- [ ] Labels are tied to inputs; `type`, `inputMode`, `autoComplete` are right (FORM).
- [ ] Save is enabled only when something changed; editing forms have Ctrl/Cmd+S (FORM).

Navigation
- [ ] Search, filters and the open item live in the URL. Tried: reload, Back, Forward, open in new tab (NAV).
- [ ] Links use the project's shared link component; in editors, a guarded navigation that checks unsaved work (NAV).
- [ ] Each page has one `h1` and its own `<title>` (NAV, A11Y).

Phone
- [ ] The overflow check (if the project has one) is clean; page opened at 375, 320 and 768 px, light and dark (DEV).
- [ ] Main buttons are at least 44 px on touch; no touch target under 24x24 px except links inside a sentence (DEV).
- [ ] New sticky bars leave scroll padding and the bottom safe-area inset; toasts do not cover buttons (DEV).
- [ ] Fixed parts checked at 375x812 and 320x568; sticky items never cover the main button, even on first open (DEV).

Keyboard and accessibility
- [ ] The whole flow works by keyboard: visible focus ring, not hidden under a sticky bar, a place to land after each action (A11Y, KEY).
- [ ] Key handlers in text inputs skip `isComposing`; single-letter shortcuts check that the user is not typing; new keys are listed in the shortcuts dialog (FORM, KEY).
- [ ] Icon-only buttons have `aria-label`; decorative icons `aria-hidden`; `<iframe>` has `title`; images have `alt` (decorative: `alt=""`) (A11Y).
- [ ] Status messages use a polite live region; `role="alert"` only for errors (A11Y).

Motion and dark theme
- [ ] Motion uses tokens and respects reduced motion in CSS and JS (MOT).
- [ ] No hard-coded colors, sizes or spacing outside the tokens; no private copy of a shared component; dark theme checked again (LAY, DARK).

Layout and docs
- [ ] The **screenshot gate** is passed: screenshots of the real page at 375 and 1280 px (and 768 px if a user-facing layout changed), with the heaviest real content, including inside iframes; blocks before main content, primary buttons, repeats, density, type families and nested boxes checked as in the mockup review (LAY); the images were sent to the reviewer agent.
- [ ] If the UI changed, the user guide is updated in the same ship.
- [ ] Deliberate departures from these rules are written in the spec ("differs: …").
