const Hapi = require('hapi');
import * as Log4js from 'log4js';
import { DbManager } from './db-manager';
import { routes } from './routes';

const logger = Log4js.getLogger('app');
logger.level = 'debug';

const server = Hapi.Server({ port: 3000 });

server.events.on('start', (route: any) => {
 logger.debug('Server started : ', server.info);
});

// Needed for the population of users in MongoDB to finish
setTimeout(() => {
  configAndStartServer().catch((err: any) => {
    logger.error('Failed starting server :', err);
    process.exit(1);
  });
}, 5000);

async function configAndStartServer() {
  await DbManager.connect();
  await server.initialize();
  await server.route(routes);
  await server.start();
}

async function registerPlugins() {
    await server.register();
}
