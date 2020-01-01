import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class BaseTable extends Model<BaseTable>{
    @Column({
        primaryKey:true,
        autoIncrement:true
    })
    id:number;

    /**
     * 字符串索引器
     */
    [index:string]:any;

    /**
     * 添加
     * @param item 新项目
     */
    static async createItem<T extends BaseTable>(item:T){
        return await this.create(item);
    }

    /**
     * 删除
     * @param id 
     */
    static async deleteById<T extends BaseTable>(id:number){
        return await this.destroy({
            where:{id:id}
        });
    }

    /**
     * 更新
     * @param item 新项目对象
     * @param id 需要修改的项目id
     */
    static async updateItemById<T extends BaseTable>(item:T, id:number){
        let objItem = await this.getById(id) as T;
        for(let key in item)
            objItem[key] = item[key];
        
        return await objItem.save();
    }

    /**
     * 查询所有
     */
    static async getList<T extends BaseTable>(){
        let items = await this.findAll({raw:true});
        return items as T[];
    }

    /**
     * 查询（通过id）
     * @param id 
     */
    static async getById<T extends BaseTable>(id:number){
        let item = await this.findOne({
            raw:true,
            where:{id:id}
        });

        return item as T;
    }
}