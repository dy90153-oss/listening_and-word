import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { directions } from '../explore/catalog.mjs';
const root = resolve(import.meta.dirname, '..');
const source = await readFile(resolve(root, 'index.html'), 'utf8');
const main = source.slice(source.indexOf('<main id="main">'), source.indexOf('</main>'));
const sectionStarts = [...main.matchAll(/<section\b/g)].map(m => m.index);
const sections = sectionStarts.map((start, i) => main.slice(start, sectionStarts[i + 1] ?? main.length).trim());
if (sections.length !== 6) throw new Error('Expected six source sections');
const [hero, sample, pricing, process, faq, contact] = sections;
const header = source.slice(source.indexOf('<header '), source.indexOf('</header>') + 9);
const footer = source.slice(source.indexOf('<footer '), source.indexOf('</footer>') + 9);
const pageOrder = {
  editorial: `<div class="opening">${hero}${sample}</div>${pricing}${process}${faq}${contact}`,
  studio: `<div class="opening">${hero}${sample}</div>${pricing}${process}${faq}${contact}`,
  poster: `${hero}${sample}${pricing}${process}${faq}${contact}`,
  clear: `${hero}${sample}${process}${pricing}${faq}${contact}`,
  archive: `<div class="opening">${hero}${sample}</div>${pricing}${process}${faq}${contact}`
};
await mkdir(resolve(root, 'explore/variants'), { recursive: true });
for (const direction of directions) {
  const html = `<!doctype html>\n<html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${direction.label}｜音律工作室風格預覽</title><link rel="icon" href="/assets/favicon.svg"><link rel="stylesheet" href="../common.css"><link rel="stylesheet" href="../themes/${direction.id}.css"><script type="module" src="/assets/app.mjs"></script><script type="module" src="../frame.mjs"></script></head><body data-direction="${direction.id}"><a class="skip" href="#main">跳至主要內容</a>${header}<main id="main">${pageOrder[direction.id]}</main>${footer}</body></html>`;
  await writeFile(resolve(root, `explore/variants/${direction.id}.html`), html);
}
console.log('Generated 5 complete, content-matched direction pages.');
