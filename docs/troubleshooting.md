# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### Node.js Version Compatibility

**Problem**: Application fails to start with Node.js version errors.

**Solution**:
```bash
# Check Node.js version
node --version

# Should be v16.0.0 or higher
# If not, install the correct version:
nvm install 16
nvm use 16

# Or download from nodejs.org
```

#### npm Install Failures

**Problem**: Dependencies fail to install.

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm install

# Try with legacy peer deps
npm install --legacy-peer-deps

# Use yarn as alternative
npm install -g yarn
yarn install
```

#### Permission Errors (macOS/Linux)

**Problem**: EACCES permission errors during installation.

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm to avoid permission issues
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Firebase Issues

#### Firebase Configuration Errors

**Problem**: Firebase connection fails or returns authentication errors.

**Solutions**:

1. **Verify Firebase Config**:
```javascript
// Check client/src/config/firebase.js
const firebaseConfig = {
  apiKey: "your-api-key", // Should not be empty
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id", // Must match Firebase console
  // ... other config
};
```

2. **Enable Firestore**:
   - Go to Firebase Console
   - Select your project
   - Navigate to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode"

3. **Check Firestore Rules**:
```javascript
// Firestore rules should allow read/write in development
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

#### Database Initialization Fails

**Problem**: `node scripts/initializeData.js` fails.

**Solutions**:

1. **Check Firebase Connection**:
```bash
cd server
node -e "
const { db } = require('./config/firebase');
console.log('Firebase connected:', !!db);
"
```

2. **Verify Environment Variables**:
```bash
# Check if .env file exists
ls server/.env

# Check JWT_SECRET is set
grep JWT_SECRET server/.env
```

3. **Run with Debug Logging**:
```bash
cd server
DEBUG=* node scripts/initializeData.js
```

### Server Issues

#### Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::5000`

**Solutions**:
```bash
# Find process using port 5000
lsof -i :5000
# or
netstat -tulpn | grep :5000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=5001 npm run server
```

#### JWT Secret Missing

**Problem**: Server crashes with JWT secret error.

**Solution**:
```bash
# Create .env file in server directory
cd server
echo "JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env
```

#### CORS Errors

**Problem**: Frontend can't connect to backend due to CORS.

**Solutions**:

1. **Check CORS Configuration**:
```javascript
// server/index.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
```

2. **Verify Frontend API URL**:
```javascript
// client/src/config/constants.js
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Frontend Issues

#### React App Won't Start

**Problem**: `npm start` fails in client directory.

**Solutions**:
```bash
# Check if port 3000 is available
lsof -i :3000

# Clear React cache
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try different port
PORT=3001 npm start
```

#### Build Failures

**Problem**: `npm run build` fails with memory errors.

**Solutions**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or add to package.json scripts
"build": "NODE_OPTIONS='--max-old-space-size=4096' react-scripts build"
```

#### Tailwind CSS Not Working

**Problem**: Tailwind classes not applying styles.

**Solutions**:

1. **Check Tailwind Installation**:
```bash
cd client
npm list tailwindcss
```

2. **Verify Tailwind Config**:
```javascript
// client/tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this path is correct
  ],
  // ... rest of config
}
```

3. **Check CSS Import**:
```css
/* client/src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Authentication Issues

#### Login Fails with Valid Credentials

**Problem**: Login returns 401 even with correct credentials.

**Solutions**:

1. **Check Database Data**:
```bash
# Verify users were created
cd server
node -e "
const { db } = require('./config/firebase');
const { collection, getDocs } = require('firebase/firestore');
getDocs(collection(db, 'users')).then(snapshot => {
  console.log('Users found:', snapshot.size);
  snapshot.forEach(doc => console.log(doc.data().email));
});
"
```

2. **Verify Password Hashing**:
```bash
# Check if bcrypt is working
cd server
node -e "
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('admin123', 10);
console.log('Hash created:', !!hash);
console.log('Verification:', bcrypt.compareSync('admin123', hash));
"
```

3. **Check JWT Secret**:
```bash
# Ensure JWT_SECRET is set and consistent
grep JWT_SECRET server/.env
```

#### Token Expires Immediately

**Problem**: User gets logged out immediately after login.

**Solutions**:

1. **Check Token Expiration**:
```javascript
// server/routes/auth.js
const token = jwt.sign(
  { userId: userDoc.id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' } // Increase if needed
);
```

2. **Verify Token Storage**:
```javascript
// Check browser localStorage
localStorage.getItem('token');
```

### Database Issues

#### Firestore Permission Denied

**Problem**: Database operations fail with permission denied.

**Solutions**:

1. **Update Firestore Rules**:
```javascript
// Firebase Console > Firestore > Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Development only
    }
  }
}
```

2. **Check Authentication State**:
```javascript
// Verify user is authenticated
console.log('User authenticated:', !!user);
console.log('Token exists:', !!localStorage.getItem('token'));
```

#### Query Limits Exceeded

**Problem**: Firestore queries fail due to missing indexes.

**Solutions**:

1. **Create Required Indexes**:
   - Go to Firebase Console > Firestore > Indexes
   - Add composite indexes for complex queries

2. **Simplify Queries**:
```javascript
// Instead of complex query
const q = query(
  collection(db, 'orders'),
  where('userId', '==', userId),
  where('country', '==', country),
  orderBy('createdAt', 'desc')
);

// Use simpler query and filter in code
const q = query(
  collection(db, 'orders'),
  where('userId', '==', userId)
);
```

### Performance Issues

#### Slow Loading Times

**Problem**: Application loads slowly.

**Solutions**:

1. **Enable Code Splitting**:
```javascript
// Use React.lazy for route components
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

2. **Optimize Images**:
```javascript
// Use optimized image URLs
const optimizedImageUrl = (url) => {
  return `${url}?w=400&q=80`; // Width 400px, quality 80%
};
```

3. **Implement Caching**:
```javascript
// Cache API responses
const cache = new Map();

const fetchWithCache = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
};
```

#### Memory Leaks

**Problem**: Application becomes slow over time.

**Solutions**:

1. **Clean Up Event Listeners**:
```javascript
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

2. **Cancel Async Operations**:
```javascript
useEffect(() => {
  const abortController = new AbortController();
  
  fetch('/api/data', { signal: abortController.signal })
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    });
  
  return () => {
    abortController.abort();
  };
}, []);
```

### Development Issues

#### Hot Reload Not Working

**Problem**: Changes don't reflect automatically.

**Solutions**:
```bash
# Clear React cache
rm -rf node_modules/.cache

# Restart development server
npm start

# Check if files are being watched
# Add to package.json if needed:
"start": "CHOKIDAR_USEPOLLING=true react-scripts start"
```

#### Environment Variables Not Loading

**Problem**: `process.env` variables are undefined.

**Solutions**:

1. **Check File Names**:
```bash
# Files should be named exactly:
.env
.env.local
.env.development
.env.production
```

2. **Prefix with REACT_APP_**:
```bash
# In client/.env
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Restart Development Server**:
```bash
# Environment changes require restart
npm start
```

### Production Issues

#### Build Size Too Large

**Problem**: Production build is too large.

**Solutions**:

1. **Analyze Bundle**:
```bash
npm run build
npx bundle-analyzer build/static/js/*.js
```

2. **Implement Code Splitting**:
```javascript
// Split by routes
const Login = React.lazy(() => import('./components/Auth/Login'));
const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));
```

3. **Remove Unused Dependencies**:
```bash
# Find unused dependencies
npx depcheck

# Remove unused packages
npm uninstall <unused-package>
```

#### Deployment Failures

**Problem**: Application fails to deploy or run in production.

**Solutions**:

1. **Check Environment Variables**:
```bash
# Ensure all required env vars are set
echo $JWT_SECRET
echo $NODE_ENV
```

2. **Build Locally First**:
```bash
# Test production build locally
npm run build
npx serve -s build
```

3. **Check Logs**:
```bash
# Check application logs
tail -f /var/log/app.log

# Or use PM2
pm2 logs
```

## Debugging Tools

### Browser Developer Tools

1. **Network Tab**: Check API requests and responses
2. **Console Tab**: View JavaScript errors and logs
3. **Application Tab**: Inspect localStorage and sessionStorage
4. **Sources Tab**: Set breakpoints and debug code

### Server Debugging

```bash
# Enable debug logging
DEBUG=* npm run server

# Use Node.js inspector
node --inspect server/index.js

# Use nodemon with debugging
nodemon --inspect server/index.js
```

### Database Debugging

```javascript
// Add logging to Firebase operations
const loggedGetDocs = async (query) => {
  console.log('Executing query:', query);
  const snapshot = await getDocs(query);
  console.log('Query result:', snapshot.size, 'documents');
  return snapshot;
};
```

## Getting Help

### Log Collection

When reporting issues, include:

1. **Error Messages**: Full error text and stack traces
2. **Environment Info**: Node.js version, OS, browser
3. **Steps to Reproduce**: Exact steps that cause the issue
4. **Configuration**: Relevant config files (without secrets)

### Useful Commands

```bash
# System information
node --version
npm --version
git --version

# Project information
npm list --depth=0
npm run build 2>&1 | tee build.log

# Network debugging
curl -I http://localhost:5000/api/health
ping localhost
```

### Community Resources

- **GitHub Issues**: Check existing issues and solutions
- **Stack Overflow**: Search for similar problems
- **Firebase Documentation**: Official Firebase guides
- **React Documentation**: React-specific issues

---

This troubleshooting guide covers the most common issues you might encounter while developing or deploying the FoodieHub application. Keep this guide handy for quick problem resolution.