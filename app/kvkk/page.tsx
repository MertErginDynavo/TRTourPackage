'use client'

import React from 'react'
import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSelector from '@/components/LanguageSelector'
import Footer from '@/components/Footer'

export default function KVKKPage() {
  const { t } = useLanguage()

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Plane size={48} color="#e53e3e" strokeWidth={2} />
            <span style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1a202c',
              letterSpacing: '-0.02em',
              fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}>TRTourPackage</span>
          </Link>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <LanguageSelector />
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '60px 20px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '30px', fontFamily: 'Manrope, sans-serif' }}>
          KVKK Aydınlatma Metni
        </h1>
        
        <div style={{ lineHeight: '1.8', color: '#718096', fontFamily: 'Inter, sans-serif' }}>
          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            1. Veri Sorumlusu
          </h2>
          <p style={{ marginBottom: '20px' }}>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu olarak TRTourPackage tarafından aşağıda açıklanan kapsamda işlenebilecektir.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            2. Kişisel Verilerin Hangi Amaçla İşleneceği
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Toplanan kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde, bu Aydınlatma Metni'nde belirtilen amaçlarla işlenebilecek ve aktarılabilecektir:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Tur talep ve teklif süreçlerinin yönetilmesi</li>
            <li>Seyahat acenteleri ile iletişimin sağlanması</li>
            <li>Platform hizmetlerinin sunulması ve geliştirilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
            <li>Kullanıcı deneyiminin iyileştirilmesi</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            3. İşlenen Kişisel Veriler
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Platform üzerinden toplanan kişisel veriler:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Kimlik Bilgileri: Ad, soyad</li>
            <li>İletişim Bilgileri: E-posta adresi, telefon numarası, WhatsApp</li>
            <li>Seyahat Bilgileri: Destinasyon, tarih, kişi sayısı, bütçe, ilgi alanları</li>
            <li>İşlem Güvenliği Bilgileri: IP adresi, çerez kayıtları</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            4. Kişisel Verilerin Aktarılması
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>TÜRSAB üyesi doğrulanmış seyahat acentelerine</li>
            <li>Yasal yükümlülükler kapsamında yetkili kamu kurum ve kuruluşlarına</li>
            <li>Hizmet sağlayıcılarımıza (hosting, analytics vb.)</li>
          </ul>
          <p style={{ marginBottom: '20px' }}>
            aktarılabilecektir.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Kişisel verileriniz, platform üzerinden elektronik ortamda, KVKK'nın 5. ve 6. maddelerinde belirtilen:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması</li>
            <li>Veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması</li>
            <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması</li>
          </ul>
          <p style={{ marginBottom: '20px' }}>
            hukuki sebeplerine dayanılarak toplanmaktadır.
          </p>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            6. Kişisel Veri Sahibinin KVKK'nın 11. Maddesinde Sayılan Hakları
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Kişisel veri sahipleri olarak, KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li>Kişisel veri işlenip işlenmediğini öğrenme</li>
            <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme</li>
            <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
            <li>Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesi halinde bu işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
            <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
          </ul>

          <h2 style={{ fontSize: '24px', color: '#2d3748', marginTop: '30px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            7. İletişim
          </h2>
          <p style={{ marginBottom: '20px' }}>
            Yukarıda belirtilen haklarınızı kullanmak için bizimle iletişime geçebilirsiniz:
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>E-posta:</strong> kvkk@trtourpackage.com<br />
            <strong>Adres:</strong> [Şirket Adresi]
          </p>

          <p style={{ marginBottom: '20px', fontSize: '14px', color: '#a0aec0' }}>
            Son Güncelleme: 13 Şubat 2026
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
