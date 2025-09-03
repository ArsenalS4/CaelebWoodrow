// Navigation functionality
export function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Check if it's an external link or page navigation
            if (targetId.startsWith('/') || targetId.startsWith('http')) {
                // Let the browser handle page navigation normally
                return;
            }
            
            // Handle same-page navigation for home page
            if (targetId.startsWith('#') && window.location.pathname === '/') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Handle navigation from games page back to home sections
            if (targetId.startsWith('/#')) {
                e.preventDefault();
                window.location.href = targetId;
            }
        });
    });

    // Navbar transparency on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // Mobile menu functionality
    initializeMobileMenu();
}

function initializeMobileMenu() {
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.className = 'nav-toggle';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        const existingToggle = document.querySelector('.nav-toggle');
        
        if (!existingToggle) {
            navToggle.style.display = 'block';
            navContainer.appendChild(navToggle);
            
            navToggle.addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.classList.toggle('mobile-open');
                
                // Animate nav links when opening
                if (navLinks.classList.contains('mobile-open')) {
                    const links = navLinks.querySelectorAll('.nav-link');
                    links.forEach((link, index) => {
                        link.style.opacity = '0';
                        link.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            link.style.transition = 'all 0.3s ease';
                            link.style.opacity = '1';
                            link.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                }
            });
        }
    }
}