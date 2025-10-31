import { baseApi } from "./base";
import buildConfig from "../utils/buildConfig";

export const signIn = async (email, password) => {
  const res = await baseApi.post(
    "/auth/signin",
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};

export const signUp = async (email, password, name, role) => {
  const res = await baseApi.post(
    "/auth/signup",
    { email, password, name, role },
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await baseApi.get("/users", buildConfig(undefined, token));
  return res.data;
};

export const getUserById = async (userId, token) => {
  const res = await baseApi.get(
    `/users/${encodeURIComponent(userId)}`,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const createUser = async (payload, token) => {
  const res = await baseApi.post(
    "/users",
    payload,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const updateUser = async (userId, payload, token) => {
  const res = await baseApi.put(
    `/users/${encodeURIComponent(userId)}`,
    payload,
    buildConfig(undefined, token)
  );
  return res.data;
};

export const deleteUser = async (userId, token) => {
  const res = await baseApi.delete(
    `/users/${encodeURIComponent(userId)}`,
    buildConfig(undefined, token)
  );
  return res.data;
};

export default {
  signIn,
  signUp,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
