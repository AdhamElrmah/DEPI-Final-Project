import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../UI/button";

export default function ExploreCars({ allCars }) {
  const exploreCars = allCars.slice(26, 32); // أول 6 عربيات

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-12 mx-5 max-md:flex-col max-md:gap-3">
        <h2 className="text-3xl font-extrabold max-sm:text-xl max-md:text-2xl">
          Explore our fleet
        </h2>
        <Button
          size="lg"
          className=" text-sm font-bold py-2.5 px-5 rounded-lg hover:opacity-80 transition"
        >
          <Link to="/cars">See All Cars</Link>
        </Button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 ">
        {exploreCars.map((car) => (
          <Link to={`/cars/${car.id}`}>
            <div
              key={car.id}
              className="bg-white rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition duration-300 overflow-hidden group p-6 flex flex-col gap-6"
            >
              {/* Image Wrapper */}
              <div className="relative overflow-hidden rounded-md h-[216px] w-[100%]">
                <img
                  src={car.images.main}
                  alt={car.make}
                  className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Arrow Button */}
                <Button
                  size="lg"
                  className="absolute bottom-3 right-3 h-12 w-12 bg-black text-white p-2 rounded-sm opacity-0 group-hover:opacity-100 transition duration-700"
                >
                  <ArrowRight className="h-20" />
                </Button>
              </div>

              {/* Card Content */}
              <div className="flex items-center gap-2 mb-1 ">
                <div className="w-12 h-12 rounded-full border-2">
                  <img
                    src={car.logo}
                    alt={car.make}
                    className="rounded-full w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl ">
                    {car.make + " " + car.model}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {car.transmission} • {car.drivetrain}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-extrabold text-xl">
                  ${car.price_per_day + ".00"}{" "}
                  <span className="font-normal text-sm opacity-70 ">/day</span>
                </p>
                <Button className="cursor-pointer font-bold text-sm rounded-3xl ">
                  Learn More
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
