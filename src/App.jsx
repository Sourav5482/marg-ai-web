import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import FeaturesPage from './pages/FeaturesPage'
import BusTrackerPage from './pages/BusTrackerPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/tracker" element={<BusTrackerPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App