import * as Mongoose from 'mongoose';
import * as Bluebird from 'bluebird';

const mongoDbHost: string = process.env.MONGODB_HOST || 'localhost';
const databaseName: string = 'needhelp';
const connUri = 'mongodb://user:pass@' + mongoDbHost + '/' + databaseName;

(Mongoose as any).Promise = Bluebird;

class DbManager {

  public static connect(): Mongoose.MongooseThenable {
    return Mongoose.connect(connUri, {
      user: process.env.MONGODB_APPLICATION_USER || 'needhelp',
      pass: process.env.MONGODB_APPLICATION_PASS || '_needhelp_',
      useMongoClient: true,
    });
  }

  private constructor() {}
}

export { DbManager };
