import { GROUPS, CONTROLS, DEFAULTS, normalize, parseSettings, serialize, contrast, onColor } from './design-settings.mjs';
const params=new URLSearchParams(location.search);
const local=['localhost','127.0.0.1','::1'].includes(location.hostname);
if (params.get('design')==='1' || local) init();
function init(){
 const key='yinlu-design-panel-v1';
 let settings={...DEFAULTS},storageAvailable=true,startMessage='調整會即時預覽。';
 try{const saved=localStorage.getItem(key);if(saved)settings=parseSettings(saved);}catch{storageAvailable=false;}
 if(params.has('theme')){try{settings=parseSettings(params.get('theme'));startMessage='已載入分享的設定。';}catch{startMessage='分享設定無效，已使用此瀏覽器的設定。';}}
 let original=false,history=[JSON.stringify(settings)],cursor=0,resizeTimer;
 const host=document.createElement('yinlu-design-panel');
 host.setAttribute('data-design-panel','');document.body.append(host);
 const root=host.attachShadow({mode:'open'});
 const svg=(path)=>`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
 const sliders=svg('M4 7h16M4 17h16M8 4v6M16 14v6');
 const controls=GROUPS.map((group,i)=>`<details ${i===0?'open':''}><summary>${group.title}</summary>${group.controls.map(controlHTML).join('')}${i===1?'<div class="preset"><button type="button" data-preset="clear">清朗原色</button><button type="button" data-preset="teal">沉靜青綠</button><button type="button" data-preset="slate">柔霧灰藍</button></div><div class="contrast" id="contrast"></div>':''}${i===3?'<button class="motion-actions" id="replay" type="button">重播打字動畫</button><p class="note">若裝置啟用「減少動態效果」，會優先顯示靜態文字。</p>':''}</details>`).join('');
 root.innerHTML=`<link rel="stylesheet" href="/assets/design-panel.css"><button class="launcher" id="launch" aria-expanded="false" aria-controls="panel">${sliders}設計面板</button><section class="panel" id="panel" aria-labelledby="panel-title" hidden><header class="top"><div class="heading"><h2 id="panel-title">調整你的網站</h2><div class="tools"><button class="icon" id="dock" type="button" aria-label="將面板移至左側" title="切換面板位置">${svg('M4 4h16v16H4zM9 4v16')}</button><button class="icon" id="close" type="button" aria-label="收合設計面板">${svg('M6 6l12 12M18 6 6 18')}</button></div></div><p class="intro">設定只影響此瀏覽器的設計預覽；匯出或分享後，可再套用為正式版。</p><div class="compare"><button id="compare" type="button" aria-pressed="false">查看原版</button><div class="history"><button class="icon" id="undo" type="button" aria-label="復原" title="復原">${svg('M9 5 4 10l5 5M4 10h9a6 6 0 0 1 6 6')}</button><button class="icon" id="redo" type="button" aria-label="重做" title="重做">${svg('m15 5 5 5-5 5M20 10h-9a6 6 0 0 0-6 6')}</button></div></div></header><div class="scroll">${controls}</div><footer class="actions"><div class="action-grid"><button id="export" type="button">匯出設定</button><button id="import" type="button">匯入設定</button><button class="primary" id="share" type="button">複製分享連結</button><button id="hide" type="button">收合看全頁</button></div><button class="reset" id="reset" type="button">重設為清朗服務原版</button><p class="status" id="status" role="status" aria-live="polite"></p><textarea class="share-fallback" id="share-fallback" aria-label="請手動複製此預覽連結" readonly hidden></textarea><input id="file" type="file" accept=".json,application/json" hidden></footer></section>`;
 const $=selector=>root.querySelector(selector);
 const style=document.createElement('style');style.dataset.designOverrides='';document.head.append(style);
 let fontBases=new Map(),spaceBases=new Map(),gapBases=new Map();
 function capture(){
  style.textContent='';fontBases=new Map();spaceBases=new Map();gapBases=new Map();
  for(const el of document.querySelectorAll('header *,main *,footer *')){
   if(el.closest('svg')||['SCRIPT','STYLE','BR','PATH'].includes(el.tagName))continue;
   const css=getComputedStyle(el),size=parseFloat(css.fontSize);
   if(!Number.isFinite(size))continue;
   const role=el.closest('h1')?'hero':el.closest('h2,h3')?'heading':'body';
   const token=`${role}-${String(size).replace('.','_')}`;el.dataset.dpSize=token;fontBases.set(token,{role,size});
  }
  for(const [i,el] of [...document.querySelectorAll('main>section')].entries()){
   const c=getComputedStyle(el);el.dataset.dpSpace=String(i);spaceBases.set(String(i),{top:parseFloat(c.paddingTop)||0,bottom:parseFloat(c.paddingBottom)||0});
  }
  for(const [i,el] of [...document.querySelectorAll('.section-intro,.hero-action,.pricing-layout,.process-list,.process-list li,.faq-grid,.hero-foot')].entries()){
   const c=getComputedStyle(el);el.dataset.dpGap=String(i);gapBases.set(String(i),{row:parseFloat(c.rowGap),column:parseFloat(c.columnGap),top:el.matches('.hero-foot')?parseFloat(c.marginTop):NaN});
  }
 }
 function controlHTML([id,label,type,value,min,max,step,unit]){
  if(type==='checkbox')return `<div class="control toggle"><label for="dp-${id}">${label}</label><input id="dp-${id}" data-key="${id}" type="checkbox"></div>`;
  if(type==='select')return `<div class="control"><label for="dp-${id}">${label}</label><select id="dp-${id}" data-key="${id}">${min.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select></div>`;
  if(type==='color')return `<div class="control"><label for="dp-${id}">${label}</label><div class="color-row"><input id="dp-${id}" data-key="${id}" type="color"><input id="hex-${id}" data-hex="${id}" type="text" maxlength="7" spellcheck="false" aria-label="${label}色碼" placeholder="#124d76"></div></div>`;
  return `<div class="control"><label for="dp-${id}">${label}<output for="dp-${id}" id="out-${id}"></output></label><input id="dp-${id}" data-key="${id}" type="range" min="${min}" max="${max}" step="${step}"></div>`;
 }
 function sync(){
  for(const [id,,type,,,,,unit] of CONTROLS){const input=$(`#dp-${id}`);if(type==='checkbox')input.checked=settings[id];else input.value=settings[id];if(type==='color'){$(`#hex-${id}`).value=settings[id];$(`#hex-${id}`).removeAttribute('aria-invalid');}if(type==='range')$(`#out-${id}`).value=`${Number(settings[id].toFixed(3))}${unit||''}`;}
  $('#undo').disabled=cursor===0;$('#redo').disabled=cursor===history.length-1;
  $('#compare').setAttribute('aria-pressed',String(original));$('#compare').textContent=original?'返回我的設計':'查看原版';
 }
 function apply(){
  const s=settings,fonts={sans:'"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif',serif:'"Noto Serif TC","Songti TC",serif',system:'"PingFang TC","Microsoft JhengHei",sans-serif'};
  document.documentElement.toggleAttribute('data-design-active',!original);
  const scope='html[data-design-active]';
  const on=onColor(s.accent),factor=1/s.speed,r=s.radius;
  let css=`${scope}{--sans:${fonts[s.bodyFont]};--display:${fonts[s.displayFont]};--bg:${s.background};--ink:${s.ink};--muted:${s.muted};--accent:${s.accent};--on-accent:${on};--surface:${s.surface};--selected:color-mix(in srgb,${s.accent} 18%,white);--border:color-mix(in srgb,${s.ink} 50%,white);--gutter:clamp(24px,${s.gutter}vw,96px)}
${scope} body{background:var(--bg);color:var(--ink)}
${scope} :is(.header,.footer,main){font-family:var(--sans)}
${scope} :is(h1,h2,.process-list h3,#preview-caption){font-family:var(--display)}
${scope} :is(.hero,.process,.quote-form,.rate-table tbody tr:nth-child(even)){background:var(--surface)}
${scope} .sample{background:var(--bg)}
${scope} :is(.primary,.subtitle-studio,.rate-table thead,.contact-link){background:var(--accent);color:var(--on-accent)}
${scope} .subtitle-preview{color:var(--on-accent)}
${scope} :is(.preview-meta,.preview-note){color:color-mix(in srgb,var(--on-accent) 83%,var(--accent))}
${scope} .srt-content{background:color-mix(in srgb,var(--accent) 10%,white)}
${scope} .cue.selected{background:color-mix(in srgb,var(--accent) 22%,white)}
${scope} .process-list li:nth-child(even){background:color-mix(in srgb,var(--accent) 9%,white)}
${scope} .contact{background:${s.contact};color:var(--ink)}
${scope} .header-contact{background:color-mix(in srgb,var(--accent) 9%,white)}
${scope} :is(.button,.cue,.header-contact){border-radius:${r}px}
${scope} :is(.duration-inputs input,.select-label select,textarea){border-radius:${r+4}px}
${scope} .quote-result{border-radius:${r+2}px}
${scope} :is(.subtitle-studio,.quote-form){border-radius:${r*2}px}
${scope} .process-list li:nth-child(even){border-radius:${r+4}px}
${scope} .contact-link{border-radius:${r+2}px}
${scope} .hero{text-align:${s.align}}
${scope} .hero-action{align-items:${s.align==='left'?'flex-start':'center'}}
${scope} .hero .depth-convex{border-radius:${r+8}px;${s.depth?`background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 85%,white),var(--accent));box-shadow:inset 0 6px 10px rgb(255 255 255 / .14),inset 0 -5px 9px color-mix(in srgb,var(--accent) 50%,transparent),0 10px 20px -5px color-mix(in srgb,var(--accent) ${30*s.shadow}%,transparent)`:'background:var(--accent);box-shadow:none'}}
${scope} .hero .depth-convex:hover{filter:brightness(1.06);box-shadow:${s.depth?`0 14px 24px -5px color-mix(in srgb,var(--accent) ${30*s.shadow}%,transparent)`:'none'}}
${s.lineHeight!==DEFAULTS.lineHeight?`${scope} :is(p,li,td,th,label,legend,dt,dd){line-height:${s.lineHeight}}`:''}
${scope} :is(h1,h2,h3){${s.weight==='original'?'':`font-weight:${s.weight};`}}
${s.align==='left'?`${scope} .hero-description>p:last-child{margin-left:0;max-width:none}`:''}
${scope} .hero-typewriter .typewriter-line{white-space:normal;max-width:100%}
${scope} .hero-typewriter .typewriter-char{animation-duration:${0.01*factor}s;animation-delay:calc(${.25*factor}s + var(--i)*${.12*factor}s)}
${scope} .hero-typewriter .typewriter-char::after{animation-duration:${.12*factor}s;animation-delay:calc(${.25*factor}s + var(--i)*${.12*factor}s)}
${scope} .hero-typewriter .typewriter-line:last-child .typewriter-char:last-child::after{animation-duration:${.5*factor}s,${.01*factor}s;animation-delay:${1.33*factor}s,${2.35*factor}s}
${scope} .description-typewriter .desc-part{animation-duration:${.32*factor}s;animation-delay:calc(${.2*factor}s + var(--n)*${.24*factor}s)}
@media(max-width:700px){${scope} :is(.subtitle-studio,.quote-form){border-radius:${r+8}px}}
`;
  if(s.bodyScale>1.05||s.gutter>6||s.contentWidth<1200)css+=`${scope} .header{flex-wrap:wrap}${scope} .header nav{order:3;width:100%;justify-content:space-between;margin-left:0}`;
  if(s.contentWidth!==DEFAULTS.contentWidth)css+=`${scope} :is(.header,.sample,.pricing,.faq,.footer,.process>.wrap,.contact>.wrap){max-width:${s.contentWidth}px}`;
  if(!s.motion)css+=`${scope} :is(.typewriter-char,.desc-part){animation:none!important;opacity:1!important;clip-path:none!important}${scope} .typewriter-char::after{display:none!important}`;
  for(const [token,{role,size}] of fontBases){const scale=role==='hero'?s.heroScale:role==='heading'?s.headingScale:s.bodyScale;css+=`${scope} [data-dp-size="${token}"]{font-size:${+(size*scale).toFixed(3)}px!important;${s.tracking?`letter-spacing:${s.tracking}em!important;`:''}}`;}
  for(const [token,{top,bottom}] of spaceBases)css+=`${scope} [data-dp-space="${token}"]{padding-top:${top*s.sectionSpace}px;padding-bottom:${bottom*s.sectionSpace}px}`;
  for(const [token,g] of gapBases)css+=`${scope} [data-dp-gap="${token}"]{${Number.isFinite(g.row)?`row-gap:${g.row*s.gap}px;`:''}${Number.isFinite(g.column)?`column-gap:${g.column*s.gap}px;`:''}${Number.isFinite(g.top)?`margin-top:${g.top*s.gap}px;`:''}}`;
  css+='@media(prefers-reduced-motion:reduce){html[data-design-active] :is(.typewriter-char,.desc-part){animation:none!important;opacity:1!important;clip-path:none!important}html[data-design-active] .typewriter-char::after{display:none!important}}';
  style.textContent=css;
  const bodyRatio=contrast(s.ink,s.background),mutedRatio=contrast(s.muted,s.surface),buttonRatio=contrast(on,s.accent);
  $('#contrast').innerHTML=`<p><strong>即時對比檢查</strong></p><p class="${bodyRatio<4.5?'warn':''}">主要文字／背景 ${bodyRatio.toFixed(1)}:1${bodyRatio<4.5?' · 建議調深文字或調淺背景':''}</p><p class="${mutedRatio<4.5?'warn':''}">次要文字／底色 ${mutedRatio.toFixed(1)}:1${mutedRatio<4.5?' · 對比偏低':''}</p><p>按鈕文字自動配色 ${buttonRatio.toFixed(1)}:1</p>`;
 }
 function say(message){$('#status').textContent=message;}
 function save(){const current=new URL(location.href);if(current.searchParams.has('theme')){current.searchParams.delete('theme');window.history.replaceState(null,'',current.href);}try{localStorage.setItem(key,serialize(settings));storageAvailable=true;say(original?'正在查看原版；你的設定仍已保留。':'已儲存在此瀏覽器。');}catch{storageAvailable=false;say('瀏覽器無法儲存，請匯出設定備份。');}}
 function commit(){const snapshot=JSON.stringify(settings);if(snapshot!==history[cursor]){history=history.slice(0,cursor+1);history.push(snapshot);if(history.length>50)history.shift();cursor=history.length-1;}sync();save();}
 function replace(next,message){settings=normalize(next);original=false;apply();commit();if(message)say(message);}
 root.addEventListener('input',event=>{
  const input=event.target,id=input.dataset.key,hex=input.dataset.hex;
  if(hex){const valid=/^#[0-9a-f]{6}$/i.test(input.value);input.setAttribute('aria-invalid',String(!valid));if(!valid)return;settings[hex]=input.value.toLowerCase();$(`#dp-${hex}`).value=settings[hex];}
  else if(id){settings[id]=input.type==='checkbox'?input.checked:input.type==='range'?Number(input.value):input.value;const out=$(`#out-${id}`);if(out){const c=CONTROLS.find(c=>c[0]===id);out.value=`${Number(settings[id].toFixed(3))}${c[7]||''}`;}if(input.type==='color')$(`#hex-${id}`).value=input.value;}
  else return;
  settings=normalize(settings);original=false;apply();$('#compare').setAttribute('aria-pressed','false');$('#compare').textContent='查看原版';save();
 });
 root.addEventListener('change',event=>{if(event.target.dataset.hex&&event.target.getAttribute('aria-invalid')==='true'){say('請輸入完整的六位色碼，例如 #124d76。');return;}if(event.target.dataset.key||event.target.dataset.hex)commit();});
 function open(){$('#panel').hidden=false;$('#launch').hidden=true;$('#launch').setAttribute('aria-expanded','true');$('#close').focus();}
 function close(){ $('#panel').hidden=true;$('#launch').hidden=false;$('#launch').setAttribute('aria-expanded','false');$('#launch').focus();}
 $('#launch').onclick=open;$('#close').onclick=close;$('#hide').onclick=close;
 $('#dock').onclick=()=>{const left=$('#panel').classList.toggle('left');$('#dock').setAttribute('aria-label',`將面板移至${left?'右':'左'}側`);};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#panel').hidden){close();e.preventDefault();}if(e.altKey&&e.shiftKey&&e.code==='KeyD'){e.preventDefault();$('#panel').hidden?open():close();}});
 $('#compare').onclick=()=>{original=!original;apply();sync();say(original?'正在查看未調整的正式原版。':'已返回你的設計預覽。');};
 $('#undo').onclick=()=>{if(cursor){settings=JSON.parse(history[--cursor]);original=false;apply();sync();save();}};
 $('#redo').onclick=()=>{if(cursor<history.length-1){settings=JSON.parse(history[++cursor]);original=false;apply();sync();save();}};
 $('#reset').onclick=()=>replace(DEFAULTS,'已重設；可用復原取回前一個設定。');
 root.querySelectorAll('[data-preset]').forEach(button=>button.onclick=()=>{const themes={clear:{accent:'#124d76',ink:'#124d76',muted:'#45667d',background:'#fbfdff',surface:'#edf5fc',contact:'#d5eafa'},teal:{accent:'#18594f',ink:'#21483f',muted:'#4c6c61',background:'#fcfefc',surface:'#edf6f0',contact:'#dbeee3'},slate:{accent:'#455d76',ink:'#293e55',muted:'#5b6b7c',background:'#fcfdff',surface:'#eef2f7',contact:'#dde6ef'}};replace({...settings,...themes[button.dataset.preset]});});
 $('#replay').onclick=()=>{if(!settings.motion||matchMedia('(prefers-reduced-motion: reduce)').matches){say('目前使用靜態文字模式。');return;}for(const el of document.querySelectorAll('.hero-typewriter,.description-typewriter'))for(const animation of el.getAnimations({subtree:true})){animation.currentTime=0;animation.play();}say('已重播打字動畫。');};
 $('#export').onclick=()=>{const blob=new Blob([serialize(settings)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='音律工作室-設計設定.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);say('已匯出設定，可交給我套用正式版。');};
 $('#import').onclick=()=>$('#file').click();
 $('#file').onchange=async()=>{const file=$('#file').files[0];if(!file)return;try{if(file.size>20000)throw new Error();replace(parseSettings(await file.text()),'已匯入設定。');}catch{say('匯入失敗，請選擇此面板匯出的 JSON 設定檔。');}finally{$('#file').value='';}};
 $('#share').onclick=async()=>{const url=new URL(document.querySelector('link[rel=canonical]')?.href||location.href);url.searchParams.set('design','1');url.searchParams.set('theme',serialize(settings));url.hash='';try{await navigator.clipboard.writeText(url.href);$('#share-fallback').hidden=true;say('已複製含設定的預覽連結。');}catch{$('#share-fallback').value=url.href;$('#share-fallback').hidden=false;$('#share-fallback').focus();$('#share-fallback').select();say('無法自動複製，請手動複製下方連結。');}};
 window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{capture();apply();},120);});
 capture();apply();sync();say(storageAvailable?startMessage:'瀏覽器無法儲存，請匯出設定備份。');
 if(params.get('design')==='1')open();
}
