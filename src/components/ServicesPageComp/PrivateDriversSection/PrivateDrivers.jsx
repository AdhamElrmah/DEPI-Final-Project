// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React from "react";
import DriverCard from "./DriverCard";
import Driver1 from "../../../assets/ServicesPage/Driver1.avif";
import Driver2 from "../../../assets/ServicesPage/Driver2.avif";
import Driver3 from "../../../assets/ServicesPage/Driver3.avif";
import Driver4 from "../../../assets/ServicesPage/Driver4.avif";
import Driver5 from "../../../assets/ServicesPage/Driver5.avif";
import Driver6 from "../../../assets/ServicesPage/Driver6.avif";
import CardsShow from "./CardsShow";

const drivers = [
  { id: 1, name: "Vincent Luggers", carModel: "Mercedes-Benz", image: Driver2 },
  { id: 2, name: "Vladěna Klímková", carModel: "BMW", image: Driver3 },
  { id: 3, name: "Thomas Kukabango", carModel: "Bentley", image: Driver1 },
  { id: 4, name: "Okazaki Suzuko", carModel: "Lexus", image: Driver4 },
  { id: 5, name: "Xenie Dolezelov", carModel: "Lincoln", image: Driver5 },
  { id: 6, name: "Stormie Hansford", carModel: "Infiniti", image: Driver6 },
];

function PrivateDrivers() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto text-center sm:text-left">
          <div className="mb-8">
            <p className="text-gray-500 text-lg mb-3">Private drivers</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold leading-snug ">
                Meet our team of highly professional private drivers ready for
                servicing any of client's needs. Nothing looks more menacing
                than a hooded limousine. Life is what happens to you while
                you're busy making other plans.
              </h2>

              <p className="text-gray-900 text-sm leading-relaxed">
                So, why bother to rent one and ride in one when you can drive
                yourself in a car like this. Nothing looks more menacing than a
                hooded limousine. Life is what happens to you while you're busy
                making other plans.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      <CardsShow
        cards={drivers}
        renderCards={(driver) => {
          return (
            <DriverCard
              name={driver.name}
              carModel={driver.carModel}
              image={driver.image}
            />
          );
        }}
      />
    </>
  );
}

export default PrivateDrivers;
