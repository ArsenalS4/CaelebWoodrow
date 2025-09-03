// Matrix rain effect
export function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    
    // Add null check to prevent error
    if (!matrixContainer) {
        return; // Exit early if matrix container doesn't exist
    }
    
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
    // Add null check for container parameter
    if (!container) {
        return; // Exit early if container is null
    }
    
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
            
