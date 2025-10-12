import CarCategories from "@/components/HomePageComp/CarsCategories";
import DealsShowcase from "@/components/HomePageComp/DealsShowcase";
import ExploreCars from "@/components/HomePageComp/ExploreCars";
import Hero from "@/components/HomePageComp/Hero";
import TrendingCars from "@/components/HomePageComp/TrendingCars";
import Testimonials from "@/layouts/Testimonials";
import React from "react";

function HomePage() {
  return (
    <>
      <Hero />
      <CarCategories />
      <TrendingCars />
      <ExploreCars />
      <Testimonials />
      <DealsShowcase />
    </>
  );
}

export default HomePage;
