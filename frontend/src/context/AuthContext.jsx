import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../config/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Configurar axios con el token
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verificar si el token es válido
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      // Aquí podrías hacer una llamada al backend para verificar el token
      // Por ahora, solo decodificaremos el payload del JWT
      const payload = JSON.parse(atob(token.split('.')[1]))
      
      // Verificar si el token no ha expirado
      if (payload.exp * 1000 > Date.now()) {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
      } else {
        logout()
      }
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password
      })

      const { token, ...userData } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData)
      
      const { token, ...user } = response.data
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrarse' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
