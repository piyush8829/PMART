'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    getCartTotal, 
    getCartItemCount,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    setView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const success = applyCoupon(couponInput);
      if (success) setCouponInput('');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = activeCoupon ? subtotal * (activeCoupon.discountPercent / 100) : 0;
  const finalTotal = subtotal - discountAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000] z-50 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Body */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0D0D0D] border-l border-zinc-800 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div id="cart-drawer-header" className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-red text-glow-crimson" />
                <h3 className="font-sans font-bold text-lg tracking-tight">LUXURY VAULT</h3>
                <span className="bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs px-2 py-0.5 rounded-full font-mono font-medium">
                  {getCartItemCount()} items
                </span>
              </div>
              <button
                id="cart-drawer-close"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-zinc-800 hover:border-brand-red hover:text-brand-red flex items-center justify-center transition-colors text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content List */}
            <div id="cart-drawer-items" className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="text-zinc-300 font-medium mb-1">Your vault is empty</h4>
                  <p className="text-zinc-500 text-xs max-w-[240px] mb-6">
                    Curate your space with PMART&apos;s premium carbon fiber tech and design accessories.
                  </p>
                  <button
                    id="cart-drawer-shop-now"
                    onClick={() => {
                      setView('shop');
                      onClose();
                    }}
                    className="px-6 py-2.5 rounded-lg bg-gradient-red hover:opacity-90 font-medium text-xs tracking-wider transition-all shadow-lg shadow-brand-red/10 hover:shadow-brand-red/25 hover:-translate-y-0.5"
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    id={`cart-drawer-item-${item.product.id}`}
                    className="flex gap-4 p-3 rounded-xl bg-zinc-900/40 border border-zinc-950 hover:border-zinc-800 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0 bg-zinc-950 border border-zinc-800">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 
                            onClick={() => {
                              setView('product-details', item.product.id);
                              onClose();
                            }}
                            className="text-xs font-semibold text-zinc-100 hover:text-brand-red transition-colors truncate cursor-pointer"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            id={`remove-cart-item-${item.product.id}`}
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-zinc-600 hover:text-brand-red transition-colors shrink-0 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.product.category}</p>
                      </div>

                      {/* Controls & Price */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-950 px-1 py-0.5">
                          <button
                            id={`decrease-cart-qty-${item.product.id}`}
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center text-xs text-zinc-200 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            id={`increase-cart-qty-${item.product.id}`}
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-mono font-semibold text-zinc-100">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Calculator */}
            {cart.length > 0 && (
              <div id="cart-drawer-footer" className="p-5 border-t border-zinc-800 bg-zinc-950/90 space-y-4">
                {/* Coupon Input */}
                {activeCoupon ? (
                  <div className="flex items-center justify-between bg-brand-red/5 border border-brand-red/20 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-brand-red" />
                      <span className="text-xs text-zinc-300 font-mono font-medium">
                        {activeCoupon.code} (-{activeCoupon.discountPercent}%)
                      </span>
                    </div>
                    <button
                      id="remove-drawer-coupon"
                      onClick={removeCoupon}
                      className="text-[10px] text-brand-red hover:underline font-mono uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponSubmit} className="flex gap-2">
                    <input
                      id="drawer-coupon-input"
                      type="text"
                      placeholder="PROMO CODE (e.g. PMART20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red font-mono"
                    />
                    <button
                      id="apply-drawer-coupon"
                      type="submit"
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors"
                    >
                      APPLY
                    </button>
                  </form>
                )}

                {/* Subtotals & Total */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toLocaleString()}</span>
                  </div>
                  
                  {activeCoupon && (
                    <div className="flex justify-between text-xs text-brand-red">
                      <span>Promo Discount ({activeCoupon.discountPercent}%)</span>
                      <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Insured Shipping</span>
                    <span className="font-mono text-emerald-400">FREE</span>
                  </div>

                  <div className="border-t border-dashed border-zinc-800 pt-2.5 mt-2 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-zinc-200 uppercase">Total Luxury Value</span>
                    <span className="text-xl font-mono font-bold text-white text-glow-crimson">
                      ${finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    id="drawer-view-cart"
                    onClick={() => {
                      setView('cart');
                      onClose();
                    }}
                    className="py-3 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 text-zinc-300 font-semibold text-xs tracking-wider transition-all"
                  >
                    VIEW VAULT
                  </button>
                  <button
                    id="drawer-checkout"
                    onClick={() => {
                      setView('checkout');
                      onClose();
                    }}
                    className="py-3 rounded-lg bg-gradient-red text-white font-bold text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 transition-all hover:opacity-90"
                  >
                    SECURE PAY <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
