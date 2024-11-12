document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS with your user ID
    emailjs.init("noZU_cG9oF3_RWPe0");  // Replace with your actual User ID from EmailJS

    // Select the contact form
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Collect form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Create the EmailJS parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
        };

        // Send the email using EmailJS
        emailjs.send('service_c74q7ri', 'template_hmnwqh8', templateParams)
            .then(function(response) {
                alert("Message envoyé avec succès !");
                contactForm.reset();  // Clear the form fields
            })
            .catch(function(error) {
                alert("Échec de l'envoi du message. Veuillez réessayer plus tard.");
                console.error("EmailJS error:", error);
            });
    });
});
