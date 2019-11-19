const Sequelize = require('sequelize')

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database
// Sequelize 的用法有点类似于koa

// sequelize 的构造函数接收四个参数 dbname user password js对象
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // sequelize 不仅仅可以连接mysql 需要mysql驱动mysql2
  host,
  port,
  loggin: true, // 显示原始的sql操作
  timezone: '+08:00', // 用北京时间记录时间方面的东西
  define: {
    // create_time update_time delete_time
    timestamps: true,
    paranoid: true, // delete_time
    createdAt: 'create_at',
    updatedAt: 'update_at',
    deletedAt: 'delete_at',
    underscored: true // 驼峰命名转换
  }
})


sequelize.sync({
  force: false
})

module.exports = {
  db: sequelize
}
