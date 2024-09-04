import axios from "axios";

export const API = axios.create({
  baseURL: 'http://127.0.0.1:8787',
  headers: {
    "Accept": "multipart/form-data",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});