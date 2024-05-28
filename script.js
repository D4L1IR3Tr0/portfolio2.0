document.addEventListener('DOMContentLoaded', function() {
    // Function to load the content
    function loadPage(page) {
        fetch(page + '.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                attachProjectLinkEvents(); // Re-attach events to the newly loaded content
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Load the default home page
    loadPage('acceuil');

    // Add click events to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Function to attach click events to project links
    function attachProjectLinkEvents() {
        document.querySelectorAll('.project_btn').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const projet = this.getAttribute('data-page');
                loadPage(projet);
            });
        });
    }

    // Initial attachment of project link events
    attachProjectLinkEvents();

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

function waitForCanvas() {
    var canvas = document.getElementById('myCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        // Votre code ici
        console.log("Canvas trouvé et contexte initialisé.");
    } else {
        console.log("Canvas non trouvé, nouvelle tentative dans 100ms.");
        setTimeout(waitForCanvas, 100); // Réessayer après 100ms
    }
}