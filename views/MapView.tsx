
import React, { useEffect, useRef, useState } from 'react';
import { UserState, Pavilion } from '../types';
import { PAVILIONS } from '../constants';
import L from 'leaflet';

// El CSS se carga desde el index.html mediante una etiqueta <link>, 
// eliminamos la importación de JS para evitar errores de carga de módulos.

interface Props {
  userState: UserState;
  onBack: () => void;
  onSelectPavilion: (p: Pavilion) => void;
}

const MapView: React.FC<Props> = ({ userState, onBack, onSelectPavilion }) => {
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [selectedInMap, setSelectedInMap] = useState<Pavilion | null>(null);

  useEffect(() => {
    // Inicializar mapa si no existe
    if (!mapRef.current) {
      const center: [number, number] = userState.currentLocation 
        ? [userState.currentLocation.lat, userState.currentLocation.lng]
        : [-12.046374, -77.042793];

      mapRef.current = L.map('map-container', {
        zoomControl: false,
        attributionControl: false
      }).setView(center, 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

      PAVILIONS.forEach(pavilion => {
        if (pavilion.coords) {
          const marker = L.circleMarker(pavilion.coords, {
            radius: 12,
            fillColor: pavilion.status === 'FULL' ? '#ef4444' : '#22c55e',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(mapRef.current!);

          marker.on('click', () => {
            setSelectedInMap(pavilion);
            mapRef.current?.flyTo(pavilion.coords!, 18);
          });
        }
      });
    }

    // Actualizar marcador de usuario
    if (userState.currentLocation && mapRef.current) {
      const { lat, lng } = userState.currentLocation;
      const userPos: [number, number] = [lat, lng];

      if (!userMarkerRef.current) {
        const userIcon = L.divIcon({
          className: 'custom-user-icon',
          html: `<div class="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-[0_0_15px_#137fec] animate-pulse"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });
        userMarkerRef.current = L.marker(userPos, { icon: userIcon }).addTo(mapRef.current);
      } else {
        userMarkerRef.current.setLatLng(userPos);
      }
    }

    return () => {
      // Limpieza opcional del mapa si fuera necesario
    };
  }, [userState.currentLocation]);

  const handleCenterUser = () => {
    if (userState.currentLocation && mapRef.current) {
      mapRef.current.flyTo([userState.currentLocation.lat, userState.currentLocation.lng], 18);
    }
  };

  return (
    <div className="h-full w-full relative">
      <div id="map-container" className="h-full w-full"></div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/80 to-transparent pointer-events-none z-[400]"></div>

      <div className="absolute top-12 left-4 right-4 flex justify-between items-center z-[500]">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-surface/90 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform"
        >
          <span className="material-icons-round">arrow_back</span>
        </button>
        <div className="bg-surface/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xl">
          <span className="material-icons-round text-primary text-sm">gps_fixed</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Campus Central</span>
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[500]">
        <button 
          onClick={handleCenterUser}
          className="w-12 h-12 rounded-2xl bg-primary text-white shadow-[0_10px_20px_rgba(19,127,236,0.4)] flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-icons-round">my_location</span>
        </button>
      </div>

      {selectedInMap && (
        <div className="absolute bottom-8 left-4 right-4 z-[1000] animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${selectedInMap.colorClass}`}>
                  <span className="material-icons-round text-2xl">{selectedInMap.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">{selectedInMap.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{selectedInMap.locationName}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedInMap(null)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400"
              >
                <span className="material-icons-round text-sm">close</span>
              </button>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Espacios Libres</span>
                <span className={`text-xl font-bold ${selectedInMap.status === 'FULL' ? 'text-red-500' : 'text-green-500'}`}>
                  {selectedInMap.availableSpots} / {selectedInMap.totalSpots}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Tiempo Estimado</span>
                <span className="text-xl font-bold text-white">~4 min</span>
              </div>
            </div>

            <button 
              disabled={selectedInMap.status === 'FULL'}
              onClick={() => onSelectPavilion(selectedInMap)}
              className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${selectedInMap.status === 'FULL' ? 'bg-gray-700 text-gray-500' : 'bg-primary text-white shadow-lg shadow-primary/30 active:scale-95'}`}
            >
              <span className="material-icons-round">directions</span>
              {selectedInMap.status === 'FULL' ? 'Área Completa' : 'Navegar Aquí'}
            </button>
          </div>
        </div>
      )}

      {!selectedInMap && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[500]">
          <div className="bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 shadow-2xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Localizando Sensores IoT</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
