import CarSearch from "@/components/CarsRentalPageComp/CarSearch";
import CarsGrid from "@/components/CarsRentalPageComp/CarsGrid";
import Testimonials from "@/layouts/Testimonials";
import React from "react";
import { useLoaderData } from "react-router-dom";

function CarsRentalPage() {
  const allCars = useLoaderData();
  return (
    <>
      <CarSearch allCars={allCars} />
      <CarsGrid allCars={allCars} />
      <Testimonials />
    </>
  );
}

export default CarsRentalPage;
