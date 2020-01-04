import { provide } from '../ioc/inversify.config';
import { IUser } from '../interface/Api';
import { Result } from '../interface/Result';
import TAGS from '../constant/TAGS';
import * as db from '../config/db_context';
import { Router } from '../ioc/inversify.config';

@provide(TAGS.UserService)
export default class UserService implements IUser {
 async register(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ){
    let body = ctx.request.body;
    const { user: uname, password: upass } = body;

    let par = { uname, upass };

    let findUser= await db.UserTable.findAll({raw:true,where:{...par}});

    let result:Result={
      code:200,
      data:null,
    };
    let createResult=null;

    if(findUser.length>0){
      result.data={msg:'已注册'};
  
    }else{
      createResult = await db.UserTable.create({...par});
      result.data=createResult?{msg:'注册成功'}:{msg:'注册失败'};

    }    
    ctx.response.body = result
  }

 async login(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ) {
    let body = ctx.request.body;
    const { user: uname, password: upass } = body;

    let par = { uname, upass };

    let findUser= await db.UserTable.findAll({raw:true,where:{...par}});

    let result:Result={
      code:200,
      data:null,
    };
    let uid=null;

    if(findUser.length>0){
      result.data={msg:'登录成功'};
      uid=findUser[0].id    
    }else{
      result.data={msg:'登录失败'};
      result.code='sys_401';
    }

    // // ctx.body = { data: { msg :'登录成功',par}, code: 200 };
    ctx.cookies.set('uid', uid,{
      domain: 'localhost', // 写cookie所在的域名
      path: '/', // 写cookie所在的路径
      maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
      // expires:1000*60*60*24, // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: true // 是否允许重写
    })
    
    ctx.response.body = result

 
  }
}
