import axios from "axios";

const API_URL = "https://dummyjson.com/c/ee4d-a7a6-412b-bdc3";

export const getAllCars = (signal) => {
  return axios.get(API_URL, { signal }).then((res) => res.data);
};

export const getCarById = (carId, signal) => {
  return axios
    .get(API_URL, { signal })
    .then((res) => res.data.find((c) => c.id === carId));
};
