"use strict";
/*
 * @Author: tianyu
 * @Date: 2023-03-17 13:36:50
 * @Description:
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var rotateContainer = function (selector, options) {
    var defaultOptions = {
        perspective: 700,
        multiple: 3,
        recoverySpeed: 300
    };
    var newOptions = __assign(__assign({}, defaultOptions), options);
    var dom = null;
    if (typeof selector === "string") {
        var tempDom = document.querySelectorAll(selector);
        if (tempDom) {
            dom = __spreadArray([], tempDom, true);
        }
    }
    else if (typeof selector === "object" &&
        (selector instanceof Element || selector instanceof NodeList)) {
        if (selector instanceof Element) {
            dom = selector;
        }
        else if (selector instanceof NodeList) {
            dom = __spreadArray([], selector, true);
        }
    }
    if (!dom) {
        throw new Error("No DOM element");
    }
    dom;
    var perspective = newOptions.perspective, multiple = newOptions.multiple, recoverySpeed = newOptions.recoverySpeed;
    function moveFn(ev, domArr, idx) {
        if (idx === void 0) { idx = 0; }
        console.log(ev.clientX);
        var _a = domArr[idx].getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        var x = ev.clientX - left;
        var y = ev.clientY - top;
        var boxHeight = height;
        var boxWidth = width;
        var xx = x - boxWidth / 2;
        var yy = y - boxHeight / 2;
        var multipleY = multiple / (boxHeight / 2);
        var multipleX = multiple / (boxWidth / 2);
        var rotateX = (xx * multipleX).toFixed(2);
        var rotateY = -(yy * multipleY).toFixed(2);
        domArr[idx].style.transform = "rotateX(".concat(rotateY, "deg) rotateY(").concat(rotateX, "deg)");
    }
    function leaveFn(ev, domArr, idx) {
        if (idx === void 0) { idx = 0; }
        domArr[idx].style.transform = "";
        recovery(domArr[idx]);
    }
    function recovery(dom) {
        dom.style.transitionDuration = "".concat(recoverySpeed, "ms");
    }
    console.log(dom);
    // * 是个数组
    if (dom && Array.isArray(dom)) {
        dom.forEach(function (item, idx) {
            var _a;
            var wrapper = document.createElement('div');
            wrapper.style.cssText = "width: 100%; height: 100%; perspective: ".concat(perspective, "px");
            (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.append(wrapper);
            wrapper.append(item);
            wrapper.addEventListener("mousemove", {
                handleEvent: function (ev) {
                    if (dom) {
                        moveFn(ev, dom, idx);
                    }
                },
            }, true);
            wrapper.addEventListener("mouseleave", {
                handleEvent: function (ev) {
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
            handleEvent: function (ev) {
                if (dom) {
                    moveFn(ev, [dom]);
                }
            },
        }, true);
        dom.addEventListener("mouseleave", {
            handleEvent: function (ev) {
                if (dom) {
                    leaveFn(ev, [dom]);
                }
            },
        }, true);
    }
};
exports.default = rotateContainer;
