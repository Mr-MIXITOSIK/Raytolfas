<?php
session_start();
require_once 'config.php'; // Подключение к базе данных

// Проверка, что данные отправлены через POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Проверка наличия данных
    if (empty($email) || empty($password)) {
        echo "Пожалуйста, заполните все поля.";
        exit;
    }

    // Подготовка запроса
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        // Проверка пароля
        if (password_verify($password, $hashed_password)) {
            $_SESSION['user_id'] = $id;
            header('Location: index.html'); // Перенаправление на главную страницу после входа
            exit;
        } else {
            echo "Неверный пароль.";
        }
    } else {
        echo "Пользователь с таким email не найден.";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Некорректный запрос.";
}
?>
