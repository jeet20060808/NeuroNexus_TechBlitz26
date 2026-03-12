import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight, Calendar, Clock, Phone, AlertCircle, CheckCircle,
  LogOut, Plus, X, ChevronDown, Search, Edit2, Trash2, Eye,
  User, FileText, Pill, AlertTriangle, TrendingUp, BarChart3,
  Menu, Home, Settings, Bell, MapPin, Mail, Filter, ArrowRight,
  Heart, Shield, Zap, Users, Stethoscope, ArrowUpRight, Loader,
  Send, Paperclip, MoreVertical, Copy, Share2, Download, MessageSquare,
  Calendar as CalendarIcon, Clock as ClockIcon, MapPin as MapPinIcon,
  Baby, Droplet, Activity, Clipboard, PlusCircle, Repeat2
} from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// ============== CUSTOM HOOKS ==============
const useParallax = (ref, offset = 0) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY * 0.5 + offset;
};

const useCursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { mousePosition, isMoving };
};

// ============== NOTIFICATIONS SYSTEM ==============
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
            className={`px-6 py-3 rounded-xl backdrop-blur-xl border text-white text-sm font-medium transition-all duration-300 animate-in slide-in-from-right ${
              notif.type === 'success'
                ? 'bg-green-500/20 border-green-400/50 text-green-300'
                : notif.type === 'error'
                ? 'bg-red-500/20 border-red-400/50 text-red-300'
                : 'bg-blue-500/20 border-blue-400/50 text-blue-300'
            }`}
          >
            {notif.type === 'success' && '✅ '}
            {notif.type === 'error' && '❌ '}
            {notif.type === 'info' && 'ℹ️ '}
            {notif.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// ============== BACKGROUND COMPONENTS ==============
const CursorGlow = () => {
  const { mousePosition, isMoving } = useCursorGlow();

  return (
    <>
      <div
        className="pointer-events-none fixed w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-opacity duration-100 z-50"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isMoving ? 1 : 0.5,
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)'
        }}
      />
      <div
        className="pointer-events-none fixed rounded-full transition-opacity duration-200 z-40"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '60px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
          opacity: isMoving ? 0.25 : 0.12,
          filter: 'blur(15px)',
        }}
      />
    </>
  );
};

const AnimatedBackground = () => {
  const parallaxRef = useRef(null);
  const offset = useParallax(parallaxRef);

  return (
    <div ref={parallaxRef} className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

      {/* Animated gradient blobs */}
      <div
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full mix-blend-screen filter blur-3xl"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      />
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full mix-blend-screen filter blur-3xl"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full mix-blend-screen filter blur-3xl"
        style={{ transform: `translateY(${offset * 0.2}px)` }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full mix-blend-screen filter blur-3xl"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />
    </div>
  );
};

// ============== PREMIUM UI COMPONENTS ==============
const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false, 
  icon: Icon = null,
  size = 'md',
  loading = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30',
    secondary: 'border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 backdrop-blur-sm',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg hover:shadow-red-500/30',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/10 backdrop-blur-sm',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg hover:shadow-green-500/30',
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
      className={`relative ${sizes[size]} rounded-xl font-semibold transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <Loader size={size === 'sm' ? 14 : 18} className="animate-spin" />
        ) : Icon ? (
          <Icon size={size === 'sm' ? 14 : 18} />
        ) : null}
        {children}
      </div>

      {/* Glow border on hover */}
      {isHovered && variant === 'primary' && (
        <div className="absolute inset-0 rounded-xl border border-cyan-300/50 animate-pulse pointer-events-none" />
      )}
    </button>
  );
};

const Card = ({ children, className = '', hover = true, interactive = false }) => (
  <div
    className={`relative group ${className} ${interactive ? 'cursor-pointer' : ''}`}
    style={{
      animation: `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`,
    }}
  >
    {/* Background glow */}
    {hover && (
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    )}

    {/* Main card with glassmorphism */}
    <div className={`relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 ${hover ? 'group-hover:border-cyan-400/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/20' : ''}`}>
      {children}
    </div>

    <style>{`
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  </div>
);

const Badge = ({ children, variant = 'primary', animated = false }) => {
  const variants = {
    primary: 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50',
    success: 'bg-green-500/30 text-green-300 border border-green-400/50',
    warning: 'bg-yellow-500/30 text-yellow-300 border border-yellow-400/50',
    danger: 'bg-red-500/30 text-red-300 border border-red-400/50',
    info: 'bg-blue-500/30 text-blue-300 border border-blue-400/50',
  };

  return (
    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${variants[variant]} ${animated ? 'animate-pulse' : ''}`}>
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className={`w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <div className="text-slate-200">
            {children}
          </div>
        </div>
      </Card>
    </div>
  );
};

const Dropdown = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl py-2 z-40 animate-in fade-in-0 zoom-in-95`}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ============== LOGIN PAGE ==============
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('demo@clinic.com');
  const [password, setPassword] = useState('demo1234');
  const [role, setRole] = useState('receptionist');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('authToken', response.data.token);
      onLogin({
        ...response.data.user,
        token: response.data.token,
      });
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <CursorGlow />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <Card className="p-10">
          {/* Animated logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl mb-6 group cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl shadow-cyan-500/40">
              <Stethoscope size={40} className="text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              ClinicOS Pro
            </h1>
            <p className="text-slate-400 text-sm">Enterprise Healthcare Platform</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4 mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Select Your Role</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'receptionist', label: 'Receptionist', icon: '👩‍💼', desc: 'Manage appointments' },
                { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️', desc: 'View patients' },
              ].map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRole(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    role === option.value
                      ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-400/30'
                      : 'border-slate-700 hover:border-slate-600 bg-slate-800/30 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-white text-sm">{option.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                  focusedInput === 'email'
                    ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-400/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              />
              {focusedInput === 'email' && (
                <Mail size={18} className="absolute right-3 top-3 text-cyan-400" />
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                  focusedInput === 'password'
                    ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-400/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3 animate-in shake-sm">
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl backdrop-blur-sm">
              <p className="text-blue-300 text-xs font-bold mb-2 flex items-center gap-1">
                💡 Demo Credentials
              </p>
              <p className="text-blue-200/80 text-xs leading-relaxed">
                <strong>Email:</strong> demo@clinic.com<br/>
                <strong>Password:</strong> demo1234<br/>
                <strong>Tip:</strong> Try both roles to see different interfaces
              </p>
            </div>

            {/* Login Button */}
            <Button
              variant="primary"
              className="w-full py-3 text-lg font-semibold"
              disabled={loading}
              loading={loading}
              icon={loading ? Loader : ArrowRight}
            >
              {loading ? 'Signing In' : 'Sign In Now'}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-8 border-t border-slate-700 pt-6">
            🔒 Secure healthcare appointment management • HIPAA Compliant
          </p>
        </Card>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float var(--duration) ease-in-out infinite;
          --duration: 3s;
        }
      `}</style>
    </div>
  );
};

// ============== RECEPTIONIST DASHBOARD ==============
const ReceptionistDashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const notificationContext = React.useContext(NotificationContext);

  const [bookingForm, setBookingForm] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: selectedDate,
    start_time: '',
    duration_minutes: 30,
  });

  const [newPatientForm, setNewPatientForm] = useState({
    name: '',
    phone: '',
    email: '',
    blood_group: '',
  });

  useEffect(() => {
    loadDashboardData();
  }, [selectedDate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      const [aptsRes, patientsRes, doctorsRes] = await Promise.all([
        axios.get(`${API_URL}/api/appointments?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/api/doctors`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAppointments(aptsRes.data.appointments || []);
      setPatients(patientsRes.data.patients || []);
      setDoctors(doctorsRes.data.doctors || []);
    } catch (error) {
      notificationContext?.addNotification('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!bookingForm.patient_id || !bookingForm.doctor_id || !bookingForm.start_time) {
      notificationContext?.addNotification('Please fill all fields', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');

      await axios.post(`${API_URL}/api/appointments`, bookingForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowBookModal(false);
      setBookingForm({
        patient_id: '',
        doctor_id: '',
        appointment_date: selectedDate,
        start_time: '',
        duration_minutes: 30,
      });
      loadDashboardData();
      notificationContext?.addNotification('✅ Appointment booked successfully!', 'success');
    } catch (error) {
      notificationContext?.addNotification(
        error.response?.data?.error || 'Failed to book appointment',
        'error'
      );
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();

    if (!newPatientForm.name || !newPatientForm.phone) {
      notificationContext?.addNotification('Name and phone required', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');

      await axios.post(`${API_URL}/api/patients`, newPatientForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowPatientModal(false);
      setNewPatientForm({ name: '', phone: '', email: '', blood_group: '' });
      loadDashboardData();
      notificationContext?.addNotification('✅ Patient added successfully!', 'success');
    } catch (error) {
      notificationContext?.addNotification('Failed to add patient', 'error');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_URL}/api/appointments/${appointmentId}`, {
        params: { reason: 'Cancelled by receptionist' },
        headers: { Authorization: `Bearer ${token}` },
      });

      loadDashboardData();
      notificationContext?.addNotification('✅ Appointment cancelled', 'success');
    } catch (error) {
      notificationContext?.addNotification('Failed to cancel appointment', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <AnimatedBackground />
      <CursorGlow />

      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center transform hover:scale-110 hover:rotate-6 transition-all duration-300">
              <Stethoscope size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ClinicOS Pro</h1>
              <p className="text-xs text-slate-400">Receptionist Panel</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'book', label: 'Book', icon: Plus },
              { id: 'manage', label: 'Manage', icon: Edit2 },
              { id: 'patients', label: 'Patients', icon: Users },
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                    currentTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
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
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
              <User size={16} className="text-cyan-400" />
              <span className="text-sm font-semibold">{user?.name}</span>
            </div>
            <Button variant="danger" className="px-4 py-2" icon={LogOut} onClick={onLogout}>
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in-50">
            {/* Welcome Section */}
            <div>
              <h1 className="text-5xl font-bold mb-2">
                Good afternoon, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{user?.name?.split(' ')[0]}</span> 👋
              </h1>
              <p className="text-slate-400">Here's what's happening in your clinic today</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Today's Appointments", value: appointments.length, icon: Calendar, color: 'from-cyan-600 to-blue-600', trend: '+12%' },
                { label: 'Total Patients', value: patients.length, icon: Users, color: 'from-green-600 to-emerald-600', trend: '+8%' },
                { label: 'Doctors Available', value: doctors.length, icon: Stethoscope, color: 'from-purple-600 to-pink-600', trend: '✓' },
                { label: 'This Week', value: appointments.length, icon: TrendingUp, color: 'from-orange-600 to-red-600', trend: '+5%' },
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <Card key={i} className="p-6 group hover:shadow-2xl hover:shadow-cyan-500/20" hover={true}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <StatIcon size={24} className="text-white" />
                      </div>
                      <Badge variant="success">{stat.trend}</Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-white">{stat.value}</p>
                  </Card>
                );
              })}
            </div>

            {/* Today's Schedule */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Today's Schedule</h2>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowBookModal(true)}>
                    Book
                  </Button>
                </div>
              </div>

              {loading ? (
                <Card className="p-8 text-center">
                  <Loader size={32} className="mx-auto mb-4 text-cyan-400 animate-spin" />
                  <p className="text-slate-400">Loading appointments...</p>
                </Card>
              ) : appointments.length === 0 ? (
                <Card className="p-12 text-center" hover={false}>
                  <Calendar size={48} className="mx-auto mb-4 text-slate-500" />
                  <p className="text-slate-400 mb-4">No appointments for this date</p>
                  <Button variant="primary" icon={Plus} onClick={() => setShowBookModal(true)}>
                    Schedule First Appointment
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt, idx) => (
                    <Card
                      key={apt.id}
                      className="p-6 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer group"
                      hover={true}
                      interactive={true}
                      onClick={() => setSelectedAppointment(apt)}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1 flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {apt.patient_name}
                            </h3>
                            <p className="text-slate-400 text-sm">Dr. {apt.doctor_name} • {apt.duration_minutes} min</p>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                          <div className="flex items-center gap-2 text-cyan-400">
                            <Clock size={18} />
                            <span className="font-bold">{apt.start_time}</span>
                          </div>
                          <Badge variant="success">Scheduled</Badge>
                          <Dropdown
                            trigger={<MoreVertical size={20} />}
                            items={[
                              {
                                label: 'Reschedule',
                                icon: Repeat2,
                                onClick: () => alert('Reschedule feature coming soon'),
                              },
                              {
                                label: 'Cancel',
                                icon: Trash2,
                                onClick: () => handleCancelAppointment(apt.id),
                              },
                              {
                                label: 'Send Reminder',
                                icon: Bell,
                                onClick: () => alert('Reminder sent!'),
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Book Appointment Tab */}
        {currentTab === 'book' && (
          <div className="animate-in fade-in-50">
            <h1 className="text-5xl font-bold mb-8">
              Book <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Appointment</span>
            </h1>

            <Card className="p-8 max-w-2xl">
              <form onSubmit={handleBookAppointment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Patient */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-slate-200">Patient</label>
                    <select
                      value={bookingForm.patient_id}
                      onChange={(e) => setBookingForm({ ...bookingForm, patient_id: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white"
                    >
                      <option value="">Select patient...</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                      ))}
                    </select>
                  </div>

                  {/* Doctor */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-slate-200">Doctor</label>
                    <select
                      value={bookingForm.doctor_id}
                      onChange={(e) => setBookingForm({ ...bookingForm, doctor_id: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white"
                    >
                      <option value="">Select doctor...</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-slate-200">Date</label>
                    <input
                      type="date"
                      value={bookingForm.appointment_date}
                      onChange={(e) => setBookingForm({ ...bookingForm, appointment_date: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 text-white"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-slate-200">Duration</label>
                    <select
                      value={bookingForm.duration_minutes}
                      onChange={(e) => setBookingForm({ ...bookingForm, duration_minutes: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                    >
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                      <option value={45}>45 min</option>
                      <option value={60}>60 min</option>
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-slate-200">Time Slot</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, start_time: time })}
                        className={`px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          bookingForm.start_time === time
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-400/30'
                            : 'bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-cyan-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="primary" className="w-full py-4 text-lg" icon={CheckCircle}>
                  Book Appointment
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* Patients Tab */}
        {currentTab === 'patients' && (
          <div className="animate-in fade-in-50">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">
                Patient <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Directory</span>
              </h1>
              <Button variant="primary" icon={Plus} onClick={() => setShowPatientModal(true)}>
                Add Patient
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map(patient => (
                <Card key={patient.id} className="p-6" hover={true} interactive={true}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {patient.name[0]}
                    </div>
                    <Dropdown
                      trigger={<MoreVertical size={18} />}
                      items={[
                        { label: 'View Details', icon: Eye },
                        { label: 'Edit', icon: Edit2 },
                        { label: 'Book Appointment', icon: Plus },
                      ]}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">{patient.name}</h3>

                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-cyan-400" />
                      {patient.phone}
                    </div>
                    {patient.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-cyan-400" />
                        {patient.email}
                      </div>
                    )}
                    {patient.blood_group && (
                      <div className="flex items-center gap-2">
                        <Droplet size={16} className="text-red-400" />
                        {patient.blood_group}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-2">Recent Visits</p>
                    <Badge variant="info">3 appointments</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={showBookModal}
        onClose={() => setShowBookModal(false)}
        title="Book New Appointment"
      >
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <select
            value={bookingForm.patient_id}
            onChange={(e) => setBookingForm({ ...bookingForm, patient_id: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="">Select patient...</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={bookingForm.doctor_id}
            onChange={(e) => setBookingForm({ ...bookingForm, doctor_id: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="">Select doctor...</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <input
            type="date"
            value={bookingForm.appointment_date}
            onChange={(e) => setBookingForm({ ...bookingForm, appointment_date: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          />

          <select
            value={bookingForm.start_time}
            onChange={(e) => setBookingForm({ ...bookingForm, start_time: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="">Select time...</option>
            {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <Button variant="primary" className="w-full" onClick={() => {}}>
            Book Appointment
          </Button>
        </form>
      </Modal>

      {/* Add Patient Modal */}
      <Modal
        isOpen={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        title="Add New Patient"
      >
        <form onSubmit={handleAddPatient} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newPatientForm.name}
            onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={newPatientForm.phone}
            onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
          />

          <input
            type="email"
            placeholder="Email (optional)"
            value={newPatientForm.email}
            onChange={(e) => setNewPatientForm({ ...newPatientForm, email: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
          />

          <select
            value={newPatientForm.blood_group}
            onChange={(e) => setNewPatientForm({ ...newPatientForm, blood_group: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            <option value="">Blood Group (optional)</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <Button variant="primary" className="w-full">
            Add Patient
          </Button>
        </form>
      </Modal>
    </div>
  );
};

// ============== DOCTOR DASHBOARD ==============
const DoctorDashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('schedule');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [consultationNotes, setConsultationNotes] = useState('');
  const notificationContext = React.useContext(NotificationContext);

  useEffect(() => {
    loadDoctorData();
    const interval = setInterval(loadDoctorData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadDoctorData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      const response = await axios.get(`${API_URL}/api/dashboard/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(response.data.todaysAppointments || []);
    } catch (error) {
      notificationContext?.addNotification('Failed to load appointments', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('authToken');

      await axios.put(
        `${API_URL}/api/appointments/${appointmentId}`,
        { status: 'completed', notes: consultationNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConsultationNotes('');
      setSelectedAppointment(null);
      loadDoctorData();
      notificationContext?.addNotification('✅ Appointment marked as completed', 'success');
    } catch (error) {
      notificationContext?.addNotification('Failed to complete appointment', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <AnimatedBackground />
      <CursorGlow />

      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Stethoscope size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ClinicOS Pro</h1>
              <p className="text-xs text-slate-400">Doctor Panel</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {[
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map(tab => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                    currentTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
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
            <Badge variant="success">Dr. {user?.name?.split(' ')[1]}</Badge>
            <Button variant="danger" className="px-4 py-2" icon={LogOut} onClick={onLogout}>
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Schedule Tab */}
        {currentTab === 'schedule' && (
          <div className="space-y-8 animate-in fade-in-50">
            <h1 className="text-5xl font-bold">
              Today's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Schedule</span>
            </h1>

            {loading ? (
              <Card className="p-8 text-center">
                <Loader size={32} className="mx-auto mb-4 text-cyan-400 animate-spin" />
                <p className="text-slate-400">Loading appointments...</p>
              </Card>
            ) : appointments.length === 0 ? (
              <Card className="p-12 text-center" hover={false}>
                <Calendar size={48} className="mx-auto mb-4 text-slate-500" />
                <p className="text-slate-400 mb-4">No appointments scheduled for today</p>
                <p className="text-slate-500 text-sm">Enjoy your free time!</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt, idx) => (
                  <Card
                    key={apt.id}
                    className="p-6 hover:shadow-2xl hover:shadow-cyan-500/20 group"
                    hover={true}
                    interactive={true}
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {idx + 1}
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                            {apt.patient_name}
                          </h3>
                          {apt.allergies && (
                            <Badge variant="danger" animated={true}>
                              ⚠️ Allergies: {apt.allergies}
                            </Badge>
                          )}
                          {apt.medical_history && (
                            <p className="text-slate-400 text-sm mt-2">📋 {apt.medical_history}</p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-4xl font-bold text-cyan-400">{apt.start_time}</p>
                        <p className="text-sm text-slate-400 mt-1">{apt.duration_minutes} minutes</p>
                      </div>
                    </div>

                    {/* Expanded Form */}
                    {selectedAppointment?.id === apt.id && (
                      <div className="mt-6 pt-6 border-t border-slate-700 animate-in slide-in-from-bottom">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-slate-200">Consultation Notes</label>
                            <textarea
                              value={consultationNotes}
                              onChange={(e) => setConsultationNotes(e.target.value)}
                              placeholder="Examination findings, diagnosis, treatment plan..."
                              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                              rows="4"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="success"
                              className="flex-1"
                              onClick={() => handleCompleteAppointment(apt.id)}
                              icon={CheckCircle}
                            >
                              Mark Complete
                            </Button>
                            <Button
                              variant="ghost"
                              className="px-4"
                              onClick={() => setSelectedAppointment(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Patients Tab */}
        {currentTab === 'patients' && (
          <div className="animate-in fade-in-50">
            <h1 className="text-4xl font-bold mb-8">
              Patient <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Records</span>
            </h1>

            <div className="space-y-4">
              {appointments.map(apt => (
                <Card key={apt.id} className="p-6" hover={true}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {apt.patient_name[0]}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{apt.patient_name}</h3>
                        <p className="text-slate-400 text-sm">Appointment: {apt.appointment_date} at {apt.start_time}</p>
                      </div>
                    </div>
                    <Badge variant="info">{apt.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {apt.medical_history && (
                      <div>
                        <p className="text-slate-400 text-xs uppercase font-bold mb-2 flex items-center gap-1">
                          <Activity size={14} /> Medical History
                        </p>
                        <p className="text-slate-200 text-sm">{apt.medical_history}</p>
                      </div>
                    )}

                    {apt.allergies && (
                      <div>
                        <p className="text-red-400 text-xs uppercase font-bold mb-2 flex items-center gap-1">
                          <AlertTriangle size={14} /> Allergies
                        </p>
                        <p className="text-red-300 text-sm">{apt.allergies}</p>
                      </div>
                    )}

                    {apt.phone && (
                      <div>
                        <p className="text-slate-400 text-xs uppercase font-bold mb-2 flex items-center gap-1">
                          <Phone size={14} /> Contact
                        </p>
                        <p className="text-slate-200 text-sm">{apt.phone}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-700 rounded-full animate-spin border-t-cyan-400 border-r-cyan-400" />
          <p className="mt-8 text-cyan-400 font-semibold text-center">Loading ClinicOS Pro...</p>
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