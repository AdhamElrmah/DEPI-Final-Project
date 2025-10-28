import React from "react";
import HeaderBackGround from "../../assets/ServicesPage/HeaderBackGround.avif";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
function ServicesPageHeader() {
  return (
    <>
      <div className="px-8">
        <header className="w-full flex flex-col items-center justify-center text-center bg-white">
          <div className="max-w-3xl px-6 py-20 -mb-5">
            <motion.h1
              className="text-4xl md:text-4xl lg:text-6xl font-bold text-black mb-6 "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Our Services
            </motion.h1>
            <motion.p
              className="text-lg md:text-lg text-black max-w-4xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              We have an exceptional limousine service for Business
              Professionals and VIP visitors. Please call us to get information
              about our luxury limousine fleet.
            </motion.p>
            <Link to="/">
              <motion.button
                className="bg-primary text-primary-foreground 
                              hover:bg-primary/90 
                              hover:scale-105 transition-all duration-100 rounded-lg px-5 py-4 text-sm font-medium"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Book Our Service
              </motion.button>
            </Link>
          </div>
          <div
            className="w-full min-h-[50vh] md:min-h-[60vh] bg-cover bg-center relative -mt-3 mb-3 rounded-xl"
            style={{
              backgroundImage: `url(${HeaderBackGround})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
          </div>
        </header>
      </div>
    </>
  );
}

export default ServicesPageHeader;
