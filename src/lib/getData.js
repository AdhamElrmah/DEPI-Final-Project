import { baseApi } from "./base";
import buildConfig from "../utils/buildConfig";

export const getAllCars = (signal, token) => {
  return baseApi
    .get("items/allItems", buildConfig(signal, token))
    .then((res) => res.data);
};

export const getCarById = (carId, signal, token) => {
  return baseApi
    .get(`items/${carId}`, buildConfig(signal, token))
    .then((res) => res.data);
};

export const createCar = (payload, token) => {
  return baseApi
    .post("items/", payload, buildConfig(undefined, token))
    .then((res) => res.data);
};

export const updateCar = (carId, payload, token) => {
  return baseApi
    .put(
      `items/${encodeURIComponent(carId)}`,
      payload,
      buildConfig(undefined, token)
    )
    .then((res) => res.data);
};

export const deleteCar = (carId, token) => {
  return baseApi
    .delete(`items/${encodeURIComponent(carId)}`, buildConfig(undefined, token))
    .then((res) => res.data);
};

export const rentCar = async (carId, rentalData, token) => {
  const res = await baseApi.post(
    `items/${encodeURIComponent(carId)}/rent`,
    rentalData,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const getUserRentals = async (token) => {
  const res = await baseApi.get(
    "items/rentals/user",
    buildConfig(undefined, token)
  );
  return res.data;
};

export const cancelRental = async (rentalId, token) => {
  const res = await baseApi.delete(
    `items/rentals/${encodeURIComponent(rentalId)}`,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const getAllRentals = async (token) => {
  const res = await baseApi.get(
    "items/rentals/all",
    buildConfig(undefined, token)
  );
  return res.data;
};

export const updateRental = async (rentalId, rentalData, token) => {
  const res = await baseApi.put(
    `items/rentals/${encodeURIComponent(rentalId)}`,
    rentalData,
    buildConfig(undefined, token)
  );
  return res.data;
};
