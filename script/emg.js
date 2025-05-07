const emgList = document.getElementById('emgScheduleList');

export function fetchEMGSchedule() {
    fetch('https://backend-h74a.onrender.com/api/emg')
        .then(res => res.json())
        .then(data => renderEMGSchedule(data))
        .catch(err => {
            console.error("Failed to load Emergency data", err);
            alert("Failed to load Emergency schedule.");
        });
}

function renderEMGSchedule(data) {
    emgList.innerHTML = '';
    data.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'emg-entry left_alignment';
        div.innerHTML = `
            <strong>Dept:</strong> ${entry.dept}<br>
            <strong>Room:</strong> ${entry.room}<br>
            <strong>Day:</strong> ${entry.schedule}<br>
        `;
        emgList.appendChild(div);
    });
}
