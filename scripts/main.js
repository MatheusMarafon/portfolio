// ========================================
// 0. INICIALIZAÇÃO GERAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. DADOS DO CHATBOT Q&A (EXPANDIDO)
    // ========================================
    const chatbotData = {
        'stack': {
            q: 'Qual é o seu stack de desenvolvimento principal?',
            a: 'Meu stack principal é focado em **Python** (para automação e backend) e **JavaScript (ES6+)** para desenvolvimento front-end, utilizando Bootstrap 5 para design responsivo. Detalhes estão na seção Habilidades.',
            next: ['curriculo', 'softskills', 'projetos', 'experiencia']
        },
        'curriculo': {
            q: 'Onde posso encontrar seu currículo?',
            a: 'Você pode baixar meu currículo diretamente na seção "Sobre Mim" ou me enviar uma mensagem na seção "Contato" para solicitar a versão mais atualizada.',
            next: ['softskills', 'projetos', 'stack', 'contato']
        },
        'softskills': {
            q: 'Quais são suas principais soft skills?',
            a: 'Minhas soft skills chave incluem **Resolução de Problemas**, **Comunicação Técnica** e **Aprendizado Rápido**, essenciais para trabalhar em equipes ágeis.',
            next: ['stack', 'projetos', 'experiencia']
        },
        'projetos': {
            q: 'Onde estão os projetos sem interface visual (Python/CLI)?',
            a: 'Projetos sem interface (como Bots de Dados e Scripts de Automação) estão documentados no GitHub. Recomendo verificar o **README.md** de cada repositório, que serve como a Prova de Conceito (PoC) visual.',
            next: ['curriculo', 'stack', 'github']
        },
        'experiencia': {
            q: 'Qual sua experiência profissional?',
            a: 'Tenho 6 meses de experiência prática como estagiário em desenvolvimento web e automação, trabalhando com projetos reais e entregando soluções funcionais.',
            next: ['stack', 'softskills', 'projetos']
        },
        'contato': {
            q: 'Como posso entrar em contato?',
            a: 'Você pode me enviar uma mensagem através da seção Contato aqui no site, ou me encontrar no LinkedIn e GitHub. Respondo rapidamente! 📧',
            next: ['curriculo', 'projetos']
        },
        'github': {
            q: 'Onde está seu GitHub?',
            a: 'Meu GitHub contém todos os projetos open-source e demonstrações de código. Você pode acessá-lo através dos ícones de redes sociais no rodapé! 💻',
            next: ['projetos', 'stack']
        }
    };

    // ========================================
    // 2. SELETORES GLOBAIS DO DOM (Cache)
    // ========================================
    const elements = {
        backToTopBtn: document.getElementById('backToTop'),
        scrollProgress: document.querySelector('.scroll-progress'),
        heroParallax: document.querySelector('.hero-parallax'),
        statsSection: document.querySelector('.stats-section'),
        skillItems: document.querySelectorAll('.skill-item'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        projectsContainer: document.getElementById('projectsContainer'),
        navbarBrand: document.querySelector('.navbar-brand'),
        navbarCollapse: document.getElementById('navbarNav'),
        navbar: document.querySelector('.navbar'),
        themeToggle: document.getElementById('themeToggle'),
        themeIcon: document.getElementById('themeIcon'),
        currentYearEl: document.getElementById('currentYear'),
        loadingScreen: document.querySelector('.loading-screen'),
        contactForm: document.getElementById('contact-form'),
        formStatus: document.getElementById('form-status'),
        projectCards: document.querySelectorAll('.project-card')
    };

    // ========================================
    // 3. LÓGICA DO CHATBOT AVANÇADO
    // ========================================
    const chatbot = {
        toggle: document.getElementById('chatbotToggle'),
        container: document.getElementById('chatbotContainer'),
        messages: document.getElementById('chatMessages'),
        options: document.getElementById('chatOptions'),
        closeBtn: document.getElementById('chatbotClose'),
        messageCount: 0,
        isTyping: false,

        init() {
            if (!this.toggle || !this.container || !this.messages || !this.options) return;
            
            this.toggle.addEventListener('click', () => this.toggleWindow());
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeWindow());
            }
            this.startChat();
            window.startChat = () => this.startChat();
            
            // Notificação de novo visitante após 5 segundos
            setTimeout(() => this.showNotification(), 5000);
        },

        toggleWindow() {
            this.container.classList.toggle('is-open');
            if (this.container.classList.contains('is-open')) {
                this.removeNotification();
            }
        },

        closeWindow() {
            this.container.classList.remove('is-open');
        },

        showNotification() {
            if (!this.container.classList.contains('is-open') && this.toggle) {
                this.toggle.classList.add('pulse');
                const badge = document.createElement('span');
                badge.className = 'notification-badge';
                badge.textContent = '1';
                this.toggle.appendChild(badge);
            }
        },

        removeNotification() {
            if (this.toggle) {
                this.toggle.classList.remove('pulse');
                const badge = this.toggle.querySelector('.notification-badge');
                if (badge) badge.remove();
            }
        },

        startChat() {
            this.messages.innerHTML = '';
            this.messageCount = 0;
            this.renderMessage('bot', '<strong>🤖 Bot:</strong> Olá! Sou o assistente de Matheus. Escolha uma pergunta abaixo para saber mais:');
            this.renderOptions(['stack', 'curriculo', 'softskills', 'projetos']);
        },

        renderMessage(sender, text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
            messageDiv.innerHTML = text;
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(10px)';
            this.messages.appendChild(messageDiv);
            
            // Animação de entrada
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 10);
            
            this.messages.scrollTop = this.messages.scrollHeight;
            this.messageCount++;
        },

        renderOptions(optionsKeys) {
            this.options.innerHTML = '';
            const fragment = document.createDocumentFragment();
            
            optionsKeys.forEach((key, index) => {
                const data = chatbotData[key];
                const button = document.createElement('button');
                button.className = 'btn btn-outline-primary btn-sm';
                button.textContent = data.q;
                button.style.animationDelay = `${index * 0.1}s`;
                button.onclick = () => this.handleChat(key);
                fragment.appendChild(button);
            });
            
            this.options.appendChild(fragment);
        },

        showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            typingDiv.id = 'typing';
            this.messages.appendChild(typingDiv);
            this.messages.scrollTop = this.messages.scrollHeight;
        },

        hideTypingIndicator() {
            const typing = document.getElementById('typing');
            if (typing) typing.remove();
        },

        handleChat(key) {
            const data = chatbotData[key];
            this.renderMessage('user', `<strong>👤 Você:</strong> ${data.q}`);
            
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                this.renderMessage('bot', `<strong>🤖 Bot:</strong> ${data.a}`);
                
                if (data.next?.length > 0) {
                    this.renderOptions(data.next);
                } else {
                    this.options.innerHTML = '<button class="btn btn-secondary btn-sm w-100" onclick="startChat()">🔄 Recomeçar</button>';
                }
            }, 800);
        }
    };

    chatbot.init();

    // ========================================
    // 4. EASTER EGG - KONAMI CODE
    // ========================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Modo Rainbow
        document.body.style.animation = 'rainbow 3s infinite';
        
        // Notificação
        showToast('🎮 Konami Code Ativado! Modo Rainbow ON!', 'success');
        
        // Desativa após 10 segundos
        setTimeout(() => {
            document.body.style.animation = '';
            showToast('Modo Rainbow desativado', 'info');
        }, 10000);
    }

    // ========================================
    // 5. SISTEMA DE NOTIFICAÇÕES TOAST
    // ========================================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }


    // ========================================
    // 8. COPIAR EMAIL/LINKS COM UM CLIQUE
    // ========================================
    document.querySelectorAll('[data-copy]').forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('✅ Copiado para a área de transferência!', 'success');
            }).catch(() => {
                showToast('❌ Erro ao copiar', 'error');
            });
        });
    });

    // ========================================
    // 9. DETECÇÃO DE NAVEGADOR E SISTEMA
    // ========================================
    function detectBrowserAndOS() {
        const userAgent = navigator.userAgent;
        let browser = 'Desconhecido';
        let os = 'Desconhecido';
        
        // Detectar navegador
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        
        // Detectar sistema operacional
        if (userAgent.includes('Windows')) os = 'Windows';
        else if (userAgent.includes('Mac')) os = 'macOS';
        else if (userAgent.includes('Linux')) os = 'Linux';
        else if (userAgent.includes('Android')) os = 'Android';
        else if (userAgent.includes('iOS')) os = 'iOS';
        
        console.log(`%c🌐 Detectado: ${browser} no ${os}`, 'color: #00ff00; font-size: 14px; font-weight: bold;');
    }

    detectBrowserAndOS();

    // ========================================
    // 10. CONFIGURAÇÕES E ANIMAÇÕES
    // ========================================
    
    // Inicializa AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 800, 
            offset: 100,
            easing: 'ease-in-out'
        });
    }

    // Ano atual
    if (elements.currentYearEl) {
        elements.currentYearEl.textContent = new Date().getFullYear();
    }

    // Tela de Carregamento com progresso
    window.addEventListener('load', () => {
        if (elements.loadingScreen) {
            setTimeout(() => {
                elements.loadingScreen.classList.add('hidden');
                showToast('Portfólio carregado com sucesso! 🚀', 'success');
            }, 500);
        }
    });

    // Typed.js
    const typedElement = document.getElementById('typed');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed', {
            strings: [
                'Estagiário em Desenvolvimento Web & Automação',
                'Profissional com 6 Meses de Experiência Prática',
                'Estudante de TI (4º Ano) | Foco em Python/JS',
                'Comprometido com Aprendizado Rápido e Código Limpo',
                'Desenvolvedor Full Stack em Formação'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    // Particles.js
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: '#ffffff', 
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 2, 
                    direction: 'none', 
                    random: false, 
                    straight: false, 
                    out_mode: 'out', 
                    bounce: false 
                }
            },
            interactivity: { 
                detect_on: 'canvas', 
                events: { 
                    onhover: { enable: true, mode: 'repulse' }, 
                    onclick: { enable: true, mode: 'push' }, 
                    resize: true 
                } 
            },
            retina_detect: true
        });
    }

    // ========================================
    // 11. DETECÇÃO DE MODO OFFLINE
    // ========================================
    window.addEventListener('online', () => {
        showToast('✅ Conexão restaurada!', 'success');
    });

    window.addEventListener('offline', () => {
        showToast('⚠️ Você está offline', 'warning');
    });

    // ========================================
    // 12. SCROLL SUAVE E OTIMIZADO
    // ========================================
    if (elements.navbarBrand) {
        elements.navbarBrand.classList.add('hidden');
    }

    let ticking = false;
    let lastScrollTop = 0;
    
    const handleScroll = () => {
        const scrolled = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = pageHeight > 0 ? (scrolled / pageHeight) * 100 : 0;

        // Barra de progresso
        if (elements.scrollProgress) {
            elements.scrollProgress.style.width = `${scrollPercent}%`;
        }
        
        // Botão "Voltar ao Topo"
        if (elements.backToTopBtn) {
            elements.backToTopBtn.classList.toggle('visible', scrolled > 300);
        }

        // Parallax Hero
        if (elements.heroParallax && scrolled < window.innerHeight) {
            elements.heroParallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Navbar com efeito hide/show
        if (elements.navbar) {
            if (scrolled > lastScrollTop && scrolled > 100) {
                elements.navbar.style.transform = 'translateY(-100%)';
            } else {
                elements.navbar.style.transform = 'translateY(0)';
            }
        }

        // Nome na navbar
        if (elements.navbarBrand) {
            elements.navbarBrand.classList.toggle('hidden', scrolled < 100);
        }

        lastScrollTop = scrolled;
        ticking = false;
    };

    const requestScrollTick = () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestScrollTick, { passive: true });

    // ========================================
    // 13. BOTÃO VOLTAR AO TOPO COM SCROLL SUAVE
    // ========================================
    if (elements.backToTopBtn) {
        elements.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========================================
    // 14. DARK MODE AVANÇADO
    // ========================================
    const theme = {
        apply(themeName) {
            document.documentElement.setAttribute('data-theme', themeName);
            if (elements.themeIcon) {
                elements.themeIcon.textContent = themeName === 'dark' ? '☀️' : '🌙';
            }
            localStorage.setItem('theme', themeName);
            
            // Feedback visual
            showToast(`Tema ${themeName === 'dark' ? 'Escuro' : 'Claro'} ativado`, 'info');
        },

        toggle() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            this.apply(currentTheme === 'dark' ? 'light' : 'dark');
        },

        init() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.apply(savedTheme);
            
            if (elements.themeToggle) {
                elements.themeToggle.addEventListener('click', () => this.toggle());
            }

            // Detectar preferência do sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            if (!localStorage.getItem('theme')) {
                this.apply(prefersDark.matches ? 'dark' : 'light');
            }
        }
    };

    theme.init();

    // ========================================
    // 15. ANIMAÇÃO DE CONTADORES MELHORADA
    // ========================================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };

    // ========================================
    // 16. INTERSECTION OBSERVERS
    // ========================================
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

    const observer = new IntersectionObserver(observerCallback, { 
        threshold: 0.5,
        rootMargin: '0px'
    });

    if (elements.statsSection) observer.observe(elements.statsSection);
    elements.skillItems.forEach(skill => observer.observe(skill));

    // ========================================
    // 17. FILTRO DE PROJETOS COM ANIMAÇÃO
    // ========================================
    if (elements.filterButtons.length > 0 && elements.projectsContainer) {
        elements.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                elements.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const projects = Array.from(elements.projectsContainer.children);
                projects.forEach((item, index) => {
                    const categories = item.dataset.category || '';
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                            item.classList.add('hidden');
                        }, 300);
                    }
                });

                if (typeof AOS !== 'undefined') {
                    setTimeout(() => AOS.refresh(), 400);
                }
            });
        });
    }

    // ========================================
    // 18. PREVIEW DE PROJETOS AO HOVER
    // ========================================
    elements.projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // 19. SMOOTH SCROLL PARA ÂNCORAS
    // ========================================
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);

            if (targetElement) {
                const offset = 80; // Offset da navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha navbar mobile
                if (elements.navbarCollapse?.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(elements.navbarCollapse, { 
                        toggle: false 
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // ========================================
    // 20. FORMULÁRIO DE CONTATO AVANÇADO
    // ========================================
    if (elements.contactForm && elements.formStatus) {
        // Validação em tempo real
        const inputs = elements.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.validity.valid) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });

        // Envio do formulário
        elements.contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);
            const action = form.action;

            elements.formStatus.innerHTML = '<p class="text-info">📨 Enviando sua mensagem...</p>';

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    elements.formStatus.innerHTML = '<p class="text-success fw-bold">✅ Mensagem enviada com sucesso! Obrigado pelo contato.</p>';
                    form.reset();
                    inputs.forEach(input => {
                        input.classList.remove('is-valid', 'is-invalid');
                    });
                    showToast('Mensagem enviada com sucesso!', 'success');
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                elements.formStatus.innerHTML = '<p class="text-danger">❌ Ocorreu um erro ao enviar a mensagem. Tente novamente.</p>';
                console.error('Erro no formulário:', error);
                showToast('Erro ao enviar mensagem', 'error');
            }
        });
    }

    // ========================================
    // 21. ATALHOS DE TECLADO
    // ========================================
    document.addEventListener('keydown', (e) => {
        // CTRL/CMD + K = Abrir Chatbot
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            chatbot.toggleWindow();
        }
        
        // ESC = Fechar Chatbot
        if (e.key === 'Escape' && chatbot.container?.classList.contains('is-open')) {
            chatbot.closeWindow();
        }
        
        // CTRL/CMD + D = Toggle Dark Mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            theme.toggle();
        }
    });

    // ========================================
    // 24. SISTEMA DE CONQUISTAS (ACHIEVEMENTS)
    // ========================================
    const achievements = {
        data: JSON.parse(localStorage.getItem('achievements') || '{}'),
        
        list: {
            'first_visit': { name: '👋 Primeira Visita', description: 'Visitou o portfólio pela primeira vez' },
            'explorer': { name: '🔍 Explorador', description: 'Visitou todas as seções' },
            'night_owl': { name: '🦉 Coruja da Noite', description: 'Ativou o modo escuro' },
            'chatter': { name: '💬 Conversador', description: 'Interagiu com o chatbot' },
            'konami_master': { name: '🎮 Mestre Konami', description: 'Descobriu o código secreto' },
            'speed_reader': { name: '⚡ Leitor Rápido', description: 'Passou 5 minutos no site' },
            'form_sender': { name: '📧 Comunicador', description: 'Enviou uma mensagem' },
            'project_viewer': { name: '👁️ Observador', description: 'Visualizou todos os projetos' },
            'theme_switcher': { name: '🎨 Artista', description: 'Alternado entre temas 3 vezes' },
            'keyboard_ninja': { name: '⌨️ Ninja do Teclado', description: 'Usou atalhos de teclado' }
        },
        
        unlock(key) {
            if (!this.data[key]) {
                this.data[key] = { unlocked: true, date: new Date().toISOString() };
                localStorage.setItem('achievements', JSON.stringify(this.data));
                this.showUnlock(key);
            }
        },
        
        showUnlock(key) {
            const achievement = this.list[key];
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-content">
                    <div class="achievement-icon">🏆</div>
                    <div>
                        <div class="achievement-title">Conquista Desbloqueada!</div>
                        <div class="achievement-name">${achievement.name}</div>
                        <div class="achievement-desc">${achievement.description}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 10);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 500);
            }, 4000);
        },
        
        checkProgress() {
            // Primeira visita
            if (!this.data['first_visit']) {
                this.unlock('first_visit');
            }
            
            // 5 minutos no site
            setTimeout(() => this.unlock('speed_reader'), 300000);
        }
    };
    
    achievements.checkProgress();

    // ========================================
    // 25. DETECTOR DE SEÇÕES VISITADAS
    // ========================================
    const sectionTracker = {
        visited: new Set(JSON.parse(localStorage.getItem('visited_sections') || '[]')),
        sections: ['sobre', 'habilidades', 'projetos', 'contato'],
        
        init() {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        if (sectionId && !this.visited.has(sectionId)) {
                            this.visited.add(sectionId);
                            this.save();
                            this.checkExplorer();
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            this.sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) sectionObserver.observe(section);
            });
        },
        
        save() {
            localStorage.setItem('visited_sections', JSON.stringify([...this.visited]));
        },
        
        checkExplorer() {
            if (this.visited.size >= this.sections.length) {
                achievements.unlock('explorer');
            }
        }
    };
    
    sectionTracker.init();

    // ========================================
    // 26. MODO FOCO (MINIMIZA DISTRAÇÕES)
    // ========================================
    const focusMode = {
        active: false,
        
        toggle() {
            this.active = !this.active;
            document.body.classList.toggle('focus-mode', this.active);
            
            if (this.active) {
                showToast('🎯 Modo Foco Ativado - Distrações minimizadas', 'info');
                // Esconde elementos não essenciais
                if (chatbot.container) chatbot.container.style.display = 'none';
                if (elements.backToTopBtn) elements.backToTopBtn.style.display = 'none';
            } else {
                showToast('👁️ Modo Foco Desativado', 'info');
                if (chatbot.container) chatbot.container.style.display = '';
                if (elements.backToTopBtn) elements.backToTopBtn.style.display = '';
            }
        }
    };
    
    // Atalho F para Modo Foco
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f' && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
            e.preventDefault();
            focusMode.toggle();
        }
    });

    // ========================================
    // 27. INDICADOR DE LEITURA (Reading Progress por Seção)
    // ========================================
    const readingProgress = {
        init() {
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                        if (navLink) {
                            navLink.classList.toggle('active-section', entry.isIntersecting);
                        }
                    });
                }, { threshold: 0.3 });
                
                observer.observe(section);
            });
        }
    };
    
    readingProgress.init();

    // ========================================
    // 28. SISTEMA DE FAVORITOS DE PROJETOS
    // ========================================
    const favorites = {
        list: new Set(JSON.parse(localStorage.getItem('favorite_projects') || '[]')),
        
        init() {
            document.querySelectorAll('.project-card').forEach(card => {
                const projectId = card.dataset.projectId;
                if (!projectId) return;
                
                const favoriteBtn = document.createElement('button');
                favoriteBtn.className = 'favorite-btn';
                favoriteBtn.innerHTML = this.list.has(projectId) ? '❤️' : '🤍';
                favoriteBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggle(projectId, favoriteBtn);
                };
                
                card.style.position = 'relative';
                card.appendChild(favoriteBtn);
            });
        },
        
        toggle(projectId, btn) {
            if (this.list.has(projectId)) {
                this.list.delete(projectId);
                btn.innerHTML = '🤍';
                showToast('Removido dos favoritos', 'info');
            } else {
                this.list.add(projectId);
                btn.innerHTML = '❤️';
                showToast('Adicionado aos favoritos!', 'success');
            }
            this.save();
        },
        
        save() {
            localStorage.setItem('favorite_projects', JSON.stringify([...this.list]));
        }
    };
    
    favorites.init();

    // ========================================
    // 29. BUSCA RÁPIDA DE PROJETOS
    // ========================================
    const projectSearch = {
        init() {
            const searchContainer = document.querySelector('.projects-filters');
            if (!searchContainer) return;
            
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'form-control mb-3 project-search';
            searchInput.placeholder = '🔍 Buscar projetos...';
            searchContainer.appendChild(searchInput);
            
            searchInput.addEventListener('input', (e) => this.search(e.target.value));
        },
        
        search(query) {
            const projects = document.querySelectorAll('.project-card');
            query = query.toLowerCase().trim();
            
            let visibleCount = 0;
            projects.forEach(project => {
                const title = project.querySelector('h3, .project-title')?.textContent.toLowerCase() || '';
                const description = project.querySelector('p, .project-description')?.textContent.toLowerCase() || '';
                const tags = project.dataset.tags?.toLowerCase() || '';
                
                const matches = title.includes(query) || description.includes(query) || tags.includes(query);
                
                if (query === '' || matches) {
                    project.style.display = 'block';
                    project.classList.remove('hidden');
                    visibleCount++;
                } else {
                    project.style.display = 'none';
                    project.classList.add('hidden');
                }
            });
            
            if (visibleCount === 0 && query !== '') {
                showToast('Nenhum projeto encontrado', 'warning');
            }
        }
    };
    
    projectSearch.init();

    // ========================================
    // 30. COMPARTILHAR PORTFÓLIO
    // ========================================
    const sharePortfolio = {
        init() {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'btn btn-primary share-btn';
            shareBtn.innerHTML = '📤 Compartilhar';
            shareBtn.onclick = () => this.share();
            
            const heroSection = document.querySelector('.hero, #hero');
            if (heroSection) {
                shareBtn.style.position = 'absolute';
                shareBtn.style.bottom = '20px';
                shareBtn.style.right = '20px';
                shareBtn.style.zIndex = '10';
                heroSection.style.position = 'relative';
                heroSection.appendChild(shareBtn);
            }
        },
        
        async share() {
            const shareData = {
                title: 'Portfólio de Matheus',
                text: 'Confira meu portfólio de desenvolvimento web!',
                url: window.location.href
            };
            
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                    showToast('Compartilhado com sucesso!', 'success');
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        this.fallbackShare();
                    }
                }
            } else {
                this.fallbackShare();
            }
        },
        
        fallbackShare() {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copiado para área de transferência!', 'success');
        }
    };
    
    sharePortfolio.init();

    // ========================================
    // 31. ANIMAÇÃO DE TEXTO BRILHANTE
    // ========================================
    const glowEffect = {
        init() {
            const mainTitle = document.querySelector('h1.hero-title, .main-title');
            if (mainTitle) {
                mainTitle.classList.add('glow-text');
            }
        }
    };
    
    glowEffect.init();

    // ========================================
    // 32. RASTREADOR DE CLIQUES (Analytics Básico)
    // ========================================
    const analytics = {
        clicks: JSON.parse(localStorage.getItem('click_analytics') || '{}'),
        
        init() {
            document.addEventListener('click', (e) => {
                const target = e.target.closest('a, button');
                if (target) {
                    const label = target.textContent.trim() || target.getAttribute('aria-label') || 'unknown';
                    this.track(label);
                }
            });
        },
        
        track(label) {
            this.clicks[label] = (this.clicks[label] || 0) + 1;
            localStorage.setItem('click_analytics', JSON.stringify(this.clicks));
        },
        
        getTopClicks(limit = 5) {
            return Object.entries(this.clicks)
                .sort((a, b) => b[1] - a[1])
                .slice(0, limit);
        }
    };
    
    analytics.init();

    // ========================================
    // 33. MODO APRESENTAÇÃO (Fullscreen)
    // ========================================
    const presentationMode = {
        init() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'F11') {
                    e.preventDefault();
                    this.toggle();
                }
            });
        },
        
        toggle() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                showToast('🖥️ Modo Apresentação Ativado (F11 para sair)', 'info');
            } else {
                document.exitFullscreen();
                showToast('Modo normal restaurado', 'info');
            }
        }
    };
    
    presentationMode.init();


    // ========================================
    // 35. DETECTOR DE INATIVIDADE
    // ========================================
    const inactivityDetector = {
        timeout: null,
        delay: 60000, // 1 minuto
        
        init() {
            this.reset();
            ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
                document.addEventListener(event, () => this.reset(), { passive: true });
            });
        },
        
        reset() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.onInactive(), this.delay);
        },
        
        onInactive() {
            showToast('👋 Ainda está aí? Que tal explorar os projetos?', 'info');
        }
    };
    
    inactivityDetector.init();

    // ========================================
    // 36. ESTATÍSTICAS DO USUÁRIO
    // ========================================
    const userStats = {
        get() {
            return {
                totalVisits: parseInt(localStorage.getItem('portfolio_visits') || '0'),
                achievements: Object.keys(achievements.data).length,
                totalAchievements: Object.keys(achievements.list).length,
                sectionsVisited: sectionTracker.visited.size,
                totalSections: sectionTracker.sections.length,
                favoriteProjects: favorites.list.size,
                themeSwitches: parseInt(localStorage.getItem('theme_switches') || '0'),
                topClicks: analytics.getTopClicks(3)
            };
        },
        
        show() {
            const stats = this.get();
            console.log('%c📊 Suas Estatísticas:', 'color: #00aaff; font-size: 16px; font-weight: bold;');
            console.table(stats);
            
            showToast(`📊 Visitas: ${stats.totalVisits} | Conquistas: ${stats.achievements}/${stats.totalAchievements}`, 'info');
        }
    };
    
    // Comando para ver estatísticas
    window.showStats = () => userStats.show();

    // ========================================
    // 37. TRACKEAR MUDANÇAS DE TEMA
    // ========================================
    const originalThemeToggle = theme.toggle;
    theme.toggle = function() {
        originalThemeToggle.call(this);
        let switches = parseInt(localStorage.getItem('theme_switches') || '0');
        switches++;
        localStorage.setItem('theme_switches', switches);
        
        if (switches === 3) {
            achievements.unlock('theme_switcher');
        }
        
        if (switches === 1) {
            achievements.unlock('night_owl');
        }
    };

    // ========================================
    // 38. TRACKEAR USO DO CHATBOT
    // ========================================
    const originalHandleChat = chatbot.handleChat;
    chatbot.handleChat = function(key) {
        originalHandleChat.call(this, key);
        achievements.unlock('chatter');
    };

    // ========================================
    // 39. TRACKEAR ENVIO DE FORMULÁRIO
    // ========================================
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', () => {
            setTimeout(() => {
                achievements.unlock('form_sender');
            }, 1000);
        });
    }

    // ========================================
    // 40. TRACKEAR KONAMI CODE
    // ========================================
    const originalActivateEasterEgg = window.activateEasterEgg || activateEasterEgg;
    window.activateEasterEgg = activateEasterEgg = function() {
        if (originalActivateEasterEgg) originalActivateEasterEgg();
        achievements.unlock('konami_master');
    };

    // ========================================
    // 41. TRACKEAR USO DE ATALHOS
    // ========================================
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'd')) {
            achievements.unlock('keyboard_ninja');
        }
    });

    // ========================================
    // 42. VISUALIZAÇÃO DE TODOS OS PROJETOS
    // ========================================
    const projectViewer = {
        viewed: new Set(JSON.parse(localStorage.getItem('viewed_projects') || '[]')),
        totalProjects: 0,
        
        init() {
            const projectCards = document.querySelectorAll('.project-card');
            this.totalProjects = projectCards.length;
            
            const projectObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const projectId = entry.target.dataset.projectId;
                        if (projectId) {
                            this.viewed.add(projectId);
                            this.save();
                            this.checkCompletion();
                        }
                    }
                });
            }, { threshold: 0.7 });
            
            projectCards.forEach(card => {
                if (card.dataset.projectId) {
                    projectObserver.observe(card);
                }
            });
        },
        
        save() {
            localStorage.setItem('viewed_projects', JSON.stringify([...this.viewed]));
        },
        
        checkCompletion() {
            if (this.viewed.size >= this.totalProjects && this.totalProjects > 0) {
                achievements.unlock('project_viewer');
            }
        }
    };
    
    projectViewer.init();

    // ========================================
    // 43. MODO DEBUG (Console)
    // ========================================
    window.debugMode = {
        enable() {
            console.log('%c🐛 DEBUG MODE ATIVADO', 'color: red; font-size: 20px; font-weight: bold;');
            console.log('Comandos disponíveis:');
            console.log('- showStats() → Ver estatísticas');
            console.log('- debugMode.achievements() → Ver conquistas');
            console.log('- debugMode.clearData() → Limpar dados');
            console.log('- debugMode.unlockAll() → Desbloquear todas conquistas');
        },
        
        achievements() {
            console.table(achievements.data);
        },
        
        clearData() {
            if (confirm('Isso irá limpar TODOS os dados salvos. Continuar?')) {
                localStorage.clear();
                location.reload();
            }
        },
        
        unlockAll() {
            Object.keys(achievements.list).forEach(key => achievements.unlock(key));
            showToast('🏆 Todas as conquistas desbloqueadas!', 'success');
        }
    };

    // ========================================
    // 44. EASTER EGG: MODO MATRIX
    // ========================================
    let matrixMode = false;
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            matrixMode = !matrixMode;
            document.body.classList.toggle('matrix-mode', matrixMode);
            showToast(matrixMode ? '🟢 Modo Matrix Ativado!' : 'Modo Matrix Desativado', matrixMode ? 'success' : 'info');
        }
    });

    // ========================================
    // 45. PERFORMANCE MONITOR
    // ========================================
    const performanceMonitor = {
        init() {
            if ('performance' in window) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const perfData = performance.getEntriesByType('navigation')[0];
                        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                        
                        console.log(`%c⚡ Tempo de carregamento: ${Math.round(loadTime)}ms`, 'color: #00ff00; font-weight: bold;');
                        
                        if (loadTime < 2000) {
                            showToast('⚡ Carregamento ultra-rápido!', 'success');
                        }
                    }, 0);
                });
            }
        }
    };
    
    performanceMonitor.init();

    // ========================================
    // 46. MODO ALTO CONTRASTE (Acessibilidade)
    // ========================================
    const highContrastMode = {
        active: false,
        
        toggle() {
            this.active = !this.active;
            document.body.classList.toggle('high-contrast', this.active);
            localStorage.setItem('high_contrast', this.active);
            showToast(this.active ? '♿ Modo Alto Contraste Ativado' : 'Modo Alto Contraste Desativado', 'info');
        },
        
        init() {
            const saved = localStorage.getItem('high_contrast') === 'true';
            if (saved) {
                this.active = true;
                document.body.classList.add('high-contrast');
            }
            
            // Atalho CTRL+SHIFT+A
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                    e.preventDefault();
                    this.toggle();
                }
            });
        }
    };
    
    highContrastMode.init();

    // ========================================
    // 47. TAMANHO DE FONTE AJUSTÁVEL
    // ========================================
    const fontSizeController = {
        sizes: ['small', 'normal', 'large', 'xlarge'],
        current: 1,
        
        init() {
            const saved = localStorage.getItem('font_size');
            if (saved) {
                this.current = parseInt(saved);
                this.apply();
            }
            
            // Atalhos CTRL + / CTRL -
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
                    e.preventDefault();
                    this.increase();
                } else if (e.ctrlKey && e.key === '-') {
                    e.preventDefault();
                    this.decrease();
                }
            });
        },
        
        increase() {
            if (this.current < this.sizes.length - 1) {
                this.current++;
                this.apply();
                showToast('🔤 Fonte aumentada', 'info');
            }
        },
        
        decrease() {
            if (this.current > 0) {
                this.current--;
                this.apply();
                showToast('🔤 Fonte diminuída', 'info');
            }
        },
        
        apply() {
            document.body.className = document.body.className.replace(/font-size-\w+/g, '');
            document.body.classList.add(`font-size-${this.sizes[this.current]}`);
            localStorage.setItem('font_size', this.current);
        }
    };
    
    fontSizeController.init();

    // ========================================
    // 48. LEITOR DE TELA (Narração)
    // ========================================
    const screenReader = {
        speaking: false,
        
        speak(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'pt-BR';
                utterance.rate = 1;
                utterance.pitch = 1;
                window.speechSynthesis.speak(utterance);
                this.speaking = true;
            }
        },
        
        stop() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                this.speaking = false;
            }
        },
        
        init() {
            // Narrar títulos ao focar (ALT+S)
            document.addEventListener('keydown', (e) => {
                if (e.altKey && e.key === 's') {
                    e.preventDefault();
                    const focused = document.activeElement;
                    const text = focused.textContent || focused.value || 'Nenhum texto disponível';
                    this.speak(text);
                }
            });
        }
    };
    
    screenReader.init();

    // ========================================
    // 49. SALVAR PROGRESSO DE ROLAGEM
    // ========================================
    const scrollMemory = {
        init() {
            // Salva posição ao sair
            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('scroll_position', window.scrollY);
            });
            
            // Restaura ao voltar
            const savedScroll = sessionStorage.getItem('scroll_position');
            if (savedScroll) {
                setTimeout(() => {
                    window.scrollTo(0, parseInt(savedScroll));
                    sessionStorage.removeItem('scroll_position');
                }, 100);
            }
        }
    };
    
    scrollMemory.init();

    // ===============================================
    // 50. MODO CINEMA (Escurece Tudo Exceto Conteúdo)
    // ===============================================
    const cinemaMode = {
        active: false,
        overlay: null,
        
        init() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'cinema-overlay';
            document.body.appendChild(this.overlay);
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.target.matches('input, textarea')) {
                    e.preventDefault();
                    this.toggle();
                }
            });
        },
        
        toggle() {
            this.active = !this.active;
            this.overlay.classList.toggle('active', this.active);
            document.body.classList.toggle('cinema-active', this.active);
            showToast(this.active ? '🎬 Modo Cinema Ativado (C para desativar)' : 'Modo Cinema Desativado', 'info');
        }
    };
    
    cinemaMode.init();

    // ========================================
    // 51. EXPORTAR DADOS DO USUÁRIO (GDPR)
    // ========================================
    const dataExporter = {
        export() {
            const data = {
                visits: localStorage.getItem('portfolio_visits'),
                theme: localStorage.getItem('theme'),
                achievements: localStorage.getItem('achievements'),
                favorites: localStorage.getItem('favorite_projects'),
                visitedSections: localStorage.getItem('visited_sections'),
                viewedProjects: localStorage.getItem('viewed_projects'),
                clickAnalytics: localStorage.getItem('click_analytics'),
                exportDate: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `portfolio-data-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            showToast('📥 Dados exportados com sucesso!', 'success');
        }
    };
    
    window.exportMyData = () => dataExporter.export();

    // ========================================
    // 52. GRÁFICO DE ATIVIDADE (Visual)
    // ========================================
    const activityChart = {
        show() {
            const visits = parseInt(localStorage.getItem('portfolio_visits') || '0');
            const achievements = Object.keys(achievements.data).length;
            const sections = sectionTracker.visited.size;
            
            console.log('%c📊 Gráfico de Atividade', 'color: #00aaff; font-size: 16px; font-weight: bold;');
            console.log(`${'█'.repeat(visits)} Visitas: ${visits}`);
            console.log(`${'█'.repeat(achievements * 3)} Conquistas: ${achievements}`);
            console.log(`${'█'.repeat(sections * 5)} Seções: ${sections}`);
        }
    };
    
    window.showActivity = () => activityChart.show();

    // ========================================
    // 53. ATALHO PARA SEÇÕES
    // ========================================
    const sectionShortcuts = {
        init() {
            document.addEventListener('keydown', (e) => {
                if (e.altKey && !e.ctrlKey && !e.shiftKey) {
                    const shortcuts = {
                        '1': 'home',
                        '2': 'sobre',
                        '3': 'habilidades',
                        '4': 'projetos',
                        '5': 'contato'
                    };
                    
                    const section = shortcuts[e.key];
                    if (section) {
                        e.preventDefault();
                        const target = document.getElementById(section);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                            showToast(`Navegando para: ${section}`, 'info');
                        }
                    }
                }
            });
        }
    };
    
    sectionShortcuts.init();

    // ========================================
    // 54. SUGESTÕES INTELIGENTES
    // ========================================
    const smartSuggestions = {
        suggestions: [
            { condition: () => !achievements.data.chatter, message: '💬 Que tal conversar com o chatbot? (CTRL+K)', action: () => chatbot.toggleWindow() },
            { condition: () => !localStorage.getItem('theme'), message: '🌙 Experimente o modo escuro! (CTRL+D)', action: () => theme.toggle() },
            { condition: () => sectionTracker.visited.size < 3, message: '🔍 Explore mais seções do portfólio!', action: null },
            { condition: () => !achievements.data.form_sender, message: '📧 Envie uma mensagem de contato!', action: () => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }) }
        ],
        
        init() {
            setTimeout(() => this.show(), 45000); // Após 45 segundos
        },
        
        show() {
            const available = this.suggestions.filter(s => s.condition());
            if (available.length > 0) {
                const suggestion = available[Math.floor(Math.random() * available.length)];
                
                const toast = document.createElement('div');
                toast.className = 'toast-notification toast-info show';
                toast.innerHTML = `
                    ${suggestion.message}
                    ${suggestion.action ? '<button class="btn btn-sm btn-light ms-2">Fazer agora</button>' : ''}
                `;
                document.body.appendChild(toast);
                
                if (suggestion.action) {
                    toast.querySelector('button')?.addEventListener('click', () => {
                        suggestion.action();
                        toast.remove();
                    });
                }
                
                setTimeout(() => toast.remove(), 8000);
            }
        }
    };
    
    smartSuggestions.init();

    // ========================================
    // 55. MODO REDUÇÃO DE MOVIMENTO (Acessibilidade)
    // ========================================
    const reducedMotion = {
        init() {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            if (prefersReduced.matches) {
                document.body.classList.add('reduced-motion');
                console.log('♿ Modo de movimento reduzido detectado');
            }
            
            prefersReduced.addEventListener('change', (e) => {
                document.body.classList.toggle('reduced-motion', e.matches);
            });
        }
    };
    
    reducedMotion.init();



    // ========================================
    // 56. DETECTOR DE VELOCIDADE DE INTERNET
    // ========================================
    const connectionMonitor = {
        init() {
            if ('connection' in navigator) {
                const connection = navigator.connection;
                const type = connection.effectiveType;
                
                console.log(`🌐 Conexão detectada: ${type}`);
                
                if (type === 'slow-2g' || type === '2g') {
                    showToast('📶 Conexão lenta detectada. Algumas animações foram reduzidas.', 'warning');
                    document.body.classList.add('slow-connection');
                }
                
                connection.addEventListener('change', () => {
                    console.log(`🌐 Conexão mudou para: ${connection.effectiveType}`);
                });
            }
        }
    };
    
    connectionMonitor.init();


    // ========================================
    // 58. SCREENSHOT DA PÁGINA
    // ========================================
    const screenshotTool = {
        async capture() {
            showToast('📸 Esta funcionalidade requer bibliotecas externas como html2canvas', 'info');
            console.log('💡 Dica: Adicione html2canvas ao projeto para capturar screenshots');
        }
    };
    
    window.takeScreenshot = () => screenshotTool.capture();


    // ========================================
    // 60. PAINEL DE CONTROLE FLUTUANTE
    // ========================================
    const controlPanel = {
        init() {
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                    e.preventDefault();
                    this.show();
                }
            });
        },
        
        show() {
            const panel = document.createElement('div');
            panel.className = 'control-panel';
            panel.innerHTML = `
                <div class="control-panel-content">
                    <h3>⚙️ Painel de Controle</h3>
                    <button onclick="theme.toggle()" class="btn btn-sm btn-primary">🌙 Alternar Tema</button>
                    <button onclick="focusMode.toggle()" class="btn btn-sm btn-secondary">🎯 Modo Foco</button>
                    <button onclick="highContrastMode.toggle()" class="btn btn-sm btn-info">♿ Alto Contraste</button>
                    <button onclick="cinemaMode.toggle()" class="btn btn-sm btn-warning">🎬 Modo Cinema</button>
                    <button onclick="showStats()" class="btn btn-sm btn-success">📊 Estatísticas</button>
                    <button onclick="exportMyData()" class="btn btn-sm btn-dark">📥 Exportar Dados</button>
                    <button onclick="this.parentElement.parentElement.remove()" class="btn btn-sm btn-danger">❌ Fechar</button>
                </div>
            `;
            document.body.appendChild(panel);
            
            setTimeout(() => panel.classList.add('show'), 10);
        }
    };
    
    controlPanel.init();

    // ================================
    // LÓGICA DO CURSOR PERSONALIZADO
    // ================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');

    // Atualiza a posição do cursor a cada movimento do mouse
    window.addEventListener('mousemove', e => {
        if (cursorDot && cursorCircle) {
            cursorDot.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';

            cursorCircle.style.top = e.clientY + 'px';
            cursorCircle.style.left = e.clientX +'px';

        }
    });

    // Adiciona o efeito de 'hover' a todos os elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, .filter-btn');

    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorDot && cursorCircle) {
                cursorDot.classList.add('hover');
                cursorCircle.classList.add('hover');
            }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorDot && cursorCircle) {
            cursorDot.classList.remove('hover');
            cursorCircle.classList.remove('hover');
        }
        })
    });


    // ========================================
    // HELP COMMAND - LISTA TODOS OS COMANDOS
    // ========================================
    window.help = function() {
        console.log('%c📚 LISTA COMPLETA DE COMANDOS E ATALHOS', 'color: #00ff00; font-size: 18px; font-weight: bold;');
        console.log('\n%c⌨️  ATALHOS DE TECLADO:', 'color: #00aaff; font-size: 14px; font-weight: bold;');
        console.log('CTRL/CMD + K → Abrir/Fechar Chatbot');
        console.log('CTRL/CMD + D → Alternar Dark Mode');
        console.log('CTRL/CMD + (+/-) → Aumentar/Diminuir Fonte');
        console.log('CTRL + SHIFT + A → Alto Contraste');
        console.log('CTRL + SHIFT + M → Modo Matrix');
        console.log('CTRL + SHIFT + P → Painel de Controle');
        console.log('F → Modo Foco');
        console.log('C → Modo Cinema');
        console.log('F11 → Modo Apresentação');
        console.log('ESC → Fechar Chatbot');
        console.log('ALT + (1-5) → Navegar para seções');
        console.log('ALT + S → Narrar texto focado');
        console.log('↑↑↓↓←→←→BA → Konami Code');
        
        console.log('\n%c💻 COMANDOS DO CONSOLE:', 'color: #ffaa00; font-size: 14px; font-weight: bold;');
        console.log('help() → Esta lista de ajuda');
        console.log('showStats() → Ver estatísticas');
        console.log('showActivity() → Gráfico de atividade');
        console.log('exportMyData() → Exportar seus dados');
        console.log('scheduleMeteing() → Agendar reunião');
        console.log('toggleLanguage() → Alternar idioma');
        console.log('toggleMusic() → Música de fundo');
        console.log('takeScreenshot() → Capturar tela');
        console.log('debugMode.enable() → Modo debug');
        console.log('debugMode.unlockAll() → Desbloquear tudo');
        console.log('debugMode.clearData() → Limpar dados');
    };

    // ========================================
    // FIM DA INICIALIZAÇÃO - 61 FUNCIONALIDADES!
    // ========================================
    console.log('%c✅ PORTFÓLIO ULTRA AVANÇADO CARREGADO!', 'color: #00ff00; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,255,0,0.5);');
    console.log('%c🎉 62 FUNCIONALIDADES ATIVAS!', 'color: #ff00ff; font-size: 16px; font-weight: bold;');
    console.log('%c💡 Digite help() para ver todos os comandos', 'color: #ffaa00; font-size: 14px;');
    console.log('%c🏆 Digite showStats() para ver suas estatísticas', 'color: #00aaff; font-size: 14px;');
    console.log('%c⚡ CTRL+SHIFT+P para Painel de Controle', 'color: #ff6600; font-size: 14px;');
});

