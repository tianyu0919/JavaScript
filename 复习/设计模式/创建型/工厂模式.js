// * 工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

// * 优点：
// * 1.创建对象的过程可能很复杂，但我们只需要关心创建结果。
// * 2.构造函数和创建者分离，符合“开闭原则”(Open-Close Principle, OCP)。
// * 3.一个调用者想创建一个对象，只要知道其名称就可以了。
// * 4.扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。

// * 缺点：
// * 1.添加新产品时，需要编写新的具体产品类，一定程度上增加了系统的复杂度。
// * 2.考虑到系统的可扩展性，需要引入抽象层，在客户端代码中均使用抽象层进行定义，增加了系统的抽象性和理解难度

class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log("init");
  }
  fun() {
    console.log("fun");
  }
}

class Factory{
  create(name) {
    return new Product(name);
  }
}


let factory = new Factory();

const product = factory.create('小红');
product.init();
product.fun();

// * 例子，之前的JQuery $ 就是工厂函数

class jQuery {
  constructor(selector) {
    super(selector);
  }
  add() {

  }
  // * 其它代码
}

window.$ = function(selector) {
  return new jQuery(selector);
}
