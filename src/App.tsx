import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// Global Layout Components
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchOverlay } from './components/SearchOverlay';
import { ToastBanner } from './components/ToastBanner';

// Route Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { SearchPage } from './pages/SearchPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Account } from './pages/Account';

// Scroll To Top on navigate helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 404 Error fallback page
const NotFound: React.FC = () => {
  return (
    <div id="not-found-page" className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center space-y-5 bg-[#0A0A0A] text-brand-bone relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full z-0" />
      
      <div className="relative z-10 space-y-4">
        <span className="text-brand-red text-xs tracking-[0.3em] font-bold uppercase block">ERROR CODE 404 // SIGNAL LOST</span>
        <h1 className="font-display text-5xl sm:text-7xl uppercase tracking-tighter text-brand-bone">
          TRACE DECOMMISSIONED
        </h1>
        <p className="text-xs text-brand-grey max-w-sm mx-auto leading-relaxed tracking-wider">
          The requested coordinate trace does not exist in the active HA archive index. The sector may have been wiped or shifted.
        </p>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          to="/"
          className="bg-brand-red hover:bg-[#ff1c2d] text-brand-bone text-xs font-bold tracking-[0.2em] px-8 py-3.5 uppercase transition-all"
        >
          RETURN TO HOME BASE
        </Link>
        <Link
          to="/shop"
          className="border border-brand-bone/15 hover:border-brand-red text-brand-bone hover:text-brand-red text-xs font-semibold tracking-[0.2em] px-8 py-3.5 uppercase transition-all bg-transparent"
        >
          EXPLORE ARCHIVES
        </Link>
      </div>
    </div>
  );
};

// Main routing container
const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative font-sans antialiased text-brand-bone selection:bg-brand-red selection:text-brand-bone">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-brand-red focus:text-brand-bone focus:px-4 focus:py-2.5 focus:font-bold focus:text-xs focus:tracking-widest border border-brand-bone/10 shadow-xl"
      >
        SKIP TO CONTENT
      </a>

      {/* Scroll stabilizer */}
      <ScrollToTop />

      {/* Global Announcements */}
      <AnnouncementBar />

      {/* Primary Brand Navigation Header */}
      <Header />

      {/* Main viewport routes routing container */}
      <main id="main-content" tabIndex={-1} className="flex-grow pt-[72px] outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer layout */}
      <Footer />

      {/* Drawer Overlay Widgets */}
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <SearchOverlay />
      <ToastBanner />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </BrowserRouter>
  );
}
