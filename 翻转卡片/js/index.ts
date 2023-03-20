/*
 * @Author: tianyu
 * @Date: 2023-03-17 13:36:50
 * @Description:
 */
import "./index.css";

import { type rotateContainerOptionsType, type rotateContainerProps, type removeOptional } from "./types";

const rotateContainer: rotateContainerProps = (selector, options) => {
  let defaultOptions: removeOptional<rotateContainerOptionsType> = {
    perspective: 700,
    multiple: 3,
    recoverySpeed: 300,
  };

  let newOptions = { ...defaultOptions, ...options };

  let dom: null | HTMLElement | HTMLElement[] = null;
  if (typeof selector === "string") {
    let tempDom = document.querySelectorAll(selector);
    if (tempDom) {
      dom = [...tempDom] as HTMLElement[];
    }
  } else if (typeof selector === "object" && (selector instanceof Element || selector instanceof NodeList)) {
    if (selector instanceof Element) {
      dom = selector as HTMLElement;
    } else if (selector instanceof NodeList) {
      dom = [...selector];
    }
  }

  if (!dom) {
    throw new Error("No DOM element");
  }
  dom as HTMLElement | NodeList;

  const { perspective, multiple, recoverySpeed } = newOptions;

  const domTimerMap = new WeakMap<HTMLElement, { origin: string; timer: number }>();

  // * 鼠标放上处理函数
  function moveFn(ev: MouseEvent, ele: HTMLElement) {
  // function moveFn(ev: MouseEvent, domArr: HTMLElement[], idx = 0) {
    restore(ele);
    const { left, top, width, height } = ele.getBoundingClientRect();
    const x = ev.clientX - left;
    const y = ev.clientY - top;
    const boxHeight = height;
    const boxWidth = width;
    let xx = x - boxWidth / 2;
    let yy = y - boxHeight / 2;
    let multipleY = multiple / (boxHeight / 2);
    let multipleX = multiple / (boxWidth / 2);
    let rotateX = (xx * multipleX).toFixed(2);
    let rotateY = -(yy * multipleY).toFixed(2);
    ele.style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
  }

  // * 鼠标离开处理函数
  function leaveFn(ev: MouseEvent, ele: HTMLElement) {
    // function leaveFn(ev: MouseEvent, domArr: HTMLElement[], idx = 0) {
    ele.style.transform = ``;
    recovery(ele);
  }

  // * 鼠标离开之后的元素回归初始状态的过渡效果
  function recovery(dom: HTMLElement) {
    if (!domTimerMap.has(dom)) {
      const originDuration = dom.style.transitionDuration;
      domTimerMap.set(dom, {
        origin: originDuration,
        timer: setTimeout(() => {
          console.log(domTimerMap);
          console.log("开始 setTimeout");
          dom.style.transitionDuration = originDuration;
          domTimerMap.delete(dom);
        }, recoverySpeed),
      });
    }
    dom.style.transitionDuration = `${recoverySpeed}ms`;
  }

  function restore(dom: HTMLElement) {
    if (dom && domTimerMap.has(dom)) {
      const { origin, timer } = domTimerMap.get(dom)!;
      dom.style.transitionDuration = origin;
      clearTimeout(timer);
      domTimerMap.delete(dom);
    }
  }

  function init(item: HTMLElement, idx = 0) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("rotate-wrapper");
    const { width, height } = item.getBoundingClientRect();
    wrapper.style.cssText = `width: ${width}px; height: ${height}px; perspective: ${perspective}px`;
    item.parentElement?.append(wrapper);
    wrapper.append(item);
    wrapper.addEventListener("mousemove", {
      handleEvent: (ev: MouseEvent) => {
        if (item) {
          moveFn(ev, item);
        }
      },
    });
    wrapper.addEventListener("mouseleave", {
      handleEvent: (ev: MouseEvent) => {
        if (item) {
          leaveFn(ev, item);
        }
      },
    });
  }

  // * 是个数组
  if (dom && Array.isArray(dom)) {
    dom.forEach((item, idx) => {
      init(item, idx);
    });
  } else {
    // * 是个单个的dom
    console.log("once");
    init(dom);
  }
};

export default rotateContainer;
