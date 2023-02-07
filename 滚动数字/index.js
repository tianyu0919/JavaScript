/*
 * @Author: tianyu
 * @Date: 2023-02-07 16:42:07
 * @Description: 滚动数字效果
 */

function TableFn(args) {
  for (let [k, v] of Object.entries(args)) {
    this[k] = v;
  }
}

function scrollingNumber(count, duration = 1000) {
  let start;
  let n = 0;
  function deepFn(timestamp) {
    n += 1;
    if (!start) {
      start = timestamp
    }

    if (!(timestamp - start >= duration)) {
      requestAnimationFrame(deepFn);
    } else {
      console.group('%c scrollingNumber ', 'background-color: yellow; color: red');
      let table = new TableFn({ duration })
      console.log(`%c scrollingNumber 运行了 ${n} 次 `, 'background-color: blue; color: pink');
      console.table(table)
      console.groupEnd();
    }
  }

  requestAnimationFrame(deepFn);
}


function scrollingNumberPer(count, duration = 1000) {
  let start;
  let n = 0;
  function deepFn(timestamp) {
    n += 1;
    if (!start) {
      start = performance.now();
    }

    if (!(performance.now() - start >= duration)) {
      requestAnimationFrame(deepFn);
    } else {
      console.group('scrollingNumberPer');
      console.log(`scrollingNumberPer 运行了 ${n} 次`);
      console.groupEnd();
    }
  }

  requestAnimationFrame(deepFn);
}