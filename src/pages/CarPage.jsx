import CarDetials from "@/components/CarPageComp/CarDetials";
import ExploreSimilarCars from "@/components/CarPageComp/ExploreSimilarCars";
import React from "react";
import { Navigate, useLoaderData } from "react-router-dom";

function CarPage() {
  const allCars = useLoaderData();
  if (!allCars) {
    return (
      <>
        <div>Car not found, redirecting to cars page...</div>
        {Navigate({ to: "/cars" })}
      </>
    );
  }
  return (
    <>
      <CarDetials allCars={allCars} />
      <ExploreSimilarCars />
    </>
  );
}

export default CarPage;
