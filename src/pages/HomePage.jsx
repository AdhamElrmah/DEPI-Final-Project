import CarCategories from "@/components/HomePageComp/CarsCategories";
import DealsShowcase from "@/components/HomePageComp/DealsShowcase";
import ExploreCars from "@/components/HomePageComp/ExploreCars";
import Hero from "@/components/HomePageComp/Hero/Hero";
import TrendingCars from "@/components/HomePageComp/TrendingCars";
import DriverReview from "@/layouts/DriverReview";
import GetInTouch from "@/layouts/GetInTouch";
import React from "react";
import { useLoaderData } from "react-router-dom";

function HomePage() {
  const allCars = useLoaderData();

  return (
    <>
      <Hero />
      <CarCategories />
      <TrendingCars allCars={allCars} />
      <ExploreCars allCars={allCars} />
      <DriverReview />
      <DealsShowcase />
    </>
  );
}

export default HomePage;
