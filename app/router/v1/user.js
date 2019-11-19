const Router = require('koa-router')

const router = new Router({
  prefix: '/v1/user' // 前缀功能
})

const {User} = require('../../../models/user')


router.post('/register', async (ctx, next) => {
  // 思维路径
  // 接收参数 参数校验


  // let user = await User.findOne({
  //   where: {
  //     nikename: ctx.request.body.nickname
  //   }
  // })

  // if () {}

  const user = {
    nikename: ctx.request.body.nickname,
    password: ctx.request.body.password,
    email: ctx.request.body.email
  }
  let res = await User.create(user)

  // 密码加密处理
  // 密码都要用密码加密处理
  // 用第三方的库 来进行密码的加密处理
  // 同一串密码 加密后的结果是不一样的
  // ctx.body = res
  throw new global.errs.Success()
})

// 登入 现在比较用token 令牌的形式 session 用的是一种状态 现在的web开发 不太考虑状态

// 现在强调的是无状态
// rest 是无状态 一次请求就能拿到数据
// webservice 有状态

// token 可以理解成无意义的随机字符串
// jwt 令牌可以携带数据
// 通常会把用户的uid 放入jwt里

module.exports = router
