const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  res.send('✅ Servidor WebSocket activo');
});

wss.on('connection', (ws) => {
  console.log('🔗 Cliente conectado');

  ws.on('message', (message) => {
    console.log('📨 Mensaje recibido:', message.toString('utf-8'));

    // Reenvía a todos los demás clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Cliente desconectado');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket en puerto ${PORT}`);
});
