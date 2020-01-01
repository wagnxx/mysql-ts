
const createPoolConn = require('./pool');
class Connect {
  static getInstance() {
    if (!Connect.instance) {
      Connect.instance = new Connect();
    }
    return Connect.instance;
  }

  constructor() {
    // this.mysql = require('mysql');
    // this.connection = this.mysql.createConnection({
    //   host: '192.168.1.104',
    //   user: 'root',
    //   password: 'root',
    //   database: 'test'
    // });
    this.init();

    // this.connection=connection();

    // this.connection.connect();
  }
  async init(){
    this.connection=await createPoolConn();
  }
  close(){
      connection.end(function(err){
          if(err){
            console.log('[connection end] faild');
              return;
          }
          console.log('[connection end] succesed');
      })
  }

  query(sql) {
    return this._operation(sql);
  }
  select(array, table, where, link) {
    let sql = 'SELECT ';
    let array_str = array.join(',');
    sql += array_str;
    sql += ' FROM ' + table;
    if (where) {
      sql += this._handleWhereString(where, link);
    }
    return this._operation(sql);
  }
  /**
   *
   * @param {Object} info {key:value}
   * @param {String} table tableName
   */
  insert(info, table) {
    let ent = Object.entries(info);
    let fieldStr = ent.map(f => f[0]).join(',');
    let valStr = ent.map(f => `'${f[1]}'`).join(',');

    let sql = `
      INSERT INTO ${table} ( ${fieldStr} )
      VALUES
      ( ${valStr});
      `;

    return this._operation(sql);
  }

 async update(info,table,where,link){
    let entries = Object.entries(info);
    // entries=entries.filter(ent=>ent[0]!='id');
  
    // let whereStr =` id=${params.id}`
    let setStr = entries.map(ent=>`${ent[0]}='${ent[1]}'`).join(',');
    let sql=` UPDATE ${table} SET ${setStr}`
    if(where){
        sql += this._handleWhereString(where, link);
    }


   return this._operation(sql);
  
    
  }

  delete(info,table,where,link){
      let sql=`DELETE FROM ${table} `;
      if(where){
          sql+=this._handleWhereString(where,link);
      }

    return this._operation(sql);
  }

  _operation(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (error, result, fields) => {
        if (error) {
          console.log(error.message);
          reject(error.message);
        } else {
            console.log('opration result===================',result)
          resolve(result);
        }
      });
    });
  }

  _handleWhereString(where, link) {
    let str = '';
    let whereArray = [];
    Object.keys(where).forEach(key => {
      whereArray.push(String(key + "='" + where[key] + "'"));
    });
    if (link) {
      let whereStr = whereArray.join(' ' + link + ' ');
      str += ' WHERE ' + whereStr;
    } else {
      let whereStr = whereArray.join(' AND ');
      str += ' WHERE ' + whereStr;
    }
    return str;
  }
}

module.exports = Connect.getInstance();
