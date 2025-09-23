// Base de datos de ingenieros ACTUALIZADA con campo de guardia
const engineers = [
    {
        id: 1,
        name: "María Ruiz",
        title: "Consultor de servicios",
        specialties: ["Azure", "Windows Server", "Monitoreo"],
        experience: "- años",
        avatar: "MR",
        email: "maria.ruiz@asimetrixtech.com",
        phone: "+584127369627",
        onDuty: true  // ✅ Está de guardia
    },
    {
        id: 2,
        name: "Harry Jaspe",
        title: "Consultor sistemas operativos",
        specialties: ["Linux", "Monitoreo", "Unix"],
        experience: "- años",
        avatar: "HJ",
        email: "harry.jaspe@asimetrixtech.com",
        phone: "+584142600567",
        onDuty: false 
    },
    {
        id: 3,
        name: "Abraham González",
        title: "Ingeniero de campo",
        specialties: ["Almacenamiento HPE", "Servidores proliant BL/ML/DL"],
        experience: "- años",
        avatar: "AG",
        email: "abraham.gonzalez@asimetrixtech.com",
        phone: "04241572543",
        onDuty: true
    },
    {
        id: 4,
        name: "Dionis Hernandez",
        title: "Consultor sistemas operativos",
        specialties: ["AWS", "Linux"],
        experience: "- años",
        avatar: "DH",
        email: "dionis.hernandez@asimetrixtech.com",
        phone: "+584123780090",
        onDuty: false 
    },
    {
        id: 5,
        name: "Jorge Frias",
        title: "Ingeniero de campo",
        specialties: ["Almacenamiento HPE", "Servidores proliant BL/ML/DL"],
        experience: "9 años",
        avatar: "ES",
        email: "jorge.frias@asimetrixtech.com",
        phone: "+584122912198",
        onDuty: false 
    },
    {
        id: 6,
        name: "Freddy Serrano",
        title: "Ingeniero de campo",
        specialties: ["B&R Baas", "Veeam backup", "Data protector"],
        experience: "- años",
        avatar: "FS",
        email: "freddy.serrano@asimetrixtech.com",
        phone: "+584127335114",
        onDuty: false 
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

// FUNCIÓN PRINCIPAL ACTUALIZADA con indicador de guardia
function createEngineerCard(engineer, searchTerm = '') {
    const card = document.createElement('div');
    card.className = 'engineer-card';
    
    // Agregar clase si está de guardia
    if (engineer.onDuty) {
        card.classList.add('on-duty');
    }

    const specialtiesHTML = engineer.specialties.map(specialty => {
        const isHighlighted = searchTerm && specialty.toLowerCase().includes(searchTerm);
        return `<span class="specialty-tag ${isHighlighted ? 'highlight' : ''}">${specialty}</span>`;
    }).join('');

    // Limpiar el número para WhatsApp
    const cleanPhone = engineer.phone.replace(/\s+/g, '').replace('+', '');

    // Mensaje predeterminado - diferente si está de guardia
    let defaultMessage;
    if (engineer.onDuty) {
        defaultMessage = `Hola ${engineer.name}, tengo un caso urgente que requiere tu atención inmediata. Vi que estás de guardia activa en AsimetrixTech.`;
    } else {
        defaultMessage = `Hola ${engineer.name}, me interesa contactarte por tus servicios de ingeniería. Vi tu perfil en AsimetrixTech.`;
    }

    // Indicador de guardia (solo se muestra si onDuty es true)
    const dutyIndicator = engineer.onDuty ? 
        `<div class="duty-indicator">
            <i class="fas fa-shield-alt"></i> EN GUARDIA ACTIVA
        </div>` : '';

    card.innerHTML = `
        <div class="engineer-header">
            <div class="engineer-avatar">${engineer.avatar}</div>
            <div class="engineer-info">
                <h3>${engineer.name}</h3>
                <div class="engineer-title">${engineer.title}</div>
                <div class="engineer-experience">Experiencia: ${engineer.experience}</div>
                ${dutyIndicator}
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