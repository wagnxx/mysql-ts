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
import { IApi } from '../interface/Api';

@controller('/api/website')
@authFluentProvide(TYPE.Controller, 'ApiController')
export default class ApiController implements interfaces.Controller {
  private apiService: IApi;
  constructor(@inject(TAGS.ApiService) apiService) {
    this.apiService = apiService;
  }
 
  @httpGet('/getWebsite')
  async getWebsite(ctx:Router.IRouterContext, next) {
     return this.apiService.getWebsite(ctx,next);
  }
 
  @httpGet('/getAllwebsite')
  async getAllwebsite(ctx:Router.IRouterContext, next) {
    return this.apiService.getAllwebsite(ctx,next);
  }
}
