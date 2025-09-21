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

  const routes = {
    'City Center': { 'Airport': 25, 'Mall': 15, 'Hospital': 20 },
    'Park Street': { 'University': 18, 'Station': 12, 'IT Park': 30 },
    'Central Square': { 'Airport': 20, 'Hospital': 15, 'Mall': 10 },
    'Hospital': { 'University': 22, 'City Center': 20, 'Station': 25 },
    'Station': { 'Mall': 15, 'IT Park': 35, 'Airport': 40 }
  }

  const locations = ['City Center', 'Park Street', 'Central Square', 'Hospital', 'Station', 'Airport', 'Mall', 'University', 'IT Park']

  const calculateFare = () => {
    if (formData.from && formData.to && routes[formData.from]?.[formData.to]) {
      return routes[formData.from][formData.to] * formData.passengers
    }
    return 25 * formData.passengers
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setTicket({
        id: 'TKT' + Date.now(),
        ...formData,
        fare: calculateFare(),
        bookingTime: new Date().toLocaleString(),
        status: 'Active',
        qrCode: '📱'
      })
      setLoading(false)
    }, 1500)
  }

  if (ticket) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">🎫 Ticket Confirmed</h2>

          <div className="border p-4 rounded mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Ticket ID:</span>
              <span className="font-mono">{ticket.id}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Passenger:</span>
              <span>{ticket.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">From:</span>
              <span>{ticket.from}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">To:</span>
              <span>{ticket.to}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Date:</span>
              <span>{ticket.date}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Time:</span>
              <span>{ticket.time || 'Any'}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Passengers:</span>
              <span>{ticket.passengers}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Fare:</span>
              <span>₹{ticket.fare}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Booked: {ticket.bookingTime}</div>
          </div>

          <div className="space-y-2">
            <button onClick={() => window.print()} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Print / Download
            </button>
            <button onClick={() => setTicket(null)} className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">
              Book Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Book Your Ticket</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="w-full p-2 border rounded bg-gray-100 focus:border-blue-500 focus:outline-none"
              placeholder="Enter name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">From *</label>
              <select
                required
                value={formData.from}
                onChange={e => handleInputChange('from', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Origin</option>
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">To *</label>
              <select
                required
                value={formData.to}
                onChange={e => handleInputChange('to', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Destination</option>
                {locations.filter(loc => loc !== formData.from).map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Travel Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => handleInputChange('date', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={e => handleInputChange('time', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Passengers</label>
              <div className="flex items-center border rounded overflow-hidden w-full">
                <button type="button" onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers-1))} className="px-3 bg-gray-200">-</button>
                <span className="flex-1 text-center">{formData.passengers}</span>
                <button type="button" onClick={() => handleInputChange('passengers', Math.min(6, formData.passengers+1))} className="px-3 bg-gray-200">+</button>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Payment</label>
              <select
                value={formData.payment}
                onChange={e => handleInputChange('payment', e.target.value)}
                className="w-full p-2 border rounded bg-gray-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="wallet">Wallet</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
          </div>

          {formData.from && formData.to && (
            <div className="bg-gray-200 p-2 rounded flex justify-between font-semibold">
              <span>Total Fare:</span>
              <span>₹{calculateFare()}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Book Ticket - ₹${calculateFare()}`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingPage
