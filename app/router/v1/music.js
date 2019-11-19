const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
  prefix: '/v1/music'
})


// 异常处理
// try {
//
// } catch () {
//
// }

// 这里可以不传一个数字 可以转一个枚举对象

router.get('/latest', new Auth(9).m, async (ctx, next) => {
  // 这个api权限数字是2 我们只要比较用户权限 与这个api的权限关系

  // 如果这个api 权限数字是9  那这个用户权限是8的时候 就无法访问这个api
  ctx.body = ctx.auth
})

module.exports= router


// model code first

// 创建数据库的时候不应该考虑数据表 而是考虑模型
// 面向对象 model Class


// 到底创建什么表 我们不需要关心
// 初始化数据
// 创建数据库 先创建model

// 数据库的设计 由粗到西
// user
// 期刊太粗了 movice

// 设计数据库 更多的时候 是一种感觉

// 不需要这么多的理论依据

//

router.get('/favor', async ctx => {

})
