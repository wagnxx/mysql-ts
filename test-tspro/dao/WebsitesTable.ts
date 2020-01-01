import { Table, Column, Model } from 'sequelize-typescript';
// import BaseTable from './BaseTable';

@Table({
  tableName: 'websites'
})
export default class WebsitesTable extends Model<WebsitesTable> {
  @Column
  name: string;

  @Column
  url: string;

  @Column
  alexa: number;

  @Column
  country: string;


}
