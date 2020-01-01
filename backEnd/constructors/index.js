const Router = require('koa-router');
const router = new Router();
const query = require('../test');


const WebsiteController = require('./websiteController');
const UserController = require('./UserController');

const websiteController = new WebsiteController();
const userController = new UserController();

module.exports = app => {

  router
  .get('/', websiteController.actionIndex)
  .get('/api/getAllwebsite', websiteController.actionAllwebsite)
  .post('/api/website', websiteController.actionCreate)
  .put('/api/website', websiteController.actionUpdate)
  .delete('/api/website', websiteController.actionDelete)
  
  .post('/api/register', userController.register)
  .post('/api/login', userController.login)
  .get('/api/user/website', userController.actionIndex)
  .post('/api/user/addwebsite', userController.actionAddwebsite)
  .post('/api/user/addColl', userController.actionAddColl)
 


  app
  .use(router.routes())
  .use(router.allowedMethods());
};
