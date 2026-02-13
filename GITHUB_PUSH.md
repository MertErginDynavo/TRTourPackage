# GitHub Push Komutları

## Adım 1: GitHub'da Repository Oluşturun
1. https://github.com/new adresine gidin
2. Repository adı: `trtourpackage`
3. Public veya Private seçin
4. **ÖNEMLİ:** README, .gitignore, license eklemeyin (boş repository)
5. "Create repository" tıklayın

## Adım 2: Remote Ekleyin
GitHub'da repository oluşturduktan sonra size verilen URL'i kullanın:

```bash
# HTTPS ile (önerilen)
git remote add origin https://github.com/KULLANICI_ADINIZ/trtourpackage.git

# veya SSH ile
git remote add origin git@github.com:KULLANICI_ADINIZ/trtourpackage.git
```

## Adım 3: Branch Adını Kontrol Edin
```bash
git branch -M main
```

## Adım 4: Push Yapın
```bash
# İlk push (upstream set eder)
git push -u origin main

# Sonraki push'lar için
git push
```

## Mevcut Durum
✅ 7 commit hazır
✅ Working tree temiz
✅ Tüm dosyalar commit edildi

## Commit Listesi
```
c2df389 - feat: Ana sayfa, navbar ve footer'a acente kayit linkleri eklendi
b5d42e3 - feat: Acente kayit sistemi ve admin onay sureci eklendi
bd995c6 - fix: Production hazırlıkları - PrismaClient singleton, PostgreSQL desteği
7a39a5b - docs: Add git push instructions
e8b0efe - docs: Add project status report
...
```

## Sorun Giderme

### "remote origin already exists" hatası
```bash
git remote remove origin
git remote add origin https://github.com/KULLANICI_ADINIZ/trtourpackage.git
```

### Authentication hatası (HTTPS)
GitHub artık password authentication desteklemiyor. Personal Access Token kullanın:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. Scopes: `repo` seçin
4. Token'ı kopyalayın
5. Push yaparken password yerine token'ı kullanın

### SSH Key kurulumu (önerilen)
```bash
# SSH key oluştur
ssh-keygen -t ed25519 -C "your_email@example.com"

# Public key'i kopyala
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key
# Kopyaladığınız key'i yapıştırın
```

## Sonraki Adımlar
Push başarılı olduktan sonra:
1. ✅ GitHub repository'nizi kontrol edin
2. ✅ Vercel'e deploy edin (VERCEL_DEPLOYMENT.md)
3. ✅ Domain bağlayın

## Hızlı Komutlar
```bash
# Durum kontrol
git status
git log --oneline -5

# Remote kontrol
git remote -v

# Push
git push -u origin main
```
