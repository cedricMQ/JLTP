// Particle animation system
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    // Configuration for particles
    const config = {
        particleCount: 25,
        minSize: 6,
        maxSize: 10,
        minDuration: 6,
        maxDuration: 10,
        colors: ['#FFA500', '#FF8C00', '#FFD700'],
        spawnInterval: 400
    };

    // Function to update particle container dimensions
    function updateContainerDimensions() {
        const landingSection = document.querySelector('.min-h-[80vh]');
        const sectionRect = landingSection.getBoundingClientRect();
        return sectionRect;
    }

    // Initial dimensions
    let sectionRect = updateContainerDimensions();

    // Create particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position within landing section
        const posX = Math.random() * 100;
        const startY = Math.random() * sectionRect.height;
        particle.style.left = `${posX}%`;
        particle.style.top = `${startY}px`;
        
        // Random color with glow effect
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size}px ${color}`;
        
        // Random animation duration
        const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
        particle.style.animation = `float ${duration}s infinite`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Generate particles periodically with random intervals
    function generateParticles() {
        const createParticleWithRandomDelay = () => {
            createParticle();
            const randomDelay = Math.random() * 200 + config.spawnInterval;
            setTimeout(createParticleWithRandomDelay, randomDelay);
        };
        
        // Create initial batch of particles
        for (let i = 0; i < Math.floor(config.particleCount / 3); i++) {
            setTimeout(() => createParticle(), Math.random() * 1000);
        }
        
        createParticleWithRandomDelay();
    }

    generateParticles();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});
