# 🍽️ FoodieHub - Role-Based Food Ordering Platform

<div align="center">

![FoodieHub Logo](https://img.shields.io/badge/🍽️-FoodieHub-blue?style=for-the-badge&labelColor=2563eb&color=0ea5e9)

**A modern, full-stack food ordering application with role-based access control and country-specific data isolation**

[![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🎯 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [👥 Demo Users](#-demo-users)

</div>

---

## 🌟 Overview

FoodieHub is a comprehensive food ordering platform designed for organizations with multiple user roles and geographic locations. Built with modern web technologies, it demonstrates enterprise-level architecture with role-based access control, country-specific data isolation, and a beautiful, responsive user interface.

### ✨ Key Highlights

- 🔐 **Role-Based Access Control** - Admin, Manager, and Member roles with specific permissions
- 🌍 **Multi-Country Support** - Data isolation between India and America
- 🎨 **Modern UI/UX** - Professional design with smooth animations and responsive layout
- 🔥 **Real-time Data** - Firebase Firestore for instant updates
- 🛡️ **Enterprise Security** - JWT authentication, input validation, and secure API endpoints
- 📱 **Mobile-First** - Optimized for all devices with touch-friendly interactions

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ and **npm** v8+
- **Firebase** account (free tier sufficient)
- **Git** for cloning the repository

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd food-ordering-app

# 2. Install all dependencies
npm run install-all

# 3. Set up environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit both .env files with your Firebase configuration

# 4. Initialize the database with sample data
cd server && node scripts/initializeData.js

# 5. Start the development servers
cd .. && npm run dev
```

🎉 **That's it!** The application will be running at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [🏗️ Architecture](./docs/architecture.md) | System design and component structure |
| [🚀 Getting Started](./docs/getting-started.md) | Detailed setup and installation guide |
| [🔥 Firebase Integration](./docs/firebase.md) | Database setup and Firestore configuration |
| [🎨 UI Components](./docs/ui-components.md) | Design system and component library |
| [📱 API Documentation](./docs/api.md) | Complete API reference and examples |
| [🎯 Features Guide](./docs/features.md) | Detailed feature breakdown by role |
| [⚙️ Configuration](./docs/configuration.md) | Environment and deployment settings |
| [🔧 Troubleshooting](./docs/troubleshooting.md) | Common issues and solutions |

## 🎯 Features

### 👥 Role-Based Access Control

<table>
<tr>
<th>👑 Admin</th>
<th>👨‍💼 Manager</th>
<th>👤 Member</th>
</tr>
<tr>
<td>

**Full System Access**
- ✅ View restaurants & menus
- ✅ Create & manage orders
- ✅ Checkout & payment
- ✅ Cancel orders
- ✅ **Manage payment methods**
- ✅ Access all features

</td>
<td>

**Order Management**
- ✅ View restaurants & menus
- ✅ Create & manage orders
- ✅ Checkout & payment
- ✅ Cancel orders
- ❌ Payment method management
- ✅ Team order oversight

</td>
<td>

**Basic Access**
- ✅ View restaurants & menus
- ✅ Create orders
- ❌ Cannot checkout/pay
- ❌ Cannot cancel orders
- ❌ No admin features
- ✅ Personal order history

</td>
</tr>
</table>

### 🌍 Country-Based Data Isolation

| 🇮🇳 India | 🇺🇸 America |
|-----------|-------------|
| **Users**: Captain Marvel (Manager), Thanos (Member), Thor (Member) | **Users**: Nick Fury (Admin), Captain America (Manager), Travis (Member) |
| **Restaurants**: Spice Garden, Mumbai Express | **Restaurants**: American Diner, Burger Palace |
| **Data**: Completely isolated from America | **Data**: Completely isolated from India |

### 🎨 Modern User Experience

- **🎭 Beautiful Animations** - Smooth transitions and micro-interactions
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **🌙 Theme Support** - Light/dark mode ready
- **♿ Accessibility** - WCAG 2.1 compliant
- **⚡ Performance** - Optimized loading and rendering

## 🛠️ Tech Stack

<div align="center">

### Frontend
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

### Database & Services
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![Firestore](https://img.shields.io/badge/Firestore-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/products/firestore)

</div>

## 👥 Demo Users

The application comes with pre-configured demo users for testing all features:

<table>
<tr>
<th>User</th>
<th>Email</th>
<th>Password</th>
<th>Role</th>
<th>Country</th>
<th>Avatar</th>
</tr>
<tr>
<td><strong>Nick Fury</strong></td>
<td>nick.fury@shield.com</td>
<td>admin123</td>
<td>👑 Admin</td>
<td>🇺🇸 America</td>
<td>👨‍💼</td>
</tr>
<tr>
<td><strong>Captain Marvel</strong></td>
<td>captain.marvel@shield.com</td>
<td>manager123</td>
<td>👨‍💼 Manager</td>
<td>🇮🇳 India</td>
<td>👩‍💼</td>
</tr>
<tr>
<td><strong>Captain America</strong></td>
<td>captain.america@shield.com</td>
<td>manager123</td>
<td>👨‍💼 Manager</td>
<td>🇺🇸 America</td>
<td>🦸‍♂️</td>
</tr>
<tr>
<td><strong>Thanos</strong></td>
<td>thanos@shield.com</td>
<td>member123</td>
<td>👤 Member</td>
<td>🇮🇳 India</td>
<td>👤</td>
</tr>
<tr>
<td><strong>Thor</strong></td>
<td>thor@shield.com</td>
<td>member123</td>
<td>👤 Member</td>
<td>🇮🇳 India</td>
<td>⚡</td>
</tr>
<tr>
<td><strong>Travis</strong></td>
<td>travis@shield.com</td>
<td>member123</td>
<td>👤 Member</td>
<td>🇺🇸 America</td>
<td>👨‍💻</td>
</tr>
</table>

> 💡 **Development Mode**: Set `DEV_MODE = true` in `client/src/config/constants.js` to see quick login options. Set to `false` for production.

## 🏗️ Project Structure

```
food-ordering-app/
├── 📁 client/                 # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   │   ├── 📁 Auth/       # Authentication components
│   │   │   ├── 📁 Dashboard/  # Main app components
│   │   │   ├── 📁 Layout/     # Layout components
│   │   │   ├── 📁 Profile/    # User profile components
│   │   │   └── 📁 UI/         # Design system components
│   │   ├── 📁 context/        # React context providers
│   │   ├── 📁 config/         # Configuration files
│   │   └── 📄 App.js          # Main app component
│   └── 📄 package.json
├── 📁 server/                 # Node.js backend API
│   ├── 📁 routes/            # API route handlers
│   ├── 📁 middleware/        # Custom middleware
│   ├── 📁 config/            # Server configuration
│   ├── 📁 scripts/           # Utility scripts
│   └── 📄 index.js           # Server entry point
├── 📁 docs/                  # Comprehensive documentation
└── 📄 README.md              # This file
```

## 🚦 API Endpoints

### 🔐 Authentication
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user info

### 🏪 Restaurants
- `GET /api/restaurants` - List restaurants (country-filtered)
- `GET /api/restaurants/:id/menu` - Get restaurant menu

### 📋 Orders
- `POST /api/orders` - Create order (All roles)
- `GET /api/orders` - Get user orders
- `PATCH /api/orders/:id/cancel` - Cancel order (Admin/Manager)
- `POST /api/orders/:id/checkout` - Process payment (Admin/Manager)

### 💳 Payment Methods
- `GET /api/payments` - List payment methods (Admin only)
- `POST /api/payments` - Add payment method (Admin only)
- `PUT /api/payments/:id` - Update payment method (Admin only)
- `DELETE /api/payments/:id` - Delete payment method (Admin only)

## 🔒 Security Features

- 🔐 **JWT Authentication** - Secure token-based auth
- 🛡️ **Role-Based Authorization** - Granular permission control
- 🌍 **Geographic Data Isolation** - Country-based access restrictions
- 🔒 **Password Security** - bcrypt hashing with salt
- ✅ **Input Validation** - Comprehensive data sanitization
- 🚫 **CORS Protection** - Cross-origin request security

## 🚀 Deployment

### Production Configuration

1. **Set Environment Variables**:
```bash
# server/.env.production
NODE_ENV=production
JWT_SECRET=your_production_secret
CORS_ORIGIN=https://your-domain.com
```

2. **Update Firebase Config**:
```javascript
// Update both client and server configs with production Firebase project
```

3. **Build and Deploy**:
```bash
npm run build
# Deploy to your preferred hosting service
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Firebase Team** for the excellent backend services
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library

---

<div align="center">

**Built with ❤️ using modern web technologies**

[⬆ Back to Top](#️-foodiehub---role-based-food-ordering-platform)

</div>