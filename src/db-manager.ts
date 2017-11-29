import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import * as Log4js from 'log4js';

const logger = Log4js.getLogger('db-manager');
logger.level = 'debug';

const mongoDbHost: string = process.env.MONGODB_HOST || 'localhost';
const databaseName: string = 'needhelp';
const connUri: string = 'mongodb://user:pass@' + mongoDbHost + '/' + databaseName;

logger.debug('Mongodb connection : ', connUri);

// (Mongoose as any).Promise = Bluebird;
(mongoose as any).Promise = global.Promise;

class DbManager {

  public static connect(): mongoose.MongooseThenable {
    logger.debug('MONGODB_APPLICATION_USER : ', process.env.MONGODB_APPLICATION_USER);
    logger.debug('MONGODB_APPLICATION_PASS : ', process.env.MONGODB_APPLICATION_PASS);
    try {
      return mongoose.connect(connUri, {
        user: process.env.MONGODB_APPLICATION_USER,
        pass: process.env.MONGODB_APPLICATION_PASS,
        useMongoClient: true,
      });
    } catch (error) {
      logger.warn('connet : ', error);
      throw error;
    }
  }

  private constructor() {}
}

export { DbManager };
