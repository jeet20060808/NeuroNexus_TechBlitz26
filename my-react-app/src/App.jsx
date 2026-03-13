import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, Calendar, Clock, Phone, AlertCircle, CheckCircle,
  LogOut, Plus, X, ChevronDown, Search, Edit2, Trash2, Eye,
  User, FileText, Pill, AlertTriangle, TrendingUp, BarChart3,
  Menu, Home, Settings, Bell, MapPin, Mail, Filter, ArrowRight,
  Heart, Shield, Zap, Users, Stethoscope, ArrowUpRight, Loader,
  Send, Paperclip, MoreVertical, Copy, Share2, Download, MessageSquare,
  Calendar as CalendarIcon, Clock as ClockIcon, MapPin as MapPinIcon,
  Baby, Droplet, Activity, Clipboard, PlusCircle, Repeat2, Video,
  Thermometer, Syringe, Brain, Mic, MicOff, Monitor,
  BarChart4, TrendingDown, Award, BookOpen, Target, LineChart, 
  CreditCard, DollarSign, Package, Stethoscope as StethoscopeIcon,
  AlertCircle as AlertIcon, Wifi, WifiOff, Lock, Star, MessageCircle
} from 'lucide-react';

// ============== UTILITY HOOKS ==============
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  return isOnline;
};

// ============== ANIMATED BACKGROUND ==============
const AnimatedGradientBg = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
      
      <div className="absolute -top-40 -left-32 w-96 h-96 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full filter blur-3xl animate-pulse" 
        style={{animation: 'float 8s ease-in-out infinite'}} />
      
      <div className="absolute top-1/4 -right-48 w-80 h-80 bg-gradient-to-br from-teal-500/25 to-transparent rounded-full filter blur-3xl animate-pulse"
        style={{animation: 'float 10s ease-in-out infinite 2s'}} />
      
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full filter blur-3xl animate-pulse"
        style={{animation: 'float 12s ease-in-out infinite 4s'}} />

      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-orange-500/15 to-transparent rounded-full filter blur-3xl animate-pulse"
        style={{animation: 'float 9s ease-in-out infinite 3s'}} />

      <div className="absolute inset-0 opacity-[0.02]"
        style={{backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '80px 80px'}} />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
        }
      `}</style>
    </div>
  );
};

// ============== CURSOR GLOW ==============
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return visible ? (
    <div
      className="pointer-events-none fixed z-40 transition-all duration-100"
      style={{
        left: pos.x,
        top: pos.y,
        width: '80px',
        height: '80px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}
    />
  ) : null;
};

// ============== PREMIUM UI COMPONENTS ==============
const PremiumButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false, 
  icon: Icon = null,
  size = 'md',
  loading = false,
  fullWidth = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:via-teal-400 hover:to-emerald-500 text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40',
    secondary: 'border-2 border-teal-400/60 text-teal-300 hover:bg-teal-400/10 hover:border-teal-400 backdrop-blur-sm hover:text-teal-200',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg hover:shadow-red-500/30',
    ghost: 'text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 backdrop-blur-sm',
    success: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg hover:shadow-emerald-500/30',
    violet: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg hover:shadow-violet-500/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${sizes[size]} rounded-2xl font-semibold transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <Loader size={size === 'sm' ? 14 : 18} className="animate-spin" />
        ) : Icon ? (
          <Icon size={size === 'sm' ? 14 : 18} />
        ) : null}
        {children}
      </div>
    </button>
  );
};

const PremiumCard = ({ children, className = '', hover = true, interactive = false, gradient = false }) => (
  <div className={`relative group ${className} ${interactive ? 'cursor-pointer' : ''}`}>
    {hover && (
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    )}

    <div className={`relative ${gradient ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/5' : 'bg-gradient-to-br from-slate-800/40 to-slate-900/40'} backdrop-blur-2xl rounded-3xl border border-teal-500/20 ${hover ? 'group-hover:border-emerald-400/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-500/20' : ''}`}>
      {children}
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, trend, trendType = 'positive', gradient }) => (
  <PremiumCard className="p-6" hover={true} gradient={true}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
        <Icon size={28} className="text-white" />
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold ${trendType === 'positive' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'}`}>
        {trend}
      </div>
    </div>
    <p className="text-slate-400 text-sm mb-2">{label}</p>
    <p className="text-4xl font-bold text-white">{value}</p>
  </PremiumCard>
);

const Badge = ({ children, variant = 'primary', animated = false, icon: Icon = null }) => {
  const variants = {
    primary: 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50',
    success: 'bg-green-500/30 text-green-300 border border-green-400/50',
    warning: 'bg-yellow-500/30 text-yellow-300 border border-yellow-400/50',
    danger: 'bg-red-500/30 text-red-300 border border-red-400/50',
    info: 'bg-teal-500/30 text-teal-300 border border-teal-400/50',
    violet: 'bg-violet-500/30 text-violet-300 border border-violet-400/50',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm ${variants[variant]} ${animated ? 'animate-pulse' : ''}`}>
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={onClose}>
      <PremiumCard className={`w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          <div className="text-slate-200">
            {children}
          </div>
        </div>
      </PremiumCard>
    </div>
  );
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

const NotificationProvider = ({ children }) => {
  const notification = useNotification();
  
  return (
    <NotificationContext.Provider value={notification}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm">
        {notification.notifications.map(notif => (
          <div
            key={notif.id}
            className={`px-6 py-4 rounded-2xl backdrop-blur-xl border text-white text-sm font-medium transition-all duration-300 animate-in slide-in-from-right ${
              notif.type === 'success'
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-100 shadow-lg shadow-emerald-500/20'
                : notif.type === 'error'
                ? 'bg-red-500/20 border-red-400/50 text-red-100 shadow-lg shadow-red-500/20'
                : 'bg-teal-500/20 border-teal-400/50 text-teal-100 shadow-lg shadow-teal-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              {notif.type === 'success' && '✨'}
              {notif.type === 'error' && '⚠️'}
              {notif.type === 'info' && 'ℹ️'}
              {notif.message}
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// ============== ONLINE STATUS INDICATOR ==============
const OnlineStatusBar = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-red-600/90 backdrop-blur-sm border-b border-red-500 py-3 px-6 flex items-center gap-3">
      <WifiOff size={20} className="text-white" />
      <span className="text-white font-semibold">You are currently offline. Some features may be limited.</span>
    </div>
  );
};

// ============== PREMIUM LOGIN PAGE ==============
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('receptionist@clinic.com');
  const [password, setPassword] = useState('pass123');
  const [role, setRole] = useState('receptionist');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);
  const notificationContext = React.useContext(NotificationContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        onLogin({
          id: Math.random(),
          name: role === 'doctor' ? 'Dr. Sarah Wilson' : 'Clinic Admin',
          email,
          role,
          token: 'demo-token',
        });
        notificationContext?.addNotification('Welcome back! 🎉', 'success');
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center relative overflow-hidden">
      <AnimatedGradientBg />
      <CursorGlow />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 20px rgba(42, 165, 124, 0.9)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-8 animate-in fade-in-left duration-1000">
            <div>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl mb-6 transform hover:scale-110 transition-transform duration-300 shadow-2xl shadow-emerald-500/40">
                <Stethoscope size={40} className="text-white" />
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent mb-3 leading-tight">
                ClinicOS Pro
              </h1>
              <p className="text-xl text-slate-300 font-light">Enterprise Healthcare Management System</p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Zap, text: 'Lightning Fast Appointments' },
                { icon: Users, text: 'Comprehensive Patient Management' },
                { icon: BarChart3, text: 'Real-time Analytics & Insights' },
                { icon: Shield, text: 'HIPAA Compliant & Secure' },
                { icon: Video, text: 'Telemedicine Ready' },
                { icon: Pill, text: 'Prescription Management' },
              ].map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/40 transition-all duration-300 transform group-hover:scale-110">
                      <ItemIcon size={24} className="text-emerald-400" />
                    </div>
                    <span className="text-slate-300 font-medium group-hover:text-emerald-300 transition-colors">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="animate-in fade-in-right duration-1000">
            <PremiumCard className="p-10 space-y-8" gradient={true}>
              <div className="space-y-4">
                <label className="block text-lg font-bold text-white">Choose Your Role</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'receptionist', label: 'Receptionist', icon: '👩‍💼', desc: 'Manage Clinic Operations' },
                    { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️', desc: 'Patient Care & Treatment' },
                  ].map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      onMouseEnter={() => setHoveredRole(option.value)}
                      onMouseLeave={() => setHoveredRole(null)}
                      className={`p-5 rounded-2xl border-2 transition-all duration-300 transform group ${
                        role === option.value
                          ? 'border-emerald-400 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 shadow-lg shadow-emerald-400/40'
                          : 'border-slate-700 hover:border-teal-600 bg-slate-800/30 hover:bg-slate-800/60'
                      } ${hoveredRole === option.value ? 'scale-105' : ''}`}
                    >
                      <div className="text-4xl mb-3 transform group-hover:scale-125 transition-transform duration-300">{option.icon}</div>
                      <div className="font-bold text-white text-sm">{option.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Enter email"
                    className={`w-full px-5 py-4 bg-slate-800/50 border-2 rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                      focusedInput === 'email'
                        ? 'border-emerald-400 ring-4 ring-emerald-400/30 shadow-lg shadow-emerald-400/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                  {focusedInput === 'email' && (
                    <Mail size={20} className="absolute right-4 top-4 text-emerald-400" />
                  )}
                </div>

                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Enter password"
                    className={`w-full px-5 py-4 bg-slate-800/50 border-2 rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                      focusedInput === 'password'
                        ? 'border-emerald-400 ring-4 ring-emerald-400/30 shadow-lg shadow-emerald-400/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/20 border-2 border-red-500/50 rounded-xl flex items-start gap-3 animate-in shake">
                    <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm font-medium">{error}</p>
                  </div>
                )}

                <div className="p-4 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 border-2 border-teal-400/40 rounded-xl backdrop-blur-sm">
                  <p className="text-teal-300 text-xs font-bold mb-2 flex items-center gap-1">💡 Demo Access</p>
                  <div className="space-y-1 text-teal-200/80 text-xs">
                    <p><strong>Email:</strong> {role === 'doctor' ? 'doctor@clinic.com' : 'receptionist@clinic.com'}</p>
                    <p><strong>Password:</strong> pass123</p>
                    <p><strong>Tip:</strong> Try both roles to explore different interfaces</p>
                  </div>
                </div>

                <PremiumButton
                  variant="primary"
                  className="w-full py-4 text-lg font-bold"
                  disabled={loading}
                  loading={loading}
                  icon={loading ? Loader : ArrowRight}
                  onClick={handleLogin}
                >
                  {loading ? 'Signing In' : 'Access Dashboard'}
                </PremiumButton>
              </form>

              <div className="text-center text-xs text-slate-500 border-t border-slate-700 pt-6">
                🔐 Enterprise-grade security • HIPAA Compliant • ISO 27001 Certified
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============== RECEPTIONIST DASHBOARD ==============
const ReceptionistDashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-03-13');
  const notificationContext = React.useContext(NotificationContext);
  const isOnline = useOnlineStatus();

  const [appointments, setAppointments] = useLocalStorage('clinic_appointments', [
    { id: 1, patient_name: 'Alice Johnson', doctor_name: 'Dr. Sarah Wilson', start_time: '09:00', duration_minutes: 30, status: 'Scheduled', date: '2026-03-13', type: 'Consultation', amount: 150 },
    { id: 2, patient_name: 'Bob Smith', doctor_name: 'Dr. James Brown', start_time: '10:00', duration_minutes: 45, status: 'Confirmed', date: '2026-03-13', type: 'Follow-up', amount: 100 },
    { id: 3, patient_name: 'Carol White', doctor_name: 'Dr. Sarah Wilson', start_time: '14:00', duration_minutes: 30, status: 'Completed', date: '2026-03-12', type: 'Checkup', amount: 150 },
  ]);

  const [patients, setPatients] = useLocalStorage('clinic_patients', [
    { id: 1, name: 'Alice Johnson', phone: '+1-555-0101', email: 'alice@email.com', blood_group: 'O+', visits: 5, lastVisit: '2026-03-13', insurance: 'Blue Cross' },
    { id: 2, name: 'Bob Smith', phone: '+1-555-0102', email: 'bob@email.com', blood_group: 'A-', visits: 3, lastVisit: '2026-03-13', insurance: 'Aetna' },
    { id: 3, name: 'Carol White', phone: '+1-555-0103', email: 'carol@email.com', blood_group: 'B+', visits: 2, lastVisit: '2026-03-12', insurance: 'Cigna' },
  ]);

  const [doctors, setDoctors] = useLocalStorage('clinic_doctors', [
    { id: 1, name: 'Dr. Sarah Wilson', specialty: 'General Medicine', available: true, patients: 24, rating: 4.9 },
    { id: 2, name: 'Dr. James Brown', specialty: 'Cardiology', available: true, patients: 18, rating: 4.7 },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics', available: false, patients: 15, rating: 4.8 },
  ]);

  const [staff, setStaff] = useLocalStorage('clinic_staff', [
    { id: 1, name: 'John Helper', role: 'Nurse', status: 'Active', joined: '2025-01-15' },
    { id: 2, name: 'Jane Assistant', role: 'Medical Assistant', status: 'Active', joined: '2025-02-01' },
    { id: 3, name: 'Mike Lab', role: 'Lab Technician', status: 'On Leave', joined: '2024-12-10' },
  ]);

  const [billing, setbilling] = useLocalStorage('clinic_billing', [
    { id: 1, patient: 'Alice Johnson', amount: 150, date: '2026-03-13', status: 'Paid', method: 'Credit Card' },
    { id: 2, patient: 'Bob Smith', amount: 100, date: '2026-03-13', status: 'Pending', method: 'Insurance' },
    { id: 3, patient: 'Carol White', amount: 150, date: '2026-03-12', status: 'Paid', method: 'Cash' },
  ]);

  const handleBookAppointment = (data) => {
    setAppointments([...appointments, { ...data, id: appointments.length + 1 }]);
    notificationContext?.addNotification('Appointment booked successfully! ✨', 'success');
    setShowBookModal(false);
  };

  const handleAddPatient = (data) => {
    setPatients([...patients, { ...data, id: patients.length + 1, visits: 0 }]);
    notificationContext?.addNotification('Patient added successfully! 🎉', 'success');
    setShowPatientModal(false);
  };

  const filteredAppointments = appointments.filter(apt => apt.date === selectedDate);
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const totalRevenue = billing.reduce((sum, item) => sum + (item.status === 'Paid' ? item.amount : 0), 0);
  const pendingAmount = billing.reduce((sum, item) => sum + (item.status === 'Pending' ? item.amount : 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
      <AnimatedGradientBg />
      <CursorGlow />
      <OnlineStatusBar isOnline={isOnline} />

      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/60 backdrop-blur-2xl border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-500/40">
              <Stethoscope size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">ClinicOS Pro</h1>
              <p className="text-xs text-slate-400 font-medium">Receptionist Panel</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'staff', label: 'Staff', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium ${
                    currentTab === tab.id
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <TabIcon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Badge variant="primary" icon={User}>
              {user?.name.split(' ')[1]}
            </Badge>
            <PremiumButton variant="danger" size="sm" icon={LogOut} onClick={onLogout}>
              Exit
            </PremiumButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div>
              <h1 className="text-6xl font-black mb-3">
                Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{user?.name.split(' ')[0]}</span> 👋
              </h1>
              <p className="text-lg text-slate-400">Here's your clinic overview for today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={Calendar} label="Today's Appointments" value={filteredAppointments.length} trend="+5 this week" gradient="from-emerald-600 to-teal-600" />
              <StatCard icon={Users} label="Total Patients" value={patients.length} trend="+12% growth" gradient="from-violet-600 to-purple-600" />
              <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue}`} trend="+18% monthly" gradient="from-orange-600 to-red-600" />
              <StatCard icon={AlertCircle} label="Pending Payments" value={`$${pendingAmount}`} trend={`${billing.filter(b => b.status === 'Pending').length} invoices`} gradient="from-blue-600 to-cyan-600" trendType={pendingAmount > 0 ? 'negative' : 'positive'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Book Appointment', desc: 'Schedule new visit', icon: Plus, action: () => setShowBookModal(true), color: 'from-emerald-500 to-teal-500' },
                { title: 'Add Patient', desc: 'Register new patient', icon: Users, action: () => setShowPatientModal(true), color: 'from-violet-500 to-purple-500' },
                { title: 'Create Invoice', desc: 'Process billing', icon: CreditCard, action: () => setShowBillingModal(true), color: 'from-orange-500 to-red-500' },
              ].map((action, i) => {
                const ActionIcon = action.icon;
                return (
                  <PremiumCard key={i} className="p-8 cursor-pointer group" hover={true} interactive={true} onClick={action.action}>
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <ActionIcon size={32} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">{action.title}</h3>
                    <p className="text-slate-400 text-sm">{action.desc}</p>
                  </PremiumCard>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Today's Appointments</h2>
                <PremiumButton variant="primary" size="sm" icon={Plus} onClick={() => setShowBookModal(true)}>
                  Book Now
                </PremiumButton>
              </div>

              {filteredAppointments.length === 0 ? (
                <PremiumCard className="p-12 text-center" hover={false}>
                  <Calendar size={48} className="mx-auto mb-4 text-slate-500" />
                  <p className="text-slate-400 mb-4 text-lg font-medium">No appointments scheduled</p>
                  <PremiumButton variant="primary" icon={Plus} onClick={() => setShowBookModal(true)}>
                    Schedule First Appointment
                  </PremiumButton>
                </PremiumCard>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((apt, idx) => (
                    <PremiumCard key={apt.id} className="p-6 hover:shadow-2xl hover:shadow-emerald-500/20 group" hover={true} interactive={true}>
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {apt.patient_name}
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">{apt.doctor_name} • {apt.type} • ${apt.amount}</p>
                            <Badge variant="success" className="mt-2">{apt.status}</Badge>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 text-2xl font-bold text-emerald-400">
                            <Clock size={24} />
                            {apt.start_time}
                          </div>
                          <span className="text-sm text-slate-400">{apt.duration_minutes} minutes</span>
                        </div>
                      </div>
                    </PremiumCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {currentTab === 'appointments' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                Manage <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Appointments</span>
              </h1>
              <PremiumButton variant="primary" icon={Plus} onClick={() => setShowBookModal(true)}>
                New Appointment
              </PremiumButton>
            </div>

            <PremiumCard className="p-6" gradient={true}>
              <div className="flex items-center gap-4">
                <Calendar size={20} className="text-slate-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </PremiumCard>

            <div className="grid grid-cols-1 gap-4">
              {appointments.filter(apt => apt.date === selectedDate).map((apt, idx) => (
                <PremiumCard key={apt.id} className="p-6" hover={true} interactive={true}>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{apt.patient_name}</h3>
                        <p className="text-sm text-slate-400">{apt.doctor_name} • {apt.duration_minutes} min • ${apt.amount}</p>
                        <Badge variant="success" className="mt-2">{apt.status}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-400">{apt.start_time}</p>
                      <div className="flex gap-2 mt-3">
                        <PremiumButton size="sm" variant="secondary" icon={Repeat2}>Reschedule</PremiumButton>
                        <PremiumButton size="sm" variant="danger" icon={Trash2}>Cancel</PremiumButton>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {currentTab === 'patients' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                Patient <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Directory</span>
              </h1>
              <PremiumButton variant="primary" icon={Plus} onClick={() => setShowPatientModal(true)}>
                Add Patient
              </PremiumButton>
            </div>

            <PremiumCard className="p-6" gradient={true}>
              <div className="flex items-center gap-4">
                <Search size={20} className="text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </PremiumCard>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map(patient => (
                <PremiumCard key={patient.id} className="p-6" hover={true} interactive={true}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-500/40">
                      {patient.name[0]}
                    </div>
                    <div className="flex gap-2">
                      <PremiumButton size="sm" variant="ghost" icon={Edit2} />
                      <PremiumButton size="sm" variant="ghost" icon={Trash2} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{patient.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">ID: #{patient.id}</p>

                  <div className="space-y-3 text-sm text-slate-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-emerald-400" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-emerald-400" />
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet size={16} className="text-red-400" />
                      {patient.blood_group}
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-teal-400" />
                      {patient.insurance}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-700 space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Visits: {patient.visits}</p>
                      <p className="text-xs text-slate-500">Last: {patient.lastVisit}</p>
                    </div>
                    <PremiumButton variant="primary" size="sm" fullWidth icon={Plus}>
                      New Appointment
                    </PremiumButton>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {currentTab === 'billing' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                Billing & <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Payments</span>
              </h1>
              <PremiumButton variant="primary" icon={Plus} onClick={() => setShowBillingModal(true)}>
                Create Invoice
              </PremiumButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue}`} trend="+15% this month" gradient="from-emerald-600 to-teal-600" />
              <StatCard icon={AlertCircle} label="Pending" value={`$${pendingAmount}`} trend={`${billing.filter(b => b.status === 'Pending').length} invoices`} gradient="from-orange-600 to-red-600" trendType={pendingAmount > 0 ? 'negative' : 'positive'} />
              <StatCard icon={CheckCircle} label="Paid" value={billing.filter(b => b.status === 'Paid').length} trend="payments received" gradient="from-green-600 to-emerald-600" />
            </div>

            <div className="overflow-x-auto">
              <PremiumCard className="p-6" gradient={true}>
                <table className="w-full">
                  <thead className="border-b border-slate-700">
                    <tr>
                      <th className="text-left py-3 text-sm font-bold text-slate-300">Patient</th>
                      <th className="text-left py-3 text-sm font-bold text-slate-300">Amount</th>
                      <th className="text-left py-3 text-sm font-bold text-slate-300">Date</th>
                      <th className="text-left py-3 text-sm font-bold text-slate-300">Status</th>
                      <th className="text-left py-3 text-sm font-bold text-slate-300">Method</th>
                      <th className="text-left py-3 text-sm font-bold text-slate-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billing.map(item => (
                      <tr key={item.id} className="border-b border-slate-700/50 hover:bg-emerald-500/10">
                        <td className="py-4 text-sm text-white">{item.patient}</td>
                        <td className="py-4 text-sm font-bold text-emerald-400">${item.amount}</td>
                        <td className="py-4 text-sm text-slate-400">{item.date}</td>
                        <td className="py-4">
                          <Badge variant={item.status === 'Paid' ? 'success' : 'warning'}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-sm text-slate-400">{item.method}</td>
                        <td className="py-4">
                          <PremiumButton size="sm" variant="ghost" icon={Download}>View</PremiumButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </PremiumCard>
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {currentTab === 'staff' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                Staff <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Management</span>
              </h1>
              <PremiumButton variant="primary" icon={Plus} onClick={() => setShowStaffModal(true)}>
                Add Staff
              </PremiumButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {staff.map(member => (
                <PremiumCard key={member.id} className="p-6" hover={true}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/40">
                      {member.name[0]}
                    </div>
                    <Badge variant={member.status === 'Active' ? 'success' : 'warning'}>
                      {member.status}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{member.role}</p>

                  <div className="text-xs text-slate-500 mb-4 pb-4 border-b border-slate-700">
                    Joined {member.joined}
                  </div>

                  <div className="flex gap-2">
                    <PremiumButton size="sm" variant="secondary" className="flex-1" icon={Edit2}>Edit</PremiumButton>
                    <PremiumButton size="sm" variant="danger" icon={Trash2}>Remove</PremiumButton>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {currentTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold">
              Clinic <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Analytics</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={TrendingUp} label="Monthly Revenue" value="$12,450" trend="+15%" gradient="from-emerald-600 to-teal-600" />
              <StatCard icon={Users} label="New Patients" value="28" trend="+8%" gradient="from-violet-600 to-purple-600" />
              <StatCard icon={Calendar} label="Completed Apps" value="156" trend="+20%" gradient="from-orange-600 to-red-600" />
              <StatCard icon={Award} label="Satisfaction" value="4.8/5" trend="↑ 0.2" gradient="from-blue-600 to-cyan-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PremiumCard className="p-8" gradient={true}>
                <h3 className="text-2xl font-bold text-white mb-6">Appointment Trends (Weekly)</h3>
                <div className="space-y-4">
                  {[
                    { day: 'Mon', value: 12, max: 20 },
                    { day: 'Tue', value: 18, max: 20 },
                    { day: 'Wed', value: 15, max: 20 },
                    { day: 'Thu', value: 16, max: 20 },
                    { day: 'Fri', value: 19, max: 20 },
                    { day: 'Sat', value: 8, max: 20 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">{item.day}</span>
                        <span className="text-sm font-bold text-emerald-400">{item.value}</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                          style={{width: `${(item.value / item.max) * 100}%`}}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </PremiumCard>

              <PremiumCard className="p-8" gradient={true}>
                <h3 className="text-2xl font-bold text-white mb-6">Top Doctors</h3>
                <div className="space-y-4">
                  {doctors.map((doctor, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
                      <div>
                        <p className="font-bold text-white">{doctor.name}</p>
                        <p className="text-sm text-slate-400">{doctor.patients} patient visits</p>
                      </div>
                      <Badge variant="primary">⭐ {doctor.rating}</Badge>
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </div>
          </div>
        )}
      </main>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Book New Appointment"
        size="md"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-slate-200">Patient</label>
              <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400">
                <option>Select patient...</option>
                {patients.map(p => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-slate-200">Doctor</label>
              <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400">
                <option>Select doctor...</option>
                {doctors.map(d => (
                  <option key={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-slate-200">Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-slate-200">Time</label>
              <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400">
                {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <PremiumButton variant="primary" className="w-full py-4" fullWidth>
            Book Appointment
          </PremiumButton>
        </form>
      </Modal>

      {/* Add Patient Modal */}
      <Modal
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        title="Register New Patient"
        size="sm"
      >
        <form className="space-y-5">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400" />
          <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400" />
          <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400" />
          <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-400">
            <option>Blood Group</option>
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <PremiumButton variant="primary" className="w-full py-3" fullWidth>
            Register Patient
          </PremiumButton>
        </form>
      </Modal>
    </div>
  );
};

// ============== DOCTOR DASHBOARD ==============
const DoctorDashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('schedule');
  const notificationContext = React.useContext(NotificationContext);
  const isOnline = useOnlineStatus();

  const [appointments] = useLocalStorage('clinic_appointments', [
    { id: 1, patient_name: 'Alice Johnson', phone: '+1-555-0101', blood_group: 'O+', medical_history: 'Hypertension, Type 2 Diabetes', allergies: 'Penicillin', start_time: '09:00', duration_minutes: 30, status: 'scheduled', date: '2026-03-13', notes: '' },
    { id: 2, patient_name: 'Bob Smith', phone: '+1-555-0102', blood_group: 'A-', medical_history: 'Asthma', allergies: 'None', start_time: '10:00', duration_minutes: 45, status: 'in_progress', date: '2026-03-13', notes: '' },
    { id: 3, patient_name: 'Carol White', phone: '+1-555-0103', blood_group: 'B+', medical_history: 'Migraine disorder', allergies: 'Sulfa drugs', start_time: '11:30', duration_minutes: 30, status: 'completed', date: '2026-03-13', notes: 'Patient responded well to treatment' },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  const todaysAppointments = appointments.filter(apt => apt.date === '2026-03-13');
  const completedCount = appointments.filter(apt => apt.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
      <AnimatedGradientBg />
      <CursorGlow />
      <OnlineStatusBar isOnline={isOnline} />

      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/60 backdrop-blur-2xl border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/40">
              <Stethoscope size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ClinicOS Pro</h1>
              <p className="text-xs text-slate-400 font-medium">Doctor Panel</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
              { id: 'reports', label: 'Records', icon: FileText },
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium ${
                    currentTab === tab.id
                      ? 'bg-violet-500/30 text-violet-300 border border-violet-400/50'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <TabIcon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Badge variant="violet" icon={Award}>
              {user?.name}
            </Badge>
            <PremiumButton variant="danger" size="sm" icon={LogOut} onClick={onLogout}>
              Exit
            </PremiumButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {currentTab === 'schedule' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            <div>
              <h1 className="text-6xl font-black mb-3">
                Today's <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Schedule</span>
              </h1>
              <p className="text-lg text-slate-400">{todaysAppointments.length} appointments scheduled</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={Calendar} label="Scheduled" value={todaysAppointments.filter(a => a.status === 'scheduled').length} trend="waiting" gradient="from-violet-600 to-purple-600" />
              <StatCard icon={Clock} label="In Progress" value={todaysAppointments.filter(a => a.status === 'in_progress').length} trend="active now" gradient="from-orange-600 to-red-600" />
              <StatCard icon={CheckCircle} label="Completed" value={completedCount} trend={`${Math.round((completedCount / appointments.length) * 100)}%`} gradient="from-emerald-600 to-teal-600" />
            </div>

            <div className="space-y-4">
              {todaysAppointments.map((apt, idx) => (
                <PremiumCard
                  key={apt.id}
                  className="p-6 cursor-pointer hover:shadow-2xl hover:shadow-violet-500/20 group"
                  hover={true}
                  interactive={true}
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 flex items-center justify-center font-bold text-lg flex-shrink-0 rounded-full ${
                        apt.status === 'completed' ? 'bg-emerald-500/30 text-emerald-400' :
                        apt.status === 'in_progress' ? 'bg-orange-500/30 text-orange-400' :
                        'bg-violet-500/30 text-violet-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                          {apt.patient_name}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Phone size={16} />
                            {apt.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Droplet size={16} />
                            {apt.blood_group}
                          </div>
                        </div>
                        {apt.allergies && apt.allergies !== 'None' && (
                          <Badge variant="danger" animated className="mt-2">
                            ⚠️ Allergies: {apt.allergies}
                          </Badge>
                        )}
                        {apt.medical_history && (
                          <p className="text-slate-400 text-sm mt-3">📋 {apt.medical_history}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-4xl font-bold text-violet-400">{apt.start_time}</p>
                        <p className="text-sm text-slate-400 mt-1">{apt.duration_minutes} minutes</p>
                      </div>
                      <Badge variant={apt.status === 'completed' ? 'success' : apt.status === 'in_progress' ? 'warning' : 'info'}>
                        {apt.status === 'in_progress' ? '🔴 In Progress' : apt.status === 'completed' ? '✅ Completed' : '⏱️ Scheduled'}
                      </Badge>
                    </div>
                  </div>

                  {selectedAppointment?.id === apt.id && apt.status !== 'completed' && (
                    <div className="mt-8 pt-8 border-t border-slate-700 animate-in slide-in-from-bottom-4 duration-300">
                      <div className="space-y-6">
                        <h4 className="text-lg font-bold text-white">Consultation Details</h4>
                        <textarea
                          value={consultationNotes}
                          onChange={(e) => setConsultationNotes(e.target.value)}
                          placeholder="Patient findings, diagnosis, treatment plan..."
                          className="w-full px-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 resize-none"
                          rows="5"
                        />
                        <div className="flex gap-3">
                          <PremiumButton variant="success" className="flex-1" icon={CheckCircle}>
                            Complete Appointment
                          </PremiumButton>
                          <PremiumButton variant="secondary" icon={Prescription} onClick={() => setShowPrescriptionModal(true)}>
                            Prescription
                          </PremiumButton>
                          <PremiumButton variant="ghost" icon={X} onClick={() => setSelectedAppointment(null)}>
                            Cancel
                          </PremiumButton>
                        </div>
                      </div>
                    </div>
                  )}

                  {apt.status === 'completed' && apt.notes && (
                    <div className="mt-6 pt-6 border-t border-slate-700 bg-emerald-500/10 rounded-xl p-4">
                      <p className="text-xs font-bold text-emerald-300 mb-2">📝 Notes</p>
                      <p className="text-slate-200 text-sm">{apt.notes}</p>
                    </div>
                  )}
                </PremiumCard>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'patients' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold">
              Patient <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Records</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {todaysAppointments.map(apt => (
                <PremiumCard key={apt.id} className="p-8" hover={true} gradient={true}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-violet-500/40">
                        {apt.patient_name[0]}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{apt.patient_name}</h3>
                        <p className="text-sm text-slate-400 mt-1">Appointment: {apt.start_time}</p>
                      </div>
                    </div>
                    <Badge variant={apt.status === 'completed' ? 'success' : 'info'}>
                      {apt.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {apt.medical_history && (
                      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <p className="text-xs font-bold text-slate-300 uppercase mb-2 flex items-center gap-2">
                          <Activity size={14} /> Medical History
                        </p>
                        <p className="text-slate-200 text-sm">{apt.medical_history}</p>
                      </div>
                    )}

                    {apt.allergies && apt.allergies !== 'None' && (
                      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                        <p className="text-xs font-bold text-red-300 uppercase mb-2 flex items-center gap-2">
                          <AlertTriangle size={14} /> Allergies
                        </p>
                        <p className="text-red-200 text-sm font-bold">{apt.allergies}</p>
                      </div>
                    )}

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-slate-300 uppercase mb-2">Contact</p>
                      <p className="text-slate-200 text-sm">{apt.phone}</p>
                    </div>
                  </div>

                  <PremiumButton variant="primary" className="w-full mt-6" icon={Pill} onClick={() => setShowPrescriptionModal(true)}>
                    Add Prescription
                  </PremiumButton>
                </PremiumCard>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'prescriptions' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Prescriptions</span>
              </h1>
              <PremiumButton variant="primary" icon={Plus} onClick={() => setShowPrescriptionModal(true)}>
                New Prescription
              </PremiumButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { patient: 'Alice Johnson', medicines: ['Metformin 500mg - 2x daily', 'Lisinopril 10mg - 1x daily'], date: 'Today' },
                { patient: 'Bob Smith', medicines: ['Albuterol inhaler - as needed', 'Fluticasone nasal spray'], date: 'Today' },
              ].map((rx, i) => (
                <PremiumCard key={i} className="p-6" hover={true} gradient={true}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{rx.patient}</h3>
                      <p className="text-sm text-slate-400 mt-1">{rx.date}</p>
                    </div>
                    <Badge variant="success">✓ Active</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    {rx.medicines.map((med, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-slate-300">
                        <Pill size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
                        <span>{med}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    <PremiumButton variant="secondary" size="sm" className="flex-1" icon={Download}>
                      Print
                    </PremiumButton>
                    <PremiumButton variant="secondary" size="sm" className="flex-1" icon={Share2}>
                      Share
                    </PremiumButton>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'reports' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold">
              Medical <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Records</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Blood Test Report', date: '2026-03-10', patient: 'Alice Johnson', icon: Activity },
                { title: 'Chest X-Ray', date: '2026-03-09', patient: 'Bob Smith', icon: Monitor },
                { title: 'ECG Report', date: '2026-03-08', patient: 'Carol White', icon: Heart },
              ].map((record, i) => {
                const RecordIcon = record.icon;
                return (
                  <PremiumCard key={i} className="p-6" hover={true} interactive={true}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-violet-500/30 rounded-xl flex items-center justify-center">
                        <RecordIcon size={24} className="text-violet-400" />
                      </div>
                      <Badge variant="info">View</Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{record.title}</h3>
                    <p className="text-sm text-slate-400 mb-3">{record.patient}</p>
                    <p className="text-xs text-slate-500">{record.date}</p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        title="Create Prescription"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 text-slate-200">Patient</label>
            <select className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-violet-400">
              <option>Select patient...</option>
              {todaysAppointments.map(apt => (
                <option key={apt.id}>{apt.patient_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-slate-200">Medications</label>
            <textarea
              placeholder="Medicine name, dosage, frequency..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 resize-none"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 text-slate-200">Notes</label>
            <textarea
              placeholder="Special instructions, precautions..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-3">
            <PremiumButton variant="primary" className="flex-1" icon={CheckCircle}>
              Create Prescription
            </PremiumButton>
            <PremiumButton variant="ghost" icon={X} onClick={() => setShowPrescriptionModal(false)}>
              Cancel
            </PremiumButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ============== MAIN APP ==============
export default function ClinicManagementSystem() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.clear();
      }
    }

    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
    }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center">
        <div className="relative text-center">
          <div className="w-24 h-24 border-4 border-slate-700 rounded-full animate-spin border-t-emerald-400 border-r-teal-400 shadow-2xl shadow-emerald-500/40" />
          <p className="mt-8 text-xl text-emerald-400 font-bold">Loading ClinicOS Pro...</p>
        </div>
      </div>
    );
  }

  return (
    <NotificationProvider>
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : user.role === 'doctor' ? (
        <DoctorDashboard user={user} onLogout={handleLogout} />
      ) : (
        <ReceptionistDashboard user={user} onLogout={handleLogout} />
      )}
    </NotificationProvider>
  );
} 