'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Toasts from '@/components/Toasts';
import Footer from '@/components/Footer';

// Page Views
import HomeView from '@/components/views/HomeView';
import ShopView from '@/components/views/ShopView';
import ProductDetailsView from '@/components/views/ProductDetailsView';
import CartView from '@/components/views/CartView';
import CheckoutView from '@/components/views/CheckoutView';
import UserDashboardView from '@/components/views/UserDashboardView';
import AdminDashboardView from '@/components/views/AdminDashboardView';

// Info Views
import { 
  AboutView, 
  ContactView, 
  PrivacyView, 
  TermsView 
} from '@/components/views/InfoViews';

export default function Home() {
  const { view } = useStore();

  const renderActiveView = () => {
    switch (view) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'user-dashboard':
        return <UserDashboardView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      
      {/* Toast Notification HUD */}
      <Toasts />

      <div className="flex-1 flex flex-col">
        {/* Sticky Header Mega-Menu Navigation */}
        <Navbar />

        {/* Dynamic Interactive Page Stage */}
        <div className="pt-24 flex-1">
          {renderActiveView()}
        </div>
      </div>

      {/* Comprehensive Professional Footer */}
      <Footer />

    </div>
  );
}
