import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="app">
      {user && <Navbar />}
      <main className={user ? "main-content" : "main-content-full"}>
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register /> : <Navigate to="/" />} 
          />
          <Route 
            path="/" 
            element={user ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile/:username" 
            element={user ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/chat" 
            element={user ? <Chat /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/chat/:chatId" 
            element={user ? <Chat /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App