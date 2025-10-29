import CarDetials from "@/components/CarPageComp/CarDetials";
import ExploreSimilarCars from "@/components/CarPageComp/ExploreSimilarCars";
import Testimonials from "@/layouts/Testimonials";
import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";

function CarPage() {
  const car = useLoaderData();
  if (!car) {
    return (
      <>
        <div>Car not found, redirecting to cars page...</div>
        {Navigate({ to: "/cars" })}
      </>
    );
  }
  return (
    <>
      <CarDetials car={car} />
      <ExploreSimilarCars />
      <Testimonials />
    </>
  );
}

export default CarPage;
