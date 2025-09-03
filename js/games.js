// Gallery functionality
export function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
    
    // Gallery item click handlers
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openGalleryModal(this);
        });
    });
}

function openGalleryModal(item) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    
    const img = item.querySelector('.gallery-image');
    const overlay = item.querySelector('.gallery-overlay');
    
    if (img) {
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <button class="gallery-modal-close">&times;</button>
                <img src="${img.src}" alt="${img.alt}" class="gallery-modal-image">
                <div class="gallery-modal-info">
                    <h4>${overlay.querySelector('h4').textContent}</h4>
                    <p>${overlay.querySelector('p').textContent}</p>
                </div>
            </div>
        `;
    } else {
        const placeholder = item.querySelector('.placeholder-image');
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <button class="gallery-modal-close">&times;</button>
                <div class="gallery-modal-placeholder">
                    <span>${placeholder.querySelector('span').textContent}</span>
                    <p>${placeholder.querySelector('p').textContent}</p>
                    <p>Coming Soon - This content is still in development</p>
                </div>
            </div>
        `;
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.gallery-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize games page animations
export function initializeGamesAnimations() {
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

    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('fade-in', 'stagger-' + ((index % 6) + 1));
        observer.observe(item);
    });

    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('scale-in', 'stagger-' + (index + 1));
        observer.observe(card);
    });

    // Animate future game cards
    const futureCards = document.querySelectorAll('.future-game-card');
    futureCards.forEach((card, index) => {
        card.classList.add('slide-up', 'stagger-' + (index + 1));
        observer.observe(card);
    });
}

// Export initialization function
export function initializeGamesPage() {
    initializeGallery();
    initializeGamesAnimations();
}