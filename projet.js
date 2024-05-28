document.addEventListener("DOMContentLoaded", function() {
    function initializeModal() {
        var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("modalImage");
        var images = document.querySelectorAll('.image-container img');

        if (modal && modalImg && images.length > 0) {
            images.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                });
            });

            var span = document.getElementsByClassName("close")[0];
            span.onclick = function() {
                modal.style.display = "none";
            };
        }
    }

    // Initial call
    initializeModal();

    // Optional: Listen for custom events if the content is loaded dynamically
    document.addEventListener("contentLoaded", function() {
        initializeModal();
    });
});
