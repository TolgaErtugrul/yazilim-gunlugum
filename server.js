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
        id: Date.now(),
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

// Görev silme (DELETE)
app.delete('/api/tasks/:id', (req, res) => {
    const silinecekId = parseInt(req.params.id); // URL'den gelen ID'yi sayıya çevir
    
    // Listeyi filtrele (bu ID'ye sahip olmayanı tut, olanı at)
    const yeniListe = gorevler.filter(g => g.id !== silinecekId);
    
    if (yeniListe.length === gorevler.length) {
        return res.status(404).json({ hata: "Görev bulunamadı!" });
    }

    gorevler = yeniListe;
    console.log(`ID: ${silinecekId} olan görev silindi.`);
    res.json({ mesaj: "Görev başarıyla silindi." });
});