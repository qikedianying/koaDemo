const { Favor } = require('./favor')
class HotBook extends Model {
  static async getAll () {
    const books = await HotBook.findAll({
      order: [
        'index'
      ]
    })
    const ids = []

    // 假设push 是个异步操作 不要在foreach 里使用async await
    books.forEach((book) => {
      ids.push(book.id)
    })

    Favor.findAll({
      where: {
        [Op.in]: ids
      },
      group: ['artId'],
      attributes: ['artId']
    })

    // 查询出来用for循环 不用考虑性能问题
  }






  // 不能用for 循环 去遍历数据库
  // 并发与并行
  // node js 高并发闻名
  // 并不是同时 同时叫并行
  // 并发

  // python 也不能并行 python 也是单线程 Thread() 伪线程
  // js 去做并发 利用了宏任务和微任务的机制

  // 宏任务和微任务 并没有触发并发 的实质
  // 实质是cpu足够快
  // CPU密集型的操作 资源密集型操作

  // cpu密集型 cpu负载太高 会导致应用阻塞

  // nodejs 优势 对服务器硬件要求很低 单核cpu 利用率很高

  // 同步肯定是异步的性能比较好

}
