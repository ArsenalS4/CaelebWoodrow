// Scroll-triggered animations
export function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to sections with enhanced effects
    const gameSection = document.querySelector('.game-section');
    const aboutSection = document.querySelector('.about-section');
    const contactSection = document.querySelector('.contact-section');

    if (gameSection) {
        gameSection.classList.add('fade-in');
        observer.observe(gameSection);
    }

    if (aboutSection) {
        aboutSection.classList.add('scale-in');
        observer.observe(aboutSection);
    }

    if (contactSection) {
        contactSection.classList.add('slide-up');
        observer.observe(contactSection);
    }

    // Enhanced game showcase animations
    const gameVisual = document.querySelector('.game-visual');
    const gameInfo = document.querySelector('.game-info');

    if (gameVisual && gameInfo) {
        gameVisual.classList.add('slide-in-left');
        gameInfo.classList.add('slide-in-right');
        observer.observe(gameVisual);
        observer.observe(gameInfo);
    }

    // Animate individual game features with stagger effect
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.classList.add('stagger-' + (index + 1));
        observer.observe(feature);
    });

    // Enhanced stats animation with stagger
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.classList.add('stagger-' + (index + 1));
        observer.observe(item);
    });

    // Animate contact items with stagger
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('stagger-' + (index + 1));
        observer.observe(item);
    });

    // Animate social links with stagger
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.classList.add('stagger-' + (index + 1));
        observer.observe(link);
    });

    // Enhanced section title animations
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('rotate-in');
        observer.observe(title);
    });

    // Game tagline animation
    const gameTagline = document.querySelector('.game-tagline');
    if (gameTagline) {
        gameTagline.classList.add('slide-down');
        observer.observe(gameTagline);
    }

    // Game description animation
    const gameDescription = document.querySelector('.game-description');
    if (gameDescription) {
        gameDescription.classList.add('fade-in', 'stagger-2');
        observer.observe(gameDescription);
    }

    // Game buttons animation
    const gameButtons = document.querySelectorAll('.game-button');
    gameButtons.forEach((button, index) => {
        button.classList.add('scale-in', 'stagger-' + (index + 3));
        observer.observe(button);
    });

    // About text animation
    const aboutDescriptions = document.querySelectorAll('.about-description');
    aboutDescriptions.forEach((desc, index) => {
        desc.classList.add('slide-up', 'stagger-' + (index + 1));
        observer.observe(desc);
    });
}

// Stats counter animation
export function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = function() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            const increment = target / 100;
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                setTimeout(animateStats, 20);
            } else {
                stat.textContent = target;
            }
        });
    };

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }
}

// Parallax effects
export function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        const gameImageContainer = document.querySelector('.game-image-container');
        
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax for game image
        if (gameImageContainer && scrolled > window.innerHeight * 0.5) {
            const gameSection = document.querySelector('.game-section');
            const rect = gameSection.getBoundingClientRect();
            const parallaxValue = (window.innerHeight - rect.top) * 0.1;
            gameImageContainer.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// Logo animations
export function initializeLogoAnimations() {
    // Add floating animation to logos
    const heroLogo = document.querySelector('.hero-logo-image');
    const sectionLogo = document.querySelector('.section-logo');
    const navLogo = document.querySelector('.logo-image');

    if (heroLogo) heroLogo.classList.add('float-animation');
    if (sectionLogo) sectionLogo.classList.add('float-animation');
    if (navLogo) navLogo.classList.add('pulse-glow');
}

// Initialize all animations
export function initializeAnimations() {
    initializeScrollAnimations();
    initializeStatsAnimation();
    initializeParallax();
    initializeLogoAnimations();
}