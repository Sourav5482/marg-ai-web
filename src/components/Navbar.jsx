import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="fixed top-0 w-full z-50 glass  
     bg-white/20 backdrop-blur-md border-b border-white/10 text-black">
      <div className="container mx-auto px-4 text-black">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-black">
            Marg AI
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 ">
            <Link to="/" className="text-black hover:text-accent transition-colors">{t("home")}</Link>
            <Link to="/features" className="text-black hover:text-accent transition-colors">{t("features")}</Link>
            <Link to="/tracker" className="text-black hover:text-accent transition-colors">{t("tracker")}</Link>
            <Link to="/booking" className="text-black hover:text-accent transition-colors">{t("booking")}</Link>
            <Link to="/dashboard" className="text-black hover:text-accent transition-colors">{t("dashboard")}</Link>
            <Link to="/contact" className="text-black hover:text-accent transition-colors">{t("contact")}</Link>
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
            <button className="transform hover:bg-[#f04242] bg-[#f71a1aee]  hover:scale-105 text-white px-4 py-1 rounded font-semibold  transition-colors">
              {t("sos")}
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
            <Link to="/" className="block text-black hover:text-accent">{t("home")}</Link>
            <Link to="/features" className="block text-black hover:text-accent">{t("features")}</Link>
            <Link to="/tracker" className="block text-black hover:text-accent">{t("tracker")}</Link>
            <Link to="/booking" className="block text-black hover:text-accent">{t("booking")}</Link>
            <Link to="/dashboard" className="block text-black hover:text-accent">{t("dashboard")}</Link>
            <Link to="/contact" className="block text-black hover:text-accent">{t("contact")}</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar