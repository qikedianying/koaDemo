const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  // 获取访问路径
  console.log(ctx.path)
  console.log(ctx.method)

  if (ctx.path === '/classic/latis' && ctx.method === 'GET') {
    // 要返回字符串的话 必须把这个字符串绑定到ctx.body里
    // 要返回对象的话  可以直接给body复制 内部会自动序列化
    ctx.body = {
      ctx: 222
    }
  }

})

app.listen(3000)
