// ===== SYSTÈME COMPLET TECHNOLOGIES ÉMERGENTES =====
 
// ===== SYSTÈME TECHNOLOGIES ÉMERGENTES - THÈME BUGATTI =====
 
// Configuration des sources d'API et RSS pour les technologies émergentes
const TECH_SOURCES = {
    techcrunch: 'https://techcrunch.com/feed/',
    arsTechnica: 'https://feeds.arstechnica.com/arstechnica/technology-lab',
    wired: 'https://www.wired.com/feed/rss',  
    verge: 'https://www.theverge.com/rss/index.xml'
};
 
// Base de données des technologies émergentes avec images - THÈME BUGATTI
const EMERGING_TECH_DATABASE = [
    {
        name: "Intelligence Artificielle Générative",
        description: "Les IA comme GPT-4, Claude et Gemini transforment la création de contenu, la programmation et l'automatisation des tâches complexes.",
        trend: "Adoption massive",
        impact: "Révolution créative",
        category: "IA",
        keywords: ["ai", "gpt", "claude", "intelligence artificielle", "machine learning"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
        bugatti_relevance: "Automatisation et optimisation des processus"
    },
    {
        name: "Quantum Computing",
        description: "Les ordinateurs quantiques d'IBM, Google et IonQ promettent de révolutionner la cryptographie, la simulation moléculaire et l'optimisation.",
        trend: "Recherche avancée",
        impact: "Potentiel disruptif",
        category: "Hardware",
        keywords: ["quantum", "quantique", "ibm", "google quantum"],
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
        bugatti_relevance: "Puissance de calcul révolutionnaire"
    },
    {
        name: "Edge Computing & 5G",
        description: "Le traitement des données au plus près des utilisateurs avec la 5G permet une latence ultra-faible pour l'IoT et la réalité augmentée.",
        trend: "Déploiement accéléré",
        impact: "Optimisation réseau",
        category: "Infrastructure",
        keywords: ["edge computing", "5g", "latence", "iot"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        bugatti_relevance: "Performance et rapidité extrêmes"
    },
    {
        name: "Cybersécurité Zero Trust",
        description: "L'architecture Zero Trust devient la norme avec 'jamais faire confiance, toujours vérifier' face aux cybermenaces sophistiquées.",
        trend: "Adoption entreprise",
        impact: "Nouvelle norme sécurité",
        category: "Sécurité",
        keywords: ["zero trust", "cybersécurité", "siem", "soc"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
        bugatti_relevance: "Sécurité de niveau premium"
    },
    {
        name: "Web3 & Blockchain Evolution",
        description: "Au-delà des cryptomonnaies, la blockchain trouve des applications en supply chain, identité numérique et contrats intelligents.",
        trend: "Maturation",
        impact: "Décentralisation",
        category: "Blockchain",
        keywords: ["web3", "blockchain", "smart contracts", "nft"],
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=250&fit=crop",
        bugatti_relevance: "Innovation et exclusivité"
    },
    {
        name: "Réalité Mixte (AR/VR)",
        description: "Apple Vision Pro, Meta Quest et HoloLens ouvrent de nouveaux usages en formation, collaboration et divertissement immersif.",
        trend: "Adoption croissante",
        impact: "Interface révolutionnaire",
        category: "Immersif",
        keywords: ["ar", "vr", "mixed reality", "apple vision", "meta quest"],
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=250&fit=crop",
        bugatti_relevance: "Expérience utilisateur ultime"
    },
    {
        name: "Informatique Neuromorphique",
        description: "Les puces inspirées du cerveau humain comme Intel Loihi promettent une efficacité énergétique révolutionnaire pour l'IA.",
        trend: "Recherche active",
        impact: "Efficacité énergétique",
        category: "Hardware",
        keywords: ["neuromorphique", "intel loihi", "brain-inspired"],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
        bugatti_relevance: "Ingénierie de pointe"
    },
    {
        name: "Sustainable Tech / Green IT",
        description: "Technologies vertes, centres de données durables et calcul à faible empreinte carbone deviennent prioritaires.",
        trend: "Impératif écologique",
        impact: "Responsabilité environnementale",
        category: "Durabilité",
        keywords: ["green it", "sustainable tech", "carbon neutral"],
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=250&fit=crop",
        bugatti_relevance: "Performance durable"
    }
];
 
// Cache pour éviter les requêtes répétées
let techCache = {
    data: null,
    timestamp: 0,
    ttl: 15 * 60 * 1000 // 15 minutes
};
 
// Configuration proxy CORS pour récupérer les flux RSS
const TECH_CORS_PROXIES = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://thingproxy.freeboard.io/fetch/'
];
 
// ===== FONCTIONS UTILITAIRES - THÈME BUGATTI =====
 
function getBugattiTrendEmoji(trend) {
    const trendMap = {
        'Adoption massive': '🚀',
        'Recherche avancée': '⚡',
        'Déploiement accéléré': '🏎️',
        'Adoption entreprise': '🏢',
        'Maturation': '🔧',
        'Adoption croissante': '📈',
        'Recherche active': '⚙️',
        'Impératif écologique': '🌿'
    };
    return trendMap[trend] || '💎';
}
 
function getBugattiImpactStyle(impact) {
    // Couleurs dans l'esprit Bugatti : bleu principal et variations sombres
    const styleMap = {
        'Révolution créative': {
            primary: '#00A9E0',
            secondary: '#0088B8',
            accent: '#232323'
        },
        'Potentiel disruptif': {
            primary: '#0088B8',
            secondary: '#006B94',
            accent: '#1a1a1a'
        },
        'Optimisation réseau': {
            primary: '#006B94',
            secondary: '#005577',
            accent: '#232323'
        },
        'Nouvelle norme sécurité': {
            primary: '#005577',
            secondary: '#004455',
            accent: '#1a1a1a'
        },
        'Décentralisation': {
            primary: '#004455',
            secondary: '#003344',
            accent: '#232323'
        },
        'Interface révolutionnaire': {
            primary: '#003344',
            secondary: '#002233',
            accent: '#1a1a1a'
        },
        'Efficacité énergétique': {
            primary: '#002233',
            secondary: '#001122',
            accent: '#232323'
        },
        'Responsabilité environnementale': {
            primary: '#001122',
            secondary: '#000811',
            accent: '#1a1a1a'
        }
    };
    return styleMap[impact] || {
        primary: '#00A9E0',
        secondary: '#232323',
        accent: '#1a1a1a'
    };
}
 
// ===== RÉCUPÉRATION D'ARTICLES RSS =====
 
async function fetchTechNewsFromRSS(sourceUrl, maxArticles = 3) {
    for (const proxy of TECH_CORS_PROXIES) {
        try {
            // fetch ne supporte pas l'option timeout nativement
            const response = await fetch(proxy + encodeURIComponent(sourceUrl), {
                method: 'GET'
            });

            if (!response.ok) {
                continue;
            }

            let xmlContent;
            if (proxy.includes('allorigins')) {
                const data = await response.json();
                xmlContent = data.contents;
            } else {
                xmlContent = await response.text();
            }

            if (!xmlContent || (!xmlContent.includes('<rss') && !xmlContent.includes('<feed'))) {
                continue;
            }

            return await parseTechRSS(xmlContent, maxArticles);

        } catch (error) {
            // Utiliser error.message si défini, sinon error
            console.log(`Proxy ${proxy} échoué:`, error && error.message ? error.message : error);
            continue;
        }
    }

    return [];
}
 
async function parseTechRSS(xmlString, maxArticles) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        const items = xmlDoc.querySelectorAll('item, entry');
        const articles = [];

        for (let i = 0; i < Math.min(items.length, maxArticles); i++) {
            const item = items[i];
            const title = item.querySelector('title')?.textContent || '';
            // Correction du lien pour Atom/RSS
            let link = '';
            const linkNode = item.querySelector('link');
            if (linkNode) {
                if (linkNode.getAttribute('href')) {
                    link = linkNode.getAttribute('href');
                } else {
                    link = linkNode.textContent;
                }
            }
            const description = item.querySelector('description, summary')?.textContent || '';

            // Filtrer les articles tech pertinents
            if (isTechRelevant(title + ' ' + description)) {
                articles.push({
                    title: title.substring(0, 80) + (title.length > 80 ? '...' : ''),
                    link: link,
                    description: cleanDescription(description).substring(0, 120) + '...',
                    source: getSourceName(link)
                });
            }
        }

        return articles;
    } catch (error) {
        console.error('Erreur parsing RSS tech:', error && error.message ? error.message : error);
        return [];
    }
}
 
function isTechRelevant(text) {
    const relevantKeywords = [
        'ai', 'artificial intelligence', 'machine learning', 'quantum', 
        'blockchain', 'cryptocurrency', 'cybersecurity', 'cloud', 'edge computing',
        '5g', 'iot', 'ar', 'vr', 'mixed reality', 'neuromorphic', 'green tech'
    ];
 
    const textLower = text.toLowerCase();
    return relevantKeywords.some(keyword => textLower.includes(keyword));
}
 
function getSourceName(url) {
    if (url.includes('techcrunch')) {
        return 'TechCrunch';
    }
    if (url.includes('arstechnica')) {
        return 'Ars Technica';
    }
    if (url.includes('wired')) {
        return 'Wired';
    }
    if (url.includes('theverge')) {
        return 'The Verge';
    }
    return 'Tech News';
}
 
function cleanDescription(description) {
    if (!description) {
        return 'Description non disponible';
    }
 
    return description
        .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
        .replace(/<[^>]*>/g, '')
        .replace(/&#8211;/g, '–')
        .replace(/&#038;/g, '&')
        .replace(/&#8217;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}
 
// ===== FONCTION PRINCIPALE =====
 
async function fetchEmergingTechnologies() {
    console.log('🏎️ Actualisation des technologies émergentes - Thème Bugatti...');
 
    const containerElement = document.getElementById('articles-container');
    if (!containerElement) {
        return;
    }
    // Création/gestion des éléments de chargement et d'erreur dynamiquement
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
    const lastUpdateElement = null; // non utilisé ici
 
    // Affichage du chargement avec style Bugatti
    loadingElement.style.display = 'block';
    loadingElement.innerHTML = `
        <div class="d-flex justify-content-center align-items-center my-4">
            <div class="spinner-border text-primary me-3" role="status"><span class="visually-hidden">Chargement...</span></div>
            <span class="fs-5">Chargement de la veille technologique...</span>
        </div>
    `;
    errorElement.style.display = 'none';
 
    try {
        // Animation de la barre de progression
        // plus de barre de progression custom, spinner Bootstrap

        // Vérifier le cache
        const now = Date.now();
        if (techCache.data && (now - techCache.timestamp) < techCache.ttl) {
            console.log('💎 Cache technologies Bugatti disponible');
            displayVeilleTechnologique(techCache.data);
            loadingElement.style.display = 'none';
            return;
        }

        // Récupération des actualités en parallèle
        console.log('🌐 Récupération des flux RSS avec style Bugatti...');
        const newsPromises = Object.entries(TECH_SOURCES).map(([source, url]) => 
            fetchTechNewsFromRSS(url, 2).catch(err => {
                console.log(`Source ${source} échoué:`, err && err.message ? err.message : err);
                return [];
            })
        );

        const newsResults = await Promise.all(newsPromises);
        const allNews = newsResults.flat().slice(0, 6);

        // Mélanger les données statiques avec les actualités
        const enhancedTechData = EMERGING_TECH_DATABASE.map(tech => {
            // Trouver des actualités pertinentes
            const relevantNews = allNews.filter(article => 
                tech.keywords.some(keyword => 
                    article.title && article.title.toLowerCase().includes(keyword) || 
                    article.description && article.description.toLowerCase().includes(keyword)
                )
            );

            return {
                ...tech,
                recentNews: relevantNews.slice(0, 2),
                hasNews: relevantNews.length > 0
            };
        });

        // Mettre en cache
        techCache = {
            data: enhancedTechData,
            timestamp: now,
            ttl: techCache.ttl
        };

        console.log(`✨ ${allNews.length} actualités intégrées avec style Bugatti`);
    displayVeilleTechnologique(enhancedTechData);

    } catch (error) {
        console.error('❌ Erreur lors du chargement:', error && error.message ? error.message : error);

        errorElement.style.display = 'block';
        errorElement.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center my-3" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <div>
                    <strong>Erreur lors du chargement de la veille technologique :</strong> ${error && error.message ? error.message : error}<br>
                    <small>Données de base affichées.</small>
                </div>
            </div>
        `;
        // Fallback avec données de base
        displayVeilleTechnologique(EMERGING_TECH_DATABASE);

    } finally {
        loadingElement.style.display = 'none';
    }
}
 
// ===== AFFICHAGE VEILLE TECHNOLOGIQUE - Bootstrap Card Responsive =====
function displayVeilleTechnologique(technologies) {
    const containerElement = document.getElementById('articles-container');
    if (!containerElement) {
        return;
    }
    // Harmonisation avec le style sombre et "article-card" (même fond que stages)
    containerElement.innerHTML = technologies.map(tech => `
        <div class="article-card shadow-sm">
            <img src="${tech.image}" alt="${tech.name}" onerror="this.src='https://via.placeholder.com/400x250?text=Image+indisponible'">
            <h3>${tech.name}</h3>
            <div class="mb-2">
                <span class="badge bg-primary me-1">${tech.trend}</span>
                <span class="badge bg-info text-dark me-1">${tech.impact}</span>
                <span class="badge bg-secondary">${tech.bugatti_relevance}</span>
            </div>
            <p>${tech.description}</p>
            <div class="mb-2"><span class="badge bg-dark">${tech.category}</span></div>
            ${tech.recentNews && tech.recentNews.length > 0 ? `
                <div class="mt-2">
                    <h6 class="mb-2"><i class="fas fa-newspaper me-1"></i>Actualités récentes :</h6>
                    <ul class="list-unstyled mb-0">
                        ${tech.recentNews.map(article => `
                            <li class="mb-2">
                                <a href="${article.link}" target="_blank" rel="noopener" class="link-primary fw-semibold">
                                    <i class="fas fa-external-link-alt me-1"></i>${article.title}
                                </a>
                                <div class="small text-muted">${article.source}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `).join('');
    console.log(`🏎️ ${technologies.length} technologies affichées (article-card sombre)`);
}
 
// ===== INITIALISATION ET UTILITAIRES =====
 
// Nettoyage automatique du cache
setInterval(() => {
    if (techCache.timestamp && (Date.now() - techCache.timestamp) > techCache.ttl) {
        techCache.data = null;
        console.log('🧹 Cache Bugatti nettoyé');
    }
}, 5 * 60 * 1000); // Vérifier toutes les 5 minutes
 
// Fonctions utilitaires pour le debugging Bugatti
window.debugBugattiTechCache = () => {
    console.log('🏎️ État du cache technologies Bugatti:', {
        hasData: !!techCache.data,
        age: techCache.timestamp ? (Date.now() - techCache.timestamp) / 1000 + 's' : 'N/A',
        itemCount: techCache.data ? techCache.data.length : 0,
        theme: 'Bugatti Premium'
    });
};
 
window.clearBugattiTechCache = () => {
    techCache.data = null;
    techCache.timestamp = 0;
    console.log('🧹 Cache technologies Bugatti vidé manuellement');
};
 
// Chargement automatique au démarrage de la page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏎️ Système technologies émergentes Bugatti initialisé');
    console.log('💎 Thème: Performance, Innovation, Excellence');
    // Petit délai pour laisser la page se charger complètement
    setTimeout(fetchEmergingTechnologies, 1000);
});
 
// Auto-refresh toutes les 20 minutes avec style
setInterval(() => {
    console.log('🔄 Actualisation automatique Bugatti - Technologies émergentes');
    fetchEmergingTechnologies();
}, 20 * 60 * 1000);