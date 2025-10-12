import React from "react";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import LoaderSpinner from "../layouts/LoaderSpinner";

function MainAppRoute() {
  const { state } = useNavigation();
  return (
    <div>
      <Navbar />
      <ScrollRestoration />
      <main>{state === "loading" ? <LoaderSpinner /> : <Outlet />}</main>
      <Footer />
    </div>
  );
}

export default MainAppRoute;
