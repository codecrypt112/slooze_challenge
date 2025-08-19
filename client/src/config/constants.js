// Development configuration
export const DEV_MODE = process.env.NODE_ENV === 'development'; // Automatically set based on environment

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// App Configuration
export const APP_NAME = 'FoodieHub';
export const APP_DESCRIPTION = 'Role-based Food Ordering System';

// Animation delays
export const ANIMATION_DELAYS = {
  SHORT: 100,
  MEDIUM: 200,
  LONG: 300,
};

// Country flags
export const COUNTRY_FLAGS = {
  India: '🇮🇳',
  America: '🇺🇸',
};

// Role colors
export const ROLE_COLORS = {
  admin: 'from-red-500 to-red-600',
  manager: 'from-blue-500 to-blue-600',
  member: 'from-green-500 to-green-600',
};

// Sample users for development
export const SAMPLE_USERS = [
  { 
    email: 'nick.fury@shield.com', 
    password: 'admin123', 
    name: 'Nick Fury', 
    role: 'Admin',
    country: 'America',
    avatar: '👨‍💼'
  },
  { 
    email: 'captain.marvel@shield.com', 
    password: 'manager123', 
    name: 'Captain Marvel', 
    role: 'Manager',
    country: 'India',
    avatar: '👩‍💼'
  },
  { 
    email: 'captain.america@shield.com', 
    password: 'manager123', 
    name: 'Captain America', 
    role: 'Manager',
    country: 'America',
    avatar: '🦸‍♂️'
  },
  { 
    email: 'thanos@shield.com', 
    password: 'member123', 
    name: 'Thanos', 
    role: 'Member',
    country: 'India',
    avatar: '👤'
  },
  { 
    email: 'thor@shield.com', 
    password: 'member123', 
    name: 'Thor', 
    role: 'Member',
    country: 'India',
    avatar: '⚡'
  },
  { 
    email: 'travis@shield.com', 
    password: 'member123', 
    name: 'Travis', 
    role: 'Member',
    country: 'America',
    avatar: '👨‍💻'
  }
];