import axios from "axios";

export const backendURL = "http://localhost:3000/api";

const API = axios.create({
  baseURL: backendURL,
});

export default API;
