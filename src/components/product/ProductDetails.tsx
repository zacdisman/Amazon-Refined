'use client';

import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import { MapPin, ChevronDown, BadgeDollarSign, ClipboardCheck, Leaf, Star, Search, Gift, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { addToCart } = useCart();

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const dateString = deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="bg-white min-h-screen pb-10 font-sans text-[#0F1111]">
      
      {/* BREADCRUMBS */}
      <div className="container mx-auto px-4 py-2 text-xs text-[#565959] flex items-center gap-1 leading-normal">
        <Link href="#" className="hover:underline">Electronics</Link> &rsaquo;
        <Link href="#" className="hover:underline">Headphones</Link> &rsaquo;
        <Link href="#" className="hover:underline">Over-Ear Headphones</Link>
      </div>

      <div className="container mx-auto px-4 mt-2 max-w-375">
        
        {/* === TOP SECTION (Product Info) === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-b border-[#E7E7E7] pb-10">
          
          {/* LEFT: IMAGES (Span 5) */}
          <div className="lg:col-span-5">
            <div className="flex gap-4 sticky top-4">
                <div className="hidden md:flex flex-col gap-2">
                {[product.image, product.image, product.image].map((img, i) => (
                    <button 
                    key={i} 
                    onMouseEnter={() => setSelectedImage(img)}
                    className={`relative w-10 h-10 border rounded-[3px] overflow-hidden flex items-center justify-center ${selectedImage === img ? 'border-[#E77600] shadow-[0_0_3px_1px_#E77600]' : 'border-[#A2A6AC] hover:border-[#E77600]'}`}
                    >
                    <Image src={img} alt="Thumbnail" fill className="object-contain p-0.5" />
                    </button>
                ))}
                </div>
                <div className="flex-1">
                    <div className="relative aspect-square md:h-125 flex items-center justify-center">
                        <Image src={selectedImage} alt={product.title} fill className="object-contain max-h-full" priority />
                    </div>
                     <div className="mt-4 flex items-center gap-2 text-sm text-[#007185] border-t border-gray-200 pt-3">
                        <Tag className="w-4 h-4" />
                        <span className="hover:underline cursor-pointer">Save 10% on 2 select item(s)</span>
                    </div>
                </div>
            </div>
          </div>

          {/* MIDDLE: INFO (Span 4) */}
          <div className="lg:col-span-4 flex flex-col">
            <h1 className="text-[24px] font-medium leading-tight mb-1">{product.title}</h1>
            <div className="text-sm text-[#007185] mb-1">
              <Link href="#" className="hover:underline">Visit the {product.category} Store</Link>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Rating rating={product.rating} count={product.reviews} />
              <span className="text-xs text-[#007185] hover:underline cursor-pointer border-l border-gray-300 pl-2">Search this page</span>
            </div>
            <div className="mb-3">
                <span className="bg-[#C7511F] text-white text-xs font-bold px-2 py-1 rounded-sm">#1 Best Seller</span>
                <span className="text-xs text-[#007185] ml-2 hover:underline cursor-pointer">in Over-Ear Headphones</span>
            </div>
            <div className="border-t border-[#E7E7E7] py-3">
              <div className="flex items-baseline gap-2">
                 {discount > 0 && <span className="text-[#CC0C39] text-[28px] font-light">-{discount}%</span>}
                 <span className="text-[28px] font-medium flex items-start leading-none">
                    <span className="text-[13px] mt-1.25">$</span>
                    {Math.floor(product.price)}
                    <span className="text-[13px] mt-1.25">{product.price.toFixed(2).split('.')[1]}</span>
                 </span>
              </div>
              <div className="text-[13px] text-[#565959] mt-1">
                 List Price: <span className="line-through">{product.originalPrice ? formatPrice(product.originalPrice) : '$399.99'}</span>
              </div>
            </div>
            
            {/* CORRECT BULLETS (Restored) */}
            <div className="mt-2 flex-1">
              <h2 className="font-bold text-base mb-2">About this item</h2>
              <ul className="list-disc pl-4 space-y-2 text-[14px] leading-snug">
                <li>Experience industry-leading noise cancellation that automatically adjusts to your environment.</li>
                <li>Enjoy up to 30 hours of battery life with quick charging - 3 minutes gives you 3 hours of playback.</li>
                <li>Ultra-comfortable, lightweight design with soft fit leather suitable for all-day wear.</li>
                <li>Multipoint connection allows you to switch between two devices effortlessly.</li>
                <li>Crystal clear hands-free calling with 4 beamforming microphones.</li>
                <li>Intuitive touch control settings to handle playback and calls.</li>
              </ul>
              <div className="mt-4 flex items-center gap-1 text-[14px] text-[#007185] hover:text-[#C7511F] cursor-pointer">
                <ChevronDown className="w-4 h-4" />
                <span className="hover:underline">Compare with similar items</span>
              </div>
            </div>
          </div>

          {/* RIGHT: BUY BOX (Span 3 - FULLY RESTORED) */}
          <div className="lg:col-span-3">
             <div className="border border-[#D5D9D9] rounded-lg p-4.5 shadow-sm text-sm bg-white">
                <div className="text-[22px] font-medium mb-2 leading-none">{formatPrice(product.price)}</div>
                <div className="mb-3 leading-snug">
                    <span className="text-[#007185] hover:underline cursor-pointer">FREE delivery</span>
                    <span className="font-bold ml-1">{dateString}</span>.
                </div>
                <div className="flex items-start gap-1 text-[#007185] mb-3 hover:text-[#C7511F] cursor-pointer leading-tight">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-xs">Deliver to Zac - Lake Charles 70611</span>
                </div>
                <div className="text-[18px] text-[#007600] font-medium mb-3 leading-none">In Stock</div>
                
                <div className="space-y-3">
                    <div className="relative">
                        <select className="w-full bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg py-1.5 px-2 shadow-[0_2px_5px_rgba(213,217,217,0.5)] text-[13px] focus:ring-1 focus:ring-[#007185] focus:border-[#007185] appearance-none cursor-pointer hover:bg-[#E3E6E6] text-[#0F1111]">
                            <option>Qty: 1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-3 top-2.5 text-[#565959] pointer-events-none" />
                    </div>

                    <button onClick={() => addToCart(product)} className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] py-2 rounded-[20px] shadow-sm text-[13px] font-medium cursor-pointer">Add to Cart</button>
                    <button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] py-2 rounded-[20px] shadow-sm text-[13px] font-medium cursor-pointer">Buy Now</button>
                </div>
                
                <div className="mt-4 text-xs text-[#565959] space-y-1">
                    <div className="grid grid-cols-3"><span>Ships from</span><span className="col-span-2 text-[#0F1111]">Amazon.com</span></div>
                    <div className="grid grid-cols-3"><span>Sold by</span><span className="col-span-2 text-[#0F1111]">Amazon.com</span></div>
                    <div className="grid grid-cols-3"><span>Returns</span><span className="col-span-2 text-[#007185] hover:underline cursor-pointer">30-day refund/replacement</span></div>
                </div>

                {/* Protection Plan (Restored) */}
                <div className="mt-4 border-t border-[#D5D9D9] pt-3">
                    <h3 className="font-bold text-[#0F1111] mb-2 text-[13px]">Add a Protection Plan:</h3>
                    <div className="flex items-start gap-2 mb-1">
                        <input type="checkbox" className="mt-0.5 accent-[#007185]" />
                        <label className="text-[#007185] hover:underline cursor-pointer text-[13px] leading-tight">3-Year Protection for $34.99</label>
                    </div>
                    <div className="flex items-start gap-2">
                        <input type="checkbox" className="mt-0.5 accent-[#007185]" />
                        <label className="text-[#007185] hover:underline cursor-pointer text-[13px] leading-tight">2-Year Protection for $24.99</label>
                    </div>
                </div>

                {/* Gift Options (Restored) */}
                <div className="mt-4 border-t border-[#D5D9D9] pt-3 flex items-center gap-2 text-[13px] text-[#0F1111] cursor-pointer hover:bg-gray-50 p-1 -mx-1 rounded">
                    <Gift className="w-4 h-4 text-[#565959]" />
                    <span>Add gift options</span>
                </div>
            </div>

            {/* Extra Buy Box Links (Restored) */}
            <div className="mt-3 border border-[#D5D9D9] rounded-lg p-3.5 bg-white flex flex-col gap-2">
                <Link href="#" className="text-[13px] text-[#007185] hover:underline hover:text-[#C7511F]">
                    Used & New (15) from <span className="font-bold text-[#B12704]">$285.00</span>
                </Link>
                 <Link href="#" className="text-[13px] text-[#007185] hover:underline hover:text-[#C7511F]">
                    Other Sellers on Amazon
                </Link>
            </div>
             <div className="mt-3 border border-[#D5D9D9] rounded-lg p-3.5 bg-white flex items-center justify-center text-[13px] cursor-pointer hover:bg-gray-50">
                Have one to sell? <span className="text-[#007185] ml-1 hover:underline">Sell on Amazon</span>
            </div>
          </div>
        </div>

        {/* === SECTION 2: FREQUENTLY BOUGHT TOGETHER === */}
        <div className="py-8 border-b border-[#E7E7E7]">
            <h2 className="text-[21px] font-bold mb-6">Frequently bought together</h2>
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                <div className="flex items-center gap-3">
                    <div className="relative w-32 h-32 p-2 border border-[#D5D9D9] bg-white rounded-lg">
                        <Image src={product.image} alt="Main" fill className="object-contain" />
                    </div>
                    <span className="text-2xl text-[#565959] font-light">+</span>
                    <div className="relative w-32 h-32 p-2 border border-[#D5D9D9] bg-white rounded-lg">
                        <Image src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=300" alt="Phone" fill className="object-contain" />
                    </div>
                </div>
                <div className="flex-1 max-w-md">
                    <div className="mb-3">
                        <span className="text-[18px]">Total price: </span>
                        <span className="text-[21px] font-bold text-[#B12704]">${(product.price + 25.99).toFixed(2)}</span>
                    </div>
                    <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] px-8 py-1.75 rounded-[20px] text-[13px] font-medium shadow-sm w-auto cursor-pointer">
                        Add both to Cart
                    </button>
                </div>
            </div>
        </div>

        {/* === SECTION 3: RUFUS SEARCH === */}
        <div className="py-6 border-b border-[#E7E7E7]">
            <h2 className="flex items-center gap-2 text-[21px] font-bold mb-4">
                <span className="text-[#E77600] text-2xl">✦</span> Looking for specific info?
            </h2>
            <div className="relative max-w-2xl mb-4">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#565959]" />
                <input 
                    type="text" 
                    placeholder="Ask Rufus or search reviews and Q&A" 
                    className="w-full border border-[#888C8C] rounded-lg pl-10 pr-4 py-2 shadow-inner focus:ring-[3px] focus:ring-[#C8F3FA] focus:border-[#007185] outline-none placeholder:text-[#565959]"
                />
            </div>
            <div className="flex flex-wrap gap-2">
                {["Does it have image stabilization?", "What memory cards does it use?", "Can it connect to a smartphone?", "Is the LCD screen adjustable?"].map((tag) => (
                    <span key={tag} className="bg-[#EDFDFF] border border-[#CCEBF0] text-[#007185] text-sm px-3 py-1 rounded-sm cursor-pointer hover:bg-[#E0FAFF]">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* === SECTION 4: AMAZON RENEWED INFO === */}
        <div className="py-8 border-b border-[#E7E7E7]">
             <h2 className="text-[24px] font-bold mb-2">What is Amazon Renewed?</h2>
             <p className="text-sm text-[#565959] mb-8">Amazon Renewed is your trusted destination for products that are inspected, tested, and refurbished as necessary.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto mb-10">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 text-[#007185]">
                        <BadgeDollarSign className="w-full h-full stroke-[1px]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Quality you can afford</h3>
                    <p className="text-sm text-[#565959]">Amazon Renewed products offer an affordable option so you can save on the brands you love.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 text-[#007185]">
                        <ClipboardCheck className="w-full h-full stroke-[1px]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Products you can trust</h3>
                    <p className="text-sm text-[#565959]">All products have been professionally inspected, tested, cleaned, and refurbished by Amazon-qualified suppliers.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 text-[#007185]">
                        <Leaf className="w-full h-full stroke-[1px]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Purchases with impact</h3>
                    <p className="text-sm text-[#565959]">Your Amazon Renewed purchase extends the lifetime of this product and reduces electronic waste.</p>
                </div>
             </div>
        </div>

        {/* === SECTION 5: CUSTOMER REVIEWS === */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-[#E7E7E7]">
            {/* Sidebar Rating */}
            <div className="md:col-span-4 lg:col-span-3">
                <h2 className="text-[24px] font-bold mb-2">Customer reviews</h2>
                <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-[#F4A41D]"><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="text-gray-300 w-5 h-5" /></div>
                    <span className="text-lg font-medium">4.3 out of 5</span>
                </div>
                <div className="text-[#565959] text-sm mb-6">{product.reviews.toLocaleString()} global ratings</div>
                {[5, 4, 3, 2, 1].map((star, i) => {
                   const percents = [66, 14, 8, 4, 8]; 
                   return (
                    <div key={star} className="flex items-center gap-3 mb-3 text-sm hover:text-[#C7511F] cursor-pointer group">
                        <span className="w-12 group-hover:underline">{star} star</span>
                        <div className="flex-1 h-5 bg-[#F0F2F2] rounded-sm overflow-hidden border border-[#E3E6E6] shadow-inner">
                            <div style={{ width: `${percents[i]}%` }} className="h-full bg-[#FFA41C] border-r border-[#E77600]"></div>
                        </div>
                        <span className="w-8 text-right group-hover:underline">{percents[i]}%</span>
                    </div>
                   )
                })}
            </div>

            {/* Review Content */}
            <div className="md:col-span-8 lg:col-span-9">
                <h3 className="font-bold text-lg mb-4">Top reviews from the United States</h3>
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">Z</div>
                         <span className="text-sm">Zac D.</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                         <div className="flex text-[#F4A41D] text-xs"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                         <span className="font-bold text-sm">Great value for the price</span>
                    </div>
                    <div className="text-xs text-[#565959] mb-2">Reviewed in the United States on January 10, 2026</div>
                    <div className="text-xs text-[#C7511F] font-bold mb-2">Verified Purchase</div>
                    <p className="text-sm leading-relaxed mb-2">
                        I was hesitant to buy a renewed camera, but this one looks brand new! The 50x zoom is insane. I took it to the bird sanctuary and got some amazing shots. Highly recommend if you want a bridge camera without breaking the bank.
                    </p>
                    <div className="text-sm text-[#565959] mb-4">42 people found this helpful</div>
                    <button className="border border-[#D5D9D9] px-4 py-1 rounded-lg text-sm shadow-sm hover:bg-[#F7FAFA]">Helpful</button>
                </div>
            </div>
        </div>

        {/* === SECTION 6: RELATED PRODUCTS (Restored) === */}
        <div className="mt-4 px-4 py-4 bg-white">
            <h2 className="text-[21px] font-bold text-[#0F1111] mb-4">Products related to this item</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300",
                  "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=300", 
                  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=300",
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300",
                  "https://images.unsplash.com/photo-1628243426657-20c510a32110?q=80&w=300"
                ].map((img, i) => (
                    <div key={i} className="border border-[#D5D9D9] rounded-lg p-3 flex flex-col group cursor-pointer">
                        <div className="relative h-40 w-full mb-2">
                             <Image src={img} alt="Related" fill className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                        </div>
                        <span className="text-[#007185] text-[13px] group-hover:underline group-hover:text-[#C7511F] line-clamp-2 leading-tight mb-1">
                            Pro-Series Noise Cancelling Wireless Headphones - High Fidelity Audio
                        </span>
                        <Rating rating={4} count={850 + i*50} />
                        <span className="text-[18px] font-medium text-[#0F1111] mt-1">${(149 + i*20)}.99</span>
                        <span className="text-[11px] text-[#565959]">Get it by <span className="font-bold">{dateString}</span></span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}