import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
}

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [locating, setLocating] = useState(false);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      onLocationSelect(lat, lng, data.display_name || '');
    } catch {
      onLocationSelect(lat, lng);
    }
  };

  const updateMarker = (lat: number, lng: number) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(map);
      markerRef.current.on('dragend', () => {
        const pos = markerRef.current!.getLatLng();
        reverseGeocode(pos.lat, pos.lng);
      });
    }
    map.setView([lat, lng], map.getZoom());
    reverseGeocode(lat, lng);
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      updateMarker(e.latlng.lat, e.latlng.lng);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateMarker(pos.coords.latitude, pos.coords.longitude);
        mapInstanceRef.current?.setZoom(15);
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
      <div
        ref={mapRef}
        className="rounded-2xl overflow-hidden border border-border/50 shadow-soft"
        style={{ height: 250 }}
      />
      <p className="text-xs text-muted-foreground">Click on the map or drag the pin to set your delivery location.</p>
    </div>
  );
};

export default LocationPicker;
