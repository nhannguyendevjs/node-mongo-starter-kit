import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import path from 'node:path';
import { Worker } from 'worker_threads';
import { RequestConfigs, bootstrap as bootstrapAppConfig } from './app.config.mjs';
import { cacheControlNoStore } from './middleware/cache-control.mjs';
import { V1Router } from './routes/v1/v1.mjs';

// Bootstrapping
import { bootstrap as bootstrapLoggerService, Logger } from './services/logger/logger.mjs';
// import {bootstrap as bootstrapMongoDBService} from './services/mongodb/mongodb.mjs';
// import {bootstrap as bootstrapMongooseService} from './services/mongoose/mongoose.mjs';
// import {bootstrap as bootstrapPostgresService} from './services/postgres/postgres.mjs';
// import {bootstrap as bootstrapBullMQService} from './services/bullmq/bullmq.mjs';

await bootstrapAppConfig();
await bootstrapLoggerService();
// await bootstrapMongoDBService();
// await bootstrapMongooseService();
// await bootstrapPostgresService();
// await bootstrapBullMQService();

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(multer().any());
app.use(express.json({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }));
app.use(express.raw({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }));
app.use(express.text({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }));
app.use(express.urlencoded({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE, extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cacheControlNoStore);

app.use('/api/v1', V1Router);

app.use('/', (req, res) => {
  Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`);
  res.status(404).json({ message: 'Not found' });
});

// Use helmet middleware after api-docs route
// Issue: https://github.com/scottie1984/swagger-ui-express/issues/212
app.use(helmet());
// Example CSP
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-inline'"]
//   }
// }));

let appWorker;

appWorker = new Worker(__dirname + '/worker-threads/app.worker.mjs', { workerData: 'ping' });
appWorker.on('message', (res) => {
  Logger.log('info', res.value);
});

export default app;
