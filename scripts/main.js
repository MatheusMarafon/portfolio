// ========================================
// 0. INICIALIZAÇÃO GERAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. DADOS DO CHATBOT Q&A
    // ========================================
    const chatbotData = {
        'stack': {
            q: 'Qual é o seu stack de desenvolvimento principal?',
            a: 'Meu stack principal é focado em **Python** (para automação e backend) e **JavaScript (ES6+)** para desenvolvimento front-end, utilizando Bootstrap 5 para design responsivo. Detalhes estão na seção Habilidades.',
            next: ['curriculo', 'softskills', 'projetos']
        },
        'curriculo': {
            q: 'Onde posso encontrar seu currículo?',
            a: 'Você pode baixar meu currículo diretamente na seção "Sobre Mim" ou me enviar uma mensagem na seção "Contato" para solicitar a versão mais atualizada.',
            next: ['softskills', 'projetos', 'stack']
        },
        'softskills': {
            q: 'Quais são suas principais soft skills?',
            a: 'Minhas soft skills chave incluem **Resolução de Problemas**, **Comunicação Técnica** e **Aprendizado Rápido**, essenciais para trabalhar em equipes ágeis.',
            next: ['stack', 'projetos']
        },
        'projetos': {
            q: 'Onde estão os projetos sem interface visual (Python/CLI)?',
            a: 'Projetos sem interface (como Bots de Dados e Scripts de Automação) estão documentados no GitHub. Recomendo verificar o **README.md** de cada repositório, que serve como a Prova de Conceito (PoC) visual.',
            next: ['curriculo', 'stack']
        }
    };

    // ========================================
    // 2. SELETORES GLOBAIS DO DOM
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');
    const scrollProgress = document.querySelector('.scroll-progress');
    const heroParallax = document.querySelector('.hero-parallax');
    const statsSection = document.querySelector('.stats-section');
    const skillItems = document.querySelectorAll('.skill-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsContainer = document.getElementById('projectsContainer');

    // ========================================
    // 3. LÓGICA DO CHATBOT (JANELA FLUTUANTE)
    // ========================================
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');

    if (chatbotToggle && chatbotContainer && chatMessages && chatOptions) {
        const startChat = () => {
            chatMessages.innerHTML = '';
            renderMessage('bot', '<strong>Bot:</strong> Olá! Sou o assistente de Matheus. Escolha uma pergunta abaixo para saber mais:');
            renderOptions(['stack', 'curriculo', 'softskills', 'projetos']);
        };

        const renderMessage = (sender, text) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
            messageDiv.innerHTML = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const renderOptions = (optionsKeys) => {
            chatOptions.innerHTML = '';
            optionsKeys.forEach(key => {
                const data = chatbotData[key];
                const button = document.createElement('button');
                button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
                button.textContent = data.q;
                button.onclick = () => handleChat(key);
                chatOptions.appendChild(button);
            });
        };

        const handleChat = (key) => {
            const data = chatbotData[key];
            renderMessage('user', `<strong>Você:</strong> ${data.q}`);
            setTimeout(() => {
                renderMessage('bot', `<strong>Bot:</strong> ${data.a}`);
                if (data.next && data.next.length > 0) {
                    renderOptions(data.next);
                } else {
                    chatOptions.innerHTML = `<button class="btn btn-secondary btn-sm w-100" onclick="startChat()">Recomeçar</button>`;
                }
            }, 500);
        };
        
        window.startChat = startChat; // Expor ao escopo global para o `onclick` do botão recomeçar
        chatbotToggle.addEventListener('click', () => chatbotContainer.classList.toggle('is-open'));
        startChat();
    }
    
    // ========================================
    // 4. CONFIGURAÇÕES E ANIMAÇÕES
    // ========================================
    
    // Inicializa AOS (Animate on Scroll)
    AOS.init({ once: true, duration: 800, offset: 100 });

    // Ano atual no rodapé
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Tela de Carregamento
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => loadingScreen.classList.add('hidden'), 500);
        }
    });

    // Efeito de Digitação (Typed.js)
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            strings: [
                'Estagiário em Desenvolvimento Web & Automação',
                'Profissional com 6 Meses de Experiência Prática',
                'Estudante de TI (4º Ano) | Foco em Python/JS',
                'Comprometido com Aprendizado Rápido e Código Limpo'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }

    // Partículas (Particles.js)
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true } },
            retina_detect: true
        });
    }
    
   // ========================================
// 5. MANIPULADORES DE EVENTOS
// ========================================

// --- LÓGICA PARA EXIBIR NOME NA NAVBAR APÓS ROLAGEM ---
const navbarBrand = document.querySelector('.navbar-brand');
if (navbarBrand) {
    // Esconde o nome no cabeçalho ao carregar a página
    navbarBrand.classList.add('hidden');
}

// --- MANIPULADOR DE SCROLL CENTRALIZADO ---
const handleScroll = () => {
    const scrolled = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = pageHeight > 0 ? (scrolled / pageHeight) * 100 : 0;

    // Barra de progresso
    if (scrollProgress) scrollProgress.style.width = `${scrollPercent}%`;
    
    // Botão "Voltar ao Topo"
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', scrolled > 300);

    // Efeito Parallax na seção Hero
    if (heroParallax && scrolled < window.innerHeight) {
        heroParallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Exibe ou esconde o nome no cabeçalho 
    if (navbarBrand) {
        navbarBrand.classList.toggle('hidden', scrolled < 100);
    }
};
window.addEventListener('scroll', handleScroll, { passive: true });

// --- AÇÕES DE CLIQUE ---

// Botão "Voltar ao Topo"
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- DARK MODE ---
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
};

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// Aplicar tema salvo ao carregar
applyTheme(localStorage.getItem('theme') || 'light');

// --- OBSERVERS DE INTERSECÇÃO (Animações ao rolar) ---
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            } else if (entry.target.classList.contains('skill-item')) {
                entry.target.classList.add('animated');
            }
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);
skillItems.forEach(skill => observer.observe(skill));

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
};

// --- FILTRO DE PROJETOS ---
if (filterButtons.length > 0 && projectsContainer) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            Array.from(projectsContainer.children).forEach(item => {
                const categories = item.dataset.category || '';
                const shouldShow = (filter === 'all' || categories.includes(filter));
                item.style.display = shouldShow ? 'block' : 'none';
                item.classList.toggle('hidden', !shouldShow);
            });
            AOS.refresh();
        });
    });
}

// --- SMOOTH SCROLL E FECHAR NAVBAR MOBILE ---
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });

            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        }
    });
})
});