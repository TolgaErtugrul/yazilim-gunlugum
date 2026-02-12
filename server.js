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

// Yeni görev ekleme (POST)
app.post('/api/tasks', (req, res) => {
    const yeniGorevMetni = req.body.metin;
    
    if (!yeniGorevMetni) {
        return res.status(400).json({ hata: "Görev içeriği boş olamaz!" });
    }

    const yeniGorev = {
        id: gorevler.length + 1,
        metin: yeniGorevMetni
    };

    gorevler.push(yeniGorev);
    console.log("Yeni görev eklendi:", yeniGorev);
    
    // Başarıyla oluşturuldu (201) mesajı dön
    res.status(201).json(yeniGorev);
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} üzerinde hazır!`);
});