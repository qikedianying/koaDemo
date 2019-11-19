const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static initCore (app) {

    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadConfig()
    InitManager.loadHttpException()
  }

  static initLoadRouters () {
    const whenLoadModule = (obj) => {
      if (obj instanceof Router) {
        console.log(111)
        InitManager.app.use(obj.routes())
      }
    }

    // 路径最好让开发者修改
    // 可以使用绝对路径
    const apiDirectory = `${process.cwd()}/app/router`
    requireDirectory(module, apiDirectory, { visit: whenLoadModule })
  }

  static loadHttpException () {
    // 这种方法并不是很好 建议还是导入
    const errors = require('./http-exception')
    global.errs = errors
  }

  static loadConfig (path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManager
