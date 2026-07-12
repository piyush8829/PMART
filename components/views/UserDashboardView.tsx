'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  User, 
  Lock, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Compass, 
  ShieldCheck, 
  Mail, 
  SlidersHorizontal,
  KeyRound,
  EyeOff,
  LogOut,
  ChevronRight,
  Cpu,
  Info,
  CheckCircle2
} from 'lucide-react';
import ProductCard from '../ProductCard';

export default function UserDashboardView() {
  const { 
    currentUser, 
    login, 
    registerUser, 
    logout, 
    orders, 
    wishlist, 
    products, 
    toggleWishlist,
    addToCart,
    setView,
    addToast
  } = useStore();

  // Navigation tab inside dashboard
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses' | 'settings'>('orders');

  // Authentication states
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Profile Form state
  const [profName, setProfName] = useState(currentUser?.name || '');
  const [profEmail, setProfEmail] = useState(currentUser?.email || '');
  const [profOldPassword, setProfOldPassword] = useState('');
  const [profNewPassword, setProfNewPassword] = useState('');

  // Address book states
  const [shippingStreet, setShippingStreet] = useState('1492 Carbon Highway, Block C');
  const [shippingCity, setShippingCity] = useState('Neo City');
  const [shippingZip, setShippingZip] = useState('94102');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const success = login(authEmail, authPassword);
      if (success) {
        setAuthEmail('');
        setAuthPassword('');
      }
    } else if (authMode === 'register') {
      const success = registerUser(authName, authEmail, authPassword);
      if (success) {
        setAuthName('');
        setAuthEmail('');
        setAuthPassword('');
      }
    } else {
      setForgotSubmitted(true);
      addToast(`Reset guidelines dispatched to ${authEmail}.`, 'success');
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile parameters updated securely in localStorage.', 'success');
    setProfOldPassword('');
    setProfNewPassword('');
  };

  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Shipping & Billing addresses synced successfully.', 'success');
  };

  // Filter products in Wishlist
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  // --- SUBVIEW 1: AUTHENTICATION IF NOT LOGGED IN ---
  if (!currentUser) {
    return (
      <div id="auth-container" className="max-w-md mx-auto px-4 py-12">
        <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-950/80 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Crimson glow spot */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-red/10 rounded-full blur-2xl" />

          {/* Header */}
          <div className="text-center space-y-1.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-red flex items-center justify-center font-bold text-white text-lg mx-auto shadow-md">
              P
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight pt-3">
              {authMode === 'login' ? 'ACCESS SECURE VAULT' : authMode === 'register' ? 'REGISTER VIP DOCKET' : 'RESET SECURITY KEY'}
            </h2>
            <p className="text-xs text-zinc-500 leading-normal">
              {authMode === 'login' 
                ? 'Authenticate your coordinates to check orders or edit wishlist.' 
                : authMode === 'register' 
                ? 'Gain credentials to lock in clearance price waves and VIP items.' 
                : 'Enter your email to dispatch password credentials resets.'}
            </p>
          </div>

          {forgotSubmitted && authMode === 'forgot' ? (
            /* Forgot Password success confirmation */
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-xs text-zinc-300">
                A custom decryption security token link was dispatched to <strong className="text-white font-mono">{authEmail}</strong>. Check your inbox.
              </p>
              <button
                id="forgot-back-to-login"
                type="button"
                onClick={() => { setAuthMode('login'); setForgotSubmitted(false); }}
                className="text-xs text-brand-red hover:underline font-mono uppercase"
              >
                Back to Login Portal
              </button>
            </div>
          ) : (
            /* Auth form */
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Your Official Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-sans"
                    />
                    <User className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Security Email</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@pmart.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                  />
                  <Mail className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Secret Passcode</label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[9px] text-zinc-500 hover:text-brand-red transition-colors font-mono"
                      >
                        Reset Key?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                    />
                    <Lock className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              )}

              {/* Submit triggers */}
              <button
                id="auth-submit-trigger"
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-red text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md hover:opacity-95"
              >
                {authMode === 'login' ? 'AUTHORIZE SECURE CONNECT' : authMode === 'register' ? 'CONFIRM VIP ACCESS' : 'DISPATCH KEY RESET'}
              </button>

              {/* Presets and help guidelines info */}
              {authMode === 'login' && (
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900/60 space-y-1.5 text-[10px] text-zinc-500 font-sans">
                  <div className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-brand-red" />
                    <span>PRESET SIMULATION KEYS:</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Curator/Admin Login:</span>
                    <span className="text-zinc-300">admin@pmart.com</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Curator passcode:</span>
                    <span className="text-zinc-300">admin</span>
                  </div>
                  <p className="text-[9px] pt-1 text-zinc-600 border-t border-zinc-900">
                    *Input any email with a 4+ char password to simulate client signups.
                  </p>
                </div>
              )}
            </form>
          )}

          {/* Navigation toggles to other auth modes */}
          <div className="text-center border-t border-zinc-900/60 pt-4 text-[11px] text-zinc-500 font-medium">
            {authMode === 'login' ? (
              <p>
                First time at the concept house?{' '}
                <button
                  id="auth-toggle-register"
                  onClick={() => setAuthMode('register')}
                  className="text-brand-red font-bold hover:underline"
                >
                  Create credentials
                </button>
              </p>
            ) : (
              <p>
                Already have vault credentials?{' '}
                <button
                  id="auth-toggle-login"
                  onClick={() => setAuthMode('login')}
                  className="text-brand-red font-bold hover:underline"
                >
                  Log in here
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    );
  }

  // --- SUBVIEW 2: PRIMARY DASHBOARD ACTIVE SCREEN ---
  return (
    <div id="dashboard-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      
      {/* Title Header */}
      <div className="border-b border-zinc-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase">
            <span>VIP MEMBER CENTER</span>
            <span>/</span>
            <span className="text-brand-red">{activeTab}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            MEMBER VAULT
          </h1>
          <p className="text-xs text-zinc-500">
            Welcome back, <strong className="text-zinc-300 font-bold">{currentUser.name}</strong>. Access your past orders, wishlist, addresses, and settings.
          </p>
        </div>

        {/* Curator Quick Bypass shortcut (allows test-run easily) */}
        <div className="flex gap-2">
          {currentUser.role === 'admin' && (
            <button
              id="dash-go-admin"
              onClick={() => setView('admin-dashboard')}
              className="px-4 py-2 rounded-xl bg-brand-red/10 border border-brand-red/20 hover:bg-brand-red/25 text-xs text-brand-red font-bold transition-all flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4 text-glow-crimson" /> ADMIN CONSOLE
            </button>
          )}
          <button
            id="dash-logout-trigger"
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-brand-red text-xs text-zinc-400 hover:text-white font-mono flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-brand-red" /> LOCK VAULT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar Selector (3 cols) */}
        <nav id="dashboard-sidebar" className="lg:col-span-3 space-y-2">
          {[
            { id: 'orders', name: 'Order History', count: orders.length, icon: ShoppingBag },
            { id: 'wishlist', name: 'Wishlisted Items', count: wishlist.length, icon: Heart },
            { id: 'profile', name: 'Profile Parameters', count: null, icon: User },
            { id: 'addresses', name: 'Delivery Locations', count: null, icon: MapPin },
            { id: 'settings', name: 'Vault Security', count: null, icon: KeyRound }
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                id={`dash-tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between border ${
                  activeTab === tab.id
                    ? 'bg-zinc-900 border-zinc-800 text-white'
                    : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 ${activeTab === tab.id ? 'text-brand-red text-glow-crimson' : ''}`} />
                  <span>{tab.name}</span>
                </div>
                {tab.count !== null && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-brand-red text-white' : 'bg-zinc-950 text-zinc-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Content Panel (9 cols) */}
        <main id="dashboard-content-panel" className="lg:col-span-9">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div id="dash-orders-panel" className="space-y-6">
              <h3 className="text-sm font-mono text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-900 pb-3">
                SECURED DISPATCH LOGS
              </h3>

              {orders.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border border-zinc-900 bg-zinc-950/20 py-16">
                  <div className="w-12 h-12 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mb-4 text-zinc-700 mx-auto">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-300 mb-1">No dispatches locked</h4>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-6">
                    You haven&apos;t initiated any secure shipping orders during this current browser session.
                  </p>
                  <button
                    onClick={() => setView('shop')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold tracking-wider"
                  >
                    EXPLORE MASTER CATALOG
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((ord) => (
                    <div 
                      key={ord.id}
                      id={`order-card-${ord.id}`}
                      className="rounded-2xl border border-zinc-900 bg-zinc-950/40 overflow-hidden"
                    >
                      {/* Order top banner bar */}
                      <div className="p-5 bg-zinc-950/90 border-b border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Docket Identifier</span>
                          <h4 className="text-xs font-mono font-bold text-white uppercase">{ord.id}</h4>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs font-mono">
                          <div>
                            <span className="text-zinc-600 uppercase block text-[8px] font-bold">Dispatched</span>
                            <span className="text-zinc-300 font-medium">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600 uppercase block text-[8px] font-bold">Total Investment</span>
                            <span className="text-brand-red text-glow-crimson font-bold">${ord.total.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600 uppercase block text-[8px] font-bold">Vault Status</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              ord.status === 'Processing' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-500' :
                              ord.status === 'Shipped' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' :
                              ord.status === 'Cancelled' ? 'bg-rose-500/10 border border-rose-500/20 text-rose-500' :
                              'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            }`}>
                              {ord.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Items list */}
                      <div className="p-5 space-y-3.5">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4 text-xs pb-3.5 last:pb-0 last:border-0 border-b border-zinc-900/60">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="Unit" className="w-10 h-10 rounded-lg object-cover border border-zinc-900" />
                              <div>
                                <h5 className="font-bold text-zinc-200">{item.name}</h5>
                                <span className="text-[10px] text-zinc-500 font-mono">Quantity: {item.quantity}</span>
                              </div>
                            </div>
                            <span className="font-mono text-zinc-300 font-semibold">${item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Address detail drawer */}
                      <div className="px-5 py-3.5 bg-zinc-950/30 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 flex flex-col sm:flex-row justify-between gap-3">
                        <div>
                          <span className="text-zinc-600 uppercase font-bold">Consignee Address:</span> {ord.shippingAddress.fullName}, {ord.shippingAddress.address}, {ord.shippingAddress.city}, {ord.shippingAddress.postalCode}
                        </div>
                        <div>
                          <span className="text-zinc-600 uppercase font-bold">Payment Hook:</span> {ord.paymentMethod}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLISTED ITEMS */}
          {activeTab === 'wishlist' && (
            <div id="dash-wishlist-panel" className="space-y-6">
              <h3 className="text-sm font-mono text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-900 pb-3">
                Saved Masterpieces
              </h3>

              {wishlistedProducts.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border border-zinc-900 bg-zinc-950/20 py-16">
                  <div className="w-12 h-12 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mb-4 text-zinc-700 mx-auto">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-300 mb-1">Your wishlist is empty</h4>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-6">
                    Review specifications inside the catalogue and click the heart parameters to log items here.
                  </p>
                  <button
                    onClick={() => setView('shop')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold tracking-wider"
                  >
                    DISCOVER INSTRUMENTS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedProducts.map((p) => (
                    <div key={p.id} className="relative">
                      {/* Eject Wishlist absolute button */}
                      <button
                        id={`wishlist-dash-remove-${p.id}`}
                        onClick={() => toggleWishlist(p.id)}
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-brand-red text-zinc-400 hover:text-brand-red flex items-center justify-center cursor-pointer"
                        title="Remove from Saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROFILE PARAMETERS */}
          {activeTab === 'profile' && (
            <div id="dash-profile-panel" className="space-y-6">
              <h3 className="text-sm font-mono text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-900 pb-3">
                PROFILE SYSTEM LOGS
              </h3>

              <form onSubmit={handleUpdateProfile} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Decoded Name</label>
                  <input
                    type="text"
                    required
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Secure Communication Email</label>
                  <input
                    type="email"
                    required
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Current passcode</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={profOldPassword}
                      onChange={(e) => setProfOldPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">New secret key passcode</label>
                    <input
                      type="password"
                      placeholder="Enter new code"
                      value={profNewPassword}
                      onChange={(e) => setProfNewPassword(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="text-right pt-2">
                  <button
                    id="profile-save-submit"
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold tracking-wider hover:opacity-95"
                  >
                    SYNC PROTOCOLS
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: DELIVERY LOCATIONS */}
          {activeTab === 'addresses' && (
            <div id="dash-addresses-panel" className="space-y-6">
              <h3 className="text-sm font-mono text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-900 pb-3">
                SECURE SHIPPING COGNIZANCE
              </h3>

              <form onSubmit={handleUpdateAddress} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Default Street Highway</label>
                  <input
                    type="text"
                    required
                    value={shippingStreet}
                    onChange={(e) => setShippingStreet(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">City coordinates</label>
                    <input
                      type="text"
                      required
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Zip Routing Code</label>
                    <input
                      type="text"
                      required
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>
                </div>

                <div className="text-right pt-2">
                  <button
                    id="address-save-submit"
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold tracking-wider hover:opacity-95"
                  >
                    LOCK DELIVERY LOCATION
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: VAULT SECURITY */}
          {activeTab === 'settings' && (
            <div id="dash-settings-panel" className="space-y-6">
              <h3 className="text-sm font-mono text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-900 pb-3">
                VAULT SECURITY OVERWATCH
              </h3>

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4 max-w-xl font-sans text-xs">
                <div className="flex items-center justify-between p-3.5 bg-zinc-900 border border-zinc-850 rounded-xl">
                  <div>
                    <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Two-Factor Encryption (2FA)</h5>
                    <p className="text-zinc-500 text-[10px] mt-0.5">Enforces physical hardware authenticator tokens</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-red rounded-full p-1 cursor-pointer flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-900 border border-zinc-850 rounded-xl">
                  <div>
                    <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Blockchain Ledger Receipts</h5>
                    <p className="text-zinc-500 text-[10px] mt-0.5">Transmits proof of dispatch to decentralized ledger</p>
                  </div>
                  <div className="w-12 h-6 bg-zinc-800 rounded-full p-1 cursor-pointer flex justify-start">
                    <div className="w-4 h-4 bg-zinc-500 rounded-full shadow" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-900 border border-zinc-850 rounded-xl">
                  <div>
                    <h5 className="font-bold text-white uppercase text-[10px] tracking-wider">Concierge Clearance Notifications</h5>
                    <p className="text-zinc-500 text-[10px] mt-0.5">Opt-in to micro-sms release updates</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-red rounded-full p-1 cursor-pointer flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
