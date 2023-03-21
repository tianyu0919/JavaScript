/*
 * @Author: tianyu
 * @Date: 2023-03-17 13:36:50
 * @Description:
 */
import "./index.css";
const rotateContainer = (selector, options) => {
    let defaultOptions = {
        perspective: 700,
        multiple: 3,
        recoverySpeed: 300,
        resizeDelay: 300, // * 如果需要防抖的话，多少时间 ms
    };
    let newOptions = Object.assign(Object.assign({}, defaultOptions), options);
    let dom = null;
    if (typeof selector === "string") {
        let tempDom = document.querySelectorAll(selector);
        if (tempDom) {
            dom = [...tempDom];
        }
    }
    else if (typeof selector === "object" && (selector instanceof Element || selector instanceof NodeList)) {
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
    const { perspective, multiple, recoverySpeed, resizeDelay } = newOptions;
    const domMap = new WeakMap();
    // * 鼠标放上处理函数
    function moveFn(ev, ele) {
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
    function leaveFn(ev, ele) {
        ele.style.transform = ``;
        recovery(ele);
    }
    // * 鼠标离开之后的元素回归初始状态的过渡效果
    function recovery(dom) {
        console.log(domMap);
        const domItem = domMap.get(dom);
        console.log(domItem);
        if (domItem) {
            const { timer, transDuration } = domItem;
            if (!timer) {
                domMap.set(dom, Object.assign(Object.assign({}, domItem), { timer: setTimeout(() => {
                        console.log("开始 setTimeout", domItem);
                        dom.style.transitionDuration = transDuration;
                        domMap.set(dom, Object.assign(Object.assign({}, domItem), { timer: null, isHover: false }));
                    }, recoverySpeed) }));
                dom.style.transitionDuration = `${recoverySpeed}ms`;
            }
        }
    }
    // * 恢复
    function restore(dom) {
        const domItem = domMap.get(dom);
        if (domItem) {
            const { timer, transDuration, isHover } = domItem;
            if (timer) {
                clearTimeout(timer);
                dom.style.transitionDuration = transDuration;
                domMap.set(dom, Object.assign(Object.assign({}, domItem), { timer: null }));
            }
            if (!isHover) {
                const duration = 120;
                console.log("第一次hover");
                dom.style.transitionDuration = `${duration}ms`;
                setTimeout(() => {
                    dom.style.transitionDuration = transDuration;
                    domMap.set(dom, Object.assign(Object.assign({}, domItem), { isHover: true }));
                }, duration);
            }
        }
    }
    // * 防抖
    function debounce(delay) {
        let timer;
        return (callback = () => { }) => {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(callback, delay);
        };
    }
    // * 监听父元素宽高变化
    function ObserveParent(parentEle, wrapper) {
        const debounceFn = debounce(resizeDelay);
        if (parentEle) {
            if (window.ResizeObserver) {
                const resizeObserver = new ResizeObserver((entries) => {
                    // * 遍历所有观察到的元素
                    entries.forEach((entry) => {
                        // * 处理父元素宽度变化
                        const { width, height } = entry.contentRect;
                        console.log(width, height);
                        // * 使用 防抖重新设置
                        debounceFn(() => {
                            console.log("我要执行 resizeObserver了");
                            wrapper.style.width = `${width}px`;
                            wrapper.style.height = `${height}px`;
                        });
                    });
                });
                resizeObserver.observe(parentEle);
            }
            else if (window.MutationObserver) {
                const observer = new MutationObserver((mutationsList, observer) => {
                    for (let mutation of mutationsList) {
                        const { target } = mutation;
                        const { width: newWidth, height: newHeight } = target.getBoundingClientRect();
                        const { width: oldWidth, height: oldHeight } = wrapper.getBoundingClientRect();
                        if (oldWidth !== newWidth || oldHeight !== newHeight) {
                            // * 使用 防抖重新设置
                            debounceFn(() => {
                                console.log("我要执行 mutationOBserver了");
                                wrapper.style.width = `${newWidth}px`;
                                wrapper.style.height = `${newHeight}px`;
                            });
                        }
                    }
                });
                observer.observe(parentEle, {
                    attributes: true,
                });
            }
        }
    }
    // * 初始化
    function init(item, idx = 0) {
        var _a;
        let wrapper = document.createElement("div");
        wrapper.classList.add("rotate-wrapper");
        const { width, height } = item.getBoundingClientRect();
        wrapper.style.cssText = `width: ${width}px; height: ${height}px; perspective: ${perspective}px`;
        (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.append(wrapper);
        ObserveParent(item.parentElement, wrapper);
        wrapper.append(item);
        wrapper.addEventListener("mousemove", {
            handleEvent: (ev) => {
                if (item) {
                    moveFn(ev, item);
                }
            },
        });
        wrapper.addEventListener("mouseleave", {
            handleEvent: (ev) => {
                if (item) {
                    leaveFn(ev, item);
                }
            },
        });
        domMap.set(item, {
            isHover: false,
            timer: null,
            transDuration: item.style.transitionDuration,
        });
    }
    // * 是个数组
    if (dom && Array.isArray(dom)) {
        dom.forEach((item, idx) => {
            init(item, idx);
        });
    }
    else {
        // * 是个单个的dom
        console.log("once");
        init(dom);
    }
};
export default rotateContainer;
