// Menu Mobile Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
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

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pausa no final da palavra
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pausa antes de digitar nova palavra
    }

    setTimeout(typeEffect, typeSpeed);
}

// Inicia o efeito apenas se o elemento existir na página
if (textElement) {
    setTimeout(typeEffect, 1000);
}

// 3. Efeito 3D Tilt nos Cards
const tiltCards = document.querySelectorAll('.skill-card, .project-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posição X do mouse dentro do card
        const y = e.clientY - rect.top;  // Posição Y do mouse dentro do card

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calcular a inclinação baseado na distância do centro
        const tiltX = ((y - centerY) / centerY) * -10; // Inclinação Max 10 graus
        const tiltY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Resetar quando o mouse sai do card
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease';
    });

    // Remover a transição temporariamente ao entrar para reagir rápido ao mousemove
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// 4. Copiar E-mail para a Área de Transferência
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
