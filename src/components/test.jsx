import React from "react";
import { Link } from "react-router-dom";

function ExploreCars({ allCars = [] }) {
  const cars = allCars.slice(0, 6);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Explore our fleet</h2>

          <div>
            <Link
              to="/cars"
              className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm hover:opacity-90 shadow"
            >
              See All Cars
            </Link>
          </div>
        </div>

        <div
          className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
          aria-label="Explore cars grid"
        >
          {cars.map((car, idx) => {
            // responsive visibility: first 3 always visible, 4th visible on md+, 5th & 6th visible on lg+
            const visibilityClass =
              idx <= 2 ? "" : idx === 3 ? "hidden md:block" : "hidden lg:block";

            return (
              <article
                key={car.id || idx}
                className={`group relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ${visibilityClass}`}
              >
                <div className="rounded-lg overflow-hidden relative">
                  <Link to={`/cars/${car.id || ""}`} className="block">
                    <img
                      src={
                        car.images.main ||
                        car.media?.[0] ||
                        "/src/assets/HomePage/HeroImages/HeroMainImage.avif"
                      }
                      alt={car.name || car.title || car.make}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* hover arrow button */}
                  <Link
                    to={`/cars/${car.id || ""}`}
                    className="absolute right-3 bottom-3 inline-flex items-center justify-center w-10 h-10 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`View ${car.name || car.make}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border">
                    {car.logo ? (
                      <img
                        src={car.logo}
                        alt={`${car.make} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-gray-700">
                        {(car.make || car.name || "")
                          .split(" ")
                          .map((s) => s[0] || "")
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {car.name || car.title || car.make}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {car.gear || car.transmission || "Automatic"} ·{" "}
                      {car.drive || car.drivetrain || "AWD"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold">
                      ${car.price || car.daily || "0"}.00
                    </div>
                    <div className="text-sm text-gray-500">/ day</div>
                  </div>

                  <div>
                    <Link
                      to={`/cars/${car.id || ""}`}
                      className="bg-black text-white px-4 py-2 rounded-full text-sm hover:opacity-90 shadow"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExploreCars;
