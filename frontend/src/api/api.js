import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach Authorization: Bearer <token> from localStorage (if available)
API.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.access) {
        config.headers.Authorization = `Bearer ${parsed.access}`;
      }
    }
  } catch {}
  return config;
});

export default API;
