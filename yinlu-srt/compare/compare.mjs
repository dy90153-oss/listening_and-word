const versions={original:{name:'A 清朗原版',description:'保留目前正式版：置中開場、打字動畫、立體 LINE 按鈕與原有段落配置。'},work:{name:'B 成品先行',description:'把 SRT 成品放進第一屏，文字靠左、資訊直接，讓訪客先看到交付內容。'}};
const $=s=>document.querySelector(s),tabs=[...document.querySelectorAll('[data-version]')];
const params=new URLSearchParams(location.hash.slice(1));
let active=Object.hasOwn(versions,params.get('version'))?params.get('version'):'work';
let view=params.get('view')==='phone'?'phone':'desktop',both=params.get('layout')==='split',section=['hero','sample','pricing','process','faq','contact'].includes(params.get('section'))?params.get('section'):'hero',timer;
function jump(id){$(`#frame-${id}`).contentWindow?.postMessage({type:'yinlu-jump',section},location.origin);}
function render(){
 for(const tab of tabs){const selected=tab.dataset.version===active;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;$(`#panel-${tab.dataset.version}`).hidden=!both&&!selected;}
 $('#stage').dataset.view=view;$('#stage').dataset.layout=both?'split':'single';$('#both').setAttribute('aria-pressed',String(both));
 document.querySelectorAll('button[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));
 $('#section').value=section;$('#description').textContent=versions[active].description;$('#standalone').href=`/compare/variants/${active}.html#${section==='hero'?'main':section}`;$('#choose').textContent=`我選 ${versions[active].name}`;$('#status').textContent='';
 history.replaceState(null,'',`${location.pathname}#${new URLSearchParams({version:active,view,layout:both?'split':'single',section})}`);
 for(const id of both?Object.keys(versions):[active])jump(id);
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',e=>{e.preventDefault();active=tab.dataset.version;render();});tab.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();active=e.key==='Home'?'original':e.key==='End'?'work':tabs[1-i].dataset.version;render();tabs.find(t=>t.dataset.version===active).focus();}});});
$('#both').onclick=()=>{both=!both;render();};document.querySelectorAll('button[data-view]').forEach(b=>b.onclick=()=>{view=b.dataset.view;render();});$('#section').onchange=()=>{section=$('#section').value;render();};
$('#choose').onclick=async()=>{const message=`我選擇「${versions[active].name}」，請將這一版套用到音律工作室正式首頁，保留已確認的服務內容、報價與 LINE 詢價流程。`;clearTimeout(timer);try{await navigator.clipboard.writeText(message);$('#status').textContent=`已複製「${versions[active].name}」，回到對話貼上即可。`;}catch{$('#status').textContent=`請回到對話告訴我：我選擇「${versions[active].name}」。`;}timer=setTimeout(()=>$('#status').textContent='',12000);};
window.addEventListener('message',e=>{if(e.origin!==location.origin||e.data?.type!=='yinlu-ready')return;for(const id of Object.keys(versions))if(e.source===$(`#frame-${id}`).contentWindow)jump(id);});
for(const id of Object.keys(versions))$(`#frame-${id}`).addEventListener('load',()=>jump(id));
render();
// In dual desktop mode both pages share a true 1440px viewport, scaled to fit their panes.
const frameObserver=new ResizeObserver(entries=>{for(const {target} of entries)if(target.clientWidth)target.style.setProperty('--preview-scale',String(Math.min(1,target.clientWidth/1440)));});
document.querySelectorAll('.frame-shell').forEach(shell=>frameObserver.observe(shell));
