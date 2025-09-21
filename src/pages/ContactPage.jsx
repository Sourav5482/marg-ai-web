import React, { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '', email: '', phone: '', subject: '', message: '', category: 'general'
        })
      }, 3000)
    }, 1500)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone Support',
      details: ['+91 7863925118', '+91 7430925118'],
      description: 'Available 24/7 for emergencies'
    },
    {
      icon: '📧',
      title: 'Email Support',
      details: ['support@marg-ai.com', 'emergency@marg-ai.com'],
      description: 'Response within 2-4 hours'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: ['Available on website', 'WhatsApp: +91 98765 43210'],
      description: 'Instant support during business hours'
    }
  ]

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'emergency', label: 'Emergency Report' },
    { value: 'partnership', label: 'Business Partnership' }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-lg text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600/80 mb-6">
              Thank you for contacting us. We've received your message and will get back to you within 24 hours.
            </p>
            <div className="bg-gray-200 p-4 rounded-lg">
              <p className="text-gray-500 text-sm">
                For urgent matters, please call our emergency hotline at +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600/80 max-w-2xl mx-auto">
              Have questions about Marg-AI? Need technical support? We're here to help you 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white shadow-md p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 mb-2 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-800 mb-2 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 mb-2 font-semibold">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value} className="text-gray-800">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-800 mb-2 font-semibold">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">Message *</label>
                  <textarea
                    required
                    rows="6"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  <p className="text-gray-400 text-sm mt-1">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">⭮</span>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">{info.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-gray-800 font-semibold mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 mb-1">{detail}</p>
                        ))}
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🚨</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Support</h3>
                    <p className="text-gray-700 mb-3">
                      For immediate assistance during emergencies or safety concerns:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-red-500">📞</span>
                        <span className="text-gray-800 font-semibold">Emergency Hotline: +91 98765 43210</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-500">📧</span>
                        <span className="text-gray-800">emergency@marg-ai.com</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">Available 24/7, 365 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-1">How do I track my bus in real-time?</h4>
                    <p className="text-gray-600/80 text-sm">Visit the Bus Tracker page and select your route to see live locations and ETAs.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-1">Can I get a refund for my ticket?</h4>
                    <p className="text-gray-600/80 text-sm">Refunds are available up to 2 hours before departure. Contact support for assistance.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-1">What languages does Marg-AI support?</h4>
                    <p className="text-gray-600/80 text-sm">Currently supporting English, Hindi (हिंदी), and Bengali (বাংলা).</p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-800 font-semibold mb-1">How do I report a safety issue?</h4>
                    <p className="text-gray-600/80 text-sm">Use the emergency contact number or select "Emergency Report" in the contact form.</p>
                  </div>
                </div>
                
                <button className="mt-4 text-blue-500 hover:text-blue-600 transition-colors text-sm">
                  View All FAQs →
                </button>
              </div>

              {/* Office Hours */}
              <div className="bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Office Hours</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Monday - Friday:</span>
                    <span className="text-gray-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Saturday:</span>
                    <span className="text-gray-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Sunday:</span>
                    <span className="text-red-500">Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Emergency Support:</span>
                    <span className="text-green-500">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Additional Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
            <div className="flex justify-center space-x-6 mb-6">
              <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-all">
                <span className="text-2xl">📱</span>
              </button>
              <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-all">
                <span className="text-2xl">📧</span>
              </button>
              <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-all">
                <span className="text-2xl">🐦</span>
              </button>
              <button className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition-all">
                <span className="text-2xl">📘</span>
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Stay updated with the latest features and announcements from Marg-AI
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage