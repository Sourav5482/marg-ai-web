import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Marg-AI</h3>
            <p className="text-gray-400 mb-4">
              Revolutionizing public transport with smart technology and AI-powered solutions.
            </p>
            {/* <div className="flex space-x-4">
              <span className="text-2xl cursor-pointer hover:text-accent">📱</span>
              <span className="text-2xl cursor-pointer hover:text-accent">📧</span>
              <span className="text-2xl cursor-pointer hover:text-accent">🐦</span>
            </div> */}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/tracker" className="text-gray-400 hover:text-white">Bus Tracker</Link></li>
              <li><Link to="/booking" className="text-gray-400 hover:text-white">Book Ticket</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Real-time Tracking</li>
              <li>Smart Ticketing</li>
              <li>Route Planning</li>
              <li>Safety Monitoring</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +91 7863925118</li>
              <li>📧 support@marg-ai.com</li>
              <li>📍 midnapore, West Bengal</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Marg-AI. All rights reserved. </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer