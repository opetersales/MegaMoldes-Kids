import { PREMIUM_DISCOUNT_LINK } from '../../services/checkout.service.js';

export function initMiniVariant() {
  const mini = document.getElementById('mini-landing');
  if (!mini) return;
  mini.classList.remove('hidden');
  const miniCta = document.getElementById('mini-cta');
  const miniCtaFinal = document.getElementById('mini-cta-final');
  if (miniCta) miniCta.setAttribute('href', PREMIUM_DISCOUNT_LINK);
  if (miniCtaFinal) miniCtaFinal.setAttribute('href', PREMIUM_DISCOUNT_LINK);
  const video = document.getElementById('mini-vsl');
  const audioBtn = document.getElementById('mini-vsl-audio');
  const replayBtn = document.getElementById('mini-vsl-replay');
  if (video) {
    video.muted = true;
    video.play().catch(() => {});
  }
  if (video && audioBtn) {
    audioBtn.addEventListener('click', () => {
      try {
        video.pause();
        video.currentTime = 0;
        video.muted = false;
        video.play().catch(() => {});
        audioBtn.classList.add('hidden');
      } catch (_) {}
    });
  }
  if (video && replayBtn) {
    video.addEventListener('ended', () => {
      replayBtn.classList.remove('hidden');
    });
    replayBtn.addEventListener('click', () => {
      try {
        video.currentTime = 0;
        video.muted = false;
        replayBtn.classList.add('hidden');
        if (audioBtn) audioBtn.classList.add('hidden');
        video.play().catch(() => {});
      } catch (_) {}
    });
  }
}
