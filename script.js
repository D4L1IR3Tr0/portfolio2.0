document.addEventListener('DOMContentLoaded', function() {


    // Dark mode toggle
    const darkmodeBtn = document.querySelector('.darkmode_btn');
    const body = document.body;
    darkmodeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        console.log('Dark mode toggled');
    });
});

function filterSelection(category, element) {
    var items = document.getElementsByClassName("project-item");
    if (category == "all") {
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = "block";
        }
    } else {
        for (var i = 0; i < items.length; i++) {
            if (items[i].getAttribute("data-category") == category) {
                items[i].style.display = "block";
            } else {
                items[i].style.display = "none";
            }
        }
    }

    // Remove 'active' class from all buttons
    var buttons = document.getElementsByClassName("filter-btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // Add 'active' class to the clicked button
    element.classList.add("active");
}

function toggleFilters() {
    var filterButtons = document.getElementById('filterButtons');
    filterButtons.classList.toggle('show');
}

// Appeler filterSelection avec la catégorie "all" lorsque la page se charge
window.onload = function() {
    var defaultButton = document.querySelector('.filter-btn.active');
    filterSelection('all', defaultButton);
}
