const Hapi = require('hapi');
import * as Log4js from 'log4js';
import { DbManager } from './db-manager';

const logger = Log4js.getLogger('app');
logger.level = 'debug';

const server = Hapi.Server({ port: 3000 });

DbManager.connect().then(() => {
  logger.debug('Connected to DB');
}).catch((err) => {
  logger.error('Error connecting to DB', err);
  process.exit(1);
});

server.start((err: any) => {

    if (err) {
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request: any, reply: any) => {
        return 'NEED HELP';
    },
});

async function registerPlugins() {
    await server.register();
}
