// Base de datos de ingenieros
const engineers = [
    {
        id: 1,
        name: "María Ruiz",
        title: "Consultor de servicios",
        specialties: ["Azure", "Windows Server"],
        experience: "- años",
        avatar: "MR",
        email: "maria.ruiz@asimetrixtech.com",
        phone: "+584127369627"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        title: "Infrastructure Specialist",
        specialties: ["Windows Server", "Switches Aruba y HPE", "Linux", "Impresoras HP"],
        experience: "6 años",
        avatar: "CR",
        email: "carlos.rodriguez@asimetrixtech.com",
        phone: "+34 623 456 789"
    },
    {
        id: 3,
        name: "Ana Martínez",
        title: "Network Engineer",
        specialties: ["Switches Aruba y HPE", "Windows Server", "Servidores HPE", "AWS"],
        experience: "7 años",
        avatar: "AM",
        email: "ana.martinez@asimetrixtech.com",
        phone: "+34 634 567 890"
    },
    {
        id: 4,
        name: "David López",
        title: "Systems Administrator",
        specialties: ["Linux", "Windows Server", "Laptop", "Impresoras HP"],
        experience: "5 años",
        avatar: "DL",
        email: "david.lopez@asimetrixtech.com",
        phone: "+34 645 678 901"
    },
    {
        id: 5,
        name: "Elena Sánchez",
        title: "Cloud Architect",
        specialties: ["Azure", "AWS", "Linux", "Servidores HPE"],
        experience: "9 años",
        avatar: "ES",
        email: "elena.sanchez@asimetrixtech.com",
        phone: "+34 656 789 012"
    },
    {
        id: 6,
        name: "Pablo Fernández",
        title: "Help Desk Specialist",
        specialties: ["Laptop", "Impresoras HP", "Windows Server", "Linux"],
        experience: "6 años",
        avatar: "PF",
        email: "pablo.fernandez@asimetrixtech.com",
        phone: "+34 667 890 123"
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

// FUNCIÓN PRINCIPAL - WHATSAPP DIRECTO (SIN PROMPT)
function createEngineerCard(engineer, searchTerm = '') {
    const card = document.createElement('div');
    card.className = 'engineer-card';

    const specialtiesHTML = engineer.specialties.map(specialty => {
        const isHighlighted = searchTerm && specialty.toLowerCase().includes(searchTerm);
        return `<span class="specialty-tag ${isHighlighted ? 'highlight' : ''}">${specialty}</span>`;
    }).join('');

    // Limpiar el número para WhatsApp
    const cleanPhone = engineer.phone.replace(/\s+/g, '').replace('+', '');

    // Mensaje predeterminado
    const defaultMessage = `Saludos Ing ${engineer.name}. Se le procederá asignar un caso, por favor contactarse con el cliente en la menor brevedad posible.`;

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
        <div class="engineer-contact">
            <div class="contact-info">
                <a href="mailto:${engineer.email}" class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${engineer.email}</span>
                </a>
                <a href="tel:${engineer.phone}" class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${engineer.phone}</span>
                </a>
            </div>
            <div class="contact-actions">
                <button class="contact-btn whatsapp" onclick="openWhatsApp('${cleanPhone}', '${defaultMessage}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
                <button class="contact-btn copy" onclick="copyToClipboard('${engineer.email}', this)">
                    <i class="fas fa-copy"></i> Email
                </button>
                <button class="contact-btn copy" onclick="copyToClipboard('${engineer.phone}', this)">
                    <i class="fas fa-copy"></i> Teléfono
                </button>
            </div>
        </div>
    `;

    return card;
}

// Función para abrir WhatsApp DIRECTO (sin prompt)
function openWhatsApp(phone, message) {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Función para copiar al portapapeles
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 2000);
    });
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

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    displayAllEngineers();
});