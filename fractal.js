/**
 * Fractal Neural Network Animation
 * Creates an animated branching/neuron-like pattern on canvas
 */

(function() {
    const canvas = document.getElementById('fractal-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let connections = [];
    let animationId;
    
    // Configuration
    const config = {
        nodeCount: 120,
        connectionDistance: 180,
        nodeSpeed: 0.25,
        nodeSize: 3,
        lineWidth: 1.2,
        primaryColor: 'rgba(196, 92, 92, ',  // Red accent
        secondaryColor: 'rgba(255, 255, 255, ',  // White
        pulseSpeed: 0.015
    };
    
    // Node class
    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.nodeSpeed;
            this.vy = (Math.random() - 0.5) * config.nodeSpeed;
            this.radius = Math.random() * config.nodeSize + 1;
            this.pulseOffset = Math.random() * Math.PI * 2;
            this.type = Math.random() > 0.7 ? 'primary' : 'secondary';
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
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
        nodes = [];
        connections = [];
        
        for (let i = 0; i < config.nodeCount; i++) {
            nodes.push(new Node());
        }
        
        window.addEventListener('resize', resize);
    }
    
    // Resize handler
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    // Draw connections between nearby nodes
    function drawConnections(time) {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    const alpha = (1 - distance / config.connectionDistance) * 0.6;
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
        const branchLength = 20 + Math.sin(time * 0.01) * 8;
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
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
        });
        
        // Draw connections first (behind nodes)
        drawConnections(time);
        
        // Draw nodes on top
        nodes.forEach(node => {
            node.draw(time);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    init();
    animate(0);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
})();
