/* ===== MAIN JS – Informática Empresarial ===== */

(function () {
    'use strict';

    /* ── Theme Switcher ── */
    const THEMES = ['moderno', 'clasico', 'oscuro'];
    const STORAGE_KEY = 'ie-theme';

    function getStoredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return THEMES.includes(stored) ? stored : THEMES[0];
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            const isActive = btn.dataset.theme === theme;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('inactive', !isActive);
        });
    }

    function initThemeSwitcher() {
        applyTheme(getStoredTheme());
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
        });
    }

    /* ── Mobile Menu ── */
    function initMobileMenu() {
        const toggle = document.getElementById('mobile-toggle');
        const nav = document.getElementById('mobile-nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);
            const iconOpen = toggle.querySelector('.icon-open');
            const iconClose = toggle.querySelector('.icon-close');
            if (iconOpen && iconClose) {
                iconOpen.classList.toggle('hidden', isOpen);
                iconClose.classList.toggle('hidden', !isOpen);
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                const iconOpen = toggle.querySelector('.icon-open');
                const iconClose = toggle.querySelector('.icon-close');
                if (iconOpen && iconClose) {
                    iconOpen.classList.remove('hidden');
                    iconClose.classList.add('hidden');
                }
            });
        });
    }

    /* ── Scroll To Top ── */
    function initScrollTop() {
        const btn = document.getElementById('scroll-top');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── Cookie Banner ── */
    function initCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (!banner) return;
        const COOKIE_KEY = 'ie-cookies';

        if (!localStorage.getItem(COOKIE_KEY)) {
            setTimeout(() => banner.classList.add('visible'), 1200);
        }

        banner.querySelectorAll('[data-cookie]').forEach(btn => {
            btn.addEventListener('click', () => {
                localStorage.setItem(COOKIE_KEY, btn.dataset.cookie);
                banner.classList.remove('visible');
            });
        });
    }

    /* ── Scroll Animations with Multiple Variants ── */
    function initScrollAnimations() {
        // Animation variants available from Animate.css
        const animationVariants = [
            'animate__fadeIn',
            'animate__fadeInUp',
            'animate__fadeInDown',
            'animate__fadeInLeft',
            'animate__fadeInRight',
            'animate__fadeInUpBig',
            'animate__fadeInBottomLeft',
            'animate__fadeInTopLeft',
            'animate__fadeInTopRight',
            'animate__fadeInBottomRight',
            'animate__slideInUp',
            'animate__slideInDown',
            'animate__slideInLeft',
            'animate__slideInRight',
            'animate__zoomIn',
            'animate__zoomInDown',
            'animate__zoomInUp',
            'animate__zoomInLeft',
            'animate__zoomInRight',
            'animate__bounceIn',
            'animate__bounceInDown',
            'animate__bounceInUp',
            'animate__bounceInLeft',
            'animate__bounceInRight',
            'animate__flipInX',
            'animate__flipInY',
            'animate__rotateIn',
            'animate__rotateInDownLeft',
            'animate__rotateInDownRight',
            'animate__rotateInUpLeft',
            'animate__rotateInUpRight',
            'animate__lightSpeedInLeft',
            'animate__lightSpeedInRight'
        ];

        // Default animation if none specified
        const defaultAnimation = 'animate__fadeInUp';

        // Helper: get animation from data attribute or cycle through variants
        const getAnimation = (el, index) => {
            // If data-animation attribute is set, use it
            if (el.dataset.animation) {
                return `animate__${el.dataset.animation}`;
            }
            // If data-animate is set but no specific animation, cycle through variants
            if (el.dataset.animate !== undefined) {
                const variant = el.dataset.animate;
                // Check if it's a specific variant name
                if (variant && variant !== 'true' && variant !== '') {
                    return `animate__${variant}`;
                }
                // Default: cycle through animations based on index
                return animationVariants[index % animationVariants.length];
            }
            return defaultAnimation;
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = getAnimation(el, index);

                    // Get animation duration from data attribute (in seconds)
                    const duration = el.dataset.duration || '0.8';

                    // Get delay from data attribute (in seconds)
                    const delay = el.dataset.delay || (index * 0.1).toFixed(1);

                    // Apply animation classes
                    el.classList.add('animate__animated', animation);
                    el.style.setProperty('--animate-duration', `${duration}s`);
                    el.style.setProperty('--animate-delay', `${delay}s`);

                    // If element needs to start hidden
                    if (!el.classList.contains('animate__fadeIn') &&
                        !el.classList.contains('animate__fadeInUp') &&
                        !el.classList.contains('animate__fadeInDown') &&
                        !el.classList.contains('animate__fadeInLeft') &&
                        !el.classList.contains('animate__fadeInRight') &&
                        !el.classList.contains('animate__slideIn') &&
                        !el.classList.contains('animate__zoomIn') &&
                        !el.classList.contains('animate__bounceIn')) {
                        el.style.opacity = '0';
                    }

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with data-animate or data-animation
        document.querySelectorAll('[data-animate], [data-animation]').forEach((el, index) => {
            // Add initial hidden styles
            el.style.opacity = '0';
            // Add animation name for reference
            el.style.setProperty('--animation-name', getAnimation(el, index));
            observer.observe(el);
        });
    }

    /* ── Animation Helper: Add Animation on Hover ── */
    function initHoverAnimations() {
        document.querySelectorAll('[data-hover-animate]').forEach(el => {
            const animation = `animate__${el.dataset.hoverAnimate}`;
            el.addEventListener('mouseenter', () => {
                el.classList.remove('animate__animated', animation);
                void el.offsetWidth; // Trigger reflow
                el.classList.add('animate__animated', animation);
            });
        });
    }

    /* ── Animation Helper: Add Animation on Click ── */
    function initClickAnimations() {
        document.querySelectorAll('[data-click-animate]').forEach(el => {
            const animation = `animate__${el.dataset.clickAnimate}`;
            el.addEventListener('click', () => {
                el.classList.remove('animate__animated', animation);
                void el.offsetWidth; // Trigger reflow
                el.classList.add('animate__animated', animation);
            });
        });
    }

    /* ── Accordion Deep-Linking (URL hash) ── */
    function initAccordionDeepLink() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        const target = document.getElementById(hash);
        if (!target) return;

        // If the target itself is an accordion-item, open it
        const accordionItem = target.classList.contains('accordion-item')
            ? target
            : target.closest('.accordion-item');

        if (accordionItem) {
            const content = accordionItem.querySelector('.accordion-content');
            const icon = accordionItem.querySelector('.accordion-icon');
            if (content) {
                accordionItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(45deg)';
            }
        }

        // Scroll into view with offset for sticky header
        setTimeout(() => {
            const rect = target.getBoundingClientRect();
            const offset = 100; // header height + margin
            window.scrollTo({
                top: rect.top + window.scrollY - offset,
                behavior: 'smooth'
            });
        }, 300);
    }

    /* ── Init ── */
    document.addEventListener('DOMContentLoaded', () => {
        initThemeSwitcher();
        initMobileMenu();
        initScrollTop();
        initCookieBanner();
        initScrollAnimations();
        initHoverAnimations();
        initClickAnimations();
        initAccordionDeepLink();
    });
})();
