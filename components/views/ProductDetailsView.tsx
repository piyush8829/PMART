'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '../ProductCard';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Flame, 
  RotateCcw,
  Plus,
  Minus,
  Check,
  ChevronRight,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';

export default function ProductDetailsView() {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setView,
    addToast
  } = useStore();

  // Find active product
  const product = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // Gallery state
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ transform: 'scale(1)' });
  
  // Cart controls quantity state
  const [quantity, setQuantity] = useState(1);

  // Review submissions local state (saves in session memory)
  const [localReviews, setLocalReviews] = useState([
    { id: "r-1", name: "Marcus Vance", rating: 5, date: "June 28, 2026", comment: "Absolutely mind-blowing quality. The carbon fiber chassis is real, thick, and has a fantastic heavy resonance. PMART's service was lightning-fast. Best luxury tech store online.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120" },
    { id: "r-2", name: "Elena Rostova", rating: 5, date: "July 04, 2026", comment: "The sound signature is pristine. The planar magnetic drivers are extremely crisp and the crimson stitching matches my workspace layout. Will buy again!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" }
  ]);

  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  // Zoom Effect Calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(2.0)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  // Quantity helpers
  const handleIncrease = () => {
    if (quantity < product.inStock) {
      setQuantity(q => q + 1);
    } else {
      addToast(`Only ${product.inStock} units in stock.`, 'error');
    }
  };

  const handleDecrease = () => {
    setQuantity(q => Math.max(1, q - 1));
  };

  // Buy Now immediate cart bypass to checkout
  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    setView('checkout');
  };

  // Submit local review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) {
      addToast('Please fill out your name and write a review comment.', 'error');
      return;
    }

    const newRev = {
      id: `r-${Date.now()}`,
      name: revName,
      rating: revRating,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      comment: revComment,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random()*900000)}?auto=format&fit=crop&q=80&w=120`
    };

    setLocalReviews([newRev, ...localReviews]);
    addToast('Your elite verdict has been catalogued in our feedback grid.', 'success');
    setRevName('');
    setRevComment('');
    setRevRating(5);
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  return (
    <div id="product-details-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      
      {/* Breadcrumb row */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase">
        <button onClick={() => setView('home')} className="hover:text-white transition-colors">HOME</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => { setView('shop'); }} className="hover:text-white transition-colors">SHOP ALL</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-red">{product.category}</span>
      </div>

      {/* Primary Layout Block: Gallery left, Specs/Buy right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Gallery Section Left (5 columns) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main frame zoomed */}
          <div 
            id="gallery-zoom-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="aspect-square bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden relative cursor-zoom-in"
          >
            <img
              src={product.gallery[activeImgIdx] || product.image}
              alt={product.name}
              style={zoomStyle}
              className="w-full h-full object-cover transition-transform duration-100 ease-out"
            />
            
            {/* Visual Red overlay for scale */}
            <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur border border-zinc-800 text-[9px] font-mono font-medium text-zinc-400 px-2.5 py-1 rounded-md uppercase">
              Hover to Zoom Magnify
            </div>
          </div>

          {/* Thumbnail track selector */}
          {product.gallery.length > 0 && (
            <div className="flex gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  id={`gallery-thumb-btn-${idx}`}
                  onClick={() => {
                    setActiveImgIdx(idx);
                    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
                  }}
                  className={`w-20 h-20 rounded-xl overflow-hidden border transition-all ${
                    activeImgIdx === idx 
                      ? 'border-brand-red glow-crimson/20' 
                      : 'border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Curation details right (7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header specifications */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-brand-red text-glow-crimson uppercase font-bold">
                {product.category}
              </span>
              <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-sm font-medium text-brand-red font-mono">{product.tagline}</p>
          </div>

          {/* Verdict and stars */}
          <div className="flex items-center gap-2 border-y border-zinc-900 py-3 font-mono">
            <div className="flex text-brand-red">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-current text-brand-red" />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-300">
              {product.rating.toFixed(1)} Verdict
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-xs text-zinc-500 hover:underline cursor-pointer">
              {localReviews.length} Verified Reviews
            </span>
          </div>

          {/* Pricing Row */}
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 font-mono block">VIP INVESTMENT VALUE</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg font-mono text-zinc-600 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-400 font-mono font-semibold">
              FREE Insured Air Express Shipping Included
            </p>
          </div>

          {/* High level specifications paragraph */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2">
              CURATOR REVIEW DISPATCH
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Active purchase controls */}
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            {product.inStock > 0 ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Quantity input counter */}
                <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-950 px-2 py-2">
                  <button
                    id="details-decrease-qty"
                    onClick={handleDecrease}
                    className="w-8 h-8 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center text-sm"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-12 text-center text-sm font-mono font-bold text-zinc-200">
                    {quantity}
                  </span>
                  <button
                    id="details-increase-qty"
                    onClick={handleIncrease}
                    className="w-8 h-8 rounded-lg bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center text-sm"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Primary Buy triggers */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <button
                    id="details-add-to-cart"
                    onClick={() => addToCart(product.id, quantity)}
                    className="py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-brand-red" />
                    ADD TO VAULT
                  </button>
                  <button
                    id="details-buy-now"
                    onClick={handleBuyNow}
                    className="py-3.5 rounded-xl bg-gradient-red text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-brand-red/10 hover:shadow-brand-red/20 hover:opacity-95 cursor-pointer"
                  >
                    BUY NOW
                  </button>
                </div>

              </div>
            ) : (
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-400 text-xs flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-brand-red rounded-full animate-ping" />
                <span>We have sold out of this limited luxury run. Check back soon or request a custom quote.</span>
              </div>
            )}

            {/* Micro value badges list */}
            <div className="grid grid-cols-3 gap-3 pt-4 font-mono text-[9px] text-zinc-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-red" />
                <span>Insured Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 border-x border-zinc-900 px-3">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
                <span>3-Yr Shield Cover</span>
              </div>
              <div className="flex items-center gap-1.5 pl-3">
                <RotateCcw className="w-3.5 h-3.5 text-brand-red" />
                <span>Compliant Returns</span>
              </div>
            </div>
          </div>

          {/* Full specifications sheet panel */}
          <div className="space-y-3 pt-6 border-t border-zinc-900">
            <h4 className="text-xs font-mono text-zinc-500 uppercase font-bold tracking-widest">
              MACHINING SPECIFICATIONS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-950/40 border border-zinc-900/60 rounded-2xl p-5 font-mono">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between sm:flex-col sm:gap-0.5 border-b border-zinc-900/40 sm:border-0 pb-1.5 sm:pb-0 text-xs">
                  <span className="text-zinc-600 text-[10px] uppercase font-bold">{key}</span>
                  <span className="text-zinc-300 font-medium truncate max-w-[200px]">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* SECKION: REVIEWS LIST AND SUBMISSION FORM */}
      <section id="details-reviews-block" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-zinc-900 items-start">
        
        {/* Left distribution reviews statistics (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <h3 className="font-sans font-extrabold text-xl text-white">Client Verdicts</h3>
            <p className="text-xs text-zinc-500">Acoustic, physical, and tactical analysis from our verified community.</p>
          </div>

          {/* Average circle display */}
          <div className="flex items-center gap-6 p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900/60">
            <div className="w-20 h-20 rounded-full border-4 border-brand-red/30 border-t-brand-red flex flex-col items-center justify-center shrink-0">
              <span className="text-2xl font-mono font-black text-white">{product.rating.toFixed(1)}</span>
              <span className="text-[8px] text-zinc-500 font-mono">OUT OF 5.0</span>
            </div>
            <div>
              <div className="flex text-brand-red gap-0.5">
                {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <h4 className="text-xs font-bold text-white mt-1 uppercase">Supreme Consensus</h4>
              <p className="text-[10px] text-zinc-500 leading-normal">Derived from {localReviews.length} authenticated micro-reports.</p>
            </div>
          </div>

          {/* Star breakdowns progress bars */}
          <div className="space-y-2 font-mono text-[10px]">
            {[
              { label: "5 Stars", pct: "92%", color: "bg-brand-red" },
              { label: "4 Stars", pct: "8%", color: "bg-brand-red/60" },
              { label: "3 Stars", pct: "0%", color: "bg-zinc-900" },
              { label: "2 Stars", pct: "0%", color: "bg-zinc-900" },
              { label: "1 Star", pct: "0%", color: "bg-zinc-900" }
            ].map((b, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-10 text-zinc-500 uppercase">{b.label}</span>
                <div className="flex-1 h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900/60">
                  <div className={`h-full ${b.color}`} style={{ width: b.pct }} />
                </div>
                <span className="w-8 text-right text-zinc-400 font-bold">{b.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right list of reviews and feedback submit box (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Submit form tab accordion */}
          <div className="bg-zinc-950/40 border border-zinc-900/60 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-mono text-zinc-300 uppercase font-bold tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-brand-red" />
              <span>SUBMIT AN ACCREDITED VERDICT</span>
            </h4>

            <form onSubmit={handleReviewSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Your Official Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Miller"
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Accredited Rating</label>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                >
                  <option value={5}>★★★★★ - Pure Perfection</option>
                  <option value={4}>★★★★☆ - Extremely Rigid</option>
                  <option value={3}>★★★☆☆ - Adequate Standard</option>
                  <option value={2}>★★☆☆☆ - Tolerable Flaws</option>
                  <option value={1}>★☆☆☆☆ - Structural Defect</option>
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Your Detailed Analysis</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Review the structural rigidity, tactical colors, audio spectrum, packaging etc..."
                  value={revComment}
                  onChange={(e) => setRevComment(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-red font-sans"
                />
              </div>

              <div className="sm:col-span-2 text-right">
                <button
                  id="submit-product-review"
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold tracking-wider hover:opacity-95 transition-all cursor-pointer shadow-md shadow-brand-red/5"
                >
                  DISPATCH VERDICT
                </button>
              </div>
            </form>
          </div>

          {/* Testimonial reviews Feed stack */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono text-zinc-500 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2">
              DOCKET VERDICT RELEASES ({localReviews.length})
            </h4>

            <div className="space-y-4">
              {localReviews.map((rev) => (
                <div 
                  key={rev.id}
                  id={`review-item-${rev.id}`}
                  className="p-5 rounded-2xl bg-zinc-950/20 border border-zinc-900/60 flex flex-col sm:flex-row gap-4 items-start"
                >
                  <img src={rev.avatar} alt={rev.name} className="w-10 h-10 rounded-full border border-zinc-800 object-cover shrink-0" />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-white">{rev.name}</h5>
                        <div className="flex text-brand-red gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-current text-brand-red' : 'text-zinc-800'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">{rev.date}</span>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-zinc-600">
                      <button className="flex items-center gap-1 hover:text-brand-red transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful (14)</span>
                      </button>
                      <span>•</span>
                      <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> VERIFIED VIP ACQUISITION
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* RELATED MASTERPIECES */}
      {relatedProducts.length > 0 && (
        <section id="details-related-section" className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-widest">AESTHETIC MATCHES</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Related Masterpieces</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
