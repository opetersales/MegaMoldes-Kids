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
        initCountdown();
        initExitIntentModal();
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

    /**
     * Initializes a countdown timer to the next local midnight.
     * Updates every second.
     */
    function initCountdown() {
        const timerElement = document.getElementById('countdown-timer');
        if (!timerElement) return;

        function updateTimer() {
            const now = new Date();
            const midnight = new Date();
            
            // Set to 23:59:59.999 of the current day
            midnight.setHours(23, 59, 59, 999);
            
            let diff = midnight - now;
            
            // Edge case: if calculation creates negative diff (system time change), reset to 0
            if (diff < 0) diff = 0;

            // Calculate hours, minutes, seconds
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Pad with zeros
            const h = hours.toString().padStart(2, '0');
            const m = minutes.toString().padStart(2, '0');
            const s = seconds.toString().padStart(2, '0');

            // Update DOM
            timerElement.innerText = `${h}:${m}:${s}`;
        }

        // Run immediately then schedule
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    function initExitIntentModal() {
        const premiumDiscountLink = 'https://pay.cakto.com.br/3bpvym4_706426';
        const basicLink = 'https://pay.cakto.com.br/ey5e5so_702220';
        const trigger = document.getElementById('basic-link');
        const modal = document.getElementById('exit-intent-modal');
        if (!trigger || !modal) return;
        const overlay = document.getElementById('exit-intent-overlay');
        const closeBtn = document.getElementById('exit-intent-close');
        const premiumBtn = document.getElementById('modal-premium-button');
        const basicBtn = document.getElementById('modal-basic-link');
        premiumBtn.setAttribute('href', premiumDiscountLink);
        basicBtn.setAttribute('href', basicLink);
        function open() {
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
        function close() {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            open();
        });
        overlay.addEventListener('click', close);
        closeBtn.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }

    function initMiniVariant() {
        const params = new URLSearchParams(window.location.search);
        const isMini = params.get('v') === 'mini' || params.get('mini') === '1';
        const mini = document.getElementById('mini-landing');
        const legacy = document.getElementById('legacy-root');
        if (!isMini || !mini || !legacy) return;
        mini.classList.remove('hidden');
        legacy.classList.add('hidden');
        const premiumDiscountLink = 'https://pay.cakto.com.br/3bpvym4_706426';
        const miniCta = document.getElementById('mini-cta');
        const miniCtaFinal = document.getElementById('mini-cta-final');
        if (miniCta) miniCta.setAttribute('href', premiumDiscountLink);
        if (miniCtaFinal) miniCtaFinal.setAttribute('href', premiumDiscountLink);
        const video = document.getElementById('mini-vsl');
        const audioBtn = document.getElementById('mini-vsl-audio');
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
    }

})();
