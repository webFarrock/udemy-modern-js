'use strict';

var http = require('http');
var express = require('express');
var socketIo = require('socket.io');

const port = 3000;
const app = express();
app.set('view engine', 'jade');



app.use((req, res, next) => {
    console.log('in middleware 1');
    next();
    console.log('out middleware 1');
});

app.use(express.static('./public'));

app.use((req, res, next) => {
    console.log('--- in middleware 2');

    next();
    console.log('--- out middleware 2');
});

app.get('/', (req, res) => {
    res.end('Hello, world');
});


app.get('/home', (req, res) => {
    res.render('index', {title: 'Title!!!'});
});

const server = new http.Server(app);
const io = socketIo(server);


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});