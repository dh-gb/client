const opdList = document.getElementById('opdScheduleList');

export function fetchOPDSchedule() {
    fetch('https://backend-h74a.onrender.com/api/opd')
        .then(res => res.json())
        .then(data => renderOPDSchedule(data))
        .catch(err => {
            console.error("Failed to load OPD data", err);
            alert("Failed to load OPD schedule.");
        });
}

function renderOPDSchedule(data) {
    opdList.innerHTML = '';
    data.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'emg-entry left_alignment';
        div.innerHTML = `
            <strong>Dept:</strong> ${entry.dept}<br>
            <strong>Room:</strong> ${entry.room}<br>
            <strong>Day:</strong> ${entry.schedule}<br>
        `;
        opdList.appendChild(div);
    });
}
