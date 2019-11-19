const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor (level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER = 32
  }
  get m () {
    return async (ctx, next) => {
      // 对用户传过来的token 进行检测
      // 获取token
      // 前端开发者 如何传递这个令牌 --- body header 约定

      // http 规定了 一种身份验证的机制 HttpBasicAuth

      const userToken = basicAuth(ctx.req)
      // token 为空的判断
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbbiden()
      }


      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (e) {
        // 到底是哪种情况的不合法
        // 一种是用户瞎传了一个令牌
        // 还有一种是token过期

        if (e.name === 'TokenExpiredError') {
          throw new global.errs.Forbbiden('token 过期')
        } else {
          throw new global.errs.Forbbiden('token 不合法')
        }
      }

      if (decode.scope < this.level) {
        throw new global.errs.Forbbiden('权限不足')
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      // ctx.body = token

      await next()
      // ctx.req 是什么 ctx.req获取的是原生的nodejs request
      // 他获取的json对象是{ name: '', pass }
    }
  }

  static verifyToken (token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = { Auth }
