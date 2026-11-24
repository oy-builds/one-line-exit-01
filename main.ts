// The One-Line Exit — make.fun entry (u-kreutzx-the-one-line-exit-1dc652d1)
//
// Writes one funny single-line resignation letter to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt),
// validates the competition gate (UTF-8, 1-140 chars, single line),
// then reads the file back and verifies it matches byte for byte.
//
// Node 22+, standard library only. Run with: node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I hereby resign as night-shift lighthouse keeper: the lamp is automated, the gulls have unionized, and frankly, so have I.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate: UTF-8 text, 1-140 characters, a single line, not only whitespace.
// Also reject leading/trailing whitespace: the file must hold exactly the
// letter, with no padding the judge would read as filler.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 140) {
  fail(`entry is ${chars.length} characters, must be 1-140`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be exactly one line");
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  fail("entry must not start or end with whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify byte-identical output.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  fail("verification failed: entry.txt does not match the entry");
}

console.log(`wrote ${outPath} (${chars.length} chars)`);
console.log(written);
