import { baseApi } from "./base";
import buildConfig from "../utils/buildConfig";

export const rentCar = async (carId, rentalData, token) => {
  const res = await baseApi.post(
    `rentals/${encodeURIComponent(carId)}`,
    rentalData,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const getUserRentals = async (token) => {
  const res = await baseApi.get(
    "rentals/user",
    buildConfig(undefined, token)
  );
  return res.data;
};

export const cancelRental = async (rentalId, token) => {
  const res = await baseApi.delete(
    `rentals/${encodeURIComponent(rentalId)}`,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const getAllRentals = async (token) => {
  const res = await baseApi.get(
    "rentals/all",
    buildConfig(undefined, token)
  );
  return res.data;
};

export const updateRental = async (rentalId, rentalData, token) => {
  const res = await baseApi.put(
    `rentals/${encodeURIComponent(rentalId)}`,
    rentalData,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const checkCarAvailability = async (carId, startDate, endDate) => {
  const res = await baseApi.post(
    `rentals/${encodeURIComponent(carId)}/availability`,
    {
      startDate,
      endDate,
    }
  );
  return res.data;
};
