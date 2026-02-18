
import { Pavilion } from './types';

export const PAVILIONS: Pavilion[] = [
  {
    id: 'p1',
    name: 'CYT Pabellón 1',
    locationName: 'Luis Alberto Meyer Jou',
    zone: 'Zona A',
    icon: 'domain',
    colorClass: 'text-blue-400',
    status: 'LIVE',
    totalSpots: 150,
    availableSpots: 124,
    coords: [-12.046374, -77.042793]
  },
  {
    id: 'p2',
    name: 'CYT Pabellón 2',
    locationName: 'Laboratorios',
    zone: 'Zona B',
    icon: 'biotech',
    colorClass: 'text-purple-400',
    status: 'BUSY',
    totalSpots: 100,
    availableSpots: 14,
    coords: [-12.047500, -77.043500]
  },
  {
    id: 'p3',
    name: 'Cantina',
    locationName: 'Área Recreativa',
    zone: 'Zona C',
    icon: 'restaurant',
    colorClass: 'text-teal-400',
    status: 'LIVE',
    totalSpots: 40,
    availableSpots: 35,
    coords: [-12.045500, -77.041000]
  },
  {
    id: 'p4',
    name: 'Secretaría CYT',
    locationName: 'Administración',
    zone: 'Zona D',
    icon: 'support_agent',
    colorClass: 'text-red-400',
    status: 'FULL',
    totalSpots: 20,
    availableSpots: 0,
    coords: [-12.048000, -77.045000]
  },
  {
    id: 'p5',
    name: 'Depto. Electrónica',
    locationName: 'e Informática',
    zone: 'Zona E',
    icon: 'memory',
    colorClass: 'text-indigo-400',
    status: 'BUSY',
    totalSpots: 60,
    availableSpots: 32,
    coords: [-12.046500, -77.043000]
  },
  {
    id: 'p6',
    name: 'Talleres',
    locationName: 'Área Técnica',
    zone: 'Zona F',
    icon: 'build',
    colorClass: 'text-gray-400',
    status: 'LIVE',
    totalSpots: 80,
    availableSpots: 65,
    coords: [-12.046000, -77.044000]
  }
];
