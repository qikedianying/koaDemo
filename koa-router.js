const Koa = require('koa')
const parser = require('koa-bodyparser')
const app = new Koa()

const catchError = require('./middlewares/exception')
const InitManager = require('./core/init')

require('./models/user')

app
  .use(catchError)
  .use(parser())

InitManager.initCore(app)

// router.get 接收两个参数 一个是路由  还有个是函数
// router.get 也是个中间件
// 这个get中间件注册 由router自动注册
// 路由 应该根据不同的主题来划分

// router.get('/classic/v1', async (ctx, next) => {
//   ctx.body = 'classic'
// })

// 版本号携带策略
// 1 路径
// 2 查询参数
// 3 header

// 修改代码存在风险
// 开闭原则
// 修改代码关闭
// 扩展代码开放
// router.get('/classic/v2', async (ctx, next) => {
//   ctx.body = 'music'
// })


// app
//   .use(book.routes())
//   .use(music.routes())

// module.exports = {
//   router
// }


app.listen(3000)
