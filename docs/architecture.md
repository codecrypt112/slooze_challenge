# 🏗️ Architecture Overview

## System Architecture

FoodieHub follows a modern **3-tier architecture** with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Presentation  │    │    Business     │    │      Data       │
│     Layer       │    │     Logic       │    │     Layer       │
│                 │    │     Layer       │    │                 │
│   React.js      │◄──►│   Node.js       │◄──►│   Firebase      │
│   Tailwind CSS  │    │   Express.js    │    │   Firestore     │
│   Components    │    │   JWT Auth      │    │   Collections   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App
├── AuthProvider (Context)
├── Router
│   ├── Login
│   └── ProtectedRoute
│       ├── Header
│       ├── Dashboard
│       │   ├── RestaurantList
│       │   ├── OrderHistory
│       │   └── PaymentMethods (Admin only)
│       └── ProfilePage (Modal)
└── Toast Notifications
```

### State Management

- **React Context API** for global state (authentication)
- **Local State** with useState for component-specific data
- **Custom Hooks** for reusable logic

### Design System

```
UI Components/
├── Button          # Reusable button with variants
├── Card            # Container component with shadows
├── Badge           # Status indicators
├── LoadingSpinner  # Loading states
└── Form Elements   # Input, Select, etc.
```

## Backend Architecture

### API Structure

```
server/
├── index.js           # Express app setup
├── config/
│   └── firebase.js    # Firebase configuration
├── middleware/
│   └── auth.js        # Authentication middleware
├── routes/
│   ├── auth.js        # Authentication endpoints
│   ├── restaurants.js # Restaurant management
│   ├── orders.js      # Order management
│   └── payments.js    # Payment methods
└── scripts/
    └── initializeData.js # Database seeding
```

### Middleware Stack

1. **CORS** - Cross-origin resource sharing
2. **JSON Parser** - Request body parsing
3. **Authentication** - JWT token validation
4. **Authorization** - Role-based access control
5. **Country Filter** - Geographic data isolation

## Database Architecture

### Firestore Collections

```
firestore/
├── users/
│   ├── {userId}
│   │   ├── name: string
│   │   ├── email: string
│   │   ├── password: string (hashed)
│   │   ├── role: 'admin' | 'manager' | 'member'
│   │   └── country: 'India' | 'America'
│   
├── restaurants/
│   ├── {restaurantId}
│   │   ├── name: string
│   │   ├── cuisine: string
│   │   ├── country: string
│   │   ├── rating: number
│   │   └── deliveryTime: string
│   
├── menuItems/
│   ├── {itemId}
│   │   ├── restaurantId: string
│   │   ├── name: string
│   │   ├── description: string
│   │   ├── price: number
│   │   └── category: string
│   
├── orders/
│   ├── {orderId}
│   │   ├── userId: string
│   │   ├── restaurantId: string
│   │   ├── items: array
│   │   ├── totalAmount: number
│   │   ├── status: string
│   │   ├── country: string
│   │   └── timestamps
│   
└── paymentMethods/
    ├── {paymentId}
    │   ├── type: string
    │   ├── cardNumber: string (masked)
    │   ├── expiryDate: string
    │   ├── holderName: string
    │   └── country: string
```

## Security Architecture

### Authentication Flow

```
1. User Login
   ├── Email/Password validation
   ├── bcrypt password verification
   ├── JWT token generation
   └── Token storage (localStorage)

2. Protected Routes
   ├── Token extraction from headers
   ├── JWT verification
   ├── User data retrieval
   └── Request processing
```

### Authorization Layers

1. **Route Level** - Protected routes require authentication
2. **API Level** - Middleware validates tokens
3. **Role Level** - Specific endpoints check user roles
4. **Country Level** - Data filtered by user's country

## Data Flow

### Restaurant Browsing

```
User Request → Auth Check → Country Filter → Database Query → Response
```

### Order Creation

```
User Input → Validation → Auth Check → Restaurant Verification → Order Creation → Response
```

### Payment Processing

```
Admin/Manager → Payment Method Selection → Order Update → Status Change → Notification
```

## Performance Considerations

### Frontend Optimizations

- **Code Splitting** - Lazy loading of components
- **Memoization** - React.memo for expensive components
- **Debouncing** - Search input optimization
- **Image Optimization** - Lazy loading and compression

### Backend Optimizations

- **Connection Pooling** - Efficient database connections
- **Caching** - Response caching for static data
- **Compression** - Gzip compression for responses
- **Rate Limiting** - API request throttling

### Database Optimizations

- **Indexing** - Firestore composite indexes
- **Query Optimization** - Efficient query patterns
- **Data Denormalization** - Strategic data duplication
- **Pagination** - Large dataset handling

## Scalability Design

### Horizontal Scaling

- **Stateless Backend** - No server-side sessions
- **Load Balancing** - Multiple server instances
- **CDN Integration** - Static asset distribution
- **Microservices Ready** - Modular architecture

### Vertical Scaling

- **Resource Optimization** - Memory and CPU efficiency
- **Database Scaling** - Firestore auto-scaling
- **Caching Layers** - Redis integration ready
- **Performance Monitoring** - Built-in logging

## Error Handling

### Frontend Error Boundaries

```javascript
try {
  // API call
} catch (error) {
  // User-friendly error message
  // Error logging
  // Fallback UI
}
```

### Backend Error Handling

```javascript
app.use((err, req, res, next) => {
  // Error logging
  // Sanitized error response
  // Status code mapping
});
```

## Monitoring & Logging

### Application Metrics

- **Response Times** - API endpoint performance
- **Error Rates** - Application stability
- **User Activity** - Feature usage analytics
- **Database Performance** - Query optimization

### Security Monitoring

- **Authentication Attempts** - Login success/failure rates
- **Authorization Violations** - Unauthorized access attempts
- **Data Access Patterns** - Unusual query patterns
- **Token Validation** - JWT security metrics

---

This architecture ensures **scalability**, **security**, and **maintainability** while providing a smooth user experience across all supported roles and countries.