/*
 * @Author: tianyu
 * @Date: 2023-06-15 15:29:12
 * @Description: 
 */
// * 一个类只有一个实例，并提供一个访问它的全局访问点。

// * 优点：
// * 1.划分命名空间，减少全局变量。
// * 2.增强模块性，把自己的代码组织在一个全局变量名下，放在单一位置，便于维护。
// * 3.且只会实例化一次，简化了代码的调试和维护。

// * 缺点：
// * 1.由于单例模式提供的是一种单点访问，所以它有可能导致模块间的强耦合，从而不利于单元测试，无法单独测试一个调用了来自单利的方法的类，而只能把他与那个单例作为一个单元一起测试。

// * 场景例子：
// * vuex 和 redux 中的 store

class LoginForm {
  constructor() {
    this.state = "hide";
  }

  show() {
    if (this.state === "show") {
      alert("已经显示");
      return;
    }
    this.state = "show";
    console.log("登录框显示成功");
  }

  hide() {
    if (this.state === "hide") {
      alert("已经隐藏");
      return;
    }
    this.state = "hide";
    console.log("登录框隐藏成功");
  }

  static getInstance = (() => {
    let instance;
    return () => {
      if (!instance) {
        instance = new LoginForm();
      }
      return instance;
    };
  })();
}

let obj1 = LoginForm.getInstance();
obj1.show();

let obj2 = LoginForm.getInstance();
obj2.hide();

console.log(obj1 === obj2);
