export const VERSION = 1;
export const GROUPS = [
  { title: '字型與文字', controls: [
    ['bodyFont','內文字型','select','sans',[['sans','思源黑體'],['serif','思源宋體'],['system','系統黑體']]],
    ['displayFont','標題字型','select','sans',[['sans','思源黑體'],['serif','思源宋體'],['system','系統黑體']]],
    ['bodyScale','內文字級','range',1,0.85,1.35,0.05,'×'],
    ['heroScale','首頁主標大小','range',1,0.7,1.3,0.05,'×'],
    ['headingScale','區段標題大小','range',1,0.8,1.3,0.05,'×'],
    ['weight','標題字重','select','original',[['original','原設定'],['400','標準 400'],['500','中等 500'],['600','半粗 600'],['700','粗體 700']]],
    ['lineHeight','內文行距','range',1.8,1.4,2.4,0.05,''],
    ['tracking','字距調整','range',0,-0.01,0.06,0.005,'em'],
    ['align','主視覺對齊','select','center',[['center','置中'],['left','靠左']]]
  ]},
  { title: '顏色與代表色', controls: [
    ['accent','代表色／主要按鈕','color','#124d76'],
    ['ink','主要文字','color','#124d76'],
    ['muted','次要文字','color','#45667d'],
    ['background','網頁背景','color','#fbfdff'],
    ['surface','區塊底色','color','#edf5fc'],
    ['contact','聯絡區底色','color','#d5eafa']
  ]},
  { title: '版面與留白', controls: [
    ['sectionSpace','區段上下留白','range',1,0.65,1.6,0.05,'×'],
    ['gap','元件間距','range',1,0.7,1.6,0.05,'×'],
    ['gutter','水平留白','range',6,3,10,0.5,'vw'],
    ['contentWidth','內容最大寬度','range',1440,1000,1600,40,'px'],
    ['radius','圓角程度','range',12,0,24,1,'px']
  ]},
  { title: '按鈕與動態', controls: [
    ['depth','立體詢價按鈕','checkbox',true],
    ['shadow','陰影強度','range',1,0,1.5,0.1,'×'],
    ['motion','打字動畫','checkbox',true],
    ['speed','動畫播放速度','range',1,0.5,2,0.1,'×']
  ]}
];
export const CONTROLS = GROUPS.flatMap(g => g.controls);
export const DEFAULTS = Object.freeze(Object.fromEntries(CONTROLS.map(c => [c[0], c[3]])));
export function normalize(value) {
  const result = { ...DEFAULTS };
  if (!value || typeof value !== 'object' || Array.isArray(value)) return result;
  for (const [key,,type,,min,max,step] of CONTROLS) {
    if (!Object.hasOwn(value,key)) continue;
    const v = value[key];
    if (type === 'color' && typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v)) result[key] = v.toLowerCase();
    if (type === 'checkbox' && typeof v === 'boolean') result[key] = v;
    if (type === 'select' && min.some(([option]) => option === v)) result[key] = v;
    if (type === 'range' && typeof v === 'number' && Number.isFinite(v)) {
      const bounded = Math.max(min,Math.min(max,v));
      result[key] = Number((min + Math.round((bounded-min)/step)*step).toFixed(4));
    }
  }
  return result;
}
export function parseSettings(text) {
  if (typeof text !== 'string' || text.length > 20000) throw new Error('設定檔過大或格式不正確。');
  const data = JSON.parse(text);
  if (!data || data.version !== VERSION || !data.settings || typeof data.settings !== 'object' || Array.isArray(data.settings)) throw new Error('請使用此面板匯出的版本 1 設定檔。');
  return normalize(data.settings);
}
export function serialize(settings) { return JSON.stringify({ version: VERSION, settings: normalize(settings) },null,2); }
export function contrast(a,b) {
  const luminance = hex => {
    const c = hex.slice(1).match(/../g).map(s=>parseInt(s,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
    return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
  };
  const x=luminance(a),y=luminance(b);
  return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
}
export function onColor(hex) { return contrast(hex,'#ffffff') >= contrast(hex,'#102333') ? '#ffffff' : '#102333'; }
