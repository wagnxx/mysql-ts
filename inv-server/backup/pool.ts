import * as mysql from 'mysql';
// 连接池配置
const dbPoolConfig = {
  host: '192.168.1.104',
  user: 'root',
  password: 'root',
  database: 'test',
  acquireTimeout: 15000, // 连接超时时间
  connectionLimit: 100, // 最大连接数
  waitForConnections: true, // 超过最大连接时排队
  queueLimit: 0 // 排队最大数量(0 代表不做限制)
};
// 创建连接池
const pool = mysql.createPool(dbPoolConfig);
const poolImp = {
  // 执行
  query: (sql, para) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) return reject(err);
        conn.query(sql, para, (err, rows) => {
          conn.release();
          if (err) return reject(err);
          return resolve(rows);
        });
      });
    });
  }
};

const createPoolConn=():Promise<Function>=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            if(err) reject(err);
            resolve(conn);
        });
    });
}


export default createPoolConn;
