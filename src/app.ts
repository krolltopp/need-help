const Hapi = require('hapi');
import * as Log4js from 'log4js';

const logger = Log4js.getLogger('app');
logger.level = 'debug';

const server = Hapi.Server({ port: 3000 });

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
