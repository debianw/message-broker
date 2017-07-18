const config = require('./config');
const redisClient = require('./redis-client');
const redisSocket = require('socket.io-redis')({
  pubClient: redisClient.pubAdapter,
  subClient: redisClient.subAdapter
});

//
module.exports = (io) => {

  io.adapter(redisSocket);

  io.on('connection', socket => {
    
    console.log('socket connected! => ', socket.id);

    socket.on('register', (payload, fn) => {
      console.log('registering device => %j', payload);
      if (fn) {
        fn(payload);
      }
    });

    // < print response
    socket.on('print', msg => {
      console.log('print response from %s', socket.id);
      redisSocket.pubClient.publish(`socket.io#/#${socket.id}#print`, msg);
    });

  });

  

};