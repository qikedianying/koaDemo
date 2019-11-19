const Router = require('koa-router')

const { Auth } = require('../../../middlewares/auth')

const router = new Router({
  prefix: '/v1/like'
})

router.post('/', async ctx => {

})
