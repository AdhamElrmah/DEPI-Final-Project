import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function Testimonials() {
  return (
    <div className="relative bg-[#f2f2f2] overflow-hidden group py-10 sm:py-12">
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="absolute bottom-[-700px] w-[600px] h-[600px] rounded-full border border-[#8d8d8d] opacity-15 transition-all duration-350 ease-out group-hover:bottom-[-600px] scale-150" />

        <div className="absolute bottom-[-500px] w-[400px] h-[400px] rounded-full border border-[#8d8d8d] opacity-15 transition-all duration-350 ease-out group-hover:bottom-[-450px] scale-150 delay-20" />
      </div>

      <div className="px-6 py-10 sm:px-6 lg:px-8 relative z-10">
        <img
          className="mx-auto mb-6 w-32 block"
          src="\src\assets\TestimonialShapes\TestimonialShape1.avif"
          alt="shape"
        />

        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-4xl font-extrabold  tracking-tight leading-[3.1rem] text-gray-900 sm:text-[40px]">
            Ready to book our car or a private service?
          </h2>

          <div className="mt-6 flex flex-col items-center justify-center">
            <Button
              asChild
              size="lg"
              className="w-12 h-12 mb-0 rounded-[12px] transition-all duration-300 ease-in-out"
            >
              <Link to="/contact-us">
                <ArrowRight className="size-6 mb-0" />
              </Link>
            </Button>

            <p className="text-xs font-semibold text-black mt-2">
              Contact us to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
