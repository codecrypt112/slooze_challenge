import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Profile/ProfilePage';
import LoadingSpinner from './components/UI/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600 animate-pulse">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600 animate-pulse">Initializing application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header onProfileClick={() => setShowProfile(true)} />}
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      {/* Profile Modal */}
      {showProfile && (
        <ProfilePage onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            success: {
              style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              },
              iconTheme: {
                primary: '#fff',
                secondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              },
            },
            error: {
              style: {
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              },
              iconTheme: {
                primary: '#fff',
                secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;