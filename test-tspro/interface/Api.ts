import {
  Router
} from '../ioc/inversify.config';

interface O {
  o: Promise<any>,
}

 

export interface IApi {
  getInfo(rull: string, arg?: object, callback?: Function): Promise<object>;
  getWebsite(ctx: Router.IRouterContext,
    next: () => Promise<any>);
  getAllwebsite(ctx: Router.IRouterContext,
    next: () => Promise<any>);
    addColl(ctx: Router.IRouterContext,
    next: () => Promise<any>);
}
export interface IUser {
  register(ctx:Router.IRouterContext,next: () => Promise<any>);
   login(ctx:Router.IRouterContext,next: () => Promise<any>);
}
