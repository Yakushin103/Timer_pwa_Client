import axios from "axios";

let isdev = process.env.NODE_ENV === "development";

export const instance = axios.create({
  baseURL: isdev ? "http://localhost:3001" : "https://timer.yakushin103.tech:8443",
  timeout: 600000,
});
