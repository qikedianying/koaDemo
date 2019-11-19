const Koa = require('koa')

const demo01 = new Koa()

// 应用程序对象 中间件


// 定义一个中间件 就是定义一个函数

// 一个函数编程一个中间件 注册

// function start() {
//   console.log('hello 7yue')
// }


// 也可以使用匿名的函数

demo01.use(async (ctx, next) => { // koa 每次调用中间件 都会自动注入两个参数 ctx 上下文对象 next
                                  // 洋葱模型 1 3 4 2

  // async await 完美解决异步的方案

  // 为什么要加 async await , 很难保证所有的中间件 按照洋葱模型去执行

  // 必须非常熟悉promise async await
  ctx.test = 1
  next()
  console.log('d')
  console.log(ctx.test)
})

// 可以注册多个中间件

// 只有第一个中间件被打印 为什么

// 在koa中 只会自动识别第一个中间件 后面的中间件 必须开发者自己调用
demo01.use(async (ctx, next) => {
  new Promise(resolve => {
    console.log('a')
    resolve()
  }).then(res => {
    ctx.test = 2
    console.log('b')
  })
  next()
  console.log('c')
})



demo01.listen(3000)

// 模块导入总结

// 1. commonjs 2. es6 import from 3. amd
