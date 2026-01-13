import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper for conditional classes (standard in Shadcn/Modern stacks)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper to format money (e.g., 1299 -> $1,299.00)
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}