
import { Pavilion } from './types';

export const PAVILIONS: Pavilion[] = [
  {
    id: 'p1',
    name: 'Engineering',
    locationName: 'North Campus',
    zone: 'Zone A',
    icon: 'engineering',
    colorClass: 'text-blue-400',
    status: 'LIVE',
    totalSpots: 150,
    availableSpots: 124
  },
  {
    id: 'p2',
    name: 'Humanities',
    locationName: 'South Wing',
    zone: 'Zone C',
    icon: 'theater_comedy',
    colorClass: 'text-purple-400',
    status: 'BUSY',
    totalSpots: 100,
    availableSpots: 14
  },
  {
    id: 'p3',
    name: 'Science Labs',
    locationName: 'East Campus',
    zone: 'Zone B',
    icon: 'biotech',
    colorClass: 'text-teal-400',
    status: 'LIVE',
    totalSpots: 120,
    availableSpots: 86
  },
  {
    id: 'p4',
    name: 'Sports Center',
    locationName: 'Main Arena',
    zone: 'Zone S',
    icon: 'pool',
    colorClass: 'text-red-400',
    status: 'FULL',
    totalSpots: 80,
    availableSpots: 0
  },
  {
    id: 'p5',
    name: 'Library',
    locationName: 'Central',
    zone: 'Zone L',
    icon: 'local_library',
    colorClass: 'text-indigo-400',
    status: 'BUSY',
    totalSpots: 60,
    availableSpots: 32
  },
  {
    id: 'p6',
    name: 'Admin Hall',
    locationName: 'West Wing',
    zone: 'Zone D',
    icon: 'admin_panel_settings',
    colorClass: 'text-gray-400',
    status: 'LIVE',
    totalSpots: 250,
    availableSpots: 205
  }
];
