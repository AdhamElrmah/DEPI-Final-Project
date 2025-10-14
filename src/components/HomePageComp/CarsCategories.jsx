import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories1.avif";
import Image2 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories2.avif";
import Image3 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories3.avif";
import Image4 from "../../assets/HomePage/CarsCategoriesImages/CarsCategories4.avif";

function CarCategories() {
  const categories = [
    { image: Image1, name: "Exotic Cars", number: 8 },
    { image: Image2, name: "Sport Cars", number: 16 },
    { image: Image3, name: "SUV", number: 9 },
    { image: Image4, name: "Luxury Cars", number: 24 },
  ];

  return (
    <section>
      <h2>Check out car categories</h2>
      <div>
        {categories.map((categorie, i) => (
          <>
            <Link to={"cars"}>
              <img key={`car-a-${i}`} src={categorie.image} alt={`car-${i}`} />
              <h3>{categorie.name}</h3>
              <span>{categorie.number}</span>
            </Link>
          </>
        ))}
      </div>
    </section>
  );
}

export default CarCategories;
