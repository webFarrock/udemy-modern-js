'use strict';

var http = require('http');
var express = require('express');
var socketIo = require('socket.io');

const port = 3000;
const app = express();
app.set('view engine', 'jade');



app.use(express.static('./public'));


app.get('/', (req, res) => {
    res.end('Hello, world');
});


app.get('/home', (req, res) => {
    res.render('index', {title: 'Title!!!'});
});

const server = new http.Server(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('Client connected!');
    
    socket.on('chat:add', data => {
        console.log('onserver data: ', data);
        io.emit('chat:added', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });
    
});




server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});