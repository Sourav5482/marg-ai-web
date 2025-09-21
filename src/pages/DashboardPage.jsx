import React, { useState, useEffect } from 'react'

const DashboardPage = () => {
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'delay', 
      message: 'BUS001 delayed by 10 minutes due to heavy traffic on Park Street', 
      time: '2 min ago',
      priority: 'medium',
      resolved: false
    },
    { 
      id: 2, 
      type: 'speed', 
      message: 'Driver overspeeding alert on Route 15 - Speed: 65 km/h', 
      time: '5 min ago',
      priority: 'high',
      resolved: false
    },
    { 
      id: 3, 
      type: 'crowd', 
      message: 'High crowd density detected on BUS002 - 85% capacity', 
      time: '8 min ago',
      priority: 'low',
      resolved: false
    },
    {
      id: 4,
      type: 'maintenance',
      message: 'BUS003 requires scheduled maintenance in 2 days',
      time: '15 min ago',
      priority: 'medium',
      resolved: false
    },
    {
      id: 5,
      type: 'fuel',
      message: 'BUS004 fuel level critical - 15% remaining',
      time: '20 min ago',
      priority: 'high',
      resolved: false
    }
  ])

  const [busData, setBusData] = useState([
    {
      id: 'BUS001',
      route: 'City Center - Airport',
      location: 'Park Street',
      status: 'Delayed',
      eta: '15 min',
      crowdLevel: 'Medium',
      rating: 4.2,
      driver: 'Raj Kumar',
      speed: 42,
      fuelLevel: 75,
      lastMaintenance: '2024-01-15',
      passengerCount: 28,
      maxCapacity: 40,
      temperature: 24,
      engineStatus: 'Normal'
    },
    {
      id: 'BUS002',
      route: 'Station - Mall',
      location: 'Central Square',
      status: 'On Route',
      eta: '8 min',
      crowdLevel: 'High',
      rating: 4.5,
      driver: 'Amit Singh',
      speed: 38,
      fuelLevel: 60,
      lastMaintenance: '2024-01-10',
      passengerCount: 35,
      maxCapacity: 40,
      temperature: 26,
      engineStatus: 'Normal'
    },
    {
      id: 'BUS003',
      route: 'Hospital - University',
      location: 'Medical Road',
      status: 'On Route',
      eta: '12 min',
      crowdLevel: 'Low',
      rating: 4.1,
      driver: 'Suresh Das',
      speed: 35,
      fuelLevel: 90,
      lastMaintenance: '2024-01-20',
      passengerCount: 12,
      maxCapacity: 40,
      temperature: 23,
      engineStatus: 'Normal'
    },
    {
      id: 'BUS004',
      route: 'Market - IT Park',
      location: 'Tech Hub',
      status: 'Refueling',
      eta: '25 min',
      crowdLevel: 'Medium',
      rating: 4.3,
      driver: 'Vikash Roy',
      speed: 0,
      fuelLevel: 15,
      lastMaintenance: '2024-01-05',
      passengerCount: 0,
      maxCapacity: 40,
      temperature: 22,
      engineStatus: 'Stopped'
    },
    {
      id: 'BUS005',
      route: 'Airport - Downtown',
      location: 'Terminal 1',
      status: 'On Route',
      eta: '6 min',
      crowdLevel: 'Medium',
      rating: 4.4,
      driver: 'Rahul Sharma',
      speed: 45,
      fuelLevel: 80,
      lastMaintenance: '2024-01-18',
      passengerCount: 22,
      maxCapacity: 40,
      temperature: 25,
      engineStatus: 'Normal'
    }
  ])

  const [stats, setStats] = useState({
    totalBuses: 0,
    onRoute: 0,
    delayed: 0,
    avgRating: 0,
    totalPassengers: 0,
    revenueToday: 0,
    fuelEfficiency: 0,
    onTimePerformance: 0
  })

  const [selectedTimeRange, setSelectedTimeRange] = useState('today')
  const [refreshInterval, setRefreshInterval] = useState(null)

  // Update stats when busData changes
  useEffect(() => {
    const totalBuses = busData.length
    const onRoute = busData.filter(bus => bus.status === 'On Route').length
    const delayed = busData.filter(bus => bus.status === 'Delayed').length
    const avgRating = busData.reduce((acc, bus) => acc + bus.rating, 0) / totalBuses
    const totalPassengers = busData.reduce((acc, bus) => acc + bus.passengerCount, 0)
    
    setStats({
      totalBuses,
      onRoute,
      delayed,
      avgRating: Math.round(avgRating * 10) / 10,
      totalPassengers,
      revenueToday: 15750,
      fuelEfficiency: 12.5,
      onTimePerformance: Math.round(((totalBuses - delayed) / totalBuses) * 100)
    })
  }, [busData])

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBusData(prevData => 
        prevData.map(bus => {
          const newSpeed = Math.max(0, Math.min(60, bus.speed + Math.floor(Math.random() * 10) - 5))
          const fuelChange = newSpeed > 0 ? Math.max(0, bus.fuelLevel - 0.5) : bus.fuelLevel
          
          return {
            ...bus,
            speed: newSpeed,
            fuelLevel: fuelChange,
            temperature: Math.max(20, Math.min(30, bus.temperature + Math.random() * 2 - 1))
          }
        })
      )

      // Occasionally add new alerts
      if (Math.random() > 0.8) {
        const newAlert = {
          id: Date.now(),
          type: ['delay', 'speed', 'crowd', 'maintenance'][Math.floor(Math.random() * 4)],
          message: 'New system alert generated',
          time: 'Just now',
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          resolved: false
        }
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]) // Keep only 10 alerts
      }
    }, 5000)

    setRefreshInterval(interval)
    return () => clearInterval(interval)
  }, [])

  const resolveAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ))
  }

  const removeAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const addTestAlert = () => {
    const testAlert = {
      id: Date.now(),
      type: 'test',
      message: 'Test alert generated from dashboard',
      time: 'Just now',
      priority: 'low',
      resolved: false
    }
    setAlerts([testAlert, ...alerts])
  }

  const getAlertIcon = (type) => {
    switch(type) {
      case 'delay': return '⏰'
      case 'speed': return '🚨'
      case 'crowd': return '👥'
      case 'maintenance': return '🔧'
      case 'fuel': return '⛽'
      case 'test': return '🧪'
      default: return '📢'
    }
  }

  const getAlertColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500 bg-red-100'
      case 'medium': return 'border-yellow-500 bg-yellow-100'
      case 'low': return 'border-blue-500 bg-blue-100'
      default: return 'border-gray-500 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'On Route': return 'text-green-500'
      case 'Delayed': return 'text-red-500'
      case 'Stopped': return 'text-yellow-500'
      case 'Maintenance': return 'text-blue-500'
      case 'Refueling': return 'text-orange-500'
      default: return 'text-gray-800'
    }
  }

  const getCrowdColor = (level) => {
    switch(level) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getFuelLevelColor = (level) => {
    if (level <= 20) return 'text-red-500'
    if (level <= 50) return 'text-yellow-500'
    return 'text-green-500'
  }

  const emergencyStopAll = () => {
    setBusData(prevData => 
      prevData.map(bus => ({
        ...bus,
        status: 'Emergency Stop',
        speed: 0,
        engineStatus: 'Emergency'
      }))
    )
    
    const emergencyAlert = {
      id: Date.now(),
      type: 'emergency',
      message: 'EMERGENCY: All buses have been stopped by control center',
      time: 'Just now',
      priority: 'high',
      resolved: false
    }
    setAlerts([emergencyAlert, ...alerts])
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Control Dashboard</h1>
            <p className="text-gray-500">Real-time fleet monitoring and management</p>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600/80 text-sm">Time Range:</span>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded border border-gray-300 text-sm"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="text-gray-400 text-sm">
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Refresh Data
              </button>
              <button 
                onClick={addTestAlert}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Test Alert
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{stats.totalBuses}</div>
            <div className="text-gray-500 text-sm">Total Buses</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">{stats.onRoute}</div>
            <div className="text-gray-500 text-sm">On Route</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">{stats.delayed}</div>
            <div className="text-gray-500 text-sm">Delayed</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">{stats.avgRating}★</div>
            <div className="text-gray-500 text-sm">Avg Rating</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">{stats.totalPassengers}</div>
            <div className="text-gray-500 text-sm">Passengers</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-800 mb-1">₹{stats.revenueToday}</div>
            <div className="text-gray-500 text-sm">Revenue</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">{stats.fuelEfficiency}</div>
            <div className="text-gray-500 text-sm">km/l</div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">{stats.onTimePerformance}%</div>
            <div className="text-gray-500 text-sm">On Time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Bus Status Cards */}
          <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Fleet Status</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-500 text-sm">Active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-500 text-sm">Issues</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {busData.map(bus => (
                <div key={bus.id} className="bg-white shadow-md p-6 rounded-lg hover:bg-gray-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{bus.id}</h3>
                      <p className="text-gray-600/80">{bus.route}</p>
                      <p className="text-gray-400 text-sm">Driver: {bus.driver}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-semibold ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                      <p className="text-gray-500 text-sm">ETA: {bus.eta}</p>
                      <p className="text-gray-400 text-xs">📍 {bus.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm mb-4">
                    <div className="text-center">
                      <span className="text-gray-500 block">Speed</span>
                      <p className="text-gray-800 font-semibold">{bus.speed} km/h</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Fuel</span>
                      <p className={`font-semibold ${getFuelLevelColor(bus.fuelLevel)}`}>
                        {bus.fuelLevel}%
                      </p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Passengers</span>
                      <p className="text-gray-800 font-semibold">{bus.passengerCount}/{bus.maxCapacity}</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Rating</span>
                      <p className="text-gray-800 font-semibold">{bus.rating}★</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Temp</span>
                      <p className="text-gray-800 font-semibold">{Math.round(bus.temperature)}°C</p>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-500 block">Engine</span>
                      <p className={`font-semibold text-xs ${
                        bus.engineStatus === 'Normal' ? 'text-green-500' : 
                        bus.engineStatus === 'Emergency' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {bus.engineStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded text-xs text-white ${getCrowdColor(bus.crowdLevel)}`}>
                        {bus.crowdLevel} Crowd
                      </span>
                      <span className="text-gray-400 text-xs">
                        Last Service: {bus.lastMaintenance}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                        Details
                      </button>
                      <button className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition-colors">
                        Contact Driver
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Alerts Panel */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Live Alerts</h2>
              <span className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold">
                {alerts.filter(alert => !alert.resolved).length} Active
              </span>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {alerts.filter(alert => !alert.resolved).map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.priority)} hover:bg-gray-200 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl flex-shrink-0">{getAlertIcon(alert.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 mb-2 text-sm leading-relaxed">{alert.message}</p>
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="text-gray-400">{alert.time}</span>
                          <span className={`px-2 py-1 rounded ${
                            alert.priority === 'high' ? 'bg-red-500' :
                            alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                          } text-white font-semibold`}>
                            {alert.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 ml-2">
                      <button 
                        onClick={() => resolveAlert(alert.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={() => removeAlert(alert.id)}
                        className="text-gray-400 hover:text-red-500 text-xs px-2 py-1"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {alerts.filter(alert => !alert.resolved).length === 0 && (
                <div className="bg-white shadow-md p-6 rounded-lg text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-gray-800 font-semibold">All Clear!</p>
                  <p className="text-gray-400 text-sm">No active alerts at this time</p>
                </div>
              )}
            </div>

            {/* Resolved Alerts Summary */}
            {alerts.filter(alert => alert.resolved).length > 0 && (
              <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-gray-800 font-semibold mb-2">Recently Resolved</h3>
                <div className="space-y-2">
                  {alerts.filter(alert => alert.resolved).slice(0, 3).map(alert => (
                    <div key={alert.id} className="text-xs text-gray-400 flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span className="truncate">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Route Performance Analysis */}
        <div className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Route Performance Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-4 text-center">🚌 Most Popular Routes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600/80 text-sm">City Center - Airport</span>
                  <span className="text-blue-500 font-bold">450</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600/80 text-sm">Station - Mall</span>
                  <span className="text-blue-500 font-bold">380</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '76%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600/80 text-sm">Hospital - University</span>
                  <span className="text-blue-500 font-bold">320</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '64%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-4 text-center">⏰ Peak Hours Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600/80 text-sm">Morning Rush</span>
                  <span className="text-green-500 font-bold">8-10 AM</span>
                </div>
                <div className="text-gray-400 text-xs">Peak: 95% capacity</div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600/80 text-sm">Evening Rush</span>
                  <span className="text-green-500 font-bold">5-7 PM</span>
                </div>
                <div className="text-gray-400 text-xs">Peak: 88% capacity</div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600/80 text-sm">Off-Peak</span>
                  <span className="text-blue-500 font-bold">11-4 PM</span>
                </div>
                <div className="text-gray-400 text-xs">Average: 45% capacity</div>
              </div>
            </div>
            
            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-4 text-center">📊 Efficiency Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600/80 text-sm">On-Time Performance</span>
                    <span className="text-green-500 font-bold">{stats.onTimePerformance}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: `${stats.onTimePerformance}%`}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600/80 text-sm">Fuel Efficiency</span>
                    <span className="text-green-500 font-bold">{stats.fuelEfficiency} km/l</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '83%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600/80 text-sm">Customer Satisfaction</span>
                    <span className="text-green-500 font-bold">{stats.avgRating}★</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '84%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-gray-800 font-semibold mb-4 text-center">💰 Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-500">₹{stats.revenueToday}</div>
                  <div className="text-gray-500 text-sm">Today's Revenue</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Ticket Sales</span>
                    <span className="text-gray-800">₹12,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Digital Passes</span>
                    <span className="text-gray-800">₹2,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600/80">Express Routes</span>
                    <span className="text-gray-800">₹400</span>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-blue-500">₹{stats.revenueToday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Control Center */}
        <div className="bg-white shadow-md p-6 rounded-lg border-l-4 border-red-500 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="text-4xl">🚨</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Emergency Control Center</h3>
                <p className="text-gray-600/80">Monitor and respond to emergency situations across the fleet</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="text-gray-400">Status: All Systems Normal</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-500 text-xs">Online</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={emergencyStopAll}
                className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition-colors text-sm"
              >
                🛑 Emergency Stop All
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded font-semibold hover:bg-yellow-600 transition-colors text-sm">
                📢 Broadcast Alert
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition-colors text-sm">
                📞 Contact Authorities
              </button>
            </div>
          </div>
        </div>

        {/* System Health Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔧 System Health Monitoring</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-200 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">GPS Tracking System</span>
                </div>
                <span className="text-green-500 text-sm">99.8% Uptime</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-200 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">Payment Gateway</span>
                </div>
                <span className="text-green-500 text-sm">100% Uptime</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-200 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-800">Communication Network</span>
                </div>
                <span className="text-yellow-500 text-sm">95.2% Uptime</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-200 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">Database Servers</span>
                </div>
                <span className="text-green-500 text-sm">99.9% Uptime</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-200 rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-800">Maintenance Alert System</span>
                </div>
                <span className="text-red-500 text-sm">87.1% Uptime</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Real-time Analytics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 p-4 rounded text-center">
                <div className="text-2xl font-bold text-blue-500 mb-1">1,247</div>
                <div className="text-gray-500 text-sm">Active Tickets</div>
                <div className="text-green-500 text-xs">↗ +12%</div>
              </div>
              
              <div className="bg-gray-200 p-4 rounded text-center">
                <div className="text-2xl font-bold text-purple-500 mb-1">85</div>
                <div className="text-gray-500 text-sm">Avg Speed (km/h)</div>
                <div className="text-red-500 text-xs">↘ -3%</div>
              </div>
              
              <div className="bg-gray-200 p-4 rounded text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">2.3</div>
                <div className="text-gray-500 text-sm">Avg Delay (min)</div>
                <div className="text-green-500 text-xs">↗ +8%</div>
              </div>
              
              <div className="bg-gray-200 p-4 rounded text-center">
                <div className="text-2xl font-bold text-orange-500 mb-1">68%</div>
                <div className="text-gray-500 text-sm">Fleet Utilization</div>
                <div className="text-green-500 text-xs">↗ +5%</div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-200 rounded">
              <h4 className="text-gray-800 font-semibold mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600/80">
                  <span>New passenger boarding BUS003</span>
                  <span className="text-gray-400">2 min ago</span>
                </div>
                <div className="flex justify-between text-gray-600/80">
                  <span>Route optimization completed</span>
                  <span className="text-gray-400">5 min ago</span>
                </div>
                <div className="flex justify-between text-gray-600/80">
                  <span>BUS005 reached destination</span>
                  <span className="text-gray-400">8 min ago</span>
                </div>
                <div className="flex justify-between text-gray-600/80">
                  <span>Fuel alert resolved for BUS004</span>
                  <span className="text-gray-400">12 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Management */}
        <div className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">👨‍✈️ Driver Performance Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {busData.map(bus => (
              <div key={bus.id} className="bg-gray-200 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {bus.driver.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-gray-800 font-semibold text-sm">{bus.driver}</h4>
                    <p className="text-gray-400 text-xs">{bus.id}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating:</span>
                    <span className="text-gray-800 font-semibold">{bus.rating}★</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Speed:</span>
                    <span className={`font-semibold ${
                      bus.speed > 50 ? 'text-red-500' : 
                      bus.speed > 30 ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {bus.speed} km/h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className={`font-semibold text-xs ${getStatusColor(bus.status)}`}>
                      {bus.status}
                    </span>
                  </div>
                </div>
                
                <button className="w-full mt-3 bg-blue-500 text-white py-1 px-2 rounded text-xs hover:bg-blue-600 transition-colors">
                  Contact Driver
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm">Generate Report</div>
            </button>
            
            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">🚌</div>
              <div className="text-sm">Add New Bus</div>
            </button>
            
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">🗺️</div>
              <div className="text-sm">Route Planning</div>
            </button>
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">🔧</div>
              <div className="text-sm">Maintenance</div>
            </button>
            
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm">Passenger Data</div>
            </button>
            
            <button className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-lg transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm">Settings</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage