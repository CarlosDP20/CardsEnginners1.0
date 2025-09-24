// ========== BASE DE DATOS DE INGENIEROS ==========
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
        onDuty: true,
        casesCount: 0
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
        onDuty: false,
        casesCount: 0
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
        onDuty: true,
        casesCount: 0
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
        onDuty: false,
        casesCount: 0
    },
    {
        id: 5,
        name: "Jorge Frias",
        title: "Ingeniero de campo",
        specialties: ["Almacenamiento HPE", "Servidores proliant BL/ML/DL"],
        experience: "9 años",
        avatar: "JF",
        email: "jorge.frias@asimetrixtech.com",
        phone: "+584122912198",
        onDuty: false,
        casesCount: 0
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
        onDuty: false,
        casesCount: 0
    },
    {
        id: 7,
        name: "Gregory Cordoba",
        title: "Analista Service Desk",
        specialties: ["Servidores HPE", "Diagnostico"],
        experience: "- años",
        avatar: "GC",
        email: "gregory.cordoba@asimetrixtech.com",
        phone: "+584120321356",
        onDuty: false,
        casesCount: 0
    },
    {
        id: 8,
        name: "Soporte Netweaver",
        title: "",
        specialties: ["SAP"],
        experience: "- años",
        avatar: "SN",
        email: "soportenetweavercacr@asimetrixtech.com",
        phone: "",
        onDuty: false,
        casesCount: 0
    },
    {
        id: 9,
        name: "Luis Marron",
        title: "Ingeniero",
        specialties: ["Redes Wifi"],
        experience: "- años",
        avatar: "LS",
        email: "luis.marron@asimetrixtech.com",
        phone: "",
        onDuty: false,
        casesCount: 0
    }
];

// ========== SISTEMA DE CASOS ==========
let cases = JSON.parse(localStorage.getItem('asimetrixCases')) || [];

// ========== FUNCIONES DE BÚSQUEDA ==========
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

// ========== FUNCIÓN PARA CREAR TARJETAS ==========
function createEngineerCard(engineer, searchTerm = '') {
    const card = document.createElement('div');
    card.className = 'engineer-card';
    
    if (engineer.onDuty) {
        card.classList.add('on-duty');
    }

    const specialtiesHTML = engineer.specialties.map(specialty => {
        const isHighlighted = searchTerm && specialty.toLowerCase().includes(searchTerm);
        return `<span class="specialty-tag ${isHighlighted ? 'highlight' : ''}">${specialty}</span>`;
    }).join('');

    const cleanPhone = engineer.phone.replace(/\s+/g, '').replace('+', '');
    
    // Contador de casos para este ingeniero
    const engineerCases = cases.filter(c => c.engineerId === engineer.id).length;

    let defaultMessage;
    if (engineer.onDuty) {
        defaultMessage = `Hola ${engineer.name}, tengo un caso urgente que requiere tu atención inmediata. Vi que estás de guardia activa en AsimetrixTech.`;
    } else {
        defaultMessage = `Hola ${engineer.name}, me interesa contactarte por tus servicios de ingeniería. Vi tu perfil en AsimetrixTech.`;
    }

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
            <div class="engineer-cases">Casos resueltos: ${engineerCases}</div>
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
            <button class="contact-btn report" onclick="downloadEngineerDetailReport('${engineer.name}')">
                <i class="fas fa-chart-pie"></i> Reporte
            </button>
        </div>
    </div>
`;

    return card;
}

// ========== FUNCIONES DE CONTACTO ==========
function openWhatsApp(phone, message) {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
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

// ========== SISTEMA DE REGISTRO DE CASOS ==========
function loadEngineersSelect() {
    const select = document.getElementById('engineerSelect');
    select.innerHTML = '<option value="">Seleccionar ingeniero...</option>';
    
    engineers.forEach(engineer => {
        const option = document.createElement('option');
        option.value = engineer.id;
        option.textContent = `${engineer.name} - ${engineer.title}`;
        select.appendChild(option);
    });
}

function addCase() {
    const engineerId = parseInt(document.getElementById('engineerSelect').value);
    const caseNumber = document.getElementById('caseNumber').value.trim();
    const description = document.getElementById('caseDescription').value.trim();
    const technology = document.getElementById('caseTechnology').value.trim();

    if (!engineerId || !caseNumber || !description) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }

    const engineer = engineers.find(e => e.id === engineerId);
    
    const newCase = {
        id: Date.now(),
        engineerId: engineerId,
        engineerName: engineer.name,
        caseNumber: caseNumber.toUpperCase(),
        description: description,
        technology: technology,
        date: new Date().toLocaleString('es-ES'),
        timestamp: Date.now()
    };

    cases.unshift(newCase);
    localStorage.setItem('asimetrixCases', JSON.stringify(cases));
    
    displayCases();
    clearForm();
    displayAllEngineers(); // Actualizar contador en tarjetas
    
    alert('✅ Caso registrado exitosamente!');
}

function displayCases() {
    const casesList = document.getElementById('casesList');
    casesList.innerHTML = '';

    if (cases.length === 0) {
        casesList.innerHTML = '<p class="no-cases">No hay casos registrados aún.</p>';
        return;
    }

    // Ordenar casos por fecha (más recientes primero)
    const sortedCases = cases.sort((a, b) => b.timestamp - a.timestamp);

    sortedCases.forEach(caseItem => {
        const caseElement = document.createElement('div');
        caseElement.className = 'case-item';
        caseElement.innerHTML = `
            <div class="case-header">
                <div class="case-title">${caseItem.caseNumber}</div>
                <div class="case-date">${caseItem.date}</div>
            </div>
            <div class="case-details">
                <div class="case-detail">
                    <label>Ingeniero:</label>
                    <span>${caseItem.engineerName}</span>
                </div>
                <div class="case-detail">
                    <label>Tecnología:</label>
                    <span>${caseItem.technology || 'No especificada'}</span>
                </div>
            </div>
            <div class="case-detail">
                <label>Descripción:</label>
                <span>${caseItem.description}</span>
            </div>
            <button class="delete-case" onclick="deleteCase(${caseItem.id})">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        `;
        casesList.appendChild(caseElement);
    });
}

function deleteCase(caseId) {
    if (confirm('¿Está seguro de eliminar este caso?')) {
        cases = cases.filter(c => c.id !== caseId);
        localStorage.setItem('asimetrixCases', JSON.stringify(cases));
        displayCases();
        displayAllEngineers(); // Actualizar contadores
    }
}

function clearForm() {
    document.getElementById('caseNumber').value = '';
    document.getElementById('caseDescription').value = '';
    document.getElementById('caseTechnology').value = '';
}

function clearAllCases() {
    if (confirm('¿Está seguro de eliminar TODOS los casos? Esta acción no se puede deshacer.')) {
        cases = [];
        localStorage.setItem('asimetrixCases', JSON.stringify(cases));
        displayCases();
        displayAllEngineers(); // Actualizar contadores
    }
}

// ========== REPORTES EXCEL ==========
function downloadExcelReport() {
    const excelData = engineers.map(engineer => {
        const engineerCases = cases.filter(c => c.engineerId === engineer.id).length;
        return {
            'Nombre': engineer.name,
            'Cargo': engineer.title,
            'Experiencia': engineer.experience,
            'Especialidades': engineer.specialties.join(', '),
            'Email': engineer.email,
            'Teléfono': engineer.phone,
            'En Guardia': engineer.onDuty ? 'SÍ' : 'NO',
            'Casos Resueltos': engineerCases
        };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    const columnWidths = [
        { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 30 },
        { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 15 }
    ];
    ws['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Ingenieros AsimetrixTech');
    const fileName = `Reporte_Ingenieros_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

function downloadGuardiaReport() {
    const guardiaEngineers = engineers.filter(engineer => engineer.onDuty);
    
    if (guardiaEngineers.length === 0) {
        alert('No hay ingenieros de guardia en este momento');
        return;
    }

    const excelData = guardiaEngineers.map(engineer => ({
        'Nombre': engineer.name,
        'Cargo': engineer.title,
        'Especialidades': engineer.specialties.join(', '),
        'Email': engineer.email,
        'Teléfono': engineer.phone,
        'WhatsApp': `https://wa.me/${engineer.phone.replace(/\s+/g, '').replace('+', '')}`,
        'Prioridad': 'ALTA'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, 'Ingenieros de Guardia');
    const fileName = `Guardias_AsimetrixTech_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

function downloadTechReport(technology) {
    const techEngineers = engineers.filter(engineer => 
        engineer.specialties.some(specialty => 
            specialty.toLowerCase().includes(technology.toLowerCase())
        )
    );

    if (techEngineers.length === 0) {
        alert(`No hay ingenieros especializados en ${technology}`);
        return;
    }

    const excelData = techEngineers.map(engineer => ({
        'Nombre': engineer.name,
        'Cargo': engineer.title,
        'Experiencia': engineer.experience,
        'Especialidades': engineer.specialties.join(', '),
        'Email': engineer.email,
        'Teléfono': engineer.phone,
        'En Guardia': engineer.onDuty ? 'SÍ' : 'NO'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, `Especialistas_${technology}`);
    const fileName = `Reporte_${technology}_AsimetrixTech.xlsx`;
    XLSX.writeFile(wb, fileName);
}

function downloadCasesReport() {
    if (cases.length === 0) {
        alert('No hay casos para generar reporte');
        return;
    }

    const excelData = cases.map(caseItem => ({
        'Número de Caso': caseItem.caseNumber,
        'Ingeniero': caseItem.engineerName,
        'Fecha': caseItem.date,
        'Tecnología': caseItem.technology || 'No especificada',
        'Descripción': caseItem.description
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, 'Casos Resueltos');
    const fileName = `Casos_AsimetrixTech_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

// ========== MENÚ DESPLEGABLE DE REPORTES ==========
function downloadReport(type, technology = '') {
    switch(type) {
        case 'all': downloadExcelReport(); break;
        case 'guardia': downloadGuardiaReport(); break;
        case 'technology': 
            if (technology) downloadTechReport(technology); 
            break;
        case 'cases': downloadCasesReport(); break;
    }
}

// ========== EVENT LISTENERS ==========
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (searchTerm.length >= 2) {
        performSearch(searchTerm);
    } else if (searchTerm.length === 0) {
        displayAllEngineers();
    }
});

document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchEngineers();
});

document.getElementById('searchInputHero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') searchFromHero();
});

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    displayAllEngineers();
    loadEngineersSelect();
    displayCases();
});

// ========== TOGGLE DEL SISTEMA DE CASOS ==========
function toggleCasesSection() {
    const container = document.getElementById('casesContainer');
    const toggleText = document.getElementById('casesToggleText');
    const toggleIcon = document.getElementById('casesToggleIcon');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        toggleText.textContent = 'Ocultar Sistema de Casos';
        toggleIcon.className = 'fas fa-chevron-up';
    } else {
        container.style.display = 'none';
        toggleText.textContent = 'Mostrar Sistema de Casos';
        toggleIcon.className = 'fas fa-chevron-down';
    }
}

// ========== REPORTES AVANZADOS CON FORMATO ==========
function downloadAdvancedCasesReport() {
    if (cases.length === 0) {
        alert('No hay casos para generar reporte');
        return;
    }

    // Crear libro de trabajo
    const wb = XLSX.utils.book_new();

    // ===== HOJA 1: RESUMEN ESTADÍSTICO =====
    const statsData = generateStatsData();
    const wsStats = XLSX.utils.json_to_sheet(statsData);
    
    // Formato para hoja de estadísticas
    wsStats['!cols'] = [
        { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsStats, 'Estadísticas');

    // ===== HOJA 2: DETALLE DE CASOS =====
    const casesData = cases.map(caseItem => ({
        'Número de Caso': caseItem.caseNumber,
        'Ingeniero': caseItem.engineerName,
        'Fecha': caseItem.date,
        'Tecnología': caseItem.technology || 'No especificada',
        'Descripción': caseItem.description,
        'Prioridad': getPriorityByTechnology(caseItem.technology)
    }));

    const wsCases = XLSX.utils.json_to_sheet(casesData);
    wsCases['!cols'] = [
        { wch: 15 }, { wch: 20 }, { wch: 20 }, 
        { wch: 15 }, { wch: 40 }, { wch: 12 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsCases, 'Detalle de Casos');

    // ===== HOJA 3: POR INGENIERO =====
    const engineerData = generateEngineerStats();
    const wsEngineers = XLSX.utils.json_to_sheet(engineerData);
    wsEngineers['!cols'] = [
        { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsEngineers, 'Por Ingeniero');

    // ===== HOJA 4: POR TECNOLOGÍA =====
    const techData = generateTechnologyStats();
    const wsTech = XLSX.utils.json_to_sheet(techData);
    wsTech['!cols'] = [
        { wch: 20 }, { wch: 10 }, { wch: 20 }, { wch: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsTech, 'Por Tecnología');

    // Descargar archivo
    const fileName = `Reporte_Avanzado_Casos_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

// Generar datos estadísticos
function generateStatsData() {
    const totalCases = cases.length;
    const uniqueEngineers = [...new Set(cases.map(c => c.engineerName))].length;
    const uniqueTechs = [...new Set(cases.map(c => c.technology).filter(t => t))].length;
    
    // Ingeniero con más casos
    const engineerStats = {};
    cases.forEach(c => {
        engineerStats[c.engineerName] = (engineerStats[c.engineerName] || 0) + 1;
    });
    const topEngineer = Object.entries(engineerStats).sort((a, b) => b[1] - a[1])[0];
    
    // Tecnología más común
    const techStats = {};
    cases.forEach(c => {
        if (c.technology) {
            techStats[c.technology] = (techStats[c.technology] || 0) + 1;
        }
    });
    const topTech = Object.entries(techStats).sort((a, b) => b[1] - a[1])[0];

    return [
        { 'Métrica': 'Total de Casos', 'Valor': totalCases, 'Detalle': 'Desde el inicio', 'Estado': 'ACTIVO' },
        { 'Métrica': 'Ingenieros Involucrados', 'Valor': uniqueEngineers, 'Detalle': 'Personal activo', 'Estado': 'ACTIVO' },
        { 'Métrica': 'Tecnologías Diferentes', 'Valor': uniqueTechs, 'Detalle': 'Áreas cubiertas', 'Estado': 'ACTIVO' },
        { 'Métrica': 'Ingeniero Más Activo', 'Valor': topEngineer ? topEngineer[1] : 0, 'Detalle': topEngineer ? topEngineer[0] : 'N/A', 'Estado': 'DESTACADO' },
        { 'Métrica': 'Tecnología Más Común', 'Valor': topTech ? topTech[1] : 0, 'Detalle': topTech ? topTech[0] : 'N/A', 'Estado': 'FRECUENTE' }
    ];
}

// Generar estadísticas por ingeniero
function generateEngineerStats() {
    const engineerStats = {};
    
    cases.forEach(c => {
        if (!engineerStats[c.engineerName]) {
            engineerStats[c.engineerName] = {
                total: 0,
                technologies: {}
            };
        }
        engineerStats[c.engineerName].total++;
        
        if (c.technology) {
            engineerStats[c.engineerName].technologies[c.technology] = 
                (engineerStats[c.engineerName].technologies[c.technology] || 0) + 1;
        }
    });

    const result = [];
    Object.entries(engineerStats).forEach(([engineer, stats]) => {
        // Ordenar tecnologías por frecuencia
        const sortedTechs = Object.entries(stats.technologies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Top 3 tecnologías
        
        result.push({
            'Ingeniero': engineer,
            'Total Casos': stats.total,
            'Tecnologías Principales': sortedTechs.map(t => `${t[0]} (${t[1]})`).join(', '),
            'Rendimiento': getPerformanceLevel(stats.total)
        });
    });

    return result.sort((a, b) => b['Total Casos'] - a['Total Casos']);
}

// Generar estadísticas por tecnología
function generateTechnologyStats() {
    const techStats = {};
    
    cases.forEach(c => {
        if (c.technology) {
            techStats[c.technology] = {
                count: (techStats[c.technology]?.count || 0) + 1,
                engineers: techStats[c.technology]?.engineers || new Set()
            };
            techStats[c.technology].engineers.add(c.engineerName);
        }
    });

    const result = [];
    Object.entries(techStats).forEach(([tech, stats]) => {
        result.push({
            'Tecnología': tech,
            'Total Casos': stats.count,
            'Ingenieros Especializados': stats.engineers.size,
            'Frecuencia': getFrequencyLevel(stats.count),
            'Porcentaje': `${((stats.count / cases.length) * 100).toFixed(1)}%`
        });
    });

    return result.sort((a, b) => b['Total Casos'] - a['Total Casos']);
}

// Funciones auxiliares para categorización
function getPriorityByTechnology(tech) {
    const highPriority = ['Azure', 'AWS', 'Servidores', 'Almacenamiento'];
    const mediumPriority = ['Linux', 'Windows Server', 'Monitoreo'];
    
    if (highPriority.some(t => tech?.includes(t))) return 'ALTA';
    if (mediumPriority.some(t => tech?.includes(t))) return 'MEDIA';
    return 'BAJA';
}

function getPerformanceLevel(casesCount) {
    if (casesCount >= 10) return 'EXCELENTE';
    if (casesCount >= 5) return 'BUENO';
    if (casesCount >= 2) return 'REGULAR';
    return 'INICIAL';
}

function getFrequencyLevel(count) {
    if (count >= 10) return 'MUY ALTA';
    if (count >= 5) return 'ALTA';
    if (count >= 2) return 'MEDIA';
    return 'BAJA';
}

// ===== REPORTE ESPECÍFICO POR INGENIERO CON RANKING =====
function downloadEngineerDetailReport(engineerName) {
    const engineerCases = cases.filter(c => c.engineerName === engineerName);
    
    if (engineerCases.length === 0) {
        alert(`No hay casos registrados para ${engineerName}`);
        return;
    }

    const wb = XLSX.utils.book_new();

    // Estadísticas por tecnología para este ingeniero
    const techStats = {};
    engineerCases.forEach(c => {
        if (c.technology) {
            techStats[c.technology] = (techStats[c.technology] || 0) + 1;
        }
    });

    // Función auxiliar para determinar el nivel de contribución
    function getContributionLevel(count, total) {
        const percentage = (count / total) * 100;
        if (percentage >= 40) return 'ALTA';
        if (percentage >= 20) return 'MEDIA';
        return 'BAJA';
    }

    // Crear datos con ranking y contribución (OPCIÓN D)
    const chartData = Object.entries(techStats)
        .sort((a, b) => b[1] - a[1])
        .map(([tech, count], index) => ({
            '#': index + 1,
            'Tecnología': tech,
            'Casos Resueltos': count,
            'Porcentaje': `${((count / engineerCases.length) * 100).toFixed(1)}%`,
            'Contribución': getContributionLevel(count, engineerCases.length),
            'Impacto': index === 0 ? 'PRINCIPAL' : index < 3 ? 'SECUNDARIO' : 'COMPLEMENTARIO'
        }));

    const ws = XLSX.utils.json_to_sheet(chartData);
    ws['!cols'] = [
        { wch: 5 },   // #
        { wch: 20 },  // Tecnología
        { wch: 15 },  // Casos Resueltos
        { wch: 12 },  // Porcentaje
        { wch: 12 },  // Contribución
        { wch: 15 }   // Impacto
    ];

    XLSX.utils.book_append_sheet(wb, ws, `Estadísticas ${engineerName}`);
    
    // Agregar hoja con detalle de casos
    const detailData = engineerCases.map(c => ({
        'Caso': c.caseNumber,
        'Fecha': c.date,
        'Tecnología': c.technology,
        'Descripción': c.description,
        'Prioridad': getPriorityByTechnology(c.technology)
    }));
    
    const wsDetail = XLSX.utils.json_to_sheet(detailData);
    wsDetail['!cols'] = [
        { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 40 }, { wch: 10 }
    ];
    XLSX.utils.book_append_sheet(wb, wsDetail, 'Detalle Casos');

    // Agregar hoja de resumen ejecutivo
    const summaryData = [
        { 'Métrica': 'Ingeniero', 'Valor': engineerName },
        { 'Métrica': 'Total de Casos', 'Valor': engineerCases.length },
        { 'Métrica': 'Tecnologías Diferentes', 'Valor': Object.keys(techStats).length },
        { 'Métrica': 'Tecnología Principal', 'Valor': Object.entries(techStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A' },
        { 'Métrica': 'Eficiencia', 'Valor': `${((engineerCases.length / cases.length) * 100).toFixed(1)}% del total` }
    ];
    
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    wsSummary['!cols'] = [
        { wch: 25 }, { wch: 30 }
    ];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen Ejecutivo');

    const fileName = `Reporte_${engineerName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
}

// Función auxiliar para prioridad (si no existe, agrégala)
function getPriorityByTechnology(tech) {
    const highPriority = ['Azure', 'AWS', 'Servidores', 'Almacenamiento', 'HPE', 'Backup'];
    const mediumPriority = ['Linux', 'Windows Server', 'Monitoreo', 'Veeam', 'Data protector'];
    
    if (highPriority.some(t => tech?.includes(t))) return 'ALTA';
    if (mediumPriority.some(t => tech?.includes(t))) return 'MEDIA';
    return 'BAJA';
}