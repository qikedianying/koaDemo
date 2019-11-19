const Koa = require('koa')

const app = new Koa()


// 如果不用async await next 返回的是一个promise 对象

app.use(async (ctx, next) => {

  // await 可以当做一种求值关键字
  // await 不仅仅可以对promise求值 是可以对表达式求值
  // await 可以阻塞当前线程 等待异步函数的返回
  // 对资源的操作 发文件 http请求  操作数据库 都是异步的
  // 如果函数有async 包装  返回的都是promise
  console.log(ctx)

  ctx.test = 1
  next()
  console.log(ctx.test)
})

// 问 为什么中间件函数 都要加async
// 答 因为中间件内部需要使用await


// 洋葱模型的先决条件 在每个next前面都加上await
// 洋葱模型的必要性 不使用洋葱模型 可能会导致代码出现错误 可以进行一系列的传参

// bl.7yue.pro/dev/index.html

app.use(async (ctx, next) => {
  console.log(ctx.test)
  ctx.test = 2
  next()
})



app.listen(3000)
