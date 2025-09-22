import React, { useRef } from "react";
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
    if (!map) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
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
        map.removeControl(routingControlRef.current);
      }
    };
  }, [from, to, map]);

  return null;
}

function DirectionsMap() {
  const [showDirections, setShowDirections] = React.useState(false);

  // Howrah Station: 22.5840, 88.3426
  // Sealdah Station: 22.5656, 88.3700
  const from = [22.5840, 88.3426];
  const to = [22.5656, 88.3700];

  return (
    <div>
      <button
        onClick={() => setShowDirections(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Show Directions
      </button>
      <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.in/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDirections && <Routing from={from} to={to} />}
      </MapContainer>
    </div>
  );
}

export default DirectionsMap;