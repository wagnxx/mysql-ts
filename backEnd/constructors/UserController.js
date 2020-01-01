const query = require('../test');
const db = require('../dao/connect');

class UserController {
  constructor(db) {}
  async login(ctx, next) {
    let params = ctx.request.body;

    let fc = ctx.cookies.get('username');
    let uname = params.user;
    let upass = params.password;

    let userResult = await db.query(
      `select * from user where uname='${uname}' and upass='${upass}'`
    );

    ctx.cookies.set('username', uname, {
      domain: 'localhost', // 写cookie所在的域名
      path: '/', // 写cookie所在的路径
      maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
      // expires:1000*60*60*24, // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: true // 是否允许重写
    });

    if (userResult) {
      ctx.cookies.set('uid', userResult[0].id, {
        domain: 'localhost', // 写cookie所在的域名
        path: '/', // 写cookie所在的路径
        maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
        // expires:1000*60*60*24, // cookie失效时间
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: true // 是否允许重写
      });
      ctx.response.body = { data: { msg :'登录成功'}, code: 200 };
    } else {
      ctx.cookies.set('uid', null, {
        domain: 'localhost', // 写cookie所在的域名
        path: '/', // 写cookie所在的路径
        maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
        // expires:1000*60*60*24, // cookie失效时间
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: true // 是否允许重写
      });
    }

    
  }
  async register(ctx, next) {
    let params = ctx.request.body;
    let uname = params.user;
    let upass = params.password;

    let userResult = await db.insert({ uname, upass }, 'user');
    ctx.type = 'json';
    let msg = '';
    if (userResult) {
      msg = '注册成功';
    } else {
      msg = '注册失败';
    }
    ctx.response.body = { data: { msg }, code: 200 };
  }

  async actionIndex(ctx, next) {
    let uid = ctx.cookies.get('uid');
    let result = [];

    let sql = `
      select c.wid,w.id,w.name,w.url,w.alexa,w.country from coll c
      join
      websites w
      on
      c.wid=w.id
      and
      c.uid=${uid};
    `;

    result = await db.query(sql);
    // if(wids.length==0 || data.length ==0){

    ctx.type = 'json';

    ctx.response.body = { data: result, code: 200 };
  }
  async actionAddwebsite(ctx, next) {
    let data = await db.select(['*'], 'websites');
    let params = ctx.request.body;

    let name = params.name;
    let queryStr = `SELECT * from websites where name='${name}'`;
    let checkName = await db.query(queryStr);

    if (checkName.length == 0) {
      // 插入
      console.log('插入环节');

      let insertResult = await db.insert(params, 'websites');
      if (insertResult) {
        console.log('insert result success', insertResult);
        ctx.type = 'json';
        ctx.response.body = {
          code: 200,
          data: {
            msg: '插入成功'
          }
        };
      } else {
        ctx.type = 'json';
        ctx.response.body = {
          code: 200,
          data: {
            msg: '插入失败'
          }
        };
      }
    } else {
      // 已存在
      // ctx.body = await ctx.render('test/index', { data, exit: true ,text:'已经存在'});
      ctx.type = 'json';
      ctx.response.body = {
        data: {
          code: 200,
          msg: '已经存在'
        }
      };
    }
  }

  async actionAddColl(ctx, next) {
    let params = ctx.request.body;
    let uid = ctx.cookies.get('uid');

    let sId = params.sId;
    let queryStr = `SELECT * from coll where uid=${uid} and wid=${sId};`;
    let checkName = await db.query(queryStr);

    if (checkName.length == 0) {
      // 插入
      console.log('插入环节');
      let rawPar = {
        uid,
        wid: sId
      };

      let insertResult = await db.insert(rawPar, 'coll');
      ctx.type = 'json';
      if (insertResult) {
        ctx.response.body = {
          code: 200,
          data: {
            msg: '插入成功'
          }
        };
      } else {
        ctx.response.body = {
          code: 200,
          data: {
            msg: '插入失败'
          }
        };
      }
    } else {
      // 已存在
      ctx.response.body = {
        data: {
          code: 200,
          msg: '已经存在'
        }
      };
    }
  }
  async actionDelete(ctx, next) {
    // put
    console.log('delete请求');
    // let data = await query();
    let query = ctx.query;
    console.log('put qStr', query);

    // let qStr=deleteStr(params);
    // let deleteResult=await query(qStr);
    let deleteResult = await db.delete([], 'websites', { id: query.id });
    console.log('deleteResult result', deleteResult);
    if (deleteResult) {
      // ctx.response.redirect('/website');
      ctx.type = 'json';
      ctx.response.body = {
        code: 200,
        data: {
          msg: '删除成功'
        }
      };
    } else {
      ctx.type = 'json';
      ctx.response.body = {
        code: 403,
        data: {
          msg: '删除失败'
        }
      };
    }
  }
}

module.exports = UserController;
