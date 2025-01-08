import IORedis from 'ioredis';
import { RedisConfigs } from '../../app.config.mjs';
import { Logger } from '../logger/logger.mjs';

const connection = (() => {
  if (!RedisConfigs.ENABLE_REDIS) {
    return;
  }

  return new IORedis({ host: RedisConfigs.REDIS_HOST, port: RedisConfigs.REDIS_PORT, maxRetriesPerRequest: null });
})();

const bootstrap = async () => {
  if (RedisConfigs.ENABLE_REDIS) {
    Logger.log('info', `Redis is ready to use`);
  }
};

export { bootstrap, connection };
