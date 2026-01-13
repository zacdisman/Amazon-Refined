'use client';

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Rating from "./Rating";
import { Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Calculate discount percentage if original price exists
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      
      {/* 1. IMAGE AREA */}
      <div className="relative h-64 w-full bg-gray-50 p-4 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-[#CC0C39] text-white text-xs font-bold px-2 py-1 rounded-sm">
            -{discount}%
          </span>
        )}
      </div>

      {/* 2. CONTENT AREA */}
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/product/${product.id}`} className="hover:text-[#C7511F] transition-colors">
          <h3 className="font-medium text-gray-900 line-clamp-2 h-12 text-sm md:text-base">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1">
          <Rating rating={product.rating} count={product.reviews} />
        </div>

        {/* Price Block */}
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
               <span className="text-sm align-top">$</span>
               {Math.floor(product.price)}
               <span className="text-sm align-top">{product.price.toFixed(2).split('.')[1]}</span>
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Prime Badge Logic */}
          {product.isPrime && (
            <div className="flex items-center gap-1 mt-1 text-[#00A8E1] text-xs font-bold">
              <Check className="w-3 h-3 bg-[#00A8E1] text-white rounded-full p-0.5" />
              <span>prime</span>
              <span className="text-gray-500 font-normal">One-Day</span>
            </div>
          )}
        </div>

        {/* Push button to bottom */}
        <div className="mt-auto pt-4">
          <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] hover:border-[#F2C200] text-sm text-[#0F1111] py-2 rounded-full shadow-sm transition-colors cursor-pointer active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}