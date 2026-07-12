'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '../ProductCard';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  SlidersHorizontal, 
  ShoppingBag, 
  Star, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  HelpCircle,
  ChevronDown,
  Mail
} from 'lucide-react';
import { FAQS, BLOG_POSTS } from '@/lib/data';

export default function HomeView() {
  const { products, setView, setSelectedCategory, addToast } = useStore();
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const [newsEmail, setNewsEmail] = useState('');
  
  // Timer calculations
  const [timeLeft, setTimeLeft] = useState({ hrs: 18, mins: 42, secs: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const end = now + 18 * 3600 * 1000 + 42 * 60 * 1000;
      const diff = end - now;
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setTimeLeft({ hrs, mins, secs });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      addToast('VIP status confirmed. Welcome to the PMART Inner Circle.', 'success');
      setNewsEmail('');
    }
  };

  // Curated lists
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const categories = [
    { name: "Peripherals", desc: "Mechanical weapons & workspace elements", count: "2 items", icon: Cpu, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=400" },
    { name: "Audio", desc: "Planar magnetic monitors & extreme soundstages", count: "1 item", icon: Sparkles, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400" },
    { name: "Timepieces", desc: "Forged carbon mechanical wristwatches", count: "2 items", icon: Zap, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
    { name: "Gear", desc: "Minimalist tactical wallets & hardshell armor", count: "3 items", icon: SlidersHorizontal, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div id="home-view" className="space-y-24 pb-20">
      
      {/* 1. CINEMATIC LUXURY HERO SECTION */}
      <section id="hero-section" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-900 bg-black/40">
        {/* Background glow node */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-dark-red/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Abstract Carbon Matrix lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 text-center space-y-8">
          
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            <span>VIP INTRODUCTORY REVELATION</span>
          </div>

          {/* Premium Typography Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.1]">
              CARBON FIBER & <br />
              <span className="bg-gradient-to-r from-brand-red to-brand-dark-red bg-clip-text text-transparent text-glow-crimson font-black">
                CRIMSON SUPREMACY
              </span>
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              PMART manufactures and curates high-performance workstation instruments, forged timepieces, and tactical EDC travel systems designed exclusively for connoisseurs of extreme craft.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="hero-explore-btn"
              onClick={() => setView('shop')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-red text-white font-extrabold text-xs tracking-widest uppercase hover:opacity-90 hover:shadow-lg hover:shadow-brand-red/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              EXPLORE COLLECTION <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-curator-btn"
              onClick={() => setView('admin-dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-brand-red hover:bg-zinc-900 text-zinc-300 font-extrabold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-brand-red" />
              CURATOR SYSTEM
            </button>
          </div>

          {/* Stat indicators */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-10 border-t border-zinc-900/60 font-mono">
            <div className="text-center">
              <span className="block text-white text-lg sm:text-2xl font-bold">100%</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Dry Carbon</span>
            </div>
            <div className="text-center border-x border-zinc-900">
              <span className="block text-white text-lg sm:text-2xl font-bold">3-YEAR</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Shield Warranty</span>
            </div>
            <div className="text-center">
              <span className="block text-white text-lg sm:text-2xl font-bold">GLOBAL</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">Insured Dispatch</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-900 pb-4">
          <div>
            <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">CURATOR CLASSIFICATIONS</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Curated Specialties</h2>
          </div>
          <button 
            id="categories-explore"
            onClick={() => setView('shop')}
            className="text-xs font-bold text-zinc-400 hover:text-brand-red transition-colors flex items-center gap-1"
          >
            VIEW ALL SPECIALTIES <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                id={`cat-card-${idx}`}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setView('shop');
                }}
                className="group relative h-64 rounded-2xl border border-zinc-900 overflow-hidden bg-zinc-950/40 cursor-pointer glass-panel-hover"
              >
                {/* Background image overlay */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                
                {/* Visual red gradient flare */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-brand-red">
                    <IconComponent className="w-5 h-5 text-glow-crimson" />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-brand-red tracking-wider uppercase font-bold">{cat.count}</span>
                    <h3 className="text-base font-bold text-white group-hover:text-brand-red transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-normal">{cat.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS */}
      <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-baseline justify-between border-b border-zinc-900 pb-4">
          <div>
            <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">TACTICAL SELECTIONS</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Trending Instruments</h2>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">UPDATED HOURLY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE ACCENT BANNER */}
      <section id="flash-sale-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-brand-red/15 bg-gradient-to-r from-zinc-950 via-brand-red/5 to-zinc-950 p-8 sm:p-12 md:p-16 overflow-hidden glow-crimson/5">
          {/* Glow spots */}
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-brand-red/10 rounded-full blur-[80px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Countdown timer left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-red text-white text-[10px] font-mono font-black px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" /> LIMITED CAPSULE
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">VIP CLEARANCE</span>
              </div>
              
              <h3 className="font-sans font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                AeroBlade Carbon Keyboard <br />
                <span className="text-brand-red text-glow-crimson">Flash Sale is Currently Live</span>
              </h3>
              
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                Unlock 20% discount on PMART&apos;s best-selling mechanical instrument. Built from real aerospace-milled dry carbon fiber with pre-lubed silent linear switches. Use code <span className="font-mono font-bold text-white bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">PMART20</span> at checkout.
              </p>

              {/* Ticking timer boxes */}
              <div className="flex items-center gap-3">
                {[
                  { value: timeLeft.hrs, label: "HOURS" },
                  { value: timeLeft.mins, label: "MINS" },
                  { value: timeLeft.secs, label: "SECS" }
                ].map((t, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg sm:text-xl font-mono font-black text-white text-glow-crimson">
                      {String(t.value).padStart(2, '0')}
                    </div>
                    <span className="text-[8px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product image CTA right */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-4">
              <div className="w-64 h-64 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden relative shadow-2xl shadow-black">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600"
                  alt="AeroBlade"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-zinc-950/90 border border-zinc-800 px-3 py-1.5 rounded-lg">
                  <span className="block text-[8px] text-zinc-500 font-mono uppercase">SPECIAL VALUE</span>
                  <span className="text-sm font-mono font-extrabold text-white">$299</span>
                  <span className="text-[10px] text-zinc-500 font-mono line-through ml-1.5">$349</span>
                </div>
              </div>
              <button
                id="flash-sale-secure-now"
                onClick={() => setView('product-details', 'prod-1')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-red text-white font-extrabold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-red/15 hover:shadow-brand-red/30"
              >
                SECURE UNIT <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section id="bestsellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-baseline justify-between border-b border-zinc-900 pb-4">
          <div>
            <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">ELITE PERFORMANCE</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Best Sellers</h2>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">HIGH DEMAND</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. REAL CLIENT REVIEWS */}
      <section id="reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-[0.25em]">VERIFIED FEEDBACK</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Mastery Acknowledged</h2>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">Read honest testimonials from verified PMART VIP customers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Marcus Vance", role: "Vivid Graphics Director", comment: "Absolutely mind-blowing quality. The carbon fiber chassis on the AeroBlade is real, thick, and has a fantastic heavy resonance. PMART's service was lightning-fast. Best luxury tech store online.", rating: 5, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120" },
            { name: "Elena Rostova", role: "Acoustic Consultant", comment: "The Vulcan headphones sound pristine. The planer drivers are extremely crisp and the crimson stitching matches my workspace flawlessly. Highly recommend the VIP packaging!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
            { name: "Dave Kim", role: "Mechanical Architect", comment: "The titanium pen has an amazing mechanical feel, satisfying bolt action clicks, and premium balance. Looking forward to more red-accent gear from PMART.", rating: 4, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" }
          ].map((rev, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
              <div className="flex text-brand-red gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current text-brand-red' : 'text-zinc-800'}`} />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full border border-zinc-900 object-cover" />
                <div>
                  <h5 className="text-xs font-bold text-white">{rev.name}</h5>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-[0.25em]">OPERATIONAL KNOWLEDGE</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">Frequently Answered</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-900 bg-zinc-950/40 overflow-hidden"
            >
              <button
                id={`faq-btn-${idx}`}
                onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-zinc-200 hover:text-white transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${activeFaqIdx === idx ? 'rotate-180 text-brand-red' : ''}`} />
              </button>
              
              {activeFaqIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-900/40">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIPTION BENTO */}
      <section id="home-newsletter" className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl border border-zinc-900 bg-zinc-950/60 relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#FF1E1E_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-red mx-auto">
            <Mail className="w-5 h-5 text-glow-crimson" />
          </div>

          <div className="space-y-2">
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white">Unlock Limited Capsules</h3>
            <p className="text-xs text-zinc-500 max-w-md mx-auto">
              Join the PMART VIP register to receive priority alerts on structural item drops, member coupons, and curation events.
            </p>
          </div>

          <form onSubmit={handleNewsSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="ENTER YOUR EMAIL FOR VIP ENTRY"
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              className="flex-1 bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-brand-red font-mono"
            />
            <button
              id="newsletter-register-btn"
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-red text-white text-xs font-bold font-mono tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-brand-red/10"
            >
              REGISTER NOW
            </button>
          </form>

          <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">
            SECURED END-TO-END // NO RE-DISTRIBUTION // CANCEL ANYTIME
          </p>
        </div>
      </section>

    </div>
  );
}
