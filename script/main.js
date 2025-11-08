import { openModal, closeModal, initModalCloseOnOutsideClick } from './modal.js';
import { fetchlatestUpdates } from './latestUpdates.js';

// Make modal functions globally accessible
window.openModal = openModal;
window.closeModal = closeModal;

// Enable modal close on outside click
initModalCloseOnOutsideClick();

// Show spinner until fetch completes or timeout hits
window.addEventListener("DOMContentLoaded", async () => {
    const timeout = new Promise(resolve => setTimeout(resolve, 10000)); // fallback in 10s

    try {
        await Promise.race([
            fetchlatestUpdates(), // Wait for latest updates
            timeout                // Or wait 10s max
        ]);
    } catch (e) {
        console.warn("Failed to fetch latest updates in time:", e);
    } finally {
        // Hide spinner
        const loader = document.getElementById('loadingOverlay');
        if (loader) loader.style.display = 'none';

        // Show main content
        const mainContent = document.getElementById('mainContent');
        if (mainContent) mainContent.style.display = 'block';
    }
});
