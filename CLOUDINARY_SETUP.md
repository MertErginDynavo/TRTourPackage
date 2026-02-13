# Cloudinary Image Upload Setup

## Cloudinary Nedir?

Cloudinary, bulut tabanlı image ve video management servisidir. Ücretsiz tier:
- 25GB storage
- 25GB bandwidth/ay
- Image transformations (resize, crop, optimize)
- CDN delivery

## Setup Adımları

### 1. Cloudinary Hesabı Oluştur

1. https://cloudinary.com/users/register/free adresine git
2. Email ile ücretsiz hesap oluştur
3. Email'i doğrula

### 2. Cloud Name ve Upload Preset Al

#### Cloud Name:
1. Dashboard'a git: https://console.cloudinary.com
2. Sol üstte "Cloud name" görünecek (örn: `dxyz123abc`)
3. Bunu kopyala

#### Upload Preset Oluştur:
1. Settings → Upload sekmesine git
2. "Upload presets" bölümüne scroll et
3. "Add upload preset" tıkla
4. Ayarlar:
   - **Preset name:** `trtourpackage` (veya istediğin isim)
   - **Signing mode:** `Unsigned` (önemli!)
   - **Folder:** `trtourpackage` (opsiyonel)
   - **Allowed formats:** `jpg, png, webp`
   - **Max file size:** `5242880` (5MB)
   - **Transformation:** Opsiyonel (auto-optimize önerilir)
5. "Save" tıkla
6. Preset name'i kopyala

### 3. Environment Variables Ekle

#### Local Development (.env.local):
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dxyz123abc"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="trtourpackage"
```

#### Vercel Production:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Ekle:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `dxyz123abc`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` = `trtourpackage`
3. Environment: Production + Preview seç
4. Save

### 4. Database Migration Çalıştır

Neon SQL Editor'da:
```sql
-- Agency logo column
ALTER TABLE "Agency" 
ADD COLUMN IF NOT EXISTS "logo" TEXT;

-- Offer images column
ALTER TABLE "Offer" 
ADD COLUMN IF NOT EXISTS "images" TEXT;
```

Dosya: `IMAGE_UPLOAD_MIGRATION.sql`

## Kullanım

### Agency Logo Upload

1. Agency profile sayfasına git
2. "Profili Düzenle" tıkla
3. Logo upload et
4. "Değişiklikleri Kaydet"

Logo şuralarda görünür:
- Agency profile sayfası
- Offer cards (gelecekte)
- Agency listings (gelecekte)

### Offer Images Upload (Gelecek)

Offer oluştururken:
- 5 adete kadar image upload
- Her image max 5MB
- Formats: JPG, PNG, WebP

## Image Optimization

Cloudinary otomatik optimize eder:
- Format conversion (WebP)
- Quality optimization
- Lazy loading
- Responsive images

Kod örneği:
```typescript
import { getOptimizedImageUrl } from '@/lib/cloudinary'

const optimizedUrl = getOptimizedImageUrl(originalUrl, {
  width: 400,
  height: 300,
  quality: 80,
  format: 'auto'
})
```

## Güvenlik

### Unsigned Upload Preset:
- Frontend'den direkt upload
- API key gerekmez
- Folder restriction ile güvenli
- Rate limiting Cloudinary tarafından

### Signed Upload (Gelecek):
- Backend'den upload
- API secret gerekir
- Daha güvenli
- Deletion support

## Cloudinary Dashboard

### Önemli Bölümler:

1. **Media Library**
   - Tüm upload'ları gör
   - Organize et (folders)
   - Delete/rename

2. **Transformations**
   - Image resize/crop
   - Format conversion
   - Quality optimization

3. **Usage**
   - Storage kullanımı
   - Bandwidth kullanımı
   - Transformation credits

4. **Settings**
   - Upload presets
   - Security settings
   - API keys

## Folder Structure

```
trtourpackage/
├── logos/          # Agency logos
├── offers/         # Offer images
└── temp/           # Temporary uploads
```

## Limits (Free Tier)

- Storage: 25GB
- Bandwidth: 25GB/ay
- Transformations: 25,000 credits/ay
- Max file size: 10MB (bizde 5MB limit)

Upgrade gerekirse:
- Plus Plan: $89/ay (100GB storage, 100GB bandwidth)

## Troubleshooting

### "Upload failed" hatası:
1. Cloud name doğru mu kontrol et
2. Upload preset unsigned mı kontrol et
3. File size 5MB'dan küçük mü kontrol et
4. Format JPG/PNG/WebP mi kontrol et

### Image görünmüyor:
1. URL doğru mu kontrol et
2. Cloudinary dashboard'da image var mı kontrol et
3. Browser console'da error var mı kontrol et

### Slow upload:
1. Image size'ı küçült (max 5MB)
2. Internet bağlantısını kontrol et
3. Cloudinary status: https://status.cloudinary.com

## API Endpoints

### Upload Image:
```
POST https://api.cloudinary.com/v1_1/{cloud_name}/image/upload
```

### Delete Image (Signed):
```
POST https://api.cloudinary.com/v1_1/{cloud_name}/image/destroy
```

## Components

### ImageUpload
Single image upload component
- Agency logo
- Profile pictures

### MultiImageUpload
Multiple image upload component
- Offer images (max 5)
- Gallery images

## Next Steps

1. ✅ Agency logo upload
2. ⏳ Offer images upload (offer creation'a eklenecek)
3. ⏳ Image gallery component
4. ⏳ Image deletion (backend)
5. ⏳ Image optimization presets

---

**Hazırlayan:** Kiro AI  
**Tarih:** 13 Şubat 2026  
**Durum:** ✅ Setup tamamlandı - Cloudinary hesabı oluşturulmalı
