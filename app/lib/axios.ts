import axios from "axios";
import { authService } from "~/auth/authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_GETWAY,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user");
      if (user) {
        const { access_token } = JSON.parse(user);
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      try {
        const user = await authService.refreshToken();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          error.config.headers.Authorization = `Bearer ${user.access_token}`;
          return axios(error.config);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        window.localStorage.removeItem("user");
        authService.login();
      }
    }
    return Promise.reject(error);
  }
);

export default api;