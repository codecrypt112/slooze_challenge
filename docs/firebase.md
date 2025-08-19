# 🔥 Firebase Integration

## Overview

FoodieHub uses **Firebase Firestore** as its primary database, providing real-time data synchronization, scalability, and security. This document covers the complete Firebase integration implementation.

## Firebase Configuration

### Client-Side Configuration

**File**: `client/src/config/firebase.js`

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validate required environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
```

### Server-Side Configuration

**File**: `server/config/firebase.js`

```javascript
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getAuth } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Validate required environment variables
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

module.exports = { db, auth, app };
```

### Environment Variables

**Client Environment Variables** (`client/.env`):
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**Server Environment Variables** (`server/.env`):
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Database Schema

### Collections Structure

```
📁 Firestore Database
├── 👥 users/
│   └── {userId}/
│       ├── name: string
│       ├── email: string
│       ├── password: string (bcrypt hashed)
│       ├── role: "admin" | "manager" | "member"
│       └── country: "India" | "America"
│
├── 🏪 restaurants/
│   └── {restaurantId}/
│       ├── name: string
│       ├── cuisine: string
│       ├── country: string
│       ├── rating: number
│       ├── deliveryTime: string
│       └── image: string (URL)
│
├── 🍽️ menuItems/
│   └── {itemId}/
│       ├── restaurantId: string (reference)
│       ├── name: string
│       ├── description: string
│       ├── price: number
│       └── category: string
│
├── 📋 orders/
│   └── {orderId}/
│       ├── userId: string (reference)
│       ├── restaurantId: string (reference)
│       ├── items: array of objects
│       ├── totalAmount: number
│       ├── status: "pending" | "paid" | "cancelled"
│       ├── country: string
│       ├── createdAt: string (ISO)
│       ├── updatedAt: string (ISO)
│       └── paymentMethodId?: string
│
└── 💳 paymentMethods/
    └── {paymentId}/
        ├── type: string
        ├── cardNumber: string (masked)
        ├── expiryDate: string
        ├── holderName: string
        ├── country: string
        ├── createdAt: string (ISO)
        └── updatedAt: string (ISO)
```

## Firestore Operations

### Using Firebase v9+ Modular SDK

The application uses the modern Firebase v9+ SDK with modular imports for better tree-shaking and performance.

#### Reading Data

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

// Get restaurants by country
const getRestaurantsByCountry = async (country) => {
  const restaurantsRef = collection(db, 'restaurants');
  const q = query(restaurantsRef, where('country', '==', country));
  const snapshot = await getDocs(q);
  
  const restaurants = [];
  snapshot.forEach(doc => {
    restaurants.push({
      id: doc.id,
      ...doc.data()
    });
  });
  
  return restaurants;
};
```

#### Writing Data

```javascript
import { addDoc, collection } from 'firebase/firestore';

// Create new order
const createOrder = async (orderData) => {
  const orderRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  return orderRef.id;
};
```

#### Updating Data

```javascript
import { doc, updateDoc } from 'firebase/firestore';

// Update order status
const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: new Date().toISOString()
  });
};
```

#### Deleting Data

```javascript
import { doc, deleteDoc } from 'firebase/firestore';

// Delete payment method
const deletePaymentMethod = async (paymentId) => {
  const paymentRef = doc(db, 'paymentMethods', paymentId);
  await deleteDoc(paymentRef);
};
```

## Query Patterns

### Country-Based Filtering

All data queries include country filtering for data isolation:

```javascript
// Users can only see restaurants in their country
const q = query(
  collection(db, 'restaurants'),
  where('country', '==', userCountry)
);

// Orders are filtered by user and country
const q = query(
  collection(db, 'orders'),
  where('userId', '==', userId),
  where('country', '==', userCountry),
  orderBy('createdAt', 'desc')
);
```

### Composite Queries

```javascript
// Get menu items for a specific restaurant
const q = query(
  collection(db, 'menuItems'),
  where('restaurantId', '==', restaurantId)
);

// Get payment methods for admin's country
const q = query(
  collection(db, 'paymentMethods'),
  where('country', '==', adminCountry)
);
```

## Security Rules

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Restaurants are readable by authenticated users from same country
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null && 
        resource.data.country == getUserCountry(request.auth.uid);
      allow write: if false; // Only through server
    }
    
    // Orders are user-specific and country-specific
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid &&
        resource.data.country == getUserCountry(request.auth.uid);
    }
    
    // Payment methods are admin-only
    match /paymentMethods/{paymentId} {
      allow read, write: if request.auth != null && 
        getUserRole(request.auth.uid) == 'admin' &&
        resource.data.country == getUserCountry(request.auth.uid);
    }
    
    // Helper functions
    function getUserCountry(uid) {
      return get(/databases/$(database)/documents/users/$(uid)).data.country;
    }
    
    function getUserRole(uid) {
      return get(/databases/$(database)/documents/users/$(uid)).data.role;
    }
  }
}
```

## Data Initialization

### Sample Data Script

**File**: `server/scripts/initializeData.js`

```javascript
const { collection, addDoc } = require('firebase/firestore');
const bcrypt = require('bcryptjs');

const initializeData = async () => {
  // Create sample users
  const users = [
    {
      name: 'Nick Fury',
      email: 'nick.fury@shield.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      country: 'America'
    },
    // ... more users
  ];

  // Add users to Firestore
  for (const user of users) {
    await addDoc(collection(db, 'users'), user);
  }

  // Create sample restaurants
  const restaurants = [
    {
      name: 'Spice Garden',
      cuisine: 'Indian',
      country: 'India',
      rating: 4.5,
      deliveryTime: '30-45 min'
    },
    // ... more restaurants
  ];

  // Add restaurants and get IDs for menu items
  const restaurantIds = [];
  for (const restaurant of restaurants) {
    const docRef = await addDoc(collection(db, 'restaurants'), restaurant);
    restaurantIds.push({ id: docRef.id, ...restaurant });
  }

  // Create menu items linked to restaurants
  const menuItems = [
    {
      restaurantId: restaurantIds[0].id,
      name: 'Butter Chicken',
      description: 'Creamy tomato-based curry',
      price: 12.99,
      category: 'Main Course'
    },
    // ... more menu items
  ];

  for (const item of menuItems) {
    await addDoc(collection(db, 'menuItems'), item);
  }
};
```

## Error Handling

### Firebase Error Handling

```javascript
import { FirebaseError } from 'firebase/app';

const handleFirebaseOperation = async () => {
  try {
    // Firebase operation
    const result = await someFirebaseOperation();
    return result;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'permission-denied':
          throw new Error('Access denied');
        case 'not-found':
          throw new Error('Document not found');
        case 'unavailable':
          throw new Error('Service temporarily unavailable');
        default:
          throw new Error('Database operation failed');
      }
    }
    throw error;
  }
};
```

## Performance Optimization

### Query Optimization

```javascript
// Use indexes for compound queries
const q = query(
  collection(db, 'orders'),
  where('userId', '==', userId),
  where('country', '==', country),
  orderBy('createdAt', 'desc'),
  limit(20) // Pagination
);

// Cache frequently accessed data
const cachedRestaurants = new Map();

const getRestaurants = async (country) => {
  if (cachedRestaurants.has(country)) {
    return cachedRestaurants.get(country);
  }
  
  const restaurants = await fetchRestaurantsFromFirestore(country);
  cachedRestaurants.set(country, restaurants);
  return restaurants;
};
```

### Connection Management

```javascript
// Reuse Firebase app instance
let firebaseApp;

const getFirebaseApp = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  return firebaseApp;
};
```

## Real-time Features

### Live Data Updates

```javascript
import { onSnapshot, query, where } from 'firebase/firestore';

// Listen to order status changes
const subscribeToOrderUpdates = (userId, callback) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const orders = [];
    snapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    callback(orders);
  });
};

// Usage in React component
useEffect(() => {
  const unsubscribe = subscribeToOrderUpdates(user.id, setOrders);
  return () => unsubscribe(); // Cleanup
}, [user.id]);
```

## Backup and Migration

### Data Export

```javascript
// Export all data for backup
const exportData = async () => {
  const collections = ['users', 'restaurants', 'menuItems', 'orders', 'paymentMethods'];
  const backup = {};
  
  for (const collectionName of collections) {
    const snapshot = await getDocs(collection(db, collectionName));
    backup[collectionName] = [];
    
    snapshot.forEach(doc => {
      backup[collectionName].push({
        id: doc.id,
        ...doc.data()
      });
    });
  }
  
  return backup;
};
```

### Data Import

```javascript
// Import data from backup
const importData = async (backupData) => {
  for (const [collectionName, documents] of Object.entries(backupData)) {
    for (const doc of documents) {
      const { id, ...data } = doc;
      await addDoc(collection(db, collectionName), data);
    }
  }
};
```

## Monitoring and Analytics

### Firebase Analytics Integration

```javascript
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Track user actions
const trackOrderCreated = (orderId, totalAmount) => {
  logEvent(analytics, 'order_created', {
    order_id: orderId,
    value: totalAmount,
    currency: 'USD'
  });
};

const trackRestaurantViewed = (restaurantId, restaurantName) => {
  logEvent(analytics, 'restaurant_viewed', {
    restaurant_id: restaurantId,
    restaurant_name: restaurantName
  });
};
```

## Best Practices

### 1. Data Structure Design

- **Denormalize** when necessary for query performance
- **Use subcollections** for hierarchical data
- **Limit document size** to 1MB maximum
- **Use arrays sparingly** for large datasets

### 2. Query Optimization

- **Create composite indexes** for compound queries
- **Use pagination** for large result sets
- **Cache frequently accessed data**
- **Minimize read operations**

### 3. Security

- **Always validate data** on both client and server
- **Use security rules** as the primary security layer
- **Implement proper authentication**
- **Sanitize user inputs**

### 4. Cost Optimization

- **Minimize document reads**
- **Use efficient query patterns**
- **Implement proper caching**
- **Monitor usage with Firebase console**

---

This Firebase integration provides a robust, scalable, and secure foundation for the FoodieHub application, ensuring data consistency and optimal performance across all user roles and countries.