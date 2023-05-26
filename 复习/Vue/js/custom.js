const person = {
  name: "卢天宇",
  age: 30,
  sex: "男",
};

function showName() {
  console.log('x1')
  return new Promise((res, rej) => {
    const op = document.querySelector(".name");
    op.innerHTML = `姓名：${person.name}`;
    res();
  });
}

function showAge() {
  console.log('x2')
  return new Promise((res, rej) => {
    const op = document.querySelector(".age");
    op.innerHTML = `年龄：${person.age}`;
    setTimeout(() => {
      res();
    }, 2000);
  });
}

function showSex() {
  console.log('x3')
  return new Promise((res, rej) => {
    const op = document.querySelector(".sex");
    op.innerHTML = `性别：${person.sex}`;
    res();
  });
}

const stack = [
  showName,
  showAge,
  showSex,
  () => {
    return new Promise((res, rej) => {
      console.log('y1')
      person.age = 99;
      res();
    });
  },
  showAge,
];

async function init() {
  while (stack.length > 0) {
    await stack.shift()();
  }
}

init();
