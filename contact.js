document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        // Initialisation de l'emailJS et gestion de l'envoi du formulaire
        emailjs.init("noZU_cG9oF3_RWPe0");

        const formMessage = document.getElementById('formMessage');

        // Préparer les paramètres du template
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Envoi de l'email
        emailjs.send('service_c74q7ri', 'template_hmnwqh8', templateParams)
            .then(function(response) {
                formMessage.innerHTML = 'Votre message a été envoyé avec succès !';
                alert('Votre message a été envoyé avec succès !');
            }, function(error) {
                formMessage.innerHTML = 'Erreur lors de l\'envoi du message : ' + JSON.stringify(error);
                alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
            });
    });
});
