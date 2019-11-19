module.exports = {
  // prod
  enviroment: 'dev',
  database: {
    dbName: 'zjb_test',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'zjb2019'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 // 24小时 两个小时比较合适
  },
  wx: {
    appId: 'wxf19a509c99a12155',
    appSecret: 'e887e19e1dd7fcd50a29c9a1284aab2d',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
