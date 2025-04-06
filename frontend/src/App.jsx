import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/signup';
import HostMeetingCard from './pages/hostPage';
import ProfileSidebar from './components/profileSidebar';
import JoinMeetingPage from './pages/joinPage';
import ChatUI from './components/groupChat';
import LandingPage from './pages/Landing';
import AccessDenied from './components/accessDenied';
import ControlBar from './components/controlBar';
import LeaveRoomModal from './components/leaveRoomScreen';
import ProfilePage from './pages/profilePage';
import GroupPage from './pages/home';
import Settings from './pages/setting';
import RoomPage from './pages/room';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isDark = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <ToastContainer /> {/* Add ToastContainer here */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/host" element={<HostMeetingCard />} />
          <Route path="/profile" element={<ProfileSidebar />} />
          <Route path="/join" element={<JoinMeetingPage />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="/control-bar" element={<ControlBar />} />
          <Route path="/leave-room" element={<LeaveRoomModal />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/home" element={<GroupPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
