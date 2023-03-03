import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export default api;
