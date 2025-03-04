import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5003",
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing: boolean = false;
let failedQueue: any[] = [];

const processQueue = (error: any, success = false) => {
  failedQueue.forEach((promise) => {
    if (success) {
      promise.resolve();
    } else {
      promise.reject(error);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.get("/api/users/refresh");
        processQueue(null, true);
        isRefreshing = false;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, false);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
