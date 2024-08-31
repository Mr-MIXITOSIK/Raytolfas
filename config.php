<?php
$servername = "localhost"; // Замените на имя сервера базы данных
$username = "root"; // Замените на имя пользователя
$password = ""; // Замените на пароль
$dbname = "your_database"; // Замените на имя вашей базы данных

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}
?>
