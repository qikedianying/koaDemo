// 其实model 文件夹 应该也是放在app下面
const axios = require('axios')
const {Auth} = require('../../middlewares/auth')
const { User } = require('../../models/user')
const util =require('util')
const {generateToken} = require('../../core/utils')
class WXManager {
  static async codeToToken (code) {
    // 小程序 只要一个code 有小程序生成
    // 如果code 码合法 会返回一个openid

    // 小程序登入方式没有显示注册的一种方式

    // 微信的服务他的一种传参的形式
    // code 动态生成
    // appid appsecret 可以写到配置文件里
    // 微信小程序提供了一个服务 url


    // format 参数
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    )
    const result = await axios.get(url)
    console.log(result.data, result.errcode)
    if (result.status !== 200) {
      throw new global.errs.AuthFaild('openid获取失败')
    }

    if (result.data.errcode) {
      throw new global.errs.AuthFaild('openid获取失败:' + result.data.errmsg)
    }

    // 通过这个接口 是可以拿到openid 的
    // 拿到openid后 要建立一个用户档案

    // openid 比较长 比较长的数据用来查数据 效率比较低
    // 所以还是要用自己的uid

    // 用户的登入状态失效了 要再次登入 又会拿到这个openid
    // 这个时候要去查一下表里查一下 有没有这个openid的用户
    // 如果有了的话 我们就不写入了
    // 为新用户创建一个用户档案


    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }

    return generateToken(user.id, Auth.USER)

  }
}


// 小程序对cnpm 支持度不是很好
// npm 方便快速使用和更新

module.exports = {
  WXManager
}






















