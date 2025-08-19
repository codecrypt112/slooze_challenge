# 🚀 Getting Started

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Node.js** (v16.0.0 or higher)
  ```bash
  node --version  # Should be v16+
  ```

- **npm** (v8.0.0 or higher)
  ```bash
  npm --version   # Should be v8+
  ```

- **Git** (for cloning the repository)
  ```bash
  git --version
  ```

### Firebase Account

- Create a free Firebase account at [https://console.firebase.google.com](https://console.firebase.google.com)
- Basic understanding of Firestore database concepts

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-ordering-app
```

### 2. Install Dependencies

We provide a convenient script to install all dependencies:

```bash
# Install root dependencies and both client/server dependencies
npm run install-all
```

Or install manually:

```bash
# Root dependencies
npm install

# Server dependencies
cd server && npm install

# Client dependencies
cd ../client && npm install
```

### 3. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name (e.g., "foodie-hub")
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users
5. Click "Done"

#### Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

The configuration is already set up in the project files:
- `client/src/config/firebase.js`
- `server/config/firebase.js`

### 4. Environment Configuration

#### Server Environment Variables

Copy the example environment file and configure:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your Firebase configuration:

```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=development

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

#### Client Environment Variables

Copy the example environment file and configure:

```bash
cd client
cp .env.example .env
```

Edit `client/.env` with your Firebase configuration:

```env
# Firebase Configuration (same values as server)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

> **Important**: Replace the placeholder values with your actual Firebase configuration from the Firebase Console.

### 5. Initialize Database

Run the database initialization script to populate sample data:

```bash
cd server
node scripts/initializeData.js
```

This will create:
- ✅ 6 sample users with different roles
- ✅ 4 restaurants (2 in India, 2 in America)
- ✅ Menu items for each restaurant
- ✅ Sample payment methods

### 6. Start the Application

#### Development Mode (Recommended)

Start both client and server concurrently:

```bash
# From the root directory
npm run dev
```

This will start:
- **Backend server** on http://localhost:5000
- **Frontend client** on http://localhost:3000

#### Manual Start

Start services separately:

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start
```

## First Login

### Development Mode

The application includes sample users for testing. Set `DEV_MODE = true` in `client/src/config/constants.js` to see quick login options.

### Sample Users

| Role | Email | Password | Country |
|------|-------|----------|---------|
| Admin | nick.fury@shield.com | admin123 | America |
| Manager | captain.marvel@shield.com | manager123 | India |
| Manager | captain.america@shield.com | manager123 | America |
| Member | thanos@shield.com | member123 | India |
| Member | thor@shield.com | member123 | India |
| Member | travis@shield.com | member123 | America |

## Verification Steps

### 1. Check Server Health

Visit http://localhost:5000/api/health

Expected response:
```json
{
  "status": "OK",
  "message": "Food Ordering API is running"
}
```

### 2. Test Authentication

1. Go to http://localhost:3000
2. Try logging in with any sample user
3. Verify you can access the dashboard

### 3. Test Role-Based Access

- **Admin**: Can access all features including payment methods
- **Manager**: Can create orders, checkout, and cancel orders
- **Member**: Can only view restaurants and create orders

### 4. Test Country-Based Access

- **India users**: See Indian restaurants only
- **America users**: See American restaurants only

## Development Configuration

### Enable Development Features

In `client/src/config/constants.js`:

```javascript
// Show sample users on login page
export const DEV_MODE = true;

// API base URL for development
export const API_BASE_URL = 'http://localhost:5000/api';
```

### Disable for Production

```javascript
// Hide sample users in production
export const DEV_MODE = false;

// Production API URL
export const API_BASE_URL = 'https://your-api-domain.com/api';
```

## Common Issues & Solutions

### Port Already in Use

If port 3000 or 5000 is already in use:

```bash
# Kill process using port 3000
npx kill-port 3000

# Kill process using port 5000
npx kill-port 5000
```

### Firebase Connection Issues

1. Verify Firebase configuration in both client and server
2. Check Firestore rules allow read/write in test mode
3. Ensure your IP is not blocked by Firebase

### Database Initialization Fails

1. Check Firebase configuration
2. Verify Firestore is enabled
3. Check network connectivity
4. Review console logs for specific errors

### Module Not Found Errors

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Once you have the application running:

1. 📖 Read the [Features Guide](./features.md) to understand all capabilities
2. 🎨 Explore the [UI Components](./ui-components.md) documentation
3. 🔐 Learn about [Authentication & Authorization](./authentication.md)
4. 📱 Check out the [API Documentation](./api.md)
5. ⚙️ Review [Configuration Options](./configuration.md)

## Development Workflow

### Making Changes

1. **Frontend changes**: Saved automatically with hot reload
2. **Backend changes**: Server restarts automatically with nodemon
3. **Database changes**: Use Firebase Console or update initialization script

### Testing Different Roles

1. Logout from current user
2. Login with different sample user
3. Observe different UI and available features
4. Test role-specific functionality

### Adding New Features

1. Update database schema if needed
2. Create/modify API endpoints
3. Update frontend components
4. Test with different user roles
5. Update documentation

---

🎉 **Congratulations!** You now have FoodieHub running locally. Explore the application and refer to other documentation files for detailed information about specific features.