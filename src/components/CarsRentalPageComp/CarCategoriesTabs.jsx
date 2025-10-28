import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function CarCategoriesTabs({ onSelect }) {
  const [active, setActive] = useState("Economy Cars");
  const categories = [
    "Economy Cars",
    "Exotic Cars",
    "Sport Cars",
    "Luxury Cars",
    "SUV",
  ];
  const handleClick = (category) => {
    setActive(category);
    onSelect?.(category);
  };

  return (
    <div className="flex flex-wrap justify-center gap-1.5 p-6">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => handleClick(category)}
          className={`rounded-full px-6 py-5 shadow-lg font-bold text-xs transition-all duration-200
            ${
              active === category
                ? "bg-black text-white shadow-md hover:bg-black hover:text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
export default CarCategoriesTabs;
