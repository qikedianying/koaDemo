const {Sequelize, Model} = require('sequelize')
const { db } = require('../core/db') // 重命名

class Flow extends Model {}

// 通过这个编号 去模型里获取具体的信息
// 外键的概念

Flow.init({
  index: Sequelize.INTEGER,
  artId: Sequelize.INTEGER,
  type: Sequelize.INTEGER
  // type 对应某张表
  // art_id 对应某张表唯一的数据
  // 数据库表与表之间的关联
},{
  sequelize: db,
  tableName: 'flow'
},)

module.exports = {
  Flow
}
