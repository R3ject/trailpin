// src/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import bikeIcon from '../assets/bike.svg';

// Create a custom Leaflet icon using your bike.svg
const customIcon = L.icon({
  iconUrl: bikeIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// A component to capture click events on the map and call onMapClick prop
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e);
    }
  });
  return null;
}

const MapView = ({ pins, onMapClick }) => {
  return (
    <MapContainer center={[37.8, -96]} zoom={4} style={{ height: "80vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {pins.map((pin, index) => (
          <Marker
            key={index}
            position={[pin.coords.lat, pin.coords.lng]}
            icon={customIcon}
            // Removed any reference to handleLocateMe here.
          >
            <Popup>
              <strong>{pin.trailName}</strong>
              <br />
              {pin.date}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <ClickHandler onMapClick={onMapClick} />
    </MapContainer>
  );
};

export default MapView;
