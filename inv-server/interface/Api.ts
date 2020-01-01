import {
  Router
} from '../ioc/inversify.config';


export interface IApi {
  getInfo(rull: string, arg?: object, callback?: Function): Promise<object>;
  getAllwebsite():Promise<object>;
}
export interface IUser {
  register(ctx:Router.IRouterContext,next: () => Promise<any>):Promise<object>|void;
   login(ctx:Router.IRouterContext,next: () => Promise<any>):Promise<object>|void;
}
