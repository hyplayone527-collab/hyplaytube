// Script simple para probar que el servidor funciona en puerto 5000
import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Servidor funcionando correctamente en puerto 5000',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de prueba corriendo en http://localhost:${PORT}`);
  console.log('✅ Puerto 5000 disponible y funcionando');
});