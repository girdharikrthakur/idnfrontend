import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refresh") &&
      localStorage.getItem("accessToken")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/auth/refresh");

        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        console.log("Refresh failed:", err.message);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login"; // acceptable fallback

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
