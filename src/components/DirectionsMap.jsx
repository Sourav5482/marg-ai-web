import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import busData from "../data/busData.json";

const center = [22.5726, 88.3639]; // Kolkata

// Custom Bus Icon
const busIcon = new L.Icon({
  iconUrl: `https://cdn-icons-png.flaticon.com/512/2207/2207497.png`, // Replace with bus icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Routing({ from, to, onRoute }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
      } catch (e) {}
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      serviceUrl: "https://router.project-osrm.org/route/v1",
    }).addTo(map);

    routingControlRef.current.on("routesfound", function (e) {
      const route = e.routes[0];
      const coordinates = route.coordinates.map((c) => [c.lat, c.lng]);
      if (onRoute) onRoute(coordinates);
    });

    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (e) {}
      }
    };
  }, [from, to, map, onRoute]);

  return null;
}

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
}

function DirectionsMap() {
  const [busIdOrName, setBusIdOrName] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [busLocation, setBusLocation] = useState([22.5726, 88.3639]);
  const [error, setError] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [busIndex, setBusIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef();

  // Find bus by id or name from JSON
  const findBus = (input) => {
    let id = input;
    if (input.includes(" - ")) {
      id = input.split(" - ")[0].trim();
    }
    return (
      busData.find(
        (bus) =>
          bus.id.toLowerCase() === id.toLowerCase() ||
          bus.name.toLowerCase() === id.toLowerCase()
      ) || null
    );
  };

  // Suggest buses based on input
  useEffect(() => {
    if (!busIdOrName) {
      setSuggestions([]);
      return;
    }
    const input = busIdOrName.toLowerCase();
    const filtered = busData.filter(
      (bus) =>
        bus.id.toLowerCase().includes(input) ||
        bus.name.toLowerCase().includes(input)
    );
    setSuggestions(filtered.slice(0, 5));
  }, [busIdOrName]);

  // Hide suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    }
    if (suggestions.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestions]);

  const handleShowDirections = async (e) => {
    e.preventDefault();
    setError("");
    if (!busIdOrName) {
      setError("Please enter a Bus ID or Name.");
      return;
    }
    const bus = findBus(busIdOrName);
    if (!bus) {
      setError("Bus not found.");
      return;
    }
    const to = await geocode(bus.destination);
    if (!bus.location || !to) {
      setError("Could not find bus location or destination.");
      return;
    }
    setFromCoords(bus.location);
    setToCoords(to);
    setBusLocation(bus.location);
    setSuggestions([]);
  };

  // Animate bus along the route
  useEffect(() => {
    if (!routeCoords.length) return;
    setBusIndex(0);
    const interval = setInterval(() => {
      setBusIndex((prev) => {
        if (prev < routeCoords.length - 1) return prev + 1;
        return prev;
      });
    }, 1000); // Move every second
    return () => clearInterval(interval);
  }, [routeCoords]);

  // Set bus location to current route point
  useEffect(() => {
    if (routeCoords.length && busIndex < routeCoords.length) {
      setBusLocation(routeCoords[busIndex]);
    }
  }, [busIndex, routeCoords]);

  return (
    <div>
      <form
        onSubmit={handleShowDirections}
        className="mb-4 flex flex-col gap-2 max-w-md"
        autoComplete="off"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "10px",
          }}
          ref={suggestionsRef}
        >
          <input
            type="text"
            placeholder="Enter Bus ID or Name"
            value={busIdOrName}
            onChange={(e) => setBusIdOrName(e.target.value)}
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            autoComplete="off"
            style={{
              fontSize: "1rem",
              background: "#f9f9f9",
              borderColor: "#bdbdbd",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                border: "1px solid #90caf9",
                borderTop: "none",
                zIndex: 10,
                listStyle: "none",
                margin: 0,
                padding: 0,
                maxHeight: "180px",
                overflowY: "auto",
                boxShadow: "0 4px 12px rgba(33,150,243,0.08)",
                borderRadius: "0 0 8px 8px",
              }}
            >
              {suggestions.map((bus, idx) => (
                <li
                  key={bus.id}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    background: idx % 2 === 0 ? "#f5faff" : "#e3f2fd",
                    borderBottom: "1px solid #e3f2fd",
                    fontSize: "1rem",
                    transition: "background 0.2s",
                  }}
                  onClick={() => {
                    setBusIdOrName(`${bus.id} - ${bus.name}`);
                    setSuggestions([]);
                  }}
                >
                  <b>{bus.id}</b> - {bus.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Show Bus & Route
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.in/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Show route */}
        {fromCoords && toCoords && (
          <Routing
            from={fromCoords}
            to={toCoords}
            onRoute={setRouteCoords}
          />
        )}
        {/* Show bus marker */}
        {busLocation && <Marker position={busLocation} icon={busIcon} />}
      </MapContainer>
    </div>
  );
}

export default DirectionsMap;
