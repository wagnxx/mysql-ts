// custom_typings/express/index.d.ts
import { Router } from '../ioc/inversify.config';
import { Router } from 'express';

declare namespace Router {
  declare namespace IRouterContext {
    interface request extends Router.IRouterContext.Request {
      body: any;
    }
  }
}
