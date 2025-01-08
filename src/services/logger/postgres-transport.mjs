import TransportStream from 'winston-transport';
import * as PostgresService from '../postgres/postgres.mjs';

class PostgresTransport extends TransportStream {
  constructor(options) {
    super(options);

    this.name = options?.name ?? 'Postgres Transport';
    this.level = options?.level ?? 'info';
    this.silent = options?.silent ?? false;

    const tableName = options?.tableName ?? 'logs';
    const tableFields = options?.tableFields ?? [
      {
        name: 'timestamp',
        dataType: 'string',
      },
      {
        name: 'level',
        dataType: 'string',
      },
      {
        name: 'message',
        dataType: 'string',
      },
      {
        name: 'meta',
        dataType: 'json',
      },
    ];

    this.table = {
      name: tableName,
      columns: tableFields,
    };
  }

  log(info, callback) {
    const { level, message, meta } = info;
    const { table } = this;

    if (!callback) {
      callback = () => {};
    }

    if (this.silent) {
      callback(null, true);
      return null;
    }

    const data = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta: meta ?? {},
    };

    return PostgresService.client[table.name]
      .create({
        data,
      })
      .then(() => {
        this.emit('logged', info);
        callback(null, true);
        return null;
      })
      .catch((err) => {
        this.emit('error', err.stack);
        callback(err.stack);
        return null;
      });
  }
}

export { PostgresTransport };
