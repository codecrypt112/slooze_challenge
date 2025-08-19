import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, MapPin, Settings, Bell, Menu, X } from 'lucide-react';
import { APP_NAME, COUNTRY_FLAGS } from '../../config/constants';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

const Header = ({ onProfileClick }) => {
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleProfileClick = () => {
    onProfileClick();
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍽️</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {APP_NAME}
            </h1>
          </div>
          
          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-error-500 text-white text-xs rounded-full flex items-center justify-center">
                      2
                    </span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-large border border-gray-100 py-2 animate-slide-down">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-900">Your order #1234 has been confirmed</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-900">New restaurant added in your area</p>
                          <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user.name?.charAt(0)}
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role} size="small">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center">
                          <span className="mr-1">{COUNTRY_FLAGS[user.country]}</span>
                          {user.country}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="small"
                      icon={Settings}
                      onClick={handleProfileClick}
                      className="p-2"
                    />
                    <Button
                      variant="ghost"
                      size="small"
                      icon={LogOut}
                      onClick={logout}
                      className="p-2 text-error-600 hover:text-error-700 hover:bg-error-50"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && user && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-slide-down">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={user.role} size="small">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center">
                    <span className="mr-1">{COUNTRY_FLAGS[user.country]}</span>
                    {user.country}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Profile Settings</span>
              </button>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
                <span className="ml-auto bg-error-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-error-600 hover:bg-error-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;