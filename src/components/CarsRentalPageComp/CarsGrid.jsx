import React, { useState } from "react";
import CarCard from "../../layouts/CarCard";
import CarCategoriesTabs from "@/components/CarsRentalPageComp/CarCategoriesTabs";

function CarsGrid({ allCars }) {
  const [selectedCategory, setSelectedCategory] = useState("Economy Cars");
  const selectedCar = selectedCategory.split(" ")[0];
  return (
    <>
      <CarCategoriesTabs onSelect={setSelectedCategory} />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-9 pb-20 max-w-[1280px] mx-auto">
        {allCars.map(
          (car) =>
            car.rental_class === selectedCar && (
              <CarCard
                car={car}
                key={car.id}
                selectedCategory={selectedCategory}
              />
            )
        )}
      </ul>
    </>
  );
}

export default CarsGrid;
