import React, { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  rating = 0,
  onChange = null,
  readonly = false,
  size = "md",
  showNumber = true,
}) {
  const [hover, setHover] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
  };

  const sizeClass = sizes[size] || sizes.md;

  const handleClick = (value) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hover || rating);
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => !readonly && setHover(star)}
              onMouseLeave={() => !readonly && setHover(0)}
              disabled={readonly}
              className={`${
                readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
              } transition-transform`}
            >
              <Star
                className={`${sizeClass} ${
                  isFilled
                    ? "fill-black text-gray-900"
                    : "text-gray-300"
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {showNumber && rating > 0 && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
