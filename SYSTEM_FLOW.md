# TRTourPackage Sistem Akışı

## 📋 Tam Akış

### 1️⃣ Gezgin Talep Oluşturur
**Sayfa:** `/request`

Gezgin formu doldurur:
- Ülke
- Seyahat tarihleri
- Kişi sayısı
- Bütçe (opsiyonel)
- İlgi alanları (opsiyonel)
- İletişim tercihi: E-posta veya WhatsApp

**Sonuç:**
- Talep veritabanına kaydedilir
- Gezgine benzersiz link verilir: `/offers/{requestId}`
- Talep durumu: `pending`

---

### 2️⃣ Talep Tüm Kayıtlı Acentelere Ulaşır
**Sayfa:** `/agency/dashboard`

- Tüm doğrulanmış acenteler panellerinde talebi görür
- Her talep kartında:
  - Gezgin bilgileri (ülke, tarih, kişi sayısı, bütçe, ilgi alanları)
  - 24 saatlik geri sayım sayacı
  - "Teklif Oluştur" butonu

**Önemli:** Gezgin iletişim bilgileri GİZLİDİR (e-posta/WhatsApp görünmez)

---

### 3️⃣ Acenteler Teklif Gönderir (24 saat içinde)
**Sayfa:** `/agency/offer/{requestId}`

Acenta teklif formunu doldurur:
- Paket başlığı
- Tur detayları
- Dahil olan hizmetler
- Hariç olan hizmetler
- Toplam fiyat
- Misafir için notlar

**"Teklifi Gönder" butonuna basıldığında:**
1. Teklif veritabanına kaydedilir
2. Talep durumu `offers_ready` olur
3. ⚡ **ANINDA** gezgine bildirim gönderilir:
   - E-posta seçtiyse → E-posta
   - WhatsApp seçtiyse → WhatsApp mesajı
4. Bildirimde teklif görüntüleme linki paylaşılır

---

### 4️⃣ Gezgin Teklifleri Görür ve Karşılaştırır
**Sayfa:** `/offers/{requestId}`

Gezgin:
- Aldığı bildirimden linke tıklar
- Veya kaydettiği linki kullanır
- Tüm acentelerin tekliflerini görür
- Her teklif kartında:
  - Paket detayları
  - Fiyat
  - Dahil/hariç hizmetler
  - Acenta bilgileri (firma adı, TURSAB lisansı)
  - İletişim butonları

---

### 5️⃣ Gezgin İstediği Acenteyle İletişime Geçer
**Sayfa:** `/offers/{requestId}` (aynı sayfa)

Gezgin beğendiği teklif için:
- "📱 Contact via WhatsApp" butonuna basar → WhatsApp açılır
- "📧 Contact via Email" butonuna basar → E-posta uygulaması açılır
- "🌐 Visit Website" butonuna basar → Acenta websitesi açılır

**WhatsApp/E-posta otomatik mesaj içerir:**
- Paket başlığı
- Gezginin ilgisini belirtir

---

### 6️⃣ Acenta Doğrudan İletişim Kurar

Gezgin iletişime geçtiğinde:
- Acenta kendi WhatsApp/E-posta'sından yanıt verir
- Rezervasyon detayları konuşulur
- Ödeme doğrudan acenta ile yapılır
- **Platform hiçbir şekilde ödeme almaz**

---

## 🔒 Güvenlik ve Kurallar

### Gezgin Koruması:
- İletişim bilgileri acentelere GÖSTERİLMEZ
- İlk iletişim gezgin tarafından başlatılır
- Gezgin istediği acenteyi seçer

### Acenta Kuralları:
- 24 saat içinde teklif vermeli
- Gezginle doğrudan iletişim KURAMAZ
- Sadece teklif oluşturabilir
- Kurallara uymayanların erişimi askıya alınır

### Platform Rolü:
- Sadece aracı platformdur
- Ödeme ALMAZ
- Rezervasyon YAPMAZ
- Sadece teklif eşleştirmesi yapar

---

## 📊 Durum Yönetimi

### Talep Durumları:
- `pending` → Acenteler teklif hazırlıyor
- `offers_ready` → En az 1 teklif gönderildi

### Teklif Süreçleri:
- Acenta 24 saat içinde teklif verebilir
- Süre dolunca "Teklif Oluştur" butonu pasif olur
- Gezgin istediği zaman teklifleri görüntüleyebilir

---

## 🎯 Özet

1. **Gezgin** → Talep oluşturur
2. **Sistem** → Tüm acentelere gösterir
3. **Acenteler** → 24 saat içinde teklif gönderir
4. **Sistem** → Gezgine ANINDA bildirim gönderir
5. **Gezgin** → Teklifleri karşılaştırır
6. **Gezgin** → İstediği acenteyle iletişime geçer
7. **Acenta** → Doğrudan rezervasyon yapar

**Platform sadece eşleştirme yapar, ödeme almaz!**
