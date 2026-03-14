import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ReceptionistDashboard from './receptionist/ReceptionistDashboard';
import DoctorDashboard from './doctor/DoctorDashboard';

// ============== CUSTOM HOOKS ==============
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// ============== NOTIFICATION SYSTEM ==============
const NotificationContext = React.createContext();

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success', duration = 4000) => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    if (duration) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
    return id;
  };

  return { notifications, addNotification };
};

// ============== APP ROUTER ==============
export default function ClinicApp() {
  const [view, setView] = useState('landing'); 
  const [user, setUser] = useState(null);
  const isOnline = useOnlineStatus();
  const notification = useNotification();

  const handleLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <NotificationContext.Provider value={notification}>
      {/* Online Status Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 text-center text-xs font-bold z-[100]">
          You are currently offline. Some features may be unavailable.
        </div>
      )}

      {/* Notifications Portal */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
        {notification.notifications.map(notif => (
          <div
            key={notif.id}
            className={`px-6 py-3 rounded-xl backdrop-blur-xl border text-slate-900 border-slate-200 text-sm font-medium transition-all duration-300 animate-in slide-in-from-right ${
              notif.type === 'success'
                ? 'bg-green-100 text-green-700'
                : notif.type === 'error'
                ? 'bg-red-50 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {notif.type === 'success' && '✅ '}
            {notif.type === 'error' && '❌ '}
            {notif.type === 'info' && 'ℹ️ '}
            {notif.message}
          </div>
        ))}
      </div>

      {view === 'landing' && <LandingPage onGetStarted={() => setView('login')} />}
      {view === 'login' && <LoginPage onLogin={handleLogin} />}
      
      {view === 'dashboard' && user?.role === 'receptionist' && (
        <ReceptionistDashboard user={user} onLogout={handleLogout} />
      )}
      
      {view === 'dashboard' && user?.role === 'doctor' && (
        <DoctorDashboard user={user} onLogout={handleLogout} />
      )}
    </NotificationContext.Provider>
  );
}