import CarSearch from "@/components/CarsRentalPageComp/CarSearch";
import CarsGrid from "@/components/CarsRentalPageComp/CarsGrid";
import Testimonials from "@/layouts/Testimonials";
import React from "react";
import { useLoaderData } from "react-router-dom";

function CarsRentalPage() {
  const car = useLoaderData();
  return (
    <>
      <CarSearch />
      <CarsGrid car={car} />
      <Testimonials />
    </>
  );
}

export default CarsRentalPage;
