document.querySelector('.cutout-button').addEventListener('mousemove', function(e) {
    const button = e.currentTarget;
    const glow = button.querySelector('.button-glow');
    const outline = button.querySelector('.button-outline');
    
    // Get button position and dimensions
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    

    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, 
        rgba(255, 255, 255, 0.3), 
        rgba(255, 255, 255, 0.1) 40%, 
        transparent 70%)`;
    
  
    const intensity = calculateIntensity(x, y, rect.width, rect.height);
    outline.style.borderColor = `rgba(255, 255, 255, ${0.3 + intensity * 0.7})`;
});

function calculateIntensity(x, y, width, height) {

    const centerX = width / 2;
    const centerY = height / 2;
    const distanceX = Math.abs(x - centerX) / centerX;
    const distanceY = Math.abs(y - centerY) / centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    return 1 - Math.min(distance, 1);
}
