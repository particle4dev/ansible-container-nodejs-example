// import nconf from 'nconf';
// import Redis from 'redis';
var Redis = require('redis');
// import logger from '../logger';
var redis = {
  sub: null,
  pub: null,
};

module["exports"] = function () {
  // if (!nconf.get('db:redis:start')) {
    // logger.warn('the configuration system is not going to start redis server');
    // return;
  // }
  if (redis.sub && redis.pub)
    { return redis; }

  try {
    redis.sub = Redis.createClient("redis://redis:6379");
    redis.pub = Redis.createClient("redis://redis:6379");
    // logger.info(`Redis default connection open to ${nconf.get('db:redis:uri')}`);
    console.log('connected');
    return redis;
  }
  catch (e) {
    // logger.error(e.message);
  }
}

process.on('exit', (code) => {
  if (redis.sub && redis.sub.end) {
    redis.sub.end();
  }
  if (redis.pub && redis.pub.end) {
    redis.pub.end();
  }
  redis = {
    sub: null,
    pub: null,
  };
});