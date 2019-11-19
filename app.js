const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const parser = require('koa-bodyparser')
// const catchError = require('./middlewares/exception')
const router = new Router()
app.use(parser())

router.get('/get/demo1', async (ctx, next) => {
  console.log(1111)
  ctx.body = 'getDemo'
})

router.post('/post/demo1', async (ctx, next) => {
  ctx.body = {
    name: ctx.request.body.name,
    age: 22
  }
})

app.use(router.routes())



app.listen(3000)
