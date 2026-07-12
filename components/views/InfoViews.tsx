'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  MessageSquare,
  Globe,
  Clock,
  ArrowRight
} from 'lucide-react';

/* ==========================================
   1. ABOUT VIEW
   ========================================== */
export function AboutView() {
  const { setView } = useStore();

  return (
    <div id="about-page-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16 animate-in fade-in duration-150">
      
      {/* Hero Header banner */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-zinc-950/80 p-8 sm:p-16 text-center space-y-4">
        {/* Subtle crimson radial aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl" />
        
        <span className="text-[10px] text-brand-red font-mono font-extrabold tracking-widest uppercase">THE PMART CHRONICLES</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AESTHETIC INGENUITY
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
          PMART was established in 2026 to fuse aerospace-grade composite craftsmanship with hyper-minimalist tactile accessories. We exist for those who reject defaults.
        </p>
      </div>

      {/* Dynamic Grid highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-3">
          <span className="text-brand-red text-xs font-mono font-extrabold">01 / DRIED COMPOSITES</span>
          <h4 className="text-base font-bold text-white">Milled Rigidity</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            We source our carbon sheets from elite autoclave facilities. Every chassis, wrist rest, and frame is dry-milled under strict temperature monitors to prevent resin discoloration.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-3">
          <span className="text-brand-red text-xs font-mono font-extrabold">02 / OPTICAL REFLEXES</span>
          <h4 className="text-base font-bold text-white">Prism Soundscapes</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Our audio peripherals utilize state-of-the-art planar magnetic diaphragms and acoustic dampening foams, ensuring zero resonance artifacts.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-3">
          <span className="text-brand-red text-xs font-mono font-extrabold">03 / CONCIERGE COVER</span>
          <h3 className="text-base font-bold text-white">Carbon Shield Cover</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Every PMART asset is catalogued in our local registry with a 3-year limited cover policy. We replace elements immediately upon structural faults.
          </p>
        </div>

      </div>

      {/* Meet team profile mockup */}
      <div className="space-y-6 pt-6">
        <div className="border-b border-zinc-900 pb-4 text-center sm:text-left">
          <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">THE DIRECTORS</span>
          <h2 className="text-2xl font-black text-white">Our Curation Leaders</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Julian Sterling", role: "Principal Mechanical Artisan", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" },
            { name: "Aria Vance", role: "Lead Acoustic Architect", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" },
            { name: "Kaito Morimoto", role: "Composite Materials Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300" },
            { name: "Theresa Blanchett", role: "VIP Concierge Overwatch", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" }
          ].map((t, idx) => (
            <div key={idx} className="rounded-2xl border border-zinc-900 bg-zinc-950/20 overflow-hidden text-center p-5 space-y-3">
              <img src={t.img} alt="Director" className="w-20 h-20 rounded-full border border-zinc-855 mx-auto object-cover" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white">{t.name}</h4>
                <p className="text-[9px] font-mono text-zinc-500 uppercase">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


/* ==========================================
   2. CONTACT VIEW
   ========================================== */
export function ContactView() {
  const { addToast } = useStore();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Inquiry');
  const [contactMsg, setContactMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMsg.trim()) return;

    addToast(`Ticket dispatched! Julian Vance's desk has been notified.`, 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  return (
    <div id="contact-page-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12 animate-in fade-in duration-150">
      
      <div className="border-b border-zinc-900 pb-6 space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">VIP COMMUNICATIONS</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          CONNECT WITH THE ARTISANS
        </h1>
        <p className="text-xs text-zinc-500">
          Have specialized mechanical requirements, customized composite requests, or corporate workspace bid contracts? Write to us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Coordinates details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
            <h4 className="text-xs font-mono text-zinc-300 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2">
              Corporate Headquarters
            </h4>
            
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                <div>
                  <span className="text-white block font-bold uppercase text-[9px] text-zinc-500">Physical Lab location</span>
                  <span>1492 Carbon Highway, Block C, Neo City, SF 94102</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <div>
                  <span className="text-white block font-bold uppercase text-[9px] text-zinc-500">Secure mailbox</span>
                  <span>curator@pmart.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <div>
                  <span className="text-white block font-bold uppercase text-[9px] text-zinc-500">Secure telephone network</span>
                  <span>+1 (555) 902-1920 (VIP Desk Only)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/20 text-xs text-zinc-500 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-white font-bold">
              <Clock className="w-4 h-4 text-brand-red" />
              <span>AESTHETIC CHRONOMETER HOURS</span>
            </div>
            <p>
              Monday – Friday, 09:00 – 18:00 (PST). Communications dispatched outside standard ledger operational shifts will be processed the following cycle.
            </p>
          </div>
        </div>

        {/* Right Dispatch form (7 cols) */}
        <form onSubmit={handleContactSubmit} className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-zinc-900 bg-zinc-950/80 space-y-5">
          <h4 className="text-xs font-mono text-zinc-300 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2">
            DISPATCH SECURED TICKET
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Your Official Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Elena Rostova"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Your Secure Email</label>
              <input
                type="email"
                required
                placeholder="client@pmart.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Subject Parameters</label>
              <select
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
              >
                <option value="Inquiry">General Inquiry</option>
                <option value="Milling">Custom Composite Milling</option>
                <option value="Contract">Corporate Bid Contracts</option>
                <option value="Warranty">Shield Protection Claims</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Detailed Request Details</label>
              <textarea
                required
                rows={4}
                placeholder="Outline physical parameters, core tolerances, weight specs..."
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-4 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-sans"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              id="submit-contact-trigger"
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-md"
            >
              DISPATCH CORE SIGNAL
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}


/* ==========================================
   3. PRIVACY POLICY VIEW
   ========================================== */
export function PrivacyView() {
  return (
    <div id="privacy-page-view" className="max-w-4xl mx-auto px-4 pb-20 space-y-8 animate-in fade-in duration-150">
      
      <div className="border-b border-zinc-900 pb-4 space-y-1">
        <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">LEGAL DOCKETS</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">PRIVACY OVERWATCH BRIEF</h1>
        <p className="text-[10px] font-mono text-zinc-600 uppercase">EFFECTIVE JUL 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
        <section className="space-y-2">
          <h4 className="text-white font-bold font-sans uppercase tracking-wide">1. Coordinate Collection</h4>
          <p>
            PMART logs minimal customer parameters necessary to facilitate secure product dispatches and localized session configurations. We record names, emails, shipping coordinates, and billing flags inside secure, local browser registers.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="text-white font-bold font-sans uppercase tracking-wide">2. SSL and Encryption Guard</h4>
          <p>
            Any administrative or authentication credentials initialized inside our terminal are fully sandboxed. PMART does not sell, lease, or disseminate client rosters to unaccredited advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="text-white font-bold font-sans uppercase tracking-wide">3. Decentralized Ledger Tracking</h4>
          <p>
            Cryptographic receipts and purchase timestamps may be catalogued on decentralized private records to verify authenticity.
          </p>
        </section>
      </div>

    </div>
  );
}


/* ==========================================
   4. TERMS OF SERVICE VIEW
   ========================================== */
export function TermsView() {
  return (
    <div id="terms-page-view" className="max-w-4xl mx-auto px-4 pb-20 space-y-8 animate-in fade-in duration-150">
      
      <div className="border-b border-zinc-900 pb-4 space-y-1">
        <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">LEGAL DOCKETS</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">TERMS OF ACCREDITED SALES</h1>
        <p className="text-[10px] font-mono text-zinc-600 uppercase">EFFECTIVE JUL 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
        <section className="space-y-2">
          <h4 className="text-white font-bold font-sans uppercase tracking-wide">1. Limited Wave Releases</h4>
          <p>
            PMART manufactures items in highly strict limited runs. Once a batch is catalogued as depleted/sold-out, PMART is under no legal pressure to reproduce identical models.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="text-white font-bold font-sans uppercase tracking-wide">2. Air Express Dispatch Delivery</h4>
          <p>
            All delivery schedules are simulated. Estimated dispatch timelines (e.g., 2 days) represent ideal shipping cycles. Actual delivery times may fluctuate depending on custom mechanical checks or environmental delays.
          </p>
        </section>

        <section className="space-y-2">
          <h4 className="text-white font-bold font-sans uppercase tracking-wide">3. Carbon Shield Coverage Limits</h4>
          <p>
            Our 3-Year limited cover applies to standard physical faults. Physical composite cracks, carbon splinters, or mechanical keyboard keys failing due to high liquid spills or heavy impact damage fall outside of warranty.
          </p>
        </section>
      </div>

    </div>
  );
}
