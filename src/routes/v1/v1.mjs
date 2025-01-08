import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { BullMQConfigs } from '../../app.config.mjs';
// import * as bullmq from '../../services/bullmq/bullmq.mjs';
import { AuthRouter } from './auth/auth.controller.mjs';
import { PingRouter } from './ping/ping.controller.mjs';
import { UsersRouter } from './users/users.controller.mjs';

const swaggerJsdocOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node postgres starter kit',
      version: '1.0.0',
      description: 'This is a RESTful API application made with Express.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://github.com/nhannguyendevjs/node-mongo-starter-kit/blob/master/LICENSE',
      },
      contact: {
        name: 'Nhan Nguyen',
        url: 'https://github.com/nhannguyendevjs',
      },
    },
  },
  apis: ['./routes/v1/ping/*.controller.mjs', './routes/v1/auth/*.controller.mjs', './routes/v1/users/*.controller.mjs'],
};

const router = express.Router();

router
  .use('/ping', PingRouter)
  .use('/auth', AuthRouter)
  .use('/users', UsersRouter)
  // .use(BullMQConfigs.BULLMQ_ADMIN_PATH, bullmq.serverAdapter.getRouter())
  .use('/api-docs', swaggerUi.serve)
  .get('/api-docs', swaggerUi.setup(swaggerJsdoc(swaggerJsdocOptions)));

export { router as V1Router };

