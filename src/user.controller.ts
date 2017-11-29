import { IAccident, IUser } from './types';
import { IAccidentDoc, AccidentModel } from './accident';
import { IUserDoc, UserModel } from './user';
import * as mongoose from 'mongoose';
import * as Log4js from 'log4js';

const logger = Log4js.getLogger('UserController');
logger.level = 'debug';

class UserController {

  private static async findUser(userName: string): Promise<IUserDoc | null> {
    const user: IUserDoc | null = await UserModel.findOne({userName}, (error: any, doc: IUserDoc) => {
      logger.debug('user : ', doc);
      if (error) {
        throw error;
      } else {
        return doc;
      }
    });
    return user;
  }

  public constructor() {
    logger.debug('this', this);
    this.dummy();
  }

  public listUsers(req: any, rt: any): any {
    const result: any[] = [];
    const response: any = rt.response(result);
    response.code(200);
    return response;
  }

  public async getUser(req: any, rt: any): Promise<IUserDoc> {
    const userName: string = req.params.userName;
    try {
      const user: IUserDoc | null = await UserController.findUser(userName);

      const response: any = rt.response(user);
      if (user !== null) {
        response.code(200);
      } else {
        response.code(404);
      }
      return response;
    } catch (error) {
      const response: any = rt.response({
        error: error.message,
      });
      response.code(500);
      return response;
    }
  }

  public async addUser(req: any, rt: any): Promise<IUserDoc> {
    const user: IUser = req.payload;
    const userModel: IUserDoc  = new UserModel(user);
    try {
      const doc = await userModel.save();
      logger.debug('doc : ', doc);
      const result: any = req.payload;
      const response: any = rt.response(doc);
      response.code(200);
      return response;
    } catch (error) {
      logger.debug('error', error);
      const response: any = rt.response({
        error: error.message,
      });
      response.code(500);
      return response;
    }
  }

  public deleteUser(req: any, rt: any): any {
    const response: any = rt.response();
    response.code(200);
    return response;
  }

  public async setLocation(req: any, rt: any): Promise<IUserDoc> {
    const location = req.payload.location;
    logger.debug('location', location);
    const userName: string = req.params.userName;
    try {
      const user: IUserDoc | null = await UserController.findUser(userName);
      const response: any = rt.response(user);
      if (user !== null) {
        user.location = [location.lng, location.lat];
        user.locationDate = new Date();
        await user.save();
        response.code(200);
      } else {
        response.code(404);
      }
      return response;
    } catch (error) {
      logger.debug('error', error);
      const response: any = rt.response({
        error: error.message,
      });
      response.code(500);
      return response;
    }
  }

  private dummy() {
    logger.debug('dummy');
  }

}

const userController = new UserController();

export { userController };
