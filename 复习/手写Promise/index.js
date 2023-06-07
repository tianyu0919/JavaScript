/*
 * @Author: tianyu
 * @Date: 2023-06-06 16:10:04
 * @Description: 手写Promise的实现过程
 */

// * 手写 MyPromise
// * 1.创建一个状态Symbol值,用于标识状态
const PENDING = Symbol.for("pending");
const FULFILLED = Symbol.for("fulfilled");
const REJECTED = Symbol.for("rejected");

class MyPromise {
  #state = PENDING; // * 1.当前的状态
  #result = undefined; // * 1.存储的结果
  #handlers = []; // * 2.用于解决 .then 的回调

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      // * 1.为了防止在回调中报错，加入 try catch 监听 REJECTED
      executor(resolve, reject);
    } catch (err) {
      this.#changeState(REJECTED, err);
    }
  }

  // * 1.修改状态函数
  #changeState(state, result) {
    // * 先判断状态是否已经改了，如果改了则不做操作。
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  // * 4.查看是否是 promise，在 promiseA+ 规范中，不管是什么，只要拥有 then 属性就是 promise
  #isPromiseLike(value) {
    if (value !== null && (typeof value === "object" || typeof value === "function")) {
      return typeof value.then === "function";
    }
  }

  // * 3.因为then回调是放到微队列当中。则创建一个辅助函数
  #runMicroTask(func) {
    // * 4.判断当前的运行环境是在 node 还是 浏览器
    if (typeof process === "object" && typeof process.nextTick === "function") {
      // * 判断是在 node 环境
      process.nextTick(func);
    } else if (typeof MutationObserver === "function") {
      // * 否则是 浏览器 环境，使用 MutationObserver 将回调放到里面。他是微任务
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1"); // * 创建一个文本节点
      // * 观察这个文本节点
      ob.observe(textNode, {
        characterData: true, // * 目标节点的字符变化
      });
      textNode.data = "2"; // * 修改这个文本节点，只要一修改就会触发回调
    } else {
      setTimeout(func, 0);
    }
  }

  // * 3. DRY原则(Don't Repeat Yourself)，抽离出来
  #runOne(callback, resolve, reject) {
    // * 3. 存入微队列
    this.#runMicroTask(() => {
      // * 3. 先判断是否是函数，如果不是则直接穿透给下一个then
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        // * 3. 是函数的话，拿到每次then的返回值，返回给下一个then
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          // * 如果是promise的话，直接给下一个then
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  // * 2.私有方法，用于执行 then 之后的回调
  #run() {
    // * 处理异步，如果是 Pending 状态，直接返回
    if (this.#state === PENDING) return;
    while (this.#handlers.length > 0) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift(); // * 获取第一个回调
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  // * 2.then方法的实现
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}

setTimeout(() => {
  console.log(1);
}, 0);
new MyPromise((resolve, reject) => {
  resolve();
}).then((res) => {
  console.log(2);
});
console.log(3);
