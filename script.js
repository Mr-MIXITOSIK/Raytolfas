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

        // Копируем короткую ссылку в буфер обмена
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert('Ссылка скопирована в буфер обмена: ' + shortUrl);
        }).catch(err => {
            console.error('Ошибка копирования ссылки:', err);
        });
    })
    .catch(error => console.error('Ошибка:', error));
});
