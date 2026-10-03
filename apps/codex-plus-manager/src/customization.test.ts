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
  assert.doesNotMatch(source, /load_ads|refreshAds/);
});

test("777 renderer fragments and assembled asset never load relay advertising", async () => {
  const paths = ["../../../assets/inject/renderer-inject.js", "../../../assets/inject/renderer-inject/40-backend-settings.js", "../../../assets/inject/renderer-inject/00-prelude.js"];
  for (const path of paths) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.doesNotMatch(source, /BigPizzaV3\/Ad-List|fetchCodexPlusAds|directFetchCodexPlusAds|codexPlusRailSponsorId|codexPlusSponsorTab|renderCodexPlusAds/);
  }
  const renderer = await readFile(new URL("../../../assets/inject/renderer-inject.js", import.meta.url), "utf8");
  assert.match(renderer, /function runPluginAutoExpand/);
  assert.match(renderer, /pluginAutoExpand: "codexAppPluginAutoExpand"/);
  assert.match(renderer, /function openCodexPlusExtensions/);
});
