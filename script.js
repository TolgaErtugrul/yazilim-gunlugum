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

function gorevEkle() {
    const input = document.getElementById("todoInput");
    const yeniGorev = input.value;

    if (yeniGorev === "") {
        alert("Lütfen bir görev yazın!");
        return;
    }

    const liste = document.getElementById("gorevListesi");

    // Yeni bir liste öğesi (li) oluştur
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${yeniGorev}</span>
        <button class="sil-btn" onclick="this.parentElement.remove()">Sil</button>
    `;

    // Listeye ekle
    liste.appendChild(li);

    verileriKaydet();

    // Kutuyu temizle
    input.value = "";
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