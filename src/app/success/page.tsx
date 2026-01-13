'use client';

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-[#007600] mb-4">
            <CheckCircle className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F1111] mb-2">Order placed, thanks!</h1>
        <p className="text-[#0F1111] mb-6">Confirmation will be sent to your email.</p>
        
        <div className="flex gap-4">
            <Link href="/" className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] px-6 py-2 rounded-lg text-sm shadow-sm font-medium text-[#0F1111]">
                Review or edit your recent orders
            </Link>
        </div>
    </div>
  );
}