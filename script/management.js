const managementlist = document.getElementById('managementlist');

export function fetchmanagement() {
    fetch('https://dh-ganderbal-backend.onrender.com/api/management')
        .then(res => res.json())
        .then(data => {
            managementlist.innerHTML = '';
            rendermanagement(data);
        })

        .catch(err => {
            console.error("Failed to load Latest Updates data", err);
            alert("Failed to load Latest Updates schedule.");
        });
}

function rendermanagement(data) {
    data.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'data-entry';
        div.style.display = 'flex';
        div.style.gap = '10px';
        div.style.marginTop = '10px';
        div.className = 'management-entry';
        div.innerHTML = `
        <img src="${entry.imageUrl}" class="passport" alt="Image" />
        <div class="left_alignment">
            <p><strong>${entry.name}</p></strong>
            <p><strong>${entry.education}</p></strong>
            <p><strong> ${entry.designation}</strong></p>
        </div>
        `;
        managementlist.appendChild(div);
    });
}
