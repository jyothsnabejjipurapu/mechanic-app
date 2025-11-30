export const ROLE_CUSTOMER = 'CUSTOMER';
export const ROLE_MECHANIC = 'MECHANIC';
export const ROLE_ADMIN = 'ADMIN';

export const REQUEST_STATUS = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const SKILL_TYPES = {
  GENERAL_REPAIR: 'General Repair',
  TYRES: 'Tyres',
  ELECTRICAL: 'Electrical',
  ENGINE: 'Engine',
  BATTERY: 'Battery',
};

export const SKILL_TYPE_OPTIONS = [
  { key: 'GENERAL_REPAIR', label: 'General Repair' },
  { key: 'TYRES', label: 'Tyres' },
  { key: 'ELECTRICAL', label: 'Electrical' },
  { key: 'ENGINE', label: 'Engine' },
  { key: 'BATTERY', label: 'Battery' },
];

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  background: '#F2F2F7',
  text: '#000000',
  textSecondary: '#8E8E93',
};

export const BASE_FARE = 100;
export const PER_KM_RATE = 10;

