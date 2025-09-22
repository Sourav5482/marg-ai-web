import React, { useState } from 'react'

const TICKET_KEY = 'bus_tickets_v2';
const USER_KEY = 'bus_ticket_user';

// Store all today's tickets, remove tickets older than 24h
function storeTicket(ticketObj) {
  const now = Date.now();
  let tickets = JSON.parse(localStorage.getItem(TICKET_KEY) || '[]');
  // Remove tickets older than 24h
  tickets = tickets.filter(t => now - t.timestamp < 24 * 60 * 60 * 1000);
  tickets.push({ ...ticketObj, timestamp: now });
  localStorage.setItem(TICKET_KEY, JSON.stringify(tickets));
}

// Get all today's tickets for a user
function getStoredTickets(username) {
  const now = Date.now();
  let tickets = JSON.parse(localStorage.getItem(TICKET_KEY) || '[]');
  // Only tickets from last 24h and for this user
  tickets = tickets.filter(
    t => now - t.timestamp < 24 * 60 * 60 * 1000 && t.username === username
  );
  return tickets;
}

function getLoggedInUser() {
  return localStorage.getItem(USER_KEY) || "";
}

function setLoggedInUser(username) {
  localStorage.setItem(USER_KEY, username);
}

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
  const [showTicket, setShowTicket] = useState(false)
  const [allTickets, setAllTickets] = useState([])
  const [user, setUser] = useState(getLoggedInUser())
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState("")

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

  // Dummy login: username required, password ignored
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginForm.username.trim()) {
      setLoginError("Username required");
      return;
    }
    setLoggedInUser(loginForm.username.trim());
    setUser(loginForm.username.trim());
    setLoginError("");
  };

  const handleLogout = () => {
    setLoggedInUser("");
    setUser("");
    setAllTickets([]);
    setTicket(null);
    setShowTicket(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const newTicket = {
        id: 'TKT' + Date.now(),
        ...formData,
        fare: calculateFare(),
        bookingTime: new Date().toLocaleString(),
        status: 'Active',
        qrCode: '📱',
        username: user
      }
      setTicket(newTicket)
      storeTicket(newTicket)
      setLoading(false)
      setShowTicket(true)
      setAllTickets(getStoredTickets(user))
    }, 1500)
  }

  const handleShowTicket = () => {
    const stored = getStoredTickets(user);
    if (stored.length > 0) {
      setAllTickets(stored)
      setShowTicket(true)
      setTicket(null)
    } else {
      alert("No ticket found. Please book a ticket first.");
    }
  }

  const handleBookAnother = () => {
    setTicket(null)
    setShowTicket(false)
    setFormData({
      name: '',
      from: '',
      to: '',
      date: '',
      time: '',
      passengers: 1,
      payment: 'card'
    })
  }

  // Login UI
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-xs w-full bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Login to Book Tickets</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={e => setLoginForm(f => ({ ...f, username: e.target.value }))}
                className="w-full p-2 border rounded bg-gray-50 focus:border-blue-500 focus:outline-none"
                placeholder="Enter username"
                autoFocus
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                className="w-full p-2 border rounded bg-gray-50 focus:border-blue-500 focus:outline-none"
                placeholder="Enter any password"
              />
            </div>
            {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Show all tickets for today (last 24h) - Show more details and a dummy QR code
  if (showTicket && allTickets.length > 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white shadow-xl rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-center">🎫 Your Tickets (last 24h)</h2>
            <button onClick={handleLogout} className="text-sm text-blue-600 underline">Logout</button>
          </div>
          <div className="space-y-4 mb-4">
            {allTickets.map((ticket, idx) => (
              <div
                key={ticket.id}
                className="border rounded-lg p-4 bg-blue-50 flex items-center justify-between shadow-sm"
                style={{ minHeight: 110 }}
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-700 mb-1 text-lg">
                    {ticket.from} <span className="mx-2 text-blue-600">→</span> {ticket.to}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Ticket #{ticket.id.slice(-6)}</div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Date:</span> {ticket.date || '-'}
                    <span className="mx-2">|</span>
                    <span className="font-semibold">Time:</span> {ticket.time || 'Any'}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Passenger:</span> {ticket.name}
                    <span className="mx-2">|</span>
                    <span className="font-semibold">Qty:</span> {ticket.passengers}
                  </div>
                  <div className="text-xs text-gray-400">{ticket.bookingTime.split(',')[0]}</div>
                </div>
                <div className="flex flex-col items-end ml-4">
                  {/* Dummy black QR code */}
                  <div className="mb-2 bg-white p-1 rounded shadow">
                    <svg width="56" height="56" viewBox="0 0 56 56">
                      <rect x="0" y="0" width="56" height="56" rx="8" fill="#fff"/>
                      <rect x="6" y="6" width="14" height="14" fill="#111"/>
                      <rect x="36" y="6" width="14" height="14" fill="#111"/>
                      <rect x="6" y="36" width="14" height="14" fill="#111"/>
                      <rect x="24" y="24" width="8" height="8" fill="#111"/>
                      <rect x="40" y="40" width="6" height="6" fill="#111"/>
                      <rect x="18" y="40" width="4" height="4" fill="#111"/>
                      <rect x="32" y="18" width="4" height="4" fill="#111"/>
                    </svg>
                  </div>
                  <div className="text-lg font-bold text-blue-700">₹{ticket.fare}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <button onClick={() => window.print()} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Print / Download
            </button>
            <button onClick={handleBookAnother} className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">
              Book Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Single ticket view (after booking)
  if (showTicket && ticket) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-center">🎫 Ticket Confirmed</h2>
            <button onClick={handleLogout} className="text-sm text-blue-600 underline">Logout</button>
          </div>
          <div className="border rounded-lg p-4 mb-4 bg-gray-50">
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
              <span>{ticket.date || '-'}</span>
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
            <button onClick={handleBookAnother} className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">
              Book Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Booking Form UI
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-blue-700">Welcome, {user}</span>
          <button onClick={handleLogout} className="text-sm text-blue-600 underline">Logout</button>
        </div>
        {/* book ticket & show ticket btn */}
        <div className="flex justify-center mb-6  space-x-5 ">
          <button
            className="w-full bg-[#faab4aee] text-white py-2 rounded-3xl font-semibold  transition disabled:opacity-50"
            onClick={() => setShowTicket(false)}
            type="button"
          >
            Book Ticket
          </button>
          <button
            className="w-full bg-[#faab4aa4] text-white py-2 rounded-3xl font-semibold  transition disabled:opacity-50"
            onClick={handleShowTicket}
            type="button"
          >
            Show Ticket
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Book Your Ticket</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="w-full p-2 border rounded bg-gray-50 focus:border-blue-500 focus:outline-none"
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
                className="w-full p-2 border rounded bg-gray-50 focus:border-blue-500 focus:outline-none"
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
                className="w-full p-2 border rounded bg-gray-50 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select Destination</option>
                {locations.filter(loc => loc !== formData.from).map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            {/* Date/time pickers can be added here */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Passengers</label>
              <div className="flex items-center border rounded overflow-hidden w-full bg-gray-50">
                <button type="button" onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers-1))} className="px-3 bg-gray-100">-</button>
                <span className="flex-1 text-center">{formData.passengers}</span>
                <button type="button" onClick={() => handleInputChange('passengers', Math.min(6, formData.passengers+1))} className="px-3 bg-gray-100">+</button>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Payment</label>
              <select
                value={formData.payment}
                onChange={e => handleInputChange('payment', e.target.value)}
                className="w-full p-2 border rounded bg-gray-50 focus:border-blue-500 focus:outline-none"
              >
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="wallet">Wallet</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
          </div>
          {formData.from && formData.to && (
            <div className="bg-blue-50 p-2 rounded flex justify-between font-semibold text-blue-700">
              <span>Total Fare:</span>
              <span>₹{calculateFare()}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#faab4aee] text-white py-2 rounded font-semibold hover:bg-[#faab4abb] disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Book Ticket - ₹${calculateFare()}`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingPage