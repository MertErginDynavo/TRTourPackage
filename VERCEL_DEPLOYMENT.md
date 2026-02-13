# Vercel Deployment Guide - Özel Domain ile

## 📋 Gereksinimler

- [x] GitHub/GitLab hesabı
- [ ] Vercel hesabı (ücretsiz)
- [ ] Namecheap hesabı (domain için)
- [ ] Kredi kartı (domain satın alma için)

## 💰 Maliyet Özeti

| Hizmet | Maliyet | Periyot |
|--------|---------|---------|
| Vercel Hosting | $0 | Aylık |
| Vercel Postgres | $0 | Aylık (256 MB) |
| Domain (.com) | ~$10 | Yıllık |
| **TOPLAM** | **~$0.83/ay** | **($10/yıl)** |

---

## 🚀 Adım 1: GitHub'a Push

```bash
# 1. GitHub'da yeni repository oluştur
# https://github.com/new

# 2. Remote ekle
git remote add origin https://github.com/KULLANICI_ADINIZ/trtourpackage.git

# 3. Push et
git branch -M main
git push -u origin main
```

---

## 🌐 Adım 2: Vercel'e Deploy

### 2.1. Vercel Hesabı Oluştur

1. https://vercel.com adresine git
2. "Sign Up" tıkla
3. GitHub ile giriş yap (önerilen)

### 2.2. Projeyi Import Et

1. Vercel Dashboard'da "Add New" → "Project"
2. GitHub repository'ni seç: `trtourpackage`
3. Framework Preset: **Next.js** (otomatik algılanır)
4. Root Directory: `./` (varsayılan)
5. Build Command: `npm run build` (varsayılan)
6. Output Directory: `.next` (varsayılan)

### 2.3. Environment Variables Ekle

**ÖNEMLİ:** Şimdilik boş bırak, database kurduktan sonra ekleyeceğiz.

7. "Deploy" butonuna tıkla

**İlk deployment 2-3 dakika sürer.**

### 2.4. Deployment Sonucu

✅ Başarılı olursa:
- URL: `https://trtourpackage.vercel.app` (veya benzeri)
- Otomatik SSL sertifikası aktif
- Global CDN aktif

⚠️ Database hatası alacaksınız (normal, henüz kurmadık)

---

## 🗄️ Adım 3: Vercel Postgres Kurulumu

### 3.1. Database Oluştur

1. Vercel Dashboard → Projeniz → "Storage" sekmesi
2. "Create Database" → "Postgres"
3. Database adı: `trtourpackage-db`
4. Region: **Frankfurt** (Türkiye'ye en yakın)
5. "Create" tıkla

### 3.2. Database Bilgilerini Al

1. Database oluşturulduktan sonra ".env.local" sekmesine git
2. Şu değişkenleri kopyala:
   ```
   POSTGRES_URL="..."
   POSTGRES_PRISMA_URL="..."
   POSTGRES_URL_NON_POOLING="..."
   ```

### 3.3. Environment Variables Güncelle

1. Vercel Dashboard → Projeniz → "Settings" → "Environment Variables"
2. Şu değişkenleri ekle:

```bash
# Database (Vercel Postgres otomatik ekler)
POSTGRES_PRISMA_URL="postgresql://..."

# Application
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://trtourpackage.vercel.app"
```

3. "Save" tıkla

### 3.4. Database Migration

Vercel Dashboard'da "Deployments" sekmesine git ve "Redeploy" tıkla.

**VEYA** Local'den migration çalıştır:

```bash
# 1. Vercel'den env variables çek
vercel env pull .env.production.local

# 2. Migration çalıştır
npx prisma migrate deploy

# 3. (Opsiyonel) Demo data ekle
npx tsx prisma/seed.ts
```

---

## 🌍 Adım 4: Özel Domain Ekleme

### 4.1. Domain Satın Al (Namecheap)

1. https://www.namecheap.com adresine git
2. Domain ara: `trtourpackage.com` (veya istediğiniz isim)
3. Sepete ekle ve satın al (~$10/yıl)
4. Domain yönetim paneline git

### 4.2. Vercel'e Domain Ekle

1. Vercel Dashboard → Projeniz → "Settings" → "Domains"
2. "Add" butonuna tıkla
3. Domain'i gir: `trtourpackage.com`
4. "Add" tıkla

### 4.3. DNS Ayarları (Namecheap)

Vercel size DNS kayıtlarını gösterecek. Namecheap'te şunları ekle:

**A Record:**
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

**CNAME Record (www için):**
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### 4.4. DNS Propagation Bekle

- DNS değişiklikleri 5 dakika - 48 saat arası sürebilir
- Genellikle 10-30 dakika içinde aktif olur
- Kontrol: https://dnschecker.org

### 4.5. Environment Variables Güncelle

```bash
NEXT_PUBLIC_APP_URL="https://trtourpackage.com"
```

Vercel otomatik olarak yeniden deploy edecek.

---

## ✅ Adım 5: Doğrulama

### 5.1. Site Kontrolü

1. https://trtourpackage.com adresine git
2. Ana sayfa yükleniyor mu? ✅
3. Dil değiştirme çalışıyor mu? ✅
4. SSL sertifikası aktif mi? (🔒 simgesi) ✅

### 5.2. Fonksiyon Testleri

- [ ] Traveler kayıt olma
- [ ] Traveler giriş yapma
- [ ] Tour request oluşturma
- [ ] Agency giriş yapma
- [ ] Offer oluşturma
- [ ] Tüm diller çalışıyor

### 5.3. Demo Hesaplar

**Traveler:**
- Email: `traveler@example.com`
- Password: `demo123`

**Agency:**
- Email: `demo@trtourpackage.com`
- Password: `demo123`

---

## 🔄 Adım 6: Otomatik Deployment

### 6.1. Git Push ile Otomatik Deploy

Artık her `git push` yaptığınızda Vercel otomatik deploy edecek:

```bash
# Değişiklik yap
git add .
git commit -m "feat: Yeni özellik"
git push

# Vercel otomatik olarak:
# 1. Build yapacak
# 2. Test edecek
# 3. Deploy edecek
# 4. Domain'e yayınlayacak
```

### 6.2. Preview Deployments

Her branch için otomatik preview URL:
- `main` branch → Production (trtourpackage.com)
- `dev` branch → Preview (trtourpackage-git-dev.vercel.app)
- Pull Request → Preview URL

---

## 📊 Adım 7: Monitoring & Analytics

### 7.1. Vercel Analytics (Ücretsiz)

1. Vercel Dashboard → Projeniz → "Analytics"
2. "Enable Analytics" tıkla
3. Ücretsiz plan seç

**Görebilecekleriniz:**
- Sayfa görüntülemeleri
- Kullanıcı sayısı
- Performans metrikleri
- Coğrafi dağılım

### 7.2. Vercel Speed Insights (Ücretsiz)

1. Vercel Dashboard → Projeniz → "Speed Insights"
2. "Enable" tıkla

**Görebilecekleriniz:**
- Core Web Vitals
- Sayfa yükleme süreleri
- Performance score

---

## 🔧 Adım 8: Optimizasyonlar

### 8.1. Caching Ayarları

`next.config.js` dosyası zaten optimize edilmiş:
```javascript
module.exports = {
  reactStrictMode: true,
  // Vercel otomatik cache yönetimi
}
```

### 8.2. Image Optimization

Vercel otomatik olarak resimleri optimize eder:
- WebP formatına çevirir
- Lazy loading
- Responsive images

### 8.3. Database Connection Pooling

Vercel Postgres otomatik connection pooling sağlar.

---

## 💡 İpuçları

### Maliyet Optimizasyonu

1. **Bandwidth:** 100 GB/ay ücretsiz (yeterli)
2. **Build Minutes:** 6,000 dakika/ay ücretsiz (yeterli)
3. **Database:** 256 MB ücretsiz (başlangıç için yeterli)

### Upgrade Gerekirse

**Vercel Pro:** $20/ay
- 1 TB bandwidth
- Daha fazla build minutes
- Team collaboration

**Vercel Postgres Pro:** $10/ay
- 10 GB storage
- Daha fazla connection

### Domain Yenileme

- Namecheap otomatik yenileme aktif et
- İlk yıl: ~$10
- Yenileme: ~$13-15/yıl

---

## 🆘 Sorun Giderme

### Build Hatası

```bash
# Local'de test et
npm run build

# Hata varsa düzelt ve push et
git add .
git commit -m "fix: Build hatası düzeltildi"
git push
```

### Database Bağlantı Hatası

1. Environment variables kontrol et
2. Database region kontrol et (Frankfurt)
3. Connection string doğru mu?

### Domain Çalışmıyor

1. DNS ayarları doğru mu?
2. 24 saat bekle (DNS propagation)
3. `nslookup trtourpackage.com` komutu ile kontrol et

### SSL Sertifikası Hatası

- Vercel otomatik SSL sağlar
- Domain DNS ayarları doğruysa 5-10 dakika içinde aktif olur

---

## 📞 Destek

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Discord:** https://vercel.com/discord
- **Namecheap Support:** https://www.namecheap.com/support/

---

## ✅ Checklist

Deployment tamamlandı mı?

- [ ] GitHub'a push edildi
- [ ] Vercel'e deploy edildi
- [ ] Database oluşturuldu
- [ ] Migration çalıştırıldı
- [ ] Domain satın alındı
- [ ] DNS ayarları yapıldı
- [ ] SSL aktif
- [ ] Site çalışıyor
- [ ] Tüm fonksiyonlar test edildi
- [ ] Analytics aktif

---

**Tebrikler! 🎉**

Siteniz artık canlı: https://trtourpackage.com

**Toplam Maliyet:** ~$0.83/ay ($10/yıl domain)
