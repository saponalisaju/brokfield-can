import axios from "axios";
import apiUrl from "../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
