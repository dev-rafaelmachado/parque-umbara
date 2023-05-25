import axios from "axios";

const api = axios.create({
  baseURL: "https://parque-umbara-api-wtuk.onrender.com",
});

export default api;
