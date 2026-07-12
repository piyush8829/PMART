'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Undo2 
} from 'lucide-react';

export default function CartView() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    getCartTotal, 
    getCartItemCount,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    setView
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? subtotal * (activeCoupon.discountPercent / 100) : 0;
  const grandTotal = subtotal - discount;

  return (
    <div id="cart-page-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      
      {/* Title Header */}
      <div className="border-b border-zinc-900 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase">
          <span>SECURED VAULT</span>
          <span>/</span>
          <span className="text-brand-red">YOUR REQUISITIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          SHOPPING VAULT
        </h1>
        <p className="text-xs text-zinc-500">
          Review your curated items, apply clearance promo codes, and transition to secure digital dispatch.
        </p>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mb-5 text-zinc-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-zinc-300 mb-2">Your vault is vacant</h2>
          <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
            You haven&apos;t locked in any curated carbon or tactical accessories yet. Head back to the master gallery to add units.
          </p>
          <button
            id="empty-cart-shop-now"
            onClick={() => setView('shop')}
            className="w-full py-3.5 rounded-xl bg-gradient-red text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-brand-red/10 hover:shadow-brand-red/25 hover:-translate-y-0.5"
          >
            EXPLORE SPECIFICATIONS
          </button>
        </div>
      ) : (
        /* Stateful Cart Grid Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Table Panel (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header row descriptor */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-zinc-900 font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
              <span className="col-span-6">Curated Instrument</span>
              <span className="col-span-2 text-center">Unit Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total Price</span>
            </div>

            {/* Cart Items list */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  id={`cart-page-item-${item.product.id}`}
                  className="sm:grid grid-cols-12 gap-4 p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900/60 items-center hover:border-zinc-800 transition-colors flex flex-col text-center sm:text-left relative"
                >
                  {/* Image & Title descriptor (6 cols) */}
                  <div className="col-span-6 flex flex-col sm:flex-row items-center gap-4 w-full">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 relative">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-center sm:text-left min-w-0 flex-1">
                      <span className="text-[10px] font-mono text-brand-red text-glow-crimson uppercase font-bold">{item.product.category}</span>
                      <h4 
                        onClick={() => setView('product-details', item.product.id)}
                        className="text-sm font-bold text-white hover:text-brand-red transition-colors cursor-pointer truncate"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase">SKU: {item.product.sku}</p>
                    </div>
                  </div>

                  {/* Unit price (2 cols) */}
                  <div className="col-span-2 text-center mt-2 sm:mt-0">
                    <span className="text-zinc-400 font-mono text-xs sm:text-sm">
                      ${item.product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity selector (2 cols) */}
                  <div className="col-span-2 flex justify-center mt-2 sm:mt-0">
                    <div className="flex items-center border border-zinc-900 rounded-lg bg-zinc-950 px-1 py-1">
                      <button
                        id={`cart-page-dec-${item.product.id}`}
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-zinc-900/60 text-zinc-500 hover:text-white flex items-center justify-center text-xs"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        id={`cart-page-inc-${item.product.id}`}
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-zinc-900/60 text-zinc-500 hover:text-white flex items-center justify-center text-xs"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Total price (2 cols) */}
                  <div className="col-span-2 text-right mt-2 sm:mt-0 w-full sm:w-auto flex justify-between sm:block items-baseline border-t border-zinc-900 sm:border-0 pt-3 sm:pt-0">
                    <span className="sm:hidden text-[10px] font-mono text-zinc-500 uppercase">TOTAL VALUE:</span>
                    <span className="text-white font-mono font-bold text-sm sm:text-base">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Mobile Trash Ejector absolute button */}
                  <button
                    id={`cart-page-remove-${item.product.id}`}
                    onClick={() => removeFromCart(item.product.id)}
                    className="absolute top-4 right-4 sm:static text-zinc-600 hover:text-brand-red transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              ))}
            </div>

            {/* Clear Cart and Continue shopping block buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900/60">
              <button
                id="cart-continue-shopping"
                onClick={() => setView('shop')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-950 text-xs text-zinc-400 hover:text-white font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Undo2 className="w-3.5 h-3.5" /> CONTINUE TO VAULT
              </button>
              <button
                id="cart-clear-vault"
                onClick={clearCart}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-transparent hover:border-brand-red/30 bg-zinc-950 hover:bg-brand-red/5 text-xs text-zinc-500 hover:text-brand-red font-bold transition-all"
              >
                CLEAR ALL UNITS
              </button>
            </div>

          </div>

          {/* Right Summary Panel Card (4 columns) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            <div className="p-6 rounded-3xl border border-zinc-900 bg-zinc-950/80 space-y-6">
              <h3 className="font-sans font-extrabold text-base text-white border-b border-zinc-900 pb-3 uppercase tracking-wider">
                Order Summary
              </h3>

              {/* Coupon inputs */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Apply VIP Promotion</label>
                {activeCoupon ? (
                  <div className="flex items-center justify-between bg-brand-red/5 border border-brand-red/15 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-red" />
                      <div>
                        <span className="text-xs text-zinc-300 font-mono font-bold block">{activeCoupon.code}</span>
                        <span className="text-[9px] text-zinc-500 font-mono block">-{activeCoupon.discountPercent}% off applied</span>
                      </div>
                    </div>
                    <button
                      id="remove-cart-coupon"
                      onClick={removeCoupon}
                      className="text-[10px] text-brand-red hover:underline uppercase font-mono font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      id="cart-coupon-input"
                      type="text"
                      placeholder="e.g. PMART20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-mono"
                    />
                    <button
                      id="cart-coupon-submit"
                      type="submit"
                      className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono font-bold px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-750 transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}
              </div>

              {/* Mathematical breakdowns */}
              <div className="space-y-3 pt-3 border-t border-zinc-900 font-mono text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Vault Subtotal</span>
                  <span className="font-bold text-zinc-300">${subtotal.toLocaleString()}</span>
                </div>

                {activeCoupon && (
                  <div className="flex justify-between text-brand-red">
                    <span>VIP Promotion ({activeCoupon.discountPercent}%)</span>
                    <span className="font-bold">-${discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-500">
                  <span>Carbon Insurance</span>
                  <span className="font-bold text-emerald-400">FREE</span>
                </div>

                <div className="flex justify-between text-zinc-500">
                  <span>Estimated Tax</span>
                  <span className="font-bold text-zinc-300">$0.00</span>
                </div>

                <div className="border-t border-dashed border-zinc-900 pt-4 mt-4 flex justify-between items-baseline font-sans">
                  <span className="text-sm font-bold text-zinc-300 uppercase">Grand Total</span>
                  <span className="text-2xl font-mono font-black text-white text-glow-crimson">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Secure Checkout Button */}
              <button
                id="cart-proceed-checkout"
                onClick={() => setView('checkout')}
                className="w-full py-4 rounded-xl bg-gradient-red text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950 flex gap-3 text-[10px] leading-normal text-zinc-500">
                <ShieldCheck className="w-5 h-5 text-brand-red shrink-0" />
                <span>
                  All dispatches are fully insured under our 3-year Carbon Shield protection program. Complete security guaranteed.
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
