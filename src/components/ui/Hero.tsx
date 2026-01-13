'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "The New Standard.",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Next Gen Gaming.",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Sound Redefined.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2500&auto=format&fit=crop",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    // REMOVED mt-4 to fix the gap
    <div className="relative w-full max-w-375 mx-auto h-75 md:h-150 overflow-hidden bg-gray-900 group">
      
      {/* SLIDES */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].image}
            alt="Hero Slide"
            fill
            className="object-cover object-top"
            priority
          />
          {/* Gradient Overlay for Fade Bottom effect */}
          <div className="absolute inset-0 bg-linear-to-t from-gray-100 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* CONTROLS */}
      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-4 h-64 hover:border-2 border-white/50 rounded-sm text-transparent hover:text-gray-800 transition flex items-center justify-center">
        <ChevronLeft className="w-12 h-12" />
      </button>

      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-4 h-64 hover:border-2 border-white/50 rounded-sm text-transparent hover:text-gray-800 transition flex items-center justify-center">
        <ChevronRight className="w-12 h-12" />
      </button>
    </div>
  );
}