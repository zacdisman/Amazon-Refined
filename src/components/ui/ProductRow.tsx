'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductRowProps {
  title: string;
  products: Product[];
}

export default function ProductRow({ title, products }: ProductRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -1000 : 1000;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white p-6 mb-6 shadow-sm border border-gray-200 relative group">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#0F1111]">{title}</h2>
        <Link href="#" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline font-medium">
          See more
        </Link>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-300 p-3 shadow-md rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 h-24"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for clean look
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-50 md:min-w-60 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
          {/* Duplicate for visual fullness if we don't have enough data */}
           {products.map((product) => (
            <div key={`${product.id}-duplicate`} className="min-w-50 md:min-w-60 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-gray-300 p-3 shadow-md rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 h-24"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
}