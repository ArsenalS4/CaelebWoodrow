import { initializeEffects } from './effects.js';
import { initializeAnimations } from './animations.js';
import { initializeNavigation } from './navigation.js';
import { initializeInteractions } from './interactions.js';
import { initializeCookies } from './cookies.js';
import { initializeGamesPage } from './games.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeEffects();
    initializeAnimations();
    initializeNavigation();
    initializeInteractions();
    initializeCookies();
    
    // Initialize games page if we're on it
    if (window.location.pathname.includes('games.html') || window.location.pathname.endsWith('/games')) {
        initializeGamesPage();
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Arsenal Studios portfolio item click handler - navigate to slideshow page
    const arsenalStudios = document.getElementById('arsenalStudios');
    if (arsenalStudios) {
        arsenalStudios.addEventListener('click', function(e) {
            // Don't trigger if clicking on button
            if (!e.target.classList.contains('portfolio-btn')) {
                window.location.href = 'arsenal-timeline.html';
            }
        });
    }

    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Update nav on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
});