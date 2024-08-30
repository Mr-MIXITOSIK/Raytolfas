document.getElementById('link-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const url = document.getElementById('url').value;

    // Пример запроса к фейковому API для сокращения ссылки
    fetch('https://api.example.com/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: url })
    })
    .then(response => response.json())
    .then(data => {
        const shortUrl = data.shortUrl;
        const shortLinkElement = document.getElementById('short-link');

        shortLinkElement.href = shortUrl;
        shortLinkElement.textContent = shortUrl;
        document.getElementById('result').style.display = 'block';

        // Отображаем сообщение рядом с кнопкой
        showCopyMessage();
    })
    .catch(error => console.error('Ошибка:', error));
});

// Функция для отображения сообщения
function showCopyMessage() {
    const messageElement = document.getElementById('copy-message');
    messageElement.style.display = 'block';

    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}
