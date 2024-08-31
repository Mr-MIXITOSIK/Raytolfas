<?php
require_once 'config.php'; // Подключение к базе данных

// Проверка, что данные отправлены через POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    // Проверка наличия данных
    if (empty($email) || empty($password) || empty($confirm_password)) {
        echo "Пожалуйста, заполните все поля.";
        exit;
    }

    if ($password !== $confirm_password) {
        echo "Пароли не совпадают.";
        exit;
    }

    // Проверка наличия пользователя с таким email
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Пользователь с таким email уже существует.";
        $stmt->close();
        $conn->close();
        exit;
    }

    // Хеширование пароля
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Подготовка и выполнение запроса на добавление нового пользователя
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->bind_param('ss', $email, $hashed_password);
    if ($stmt->execute()) {
        echo "Регистрация прошла успешно!";
        header('Location: login.html'); // Перенаправление на страницу входа
        exit;
    } else {
        echo "Ошибка при регистрации. Пожалуйста, попробуйте снова.";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Некорректный запрос.";
}
?>
