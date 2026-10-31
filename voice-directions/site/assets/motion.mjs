// Reveal content remains readable if scripting or IntersectionObserver is unavailable.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (!reduced.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) {
      e.target.classList.add('is-entering'); observer.unobserve(e.target);
    }
  }, { threshold: .1 });
  document.querySelectorAll('.subtitle-studio,.rate-information,.quote-form,.faq details,.specimen-caption').forEach(el => {
    el.classList.add('reveal'); observer.observe(el);
  });
}
// Only one open answer per column is not required: visitors can compare multiple terms.
const checklist = document.querySelector('.enquiry-checklist');
checklist?.addEventListener('change', () => {const done=checklist.querySelectorAll('input:checked').length;checklist.querySelector('output').value=`已備妥 ${done} / 4 項`;});
