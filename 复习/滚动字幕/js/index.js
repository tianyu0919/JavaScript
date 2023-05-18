import lrcData from "./lrcData.js";

const dom = {
  audio: document.querySelector("audio"),
  lrcList: document.querySelector(".lrcList"),
  lrcContainer: document.querySelector(".lrcContainer"),
};

/**
 * 将歌词解析为json
 * @param {*} lrc
 * @returns
 */
function parseLrc(lrc) {
  const lrcArr = lrc.split("\n");
  const result = [];

  for (let i = 0; i < lrcArr.length; i++) {
    const [time, text] = lrcArr[i].split("]");

    if (time && text) {
      result.push({
        time: parseTime(time.substring(1)),
        text,
      });
    }
  }

  return result;
}

/**
 * 将字符串时间转化为数字
 * @param {String} timeStr 字符串
 * @returns 转化了的数字
 */
function parseTime(timeStr) {
  const [min, sec] = timeStr.split(":");
  return parseInt(min) * 60 + parseInt(sec);
}

/**
 * 插入歌词到页面
 */
function insertEle(lrcList) {
  const frm = document.createDocumentFragment();

  lrcList.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item.text;
    frm.appendChild(li);
  });
  dom.lrcList.appendChild(frm);
}

/**
 * 根据当前播放时间，找到对应的歌词下标
 * @param {Number} currentTime
 * @param {*} lrcList
 * @returns
 */
function findIndex(currentTime, lrcList) {
  for (let i = 0; i < lrcList.length; i++) {
    if (lrcList[i].time > currentTime) {
      return i - 1;
    }
  }

  // * 如果没找到歌词返回最后一个，一般是播放到最后一句才会遇到这种情况
  return lrcList.length - 1;
}

/**
 * 初始化添加样式事件
 * @returns (idx: Number, domArr: Array) => void;
 */
function initAddClass() {
  let lastClassDom = null;
  return (idx, domArr) => {
    const dom = domArr[idx];
    if (!lastClassDom) {
      lastClassDom = dom;
    }
    if (lastClassDom && lastClassDom !== dom) {
      lastClassDom.classList.remove("active");
      lastClassDom = dom;
    }
    dom.classList.contains("active") || dom.classList.add("active");
  };
}

/**
 * 用来设置滚动效果
 * @param {Number} idx 下标，用来获取当前播放到的 子元素
 */
function setTransform(idx) {
  const { offsetTop } = dom.lrcList.children[idx];
  const { clientHeight } = dom.lrcContainer;
  const halfHeight = clientHeight / 2;
  let offset = offsetTop - halfHeight;
  offset = offset >= 0 ? offset : 0;
  dom.lrcList.style.transform = `translateY(-${offset}px)`;
}

/**
 * 请求字幕的字符串
 * @returns 返回字幕字符串
 */
function fetchLrc() {
  return fetch('/复习/滚动字幕/assets/shadowOfTheSun.lrc').then(res => {
    return res.text();
  }).then(res => {
    return res;
  })
}

/** 
 * 初始化
 */
async function init() {
  const lrcData = await fetchLrc();
  const lrcList = parseLrc(lrcData); // * 将歌词解析为json
  insertEle(lrcList);
  const addClass = initAddClass(); // * 初始化添加样式

  // 添加事件
  dom.audio.addEventListener("timeupdate", (ev) => {
    const { currentTime } = ev.target;
    const idx = findIndex(currentTime, lrcList);
    addClass(idx, [...dom.lrcList.children]);
    setTransform(idx);
  });
}

init();
