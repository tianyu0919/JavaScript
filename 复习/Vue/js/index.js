import data from "./data.js";

const { createApp } = Vue;

var vm = createApp({
  data: () => ({
    title: "大头鹏鹏商城",
    list: data,
  }),
  methods: {
    reduce(item) {
      if (item.choose <= 0) {
        return;
      }
      item.choose--;
    },
    increase(item) {
      console.log(item);
      if (item.choose >= 99) {
        return;
      }
      item.choose++;
    },
  },
  computed: {
    getSelectGoodsCount() {
      let sum = 0;
      for (let i = 0; i < this.list.length; i++) {
        sum += this.list[i].choose;
      }
      return sum;
    },
  },
}).mount("#root");
