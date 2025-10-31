import React from "react";

const ContactUsInfo = () => {
  return (
    <div className="px-6 pt-15 pb-3 max-w-[1500px] mx-auto">
      <h2 className="text-[25px] font-extrabold text-gray-900 mb-8 xl:ml-80 l:ml-150 md:ml-4 ">
        Contact Details
      </h2>

      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="flex flex-col p-6 bg-[#474f53] rounded-[10px] text-white w-full lg:w-[350px] relative min-h-[180px]">
          <h2 className="font-bold text-[16px] mb-3">Skills Dynamix</h2>
          <ul className="text-[14px] space-y-1 flex-1">
            <li>Roushdy</li>
            <li>431 El Horreya Rd</li>
            <li>Alexandria, Egypt</li>
          </ul>
          <img
            src="src/assets/ContactUsPage/AddressIcon.png"
            className="absolute bottom-4 right-4"
            width={50}
            alt="Address icon"
          />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <div>
            <a
              href="tel:+201206515666"
              className="flex justify-between items-center p-6 bg-[#728189] rounded-[10px] text-white w-full lg:w-[350px] min-h-[100px] hover:bg-[#5f6c72] transition"
            >
              <div className="flex flex-col">
                <h2 className="font-bold text-[16px] mb-2">+20 12 06515666</h2>
                <p className="text-[14px]">Call us</p>
              </div>
              <img
                src="src/assets/ContactUsPage/PhoneIcon.png"
                width={30}
                alt="Phone icon"
              />
            </a>
          </div>
          <div>
            <a
              href="mailto:info@skillsdynamix.com"
              className="flex justify-between items-center p-6 bg-[#728189] rounded-[10px] text-white w-full lg:w-[350px] min-h-[100px] hover:bg-[#5f6c72] transition"
            >
              <div className="flex flex-col">
                <h2 className="font-bold text-[16px] mb-2">
                  info@skillsdynamix.com
                </h2>
                <p className="text-[14px]">Send your email</p>
              </div>
              <img
                src="src/assets/ContactUsPage/MailIcon.png"
                width={25}
                alt="Email icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsInfo;
