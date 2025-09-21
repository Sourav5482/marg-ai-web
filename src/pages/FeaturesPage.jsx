import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FeaturesPage = () => {
  const featuresRef = useRef(null)

  useEffect(() => {
    const features = featuresRef.current.querySelectorAll('.feature-card')
    
    features.forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
           
          }
        }
      )
    })

    // Hero animation
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const features = [
    {
      icon: '📍',
      title: 'Real-time Bus Tracking',
      description: 'Track buses in real-time with GPS precision and get accurate location updates every few seconds.',
      benefits: ['Live GPS tracking', 'Route visualization', 'Stop-by-stop updates']
    },
    {
      icon: '🎯',
      title: 'ETA Prediction',
      description: 'AI-powered arrival time predictions based on traffic patterns, route conditions, and historical data.',
      benefits: ['Traffic-aware predictions', 'Dynamic updates', 'Historical accuracy']
    },
    {
      icon: '👥',
      title: 'Crowd Density Estimation',
      description: 'Know how crowded buses are before boarding with real-time passenger count and comfort levels.',
      benefits: ['Passenger count', 'Comfort levels', 'Alternative suggestions']
    },
    {
      icon: '💳',
      title: 'Smart Digital Ticketing',
      description: 'Digital tickets with QR codes and NFC validation for seamless, contactless boarding experience.',
      benefits: ['QR/NFC validation', 'Digital wallet integration', 'Instant booking']
    },
    {
      icon: '⭐',
      title: 'Passenger Rating System',
      description: 'Rate and review your journey experience to help improve service quality and driver performance.',
      benefits: ['Journey ratings', 'Driver feedback', 'Service improvement']
    },
    {
      icon: '🚨',
      title: 'Safety Monitoring',
      description: 'Advanced driver behavior monitoring with overspeed alerts and emergency response system.',
      benefits: ['Driver monitoring', 'Emergency alerts', 'Safety reports']
    },
    {
      icon: '🗣️',
      title: 'Multi-language Support',
      description: 'Full support for English, Hindi, and Bengali to serve diverse communities effectively.',
      benefits: ['3 languages', 'Cultural adaptation', 'Inclusive design']
    },
    {
      icon: '📱',
      title: 'RFID/NFC Integration',
      description: 'Contactless boarding and payment system with RFID/NFC technology for quick transactions.',
      benefits: ['Contactless payment', 'Quick boarding', 'Secure transactions']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="hero-title text-5xl font-bold text-gray-800 mb-6">
            Revolutionary Features
          </h1>
          <p className="hero-subtitle text-xl text-gray-700 max-w-3xl mx-auto">
            Discover how Marg-AI transforms public transportation with cutting-edge technology, 
            smart analytics, and user-centric design for safer, more efficient commuting.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-white shadow-md p-8 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-5xl flex-shrink-0">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="text-blue-500">✓</span>
                        <span className="text-gray-600/80 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Technical Excellence</h2>
            <p className="text-gray-600/80 max-w-2xl mx-auto">
              Built with modern technologies for reliability, scalability, and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">IoT Integration</h3>
              <p className="text-gray-600/80">Sensors, GPS modules, and real-time data collection</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI Analytics</h3>
              <p className="text-gray-600/80">Machine learning for predictions and optimization</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cloud Infrastructure</h3>
              <p className="text-gray-600/80">Scalable, secure, and reliable cloud services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage