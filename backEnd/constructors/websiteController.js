const query = require('../test');
const db = require('../dao/connect');

class WebsiteController {
  constructor(db) {}
  async actionIndex(ctx, next) {
    // let data = await query();
    // let data = await db.select(['*'], 'websites');
    let uid=ctx.cookies.get('uid');
    let uname=ctx.cookies.get('username');
    let result=[];
    let data = await db.query('select * from websites');

    let wids=await db.query(`select wid from coll where uid=${uid}`);
    if(wids.length==0 || data.length ==0){

    }else{
     let  ids=wids.map(item=>item.wid);
      result=data.filter(item=>{
        return ids.includes(item.id);
      })
    }


    ctx.type = 'json';

    ctx.response.body = { data:result, code: 200 };
  }
  async actionAllwebsite(ctx, next) {
 
    let data = await db.query('select * from websites');
 
    ctx.type = 'json';

    ctx.response.body = { data:data, code: 200 };
  }
  async actionCreate(ctx, next) {
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

  async actionUpdate(ctx, next) {
    // put
    console.log('put请求');
    let params = ctx.request.body;
    let id = params.id;
    if (!id) return;

    let updateResult = await db.update(params, 'websites', { id });
    if (updateResult) {
      // let data = await db.select(['*'], 'websites');
      // console.log('updateResult result', updateResult);
      // ctx.response.redirect('/');
      ctx.type = 'json';
      ctx.response.body = {
        code: 200,
        data: {
          msg: '更新成功'
        }
      };
    } else {
      ctx.type = 'json';
      ctx.response.body = {
        code: 200,
        data: {
          msg: '更新失败'
        }
      };
      // ctx.body = '修改失败';
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

module.exports = WebsiteController;
