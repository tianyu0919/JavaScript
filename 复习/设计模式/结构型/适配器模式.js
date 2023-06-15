// * 将一个类的接口转化为另一个类的接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决。

// * 优点：
// * 1.可以让任何两个没有关联的类一起运行。
// * 2.提高了类的复用。
// * 3.适配对象，适配库，适配数据

// * 缺点：
// * 1.额外对象的创建，非直接调用，存在一定的开销（且不想代理模式在某些功能点上可以实现性能优化）
// * 2.如果没必要使用适配器模式的话，可以考虑重构，如果使用的话，尽量把文档完善。

class Plug {
  getName() {
    return 'iphone充电头';
  }
}

class Target {
  constructor() {
    this.plug = new Plug();
  }

  getName() {
    return this.plug.getName() + ' 适配器Type-C充电头'
  }
}

let target = new Target();

target.getName(); // iphone充电头 适配器Type-C充电头

// * 使用场景
// * 自己分装的 ajax，使用方式如下：
ajax({
  url: '/getData',
  type: 'Post',
  dataType: 'json',
  data: {
    test: 111
  }
}).done(function() {});
// 因为历史原因，代码中全都是：
// $.ajax({...})

// 做一层适配器
const $ = {
  ajax: function(options) {
    return ajax(options);
  }
}