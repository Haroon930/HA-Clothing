import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AnimatePresence, motion } from 'motion/react';

export const Header: React.FC = () => {
  const { getCartCount, cartOpen, setCartOpen, searchOpen, setSearchOpen, wishlist } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to scroll to crossfade transparency to solid black
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'SHOP', path: '/shop' },
    { name: 'JACKETS', path: '/shop/jackets' },
    { name: 'HOODIES', path: '/shop/hoodies' },
    { name: 'PANTS', path: '/shop/pants' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  // Transparent header on homepage when not scrolled. Otherwise solid black.
  const headerBgClass = isHome
    ? isScrolled
      ? 'bg-brand-black/95 backdrop-blur-md border-b border-brand-red/15 py-3'
      : 'bg-transparent py-5'
    : 'bg-brand-black/95 backdrop-blur-md border-b border-brand-red/15 py-3';

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Side: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] font-semibold text-brand-bone/90">
            {navLinks.slice(0, 4).map((link) => (
              <NavLink
                id={`nav-${link.name.toLowerCase()}`}
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-brand-red transition-all relative py-1 group ${
                    isActive ? 'text-brand-red' : ''
                  }`
                }
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          {/* Left Side: Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            className="lg:hidden p-1 text-brand-bone hover:text-brand-red transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center: Brand Wordmark Logo */}
          <div className="flex-1 lg:flex-none text-center">
            <Link
              id="header-logo-link"
              to="/"
              className="font-display text-2xl md:text-3xl tracking-tight text-brand-bone hover:text-brand-red transition-colors inline-block"
            >
              HA <span className="text-brand-red">CLOTHING</span>
            </Link>
          </div>

          {/* Right Side: Secondary Actions & Cart */}
          <div className="flex items-center gap-5">
            {/* Desktop-only About Link */}
            <Link
              to="/about"
              className="hidden lg:inline-block text-xs font-semibold tracking-[0.2em] text-brand-bone/90 hover:text-brand-red transition-colors"
            >
              ABOUT
            </Link>

            {/* Search Toggle Button */}
            <button
              id="search-toggle"
              className="p-1 text-brand-bone hover:text-brand-red transition-colors relative"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              id="wishlist-link"
              to="/wishlist"
              className="p-1 text-brand-bone hover:text-brand-red transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-red rounded-full" />
              )}
            </Link>

            {/* Cart Toggle Button */}
            <button
              id="cart-toggle"
              className="p-1 text-brand-bone hover:text-brand-red transition-colors relative"
              onClick={() => setCartOpen(true)}
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-brand-red text-brand-bone text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-brand-black">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brand-black/98 flex flex-col justify-between p-6 md:p-12"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl tracking-tight text-brand-bone">
                HA <span className="text-brand-red">CLOTHING</span>
              </span>
              <button
                id="close-mobile-menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-brand-bone hover:text-brand-red transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Huge Navigation list */}
            <nav className="flex flex-col gap-6 my-auto pt-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="font-display text-4xl md:text-5xl tracking-tight text-brand-bone hover:text-brand-red transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <div className="border-t border-brand-bone/10 pt-6 text-brand-grey text-xs tracking-wider flex justify-between items-center">
              <span>© 2026 HA CLOTHING</span>
              <div className="flex gap-4">
                <Link to="/about" className="hover:text-brand-bone transition-colors">OUR STORY</Link>
                <Link to="/contact" className="hover:text-brand-bone transition-colors">CONTACT</Link>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
