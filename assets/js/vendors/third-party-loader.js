export function initThirdPartyLoader() {
  let fired = false;
  function loadThirdParty() {
    if (window.__thirdPartyLoaded) return;
    window.__thirdPartyLoaded = true;
    var utm = document.createElement('script');
    utm.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
    utm.defer = true;
    utm.async = true;
    utm.setAttribute('data-utmify-prevent-xcod-sck', '');
    utm.setAttribute('data-utmify-prevent-subids', '');
    document.head.appendChild(utm);
    window.pixelId = '6958a99d32b644967d0a9ddf';
    var px = document.createElement('script');
    px.src = 'https://cdn.utmify.com.br/scripts/pixel/pixel.js';
    px.defer = true;
    px.async = true;
    document.head.appendChild(px);
  }
  function trigger() {
    if (fired) return;
    fired = true;
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadThirdParty, { timeout: 3000 });
    } else {
      setTimeout(loadThirdParty, 1000);
    }
    window.removeEventListener('scroll', trigger);
    window.removeEventListener('pointerdown', trigger);
    window.removeEventListener('keydown', trigger);
  }
  window.addEventListener('scroll', trigger, { passive: true });
  window.addEventListener('pointerdown', trigger);
  window.addEventListener('keydown', trigger);
  setTimeout(trigger, 3000);
}
