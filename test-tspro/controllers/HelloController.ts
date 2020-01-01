import {
  authFluentProvide,
  interfaces,
  controller,
  TYPE,
  httpGet,
  inject
} from '../ioc/inversify.config';
import TAGS from '../constant/TAGS';
 import {IApi} from '../interface/Api';

@controller('/hell')
@authFluentProvide(TYPE.Controller, 'HelloController')
export default class HelloController implements interfaces.Controller {
  private apiService: IApi;
  constructor(@inject(TAGS.ApiService) apiService){
    this.apiService=apiService;
  }
  @httpGet('/')
  async hell(ctx, next) {
    ctx.body = await this.apiService.getInfo('');
  }
}
