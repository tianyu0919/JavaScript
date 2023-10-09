// * 请求地址 https://randomuser.me/api/1

const Container = {
  baseUrl: '',
  abort: null,
  xhr: new XMLHttpRequest()
}

const catchReg = /^[4|5]/;


function Axios(options = { baseUrl: '' }) {
  Container.baseUrl = options.baseUrl;
  Container.abort = options.abort;
}

function isGet(type) {
  return type === 'GET';
}

function curryCallback(type = "GET") {
  return function (url, ...args) {
    const options = isGet(type) ? args[0] : args[1] || {};
    const data = !isGet(type) && args[0] || {};

    return new Promise((resolve, reject) => {
      const { baseUrl, abort, xhr } = Container;
      xhr.open(type, baseUrl + url);

      xhr.onreadystatechange = function () {
        console.log('xhr.onreadystatechange');
        const { status, response, readyState } = xhr;
        console.group('xhr readystatechange');
        console.log(xhr.responseHeaders);
        console.log(xhr.responseText);
        console.log(xhr.status);
        console.groupEnd();
        if (readyState === 4) {
          if (catchReg.test(status)) {
            reject({
              status,
              response
            });
            return;
          }
          resolve({
            status,
            response: JSON.parse(response),
            headers: JSON.stringify(xhr.getAllResponseHeaders().split('\r\n').map(item => {
              const [key, value] = item.split('=');
              return {
                type: key,
                value
              }
            }))
          })
        }
      }

      console.log(JSON.stringify(data));

      isGet(type) ? xhr.send() : xhr.send(JSON.stringify(data));
    })
  }
}

Axios.prototype.get = curryCallback("GET");

Axios.prototype.post = curryCallback("POST");

export default Axios;