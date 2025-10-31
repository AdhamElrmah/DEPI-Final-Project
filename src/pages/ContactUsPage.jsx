import ContactUsForm from "@/components/ContactUsPageComp/ContactUsForm";
import ContactUsHeader from "@/components/ContactUsPageComp/ContactUsHeader";
import ContactUsInfo from "@/components/ContactUsPageComp/ContactUsInfo";
import GetInTouch from "@/components/ContactUsPageComp/GetInTouch";
import React from "react";

function ContactUs() {
  return (
    <>
      <ContactUsHeader />
      <GetInTouch />
      <ContactUsInfo />
      <ContactUsForm />
    </>
  );
}

export default ContactUs;
