
import React, { useState, useEffect } from 'react';
import { ViewState, Pavilion, UserState } from './types';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import NavigationView from './views/NavigationView';
import ArrivalView from './views/ArrivalView';
import MapView from './views/MapView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('AUTH');
  const [selectedPavilion, setSelectedPavilion] = useState<Pavilion | null>(null);
  const [userState, setUserState] = useState<UserState>({
    isDriving: false,
    currentLocation: null,
    speed: 0
  });

  useEffect(() => {
    if (view === 'AUTH') return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        setUserState(prev => ({
          ...prev,
          currentLocation: { lat: latitude, lng: longitude },
          speed: speed || 0,
          isDriving: (speed || 0) > 5
        }));
      },
      (error) => console.error("Error de ubicación:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [view]);

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-background min-h-screen relative overflow-hidden shadow-2xl">
        {view === 'AUTH' && <LoginView onLogin={() => setView('HOME')} />}
        {view === 'HOME' && (
          <HomeView 
            onSelect={(p) => { setSelectedPavilion(p); setView('NAVIGATION'); }} 
            onGoToMap={() => setView('MAP')}
            userState={userState} 
          />
        )}
        {view === 'MAP' && (
          <MapView 
            userState={userState} 
            onBack={() => setView('HOME')} 
            onSelectPavilion={(p) => { setSelectedPavilion(p); setView('NAVIGATION'); }}
          />
        )}
        {view === 'NAVIGATION' && selectedPavilion && (
          <NavigationView 
            pavilion={selectedPavilion} 
            userState={userState} 
            onArrive={() => setView('ARRIVAL')} 
            onCancel={() => { setSelectedPavilion(null); setView('HOME'); }}
          />
        )}
        {view === 'ARRIVAL' && selectedPavilion && (
          <ArrivalView 
            pavilion={selectedPavilion} 
            onFinish={() => { setSelectedPavilion(null); setView('HOME'); }} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
