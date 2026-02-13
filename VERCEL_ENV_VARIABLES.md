# Vercel Environment Variables

## 📋 Vercel'e Eklenecek Environment Variables

Vercel Dashboard → Your Project → Settings → Environment Variables

---

## 🔴 ZORUNLU (Required)

### 1. DATABASE_URL
**Açıklama:** Vercel Postgres bağlantı URL'i  
**Değer:** Vercel Postgres oluşturduktan sonra otomatik eklenecek  
**Environment:** Production, Preview, Development

```
Vercel otomatik olarak ekleyecek, manuel eklemeyin!
```

---

### 2. POSTGRES_PRISMA_URL
**Açıklama:** Prisma için optimize edilmiş database URL  
**Değer:** Vercel Postgres oluşturduktan sonra otomatik eklenecek  
**Environment:** Production, Preview, Development

```
Vercel otomatik olarak ekleyecek, manuel eklemeyin!
```

---

### 3. NODE_ENV
**Açıklama:** Node.js environment  
**Değer:** `production`  
**Environment:** Production

```
production
```

---

### 4. NEXT_PUBLIC_APP_URL
**Açıklama:** Uygulamanızın public URL'i  
**Değer:** Vercel deployment URL'iniz  
**Environment:** Production, Preview

**Production için:**
```
https://trtourpackage.vercel.app
```

**Veya custom domain kullanıyorsanız:**
```
https://trtourpackage.com
```

**Preview için:**
```
https://$VERCEL_URL
```

---

### 5. RESEND_API_KEY
**Açıklama:** Email bildirimleri için Resend API key  
**Değer:** Resend dashboard'dan alınan API key  
**Environment:** Production, Preview

```
re_Wvrpi6sE_MN4DPeB1rRWKFn9fdW3WfRTj
```

---

### 6. EMAIL_FROM
**Açıklama:** Email gönderen adresi  
**Değer:** Gönderen email adresi  
**Environment:** Production, Preview

```
TRTourPackage <noreply@trtourpackage.com>
```

---

## 🟡 OPSİYONEL (Optional - Gelecekte Eklenebilir)

### 5. SMTP_HOST
**Açıklama:** Email gönderimi için SMTP sunucusu  
**Değer:** Örn: `smtp.gmail.com`  
**Environment:** Production

```
smtp.gmail.com
```

---

### 6. SMTP_PORT
**Açıklama:** SMTP port  
**Değer:** `587` (TLS) veya `465` (SSL)  
**Environment:** Production

```
587
```

---

### 7. SMTP_USER
**Açıklama:** SMTP kullanıcı adı  
**Değer:** Email adresiniz  
**Environment:** Production

```
your-email@gmail.com
```

---

### 8. SMTP_PASSWORD
**Açıklama:** SMTP şifresi veya app password  
**Değer:** Email şifreniz veya app-specific password  
**Environment:** Production

```
your-app-password
```

---

### 9. ADMIN_EMAIL
**Açıklama:** Admin bildirimleri için email  
**Değer:** Admin email adresi  
**Environment:** Production

```
admin@trtourpackage.com
```

---

## 📝 Vercel'de Nasıl Eklenir?

### Adım 1: Vercel Dashboard
1. https://vercel.com/dashboard
2. Projenizi seçin: **TRTourPackage**
3. "Settings" sekmesine gidin
4. Sol menüden "Environment Variables" seçin

### Adım 2: Variable Ekle
1. "Add New" butonuna tıklayın
2. **Key:** Variable adını girin (örn: `NODE_ENV`)
3. **Value:** Değeri girin (örn: `production`)
4. **Environment:** Seçin:
   - ✅ Production (canlı site)
   - ✅ Preview (PR'lar için)
   - ⬜ Development (local dev için)
5. "Save" tıklayın

### Adım 3: Redeploy
Environment variables ekledikten sonra:
1. "Deployments" sekmesine gidin
2. Son deployment'ın yanındaki "..." menüsüne tıklayın
3. "Redeploy" seçin
4. "Redeploy" onaylayın

---

## 🎯 İlk Deployment İçin Minimum Gereksinimler

**Sadece bunları ekleyin:**

1. ✅ `NODE_ENV` = `production`
2. ✅ `NEXT_PUBLIC_APP_URL` = `https://trtourpackage.vercel.app`
3. ✅ `RESEND_API_KEY` = `re_Wvrpi6sE_MN4DPeB1rRWKFn9fdW3WfRTj`
4. ✅ `EMAIL_FROM` = `TRTourPackage <noreply@trtourpackage.com>`

**Database variables Vercel Postgres oluşturduğunuzda otomatik eklenecek!**

---

## 🔒 Güvenlik Notları

1. **Asla commit etmeyin:** Environment variables'ları git'e eklemeyin
2. **Token'ları gizleyin:** API keys, passwords, tokens'ları paylaşmayın
3. **NEXT_PUBLIC_ prefix:** Sadece browser'da görünmesini istediğiniz değerlere ekleyin
4. **Sensitive data:** Database passwords, API keys için prefix kullanmayın

---

## 📊 Environment Variables Özeti

| Variable | Zorunlu | Otomatik | Değer |
|----------|---------|----------|-------|
| `DATABASE_URL` | ✅ | ✅ | Vercel ekler |
| `POSTGRES_PRISMA_URL` | ✅ | ✅ | Vercel ekler |
| `NODE_ENV` | ✅ | ❌ | `production` |
| `NEXT_PUBLIC_APP_URL` | ✅ | ❌ | Vercel URL |
| `RESEND_API_KEY` | ✅ | ❌ | Resend API key |
| `EMAIL_FROM` | ✅ | ❌ | Email gönderen |
| `SMTP_*` | ❌ | ❌ | Email için (eski) |
| `ADMIN_EMAIL` | ❌ | ❌ | Bildirimler için |

---

## 🚀 Deployment Sırası

1. **Vercel'e Deploy Et** (environment variables olmadan)
2. **Vercel Postgres Oluştur** (otomatik DB variables ekler)
3. **Manuel Variables Ekle** (`NODE_ENV`, `NEXT_PUBLIC_APP_URL`)
4. **Redeploy Et**
5. **Test Et**

---

## ✅ Kontrol Listesi

Deployment öncesi:
- [ ] `NODE_ENV` eklendi
- [ ] `NEXT_PUBLIC_APP_URL` eklendi
- [ ] `RESEND_API_KEY` eklendi
- [ ] `EMAIL_FROM` eklendi
- [ ] Vercel Postgres oluşturuldu
- [ ] Database variables otomatik eklendi
- [ ] Redeploy yapıldı
- [ ] Site açılıyor
- [ ] Database bağlantısı çalışıyor
- [ ] Email bildirimleri çalışıyor

---

## 🆘 Sorun Giderme

### "DATABASE_URL is not defined"
→ Vercel Postgres oluşturun, otomatik eklenecek

### "NEXT_PUBLIC_APP_URL is not defined"
→ Manuel olarak ekleyin: `https://trtourpackage.vercel.app`

### "Build failed"
→ Environment variables'ları kontrol edin
→ Redeploy yapın

### "Database connection failed"
→ `POSTGRES_PRISMA_URL` var mı kontrol edin
→ Vercel Postgres region'ı Frankfurt olmalı

---

## 📞 Yardım

Daha fazla bilgi için:
- Vercel Docs: https://vercel.com/docs/environment-variables
- Prisma Docs: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

**Hazırladı:** Kiro AI  
**Tarih:** 13 Şubat 2026  
**Proje:** TRTourPackage v1.0
