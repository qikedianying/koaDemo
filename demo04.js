function fun1 () {
  fun2()
}
async function fun2 () {
  try {
    await fun3()
  } catch (e) {
    console.log(555)
  }
}
async function fun3 () {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
      reject()
    }
  })
}
console.log(fun2())


// try catch 只对同步的方法有作用 如果是异步的函数 很可能捕捉不到异常
// 其实promise 和async 和await 是不分家的
// async await 是最简单的异常处理方法

// 全局异常处理

// 在所有函数的顶部 监听任何异常
// 没有发生异常 正确返回结果

// 发生了异常

// 函数设计
// 函数的内部判断是出现了异常 return一个false 或者null
// throw new Error 编程规范 throw
