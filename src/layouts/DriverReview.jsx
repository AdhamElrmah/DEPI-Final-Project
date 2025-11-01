import React from "react";
import { motion } from "framer-motion";
import icon from "../assets/ServicesPage/icon.svg";
function driverReview() {
  return (
    <>
      <motion.section
        className="py-14 px-8 max-w-3xl mx-auto "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-3xl mx-auto text-center sm:text-left">
          <div className="mb-2">
            <p className="text-gray-500 text-lg mb-3">We're here to help you</p>

            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold leading-snug ">
                In any industry where the people behind a company are as
                important as the company itself, you're likely to find a kind of
                expanded page that includes information on individual employees.
              </h2>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-4 items-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent/60 flex items-center justify-center">
              <img
              src={icon} 
              alt="icon"
              className="w-8 h-7 sm:w-10 sm:h-8 " />
            </div>
          <div className="flex-1 pt-1">
            <h3 className="text-lg sm:text-xl font-bold mb-2 ">
              Experienced drivers
            </h3>
            <p className=" text-gray-500 text-md ">
              at least 5 years of driving experience
            </p>
          </div>
        </div>
        </div>
      </motion.section>
    </>
  );
}

export default driverReview;

