'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      
      {/* CARD 1: Pick up where you left off (Multi-item grid) */}
      <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col z-10 h-full">
        <h2 className="text-xl font-bold text-[#0F1111] mb-4">Pick up where you left off</h2>
        <div className="grid grid-cols-2 gap-3 mb-auto">
            {/* 1. Camera */}
            <MiniCard img="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300" label="Cameras" />
            {/* 2. Lens */}
            <MiniCard img="https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=300" label="Lenses" />
            {/* 3. Tripod (Updated Link) */}
            <MiniCard img="https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=300" label="Tripods" />
            {/* 4. Bag/Case (Updated Link) */}
            <MiniCard img="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300" label="Cases" />
        </div>
        <Link href="#" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline mt-4 block">See more</Link>
      </div>

      {/* CARD 2: Tech Deals */}
      <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col z-10 h-full">
        <h2 className="text-xl font-bold text-[#0F1111] mb-4">Deals on PC & Tech</h2>
        <div className="relative w-full h-70 mb-auto">
            <Image 
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800"
                alt="Tech Deals"
                fill
                className="object-cover"
            />
        </div>
        <Link href="#" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline mt-4 block">Shop all tech deals</Link>
      </div>

      {/* CARD 3: Refresh your space */}
      <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col z-10 h-full">
        <h2 className="text-xl font-bold text-[#0F1111] mb-4">Refresh your space</h2>
        <div className="relative w-full h-70 mb-auto">
            <Image 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800"
                alt="Home"
                fill
                className="object-cover"
            />
        </div>
        <Link href="#" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline mt-4 block">See more</Link>
      </div>

      {/* CARD 4: Gift Cards */}
      <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col z-10 h-full">
        <h2 className="text-xl font-bold text-[#0F1111] mb-4">Shop gift cards under $50</h2>
        <div className="relative w-full h-70 mb-auto">
            <Image 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800"
                alt="Gift Cards"
                fill
                className="object-cover"
            />
        </div>
        <Link href="#" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline mt-4 block">Shop gift cards</Link>
      </div>

    </div>
  );
}

function MiniCard({ img, label }: { img: string, label: string }) {
    return (
        <div className="flex flex-col gap-1 cursor-pointer">
            <div className="relative w-full h-24 bg-gray-100">
                <Image src={img} alt={label} fill className="object-cover" />
            </div>
            <span className="text-xs text-gray-700">{label}</span>
        </div>
    )
}