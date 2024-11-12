document.addEventListener('DOMContentLoaded', function() {
    // Function to load the content
    function loadPage(page, addHistory = true) {
        fetch(page + '.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                console.log('Page loaded:', page);
                window.scrollTo(0, 0); // Scroll to the top of the page
                attachProjectLinkEvents(); // Re-attach events to the newly loaded content
                if (addHistory) {
                    history.pushState({page: page}, null, `#${page}`);
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Load the default home page
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'acceuil';
    loadPage(initialPage, false);

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

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            loadPage(event.state.page, false);
        }
    });

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

// Appeler filterSelection avec la catégorie "all" lorsque la page se charge
window.onload = function() {
    var defaultButton = document.querySelector('.filter-btn.active');
    filterSelection('all', defaultButton);
}
