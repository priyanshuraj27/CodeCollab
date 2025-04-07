import React, { useEffect, useState } from "react";
import { User, FolderKanban } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeButton from "./toggleMode";
import ProfileSidebar from "./profileSidebar";
import { AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import axiosInstance from "../api/axiosInstance";
import { setLogin, setLogout } from "../redux/authSlice";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const response = await axiosInstance.get("/users/current-user", {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(setLogin(response.data.data));
      } else {
        dispatch(setLogout());
      }
    } catch {
      dispatch(setLogout());
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      <header
        className={`flex justify-between items-center px-6 py-4 ${
          darkMode
            ? "bg-[#3C4F67FF]"
            : "bg-gradient-to-r from-[#D1F1D5] to-[#A7C7E7]"
        } shadow-md relative z-40`}
      >
        <div className="flex items-center">
          <img src={logo} alt="CodeCollab Logo" className="w-32 h-auto" />
        </div>

        <div className="flex items-center space-x-4">
          <ThemeButton />
          {isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/join")}
                className="px-4 py-2 bg-[#2B7DBD] hover:bg-[#1D6FA3] text-white rounded-lg text-sm font-medium transition"
              >
                Join
              </button>
              <button
                onClick={() => navigate("/host")}
                className="px-4 py-2 bg-[#1A3C66] hover:bg-[#2B7DBD] text-white rounded-lg text-sm font-medium transition"
              >
                Host
              </button>

              {/* 👇 My Projects Icon */}
              <button
                onClick={() => navigate("/home")}
                className="p-2 rounded-full bg-gradient-to-br from-[#2B7DBD] to-[#1A3C66] text-white hover:shadow-lg transition"
                title="My Projects"
              >
                <FolderKanban size={22} />
              </button>

              {/* 👤 Profile Icon */}
              <div
                onClick={() => setShowSidebar(true)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B7DBD] to-[#1A3C66] flex items-center justify-center text-white text-2xl cursor-pointer"
              >
                <User size={24} />
              </div>
            </>
          )}
        </div>
      </header>

      <AnimatePresence>
        {showSidebar && (
          <ProfileSidebar closeSidebar={() => setShowSidebar(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
