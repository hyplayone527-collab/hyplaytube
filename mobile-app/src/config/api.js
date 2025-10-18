// Configuración de API para la aplicación móvil
const isDevelopment = __DEV__;

export const API_CONFIG = {
  // En desarrollo, usa tu IP local (cambia por tu IP real)
  // En producción, usa el subdominio API
  BASE_URL: isDevelopment 
    ? 'http://192.168.1.100:5001/api'  // Cambia esta IP por la tuya
    : 'https://api.novastreamteam.com/api',
    
  SOCKET_URL: isDevelopment
    ? 'http://192.168.1.100:5001'      // Cambia esta IP por la tuya
    : 'https://api.novastreamteam.com',
    
  TIMEOUT: 10000,
  
  // URLs de subdominios para la app móvil
  WEB_APP_URL: 'https://app.novastreamteam.com',
  MAIN_URL: 'https://www.novastreamteam.com',
};

// Para obtener tu IP local:
// Windows: ipconfig
// Mac/Linux: ifconfig
// Busca la dirección IPv4 de tu red WiFi