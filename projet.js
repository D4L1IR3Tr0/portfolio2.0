document.addEventListener("DOMContentLoaded", function() {
    function initializeModal() {
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("modalImage");
        var images = document.querySelectorAll('.image-container img, .image1-container img'); // Sélecteur étendu

        if (modal && modalImg && images.length > 0) {
            images.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                });
            });

            var span = document.getElementsByClassName("close")[0];
            if (span) {
                span.onclick = function() {
                    modal.style.display = "none";
                };
            }

            // Hide the modal if the user clicks outside of the modal content
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }

    // Initial call
    initializeModal();

    // Optional: Listen for custom events if the content is loaded dynamically
    document.addEventListener("contentLoaded", function() {
        initializeModal();
    });

    // Monitor for changes in the DOM
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initializeModal();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});



