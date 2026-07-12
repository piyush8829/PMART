'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, Order } from '@/lib/data';
import { 
  BarChart3, 
  Cpu, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle,
  FolderPlus,
  DollarSign,
  ClipboardList
} from 'lucide-react';

export default function AdminDashboardView() {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    addToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'inventory' | 'coupons'>('analytics');

  // Add Product form states
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(199);
  const [newProdCategory, setNewProdCategory] = useState('Gear');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800');
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdSku, setNewProdSku] = useState('PM-NEW-GEN-01');

  // Coupons states
  const [coupons, setCoupons] = useState([
    { code: "PMART20", discount: 20, description: "VIP standard launch wave" },
    { code: "BLACKCARD", discount: 20, description: "Elite titanium member wave" },
    { code: "CURATOR50", discount: 50, description: "Lead clearance clearance" }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);

  // Financial calculations
  const stats = useMemo(() => {
    const totalSales = orders.reduce((acc, ord) => ord.status !== 'Cancelled' ? acc + ord.total : acc, 0) + 12450; // Seed sales count
    const totalOrdersCount = orders.length + 38;
    const lowStockAlerts = products.filter((p) => p.inStock <= 3).length;
    const categoryRevenue: { [key: string]: number } = {
      Peripherals: 4500,
      Audio: 5200,
      Timepieces: 8900,
      Gear: 6300
    };
    
    // Add real order values to category stats
    orders.forEach((ord) => {
      if (ord.status !== 'Cancelled') {
        ord.items.forEach((item) => {
          const product = products.find((p) => p.id === item.productId);
          const cat = product?.category || 'Gear';
          categoryRevenue[cat] = (categoryRevenue[cat] || 0) + (item.price * item.quantity);
        });
      }
    });

    return {
      totalSales,
      totalOrdersCount,
      lowStockAlerts,
      categoryRevenue
    };
  }, [orders, products]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdDesc.trim() || !newProdSku.trim()) {
      addToast('Please complete name, SKU, and specifications descriptions.', 'error');
      return;
    }

    const payload = {
      name: newProdName,
      tagline: newProdTagline || "PMART raw-milled carbon masterpiece.",
      price: Number(newProdPrice),
      category: newProdCategory,
      image: newProdImage,
      gallery: [newProdImage],
      rating: 4.8,
      reviewsCount: 1,
      description: newProdDesc,
      specs: {
        "Structure": "Dry Carbon & Anodized Accents",
        "Source": "PMART Curation Lab",
        "Warranty": "3-Year Limited Cover",
        "SKU Identifier": newProdSku
      },
      inStock: Number(newProdStock),
      sku: newProdSku
    };

    addProduct(payload);
    
    // Reset form
    setNewProdName('');
    setNewProdTagline('');
    setNewProdPrice(199);
    setNewProdStock(10);
    setNewProdDesc('');
    setNewProdSku(`PM-NEW-${Math.floor(10 + Math.random()*90)}`);
    setIsAddFormOpen(false);
  };

  const handleRestock = (productId: string, qty = 20) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      const updated = { ...prod, inStock: prod.inStock + qty };
      updateProduct(updated);
      addToast(`Restocked ${qty} units of "${prod.name}".`, 'success');
    }
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newCop = {
      code: newCouponCode.trim().toUpperCase(),
      discount: Number(newCouponDiscount),
      description: "Custom administrative discount docket"
    };
    setCoupons([...coupons, newCop]);
    addToast(`Coupon "${newCop.code}" created successfully.`, 'success');
    setNewCouponCode('');
  };

  return (
    <div id="admin-panel-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      
      {/* Title Header */}
      <div className="border-b border-zinc-900 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase">
            <span>CURATOR PANEL</span>
            <span>/</span>
            <span className="text-brand-red">ADMINISTRATIVE OVERWATCH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            CURATION CONSOLE
          </h1>
          <p className="text-xs text-zinc-500">
            Audit PMART&apos;s physical catalog, monitor active orders, deploy clearances, and inspect gross analytics in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 bg-zinc-950 px-3.5 py-1.5 rounded-xl border border-zinc-900 uppercase">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1" />
          <span>Console Operational (UTC Live)</span>
        </div>
      </div>

      {/* Grid Dashboard tab buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: 'analytics', name: 'Analytics', icon: BarChart3 },
          { id: 'products', name: 'Products Management', icon: Package },
          { id: 'orders', name: 'Order Management', icon: ClipboardList },
          { id: 'inventory', name: 'Inventory & Audits', icon: AlertTriangle },
          { id: 'coupons', name: 'Coupon Engine', icon: Tag }
        ].map((tab) => {
          const IconC = tab.icon;
          return (
            <button
              key={tab.id}
              id={`admin-tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 rounded-xl border font-mono text-[10px] uppercase font-bold tracking-wider flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-brand-red bg-zinc-900 text-white shadow-lg shadow-brand-red/5'
                  : 'border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <IconC className={`w-4 h-4 ${activeTab === tab.id ? 'text-brand-red text-glow-crimson' : ''}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Primary layout views */}
      <main id="admin-main-stage" className="bg-zinc-950/20 border border-zinc-900 rounded-3xl p-6 sm:p-8 min-h-[50vh]">
        
        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && (
          <div id="admin-analytics-tab" className="space-y-8 animate-in fade-in duration-150">
            
            {/* Stat row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 space-y-2">
                <div className="flex justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase font-bold">Gross sales volume</span>
                  <DollarSign className="w-4 h-4 text-brand-red" />
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-mono font-black text-white">${stats.totalSales.toLocaleString()}</span>
                  <p className="text-[9px] text-emerald-400 font-mono">+12.4% FROM LAST WAVE</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 space-y-2">
                <div className="flex justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase font-bold">DISPATCHED DOCKETS</span>
                  <ShoppingBag className="w-4 h-4 text-brand-red" />
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-mono font-black text-white">{stats.totalOrdersCount}</span>
                  <p className="text-[9px] text-zinc-500 font-mono">100% AIR INSURANCE CLEARANCE</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 space-y-2">
                <div className="flex justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase font-bold">CURATED CATALOGUE</span>
                  <Package className="w-4 h-4 text-brand-red" />
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-mono font-black text-white">{products.length} Items</span>
                  <p className="text-[9px] text-zinc-500 font-mono">5 DISTINCT MATERIAL LABELS</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-900 space-y-2">
                <div className="flex justify-between text-zinc-500">
                  <span className="text-[10px] font-mono uppercase font-bold">INVENTORY ALERTS</span>
                  <AlertTriangle className={`w-4 h-4 ${stats.lowStockAlerts > 0 ? 'text-amber-500 animate-pulse' : 'text-zinc-600'}`} />
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-mono font-black text-white">{stats.lowStockAlerts} Units</span>
                  <p className="text-[9px] text-amber-500/80 font-mono">BELOW MINIMUM RUN LIMIT</p>
                </div>
              </div>

            </div>

            {/* Custom chart visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 space-y-4">
                <h4 className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-brand-red" />
                  <span>Gross revenue distribution per specialty</span>
                </h4>
                
                <div className="space-y-4 pt-2">
                  {Object.entries(stats.categoryRevenue).map(([cat, val]) => {
                    const maxVal = Math.max(...Object.values(stats.categoryRevenue));
                    const percentage = Math.round((val / maxVal) * 100);
                    return (
                      <div key={cat} className="space-y-1.5 font-mono text-[10px]">
                        <div className="flex justify-between text-zinc-400">
                          <span className="font-bold uppercase">{cat}</span>
                          <span className="text-white">${val.toLocaleString()}</span>
                        </div>
                        <div className="h-2 bg-zinc-950 rounded-full border border-zinc-900 overflow-hidden">
                          <div className="h-full bg-gradient-red shadow-lg shadow-brand-red/20" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/50 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-red" />
                    <span>VIP Member acquisition highlights</span>
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed pt-2">
                    PMART is performing exceptionally inside specialized workstation gear. Plans are currently underway to release structural Carbon Fiber acoustic tiles and limited mechanical watches.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950 text-center text-xs space-y-1">
                  <span className="text-brand-red text-glow-crimson font-mono font-black block text-[10px]">ADMIN NOTE ON DEMO SIMULATION</span>
                  <p className="text-zinc-500 leading-normal text-[10px]">
                    This database runs inside memory context. Modifying items, dispatching mock checkout orders, and adjusting inventory counts reflects immediately in gross reports above.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div id="admin-products-tab" className="space-y-6 animate-in fade-in duration-150">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <h3 className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest">
                Raw materials catalogue ({products.length})
              </h3>
              <button
                id="admin-open-add-product"
                onClick={() => setIsAddFormOpen(!isAddFormOpen)}
                className="px-4 py-2 rounded-xl bg-gradient-red hover:opacity-90 text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5"
              >
                {isAddFormOpen ? 'Close Editor' : 'Add Masterpiece'} <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Slide down Add Product Form */}
            {isAddFormOpen && (
              <form onSubmit={handleCreateProduct} className="p-6 rounded-2xl border border-brand-red/10 bg-zinc-950/60 space-y-4 max-w-2xl">
                <span className="text-brand-red text-[10px] font-mono font-bold block uppercase tracking-wider">Deploy new curated product blueprint</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Product Label Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Mechanical Core"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Product SKU Blueprint</label>
                    <input
                      type="text"
                      required
                      placeholder="PM-APEX-CORE-01"
                      value={newProdSku}
                      onChange={(e) => setNewProdSku(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Short Selling Tagline</label>
                    <input
                      type="text"
                      placeholder="Forged Aerospace composite with red micro-led grids."
                      value={newProdTagline}
                      onChange={(e) => setNewProdTagline(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:col-span-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Value ($)</label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Available Stock</label>
                      <input
                        type="number"
                        required
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Label Specialty</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                      >
                        <option value="Peripherals">Peripherals</option>
                        <option value="Audio">Audio</option>
                        <option value="Timepieces">Timepieces</option>
                        <option value="Gear">Gear</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Image URL</label>
                    <input
                      type="text"
                      required
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Curator Description report</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write comprehensive physical properties..."
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-sans"
                    />
                  </div>
                </div>

                <div className="text-right pt-2">
                  <button
                    id="submit-new-product"
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    DEPLOY TO VAULT CATALOGUE
                  </button>
                </div>
              </form>
            )}

            {/* List Table of products */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300 font-mono">
                <thead className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 bg-zinc-950/60">
                  <tr>
                    <th className="p-4">SKU / Item</th>
                    <th className="p-4">Specialty</th>
                    <th className="p-4 text-center">Value</th>
                    <th className="p-4 text-center">Stock</th>
                    <th className="p-4 text-right">Eject</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-900/25">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt="Unit" className="w-9 h-9 rounded-lg object-cover border border-zinc-900" />
                        <div>
                          <span className="font-bold text-white block font-sans">{p.name}</span>
                          <span className="text-[9px] text-zinc-500">{p.sku}</span>
                        </div>
                      </td>
                      <td className="p-4 font-sans">{p.category}</td>
                      <td className="p-4 text-center font-bold text-white">${p.price.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          p.inStock <= 3 ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-900 text-zinc-400'
                        }`}>
                          {p.inStock} UNITS
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          id={`admin-delete-product-${p.id}`}
                          onClick={() => deleteProduct(p.id)}
                          className="text-zinc-600 hover:text-brand-red transition-colors p-1"
                          title="Delete blueprint"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: ORDER DISPATCH MANAGEMENT */}
        {activeTab === 'orders' && (
          <div id="admin-orders-tab" className="space-y-6 animate-in fade-in duration-150">
            <h3 className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest border-b border-zinc-900 pb-3">
              VIP shipping orders ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-xs">
                No secure shipping orders have been placed inside this simulation run yet. Go checkout items first!
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-900/60 pb-3 font-mono text-[11px]">
                      <div>
                        <span className="text-zinc-600 font-bold block text-[8px] uppercase">Order Reference</span>
                        <span className="text-white font-bold uppercase">{ord.id}</span>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <span className="text-zinc-600 font-bold block text-[8px] uppercase">Consignee</span>
                          <span className="text-zinc-300 font-sans">{ord.shippingAddress.fullName}</span>
                        </div>
                        <div>
                          <span className="text-zinc-600 font-bold block text-[8px] uppercase">Total value</span>
                          <span className="text-brand-red text-glow-crimson font-bold">${ord.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-zinc-400 font-sans font-semibold">{item.name} (Qty: {item.quantity})</span>
                          <span className="font-mono font-bold text-zinc-300">${item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-zinc-900/40">
                      <div className="text-[10px] font-mono text-zinc-500">
                        <span className="text-zinc-600 font-bold uppercase">Destination city:</span> {ord.shippingAddress.city}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Update Dispatch Status:</span>
                        <select
                          id={`order-status-select-${ord.id}`}
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-zinc-950 border border-zinc-900 text-[10px] font-mono font-bold text-zinc-300 rounded px-2.5 py-1 focus:outline-none focus:border-brand-red"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STOCK INVENTORY AUDITS */}
        {activeTab === 'inventory' && (
          <div id="admin-inventory-tab" className="space-y-6 animate-in fade-in duration-150">
            <h3 className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest border-b border-zinc-900 pb-3">
              Stock auditing panel
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300 font-mono">
                <thead className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-900 bg-zinc-950/60">
                  <tr>
                    <th className="p-4">Carbon Blueprint Masterpiece</th>
                    <th className="p-4 text-center">SKU</th>
                    <th className="p-4 text-center">Active Stock</th>
                    <th className="p-4 text-right">Audit Trigger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-900/25">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt="Unit" className="w-8 h-8 rounded-lg object-cover border border-zinc-900" />
                        <span className="font-bold text-white font-sans">{p.name}</span>
                      </td>
                      <td className="p-4 text-center font-mono text-zinc-400">{p.sku}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded text-[10px] font-black ${
                          p.inStock === 0 ? 'bg-rose-500/10 border border-rose-500/25 text-rose-500 font-black animate-pulse' :
                          p.inStock <= 3 ? 'bg-amber-500/10 border border-amber-500/25 text-amber-500 font-black' :
                          'bg-zinc-900 border border-zinc-850 text-zinc-400'
                        }`}>
                          {p.inStock} UNITS
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          id={`admin-restock-${p.id}`}
                          onClick={() => handleRestock(p.id, 15)}
                          className="px-3 py-1.5 rounded-lg border border-zinc-900 hover:border-brand-red hover:bg-zinc-900 text-[10px] font-bold text-zinc-300 hover:text-white transition-all flex items-center gap-1 ml-auto"
                        >
                          <RefreshCw className="w-3 h-3" /> RESTOCK +15
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS ENGINE */}
        {activeTab === 'coupons' && (
          <div id="admin-coupons-tab" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-in fade-in duration-150">
            
            {/* Create form left (5 cols) */}
            <form onSubmit={handleAddCoupon} className="md:col-span-5 p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
              <span className="text-brand-red text-[10px] font-mono font-bold block uppercase tracking-wider">Deploy new VIP clearance code</span>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Coupon Promo Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIPSECRET50"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="5"
                  max="90"
                  required
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-2 text-xs text-zinc-200 focus:outline-none focus:border-brand-red font-mono"
                />
              </div>

              <div className="text-right pt-2">
                <button
                  id="submit-new-coupon"
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-red text-white text-xs font-mono font-bold uppercase tracking-wider"
                >
                  ACTIVATE PROMO DOCKET
                </button>
              </div>
            </form>

            {/* List right (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-mono text-zinc-400 uppercase font-bold tracking-widest border-b border-zinc-900 pb-2">
                Active promotion dockets
              </h4>
              
              <div className="space-y-3">
                {coupons.map((cop, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/80 flex items-center justify-between text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-white font-black block tracking-wider uppercase text-sm">{cop.code}</span>
                      <span className="text-[10px] text-zinc-500 font-sans block">{cop.description}</span>
                    </div>
                    <span className="bg-brand-red/10 border border-brand-red/20 text-brand-red font-bold px-3 py-1.5 rounded-lg text-sm shrink-0">
                      -{cop.discount}% OFF
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
