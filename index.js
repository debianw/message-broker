const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const config = require('./config');
const sockets = require('./sockets');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || config.port;

const server = http.createServer(app);
const io = socketIO(server, { serverClient: true });

sockets(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

server.listen(port, () => console.log('app listening on port %d', port));