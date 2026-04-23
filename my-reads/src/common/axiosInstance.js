import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const axiosRefresh = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      

      originalRequest._retry = true;

      try {
        console.log("Access token expired. Refresh token deneniyor...");
        
        await axiosRefresh.post("/users/refresh");

        console.log("Refresh başarılı. Orijinal istek tekrar gönderiliyor...");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Yenileme başarısız, oturum kapatılıyor.");
        localStorage.removeItem("isUserLoggedIn");
        window.location.href ="/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;