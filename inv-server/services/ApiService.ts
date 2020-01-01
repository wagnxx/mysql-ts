import { provide } from '../ioc/inversify.config';
import { IApi } from '../interface/Api';
import TAGS from '../constant/TAGS';
import * as db from '../config/db_context'

@provide(TAGS.ApiService)
export default class ApiService implements IApi {
  getInfo(rull: string): Promise<object> {
    return Promise.resolve({ a: 12, b: 33 });
  }
  async getAllwebsite() {
    let data = await db.WebsitesTable.findAll()
    return Promise.resolve({ data: data, code: 200 });
  }
}
