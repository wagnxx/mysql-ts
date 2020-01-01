import {
  authFluentProvide,
  interfaces,
  controller,
  TYPE,
  httpGet,
  httpPost,
  httpDelete,
  httpPut,
  inject,
  Router
} from '../ioc/inversify.config';
import TAGS from '../constant/TAGS';
import { IUser } from '../interface/Api';

@controller('/api/user')
@authFluentProvide(TYPE.Controller, 'UserController')
export default class UserController implements interfaces.Controller {
  private userService: IUser;
  constructor(@inject(TAGS.UserService) userService) {
    this.userService = userService;
  }
 
  @httpPost('/login')
  async login(ctx:Router.IRouterContext,next: () => Promise<object>) {
   return this.userService.login(ctx,next);
  }
 
  @httpPost('/register')
  async register(ctx:Router.IRouterContext, next: () => Promise<any>) {
    return this.userService.register(ctx,next);
  }


}
