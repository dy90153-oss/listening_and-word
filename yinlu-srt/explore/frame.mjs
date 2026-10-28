const known = new Set(['hero', 'sample', 'pricing', 'process', 'faq', 'contact']);
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== parent || event.data?.type !== 'yinlu-jump' || !known.has(event.data.section)) return;
  const target = event.data.section === 'hero' ? document.querySelector('.hero') : document.getElementById(event.data.section);
  if (target) {
    const offset = event.data.section === 'hero' ? 0 : target.getBoundingClientRect().top + scrollY - 24;
    window.scrollTo({ top: Math.max(0, offset), behavior: 'instant' });
  }
});
if (window !== parent) parent.postMessage({ type: 'yinlu-ready' }, location.origin);
