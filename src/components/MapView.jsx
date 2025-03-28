// src/components/MapView.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import bikeIcon from '../assets/bike.svg';
import './MapView.css';

const customIcon = L.icon({
  iconUrl: bikeIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

function AutoZoom({ pins }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length > 0) {
      const bounds = L.latLngBounds(pins.map(pin => [pin.coords.lat, pin.coords.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [pins, map]);
  return null;
}

function MapClickHandler({ onMapClick }) {
  const map = useMap();
  useEffect(() => {
    map.on('click', onMapClick);
    return () => map.off('click', onMapClick);
  }, [map, onMapClick]);
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
          <Marker key={index} position={[pin.coords.lat, pin.coords.lng]} icon={customIcon}>
            <Popup>
              <strong>{pin.trailName}</strong><br />
              {pin.date}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <AutoZoom pins={pins} />
      <MapClickHandler onMapClick={onMapClick} />
    </MapContainer>
  );
};

export default MapView;
