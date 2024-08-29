import { createLogger, format, transports } from 'winston';
import { LoggerConfigs } from '../../app.config.mjs';

const Logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      silent: !LoggerConfigs.ENABLE_LOGGER_CONSOLE,
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

export { Logger, bootstrap };
