import { fetchOPDSchedule } from './opd.js';
import { fetchEMGSchedule } from './emg.js';
import { fetchmanagement } from './management.js'
import { fetchawardsCertificates } from './awardsCertificates.js'
export function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    if (modalId === 'opdModal') {
        fetchOPDSchedule();
    }
    if (modalId === 'emergencyModal') {
        fetchEMGSchedule();
    }
    if (modalId === 'managementModal') {
        fetchmanagement();
    }
    if (modalId === 'awardsModal') {
        fetchawardsCertificates();
    }
}

export function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
export function initModalCloseOnOutsideClick() {
    window.onclick = function (event) {
        let modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };
}
