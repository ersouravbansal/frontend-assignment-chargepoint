import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from '../images/geo.png';
import iconShadow from '../images/geo.png';

const MapView = ({ gps }) => {
  const BaseIcon = useMemo(() => L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  }), []);

  if (!gps.length) return null;

  const [lat, lng] = gps[0].split('|').map(parseFloat);

  if (isNaN(lat) || isNaN(lng)) return <div>Invalid GPS coordinates</div>;

  L.Marker.prototype.options.icon = BaseIcon;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      className='map-container'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          GPS Coordinates: {lat}, {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
