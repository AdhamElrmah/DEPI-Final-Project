// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";
import Shape from "../../assets/HomePage/TrendingCarsImages/BackgroundRoundShape.svg";
import ferrari from "../../assets/HomePage/TrendingCarsImages/2019-ferrari-488-gtb.avif";
import bugatti from "../../assets/HomePage/TrendingCarsImages/2022-bugatti-chiron-sport.avif";
import lamborghini from "../../assets/HomePage/TrendingCarsImages/2022-lamborghini-aventador.avif";
import { Button } from "@/components/ui/button";

function TrendingCars({ allCars }) {
  const trendingCars = allCars.filter(
    (car) =>
      car.id === "2019-ferrari-488-gtb" ||
      car.id === "2022-bugatti-chiron-sport" ||
      car.id === "2022-lamborghini-aventador"
  );

  const carImages = {
    "2019-ferrari-488-gtb": ferrari,
    "2022-bugatti-chiron-sport": bugatti,
    "2022-lamborghini-aventador": lamborghini,
  };

  const carNames = {
    "2019-ferrari-488-gtb": "Ferrari 488 GTB",
    "2022-bugatti-chiron-sport": "Bugatti Chiron",
    "2022-lamborghini-aventador": "Lamborghini",
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className=" px-6 md:pb-12 md:px-8  max-w-[1500px] mx-auto"
    >
      <h2 className="text-3xl font-extrabold text-center md:text-left mb-10 max-sm:text-xl max-md:text-2xl">
        Explore trending cars
      </h2>
      <div className="flex flex-row  max-w-7xl w-full mx-auto ">
        {trendingCars.map((car, i) => (
          <div
            key={i}
            className={`trending relative h-[600px] ${
              i == 1
                ? "bg-[#E6E6E6] max-md:rounded-md max-xl:rounded-l-lg"
                : i == 2
                ? "bg-[#E0E0E0] max-md:hidden rounded-r-md"
                : "bg-[#F2F2F2] max-xl:hidden rounded-l-md"
            }  p-8 overflow-hidden group flex-1 transition-all duration-500`}
          >
            <Link to={`/cars/${car.id}`}>
              {/* الشكل الخلفي */}
              <img
                src={Shape}
                alt=""
                className="absolute max-sm:top-80 top-72 left-36  opacity-20 group-hover:opacity-70 transition duration-500 "
              />

              {/* محتوى النص */}
              <div className="relative z-10 mb-6">
                <p className="text-gray-700 text-sm text-nowrap font-normal mb-2">
                  Rent from{" "}
                  <span className="font-bold text-black">
                    ${car.price_per_day}
                  </span>{" "}
                  per day
                </p>

                <h3 className="text-4xl font-extrabold mb-4 leading-tight ">
                  {carNames[car.id]}
                </h3>

                <div className="text-gray-700 space-y-1 mb-8 text-nowrap">
                  <p className="text-sm font-normal">
                    Engine{" "}
                    <span className="font-bold text-black">
                      {car.engine.displacement + " " + car.engine.configuration}
                    </span>
                  </p>
                  <p className="text-sm font-normal">
                    Power{" "}
                    <span className="font-bold text-black">
                      {car.engine.power_hp}
                    </span>
                  </p>
                  <p className="text-sm font-normal">
                    Transmission{" "}
                    <span className="font-bold text-black">
                      {car.transmission}
                    </span>
                  </p>
                </div>

                <Button
                  size="lg"
                  className="bg-black text-white cursor-pointer font-bold text-sm "
                >
                  Learn More
                </Button>
              </div>

              {/* صورة العربية */}
              <img
                src={carImages[car.id]}
                alt={car.make}
                className="absolute bottom-8 left-1/2 -translate-x-1/2  filter grayscale group-hover:grayscale-0 transition-all duration-500 z-10"
              />
            </Link>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default TrendingCars;
