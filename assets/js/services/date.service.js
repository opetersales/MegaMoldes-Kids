export function initDynamicDate() {
  const el = document.getElementById('dynamic-date');
  if (!el) return;
  try {
    const date = new Date();
    const formatted = date.toLocaleDateString('pt-BR');
    el.innerText = formatted;
  } catch (_) {}
}
