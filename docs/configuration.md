# ⚙️ Configuration Guide

## Environment Configuration

### Development vs Production

The application supports different configurations for development and production environments.

#### Constants Configuration

**File**: `client/src/config/constants.js`

```javascript
// Development configuration
export const DEV_MODE = true; // Set to false in production

// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api'
  : 'http://localhost:5000/api';

// App Configuration
export const APP_NAME = 'FoodieHub';
export const APP_DESCRIPTION = 'Role-based Food Ordering System';
```

### Server Environment Variables

**File**: `server/.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_123456789

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: CORS
CORS_ORIGIN=http://localhost:3000
```

### Client Environment Variables

**File**: `client/.env`

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api

# Optional: Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX

# Optional: Sentry Error Tracking
REACT_APP_SENTRY_DSN=https://your-sentry-dsn
```

## Firebase Configuration

### Client Configuration

**File**: `client/src/config/firebase.js`

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Server Configuration

**File**: `server/config/firebase.js`

```javascript
// Same configuration as client
const firebaseConfig = {
  // ... same config object
};
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access on all documents to any user signed in to the application
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Feature Flags

### Development Features

```javascript
// client/src/config/constants.js
export const FEATURE_FLAGS = {
  // Show sample users on login page
  SHOW_SAMPLE_USERS: DEV_MODE,
  
  // Enable debug logging
  DEBUG_LOGGING: DEV_MODE,
  
  // Show development indicators
  SHOW_DEV_INDICATORS: DEV_MODE,
  
  // Enable experimental features
  EXPERIMENTAL_FEATURES: false,
  
  // Enable analytics
  ANALYTICS_ENABLED: !DEV_MODE,
  
  // Enable error reporting
  ERROR_REPORTING: !DEV_MODE
};
```

### Usage in Components

```javascript
import { FEATURE_FLAGS } from '../config/constants';

const LoginPage = () => {
  return (
    <div>
      {/* Regular login form */}
      
      {FEATURE_FLAGS.SHOW_SAMPLE_USERS && (
        <SampleUsersSection />
      )}
    </div>
  );
};
```

## Theme Configuration

### Tailwind CSS Configuration

**File**: `client/tailwind.config.js`

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        
        // Secondary colors
        secondary: {
          50: '#fdf4ff',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
        },
        
        // Status colors
        success: { /* ... */ },
        warning: { /* ... */ },
        error: { /* ... */ }
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        // ... more animations
      },
      
      // Custom shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
```

### Dark Mode Configuration

```javascript
// Enable dark mode
module.exports = {
  darkMode: 'class', // or 'media'
  // ... rest of config
}
```

## API Configuration

### Axios Configuration

**File**: `client/src/config/api.js`

```javascript
import axios from 'axios';
import { API_BASE_URL } from './constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Database Configuration

### Firestore Collections

```javascript
// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  RESTAURANTS: 'restaurants',
  MENU_ITEMS: 'menuItems',
  ORDERS: 'orders',
  PAYMENT_METHODS: 'paymentMethods'
};

// Query limits
export const QUERY_LIMITS = {
  RESTAURANTS: 50,
  MENU_ITEMS: 100,
  ORDERS: 20,
  PAYMENT_METHODS: 10
};
```

### Database Indexes

Required Firestore composite indexes:

```javascript
// orders collection
{
  fields: [
    { fieldPath: 'userId', order: 'ASCENDING' },
    { fieldPath: 'country', order: 'ASCENDING' },
    { fieldPath: 'createdAt', order: 'DESCENDING' }
  ]
}

// restaurants collection
{
  fields: [
    { fieldPath: 'country', order: 'ASCENDING' },
    { fieldPath: 'rating', order: 'DESCENDING' }
  ]
}

// menuItems collection
{
  fields: [
    { fieldPath: 'restaurantId', order: 'ASCENDING' },
    { fieldPath: 'category', order: 'ASCENDING' }
  ]
}
```

## Security Configuration

### JWT Configuration

```javascript
// server/config/jwt.js
const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: '24h',
  issuer: 'foodie-hub',
  audience: 'foodie-hub-users'
};

// Generate token
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
    issuer: JWT_CONFIG.issuer,
    audience: JWT_CONFIG.audience
  });
};
```

### CORS Configuration

```javascript
// server/index.js
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### Rate Limiting

```javascript
// server/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different limits for different endpoints
const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many authentication attempts'
);

const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests
  'Too many requests'
);
```

## Logging Configuration

### Client-Side Logging

```javascript
// client/src/utils/logger.js
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  constructor(level = LOG_LEVELS.INFO) {
    this.level = level;
  }

  error(message, ...args) {
    if (this.level >= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  warn(message, ...args) {
    if (this.level >= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message, ...args) {
    if (this.level >= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  debug(message, ...args) {
    if (this.level >= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export const logger = new Logger(
  process.env.NODE_ENV === 'development' 
    ? LOG_LEVELS.DEBUG 
    : LOG_LEVELS.ERROR
);
```

### Server-Side Logging

```javascript
// server/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'foodie-hub-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

## Performance Configuration

### Bundle Optimization

```javascript
// client/webpack.config.js (if ejected)
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### Image Optimization

```javascript
// client/src/utils/imageOptimization.js
export const optimizeImageUrl = (url, width = 400, quality = 80) => {
  if (!url) return null;
  
  // For external images, you might use a service like Cloudinary
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_${quality}/`);
  }
  
  // For other images, return as-is or implement your optimization logic
  return url;
};
```

## Monitoring Configuration

### Error Tracking

```javascript
// client/src/utils/errorTracking.js
import * as Sentry from '@sentry/react';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

export const captureError = (error, context = {}) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, { extra: context });
  } else {
    console.error('Error captured:', error, context);
  }
};
```

### Analytics Configuration

```javascript
// client/src/utils/analytics.js
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

export const trackEvent = (eventName, parameters = {}) => {
  if (process.env.NODE_ENV === 'production') {
    logEvent(analytics, eventName, parameters);
  } else {
    console.log('Analytics event:', eventName, parameters);
  }
};

// Predefined events
export const trackOrderCreated = (orderId, value) => {
  trackEvent('order_created', {
    order_id: orderId,
    value,
    currency: 'USD'
  });
};

export const trackRestaurantViewed = (restaurantId) => {
  trackEvent('restaurant_viewed', {
    restaurant_id: restaurantId
  });
};
```

## Deployment Configuration

### Production Environment

```env
# server/.env.production
NODE_ENV=production
PORT=5000
JWT_SECRET=your_production_jwt_secret_here
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Build Configuration

```json
// client/package.json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx bundle-analyzer build/static/js/*.js",
    "build:prod": "NODE_ENV=production npm run build"
  }
}
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm run install-all

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "server"]
```

## Testing Configuration

### Jest Configuration

```javascript
// client/src/setupTests.js
import '@testing-library/jest-dom';

// Mock Firebase
jest.mock('./config/firebase', () => ({
  db: {},
  auth: {},
}));

// Mock environment variables
process.env.REACT_APP_API_BASE_URL = 'http://localhost:5000/api';
```

### Test Environment

```env
# .env.test
NODE_ENV=test
JWT_SECRET=test_secret
FIREBASE_PROJECT_ID=test-project
```

---

This configuration guide provides comprehensive setup options for different environments and use cases, ensuring optimal performance, security, and maintainability of the FoodieHub application.