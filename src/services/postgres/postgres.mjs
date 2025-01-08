import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PostgresConfigs } from '../../app.config.mjs';
import { Logger } from '../../services/logger/logger.mjs';

const pool = (() => {
  if (!PostgresConfigs.ENABLE_POSTGRES) {
    return;
  }

  return new pg.Pool({ connectionString: PostgresConfigs.POSTGRES_URI });
})();

const adapter = (() => {
  if (!PostgresConfigs.ENABLE_POSTGRES || !pool) {
    return;
  }

  return new PrismaPg(pool);
})();

const client = (() => {
  if (!PostgresConfigs.ENABLE_POSTGRES || !adapter) {
    return;
  }

  return new PrismaClient({ adapter });
})();

const connect = async () => {
  if (!PostgresConfigs.ENABLE_POSTGRES || !client) {
    return;
  }
  await client.$connect();
};

const disconnect = async () => {
  if (!PostgresConfigs.ENABLE_POSTGRES || !client) {
    return;
  }
  await client.$disconnect();
};

const bootstrap = async () => {
  if (!PostgresConfigs.ENABLE_POSTGRES) {
    return;
  }

  try {
    await connect();
    Logger.log('info', `Postgres is ready to use`);
  } catch (error) {
    Logger.log('error', `Can't connect to Postgres due to: ${JSON.stringify(error)}`);
  }
};

export { bootstrap, client, connect, disconnect };
