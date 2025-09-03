class ArsenalSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        
        this.init();
        this.createFullscreenModal();
    }
    
    init() {
        this.updateCounters();
        this.bindEvents();
        this.updateProgress();
        this.createMatrixRain();
        this.optimizeImages();
    }
    
    bindEvents() {
        // Click anywhere to advance
        document.addEventListener('click', (e) => {
            if (e.target.closest('.navigation, .side-nav, .nav-btn, .section-btn, .image-container, .fullscreen-modal')) {
                return;
            }
            this.nextSlide();
        });
        
        // Navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.previousSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextSlide();
            });
        }
        
        // Section navigation
        const sectionBtns = document.querySelectorAll('.section-btn');
        sectionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const section = btn.dataset.section;
                this.goToSection(section);
            });
        });
        
        // Image click for fullscreen
        document.addEventListener('click', (e) => {
            if (e.target.matches('.image-container img')) {
                e.stopPropagation();
                this.openFullscreen(e.target);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.closeFullscreen();
                    break;
            }
        });
    }
    
    createFullscreenModal() {
        const modal = document.createElement('div');
        modal.className = 'fullscreen-modal';
        modal.innerHTML = `
            <div class="fullscreen-content">
                <button class="fullscreen-close">&times;</button>
                <img src="" alt="">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close button
        modal.querySelector('.fullscreen-close').addEventListener('click', () => {
            this.closeFullscreen();
        });
        
        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeFullscreen();
            }
        });
        
        this.fullscreenModal = modal;
    }
    
    openFullscreen(img) {
        const modal = this.fullscreenModal;
        const modalImg = modal.querySelector('img');
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeFullscreen() {
        if (this.fullscreenModal) {
            this.fullscreenModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        this.goToSlide((this.currentSlide + 1) % this.totalSlides);
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        this.goToSlide((this.currentSlide - 1 + this.totalSlides) % this.totalSlides);
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        
        const currentSlideEl = this.slides[this.currentSlide];
        const nextSlideEl = this.slides[index];
        const direction = index > this.currentSlide ? 'next' : 'prev';
        
        // Simple, smooth transition - Made Faster
        currentSlideEl.classList.remove('active');
        currentSlideEl.classList.add('exiting', direction === 'next' ? 'slide-left' : 'slide-right');
        
        nextSlideEl.classList.remove('prev', 'next');
        nextSlideEl.classList.add('entering', direction === 'next' ? 'slide-right' : 'slide-left');
        
        setTimeout(() => {
            nextSlideEl.classList.remove('entering', 'slide-right', 'slide-left');
            nextSlideEl.classList.add('active');
            
            currentSlideEl.classList.remove('exiting', 'slide-left', 'slide-right');
            
            this.currentSlide = index;
            
            // Update UI
            this.updateCounters();
            this.updateProgress();
            this.updateSectionNav();
            
            setTimeout(() => {
                this.isTransitioning = false;
                this.cleanupSlides();
            }, 100);
        }, 400); // Reduced from 800ms to 400ms
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('.image-container img');
        
        images.forEach((img, index) => {
            const container = img.parentElement;
            
            // Add loading animation
            img.style.opacity = '0';
            img.style.transform = 'scale(1.05)';
            
            img.onload = () => {
                // Determine optimal aspect ratio based on image dimensions
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                
                if (aspectRatio > 2) {
                    container.classList.add('wide');
                } else if (aspectRatio < 0.8) {
                    container.classList.add('portrait');
                } else if (Math.abs(aspectRatio - 1) < 0.2) {
                    container.classList.add('square');
                }
                
                // Smooth reveal animation
                setTimeout(() => {
                    img.style.transition = 'all 0.4s ease'; // Made faster
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, index * 100);
            };
            
            // Enhanced error handling for failed loads
            img.onerror = () => {
                console.log(`Failed to load image: ${img.src}`);
                
                // Try reloading the image once
                if (!img.dataset.retried) {
                    img.dataset.retried = 'true';
                    setTimeout(() => {
                        img.src = img.src + '?retry=' + Date.now();
                    }, 1000);
                    return;
                }
                
                // If still failed, show proper fallback
                container.style.background = 'linear-gradient(135deg, var(--bg-darker) 0%, rgba(99, 102, 241, 0.1) 100%)';
                container.innerHTML = `
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        color: var(--text-muted);
                        font-family: 'Space Mono', monospace;
                        text-align: center;
                        padding: 2rem;
                    ">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">📷</div>
                        <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">IMAGE UNAVAILABLE</div>
                        <div style="font-size: 0.7rem; opacity: 0.6;">${img.alt || 'Motion Capture Studio'}</div>
                    </div>
                `;
            };
            
            // If image is already loaded (cached), trigger onload handler so it reveals correctly
            if (img.complete && img.naturalHeight !== 0) {
                // call onload handler manually to ensure reveal runs for cached images
                img.onload();
            } else if (img.complete && img.naturalHeight === 0) {
                // already complete but failed to decode — trigger error handling
                img.onerror();
            }
            
            // Force reload for mocap image specifically if it has issues
            if (img.src.includes('mocap.jpg')) {
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
                img.style.width = '100%';
                img.style.height = '100%';
                
                // Enhanced loading for mocap image
                const loadMocapImage = () => {
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        img.src = tempImg.src;
                        img.style.transition = 'all 0.4s ease';
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    };
                    tempImg.onerror = () => {
                        console.log('Mocap image failed to load, retrying...');
                        setTimeout(() => {
                            tempImg.src = '/mocap.jpg?retry=' + Date.now();
                        }, 1000);
                    };
                    tempImg.src = '/mocap.jpg?v=' + Date.now();
                };
                
                // Add specific handling for mocap image
                if (!img.complete || img.naturalHeight === 0) {
                    console.log('Reloading mocap image...');
                    loadMocapImage();
                } else {
                    // Image appears loaded, but ensure it's visible
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }
            }
        });
    }
    
    goToSection(sectionName) {
        const sectionSlides = Array.from(this.slides).filter(slide => 
            slide.dataset.section === sectionName
        );
        
        if (sectionSlides.length > 0) {
            const firstSlideIndex = Array.from(this.slides).indexOf(sectionSlides[0]);
            this.goToSlide(firstSlideIndex);
        }
    }
    
    cleanupSlides() {
        this.slides.forEach((slide, index) => {
            if (index !== this.currentSlide) {
                slide.classList.remove('prev', 'active', 'entering', 'exiting', 'slide-left', 'slide-right');
            }
        });
    }
    
    updateCounters() {
        const currentEl = document.getElementById('currentSlide');
        const totalEl = document.getElementById('totalSlides');
        
        if (currentEl) currentEl.textContent = this.currentSlide + 1;
        if (totalEl) totalEl.textContent = this.totalSlides;
    }
    
    updateProgress() {
        const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
        const progressEl = document.getElementById('progressBar');
        
        if (progressEl) {
            progressEl.style.width = `${progress}%`;
        }
    }
    
    updateSectionNav() {
        const currentSection = this.slides[this.currentSlide].dataset.section;
        const sectionBtns = document.querySelectorAll('.section-btn');
        
        sectionBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === currentSection);
        });
    }
    
    createMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        const characters = '01アイウエオカキクケコサシスセソARSENAL';
        
        setInterval(() => {
            if (Math.random() > 0.8 && matrixContainer.children.length < 5) {
                this.createMatrixColumn(matrixContainer, characters);
            }
        }, 2000);
    }
    
    createMatrixColumn(container, characters) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * window.innerWidth + 'px';
        column.style.animationDuration = (Math.random() * 5 + 8) + 's';
        column.style.fontSize = (Math.random() * 6 + 10) + 'px';
        
        let text = '';
        const length = Math.floor(Math.random() * 15) + 8;
        for (let i = 0; i < length; i++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = text;
        
        container.appendChild(column);
        
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, 12000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArsenalSlideshow();
});