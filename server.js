const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    // Handle creating or joining a room
    socket.on('create or join', (room) => {
        console.log(`Create or join room ${room}`);

        const clients = io.sockets.adapter.rooms.get(room) || new Set();

        if (clients.size === 0) {
            socket.join(room);
            socket.emit('created', room);
        } else if (clients.size === 1) {
            socket.join(room);
            socket.emit('joined', room);
        } else {
            socket.emit('full', room);
        }
    });

    // Handle WebRTC signaling messages
    socket.on('message', (message, room) => {
        console.log(`Message from ${room}: ${message}`);
        socket.to(room).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
console.log('1');
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
