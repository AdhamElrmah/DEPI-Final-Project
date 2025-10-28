// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchOverlay from "@/layouts/SearchOverlay";
import { Search } from "lucide-react";
function CarSearch({ allCars }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const container = {
    hidden: { opacity: 0, scale: 1.06 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 1.06 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="relative pb-13 xl:pb-8"
      >
        <div className="relative flex flex-col items-center justify-center  bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden py-5">
          <img
            src="/src/assets/CarsRentalPage/SearchBackGround.avif"
            alt="Background"
            className="absolute xl:right-5 xl:-top-15 -top-8 w-auto h-auto max-w-[820px] object-contain opacity-90 sm:-right-60 sm:-top-20 "
          />
          <div>
            <motion.h2
              variants={item}
              className="relative text-[48px] md:text-6xl font-extrabold text-gray-900 mb-1 xl:mb-11 text-center mt-24 xl:mt-21 "
            >
              All Cars
            </motion.h2>
          </div>
        </div>

        <motion.div className="flex justify-center">
          {searchOpen && (
            <SearchOverlay allCars={allCars} setSearchOpen={setSearchOpen} />
          )}

          <Button
            onClick={() => setSearchOpen(!searchOpen)}
            variant="ghost"
            className="mt-6 hover:bg-transparent group"
          >
            <motion.div
              variants={item}
              className=" absolute top-48 xl:top-46 inline-flex bg-white shadow-[0_2px_2px_rgba(0,0,0,0.07)]  rounded-[10px] p-4 transition-all duration-300 group-hover:shadow-[-2px_7px_9px_rgba(0,0,0,0.1)] ease-in-out cursor-pointer"
            >
              <ul className="flex ">
                <li>
                  <p className="text-[16px] font-bold text-gray-900 sm:mr-65  xl:mr-100 mt-3">
                    Car, Brand, Model, and etc..
                  </p>
                </li>
                <li>
                  <Button size="icon" className="w-11 h-11 bg-black">
                    <Search className="w-5 h-8" />
                  </Button>
                </li>
              </ul>
            </motion.div>
          </Button>
        </motion.div>
      </motion.section>
    </>
  );
}

export default CarSearch;
