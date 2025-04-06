// src/components/SessionLoader.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/authSlice";
import axiosInstance from "../api/axiosInstance";

export default function SessionLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/users/current-user", {
          withCredentials: true,
        });

        if (res.data?.data) {
          dispatch(setLogin(res.data.data));
        }
      } catch (err) {
        console.log("Not logged in or session expired:", err.message);
      }
    };

    getUser();
  }, []);

  return children;
}
