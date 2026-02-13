'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Building2, FileCheck, Mail, Lock, Phone, Globe, MapPin } from 'lucide-react'

export default function AgencyRegister() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    companyName: '',
    tursabLicense: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
    whatsapp: '',
    website: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!formData.tursabLicense.match(/^[A-Z]-\d{4,5}$/)) {
      setError('Invalid TÜRSAB license format (e.g., A-1234)')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/agency/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          tursabLicense: formData.tursabLicense,
          address: formData.address,
          email: formData.email,
          password: formData.password,
          whatsapp: formData.whatsapp,
          website: formData.website || null,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/verification?type=agency')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navbar showLanguageSelector={false} />
      
      <main className="flex-1 py-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e53e3e] rounded-full mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-[#2d3748] mb-2">
              Agency Registration
            </h1>
            <p className="text-[#718096]">
              Join our platform and connect with travelers worldwide
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="Your Travel Agency Name"
                  />
                </div>
              </div>

              {/* TÜRSAB License */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  TÜRSAB License *
                </label>
                <div className="relative">
                  <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="text"
                    required
                    value={formData.tursabLicense}
                    onChange={(e) => setFormData({ ...formData, tursabLicense: e.target.value.toUpperCase() })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="A-1234"
                  />
                </div>
                <p className="mt-1 text-xs text-[#718096]">
                  Format: A-1234 or B-12345
                </p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#718096]" />
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="Full business address in Turkey"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="agency@example.com"
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="+90 555 123 4567"
                  />
                </div>
              </div>

              {/* Website (Optional) */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  Website (Optional)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#2d3748] mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096]" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e53e3e] focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  Your registration will be reviewed by our team. You will receive an email once approved (typically within 24-48 hours).
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#e53e3e] text-white py-3 rounded-lg font-medium hover:bg-[#c53030] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-[#718096]">
                Already have an account?{' '}
                <a href="/agency/login" className="text-[#e53e3e] hover:underline">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
