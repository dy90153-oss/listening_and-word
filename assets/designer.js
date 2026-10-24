(function(){
  'use strict';
  const model=window.StudioDesign;
  const preview=document.getElementById('sitePreview');
  if(!model||!preview||!window.StudioTheme)return;
  const KEY='yinlu-studio-design-v1';
  const siteDefaults=model.normalize(window.STUDIO_CONFIG?.design);
  let state={...siteDefaults},history=[],pending=null,storageWorks=true,dirty=false;
  try{const saved=localStorage.getItem(KEY);if(saved)state=model.normalize(JSON.parse(saved).settings);}catch{storageWorks=false;}
  const icon=paths=>`<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
  const closeIcon=icon('<path d="m6 6 12 12M18 6 6 18"/>');
  const tuneIcon=icon('<path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>');
  const undoIcon=icon('<path d="M9 5 4 10l5 5M4 10h9a6 6 0 0 1 6 6v2"/>');
  const sideIcon=icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M14 4v16"/>');
  function select(key,title,options){return `<div class="design-control"><label class="design-control-head" for="design-${key}">${title}</label><select id="design-${key}" data-setting="${key}">${options.map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select></div>`;}
  function range(key,title,min,max,step,unit=''){return `<div class="design-control"><div class="design-control-head"><label for="design-${key}">${title}</label><output for="design-${key}" data-value="${key}" data-unit="${unit}" aria-hidden="true"></output></div><input id="design-${key}" data-setting="${key}" type="range" min="${min}" max="${max}" step="${step}" aria-label="${title}"></div>`;}
  const colors=[['accent','品牌代表色'],['primary','主要按鈕色'],['background','網頁背景'],['surface','區塊底色'],['heading','標題文字'],['text','內文文字'],['muted','次要文字']];
  const colorRows=colors.map(([key,title])=>`<div class="design-color-row"><label for="design-${key}">${title}</label><input id="design-${key}" data-setting="${key}" type="color" aria-label="${title}色票"><input id="design-hex-${key}" class="design-hex" data-hex="${key}" aria-label="${title}色碼" type="text" maxlength="7" spellcheck="false" pattern="#[0-9a-fA-F]{6}" autocomplete="off"></div>`).join('');
  const fonts=[['sans','思源黑體 · Noto Sans TC'],['serif','思源宋體 · Noto Serif TC'],['system','裝置系統字型']];
  const toggle=document.createElement('button');
  toggle.id='designToggle';toggle.type='button';toggle.setAttribute('aria-controls','studioDesigner');toggle.setAttribute('aria-expanded','false');toggle.innerHTML=`${tuneIcon}<span>設計面板</span>`;
  const panel=document.createElement('aside');
  panel.id='studioDesigner';panel.hidden=true;panel.setAttribute('aria-labelledby','designPanelTitle');panel.dataset.side='right';
  panel.innerHTML=`
    <header class="design-header"><h2 id="designPanelTitle">設計面板</h2><div class="design-header-actions"><button class="design-icon" id="designUndo" title="復原上一步" aria-label="復原上一步" disabled>${undoIcon}</button><button class="design-icon" id="designSide" title="將面板移到另一側" aria-label="將面板移到另一側">${sideIcon}</button><button class="design-icon" id="designClose" aria-label="收合設計面板">${closeIcon}</button></div></header>
    <p class="design-description">邊調整，邊看網站的變化。</p>
    <div class="design-presets" aria-label="配色範本"><button type="button" data-preset="studio">深色錄音室</button><button type="button" data-preset="paper">暖白紙感</button><button type="button" data-preset="ocean">海洋藍調</button></div>
    <div class="design-tabs" role="tablist" aria-label="設計設定分類">${[['type','文字'],['color','色彩'],['layout','版面'],['effects','效果']].map(([id,title],i)=>`<button id="design-tab-${id}" type="button" role="tab" aria-selected="${i===0}" aria-controls="design-page-${id}" tabindex="${i===0?'0':'-1'}">${title}</button>`).join('')}</div>
    <div class="design-scroll">
      <div id="design-page-type" role="tabpanel" aria-labelledby="design-tab-type">
        <fieldset class="design-group"><legend>字型與字重</legend>${select('headingFont','標題字型',fonts)}${select('bodyFont','內文字型',fonts)}${select('labelFont','標籤字型',[['mono','儀表等寬 · Space Mono'],['sans','思源黑體 · Noto Sans TC'],['system','裝置系統字型']])}${select('headingWeight','標題字重',[['original','保留原始字重'],['400','一般 · 400'],['600','中粗 · 600'],['700','粗體 · 700'],['900','特粗 · 900']])}</fieldset>
        <fieldset class="design-group"><legend>字級與閱讀節奏</legend>${range('bodySize','內文字級',14,22,1,'px')}${range('labelSize','標籤字級',12,18,1,'px')}${range('headingScale','標題大小',.75,1.5,.05,'×')}${range('lineHeight','內文行距',1.4,2.4,.05,'倍')}${range('headingLineHeight','標題行距',1,1.7,.05,'倍')}${range('tracking','額外字距',-.02,.15,.01,'em')}</fieldset>
      </div>
      <div id="design-page-color" role="tabpanel" aria-labelledby="design-tab-color" hidden><fieldset class="design-group"><legend>網站配色</legend><div class="design-colors">${colorRows}</div></fieldset><p class="design-help">點色票選色，或直接輸入六位數 HEX 色碼。按鈕文字會自動切換深淺，維持可讀性。</p><div class="design-contrast"><p id="designContrast"></p><button type="button" id="designFixContrast" hidden>自動改善文字對比</button></div></div>
      <div id="design-page-layout" role="tabpanel" aria-labelledby="design-tab-layout" hidden><fieldset class="design-group"><legend>版面與留白</legend>${range('pageWidth','內容最大寬度',900,1440,12,'px')}${range('sectionSpace','區塊上下間距',.5,1.8,.05,'×')}${range('gap','欄位與元素間距',.5,1.8,.05,'×')}${range('padding','卡片內距',.5,1.6,.05,'×')}${range('radius','圓角縮放',0,28,1,'%')}${select('headingAlign','標題對齊',[['original','保留各區塊原始對齊'],['left','全部靠左'],['center','全部置中']])}</fieldset><p class="design-help">間距以目前版面為基準。收合面板，可查看完整寬度下的效果。</p></div>
      <div id="design-page-effects" role="tabpanel" aria-labelledby="design-tab-effects" hidden><fieldset class="design-group"><legend>圖片與動態</legend>${range('imageSaturation','圖片飽和度',0,150,5,'%')}<label class="design-check" for="design-texture"><span>背景光影與紋理</span><input type="checkbox" id="design-texture" data-setting="texture"></label><label class="design-check" for="design-motion"><span>波形與動態效果</span><input type="checkbox" id="design-motion" data-setting="motion"></label><p class="design-help">裝置若已開啟「減少動態效果」，網站會優先遵守。</p></fieldset></div>
    </div>
    <footer class="design-footer"><div class="design-footer-actions"><button id="designExport" type="button">匯出設定</button><button id="designImport" type="button">匯入設定</button><button id="designReset" type="button">還原預設</button></div><input id="designImportFile" type="file" accept="application/json,.json" hidden><p id="designStatus" role="status" aria-live="polite">設定會自動儲存在此瀏覽器，可匯出後跨裝置使用。</p></footer>`;
  document.body.append(toggle,panel);
  const find=id=>document.getElementById(id);
  function message(text){find('designStatus').textContent=text;}
  const theme=window.StudioTheme.mount(preview,state);
  function apply(){
    theme.set(state);
    for(const el of panel.querySelectorAll('[data-setting]')){
      const key=el.dataset.setting;
      if(el.type==='checkbox')el.checked=state[key];else el.value=state[key];
      const output=panel.querySelector(`[data-value="${key}"]`);
      if(output){output.textContent=key==='radius'?`${Math.round(state.radius/16*100)}%`:`${Number(state[key].toFixed(2))}${output.dataset.unit}`;el.setAttribute('aria-valuetext',output.textContent);}
    }
    for(const el of panel.querySelectorAll('[data-hex]'))if(document.activeElement!==el){el.value=state[el.dataset.hex];el.setAttribute('aria-invalid','false');el.setCustomValidity('');}
    const bodyContrast=Math.min(model.contrast(state.text,state.background),model.contrast(state.text,state.surface));
    const headingContrast=Math.min(model.contrast(state.heading,state.background),model.contrast(state.heading,state.surface));
    const mutedContrast=Math.min(model.contrast(state.muted,state.background),model.contrast(state.muted,state.surface));
    const accentContrast=Math.min(model.contrast(state.accent,state.background),model.contrast(state.accent,state.surface));
    find('designContrast').textContent=`內文對比 ${bodyContrast.toFixed(1)}:1 · 標題 ${headingContrast.toFixed(1)}:1${bodyContrast<4.5||headingContrast<3||mutedContrast<4.5||accentContrast<4.5?'；部分文字對比偏低。':'，閱讀對比良好。'}`;
    find('designFixContrast').hidden=bodyContrast>=4.5&&headingContrast>=3&&mutedContrast>=4.5&&accentContrast>=4.5;
    find('designUndo').disabled=history.length===0&&pending===null;
  }
  let saveTimer;
  function save(){
    dirty=true;
    clearTimeout(saveTimer);
    saveTimer=setTimeout(()=>{
      try{localStorage.setItem(KEY,JSON.stringify({version:1,settings:state}));storageWorks=true;message('已儲存在此瀏覽器。匯出設定可在其他裝置使用。');}
      catch{storageWorks=false;message('本次預覽有效；瀏覽器無法儲存，請匯出設定保留。');}
    },180);
  }
  window.addEventListener('pagehide',()=>{if(!dirty)return;clearTimeout(saveTimer);try{localStorage.setItem(KEY,JSON.stringify({version:1,settings:state}));}catch{/* Export remains available when storage is blocked. */}});
  function commit(){if(pending){if(JSON.stringify(pending)!==JSON.stringify(state)){history.push(pending);if(history.length>40)history.shift();}pending=null;}find('designUndo').disabled=history.length===0;}
  function replace(next,notice){commit();history.push({...state});state=model.normalize(next);apply();save();if(notice)message(notice);}
  panel.addEventListener('input',event=>{
    const el=event.target;
    const key=el.dataset.setting||el.dataset.hex;if(!key)return;
    let value=el.type==='checkbox'?el.checked:el.type==='range'?Number(el.value):el.value;
    if(el.dataset.hex){
      const valid=/^#[\da-f]{6}$/i.test(value);
      el.setAttribute('aria-invalid',String(!valid));el.setCustomValidity(valid?'':'請輸入 # 加六位數 HEX 色碼，例如 #f59e0b。');
      if(!valid)return;
    }
    if(!pending)pending={...state};
    state=model.normalize({...state,[key]:value});apply();save();
  });
  panel.addEventListener('change',event=>{if(event.target.matches('[data-setting],[data-hex]'))commit();});
  find('designUndo').addEventListener('click',()=>{commit();if(!history.length)return;state=history.pop();apply();save();message('已復原上一步。');});
  find('designReset').addEventListener('click',()=>replace(siteDefaults,'已還原預設；可按左上角的復原按鈕取消。'));
  panel.querySelectorAll('[data-preset]').forEach(el=>el.addEventListener('click',()=>replace({...state,...Object.fromEntries([...model.colorKeys,'texture'].map(key=>[key,model.presets[el.dataset.preset][key]]))},'已套用配色範本；字級與間距保持目前設定。')));
  find('designFixContrast').addEventListener('click',()=>{
    const score=color=>Math.min(model.contrast(color,state.background),model.contrast(color,state.surface));
    const best=score('#000000')>=score('#ffffff')?'#000000':'#ffffff';
    replace({...state,text:score(state.text)<4.5?best:state.text,heading:score(state.heading)<3?best:state.heading,muted:score(state.muted)<4.5?best:state.muted,accent:score(state.accent)<4.5?best:state.accent});
    if(score(best)<4.5)message('背景與區塊色差太大，建議先調整成相近明暗，再改善文字對比。');
  });
  function setOpen(open){panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)find('designClose').focus({preventScroll:true});else toggle.focus({preventScroll:true});}
  toggle.addEventListener('click',()=>setOpen(panel.hidden));find('designClose').addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){event.preventDefault();setOpen(false);}});
  find('designSide').addEventListener('click',()=>{panel.dataset.side=panel.dataset.side==='right'?'left':'right';});
  function setTab(tab){
    panel.querySelectorAll('[role=tab]').forEach(el=>{const active=el===tab;el.setAttribute('aria-selected',String(active));el.tabIndex=active?0:-1;find(el.getAttribute('aria-controls')).hidden=!active;});
    panel.querySelector('.design-scroll').scrollTop=0;
  }
  panel.querySelectorAll('[role=tab]').forEach(tab=>{
    tab.addEventListener('click',()=>setTab(tab));
    tab.addEventListener('keydown',event=>{
      if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
      event.preventDefault();const tabs=Array.from(panel.querySelectorAll('[role=tab]'));const index=tabs.indexOf(tab);
      const next=event.key==='Home'?tabs[0]:event.key==='End'?tabs.at(-1):tabs[(index+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length];setTab(next);next.focus();
    });
  });
  find('designExport').addEventListener('click',()=>{
    commit();const blob=new Blob([JSON.stringify({version:1,settings:state},null,2)+'\n'],{type:'application/json'});
    const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='音律工作室-設計設定.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('已匯出設計設定，可在其他瀏覽器匯入。');
  });
  find('designImport').addEventListener('click',()=>find('designImportFile').click());
  find('designImportFile').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try{
      if(file.size>65536)throw Error('設定檔過大，請選擇面板匯出的 JSON 檔。');
      const data=JSON.parse(await file.text());
      if(data.version!==1||!data.settings||typeof data.settings!=='object'||Array.isArray(data.settings)||!Object.keys(model.defaults).some(key=>Object.hasOwn(data.settings,key)))throw Error('這不是有效的設計設定檔，請選擇面板匯出的 JSON 檔。');
      replace(data.settings,'已匯入設定，可按復原回到匯入前。');
    }catch(error){message(error instanceof SyntaxError?'檔案格式無法讀取，請選擇有效的 JSON 設定檔。':error.message);}
    event.target.value='';
  });
  apply();
  if(!storageWorks)message('瀏覽器無法讀取已存設定；你仍可預覽並匯出。');
  try{if(!sessionStorage.getItem('yinlu-designer-seen')){sessionStorage.setItem('yinlu-designer-seen','1');setOpen(true);}}catch{/* The launch button always remains available. */}
})();
