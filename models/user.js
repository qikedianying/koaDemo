const bcrypt = require('bcryptjs')
const { db } = require('../core/db') // 重命名

const {Sequelize, Model} = require('sequelize')

class User extends Model{
  static async verifyEmailPassword (email, plainPasswrod) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.AuthFaild('账号不存在')
    }

    const correct = bcrypt.compareSync(plainPasswrod, user.password)
    if (!correct) {
      throw new global.errs.AuthFaild('密码不正确')
    }
    return user
  }

  static async getUserByOpenid (openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid (openid) {
    return await User.create({
      openid
    })
  }
}
User.init({
  id: {
    type: Sequelize.INTEGER,
    age: Sequelize.INTEGER,
    // 主键 关系型数据库非常重要的一个概念
    // 主键的字段来区分不同的用户
    // 主键： 不能重复 不能为空
    // 注册的时候 User id设计编号系统
    // 自动增长的id编号

    // id 编号设计问题 数字 不要字符串 不要随机字符串 数字的查询性能是最好的
    // 自动增长id编号 1 2 3
    // 数字 字符串 随机字符串
    // 并发 1000 注册
    // 暴露用户编号是1 2 3 4 5
    // 即使别人知道用户编号 也无法做坏事
    // 接口保护 权限 访问接口token
    primaryKey: true,
    autoIncrement: true // 自增id

  },
  nikename: Sequelize.STRING, // 类型
  email: Sequelize.STRING,
  password: {
    // 设计模式 观察者模式
    // es6 reflect 很容易实现观察者模式
    type: Sequelize.STRING,
    set (val) {
      const salt = bcrypt.genSaltSync(10)
      // 密码学的东西 这个10 指的是计算机生成这个盐的成本
      // 理论上这个数字越大 安全性越大 但是不能乱设
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64), // 长度
    unique: true // 唯一
  },
  test: Sequelize.STRING,
}, {
  sequelize: db,
  // tableName: 'user'
})

// 数据迁移 sql 更新

module.exports= {
  User
}

// 业务表的设计 有多变性

// 没有特定的唯一的方式
// 业务表与实体表
// 所以业务表的设计 存在好与坏

// 好的业务表设计 会让我们操作数据库非常简单 而且查询数据库块
