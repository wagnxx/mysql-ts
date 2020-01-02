import { provide } from '../ioc/inversify.config';
import { IApi } from '../interface/Api';
import TAGS from '../constant/TAGS';
import * as db from '../config/db_context';
import { Router } from '../ioc/inversify.config';

@provide(TAGS.ApiService)
export default class ApiService implements IApi {
  getInfo(rull: string): Promise<object> {
    return Promise.resolve({ a: 12, b: 33 });
  }
  async getWebsite(ctx: Router.IRouterContext, next: () => Promise<any>) {

    let uid: number = ctx.cookies.get('uid')
      ? Number(ctx.cookies.get('uid'))
      : null;
    let data = await db.CollTable.findData(uid);
    
    let result= {
      data: {
        code:200,
        data:[...data]
      }
    };
    // ctx.response.body=result;
    ctx.response.body =result;
   
  }
  async getAllwebsite(ctx: Router.IRouterContext, next: () => Promise<any>) {
    let data = await db.WebsitesTable.findAll();
    ctx.response.body={ data: data, code: 200 };
  }
}
