import { baseApi } from "./base";
import buildConfig from "../utils/buildConfig";

// Review APIs
export const createReview = (carId, rating, comment, token) => {
  return baseApi
    .post("/reviews", { carId, rating, comment }, buildConfig(undefined, token))
    .then((res) => res.data);
};

export const getCarReviews = (carId, page = 1, limit = 10) => {
  return baseApi
    .get(`/reviews/car/${carId}?page=${page}&limit=${limit}`)
    .then((res) => res.data);
};

export const getUserReviews = (token) => {
  return baseApi
    .get("/reviews/user", buildConfig(undefined, token))
    .then((res) => res.data);
};

export const updateReview = (reviewId, rating, comment, token) => {
  return baseApi
    .put(`/reviews/${reviewId}`, { rating, comment }, buildConfig(undefined, token))
    .then((res) => res.data);
};

export const deleteReview = (reviewId, token) => {
  return baseApi
    .delete(`/reviews/${reviewId}`, buildConfig(undefined, token))
    .then((res) => res.data);
};

export const checkReviewEligibility = (carId, token) => {
  return baseApi
    .get(`/reviews/eligibility/${carId}`, buildConfig(undefined, token))
    .then((res) => res.data);
};

export const getAllReviews = (page = 1, limit = 10, token) => {
  return baseApi
    .get(`/reviews/all?page=${page}&limit=${limit}`, buildConfig(undefined, token))
    .then((res) => res.data);
};
