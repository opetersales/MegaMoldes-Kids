export function initSecurityLazy() {
  function loadSecurity() {
    var s = document.createElement('script');
    s.src = 'assets/js/security.js';
    s.defer = true;
    document.body.appendChild(s);
  }
  window.addEventListener('pointerdown', loadSecurity, { once: true });
  window.addEventListener('keydown', loadSecurity, { once: true });
}
