import { createLogger, format, transports } from 'winston';
import { LoggerConfigs } from '../../app.config.mjs';
import { PostgresTransport } from './postgres-transport.mjs';

const Logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      silent: !LoggerConfigs.ENABLE_LOGGER_CONSOLE,
    }),
    new PostgresTransport({
      silent: !LoggerConfigs.ENABLE_LOGGER_POSTGRES,
      level: 'info',
    }),
    new PostgresTransport({
      silent: !LoggerConfigs.ENABLE_LOGGER_POSTGRES,
      level: 'warn',
    }),
    new PostgresTransport({
      silent: !LoggerConfigs.ENABLE_LOGGER_POSTGRES,
      level: 'error',
    }),
    new transports.File({
      silent: !LoggerConfigs.ENABLE_LOGGER_FILE,
      level: 'error',
      filename: 'logs/node.log',
    }),
  ],
});

const bootstrap = async () => {
  Logger.log('info', `Logger is ready to use`);
};

export { bootstrap, Logger };
