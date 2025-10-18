// Configuración de API para diferentes entornos
const config = {
  development: {
    API_URL: 'http://localhost:5001/api',
    SOCKET_URL: 'http://localhost:5001'
  },
  production: {
    API_URL: import.meta.env.VITE_API_URL + '/api' || 'https://novastream-backend.onrender.com/api',
    SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'https://novastream-backend.onrender.com'
  }
}

const environment = import.meta.env.MODE || 'development'

export const API_URL = config[environment].API_URL
export const SOCKET_URL = config[environment].SOCKET_URL

export default config[environment]