document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('nursing_rooms.csv', {
        download: true,
        header: true,
        dynamicTyping: true, // Treat boolean-like strings as booleans
        complete: function(results) {
            console.log(results.data); // Debug: Check the parsed data
            displayRooms(results.data);
        }
    });
});

function displayRooms(data) {
    const container = document.getElementById('nursing-rooms');
    data.forEach(room => {
        if (!room.Name) return; // Skip if there's no name (possibly empty row)
        
        const amenities = room.Amenities.split(';').map(item => item.trim());

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${room.Name}</h2>
            <p><strong>Location:</strong> ${room.Location || 'Not Available'}</p>
            <p><strong>Address:</strong> ${room.Address || 'Not Available'}</p>
            <p><strong>Website:</strong> <a href="${room.Website || '#'}" target="_blank">${room.Website || 'No Website'}</a></p>
            <div>
                <span class="material-icons icon">${amenities.includes('diaper') ? 'baby_changing_station' : ''}</span>
                <span class="material-icons icon">${amenities.includes('sofa') ? 'chair' : ''}</span>
                <span class="material-icons icon">${amenities.includes('sink') ? 'faucet' : ''}</span>
                <span class="material-icons icon">${amenities.includes('hot-water') ? 'local_drink' : ''}</span>
               
            </div>
        `;
        container.appendChild(card);
    });
}
