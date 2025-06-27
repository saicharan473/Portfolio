// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Typing effect for hero section
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init TypeWriter
document.addEventListener("DOMContentLoaded", init);

function init() {
    const txtElement = document.querySelector(".tagline");
    const words = [
        "Full-Stack Developer",
        "Frontend Developer",
        "Backend Developer",
    ];
    new TypeWriter(txtElement, words);
}

// Skill bars animation
const skillCategories = document.querySelectorAll(".skill-category");

const observerOptions = {
    threshold: 0.5,
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillCategories.forEach((category) => {
    observer.observe(category);
});

// Project card modals
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    card.addEventListener("click", function() {
        const modalContent = this.innerHTML;
        const modal = document.createElement("div");
        modal.className = "project-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                ${modalContent}
            </div>
        `;
        document.body.appendChild(modal);

        const closeBtn = modal.querySelector(".close-modal");
        closeBtn.addEventListener("click", function() {
            modal.remove();
        });

        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Check for saved theme preference or use default dark theme
function getThemePreference() {
    return localStorage.getItem("theme") || "dark";
}

// Apply the current theme
function applyTheme(theme) {
    if (theme === "light") {
        htmlElement.setAttribute("data-theme", "light");
        themeToggle.querySelector(".fa-sun").style.display = "inline-block";
        themeToggle.querySelector(".fa-moon").style.display = "none";
    } else {
        htmlElement.removeAttribute("data-theme");
        themeToggle.querySelector(".fa-sun").style.display = "none";
        themeToggle.querySelector(".fa-moon").style.display = "inline-block";
    }
}

// Initialize theme
const currentTheme = getThemePreference();
applyTheme(currentTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener("click", () => {
    const newTheme =
        htmlElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
});

// Navbar background change on scroll
window.addEventListener("scroll", function() {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.style.backgroundColor =
            htmlElement.getAttribute("data-theme") === "light" ?
            "var(--background-secondary)" :
            "var(--netflix-black)";
    } else {
        nav.style.backgroundColor =
            htmlElement.getAttribute("data-theme") === "light" ?
            "rgba(245, 245, 245, 0.95)" :
            "rgba(20, 20, 20, 0.95)";
    }
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById("scroll-top-btn");

window.addEventListener("scroll", function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});