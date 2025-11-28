document.addEventListener("DOMContentLoaded", function () {

    // 1. Current Year
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Auto-Close
    const mobileSidebar = document.getElementById("mobileSidebar");
    if (mobileSidebar) {
        const mobileLinks = mobileSidebar.querySelectorAll(".nav-link");
        const bsOffcanvas = new bootstrap.Offcanvas(mobileSidebar);

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                bsOffcanvas.hide();
            });
        });
    }

    // 3. Scroll Spy (Active Link Highlighting)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100; // Offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNavLink);

    // 4. Contact Form Handling (Simple Alert for now)
    const contactForm = document.getElementById("contactForm");
    const formResponse = document.getElementById("formResponse");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            // Here you would typically send the data via AJAX
            // For now, just show a success message
            formResponse.innerHTML = '<div class="alert alert-success">Message envoyé avec succès ! (Simulation)</div>';
            contactForm.reset();
            setTimeout(() => {
                formResponse.innerHTML = '';
            }, 5000);
        });
    }
});