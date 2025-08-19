import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { COUNTRY_FLAGS } from '../../config/constants';
import RestaurantList from './RestaurantList';
import OrderHistory from './OrderHistory';
import PaymentMethods from './PaymentMethods';
import { Store, ShoppingBag, CreditCard, TrendingUp, Clock, MapPin } from 'lucide-react';
import Card from '../UI/Card';
import Badge from '../UI/Badge';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('restaurants');

  const tabs = [
    { id: 'restaurants', name: 'Restaurants', icon: Store, color: 'text-primary-600' },
    { id: 'orders', name: 'Orders', icon: ShoppingBag, color: 'text-secondary-600' },
  ];

  // Add payment methods tab only for admins
  if (user?.role === 'admin') {
    tabs.push({ id: 'payments', name: 'Payment Methods', icon: CreditCard, color: 'text-success-600' });
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'restaurants':
        return <RestaurantList />;
      case 'orders':
        return <OrderHistory />;
      case 'payments':
        return <PaymentMethods />;
      default:
        return <RestaurantList />;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getGreeting()}, {user?.name}! 👋
              </h1>
              <p className="mt-2 text-gray-600 flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{COUNTRY_FLAGS[user?.country]} {user?.country}</span>
                </span>
                <Badge variant={user?.role} size="medium">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </Badge>
              </p>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Card className="px-4 py-2" padding="none">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </Card>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card hover className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Restaurants</p>
                  <p className="text-2xl font-bold text-gray-900">12+</p>
                </div>
              </div>
            </Card>
            
            <Card hover className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Your Orders</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </Card>
            
            <Card hover className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$127</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Card padding="none" className="overflow-hidden">
            <nav className="flex">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 font-medium text-sm transition-all duration-200 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? tab.color : ''}`} />
                    <span>{tab.name}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;