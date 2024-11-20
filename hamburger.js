document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('is-active'); // Ajoute ou enlève la classe active pour le hamburger
        navList.classList.toggle('visible'); // Ajoute ou enlève la classe visible pour la navigation
    });
});
