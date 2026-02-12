
import { Pavilion } from './types';

export const PAVILIONS: Pavilion[] = [
  {
    id: 'p1',
    name: 'Ingeniería',
    locationName: 'Campus Norte',
    zone: 'Zona A',
    icon: 'engineering',
    colorClass: 'text-blue-400',
    status: 'LIVE',
    totalSpots: 150,
    availableSpots: 124,
    coords: [-12.046374, -77.042793]
  },
  {
    id: 'p2',
    name: 'Humanidades',
    locationName: 'Ala Sur',
    zone: 'Zona C',
    icon: 'theater_comedy',
    colorClass: 'text-purple-400',
    status: 'BUSY',
    totalSpots: 100,
    availableSpots: 14,
    coords: [-12.047500, -77.043500]
  },
  {
    id: 'p3',
    name: 'Laboratorios',
    locationName: 'Campus Este',
    zone: 'Zona B',
    icon: 'biotech',
    colorClass: 'text-teal-400',
    status: 'LIVE',
    totalSpots: 120,
    availableSpots: 86,
    coords: [-12.045500, -77.041000]
  },
  {
    id: 'p4',
    name: 'Centro Deportivo',
    locationName: 'Arena Principal',
    zone: 'Zona S',
    icon: 'pool',
    colorClass: 'text-red-400',
    status: 'FULL',
    totalSpots: 80,
    availableSpots: 0,
    coords: [-12.048000, -77.045000]
  },
  {
    id: 'p5',
    name: 'Biblioteca',
    locationName: 'Sector Central',
    zone: 'Zona L',
    icon: 'local_library',
    colorClass: 'text-indigo-400',
    status: 'BUSY',
    totalSpots: 60,
    availableSpots: 32,
    coords: [-12.046500, -77.043000]
  },
  {
    id: 'p6',
    name: 'Administración',
    locationName: 'Ala Oeste',
    zone: 'Zona D',
    icon: 'admin_panel_settings',
    colorClass: 'text-gray-400',
    status: 'LIVE',
    totalSpots: 250,
    availableSpots: 205,
    coords: [-12.046000, -77.044000]
  }
];
