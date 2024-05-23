<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $phpmailer = new PHPMailer();
    $phpmailer->isSMTP();
    $phpmailer->Host = 'sandbox.smtp.mailtrap.io';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 2525;
    $phpmailer->Username = 'ab86f0972cfde3';
    $phpmailer->Password = '5cc7b540578d36';
    $phpmailer->setFrom($email, $name); // Adresse email de l'expéditeur
    $phpmailer->addAddress('retrochorizo@proton.me'); // Adresse email du destinataire
    $phpmailer->Subject = 'contact form de la part de : ' . $name; // Sujet du message
    $phpmailer->Body = $message; // Corps du message

    // Envoi du message
    if ($phpmailer->send()) {
        echo 'Votre message a été envoyé avec succès !';
    } else {
        echo 'Erreur lors de l\'envoi du message : ' . $phpmailer->ErrorInfo;
    }
}
?>