import { Table, Column, Model } from 'sequelize-typescript';
import BaseTable from './BaseTable';

@Table({
    tableName:'user'
})
export default class UserTable extends Model<UserTable>  {
    @Column
    uname:string;
 
    @Column
    upass:string;
 
}