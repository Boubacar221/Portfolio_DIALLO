/*===== AFFICHAGE DU MENU =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("show");
        });
    }
};
showMenu("nav-toggle", "nav-menu");

/*===== FERMER LE MENU EN VERSION MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== LIEN ACTIF SELON LA SECTION VISIBLE =====*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute("id"),
            sectionsClass = document.querySelector(".nav__menu a[href*=" + sectionId + "]");

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add("active-link");
        } else {
            sectionsClass.classList.remove("active-link");
        }
    });
};
window.addEventListener("scroll", scrollActive);

/*===== ANIMATIONS AU SCROLL AVEC SCROLLREVEAL =====*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    delay: 200,
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", { delay: 400 });
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/*===== MODE SOMBRE / CLAIR AVEC ICÔNE DYNAMIQUE =====*/
const themeButton = document.getElementById("theme-button");
const darkThemeClass = "dark-theme"; // Classe CSS appliquée au body ou html
const iconTheme = "bx-sun"; // Icône claire (☀️), affichée quand le mode sombre est actif

// Récupérer les préférences sauvegardées
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Obtenir le thème courant
const getCurrentTheme = () =>
    document.body.classList.contains(darkThemeClass) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// Appliquer les préférences au chargement
if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkThemeClass);
    themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](iconTheme);
}

// Gérer le clic pour basculer entre les modes
themeButton.addEventListener("click", () => {
    document.body.classList.toggle(darkThemeClass);
    themeButton.classList.toggle(iconTheme);

    // Enregistrer les choix
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});
