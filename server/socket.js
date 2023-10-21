import { Server } from 'socket.io';

const setupSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for messages
    socket.on('sendMessage', (message) => {
      // Broadcast the message to all connected clients
      io.emit('message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export { setupSocket };
