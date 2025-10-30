import { baseApi } from "./base";

export const getAllCars = (signal) => {
  return baseApi.get("allItems", { signal }).then((res) => res.data);
};

export const getCarById = (carId, signal) => {
  return baseApi.get(`${carId}`, { signal }).then((res) => res.data);
};
