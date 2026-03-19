import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const signupUser = (data) => {
  return API.post("/auth/register", data);
};

export const getUser = () => {
  return API.get("/auth/getuser");
};