import { baseApi } from "./base";
import buildConfig from "../utils/buildConfig";

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

export const checkCarAvailability = async (carId, startDate, endDate) => {
  const res = await baseApi.post(
    `items/${encodeURIComponent(carId)}/availability`,
    {
      startDate,
      endDate,
    }
  );
  return res.data;
};
