class CustomVue {
  _init(options = {}) {
    const { el } = options;
    console.log(el);
    let html = document.querySelector(el)?.innerHTML;
    console.log(html);
    const reg = /\[\[(?<tag>.*)\]\]/gi;
    html.replaceAll(reg, (...arg) => {
      console.log(arg);
    });
  }

  renderText() {

  }

  constructor(options) {
    this.options = options;
    this._init(options);
  }
}

let vue = new CustomVue({
  el: "#root",
  data: {
    name: "xx",
    lastName: "yy",
    age: 18,
  },
});

console.log(vue);
