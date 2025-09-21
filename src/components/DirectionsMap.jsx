// DirectionsMap.jsx
import React, { useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 22.5726, lng: 88.3639 }; // Kolkata

function DirectionsMap() {
  const [directions, setDirections] = useState(null);

  const calculateRoute = () => {
    if (!window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: "Howrah Station, Kolkata",
        destination: "Sealdah Station, Kolkata",
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Error fetching directions", result, status);
        }
      }
    );
  };

  return (
    <div>
      <button
        onClick={calculateRoute}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Show Directions
      </button>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

export default DirectionsMap;
