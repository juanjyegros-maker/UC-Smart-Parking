
import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, Pavilion, UserState } from './types';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import NavigationView from './views/NavigationView';
import ArrivalView from './views/ArrivalView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('AUTH');
  const [selectedPavilion, setSelectedPavilion] = useState<Pavilion | null>(null);
  const [userState, setUserState] = useState<UserState>({
    isDriving: false,
    currentLocation: null,
    speed: 0
  });

  // Track user location and determine mode (Walking vs Driving)
  useEffect(() => {
    if (view === 'AUTH') return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        const currentSpeed = speed || 0; // Speed in m/s
        
        setUserState(prev => ({
          ...prev,
          currentLocation: { lat: latitude, lng: longitude },
          speed: currentSpeed,
          // If speed is more than 5m/s (approx 18km/h), assume driving
          isDriving: currentSpeed > 5
        }));
      },
      (error) => console.error("Location error:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [view]);

  const handleLogin = () => setView('HOME');
  const handleSelectPavilion = (pavilion: Pavilion) => {
    setSelectedPavilion(pavilion);
    setView('NAVIGATION');
  };
  const handleArrive = () => setView('ARRIVAL');
  const handleFinish = () => {
    setSelectedPavilion(null);
    setView('HOME');
  };

  return (
    <div className="flex justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-background min-h-screen relative overflow-hidden shadow-2xl">
        {view === 'AUTH' && <LoginView onLogin={handleLogin} />}
        {view === 'HOME' && <HomeView onSelect={handleSelectPavilion} userState={userState} />}
        {view === 'NAVIGATION' && selectedPavilion && (
          <NavigationView 
            pavilion={selectedPavilion} 
            userState={userState} 
            onArrive={handleArrive} 
            onCancel={handleFinish}
          />
        )}
        {view === 'ARRIVAL' && selectedPavilion && (
          <ArrivalView 
            pavilion={selectedPavilion} 
            onFinish={handleFinish} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
