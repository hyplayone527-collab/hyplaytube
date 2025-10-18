// Configuración de API para el frontend
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  BASE_URL: isDevelopment 
    ? 'http://localhost:5001/api'
    : 'https://api.novastreamteam.com/api',
    
  SOCKET_URL: isDevelopment
    ? 'http://localhost:5001'
    : 'https://api.novastreamteam.com',
    
  TIMEOUT: 10000,
  
  // URLs de subdominios
  MAIN_URL: 'https://novastreamteam.com',
  APP_URL: 'https://app.novastreamteam.com',
  DOCS_URL: 'https://docs.novastreamteam.com',
  DEMO_URL: 'https://demo.novastreamteam.com',
  ADMIN_URL: 'https://admin.novastreamteam.com',
};

console.log('API Config:', API_CONFIG);