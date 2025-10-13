import React from "react";
import { Button } from "@/components/ui/button";
function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container mx-auto relative z-20 px-6 py-24 flex items-center gap-8">
        <div className="w-1/2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            The largest luxury cars
            <br /> marketplace
          </h1>
          <p className="mt-6 text-gray-200 max-w-lg">
            Our team offering you a wide selection of high-end cars for
            purchase, lease, or rent.
          </p>

          <Button size="lg">Explore all cars</Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
