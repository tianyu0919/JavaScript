const person = {
  name: "卢天宇",
  age: 30,
  sex: "男",
};

function showName() {
  console.log("x1");
  return new Promise((res, rej) => {
    const op = document.querySelector(".name");
    op.innerHTML = `姓名：${person.name}`;
    res();
  });
}

function showAge() {
  console.log("x2");
  return new Promise((res, rej) => {
    const op = document.querySelector(".age");
    op.innerHTML = `年龄：${person.age}`;
    setTimeout(() => {
      res();
    }, 2000);
  });
}

function showSex() {
  console.log("x3");
  return new Promise((res, rej) => {
    const op = document.querySelector(".sex");
    op.innerHTML = `性别：${person.sex}`;
    res();
  });
}

let _name = person.name;
Object.defineProperty(person, "name", {
  get() {
    console.log("有人读取name了");
    return _name;
  },
  set(val) {
    console.log(`有人设置name了`);
    _name = val;
    showName();
  },
});
showName();

let _age = person.age;
Object.defineProperty(person, "age", {
  get() {
    console.log("age");
    return _age;
  },
  set(val) {
    console.log(`有人设置age了`);
    _age = val;
    showAge();
  },
});
showAge();

let _sex = person.sex;
Object.defineProperty(person, "sex", {
  get() {
    console.log("有人读取sex了");
    return _sex;
  },
  set(val) {
    console.log(`有人设置sex了`);
    _sex = val;
    showSex();
  },
});
showSex();

const stack = [
  () => {
    return new Promise((res, rej) => {
      console.log("y1");
      person.age = 99;
      res();
    });
  },
];

async function init() {
  while (stack.length > 0) {
    await stack.shift()();
  }
}

init();
