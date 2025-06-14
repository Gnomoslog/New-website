// Функция для переключения видимости меню подписки
function toggleMenu() {
  const menu = document.getElementById('subscribeMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; // Переключает видимость меню
}

// Поисковая функция
document.getElementById("search").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const posts = document.querySelectorAll(".post");
  let hasResults = false;

  posts.forEach(post => {
    const title = post.querySelector(".post-title").textContent.toLowerCase();
    if (title.includes(query)) {
      post.style.display = 'block';
      hasResults = true;
    } else {
      post.style.display = 'none';
    }
  });
});

// Обработчик события для кнопки "Сбросить"
document.getElementById("clearSearch").addEventListener("click", function() {
  document.getElementById("search").value = '';
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    post.style.display = 'block';
  });
  this.style.display = 'none';
});

