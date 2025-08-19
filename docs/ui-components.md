# 🎨 UI Components & Design System

## Overview

FoodieHub features a comprehensive design system built with **Tailwind CSS** and custom React components. The design emphasizes modern aesthetics, smooth animations, and excellent user experience across all devices.

## Design Philosophy

### Core Principles

- **Consistency** - Unified visual language across all components
- **Accessibility** - WCAG 2.1 compliant design patterns
- **Performance** - Optimized animations and efficient rendering
- **Responsiveness** - Mobile-first approach with fluid layouts
- **Modularity** - Reusable components with clear APIs

### Visual Identity

```css
/* Brand Colors */
Primary: #0ea5e9 (Sky Blue)
Secondary: #d946ef (Fuchsia)
Success: #22c55e (Green)
Warning: #f59e0b (Amber)
Error: #ef4444 (Red)

/* Typography */
Font Family: Inter, system-ui, sans-serif
Font Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

/* Spacing Scale */
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px

/* Border Radius */
Small: 6px, Medium: 8px, Large: 12px, XL: 16px, Full: 9999px
```

## Component Library

### Button Component

**File**: `client/src/components/UI/Button.js`

```jsx
import Button from '../UI/Button';

// Usage Examples
<Button variant="primary" size="medium">
  Primary Button
</Button>

<Button variant="secondary" size="large" icon={Plus}>
  Add Item
</Button>

<Button variant="danger" loading={isLoading}>
  Delete
</Button>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large' \| 'xl'` | `'medium'` | Button size |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `disabled` | `boolean` | `false` | Disables the button |
| `icon` | `React.Component` | `undefined` | Icon component (Lucide React) |
| `className` | `string` | `''` | Additional CSS classes |

#### Variants

```jsx
// Primary - Main actions
<Button variant="primary">Save Changes</Button>

// Secondary - Secondary actions
<Button variant="secondary">Cancel</Button>

// Success - Positive actions
<Button variant="success">Confirm Order</Button>

// Danger - Destructive actions
<Button variant="danger">Delete Account</Button>

// Outline - Subtle emphasis
<Button variant="outline">Learn More</Button>

// Ghost - Minimal emphasis
<Button variant="ghost">Skip</Button>
```

### Card Component

**File**: `client/src/components/UI/Card.js`

```jsx
import Card from '../UI/Card';

// Usage Examples
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

<Card hover shadow="large" padding="large">
  <InteractiveContent />
</Card>
```

#### Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Internal padding |
| `shadow` | `'none' \| 'soft' \| 'medium' \| 'large'` | `'soft'` | Shadow intensity |
| `hover` | `boolean` | `false` | Hover effects |
| `className` | `string` | `''` | Additional CSS classes |

### Badge Component

**File**: `client/src/components/UI/Badge.js`

```jsx
import Badge from '../UI/Badge';

// Usage Examples
<Badge variant="primary">New</Badge>
<Badge variant="success" size="large">Active</Badge>
<Badge variant="admin">Administrator</Badge>
```

#### Role-Specific Variants

```jsx
// User roles with gradient backgrounds
<Badge variant="admin">Admin</Badge>      // Red gradient
<Badge variant="manager">Manager</Badge>  // Blue gradient
<Badge variant="member">Member</Badge>    // Green gradient
```

### LoadingSpinner Component

**File**: `client/src/components/UI/LoadingSpinner.js`

```jsx
import LoadingSpinner from '../UI/LoadingSpinner';

// Usage Examples
<LoadingSpinner size="small" color="primary" />
<LoadingSpinner size="large" color="white" />
```

## Layout Components

### Header Component

**File**: `client/src/components/Layout/Header.js`

#### Features

- **Glass-morphism effect** with backdrop blur
- **Responsive navigation** with mobile hamburger menu
- **User profile dropdown** with avatar and role badge
- **Notification system** with badge counter
- **Country flag display** with emoji flags

```jsx
// Key Features
- Sticky positioning with backdrop blur
- Mobile-responsive hamburger menu
- User avatar with gradient background
- Role-based badge display
- Notification dropdown with animations
- Logout functionality
```

### Dashboard Layout

**File**: `client/src/components/Dashboard/Dashboard.js`

#### Features

- **Welcome header** with time-based greeting
- **Quick stats cards** with gradient backgrounds
- **Tab navigation** with active indicators
- **Animated content transitions**

```jsx
// Layout Structure
<Dashboard>
  <WelcomeHeader />
  <QuickStats />
  <TabNavigation />
  <TabContent />
</Dashboard>
```

## Animation System

### CSS Animations

**File**: `client/tailwind.config.js`

```javascript
// Custom animations defined in Tailwind config
animations: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'slide-down': 'slideDown 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  'bounce-in': 'bounceIn 0.6s ease-out',
  'pulse-slow': 'pulse 3s infinite',
  'gradient': 'gradient 6s ease infinite',
}
```

### Animation Usage

```jsx
// Fade in animation
<div className="animate-fade-in">Content</div>

// Slide up with delay
<div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
  Delayed content
</div>

// Scale in for modals
<div className="animate-scale-in">Modal content</div>

// Bounce in for important elements
<div className="animate-bounce-in">Welcome message</div>
```

### Staggered Animations

```jsx
// Restaurant cards with staggered animation
{restaurants.map((restaurant, index) => (
  <Card
    key={restaurant.id}
    className="animate-slide-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Restaurant content */}
  </Card>
))}
```

## Responsive Design

### Breakpoint System

```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Mobile-First Approach

```jsx
// Responsive grid example
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards automatically adjust based on screen size */}
</div>

// Responsive text sizing
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

## Color System

### Extended Palette

```javascript
// Tailwind config color extensions
colors: {
  primary: {
    50: '#f0f9ff',   // Lightest
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Base
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',  // Darkest
  },
  // Similar structure for secondary, success, warning, error
}
```

### Gradient Usage

```jsx
// Background gradients
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">
  Gradient background
</div>

// Text gradients
<h1 className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
  Gradient text
</h1>

// Button gradients
<button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
  Gradient button
</button>
```

## Typography System

### Font Hierarchy

```jsx
// Headings
<h1 className="text-4xl font-bold">Main Title</h1>
<h2 className="text-3xl font-bold">Section Title</h2>
<h3 className="text-2xl font-semibold">Subsection</h3>
<h4 className="text-xl font-semibold">Card Title</h4>

// Body text
<p className="text-base text-gray-900">Primary text</p>
<p className="text-sm text-gray-600">Secondary text</p>
<p className="text-xs text-gray-500">Caption text</p>

// Interactive text
<a className="text-primary-600 hover:text-primary-700">Link</a>
<button className="text-error-600 hover:text-error-700">Delete</button>
```

## Shadow System

### Custom Shadows

```javascript
// Extended shadow system in Tailwind config
boxShadow: {
  'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  'large': '0 10px 50px -12px rgba(0, 0, 0, 0.25)',
}
```

### Shadow Usage

```jsx
// Card shadows
<Card shadow="soft">Subtle shadow</Card>
<Card shadow="medium">Medium shadow</Card>
<Card shadow="large">Prominent shadow</Card>

// Hover effects
<div className="shadow-soft hover:shadow-medium transition-shadow">
  Interactive element
</div>
```

## Form Components

### Input Styling

```jsx
// Standard input
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
  placeholder="Enter text"
/>

// Input with icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  <input
    type="text"
    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    placeholder="Search..."
  />
</div>
```

### Select Styling

```jsx
<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

## Modal System

### Modal Structure

```jsx
// Modal overlay with backdrop blur
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
  <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-large animate-scale-in">
    {/* Modal content */}
  </div>
</div>
```

## Icon System

### Lucide React Integration

```jsx
import { 
  User, 
  Settings, 
  LogOut, 
  Star, 
  Heart,
  ShoppingCart 
} from 'lucide-react';

// Icon usage
<User className="w-5 h-5 text-gray-600" />
<Star className="w-4 h-4 text-yellow-500 fill-current" />
<Heart className="w-6 h-6 text-red-500" />
```

## Accessibility Features

### ARIA Labels

```jsx
// Button with screen reader support
<button
  aria-label="Add to favorites"
  className="p-2 rounded-full hover:bg-gray-100"
>
  <Heart className="w-5 h-5" />
</button>

// Form labels
<label htmlFor="email" className="block text-sm font-medium text-gray-700">
  Email Address
</label>
<input
  id="email"
  type="email"
  aria-describedby="email-help"
  className="..."
/>
<p id="email-help" className="text-sm text-gray-500">
  We'll never share your email
</p>
```

### Keyboard Navigation

```jsx
// Focus management
<button
  className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Accessible Button
</button>
```

## Performance Optimizations

### CSS-in-JS Alternatives

```jsx
// Using Tailwind classes instead of runtime CSS-in-JS
// Better performance, smaller bundle size

// Instead of styled-components
const StyledButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 12px 24px;
  border-radius: 8px;
`;

// Use Tailwind classes
<button className="bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 rounded-lg">
  Optimized Button
</button>
```

### Animation Performance

```css
/* Use transform and opacity for smooth animations */
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Dark Mode Support

### Theme Configuration

```javascript
// Tailwind config for dark mode
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        // Dark mode color variants
        dark: {
          50: '#f9fafb',
          900: '#111827',
        }
      }
    }
  }
}
```

### Dark Mode Classes

```jsx
// Dark mode responsive design
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-gray-900 dark:text-white">
    Theme-aware heading
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    Theme-aware text
  </p>
</div>
```

---

This comprehensive design system ensures consistency, accessibility, and performance across the entire FoodieHub application while providing a delightful user experience on all devices.