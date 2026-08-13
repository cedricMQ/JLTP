function scrollToActivites() {
    const activitesSection = document.getElementById('activites');
    if (activitesSection) {
        const start = window.pageYOffset;
        const target = activitesSection.getBoundingClientRect().top + window.pageYOffset;
        const distance = target - start;
        const duration = 1500; // Durée en millisecondes
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Fonction d'accélération/décélération pour un mouvement plus naturel
            const easing = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
            
            window.scrollTo(0, start + (distance * easing(progress)));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
}
