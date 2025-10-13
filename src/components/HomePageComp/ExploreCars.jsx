import React from "react";
import { Link } from "react-router-dom";

function ExploreCars({ allCars }) {
  const exploreCars = allCars.slice(30, 36);

  return (
    <>
      {exploreCars.map((car) => (
        <div key={car.id}>
          <Link to={`/cars/${car.id}`} style={{ color: "blue" }}>
            {car.make}
          </Link>
        </div>
      ))}
    </>
  );
}

export default ExploreCars;
