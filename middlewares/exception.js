const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {

    // 开发环境必须throw error
    // 生产环境可以不抛出
    const isHttpException = e instanceof HttpException
    const isDev = global.config.enviroment === 'dev'

    if (!isHttpException && isDev) {
      throw e
    }

    if (isHttpException) {
      ctx.body = {
        msg: e.msg,
        errorCode: e.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = e.code
    } else {
      ctx.body = {
        msg: 'we made a mistack',
        errorCode: 999,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }

    // 应该返回给前端哪些http status 2xx 4xx 5xx

    // 返回的所有信息字段里
    // message
    // error_code详细, 开发者自己定义 例：10001 20003 error_code 非常重要 可以自己设计
    // request_url 当前返回的接口
    // 包括http status 共返回5个错误

    // 错误的分类
    // 已知型错误 例： 通过检验器检验出的错误 可以判断出来 可以处理 并且告诉前端 你错了
    // 未知型错误 例： 连接数据库 账号密码出错了 无法判断
  }
}

// 全局异常处理 体现了AOP思想 面向切面编程

module.exports = catchError
