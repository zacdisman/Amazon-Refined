'use client';

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Check, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// --- TYPES ---
interface ItemData {
  title: string;
  price: number;
  img: string;
  inStock?: boolean;
  lastPurchased?: string;
  rating?: number;
  count?: number;
}

export default function CartPage() {
    const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [activeTab, setActiveTab] = useState<'saved' | 'buy-again'>('saved');

  // --- MOCK DATA ---

  const savedItems: ItemData[] = [
    { title: "30 Pairs Low Cut Ankle Socks", price: 14.99, img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=200", inStock: true },
    { title: "Mystical Forest Frog Blanket", price: 19.98, img: "https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=200", inStock: true },
    { title: "Spa Gifts for Women", price: 35.99, img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=200", inStock: true },
    { title: "Electric Heating Pad", price: 39.99, img: "https://images.unsplash.com/photo-1519415510236-718bdfcd4788?q=80&w=200", inStock: true }, // Fixed
  ];

  const buyAgainItems: ItemData[] = [
    { title: "AA Batteries (48 Count)", price: 15.49, img: "https://images.unsplash.com/photo-1619623624895-c1f0165b4c44?q=80&w=200", lastPurchased: "2 weeks ago" },
    { title: "Protein Powder - Chocolate", price: 29.99, img: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=200", lastPurchased: "1 month ago" },
    { title: "Cat Food Variety Pack", price: 22.50, img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200", lastPurchased: "3 weeks ago" },
    { title: "Printer Paper (500 Sheets)", price: 8.99, img: "https://images.unsplash.com/photo-1586075010923-2dd45eeed8bd?q=80&w=200", lastPurchased: "2 months ago" },
  ];

  const relatedItems: ItemData[] = [
    { title: "Soundcore P30i Noise Cancelling Earbuds", price: 29.99, rating: 4.5, count: 22888, img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=200" },
    { title: "Silicone Case for Soundcore", price: 8.99, rating: 4.5, count: 47, img: "https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?q=80&w=200" }, // Fixed
    { title: "Soundcore P31i Hybrid Earbuds", price: 42.99, rating: 4.5, count: 973, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200" },
  ];

  const historyItems: ItemData[] = [
    { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200", title: "Nike Air Max 270", price: 129.99, rating: 5, count: 450 },
    { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200", title: "Sony WH-1000XM4", price: 348.00, rating: 4.5, count: 12450 },
    { img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=200", title: "Polaroid OneStep+", price: 99.99, rating: 4, count: 890 },
    { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200", title: "Smart Watch Series 5", price: 299.00, rating: 4.5, count: 3200 },
    { img: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=200", title: "Hiking Backpack 40L", price: 45.99, rating: 4.5, count: 120 },
    { img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=200", title: "Dell XPS 13 Laptop", price: 999.99, rating: 4.5, count: 560 },
  ];

  // EMPTY STATE
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#EAEDED] p-8">
        <div className="container mx-auto max-w-5xl bg-white p-8 shadow-sm rounded-sm flex flex-col items-center justify-center min-h-100">
           <div className="relative w-64 h-48 mb-6">
                <Image 
                    src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" 
                    alt="Empty Cart" 
                    fill
                    className="object-contain"
                />
           </div>
           <h1 className="text-2xl font-bold mb-2">Your Amazon Cart is empty</h1>
           <Link href="/" className="text-[#007185] hover:text-[#C7511F] hover:underline mb-6">
             Shop today&apos;s deals
           </Link>
           <div className="flex gap-4">
                <Link href="/" className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] px-6 py-2 rounded-lg text-sm shadow-sm font-medium text-[#0F1111]">
                    Sign in to your account
                </Link>
                <button className="border border-[#D5D9D9] px-6 py-2 rounded-lg text-sm shadow-sm hover:bg-[#F7FAFA]">
                    Sign up now
                </button>
           </div>
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-[#EAEDED] pb-10">
      
      {/* 1. TOP BANNER */}
      <div className="bg-white border-b border-[#D5D9D9] mb-4">
        <div className="container mx-auto max-w-375 px-4 py-3 flex items-center justify-center gap-2 text-sm">
            <span>Zac, get a $100 Amazon Gift Card upon approval for Prime Visa.</span>
            <Link href="#" className="text-[#007185] hover:underline hover:text-[#C7511F]">Find out how</Link>
            <div className="ml-4 font-bold">
                Apply and pay only <span className="line-through text-[#565959]">{formatPrice(cartTotal)}</span> <span className="text-[#B12704]">$0.00</span> for this order
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-375">
        {/* --- MAIN GRID (Cart + Sidebar) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* LEFT COLUMN (Span 9) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* A. ACTIVE CART ITEMS */}
            <div className="bg-white p-6 shadow-sm rounded-sm">
                <div className="flex items-end justify-between border-b border-[#D5D9D9] pb-3 mb-4">
                    <h1 className="text-[28px] font-normal text-[#0F1111] leading-none">Shopping Cart</h1>
                    <span className="text-[#565959] text-sm">Price</span>
                </div>
                <div className="text-sm text-[#007185] hover:underline hover:text-[#C7511F] cursor-pointer mb-2">Deselect all items</div>

                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-[#D5D9D9] pb-6 last:border-0 relative">
                            {/* Checkbox */}
                            <input type="checkbox" checked className="mt-8 accent-[#007185] w-4 h-4 cursor-pointer" readOnly />

                            {/* Image */}
                            <Link href={`/product/${item.id}`} className="shrink-0">
                                <div className="relative w-45 h-45">
                                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                                </div>
                            </Link>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex justify-between w-full">
                                            <Link href={`/product/${item.id}`} className="text-[18px] font-medium text-[#0F1111] hover:underline hover:text-[#C7511F] leading-snug line-clamp-2 max-w-xl">
                                                {item.title}
                                            </Link>
                                        </div>
                                        
                                        <div className="text-[12px] font-bold text-[#B12704] mt-1">Limited time deal</div>
                                        <div className="text-[12px] text-[#007600] mt-0.5">In Stock</div>
                                        
                                        {item.isPrime && (
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <div className="text-[#00A8E1] font-bold text-[12px] italic flex items-center">
                                                    <Check className="w-3 h-3 bg-[#F7CA00] text-white rounded-full p-0.5 mr-1" />
                                                    prime
                                                </div>
                                                <span className="text-[12px] text-[#565959] font-bold">Two-Day</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center gap-1 mt-0.5 text-[12px] text-[#565959]">
                                            <input type="checkbox" />
                                            <span>This is a gift <span className="text-[#007185] hover:underline cursor-pointer">Learn more</span></span>
                                        </div>
                                    </div>
                                    
                                    {/* Price (Right Side) */}
                                    <div className="text-right">
                                        <div className="bg-[#CC0C39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-xs inline-block mb-1">-13%</div>
                                        <div className="text-[18px] font-bold text-[#0F1111]">{formatPrice(item.price)}</div>
                                        <div className="text-[12px] text-[#565959] line-through decoration-1">{formatPrice(item.price * 1.15)}</div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-3 mt-3">
                                    <div className="shadow-sm rounded-[7px] bg-[#F0F2F2] border border-[#D5D9D9] hover:bg-[#E3E6E6] p-0">
                                        <select 
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="bg-transparent border-0 py-1 pl-2 pr-1 text-[13px] focus:ring-0 cursor-pointer shadow-sm rounded-[7px]"
                                        >
                                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                                <option key={num} value={num}>Qty: {num}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="h-4 w-px bg-[#D5D9D9]"></div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-[12px] text-[#007185] hover:underline hover:text-[#C7511F]">Delete</button>
                                    <div className="h-4 w-px bg-[#D5D9D9]"></div>
                                    <button className="text-[12px] text-[#007185] hover:underline hover:text-[#C7511F]">Save for later</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-right text-[18px] mt-2 pt-2">
                    Subtotal ({cartCount} item): <span className="font-bold">{formatPrice(cartTotal)}</span>
                </div>
            </div>

            {/* B. "YOUR ITEMS" TABS (Saved / Buy Again) */}
            <div className="bg-white p-6 shadow-sm rounded-sm">
                <h2 className="text-[24px] font-bold text-[#0F1111] mb-4">Your Items</h2>
                
                {/* Tabs */}
                <div className="flex border-b border-[#D5D9D9] mb-4 text-sm font-medium">
                    <button 
                        onClick={() => setActiveTab('saved')}
                        className={`px-4 py-2 ${activeTab === 'saved' ? 'border-b-2 border-[#E77600] text-[#0F1111] font-bold' : 'text-[#565959] hover:text-[#C7511F]'}`}
                    >
                        Saved for later ({savedItems.length} items)
                    </button>
                    <button 
                        onClick={() => setActiveTab('buy-again')}
                        className={`px-4 py-2 ${activeTab === 'buy-again' ? 'border-b-2 border-[#E77600] text-[#0F1111] font-bold' : 'text-[#565959] hover:text-[#C7511F]'}`}
                    >
                        Buy it again
                    </button>
                </div>

                {/* Grid Content based on Tab */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {activeTab === 'saved' ? (
                        savedItems.map((item, i) => (
                            <ItemCard key={i} item={item} btnText="Move to cart" />
                        ))
                    ) : (
                        buyAgainItems.map((item, i) => (
                            <ItemCard key={i} item={item} btnText="Add to Cart" subtitle={`Last bought ${item.lastPurchased}`} />
                        ))
                    )}
                </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
             {/* CHECKOUT BOX */}
             <div className="bg-white p-5 shadow-sm rounded-sm sticky top-4">
                {cartTotal >= 35 && (
                    <div className="flex items-start gap-2 mb-3 text-[12px] text-[#007600]">
                        <div className="bg-[#007600] text-white rounded-full p-px shrink-0 mt-0.5"><Check className="w-3 h-3" /></div>
                        <span className="leading-tight">
                            <span className="font-bold text-[#007600]">Your order qualifies for FREE Shipping.</span> Choose this option at checkout. <span className="text-[#007185] hover:underline cursor-pointer">See details</span>
                        </span>
                    </div>
                )}
                
                <div className="text-[18px] mb-4 leading-tight">
                    Subtotal ({cartCount} item): <span className="font-bold">{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex items-center gap-2 mb-4 text-[13px]">
                    <input type="checkbox" className="accent-[#007185]" />
                    <span>This order contains a gift</span>
                </div>

                <button onClick={() => router.push('/checkout')} className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] py-1.5 rounded-lg shadow-sm text-[13px] font-medium text-[#0F1111] mb-4 cursor-pointer">
                    Proceed to checkout
                </button>
             </div>

             {/* RELATED SIDEBAR */}
             <div className="bg-white p-4 shadow-sm rounded-sm">
                <h3 className="font-bold text-[16px] mb-4 leading-tight">Related products with fast delivery</h3>
                <div className="flex flex-col gap-6">
                    {relatedItems.map((item, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="relative w-25 h-25 shrink-0">
                                <Image src={item.img} alt="Upsell" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <Link href="#" className="text-[13px] text-[#007185] hover:underline hover:text-[#C7511F] line-clamp-3 leading-snug mb-1">{item.title}</Link>
                                <div className="flex text-[#F4A41D] mb-1">
                                    <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 text-[#DE7921]" />
                                    <span className="text-[11px] text-[#007185] ml-1">{item.count}</span>
                                </div>
                                <div className="text-[#B12704] text-[15px] font-bold mb-1">{formatPrice(item.price)}</div>
                                <button className="text-[11px] bg-[#FFD814] border border-[#FCD200] px-3 py-1 rounded-[20px] shadow-sm hover:bg-[#F7CA00] w-fit">Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>

        {/* --- FULL WIDTH CAROUSELS --- */}
        <div className="space-y-6">
            {/* 1. Customers who bought... */}
            <CarouselSection title="Customers Who Bought Items in Your Recent History Also Bought" items={[...historyItems].reverse()} />

            {/* 2. Trending */}
            <CarouselSection title="Recommended based on your shopping trends" items={historyItems.slice(0, 4)} />

            {/* 3. Browsing History */}
            <CarouselSection title="Your Browsing History" items={historyItems} />
        </div>
        
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function ItemCard({ item, btnText, subtitle }: { item: ItemData, btnText: string, subtitle?: string }) {
    return (
        <div className="border border-[#D5D9D9] rounded-sm p-3 flex flex-col bg-white">
            <div className="relative h-40 w-full mb-2">
                <Image src={item.img} alt={item.title} fill className="object-contain" />
            </div>
            <Link href="#" className="text-[#007185] text-[13px] hover:underline hover:text-[#C7511F] line-clamp-2 leading-tight mb-1">
                {item.title}
            </Link>
            <div className="text-[18px] font-bold text-[#B12704] mt-auto">{formatPrice(item.price)}</div>
            {subtitle && <div className="text-[11px] text-[#565959] mb-1">{subtitle}</div>}
            <div className="text-[12px] text-[#007600] mb-2">In Stock</div>
            <button className="w-full border border-[#D5D9D9] bg-white hover:bg-[#F7FAFA] py-1 rounded-lg text-[13px] shadow-sm">
                {btnText}
            </button>
        </div>
    );
}

function CarouselSection({ title, items }: { title: string, items: ItemData[] }) {
    return (
        <div className="bg-white p-6 shadow-sm rounded-sm">
            <div className="flex items-center justify-between mb-4">
                 <h2 className="text-[20px] font-bold text-[#0F1111]">{title}</h2>
                 <div className="text-xs text-[#565959]">Page 1 of 3</div>
            </div>
            <div className="relative group">
                {/* Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {items.map((item, i) => (
                        <div key={i} className="min-w-45 w-45 snap-start flex flex-col">
                            <div className="relative w-full h-45 mb-2 border border-transparent hover:border-[#D5D9D9] rounded p-1">
                                <Image src={item.img} alt={item.title} fill className="object-contain" />
                            </div>
                            <Link href="#" className="text-[#007185] text-[13px] hover:underline hover:text-[#C7511F] line-clamp-2 leading-tight h-8 mb-1">
                                {item.title}
                            </Link>
                            <div className="flex text-[#F4A41D] mb-1">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className={`w-3 h-3 ${j < Math.floor(item.rating || 5) ? 'fill-current' : 'text-[#DE7921]'}`} />
                                ))}
                                <span className="text-[11px] text-[#007185] ml-1">{item.count || 100}</span>
                            </div>
                            <div className="text-[#B12704] text-[15px] font-bold mb-1">{formatPrice(item.price)}</div>
                            <button className="text-[11px] bg-[#FFD814] border border-[#FCD200] px-3 py-1 rounded-[20px] shadow-sm hover:bg-[#F7CA00] w-fit mt-1">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                {/* Mock Arrows */}
                <button className="absolute left-0 top-1/3 p-3 bg-white border border-[#D5D9D9] shadow-md rounded-r opacity-0 group-hover:opacity-100 transition"><ChevronLeft className="w-5 h-5" /></button>
                <button className="absolute right-0 top-1/3 p-3 bg-white border border-[#D5D9D9] shadow-md rounded-l opacity-0 group-hover:opacity-100 transition"><ChevronRight className="w-5 h-5" /></button>
            </div>
        </div>
    );
}