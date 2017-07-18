const io = require('socket.io-client');
const socket = io.connect("http://localhost:3008", { transports: [ "websocket" ] });
//const io = require('socket.io-emitter')({ host: 'localhost', port: 6379 });

socket.on('connect', () => {
  socket.emit('register', { deviceId: 1 }, msg => console.log('> register response: %j', msg));

  socket.on('print', req => {
    console.log('> print request: %j', req);

    setTimeout(() => {
      console.log('done');
      socket.emit(`print`, JSON.stringify({ result: 'print success'}));
      //io.to(`${socket.id}#print`).emit(`print-response`, 'print success');
    }, 3000);
  });

});
