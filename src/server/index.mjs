import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import Broadcaster from './Broadcaster.js';

const app = express();
const PORT = 8080;


const httpServer = http.createServer(app);
app
  .use(express.static(`${process.cwd()}/src/client`));


app.get('/', (req, res) => {
  res.render('index');
});


const wss = new WebSocketServer({ server: httpServer });


const broadcaster = new Broadcaster();

broadcaster.start();
broadcaster.on('data', (data) => {
  wss.clients.forEach((socket) => {
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  });
});


httpServer.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
