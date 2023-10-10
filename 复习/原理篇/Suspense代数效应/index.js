class Suspense {
  #dom = null;
  constructor(dom, fallback = "default Text") {
    this.#dom = dom;
    this.backText = fallback;
    this.data = null;
    this.promise = null;
    this.render();
  }

  read(promise) {
    if (!this.promise) {
      this.promise = promise;
      throw promise;
    }
    if (!this.data) {
      throw this.promise;
    }
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  render() {
    console.log('xx')
    if (this.data) {
      console.log(this.data);
      this.#dom.innerText = this.data;
    }
    else {
      this.#dom.innerText = this.backText;
    }
  }
}

const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      default: 'xxx'
    });
  }, 3000)
})

// const dp = import(p);
const dp = import('./other.js');

console.log(dp);

const container = document.querySelector('#container');

const suspense = new Suspense(container, "initializing 🙄🙄🙄");

try {
  // const promise = import('./other.js');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success 😘😘😘')
    }, 2000)
  })
  suspense.read(promise);
  suspense.setData(promise);
} catch (promise) {
  promise.then((data) => suspense.setData(data))
}