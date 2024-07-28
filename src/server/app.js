const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Broadcaster is a class that emit event when a new datapoint arrive
// This is just an emulation of real life situation where datapoint came in randomly
const Broadcaster = require("./Broadcaster");

const app = express();

// Create own HTTP server instead of using app.listen() in order to share the same port with WS
const httpServer = http.createServer(app);

// Initating all middleware for express
app
  .use(express.static(`${process.cwd()}/src/client/build`));

// Render index.pug from views for root URL
app.get("/", (req, res) => {
  res.render("index");
});

// Initiate websocket server with the same server as express
const wss = new WebSocket.Server({ server: httpServer });

// Create new Broadcaster
// Maybe you can add multiple broadcaster for multiple bus using the same data to make it a little interesting
const broadcaster = new Broadcaster();

broadcaster.start();
broadcaster.on('data', (data) => {
  wss.clients.forEach((socket) => {
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ type: 'data', payload: data }));
    }
  });
});


broadcaster.on("overspeed", (data) => {
  wss.clients.forEach((socket) => {
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ type: "overspeed", payload: data }));
    }
  });
});

// Start listening on port 8080 for both express app and WS server
httpServer.listen(8080, () => {
  console.log("HTTP server listening on port 8080");
});
