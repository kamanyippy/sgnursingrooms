let roomsData = [];

document.getElementById('search').addEventListener('keyup', filterRooms);

document.addEventListener('DOMContentLoaded', function() {
    Papa.parse('nursing_rooms.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            roomsData = results.data;  // Store the data for filtering
            displayRooms(roomsData);
        }
    });
});

function displayRooms(data) {
    const container = document.getElementById('nursing-rooms');
     container.innerHTML = ''; // Clear existing rooms
    data.forEach(room => {
        if (!room.Name) return;
        
        const amenities = room.Amenities ? room.Amenities.split(';').map(item => item.trim().toLowerCase()) : [];

        const card = document.createElement('div');
        card.className = 'card';

        const amenitiesIcons = [];
      
        if (amenities.includes('diaper')) {
            amenitiesIcons.push('<span class="material-icons icon">baby_changing_station</span>');
        }
        if (amenities.includes('sofa')) {
            amenitiesIcons.push('<span class="material-icons icon">chair</span>');
        }
        if (amenities.includes('sink')) {
            amenitiesIcons.push('<span class="material-icons icon">countertops</span>');
        }
        if (amenities.includes('hot-water')) {
            amenitiesIcons.push('<span class="material-icons icon">local_drink</span>');
        }

        card.innerHTML = `
            <h2>${room.Name}</h2>
            <p><strong>Locations:</strong> ${room.Location || 'Not Available'}</p>
            <p><strong>Address:</strong> ${room.Address || 'Not Available'}</p>
            <p><strong>Amenities available:</strong></p>
                       <div>${amenitiesIcons.join('')}</div>
            <p><strong>Condition:</strong> ${room.Condition || 'Not Available'}</p>
        `;
        container.appendChild(card);
    });
}

    function filterRooms() {
      const searchTerm = document.getElementById('search').value.toLowerCase();
      console.log('Search Term:', searchTerm);
      const filtered = roomsData.filter(r => r.Name && r.Name.toLowerCase().includes(searchTerm));
      console.log('Filtered:', filtered);
      displayRooms(filtered);
    }
