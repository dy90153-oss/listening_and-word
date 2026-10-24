import {cp,mkdir,rm,readFile,writeFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
await cp('node_modules/lucide/dist/umd/lucide.min.js','assets/lucide.min.js');
await cp('node_modules/lucide/LICENSE','assets/LUCIDE-LICENSE');
await rm('dist',{recursive:true,force:true});
await mkdir('dist/assets',{recursive:true});
const source=await readFile('index.html','utf8');
let html=source
  .replace(/^[ \t]*<script\b[^>]*src="\.\/assets\/designer\.js"[^>]*><\/script>\s*$/m,'  <script defer src="./assets/theme-runtime.js"></script>')
  .replace(/^[ \t]*<link\b[^>]*href="\.\/assets\/designer\.css"[^>]*>\s*$/m,'');
if(html.includes('assets/designer.js')||html.includes('assets/designer.css')||!html.includes('assets/theme-runtime.js'))throw Error('公開版打包失敗：編輯器排除規則需更新。');
// Public metadata is emitted at build time; the editable local preview stays noindex.
if(/impeccable-variants-start|impeccable-carbonize-start|localhost:8400|127\.0\.0\.1:8400/.test(html))throw Error('請先結束 Live 編輯後再建立公開版。');
const context={window:{}};
runInNewContext(await readFile('site.config.js','utf8'),context,{timeout:1000});
const config=context.window.STUDIO_CONFIG;
const deploymentOrigin=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : config.siteUrl);
const publicUrl=new URL(deploymentOrigin);
if(publicUrl.protocol!=='https:'||publicUrl.username||publicUrl.password||publicUrl.search||publicUrl.hash)throw Error('請設定有效的 HTTPS 正式網址。');
const origin=publicUrl.origin;
const canonical=`${origin}/`;
const image=`${origin}/assets/recording-studio.jpg`;
const indexable=process.env.VERCEL_ENV!=='preview';
html=html.replace('<meta name="robots" content="noindex, nofollow" />',indexable ? '<meta name="robots" content="index, follow, max-image-preview:large" />' : '<meta name="robots" content="noindex, nofollow" />');
html=html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+(" \/>)/g,`$1${image}$2`);
html=html.replace('</head>',`  <link rel="canonical" href="${canonical}" />
  <meta property="og:url" content="${canonical}" />
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
</head>`);
const schema={
  '@context':'https://schema.org',
  '@graph':[
    {'@type':'Organization','@id':`${canonical}#organization`,name:config.brand,url:canonical,logo:`${origin}/assets/favicon.svg`,sameAs:[config.lineUrl],description:'繁體中文音檔轉文字與 SRT 字幕製作服務。'},
    {'@type':'WebSite','@id':`${canonical}#website`,name:config.brand,url:canonical,inLanguage:'zh-TW',publisher:{'@id':`${canonical}#organization`}},
    {'@type':'Service','@id':`${canonical}#service`,name:'繁體中文音檔轉文字與 SRT 字幕製作',url:canonical,provider:{'@id':`${canonical}#organization`},serviceType:'音檔轉文字與字幕製作',description:'每分鐘 NT$15，單筆最低 NT$150。基本 3–5 工作天，實際交期依各案確認。',offers:{'@type':'Offer',url:canonical,priceCurrency:'TWD',priceSpecification:{'@type':'UnitPriceSpecification',price:15,priceCurrency:'TWD',unitText:'影音分鐘'}}}
  ]
};
html=html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>`);
// All contact anchors work immediately, including before JavaScript loads.
const line=new URL(config.lineUrl);
if(line.protocol!=='https:'||!['lin.ee','line.me'].includes(line.hostname))throw Error('LINE 諮詢連結無效。');
html=html.replace(/<a\b[^>]*data-contact="line"[^>]*>/g,tag=>tag.replace(/href="[^"]*"/,`href="${line.href}"`));
await writeFile('dist/index.html',html);
await cp('site.config.js','dist/site.config.js');
await writeFile('dist/robots.txt',indexable ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${canonical}</loc></url></urlset>\n`);
// Explicit public allowlist: preview editors and future local helpers are never uploaded.
for(const name of ['app.js','quote.js','design-model.js','theme-engine.js','theme-runtime.js','theme.css','refinements.css','tailwind.min.css','lucide.min.js','LUCIDE-LICENSE','recording-studio.jpg','favicon.svg'])await cp(`assets/${name}`,`dist/assets/${name}`);
console.log('公開版檔案已準備於 dist/（不含設計面板或編輯程式）。已產生正式網址、網站地圖與公開索引設定。');
