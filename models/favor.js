const { db } = require('../core/db') // 重命名
const { Art } = require('art')
const {Sequelize, Model} = require('sequelize')
class Favor extends Model {
  // 用户的点赞操作
  // 用户的取消点赞操作


  // 一个like操作 要操作两个数据表
  // 一个要往favor里添加一条数据
  // 还有个要往classic里修改数据

  // 因此两个表要绑定在一起 要执行 两个步骤一起执行 要不执行 就两个都不执行 => 事务

  // 可以保证数据的一致性

  // 数据的不一致性 是非常可怕的
  // 如何使用sequelize 来操作数据库事务

  // acid a: 原子性 c: 一致性 i： 隔离性

  // sequelize 事务必须调用sequelize.transaction(t => {})
  static async like (artId, type, uid) {
    // 要保存 先要查询
    const favor = await Favor.findOne({
      where: {
        artId,
        type,
        uid
      }
    })

    // 如果已存在 就是已经点过暂
    if (favor) {
      throw new global.errs.LikeError()
    }
    // 如果没有点赞 要用事务
    // 这里一定要return
    return db.transaction(async t => {
      await Favor.create({
        artId, type, uid
      }, {
        transaction: t
      })

      const art = await Art.getData(artId, type)
      await art.increment('favNums', {
        by: 1,
        transaction: t
      })

    },)

  }

  static async dislike (artId, type, uid) {
    const favor = await Favor.findOne({
      where: {
        artId,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.errs.DisLikeError()
    }

    // 大写的Favor 是一个类 可以理解成一张表
    // 小写的favor 可以理解成一条记录
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: false ,
        transaction: t
        // false 软删除 数据还在表里
        // true 物理删除 从表里删除
      })

      const art = await Art.getData(artId, type)

      // increment 是加一
      // decrement 是减一
      await art.decrement('favNums', {
        by: 1,
        transaction: t
      })
    })
  }

  static async getMyClassicFavors (uid) {
    // type != 400 的查询条件
    const arts = Favor.FindAll({
      where: {
        uid,
        type: {
          // 在es5 里 key 必须是字符串 1可以作为key [-1]也可以作为字符串
          // es6 里 symbol 也可以作为key

          [Op.not]: 400, // type != 400 中括号不是组数
          // 'a': 1 与 [a] = 1 区别
        }
      }
    })

    if (!arts) {
      throw new global.errs.NotFound()
    }

    // 根据 arts 去查询详细信息
    // 这里要注意 arts 是数组 循环查询数据库 次数不可控
    // 把不可控的查询次数 变成可控的查询次数 in
    // [ids] 一次查询所有的数据
  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  artId: Sequelize.INTEGER,
  type: Sequelize.INTEGER
})


// 前端缓存和后端缓存
// 前端缓存 有利于解决性能问题
