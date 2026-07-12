'use client';

import React, { useState } from 'react';
import { useStore, AppView } from '@/context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Cpu, 
  Flame, 
  Sparkles, 
  ChevronDown, 
  Settings, 
  LogOut, 
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { 
    view, 
    setView, 
    getCartItemCount, 
    wishlist, 
    currentUser, 
    logout,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [tempSearch, setTempSearch] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Categories list
  const categories = ["All", "Peripherals", "Audio", "Timepieces", "Gear"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
    setSelectedCategory('All');
    setView('shop');
    setIsSearchOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setView('shop');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo"
              onClick={() => setView('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-red flex items-center justify-center font-black text-xl text-white shadow-lg shadow-brand-red/20 group-hover:shadow-brand-red/40 group-hover:scale-105 transition-all">
                P
              </div>
              <div>
                <span className="font-sans font-extrabold text-2xl tracking-tight text-white group-hover:text-brand-red transition-colors">
                  P<span className="text-brand-red text-glow-crimson font-black">MART</span>
                </span>
                <span className="block text-[8px] tracking-[0.25em] text-zinc-500 font-mono">CURATED ELITE</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                id="nav-home"
                onClick={() => setView('home')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors hover:text-brand-red ${
                  view === 'home' ? 'text-brand-red font-extrabold' : 'text-zinc-400'
                }`}
              >
                Home
              </button>
              
              {/* Mega Menu Category Dropdown */}
              <div className="relative group/mega">
                <button
                  id="nav-shop"
                  onClick={() => setView('shop')}
                  className={`text-xs font-bold tracking-wider uppercase flex items-center gap-1 transition-colors hover:text-brand-red ${
                    view === 'shop' ? 'text-brand-red font-extrabold' : 'text-zinc-400'
                  }`}
                >
                  Shop <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover/mega:rotate-180" />
                </button>

                {/* Mega Menu Content */}
                <div className="absolute top-full left-0 mt-2 w-72 p-4 rounded-xl border border-zinc-800 bg-zinc-950/95 shadow-2xl backdrop-blur-xl opacity-0 invisible group-hover/mega:opacity-100 group-hover/mega:visible transition-all duration-200 z-50">
                  <div className="space-y-3">
                    <p className="text-[10px] tracking-widest text-zinc-500 font-mono uppercase border-b border-zinc-900 pb-1.5 font-bold">
                      CURATED CATEGORIES
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          id={`mega-cat-${cat}`}
                          onClick={() => handleCategoryClick(cat)}
                          className="text-left text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/60 px-3 py-2 rounded-lg transition-all flex items-center justify-between"
                        >
                          <span>{cat === 'All' ? 'View All Masterpieces' : cat}</span>
                          <span className="text-[9px] text-zinc-600 font-mono">PM-C</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                id="nav-about"
                onClick={() => setView('about')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors hover:text-brand-red ${
                  view === 'about' ? 'text-brand-red font-extrabold' : 'text-zinc-400'
                }`}
              >
                About Us
              </button>
              
              <button
                id="nav-contact"
                onClick={() => setView('contact')}
                className={`text-xs font-bold tracking-wider uppercase transition-colors hover:text-brand-red ${
                  view === 'contact' ? 'text-brand-red font-extrabold' : 'text-zinc-400'
                }`}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* User Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search Trigger */}
            <button
              id="search-btn-trigger"
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Search master curation"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <button
              id="wishlist-btn-trigger"
              onClick={() => setView('user-dashboard')}
              className="w-10 h-10 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all relative cursor-pointer"
              title="Your Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full text-[8px] font-mono font-bold text-white flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="cart-btn-trigger"
              onClick={() => setIsCartOpen(true)}
              className="w-10 h-10 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all relative cursor-pointer"
              title="Shopping Vault"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-400 group-hover:text-brand-red" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full text-[8px] font-mono font-bold text-white flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>

            {/* User Dropdown / Auth Link */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    id="user-profile-dropdown"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-red flex items-center justify-center text-[10px] text-white font-bold uppercase">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="hidden lg:inline text-xs font-semibold max-w-[100px] truncate text-zinc-300">
                      {currentUser.role === 'admin' ? 'Curator' : currentUser.name}
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-3 py-2 border-b border-zinc-900">
                          <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono truncate">{currentUser.email}</p>
                        </div>
                        <div className="py-1">
                          <button
                            id="dropdown-dashboard"
                            onClick={() => {
                              setView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-zinc-900 hover:text-white transition-colors flex items-center gap-2 text-zinc-400"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <span>{currentUser.role === 'admin' ? 'Admin Panel' : 'User Dashboard'}</span>
                          </button>

                          {currentUser.role === 'user' && (
                            <button
                              id="dropdown-admin-shortcut"
                              onClick={() => {
                                setView('admin-dashboard');
                                setIsUserDropdownOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-zinc-900 hover:text-brand-red transition-colors flex items-center gap-2 text-zinc-500 font-mono"
                            >
                              <Cpu className="w-3.5 h-3.5 text-brand-red/60" />
                              <span>Go to Admin View</span>
                            </button>
                          )}

                          <button
                            id="dropdown-logout"
                            onClick={() => {
                              logout();
                              setIsUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-zinc-900 hover:text-brand-red text-zinc-400 hover:bg-brand-red/5 transition-colors flex items-center gap-2"
                          >
                            <LogOut className="w-3.5 h-3.5 text-brand-red" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  id="nav-auth-login"
                  onClick={() => setView('user-dashboard')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold tracking-wider hover:border-brand-red transition-all flex items-center gap-1.5 hover:text-white text-zinc-300"
                >
                  <User className="w-3.5 h-3.5 text-brand-red" />
                  <span className="hidden sm:inline">VAULT LOG</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 cursor-pointer"
            />
            <motion.div
              id="mobile-drawer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-4/5 max-w-sm bg-[#0D0D0D] border-r border-zinc-800 z-30 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Mobile Logo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-red flex items-center justify-center font-bold text-white text-sm">
                      P
                    </div>
                    <span className="font-extrabold text-lg text-white">P<span className="text-brand-red">MART</span></span>
                  </div>
                  <button
                    id="close-mobile-menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Menu Links */}
                <div className="flex flex-col gap-4">
                  <p className="text-[10px] tracking-widest text-zinc-600 font-mono uppercase border-b border-zinc-900 pb-1">
                    Navigation
                  </p>
                  <button
                    id="mobile-link-home"
                    onClick={() => {
                      setView('home');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm font-bold uppercase py-1 ${
                      view === 'home' ? 'text-brand-red' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Home
                  </button>

                  <button
                    id="mobile-link-shop"
                    onClick={() => {
                      setView('shop');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm font-bold uppercase py-1 ${
                      view === 'shop' ? 'text-brand-red' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Shop All
                  </button>

                  <button
                    id="mobile-link-about"
                    onClick={() => {
                      setView('about');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm font-bold uppercase py-1 ${
                      view === 'about' ? 'text-brand-red' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    About PMART
                  </button>

                  <button
                    id="mobile-link-contact"
                    onClick={() => {
                      setView('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-sm font-bold uppercase py-1 ${
                      view === 'contact' ? 'text-brand-red' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Contact Us
                  </button>
                </div>

                {/* Mobile Category Filters */}
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] tracking-widest text-zinc-600 font-mono uppercase border-b border-zinc-900 pb-1">
                    Curated Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        id={`mobile-cat-${cat}`}
                        onClick={() => handleCategoryClick(cat)}
                        className="text-left text-xs text-zinc-400 hover:text-white bg-zinc-900/40 border border-zinc-950 px-3 py-2 rounded-lg"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Auth */}
              <div className="border-t border-zinc-900 pt-6 space-y-4">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-xs text-white font-bold">
                        {currentUser.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-zinc-200 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id="mobile-drawer-dashboard"
                        onClick={() => {
                          setView(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                        className="py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-center text-xs font-semibold text-zinc-300 hover:text-white"
                      >
                        Dashboard
                      </button>
                      <button
                        id="mobile-drawer-logout"
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="py-2 rounded-lg bg-brand-red/10 border border-brand-red/20 text-center text-xs font-semibold text-brand-red hover:bg-brand-red/20"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    id="mobile-drawer-login"
                    onClick={() => {
                      setView('user-dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-lg bg-gradient-red text-center text-xs font-bold tracking-wider text-white flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    ACCESS SECURE VAULT
                  </button>
                )}
                <p className="text-[9px] text-zinc-600 text-center font-mono uppercase tracking-widest">
                  © 2026 PMART. ALL RIGHTS RESERVED.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dark Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            id="fullscreen-search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#070707]/98 z-50 flex flex-col justify-between p-6 sm:p-12 md:p-20 backdrop-blur-2xl"
          >
            {/* Search Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-red flex items-center justify-center font-extrabold text-[11px] text-white">P</div>
                <span className="text-sm font-extrabold text-zinc-400">SEARCH MASTER CURATION</span>
              </div>
              <button
                id="search-overlay-close"
                onClick={() => setIsSearchOpen(false)}
                className="w-12 h-12 rounded-xl border border-zinc-800 hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-colors text-zinc-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Middle Form */}
            <div className="max-w-3xl w-full mx-auto space-y-6">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  id="search-input-field"
                  autoFocus
                  type="text"
                  placeholder="What masterwork are you searching for?"
                  value={tempSearch}
                  onChange={(e) => setTempSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-zinc-800 focus:border-brand-red py-4 text-2xl sm:text-3xl md:text-4xl text-white placeholder-zinc-700 font-sans tracking-tight focus:outline-none transition-colors pr-12 font-semibold"
                />
                <button
                  id="search-input-submit"
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-brand-red transition-colors"
                >
                  <Search className="w-6 sm:w-8 h-6 sm:h-8" />
                </button>
              </form>
              
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="text-[10px] text-zinc-600 font-mono uppercase font-bold tracking-widest">Trending Searches:</span>
                {["Carbon Keyboard", "Headphones", "Watch", "Wallet", "Titanium"].map((tag) => (
                  <button
                    key={tag}
                    id={`search-trend-${tag}`}
                    onClick={() => {
                      setTempSearch(tag);
                      setSearchQuery(tag);
                      setSelectedCategory('All');
                      setView('shop');
                      setIsSearchOpen(false);
                    }}
                    className="text-xs text-zinc-400 hover:text-white bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800/40 hover:border-zinc-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Footer */}
            <div className="text-center w-full border-t border-zinc-900/60 pt-6">
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                PMART SECURED SEARCH GATEWAY // 2026 INTELLECTUAL PROPERTY
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Instance */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
