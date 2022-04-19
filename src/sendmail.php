<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо

// $mail->isSMTP();
// $mail->Host = 'smtp.yandex.ru';
// $mail->SMTPAuth = true;
// $mail->Username = 'batomunkuevkirill@yandex.ru';
// $mail->Password = 'Iloveyou2906';
// $mail->SMTPSecure = 'ssl';
// $mail->Port = 465;
$mail->setFrom('guest@mail.ru', 'Guest');

// Кому отправить

$mail->addAddress('batomunkuevkirill@yandex.ru');

// Тема

$mail->Subject = 'Данные!';

// Тело письма

$body = '<h1>Супер письмо</h1>';

if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong>' . $_POST['name'] . '</p>';
}

if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong>' . $_POST['email'] . '</p>';
}

$mail->Body = $body;

// Отправляем

if (!$mail->send()) {
	$message = 'Ошибка';
} else {
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
