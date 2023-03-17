/*
 * @Author: tianyu
 * @Date: 2023-03-17 13:36:50
 * @Description:
 */
let item = document.querySelectorAll(".item");
const rotateContainer = (selector, options) => {
    let defaultOptions = {
        perspective: 700,
        multiple: 3,
    };
    let newOptions = Object.assign(Object.assign({}, defaultOptions), options);
    let dom = null;
    if (typeof selector === "string") {
        let tempDom = document.querySelectorAll(selector);
        if (tempDom) {
            dom = [...tempDom];
        }
    }
    else if (typeof selector === "object" &&
        (selector instanceof Element || selector instanceof NodeList)) {
        if (selector instanceof Element) {
            dom = selector;
        }
        else if (selector instanceof NodeList) {
            dom = [...selector];
        }
    }
    if (!dom) {
        throw new Error("No DOM element");
    }
    dom;
    const { perspective, multiple } = newOptions;
    function moveFn(ev, domArr, idx = 0) {
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
        domArr[idx].style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    }
    function leaveFn(ev, domArr, idx = 0) {
        domArr[idx].style.transform = ``;
    }
    console.log(dom);
    // * 是个数组
    if (dom && Array.isArray(dom)) {
        dom.forEach((item, idx) => {
            item.addEventListener("mousemove", {
                handleEvent: (ev) => {
                    if (dom) {
                        moveFn(ev, dom, idx);
                    }
                },
            }, true);
            item.addEventListener("mouseleave", {
                handleEvent: (ev) => {
                    if (dom) {
                        leaveFn(ev, dom, idx);
                    }
                },
            }, false);
        });
    }
    else {
        // * 是个单个的dom
        console.log("once");
        dom.addEventListener("mousemove", {
            handleEvent: (ev) => {
                if (dom) {
                    moveFn(ev, [dom]);
                }
            },
        }, true);
        dom.addEventListener("mouseleave", {
            handleEvent: (ev) => {
                if (dom) {
                    leaveFn(ev, [dom]);
                }
            },
        }, true);
    }
};
export default rotateContainer;
