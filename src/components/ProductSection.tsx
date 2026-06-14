/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, MessageSquare, BookOpen, Clock, Layers, Sparkles, Filter, X, ArrowUpDown, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/storeData';

interface ProductSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToInquiry: (product: Product, quantity: number) => void;
  inquiryList: { product: Product; quantity: number }[];
}

export default function ProductSection({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onAddToInquiry,
  inquiryList,
}: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [sortBy, setSortBy] = useState<'mrp-asc' | 'mrp-desc' | 'name' | 'default'>('default');

  // Categories list
  const filterTabs = [
    { id: 'all', label: 'All Products' },
    { id: 'Masale', label: 'Masalas & Chutneys' },
    { id: 'Pith', label: 'Traditional Flours' },
    { id: 'Malvani products', label: 'Meva & Snacks' },
    { id: 'Laddoos', label: 'Handmade Laddoos' },
    { id: 'Kaju', label: 'Malvan Cashews' },
  ];

  // Process sorting & filtering
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'mrp-asc') {
      result.sort((a, b) => a.mrp - b.mrp);
    } else if (sortBy === 'mrp-desc') {
      result.sort((a, b) => b.mrp - a.mrp);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setModalQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // WhatsApp instant order trigger
  const triggerWhatsAppSingleProduct = (product: Product, qty: number) => {
    const text = `Hello Geeta's Masale! I would like to order:
- *${product.name}*
- Size/Weight: ${product.weight}
- Quantity: ${qty}
- Rate/Price: Rs. ${product.mrp} each
Total Estimate: Rs. ${product.mrp * qty}

Please confirm availability and sharing banking details for packing. Thanks!`;
    const url = `https://api.whatsapp.com/send?phone=917620428920&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="products" className="py-24 bg-[#FAF9F6] text-slate-800 relative min-h-screen">
      {/* Decorative floral elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#A61B1B]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#A61B1B] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-[#A61B1B]" />
            <span>EXQUISITE RETAIL CART</span>
          </div>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight uppercase">
            Boutique <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A61B1B] to-[#D21F1F]">Spice Collections</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light font-sans max-w-xl mx-auto">
            Review and sort our 40+ authentic Malvani, Konkani and dry fruit items. Select to view dynamic uses, ingredients, and book on-the-spot WhatsApp packets.
          </p>
        </div>

        {/* Filter Tabs, Search bar, Sorting Bar (Dynamic Controls Grid) */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-[#A61B1B]/10 mb-12 space-y-6">
          
          {/* Top row: Tab Buttons scrolling */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-2 shrink-0">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onSelectCategory(tab.id)}
                  className={`px-4 py-2 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                    selectedCategory.toLowerCase() === tab.id.toLowerCase()
                      ? 'bg-[#A61B1B] text-white shadow-md'
                      : 'bg-slate-100/50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Indicator count */}
            <span className="text-xs font-mono text-slate-400 uppercase shrink-0 hidden md:block">
              Showing {filteredProducts.length} Items
            </span>
          </div>

          {/* Bottom row: Search filter box & Order sorting controller */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Inline Search */}
            <div className="md:col-span-8 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Filter spices by keyword (e.g. 'Fish', 'Kaju', 'Laddoo')..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#A61B1B] focus:bg-white transition-all placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting List Option selector */}
            <div className="md:col-span-4 relative flex items-center space-x-2">
              <span className="text-xs font-mono text-gray-500 uppercase shrink-0">Sort By:</span>
              <div className="relative w-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider pl-3 pr-8 py-3 rounded-xl border border-slate-200 appearance-none focus:outline-none focus:ring-1 focus:ring-[#A61B1B]"
                >
                  <option value="default">Default Catalog Arrangement</option>
                  <option value="mrp-asc">Price: Low to High</option>
                  <option value="mrp-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>

          {/* Active Search & Category tags highlights if filtering applies */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <div className="flex flex-wrap gap-2 items-center text-xs pt-1">
              <span className="font-mono text-gray-400 uppercase">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#A61B1B]/10 text-[#A61B1B] font-bold">
                  Category: {selectedCategory}
                  <button onClick={() => onSelectCategory('all')} className="ml-1.5 focus:outline-none hover:text-red-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#A61B1B]/10 text-[#A61B1B] font-bold">
                  Search: "{searchQuery}"
                  <button onClick={() => onSearchChange('')} className="ml-1.5 focus:outline-none hover:text-red-800">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  onSelectCategory('all');
                  onSearchChange('');
                }}
                className="text-xs text-[#A61B1B] hover:underline font-semibold ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>

        {/* Empty Search State fallback */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-3xl border border-[#A61B1B]/10 shadow-md max-w-2xl mx-auto"
          >
            <span className="text-5xl block mb-4">🥣</span>
            <h3 className="text-xl font-bold uppercase text-slate-800">No Spicy Products Found</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto font-sans leading-relaxed">
              We couldn't locate any products matching "{searchQuery}". Try selecting a general category or entering generic terms like "kaju" or "masala".
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#A61B1B] text-white hover:bg-red-800 text-xs font-bold uppercase cursor-pointer"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

        {/* Main Grid display products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => {
              const inBagCount = inquiryList.find((item) => item.product.id === p.id)?.quantity || 0;

              return (
                <motion.div
                  key={p.id}
                  layoutId={`product-${p.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 flex flex-col justify-between group h-[480px] sm:h-[600px]"
                >
                  {/* Photo container with zoom and badge */}
                  <div className="relative h-60 sm:h-80 bg-white overflow-hidden shrink-0 p-3 sm:p-5 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => handleOpenModal(p)}
                      className="w-full h-full object-contain group-hover:scale-105 duration-700 ease-out cursor-pointer"
                      referrerPolicy="no-referrer"
                    />

                    {/* Left category tab label */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#A61B1B] text-white text-[8px] sm:text-[10px] font-mono tracking-wider sm:tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase border border-white/20 backdrop-blur-sm shadow-sm select-none">
                      {p.category}
                    </div>

                    {/* Weight tag pill */}
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 text-slate-800 text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded shadow border border-gray-100 select-none">
                      {p.weight}
                    </div>

                    {/* Active Inquiry Count Badge on Card */}
                    {inBagCount > 0 && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#A61B1B] text-white text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-[0_0_10px_rgb(166,27,27)] animate-bounce select-none">
                        {inBagCount} BAG
                      </div>
                    )}
                  </div>

                  {/* Body Info block */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="space-y-1 sm:space-y-2">
                      <h3
                        onClick={() => handleOpenModal(p)}
                        className="font-sans text-xs sm:text-lg font-bold text-slate-800 hover:text-[#A61B1B] transition-colors leading-tight sm:leading-snug tracking-tight uppercase line-clamp-2 cursor-pointer h-8 sm:h-12 flex items-center"
                      >
                        {p.name}
                      </h3>
                      
                      {/* Short Description */}
                      <p className="text-[10px] sm:text-xs text-gray-500 font-sans line-clamp-2 sm:line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    {/* Retail Pricing Block with Rate/Kg optionally */}
                    <div className="pt-2 sm:pt-4 border-t border-gray-100 mt-2 sm:mt-4 flex items-baseline justify-between shrink-0">
                      <div>
                        {p.ratePerKg && (
                          <div className="text-[8px] sm:text-[10px] font-mono text-gray-400 uppercase hidden sm:block">
                            Rate per Kg: ₹{p.ratePerKg}
                          </div>
                        )}
                        <span className="text-sm sm:text-xl font-sans font-black text-[#A61B1B]">
                          ₹{p.mrp}
                        </span>
                        <span className="text-[9px] sm:text-xs text-gray-400 font-sans ml-0.5 sm:ml-1">MRP</span>
                      </div>

                      <button
                        onClick={() => handleOpenModal(p)}
                        className="text-[9px] sm:text-xs font-mono font-bold tracking-wider text-[#A61B1B] hover:text-red-700 transition-colors inline-flex items-center space-x-0.5 sm:space-x-1 hover:underline cursor-pointer"
                      >
                        <span className="hidden sm:inline">VIEW RECIPES</span>
                        <span className="sm:hidden">RECIPES</span>
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Action buttons (Add to Bag / Inquiry WhatsApp) */}
                  <div className="grid grid-cols-2 bg-gray-50/50 border-t border-gray-100 divide-x divide-gray-100 shrink-0">
                    <button
                      onClick={() => onAddToInquiry(p, 1)}
                      className="py-2.5 sm:py-3.5 hover:bg-rose-50 text-slate-800 text-[10px] sm:text-xs font-mono tracking-wider font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      <span>{inBagCount > 0 ? '+ Bag' : 'Add to Bag'}</span>
                    </button>

                    <button
                      onClick={() => triggerWhatsAppSingleProduct(p, 1)}
                      className="py-2.5 sm:py-3.5 hover:bg-[#25D366]/10 text-emerald-600 text-[10px] sm:text-xs font-mono tracking-wider font-bold uppercase transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                      <span>Order<span className="hidden xs:inline"> Now</span></span>
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* Product Information Details Overlay Modal Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <div id="product-detail-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-[#A61B1B]/40 backdrop-blur-sm"
            />

            {/* Modal Card content */}
            <motion.div
              layoutId={`product-${selectedProduct.id}`}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto"
            >
              
              {/* Left Column: Photo Presentation */}
              <div className="md:w-1/2 relative bg-white h-72 md:h-auto min-h-[320px] md:min-h-[480px] p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-150">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full max-h-[380px] object-contain drop-shadow-md rounded-lg"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual highlights */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none rounded-b-3xl md:rounded-l-3xl md:rounded-br-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white z-10 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFF] uppercase bg-[#A61B1B]/90 px-2 py-0.5 rounded-full inline-block mb-1">
                     {selectedProduct.category} Collection
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                    {selectedProduct.name}
                  </h3>
                </div>

                {/* Close Button on Image for mobile */}
                <button
                  onClick={handleCloseModal}
                  className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Right Column: Key Details scroll */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <button
                  onClick={handleCloseModal}
                  className="hidden md:flex absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-slate-800 transition-all cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 animate-pulse" />
                </button>

                {/* Info details pile */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#A61B1B]/10 to-[#E86A17]/10 text-[#A61B1B] text-xs font-mono font-black uppercase">
                      {selectedProduct.weight} pack / ₹{selectedProduct.mrp} MRP
                    </span>
                    <span className="text-xs font-mono text-gray-400">SHELF LIFE: {selectedProduct.shelfLife}</span>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-mono tracking-wide text-gray-400 uppercase">Description</h4>
                    <p className="text-sm font-sans text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div className="space-y-1.5 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                    <h4 className="text-xs font-mono tracking-wide text-[#A61B1B] font-bold uppercase flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Authentic Ingredients</span>
                    </h4>
                    <p className="text-xs font-sans text-gray-600 italic mt-1 leading-relaxed">
                      {selectedProduct.ingredients}
                    </p>
                  </div>

                  {/* Usage Guide instructions */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-mono tracking-wide text-gray-400 uppercase flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Traditional Culinary Methods / Uses</span>
                    </h4>
                    <p className="text-xs font-sans text-gray-600 leading-relaxed">
                      {selectedProduct.usage}
                    </p>
                  </div>

                  {/* Shelf Life / Notes */}
                  {selectedProduct.notes && (
                    <div className="text-[11px] font-sans text-[#A61B1B] bg-rose-50/30 px-3 py-2 rounded-lg border border-rose-150">
                      💡 <b>Master Tip:</b> {selectedProduct.notes}
                    </div>
                  )}
                </div>

                {/* Bottom line: Quantity Counter + CTA Actions */}
                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 gap-4 shrink-0">
                  
                  {/* Quantity selector row */}
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 rounded-xl">
                    <span className="text-xs font-mono text-gray-500 uppercase">Configure Quantity:</span>
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg font-bold border border-gray-200 hover:border-gray-300 shadow-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{modalQuantity}</span>
                      <button
                        onClick={() => setModalQuantity(modalQuantity + 1)}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg font-bold border border-gray-200 hover:border-gray-300 shadow-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        onAddToInquiry(selectedProduct, modalQuantity);
                        handleCloseModal();
                      }}
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-[#A61B1B] text-white hover:bg-red-800 shadow-[0_4px_12px_rgba(166,27,27,0.2)] font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD {modalQuantity} TO BAG</span>
                    </button>

                    <button
                      onClick={() => triggerWhatsAppSingleProduct(selectedProduct, modalQuantity)}
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:opacity-95 font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(16,185,129,0.2)] cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>WHATSAPP ORDER</span>
                    </button>
                  </div>

                </div>

              </div>
              
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
