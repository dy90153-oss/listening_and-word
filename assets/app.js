'use strict';
const config = window.STUDIO_CONFIG;
const pricing = config.pricing;
const $ = id => document.getElementById(id);
const minutesInput = $('minutesInput');
const minutesRange = $('minutesRange');
const quoteText = $('quoteText');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reduceMotion = () => motion.matches || document.documentElement.dataset.designMotion === 'off';
let currentQuote;

for (const input of [minutesInput,minutesRange]) {
  input.min = pricing.minMinutes;
  input.max = pricing.maxMinutes;
  input.step = 1;
}
$('currentYear').textContent = new Date().getFullYear();

function calculate() {
  currentQuote = StudioQuote.quote({minutes:minutesInput.value,
    speed:document.querySelector('input[name="turnaroundSpeed"]:checked')?.value,
    legalMedical:$('legalMedical').checked,noTimestamp:$('noTimestamp').checked,addSrt:$('addSrt').checked},pricing);
  minutesInput.setAttribute('aria-invalid',String(!currentQuote.valid));
  minutesInput.setCustomValidity(currentQuote.valid ? '' : currentQuote.error);
  $('minutesError').textContent = currentQuote.valid ? '' : currentQuote.error;
  $('totalPrice').textContent = currentQuote.valid ? currentQuote.total.toLocaleString('zh-TW') : '—';
  $('priceNote').textContent = currentQuote.valid ? currentQuote.note : '請先修正音檔長度，即可繼續試算。';
  quoteText.value = currentQuote.valid ? currentQuote.message.replace('音律工作室', config.brand) : '';
  $('copyQuote').disabled = !currentQuote.valid;
  $('quoteStatus').textContent = '';
  if (currentQuote.valid) minutesRange.value = currentQuote.minutes;
  return currentQuote;
}
minutesRange.addEventListener('input',() => {minutesInput.value = minutesRange.value; calculate();});
minutesInput.addEventListener('input',calculate);
document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => el.addEventListener('change',calculate));

async function copyQuote() {
  if (!calculate().valid) { minutesInput.reportValidity(); minutesInput.focus(); return false; }
  try {
    await navigator.clipboard.writeText(quoteText.value);
    $('quoteStatus').textContent = '已複製詢價內容，可以貼到 LINE。';
    return true;
  } catch {
    quoteText.focus(); quoteText.select();
    $('quoteStatus').textContent = '無法自動複製，已為你選取內容；請長按複製，或按 Ctrl / ⌘ + C。';
    return false;
  }
}
$('copyQuote').addEventListener('click',copyQuote);

function validLineUrl() {
  try { const u = new URL(config.lineUrl); return u.protocol === 'https:' && ['line.me','lin.ee'].includes(u.hostname) ? u.href : ''; }
  catch { return ''; }
}
const lineUrl = validLineUrl();
function pendingContact() {
  $('contactStatus').textContent = 'LINE 聯絡方式尚未設定。你可以先試算並複製詢價內容。';
  $('contact').scrollIntoView({behavior:reduceMotion() ? 'instant' : 'smooth'});
}
$('contactStatus').textContent = lineUrl ? '歡迎透過 LINE 諮詢與預約排程。' : '聯絡方式待設定，目前可先試算費用與複製詢價內容。';
document.querySelectorAll('[data-contact="line"]').forEach(link => {
  link.href = lineUrl || '#contact';
  if (!lineUrl) link.addEventListener('click',event => {event.preventDefault(); pendingContact();});
});
window.contactWithQuote = function() {
  if (!calculate().valid) { minutesInput.reportValidity(); minutesInput.focus(); return; }
  if (!lineUrl) {pendingContact(); return;}
  // 在使用者點擊當下開啟，避免非同步剪貼簿操作觸發彈出視窗阻擋。
  window.open(lineUrl,'_blank','noopener,noreferrer');
  copyQuote();
};
window.scrollToTop = () => window.scrollTo({top:0,behavior:reduceMotion() ? 'instant' : 'smooth'});
const backToTop = $('backToTop');
window.addEventListener('scroll',() => {
  const visible = window.scrollY > 350;
  backToTop.classList.toggle('opacity-0',!visible);
  backToTop.classList.toggle('pointer-events-none',!visible);
  backToTop.tabIndex = visible ? 0 : -1;
}, {passive:true});
calculate();

// 圖示與動畫是漸進增強，失敗時也不影響文字、報價及詢價功能。
if (window.lucide?.createIcons) {
  try { window.lucide.createIcons(); } catch (error) { console.warn('圖示載入失敗',error); }
}
const heroCard = $('heroCard');
if (matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove',e => {
    if (reduceMotion()) return;
    document.documentElement.style.setProperty('--mouse-x',`${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y',`${e.clientY}px`);
  },{passive:true});
  heroCard?.addEventListener('mousemove',e => {
    if (reduceMotion()) return;
    const r = heroCard.getBoundingClientRect();
    heroCard.style.transform = `perspective(1000px) rotateX(${-(e.clientY-r.top-r.height/2)*.015}deg) rotateY(${(e.clientX-r.left-r.width/2)*.015}deg)`;
  });
  heroCard?.addEventListener('mouseleave',() => {heroCard.style.transform = '';});
}
const canvas = $('audioOscilloscope');
const ctx = canvas?.getContext('2d');
if (ctx) {
  let step = 0, frame = 0, visible = true, last = 0, meterAt = 0;
  function draw(time = 0) {
    frame = 0;
    if (time-last < 32 && !reduceMotion()) {frame = requestAnimationFrame(draw);return;}
    last = time;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    const ratio = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(w*ratio) || canvas.height !== Math.round(h*ratio)) {
      canvas.width = Math.round(w*ratio); canvas.height = Math.round(h*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);
    }
    ctx.clearRect(0,0,w,h);
    step += .045;
    for (const [color,amplitude,offset] of [[getComputedStyle(document.documentElement).getPropertyValue('--design-accent').trim() || '#f59e0b',11,0],['#b8c4b9',5,2]]) {
      ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=offset ? 1 : 2;
      for (let x=0;x<w;x++) {
        const y=h/2+(Math.sin(x*.04+step+offset)*amplitude+Math.sin(x*.08-step)*5)*Math.sin(x/w*Math.PI);
        if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
    if (time-meterAt>180 || reduceMotion()) {
      document.querySelectorAll('#vuLeft, #vuRight').forEach(meter => {
        const level = reduceMotion() ? 3 : Math.floor(Math.random()*6);
        meter.querySelectorAll('span').forEach((led,i) => {led.style.opacity = i<=level ? '1' : '.15';});
      });
      meterAt=time;
    }
    if (!reduceMotion() && !document.hidden && visible) frame=requestAnimationFrame(draw);
  }
  function refresh() {
    cancelAnimationFrame(frame); frame=0;
    if (reduceMotion() || (!document.hidden && visible)) draw();
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {visible=entries[0].isIntersecting;refresh();}).observe(canvas);
  document.addEventListener('visibilitychange',refresh);
  document.addEventListener('studio:designchange',refresh);
  window.addEventListener('resize',refresh,{passive:true});
  motion.addEventListener('change',() => {if(heroCard)heroCard.style.transform='';refresh();});
  refresh();
}
