'use client';

import React, { useState, useEffect } from 'react';
import { Product, useStore } from '@/context/StoreContext';
import { Eye, Heart, ShoppingCart, Star, Clock, Zap, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setView } = useStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hrs: 12, mins: 34, secs: 56 });
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Timer for flash sales
  useEffect(() => {
    if (!product.isFlashSale) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const end = product.flashSaleEnds ? new Date(product.flashSaleEnds).getTime() : now + 12 * 3600 * 1000;
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
      } else {
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hrs, mins, secs });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [product]);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div 
        id={`product-card-${product.id}`}
        className="group relative rounded-2xl bg-zinc-950/60 border border-zinc-900 overflow-hidden glass-panel-hover"
      >
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {product.isFlashSale && (
            <div className="flex items-center gap-1 bg-gradient-red text-white text-[9px] font-mono font-bold px-2 py-1 rounded-md shadow-lg shadow-brand-red/10 uppercase">
              <Zap className="w-3 h-3 fill-white" />
              <span>FLASH -{discountPercent}%</span>
            </div>
          )}
          {product.isBestSeller && !product.isFlashSale && (
            <div className="bg-zinc-100 text-black text-[9px] font-sans font-bold px-2.5 py-1 rounded-md uppercase">
              BEST SELLER
            </div>
          )}
          {product.inStock <= 3 && product.inStock > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>ONLY {product.inStock} LEFT</span>
            </div>
          )}
          {product.inStock === 0 && (
            <div className="bg-zinc-800 border border-zinc-700 text-zinc-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md uppercase">
              OUT OF VAULT
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            isInWishlist(product.id)
              ? 'bg-brand-red border-brand-red text-white glow-crimson'
              : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
        </button>

        {/* Image & Hover Action Overlay */}
        <div 
          onClick={() => setView('product-details', product.id)}
          className="aspect-square bg-zinc-900 border-b border-zinc-900/60 relative overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Core Action Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              id={`quickview-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 hover:scale-105 transition-all flex items-center justify-center shadow-xl cursor-pointer"
              title="Quick View Masterpiece"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              id={`quick-add-${product.id}`}
              disabled={product.inStock === 0}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product.id, 1);
              }}
              className="w-11 h-11 rounded-xl bg-gradient-red text-white hover:scale-105 transition-all flex items-center justify-center shadow-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Add to Luxury Vault"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Flash Sale Countdown Overlay bottom */}
          {product.isFlashSale && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-6 flex items-center justify-between">
              <span className="text-[9px] text-zinc-400 font-mono font-medium">ENDS IN:</span>
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-brand-red text-glow-crimson">
                <span>{String(timeLeft.hrs).padStart(2, '0')}H</span>
                <span>:</span>
                <span>{String(timeLeft.mins).padStart(2, '0')}M</span>
                <span>:</span>
                <span>{String(timeLeft.secs).padStart(2, '0')}S</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3 h-3 text-brand-red fill-brand-red" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Name & Short description */}
          <div className="space-y-1">
            <h4 
              onClick={() => setView('product-details', product.id)}
              className="text-sm font-bold text-white hover:text-brand-red transition-colors cursor-pointer truncate"
              title={product.name}
            >
              {product.name}
            </h4>
            <p className="text-xs text-zinc-500 line-clamp-1">{product.tagline}</p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-mono font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs font-mono text-zinc-600 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              id={`card-add-to-cart-${product.id}`}
              disabled={product.inStock === 0}
              onClick={() => addToCart(product.id, 1)}
              className="text-xs font-bold text-zinc-300 hover:text-brand-red disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
            >
              {product.inStock === 0 ? 'SOLD OUT' : 'ADD TO VAULT'}
            </button>
          </div>
        </div>
      </div>

      {/* QUICK VIEW POPUP MODAL */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id={`quickview-backdrop-${product.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickViewOpen(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              id={`quickview-panel-${product.id}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:max-w-3xl md:mx-auto bg-[#0D0D0D] border border-zinc-800 rounded-2xl shadow-2xl z-50 p-6 sm:p-8 flex flex-col md:flex-row gap-6 overflow-hidden max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                id={`close-quickview-${product.id}`}
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-zinc-800 hover:border-brand-red hover:text-brand-red flex items-center justify-center text-zinc-400 transition-colors z-10 cursor-pointer"
              >
                <Eye className="w-4 h-4 hidden" /> {/* Dummy Lucide placeholder */}
                <span>×</span>
              </button>

              {/* Gallery Section */}
              <div className="w-full md:w-1/2 space-y-3">
                <div className="aspect-square rounded-xl bg-zinc-950 border border-zinc-900 overflow-hidden">
                  <img
                    src={product.gallery[activeImageIdx] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.gallery.length > 1 && (
                  <div className="flex gap-2">
                    {product.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        id={`quickview-gallery-btn-${product.id}-${idx}`}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border transition-all ${
                          activeImageIdx === idx ? 'border-brand-red glow-crimson/20' : 'border-zinc-800'
                        }`}
                      >
                        <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info Details Section */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-red text-glow-crimson uppercase font-bold">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-white leading-tight mt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">SKU: {product.sku}</p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-brand-red">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? 'fill-current' : 'text-zinc-800'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-400 font-semibold font-mono">
                      {product.rating.toFixed(1)} / {product.reviewsCount} critiques
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-mono font-bold text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm font-mono text-zinc-600 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {product.description}
                  </p>

                  {/* Specs Quicklist */}
                  <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-3 space-y-1.5">
                    {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-[11px]">
                        <span className="text-zinc-500 font-mono">{key}</span>
                        <span className="text-zinc-300 font-medium truncate max-w-[160px]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buy Action Box */}
                <div className="pt-6 border-t border-zinc-900/60 mt-6 flex gap-3">
                  <button
                    id={`quickview-add-to-cart-${product.id}`}
                    disabled={product.inStock === 0}
                    onClick={() => {
                      addToCart(product.id, 1);
                      setIsQuickViewOpen(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-red text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-red/10 hover:opacity-95 transition-all disabled:opacity-40"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add To Vault
                  </button>
                  <button
                    id={`quickview-full-details-${product.id}`}
                    onClick={() => {
                      setView('product-details', product.id);
                      setIsQuickViewOpen(false);
                    }}
                    className="px-4 py-3 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 font-bold text-xs tracking-wider uppercase transition-colors"
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
