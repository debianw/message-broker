module.exports = {

  redis: {
    uri: process.env.REDIS_DEV_URL || 'redis://localhost:6379',
  },

  /*redis: {
    uri: process.env.REDIS_DEV_URL || 'redis://redis-19361.c13.us-east-1-3.ec2.cloud.redislabs.com:19361',
    host: process.env.REDIS_DEV_HOST || 'redis-19361.c13.us-east-1-3.ec2.cloud.redislabs.com',
    port: process.env.REDIS_DEV_PORT || 19361,
    options: {
      auth_pass: process.env.REDIS_DEV_PASSWORD || 'darkXstar'
    }
  },*/

  port: 3008

};
