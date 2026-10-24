const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync,existsSync}=require('node:fs');
const {resolve}=require('node:path');
test('公開產物允許索引，正式網址與網站地圖一致，LINE 不依賴 JavaScript',()=>{
 const root=resolve(__dirname,'..');
 const html=readFileSync(resolve(root,'dist/index.html'),'utf8');
 const origin=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://listeningand-word.vercel.app');
 assert.match(html,/<meta name="robots" content="index, follow/);
 assert.doesNotMatch(html,/noindex|designer\.js|designer\.css|localhost:8400|impeccable-variants-start/);
 assert.ok(html.includes(`<link rel="canonical" href="${origin}/"`));
 assert.ok(html.includes(`<meta property="og:url" content="${origin}/"`));
 assert.match(html,/<a href="https:\/\/lin\.ee\/9kHonjI" data-contact="line"/);
 assert.doesNotMatch(html,/data-contact="email"|id="lineId"/);
 assert.ok(readFileSync(resolve(root,'dist/robots.txt'),'utf8').includes(`Sitemap: ${origin}/sitemap.xml`));
 assert.ok(readFileSync(resolve(root,'dist/sitemap.xml'),'utf8').includes(`<loc>${origin}/</loc>`));
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema['@graph'][0].url,`${origin}/`);
 for(const src of html.matchAll(/(?:src|href)="(\.\/[^"#]+|\/assets\/[^"#]+)"/g)){
  assert.ok(existsSync(resolve(root,'dist',src[1].replace(/^\//,''))),`Missing public asset ${src[1]}`);
 }
});
