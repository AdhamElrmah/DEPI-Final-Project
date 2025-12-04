import { createBrowserRouter, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import MainAppRoute from "./MainAppRoute";
import Error404 from "../pages/Error404";
import { getAllCars, getCarById } from "../lib/getData";

// Lazy load pages
const CarPage = React.lazy(() => import("../pages/CarPage"));
const CarsRentalPage = React.lazy(() => import("../pages/CarsRentalPage"));
const HomePage = React.lazy(() => import("../pages/HomePage"));
const ContactUsPage = React.lazy(() => import("../pages/ContactUsPage"));
const ServicesPage = React.lazy(() => import("../pages/ServicesPage"));
const FAQPage = React.lazy(() => import("../pages/FAQPage"));
const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));
const CarsManagement = React.lazy(() =>
  import("../components/Admin/CarsManagement")
);
const UsersManagement = React.lazy(() =>
  import("../components/Admin/UsersManagement")
);
const RentalsManagement = React.lazy(() =>
  import("../components/Admin/RentalsManagement")
);
const ReviewsManagement = React.lazy(() =>
  import("../components/Admin/ReviewsManagement")
);
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const ProfileSettings = React.lazy(() =>
  import("../components/ProfilePage/ProfileSettings")
);
const RentalHistory = React.lazy(() =>
  import("../components/ProfilePage/RentalHistory")
);
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const PaymentPage = React.lazy(() => import("../pages/PaymentPage"));

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
      { path: "/faq", element: <FAQPage /> },
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
          {
            path: "reviews",
            element: <ReviewsManagement />,
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
