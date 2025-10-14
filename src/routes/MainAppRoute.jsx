import React from "react";
import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import LoaderSpinner from "../layouts/LoaderSpinner";

function MainAppRoute() {
  const { state } = useNavigation();
  const allCars = useLoaderData();

  return (
    <div>
      <Navbar allCars={allCars} />
      <ScrollRestoration />
      <main>{state === "loading" ? <LoaderSpinner /> : <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default MainAppRoute;
