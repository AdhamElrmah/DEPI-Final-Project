// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../UI/button";
import React from "react";
import CarLogo from "../../assets/CarPageLogos/car.svg";
import Driver from "../../assets/CarPageLogos/driver.svg";
import Engine from "../../assets/CarPageLogos/engine.svg";
import Turbo from "../../assets/CarPageLogos/turbo.svg";

export default function CarDetails({ car }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: car.currency || "USD",
    maximumFractionDigits: 0,
  });

  return (
    <>
      {/* HERO IMAGE */}
      <motion.div className="w-full overflow-hidden max-w-[1500px] mx-auto md:px-6  md:pt-7">
        <img
          src={car.images?.main}
          alt={`${car.make} ${car.model}`}
          className="w-full h-[380px] md:h-[420px] lg:h-[480px] object-cover shadow-md rounded-b-2xl  md:rounded-2xl"
        />
      </motion.div>

      <motion.main
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8"
      >
        {/* TITLE ROW */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col md:flex-row items-center md:justify-between gap-6"
        >
          <div className="flex max-md:flex-col max-md:text-center items-center gap-4">
            {car.logo ? (
              <div className="w-17 h-17 rounded-full border-2">
                <img
                  src={car.logo}
                  alt={car.make}
                  className="rounded-full w-full h-full"
                />
              </div>
            ) : (
              <div
                className="w-17 h-17 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
                aria-hidden
              >
                {car.make?.[0] || "C"}
              </div>
            )}

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold">
                {car.make} {car.model}
              </h1>
              <div className="text-sm text-gray-500 mt-1">
                <span>{car.transmission ? `${car.transmission} · ` : ""}</span>
                <span>{car.year} · </span>
                <span>{car.engine.type}</span>
              </div>
            </div>
          </div>
          <div>
            <Button size="lg" className="font-bold text-sm ">
              <Link to={`/${car.id}/rent`}>
                Rent From {formatter.format(car.price_per_day)}{" "}
              </Link>
            </Button>
          </div>
        </motion.section>

        {/* OVERVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <h3 className="text-lg font-extrabold mb-3">Overview</h3>
          <p className="text-gray-800 leading-relaxed text-sm font-normal">
            {car.overview}
          </p>
        </motion.section>
        <hr className="w-full border-b border-[#CCCADA] max-md:my-6 my-12" />

        {/* ICON STATS ROW */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-8 mb-20 max-md:mb-10 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatCard title={car.body_type || "—"} subtitle="Body type">
            <img src={CarLogo} alt="" className="h-5 w-5" />
          </StatCard>
          <StatCard title={`${car.seats || "—"} Seats`} subtitle="Space">
            {" "}
            <img src={Driver} alt="" className="h-5 w-5" />
          </StatCard>
          <StatCard title={car.fuel_consumption || "—"} subtitle="Consumption">
            {" "}
            <img src={Turbo} alt="" className="h-5 w-5" />
          </StatCard>
          <StatCard title={car.engine.type || "—"} subtitle="Engine">
            <img src={Engine} alt="" className="h-5 w-5" />
          </StatCard>
        </motion.section>

        {/* SUB IMAGES */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <img
            src={car.images?.sub1}
            alt="sub1"
            className="w-full h-56 object-cover rounded-xl shadow-sm"
          />
          <img
            src={car.images?.sub2}
            alt="sub2"
            className="w-full h-56 object-cover rounded-xl shadow-sm"
          />
        </motion.section>

        {/* SPECIFICATIONS + FEATURES */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* TECHNICAL SPECS */}
          <div>
            <h4 className="text-lg font-extrabold mb-3">
              Technical Specifications
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <SpecRow label="Fuel Type" value={car.fuel_type} />
              <SpecRow
                label="Exterior and Interior color"
                value={
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ background: car.colors?.exterior || "#ccc" }}
                    />
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ background: car.colors?.interior || "#999" }}
                    />
                  </div>
                }
              />
              <SpecRow label="Transmission" value={car.transmission} />
              <SpecRow
                label="Engine"
                value={`${
                  car.engine?.displacement + " " + car.engine?.configuration
                }`}
              />
              <SpecRow label="Drivetrain" value={car.drivetrain} />
              <SpecRow
                label="Power"
                value={car.engine?.power_hp ? `${car.engine.power_hp} kW` : "—"}
              />
            </ul>
          </div>

          {/* PRIMARY FEATURES */}
          <div>
            <h4 className="text-lg font-extrabold mb-3">Primary Features</h4>
            <ul className="text-sm  grid grid-cols-1 gap-2 text-gray-800 leading-relaxed  font-normal">
              {car.primary_features?.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              )) || <li className="text-gray-500">No data</li>}
            </ul>
          </div>

          {/* ADDITIONAL FEATURES */}
          <div>
            <h4 className="text-lg font-extrabold mb-3">Additional Features</h4>
            <ul className=" grid grid-cols-1 gap-2 text-gray-800 leading-relaxed text-sm font-normal">
              {car.additional_features?.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              )) || <li className="text-gray-500">No data</li>}
            </ul>
          </div>
        </motion.section>

        {/* MORE IMAGES */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <img
            src={car.images?.sub3}
            alt="sub3"
            className="w-full h-56 object-cover rounded-xl shadow-sm"
          />
          <img
            src={car.images?.sub4}
            alt="sub4"
            className="w-full h-56 object-cover rounded-xl shadow-sm"
          />
        </motion.section>

        {/* RENT CONDITIONS */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="mt-10 pb-16"
        >
          <h4 className="text-lg font-extrabold mb-3">Rent Conditions</h4>
          <p className=" text-gray-800 leading-relaxed text-sm font-normal">
            {car.rental_conditions}
          </p>
        </motion.section>
      </motion.main>
    </>
  );
}

/* ---------- Small UI helper components ---------- */

function StatCard({ title, subtitle, children }) {
  return (
    <div className="flex items-center gap-4  ">
      <div className="w-11 h-11 rounded-md bg-[#f2f2f2] flex items-center justify-center ">
        {children}
      </div>
      <div>
        <div className=" font-bold text-sm">{title}</div>
        <div className="text-gray-600 text-sm opacity-75">{subtitle}</div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <li className="flex  gap-4 items-center">
      <div className="text-sm text-gray-800 leading-relaxed font-normal">
        {label}
      </div>
      <div className="text-sm font-bold text-gray-800">{value || "—"}</div>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-600 shrink-0 mt-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
