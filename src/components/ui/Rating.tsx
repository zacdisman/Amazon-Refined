import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number; // e.g. 4.5
  count?: number; // e.g. 1200 reviews
}

export default function Rating({ rating, count }: RatingProps) {
  // Create an array of 5 items to map through
  return (
    <div className="flex items-center gap-1 mb-1">
      <div className="flex text-[#F4A41D]">
        {[1, 2, 3, 4, 5].map((star) => {
          if (rating >= star) {
            return <Star key={star} className="w-4 h-4 fill-current" />;
          } else if (rating >= star - 0.5) {
            return <StarHalf key={star} className="w-4 h-4 fill-current" />;
          } else {
            return <Star key={star} className="w-4 h-4 text-gray-300" />;
          }
        })}
      </div>
      {count && <span className="text-xs text-[#007185] hover:underline cursor-pointer">{count.toLocaleString()}</span>}
    </div>
  );
}