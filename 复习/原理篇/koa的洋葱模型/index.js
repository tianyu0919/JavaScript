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
    if (this.#isRunning) {
      return;
    }
    this.#isRunning = true;
    this.#runTask();
  }

  next() {
    this.#runTask()
  }

  #runTask() {
    const task = this.#list[this.#idx];
    this.#idx++;
    task(this.next.bind(this));
  }
}

const t = new TaskPro();

t.addTask(async (next) => {
  console.log(1, 'start');
  next();
  console.log(1, 'end');
})

t.addTask((next) => {
  console.log(2);
  next();
})

t.addTask(() => {
  console.log(3);
})

t.run(); // 1 start, 2, 3, 1 end