import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PostgresConfigs } from '../../app.config.mjs';
import { Logger } from '../../services/logger/logger.mjs';

const pool = new pg.Pool({ connectionString: PostgresConfigs.POSTGRES_URI });
const adapter = new PrismaPg(pool);
const client = new PrismaClient({ adapter });

const connect = async () => {
  if (PostgresConfigs.ENABLE_POSTGRES && client) {
    await client.$connect();
  }
};

const disconnect = async () => {
  if (PostgresConfigs.ENABLE_POSTGRES && client) {
    await client.$disconnect();
  }
};

const bootstrap = async () => {
  if (PostgresConfigs.ENABLE_POSTGRES) {
    try {
      await connect();
      Logger.log('info', `Postgres is ready to use`);
    } catch (error) {
      Logger.log('error', `Can't connect to Postgres due to: ${JSON.stringify(error)}`);
    }
  }
};

export { bootstrap, client, connect, disconnect };

