const express = require('express');
const app = express();
const PORT = 3000;

// Sunucumuzun dışarıdan (frontend'den) gelen verileri anlaması için
app.use(express.json());

// Ana sayfa isteği (localhost:3000'e girince çalışır)
app.get('/', (req, res) => {
    res.send('Express Sunucusu Canavar Gibi Çalışıyor! 🚀');
});

// To-Do verilerini alacağımız bir "kapı" (Route) hazırlayalım
app.get('/api/tasks', (req, res) => {
    const ornekGorevler = ["Node.js Ogren", "Express Kur", "Fullstack Ol"];
    res.json(ornekGorevler);
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde aktif!`);
});