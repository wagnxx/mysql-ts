import { fluentProvide,buildProviderModule,provide} from 'inversify-binding-decorators';
import { Container,inject } from "inversify";
 

export {
    interfaces,
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    TYPE,
    InversifyKoaServer
} from 'inversify-koa-utils';
 
import  * as Router  from 'koa-router'



function authFluentProvide(c,n){
return fluentProvide(c)
.whenTargetNamed(n)
.done()
}

export {
    Container,inject ,
    provide,
    authFluentProvide,
    buildProviderModule,
    Router
}