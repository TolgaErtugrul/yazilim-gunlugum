const express = require('express');
const cors = require('cors'); // CORS'u içeri al
const app = express();
const PORT = 3000;

app.use(cors()); // Tüm isteklere izin ver (Geliştirme aşaması için)
app.use(express.json());

// Sunucuda saklanan geçici veri (Veritabanı gelene kadar burada)
let gorevler = [
    { id: 1, metin: "Backend'den gelen ilk görev" },
    { id: 2, metin: "Fetch API öğreniliyor" }
];

// Görevleri listeleme (GET)
app.get('/api/tasks', (req, res) => {
    res.json(gorevler);
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde hazır!`);
});