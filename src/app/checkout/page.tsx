'use client';

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Lock, ChevronDown, Leaf, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, removeFromCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('fastest');

  // Calculations
  const shipping = 0; // Free shipping logic
  const tax = cartTotal * 0.092; // Approx tax from screenshot
  const grandTotal = cartTotal + shipping + tax;

  // Dates for mock delivery
  const fastDate = "Wednesday, Jan 14";
  const slowDate = "Thursday, Jan 15";

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      cart.forEach(item => removeFromCart(item.id)); 
      router.push('/success');
    }, 2000);
  };

  if (cart.length === 0) {
     return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link href="/" className="text-[#007185] hover:underline">Go shopping</Link>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-[#0F1111]">
      
      {/* CHECKOUT HEADER */}
      <div className="bg-linear-to-b from-gray-100 to-gray-200 border-b border-[#D5D9D9] p-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
            <Link href="/" className="text-3xl font-bold tracking-tighter leading-none flex items-center">
              amazon<span className="text-[#0F1111]">.checkout</span>
            </Link>
            <h1 className="text-[24px] font-normal text-[#0F1111] hidden md:block">Checkout (<span className="text-[#007185]">{cartCount} items</span>)</h1>
            <Lock className="w-6 h-6 text-[#565959]" />
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* --- LEFT COLUMN (Main Content) --- */}
            <div className="lg:col-span-9 space-y-4">
                
                {/* 1. SHIPPING ADDRESS */}
                <div className="flex justify-between border-b border-[#D5D9D9] pb-3">
                    <div className="flex gap-6">
                        <h2 className="font-bold text-[18px] w-24 shrink-0">Delivering to Zac Disman</h2>
                        <div className="text-[14px]">
                            <div>1234 Lake Street, LAKE CHARLES, LA, 70611, United States</div>
                            <div className="text-[#007185] hover:underline cursor-pointer mt-1 text-xs">Add delivery instructions</div>
                            <div className="text-[#007185] hover:underline cursor-pointer mt-1 text-xs flex items-center gap-1">
                                FREE pickup available nearby <ChevronDown className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                    <div className="text-[#007185] hover:underline cursor-pointer text-sm">Change</div>
                </div>

                {/* 2. PAYMENT METHOD */}
                <div className="flex justify-between border-b border-[#D5D9D9] pb-3 pt-2">
                     <div className="flex gap-6">
                        <h2 className="font-bold text-[18px] w-24 shrink-0">Paying with Discover 8516</h2>
                        <div className="text-[14px] text-[#007185] hover:underline cursor-pointer">
                            Use a gift card, voucher, or promo code
                        </div>
                    </div>
                    <div className="text-[#007185] hover:underline cursor-pointer text-sm">Change</div>
                </div>

                {/* 3. REVIEW ITEMS (The Big Section) */}
                <div className="border border-[#D5D9D9] rounded-lg mt-4 overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-[18px] font-bold text-[#C7511F] mb-1">Arriving Jan 14, 2026</h2>
                        <div className="text-sm text-[#0F1111] mb-4">If you order in the next <span className="text-[#007600] font-bold">35 minutes</span></div>

                        <div className="flex flex-col md:flex-row gap-6">
                            
                            {/* Product Info */}
                            <div className="flex-1">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 mb-6">
                                        <div className="relative w-24 h-24 shrink-0">
                                            <Image src={item.image} alt={item.title} fill className="object-contain" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-bold line-clamp-2 mb-1">{item.title}</div>
                                            <div className="font-bold text-xs bg-[#B12704] text-white px-1 py-0.5 w-fit rounded-xs mb-1">40% off</div>
                                            <div className="text-[#B12704] text-xs font-bold mb-1">Limited time deal</div>
                                            <div className="font-bold text-[#B12704] mb-1">{formatPrice(item.price)}</div>
                                            <div className="flex items-center gap-1 text-xs mb-1">
                                                <span className="font-bold text-[#00A8E1]">prime</span> & <span className="text-[#565959]">FREE Returns</span> <ChevronDown className="w-3 h-3 text-[#565959]" />
                                            </div>
                                            <div className="text-xs text-[#565959]">Sold by AnkerDirect</div>
                                            
                                            <div className="flex items-center gap-2 mt-2">
                                                <button className="flex items-center gap-1 border border-[#D5D9D9] rounded-[7px] bg-[#F0F2F2] px-2 py-1 text-xs shadow-sm hover:bg-[#E3E6E6]">
                                                    Qty: {item.quantity} <ChevronDown className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="text-[#007185] hover:underline cursor-pointer text-xs mt-2 flex items-center gap-1">
                                                <Plus className="w-3 h-3" /> Add gift options
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Options (Radio Buttons) */}
                            <div className="w-full md:w-75 space-y-3">
                                <label className={`flex gap-2 cursor-pointer p-2 rounded ${deliveryOption === 'fastest' ? 'bg-[#F0F2F2] border border-[#D5D9D9]' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        checked={deliveryOption === 'fastest'}
                                        onChange={() => setDeliveryOption('fastest')}
                                        className="mt-1 accent-[#E77600]"
                                    />
                                    <div className="text-sm">
                                        <div className="font-bold flex justify-between">
                                            <span className="text-[#007600]">Fastest</span> <span>FREE</span>
                                        </div>
                                        <div>{fastDate}</div>
                                    </div>
                                </label>

                                <label className={`flex gap-2 cursor-pointer p-2 rounded ${deliveryOption === 'slow' ? 'bg-[#F0F2F2] border border-[#D5D9D9]' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        checked={deliveryOption === 'slow'}
                                        onChange={() => setDeliveryOption('slow')}
                                        className="mt-1 accent-[#E77600]"
                                    />
                                    <div className="text-sm">
                                        <div className="font-bold flex justify-between">
                                            <span className="text-[#007600]">Amazon Day</span> <span>FREE</span>
                                        </div>
                                        <div>{slowDate}</div>
                                        <div className="text-xs text-[#565959] mt-1 flex items-start gap-1">
                                            <Leaf className="w-3 h-3 text-[#007600]" /> Lower carbon delivery | $1 digital reward <ChevronDown className="w-3 h-3" />
                                        </div>
                                    </div>
                                </label>
                            </div>

                        </div>
                    </div>
                    
                    {/* Grey Footer inside Box */}
                    <div className="bg-[#F0F2F2] p-4 text-xs text-[#565959] border-t border-[#D5D9D9] flex items-center gap-2">
                        <span className="font-bold bg-white border border-[#D5D9D9] px-2 py-0.5 rounded text-[#565959]">S</span>
                        <span>No better price found</span>
                    </div>
                </div>

                {/* 4. BOTTOM ACTION BOX */}
                <div className="border border-[#D5D9D9] rounded-lg p-4 flex items-center justify-between mt-6">
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] px-8 py-2 rounded-[20px] shadow-sm text-sm font-medium disabled:opacity-50"
                    >
                        {isProcessing ? 'Placing order...' : 'Place your order'}
                    </button>
                    
                    <div className="text-right">
                        <div className="text-[18px] font-bold text-[#B12704] mb-1">Order total: {formatPrice(grandTotal)}</div>
                        <div className="text-xs text-[#565959]">By placing your order, you agree to Amazon&apos;s <span className="text-[#007185] hover:underline">privacy notice</span> and <span className="text-[#007185] hover:underline">conditions of use</span>.</div>
                    </div>
                </div>

                {/* Fine Print Footer */}
                <div className="text-[11px] text-[#565959] mt-6 space-y-2">
                    <p>Why has sales tax been applied? <span className="text-[#007185] hover:underline cursor-pointer">See tax and seller information.</span></p>
                    <p>Do you need help? Explore our <span className="text-[#007185] hover:underline cursor-pointer">Help pages</span> or <span className="text-[#007185] hover:underline cursor-pointer">contact us</span></p>
                    <p>For an item sold by Amazon.com: When you click the &quot;Place your order&quot; button, we&apos;ll send you an email message acknowledging receipt of your order.</p>
                </div>

            </div>

            {/* --- RIGHT COLUMN (Sidebar) --- */}
            <div className="lg:col-span-3">
                <div className="border border-[#D5D9D9] rounded-lg p-5 bg-white sticky top-24">
                    <button 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] py-2 rounded-[20px] shadow-sm text-sm font-medium mb-3 cursor-pointer disabled:opacity-50"
                    >
                        {isProcessing ? 'Processing...' : 'Place your order'}
                    </button>
                    
                    <div className="text-xs text-[#565959] text-center mb-4 px-1 leading-tight">
                        By placing your order, you agree to Amazon&apos;s <span className="text-[#007185] hover:underline cursor-pointer">privacy notice</span> and <span className="text-[#007185] hover:underline cursor-pointer">conditions of use</span>.
                    </div>

                    <div className="border-t border-[#D5D9D9] my-3"></div>

                    <h3 className="font-bold text-[18px] mb-3">Order Summary</h3>
                    
                    <div className="space-y-1 text-sm text-[#0F1111]">
                        <div className="flex justify-between">
                            <span>Items:</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping & handling:</span>
                            <span>{formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#D5D9D9] pb-1">
                            <span>Total before tax:</span>
                            <span>{formatPrice(cartTotal + shipping)}</span>
                        </div>
                        <div className="flex justify-between pt-1">
                            <span>Estimated tax to be collected:</span>
                            <span>{formatPrice(tax)}</span>
                        </div>
                    </div>

                    <div className="border-t border-[#D5D9D9] my-4"></div>

                    <div className="flex justify-between text-[18px] font-bold text-[#B12704]">
                        <span>Order Total:</span>
                        <span>{formatPrice(grandTotal)}</span>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
}