/*
 * @Author: 卢天宇
 * @Date: 2023-10-07 18:34:49
 * @Description: 洋葱模型
 */

class TaskPro {
  #list = [];
  #idx = 0;
  #isRunning = false;
  constructor(tasks = []) {
    this.#list = tasks;
  }

  addTask(task) {
    this.#list.push(task);
  }

  run() {
    if (this.#isRunning || !this.#list.length) {
      return;
    }
    this.#isRunning = true;
    this.#runTask();
  }

  async next() {
    // console.log(this.#idx, 'next');
    if (this.#idx < this.#list.length) {
      this.#idx++;
      await this.#runTask()
    } else {
      console.log("Task running done")
    }
  }

  async #runTask() {
    const task = this.#list[this.#idx];
    const i = this.#idx;
    await task(this.next.bind(this));
    if (i === this.#idx) {
      this.next();
    }else {
      console.log('Task cancelled')
    }
  }
}

const t = new TaskPro();

t.addTask(async (next) => {
  console.log(1, 'start');
  await next();
  console.log(1, 'end');
})

t.addTask((next) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(2);
      res('成功了')
    }, 1000)
  })
})

t.addTask(() => {
  console.log(3);
})

t.run(); // 1 start, 2, 3, 1 end