// Menu Mobile Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');
const navItems = navLinks.querySelectorAll('a');

function toggleMenu() {
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');

    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Previne scroll ao abrir menu
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'initial';
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Efeito de background no header ao scrollar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        header.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(5, 5, 5, 0.85)';
    }
});

// --- NOVAS ANIMAÇÕES AQUI --- //

// 1. Scroll Reveal com Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Anima apenas uma vez
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// 2. Typing Effect (Efeito de Máquina de Escrever)
const textElement = document.getElementById('typing-text');
const words = ["Desenvolvedor Back-End       ", "Software Engineer       ", "Solucionador de Problemas       "];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pausa no final da palavra (mais longa e profissional)
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 600; // Pausa antes de digitar nova palavra
    }

    setTimeout(typeEffect, typeSpeed);
}

// Inicia o efeito apenas se o elemento existir na página
if (textElement) {
    setTimeout(typeEffect, 1000);
}

// 3. Copiar E-mail para a Área de Transferência
const emailBtn = document.getElementById('email-btn');
const emailFooter = document.getElementById('email-footer');
const userEmail = 'jjooaaoo46@gmail.com';

function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard.writeText(userEmail).then(() => {
        alert(`E-mail copiado com sucesso: ${userEmail}`);
    }).catch(err => {
        console.error('Erro ao copiar e-mail', err);
    });
}

if (emailBtn) emailBtn.addEventListener('click', copyEmail);
if (emailFooter) emailFooter.addEventListener('click', copyEmail);
