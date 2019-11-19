const Router = require('koa-router')
const { User } = require('../../../models/user')
const {LoginType} = require('../../../lib/enum')

const { Auth } = require('../../../middlewares/auth')

const {WXManager} = require('../../services/wx')

const { generateToken } = require('../../../core/utils')
const router = new Router({
  prefix: '/v1/token' // 前缀功能
})


// 对于常规的web来说 账号加密码是必须的
// 登入多元化
// 小程序
// account
// 手机号登入

// 真正的项目里 有些api 是不需要权限 访问

// 需要权限的api 如果过期 或者不合法

router.post('/', async (ctx, next) => {
  // ctx.body = 111
  let token
  switch (ctx.request.body.type) {
    case LoginType.ADMIN_EMAIL:
      token = await emailLogin(ctx.request.body.account, ctx.request.body.secret)

      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(ctx.request.body.code)
      break;
  }

  ctx.body = token
})


router.post('/verify', async (ctx) => {
  // token
  let token = ctx.request.body.token
  const result = Auth.verifyToken(token)
  ctx.body = {
    result: result
  }
})

async function emailLogin (account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  return generateToken(user.id, Auth.USER)
}

// 权限分级 scope
// 8 16

// 通过scope 来配置权限


// 思考一下 业务逻辑 应该编写在什么地方
// 1 api 接口编写 如果业务逻辑简单 可以下载api里 但是一般不推荐
// 2 Model编写 按照分层 应该写在model里

// mvc model 才是用来处理业务的地方

// 业务分层 写在mdoel 里 中大型项目 还可以对业务进行分层 在model上 建立一个service
// 对于中小型 model 就够了




module.exports = router
