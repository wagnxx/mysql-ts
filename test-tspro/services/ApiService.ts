import { provide } from '../ioc/inversify.config';
import { IApi } from '../interface/Api';
import { Result } from '../interface/Result';
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

    let result:Result= {
      code: 200,
      data: [...data]
    };
    // ctx.response.body=result;
    ctx.response.body = result;
  }
  async getAllwebsite(ctx: Router.IRouterContext, next: () => Promise<any>) {
    let data = await db.WebsitesTable.findAll();
    let result:Result= {
      code: 200,
      data: [...data]
    };
    ctx.response.body = result;
  }

  async addColl(ctx: Router.IRouterContext, next: () => Promise<any>) {
    let uid: number = ctx.cookies.get('uid')
      ? Number(ctx.cookies.get('uid'))
      : null;
    let body = ctx.request.body;
    const { sId: wid } = body;

    let par = { wid, uid };
    let data = await db.CollTable.create({
      ...par
    });
    let result:Result = {
      code: 200
    };
    if (data) {
      result.data = { msg: '插入成功' };
    } else {
      result.data = { msg: '插入失败' };
    }
    ctx.response.body = result;
  }
}
