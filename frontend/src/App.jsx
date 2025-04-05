import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Login from './pages/login'
import Signup from './pages/signup'
import HostMeetingCard from './pages/hostPage'
import ProfileSidebar from './components/profileSidebar'
import JoinMeetingPage from './pages/joinPage'
import ChatUI from './components/groupChat'
function App() {
  console.log("App component rendered")
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold">
              Hello World with Tailwind!
            </div>
          }
        />
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<Login />} />
       < Route path="/signup" element={<Signup />} />
        <Route path="/host" element={<HostMeetingCard />} />
        <Route path="/profile" element={<ProfileSidebar />} />
        <Route path="/join" element={<JoinMeetingPage />} />
        <Route path="/chat" element={<ChatUI />} />
      </Routes>
    </Router>
  )
}

export default App
