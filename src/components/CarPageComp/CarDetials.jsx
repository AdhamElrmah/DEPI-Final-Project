import React from "react";

function CarDetials({ allCars }) {
  return (
    <div>
      this is {allCars.make}
      <img src={allCars.images.main} alt={allCars.id} />
    </div>
  );
}

export default CarDetials;
