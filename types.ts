
export interface Pavilion {
  id: string;
  name: string;
  locationName: string;
  zone: string;
  icon: string;
  colorClass: string;
  status: 'LIVE' | 'FULL' | 'BUSY';
  totalSpots: number;
  availableSpots: number;
  coords?: [number, number]; // [lat, lng]
}

export interface ParkingSpot {
  id: string;
  section: string;
  number: number;
  floor: number;
  isAvailable: boolean;
  distanceToPavilion: number; // in meters
}

export type ViewState = 'AUTH' | 'HOME' | 'NAVIGATION' | 'ARRIVAL' | 'MAP';

export interface UserState {
  isDriving: boolean;
  currentLocation: { lat: number; lng: number } | null;
  speed: number;
}
