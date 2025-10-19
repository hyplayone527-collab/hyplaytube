// Configuración de API para el frontend
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:5001/api'
    : 'https://dashboard.render.com/web/srv-d3q381bipnbc73a9fsug/deploys/dep-d3q381jipnbc73a9ftc0/api',
    
  SOCKET_URL: isDevelopment
    ? 'http://localhost:5001'
    : 'https://dashboard.render.com/web/srv-d3q381bipnbc73a9fsug/deploys/dep-d3q381jipnbc73a9ftc0',
    
  TIMEOUT: 10000,
};

console.log('API Config:', API_CONFIG);
