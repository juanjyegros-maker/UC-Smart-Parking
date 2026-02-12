
import React from 'react';
import { Pavilion } from '../types';

interface Props {
  pavilion: Pavilion;
  onFinish: () => void;
}

const ArrivalView: React.FC<Props> = ({ pavilion, onFinish }) => {
  return (
    <div className="flex flex-col h-full px-6 pt-16">
      <div className="flex-1 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-semibold mb-8 border border-green-500/30">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Reservado para Ti
        </div>

        <h2 className="text-4xl font-light text-gray-500 text-center">Llegando a</h2>
        <h1 className="text-[5rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-4">B12</h1>
        <p className="text-lg text-gray-400 font-medium text-center">Nivel 2, Ala Norte</p>

        {/* Representación visual del lugar */}
        <div className="w-full max-w-xs aspect-[4/3] bg-surface rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden my-8 group">
          <div className="absolute inset-x-0 bottom-0 h-1/3 border-t-2 border-dashed border-white/5"></div>
          <div className="absolute inset-y-0 left-1/4 w-0.5 bg-yellow-500/30"></div>
          <div className="absolute inset-y-0 right-1/4 w-0.5 bg-yellow-500/30"></div>
          
          {/* Gráfico del auto */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-32 h-48 bg-primary rounded-lg shadow-[0_20px_50px_-12px_rgba(19,127,236,0.5)] flex items-center justify-center group-hover:scale-105 transition-transform">
             <span className="material-icons-round text-white text-5xl opacity-80 rotate-180">directions_car</span>
          </div>

          <div className="absolute top-4 right-4 flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
            <span className="text-[10px] uppercase font-bold text-gray-500">Sensor Activo</span>
          </div>
        </div>

        {/* Resumen del camino peatonal */}
        <div className="w-full bg-surface border border-white/10 rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-icons-round">directions_walk</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Destino Final</p>
                <p className="font-bold">Pabellón de {pavilion.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">3 <span className="text-xs font-normal text-gray-500 uppercase">min</span></p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">150m caminando</p>
            </div>
          </div>
          
          <div className="h-24 bg-background rounded-xl overflow-hidden relative border border-white/5">
            <img src="https://picsum.photos/400/200?grayscale" alt="Vista previa del mapa" className="w-full h-full object-cover opacity-20" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path d="M 40 80 Q 150 70 200 40 T 300 20" fill="none" stroke="#137fec" strokeDasharray="6 4" strokeWidth="3" />
            </svg>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[8px] font-bold uppercase text-white/80 tracking-widest">Vista Previa</div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <button 
          onClick={onFinish}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span className="material-icons-round text-2xl">check_circle</span>
          Confirmar Llegada
        </button>
        <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest font-bold">Actualizar el estado del sensor garantiza precisión para otros estudiantes.</p>
      </div>
    </div>
  );
};

export default ArrivalView;
