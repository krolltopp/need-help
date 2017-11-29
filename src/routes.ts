import * as Joi from 'joi';
import { userController } from './user.controller';

import * as Log4js from 'log4js';
const logger = Log4js.getLogger('routes');
logger.level = 'debug';

const routes: any[] = [
  {
      method: 'GET',
      path: '/api/ping',
      handler: (req: any, rt: any) => {
        const ping: any = { alive: true };
        const response: any = rt.response(ping);
        response.code(200);
        return response;
      },
  },

  {
    method: 'GET',
    path: '/api/users',
    handler: userController.listUsers,
  },

  {
    method: 'GET',
    path: '/api/users/{userName}',
    handler: userController.getUser,
  },

  {
    method: 'POST',
    path: '/api/users',
    handler: userController.addUser,
    config: {
      validate: {
        payload: {
          userName: Joi.string().required(),
          locationDate: Joi.date().optional(),
          location: {
            lat: Joi.number().min(-90).max(90).optional(),
            lng: Joi.number().min(-180).max(180).optional(),
          },
        },
      },
    },
  },

  {
    method: 'PATCH',
    path: '/api/users/{userName}/location',
    handler: userController.setLocation,
    config: {
      validate: {
        params: {
          userName: Joi.string(),
        },
        payload: {
          location: {
            lat: Joi.number().min(-90).max(90).optional(),
            lng: Joi.number().min(-180).max(180).optional(),
          },
        },
      },
    },
  },

  {
    method: 'DELETE',
    path: '/api/users/{userName}',
    handler: userController.deleteUser,
  },
];

export { routes };
