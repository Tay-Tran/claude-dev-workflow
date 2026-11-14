// Doc-size guard. Copied into scripts/ by the init-workflow skill.
// Usage: node scripts/check-doc-size.mjs                    report files over their limit; exit 1 on violations
//        node scripts/check-doc-size.mjs --write-baseline   record specs currently over the spec limit (ratchet)
// Why: every Claude Code session re-reads what it loads each turn, so big always-loaded files and
// huge specs cost tokens. An oversized spec may shrink but never grow.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// ---- Configure here (bytes) -------------------------------------------------------------------
const KB = 1024;
const FIXED_LIMITS = {
  "CLAUDE.md": { limit: 2.5 * KB, hint: "keep CLAUDE.md a pointer list; put detail in docs/" },
  "CHANGELOG.md": { limit: 200 * KB, hint: "move the oldest month to docs/archive/CHANGELOG-<yyyy-mm>.md" },
};
const SPEC_DIR = "docs/04-design/";
const SPEC_LIMIT = 100 * KB;
// Appendix files are exempt: they grow by one section per wave and are opened on demand.
const isAppendix = (path) => path.endsWith("-differs-from-design.md");
// -----------------------------------------------------------------------------------------------

/** Pure check. files: repo-relative paths (forward slashes) with sizes; baseline: path -> allowed size. */
export function checkDocSizes(files, baseline = {}) {
  const violations = [];
  const shrunk = [];
  for (const { path, size } of files) {
    const fixed = FIXED_LIMITS[path];
    if (fixed) {
      if (size > fixed.limit) violations.push({ path, size, limit: fixed.limit, reason: "over its limit", hint: fixed.hint });
      continue;
    }
    if (!path.startsWith(SPEC_DIR) || !path.endsWith(".md") || isAppendix(path)) continue;
    if (size <= SPEC_LIMIT) {
      if (baseline[path] !== undefined) shrunk.push({ path, size, was: baseline[path] });
      continue;
    }
    const allowed = baseline[path];
    if (allowed === undefined) {
      violations.push({
        path, size, limit: SPEC_LIMIT, reason: "new spec over the limit",
        hint: "split it: one file per feature or wave; put 'differs from design' in a -differs-from-design.md appendix",
      });
    } else if (size > allowed) {
      violations.push({
        path, size, limit: allowed, reason: "oversized spec grew",
        hint: "put the new text in a separate file or the appendix instead of growing this one",
      });
    } else if (size < allowed) {
      shrunk.push({ path, size, was: allowed });
    }
  }
  return { violations, shrunk };
}

/** Baseline for specs over the limit: path -> current size. */
export function buildBaseline(files) {
  const out = {};
  for (const { path, size } of files) {
    if (path.startsWith(SPEC_DIR) && path.endsWith(".md") && !isAppendix(path) && size > SPEC_LIMIT) out[path] = size;
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}

function main() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const baselinePath = join(root, "scripts", "doc-size-baseline.json");

  const files = [];
  for (const p of Object.keys(FIXED_LIMITS)) {
    try {
      files.push({ path: p, size: statSync(join(root, p)).size });
    } catch {
      /* a limited file that does not exist is fine */
    }
  }
  try {
    for (const name of readdirSync(join(root, SPEC_DIR))) {
      if (!name.endsWith(".md")) continue;
      files.push({ path: SPEC_DIR + name, size: statSync(join(root, SPEC_DIR, name)).size });
    }
  } catch {
    /* no spec folder yet */
  }

  if (process.argv.includes("--write-baseline")) {
    const baseline = buildBaseline(files);
    writeFileSync(baselinePath, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`Wrote ${relative(root, baselinePath)}: ${Object.keys(baseline).length} oversized specs recorded.`);
    process.exit(0);
  }

  let baseline = {};
  try {
    baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  } catch {
    /* no baseline yet: every oversized spec counts as new */
  }

  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  const { violations, shrunk } = checkDocSizes(files, baseline);
  for (const s of shrunk) {
    console.log(`info  ${s.path}: ${kb(s.size)} (baseline ${kb(s.was)}) - run with --write-baseline to lower the baseline`);
  }
  for (const v of violations) {
    console.error(`FAIL  ${v.path}: ${kb(v.size)} > ${kb(v.limit)} (${v.reason}) - ${v.hint}`);
  }
  if (violations.length) process.exit(1);
  console.log(`Doc sizes OK (${files.length} files checked).`);
}

// Run the CLI only when executed directly, so the checks can also be imported.
if (process.argv[1] && fileURLToPath(import.meta.url) === join(process.argv[1])) main();
