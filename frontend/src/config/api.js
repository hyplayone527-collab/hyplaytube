// Configuración de API para el frontend
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:5001/api'
    : 'https://novastream-backend.onrender.com/api',
    
  SOCKET_URL: isDevelopment
    ? 'http://localhost:5001'
    : 'https://novastream-backend.onrender.com',
    
  TIMEOUT: 10000,
};

console.log('API Config:', API_CONFIG);