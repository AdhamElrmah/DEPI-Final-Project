import { createBrowserRouter, Navigate } from "react-router-dom";
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
import CarsManagement from "../components/Admin/CarsManagement";
import UsersManagement from "../components/Admin/UsersManagement";
import RentalsManagement from "../components/Admin/RentalsManagement";
import ProfilePage from "../pages/ProfilePage";
import ProfileSettings from "../components/ProfilePage/ProfileSettings";
import RentalHistory from "../components/ProfilePage/RentalHistory";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentPage from "../pages/PaymentPage";
import { getAllCars, getCarById } from "../lib/getData";

export const router = createBrowserRouter([
  {
    element: <MainAppRoute />,
    errorElement: <Error404 />,
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
      { 
        path: "/admin",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/cars" replace />,
          },
          {
            path: "cars",
            element: <CarsManagement />,
          },
          {
            path: "users",
            element: <UsersManagement />,
          },
          {
            path: "rentals",
            element: <RentalsManagement />,
          },
        ],
      },
      { 
        path: "/profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <Navigate to="/profile/settings" replace />,
          },
          {
            path: "settings",
            element: <ProfileSettings />,
          },
          {
            path: "rentals",
            element: <RentalHistory />,
          },
        ],
      },
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
          {
            path: ":carId/checkout",
            element: <CheckoutPage />,
            loader: ({ request: { signal }, params }) => {
              return getCarById(params.carId, signal);
            },
          },
          {
            path: ":carId/payment",
            element: <PaymentPage />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <Error404 /> },
]);
