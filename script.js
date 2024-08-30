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

        // Копирование короткой ссылки в буфер обмена
        copyToClipboard(shortUrl);
    })
    .catch(error => console.error('Ошибка:', error));
});

// Функция копирования текста в буфер обмена
function copyToClipboard(text) {
    // Создаем временный элемент для копирования текста
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Ссылка скопирована в буфер обмена: ' + text);
}
