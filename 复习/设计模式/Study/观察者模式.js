/*
 * @Author: 卢天宇
 * @Date: 2023-09-12 15:48:13
 * @Description: 
 */
// * 观察者模式，定义了一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

// * 创建主题

class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    console.log(this);
    this.observers.push(observer);
  }

  del(observer) {
    const idx = this.observers.indexOf(observer);
    this.observers.splice(idx, 1);
  }

  notify() {
    this.observers.forEach(observer => observer.update());
  }
}

// * 创建观察者对象
class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log('observer is update---', this.name)
  }
}

// * 创建主题实例
const subjectInstance = new Subject();

// * 创建观察者实例
const observer1 = new Observer('Tom');
const observer2 = new Observer('Jone');

// * 添加观察者
subjectInstance.addObserver(observer1);
subjectInstance.addObserver(observer2);

// * 派发通知
subjectInstance.notify();

// * 删除一个观察者
subjectInstance.del(observer1);

console.log('重新派发')
// * 派发通知
subjectInstance.notify();
