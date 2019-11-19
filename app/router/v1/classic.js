const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const {Flow} = require('../../../models/flow')
const {User} = require('../../../models/user')
const {Art} = require('../../../models/art')
const router = new Router({
  prefix: '/v1/classic'
})


router.get('/latest', async (ctx, next) => {

  // 比如要去最大的一期
  // index 最大
  // desc 是倒序排列

  // ctx.body = ctx.auth
  const flow = await Flow.findOne({
    order: [
     ['index']
    ]
  })

  // const art = await Art.getData()
  // flow.dataValues.index = 2
  flow.setDataValue('index', 333)
    // 注意 这个时候 index 不会反回
  // 序列化  花括号括起来的 可以直接这样赋值
  // 但是art 这个art 不是普通的对象 只有dataValues里面的字段才会 正常的返回

  // 所以要正常返回index 的话 得把index 放到dataVaues里 但是这种方法不是很好
  // 动态语言带来的

  // 可以使用setDataValue('index') 使用这种方法比较严谨

  // 问 为啥koa 会直接找dataValues
  // 并不是koa知道 而是Sequelize 高速koa去序列化

  ctx.body = flow

})


// 小程序里 使用base64加密

// base64.js
module.exports= router

// 多张表信息查询



// 序列化的概念

// js json 序列化
