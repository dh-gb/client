import { openModal, closeModal, initModalCloseOnOutsideClick } from './modal.js';
import { fetchlatestUpdates } from './latestUpdates.js';

// Make modal functions globally accessible
window.openModal = openModal;
window.closeModal = closeModal;

// Enable modal close on outside click
initModalCloseOnOutsideClick();

// Show spinner until fetch completes or timeout hits
window.addEventListener("DOMContentLoaded", async () => {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loader = document.getElementById('loadingOverlay');
    const mainContent = document.getElementById('mainContent');

    // Step 1: Show welcome screen first
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
        mainContent.style.display = 'none';
        if (loader) loader.style.display = 'none';
    }

    // Wait for 3 seconds while showing the welcome text
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 2: Fade out the welcome screen
    if (welcomeScreen) {
        welcomeScreen.style.transition = 'opacity 1s ease';
        welcomeScreen.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 1000));
        welcomeScreen.style.display = 'none';
    }

    // Step 3: Now show loading spinner
    if (loader) loader.style.display = 'flex';
    
    
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
