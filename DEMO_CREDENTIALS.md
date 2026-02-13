# Demo Giriş Bilgileri

## 🎯 Misafir (Traveler) Demo Hesabı

**Giriş Sayfası:** http://localhost:3000/traveler/login

**Demo Hesap:**
- 📧 E-posta: `traveler@example.com`
- 🔑 Şifre: `demo123`

**Misafir Özellikleri:**
- İsim: John Doe
- Ülke: United States
- 2 demo tur talebi mevcut

## 🏢 Acenta Demo Hesabı

**Giriş Sayfası:** http://localhost:3000/agency/login

**Demo Hesap:**
- 📧 E-posta: `demo@trtourpackage.com`
- 🔑 Şifre: `demo123`

**Acenta Detayları:**
- Firma Adı: Demo Seyahat Acentesi
- TURSAB Lisans: A-9999
- Adres: Taksim Meydanı, Beyoğlu, İstanbul, Türkiye
- WhatsApp: +90 555 123 4567
- Website: https://demo-agency.com

## 📊 Demo Verileri

Veritabanını kurduktan sonra demo verilerini oluşturmak için:

```bash
npm run seed
```

Bu komut:
- 1 demo misafir hesabı
- 1 demo acenta hesabı
- 2 demo tur talebi
oluşturacaktır.

## 🎬 Test Senaryosu

### Misafir Akışı:
1. `/traveler/login` sayfasına git
2. Demo bilgileri ile giriş yap
3. Dashboard'da 2 demo talebi gör
4. "View Offers" butonuna tıkla
5. Acenta tekliflerini gör
6. "Contact This Agency" butonuna bas
7. Acenteye bildirim gider
8. "Rate This Agency" ile puanlama yap

### Acenta Akışı:
1. `/agency/login` sayfasına git
2. Demo bilgileri ile giriş yap
3. Panelde 2 demo talebi gör
4. Herhangi birine teklif oluştur
5. Teklif formunu doldur ve gönder
6. Misafir anında bildirim alır

## 🔄 Tam Sistem Akışı

1. **Misafir kayıt olur** → `/traveler/register`
2. **Misafir giriş yapar** → `/traveler/login`
3. **Talep oluşturur** → `/request`
4. **Tüm acenteler görür** → `/agency/dashboard`
5. **Acenta teklif gönderir** → `/agency/offer/{requestId}`
6. **Misafir teklifleri görür** → `/traveler/dashboard`
7. **Misafir "Contact" butonuna basar** → Acenteye bildirim gider
8. **Acenta doğrudan iletişim kurar** → E-posta/WhatsApp
9. **Misafir acenteyi puanlar** → 1-5 yıldız + yorum

## 🌟 Yeni Özellikler

### Misafir Sistemi:
- ✅ Kayıt/Giriş sistemi
- ✅ Kişisel dashboard
- ✅ Tüm talepleri görüntüleme
- ✅ Teklif sayısı gösterimi
- ✅ "Contact Agency" butonu
- ✅ Acente puanlama sistemi (1-5 yıldız + yorum)

### İletişim Sistemi:
- ✅ Misafir "Contact" butonuna basar
- ✅ Acenteye otomatik bildirim gider
- ✅ Misafir iletişim bilgileri acenteye iletilir
- ✅ Acenta doğrudan misafirle iletişime geçer

### Puanlama Sistemi:
- ✅ Her misafir her acenteyi 1 kez puanlayabilir
- ✅ 1-5 yıldız + opsiyonel yorum
- ✅ Acenta ortalama puanı hesaplanır
- ✅ Puanlar acenta profilinde görünür

## 🔐 Admin Paneli

**Admin Sayfası:** http://localhost:3000/admin/agencies

Buradan yeni acenta hesapları oluşturabilirsiniz.
