import { Logger } from './services/logger/logger.mjs';
import { MongoDBConfigs } from './app.config.mjs';
import * as MongoDBService from './services/mongodb/mongodb.mjs';
import * as MongooseService from './services/mongoose/mongoose.mjs';

const cleanUp = async (eventType, eventDetails) => {
  Logger.log('info', `Server is stop from event::${eventType}`, eventDetails);

  if (MongoDBConfigs.ENABLE_MONGO) {
    await MongoDBService.close();
    await MongooseService.disconnect();
    Logger.log('info', `MongoDB connections closed`);
  }

  process.exit();
};

export { cleanUp };
