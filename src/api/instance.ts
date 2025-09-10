import axios from "axios";

let isdev = process.env.NODE_ENV === "development";

export const instance = axios.create({
  baseURL: isdev ? "http://localhost:3001" : "https://ptender.ru",
  timeout: 600000,
});
