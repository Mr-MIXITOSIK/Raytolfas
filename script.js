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
        document.getElementById('short-link').href = data.shortUrl;
        document.getElementById('short-link').textContent = data.shortUrl;
        document.getElementById('result').style.display = 'block';
    })
    .catch(error => console.error('Ошибка:', error));
});
