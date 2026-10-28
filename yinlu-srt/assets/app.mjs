import { calculateQuote, enquiryText, PRICING } from './quote.mjs';

const form = document.querySelector('#quote-form');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const speed = document.querySelector('#speed');
const professional = document.querySelector('#professional');
const error = document.querySelector('#quote-error');
const result = document.querySelector('#quote-result');
const copyButton = document.querySelector('#copy-quote');
const status = document.querySelector('#copy-status');
const fallback = document.querySelector('#copy-fallback');
let currentQuote;
const money = value => `NT$${value.toLocaleString('zh-TW')}`;

function updateQuote() {
  status.textContent = '';
  fallback.hidden = true;
  try {
    if (minutes.value.trim() === '' || seconds.value.trim() === '') throw new RangeError('請填入分鐘與秒數；不足一分鐘時，分鐘請填 0。');
    currentQuote = calculateQuote({ minutes: minutes.value, seconds: seconds.value, speed: speed.value, professional: professional.checked });
    error.hidden = true;
    minutes.removeAttribute('aria-invalid');
    seconds.removeAttribute('aria-invalid');
    result.hidden = false;
    copyButton.disabled = false;
    const q = currentQuote;
    const minimumApplied = q.billableMinutes * PRICING.rate < PRICING.minimum;
    document.querySelector('#base-label').textContent = minimumApplied ? `計費 ${q.billableMinutes} 分鐘，適用最低消費` : `計費 ${q.billableMinutes} 分鐘 × NT$15`;
    document.querySelector('#base-value').textContent = money(q.base);
    document.querySelector('#professional-row').hidden = !q.professionalFee;
    document.querySelector('#professional-value').textContent = `+${money(q.professionalFee)}`;
    document.querySelector('#speed-row').hidden = !q.speedFee;
    document.querySelector('#speed-label').textContent = `時效加成 +${PRICING.speeds[q.speed] * 100}%`;
    document.querySelector('#speed-value').textContent = `+${money(q.speedFee)}`;
    document.querySelector('#quote-total').value = money(q.total);
  } catch (e) {
    currentQuote = undefined;
    error.textContent = e.message;
    error.hidden = false;
    result.hidden = true;
    copyButton.disabled = true;
    minutes.setAttribute('aria-invalid', 'true');
    seconds.setAttribute('aria-invalid', 'true');
  }
}
form.addEventListener('input', updateQuote);
form.addEventListener('change', updateQuote);
form.addEventListener('submit', event => { event.preventDefault(); updateQuote(); });
copyButton.addEventListener('click', async () => {
  if (!currentQuote) return;
  const text = enquiryText(currentQuote);
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    status.textContent = '已複製，加入 LINE 後貼上即可。';
  } catch {
    fallback.hidden = false;
    const field = document.querySelector('#enquiry-copy');
    field.value = text;
    field.focus();
    field.select();
    status.textContent = '請手動複製下方詢價文字。';
  }
});
updateQuote();

const captions = [
  ['有些想法，', '說出來的時候才變得清楚。'],
  ['把聲音留下，', '也把當時的心意留下。'],
  ['下一次回看，', '每一句都有自己的位置。']
];
const cueButtons = [...document.querySelectorAll('.cue')];
function selectCue(index) {
  cueButtons.forEach((button, i) => {
    button.classList.toggle('selected', i === index);
    button.setAttribute('aria-pressed', String(i === index));
  });
  document.querySelectorAll('.cue-timeline span').forEach((segment, i) => segment.classList.toggle('selected', i === index));
  const caption = document.querySelector('#preview-caption');
  caption.replaceChildren(document.createTextNode(captions[index][0]), document.createElement('br'), document.createTextNode(captions[index][1]));
  document.querySelector('#preview-time').textContent = `${['00:00', '00:04', '00:08'][index]}–${['00:04', '00:08', '00:12'][index]}`;
}
cueButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectCue(index));
  button.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + cueButtons.length) % cueButtons.length;
    selectCue(next);
    cueButtons[next].focus();
  });
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-intro > *, .process h2, .process-list li, .faq h2, .faq article, .contact-top > *, .contact-link').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
