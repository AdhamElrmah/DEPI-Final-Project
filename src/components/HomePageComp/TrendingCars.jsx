import React from "react";
import { Link } from "react-router-dom";

function TrendingCars({ allCars }) {
  const trendingCars = allCars.filter(
    (car) =>
      car.id === "2019-ferrari-488-gtb" ||
      car.id === "2022-bugatti-chiron-sport" ||
      car.id === "2022-lamborghini-aventador"
  );

  return (
    <>
      {trendingCars.map((car) => (
        <div key={car.id}>
          <Link to={`/cars/${car.id}`} style={{ color: "red" }}>
            {car.make}
          </Link>
        </div>
      ))}
    </>
  );
}

export default TrendingCars;
