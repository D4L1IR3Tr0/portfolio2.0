    
    (function(){
        emailjs.init("noZU_cG9oF3_RWPe0"); // Replace with your EmailJS user ID
    })();

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        
        // Prepare the template parameters
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        e.preventDefault();
        grecaptcha.enterprise.ready(async () => {
          const token = await grecaptcha.enterprise.execute('6LfPinsqAAAAAFUPyszaz-bDGgCniATjIVnsbLcK', {action: 'submit'});
        });
        
        // Send the email
        emailjs.send('service_c74q7ri', 'template_hmnwqh8', templateParams)
            .then(function(response) {
                formMessage.innerHTML = 'Votre message a été envoyé avec succès !';
            }, function(error) {
                formMessage.innerHTML = 'Erreur lors de l\'envoi du message : ' + JSON.stringify(error);
            });
    });