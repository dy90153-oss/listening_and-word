import {cp,mkdir,readFile,writeFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});await cp('site','dist',{recursive:true});
const production=process.env.VERCEL_ENV==='production';
const host=process.env.VERCEL_PROJECT_PRODUCTION_URL||'yinlu-editorial.vercel.app';const origin='https://'+host;
let html=await readFile('dist/index.html','utf8');
if(production){html=html.replace('<meta name="robots" content="noindex,nofollow">','<meta name="robots" content="index,follow">');html=html.replace('</head>',`<link rel="canonical" href="${origin}/"><meta property="og:title" content="音律工作室｜單人華語 SRT 逐字稿"><meta property="og:description" content="單人華語錄音，轉成有時間軸的繁體中文 SRT。每分鐘 NT$15，最低 NT$150。"><meta property="og:url" content="${origin}/"></head>`);}
await writeFile('dist/index.html',html);await writeFile('dist/robots.txt',production?`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>`);
console.log(`Built editorial site (${production?'production':'preview'}).`);
