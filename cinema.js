const cinemas = [
    { id: 1, name: "Legend Cinema 271 Mega Mall", location: "3rd Floor, Chip Mong Mega Mall, Street 271, Phnom Penh", image: "img/legend-271-megamall.jpg" },
    { id: 2, name: "Legend Cinema Sihanoukville", location: "PCB-5-021, 4th Floor of Prince Mall, Sihanoukville", image: "img/legend-shihanoukville.jpg" },
    { id: 3, name: "Legend Eden Garden", location: "City Center Boulevard, Sangkat Srah Chork, Khan Daun Penh", image: "legend eden garden.jpg" },
    { id: 4, name: "Legend Toul Kork", location: "2nd floor, Toul Kork, Phnom Penh", image: "img/legend-toulkork.jpg" },
    { id: 5, name: "Legend Noromall", location: "Noromall, Phnom Penh", image: "img/legend-noromall.jpg" },
    { id: 6, name: "Legend Midtown Mall", location: "1st Floor Midtown Mall, Street 182, Khan Daun Penh", image: "legend-mditown.jpg" },
    { id: 7, name: "Legend Olympia", location: "Olympia Mall, Phnom Penh", image: "img/legend-olympia.jpg" },
    { id: 8, name: "Legend Sensok", location: "AEON Mall Sensok City, Phnom Penh", image: "img/legend-sensok.jpg" }
];


let filteredCinemas = [...cinemas];

function renderCinemas(cinemasToRender) {
    const grid = document.getElementById('cinemaGrid');
    const noResults = document.getElementById('noResults');

    if (cinemasToRender.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = cinemasToRender.map(cinema => `
        <div class="cinema-card" onclick="selectCinema(${cinema.id})">
            <img src="${cinema.image}" alt="${cinema.name}">
            <div class="cinema-info">
                <h3>${cinema.name}</h3>
                <div class="cinema-location">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>${cinema.location}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function searchCinemas() {
    const searchTerm = document.getElementById('cinemaSearch').value.toLowerCase();
    filteredCinemas = cinemas.filter(cinema => 
        cinema.name.toLowerCase().includes(searchTerm) || 
        cinema.location.toLowerCase().includes(searchTerm)
    );
    renderCinemas(filteredCinemas);
}

function selectCinema(cinemaId) {
    const cinema = cinemas.find(c => c.id === cinemaId);
    alert(`Selected: ${cinema.name}\nLocation: ${cinema.location}`);
}

function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.language-list');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    renderCinemas(filteredCinemas);
    document.getElementById('cinemaSearch').addEventListener('input', searchCinemas);
    document.querySelector('.cinema-search button').addEventListener('click', searchCinemas);
    document.querySelector('.lang').addEventListener('click', toggleLanguageDropdown);
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.lang')) {
            document.querySelector('.language-list').style.display = 'none';
        }
    });

    document.querySelectorAll('.language-list span, .language-list a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedLang = this.textContent;
            document.querySelector('.lang-selected').innerHTML = `${selectedLang} <i class="fa-solid fa-chevron-down"></i>`;
            document.querySelector('.language-list').style.display = 'none';
        });
    });
});
