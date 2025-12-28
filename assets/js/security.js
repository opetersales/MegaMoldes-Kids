/**
 * Security & Protection Layer
 * 
 * Implements client-side deterrents against:
 * - Content Copying (Text/Images)
 * - Source Code Inspection (DevTools)
 * - Keyboard Shortcuts (F12, Ctrl+U, etc.)
 * 
 * DISCLAIMER: Client-side security is not absolute. 
 * Advanced users can bypass these measures. 
 * These serve as deterrents for casual theft.
 */

(function() {
    'use strict';

    const CONFIG = {
        enableDevToolsDetection: true,
        enableCopyProtection: true,
        redirectOnDetection: false // Set to true to redirect to a blocked page
    };

    if (CONFIG.enableCopyProtection) {
        disableInteractions();
    }

    if (CONFIG.enableDevToolsDetection) {
        initDevToolsDetector();
    }

    /**
     * Disables standard copy/paste/context interactions
     */
    function disableInteractions() {
        const EVENTS = [
            'contextmenu', // Right-click
            'dragstart',   // Dragging
            'selectstart', // Selection
            'copy',        // Ctrl+C
            'cut',         // Ctrl+X
            'paste'        // Ctrl+V
        ];

        EVENTS.forEach(event => {
            document.addEventListener(event, (e) => {
                e.preventDefault();
                // Silent block to avoid annoying alerts
            }, { capture: true });
        });

        // Block specific keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                return blockEvent(e);
            }

            // Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print)
            if (e.ctrlKey && ['u', 's', 'p', 'U', 'S', 'P'].includes(e.key)) {
                return blockEvent(e);
            }

            // Ctrl+Shift+I (DevTools), Ctrl+Shift+C (Inspect), Ctrl+Shift+J (Console)
            if (e.ctrlKey && e.shiftKey && ['i', 'c', 'j', 'I', 'C', 'J'].includes(e.key)) {
                return blockEvent(e);
            }
        });
    }

    function blockEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    /**
     * Detects DevTools opening via "debugger" trap and timing checks.
     */
    function initDevToolsDetector() {
        // 1. Console warning for social engineering attacks
        console.log(
            '%cPARE!',
            'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px black;'
        );
        console.log(
            '%cEste é um recurso de navegador voltado para desenvolvedores. Se alguém pediu para você colar algo aqui, é uma fraude.',
            'font-size: 18px; color: #333;'
        );

        // 2. The Debugger Trap
        // This causes the browser to pause execution if DevTools is open,
        // effectively freezing the site for the inspector.
        setInterval(() => {
            const start = performance.now();
            debugger; // Execution pauses here if DevTools is open
            const end = performance.now();
            
            // If execution took longer than 100ms, it was likely paused by DevTools
            if (end - start > 200) {
                handleDetection();
            }
        }, 1000);
    }

    function handleDetection() {
        if (CONFIG.redirectOnDetection) {
            window.location.href = "about:blank";
        } else {
            // Option: Clear body content or show overlay
            // document.body.innerHTML = '<div style="background:black;color:red;height:100vh;display:flex;align-items:center;justify-content:center;font-size:2rem;">Acesso de Desenvolvedor Não Autorizado</div>';
            
            // Minimal annoyance mode (just clears console)
            console.clear();
        }
    }

})();
