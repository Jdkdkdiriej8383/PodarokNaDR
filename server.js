const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статических файлов сайта
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎉 Сервер сайта-подарка запущен на порту ${PORT}`);
  console.log(`🌐 Открой в браузере: http://localhost:${PORT}`);
});
