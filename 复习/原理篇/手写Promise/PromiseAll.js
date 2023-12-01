function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 用于存储所有的Promise结果
    let results = [];
    // 计数器，用于跟踪已完成的Promise数量
    let completed = 0;

    if (promises.length === 0) {
      // 如果数组为空，立即解析
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      // 确保每个项都是一个Promise对象
      Promise.resolve(promise)
        .then(value => {
          // 存储结果，并检查所有的Promise是否已完成
          results[index] = value;
          completed += 1;

          if (completed === promises.length) {
            // 如果所有的Promise都已完成，解析返回的Promise
            resolve(results);
          }
        })
        .catch(error => {
          // 如果任何Promise被拒绝，拒绝返回的Promise
          reject(error);
        });
    });
  });
}

// 使用示例
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

promiseAll([promise1, promise2, promise3])
  .then(values => {
    console.log(values);  // 输出：[1, 2, 3]
  })
  .catch(error => {
    console.error(error);
  });
