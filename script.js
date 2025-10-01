document.addEventListener("DOMContentLoaded", function() {
    // Définition de vos compétences
    var skills = [
        { name: "HTML", img: "images/logos/html.png" },
        { name: "CSS", img: "images/logos/css.png" },
        { name: "JavaScript", img: "images/logos/javascript.png" },
        { name: "Python", img: "images/logos/python.png" },
        { name: "Azure", img: "images/logos/azure.png" },
        { name: "Pix", img: "images/logos/pix.png", cert: "documents/attestation-pix-20231220.pdf" }
    ];

    // Détermine le nombre d'items par slide en fonction de la largeur de l'écran
    function getMinPerSlide() {
        const width = window.innerWidth;
        if(width < 576) {
            return 1;  // Sur téléphone : 1 compétence par slide
        } else if(width < 768) {
            return 2;  // Sur petits écrans
        } else {
            return 3;  // Sur tablette et desktop
        }
    }
    var minPerSlide = getMinPerSlide();

    // Pour les écrans petits, on retire la classe carousel-fade, sinon on la conserve pour un bel effet de fondu
    var carouselContainer = document.getElementById('competencesCarousel');
    if(carouselContainer && window.innerWidth < 768) {
        carouselContainer.classList.remove("carousel-fade");
    }

    // On reconstruit entièrement le carousel
    var carouselInner = document.querySelector('#competencesCarousel .carousel-inner');
    carouselInner.innerHTML = ""; // vider le contenu existant

    // Pour chaque compétence, créer un slide affichant minPerSlide items avec décalage progressif
    for(var i = 0; i < skills.length; i++) {
        var carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if(i === 0) {
            carouselItem.classList.add("active");
        }
        var dFlex = document.createElement("div");
        dFlex.classList.add("d-flex", "justify-content-center");

        // Affiche minPerSlide compétences à partir de l'index i (décalage de 1 par slide)
        for(var j = 0; j < minPerSlide; j++){
            var index = (i + j) % skills.length;
            var skill = skills[index];
            var itemDiv = document.createElement("div");
            itemDiv.classList.add("text-center", "me-3");
            var htmlContent = "<p>" + skill.name + "</p>" +
                              "<img src='" + skill.img + "' alt='" + skill.name + "' class='d-block mx-auto' style='height: 100px;'>";
            if(skill.cert){
                htmlContent += "<a href='" + skill.cert + "' target='_blank' class='btn btn-primary mt-2'>Voir Certification</a>";
            }
            itemDiv.innerHTML = htmlContent;
            dFlex.appendChild(itemDiv);
        }
        carouselItem.appendChild(dFlex);
        carouselInner.appendChild(carouselItem);
    }

    // Initialisation du carousel Bootstrap avec l'effet slide ou fade selon la classe présente
    if(carouselContainer) {
        new bootstrap.Carousel(carouselContainer, {
            // Sur desktop, on peut augmenter l'intervalle afin de profiter pleinement de l'effet de fondu
            interval: window.innerWidth < 768 ? 3000 : 5000,
            wrap: true
        });
    }

    // Réajuster le carousel lors du redimensionnement (optionnel)
    window.addEventListener('resize', function(){
        location.reload();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://formspree.io/f/mkgndjle', true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    formResponse.innerHTML = '<p>Merci pour votre message !</p>';
                    form.reset();
                } else {
                    formResponse.innerHTML = '<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>';
                }
            }
        };
        xhr.send(formData);
    });

    // Insère l'année actuelle dans le footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            let articlesContainer = document.getElementById("articles-container");

            articles.forEach(article => {
                let articleCard = document.createElement("div");
                articleCard.classList.add("article-card");
                articleCard.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" onerror="this.src='https://www.ville.magog.qc.ca/bibliotheque/wp-content/uploads/2015/09/image-non-disponible.png';">
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <p><strong>Publié le :</strong> ${article.date}</p>
                    <a href="${article.url}" target="_blank">
                        <button>Lire la suite</button>
                    </a>
                `;
                articlesContainer.appendChild(articleCard);
            });
        })
        .catch(error => console.error("Erreur lors du chargement des articles :", error));
});

document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar.fixed-top');

    let prevScroll = window.pageYOffset;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset;
        // Si on défile vers le bas et que l'on a dépassé la hauteur de la navbar
        if (currentScroll > prevScroll && currentScroll > navbar.offsetHeight) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        prevScroll = currentScroll;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const oneNote2 = document.getElementById("OneNote2");
    if (oneNote2) {
        oneNote2.addEventListener("mouseover", () => {
            oneNote2.src = "images/logos/OneNoteBleu.svg";
        });
        console.log(oneNote2);
        oneNote2.addEventListener("mouseleave",() => {
            oneNote2.src = "images/logos/OneNote.svg";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const oneNote = document.getElementById("OneNote");
    if (oneNote) {
        oneNote.addEventListener("mouseover", () => {
            oneNote.src = "images/logos/OneNoteBleu.svg";
        });
        console.log(oneNote);
        oneNote.addEventListener("mouseleave",() => {
            oneNote.src = "images/logos/OneNote.svg";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const mobileSidebar = document.getElementById("mobileSidebar");
    if (mobileSidebar) {
        const mobileLinks = mobileSidebar.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function() {
                // Recherche du bouton de fermeture avec l'attribut data-bs-dismiss="offcanvas"
                const closeButton = mobileSidebar.querySelector('button[data-bs-dismiss="offcanvas"]');
                if (closeButton) {
                    closeButton.click();
                } else {
                    // En cas de problème, on utilise l'API Bootstrap pour cacher le offcanvas
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(mobileSidebar);
                    if (offcanvasInstance) {
                        offcanvasInstance.hide();
                    }
                }
            });
        });
    }
});