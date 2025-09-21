import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState('EN')

  return (
    <nav className="fixed top-0 w-full z-50 glass 
     bg-white/20 backdrop-blur-md border-b border-white/10 text-black">
      <div className="container mx-auto px-4 text-black">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-black">
            Marg-AI
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 ">
            <Link to="/" className="text-black hover:text-accent transition-colors">Home</Link>
            <Link to="/features" className="text-black hover:text-accent transition-colors">Features</Link>
            <Link to="/tracker" className="text-black hover:text-accent transition-colors">Bus Tracker</Link>
            <Link to="/booking" className="text-black hover:text-accent transition-colors">Ticket</Link>
            <Link to="/dashboard" className="text-black hover:text-accent transition-colors">Dashboard</Link>
            <Link to="/contact" className="text-black hover:text-accent transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-black  ">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/10 text-black px-3 py-1 rounded border border-white/20"
            >
              <option value="EN" className='text-black '>EN</option>
              <option value="HI" className='text-black '>हिं</option>
              <option value="BN" className='text-black '>বাং</option>
            </select>
            <button className="transform hover:bg-[#faac4a] bg-[#fd9f2dee]  hover:scale-105 text-white px-4 py-1 rounded font-semibold  transition-colors">
              SOS
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-black hover:text-accent">Home</Link>
            <Link to="/features" className="block text-black hover:text-accent">Features</Link>
            <Link to="/tracker" className="block text-black hover:text-accent">Bus Tracker</Link>
            <Link to="/booking" className="block text-black hover:text-accent">Ticket</Link>
            <Link to="/dashboard" className="block text-black hover:text-accent">Dashboard</Link>
            <Link to="/contact" className="block text-black hover:text-accent">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar