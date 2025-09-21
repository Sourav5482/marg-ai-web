import React, { useState } from 'react'

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: 1,
    payment: 'card'
  })
  
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Route data with fare calculation
  const routes = {
    'City Center': { 'Airport': 25, 'Mall': 15, 'Hospital': 20 },
    'Park Street': { 'University': 18, 'Station': 12, 'IT Park': 30 },
    'Central Square': { 'Airport': 20, 'Hospital': 15, 'Mall': 10 },
    'Hospital': { 'University': 22, 'City Center': 20, 'Station': 25 },
    'Station': { 'Mall': 15, 'IT Park': 35, 'Airport': 40 }
  }
  
  const locations = ['City Center', 'Park Street', 'Central Square', 'Hospital', 'Station', 'Airport', 'Mall', 'University', 'IT Park']
  
  const calculateFare = () => {
    if (formData.from && formData.to && routes[formData.from] && routes[formData.from][formData.to]) {
      return routes[formData.from][formData.to] * formData.passengers
    }
    return 25 * formData.passengers // Default fare
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate booking process
    setTimeout(() => {
      const newTicket = {
        id: 'TKT' + Date.now(),
        ...formData,
        fare: calculateFare(),
        bookingTime: new Date().toLocaleString(),
        qrCode: '📱',
        status: 'Active'
      }
      setTicket(newTicket)
      setLoading(false)
    }, 2000)
  }

  const handleInputChange = (field, value) => {
    console.log(field, "and",value );
    
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // If ticket is booked, show ticket
  if (ticket) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Digital Ticket */}
            <div className="bg-white shadow-md p-8 rounded-lg text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🎫 Ticket Booked Successfully!</h2>
              
              <div className="bg-white p-6 rounded-lg mb-6 text-left">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Marg-AI Ticket</h3>
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">ACTIVE</span>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">📱</div>
                  <p className="text-gray-600 text-xs">QR Code for Validation</p>
                </div>
                
                <div className="space-y-2 text-gray-800 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Ticket ID:</span>
                    <span className="font-mono">{ticket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Passenger:</span>
                    <span>{ticket.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">From:</span>
                    <span>{ticket.from}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">To:</span>
                    <span>{ticket.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>{ticket.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Time:</span>
                    <span>{ticket.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Passengers:</span>
                    <span>{ticket.passengers}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Fare:</span>
                    <span>₹{ticket.fare}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Booked: {ticket.bookingTime}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => window.print()}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Download/Print Ticket
                </button>
                <button 
                  onClick={() => setTicket(null)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Book Another Ticket
                </button>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-2">📋 Instructions</h3>
              <ul className="text-gray-600/80 text-sm space-y-1">
                <li>• Show QR code to driver for validation</li>
                <li>• Keep ticket until journey completion</li>
                <li>• Contact support for any issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Ticket</h1>
            <p className="text-gray-600/80">Quick and easy digital ticket booking</p>
          </div>
          
          <div className="bg-white shadow-md p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Passenger Details */}
              <div>
                <label className="block text-gray-800 mb-2 font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Route Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">From *</label>
                  <select
                    required
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)} //stores the value of the selected option in formData.from
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Origin</option>
                    {locations.map(location => (
                      <option key={location} value={location} className="text-gray-800">
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">To *</label>
                  <select
                    required
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Destination</option>
                    {locations.filter(loc => loc !== formData.from).map(location => (
                      <option key={location} value={location} className="text-gray-800">
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">Travel Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">Preferred Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Passengers and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">Passengers</label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num} className="text-gray-800">{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-800 mb-2 font-semibold">Payment Method</label>
                  <select
                    value={formData.payment}
                    onChange={(e) => handleInputChange('payment', e.target.value)}
                    className="w-full p-3 rounded bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="card" className="text-gray-800">Credit/Debit Card</option>
                    <option value="upi" className="text-gray-800">UPI</option>
                    <option value="wallet" className="text-gray-800">Digital Wallet</option>
                    <option value="netbanking" className="text-gray-800">Net Banking</option>
                  </select>
                </div>
              </div>

              {/* Fare Display */}
              {formData.from && formData.to && (
                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-gray-800">
                    <span>Total Fare ({formData.passengers} passenger{formData.passengers > 1 ? 's' : ''}):</span>
                    <span className="text-2xl font-bold text-blue-500">₹{calculateFare()}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⭮</span>
                    Processing...
                  </span>
                ) : (
                  `Book Ticket - ₹${calculateFare()}`
                )}
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-2">💳 Secure Payment</h3>
              <p className="text-gray-600/80 text-sm">All transactions are encrypted and secure</p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-2">📱 Digital Ticket</h3>
              <p className="text-gray-600/80 text-sm">No need to print - show on your phone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage