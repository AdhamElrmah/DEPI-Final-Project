import axios from "axios";

const TESTING_API_URL = "https://dummyjson.com/c/ee4d-a7a6-412b-bdc3";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
