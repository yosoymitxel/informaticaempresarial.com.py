/* ===== Animation Helpers - Easy Animation Utilities ===== */
/* This module provides easy-to-use functions for adding animations */

/**
 * Available animation types (compatible with Animate.css):
 * 
 * Fade Animations:
 * - fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
 * - fadeInUpBig, fadeInBottomLeft, fadeInTopLeft, fadeInTopRight, fadeInBottomRight
 * 
 * Slide Animations:
 * - slideInUp, slideInDown, slideInLeft, slideInRight
 * 
 * Zoom Animations:
 * - zoomIn, zoomInDown, zoomInUp, zoomInLeft, zoomInRight
 * 
 * Bounce Animations:
 * - bounceIn, bounceInDown, bounceInUp, bounceInLeft, bounceInRight
 * 
 * Flip Animations:
 * - flipInX, flipInY
 * 
 * Rotate Animations:
 * - rotateIn, rotateInDownLeft, rotateInDownRight, rotateInUpLeft, rotateInUpRight
 * 
 * Light Speed Animations:
 * - lightSpeedInLeft, lightSpeedInRight
 */

/**
 * Apply animation to an element
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationName - Name of the animation (without animate__ prefix)
 * @param {number} duration - Duration in seconds
 * @param {number} delay - Delay in seconds
 */
function animateElement(element, animationName, duration = 0.8, delay = 0) {
    element.classList.add('animate__animated', `animate__${animationName}`);
    element.style.setProperty('--animate-duration', `${duration}s`);
    element.style.setProperty('--animate-delay', `${delay}s`);
    element.style.opacity = '1';
}

/**
 * Apply staggered animations to multiple elements
 * @param {string} selector - CSS selector for elements
 * @param {string} animationName - Name of the animation
 * @param {number} staggerDelay - Delay between each element (in seconds)
 */
function animateStaggered(selector, animationName, staggerDelay = 0.1) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        animateElement(el, animationName, 0.8, index * staggerDelay);
    });
}

/**
 * Apply animation on scroll (when element enters viewport)
 * @param {string} selector - CSS selector for elements
 * @param {string} animationName - Name of the animation
 */
function animateOnScroll(selector, animationName = 'fadeInUp') {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                animateElement(entry.target, animationName, 0.8, index * 0.1);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

/**
 * Add hover animation to element
 * @param {string} selector - CSS selector for elements
 * @param {string} animationName - Name of the animation on hover
 */
function animateOnHover(selector, animationName) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.remove('animate__animated', `animate__${animationName}`);
            void el.offsetWidth;
            el.classList.add('animate__animated', `animate__${animationName}`);
        });
    });
}

/**
 * Add click animation to element
 * @param {string} selector - CSS selector for elements
 * @param {string} animationName - Name of the animation on click
 */
function animateOnClick(selector, animationName) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.addEventListener('click', () => {
            el.classList.remove('animate__animated', `animate__${animationName}`);
            void el.offsetWidth;
            el.classList.add('animate__animated', `animate__${animationName}`);
        });
    });
}

/**
 * Example usage - Add to your main.js or page-specific JS:
 * 
 * // Animate single element
 * const hero = document.querySelector('.hero-title');
 * animateElement(hero, 'fadeInUp', 1, 0);
 * 
 * // Animate multiple elements with stagger
 * animateStaggered('.features-grid > .card', 'fadeInUp', 0.15);
 * 
 * // Animate on scroll
 * animateOnScroll('.service-card', 'zoomIn');
 * 
 * // Animate on hover
 * animateOnHover('.card', 'pulse');
 * 
 * // Animate on click
 * animateOnClick('.btn', 'shake');
 */

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateElement,
        animateStaggered,
        animateOnScroll,
        animateOnHover,
        animateOnClick
    };
}
