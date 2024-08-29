export const GeneralConfigs = {
  HOST_ENV: process.env.HOST_ENV,
  HOSTNAME: process.env.HOSTNAME,
  HOST_PORT: process.env.HOST_PORT,
  APP_DOMAIN: process.env.APP_DOMAIN,
  APP_VERSION: process.env.APP_VERSION,
  API_VERSION: process.env.API_VERSION,
  APP_ENV: process.env.APP_ENV,
};

export const BullMQConfigs = {
  ENABLE_BULLMQ: process.env.ENABLE_BULLMQ,
  BULLMQ_ADMIN_PATH: process.env.BULLMQ_ADMIN_PATH,
};

export const JWTConfigs = {
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};

export const LoggerConfigs = {
  ENABLE_LOGGER_CONSOLE: process.env.ENABLE_LOGGER_CONSOLE,
  ENABLE_LOGGER_FILE: process.env.ENABLE_LOGGER_FILE,
};

export const MongoDBConfigs = {
  ENABLE_MONGO: process.env.ENABLE_MONGO,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_CLIENT_OPTIONS: {
    // useUnifiedTopology: true,
  },
  MONGO_DBNAME: process.env.APP_DOMAIN,
};

export const RequestConfigs = {
  ENABLE_REQUEST: process.env.ENABLE_REQUEST,
  REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT,
};

export const bootstrap = async () => {
  console.log(`{"level":"info","message":"App Config is ready to use","timestamp":"${new Date().toISOString()}"}`);
};
