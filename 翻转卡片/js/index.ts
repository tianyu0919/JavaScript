/*
 * @Author: tianyu
 * @Date: 2023-03-17 13:36:50
 * @Description:
 */

import {
  type rotateContainerOptionsType,
  rotateContainerProps,
  removeOptional,
} from "./types";

let item = document.querySelectorAll(".item");

const rotateContainer: rotateContainerProps = (selector, options) => {
  let defaultOptions: removeOptional<rotateContainerOptionsType> = {
    perspective: 700,
    multiple: 3,
  };

  let newOptions = { ...defaultOptions, ...options };

  let dom: null | HTMLElement | HTMLElement[] = null;
  if (typeof selector === "string") {
    let tempDom = document.querySelectorAll(selector);
    if (tempDom) {
      dom = [...tempDom] as HTMLElement[];
    }
  } else if (
    typeof selector === "object" &&
    (selector instanceof Element || selector instanceof NodeList)
  ) {
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

  const { perspective, multiple } = newOptions;

  function moveFn(ev: MouseEvent, domArr: HTMLElement[], idx = 0) {
    console.log(ev.clientX);
    const { left, top, width, height } = domArr[idx].getBoundingClientRect();
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
    domArr[
      idx
    ].style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
  }

  function leaveFn(ev: MouseEvent, domArr: HTMLElement[], idx = 0) {
    domArr[idx].style.transform = ``;
  }

  console.log(dom);

  // * 是个数组
  if (dom && Array.isArray(dom)) {
    dom.forEach((item, idx) => {
      item.addEventListener(
        "mousemove",
        {
          handleEvent: (ev: MouseEvent) => {
            if (dom) {
              moveFn(ev, dom as HTMLElement[], idx);
            }
          },
        },
        true
      );
      item.addEventListener(
        "mouseleave",
        {
          handleEvent: (ev: MouseEvent) => {
            if (dom) {
              leaveFn(ev, dom as HTMLElement[], idx);
            }
          },
        },
        false
      );
    });
  } else {
    // * 是个单个的dom
    console.log("once");
    dom.addEventListener(
      "mousemove",
      {
        handleEvent: (ev: MouseEvent) => {
          if (dom) {
            moveFn(ev, [dom] as HTMLElement[]);
          }
        },
      },
      true
    );
    dom.addEventListener(
      "mouseleave",
      {
        handleEvent: (ev: MouseEvent) => {
          if (dom) {
            leaveFn(ev, [dom] as HTMLElement[]);
          }
        },
      },
      true
    );
  }
};

export default rotateContainer;
