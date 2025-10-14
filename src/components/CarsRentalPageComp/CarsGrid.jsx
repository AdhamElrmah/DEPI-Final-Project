import React, { useState } from "react";
import CarCard from "./CarCard";
import CarCategoriesTabs from "@/components/CarsRentalPageComp/CarCategoriesTabs";

function CarsGrid({ allCars }) {
  const [selectedCategory, setSelectedCategory] = useState("Economy Cars");
  const selectedCar = selectedCategory.split(" ")[0];
  return (
    <>
      <CarCategoriesTabs onSelect={setSelectedCategory} />

      <ul>
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
