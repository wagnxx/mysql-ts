import { Router } from '../ioc/inversify.config';


export default async function(
  ctx: Router.IRouterContext,
  next: () => Promise<any>,
  whiteList: string[] = ['/login']
) {
  let whiteListDefault = ['/api/user/login', '/api/user/register', '/api/user/logout'];

  let wl = [...whiteListDefault, ...whiteList];

  if (wl.indexOf(ctx.url) > -1) {
    return next();
  }

  if (ctx.cookies.get('user')) {
    return next();
  } else {
    ctx.body = {
      code: 200,
      data:{
        msg:'need_login'
      }
    };
  }
}
