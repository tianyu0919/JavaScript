/**
 * 观察某个对象的所有属性
 * @param {any} obj
 */
function observe(obj) {
  for (const key in obj) {
    // * 如果也是个对象的话
    if (typeof obj[key] === "object") {
      observe(obj[key]);
    }

    let internalVal = obj[key]; // * 初始化数据
    const func = new Set(); // * 存储属性相关的依赖方法
    Object.defineProperty(obj, key, {
      get() {
        // * 依赖收集，记录：是哪个函数在用我
        if (window.__run && !func.has(window.__run)) {
          func.add(window.__run);
        }
        return internalVal;
      },
      set(val) {
        internalVal = val;
        // * 派发更新，运行：执行用我的函数
        func.forEach((item) => item());
      },
    });
  }
}

function autorun(fn) {
  window.__run = fn;
  fn();
  window.__run = null;
}

/************************使用*********************** */

const person = {
  name: "卢天宇",
  birth: '1999-09-19',
  sex: "男",
};

observe(person);

function showName() {
  const op = document.querySelector(".name");
  op.innerHTML = `姓名：${person.name}`;
}

function showBirth() {
  const op = document.querySelector(".birth");
  const date = new Date(person.birth);
  console.log(new Date().getFullYear() - date.getFullYear());
  op.innerHTML = `年龄：${new Date().getFullYear() - date.getFullYear()}`;
}

function showSex() {
  const op = document.querySelector(".sex");
  op.innerHTML = `性别：${person.sex}`;
}

autorun(showName);
autorun(showBirth);
autorun(showSex);
