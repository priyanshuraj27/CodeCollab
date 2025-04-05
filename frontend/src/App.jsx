import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Layout from './pages/homePage'
import Login from './pages/login'
import Signup from './pages/signup'
import HostMeetingCard from './pages/hostPage'
import ProfileSidebar from './components/profileSidebar'
import JoinMeetingPage from './pages/joinPage'
import ChatUI from './components/groupChat'
import LandingPage from './pages/Landing'
import AccessDenied from './components/accessDenied'
import ControlBar from './components/controlBar'
import LeaveRoomModal from './components/leaveRoomScreen'
import ProfilePage from './pages/profile'
function App() {
  const isDark = useSelector((state) => state.theme.isDarkMode);

  // Sync Redux theme with HTML tag for Tailwind
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <Router>
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
        </Route>
      </Routes>
    </Router>
  )
}

export default App
