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
import { AuthProvider } from "../contexts/AuthContext";

function MainAppRoute() {
  const { state } = useNavigation();
  const allCars = useLoaderData();

  return (
    <AuthProvider>
      <div>
        <Navbar allCars={allCars} />
        <ScrollRestoration />
        <main>{state === "loading" ? <LoaderSpinner /> : <Outlet />}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default MainAppRoute;
