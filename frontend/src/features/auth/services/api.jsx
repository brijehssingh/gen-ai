import axios from "axios";

const API = axios.create({
  baseURL: "https://gen-ai-9gns.onrender.com/api", // ✅ fixed
  withCredentials: true
});

// 🔐 Auth APIs
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

export const signupUser = (data) => {
  return API.post("/auth/register", data);
};

export const getUser = () => {
  return API.get("/auth/getuser");
};