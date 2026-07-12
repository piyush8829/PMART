'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';

export default function Footer() {
  const { setView, addToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Welcome to the inner circle. Subscription confirmed.', 'success');
      setEmail('');
    }
  };

  return (
    <footer id="main-footer" className="bg-black border-t border-zinc-900 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Value Badges */}
        <div id="footer-badges" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-zinc-900">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
            <Truck className="w-5 h-5 text-brand-red text-glow-crimson shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">GLOBAL INSURED SHIELD</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">Complementary secure global air transport</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
            <ShieldCheck className="w-5 h-5 text-brand-red text-glow-crimson shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">3-YEAR FULL COVERAGE</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">Comprehensive Carbon Shield backing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
            <RefreshCw className="w-5 h-5 text-brand-red text-glow-crimson shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">14-DAY VAULT RETURN</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">Compliant custom exchange policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/50 border border-zinc-900/60">
            <Sparkles className="w-5 h-5 text-brand-red text-glow-crimson shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">VIP MEMBER SERVICES</h4>
              <p className="text-[10px] text-zinc-500 mt-0.5">24/7 dedicated personal concierge</p>
            </div>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-red flex items-center justify-center font-bold text-white text-sm">
                P
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">P<span className="text-brand-red">MART</span></span>
            </div>
            
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              PMART is a leading designer and curated showcase of ultra-performance carbon fiber electronics, technical luxury instruments, and limited mechanical accessories. We believe in raw structural excellence and crimson boldness.
            </p>

            <div className="flex gap-3">
              {[
                { Icon: Twitter, link: "https://twitter.com" },
                { Icon: Instagram, link: "https://instagram.com" },
                { Icon: Youtube, link: "https://youtube.com" }
              ].map(({ Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-3 md:col-span-4 gap-6">
            <div className="space-y-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Curated</h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setView('shop')} className="hover:text-brand-red transition-colors">Shop All</button></li>
                <li><button onClick={() => setView('shop')} className="hover:text-brand-red transition-colors">Trending Now</button></li>
                <li><button onClick={() => setView('shop')} className="hover:text-brand-red transition-colors">Best Sellers</button></li>
                <li><button onClick={() => setView('shop')} className="hover:text-brand-red transition-colors">Flash Sales</button></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Company</h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setView('about')} className="hover:text-brand-red transition-colors">About Us</button></li>
                <li><button onClick={() => setView('contact')} className="hover:text-brand-red transition-colors">Contact Support</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-brand-red transition-colors">Careers</button></li>
                <li><button onClick={() => setView('contact')} className="hover:text-brand-red transition-colors">Locations</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Policies</h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setView('privacy')} className="hover:text-brand-red transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-brand-red transition-colors">Terms of Vault</button></li>
                <li><button onClick={() => setView('privacy')} className="hover:text-brand-red transition-colors">Warranty Rules</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-brand-red transition-colors">FAQ</button></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-widest font-mono">VIP INNER CIRCLE</h5>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Unlock access to limited curated capsules, custom product releases, and private discount waves before general dispatch.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-900 rounded-lg px-3 py-2 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-mono"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-lg bg-gradient-red hover:opacity-90 flex items-center justify-center text-white transition-all shrink-0 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Legal Disclaimer / Payments */}
        <div className="border-t border-zinc-900/60 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Line */}
          <p className="text-[11px] text-zinc-600 font-mono">
            © 2026 PMART. All Rights Reserved.
          </p>

          {/* Luxury Payment Options Icons */}
          <div className="flex items-center gap-3">
            {/* Minimalist representation of payment badges */}
            {["VISA", "MC", "AMEX", "APPLE PAY", "BTC"].map((pay, idx) => (
              <span
                key={idx}
                className="text-[8px] font-mono font-bold text-zinc-600 border border-zinc-900 px-2 py-1 rounded bg-zinc-950"
              >
                {pay}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}
