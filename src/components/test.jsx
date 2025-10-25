import React from "react";
import { Link } from "react-router-dom";
import Shape from "../../assets/HomePage/TrendingCarsImages/BackgroundRoundShape.svg";
import ferrari from "../../assets/HomePage/TrendingCarsImages/2019-ferrari-488-gtb.avif";
import bugatti from "../../assets/HomePage/TrendingCarsImages/2022-bugatti-chiron-sport.avif";
import lamborghini from "../../assets/HomePage/TrendingCarsImages/2022-lamborghini-aventador.avif";

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
            <img
              src={
                car.id === "2019-ferrari-488-gtb"
                  ? ferrari
                  : car.id === "2022-bugatti-chiron-sport"
                  ? bugatti
                  : lamborghini
              }
              alt={car.make}
            />
            {car.make}
          </Link>
        </div>
      ))}
    </>
  );
}

export default TrendingCars;
