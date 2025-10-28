import Image1 from "../../../assets/HomePage/HeroImages/SliderIcon1.svg";
import Image2 from "../../../assets/HomePage/HeroImages/SliderIcon2.svg";
import Image3 from "../../../assets/HomePage/HeroImages/SliderIcon3.svg";
import Image4 from "../../../assets/HomePage/HeroImages/SliderIcon4.svg";
import Image5 from "../../../assets/HomePage/HeroImages/SliderIcon5.svg";
import Image6 from "../../../assets/HomePage/HeroImages/SliderIcon6.svg";
import Image7 from "../../../assets/HomePage/HeroImages/SliderIcon7.svg";
import Image8 from "../../../assets/HomePage/HeroImages/SliderIcon8.svg";
import Image9 from "../../../assets/HomePage/HeroImages/SliderIcon9.svg";
import Image10 from "../../../assets/HomePage/HeroImages/SliderIcon10.svg";
import Image11 from "../../../assets/HomePage/HeroImages/SliderIcon11.svg";
import Image12 from "../../../assets/HomePage/HeroImages/SliderIcon12.svg";
import React from "react";

function LogosSlider() {
  const logos = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
    Image12,
  ];

  return (
    <div className=" absolute bottom-6 left-0 right-0 overflow-hidden px-6 marquee-mask mb-[25px] ">
      <div className="marquee">
        {logos.map((logo, i) => (
          <img
            key={`logo-a-${i}`}
            src={logo}
            alt={`logo-${i}`}
            className="w-10 opacity-100 mx-1 md:mx-2 lg:mx-4"
          />
        ))}
        {logos.map((logo, i) => (
          <img
            key={`logo-b-${i}`}
            src={logo}
            alt={`logo-b-${i}`}
            className="w-10 opacity-100 mx-1 md:mx-2 lg:mx-4"
          />
        ))}
      </div>
    </div>
  );
}

export default LogosSlider;
