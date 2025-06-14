        // JavaScript для открытия/закрытия
        const popupBtn = document.getElementById('popupBtn');
        const popup = document.getElementById('popup');
        const closeBtn = document.getElementById('closeBtn');

        popupBtn.addEventListener('click', () => {
            popup.classList.toggle('show');
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
        });

        // Закрытие при клике вне окна
        document.addEventListener('click', (e) => {
            if (!popup.contains(e.target) && e.target !== popupBtn) {
                popup.classList.remove('show');
            }
        });