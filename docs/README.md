# 📚 FoodieHub Documentation

Welcome to the comprehensive documentation for **FoodieHub** - a modern, role-based food ordering application built with React.js, Node.js, and Firebase.

## 📖 Table of Contents

- [🏗️ Architecture Overview](./architecture.md)
- [🚀 Getting Started](./getting-started.md)
- [🔐 Authentication & Authorization](./authentication.md)
- [🎨 UI Components & Design System](./ui-components.md)
- [🔥 Firebase Integration](./firebase.md)
- [🛡️ Role-Based Access Control](./rbac.md)
- [🌍 Country-Based Access](./country-access.md)
- [📱 API Documentation](./api.md)
- [🎯 Features Guide](./features.md)
- [⚙️ Configuration](./configuration.md)
- [🧪 Development Guide](./development.md)
- [🚀 Deployment](./deployment.md)
- [🔧 Troubleshooting](./troubleshooting.md)

## 🎯 Quick Overview

FoodieHub is a full-stack web application that demonstrates modern web development practices with:

- **Role-Based Access Control** (Admin, Manager, Member)
- **Country-Based Data Isolation** (India, America)
- **Modern UI/UX** with animations and responsive design
- **Real-time Data** with Firebase Firestore
- **Professional Architecture** with clean separation of concerns

## 🏆 Key Features

### 👥 User Roles
- **Admin**: Full system access including payment management
- **Manager**: Order management and checkout capabilities
- **Member**: Basic ordering functionality

### 🌍 Multi-Country Support
- Data isolation between India and America
- Country-specific restaurants and orders
- Localized user experience

### 🎨 Modern Design
- Professional UI with Tailwind CSS
- Smooth animations and transitions
- Mobile-responsive design
- Dark/Light theme support

### 🔒 Security
- JWT-based authentication
- Role-based route protection
- Input validation and sanitization
- Secure API endpoints

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase SDK** - Database and authentication
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Database
- **Firebase Firestore** - NoSQL document database
- **Real-time updates** - Live data synchronization
- **Scalable architecture** - Cloud-native solution

## 📁 Project Structure

```
food-ordering-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── config/         # Configuration files
│   │   └── ...
├── server/                 # Node.js backend
│   ├── routes/            # API route handlers
│   ├── middleware/        # Custom middleware
│   ├── config/            # Server configuration
│   └── scripts/           # Utility scripts
├── docs/                  # Documentation
└── README.md              # Main documentation
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-ordering-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Initialize database**
   ```bash
   cd server && node scripts/initializeData.js
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📞 Support

For detailed information on any aspect of the application, please refer to the specific documentation files in this directory.

---

*Built with ❤️ using modern web technologies*