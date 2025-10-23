import React from "react";
import Logo from "@/assets/Logo/logo.png";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 px-4">
          <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div>

          <h1 className="text-8xl font-bold text-black mb-2">404</h1>
          <p className="mt-6 text-lg font-medium text-pretty text-black sm:text-xl/8">
            The page you are looking for doesn't exist or has been moved.
            <br /> Please go back to the homepage.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300 w-full border border-black hover:border-gray-800">
            <Link to="/"> Go to home page</Link>
          </button>
        </div>
      </main>
    </>
  );
};

export default Error404;
