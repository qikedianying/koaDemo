const Router = require('koa-router')
const router = new Router()
const { ParameterException } = require('../../../core/http-exception')

// 导入逻辑 上层可以调用下层 但是反过来 就不太合适
// nodemon 建议全局安装 不用全局安装 得用npx 启动 或者写script脚本 不太方便

router.post('/book/v1/:id/', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.headers
  const body = ctx.request.body
  if (query) {

    // 用面向对象来解决异常
    const error= new ParameterException()

    throw error
  }
  ctx.body = 'book-v31'

  // 我们需要监听到错误
  // 输出一段有意义的信息
})

router.post()

module.exports= router


// 如果把所有的图书的信息 都放到数据库里 是不合适的
// 图书基础数据服务
// 图书基础数据 服务
// node.js 中间层
// 微服务 微服务并不难 但是抓住本质 并不难
// 雏形


// book 数据库表
// 业务数据是变换不端的
