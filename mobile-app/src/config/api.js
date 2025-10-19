// Configuración de API para la aplicación móvil
const isDevelopment = __DEV__;

export const API_CONFIG = {
  // En desarrollo, usa tu IP local (cambia por tu IP real)
  // En producción, usa el servidor desplegado
  BASE_URL: isDevelopment 
    ? 'http://192.168.1.100:5001/api'  // Cambia esta IP por la tuya
    : 'https://novastream-backend.onrender.com/api',
    
  SOCKET_URL: isDevelopment
    ? 'http://192.168.1.100:5001'      // Cambia esta IP por la tuya
    : 'https://novastream-backend.onrender.com',
    
  TIMEOUT: 10000,
};

// Para obtener tu IP local:
// Windows: ipconfig
// Mac/Linux: ifconfig
// Busca la dirección IPv4 de tu red WiFi
