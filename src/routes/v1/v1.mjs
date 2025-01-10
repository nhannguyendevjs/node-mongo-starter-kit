import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { BullMQConfigs, GeneralConfigs } from '../../app.config.mjs';
import * as bullmq from '../../services/bullmq/bullmq.mjs';
import { AuthRouter } from './auth/auth.controller.mjs';
import { PingRouter } from './ping/ping.controller.mjs';
import { TemplateRouter } from './template/template.controller.mjs';
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
    servers: [
      {
        url: `http://${GeneralConfigs.HOST_IP}:${GeneralConfigs.HOST_PORT}/api/${GeneralConfigs.API_VERSION}`,
        description: '',
      },
    ],
  },
  apis: ['./routes/v1/ping/*.controller.mjs', './routes/v1/auth/*.controller.mjs', './routes/v1/users/*.controller.mjs', './routes/v1/template/*.controller.mjs'],
};

const appRouter = express.Router();
const appRoutes = [];

// Ping routes
appRoutes.push({
  method: '',
  path: '/ping',
  router: PingRouter,
});

// AUTH routes
appRoutes.push({
  method: '',
  path: '/auth',
  router: AuthRouter,
});

// Users routes
appRoutes.push({
  method: '',
  path: '/users',
  router: UsersRouter,
});

// Template routes
appRoutes.push({
  method: '',
  path: '/template',
  router: TemplateRouter,
});

// BullMQ routes
if (BullMQConfigs.ENABLE_BULLMQ) {
  appRoutes.push({
    method: '',
    path: BullMQConfigs.BULLMQ_ADMIN_PATH,
    router: bullmq.serverAdapter.getRouter(),
  });
}

// Swagger routes
appRoutes.push({
  method: '',
  path: '/api-docs',
  router: swaggerUi.serve,
});
appRoutes.push({
  method: 'GET',
  path: '/api-docs',
  router: swaggerUi.setup(swaggerJsdoc(swaggerJsdocOptions)),
});

appRoutes.forEach((route) => {
  const { method, path, router } = route;

  switch (method) {
    case 'GET':
      appRouter.get(path, router);
      break;
    case 'POST':
      appRouter.post(path, router);
      break;
    case 'PUT':
      appRouter.put(path, router);
      break;
    case 'DELETE':
      appRouter.delete(path, router);
      break;
    case 'PATCH':
      appRouter.patch(path, router);
      break;
    default:
      appRouter.use(path, router);
      break;
  }
});

export { appRouter as V1Router };

