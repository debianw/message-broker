//
const express = require('express');
const config = require('./config');
const router = express.Router();

const redisClient = require('./redis-client');
const redisSocket = require('socket.io-redis')({
  pubClient: redisClient.pub,
  subClient: redisClient.sub
});
const io = require('socket.io-emitter')(redisClient.client);

//
router.get('/health-check', (req, res) => {
  res.json({
    ok: true
  });
});

//
router.post('/print', (req, res) => {
    const sid = req.body.sid;

    const fn = (channel, msg, timedout) => {
      if (channel === `socket.io#/#${sid}#print`) {
        redisSocket.subClient.unsubscribe(channel);
        redisSocket.subClient.removeListener('message', fn);

        res.json({
          ok: true
        });
      }
    };

    redisSocket.subClient.on('message', fn);
    redisSocket.subClient.subscribe(`socket.io#/#${sid}#print`);
    
    /*setTimeout(() => {
      redisSocket.pubClient.publish(`socket.io#/#${sid}#print`, "test");
    }, 3000);*/
    
    io.to(sid).broadcast.emit(`print`, { data: 1 });
});

//
module.exports = router;