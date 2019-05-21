const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3500;


server.listen(port, () => {
  console.log('Server running ...', port);
})

app.use(express.static('src'))

let users = [];

io.on('connection', (socket) => {
  users.push(socket);
  console.log('connected: %s sockets connected', users.length, users)
  
  // Disconnect
  socket.on('disconnect', () => {
    users.filter(user => user !== socket.id);
    console.log('Disconnected: %s sockets connected', users.length);
  });
  
})
