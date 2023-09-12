const mockData = [
  { name: '苹果', price: '1.0' },
  { name: '香蕉', price: '3.0' },
  { name: '橘子', price: '6.0' },
  { name: '', price: '11' },
  { name: '咖啡', price: undefined },
  { name: '咖喱', price: '' }
];



// [{label: '苹果', value: 1}] name 可能为空，price 可能为 undefined 和 ''


function parseData(data) {
  const newData = []
  data.forEach(item => {
    const obj = {};
    if (item.name) {
      obj.label = item.name;
      obj.value = parseFloat(item.price || 0);
      newData.push(obj);
    };

  })

  return newData;
}

const newData = parseData(mockData);
console.log(newData);
