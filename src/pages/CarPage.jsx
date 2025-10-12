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
  return <div>the is {car.make}</div>;
}

export default CarPage;
