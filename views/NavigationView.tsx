
import React, { useState, useEffect } from 'react';
import { Pavilion, UserState } from '../types';

interface Props {
  pavilion: Pavilion;
  userState: UserState;
  onArrive: () => void;
  onCancel: () => void;
}

const NavigationView: React.FC<Props> = ({ pavilion, userState, onArrive, onCancel }) => {
  // Simulate progress
  const [distance, setDistance] = useState(350);
  const [eta, setEta] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(prev => Math.max(0, prev - (userState.isDriving ? 15 : 2)));
      if (distance < 10) onArrive();
    }, 1000);
    return () => clearInterval(timer);
  }, [distance, userState.isDriving, onArrive]);

  return (
    <div className="flex flex-col h-full relative bg-[#1a202c]">
      {/* Top Instruction Card */}
      <div className="absolute top-14 left-4 right-4 z-40">
        <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/10 flex items-center gap-4">
          <div className="bg-white/10 rounded-xl p-3 flex items-center justify-center h-16 w-16">
            <span className="material-icons-round text-4xl text-white">turn_left</span>
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-white">{distance} <span className="text-sm font-normal text-gray-400">m</span></div>
            <div className="text-lg font-medium text-gray-200 leading-tight">Turn Left towards <br/>Section B</div>
          </div>
        </div>
      </div>

      {/* Map Layer (Abstract) */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3a4a5e 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Road Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 180 900 L 180 600 Q 180 500 250 450 L 320 420" fill="none" stroke="#2d3748" strokeWidth="40" strokeLinecap="round" />
          <path d="M 180 900 L 180 600 Q 180 500 250 450 L 320 420" fill="none" stroke="#137fec" strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
        </svg>

        {/* User Marker */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 transition-all duration-1000">
          <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
            <span className="material-icons-round text-primary text-3xl">navigation</span>
          </div>
          <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
        </div>

        {/* Target Spot Visual */}
        <div className="absolute top-[35%] right-[10%] rotate-3 group">
          <div className="w-24 h-16 bg-primary border-2 border-white rounded-lg shadow-[0_0_20px_#137fec] flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-white/60 mb-1">SPOT B-12</span>
            <span className="material-icons-round text-white">location_on</span>
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-primary text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
            Closest to {pavilion.name}
          </div>
        </div>
      </div>

      {/* Floating Map Actions */}
      <div className="absolute top-48 right-4 z-40 flex flex-col gap-3">
        <button className="w-10 h-10 rounded-full bg-gray-900/80 backdrop-blur border border-white/10 text-white shadow-lg flex items-center justify-center">
          <span className="material-icons-round">explore</span>
        </button>
        <button className="w-10 h-10 rounded-full bg-primary text-white border border-white/10 shadow-[0_0_15px_#137fec] flex items-center justify-center">
          <span className="material-icons-round">volume_up</span>
        </button>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 pb-12">
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-3xl font-bold text-green-400">{eta}</span>
              <span className="text-sm font-medium text-gray-400 mb-1.5">min</span>
              <span className="text-lg font-bold text-gray-500 mb-0.5">•</span>
              <span className="text-lg font-medium text-gray-300 mb-0.5">{distance} m</span>
            </div>
            <div className="text-sm text-gray-400">
              Arrival at <span className="text-white font-bold">09:44</span>
            </div>
          </div>
          <button 
            onClick={onCancel}
            className="h-14 w-14 rounded-full bg-red-500/20 text-red-500 border border-red-500/50 flex items-center justify-center active:bg-red-500 active:text-white transition-all"
          >
            <span className="material-icons-round text-2xl">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationView;
