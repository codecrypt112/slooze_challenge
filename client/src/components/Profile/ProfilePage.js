import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, MapPin, Shield, Edit3, Save, X, Camera, Bell, Lock, Globe } from 'lucide-react';
import { COUNTRY_FLAGS } from '../../config/constants';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import toast from 'react-hot-toast';

const ProfilePage = ({ onClose }) => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [activeTab, setActiveTab] = useState('profile');

    const handleSave = () => {
        // In a real app, this would make an API call to update the user
        toast.success('Profile updated successfully!');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
        });
        setIsEditing(false);
    };

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: 'security', name: 'Security', icon: Lock },
        { id: 'preferences', name: 'Preferences', icon: Globe },
    ];

    const renderProfileTab = () => (
        <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-large">
                        {user?.name?.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-medium flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors">
                        <Camera className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                        <Badge variant={user?.role} size="large">
                            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                        </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{user?.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm flex items-center">
                                <span className="mr-1">{COUNTRY_FLAGS[user?.country]}</span>
                                {user?.country}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2">
                    {!isEditing ? (
                        <Button
                            variant="outline"
                            icon={Edit3}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex space-x-2">
                            <Button
                                variant="success"
                                icon={Save}
                                onClick={handleSave}
                                size="small"
                            >
                                Save
                            </Button>
                            <Button
                                variant="secondary"
                                icon={X}
                                onClick={handleCancel}
                                size="small"
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Form */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{user?.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        {isEditing ? (
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                        ) : (
                            <p className="text-gray-900 py-2">{user?.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                        </label>
                        <div className="py-2">
                            <Badge variant={user?.role} size="large">
                                <Shield className="w-4 h-4 mr-1" />
                                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                        </label>
                        <div className="py-2 flex items-center space-x-2">
                            <span className="text-xl">{COUNTRY_FLAGS[user?.country]}</span>
                            <span className="text-gray-900">{user?.country}</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Role Permissions */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">View restaurants & menu items</span>
                        <Badge variant="success" size="small">✓ Allowed</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Create orders</span>
                        <Badge variant="success" size="small">✓ Allowed</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Checkout & pay</span>
                        <Badge
                            variant={['admin', 'manager'].includes(user?.role) ? 'success' : 'error'}
                            size="small"
                        >
                            {['admin', 'manager'].includes(user?.role) ? '✓ Allowed' : '✗ Restricted'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Cancel orders</span>
                        <Badge
                            variant={['admin', 'manager'].includes(user?.role) ? 'success' : 'error'}
                            size="small"
                        >
                            {['admin', 'manager'].includes(user?.role) ? '✓ Allowed' : '✗ Restricted'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Manage payment methods</span>
                        <Badge
                            variant={user?.role === 'admin' ? 'success' : 'error'}
                            size="small"
                        >
                            {user?.role === 'admin' ? '✓ Allowed' : '✗ Restricted'}
                        </Badge>
                    </div>
                </div>
            </Card>
        </div>
    );

    const renderNotificationsTab = () => (
        <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
                {[
                    { label: 'Order confirmations', description: 'Get notified when your orders are confirmed' },
                    { label: 'Order updates', description: 'Receive updates about your order status' },
                    { label: 'New restaurants', description: 'Be the first to know about new restaurants' },
                    { label: 'Promotions', description: 'Receive promotional offers and discounts' },
                ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                ))}
            </div>
        </Card>
    );

    const renderSecurityTab = () => (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Confirm new password"
                        />
                    </div>
                    <Button variant="primary">Update Password</Button>
                </div>
            </Card>

            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900">Enable 2FA</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                </div>
            </Card>
        </div>
    );

    const renderPreferencesTab = () => (
        <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">App Preferences</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>INR (₹)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                    </label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input type="radio" name="theme" value="light" className="mr-2" defaultChecked />
                            Light
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="theme" value="dark" className="mr-2" />
                            Dark
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="theme" value="auto" className="mr-2" />
                            Auto
                        </label>
                    </div>
                </div>
            </div>
        </Card>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfileTab();
            case 'notifications':
                return renderNotificationsTab();
            case 'security':
                return renderSecurityTab();
            case 'preferences':
                return renderPreferencesTab();
            default:
                return renderProfileTab();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-large animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50">
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-64 border-r border-gray-100 bg-gray-50/50">
                        <nav className="p-4 space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${activeTab === tab.id
                                            ? 'bg-primary-100 text-primary-700 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.name}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-6">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;