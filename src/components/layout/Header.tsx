'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, MapPin, ChevronDown, X, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50">
        
        {/* --- TOP BAR (Dark Blue #131921) --- */}
        <div className="bg-[#131921] text-white py-2">
          <div className="container mx-auto px-4 flex items-center justify-between gap-4">
            
            {/* 1. Logo */}
            <Link href="/" className="flex items-center pt-2 border border-transparent hover:border-white rounded-sm p-1">
              <span className="text-2xl font-bold tracking-tighter leading-none">
                amazon<span className="text-[#FF9900]">.refined</span>
              </span>
            </Link>

            {/* 2. Deliver To (Hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-1 cursor-pointer border border-transparent hover:border-white rounded-sm p-2 text-sm">
              <div className="mt-1">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-xs text-gray-300">Deliver to Zac</p>
                <p className="font-bold text-white">Lake Charles 70611</p>
              </div>
            </div>

            {/* 3. Search Bar (Centered & Flexible) */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-2">
              <div className="flex w-full h-10 rounded-md overflow-hidden bg-white focus-within:ring-3 focus-within:ring-[#FF9900]/50">
                <button className="px-3 bg-gray-100 text-gray-600 text-xs border-r border-gray-300 hover:bg-gray-200 transition flex items-center gap-1">
                  All <ChevronDown className="w-3 h-3" />
                </button>
                <input 
                  type="text" 
                  placeholder="Search Amazon Refined" 
                  className="flex-1 px-3 text-gray-900 focus:outline-none placeholder:text-gray-500"
                />
                <button className="bg-[#FF9900] px-5 hover:bg-[#fa8900] transition flex items-center justify-center">
                  <Search className="w-6 h-6 text-[#131921]" />
                </button>
              </div>
            </div>

            {/* 4. Right Actions */}
            <div className="flex items-center gap-4">
              
              {/* Language */}
              <div className="hidden lg:flex items-center gap-1 cursor-pointer border border-transparent hover:border-white rounded-sm p-2">
                <span className="text-lg">🇺🇸</span>
                <span className="text-sm font-bold">EN</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>

              {/* Account */}
              <div className="hidden md:block cursor-pointer border border-transparent hover:border-white rounded-sm p-2">
                <p className="text-xs text-gray-200 leading-none">Hello, Zac</p>
                <p className="font-bold text-sm leading-none mt-1 flex items-center gap-1">
                  Account & Lists <ChevronDown className="w-3 h-3 text-gray-400" />
                </p>
              </div>

              {/* Orders */}
              <div className="hidden md:block cursor-pointer border border-transparent hover:border-white rounded-sm p-2">
                <p className="text-xs text-gray-200 leading-none">Returns</p>
                <p className="font-bold text-sm leading-none mt-1">& Orders</p>
              </div>

              {/* Cart */}
              <Link href="/cart" className="flex items-end gap-1 relative border border-transparent hover:border-white rounded-sm p-2">
                <div className="relative">
                  <ShoppingCart className="w-8 h-8" />
                  <span className="absolute -top-1 -right-1 bg-[#FF9900] text-[#131921] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                  </span>
                </div>
                <span className="font-bold text-sm hidden md:block mb-1">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR (Light Blue #232f3e) --- */}
        <div className="bg-[#232f3e] text-white py-1.5 shadow-md">
          <div className="container mx-auto px-4 flex items-center gap-4 overflow-x-auto text-sm no-scrollbar">
            
            {/* HAMBURGER MENU TRIGGER */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-1 font-bold border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
              <span>All</span>
            </button>

            {/* Nav Links */}
            {['Amazon Haul', 'Medical Care', 'Alexa+', 'Amazon Basics', 'Audible', 'Pet Supplies', 'Amazon Home', 'Buy Again', 'Handmade'].map((item) => (
              <Link 
                key={item} 
                href="#" 
                className="whitespace-nowrap px-2 py-1 border border-transparent hover:border-white rounded-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* MOBILE SEARCH (Visible only on small screens) */}
        <div className="md:hidden bg-[#131921] p-3 border-t border-gray-700">
           <div className="flex w-full rounded-md overflow-hidden bg-white">
              <input type="text" placeholder="Search..." className="flex-1 px-4 py-2 text-gray-900 outline-none" />
              <button className="bg-[#FF9900] px-4 flex items-center justify-center"><Search className="w-5 h-5" /></button>
            </div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="bg-[#232f3e] p-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6" />
                  <span className="font-bold text-lg">Browse Amazon</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-2">
                <div className="border-b border-gray-200 pb-2">
                  <h3 className="px-5 py-3 font-bold text-lg text-gray-900">Trending</h3>
                  <MenuItem label="Best Sellers" />
                  <MenuItem label="New Releases" />
                  <MenuItem label="Movers & Shakers" />
                </div>
                <div className="border-b border-gray-200 py-2">
                  <h3 className="px-5 py-3 font-bold text-lg text-gray-900">Shop By Department</h3>
                  <MenuItem label="Electronics" />
                  <MenuItem label="Computers" />
                  <MenuItem label="Smart Home" />
                </div>
                 <div className="py-2">
                  <h3 className="px-5 py-3 font-bold text-lg text-gray-900">Settings</h3>
                  <MenuItem label="Your Account" />
                  <MenuItem label="Sign Out" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <button className="w-full text-left px-5 py-3 text-gray-600 hover:bg-gray-100 flex items-center justify-between group transition-colors">
      {label}
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-800" />
    </button>
  );
}