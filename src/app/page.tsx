import Hero from "@/components/ui/Hero";
import HomeCards from "@/components/ui/HomeCards";
import ProductRow from "@/components/ui/ProductRow"; // <--- Import this
import { products } from "@/lib/placeholder-data";

export default function Home() {
  const bestSellers = products.slice(0, 4);
  const homeItems = products.filter(p => p.category === 'Home' || p.category === 'Electronics');
  const history = products.reverse();

  return (
    <main className="min-h-screen bg-gray-100 pb-10">
      <Hero />
      
      <div className="container mx-auto max-w-375">
        
        {/* 1. Mosaic Cards (Negative Margin Overlap) */}
        <div className="relative z-20 -mt-32 md:-mt-64 mb-6">
          <HomeCards />
        </div>

        {/* 2. Main Content Stack */}
        <div className="px-4 flex flex-col gap-6">
          
          {/* Row 1: Best Sellers */}
          <ProductRow title="Best Sellers in Electronics" products={products} />

          {/* Row 2: Browsing History (Mimicking Amazon's layout) */}
          <ProductRow title="Your Browsing History" products={history} />

          {/* Row 3: Specific Category */}
          <ProductRow title="Top Sellers in Home & Kitchen" products={homeItems} />

          {/* Row 4: Trending */}
          <ProductRow title="Trending Now" products={bestSellers} />
          
          {/* Bottom Divider / End of content message */}
          <div className="border-t border-gray-300 my-8 pt-8">
             <div className="flex flex-col items-center justify-center gap-2">
                <div className="text-xs text-gray-600">See personalized recommendations</div>
                <button className="bg-[#FFD814] border border-[#FCD200] rounded-md px-20 py-1 text-sm font-bold text-[#0F1111] shadow-sm hover:bg-[#F7CA00]">
                  Sign in
                </button>
                <div className="text-xs text-gray-600">New customer? <span className="text-[#007185] cursor-pointer hover:underline">Start here.</span></div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}