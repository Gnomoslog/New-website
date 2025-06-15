document.addEventListener('DOMContentLoaded', function() {
    // Создаем элементы анимации
    const background = document.createElement('div');
    background.className = 'magic-background';
    
    const canvas = document.createElement('canvas');
    canvas.className = 'magic-canvas';
    
    const orb = document.createElement('div');
    orb.className = 'magic-orb';
    
    const connectText = document.createElement('div');
    connectText.className = 'magic-connect';
    // connectText.textContent = 'Connecting to cosmic energy...';
    
    background.appendChild(canvas);
    background.appendChild(orb);
    background.appendChild(connectText);
    document.body.insertBefore(background, document.body.firstChild);
    
    // Инициализация Canvas
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function init() {
        resizeCanvas();
        createParticles();
        animate();
        addInteraction();
    }
    
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    
    // Частицы еге
    const particles = [];
    const particleCount = 100;
    
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 5 + 2,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`
            });
        }
    }
    
    // Волшебные линии по середине
    const magicLines = [];
    const lineCount = 2;
    
    function createMagicLines() {
        for (let i = 0; i < lineCount; i++) {
            magicLines.push({
                points: [],
                color: `hsla(${Math.random() * 60 + 180}, 80%, 60%, 0.3)`,
                speed: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2
            });
            
            updateLine(magicLines[i]);
        }
    }
    
    function updateLine(line) {
        const points = [];
        const segments = 10 + Math.floor(Math.random() * 10);
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 100 + Math.random() * 300;
        
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const distance = radius * (0.8 + Math.random() * 0.4);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            points.push({ x, y });
        }
        
        line.points = points;
    }
    
    // Взаимодействие
    let mouseX = 0;
    let mouseY = 0;
    let isInteracting = false;
    
    function addInteraction() {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isInteracting = true;
        });
        
        document.addEventListener('touchmove', (e) => {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            isInteracting = true;
        });
        
        document.addEventListener('mouseleave', () => {
            isInteracting = false;
        });
    }
    
    // Анимация
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Обновляем частицы
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
            
            // Реакция на курсор
            if (isInteracting) {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 50;
                    p.x -= dx * 0.01 * force;
                    p.y -= dy * 0.01 * force;
                }
            }
            
            // Рисуем частицы
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        
        // Обновляем и рисуем волшебные линии
        magicLines.forEach(line => {
            line.phase += line.speed;
            
            ctx.beginPath();
            line.points.forEach((point, i) => {
                const wave = Math.sin(line.phase + i * 0.3) * 20;
                const x = point.x + wave;
                const y = point.y + wave;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // мяу
            if (Math.random() < 0.005) {
                updateLine(line);
            }
        });
        
        // Соединяем частицы атомы?
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `hsla(180, 80%, 60%, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    createMagicLines();
    init();
});