import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Login from './pages/login'
import Signup from './pages/signup'
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
      </Routes>
    </Router>
  )
}

export default App
