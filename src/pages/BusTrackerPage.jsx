import React, { useState, useEffect } from 'react'
import DirectionsMap from '../components/DirectionsMap'
import { LoadScript } from "@react-google-maps/api";
const BusTrackerPage = () => {
  const [selectedBus, setSelectedBus] = useState(null)
  const [busData, setBusData] = useState([])
  const [filter, setFilter] = useState('all')

  // Mock bus data with dynamic updates
  useEffect(() => {
    const initialBusData = [
      { 
        id: 'BUS001', 
        route: 'City Center - Airport', 
        location: 'Park Street', 
        eta: 5, 
        crowdLevel: 'Medium', 
        fare: '₹25',
        driver: 'Raj Kumar',
        speed: 42,
        rating: 4.2,
        status: 'On Route'
      },
      { 
        id: 'BUS002', 
        route: 'Station - Mall', 
        location: 'Central Square', 
        eta: 12, 
        crowdLevel: 'High', 
        fare: '₹15',
        driver: 'Amit Singh',
        speed: 38,
        rating: 4.5,
        status: 'On Route'
      },
      { 
        id: 'BUS003', 
        route: 'Hospital - University', 
        location: 'Medical Road', 
        eta: 8, 
        crowdLevel: 'Low', 
        fare: '₹20',
        driver: 'Suresh Das',
        speed: 35,
        rating: 4.1,
        status: 'On Route'
      },
      { 
        id: 'BUS004', 
        route: 'Market - IT Park', 
        location: 'Tech Hub', 
        eta: 15, 
        crowdLevel: 'Medium', 
        fare: '₹30',
        driver: 'Vikash Roy',
        speed: 40,
        rating: 4.3,
        status: 'Delayed'
      }
    ]
    setBusData(initialBusData)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setBusData(prevData => 
        prevData.map(bus => ({
          ...bus,
          eta: Math.max(1, bus.eta - 1 + Math.floor(Math.random() * 3) - 1),
          speed: Math.max(20, Math.min(60, bus.speed + Math.floor(Math.random() * 10) - 5)),
          location: bus.location // In real app, this would update based on GPS
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredBuses = busData.filter(bus => {
    if (filter === 'all') return true
    if (filter === 'low') return bus.crowdLevel === 'Low'
    if (filter === 'medium') return bus.crowdLevel === 'Medium'
    if (filter === 'high') return bus.crowdLevel === 'High'
    return true
  })

  const getCrowdColor = (level) => {
    switch(level) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Route': return 'text-green-500'
      case 'Delayed': return 'text-red-500'
      case 'Stopped': return 'text-yellow-500'
      default: return 'text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">Live Bus Tracker</h1>
          
          {/* Filters */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white shadow-md text-gray-800'}`}
            >
              All Buses
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded ${filter === 'low' ? 'bg-green-500 text-white' : 'bg-white shadow-md text-gray-800'}`}
            >
              Low Crowd
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded ${filter === 'medium' ? 'bg-yellow-500 text-white' : 'bg-white shadow-md text-gray-800'}`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded ${filter === 'high' ? 'bg-red-500 text-white' : 'bg-white shadow-md text-gray-800'}`}
            >
              High Crowd
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
              <LoadScript googleMapsApiKey={"AIzaSyDkfq3bNrNfPtzPIGoFniZ_14AOuROKqzY"}>
      <DirectionsMap />
    </LoadScript>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white shadow-md p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-500">{busData.length}</div>
                <div className="text-gray-500 text-sm">Active Buses</div>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-500">
                  {busData.filter(b => b.status === 'On Route').length}
                </div>
                <div className="text-gray-500 text-sm">On Schedule</div>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-500">
                  {Math.round(busData.reduce((acc, bus) => acc + bus.rating, 0) / busData.length * 10) / 10}★
                </div>
                <div className="text-gray-500 text-sm">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Active Buses ({filteredBuses.length})
            </h2>
            
            <div className="max-h-96 overflow-y-auto space-y-4">
              {filteredBuses.map(bus => (
                <div 
                  key={bus.id} 
                  className={`bg-white shadow-md p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-all ${
                    selectedBus?.id === bus.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedBus(bus)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">{bus.id}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-blue-500 font-semibold">{bus.eta} min</span>
                      <span className={`text-xs ${getStatusColor(bus.status)}`}>●</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-2">{bus.route}</p>
                  <p className="text-gray-500 text-xs mb-3">📍 {bus.location}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs text-white ${getCrowdColor(bus.crowdLevel)}`}>
                      {bus.crowdLevel}
                    </span>
                    <span className="text-gray-500 text-xs">{bus.speed} km/h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Bus Details */}
        {selectedBus && (
          <div className="mt-8 bg-white shadow-md p-6 rounded-lg">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Bus Details - {selectedBus.id}</h3>
              <span className={`text-lg font-semibold ${getStatusColor(selectedBus.status)}`}>
                {selectedBus.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">{selectedBus.eta}</div>
                <div className="text-gray-500">Minutes Away</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{selectedBus.fare}</div>
                <div className="text-gray-500">Fare</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">{selectedBus.crowdLevel}</div>
                <div className="text-gray-500">Crowd Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">{selectedBus.rating}★</div>
                <div className="text-gray-500">Rating</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-200 p-4 rounded">
                <h4 className="text-gray-800 font-semibold mb-2">Driver Info</h4>
                <p className="text-gray-600/80">{selectedBus.driver}</p>
                <p className="text-gray-500 text-sm">Speed: {selectedBus.speed} km/h</p>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h4 className="text-gray-800 font-semibold mb-2">Route</h4>
                <p className="text-gray-600/80">{selectedBus.route}</p>
                <p className="text-gray-500 text-sm">Current: {selectedBus.location}</p>
              </div>
              <div className="bg-gray-200 p-4 rounded">
                <h4 className="text-gray-800 font-semibold mb-2">Actions</h4>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors mr-2">
                  Get Notifications
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Section */}
        <div className="mt-8 bg-white shadow-md p-6 rounded-lg border-l-4 border-red-500">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🚨</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Services</h3>
              <p className="text-gray-600/80 mb-3">Need immediate assistance? Contact emergency services or report safety issues.</p>
              <div className="flex space-x-3">
                <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition-colors">
                  Emergency Call
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-600 transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusTrackerPage