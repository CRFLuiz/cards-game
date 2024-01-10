require('dotenv').config();

const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

const websocket = require('./websocket');
const Communication = require('./class/Communication');
const Game = require('./class/Game');
const game = new Game();
game.initialize();

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('./public'));

io.on('connection', (socket) => {
    console.log('New connection: ', socket.id);


    const communication = new Communication(socket, game);
    // communication.listening();
    // websocket(socket);

    socket.on('disconnection', obj => {
        console.log('User left', socket.id);
    })
});

server.listen(PORT, err => console.log(err || `Server listening on port ${PORT}`));
