'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  CreditCard, 
  Wallet, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Lock, 
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';

export default function CheckoutView() {
  const { 
    cart, 
    getCartTotal, 
    activeCoupon, 
    currentUser, 
    placeOrder, 
    setView,
    addToast 
  } = useStore();

  // Redirect back if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      setView('cart');
    }
  }, [cart, setView]);

  // Form states
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState('1492 Carbon Highway, Block C');
  const [city, setCity] = useState('Neo City');
  const [postalCode, setPostalCode] = useState('94102');
  const [phone, setPhone] = useState('+1 (555) 902-1920');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('382');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? subtotal * (activeCoupon.discountPercent / 100) : 0;
  const grandTotal = subtotal - discount;

  const handleDispatchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim() || !email.trim() || !address.trim() || !city.trim() || !postalCode.trim() || !phone.trim()) {
      addToast('Please complete all shipping coordinates before dispatch.', 'error');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        addToast('Please input valid Credit Card coordinates.', 'error');
        return;
      }
    }

    const shippingDetails = {
      fullName,
      email,
      address,
      city,
      postalCode,
      phone,
    };

    const methodLabel = paymentMethod === 'card' ? 'Visa Black Card' : paymentMethod === 'crypto' ? 'BTC Secure Layer' : 'Apple Pay Mobile';

    const createdOrder = placeOrder(shippingDetails, methodLabel);
    if (createdOrder) {
      addToast(`Order ${createdOrder.id} dispatched!`, 'success');
    }
  };

  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      
      {/* Back button and title */}
      <div className="border-b border-zinc-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase">
            <span>SECURE CHECKOUT</span>
            <span>/</span>
            <span className="text-brand-red">DISPATCH COORDINATES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            SECURE DISPATCH
          </h1>
        </div>
        <button
          id="checkout-back-to-vault"
          onClick={() => setView('cart')}
          className="px-4 py-2 rounded-xl border border-zinc-900 hover:border-zinc-800 text-xs text-zinc-400 hover:text-white font-mono flex items-center justify-center gap-2 self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Vault
        </button>
      </div>

      <form onSubmit={handleDispatchOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (8 columns) - Shipping & Payments */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Shipping Address details */}
          <div className="p-6 rounded-3xl border border-zinc-900 bg-zinc-950/40 space-y-6">
            <h3 className="text-sm font-mono text-white uppercase font-bold tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-gradient-red text-white flex items-center justify-center text-[10px]">1</span>
              <span>Shipping Coordinates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Consignee Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Secure Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. user@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Delivery Physical Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street and house coordinates"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">City/Province</label>
                <input
                  type="text"
                  required
                  placeholder="Neo City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="94102"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 000-000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Secure Payment Gateways */}
          <div className="p-6 rounded-3xl border border-zinc-900 bg-zinc-950/40 space-y-6">
            <h3 className="text-sm font-mono text-white uppercase font-bold tracking-wider border-b border-zinc-900 pb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-gradient-red text-white flex items-center justify-center text-[10px]">2</span>
              <span>Secure Payment Gateway</span>
            </h3>

            {/* Payment Method Selector Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'card', name: 'Credit Card', icon: CreditCard },
                { id: 'crypto', name: 'Crypto Secure', icon: Coins },
                { id: 'apple_pay', name: 'Apple Pay', icon: Wallet }
              ].map((m) => {
                const IconComp = m.icon;
                return (
                  <button
                    key={m.id}
                    id={`pay-method-btn-${m.id}`}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
                      paymentMethod === m.id
                        ? 'border-brand-red bg-zinc-900 text-white shadow-lg shadow-brand-red/5'
                        : 'border-zinc-900 bg-zinc-950/80 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <IconComp className={`w-5 h-5 ${paymentMethod === m.id ? 'text-brand-red' : ''}`} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Subviews depending on selected payment method */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-4 border-t border-zinc-900/60 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Black Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono text-center"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Secure CVV</label>
                      <input
                        type="password"
                        required
                        placeholder="***"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/80 space-y-3 pt-4 animate-in fade-in duration-150 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">BTC DEPOSIT BLOCKCHAIN HOOK</span>
                  <span className="text-brand-red text-[10px] font-mono font-extrabold tracking-widest">SECURE LINKED</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-850 font-mono text-[10px] text-zinc-300 select-all truncate break-all flex items-center justify-between">
                  <span>1PmartBillionDollarBrandCrytoDepositAddress777X9</span>
                  <button 
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("1PmartBillionDollarBrandCrytoDepositAddress777X9");
                      addToast('Simulated Deposit address copied to clipboard.', 'success');
                    }}
                    className="text-[9px] text-brand-red hover:underline ml-2 uppercase shrink-0"
                  >
                    Copy Address
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 font-sans leading-normal">
                  PMART securely listens for incoming blockchain ledger transactions. Click copy to obtain our system&apos;s multi-sig address. Your purchase will clear upon 1 block confirmation.
                </p>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <div className="p-6 rounded-xl border border-dashed border-zinc-900 bg-zinc-950 text-center space-y-3 pt-4 animate-in fade-in duration-150">
                <div className="w-40 h-10 bg-white hover:bg-zinc-100 text-black font-semibold rounded-lg mx-auto flex items-center justify-center gap-1 cursor-pointer">
                  <span className="font-sans font-extrabold"></span> Pay
                </div>
                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  QUICK ACCELERATED DISPATCH WITH APPLE KEYRING
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Right Column (4 columns) - Order Breakdown Summaries */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          <div className="p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 space-y-6">
            <h3 className="font-sans font-extrabold text-base text-white border-b border-zinc-900 pb-3 uppercase tracking-wider">
              YOUR DISPATCH
            </h3>

            {/* Mini Items recap list */}
            <div className="space-y-3 max-h-40 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center justify-between text-xs">
                  <div className="flex gap-2.5 items-center min-w-0">
                    <img src={item.product.image} alt="Unit" className="w-8 h-8 rounded-lg object-cover border border-zinc-900" />
                    <div className="min-w-0">
                      <span className="text-zinc-200 font-semibold block truncate max-w-[140px]">{item.product.name}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono text-zinc-300 shrink-0 font-medium">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price lines details */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-900 font-mono text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              
              {activeCoupon && (
                <div className="flex justify-between text-brand-red">
                  <span>VIP Coupon Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500">
                <span>Insured Delivery</span>
                <span className="text-emerald-400">FREE</span>
              </div>

              <div className="border-t border-zinc-900 pt-3.5 mt-2.5 flex justify-between items-baseline font-sans">
                <span className="text-sm font-bold text-zinc-300">ESTIMATED INVESTMENT</span>
                <span className="text-xl font-mono font-bold text-white text-glow-crimson">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order Trigger */}
            <button
              id="checkout-place-order-submit"
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-red text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-brand-red/15 hover:shadow-brand-red/35 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-4 h-4 shrink-0 text-white/80" /> DISPATCH ORDER NOW
            </button>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900 text-[10px] leading-normal text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
              <span>
                256-bit SSL ledger connections verified. Dispatch coordinates are fully sandboxed.
              </span>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
