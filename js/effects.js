// Matrix rain effect
export function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Create fewer columns for performance
    const numColumns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < numColumns; i++) {
        if (Math.random() > 0.7) { // Only create 30% of possible columns
            setTimeout(() => {
                createMatrixColumn(matrixContainer, characters, i * 20);
            }, Math.random() * 5000);
        }
    }
    
    // Regenerate columns periodically
    setInterval(() => {
        if (matrixContainer.children.length < 10) { // Limit number of active columns
            createMatrixColumn(matrixContainer, characters, Math.random() * window.innerWidth);
        }
    }, 3000);
}

function createMatrixColumn(container, characters, xPos) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = xPos + 'px';
    column.style.animationDuration = (Math.random() * 8 + 6) + 's';
    
    // Create a string of random characters
    let text = '';
    const length = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < length; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
    }
    column.innerHTML = text;
    
    container.appendChild(column);
    
    // Remove column after animation
    setTimeout(() => {
        if (column.parentNode) {
            column.parentNode.removeChild(column);
        }
    }, 14000);
}

// Advanced Particle System
export function createAdvancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingParticle(particleContainer);
        }, Math.random() * 10000);
    }
    
    // Regenerate particles
    setInterval(() => {
        if (particleContainer.children.length < 30) {
            createFloatingParticle(particleContainer);
        }
    }, 2000);
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, var(--primary-color), transparent);
        border-radius: 50%;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 50}px;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${duration}s linear ${delay}s forwards;
        opacity: ${Math.random() * 0.8 + 0.2};
        box-shadow: 0 0 ${size * 2}px var(--primary-color);
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

// Interactive Cursor Trail
export function createCursorTrail() {
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail';
    document.body.appendChild(trailContainer);
    
    let mouseX = 0, mouseY = 0;
    let trails = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail particle
        const trail = document.createElement('div');
        trail.className = 'trail-particle';
        trail.style.cssText = `
            position: fixed;
            left: ${mouseX - 2}px;
            top: ${mouseY - 2}px;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px var(--primary-color);
            animation: trailFade 1s ease-out forwards;
        `;
        
        trailContainer.appendChild(trail);
        trails.push(trail);
        
        // Limit trail particles
        if (trails.length > 20) {
            const oldTrail = trails.shift();
            if (oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    });
}

// Neural Network Visualization
export function createNeuralNetwork() {
    const networkContainer = document.createElement('div');
    networkContainer.className = 'neural-network';
    document.body.appendChild(networkContainer);
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
    `;
    
    networkContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let i = 0; i < 20; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1
        });
    }
    
    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#6366f1';
        });
        
        // Draw connections
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.globalAlpha = 1 - distance / 150;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        
        requestAnimationFrame(animateNetwork);
    }
    
    animateNetwork();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Advanced Background Shader Effect
export function createShaderBackground() {
    const shaderContainer = document.createElement('div');
    shaderContainer.className = 'shader-background';
    document.body.appendChild(shaderContainer);
    
    // Create animated gradient background
    let time = 0;
    function updateShader() {
        time += 0.01;
        const hue1 = 240 + Math.sin(time) * 30;
        const hue2 = 280 + Math.cos(time * 0.7) * 30;
        const hue3 = 200 + Math.sin(time * 1.3) * 30;
        
        shaderContainer.style.background = `
            radial-gradient(circle at ${50 + Math.sin(time) * 20}% ${50 + Math.cos(time) * 20}%, 
                hsla(${hue1}, 70%, 50%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${30 + Math.cos(time * 0.8) * 25}% ${70 + Math.sin(time * 0.8) * 25}%, 
                hsla(${hue2}, 70%, 50%, 0.15) 0%, transparent 50%),
            radial-gradient(circle at ${80 + Math.sin(time * 1.2) * 15}% ${30 + Math.cos(time * 1.2) * 15}%, 
                hsla(${hue3}, 70%, 50%, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, 
                hsla(${hue1}, 70%, 5%, 0.8), 
                hsla(${hue2}, 70%, 3%, 0.9))
        `;
        
        requestAnimationFrame(updateShader);
    }
    
    updateShader();
}

// Advanced Text Morphing Effect
export function createTextMorphing() {
    const morphTargets = document.querySelectorAll('.glitch');
    
    morphTargets.forEach(element => {
        const originalText = element.textContent;
        const scrambledChars = '!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        
        function morphText() {
            if (Math.random() > 0.95) { // 5% chance to morph
                let morphed = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.7) {
                        morphed += scrambledChars[Math.floor(Math.random() * scrambledChars.length)];
                    } else {
                        morphed += originalText[i];
                    }
                }
                
                element.textContent = morphed;
                
                setTimeout(() => {
                    element.textContent = originalText;
                }, 100);
            }
        }
        
        setInterval(morphText, 200);
    });
}

// Cyber scan effect
export function createCyberScan() {
    const scan = document.createElement('div');
    scan.className = 'cyber-scan';
    document.body.appendChild(scan);
}

// Digital grid effect
export function createDigitalGrid() {
    const grid = document.createElement('div');
    grid.className = 'digital-grid';
    document.body.appendChild(grid);
}

// Random glitch effects
export function initializeGlitchEffects() {
    function randomGlitch() {
        const glitchElements = document.querySelectorAll('.glitch');
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        
        if (randomElement && Math.random() > 0.7) { // Only trigger 30% of the time
            randomElement.style.animation = 'none';
            randomElement.offsetHeight; // Trigger reflow
            randomElement.style.animation = null;
        }
        
        // Longer interval between glitches (8-15 seconds)
        setTimeout(randomGlitch, Math.random() * 7000 + 8000);
    }

    // Start random glitch effects
    setTimeout(randomGlitch, 5000);
}

// Scan line effect for game image
export function initializeScanLines() {
    const gameImage = document.querySelector('.game-image');
    if (gameImage) {
        setInterval(() => {
            if (Math.random() > 0.6) { // Only trigger 40% of the time
                const scanLine = document.createElement('div');
                scanLine.style.cssText = `
                    position: absolute;
                    top: ${Math.random() * 100}%;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: var(--primary-color);
                    opacity: 0.4;
                    animation: scanMove 0.8s ease-out forwards;
                `;
                
                const keyframes = `
                    @keyframes scanMove {
                        0% { transform: translateX(-100%); opacity: 0.8; }
                        100% { transform: translateX(100%); opacity: 0; }
                    }
                `;
                
                if (!document.querySelector('#scan-animation')) {
                    const style = document.createElement('style');
                    style.id = 'scan-animation';
                    style.textContent = keyframes;
                    document.head.appendChild(style);
                }
                
                gameImage.appendChild(scanLine);
                
                setTimeout(() => {
                    if (scanLine.parentNode) {
                        scanLine.parentNode.removeChild(scanLine);
                    }
                }, 800);
            }
        }, 4000); // Less frequent
    }
}

// Dynamic background color change
export function initializeColorTransitions() {
    // Reduced dynamic background color change intensity
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = 240 + (scrollPercent * 30); // Blue to purple range
        
        document.documentElement.style.setProperty('--primary-color', `hsl(${hue}, 70%, 60%)`);
    });

    // Section-based color changes
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section');
        const colorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    let hue = 240; // Default blue
                    
                    switch(sectionId) {
                        case 'game':
                            hue = 260; // Blue-purple
                            break;
                        case 'about':
                            hue = 280; // Purple
                            break;
                        case 'contact':
                            hue = 220; // Blue
                            break;
                    }
                    
                    document.documentElement.style.setProperty(
                        '--primary-color', 
                        `hsl(${hue}, 70%, 60%)`
                    );
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => {
            if (section.id) colorObserver.observe(section);
        });
    }
}

// Remove the createPhysicsSystem function call and add shooting gallery system
export function createShootingGallery() {
    let shootingActive = false;
    let crosshair = null;
    let shotCount = 0;
    let destroyedElements = [];
    let damagedElements = new Map(); // Track original states
    let totalDamageValue = 0;
    const ELEMENT_VALUE = 136; // Each element worth $136
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'p') {
            toggleShooting();
        }
    });
    
    function toggleShooting() {
        shootingActive = !shootingActive;
        
        if (shootingActive) {
            activateShooting();
        } else {
            deactivateShooting();
        }
    }
    
    function activateShooting() {
        // Create crosshair cursor
        createCrosshair();
        
        // Add shooting event listeners for both mouse and touch
        document.addEventListener('click', handleShoot);
        document.addEventListener('touchstart', handleTouchShoot);
        document.addEventListener('mousemove', updateCrosshair);
        document.addEventListener('touchmove', updateCrosshairTouch);
        
        // Change cursor style
        document.body.style.cursor = 'none';
        document.body.classList.add('shooting-mode');
        
        // Show notification
        showShootingNotification('SHOOTING GALLERY ACTIVATED - Click/Tap to destroy website elements - Press P to deactivate');
    }
    
    function createCrosshair() {
        crosshair = document.createElement('div');
        crosshair.className = 'crosshair';
        crosshair.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            pointer-events: none;
            z-index: 10001;
            transform: translate(-50%, -50%);
        `;
        
        crosshair.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="13" fill="none" stroke="var(--primary-color)" stroke-width="1.5" opacity="0.8"/>
                <line x1="15" y1="3" x2="15" y2="10" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="15" y1="20" x2="15" y2="27" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="3" y1="15" x2="10" y2="15" stroke="var(--primary-color)" stroke-width="1.5"/>
                <line x1="20" y1="15" x2="27" y2="15" stroke="var(--primary-color)" stroke-width="1.5"/>
                <circle cx="15" cy="15" r="1.5" fill="var(--accent-color)"/>
            </svg>
        `;
        
        document.body.appendChild(crosshair);
    }
    
    function updateCrosshair(e) {
        if (crosshair) {
            crosshair.style.left = e.clientX + 'px';
            crosshair.style.top = e.clientY + 'px';
        }
    }
    
    function updateCrosshairTouch(e) {
        if (crosshair && e.touches.length > 0) {
            e.preventDefault();
            const touch = e.touches[0];
            crosshair.style.left = touch.clientX + 'px';
            crosshair.style.top = touch.clientY + 'px';
        }
    }
    
    function handleTouchShoot(e) {
        if (!shootingActive || e.touches.length === 0) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const touch = e.touches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (targetElement && !targetElement.closest('.crosshair') && !targetElement.closest('.shooting-notification')) {
            createBulletHole(touch.clientX, touch.clientY);
            damageElement(targetElement, touch.clientX, touch.clientY);
            shotCount++;
            
            // Add screen shake effect
            createScreenShake();
            
            // Add muzzle flash effect
            createMuzzleFlash(touch.clientX, touch.clientY);
        }
    }
    
    function handleShoot(e) {
        if (!shootingActive) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const targetElement = document.elementFromPoint(e.clientX, e.clientY);
        
        if (targetElement && !targetElement.closest('.crosshair') && !targetElement.closest('.shooting-notification')) {
            createBulletHole(e.clientX, e.clientY);
            damageElement(targetElement, e.clientX, e.clientY);
            shotCount++;
            
            // Add screen shake effect
            createScreenShake();
            
            // Add muzzle flash effect
            createMuzzleFlash(e.clientX, e.clientY);
        }
    }
    
    function createBulletHole(x, y) {
        const hole = document.createElement('div');
        hole.className = 'bullet-hole';
        hole.style.cssText = `
            position: fixed;
            left: ${x - 8}px;
            top: ${y - 8}px;
            width: 16px;
            height: 16px;
            background: radial-gradient(circle, transparent 20%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.7) 70%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: inset 0 0 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.5);
            animation: bulletHoleAppear 0.2s ease-out;
        `;
        
        // Add bullet hole animation
        const keyframes = `
            @keyframes bulletHoleAppear {
                0% { transform: scale(0) rotate(0deg); opacity: 0; }
                50% { transform: scale(1.3) rotate(90deg); opacity: 1; }
                100% { transform: scale(1) rotate(180deg); opacity: 1; }
            }
        `;
        
        if (!document.querySelector('#bullet-hole-animation')) {
            const style = document.createElement('style');
            style.id = 'bullet-hole-animation';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(hole);
        
        // Remove hole after some time
        setTimeout(() => {
            if (hole.parentNode) {
                hole.style.transition = 'opacity 0.5s ease-out';
                hole.style.opacity = '0';
                setTimeout(() => {
                    if (hole.parentNode) {
                        hole.parentNode.removeChild(hole);
                    }
                }, 500);
            }
        }, 6000);
    }
    
    function damageElement(element, x, y) {
        // Skip certain elements
        if (element.tagName === 'HTML' || element.tagName === 'BODY' || 
            element.closest('nav') || element.closest('.nav') ||
            element.classList.contains('crosshair') ||
            element.classList.contains('shooting-notification') ||
            element.classList.contains('website-fragment')) {
            return;
        }
        
        // Store original state if not already stored
        if (!damagedElements.has(element)) {
            damagedElements.set(element, {
                opacity: element.style.opacity || getComputedStyle(element).opacity,
                filter: element.style.filter || '',
                transform: element.style.transform || '',
                position: element.style.position || '',
                display: element.style.display || '',
                animation: element.style.animation || '',
                className: element.className
            });
        }
        
        const rect = element.getBoundingClientRect();
        const damage = Math.random() * 0.25 + 0.15; // 15-40% damage per shot
        
        // Create glitch effect
        createGlitchEffect(element, x - rect.left, y - rect.top);
        
        // Apply visual damage
        let currentOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
        currentOpacity = Math.max(0.1, currentOpacity - damage);
        
        element.style.opacity = currentOpacity;
        element.style.transition = 'opacity 0.3s ease-out';
        
        // Add damage filter
        const currentFilter = element.style.filter || '';
        const glitchIntensity = 1 - currentOpacity;
        element.style.filter = `${currentFilter} hue-rotate(${glitchIntensity * 180}deg) contrast(${1 + glitchIntensity}) saturate(${1 + glitchIntensity * 2})`;
        
        // Shatter element if heavily damaged
        if (currentOpacity < 0.4) {
            element.classList.add('heavily-damaged');
            
            // Completely shatter if very damaged
            if (currentOpacity < 0.25) {
                shatterElement(element, x, y);
                totalDamageValue += ELEMENT_VALUE;
            }
        }
    }
    
    function createGlitchEffect(element, localX, localY) {
        const numGlitches = 2 + Math.floor(Math.random() * 3);
        
        // Make sure element has relative positioning for absolute child
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        // Add main glitch effect to element itself
        element.style.animation = 'none';
        element.offsetHeight; // Force reflow
        element.style.animation = 'damageGlitch 0.4s ease-out';
        
        // Create glitch overlays
        for (let i = 0; i < numGlitches; i++) {
            const glitch = document.createElement('div');
            glitch.className = 'damage-glitch';
            
            const width = 10 + Math.random() * 30;
            const height = 2 + Math.random() * 8;
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            
            glitch.style.cssText = `
                position: absolute;
                left: ${localX + offsetX}px;
                top: ${localY + offsetY}px;
                width: ${width}px;
                height: ${height}px;
                background: var(--primary-color);
                pointer-events: none;
                z-index: 10;
                opacity: 0.8;
                animation: glitchFlicker 0.5s ease-out;
                mix-blend-mode: screen;
            `;
            
            element.appendChild(glitch);
            
            setTimeout(() => {
                if (glitch.parentNode) {
                    glitch.parentNode.removeChild(glitch);
                }
            }, 500);
        }
        
        // Add damage glitch styles
        if (!document.querySelector('#damage-glitch-styles')) {
            const style = document.createElement('style');
            style.id = 'damage-glitch-styles';
            style.textContent = `
                @keyframes damageGlitch {
                    0%, 100% { transform: translate(0, 0); filter: none; }
                    10% { transform: translate(-2px, 1px); filter: hue-rotate(90deg); }
                    20% { transform: translate(2px, -1px); filter: hue-rotate(180deg); }
                    30% { transform: translate(-1px, -2px); filter: hue-rotate(270deg); }
                    40% { transform: translate(1px, 2px); filter: hue-rotate(360deg); }
                    50% { transform: translate(-2px, -1px); filter: invert(0.2); }
                    60% { transform: translate(2px, 1px); filter: invert(0); }
                    70% { transform: translate(-1px, 2px); filter: contrast(1.5); }
                    80% { transform: translate(1px, -2px); filter: contrast(1); }
                    90% { transform: translate(-2px, 2px); filter: brightness(1.2); }
                }
                
                @keyframes glitchFlicker {
                    0%, 100% { opacity: 0; transform: scaleX(1); }
                    10%, 30%, 50%, 70%, 90% { opacity: 0.8; transform: scaleX(1.2); }
                    20%, 40%, 60%, 80% { opacity: 0.3; transform: scaleX(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function shatterElement(element, impactX, impactY) {
        const rect = element.getBoundingClientRect();
        const fragmentCount = 8 + Math.floor(Math.random() * 6); // 8-14 fragments
        
        // Clone the element for each fragment
        const originalContent = element.cloneNode(true);
        const originalStyles = window.getComputedStyle(element);
        
        // Create realistic fragments
        for (let i = 0; i < fragmentCount; i++) {
            createWebsiteFragment(element, originalContent, originalStyles, rect, impactX, impactY, i, fragmentCount);
        }
        
        // Hide original element with glitch effect
        element.style.animation = 'elementDestroy 0.3s ease-out forwards';
        element.style.pointerEvents = 'none';
        
        // Add destroy animation styles
        if (!document.querySelector('#element-destroy-styles')) {
            const style = document.createElement('style');
            style.id = 'element-destroy-styles';
            style.textContent = `
                @keyframes elementDestroy {
                    0% { 
                        opacity: 1; 
                        transform: scale(1) rotate(0deg); 
                        filter: none; 
                    }
                    25% { 
                        opacity: 0.7; 
                        transform: scale(1.05) rotate(1deg); 
                        filter: hue-rotate(180deg) contrast(2); 
                    }
                    50% { 
                        opacity: 0.4; 
                        transform: scale(0.95) rotate(-1deg); 
                        filter: hue-rotate(360deg) invert(0.3); 
                    }
                    75% { 
                        opacity: 0.2; 
                        transform: scale(1.1) rotate(2deg); 
                        filter: blur(2px) brightness(2); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: scale(0.8) rotate(0deg); 
                        filter: blur(5px); 
                        display: none; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Mark as destroyed
        destroyedElements.push(element);
        
        setTimeout(() => {
            if (element.parentNode) {
                element.style.display = 'none';
            }
        }, 300);
    }
    
    function createWebsiteFragment(originalElement, originalContent, originalStyles, rect, impactX, impactY, index, total) {
        const fragment = originalContent.cloneNode(true);
        fragment.className = 'website-fragment';
        
        // Calculate fragment dimensions (divide element into grid)
        const cols = Math.ceil(Math.sqrt(total));
        const rows = Math.ceil(total / cols);
        const fragmentWidth = rect.width / cols;
        const fragmentHeight = rect.height / rows;
        
        const col = index % cols;
        const row = Math.floor(index / cols);
        
        // Fragment position within original element
        const fragmentX = col * fragmentWidth;
        const fragmentY = row * fragmentHeight;
        
        // World position
        const startX = rect.left + fragmentX;
        const startY = rect.top + fragmentY;
        
        // Calculate velocity based on impact point
        const centerX = startX + fragmentWidth / 2;
        const centerY = startY + fragmentHeight / 2;
        const deltaX = centerX - impactX;
        const deltaY = centerY - impactY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedX = distance > 0 ? deltaX / distance : (Math.random() - 0.5);
        const normalizedY = distance > 0 ? deltaY / distance : (Math.random() - 0.5);
        
        // Velocity with impact-based direction
        const baseVelocity = 100 + Math.random() * 80;
        const velocityX = normalizedX * baseVelocity + (Math.random() - 0.5) * 40;
        const velocityY = normalizedY * baseVelocity + (Math.random() - 0.5) * 40 - 50; // Add upward bias
        const gravity = 300 + Math.random() * 100;
        const rotationSpeed = (Math.random() - 0.5) * 360; // degrees per second
        
        // Style the fragment to look like part of the original
        fragment.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: ${fragmentWidth}px;
            height: ${fragmentHeight}px;
            background: ${originalStyles.backgroundColor || 'transparent'};
            color: ${originalStyles.color || '#fff'};
            font-family: ${originalStyles.fontFamily};
            font-size: ${originalStyles.fontSize};
            border: ${originalStyles.border};
            border-radius: ${originalStyles.borderRadius};
            padding: ${parseFloat(originalStyles.padding) / 2}px;
            margin: 0;
            box-shadow: 
                ${originalStyles.boxShadow},
                0 2px 8px rgba(0, 0, 0, 0.3),
                inset 0 0 0 1px rgba(255, 255, 255, 0.1);
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
            transform-origin: center center;
            clip-path: polygon(
                ${Math.random() * 10}% ${Math.random() * 10}%, 
                ${90 + Math.random() * 10}% ${Math.random() * 10}%, 
                ${90 + Math.random() * 10}% ${90 + Math.random() * 10}%, 
                ${Math.random() * 10}% ${90 + Math.random() * 10}%
            );
            filter: contrast(1.1) saturate(1.2);
        `;
        
        // Crop content to show only the fragment portion
        if (fragment.children.length > 0) {
            fragment.style.transform = `translate(-${fragmentX}px, -${fragmentY}px)`;
            fragment.style.width = `${rect.width}px`;
            fragment.style.height = `${rect.height}px`;
            
            // Wrap in a clipping container
            const clipContainer = document.createElement('div');
            clipContainer.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                width: ${fragmentWidth}px;
                height: ${fragmentHeight}px;
                overflow: hidden;
                pointer-events: none;
                z-index: 9999;
                transform-origin: center center;
            `;
            clipContainer.appendChild(fragment);
            document.body.appendChild(clipContainer);
            
            // Animate the clipping container instead
            animateFragment(clipContainer, startX, startY, velocityX, velocityY, gravity, rotationSpeed);
        } else {
            // For text nodes or simple elements
            if (originalElement.textContent) {
                const textLength = originalElement.textContent.length;
                const fragmentTextStart = Math.floor((index / total) * textLength);
                const fragmentTextEnd = Math.floor(((index + 1) / total) * textLength);
                fragment.textContent = originalElement.textContent.substring(fragmentTextStart, fragmentTextEnd);
            }
            
            document.body.appendChild(fragment);
            animateFragment(fragment, startX, startY, velocityX, velocityY, gravity, rotationSpeed);
        }
    }
    
    function animateFragment(fragment, startX, startY, velocityX, velocityY, gravity, rotationSpeed) {
        const duration = 1500 + Math.random() * 1000; // 1.5-2.5 seconds
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                // Remove fragment when animation is complete
                if (fragment.parentNode) {
                    fragment.parentNode.removeChild(fragment);
                }
                return;
            }
            
            // Physics calculations
            const currentX = startX + velocityX * (elapsed / 1000);
            const currentY = startY + velocityY * (elapsed / 1000) + 0.5 * gravity * Math.pow(elapsed / 1000, 2);
            const currentRotation = rotationSpeed * (elapsed / 1000);
            
            // Remove if off screen
            if (currentX < -200 || currentX > window.innerWidth + 200 ||
                currentY > window.innerHeight + 200) {
                if (fragment.parentNode) {
                    fragment.parentNode.removeChild(fragment);
                }
                return;
            }
            
            // Smooth fade out
            const opacity = Math.max(0, 1 - Math.pow(progress, 2));
            const scale = Math.max(0.3, 1 - progress * 0.4);
            
            fragment.style.transform = `
                translate(${currentX - startX}px, ${currentY - startY}px) 
                rotate(${currentRotation}deg) 
                scale(${scale})
            `;
            fragment.style.opacity = opacity;
            
            requestAnimationFrame(animate);
        }
        
        requestAnimationFrame(animate);
    }
    
    function createScreenShake() {
        const intensity = 3;
        const duration = 200;
        
        document.body.style.animation = `screenShake ${duration}ms ease-out`;
        
        if (!document.querySelector('#screen-shake-animation')) {
            const style = document.createElement('style');
            style.id = 'screen-shake-animation';
            style.textContent = `
                @keyframes screenShake {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-${intensity}px, ${intensity}px); }
                    20% { transform: translate(${intensity}px, -${intensity}px); }
                    30% { transform: translate(-${intensity}px, -${intensity}px); }
                    40% { transform: translate(${intensity}px, ${intensity}px); }
                    50% { transform: translate(-${intensity}px, ${intensity}px); }
                    60% { transform: translate(${intensity}px, -${intensity}px); }
                    70% { transform: translate(-${intensity}px, -${intensity}px); }
                    80% { transform: translate(${intensity}px, ${intensity}px); }
                    90% { transform: translate(-${intensity}px, ${intensity}px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, duration);
    }
    
    function createMuzzleFlash(x, y) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            left: ${x - 20}px;
            top: ${y - 20}px;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, var(--accent-color), transparent);
            pointer-events: none;
            z-index: 10000;
            border-radius: 50%;
            animation: muzzleFlash 0.1s ease-out;
        `;
        
        if (!document.querySelector('#muzzle-flash-animation')) {
            const style = document.createElement('style');
            style.id = 'muzzle-flash-animation';
            style.textContent = `
                @keyframes muzzleFlash {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(3); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, 100);
    }
    
    function resetWebsite() {
        // Remove all bullet holes
        const bulletHoles = document.querySelectorAll('.bullet-hole');
        bulletHoles.forEach(hole => {
            if (hole.parentNode) {
                hole.parentNode.removeChild(hole);
            }
        });
        
        // Remove all website fragments
        const fragments = document.querySelectorAll('.website-fragment');
        fragments.forEach(fragment => {
            if (fragment.parentNode) {
                fragment.parentNode.removeChild(fragment);
            }
        });
        
        // Restore all damaged elements
        damagedElements.forEach((originalState, element) => {
            element.style.opacity = originalState.opacity;
            element.style.filter = originalState.filter;
            element.style.transform = originalState.transform;
            element.style.position = originalState.position;
            element.style.display = originalState.display;
            element.style.animation = originalState.animation;
            element.style.transition = '';
            element.style.pointerEvents = '';
            element.className = originalState.className;
        });
        
        // Clear tracking arrays
        damagedElements.clear();
        destroyedElements = [];
        totalDamageValue = 0;
        shotCount = 0;
        
        showShootingNotification('WEBSITE SYSTEMS RESTORED - All damage repaired');
    }
    
    function deactivateShooting() {
        // Remove event listeners
        document.removeEventListener('click', handleShoot);
        document.removeEventListener('touchstart', handleTouchShoot);
        document.removeEventListener('mousemove', updateCrosshair);
        document.removeEventListener('touchmove', updateCrosshairTouch);
        
        // Remove crosshair
        if (crosshair && crosshair.parentNode) {
            crosshair.parentNode.removeChild(crosshair);
            crosshair = null;
        }
        
        // Restore cursor
        document.body.style.cursor = '';
        document.body.classList.remove('shooting-mode');
        
        // Show damage report before reset
        const damageReport = `SHOOTING GALLERY DEACTIVATED - ${shotCount} shots fired - $${totalDamageValue.toLocaleString()} in damages dealt - Initiating repair sequence...`;
        showShootingNotification(damageReport);
        
        // Reset website after showing damage report
        setTimeout(() => {
            resetWebsite();
        }, 3000);
    }
    
    function showShootingNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'shooting-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-color);
            color: #000;
            padding: 1rem 2rem;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            border-radius: 5px;
            z-index: 10002;
            box-shadow: 0 0 20px var(--accent-color);
            animation: notificationSlide 0.5s ease-out;
            max-width: 80vw;
            text-align: center;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'notificationSlide 0.5s ease-in reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }
}

// Initialize all effects
export function initializeEffects() {
    createMatrixRain();
    createAdvancedParticles();
    createCursorTrail();
    createNeuralNetwork();
    createShaderBackground();
    createTextMorphing();
    createCyberScan();
    createDigitalGrid();
    createShootingGallery();
    initializeGlitchEffects();
    initializeScanLines();
    initializeColorTransitions();
}