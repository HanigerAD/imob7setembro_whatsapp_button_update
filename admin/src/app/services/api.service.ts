import axios from "axios";
import { getToken } from "./auth.service";

const apiService = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

apiService.interceptors.request.use(async (config: any) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { apiService };
