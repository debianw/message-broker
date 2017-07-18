const config = require('./config');
const redis = require('redis');
const client = redis.createClient(config.redis.uri, 
  Object.assign({socket_keepalive: true, detect_buffers: true, return_buffers: false}, config.redis.options)
);
const pubAdapter = pub = redis.createClient(config.redis.uri, config.redis.options);

const sub = redis.createClient(config.redis.uri, config.redis.options);
const subAdapter = redis.createClient(config.redis.uri, Object.assign({ return_buffers: true }, config.redis.options));
//const sub = redis.createClient(config.redis.uri, config.redis.options);

pub.on('error', err => {
  console.log('pub error ==> ', err);
});

sub.on('error', err => {
  console.log('sub error => ', err);
});

module.exports = {
  client,
  pub,
  pubAdapter,
  sub,
  subAdapter,
};