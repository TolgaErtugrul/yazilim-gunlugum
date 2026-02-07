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