/**
 * VUGA Holding Website - Main JavaScript
 * Handles navigation, animations, language switching, and form handling
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    var header = document.querySelector('.header');
    var nav = document.querySelector('.nav');
    var menuToggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelectorAll('.nav-link');
    var langBtns = document.querySelectorAll('.lang-btn');
    var contactForm = document.querySelector('#contactForm');

    // ============================================
    // Mobile Navigation
    // ============================================
    function initMobileNav() {
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    function initHeaderScroll() {
        if (!header) return;

        window.addEventListener('scroll', function() {
            var currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            }
        });
    }

    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');

        for (var i = 0; i < anchors.length; i++) {
            anchors[i].addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                var target = document.querySelector(href);

                if (target) {
                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // ============================================
    // Language Switcher
    // ============================================
    var translations = {
        en: {
            'hero.title': 'We empower innovation across media, tech, and impact.',
            'hero.description': 'VUGA Holding is a diversified portfolio company driving transformation in media, technology, wellness, aviation, and philanthropy.',
            'hero.explore': 'Explore Our Companies',
            'hero.contact': 'Contact Us',
            'brands.title': 'Our Brands',
            'brands.subtitle': 'A portfolio of companies shaping the future of media, technology, and social impact.',
            'global.title': 'Global Presence',
            'global.description': 'From our headquarters in Miami, Florida, VUGA Holding operates a network of companies across multiple continents. Our diverse portfolio serves markets in North America, Central Asia, the United Kingdom, and Europe.',
            'why.title': 'Why Partner With VUGA',
            'why.subtitle': 'Industry-leading expertise across multiple sectors with proven results.',
            'news.title': 'Latest Updates',
            'news.subtitle': 'News and announcements from across our portfolio companies.'
        },
        ru: {
            'hero.title': 'Мы продвигаем инновации в медиа, технологиях и социальном воздействии.',
            'hero.description': 'VUGA Holding — диверсифицированная портфельная компания, стимулирующая трансформацию в медиа, технологиях, здоровье, авиации и филантропии.',
            'hero.explore': 'Наши компании',
            'hero.contact': 'Связаться с нами',
            'brands.title': 'Наши бренды',
            'brands.subtitle': 'Портфель компаний, формирующих будущее медиа, технологий и социального воздействия.',
            'global.title': 'Глобальное присутствие',
            'global.description': 'Из нашей штаб-квартиры в Майами, Флорида, VUGA Holding управляет сетью компаний на нескольких континентах. Наш разнообразный портфель обслуживает рынки Северной Америки, Центральной Азии, Великобритании и Европы.',
            'why.title': 'Почему VUGA',
            'why.subtitle': 'Лидирующий опыт в нескольких секторах с проверенными результатами.',
            'news.title': 'Последние новости',
            'news.subtitle': 'Новости и объявления от наших портфельных компаний.'
        },
        uz: {
            'hero.title': 'Biz media, texnologiya va ijtimoiy ta\'sir sohasida innovatsiyalarni kuchaytirmiz.',
            'hero.description': 'VUGA Holding — media, texnologiya, salomatlik, aviatsiya va xayriya sohasida o\'zgarishlarni amalga oshiruvchi diversifikatsiyalangan portfolio kompaniyasi.',
            'hero.explore': 'Bizning kompaniyalarimiz',
            'hero.contact': 'Biz bilan bog\'laning',
            'brands.title': 'Bizning brendlarimiz',
            'brands.subtitle': 'Media, texnologiya va ijtimoiy ta\'sir kelajagini shakllantirayotgan kompaniyalar portfeli.',
            'global.title': 'Global mavjudlik',
            'global.description': 'Mayami, Floriyadagi bosh qarorgohimizdan VUGA Holding bir necha qit\'alarda kompaniyalar tarmog\'ini boshqaradi. Bizning xilma-xil portfelimiz Shimoliy Amerika, Markaziy Osiyo, Buyuk Britaniya va Yevropa bozorlariga xizmat ko\'rsatadi.',
            'why.title': 'Nima uchun VUGA',
            'why.subtitle': 'Bir necha sohalarda etakchi tajriba va isbotlangan natijalar.',
            'news.title': 'So\'nggi yangiliklar',
            'news.subtitle': 'Portfolio kompaniyalarimizdagi yangiliklar va e\'lonlar.'
        }
    };

    function initLanguageSwitcher() {
        for (var i = 0; i < langBtns.length; i++) {
            langBtns[i].addEventListener('click', function() {
                var lang = this.getAttribute('data-lang');

                // Update active state
                for (var j = 0; j < langBtns.length; j++) {
                    langBtns[j].classList.remove('active');
                }
                this.classList.add('active');

                // Apply translations
                applyTranslations(lang);

                // Store preference
                try {
                    localStorage.setItem('vuga-lang', lang);
                } catch (e) {}
            });
        }

        // Check for saved preference
        try {
            var savedLang = localStorage.getItem('vuga-lang');
            if (savedLang && translations[savedLang]) {
                var btn = document.querySelector('[data-lang="' + savedLang + '"]');
                if (btn) {
                    btn.click();
                }
            }
        } catch (e) {}
    }

    function applyTranslations(lang) {
        if (!translations[lang]) return;

        var elements = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < elements.length; i++) {
            var key = elements[i].getAttribute('data-i18n');
            if (translations[lang][key]) {
                elements[i].textContent = translations[lang][key];
            }
        }
    }

    // ============================================
    // Contact Form Handling
    // ============================================
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            var formData = new FormData(this);
            var formFields = {};
            formData.forEach(function(value, key) {
                formFields[key] = value;
            });

            // Combine company, subject, and message into message field
            var combinedMessage = '';
            if (formFields.subject) {
                combinedMessage += 'Subject: ' + formFields.subject + '\n\n';
            }
            if (formFields.company) {
                combinedMessage += 'Company: ' + formFields.company + '\n\n';
            }
            combinedMessage += 'Message: ' + (formFields.message || '');

            var data = {
                type: 'vugaholding',
                name: formFields.name,
                email: formFields.email,
                message: combinedMessage
            };

            // Basic validation
            if (!formFields.name || !formFields.email || !formFields.subject || !formFields.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(formFields.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show sending message
            showFormMessage('Sending message...', 'info');

            // Submit to Resend API
            fetch('https://contact-form-api.contact-195.workers.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(result) {
                showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                console.error('Form submission error:', error);
            });
        });
    }

    function isValidEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFormMessage(message, type) {
        // Remove existing message
        var existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.parentNode.removeChild(existingMsg);

        // Create new message
        var msgEl = document.createElement('div');
        msgEl.className = 'form-message form-message-' + type;
        msgEl.textContent = message;

        var borderColor = type === 'error' ? '#ff4444' : type === 'success' ? '#00cc66' : '#ffcc00';
        var bgColor = type === 'error' ? 'rgba(255, 68, 68, 0.1)' : type === 'success' ? 'rgba(0, 204, 102, 0.1)' : 'rgba(255, 204, 0, 0.1)';

        msgEl.style.padding = '1rem';
        msgEl.style.marginTop = '1rem';
        msgEl.style.fontSize = '0.875rem';
        msgEl.style.border = '1px solid ' + borderColor;
        msgEl.style.backgroundColor = bgColor;
        msgEl.style.color = borderColor;

        contactForm.appendChild(msgEl);

        // Auto-remove success messages
        if (type === 'success') {
            setTimeout(function() {
                if (msgEl.parentNode) {
                    msgEl.parentNode.removeChild(msgEl);
                }
            }, 5000);
        }
    }

    // ============================================
    // Scroll Animations
    // ============================================
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll('.brand-card, .news-card, .why-item, .leader-card, .timeline-item, .brand-cell');

        if (!animatedElements.length) return;

        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: just show all elements
            for (var i = 0; i < animatedElements.length; i++) {
                animatedElements[i].style.opacity = '1';
            }
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.style.opacity = '1';
                    entries[i].target.style.transform = 'translateY(0)';
                    observer.unobserve(entries[i].target);
                }
            }
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        for (var i = 0; i < animatedElements.length; i++) {
            animatedElements[i].style.opacity = '0';
            animatedElements[i].style.transform = 'translateY(20px)';
            animatedElements[i].style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(animatedElements[i]);
        }
    }

    // ============================================
    // Stats Counter Animation
    // ============================================
    function initStatsCounter() {
        var stats = document.querySelectorAll('.stat-item h3, .why-number');

        if (!stats.length) return;

        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    animateValue(entries[i].target);
                    observer.unobserve(entries[i].target);
                }
            }
        }, { threshold: 0.5 });

        for (var i = 0; i < stats.length; i++) {
            observer.observe(stats[i]);
        }
    }

    function animateValue(element) {
        var text = element.textContent;
        var match = text.match(/^(\d+)(\+?)(M?\+?|K?\+?|B?\+?)$/);

        if (!match) return;

        var target = parseInt(match[1]);
        var suffix = match[2] + match[3];
        var duration = 2000;
        var start = Date.now();

        function update() {
            var elapsed = Date.now() - start;
            var progress = Math.min(elapsed / duration, 1);
            var easeProgress = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(easeProgress * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    // ============================================
    // Active Navigation Link
    // ============================================
    function setActiveNavLink() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';

        for (var i = 0; i < navLinks.length; i++) {
            var href = navLinks[i].getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                navLinks[i].classList.add('active');
            } else {
                navLinks[i].classList.remove('active');
            }
        }
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        initMobileNav();
        initHeaderScroll();
        initSmoothScroll();
        initLanguageSwitcher();
        initContactForm();
        initScrollAnimations();
        initStatsCounter();
        setActiveNavLink();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
