import React from "react";
import CarCard from "./CarCard";
import CarCategoriesTabs from "@/components/CarsRentalPageComp/CarCategoriesTabs";

function CarsGrid({ car }) {
  return (
    <>
      <CarCategoriesTabs />

      <ul>
        {car.map((car) => (
          <CarCard car={car} key={car.id} />
        ))}
      </ul>
    </>
  );
}

export default CarsGrid;
