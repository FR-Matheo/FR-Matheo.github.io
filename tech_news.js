// ===== SYSTÈME VEILLE TECHNOLOGIQUE (JSON N8N) =====

// Configuration
const JSON_SOURCE = 'veille_techno.json';

// Cache pour éviter les requêtes répétées
let techCache = {
    data: null,
    timestamp: 0,
    ttl: 15 * 60 * 1000 // 15 minutes
};

// Mappage des images par source (Fallback intelligent)
function getSourceImage(source) {
    const sourceLower = (source || '').toLowerCase();
    
    if (sourceLower.includes('it connect') || sourceLower.includes('it-connect')) {
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop'; // Tech/Network
    }
    if (sourceLower.includes('zdnet')) {
        return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop'; // Business/Tech
    }
    if (sourceLower.includes('cert') || sourceLower.includes('securite') || sourceLower.includes('security')) {
        return 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop'; // Security/Lock
    }
    if (sourceLower.includes('lmi')) {
        return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop'; // Server/Infra
    }
    
    // Image par défaut "High Tech"
    return 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop';
}

function getBugattiTrendEmoji(source) {
    // Emoji basé sur la source pour donner un peu de vie
    const sourceLower = (source || '').toLowerCase();
    if (sourceLower.includes('cert')) return '🛡️';
    if (sourceLower.includes('it connect')) return '🔌';
    if (sourceLower.includes('zdnet')) return '📰';
    return '🚀';
}

// ===== FONCTION PRINCIPALE =====

async function fetchEmergingTechnologies() {
    console.log('🏎️ Actualisation de la veille technologique (Source JSON)...');

    const containerElement = document.getElementById('articles-container');
    if (!containerElement) {
        return;
    }

    // Gestion des éléments de chargement/erreur
    let loadingElement = document.getElementById('veille-loading');
    if (!loadingElement) {
        loadingElement = document.createElement('div');
        loadingElement.id = 'veille-loading';
        containerElement.parentNode.insertBefore(loadingElement, containerElement);
    }
    let errorElement = document.getElementById('veille-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'veille-error';
        containerElement.parentNode.insertBefore(errorElement, containerElement);
    }

    // Affichage du chargement
    loadingElement.style.display = 'block';
    loadingElement.innerHTML = `
        <div class="d-flex justify-content-center align-items-center my-4">
            <div class="spinner-border text-primary me-3" role="status"><span class="visually-hidden">Chargement...</span></div>
            <span class="fs-5">Chargement de la veille technologique...</span>
        </div>
    `;
    errorElement.style.display = 'none';

    try {
        // Vérifier le cache
        const now = Date.now();
        if (techCache.data && (now - techCache.timestamp) < techCache.ttl) {
            console.log('💎 Cache veille disponible');
            displayVeilleTechnologique(techCache.data);
            loadingElement.style.display = 'none';
            return;
        }

        // Récupération du JSON
        const response = await fetch(JSON_SOURCE);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Mettre en cache
        techCache = {
            data: data,
            timestamp: now,
            ttl: techCache.ttl
        };

        console.log(`✨ ${data.length} articles récupérés`);
        displayVeilleTechnologique(data);

    } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);

        errorElement.style.display = 'block';
        errorElement.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center my-3" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <div>
                    <strong>Erreur lors du chargement de la veille :</strong> ${error.message}<br>
                    <small>Vérifiez que le fichier ${JSON_SOURCE} existe.</small>
                </div>
            </div>
        `;
    } finally {
        loadingElement.style.display = 'none';
    }
}

// ===== AFFICHAGE VEILLE TECHNOLOGIQUE =====
function displayVeilleTechnologique(articles) {
    const containerElement = document.getElementById('articles-container');
    if (!containerElement) return;

    if (!articles || articles.length === 0) {
        containerElement.innerHTML = '<div class="col-12 text-center text-muted">Aucun article disponible pour le moment.</div>';
        return;
    }

    containerElement.innerHTML = articles.map(article => {
        const image = getSourceImage(article.source);
        const date = new Date(article.date).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
        const emoji = getBugattiTrendEmoji(article.source);

        return `
        <div class="col-md-6 col-lg-4">
            <div class="card bg-dark-surface border-0 shadow-lg h-100 overflow-hidden hover-lift transition-all">
                <div class="position-relative">
                    <img src="${image}" alt="${article.title}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-3">
                        <span class="badge bg-primary-gradient shadow-sm">${article.source || 'Veille'}</span>
                    </div>
                </div>
                <div class="card-body p-4 d-flex flex-column">
                    <div class="mb-2 text-primary small fw-bold">
                        <i class="far fa-calendar-alt me-1"></i> ${date}
                    </div>
                    <h5 class="card-title text-white fw-bold mb-3 line-clamp-2" title="${article.title}">
                        ${emoji} ${article.title}
                    </h5>
                    <p class="card-text text-gray-400 small mb-4 line-clamp-3 flex-grow-1">
                        ${article.summary}
                    </p>
                    <a href="${article.link}" target="_blank" rel="noopener" class="btn btn-outline-primary btn-sm rounded-pill align-self-start mt-auto">
                        Lire l'article <i class="fas fa-external-link-alt ms-1"></i>
                    </a>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// ===== INITIALISATION =====

// Nettoyage automatique du cache
setInterval(() => {
    if (techCache.timestamp && (Date.now() - techCache.timestamp) > techCache.ttl) {
        techCache.data = null;
        console.log('🧹 Cache nettoyé');
    }
}, 5 * 60 * 1000);

// Chargement automatique
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏎️ Système veille N8N initialisé');
    setTimeout(fetchEmergingTechnologies, 500);
});

// Auto-refresh
setInterval(fetchEmergingTechnologies, 20 * 60 * 1000);