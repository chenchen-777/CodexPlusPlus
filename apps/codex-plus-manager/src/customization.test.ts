import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("777 build keeps relay marketing and recommendation UI out of the manager", async () => {
  const sources = await Promise.all([
    "./App.tsx",
    "./i18n-en.ts",
    "./styles.css",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  const source = sources.join("\n");

  assert.doesNotMatch(source, /jojocode\.com|JOJO Code|jojocode-overview/i);
  assert.doesNotMatch(source, /id:\s*"recommendations"|route === "recommendations"/);
  assert.doesNotMatch(source, /BigPizzaV3\/Ad-List/);
});
