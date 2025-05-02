// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
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

const observer = new IntersectionObserver(function (entries, observer) {
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
  card.addEventListener("click", function () {
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
    closeBtn.addEventListener("click", function () {
      modal.remove();
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.style.backgroundColor = "var(--netflix-black)";
  } else {
    nav.style.backgroundColor = "rgba(20, 20, 20, 0.95)";
  }
});

// Scroll to top button functionality
const scrollTopBtn = document.getElementById("scroll-top-btn");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
