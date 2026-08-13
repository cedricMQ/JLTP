document.addEventListener('DOMContentLoaded', () => {
    // Éléments de la navbar
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('.navbar-menu');
    const close = document.querySelector('.navbar-close');
    const body = document.body;
    let lastScroll = 0;

    // Fonction pour bloquer/débloquer le scroll
    const toggleScroll = (shouldBlock) => {
        if (shouldBlock) {
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.touchAction = 'none';
        } else {
            body.style.overflow = '';
            body.style.height = '';
            body.style.touchAction = '';
        }
    };

    // Gestion du menu hamburger
    burger.addEventListener('click', () => {
        menu.classList.remove('hidden');
        burger.style.pointerEvents = 'none'; // Désactive le bouton
        burger.style.opacity = '0.5'; // Rend le bouton plus transparent
        toggleScroll(true);
    });

    const closeMenu = () => {
        menu.classList.add('hidden');
        burger.style.pointerEvents = 'auto'; // Réactive le bouton
        burger.style.opacity = '1'; // Restaure l'opacité
        toggleScroll(false);
    };

    close.addEventListener('click', closeMenu);

    // Fermer le menu en cliquant sur l'arrière-plan
    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('navbar-backdrop')) {
            closeMenu();
        }
    });

    // Gestion de la navbar responsive au scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('translate-y-0');
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling down & past the threshold
            navbar.classList.remove('translate-y-0');
            navbar.classList.add('-translate-y-full');
        } else if (currentScroll < lastScroll) {
            // Scrolling up
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('translate-y-0');
        }

        lastScroll = currentScroll;
    });
});
