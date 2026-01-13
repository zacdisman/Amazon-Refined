import { products } from "@/lib/placeholder-data";
import ProductDetails from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";

// 1. Define the Params type as a Promise (Next.js 15 Standard)
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 2. Await the params before using them
  const resolvedParams = await params;
  
  // 3. Now we can safely access the ID
  const product = products.find((p) => p.id === resolvedParams.id);

  // If no product found, show the 404 page
  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <ProductDetails product={product} />
    </main>
  );
}