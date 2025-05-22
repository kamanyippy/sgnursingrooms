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

        const conditionClass = getConditionClass(room.Condition);

        const card = document.createElement('div');
        card.className = 'card';

        const amenitiesIcons = [];
      
        if (amenities.includes('diaper')) {
            amenitiesIcons.push('<span class="material-icons icon">baby_changing_station</span> Diaper Changing Station');
        }
        if (amenities.includes('sofa')) {
            amenitiesIcons.push('<span class="material-icons icon">chair</span> Seat');
        }
        if (amenities.includes('sink')) {
            amenitiesIcons.push('<span class="material-icons icon">countertops</span> Basin');
        }
        if (amenities.includes('hot-water')) {
            amenitiesIcons.push('<span class="material-icons icon">local_drink</span>Hot Water Dispenser');
        }

        card.innerHTML = `
         <div class="card-content">
            <h2>${room.Name}</h2>
            <p><strong>Locations:</strong> ${room.Location || 'Not Available'}</p>
            <p><strong>Address:</strong> ${room.Address || 'Not Available'}</p>
            <p><strong>Amenities available:</strong></p>
                       <div>${amenitiesIcons.join('')}</div>
             <p><strong>Condition:</strong> <span class="condition-text ${conditionClass}"> ${room.Condition || 'Not Available'}</span></p>
        </div>
             `;
        container.appendChild(card);
    });

    }

function getConditionClass(condition) {
    switch (condition.toLowerCase()) {
        case 'excellent':
            return 'condition-excellent';
        case 'good':
            return 'condition-good';
        case 'average':
            return 'condition-average';
        default:
            return '';
    }

}

   function filterRooms() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = roomsData.filter(r => r.Name && r.Name.toLowerCase().includes(searchTerm));
    
    if (filtered.length === 0) {
        document.getElementById('nursing-rooms').innerHTML = `
        <p>Location not found. <br> Please bear with us as we update the information.<br><br> <a href="https://forms.gle/9ZRKPiSZsFo2g6xJ8">Send us a message</a> on the locations you wish to see!</p>`;
    } else {
        displayRooms(filtered);
    }
}

