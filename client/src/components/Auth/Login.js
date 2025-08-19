import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { APP_NAME, APP_DESCRIPTION, DEV_MODE, SAMPLE_USERS, COUNTRY_FLAGS } from '../../config/constants';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSampleUsers, setShowSampleUsers] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Welcome back! 🎉');
    } else {
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  const handleSampleLogin = (sampleEmail, samplePassword) => {
    setEmail(sampleEmail);
    setPassword(samplePassword);
    setShowSampleUsers(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 animate-bounce-in"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full opacity-10 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-warning-400 to-error-400 rounded-full opacity-15 animate-bounce-in" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center animate-slide-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-large animate-bounce-in">
              <span className="text-white text-2xl">🍽️</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Welcome to {APP_NAME}
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            {APP_DESCRIPTION}
          </p>
        </div>
        
        {/* Login Form */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              loading={loading}
              className="w-full"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Card>

        {/* Sample Users - Only show in dev mode */}
        {DEV_MODE && (
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <button
                  type="button"
                  onClick={() => setShowSampleUsers(!showSampleUsers)}
                  className="px-4 py-2 bg-white text-gray-500 hover:text-gray-700 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Demo Users</span>
                </button>
              </div>
            </div>

            {showSampleUsers && (
              <Card className="mt-4 animate-slide-down">
                <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                  Quick Login Options
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {SAMPLE_USERS.map((user, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSampleLogin(user.email, user.password)}
                      className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-primary-700">
                            {user.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={user.role.toLowerCase()} size="small">
                              {user.role}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center">
                              <span className="mr-1">{COUNTRY_FLAGS[user.country]}</span>
                              {user.country}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-primary-500">
                        Click to login
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                  <p className="text-xs text-warning-800">
                    <strong>Development Mode:</strong> These demo users are only visible in development. 
                    Set DEV_MODE to false in production.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
};

export default Login;