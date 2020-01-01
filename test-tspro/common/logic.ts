import { Router } from '../ioc/inversify.config';
import * as db from '../config/db_context';

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

  // let uid = ctx.cookies.get('uid');
    // let result = [];

    // let sql = `
    //   select c.wid,w.id,w.name,w.url,w.alexa,w.country from coll c
    //   join
    //   websites w
    //   on
    //   c.wid=w.id
    //   and
    //   c.uid=${uid};
    // `;

    // result = await db.query(sql);

  if (ctx.cookies.get('uid')) {
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
