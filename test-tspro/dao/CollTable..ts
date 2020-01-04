import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import BaseTable from './BaseTable';
import WebsitesTable from './WebsitesTable';
import UserTable from './UserTable';

@Table({
  tableName: 'coll'
})
export default class CollTable extends Model<CollTable> {
  @Column
  uid: number;

  @Column
  wid: number;

  // 传入targetKey指定目标模型的外联key
  @BelongsTo(() => WebsitesTable, {
    as: 'w',
    foreignKey: 'wid',
    targetKey: 'id'
  })
  websitesTable: WebsitesTable;


  static async findData(uid: number) {
    const results = await this.findAll({
      where: { uid },
      attributes: [['id','cid']],
      include: [
        {
          model: WebsitesTable,
          attributes: ['id', 'url', 'name','alexa','country']
        }
      ],
      raw: true,
      nest:true,
    });

    return results.map(c=>{
      return {
        cid:c.cid,
        ...c.w
      }
    });
  }
}
