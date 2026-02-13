# GitHub Authentication Sorunu Çözümü

## ❌ Hata
```
remote: Permission to erginmert12-create/TRTourPackage.git denied to MertErginDynavo.
fatal: unable to access 'https://github.com/erginmert12-create/TRTourPackage.git/': The requested URL returned error: 403
```

## 🔍 Sorun
Farklı bir GitHub hesabı (MertErginDynavo) ile authentication yapılmış. 
Doğru hesap: erginmert12-create

---

## ✅ Çözüm 1: Personal Access Token (ÖNERİLEN - 5 dakika)

### Adım 1: Token Oluşturun
1. https://github.com/settings/tokens adresine gidin
2. "Generate new token" → "Generate new token (classic)" tıklayın
3. Ayarlar:
   - **Note:** TRTourPackage Deploy
   - **Expiration:** 90 days
   - **Scopes:** ✅ `repo` (tüm kutucukları işaretleyin)
4. "Generate token" tıklayın
5. **Token'ı kopyalayın** (ghp_xxxxxxxxxxxx şeklinde)
   - ⚠️ Bu token bir daha gösterilmeyecek!

### Adım 2: Credential Manager'ı Temizleyin
Windows PowerShell'de:
```powershell
# Mevcut credential'ı silin
git credential-manager erase https://github.com

# veya Windows Credential Manager'dan manuel silin:
# Control Panel → Credential Manager → Windows Credentials
# "git:https://github.com" girişini silin
```

### Adım 3: Push Yapın
```bash
git push -u origin main
```

Sorduğunda:
- **Username:** erginmert12-create
- **Password:** [Token'ı yapıştırın - ghp_xxxxxxxxxxxx]

Token kaydedilecek, bir daha sormayacak.

---

## ✅ Çözüm 2: GitHub Desktop (EN KOLAY - 2 dakika)

### Adım 1: GitHub Desktop İndirin
https://desktop.github.com/

### Adım 2: Giriş Yapın
- GitHub Desktop'ı açın
- File → Options → Accounts
- "Sign in to GitHub.com"
- **erginmert12-create** hesabıyla giriş yapın

### Adım 3: Repository Ekleyin
- File → Add Local Repository
- Klasörü seçin: `C:\Users\omer.kaya\acenta`
- "Add Repository"

### Adım 4: Publish
- "Publish repository" butonuna tıklayın
- Veya "Push origin" tıklayın

✅ Bitti! Otomatik push yapacak.

---

## ✅ Çözüm 3: SSH Key (KALICI - 10 dakika)

### Adım 1: SSH Key Oluşturun
```bash
# PowerShell'de
ssh-keygen -t ed25519 -C "your_email@example.com"

# Enter tuşuna basın (default location)
# Passphrase istemezse boş bırakın
```

### Adım 2: Public Key'i Kopyalayın
```bash
cat ~/.ssh/id_ed25519.pub
```

Çıktıyı kopyalayın (ssh-ed25519 ile başlar)

### Adım 3: GitHub'a Ekleyin
1. https://github.com/settings/keys
2. "New SSH key" tıklayın
3. Title: "TRTourPackage PC"
4. Key: [Kopyaladığınız key'i yapıştırın]
5. "Add SSH key"

### Adım 4: Remote URL'i Değiştirin
```bash
git remote set-url origin git@github.com:erginmert12-create/TRTourPackage.git
```

### Adım 5: Push Yapın
```bash
git push -u origin main
```

✅ Artık her zaman otomatik authentication yapacak.

---

## 🎯 Hangi Çözümü Seçmeliyim?

| Çözüm | Süre | Zorluk | Kalıcılık |
|-------|------|--------|-----------|
| **Personal Access Token** | 5 dk | Kolay | 90 gün |
| **GitHub Desktop** | 2 dk | Çok Kolay | Kalıcı |
| **SSH Key** | 10 dk | Orta | Kalıcı |

**Önerim:** GitHub Desktop (en kolay ve kalıcı)

---

## 🔧 Credential Manager Temizleme (Windows)

### Yöntem 1: PowerShell
```powershell
git credential-manager erase https://github.com
```

### Yöntem 2: Manuel
1. Windows tuşu + R
2. `control` yazın, Enter
3. "Credential Manager" açın
4. "Windows Credentials" sekmesi
5. "git:https://github.com" bulun
6. "Remove" tıklayın

---

## ✅ Test

Push başarılı olduktan sonra:
```bash
# Repository'yi kontrol edin
git remote -v

# Son commit'leri görün
git log --oneline -5

# GitHub'da kontrol edin
# https://github.com/erginmert12-create/TRTourPackage
```

---

## 📞 Hala Sorun mu Var?

1. **403 Forbidden:** Token/SSH key yanlış veya yetkisiz
2. **401 Unauthorized:** Username/password yanlış
3. **Repository not found:** URL yanlış veya private repo

**Çözüm:** Credential Manager'ı temizleyin ve tekrar deneyin.
