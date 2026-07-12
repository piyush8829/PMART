'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '../ProductCard';
import { 
  SlidersHorizontal, 
  Search, 
  Star, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Grid3X3,
  ListFilter
} from 'lucide-react';

export default function ShopView() {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useStore();

  // Shop specific filters
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [priceMax, setPriceMax] = useState(1000);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedRating, setSelectedRating] = useState(0); // minimum rating
  const [sortBy, setSortBy] = useState('curated');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync global search to local search input
  useEffect(() => {
    const t = setTimeout(() => {
      setLocalSearch(searchQuery);
    }, 0);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Categories list
  const categories = ["All", "Peripherals", "Audio", "Timepieces", "Gear"];
  
  // Brands list
  const brands = ["All", "PMART Custom", "Apex Forge", "Vulcan Precision", "Helix Dynamics"];

  // Reset all filters
  const handleResetFilters = () => {
    setLocalSearch('');
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceMax(1000);
    setSelectedBrand('All');
    setSelectedRating(0);
    setSortBy('curated');
    setCurrentPage(1);
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category check
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Search check
        if (localSearch.trim()) {
          const s = localSearch.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(s);
          const matchesTag = product.tagline.toLowerCase().includes(s);
          const matchesCat = product.category.toLowerCase().includes(s);
          if (!matchesName && !matchesTag && !matchesCat) return false;
        }

        // Price check
        if (product.price > priceMax) {
          return false;
        }

        // Brand check (simulated based on SKU prefixes or keywords)
        if (selectedBrand !== 'All') {
          const brandMap: { [key: string]: string } = {
            "PMART Custom": "PM-SPEC",
            "Apex Forge": "PM-APEX",
            "Vulcan Precision": "PM-VULC",
            "Helix Dynamics": "PM-FORG"
          };
          const targetPrefix = brandMap[selectedBrand];
          if (targetPrefix && !product.sku.startsWith(targetPrefix)) {
            return false;
          }
        }

        // Rating check
        if (product.rating < selectedRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'low-to-high') return a.price - b.price;
        if (sortBy === 'high-to-low') return b.price - a.price;
        if (sortBy === 'best-reviews') return b.rating - a.rating;
        // Default curated: flash sale items first, then ID order
        const aVal = (a.isFlashSale ? 2 : 0) + (a.isBestSeller ? 1 : 0);
        const bVal = (b.isFlashSale ? 2 : 0) + (b.isBestSeller ? 1 : 0);
        return bVal - aVal;
      });
  }, [products, selectedCategory, localSearch, priceMax, selectedBrand, selectedRating, sortBy]);

  // Page Calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div id="shop-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      
      {/* Header breadcrumb & title */}
      <div className="border-b border-zinc-900 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase">
          <span>CURATION HOUSE</span>
          <span>/</span>
          <span>MASTER DISPATCH</span>
          <span>/</span>
          <span className="text-brand-red">{selectedCategory}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          THE PMART VAULT
        </h1>
        <p className="text-xs text-zinc-500 max-w-xl">
          Each instrument in our vault is machined to absolute tolerance. Filter our elite catalogue of accessories below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDE PANEL FILTERS BLOCK (Left 3 columns) */}
        <aside id="shop-filters" className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm uppercase font-mono">
              <SlidersHorizontal className="w-4 h-4 text-brand-red" />
              <span>Filters Dock</span>
            </div>
            <button
              id="reset-all-filters"
              onClick={handleResetFilters}
              className="text-[10px] font-mono text-zinc-500 hover:text-brand-red uppercase transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Search Keywords</label>
            <div className="relative">
              <input
                id="shop-local-search"
                type="text"
                placeholder="Search specs, names..."
                value={localSearch}
                onChange={handleSearchChange}
                className="w-full bg-zinc-950 border border-zinc-900 rounded-lg py-2 pl-3 pr-9 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              />
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Specialty</label>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-cat-${cat}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                    selectedCategory === cat 
                      ? 'bg-brand-red/5 border border-brand-red/25 text-white font-bold' 
                      : 'bg-zinc-950/20 border border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950/60'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-brand-red rounded-full shadow-lg shadow-brand-red" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">Max Value Limit</label>
              <span className="text-xs font-mono font-bold text-white">${priceMax}</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min="20"
              max="1000"
              step="10"
              value={priceMax}
              onChange={(e) => {
                setPriceMax(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-brand-red h-1 bg-zinc-900 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-zinc-700">
              <span>$20</span>
              <span>$500</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Machining Line</label>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  id={`filter-brand-${brand}`}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedBrand === brand
                      ? 'bg-zinc-900 border-brand-red text-white'
                      : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Connoisseur Verdict</label>
            <div className="flex flex-col gap-1.5">
              {[0, 4.5, 4.8, 5.0].map((rate) => (
                <button
                  key={rate}
                  id={`filter-rating-${rate}`}
                  onClick={() => {
                    setSelectedRating(rate);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                    selectedRating === rate
                      ? 'bg-zinc-900 border border-zinc-800 text-white font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-brand-red">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3 h-3 ${star <= Math.round(rate || 5) ? 'fill-current text-brand-red' : 'text-zinc-800'}`} 
                        />
                      ))}
                    </div>
                    <span>{rate === 0 ? 'All Ratings' : `${rate.toFixed(1)} & Elite`}</span>
                  </div>
                  {selectedRating === rate && <Check className="w-3.5 h-3.5 text-brand-red" />}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* PRODUCTS DIRECTORY GRID (Right 9 columns) */}
        <main id="shop-grid-container" className="lg:col-span-9 space-y-8">
          
          {/* Sorting panel bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950/40 border border-zinc-900 rounded-2xl p-4">
            <div className="text-xs text-zinc-500 font-mono">
              SHOWING <span className="text-white font-bold font-sans">{(currentPage-1)*itemsPerPage + 1} - {Math.min(currentPage*itemsPerPage, filteredProducts.length)}</span> OF <span className="text-white font-bold font-sans">{filteredProducts.length}</span> MASTERPIECES
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider whitespace-nowrap">Sort By</label>
              <select
                id="shop-sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-xs text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              >
                <option value="curated">Premium Curation</option>
                <option value="low-to-high">Value: Low to High</option>
                <option value="high-to-low">Value: High to Low</option>
                <option value="best-reviews">Connoisseur Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips bar (shown only if filters exist) */}
          {(localSearch || selectedCategory !== 'All' || priceMax < 1000 || selectedBrand !== 'All' || selectedRating > 0) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[9px] font-mono text-zinc-600 uppercase font-bold">Active filters:</span>
              
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-[10px] text-zinc-300 font-mono">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')} className="text-brand-red hover:text-white ml-0.5 font-bold">×</button>
                </span>
              )}
              {localSearch && (
                <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-[10px] text-zinc-300 font-mono">
                  Search: &ldquo;{localSearch}&rdquo;
                  <button onClick={() => {setLocalSearch(''); setSearchQuery('');}} className="text-brand-red hover:text-white ml-0.5 font-bold">×</button>
                </span>
              )}
              {priceMax < 1000 && (
                <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-[10px] text-zinc-300 font-mono">
                  Max: ${priceMax}
                  <button onClick={() => setPriceMax(1000)} className="text-brand-red hover:text-white ml-0.5 font-bold">×</button>
                </span>
              )}
              {selectedBrand !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-[10px] text-zinc-300 font-mono">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('All')} className="text-brand-red hover:text-white ml-0.5 font-bold">×</button>
                </span>
              )}
              {selectedRating > 0 && (
                <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md text-[10px] text-zinc-300 font-mono">
                  Rating: {selectedRating.toFixed(1)}+
                  <button onClick={() => setSelectedRating(0)} className="text-brand-red hover:text-white ml-0.5 font-bold">×</button>
                </span>
              )}

              <button
                id="clear-all-chips"
                onClick={handleResetFilters}
                className="text-[10px] font-mono text-brand-red hover:underline font-bold uppercase"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Cards Grid layout */}
          {filteredProducts.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-zinc-950/20 border border-zinc-900 rounded-3xl">
              <div className="w-16 h-16 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mb-4 text-zinc-600">
                <Grid3X3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-300 mb-1">Curation scope empty</h3>
              <p className="text-xs text-zinc-500 max-w-[320px] mb-6">
                No luxury instruments matched your precise docking filter settings. Try relaxing your constraints.
              </p>
              <button
                id="no-results-reset-filters"
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-brand-red text-zinc-300 font-bold text-xs tracking-wider uppercase transition-colors"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-zinc-900/60 font-mono">
              <button
                id="shop-prev-page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
                className="w-10 h-10 rounded-xl border border-zinc-900 hover:border-brand-red flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:border-zinc-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    id={`shop-page-btn-${pageNum}`}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-bold text-xs transition-colors ${
                      currentPage === pageNum
                        ? 'bg-gradient-red text-white glow-crimson/10'
                        : 'border border-zinc-900 text-zinc-500 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                id="shop-next-page"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
                className="w-10 h-10 rounded-xl border border-zinc-900 hover:border-brand-red flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:border-zinc-900 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
