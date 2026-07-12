'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Review, INITIAL_PRODUCTS, MOCK_REVIEWS } from '@/lib/data';
export type { Product, Order, Review };

export type AppView = 
  | 'home'
  | 'shop'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'user-dashboard'
  | 'admin-dashboard'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  // Navigation Router
  view: AppView;
  selectedProductId: string | null;
  setView: (view: AppView, productId?: string | null) => void;
  
  // Products Management
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Cart Management
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Authentication
  currentUser: { name: string; email: string; role: 'user' | 'admin' } | null;
  login: (email: string, password: string) => boolean;
  registerUser: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  
  // Coupons
  activeCoupon: { code: string; discountPercent: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Orders
  orders: Order[];
  placeOrder: (shippingDetails: Order['shippingAddress'], paymentMethod: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Search and global filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

let toastIdCounter = 0;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Primary States
  const [view, setViewState] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<StoreContextType['currentUser']>(null);
  const [activeCoupon, setActiveCoupon] = useState<StoreContextType['activeCoupon']>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load from local storage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('pmart_cart');
      const storedWishlist = localStorage.getItem('pmart_wishlist');
      const storedUser = localStorage.getItem('pmart_current_user');
      const storedOrders = localStorage.getItem('pmart_orders');
      const storedProducts = localStorage.getItem('pmart_products');

      setTimeout(() => {
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
        if (storedUser) setCurrentUser(JSON.parse(storedUser));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
        if (storedProducts) setProducts(JSON.parse(storedProducts));
      }, 0);
    } catch (e) {
      console.error('Error loading PMART localStorage:', e);
    }
  }, []);

  // Save changes helper
  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // Router setter
  const setView = (newView: AppView, productId: string | null = null) => {
    setViewState(newView);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    // Scroll to top on page transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toasts
  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${++toastIdCounter}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const productWithId: Product = { ...newProd, id };
    const updated = [productWithId, ...products];
    setProducts(updated);
    saveToStorage('pmart_products', updated);
    addToast(`Product "${newProd.name}" added successfully.`, 'success');
  };

  const updateProduct = (updatedProd: Product) => {
    const updated = products.map((p) => (p.id === updatedProd.id ? updatedProd : p));
    setProducts(updated);
    saveToStorage('pmart_products', updated);
    addToast(`Product "${updatedProd.name}" updated.`, 'success');
  };

  const deleteProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    const updated = products.filter((x) => x.id !== id);
    setProducts(updated);
    saveToStorage('pmart_products', updated);
    if (p) addToast(`Product "${p.name}" removed.`, 'info');
  };

  // Cart
  const addToCart = (productId: string, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (product.inStock <= 0) {
      addToast('Sorry, this elite item is currently out of stock.', 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      let updated: CartItem[];

      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.inStock) {
          addToast(`Only ${product.inStock} units of this curated item are available.`, 'error');
          return prev;
        }
        updated = prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQty } : item
        );
        addToast(`Increased "${product.name}" quantity in cart.`, 'success');
      } else {
        updated = [...prev, { product, quantity }];
        addToast(`"${product.name}" added to luxury vault (cart).`, 'success');
      }

      saveToStorage('pmart_cart', updated);
      return updated;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      saveToStorage('pmart_cart', updated);
      addToast('Item removed from cart.', 'info');
      return updated;
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > product.inStock) {
      addToast(`Only ${product.inStock} units in stock.`, 'error');
      return;
    }

    setCart((prev) => {
      const updated = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveToStorage('pmart_cart', updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage('pmart_cart', []);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    if (activeCoupon) {
      return subtotal * (1 - activeCoupon.discountPercent / 100);
    }
    return subtotal;
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const p = products.find((x) => x.id === productId);
    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId);
        addToast(`Removed "${p?.name || 'item'}" from wishlist.`, 'info');
      } else {
        updated = [...prev, productId];
        addToast(`"${p?.name || 'item'}" saved to wishlist.`, 'success');
      }
      saveToStorage('pmart_wishlist', updated);
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Authentication & Profile Settings
  const login = (email: string, password: string): boolean => {
    // Admin login shortcut
    if (email.toLowerCase() === 'admin@pmart.com' || (email.toLowerCase() === 'admin' && password === 'admin')) {
      const user = { name: 'Lead Curator (Admin)', email: 'admin@pmart.com', role: 'admin' as const };
      setCurrentUser(user);
      saveToStorage('pmart_current_user', user);
      addToast('Welcome back, Curator. Accessing PMART Admin Console.', 'success');
      setView('admin-dashboard');
      return true;
    }

    // Default simulation user
    if (email && password.length >= 4) {
      const user = { 
        name: email.split('@')[0].toUpperCase(), 
        email, 
        role: 'user' as const 
      };
      setCurrentUser(user);
      saveToStorage('pmart_current_user', user);
      addToast(`Access Granted. Welcome back, ${user.name}.`, 'success');
      setView('home');
      return true;
    }

    addToast('Invalid credentials. (Hint: Use admin@pmart.com with password "admin")', 'error');
    return false;
  };

  const registerUser = (name: string, email: string, password: string): boolean => {
    if (!name || !email || password.length < 4) {
      addToast('Please complete all fields. Password must be 4+ characters.', 'error');
      return false;
    }
    const user = { name, email, role: 'user' as const };
    setCurrentUser(user);
    saveToStorage('pmart_current_user', user);
    addToast(`Account registered successfully. Welcome, ${name}!`, 'success');
    setView('home');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pmart_current_user');
    }
    addToast('Vault locked. Logged out successfully.', 'info');
    setView('home');
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'PMART20' || normalized === 'BLACKCARD') {
      const coupon = { code: normalized, discountPercent: 20 };
      setActiveCoupon(coupon);
      addToast('Elite Promo Code APPLIED: 20% discount activated!', 'success');
      return true;
    }
    if (normalized === 'CURATOR50' && currentUser?.role === 'admin') {
      const coupon = { code: normalized, discountPercent: 50 };
      setActiveCoupon(coupon);
      addToast('Curator Clearance applied: 50% discount activated!', 'success');
      return true;
    }
    addToast('Invalid or expired coupon code.', 'error');
    return false;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    addToast('Coupon code removed.', 'info');
  };

  // Orders
  const placeOrder = (shippingDetails: Order['shippingAddress'], paymentMethod: string): Order | null => {
    if (cart.length === 0) {
      addToast('Your cart is empty. Cannot process empty orders.', 'error');
      return null;
    }

    const newOrder: Order = {
      id: `PM-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      total: getCartTotal(),
      status: 'Processing',
      shippingAddress: shippingDetails,
      paymentMethod,
    };

    // Update stock levels
    const updatedProducts = products.map((p) => {
      const inCart = cart.find((item) => item.product.id === p.id);
      if (inCart) {
        return {
          ...p,
          inStock: Math.max(0, p.inStock - inCart.quantity),
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    saveToStorage('pmart_products', updatedProducts);

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveToStorage('pmart_orders', updatedOrders);

    clearCart();
    setActiveCoupon(null);
    addToast('Elite Order Dispatched! Check status on your dashboard.', 'success');
    setView('user-dashboard');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveToStorage('pmart_orders', updated);
    addToast(`Order ${orderId} updated to: ${status}`, 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        view,
        selectedProductId,
        setView,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        login,
        registerUser,
        logout,
        activeCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        updateOrderStatus,
        toasts,
        addToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
