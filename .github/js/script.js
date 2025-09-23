// Base de datos de ingenieros
const engineers = [
    {
        id: 1,
        name: "María González",
        title: "Senior Cloud Engineer",
        specialties: ["Azure", "AWS", "DevOps", "Kubernetes", "Docker"],
        experience: "8 años",
        avatar: "MG"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        title: "Full Stack Developer",
        specialties: ["Java", "Spring Boot", "React", "PostgreSQL", "Azure"],
        experience: "6 años",
        avatar: "CR"
    },
    {
        id: 3,
        name: "Ana Martínez",
        title: "Data Engineer",
        specialties: ["Python", "Azure Data Factory", "SQL", "Spark", "Power BI"],
        experience: "7 años",
        avatar: "AM"
    },
    {
        id: 4,
        name: "David López",
        title: "Backend Specialist",
        specialties: ["Java", "Microservices", "Azure", "MongoDB", "Redis"],
        experience: "5 años",
        avatar: "DL"
    },
    {
        id: 5,
        name: "Elena Sánchez",
        title: "Frontend Architect",
        specialties: ["React", "TypeScript", "Azure Static Apps", "CSS", "Jest"],
        experience: "9 años",
        avatar: "ES"
    },
    {
        id: 6,
        name: "Pablo Fernández",
        title: "DevOps Engineer",
        specialties: ["Azure DevOps", "Terraform", "Python", "Linux", "CI/CD"],
        experience: "6 años",
        avatar: "PF"
    }
];

// Función para buscar ingenieros
function searchEngineers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    performSearch(searchTerm);
}

function searchFromHero() {
    const searchTerm = document.getElementById('searchInputHero').value.toLowerCase().trim();
    document.getElementById('searchInput').value = searchTerm;
    performSearch(searchTerm);
    
    // Scroll to results
    document.getElementById('buscar').scrollIntoView({ behavior: 'smooth' });
}

function filterByTech(technology) {
    document.getElementById('searchInput').value = technology;
    document.getElementById('searchInputHero').value = technology;
    performSearch(technology.toLowerCase());
}

function performSearch(searchTerm) {
    if (searchTerm === '') {
        displayAllEngineers();
        return;
    }

    const filteredEngineers = engineers.filter(engineer => 
        engineer.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchTerm)
        )
    );

    displayResults(filteredEngineers, searchTerm);
}

// Mostrar todos los ingenieros
function displayAllEngineers() {
    const resultsInfo = document.getElementById('resultsInfo');
    const engineersGrid = document.getElementById('engineersGrid');
    
    resultsInfo.innerHTML = `<h3>Nuestro equipo completo (${engineers.length} ingenieros)</h3>`;
    engineersGrid.innerHTML = '';

    engineers.forEach(engineer => {
        engineersGrid.appendChild(createEngineerCard(engineer));
    });
}

// Mostrar resultados de búsqueda
function displayResults(filteredEngineers, searchTerm) {
    const resultsInfo = document.getElementById('resultsInfo');
    const engineersGrid = document.getElementById('engineersGrid');
    
    if (filteredEngineers.length === 0) {
        resultsInfo.innerHTML = `<h3>No se encontraron ingenieros con la especialidad "${searchTerm}"</h3>`;
        engineersGrid.innerHTML = '';
    } else {
        resultsInfo.innerHTML = `<h3>Se encontraron ${filteredEngineers.length} ingenieros con "${searchTerm}"</h3>`;
        engineersGrid.innerHTML = '';

        filteredEngineers.forEach(engineer => {
            engineersGrid.appendChild(createEngineerCard(engineer, searchTerm));
        });
    }
}

// Crear tarjeta de ingeniero
function createEngineerCard(engineer, searchTerm = '') {
    const card = document.createElement('div');
    card.className = 'engineer-card';

    const specialtiesHTML = engineer.specialties.map(specialty => {
        const isHighlighted = searchTerm && specialty.toLowerCase().includes(searchTerm);
        return `<span class="specialty-tag ${isHighlighted ? 'highlight' : ''}">${specialty}</span>`;
    }).join('');

    card.innerHTML = `
        <div class="engineer-header">
            <div class="engineer-avatar">${engineer.avatar}</div>
            <div class="engineer-info">
                <h3>${engineer.name}</h3>
                <div class="engineer-title">${engineer.title}</div>
                <div class="engineer-experience">Experiencia: ${engineer.experience}</div>
            </div>
        </div>
        <div class="specialties">
            <h4>Especialidades:</h4>
            <div class="specialties-list">
                ${specialtiesHTML}
            </div>
        </div>
    `;

    return card;
}

// Búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (searchTerm.length >= 2) {
        performSearch(searchTerm);
    } else if (searchTerm.length === 0) {
        displayAllEngineers();
    }
});

// Enter key support
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchEngineers();
    }
});

document.getElementById('searchInputHero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchFromHero();
    }
});

// Inicializar la página mostrando todos los ingenieros
document.addEventListener('DOMContentLoaded', function() {
    displayAllEngineers();
});