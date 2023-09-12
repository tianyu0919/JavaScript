/*
 * @Author: 卢天宇
 * @Date: 2023-09-12 16:23:10
 * @Description: 
 */
function deepClone(obj) {
  let newObj;
  // * 是基础值的话直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // * 判断是数组的话，注意使用点对点下标的方式来设置值，而不是push
  if (Array.isArray(obj)) {
    newObj = [];
    for (let i = 0; i < obj.length; i++) {
      newObj[i] = deepClone(obj[i]);
    }
  } else {
    // * 如果是对象的话，并查看对象是否含有这个属性，如果有的话再设置。
    newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key]);
      }
    }
  }
  return newObj;
}


const obj = {
  name: 'Tom',
  age: 18,
  list: [
    'apple', 'bannana'
  ],
  obj: {
    name: 'Joni',
    age: '11'
  }
}

const newObj = deepClone(obj)
console.log(newObj);

console.log(obj === newObj);