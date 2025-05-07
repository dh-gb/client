const latestUpdatelist = document.getElementById('eventList'); // Match the ID of the container

export function fetchlatestUpdates() {
    fetch('https://backend-h74a.onrender.com/api/latest-updates')
        .then(res => res.json())
        .then(data => renderlatestUpdatelist(data))
        .catch(err => {
            console.error("Failed to load Latest Updates data", err);
            alert("Failed to load Latest Updates schedule.");
        });
}



// Helper to strip time (keep only yyyy-mm-dd)
function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function renderlatestUpdatelist(data) {
    latestUpdatelist.innerHTML = ''; // Clear existing content

    // Iterate over the data and create new entries
    data.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'event-item left_alignment'; // Ensure this class matches your CSS for event items
        const match = entry.PDFfileUrl.match(/pdf-(\d{8})T/); // extract `20250415` part
        let isRecent = false;
        if (match) {
            const dateStr = match[1]; // e.g., '20250415'
            const fileDate = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
            const entryDate = stripTime(fileDate);
            const today = stripTime(new Date());
            const diffInDays = (today - entryDate)/ (1000 * 60 * 60 * 24);
            isRecent = diffInDays <= 3;
        }
        const linkColor = isRecent ? 'red' : 'rgba(0, 82, 147, 0.9)';
        // Add the title and link to the entry
        div.innerHTML = `
            <p>
                <a href="${entry.PDFfileUrl}" style="text-decoration:none; color:${linkColor} ;" download>
                    ${entry.title}
                </a>
            </p>
        `;

        // Append each entry to the event list
        latestUpdatelist.prepend(div);
    });
}
