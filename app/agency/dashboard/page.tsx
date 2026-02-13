'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Request {
  id: string
  country: string
  travelDates: string
  numTravelers: number
  budgetRange: string | null
  interests: string | null
  requestSubmittedAt: string
}

export default function AgencyDashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [agencyName, setAgencyName] = useState('')

  useEffect(() => {
    const agencyId = localStorage.getItem('agencyId')
    
    // Fetch agency info
    fetch(`/api/agency/info/${agencyId}`)
      .then(res => res.json())
      .then(data => setAgencyName(data.companyName))
    
    // Fetch requests
    fetch('/api/agency/requests')
      .then(res => res.json())
      .then(data => setRequests(data))
  }, [])

  const getTimeRemaining = (submittedAt: string) => {
    const deadline = new Date(submittedAt)
    deadline.setHours(deadline.getHours() + 24)
    const now = new Date()
    const diff = deadline.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours > 0) {
      return { text: `Kalan süre: ${hours} saat`, expired: false }
    } else {
      return { text: 'Süresi Doldu', expired: true }
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '32px', margin: 0, fontFamily: 'Manrope, sans-serif' }}>Hoş geldiniz, {agencyName}</h1>
                <span className="badge" style={{ background: '#27ae60' }}>Doğrulanmış Acente</span>
              </div>
              <p style={{ color: '#666', fontFamily: 'Inter, sans-serif' }}>
                Gelen tur taleplerini inceleyin ve 24 saat içinde tekliflerinizi gönderin.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/agency/profile" className="btn" style={{ textDecoration: 'none', background: '#f8f9fa', color: '#333', border: '1px solid #ddd' }}>
                Profil
              </Link>
              <Link href="/agency/analytics" className="btn" style={{ textDecoration: 'none', background: '#f3e8ff', color: '#9f7aea', border: '1px solid #9f7aea' }}>
                Analytics
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '13px', color: '#718096', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>
                Ortalama Yanıt Süresi
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#48bb78', fontFamily: 'Manrope, sans-serif' }}>
                4.5 saat
              </div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '13px', color: '#718096', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>
                Bu Ay Teklif
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#4299e1', fontFamily: 'Manrope, sans-serif' }}>
                38
              </div>
            </div>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '13px', color: '#718096', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>
                Dönüşüm Oranı
              </div>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#9f7aea', fontFamily: 'Manrope, sans-serif' }}>
                84%
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff3cd', padding: '16px', borderRadius: '6px', marginBottom: '30px', border: '1px solid #ffc107' }}>
          <strong>Önemli Kurallar:</strong>
          <ul style={{ marginTop: '8px', marginLeft: '20px', marginBottom: 0 }}>
            <li>Teklifler en geç 24 saat içinde girilmelidir</li>
            <li>Misafirle doğrudan iletişim kurulamaz</li>
            <li>Tüm bilgiler doğru ve şeffaf olmalıdır</li>
          </ul>
        </div>

        {/* Terms & Refund Policy Section */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif', color: '#2d3748' }}>
            Platform Şartları & İade Politikası
          </h2>
          
          <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '20px', border: '1px solid #48bb78' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
              💡 Tek Cümlelik Özet
            </p>
            <p style={{ fontSize: '14px', color: '#22543d', margin: 0, fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
              "We charge for platform access and trust — not for tours, bookings, or traveler payments."
            </p>
          </div>

          <div style={{ display: 'grid', gap: '16px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                1. Platformun Rolü
              </h3>
              <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                TRTourPackage bir aracı platformdur. TRTourPackage does not sell tours, does not process payments, and does not act as a travel agency. The platform solely facilitates direct contact between travelers and verified Turkish travel agencies.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                2. Abonelik Şartları
              </h3>
              <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Abonelik, platform erişimi ve özelliklerini kapsar</li>
                <li>Traveler taleplerini görme, teklif sunma ve direkt iletişim kurma hakkı verilir</li>
                <li>Abonelik her ay otomatik yenilenir</li>
                <li>İstenildiğinde iptal edilebilir</li>
                <li><strong>No commission is charged on any tour, booking, or agreement made outside the platform.</strong></li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                3. Yıllık Doğrulama Ücreti
              </h3>
              <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                The Annual Verification Fee covers the manual review and annual verification of the agency's TÜRSAB license and business credentials.
              </p>
              <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Yılda 1 kez uygulanır</li>
                <li>TÜRSAB üyeliği + firma bilgileri kontrol edilir</li>
                <li>Platform güvenliği ve kaliteyi korumayı amaçlar</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                4. İade Politikası
              </h3>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ color: '#718096', fontWeight: '600', marginBottom: '4px' }}>Abonelik Ücretleri:</p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Abonelik ücretleri kullanılan dönem için iade edilmez</li>
                  <li>İptal edildiğinde mevcut dönem sonuna kadar erişim devam eder</li>
                  <li>Subscription fees are non-refundable once the billing period has started</li>
                </ul>
              </div>
              <div>
                <p style={{ color: '#718096', fontWeight: '600', marginBottom: '4px' }}>Yıllık Doğrulama Ücreti:</p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Doğrulama süreci başladıktan sonra iade edilmez</li>
                  <li>Manuel inceleme yapılır ve operasyonel maliyet oluşur</li>
                  <li>The Annual Verification Fee is non-refundable once the verification process has been initiated</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                5. Platform Sorumluluğu
              </h3>
              <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                TRTourPackage tur içeriğinden, fiyatlandırmadan, turun gerçekleşmesinden ve Traveler ile Agency arasındaki anlaşmalardan sorumlu değildir.
              </p>
              <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', fontWeight: '600' }}>
                All agreements, payments, and tour services are solely the responsibility of the traveler and the agency.
              </p>
            </div>

            <div style={{ padding: '16px', background: '#f7fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '12px', fontFamily: 'Manrope, sans-serif' }}>
                Sık Sorulan Sorular
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#2d3748', margin: 0, marginBottom: '4px' }}>
                    Q: Do you take commission from tours?
                  </p>
                  <p style={{ color: '#718096', margin: 0 }}>
                    A: No. TRTourPackage never takes commission.
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#2d3748', margin: 0, marginBottom: '4px' }}>
                    Q: Do you handle traveler payments?
                  </p>
                  <p style={{ color: '#718096', margin: 0 }}>
                    A: No. All payments are handled directly between travelers and agencies.
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#2d3748', margin: 0, marginBottom: '4px' }}>
                    Q: Can I cancel my subscription?
                  </p>
                  <p style={{ color: '#718096', margin: 0 }}>
                    A: Yes, anytime. Access continues until the end of the billing period.
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: '#2d3748', margin: 0, marginBottom: '4px' }}>
                    Q: Is the verification fee refundable?
                  </p>
                  <p style={{ color: '#718096', margin: 0 }}>
                    A: No. The verification fee covers manual review and is non-refundable once initiated.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px', background: '#fffbeb', borderRadius: '6px', border: '1px solid #fbbf24' }}>
              <p style={{ fontSize: '13px', color: '#78716c', margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                TRTourPackage maintains a commission-free and ad-free marketplace model to ensure transparency and trust for both travelers and agencies.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif', color: '#2d3748' }}>
            Gizlilik Politikası
          </h2>
          <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
            Son güncelleme: 12 Şubat 2026
          </p>

          <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '20px', border: '1px solid #48bb78' }}>
            <p style={{ fontSize: '14px', color: '#22543d', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
              TRTourPackage kullanıcılarının kişisel verilerinin gizliliğine önem verir ve kişisel verileri KVKK (6698) ve GDPR (EU 2016/679) kapsamında işler.
            </p>
          </div>

          <details style={{ marginBottom: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600', color: '#2d3748', padding: '12px', background: '#f8f9fa', borderRadius: '6px', fontFamily: 'Manrope, sans-serif' }}>
              Gizlilik Politikasını Görüntüle
            </summary>
            <div style={{ display: 'grid', gap: '16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', marginTop: '16px', paddingLeft: '12px', maxHeight: '400px', overflowY: 'auto' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  1. Veri Sorumlusu
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Gizlilik ile ilgili talepleriniz için: 📧 <strong>privacy@trtourpackage.com</strong>
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  2. Toplanan Veriler
                </h3>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Firma adı, yetkili kişi, e-posta, telefon</li>
                  <li>TÜRSAB belge numarası</li>
                  <li>Gezginlerle yapılan mesajlaşmalar</li>
                </ul>
                <p style={{ color: '#e53e3e', margin: 0, lineHeight: '1.6', fontWeight: '600', marginTop: '8px' }}>
                  📌 Ödeme bilgileri kesinlikle toplanmaz.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  3. Veri Paylaşımı
                </h3>
                <ul style={{ color: '#e53e3e', margin: 0, paddingLeft: '20px', lineHeight: '1.8', fontWeight: '600' }}>
                  <li>❌ Satılmaz</li>
                  <li>❌ Kiralanmaz</li>
                  <li>❌ Pazarlama amacıyla aktarılmaz</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  4. Kullanıcı Hakları
                </h3>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Verilerine erişme</li>
                  <li>Düzeltme talep etme</li>
                  <li>Silme isteme</li>
                  <li>İtiraz etme</li>
                </ul>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px' }}>
                  📧 <strong>privacy@trtourpackage.com</strong>
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  5. Çerezler
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Yalnızca zorunlu çerezler kullanılır.
                </p>
                <p style={{ color: '#e53e3e', margin: 0, lineHeight: '1.6', fontWeight: '600', marginTop: '4px' }}>
                  📌 Reklam/takip çerezleri yok.
                </p>
              </div>
            </div>
          </details>
        </div>

        {/* Cookie Policy Section */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif', color: '#2d3748' }}>
            Çerez Politikası
          </h2>
          <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
            Son güncelleme: 12 Şubat 2026
          </p>

          <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '20px', border: '1px solid #48bb78' }}>
            <p style={{ fontSize: '14px', color: '#22543d', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
              TRTourPackage yalnızca zorunlu (essential) çerezler kullanır. Reklam, pazarlama veya takip çerezleri kullanılmaz.
            </p>
          </div>

          <details style={{ marginBottom: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600', color: '#2d3748', padding: '12px', background: '#f8f9fa', borderRadius: '6px', fontFamily: 'Manrope, sans-serif' }}>
              Çerez Politikasını Görüntüle
            </summary>
            <div style={{ display: 'grid', gap: '16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', marginTop: '16px', paddingLeft: '12px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  1. Çerez (Cookie) Nedir?
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, sitenin düzgün çalışmasını ve daha iyi bir kullanıcı deneyimi sunulmasını sağlar.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  2. TRTourPackage Hangi Çerezleri Kullanır?
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px', fontWeight: '600' }}>
                  🔹 Zorunlu Çerezler
                </p>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Bu çerezler:
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Kullanıcı oturumunun açık kalmasını</li>
                  <li>Güvenli giriş yapılmasını</li>
                  <li>Platformun teknik olarak çalışmasını</li>
                </ul>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px' }}>
                  sağlamak için gereklidir.
                </p>
                <p style={{ color: '#e53e3e', margin: 0, lineHeight: '1.6', fontWeight: '600', marginTop: '8px' }}>
                  📌 Bu çerezler olmadan platform düzgün çalışmaz.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  3. Kullanılmayan Çerezler (Net Taahhüt)
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  TRTourPackage aşağıdaki çerezleri KULLANMAZ:
                </p>
                <ul style={{ color: '#e53e3e', margin: 0, paddingLeft: '20px', lineHeight: '1.8', fontWeight: '600' }}>
                  <li>❌ Reklam çerezleri</li>
                  <li>❌ Pazarlama çerezleri</li>
                  <li>❌ Davranışsal takip (tracking) çerezleri</li>
                  <li>❌ Üçüncü taraf reklam veya analiz çerezleri</li>
                </ul>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px', fontWeight: '600' }}>
                  TRTourPackage kullanıcı verilerini reklam, pazarlama veya izleme amacıyla kullanmaz.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  4. Hukuki Dayanak
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Zorunlu çerezler, KVKK ve GDPR kapsamında açık rıza gerektirmeyen, platformun çalışması için gerekli çerezlerdir.
                </p>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Bu nedenle:
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Çerez onay banner'ı yalnızca bilgilendirme amaçlıdır</li>
                  <li>"Kabul Et" zorunluluğu yoktur</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  5. Çerezlerin Saklanma Süresi
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Zorunlu çerezler oturum süresi boyunca veya güvenlik gereği kısa süreli olarak saklanır ve otomatik olarak silinir.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  6. Çerezleri Nasıl Kontrol Edebilirsiniz?
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Kullanıcılar, tarayıcı ayarları üzerinden çerezleri:
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Görüntüleyebilir</li>
                  <li>Silebilir</li>
                  <li>Engelleyebilir</li>
                </ul>
                <p style={{ color: '#e53e3e', margin: 0, lineHeight: '1.6', fontWeight: '600', marginTop: '8px' }}>
                  ⚠️ Ancak zorunlu çerezlerin engellenmesi durumunda platformun bazı bölümleri çalışmayabilir.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  7. Politika Değişiklikleri
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Bu Çerez Politikası zaman zaman güncellenebilir. Güncellemeler bu sayfada yayınlanır ve yürürlük tarihi belirtilir.
                </p>
              </div>
            </div>
          </details>
        </div>

        {/* KVKK Aydınlatma Metni Section */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif', color: '#2d3748' }}>
            KVKK Aydınlatma Metni
          </h2>
          <p style={{ fontSize: '13px', color: '#a0aec0', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>
            Son güncelleme: 12 Şubat 2026
          </p>

          <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '6px', marginBottom: '20px', border: '1px solid #48bb78' }}>
            <p style={{ fontSize: '14px', color: '#22543d', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
              Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, TRTourPackage tarafından kişisel verilerin işlenmesine ilişkin bilgilendirme amacıyla hazırlanmıştır.
            </p>
          </div>

          <details style={{ marginBottom: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '600', color: '#2d3748', padding: '12px', background: '#f8f9fa', borderRadius: '6px', fontFamily: 'Manrope, sans-serif' }}>
              KVKK Aydınlatma Metnini Görüntüle
            </summary>
            <div style={{ display: 'grid', gap: '16px', fontSize: '14px', fontFamily: 'Inter, sans-serif', marginTop: '16px', paddingLeft: '12px', maxHeight: '400px', overflowY: 'auto' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  1. Veri Sorumlusu
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  KVKK kapsamında kişisel verileriniz, Veri Sorumlusu sıfatıyla TRTourPackage tarafından işlenmektedir.
                </p>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  İletişim: 📧 <strong>privacy@trtourpackage.com</strong>
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  2. İşlenen Kişisel Veriler
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px', fontWeight: '600' }}>
                  🔹 Acentalar:
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Firma adı</li>
                  <li>Yetkili kişi bilgileri</li>
                  <li>İletişim bilgileri</li>
                  <li>TÜRSAB belge numarası</li>
                  <li>Profil ve mesajlaşma bilgileri</li>
                </ul>
                <p style={{ color: '#e53e3e', margin: 0, lineHeight: '1.6', fontWeight: '600', marginTop: '8px' }}>
                  📌 Ödeme ve kredi kartı bilgileri işlenmez.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  3. Kişisel Verilerin İşlenme Amaçları
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Kullanıcı hesaplarının oluşturulması ve yönetilmesi</li>
                  <li>Gezginler ile acentalar arasında iletişim sağlanması</li>
                  <li>Acentaların TÜRSAB doğrulamasının yapılması</li>
                  <li>Platform güvenliğinin sağlanması</li>
                  <li>Hizmet kalitesinin artırılması</li>
                  <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  4. Kişisel Verilerin Aktarılması
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Kişisel verileriniz:
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Gezgin–acenta iletişimi kapsamında ilgili taraflarla</li>
                  <li>Hukuki zorunluluk halinde yetkili kurum ve kuruluşlarla</li>
                  <li>Teknik hizmet sağlayıcılarla (barındırma, altyapı) sınırlı ve gerekli ölçüde</li>
                </ul>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px' }}>
                  aktarılabilir.
                </p>
                <p style={{ color: '#e53e3e', margin: 0, lineHeight: '1.6', fontWeight: '600', marginTop: '8px' }}>
                  📌 Kişisel verileriniz satılmaz, pazarlama amacıyla paylaşılmaz.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  5. Hukuki Sebep
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  Kişisel verileriniz KVKK'nın 5. ve 6. maddeleri kapsamında;
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Açık rızanızın bulunması</li>
                  <li>Sözleşmenin kurulması ve ifası</li>
                  <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
                  <li>Veri sorumlusunun meşru menfaati</li>
                </ul>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px' }}>
                  hukuki sebeplerine dayanılarak işlenmektedir.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  6. KVKK Kapsamındaki Haklarınız
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginBottom: '8px' }}>
                  KVKK'nın 11. maddesi uyarınca;
                </p>
                <ul style={{ color: '#718096', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yanlış veya eksik işlenmişse düzeltilmesini isteme</li>
                  <li>Silinmesini veya yok edilmesini talep etme</li>
                  <li>İşlemeye itiraz etme</li>
                </ul>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px' }}>
                  haklarına sahipsiniz.
                </p>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6', marginTop: '8px' }}>
                  Taleplerinizi: 📧 <strong>privacy@trtourpackage.com</strong> adresine iletebilirsiniz.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                  7. Yürürlük
                </h3>
                <p style={{ color: '#718096', margin: 0, lineHeight: '1.6' }}>
                  Bu KVKK Aydınlatma Metni, yayınlandığı tarihte yürürlüğe girer.
                </p>
              </div>
            </div>
          </details>

          <div style={{ padding: '12px', background: '#fffbeb', borderRadius: '6px', border: '1px solid #fbbf24', marginTop: '16px' }}>
            <p style={{ fontSize: '13px', color: '#78716c', margin: 0, fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
              ℹ️ Platformu kullanarak, kişisel verilerinizin bu KVKK Aydınlatma Metni kapsamında işlenmesini kabul etmiş sayılırsınız.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '20px', fontFamily: 'Manrope, sans-serif' }}>Gelen Talepler</h2>

        <div style={{ display: 'grid', gap: '20px' }}>
          {requests.map(req => {
            const timeInfo = getTimeRemaining(req.requestSubmittedAt)
            return (
              <div key={req.id} style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', opacity: timeInfo.expired ? 0.6 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
                      {req.numTravelers} Kişi - {req.country}
                    </h3>
                    <p style={{ color: '#666', fontFamily: 'Inter, sans-serif' }}>Seyahat Tarihleri: {req.travelDates}</p>
                  </div>
                  <span style={{ 
                    padding: '6px 12px', 
                    background: timeInfo.expired ? '#f8d7da' : '#fff3cd', 
                    color: timeInfo.expired ? '#721c24' : '#856404', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {timeInfo.text}
                  </span>
                </div>

                {req.budgetRange && (
                  <p style={{ marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                    <strong>Bütçe:</strong> {req.budgetRange}
                  </p>
                )}

                {req.interests && (
                  <p style={{ marginBottom: '16px', color: '#666', fontFamily: 'Inter, sans-serif' }}>
                    <strong>Özel Talepler:</strong> {req.interests}
                  </p>
                )}

                {!timeInfo.expired ? (
                  <Link 
                    href={`/agency/offer/${req.id}`}
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    Teklif Oluştur
                  </Link>
                ) : (
                  <button 
                    disabled
                    style={{ 
                      padding: '14px 32px', 
                      background: '#ccc', 
                      color: '#666', 
                      border: 'none', 
                      borderRadius: '6px',
                      cursor: 'not-allowed'
                    }}
                  >
                    Süre Doldu
                  </button>
                )}
              </div>
            )
          })}

          {requests.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              Şu anda bekleyen talep bulunmamaktadır.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
