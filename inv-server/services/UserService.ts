import { provide } from '../ioc/inversify.config';
import { IUser } from '../interface/Api';
import TAGS from '../constant/TAGS';
import * as db from '../config/db_context';
import { Router } from '../ioc/inversify.config';


@provide(TAGS.UserService)
export default class UserService implements IUser {
  
  register(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<object> {
    let result = { data: 'register' };
    ctx.body = result;
    ctx.response.body = { data: { msg :'register'}, code: 200 };
    return Promise.resolve(result);
  }

  login(ctx: Router.IRouterContext, next: () => Promise<any>):Promise<object>|void{
   
    // let body=ctx.request.body;
    // const {user:uid,password:pid} =body;

    // let par={uid,pid};

    // // ctx.body = { data: { msg :'登录成功',par}, code: 200 };
    ctx.response.body={
      data:{
        abc:'abcxxxxxxxxxxx'
      }
    }
  
    // return Promise.resolve(result);
  }
}
