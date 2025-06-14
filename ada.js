document.addEventListener('DOMContentLoaded', function() {
    // Button ripple effect
    document.querySelectorAll('.button-effect').forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.8s linear';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '2';
            
            // Position the ripple at click location
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Add ripple animation to style
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Toggle menu function
    function toggleMenu() {
        const menu = document.getElementById('subscribeMenu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.subscribe-toggle') && !e.target.closest('.subscribe-menu')) {
            document.getElementById('subscribeMenu').style.display = 'none';
        }
    });

    // Logo rotation effect
    const logoContainer = document.getElementById('logoContainer');
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            this.classList.toggle('clicked');
        });
    }
});

function toggleMenu() {
  const menu = document.getElementById('subscribeMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Закрывать меню при клике вне его
document.addEventListener('click', function(event) {
  const menu = document.getElementById('subscribeMenu');
  const toggle = document.querySelector('.subscribe-toggle');
  
  if (!menu.contains(event.target) && event.target !== toggle) {
    menu.style.display = 'none';
  }
});


// Toggle menu function
function toggleMenu() {
    const menu = document.getElementById('subscribeMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('subscribeMenu');
    const toggle = document.querySelector('.subscribe-toggle');
    
    if (!event.target.closest('.subscribe-wrapper') && menu.style.display === 'block') {
        menu.style.display = 'none';
    }
});

// Logo animation
document.getElementById('logoContainer').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 1000);
});


// Функционал остается без изменений
function toggleMenu() {
    const menu = document.getElementById('subscribeMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('subscribeMenu');
    const toggle = document.querySelector('.subscribe-toggle');
    
    if (!menu.contains(event.target) && event.target !== toggle) {
        menu.style.display = 'none';
    }
});

document.getElementById('logoContainer').addEventListener('click', function() {
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 1000);
});