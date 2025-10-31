import { createBrowserRouter } from "react-router-dom";
import React from "react";
import MainAppRoute from "./MainAppRoute";
import CarPage from "../pages/CarPage";
import CarsRentalPage from "../pages/CarsRentalPage";
import HomePage from "../pages/HomePage";
import ContactUsPage from "../pages/ContactUsPage";
import ServicesPage from "../pages/ServicesPage";
import Error404 from "../pages/Error404";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import AdminDashboard from "../pages/AdminDashboard";
import { getAllCars, getCarById } from "../lib/getData";

export const router = createBrowserRouter([
  {
    element: <MainAppRoute />,
    // errorElement: <Error404 />,
    loader: ({ request: { signal } }) => {
      return getAllCars(signal);
    },

    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: ({ request: { signal } }) => {
          return getAllCars(signal);
        },
      },
      { path: "/Services", element: <ServicesPage /> },
      { path: "/contact-us", element: <ContactUsPage /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/admin", element: <AdminDashboard /> },
      {
        path: "/cars",
        children: [
          {
            index: true,
            element: <CarsRentalPage />,
            loader: ({ request: { signal } }) => {
              return getAllCars(signal);
            },
          },
          {
            path: ":carId",
            element: <CarPage />,
            loader: ({ request: { signal }, params }) => {
              return getCarById(params.carId, signal);
            },
          },
        ],
      },
    ],
  },
  { path: "*", element: <Error404 /> },
]);
