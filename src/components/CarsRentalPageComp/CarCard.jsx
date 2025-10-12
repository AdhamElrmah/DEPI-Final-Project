import React from "react";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return <li>{car.make === "BMW" && <Link to={car.id}>{car.make}</Link>}</li>;
}

export default CarCard;
