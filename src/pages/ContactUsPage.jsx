import ContactUsForm from "@/components/ContactUsPageComp/ContactUsForm";
import ContactUsHeader from "@/components/ContactUsPageComp/ContactUsHeader";
import GetInTouch from "@/layouts/GetInTouch";
import React from "react";

function ContactUs() {
  return (
    <>
      <ContactUsHeader />
      <GetInTouch />
      <ContactUsForm />
    </>
  );
}

export default ContactUs;
