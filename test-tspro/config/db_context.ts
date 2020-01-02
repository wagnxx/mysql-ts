import { Sequelize } from 'sequelize-typescript';
import { resolve } from 'path';
import UserTable from '../dao/UserTable';
import CollTable from '../dao/CollTable.';
import WebsitesTable from '../dao/WebsitesTable';

const sequelize = new Sequelize('test', 'root', 'root', {
  
  dialect: 'mysql',
  host: '192.168.1.104',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});
 
sequelize.addModels([resolve(__dirname, `../dao`)]);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // CollTable.findData(1).then(res=>{
  //   console.log(res)
  // })

export { sequelize, UserTable, CollTable, WebsitesTable };

