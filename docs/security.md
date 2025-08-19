# 🔒 Security Guide

## Environment Variables Security

### 🚨 Critical Security Practices

#### Never Commit Sensitive Data
- **Never commit `.env` files** to version control
- Use `.env.example` files as templates
- Keep actual credentials in `.env` files (which are gitignored)

#### Environment Variable Validation
Both client and server configurations include validation to ensure all required environment variables are present:

```javascript
// Automatic validation on startup
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  // ... other required vars
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

### 🔐 Firebase Security

#### API Key Security
- Firebase API keys are **safe to expose** in client-side code
- They identify your Firebase project, not authenticate users
- Real security comes from Firestore security rules

#### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Country-based access control
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null && 
        resource.data.country == getUserCountry(request.auth.uid);
    }
    
    // Role-based access for payment methods
    match /paymentMethods/{paymentId} {
      allow read, write: if request.auth != null && 
        getUserRole(request.auth.uid) == 'admin';
    }
  }
}
```

### 🛡️ JWT Security

#### JWT Secret Management
- Use a **strong, random JWT secret** (minimum 32 characters)
- Never expose JWT secrets in client-side code
- Rotate JWT secrets periodically in production

```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Token Security
- Tokens expire after 24 hours by default
- Stored in localStorage (consider httpOnly cookies for production)
- Automatically cleared on logout or expiration

### 🌐 CORS Configuration

```javascript
// Restrict CORS to specific origins
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 🔍 Input Validation

#### Server-Side Validation
All API endpoints include input validation:

```javascript
// Example: Order creation validation
const validateOrderData = (data) => {
  if (!data.restaurantId || typeof data.restaurantId !== 'string') {
    throw new Error('Invalid restaurant ID');
  }
  
  if (!Array.isArray(data.items) || data.items.length === 0) {
    throw new Error('Order must contain items');
  }
  
  if (typeof data.totalAmount !== 'number' || data.totalAmount <= 0) {
    throw new Error('Invalid total amount');
  }
};
```

#### Client-Side Validation
Form inputs are validated before submission:

```javascript
// Email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation
const validatePassword = (password) => {
  return password.length >= 8;
};
```

### 🚫 Rate Limiting

API endpoints are protected with rate limiting:

```javascript
// Authentication endpoints: 5 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts'
});

// General endpoints: 100 requests per 15 minutes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});
```

### 🔐 Password Security

#### Hashing
Passwords are hashed using bcrypt with salt:

```javascript
const bcrypt = require('bcryptjs');

// Hash password before storing
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password during login
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
```

### 🌍 Country-Based Access Control

#### Data Isolation
Users can only access data from their assigned country:

```javascript
// Middleware to enforce country-based access
const authorizeCountry = (req, res, next) => {
  if (req.body.country && req.body.country !== req.user.country) {
    return res.status(403).json({ 
      error: 'Access restricted to your assigned country' 
    });
  }
  next();
};
```

#### Query Filtering
All database queries include country filtering:

```javascript
// Example: Get restaurants by user's country
const getRestaurants = async (userCountry) => {
  const q = query(
    collection(db, 'restaurants'),
    where('country', '==', userCountry)
  );
  return await getDocs(q);
};
```

### 🔒 Role-Based Authorization

#### Middleware Protection
API endpoints are protected by role-based middleware:

```javascript
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions' 
      });
    }
    next();
  };
};

// Usage
router.post('/orders', 
  authenticateToken, 
  authorizeRole(['admin', 'manager', 'member']), 
  createOrder
);
```

### 📊 Security Monitoring

#### Logging Security Events
```javascript
const logSecurityEvent = (event, userId, details) => {
  console.log(`[SECURITY] ${event}`, {
    userId,
    timestamp: new Date().toISOString(),
    details
  });
};

// Log failed login attempts
logSecurityEvent('LOGIN_FAILED', null, { email, ip: req.ip });

// Log unauthorized access attempts
logSecurityEvent('UNAUTHORIZED_ACCESS', userId, { 
  endpoint: req.path, 
  method: req.method 
});
```

### 🚀 Production Security Checklist

#### Environment Setup
- [ ] Set `NODE_ENV=production`
- [ ] Use strong, unique JWT secrets
- [ ] Configure proper CORS origins
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up proper Firebase security rules

#### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor authentication failures
- [ ] Track unusual access patterns
- [ ] Set up alerts for security events

#### Regular Maintenance
- [ ] Rotate JWT secrets periodically
- [ ] Update dependencies regularly
- [ ] Review and update security rules
- [ ] Audit user permissions
- [ ] Monitor for security vulnerabilities

### 🆘 Security Incident Response

#### If Credentials Are Compromised
1. **Immediately rotate** all affected secrets
2. **Revoke** compromised tokens
3. **Update** environment variables
4. **Notify** affected users if necessary
5. **Review** access logs for suspicious activity

#### If Unauthorized Access Is Detected
1. **Block** the source IP if possible
2. **Review** affected user accounts
3. **Check** for data modifications
4. **Update** security rules if needed
5. **Document** the incident for future prevention

---

Following these security practices ensures that the FoodieHub application maintains enterprise-level security standards while protecting user data and system integrity.