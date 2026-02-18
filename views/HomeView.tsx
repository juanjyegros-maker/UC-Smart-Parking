
import React, { useState, useEffect } from 'react';
import { PAVILIONS } from '../constants';
import { Pavilion, UserState } from '../types';

interface Props {
  onSelect: (p: Pavilion) => void;
  onGoToMap: () => void;
  userState: UserState;
}

const HomeView: React.FC<Props> = ({ onSelect, onGoToMap, userState }) => {
  const [search, setSearch] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('Buenos Días,');
    else if (hour >= 12 && hour < 19) setGreeting('Buenas Tardes,');
    else setGreeting('Buenas Noches,');
  }, []);

  const filteredPavilions = PAVILIONS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{greeting}</p>
          <h1 className="text-2xl font-bold tracking-tight">¿Dónde quieres aparcar?</h1>
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden ring-2 ring-primary/20">
            <img src="https://picsum.photos/100/100" alt="Perfil" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
        </div>
      </header>

      {/* Search */}
      <div className="px-6 mb-8">
        <div className="relative group">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">search</span>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text" 
            placeholder="Buscar pabellón, sala o zona..."
            className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-lg"
          />
          <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">tune</span>
        </div>
      </div>

      {/* Mode Status Indicator */}
      <div className="px-6 mb-6">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${userState.isDriving ? 'bg-primary/10 border-primary/20' : 'bg-surface border-white/5'}`}>
          <span className="material-icons-round text-primary">
            {userState.isDriving ? 'directions_car' : 'directions_walk'}
          </span>
          <div>
            <p className="text-xs text-gray-400 font-medium leading-none mb-1">Modo Actual</p>
            <p className="text-sm font-bold text-white leading-none">
              {userState.isDriving ? 'Conducción detectada' : 'Caminata detectada'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 overflow-y-auto hide-scrollbar pb-32">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Todos los Pabellones</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredPavilions.map(pavilion => (
            <div 
              key={pavilion.id}
              onClick={() => pavilion.status !== 'FULL' && onSelect(pavilion)}
              className={`bg-surface border border-white/5 rounded-2xl p-4 flex flex-col relative group transition-all duration-300 ${pavilion.status === 'FULL' ? 'opacity-60 grayscale' : 'hover:border-primary/50 cursor-pointer active:scale-95'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${pavilion.colorClass}`}>
                  <span className="material-icons-round text-2xl">{pavilion.icon}</span>
                </div>
                {pavilion.status === 'LIVE' && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">En Vivo</span>
                  </div>
                )}
                {pavilion.status === 'FULL' && (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Lleno</span>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg mb-0.5 group-hover:text-primary transition-colors">{pavilion.name}</h3>
              <p className="text-xs text-gray-500 font-medium mb-4">{pavilion.locationName} • {pavilion.zone}</p>
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <span className={`material-icons-round text-sm ${pavilion.status === 'FULL' ? 'text-red-500' : 'text-green-500'}`}>
                    {pavilion.status === 'FULL' ? 'block' : 'local_parking'}
                  </span>
                  <span className={`text-sm font-bold ${pavilion.status === 'FULL' ? 'text-red-500' : 'text-green-500'}`}>
                    {pavilion.availableSpots}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">libre</span>
                </div>
                <span className="material-icons-round text-gray-500 text-sm group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <div className="absolute bottom-0 w-full p-6 z-50">
        <div className="bg-surface/80 backdrop-blur-xl border border-white/5 rounded-3xl p-2 flex justify-between items-center shadow-2xl">
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-primary">
            <span className="material-icons-round">home</span>
            <span className="text-[10px] font-medium">Inicio</span>
          </button>
          <button 
            onClick={onGoToMap}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-icons-round">map</span>
            <span className="text-[10px] font-medium">Mapa</span>
          </button>
          <div className="flex-none -mt-10 px-2">
            <button className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center active:scale-90 transition-transform">
              <span className="material-icons-round text-3xl">near_me</span>
            </button>
          </div>
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-500">
            <span className="material-icons-round">bookmark</span>
            <span className="text-[10px] font-medium">Guardados</span>
          </button>
          <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-500">
            <span className="material-icons-round">settings</span>
            <span className="text-[10px] font-medium">Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
