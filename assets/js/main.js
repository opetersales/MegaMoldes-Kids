/**
 * MegaMoldes Kids - Main Application Logic
 * 
 * Responsibilities:
 * - Dynamic Date Rendering (Scarcity Bar)
 * - Evergreen Midnight Countdown
 * - Interactive UI Elements (if any)
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        initDynamicDate();
        initMiniVariant();
    });

    /**
     * Renders the current date in PT-BR format.
     * Used in the top scarcity bar.
     */
    function initDynamicDate() {
        const dateElement = document.getElementById('dynamic-date');
        if (!dateElement) return;

        try {
            const date = new Date();
            const formattedDate = date.toLocaleDateString('pt-BR');
            dateElement.innerText = formattedDate;
        } catch (e) {
            console.error('Error formatting date:', e);
        }
    }

 

    function initMiniVariant() {
        const mini = document.getElementById('mini-landing');
        if (!mini) return;
        mini.classList.remove('hidden');
        const premiumDiscountLink = 'https://pay.cakto.com.br/sgebuwo_702170';
        const miniCta = document.getElementById('mini-cta');
        const miniCtaFinal = document.getElementById('mini-cta-final');
        if (miniCta) miniCta.setAttribute('href', premiumDiscountLink);
        if (miniCtaFinal) miniCtaFinal.setAttribute('href', premiumDiscountLink);
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

})();
