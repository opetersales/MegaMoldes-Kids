import { initDynamicDate } from './services/date.service.js';
import { initMiniVariant } from './features/mini-landing/init.js';
import { initSecurityLazy } from './vendors/security-loader.js';
import { initThirdPartyLoader } from './vendors/third-party-loader.js';

document.addEventListener('DOMContentLoaded', () => {
  initDynamicDate();
  initMiniVariant();
});

initSecurityLazy();
initThirdPartyLoader();
