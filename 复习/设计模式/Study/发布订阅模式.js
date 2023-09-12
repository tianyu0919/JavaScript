// * 发布订阅模式，在于订阅同类型任务，发布不同类型任务。

// * 创建发布者
class Publisher {
  constructor() {
    this.event = {}
  }

  subscribe(type, fn) {
    if (!this.event[type]) {
      this.event[type] = [];
    }
    this.event[type].push(fn);
  }

  unSubscribe(type, fn) {
    if (!this.event[type]) {
      return;
    }

    const idx = this.event[type].indexOf(fn);
    this.event[type].splice(idx, 1);
  }

  publish(type, data) {
    if (!this.event[type]) {
      return;
    }

    this.event[type].forEach(sub => sub(data));
  }
}

// * 创建订阅者

const publisher = new Publisher();

const shop1Callback = (text) => {
  console.log('shop1 notify---', text);
};

publisher.subscribe('shop', shop1Callback)

publisher.subscribe('shop', (text) => {
  console.log('shop2 notify---', text);
})

publisher.subscribe('shop', (text) => {
  console.log('shop3 notify---', text);
})

publisher.subscribe('car', (text) => {
  console.log('car1 notify---', text);
})

publisher.publish('shop', 'shop 通知');
publisher.publish('car', 'car 通知');

console.log('去掉shop1');
publisher.unSubscribe('shop', shop1Callback);
publisher.publish('shop', 'shop 通知');
publisher.publish('car', 'car 通知');