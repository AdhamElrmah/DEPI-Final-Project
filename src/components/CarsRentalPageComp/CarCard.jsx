import React from "react";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <li>
      <Link to={car.id}>
        {car.make}
        <img src={car.images.main} alt={car.id} />
      </Link>
    </li>
  );
}

export default CarCard;
