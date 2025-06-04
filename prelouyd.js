// Скрипт для экрана загрузки
// document.addEventListener('DOMContentLoaded', function() {
//   const loadingOverlay = document.querySelector('.loading-overlay');
//   const character = document.querySelector('.loading-overlay-character');
  
//   document.body.classList.add('loading-active');
  
  // Запускаем анимацию
  // setTimeout(() => {
  //   character.style.left = '100%';
  // }, 50);
  
  // Скрываем экран 
//   setTimeout(() => {
//     loadingOverlay.style.opacity = '0';
//     setTimeout(() => {
//       loadingOverlay.style.display = 'none';
//       document.body.classList.remove('loading-active');
//     }, 500);
//   }, 2900);
// });

// Остальные скрипты
// function toggleMenu() {
//   const menu = document.getElementById('subscribeMenu');
//   menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
// }


    document.addEventListener('DOMContentLoaded', function() {
      const logo = document.getElementById('logoContainer');
      if (logo) {
        logo.addEventListener('click', () => {
          logo.classList.toggle('clicked');
        });
      }
    });
