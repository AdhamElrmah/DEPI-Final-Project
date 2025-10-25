import OurAdvantages from "@/components/ServicesPageComp/OurAdvantages";
import PrivateDrivers from "@/components/ServicesPageComp/PrivateDrivers";
import ServicesPageHeader from "@/components/ServicesPageComp/ServicesPageHeader";
import DriverReview from "@/layouts/DriverReview";
import Testimonials from "@/layouts/Testimonials";
import React from "react";

function Services() {
  return (
    <>
      <ServicesPageHeader />
      <DriverReview />
      <OurAdvantages />
      <PrivateDrivers />
      <Testimonials />
    </>
  );
}

export default Services;
