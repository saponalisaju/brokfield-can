import axios from "axios";
import apiUrl from "../../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api/users`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
