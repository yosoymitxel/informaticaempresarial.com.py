/* ===== Accordion Component ===== */

(function () {
    'use strict';

    function initAccordions() {
        document.querySelectorAll('.accordion-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const item = trigger.closest('.accordion-item');
                const isActive = item.classList.contains('active');

                // Close all siblings within the same accordion container
                const container = item.parentElement;
                container.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                    activeItem.classList.remove('active');
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', initAccordions);
})();
