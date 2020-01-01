const path = require('path');
const Koa = require('koa');

const render = require('koa-swig');
const co = require('co');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('koa2-cors');
const app = new Koa();
debugger;
const log4js = require('log4js');
const logger = log4js.getLogger();
log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/err.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});

errorHandler.error(app, logger);

app.use(
  bodyParser({
    extendTypes: {
      json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
    }
  })
);

// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
//   ctx.set('Access-Control-Max-Age', 3600 * 24);
//   await next();
//  });

app.use(
  cors({
    origin: '*',
    credentails: true,
  })
);

require('./constructors')(app);

// app.context.render = co.wrap(render({
//     root: path.join(__dirname, 'views'),
//     autoescape: true,
//     cache: false, // disable, set to false
//     ext: 'html',
//     // locals: locals,
//     // filters: filters,
//     varControls: ['[[',']]'],
//   }));

app.listen(4000, () => {
  newFunction();
});

function newFunction() {
  console.log('koa server is running on port 4000');
}
