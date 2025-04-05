import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // make sure this is actually your backend and not your frontend
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // 🛠️ this is crucial
  },
});

export default axiosInstance;
