import React, { useState } from "react";

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Send location to the server
          fetch("http://yourserver.com/track-location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then(() => {
              // Redirect to another page or perform any action
              window.location.href = "https://yourfinaldestination.com";
            })
            .catch((error) => {
              console.error("Error sending location:", error);
              setError("Failed to send location to the server.");
            });
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setError("Failed to get location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Location Tracker</h1>
      <button
        onClick={getLocation}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Share Location
      </button>
      {location && (
        <p>
          Location: Latitude {location.latitude}, Longitude {location.longitude}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LocationTracker;