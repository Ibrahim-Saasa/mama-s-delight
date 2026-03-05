import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
}

function DraggableMarker({ position, onPositionChange }: { position: [number, number]; onPositionChange: (lat: number, lng: number) => void }) {
  const markerRef = useRef<L.Marker>(null);

  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <Marker
      draggable
      position={position}
      ref={markerRef}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker) {
            const latlng = marker.getLatLng();
            onPositionChange(latlng.lat, latlng.lng);
          }
        },
      }}
    />
  );
}

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const [position, setPosition] = useState<[number, number]>([20.5937, 78.9629]); // Default: India center
  const [locating, setLocating] = useState(false);

  const handlePositionChange = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    // Reverse geocode
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      onLocationSelect(lat, lng, data.display_name || '');
    } catch {
      onLocationSelect(lat, lng);
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        handlePositionChange(latitude, longitude);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-quicksand font-semibold text-sm flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" /> Pin your location on the map
        </p>
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locating}
          className="text-xs font-quicksand font-semibold text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
        >
          {locating ? 'Locating...' : '📍 Use my location'}
        </button>
      </div>
      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-soft" style={{ height: 250 }}>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
          key={`${position[0]}-${position[1]}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker position={position} onPositionChange={handlePositionChange} />
        </MapContainer>
      </div>
      <p className="text-xs text-muted-foreground">Click on the map or drag the pin to set your delivery location.</p>
    </div>
  );
};

export default LocationPicker;
