class Art {

  constructor (art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail () {
    const art = await Art.getData(this.art_id, this.type)
  }


  static async getList(artInfoList) {
    // 我们需要把这个[ids]
    // 3种类型的arts
    // 要进行3次 in查询
    const artInfoObj = {
      100: [], // type 是100的id号 一下同理
      200: [],
      300: []
    }
    // 注意for in 和for of 一个是 对对象循环 一个是对数组循环
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.artId)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0) {
        continue
      }
      arts.push(...await Art._getListByType(artInfoObj[key], +key))
    }
  }

  static async _getListByType (ids, type) {
    let arts = []
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }

    switch (type) {
      case 100:
        arts = await Movie.findOne(finder)
        break;
      case 200:
        arts = await Movie.findOne(finder)
        break;
      case 300:
        arts = await Movie.findOne(finder)
        break;
      case 400:
        break;
      default:
    }
    return arts
  }

  static async getData (artId, type) {
    const finder = {
      where: artId
    }
    let art = null
    switch (type) {
      case 100:
        art = await Movie.findOne(finder)
        break;
      case 200:
        art = await Movie.findOne(finder)
        break;
      case 300:
        art = await Movie.findOne(finder)
        break;
      case 400:
        break;
      default:
    }
    return art
  }
}

module.exports = {
  Art
}

// 是不是代码一旦相似 就有必要提取函数
// 如果只有两处代码相似 可以不提取函数

// 什么时候可以代码封装 比较灵活 原则两次不封装 三次封装

// 面向对象的设计原则
// 如果都是静态方法 意义不太大 面向过程的思维
// 实例方法 面向对象的思维
// 静态方法没有复用性  但是实例有复用性

// 单元测试

// 小心循环导入
//
