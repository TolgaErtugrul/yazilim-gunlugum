require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Bağlantısı Başarılı! ✅"))
    .catch(err => console.error("Bağlantı Hatası:", err));

// 2. Veri Şeması (Model) Tanımlama
const TaskSchema = new mongoose.Schema({
    metin: { type: String, required: true },
    tarih: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task', TaskSchema);

// 3. Rotaları Güncelleyelim

// Verileri Getir (GET)
app.get('/api/tasks', async (req, res) => {
    const gorevler = await Task.find();
    res.json(gorevler.map(g => ({ id: g._id, metin: g.metin }))); // MongoDB _id kullanır
});

// Yeni Görev Ekle (POST)
app.post('/api/tasks', async (req, res) => {
    const yeniGorev = new Task({ metin: req.body.metin });
    await yeniGorev.save();
    res.status(201).json({ id: yeniGorev._id, metin: yeniGorev.metin });
});

// Görev Sil (DELETE)
app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ mesaj: "Silindi" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server ${PORT} üzerinde çalışıyor.`));