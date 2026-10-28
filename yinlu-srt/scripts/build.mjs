import { mkdir, cp, rm, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
await import('./generate-variants.mjs');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of ['index.html', 'robots.txt', 'sitemap.xml', 'assets']) await cp(resolve(root, file), resolve(dist, file), { recursive: true });
await cp(resolve(root, 'explore'), resolve(dist, 'explore'), {
  recursive: true,
  filter: source => !source.split('/').some(part => part.startsWith('.')) && !source.endsWith('.md')
});
await cp(resolve(root, 'compare'), resolve(dist, 'compare'), { recursive: true, filter: source => !source.split('/').some(part => part.startsWith('.')) && !source.endsWith('.md') });
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
if (!html.includes('https://yinlu-srt.vercel.app/')) throw new Error('Canonical URL missing');
await writeFile(resolve(dist, '404.html'), `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>找不到頁面｜音律工作室</title><link rel="stylesheet" href="/assets/style.css"><main class="hero wrap"><h1 style="font-size:48px">這一頁還沒有聲音。</h1><p class="lead">你要找的頁面不存在，請回首頁查看服務與報價。</p><a class="button primary" href="/">回到音律工作室</a></main></html>`);
console.log('Static site built: dist/');
