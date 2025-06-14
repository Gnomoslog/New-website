    const list = document.querySelectorAll(".list");
        function activeLink() {
            list.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
        }

        list.forEach((item) => item.addEventListener("click", activeLink));
        
        // Toggle menu visibility
        const menuButton = document.querySelector('.menu-button');
        const navigation = document.querySelector('.navigation');
        
        menuButton.addEventListener('click', function() {
            navigation.classList.toggle('active');
        });

