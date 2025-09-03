// Interactive button hover effects
export function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.game-button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize all interactions
export function initializeInteractions() {
    initializeButtonEffects();
}