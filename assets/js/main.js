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

})();
