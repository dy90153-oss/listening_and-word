import { directions } from './catalog.mjs';
const ids = directions.map(d => d.id);
const stage = document.querySelector('#preview-stage');
const tabs = [...document.querySelectorAll('.direction-tab')];
const jump = document.querySelector('#section-jump');
const allowedSections = [...jump.options].map(o => o.value);
const status = document.querySelector('#choice-status');
let saved = {};
try { saved = JSON.parse(localStorage.getItem('yinlu-design-explorer') || '{}'); } catch {}
const params = new URLSearchParams(location.hash.slice(1));
let active = ids.includes(params.get('v')) ? params.get('v') : ids.includes(saved.active) ? saved.active : 'editorial';
let view = ['desktop', 'phone'].includes(params.get('view')) ? params.get('view') : ['desktop', 'phone'].includes(saved.view) ? saved.view : 'desktop';
let section = allowedSections.includes(params.get('section')) ? params.get('section') : 'free';
let statusTimer;

function persist() {
  const next = new URLSearchParams({ v: active, view });
  if (section !== 'free') next.set('section', section);
  history.replaceState(null, '', `${location.pathname}#${next}`);
  try { localStorage.setItem('yinlu-design-explorer', JSON.stringify({ active, view })); } catch {}
}
function jumpFrame(frame) {
  if (section === 'free') return;
  frame.contentWindow?.postMessage({ type: 'yinlu-jump', section }, location.origin);
}
function makeFrame(id) {
  let frame = document.querySelector(`#frame-${id}`);
  if (frame) return frame;
  frame = document.createElement('iframe');
  frame.id = `frame-${id}`;
  frame.title = `${directions.find(d => d.id === id).label}：完整網站預覽`;
  frame.src = `./variants/${id}.html`;
  document.querySelector(`#panel-${id}`).appendChild(frame);
  frame.addEventListener('load', () => { if (id === active) jumpFrame(frame); });
  return frame;
}
function choose(id, focus = false) {
  if (!ids.includes(id)) return;
  active = id;
  const direction = directions.find(d => d.id === id);
  for (const tab of tabs) {
    const selected = tab.dataset.direction === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.querySelector(`#panel-${tab.dataset.direction}`).hidden = !selected;
  }
  const frame = makeFrame(id);
  document.querySelector('#direction-description').textContent = direction.description;
  document.querySelector('#direction-position').textContent = `${ids.indexOf(id) + 1} / ${ids.length}`;
  document.querySelector('#standalone-link').href = `./variants/${id}.html${section === 'free' ? '' : '#' + (section === 'hero' ? 'main' : section)}`;
  status.textContent = '';
  if (focus) {
    const tab = tabs.find(t => t.dataset.direction === id);
    tab.focus({ preventScroll: true });
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
  persist();
  jumpFrame(frame);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', event => { event.preventDefault(); choose(tab.dataset.direction); });
  tab.addEventListener('keydown', event => {
    const shifts = { ArrowRight: 1, ArrowLeft: -1 };
    if (event.key === 'Home' || event.key === 'End' || event.key in shifts) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? ids.length - 1 : (index + shifts[event.key] + ids.length) % ids.length;
      choose(ids[next], true);
    }
  });
});
document.querySelector('#previous').addEventListener('click', () => choose(ids[(ids.indexOf(active) - 1 + ids.length) % ids.length]));
document.querySelector('#next').addEventListener('click', () => choose(ids[(ids.indexOf(active) + 1) % ids.length]));
function setView(value) {
  view = value;
  stage.dataset.view = value;
  document.querySelectorAll('[data-view]').forEach(button => { if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.view === value)); });
  persist();
}
document.querySelectorAll('button[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
jump.value = section;
jump.addEventListener('change', () => { section = jump.value; choose(active); });
document.querySelector('#copy-direction').addEventListener('click', async () => {
  const name = directions.find(d => d.id === active).label;
  const text = `我選擇「${name}」，請以這個方向繼續延伸音律工作室網站，保留已確認的服務內容、報價與 LINE 詢價目標。`;
  clearTimeout(statusTimer);
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = `已複製「${name}」，回到對話貼上即可。`;
  } catch {
    status.textContent = `目前方向：「${name}」。回到對話告訴我這個名稱即可。`;
  }
  try { localStorage.setItem('yinlu-preferred-direction', active); } catch {}
  statusTimer = setTimeout(() => { status.textContent = ''; }, 9000);
});
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.data?.type !== 'yinlu-ready') return;
  const frame = document.querySelector(`#frame-${active}`);
  if (frame?.contentWindow === event.source) jumpFrame(frame);
});
document.querySelector('#frame-editorial').addEventListener('load', event => { if (active === 'editorial') jumpFrame(event.target); });
setView(view);
choose(active);
if ('requestIdleCallback' in window) requestIdleCallback(() => { ids.forEach(makeFrame); }, { timeout: 1800 });
else setTimeout(() => ids.forEach(makeFrame), 1000);
