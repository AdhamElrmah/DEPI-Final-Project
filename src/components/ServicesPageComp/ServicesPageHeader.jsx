// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import HeaderBackGround from "../../assets/ServicesPage/HeaderBackGround.avif";
import { Link } from "react-router-dom";
import { Button } from "../UI/button";

function ServicesPageHeader() {
  return (
    <>
      <div className="px-8 max-w-[1500px] mx-auto">
        <header className="w-full flex flex-col items-center justify-center text-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl px-6 pt-20 pb-3"
          >
            <h1 className="text-5xl md:text-[56px] lg:text-6xl font-extrabold text-black mb-6 ">
              Our Services
            </h1>
            <p
              className="text-sm  text-black max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              We have an exceptional limousine service for Business
              Professionals and VIP visitors. Please call us to get information
              about our luxury limousine fleet.
            </p>
            <Button size="lg" className=" font-bold text-sm">
              <Link to="/">Book Our Service</Link>
            </Button>
          </motion.div>
          <div
            className="w-full min-h-[350px] md:min-h-[500px] relative px-8 mb-3 rounded-4xl"
            style={{
              backgroundImage: `url(${HeaderBackGround})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
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
