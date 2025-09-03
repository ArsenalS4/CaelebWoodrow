// New module: advanced / interactive effects and utilities

// Text morphing (non-blocking, low-frequency)
export function createTextMorphing() {
    const morphTargets = document.querySelectorAll('.glitch');
    if (!morphTargets.length) return;
    morphTargets.forEach(element => {
        const originalText = element.textContent;
        const scrambled = '!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        function morphText() {
            if (Math.random() > 0.97) {
                let morphed = '';
                for (let i = 0; i < originalText.length; i++) {
                    morphed += (Math.random() > 0.7) ? scrambled[Math.floor(Math.random() * scrambled.length)] : originalText[i];
                }
                element.textContent = morphed;
                setTimeout(() => element.textContent = originalText, 120);
            }
        }
        setInterval(morphText, 300);
    });
}

// Cyber scan overlay
export function createCyberScan() {
    const scan = document.createElement('div');
    scan.className = 'cyber-scan';
    document.body.appendChild(scan);
}

// Digital grid overlay
export function createDigitalGrid() {
    const grid = document.createElement('div');
    grid.className = 'digital-grid';
    document.body.appendChild(grid);
}

// Random glitch triggers
export function initializeGlitchEffects() {
    function randomGlitch() {
        const elems = document.querySelectorAll('.glitch');
        if (!elems.length) return setTimeout(randomGlitch, 5000);
        const el = elems[Math.floor(Math.random() * elems.length)];
        if (el && Math.random() > 0.7) {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = null;
        }
        setTimeout(randomGlitch, Math.random() * 7000 + 8000);
    }
    setTimeout(randomGlitch, 5000);
}

// Scanline generator for specific targets
export function initializeScanLines() {
    const gameImage = document.querySelector('.game-image');
    if (!gameImage) return;
    setInterval(() => {
        if (Math.random() > 0.6) {
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: 0;
                width: 100%;
                height: 1px;
                background: var(--primary-color);
                opacity: 0.35;
                animation: scanMove 0.8s ease-out forwards;
            `;
            if (!document.querySelector('#scan-animation')) {
                const style = document.createElement('style');
                style.id = 'scan-animation';
                style.textContent = `
                    @keyframes scanMove {
                        0% { transform: translateX(-100%); opacity: 0.8; }
                        100% { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            gameImage.appendChild(scanLine);
            setTimeout(() => { if (scanLine.parentNode) scanLine.parentNode.removeChild(scanLine); }, 900);
        }
    }, 4000);
}

// Gentle color transitions based on viewport sections
export function initializeColorTransitions() {
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = 240 + (scrollPercent * 30);
        document.documentElement.style.setProperty('--primary-color', `hsl(${hue}, 70%, 60%)`);
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let hue = 240;
                    switch (entry.target.id) {
                        case 'portfolio': hue = 260; break;
                        case 'about': hue = 280; break;
                        case 'contact': hue = 220; break;
                    }
                    document.documentElement.style.setProperty('--primary-color', `hsl(${hue}, 70%, 60%)`);
                }
            });
        }, { threshold: 0.3 });
        sections.forEach(s => { if (s.id) observer.observe(s); });
    }
}

// Shooting gallery / interactive damage system (kept but modularized)
export function createShootingGallery() {
    // Minimal wrapper that reuses original behavior but keeps scope local and lighter defaults
    let shootingActive = false;
    let crosshair = null;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'p') toggleShooting();
    });

    function toggleShooting() {
        shootingActive = !shootingActive;
        if (shootingActive) activateShooting(); else deactivateShooting();
    }

    function activateShooting() {
        createCrosshair();
        document.addEventListener('click', handleShoot);
        document.addEventListener('mousemove', updateCrosshair);
        document.body.style.cursor = 'none';
        document.body.classList.add('shooting-mode');
        showShootingNotification('SHOOTING MODE: Press P to exit');
    }

    function deactivateShooting() {
        document.removeEventListener('click', handleShoot);
        document.removeEventListener('mousemove', updateCrosshair);
        if (crosshair && crosshair.parentNode) crosshair.parentNode.removeChild(crosshair);
        crosshair = null;
        document.body.style.cursor = '';
        document.body.classList.remove('shooting-mode');
        showShootingNotification('SHOOTING MODE DEACTIVATED - Repairs initiated');
        // Note: full reset/restoration behavior intentionally removed from this compact module;
        // original heavy restoration logic was moved out (tombstoned in effects.js) for clarity.
    }

    function createCrosshair() {
        if (crosshair) return;
        crosshair = document.createElement('div');
        crosshair.className = 'crosshair';
        crosshair.style.cssText = 'position: fixed; width: 30px; height: 30px; pointer-events: none; z-index:10001; transform: translate(-50%, -50%);';
        crosshair.innerHTML = `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="none" stroke="var(--primary-color)" stroke-width="1.5" opacity="0.8"/><circle cx="15" cy="15" r="1.5" fill="var(--accent-color)"/></svg>`;
        document.body.appendChild(crosshair);
    }

    function updateCrosshair(e) { if (crosshair) { crosshair.style.left = e.clientX + 'px'; crosshair.style.top = e.clientY + 'px'; } }

    function handleShoot(e) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (!target || target.closest('.crosshair') || target.closest('.shooting-notification')) return;
        createBulletHole(e.clientX, e.clientY);
        applyDamageVisual(target);
    }

    function createBulletHole(x, y) {
        const hole = document.createElement('div');
        hole.className = 'bullet-hole';
        hole.style.cssText = `position: fixed; left:${x-8}px; top:${y-8}px; width:16px; height:16px; pointer-events:none; z-index:9999; background: radial-gradient(circle, rgba(0,0,0,0.85) 30%, transparent 100%); border-radius:50%;`;
        document.body.appendChild(hole);
        setTimeout(()=> { if (hole.parentNode) hole.parentNode.removeChild(hole); }, 6000);
    }

    function applyDamageVisual(element) {
        if (!element || ['HTML','BODY'].includes(element.tagName)) return;
        const currentOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
        element.style.transition = 'opacity 0.3s ease-out';
        element.style.opacity = Math.max(0.15, currentOpacity - (Math.random() * 0.25 + 0.12));
        element.style.filter = 'hue-rotate(20deg) contrast(1.1)';
    }

    function showShootingNotification(msg) {
        const n = document.createElement('div');
        n.className = 'shooting-notification';
        n.style.cssText = 'position: fixed; top: 20px; left:50%; transform: translateX(-50%); background: var(--accent-color); color:#000; padding: .8rem 1.2rem; z-index:10002; border-radius:6px; font-family: Orbitron, monospace;';
        n.textContent = msg;
        document.body.appendChild(n);
        setTimeout(()=> { if (n.parentNode) n.parentNode.removeChild(n); }, 3000);
    }
}