// Pobierz elementy menu
var hamburger = document.querySelector('.hamburger');
var mobileNav = document.querySelector('.mobile-nav');

// Dodaj obsługę kliknięcia na hamburger menu
hamburger.addEventListener('click', function () {
    if (mobileNav.style.display === 'block') {
        mobileNav.style.display = 'none';
    } else {
        mobileNav.style.display = 'block';
    }
});
