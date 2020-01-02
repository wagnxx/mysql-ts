import "reflect-metadata";
import './ioc';
import {
  Container,
  InversifyKoaServer,
  buildProviderModule
} from './ioc/inversify.config';

import config from './config';
import logic from './middleware/logic'
import  * as bodyParser from 'koa-bodyparser';
 
const container = new Container();
container.load(buildProviderModule());

const server = new InversifyKoaServer(container);
server.setConfig(app=>{
  app.use(
    bodyParser({
      extendTypes: {
        json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
      }
    })
  );
  app.use(logic);
})
const app = server.build();

app.listen(config.port, () => {
  // console.log('inversify server is running on port ' + config.port);
});
// process.nextTick(() => {
// });
