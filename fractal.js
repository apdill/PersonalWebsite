/**
 * Fractal Neural Network Animation
 * Creates an animated branching/neuron-like pattern on canvas
 */

(function() {
    const canvas = document.getElementById('fractal-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;
    let width, height;
    let nodes = [];
    let animationId;
    let lastTime;
    let elapsed = 0;
    const pointer = { x: 0, y: 0, active: false };
    window.addEventListener('pointermove', event => {
        pointer.active = event.pointerType === 'mouse' && !reducedMotion.matches;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
    }, { passive: true });
    const releasePointer = () => { pointer.active = false; };
    document.documentElement.addEventListener('pointerleave', releasePointer);
    window.addEventListener('blur', releasePointer);
    document.addEventListener('visibilitychange', releasePointer);
    reducedMotion.addEventListener('change', releasePointer);
    
    // Configuration
    const config = {
        nodeCount: 56,
        connectionDistance: 310,
        nodeSpeed: 18, // Pixels per second, independent of display refresh rate
        nodeSize: 3,
        lineWidth: 1.2,
        primaryColor: 'rgba(227, 156, 145, ',  // Warm rose accent
        secondaryColor: 'rgba(255, 255, 255, ',  // White
        pulseSpeed: 0.0015
    };
    
    // Node class
    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            const direction = Math.random() * Math.PI * 2;
            const speed = config.nodeSpeed * (0.65 + Math.random() * 0.7);
            this.vx = Math.cos(direction) * speed;
            this.vy = Math.sin(direction) * speed;
            this.cursorVX = 0;
            this.cursorVY = 0;
            this.radius = Math.random() * config.nodeSize + 1;
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.type = Math.random() > 0.7 ? 'primary' : 'secondary';
        }
        
        update(delta, time) {
            // Ease into a small local pull, then smoothly return to natural drift.
            let targetVX = 0;
            let targetVY = 0;
            if (pointer.active) {
                const dx = pointer.x - this.x;
                const dy = pointer.y - this.y;
                const distance = Math.hypot(dx, dy);
                if (distance > 0 && distance < 260) {
                    const strength = 32 * Math.sin(Math.PI * distance / 260);
                    targetVX = dx / distance * strength;
                    targetVY = dy / distance * strength;
                }
            }
            const easing = 1 - Math.exp(-delta * 3);
            this.cursorVX += (targetVX - this.cursorVX) * easing;
            this.cursorVY += (targetVY - this.cursorVY) * easing;
            this.x += this.cursorVX * delta;
            this.y += this.cursorVY * delta;
            // A gentle changing current gives each node a slightly wandering path.
            this.x += (this.vx + Math.sin(time * 0.0004 + this.pulseOffset) * 6) * delta;
            this.y += (this.vy + Math.cos(time * 0.0005 + this.pulseOffset) * 6) * delta;
            
            // Bounce off edges with some padding
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
            
            // Keep within bounds
            this.x = Math.max(0, Math.min(width, this.x));
            this.y = Math.max(0, Math.min(height, this.y));
        }
        
        draw(time) {
            const pulse = Math.sin(time * config.pulseSpeed + this.pulseOffset) * 0.5 + 0.5;
            const alpha = 0.5 + pulse * 0.5;
            const color = this.type === 'primary' 
                ? config.primaryColor + alpha + ')'
                : config.secondaryColor + (alpha * 0.7) + ')';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + pulse * 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            
            // Glow effect for primary nodes
            if (this.type === 'primary') {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = config.primaryColor + (alpha * 0.2) + ')';
                ctx.fill();
            }
        }
    }
    
    // Initialize
    function init() {
        resize();
        
        window.addEventListener('resize', resize);
    }
    
    // Resize handler
    function resize() {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        config.nodeCount = width < 640 ? 23 : Math.min(74, Math.max(40, Math.round(width * height / 21000)));
        config.connectionDistance = width < 640 ? 225 : 310;
        nodes = Array.from({length: config.nodeCount}, () => new Node());
        if (reducedMotion.matches) animate(0);
    }
    
    // Draw connections between nearby nodes
    function drawConnections(time) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Each pair has its own slow cycle: links grow in reach, then recede.
                const phase = nodes[i].pulseOffset + nodes[j].pulseOffset * 2;
                const reach = config.connectionDistance * (0.84 + 0.16 * Math.sin(time * 0.0003 + phase));
                if (distance < reach) {
                    const alpha = (1 - distance / reach) * 0.6;
                    const pulse = Math.sin(time * config.pulseSpeed + i * 0.1) * 0.5 + 0.5;
                    
                    // Determine line color based on node types
                    let color;
                    let lineWidth = config.lineWidth;
                    if (nodes[i].type === 'primary' || nodes[j].type === 'primary') {
                        color = config.primaryColor + (alpha * (0.6 + pulse * 0.4)) + ')';
                        lineWidth = config.lineWidth * 1.5;
                    } else {
                        color = config.secondaryColor + (alpha * 0.5) + ')';
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                    
                    // Draw branching effect for closer connections
                    if (distance < config.connectionDistance * 0.4 && 
                        (nodes[i].type === 'primary' || nodes[j].type === 'primary')) {
                        drawBranch(nodes[i], nodes[j], alpha * 0.7, time);
                    }
                }
            }
        }
    }
    
    // Draw branching dendrite-like effects
    function drawBranch(node1, node2, alpha, time) {
        const midX = (node1.x + node2.x) / 2;
        const midY = (node1.y + node2.y) / 2;
        
        const perpX = -(node2.y - node1.y);
        const perpY = node2.x - node1.x;
        const len = Math.sqrt(perpX * perpX + perpY * perpY);
        
        if (len === 0) return;
        
        const normalizedPerpX = perpX / len;
        const normalizedPerpY = perpY / len;
        
        // Main branch
        const branchLength = 20 + Math.sin(time * 0.0015 + node1.pulseOffset) * 8;
        const branchX = midX + normalizedPerpX * branchLength;
        const branchY = midY + normalizedPerpY * branchLength;
        
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(branchX, branchY);
        ctx.strokeStyle = config.primaryColor + alpha + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        
        // Secondary small branches
        const subBranchLen = branchLength * 0.4;
        const angle1 = Math.atan2(normalizedPerpY, normalizedPerpX) + 0.5;
        const angle2 = Math.atan2(normalizedPerpY, normalizedPerpX) - 0.5;
        
        ctx.beginPath();
        ctx.moveTo(branchX, branchY);
        ctx.lineTo(branchX + Math.cos(angle1) * subBranchLen, branchY + Math.sin(angle1) * subBranchLen);
        ctx.strokeStyle = config.primaryColor + (alpha * 0.6) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(branchX, branchY);
        ctx.lineTo(branchX + Math.cos(angle2) * subBranchLen, branchY + Math.sin(angle2) * subBranchLen);
        ctx.stroke();
        
        // Node at branch end
        ctx.beginPath();
        ctx.arc(branchX, branchY, 2, 0, Math.PI * 2);
        ctx.fillStyle = config.primaryColor + alpha + ')';
        ctx.fill();
    }
    
    // Animation loop
    function animate(time) {
        cancelAnimationFrame(animationId);
        const delta = reducedMotion.matches || lastTime === undefined ? 0 : Math.min(Math.max(time - lastTime, 0), 50) / 1000;
        lastTime = time;
        elapsed += delta * 1000;
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.update(delta, elapsed);
        });
        
        // Draw connections first (behind nodes)
        drawConnections(elapsed);
        
        // Draw nodes on top
        nodes.forEach(node => {
            node.draw(elapsed);
        });
        
        if (!reducedMotion.matches && !document.hidden && inView) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    // Start animation
    init();
    animate(0);
    const resume = () => {
        cancelAnimationFrame(animationId);
        lastTime = undefined;
        if (!document.hidden && inView) animate(performance.now());
    };
    document.addEventListener('visibilitychange', resume);
    reducedMotion.addEventListener('change', resume);
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
            resume();
        }).observe(canvas);
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
})();
