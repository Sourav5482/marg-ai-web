import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const center = [22.5726, 88.3639]; // Kolkata

function Routing({ from, to }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  React.useEffect(() => {
    if (!map || !from || !to) return;

    if (routingControlRef.current) {
      try {
        map.removeControl(routingControlRef.current);
      } catch (e) {}
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1]),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (e) {}
      }
    };
  }, [from, to, map]);

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
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [error, setError] = useState("");

  const handleShowDirections = async (e) => {
    e.preventDefault();
    setError("");
    const from = await geocode(fromAddress);
    const to = await geocode(toAddress);
    if (!from || !to) {
      setError("Could not find one or both addresses.");
      return;
    }
    setFromCoords(from);
    setToCoords(to);
  };

  return (
    <div>
      <form onSubmit={handleShowDirections} className="mb-4 flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="From address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="text"
          placeholder="To address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Show Directions
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.in/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fromCoords && toCoords && <Routing from={fromCoords} to={toCoords} />}
      </MapContainer>
    </div>
  );
}

export default DirectionsMap;