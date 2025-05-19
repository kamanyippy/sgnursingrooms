const nursingRooms = [
    {
        name: "VivoCity",
        location: "HarbourFront",
        address: "1 HarbourFront Walk, #01-146/147, Singapore 098585",
        contact: "6272 0078",
        amenities: ["sofa", "hot-water", "diaper"]
    },
    {
        name: "Marina Bay Sands",
        location: "Marina Bay",
        address: "10 Bayfront Ave, Tower 1, Level 2, Singapore 018956",
        contact: "6688 8826",
        amenities: ["hot-water", "diaper"]
    },
    {
        name: "Changi Airport Terminal 3",
        location: "Changi Airport",
        address: "Changi Airport Terminal 3, Level 3, Singapore 819663",
        contact: "6542 2922",
        amenities: ["sofa", "hot-water"]
    },
    {
        name: "VivoCity Sky Park",
        location: "HarbourFront",
        address: "VivoCity, 1 HarbourFront Walk, Singapore 098585",
        contact: "6272 0008",
        amenities: ["sofa", "diaper"]
    }
];

const amenityIcons = {
    "sofa": "<i class='fas fa-couch' title='Sofa'></i>",
    "hot-water": "<i class='fas fa-hot Tub' title='Hot Water'></i>",
    "diaper": "<i class='fas fa-baby' title='Diaper Change Area'></i>"
};

const listContainer = document.getElementById('nursingRoomsList');
const searchInput = document.getElementById('searchInput');

function displayNursingRooms(filterText = "") {
    listContainer.innerHTML = "";
    const filteredRooms = nursingRooms.filter(room =>
        room.location.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filteredRooms.length === 0) {
        listContainer.innerHTML = "<li>No nursing rooms found.</li>";
        return;
    }

    filteredRooms.forEach(room => {
        const li = document.createElement('li');
        li.className = "n
