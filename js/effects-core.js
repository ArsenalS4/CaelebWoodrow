// New module: core visual effects (lighter, focused implementations)

// Matrix rain effect
export function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) return;
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const numColumns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < numColumns; i++) {
        if (Math.random() > 0.7) {
            setTimeout(() => {
                createMatrixColumn(matrixContainer, characters, i * 20);
            }, Math.random() * 5000);
        }
    }

    setInterval(() => {
        if (matrixContainer.children.length < 10) {
            createMatrixColumn(matrixContainer, characters, Math.random() * window.innerWidth);
        }
    }, 3000);
}

function createMatrixColumn(container, characters, xPos) {
    if (!container) return;
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = xPos + 'px';
    column.style.animationDuration = (Math.random() * 8 + 6) + 's';
    let text = '';
    const length = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < length; i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
    }
    column.innerHTML = text;
    container.appendChild(column);
    setTimeout(() => {
        if (column.parentNode) column.parentNode.removeChild(column);
    }, 14000);
}

// Advanced Particle System
export function createAdvancedParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 40; i++) {
        setTimeout(() => createFloatingParticle(particleContainer), Math.random() * 10000);
    }

    setInterval(() => {
        if (particleContainer.children.length < 30) createFloatingParticle(particleContainer);
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
    setTimeout(() => { if (particle.parentNode) particle.parentNode.removeChild(particle); }, (duration + delay) * 1000);
}

// Interactive Cursor Trail
export function createCursorTrail() {
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail';
    document.body.appendChild(trailContainer);

    let trails = [];
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'trail-particle';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX - 2}px;
            top: ${e.clientY - 2}px;
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
        if (trails.length > 20) {
            const old = trails.shift();
            if (old.parentNode) old.parentNode.removeChild(old);
        }
        setTimeout(() => { if (trail.parentNode) trail.parentNode.removeChild(trail); }, 1000);
    });
}

// Neural Network Visualization (lightweight)
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
        opacity: 0.25;
    `;
    networkContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const nodes = [];
    for (let i = 0; i < 18; i++) {
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
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#6366f1';
        });
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 140) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.globalAlpha = 1 - d / 150;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }
    animateNetwork();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

// Advanced background shader (small, non-blocking)
export function createShaderBackground() {
    const shaderContainer = document.createElement('div');
    shaderContainer.className = 'shader-background';
    document.body.appendChild(shaderContainer);
    let time = 0;
    function updateShader() {
        time += 0.01;
        const hue1 = 240 + Math.sin(time) * 20;
        const hue2 = 280 + Math.cos(time * 0.6) * 20;
        shaderContainer.style.background = `
            radial-gradient(circle at ${50 + Math.sin(time) * 15}% ${50 + Math.cos(time) * 15}%, hsla(${hue1},60%,50%,0.08) 0%, transparent 50%),
            radial-gradient(circle at ${30 + Math.cos(time * 0.7) * 20}% ${70 + Math.sin(time * 0.7) * 20}%, hsla(${hue2},60%,50%,0.1) 0%, transparent 50%),
            linear-gradient(45deg, hsla(${hue1},60%,4%,0.85), hsla(${hue2},60%,4%,0.9))
        `;
        requestAnimationFrame(updateShader);
    }
    updateShader();
}
