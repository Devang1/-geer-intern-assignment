'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';

const LuxuryNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Rings', 'Earrings', 'Necklace', 'Bracelets', 'Pendant', 'Other Jewelry', 'Contact', 'About'];

  const Links = {
    rings: 'https://media.istockphoto.com/id/176830145/photo/wedding-rings.jpg?s=612x612&w=0&k=20&c=AeZdAkKLzyCHwQdj4A0GPfwyZumaOJa0Z2jrDt_TRok=',
    earrings: 'https://karatcart.com/cdn/shop/files/partnerimages_2Fa4b87139_33015822_5.jpg?v=1725617160',
    necklace: 'https://www.aurusjewels.in/cdn/shop/files/Uttara1-Webp.webp?v=1701930539',
    bracelets: 'https://www.elahe.in/cdn/shop/files/5_2d3f7222-bf7b-43dc-917e-597d4b09909a_2000x.jpg?v=1722687234',
    pendant: 'https://www.mannash.in/cdn/shop/products/MCYNCP86D145_M.jpg?v=1622134610',
  };

  const getDropdown = (title) => (
    <div className="absolute left-0 top-full mt-2 w-70 bg-white/20 'glass-morphism shadow-2xl' bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-xl border border-gold/20 px-12 py-8 z-40">
      <div className="flex flex-row justify-between text-white">
        <div className="min-w-[180px] mb-6">
          <h4 className="font-semibold text-sm mb-4 uppercase ">Shop by Design</h4>
          <ul className="space-y-2 text-sm">
            {['Elegant', 'Casual', 'Classic', 'Modern', 'Bold'].map((item) => (
              <li key={item} className="hover:text-gold transition-all cursor-pointer">💎 {item}</li>
            ))}
          </ul>
        </div>
        <div className="min-w-[180px] mb-6">
          <h4 className="font-semibold text-sm mb-4 uppercase">Shop by Metal</h4>
          <ul className="space-y-2 text-sm">
            <li>🟡 Yellow Gold</li>
            <li>⚪ White Gold</li>
            <li>🟤 Rose Gold</li>
          </ul>
        </div>
        <div className="min-w-[180px] mb-6">
          <h4 className="font-semibold text-sm mb-4 uppercase">Shop by Price</h4>
          <ul className="space-y-2 text-sm">
            <li>💰 Below ₹15,000</li>
            <li>💰 ₹15K - ₹30K</li>
            <li>💰 ₹30K - ₹50K</li>
            <li>💰 ₹50K & Above</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-morphism shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 relative">
            <div className="flex-shrink-0">
              <h1 className="text-2xl lg:text-3xl font-playfair italic text-gradient-gold font-bold tracking-wide"><a href="/">Geer.in</a></h1>
            </div>
            <div className="hidden lg:flex items-center space-x-8 relative">
              {navLinks.map((link) => (
                <div
                  key={link}
                  className="relative group"
                  onMouseEnter={() => setHoveredMenu(link)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <a
                    href={link === 'Other Jewelry' ? '/Products' : `/Products?category=${encodeURIComponent(link)}`}
                    className="text-white/90 hover:text-white transition-all duration-300 font-medium text-sm tracking-wide uppercase flex items-center space-x-1"
                  >
                    <span>{link}</span>
                    {!['About', 'Contact'].includes(link) && <ChevronDown size={14} />}
                  </a>
                  {!['About', 'Contact'].includes(link) && hoveredMenu === link && getDropdown(link)}
                </div>
              ))}
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full">
                <Search size={20} />
              </button>
              <button className="p-2 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full">
                <User size={20} />
              </button>
              <button className="p-2 text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-full relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#C0C0C0] to-[#D4AF37] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            <div className="lg:hidden flex items-center space-x-4">
              <button className="p-2 text-white/90 hover:text-white transition-all duration-300 relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#C0C0C0] to-[#D4AF37] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="text-white/90 hover:text-white transition-all duration-300">
                      <Search size={20} />
              </button>
              <button className="text-white/90 hover:text-white transition-all duration-300">
                      <User size={20} />
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/90 hover:text-white transition-all duration-300">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden mt-2 rounded-lg border 'glass-morphism shadow-2xl' bg-opacity-90 backdrop-blur-lg shadow-2xl border-white/20 px-4 py-6">
              {mobileSubMenu ? (
                <>
                  <button onClick={() => setMobileSubMenu(null)} className="text-white text-sm mb-4 flex items-center">
                    ← {mobileSubMenu}
                  </button>
                  <div className="space-y-4 text-white text-sm">
                    <div className="font-semibold uppercase">Shop All</div>
                    <div className="font-semibold uppercase mt-4">Shop by Design</div>
                    {['Engagement', 'Solitaire', 'Casual', 'Classic', 'Three Stone', 'Side Stone'].map((item) => (
                      <div key={item} className="ml-2">💍 {item}</div>
                    ))}
                    <div className="font-semibold uppercase mt-4">Shop by Metal</div>
                    <div className="ml-2">🟡 Yellow Gold</div>
                    <div className="ml-2">⚪ White Gold</div>
                    <div className="ml-2">🟤 Rose Gold</div>
                  </div>
                </>
              ) : (
                <>
                  {navLinks.map((link) => (
                    <div
                      key={link}
                      onClick={() => setMobileSubMenu(link)}
                      className="text-white/90 hover:text-white transition-all duration-300 font-medium tracking-wide uppercase cursor-pointer"
                    >
                      {link}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {!isMobileMenuOpen && (
          <div className="lg:hidden mt-[20px] px-4 bg-transparent z-40 overflow-hidden">
            <div className="flex items-center justify-start overflow-x-auto space-x-4 hide-scrollbar ">
              {Object.entries(Links).slice(0, 5).map(([key, url], index) => (
               <a key={key.id} href={key === 'Other Jewelry' ? '/Products' : `/Products?category=${encodeURIComponent(key)}`}><div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-10 rounded-[100px] overflow-hidden border border-white shadow-md">
                    <img src={url} alt={key} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-white mt-2 uppercase tracking-wide whitespace-nowrap">
                    {key}
                  </span>
                </div></a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default LuxuryNavbar;
