// 1. Değişken Tanımlama (Bellekte yer açma)
let ogrenciAdi = "Geleceğin Developer'ı"; 

// 2. Konsola Yazdırma (Yazılımcıların gizli günlüğü)
console.log("Sistem yüklendi, merhaba " + ogrenciAdi);

// 3. İlk Fonksiyonumuz (Bir işi yapan kod bloğu)
function selamlamaVer() {
    // 1. Input kutusundaki değeri yakala
    const kullaniciIsmi = document.getElementById("isim").value;
    
    // 2. Yazılacak alanı yakala
    const mesajKutusu = document.getElementById("mesajAlani");

    // 3. Kontrol et: İsim yazılmış mı?
    if (kullaniciIsmi === "") {
        mesajKutusu.innerHTML = "Lütfen önce isminizi yazın! ✍️";
        mesajKutusu.style.color = "red";
    } else {
        // 4. Ekrana dinamik mesajı yazdır
        mesajKutusu.innerHTML = "Hoş geldin, <strong>" + kullaniciIsmi + "</strong>! Bugün harika kod yazıyorsun. 🚀";
        mesajKutusu.style.color = "green";
        
        // Konsola da yazdıralım (Yazılımcı alışkanlığı)
        console.log("Yeni kullanıcı selamlandı: " + kullaniciIsmi);
    }
}

async function gorevEkle() {
    const input = document.getElementById("todoInput");
    const yeniGorevMetni = input.value;

    if (yeniGorevMetni === "") {
        alert("Lütfen bir görev yazın!");
        return;
    }

    try {
        // 1. Sunucuya POST isteği gönder
        const cevap = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ metin: yeniGorevMetni })
        });

        if (cevap.ok) {
            const eklenenGorev = await cevap.json();
            
            // 2. Sunucu onay verirse ekrana ekle
            const liste = document.getElementById("gorevListesi");
            const li = document.createElement("li");
            li.innerHTML = `<span>${eklenenGorev.metin}</span><button class="sil-btn">Sil</button>`;
            liste.appendChild(li);

            // Kutuyu temizle
            input.value = "";
            console.log("Sunucuya başarıyla kaydedildi.");
        }
    } catch (hata) {
        console.error("Görev gönderilirken hata oluştu:", hata);
    }
}

function verileriKaydet() {
    const liste = document.getElementById("gorevListesi");
    // Tüm görev yazılarını bir diziye (array) çevirelim
    const gorevler = [];
    liste.querySelectorAll("li span").forEach(span => {
        gorevler.push(span.innerText);
    });
    // Diziyi metne çevirip (JSON) hafızaya atalım
    localStorage.setItem("benimGorevlerim", JSON.stringify(gorevler));
}

window.onload = function() {
    const kaydedilenler = localStorage.getItem("benimGorevlerim");
    if (kaydedilenler) {
        const gorevDizisi = JSON.parse(kaydedilenler);
        const liste = document.getElementById("gorevListesi");
        
        gorevDizisi.forEach(gorevMetni => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${gorevMetni}</span><button class="sil-btn" onclick="this.parentElement.remove(); verileriKaydet();">Sil</button>`;
            liste.appendChild(li);
        });
    }
};

function temaDegistir() {
    const body = document.body;
    const buton = document.getElementById("theme-toggle");

    // "dark-theme" sınıfını varsa siler, yoksa ekler
    body.classList.toggle("dark-theme");

    // Seçimi hafızaya kaydet
    if (body.classList.contains("dark-theme")) {
        localStorage.setItem("tema", "karanlik");
        buton.innerText = "☀️ Aydınlık Mod";
    } else {
        localStorage.setItem("tema", "aydinlik");
        buton.innerText = "🌙 Karanlık Mod";
    }
}

// Sayfa açıldığında hafızadaki temayı kontrol et
window.addEventListener("DOMContentLoaded", () => {
    const kaydedilenTema = localStorage.getItem("tema");
    if (kaydedilenTema === "karanlik") {
        document.body.classList.add("dark-theme");
        document.getElementById("theme-toggle").innerText = "☀️ Aydınlık Mod";
    }
});

async function sunucudanGorevleriGetir() {
    try {
        // Sunucuya istek at
        const cevap = await fetch('http://localhost:3000/api/tasks');
        const veriler = await cevap.json();

        const liste = document.getElementById("gorevListesi");
        
        // Gelen verileri ekrana bas
        veriler.forEach(gorev => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${gorev.metin}</span><button class="sil-btn">Sil</button>`;
            liste.appendChild(li);
        });
    } catch (hata) {
        console.error("Veri çekilirken hata oluştu:", hata);
    }
}

// Sayfa yüklendiğinde bu fonksiyonu çalıştır
window.addEventListener("DOMContentLoaded", sunucudanGorevleriGetir);