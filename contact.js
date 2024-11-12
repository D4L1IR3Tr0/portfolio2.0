document.addEventListener("DOMContentLoaded", function() {
    // Initialize EmailJS with your user ID
    emailjs.init("noZU_cG9oF3_RWPe0");  // Replace with your actual User ID from EmailJS

    // Variables to store timestamps and IP address submission count
    const pageLoadTime = Date.now();
    const ipSubmissionCount = {}; // Will store counts based on IP address
    const ipSubmitTimeout = 60 * 60 * 1000; // 1 hour in milliseconds

    // Function to get the user's IP address (using an API or other method, here we'll assume it's available)
    const getUserIp = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Unable to fetch IP address', error);
            return null; // If unable to get IP, continue without blocking
        }
    };

    // Select the contact form
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent form submission

        // Check if the form is submitted within 10 seconds of page load
        if (Date.now() - pageLoadTime < 10000) {
            alert("Formulaire envoyé trop tôt. Veuillez attendre quelques secondes.");
            return; // Block the form submission
        }

        const userIp = await getUserIp();
        if (userIp) {
            // Check if the same IP has submitted more than 3 times in the past hour
            const currentTime = Date.now();
            if (ipSubmissionCount[userIp]) {
                ipSubmissionCount[userIp].filter(timestamp => currentTime - timestamp < ipSubmitTimeout);
                if (ipSubmissionCount[userIp].length >= 3) {
                    alert("Vous avez dépassé le nombre de soumissions autorisées dans l'heure.");
                    return; // Block the form submission
                }
            } else {
                ipSubmissionCount[userIp] = [];
            }

            // Add the current submission timestamp for this IP
            ipSubmissionCount[userIp].push(currentTime);
        }

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
