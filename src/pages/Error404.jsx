import React from "react";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 px-4">
          <div className="flex items-center justify-center">
            <img
              src="https://framerusercontent.com/images/NpoalhONbLBcBafPCn7NEBlLYJk.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          <h1 className="text-5xl font-extrabold text-black mt-7 mb-3 sm:text-6xl">
            404
          </h1>
          <p className="text-sm  max-w-md font-normal">
            The page you are looking for doesn't exist or has been moved. Please
            go back to the homepage.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="bg-black hover:bg-gray-800 text-white text-sm font-bold py-3 px-6 rounded-lg transition duration-300 w-full border border-black hover:border-gray-800">
            <Link to="/"> Go to home page</Link>
          </button>
        </div>
      </main>
    </>
  );
};

export default Error404;
