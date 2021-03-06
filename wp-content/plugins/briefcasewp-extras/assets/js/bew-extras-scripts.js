/*!
 * Bew Extras v1.2.4 (https://briefcasewp.com/bew-extras)
 * Copyright 2020 BriefcaseWp
 * Licensed under the BriefcaseWp Standard Licenses
 */

"use strict";
var $ = jQuery.noConflict();
if (function(e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.Tether = t()
    }(this, function(e, t, i) {
        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function s(e) {
            var t = e.getBoundingClientRect(),
                i = {};
            for (var n in t) i[n] = t[n];
            if (e.ownerDocument !== document) {
                var a = e.ownerDocument.defaultView.frameElement;
                if (a) {
                    var o = s(a);
                    i.top += o.top, i.bottom += o.top, i.left += o.left, i.right += o.left
                }
            }
            return i
        }

        function r(e) {
            var t = (getComputedStyle(e) || {}).position,
                i = [];
            if ("fixed" === t) return [e];
            for (var n = e;
                (n = n.parentNode) && n && 1 === n.nodeType;) {
                var a = void 0;
                try {
                    a = getComputedStyle(n)
                } catch (e) {}
                if (null == a) return i.push(n), i;
                var o = a,
                    s = o.overflow,
                    r = o.overflowX,
                    l = o.overflowY;
                /(auto|scroll)/.test(s + l + r) && ("absolute" !== t || 0 <= ["relative", "absolute", "fixed"].indexOf(a.position)) && i.push(n)
            }
            return i.push(e.ownerDocument.body), e.ownerDocument !== document && i.push(e.ownerDocument.defaultView), i
        }

        function a() {
            v && document.body.removeChild(v), v = null
        }

        function E(e) {
            var t = void 0;
            e === document ? (t = document, e = document.documentElement) : t = e.ownerDocument;
            var i = t.documentElement,
                n = s(e),
                a = b();
            return n.top -= a.top, n.left -= a.left, void 0 === n.width && (n.width = document.body.scrollWidth - n.left - n.right), void 0 === n.height && (n.height = document.body.scrollHeight - n.top - n.bottom), n.top = n.top - i.clientTop, n.left = n.left - i.clientLeft, n.right = t.body.clientWidth - n.width - n.left, n.bottom = t.body.clientHeight - n.height - n.top, n
        }

        function _(e) {
            return e.offsetParent || document.documentElement
        }

        function k() {
            var e = document.createElement("div");
            e.style.width = "100%", e.style.height = "200px";
            var t = document.createElement("div");
            I(t.style, {
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                visibility: "hidden",
                width: "200px",
                height: "150px",
                overflow: "hidden"
            }), t.appendChild(e), document.body.appendChild(t);
            var i = e.offsetWidth;
            t.style.overflow = "scroll";
            var n = e.offsetWidth;
            i === n && (n = t.clientWidth), document.body.removeChild(t);
            var a = i - n;
            return {
                width: a,
                height: a
            }
        }

        function I() {
            var i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                e = [];
            return Array.prototype.push.apply(e, arguments), e.slice(1).forEach(function(e) {
                if (e)
                    for (var t in e)({}).hasOwnProperty.call(e, t) && (i[t] = e[t])
            }), i
        }

        function o(t, e) {
            if (void 0 !== t.classList) e.split(" ").forEach(function(e) {
                e.trim() && t.classList.remove(e)
            });
            else {
                var i = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi"),
                    n = c(t).replace(i, " ");
                p(t, n)
            }
        }

        function l(t, e) {
            if (void 0 !== t.classList) e.split(" ").forEach(function(e) {
                e.trim() && t.classList.add(e)
            });
            else {
                o(t, e);
                var i = c(t) + " " + e;
                p(t, i)
            }
        }

        function d(e, t) {
            if (void 0 !== e.classList) return e.classList.contains(t);
            var i = c(e);
            return new RegExp("(^| )" + t + "( |$)", "gi").test(i)
        }

        function c(e) {
            return e.className instanceof e.ownerDocument.defaultView.SVGAnimatedString ? e.className.baseVal : e.className
        }

        function p(e, t) {
            e.setAttribute("class", t)
        }

        function h(t, i, e) {
            e.forEach(function(e) {
                -1 === i.indexOf(e) && d(t, e) && o(t, e)
            }), i.forEach(function(e) {
                d(t, e) || l(t, e)
            })
        }

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function g(e, t) {
            var i = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
            return t <= e + i && e - i <= t
        }

        function u() {
            return "undefined" != typeof performance && void 0 !== performance.now ? performance.now() : +new Date
        }

        function A() {
            for (var n = {
                    top: 0,
                    left: 0
                }, e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return t.forEach(function(e) {
                var t = e.top,
                    i = e.left;
                "string" == typeof t && (t = parseFloat(t, 10)), "string" == typeof i && (i = parseFloat(i, 10)), n.top += t, n.left += i
            }), n
        }

        function D(e, t) {
            return "string" == typeof e.left && -1 !== e.left.indexOf("%") && (e.left = parseFloat(e.left, 10) / 100 * t.width), "string" == typeof e.top && -1 !== e.top.indexOf("%") && (e.top = parseFloat(e.top, 10) / 100 * t.height), e
        }
        var f = function() {
                function n(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(e, t, i) {
                    return t && n(e.prototype, t), i && n(e, i), e
                }
            }(),
            M = void 0;
        void 0 === M && (M = {
            modules: []
        });
        var m, v = null,
            y = (m = 0, function() {
                return ++m
            }),
            w = {},
            b = function() {
                var e = v;
                e || ((e = document.createElement("div")).setAttribute("data-tether-id", y()), I(e.style, {
                    top: 0,
                    left: 0,
                    position: "absolute"
                }), document.body.appendChild(e), v = e);
                var t = e.getAttribute("data-tether-id");
                return void 0 === w[t] && (w[t] = s(e), z(function() {
                    delete w[t]
                })), w[t]
            },
            x = [],
            z = function(e) {
                x.push(e)
            },
            P = function() {
                for (var e = void 0; e = x.pop();) e()
            },
            T = function() {
                function e() {
                    n(this, e)
                }
                return f(e, [{
                    key: "on",
                    value: function(e, t, i) {
                        var n = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3];
                        void 0 === this.bindings && (this.bindings = {}), void 0 === this.bindings[e] && (this.bindings[e] = []), this.bindings[e].push({
                            handler: t,
                            ctx: i,
                            once: n
                        })
                    }
                }, {
                    key: "once",
                    value: function(e, t, i) {
                        this.on(e, t, i, !0)
                    }
                }, {
                    key: "off",
                    value: function(e, t) {
                        if (void 0 !== this.bindings && void 0 !== this.bindings[e])
                            if (void 0 === t) delete this.bindings[e];
                            else
                                for (var i = 0; i < this.bindings[e].length;) this.bindings[e][i].handler === t ? this.bindings[e].splice(i, 1) : ++i
                    }
                }, {
                    key: "trigger",
                    value: function(e) {
                        if (void 0 !== this.bindings && this.bindings[e]) {
                            for (var t = 0, i = arguments.length, n = Array(1 < i ? i - 1 : 0), a = 1; a < i; a++) n[a - 1] = arguments[a];
                            for (; t < this.bindings[e].length;) {
                                var o = this.bindings[e][t],
                                    s = o.handler,
                                    r = o.ctx,
                                    l = o.once,
                                    d = r;
                                void 0 === d && (d = this), s.apply(d, n), l ? this.bindings[e].splice(t, 1) : ++t
                            }
                        }
                    }
                }]), e
            }();
        M.Utils = {
            getActualBoundingClientRect: s,
            getScrollParents: r,
            getBounds: E,
            getOffsetParent: _,
            extend: I,
            addClass: l,
            removeClass: o,
            hasClass: d,
            updateClasses: h,
            defer: z,
            flush: P,
            uniqueId: y,
            Evented: T,
            getScrollBarSize: k,
            removeUtilElements: a
        };
        var O = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var i = [],
                    n = !0,
                    a = !1,
                    o = void 0;
                try {
                    for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
                } catch (e) {
                    a = !0, o = e
                } finally {
                    try {
                        !n && r.return && r.return()
                    } finally {
                        if (a) throw o
                    }
                }
                return i
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
        f = function() {
            function n(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(e, t, i) {
                return t && n(e.prototype, t), i && n(e, i), e
            }
        }();
        if (void 0 === M) throw new Error("You must include the utils.js file before tether.js");
        var C, S, L, N, r = (Q = M.Utils).getScrollParents,
            _ = (E = Q.getBounds, Q.getOffsetParent),
            l = (I = Q.extend, Q.addClass),
            o = Q.removeClass,
            k = (h = Q.updateClasses, z = Q.defer, P = Q.flush, Q.getScrollBarSize),
            a = Q.removeUtilElements,
            H = function() {
                if ("undefined" == typeof document) return "";
                for (var e = document.createElement("div"), t = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], i = 0; i < t.length; ++i) {
                    var n = t[i];
                    if (void 0 !== e.style[n]) return n
                }
            }(),
            B = [],
            W = function() {
                B.forEach(function(e) {
                    e.position(!1)
                }), P()
            };
        L = S = C = null, N = function e() {
            return void 0 !== S && 16 < S ? (S = Math.min(S - 16, 250), void(L = setTimeout(e, 250))) : void(void 0 !== C && u() - C < 10 || (null != L && (clearTimeout(L), L = null), C = u(), W(), S = u() - C))
        }, "undefined" != typeof window && void 0 !== window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function(e) {
            window.addEventListener(e, N)
        });
        var j = {
                center: "center",
                left: "right",
                right: "left"
            },
            Y = {
                middle: "middle",
                top: "bottom",
                bottom: "top"
            },
            R = {
                top: 0,
                left: 0,
                middle: "50%",
                center: "50%",
                bottom: "100%",
                right: "100%"
            },
            $ = function(e) {
                var t = e.left,
                    i = e.top;
                return void 0 !== R[e.left] && (t = R[e.left]), void 0 !== R[e.top] && (i = R[e.top]), {
                    left: t,
                    top: i
                }
            },
            F = function(e) {
                var t = e.split(" "),
                    i = O(t, 2);
                return {
                    top: i[0],
                    left: i[1]
                }
            },
            X = F,
            q = function(e) {
                function i(e) {
                    var t = this;
                    n(this, i),
                        function(e, t, i) {
                            for (var n = !0; n;) {
                                var a = e,
                                    o = t,
                                    s = i;
                                n = !1, null === a && (a = Function.prototype);
                                var r = Object.getOwnPropertyDescriptor(a, o);
                                if (void 0 !== r) {
                                    if ("value" in r) return r.value;
                                    var l = r.get;
                                    if (void 0 === l) return;
                                    return l.call(s)
                                }
                                var d = Object.getPrototypeOf(a);
                                if (null === d) return;
                                e = d, t = o, i = s, n = !0, r = d = void 0
                            }
                        }(Object.getPrototypeOf(i.prototype), "constructor", this).call(this), this.position = this.position.bind(this), B.push(this), this.history = [], this.setOptions(e, !1), M.modules.forEach(function(e) {
                            void 0 !== e.initialize && e.initialize.call(t)
                        }), this.position()
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(i, T), f(i, [{
                    key: "getClass",
                    value: function() {
                        var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
                            t = this.options.classes;
                        return void 0 !== t && t[e] ? this.options.classes[e] : this.options.classPrefix ? this.options.classPrefix + "-" + e : e
                    }
                }, {
                    key: "setOptions",
                    value: function(e) {
                        var t = this,
                            i = arguments.length <= 1 || void 0 === arguments[1] || arguments[1];
                        this.options = I({
                            offset: "0 0",
                            targetOffset: "0 0",
                            targetAttachment: "auto auto",
                            classPrefix: "tether"
                        }, e);
                        var n = this.options,
                            a = n.element,
                            o = n.target,
                            s = n.targetModifier;
                        if (this.element = a, this.target = o, this.targetModifier = s, "viewport" === this.target ? (this.target = document.body, this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"), ["element", "target"].forEach(function(e) {
                                if (void 0 === t[e]) throw new Error("Tether Error: Both element and target must be defined");
                                void 0 !== t[e].jquery ? t[e] = t[e][0] : "string" == typeof t[e] && (t[e] = document.querySelector(t[e]))
                            }), l(this.element, this.getClass("element")), !1 !== this.options.addTargetClasses && l(this.target, this.getClass("target")), !this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                        this.targetAttachment = X(this.options.targetAttachment), this.attachment = X(this.options.attachment), this.offset = F(this.options.offset), this.targetOffset = F(this.options.targetOffset), void 0 !== this.scrollParents && this.disable(), "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = r(this.target), !1 !== this.options.enabled && this.enable(i)
                    }
                }, {
                    key: "getTargetBounds",
                    value: function() {
                        if (void 0 === this.targetModifier) return E(this.target);
                        if ("visible" === this.targetModifier) return this.target === document.body ? {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        } : ((o = {
                            height: (e = E(this.target)).height,
                            width: e.width,
                            top: e.top,
                            left: e.left
                        }).height = Math.min(o.height, e.height - (pageYOffset - e.top)), o.height = Math.min(o.height, e.height - (e.top + e.height - (pageYOffset + innerHeight))), o.height = Math.min(innerHeight, o.height), o.height -= 2, o.width = Math.min(o.width, e.width - (pageXOffset - e.left)), o.width = Math.min(o.width, e.width - (e.left + e.width - (pageXOffset + innerWidth))), o.width = Math.min(innerWidth, o.width), o.width -= 2, o.top < pageYOffset && (o.top = pageYOffset), o.left < pageXOffset && (o.left = pageXOffset), o);
                        if ("scroll-handle" === this.targetModifier) {
                            var e = void 0,
                                t = this.target;
                            e = t === document.body ? (t = document.documentElement, {
                                left: pageXOffset,
                                top: pageYOffset,
                                height: innerHeight,
                                width: innerWidth
                            }) : E(t);
                            var i = getComputedStyle(t),
                                n = 0;
                            (t.scrollWidth > t.clientWidth || 0 <= [i.overflow, i.overflowX].indexOf("scroll") || this.target !== document.body) && (n = 15);
                            var a = e.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - n,
                                o = {
                                    width: 15,
                                    height: .975 * a * (a / t.scrollHeight),
                                    left: e.left + e.width - parseFloat(i.borderLeftWidth) - 15
                                },
                                s = 0;
                            a < 408 && this.target === document.body && (s = -11e-5 * Math.pow(a, 2) - .00727 * a + 22.58), this.target !== document.body && (o.height = Math.max(o.height, 24));
                            var r = this.target.scrollTop / (t.scrollHeight - a);
                            return o.top = r * (a - o.height - s) + e.top + parseFloat(i.borderTopWidth), this.target === document.body && (o.height = Math.max(o.height, 24)), o
                        }
                    }
                }, {
                    key: "clearCache",
                    value: function() {
                        this._cache = {}
                    }
                }, {
                    key: "cache",
                    value: function(e, t) {
                        return void 0 === this._cache && (this._cache = {}), void 0 === this._cache[e] && (this._cache[e] = t.call(this)), this._cache[e]
                    }
                }, {
                    key: "enable",
                    value: function() {
                        var t = this,
                            e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        !1 !== this.options.addTargetClasses && l(this.target, this.getClass("enabled")), l(this.element, this.getClass("enabled")), this.enabled = !0, this.scrollParents.forEach(function(e) {
                            e !== t.target.ownerDocument && e.addEventListener("scroll", t.position)
                        }), e && this.position()
                    }
                }, {
                    key: "disable",
                    value: function() {
                        var t = this;
                        o(this.target, this.getClass("enabled")), o(this.element, this.getClass("enabled")), this.enabled = !1, void 0 !== this.scrollParents && this.scrollParents.forEach(function(e) {
                            e.removeEventListener("scroll", t.position)
                        })
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        var i = this;
                        this.disable(), B.forEach(function(e, t) {
                            e === i && B.splice(t, 1)
                        }), 0 === B.length && a()
                    }
                }, {
                    key: "updateAttachClasses",
                    value: function(e, t) {
                        var i = this;
                        e = e || this.attachment, t = t || this.targetAttachment;
                        void 0 !== this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length), void 0 === this._addAttachClasses && (this._addAttachClasses = []);
                        var n = this._addAttachClasses;
                        e.top && n.push(this.getClass("element-attached") + "-" + e.top), e.left && n.push(this.getClass("element-attached") + "-" + e.left), t.top && n.push(this.getClass("target-attached") + "-" + t.top), t.left && n.push(this.getClass("target-attached") + "-" + t.left);
                        var a = [];
                        ["left", "top", "bottom", "right", "middle", "center"].forEach(function(e) {
                            a.push(i.getClass("element-attached") + "-" + e), a.push(i.getClass("target-attached") + "-" + e)
                        }), z(function() {
                            void 0 !== i._addAttachClasses && (h(i.element, i._addAttachClasses, a), !1 !== i.options.addTargetClasses && h(i.target, i._addAttachClasses, a), delete i._addAttachClasses)
                        })
                    }
                }, {
                    key: "position",
                    value: function() {
                        var e, t, i, n, r = this,
                            a = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        if (this.enabled) {
                            this.clearCache();
                            var o = (e = this.targetAttachment, t = this.attachment, i = e.left, n = e.top, "auto" === i && (i = j[t.left]), "auto" === n && (n = Y[t.top]), {
                                left: i,
                                top: n
                            });
                            this.updateAttachClasses(this.attachment, o);
                            var s = this.cache("element-bounds", function() {
                                    return E(r.element)
                                }),
                                l = s.width,
                                d = s.height;
                            if (0 === l && 0 === d && void 0 !== this.lastSize) {
                                var c = this.lastSize;
                                l = c.width, d = c.height
                            } else this.lastSize = {
                                width: l,
                                height: d
                            };
                            var p = this.cache("target-bounds", function() {
                                    return r.getTargetBounds()
                                }),
                                u = p,
                                h = D($(this.attachment), {
                                    width: l,
                                    height: d
                                }),
                                f = D($(o), u),
                                m = D(this.offset, {
                                    width: l,
                                    height: d
                                }),
                                g = D(this.targetOffset, u);
                            h = A(h, m), f = A(f, g);
                            for (var v = p.left + f.left - h.left, y = p.top + f.top - h.top, w = 0; w < M.modules.length; ++w) {
                                var b = M.modules[w].position.call(this, {
                                    left: v,
                                    top: y,
                                    targetAttachment: o,
                                    targetPos: p,
                                    elementPos: s,
                                    offset: h,
                                    targetOffset: f,
                                    manualOffset: m,
                                    manualTargetOffset: g,
                                    scrollbarSize: S,
                                    attachment: this.attachment
                                });
                                if (!1 === b) return !1;
                                void 0 !== b && "object" == typeof b && (y = b.top, v = b.left)
                            }
                            var x = {
                                    page: {
                                        top: y,
                                        left: v
                                    },
                                    viewport: {
                                        top: y - pageYOffset,
                                        bottom: pageYOffset - y - d + innerHeight,
                                        left: v - pageXOffset,
                                        right: pageXOffset - v - l + innerWidth
                                    }
                                },
                                T = this.target.ownerDocument,
                                C = T.defaultView,
                                S = void 0;
                            return T.body.scrollWidth > C.innerWidth && (S = this.cache("scrollbar-size", k), x.viewport.bottom -= S.height), T.body.scrollHeight > C.innerHeight && (S = this.cache("scrollbar-size", k), x.viewport.right -= S.width), (-1 === ["", "static"].indexOf(T.body.style.position) || -1 === ["", "static"].indexOf(T.body.parentElement.style.position)) && (x.page.bottom = T.body.scrollHeight - y - d, x.page.right = T.body.scrollWidth - v - l), void 0 !== this.options.optimizations && !1 !== this.options.optimizations.moveElement && void 0 === this.targetModifier && function() {
                                var e = r.cache("target-offsetparent", function() {
                                        return _(r.target)
                                    }),
                                    t = r.cache("target-offsetparent-bounds", function() {
                                        return E(e)
                                    }),
                                    i = getComputedStyle(e),
                                    n = t,
                                    a = {};
                                if (["Top", "Left", "Bottom", "Right"].forEach(function(e) {
                                        a[e.toLowerCase()] = parseFloat(i["border" + e + "Width"])
                                    }), t.right = T.body.scrollWidth - t.left - n.width + a.right, t.bottom = T.body.scrollHeight - t.top - n.height + a.bottom, x.page.top >= t.top + a.top && x.page.bottom >= t.bottom && x.page.left >= t.left + a.left && x.page.right >= t.right) {
                                    var o = e.scrollTop,
                                        s = e.scrollLeft;
                                    x.offset = {
                                        top: x.page.top - t.top + o - a.top,
                                        left: x.page.left - t.left + s - a.left
                                    }
                                }
                            }(), this.move(x), this.history.unshift(x), 3 < this.history.length && this.history.pop(), a && P(), !0
                        }
                    }
                }, {
                    key: "move",
                    value: function(t) {
                        var a = this;
                        if (void 0 !== this.element.parentNode) {
                            var i = {};
                            for (var e in t)
                                for (var n in i[e] = {}, t[e]) {
                                    for (var o = !1, s = 0; s < this.history.length; ++s) {
                                        var r = this.history[s];
                                        if (void 0 !== r[e] && !g(r[e][n], t[e][n])) {
                                            o = !0;
                                            break
                                        }
                                    }
                                    o || (i[e][n] = !0)
                                }
                            var l = {
                                    top: "",
                                    left: "",
                                    right: "",
                                    bottom: ""
                                },
                                d = function(e, t) {
                                    if (!1 !== (void 0 !== a.options.optimizations ? a.options.optimizations.gpu : null)) {
                                        var i = void 0,
                                            n = void 0;
                                        i = e.top ? (l.top = 0, t.top) : (l.bottom = 0, -t.bottom), n = e.left ? (l.left = 0, t.left) : (l.right = 0, -t.right), l[H] = "translateX(" + Math.round(n) + "px) translateY(" + Math.round(i) + "px)", "msTransform" !== H && (l[H] += " translateZ(0)")
                                    } else e.top ? l.top = t.top + "px" : l.bottom = t.bottom + "px", e.left ? l.left = t.left + "px" : l.right = t.right + "px"
                                },
                                c = !1;
                            if ((i.page.top || i.page.bottom) && (i.page.left || i.page.right) ? (l.position = "absolute", d(i.page, t.page)) : (i.viewport.top || i.viewport.bottom) && (i.viewport.left || i.viewport.right) ? (l.position = "fixed", d(i.viewport, t.viewport)) : void 0 !== i.offset && i.offset.top && i.offset.left ? function() {
                                    l.position = "absolute";
                                    var e = a.cache("target-offsetparent", function() {
                                        return _(a.target)
                                    });
                                    _(a.element) !== e && z(function() {
                                        a.element.parentNode.removeChild(a.element), e.appendChild(a.element)
                                    }), d(i.offset, t.offset), c = !0
                                }() : (l.position = "absolute", d({
                                    top: !0,
                                    left: !0
                                }, t.page)), !c) {
                                for (var p = !0, u = this.element.parentNode; u && 1 === u.nodeType && "BODY" !== u.tagName;) {
                                    if ("static" !== getComputedStyle(u).position) {
                                        p = !1;
                                        break
                                    }
                                    u = u.parentNode
                                }
                                p || (this.element.parentNode.removeChild(this.element), this.element.ownerDocument.body.appendChild(this.element))
                            }
                            var h = {},
                                f = !1;
                            for (var n in l) {
                                var m = l[n];
                                this.element.style[n] !== m && (f = !0, h[n] = m)
                            }
                            f && z(function() {
                                I(a.element.style, h)
                            })
                        }
                    }
                }]), i
            }();
        q.modules = [], M.position = W;
        var G = I(q, M),
            I = (O = function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var i = [],
                        n = !0,
                        a = !1,
                        o = void 0;
                    try {
                        for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
                    } catch (e) {
                        a = !0, o = e
                    } finally {
                        try {
                            !n && r.return && r.return()
                        } finally {
                            if (a) throw o
                        }
                    }
                    return i
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }, E = (Q = M.Utils).getBounds, Q.extend),
            V = (h = Q.updateClasses, z = Q.defer, ["left", "top", "right", "bottom"]);
        M.modules.push({
            position: function(e) {
                var m = this,
                    g = e.top,
                    v = e.left,
                    y = e.targetAttachment;
                if (!this.options.constraints) return !0;
                var t = this.cache("element-bounds", function() {
                        return E(m.element)
                    }),
                    w = t.height,
                    b = t.width;
                if (0 === b && 0 === w && void 0 !== this.lastSize) {
                    var i = this.lastSize;
                    b = i.width, w = i.height
                }
                var n = this.cache("target-bounds", function() {
                        return m.getTargetBounds()
                    }),
                    x = n.height,
                    T = n.width,
                    a = [this.getClass("pinned"), this.getClass("out-of-bounds")];
                this.options.constraints.forEach(function(e) {
                    var t = e.outOfBoundsClass,
                        i = e.pinnedClass;
                    t && a.push(t), i && a.push(i)
                }), a.forEach(function(t) {
                    ["left", "top", "right", "bottom"].forEach(function(e) {
                        a.push(t + "-" + e)
                    })
                });
                var C = [],
                    S = I({}, y),
                    _ = I({}, this.attachment);
                return this.options.constraints.forEach(function(e) {
                    var t = e.to,
                        i = e.attachment,
                        n = e.pin;
                    void 0 === i && (i = "");
                    var a = void 0,
                        o = void 0;
                    if (0 <= i.indexOf(" ")) {
                        var s = i.split(" "),
                            r = O(s, 2);
                        o = r[0], a = r[1]
                    } else a = o = i;
                    var l, d, c = (l = m, "scrollParent" === (d = t) ? d = l.scrollParents[0] : "window" === d && (d = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]), d === document && (d = d.documentElement), void 0 !== d.nodeType && function() {
                        var e = d,
                            t = E(d),
                            i = t,
                            n = getComputedStyle(d);
                        if (d = [i.left, i.top, t.width + i.left, t.height + i.top], e.ownerDocument !== document) {
                            var a = e.ownerDocument.defaultView;
                            d[0] += a.pageXOffset, d[1] += a.pageYOffset, d[2] += a.pageXOffset, d[3] += a.pageYOffset
                        }
                        V.forEach(function(e, t) {
                            "Top" === (e = e[0].toUpperCase() + e.substr(1)) || "Left" === e ? d[t] += parseFloat(n["border" + e + "Width"]) : d[t] -= parseFloat(n["border" + e + "Width"])
                        })
                    }(), d);
                    ("target" === o || "both" === o) && (g < c[1] && "top" === S.top && (g += x, S.top = "bottom"), g + w > c[3] && "bottom" === S.top && (g -= x, S.top = "top")), "together" === o && ("top" === S.top && ("bottom" === _.top && g < c[1] ? (g += x, S.top = "bottom", g += w, _.top = "top") : "top" === _.top && g + w > c[3] && g - (w - x) >= c[1] && (g -= w - x, S.top = "bottom", _.top = "bottom")), "bottom" === S.top && ("top" === _.top && g + w > c[3] ? (g -= x, S.top = "top", g -= w, _.top = "bottom") : "bottom" === _.top && g < c[1] && g + (2 * w - x) <= c[3] && (g += w - x, S.top = "top", _.top = "top")), "middle" === S.top && (g + w > c[3] && "top" === _.top ? (g -= w, _.top = "bottom") : g < c[1] && "bottom" === _.top && (g += w, _.top = "top"))), ("target" === a || "both" === a) && (v < c[0] && "left" === S.left && (v += T, S.left = "right"), v + b > c[2] && "right" === S.left && (v -= T, S.left = "left")), "together" === a && (v < c[0] && "left" === S.left ? "right" === _.left ? (v += T, S.left = "right", v += b, _.left = "left") : "left" === _.left && (v += T, S.left = "right", v -= b, _.left = "right") : v + b > c[2] && "right" === S.left ? "left" === _.left ? (v -= T, S.left = "left", v -= b, _.left = "right") : "right" === _.left && (v -= T, S.left = "left", v += b, _.left = "left") : "center" === S.left && (v + b > c[2] && "left" === _.left ? (v -= b, _.left = "right") : v < c[0] && "right" === _.left && (v += b, _.left = "left"))), ("element" === o || "both" === o) && (g < c[1] && "bottom" === _.top && (g += w, _.top = "top"), g + w > c[3] && "top" === _.top && (g -= w, _.top = "bottom")), ("element" === a || "both" === a) && (v < c[0] && ("right" === _.left ? (v += b, _.left = "left") : "center" === _.left && (v += b / 2, _.left = "left")), v + b > c[2] && ("left" === _.left ? (v -= b, _.left = "right") : "center" === _.left && (v -= b / 2, _.left = "right"))), "string" == typeof n ? n = n.split(",").map(function(e) {
                        return e.trim()
                    }) : !0 === n && (n = ["top", "left", "right", "bottom"]), n = n || [];
                    var p, u, h = [],
                        f = [];
                    g < c[1] && (0 <= n.indexOf("top") ? (g = c[1], h.push("top")) : f.push("top")), g + w > c[3] && (0 <= n.indexOf("bottom") ? (g = c[3] - w, h.push("bottom")) : f.push("bottom")), v < c[0] && (0 <= n.indexOf("left") ? (v = c[0], h.push("left")) : f.push("left")), v + b > c[2] && (0 <= n.indexOf("right") ? (v = c[2] - b, h.push("right")) : f.push("right")), h.length && (u = void 0 !== m.options.pinnedClass ? m.options.pinnedClass : m.getClass("pinned"), C.push(u), h.forEach(function(e) {
                        C.push(u + "-" + e)
                    })), f.length && (p = void 0 !== m.options.outOfBoundsClass ? m.options.outOfBoundsClass : m.getClass("out-of-bounds"), C.push(p), f.forEach(function(e) {
                        C.push(p + "-" + e)
                    })), (0 <= h.indexOf("left") || 0 <= h.indexOf("right")) && (_.left = S.left = !1), (0 <= h.indexOf("top") || 0 <= h.indexOf("bottom")) && (_.top = S.top = !1), (S.top !== y.top || S.left !== y.left || _.top !== m.attachment.top || _.left !== m.attachment.left) && (m.updateAttachClasses(_, S), m.trigger("update", {
                        attachment: _,
                        targetAttachment: S
                    }))
                }), z(function() {
                    !1 !== m.options.addTargetClasses && h(m.target, C, a), h(m.element, C, a)
                }), {
                    top: g,
                    left: v
                }
            }
        });
        var Q, E = (Q = M.Utils).getBounds,
            h = Q.updateClasses;
        z = Q.defer;
        M.modules.push({
            position: function(e) {
                var t = this,
                    i = e.top,
                    n = e.left,
                    a = this.cache("element-bounds", function() {
                        return E(t.element)
                    }),
                    o = a.height,
                    s = a.width,
                    r = this.getTargetBounds(),
                    l = i + o,
                    d = n + s,
                    c = [];
                i <= r.bottom && l >= r.top && ["left", "right"].forEach(function(e) {
                    var t = r[e];
                    (t === n || t === d) && c.push(e)
                }), n <= r.right && d >= r.left && ["top", "bottom"].forEach(function(e) {
                    var t = r[e];
                    (t === i || t === l) && c.push(e)
                });
                var p = [],
                    u = [];
                return p.push(this.getClass("abutted")), ["left", "top", "right", "bottom"].forEach(function(e) {
                    p.push(t.getClass("abutted") + "-" + e)
                }), c.length && u.push(this.getClass("abutted")), c.forEach(function(e) {
                    u.push(t.getClass("abutted") + "-" + e)
                }), z(function() {
                    !1 !== t.options.addTargetClasses && h(t.target, u, p), h(t.element, u, p)
                }), !0
            }
        });
        O = function(e, t) {
            if (Array.isArray(e)) return e;
            if (Symbol.iterator in Object(e)) return function(e, t) {
                var i = [],
                    n = !0,
                    a = !1,
                    o = void 0;
                try {
                    for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
                } catch (e) {
                    a = !0, o = e
                } finally {
                    try {
                        !n && r.return && r.return()
                    } finally {
                        if (a) throw o
                    }
                }
                return i
            }(e, t);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        };
        return M.modules.push({
            position: function(e) {
                var t = e.top,
                    i = e.left;
                if (this.options.shift) {
                    var n = this.options.shift;
                    "function" == typeof this.options.shift && (n = this.options.shift.call(this, {
                        top: t,
                        left: i
                    }));
                    var a = void 0,
                        o = void 0;
                    if ("string" == typeof n) {
                        (n = n.split(" "))[1] = n[1] || n[0];
                        var s = O(n, 2);
                        a = s[0], o = s[1], a = parseFloat(a, 10), o = parseFloat(o, 10)
                    } else a = n.top, o = n.left;
                    return {
                        top: t += a,
                        left: i += o
                    }
                }
            }
        }), G
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
! function(e) {
    var t = jQuery.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(),
function() {
    function b(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var l, a, e, t, d, s, c, p, r, u, h, f, m, g, v, i, y, w, n, o, x, T, C, S, _, E, k, I, A, D, M, z, P, O, L, N, H, B, W, j, Y, R, $, F, X, q, G, V, Q, K, U, Z, J, ee, te, ie, ne, ae, oe, se, re, le, de, ce, pe, ue, he, fe, me, ge, ve, ye, we, be, xe, Te, Ce, Se, _e, Ee, ke, Ie, Ae, De, Me, ze, Pe, Oe, Le, Ne, He, Be, We, je, Ye, Re, $e, Fe, Xe, qe, Ge, Ve, Qe, Ke, Ue, Ze, Je, et, tt, it, nt, at, ot, st, rt, lt, dt, ct, pt, ut, ht, ft, mt, gt, vt, yt, wt, bt, xt, Tt, Ct, St, _t, Et, kt, It, At, Dt, Mt, zt, Pt, Ot, Lt, Nt, Ht, Bt, Wt, jt, Yt, Rt, $t, Ft, Xt, qt, Gt, Vt, Qt, Kt, Ut, Zt, Jt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        ei = function() {
            function n(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }
            return function(e, t, i) {
                return t && n(e.prototype, t), i && n(e, i), e
            }
        }(),
        ti = function(n) {
            function e(e) {
                var t = this,
                    i = !1;
                return n(this).one(a.TRANSITION_END, function() {
                    i = !0
                }), setTimeout(function() {
                    i || a.triggerTransitionEnd(t)
                }, e), this
            }
            var t = !1,
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                },
                a = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(e) {
                        for (; e += ~~(1e6 * Math.random()), document.getElementById(e););
                        return e
                    },
                    getSelectorFromElement: function(e) {
                        var t = e.getAttribute("data-target");
                        return t || (t = e.getAttribute("href") || "", t = /^#[a-z]/i.test(t) ? t : null), t
                    },
                    reflow: function(e) {
                        return e.offsetHeight
                    },
                    triggerTransitionEnd: function(e) {
                        n(e).trigger(t.end)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(t)
                    },
                    typeCheckConfig: function(e, t, i) {
                        for (var n in i)
                            if (i.hasOwnProperty(n)) {
                                var a = i[n],
                                    o = t[n],
                                    s = o && ((l = o)[0] || l).nodeType ? "element" : (r = o, {}.toString.call(r).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                                if (!new RegExp(a).test(s)) throw new Error(e.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + a + '".')
                            }
                        var r, l
                    }
                };
            return t = function() {
                if (window.QUnit) return !1;
                var e = document.createElement("bootstrap");
                for (var t in i)
                    if (void 0 !== e.style[t]) return {
                        end: i[t]
                    };
                return !1
            }(), n.fn.emulateTransitionEnd = e, a.supportsTransitionEnd() && (n.event.special[a.TRANSITION_END] = {
                bindType: t.end,
                delegateType: t.end,
                handle: function(e) {
                    if (n(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), a
        }(jQuery),
        ii = (Dt = jQuery, Mt = "alert", Pt = "." + (zt = "bs.alert"), Ot = Dt.fn[Mt], Lt = {
            CLOSE: "close" + Pt,
            CLOSED: "closed" + Pt,
            CLICK_DATA_API: "click" + Pt + ".data-api"
        }, Nt = "alert", Ht = "fade", Bt = "show", Wt = function() {
            function n(e) {
                b(this, n), this._element = e
            }
            return n.prototype.close = function(e) {
                e = e || this._element;
                var t = this._getRootElement(e);
                this._triggerCloseEvent(t).isDefaultPrevented() || this._removeElement(t)
            }, n.prototype.dispose = function() {
                Dt.removeData(this._element, zt), this._element = null
            }, n.prototype._getRootElement = function(e) {
                var t = ti.getSelectorFromElement(e),
                    i = !1;
                return t && (i = Dt(t)[0]), i || (i = Dt(e).closest("." + Nt)[0]), i
            }, n.prototype._triggerCloseEvent = function(e) {
                var t = Dt.Event(Lt.CLOSE);
                return Dt(e).trigger(t), t
            }, n.prototype._removeElement = function(t) {
                var i = this;
                return Dt(t).removeClass(Bt), ti.supportsTransitionEnd() && Dt(t).hasClass(Ht) ? void Dt(t).one(ti.TRANSITION_END, function(e) {
                    return i._destroyElement(t, e)
                }).emulateTransitionEnd(150) : void this._destroyElement(t)
            }, n.prototype._destroyElement = function(e) {
                Dt(e).detach().trigger(Lt.CLOSED).remove()
            }, n._jQueryInterface = function(i) {
                return this.each(function() {
                    var e = Dt(this),
                        t = e.data(zt);
                    t || (t = new n(this), e.data(zt, t)), "close" === i && t[i](this)
                })
            }, n._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, ei(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }]), n
        }(), Dt(document).on(Lt.CLICK_DATA_API, '[data-dismiss="alert"]', Wt._handleDismiss(new Wt)), Dt.fn[Mt] = Wt._jQueryInterface, Dt.fn[Mt].Constructor = Wt, Dt.fn[Mt].noConflict = function() {
            return Dt.fn[Mt] = Ot, Wt._jQueryInterface
        }, ft = jQuery, mt = "button", vt = "." + (gt = "bs.button"), yt = ".data-api", wt = ft.fn[mt], bt = "active", xt = "btn", Ct = '[data-toggle^="button"]', St = '[data-toggle="buttons"]', _t = "input", Et = ".active", kt = ".btn", It = {
            CLICK_DATA_API: "click" + vt + yt,
            FOCUS_BLUR_DATA_API: (Tt = "focus") + vt + yt + " blur" + vt + yt
        }, At = function() {
            function i(e) {
                b(this, i), this._element = e
            }
            return i.prototype.toggle = function() {
                var e = !0,
                    t = ft(this._element).closest(St)[0];
                if (t) {
                    var i = ft(this._element).find(_t)[0];
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && ft(this._element).hasClass(bt)) e = !1;
                            else {
                                var n = ft(t).find(Et)[0];
                                n && ft(n).removeClass(bt)
                            }
                        e && (i.checked = !ft(this._element).hasClass(bt), ft(i).trigger("change")), i.focus()
                    }
                }
                this._element.setAttribute("aria-pressed", !ft(this._element).hasClass(bt)), e && ft(this._element).toggleClass(bt)
            }, i.prototype.dispose = function() {
                ft.removeData(this._element, gt), this._element = null
            }, i._jQueryInterface = function(t) {
                return this.each(function() {
                    var e = ft(this).data(gt);
                    e || (e = new i(this), ft(this).data(gt, e)), "toggle" === t && e[t]()
                })
            }, ei(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }]), i
        }(), ft(document).on(It.CLICK_DATA_API, Ct, function(e) {
            e.preventDefault();
            var t = e.target;
            ft(t).hasClass(xt) || (t = ft(t).closest(kt)), At._jQueryInterface.call(ft(t), "toggle")
        }).on(It.FOCUS_BLUR_DATA_API, Ct, function(e) {
            var t = ft(e.target).closest(kt)[0];
            ft(t).toggleClass(Tt, /^focus(in)?$/.test(e.type))
        }), ft.fn[mt] = At._jQueryInterface, ft.fn[mt].Constructor = At, ft.fn[mt].noConflict = function() {
            return ft.fn[mt] = wt, At._jQueryInterface
        }, je = jQuery, Ye = "carousel", $e = "." + (Re = "bs.carousel"), Fe = ".data-api", Xe = je.fn[Ye], qe = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
        }, Ge = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, Ve = "next", Qe = "prev", Ke = "left", Ue = "right", Ze = {
            SLIDE: "slide" + $e,
            SLID: "slid" + $e,
            KEYDOWN: "keydown" + $e,
            MOUSEENTER: "mouseenter" + $e,
            MOUSELEAVE: "mouseleave" + $e,
            LOAD_DATA_API: "load" + $e + Fe,
            CLICK_DATA_API: "click" + $e + Fe
        }, Je = "carousel", et = "active", tt = "slide", it = "carousel-item-right", nt = "carousel-item-left", at = "carousel-item-next", ot = "carousel-item-prev", st = ".active", rt = ".active.carousel-item", lt = ".carousel-item", dt = ".carousel-item-next, .carousel-item-prev", ct = ".carousel-indicators", pt = "[data-slide], [data-slide-to]", ut = '[data-ride="carousel"]', ht = function() {
            function o(e, t) {
                b(this, o), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(t), this._element = je(e)[0], this._indicatorsElement = je(this._element).find(ct)[0], this._addEventListeners()
            }
            return o.prototype.next = function() {
                if (this._isSliding) throw new Error("Carousel is sliding");
                this._slide(Ve)
            }, o.prototype.nextWhenVisible = function() {
                document.hidden || this.next()
            }, o.prototype.prev = function() {
                if (this._isSliding) throw new Error("Carousel is sliding");
                this._slide(Qe)
            }, o.prototype.pause = function(e) {
                e || (this._isPaused = !0), je(this._element).find(dt)[0] && ti.supportsTransitionEnd() && (ti.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, o.prototype.cycle = function(e) {
                e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, o.prototype.to = function(e) {
                var t = this;
                this._activeElement = je(this._element).find(rt)[0];
                var i = this._getItemIndex(this._activeElement);
                if (!(e > this._items.length - 1 || e < 0)) {
                    if (this._isSliding) return void je(this._element).one(Ze.SLID, function() {
                        return t.to(e)
                    });
                    if (i === e) return this.pause(), void this.cycle();
                    var n = i < e ? Ve : Qe;
                    this._slide(n, this._items[e])
                }
            }, o.prototype.dispose = function() {
                je(this._element).off($e), je.removeData(this._element, Re), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, o.prototype._getConfig = function(e) {
                return e = je.extend({}, qe, e), ti.typeCheckConfig(Ye, e, Ge), e
            }, o.prototype._addEventListeners = function() {
                var t = this;
                this._config.keyboard && je(this._element).on(Ze.KEYDOWN, function(e) {
                    return t._keydown(e)
                }), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || je(this._element).on(Ze.MOUSEENTER, function(e) {
                    return t.pause(e)
                }).on(Ze.MOUSELEAVE, function(e) {
                    return t.cycle(e)
                })
            }, o.prototype._keydown = function(e) {
                if (!/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                    case 37:
                        e.preventDefault(), this.prev();
                        break;
                    case 39:
                        e.preventDefault(), this.next();
                        break;
                    default:
                        return
                }
            }, o.prototype._getItemIndex = function(e) {
                return this._items = je.makeArray(je(e).parent().find(lt)), this._items.indexOf(e)
            }, o.prototype._getItemByDirection = function(e, t) {
                var i = e === Ve,
                    n = e === Qe,
                    a = this._getItemIndex(t),
                    o = this._items.length - 1;
                if ((n && 0 === a || i && a === o) && !this._config.wrap) return t;
                var s = (a + (e === Qe ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, o.prototype._triggerSlideEvent = function(e, t) {
                var i = je.Event(Ze.SLIDE, {
                    relatedTarget: e,
                    direction: t
                });
                return je(this._element).trigger(i), i
            }, o.prototype._setActiveIndicatorElement = function(e) {
                if (this._indicatorsElement) {
                    je(this._indicatorsElement).find(st).removeClass(et);
                    var t = this._indicatorsElement.children[this._getItemIndex(e)];
                    t && je(t).addClass(et)
                }
            }, o.prototype._slide = function(e, t) {
                var i = this,
                    n = je(this._element).find(rt)[0],
                    a = t || n && this._getItemByDirection(e, n),
                    o = Boolean(this._interval),
                    s = void 0,
                    r = void 0,
                    l = void 0;
                if (l = e === Ve ? (s = nt, r = at, Ke) : (s = it, r = ot, Ue), a && je(a).hasClass(et)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(a, l).isDefaultPrevented() && n && a) {
                    this._isSliding = !0, o && this.pause(), this._setActiveIndicatorElement(a);
                    var d = je.Event(Ze.SLID, {
                        relatedTarget: a,
                        direction: l
                    });
                    ti.supportsTransitionEnd() && je(this._element).hasClass(tt) ? (je(a).addClass(r), ti.reflow(a), je(n).addClass(s), je(a).addClass(s), je(n).one(ti.TRANSITION_END, function() {
                        je(a).removeClass(s + " " + r).addClass(et), je(n).removeClass(et + " " + r + " " + s), i._isSliding = !1, setTimeout(function() {
                            return je(i._element).trigger(d)
                        }, 0)
                    }).emulateTransitionEnd(600)) : (je(n).removeClass(et), je(a).addClass(et), this._isSliding = !1, je(this._element).trigger(d)), o && this.cycle()
                }
            }, o._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = je(this).data(Re),
                        t = je.extend({}, qe, je(this).data());
                    "object" === (void 0 === n ? "undefined" : Jt(n)) && je.extend(t, n);
                    var i = "string" == typeof n ? n : t.slide;
                    if (e || (e = new o(this, t), je(this).data(Re, e)), "number" == typeof n) e.to(n);
                    else if ("string" == typeof i) {
                        if (void 0 === e[i]) throw new Error('No method named "' + i + '"');
                        e[i]()
                    } else t.interval && (e.pause(), e.cycle())
                })
            }, o._dataApiClickHandler = function(e) {
                var t = ti.getSelectorFromElement(this);
                if (t) {
                    var i = je(t)[0];
                    if (i && je(i).hasClass(Je)) {
                        var n = je.extend({}, je(i).data(), je(this).data()),
                            a = this.getAttribute("data-slide-to");
                        a && (n.interval = !1), o._jQueryInterface.call(je(i), n), a && je(i).data(Re).to(a), e.preventDefault()
                    }
                }
            }, ei(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }, {
                key: "Default",
                get: function() {
                    return qe
                }
            }]), o
        }(), je(document).on(Ze.CLICK_DATA_API, pt, ht._dataApiClickHandler), je(window).on(Ze.LOAD_DATA_API, function() {
            je(ut).each(function() {
                var e = je(this);
                ht._jQueryInterface.call(e, e.data())
            })
        }), je.fn[Ye] = ht._jQueryInterface, je.fn[Ye].Constructor = ht, je.fn[Ye].noConflict = function() {
            return je.fn[Ye] = Xe, ht._jQueryInterface
        }, Ce = jQuery, Se = "collapse", Ee = "." + (_e = "bs.collapse"), ke = Ce.fn[Se], Ie = {
            toggle: !0,
            parent: ""
        }, Ae = {
            toggle: "boolean",
            parent: "string"
        }, De = {
            SHOW: "show" + Ee,
            SHOWN: "shown" + Ee,
            HIDE: "hide" + Ee,
            HIDDEN: "hidden" + Ee,
            CLICK_DATA_API: "click" + Ee + ".data-api"
        }, Me = "show", ze = "collapse", Pe = "collapsing", Oe = "collapsed", Le = "width", Ne = "height", He = ".card > .show, .card > .collapsing", Be = '[data-toggle="collapse"]', We = function() {
            function r(e, t) {
                b(this, r), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = Ce.makeArray(Ce('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            return r.prototype.toggle = function() {
                Ce(this._element).hasClass(Me) ? this.hide() : this.show()
            }, r.prototype.show = function() {
                var e = this;
                if (this._isTransitioning) throw new Error("Collapse is transitioning");
                if (!Ce(this._element).hasClass(Me)) {
                    var t = void 0,
                        i = void 0;
                    if (this._parent && ((t = Ce.makeArray(Ce(this._parent).find(He))).length || (t = null)), !(t && ((i = Ce(t).data(_e)) && i._isTransitioning))) {
                        var n = Ce.Event(De.SHOW);
                        if (Ce(this._element).trigger(n), !n.isDefaultPrevented()) {
                            t && (r._jQueryInterface.call(Ce(t), "hide"), i || Ce(t).data(_e, null));
                            var a = this._getDimension();
                            Ce(this._element).removeClass(ze).addClass(Pe), this._element.style[a] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && Ce(this._triggerArray).removeClass(Oe).attr("aria-expanded", !0), this.setTransitioning(!0);
                            var o = function() {
                                Ce(e._element).removeClass(Pe).addClass(ze).addClass(Me), e._element.style[a] = "", e.setTransitioning(!1), Ce(e._element).trigger(De.SHOWN)
                            };
                            if (!ti.supportsTransitionEnd()) return void o();
                            var s = "scroll" + (a[0].toUpperCase() + a.slice(1));
                            Ce(this._element).one(ti.TRANSITION_END, o).emulateTransitionEnd(600), this._element.style[a] = this._element[s] + "px"
                        }
                    }
                }
            }, r.prototype.hide = function() {
                var e = this;
                if (this._isTransitioning) throw new Error("Collapse is transitioning");
                if (Ce(this._element).hasClass(Me)) {
                    var t = Ce.Event(De.HIDE);
                    if (Ce(this._element).trigger(t), !t.isDefaultPrevented()) {
                        var i = this._getDimension(),
                            n = i === Le ? "offsetWidth" : "offsetHeight";
                        this._element.style[i] = this._element[n] + "px", ti.reflow(this._element), Ce(this._element).addClass(Pe).removeClass(ze).removeClass(Me), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && Ce(this._triggerArray).addClass(Oe).attr("aria-expanded", !1), this.setTransitioning(!0);
                        var a = function() {
                            e.setTransitioning(!1), Ce(e._element).removeClass(Pe).addClass(ze).trigger(De.HIDDEN)
                        };
                        return this._element.style[i] = "", ti.supportsTransitionEnd() ? void Ce(this._element).one(ti.TRANSITION_END, a).emulateTransitionEnd(600) : void a()
                    }
                }
            }, r.prototype.setTransitioning = function(e) {
                this._isTransitioning = e
            }, r.prototype.dispose = function() {
                Ce.removeData(this._element, _e), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, r.prototype._getConfig = function(e) {
                return (e = Ce.extend({}, Ie, e)).toggle = Boolean(e.toggle), ti.typeCheckConfig(Se, e, Ae), e
            }, r.prototype._getDimension = function() {
                return Ce(this._element).hasClass(Le) ? Le : Ne
            }, r.prototype._getParent = function() {
                var i = this,
                    e = Ce(this._config.parent)[0],
                    t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                return Ce(e).find(t).each(function(e, t) {
                    i._addAriaAndCollapsedClass(r._getTargetFromElement(t), [t])
                }), e
            }, r.prototype._addAriaAndCollapsedClass = function(e, t) {
                if (e) {
                    var i = Ce(e).hasClass(Me);
                    e.setAttribute("aria-expanded", i), t.length && Ce(t).toggleClass(Oe, !i).attr("aria-expanded", i)
                }
            }, r._getTargetFromElement = function(e) {
                var t = ti.getSelectorFromElement(e);
                return t ? Ce(t)[0] : null
            }, r._jQueryInterface = function(n) {
                return this.each(function() {
                    var e = Ce(this),
                        t = e.data(_e),
                        i = Ce.extend({}, Ie, e.data(), "object" === (void 0 === n ? "undefined" : Jt(n)) && n);
                    if (!t && i.toggle && /show|hide/.test(n) && (i.toggle = !1), t || (t = new r(this, i), e.data(_e, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new Error('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, ei(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }, {
                key: "Default",
                get: function() {
                    return Ie
                }
            }]), r
        }(), Ce(document).on(De.CLICK_DATA_API, Be, function(e) {
            e.preventDefault();
            var t = We._getTargetFromElement(this),
                i = Ce(t).data(_e) ? "toggle" : Ce(this).data();
            We._jQueryInterface.call(Ce(t), i)
        }), Ce.fn[Se] = We._jQueryInterface, Ce.fn[Se].Constructor = We, Ce.fn[Se].noConflict = function() {
            return Ce.fn[Se] = ke, We._jQueryInterface
        }, ae = jQuery, oe = "dropdown", re = "." + (se = "bs.dropdown"), le = ".data-api", de = ae.fn[oe], ce = new RegExp("38|40|27|32"), pe = {
            HIDE: "hide" + re,
            HIDDEN: "hidden" + re,
            SHOW: "show" + re,
            SHOWN: "shown" + re,
            CLICK: "click" + re,
            CLICK_DATA_API: "click" + re + le,
            FOCUSIN_DATA_API: "focusin" + re + le,
            KEYDOWN_DATA_API: "keydown" + re + le
        }, ue = "dropdown-backdrop", he = "disabled", fe = "show", me = ".dropdown-backdrop", ge = '[data-toggle="dropdown"]', ve = ".dropdown form", ye = '[role="menu"]', we = '[role="listbox"]', be = ".navbar-nav", xe = '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a', Te = function() {
            function r(e) {
                b(this, r), this._element = e, this._addEventListeners()
            }
            return r.prototype.toggle = function() {
                if (this.disabled || ae(this).hasClass(he)) return !1;
                var e = r._getParentFromElement(this),
                    t = ae(e).hasClass(fe);
                if (r._clearMenus(), t) return !1;
                if ("ontouchstart" in document.documentElement && !ae(e).closest(be).length) {
                    var i = document.createElement("div");
                    i.className = ue, ae(i).insertBefore(this), ae(i).on("click", r._clearMenus)
                }
                var n = {
                        relatedTarget: this
                    },
                    a = ae.Event(pe.SHOW, n);
                return ae(e).trigger(a), !a.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", !0), ae(e).toggleClass(fe), ae(e).trigger(ae.Event(pe.SHOWN, n)), !1)
            }, r.prototype.dispose = function() {
                ae.removeData(this._element, se), ae(this._element).off(re), this._element = null
            }, r.prototype._addEventListeners = function() {
                ae(this._element).on(pe.CLICK, this.toggle)
            }, r._jQueryInterface = function(t) {
                return this.each(function() {
                    var e = ae(this).data(se);
                    if (e || (e = new r(this), ae(this).data(se, e)), "string" == typeof t) {
                        if (void 0 === e[t]) throw new Error('No method named "' + t + '"');
                        e[t].call(this)
                    }
                })
            }, r._clearMenus = function(e) {
                if (!e || 3 !== e.which) {
                    var t = ae(me)[0];
                    t && t.parentNode.removeChild(t);
                    for (var i = ae.makeArray(ae(ge)), n = 0; n < i.length; n++) {
                        var a = r._getParentFromElement(i[n]),
                            o = {
                                relatedTarget: i[n]
                            };
                        if (ae(a).hasClass(fe) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "focusin" === e.type) && ae.contains(a, e.target))) {
                            var s = ae.Event(pe.HIDE, o);
                            ae(a).trigger(s), s.isDefaultPrevented() || (i[n].setAttribute("aria-expanded", "false"), ae(a).removeClass(fe).trigger(ae.Event(pe.HIDDEN, o)))
                        }
                    }
                }
            }, r._getParentFromElement = function(e) {
                var t = void 0,
                    i = ti.getSelectorFromElement(e);
                return i && (t = ae(i)[0]), t || e.parentNode
            }, r._dataApiKeydownHandler = function(e) {
                if (ce.test(e.which) && !/input|textarea/i.test(e.target.tagName) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !ae(this).hasClass(he))) {
                    var t = r._getParentFromElement(this),
                        i = ae(t).hasClass(fe);
                    if (!i && 27 !== e.which || i && 27 === e.which) {
                        if (27 === e.which) {
                            var n = ae(t).find(ge)[0];
                            ae(n).trigger("focus")
                        }
                        return void ae(this).trigger("click")
                    }
                    var a = ae(t).find(xe).get();
                    if (a.length) {
                        var o = a.indexOf(e.target);
                        38 === e.which && 0 < o && o--, 40 === e.which && o < a.length - 1 && o++, o < 0 && (o = 0), a[o].focus()
                    }
                }
            }, ei(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }]), r
        }(), ae(document).on(pe.KEYDOWN_DATA_API, ge, Te._dataApiKeydownHandler).on(pe.KEYDOWN_DATA_API, ye, Te._dataApiKeydownHandler).on(pe.KEYDOWN_DATA_API, we, Te._dataApiKeydownHandler).on(pe.CLICK_DATA_API + " " + pe.FOCUSIN_DATA_API, Te._clearMenus).on(pe.CLICK_DATA_API, ge, Te.prototype.toggle).on(pe.CLICK_DATA_API, ve, function(e) {
            e.stopPropagation()
        }), ae.fn[oe] = Te._jQueryInterface, ae.fn[oe].Constructor = Te, ae.fn[oe].noConflict = function() {
            return ae.fn[oe] = de, Te._jQueryInterface
        }, j = jQuery, Y = "modal", $ = "." + (R = "bs.modal"), F = j.fn[Y], X = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, q = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, G = {
            HIDE: "hide" + $,
            HIDDEN: "hidden" + $,
            SHOW: "show" + $,
            SHOWN: "shown" + $,
            FOCUSIN: "focusin" + $,
            RESIZE: "resize" + $,
            CLICK_DISMISS: "click.dismiss" + $,
            KEYDOWN_DISMISS: "keydown.dismiss" + $,
            MOUSEUP_DISMISS: "mouseup.dismiss" + $,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + $,
            CLICK_DATA_API: "click" + $ + ".data-api"
        }, V = "modal-scrollbar-measure", Q = "modal-backdrop", K = "modal-open", U = "fade", Z = "show", J = ".modal-dialog", ee = '[data-toggle="modal"]', te = '[data-dismiss="modal"]', ie = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", ne = function() {
            function a(e, t) {
                b(this, a), this._config = this._getConfig(t), this._element = e, this._dialog = j(e).find(J)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
            }
            return a.prototype.toggle = function(e) {
                return this._isShown ? this.hide() : this.show(e)
            }, a.prototype.show = function(e) {
                var t = this;
                if (this._isTransitioning) throw new Error("Modal is transitioning");
                ti.supportsTransitionEnd() && j(this._element).hasClass(U) && (this._isTransitioning = !0);
                var i = j.Event(G.SHOW, {
                    relatedTarget: e
                });
                j(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), j(document.body).addClass(K), this._setEscapeEvent(), this._setResizeEvent(), j(this._element).on(G.CLICK_DISMISS, te, function(e) {
                    return t.hide(e)
                }), j(this._dialog).on(G.MOUSEDOWN_DISMISS, function() {
                    j(t._element).one(G.MOUSEUP_DISMISS, function(e) {
                        j(e.target).is(t._element) && (t._ignoreBackdropClick = !0)
                    })
                }), this._showBackdrop(function() {
                    return t._showElement(e)
                }))
            }, a.prototype.hide = function(e) {
                var t = this;
                if (e && e.preventDefault(), this._isTransitioning) throw new Error("Modal is transitioning");
                var i = ti.supportsTransitionEnd() && j(this._element).hasClass(U);
                i && (this._isTransitioning = !0);
                var n = j.Event(G.HIDE);
                j(this._element).trigger(n), this._isShown && !n.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), j(document).off(G.FOCUSIN), j(this._element).removeClass(Z), j(this._element).off(G.CLICK_DISMISS), j(this._dialog).off(G.MOUSEDOWN_DISMISS), i ? j(this._element).one(ti.TRANSITION_END, function(e) {
                    return t._hideModal(e)
                }).emulateTransitionEnd(300) : this._hideModal())
            }, a.prototype.dispose = function() {
                j.removeData(this._element, R), j(window, document, this._element, this._backdrop).off($), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null
            }, a.prototype._getConfig = function(e) {
                return e = j.extend({}, X, e), ti.typeCheckConfig(Y, e, q), e
            }, a.prototype._showElement = function(e) {
                var t = this,
                    i = ti.supportsTransitionEnd() && j(this._element).hasClass(U);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && ti.reflow(this._element), j(this._element).addClass(Z), this._config.focus && this._enforceFocus();
                var n = j.Event(G.SHOWN, {
                        relatedTarget: e
                    }),
                    a = function() {
                        t._config.focus && t._element.focus(), t._isTransitioning = !1, j(t._element).trigger(n)
                    };
                i ? j(this._dialog).one(ti.TRANSITION_END, a).emulateTransitionEnd(300) : a()
            }, a.prototype._enforceFocus = function() {
                var t = this;
                j(document).off(G.FOCUSIN).on(G.FOCUSIN, function(e) {
                    document === e.target || t._element === e.target || j(t._element).has(e.target).length || t._element.focus()
                })
            }, a.prototype._setEscapeEvent = function() {
                var t = this;
                this._isShown && this._config.keyboard ? j(this._element).on(G.KEYDOWN_DISMISS, function(e) {
                    27 === e.which && t.hide()
                }) : this._isShown || j(this._element).off(G.KEYDOWN_DISMISS)
            }, a.prototype._setResizeEvent = function() {
                var t = this;
                this._isShown ? j(window).on(G.RESIZE, function(e) {
                    return t._handleUpdate(e)
                }) : j(window).off(G.RESIZE)
            }, a.prototype._hideModal = function() {
                var e = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._isTransitioning = !1, this._showBackdrop(function() {
                    j(document.body).removeClass(K), e._resetAdjustments(), e._resetScrollbar(), j(e._element).trigger(G.HIDDEN)
                })
            }, a.prototype._removeBackdrop = function() {
                this._backdrop && (j(this._backdrop).remove(), this._backdrop = null)
            }, a.prototype._showBackdrop = function(e) {
                var t = this,
                    i = j(this._element).hasClass(U) ? U : "";
                if (this._isShown && this._config.backdrop) {
                    var n = ti.supportsTransitionEnd() && i;
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = Q, i && j(this._backdrop).addClass(i), j(this._backdrop).appendTo(document.body), j(this._element).on(G.CLICK_DISMISS, function(e) {
                            return t._ignoreBackdropClick ? void(t._ignoreBackdropClick = !1) : void(e.target === e.currentTarget && ("static" === t._config.backdrop ? t._element.focus() : t.hide()))
                        }), n && ti.reflow(this._backdrop), j(this._backdrop).addClass(Z), !e) return;
                    if (!n) return void e();
                    j(this._backdrop).one(ti.TRANSITION_END, e).emulateTransitionEnd(150)
                } else if (!this._isShown && this._backdrop) {
                    j(this._backdrop).removeClass(Z);
                    var a = function() {
                        t._removeBackdrop(), e && e()
                    };
                    ti.supportsTransitionEnd() && j(this._element).hasClass(U) ? j(this._backdrop).one(ti.TRANSITION_END, a).emulateTransitionEnd(150) : a()
                } else e && e()
            }, a.prototype._handleUpdate = function() {
                this._adjustDialog()
            }, a.prototype._adjustDialog = function() {
                var e = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, a.prototype._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, a.prototype._checkScrollbar = function() {
                this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, a.prototype._setScrollbar = function() {
                var e = parseInt(j(ie).css("padding-right") || 0, 10);
                this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + "px")
            }, a.prototype._resetScrollbar = function() {
                document.body.style.paddingRight = this._originalBodyPadding
            }, a.prototype._getScrollbarWidth = function() {
                var e = document.createElement("div");
                e.className = V, document.body.appendChild(e);
                var t = e.offsetWidth - e.clientWidth;
                return document.body.removeChild(e), t
            }, a._jQueryInterface = function(i, n) {
                return this.each(function() {
                    var e = j(this).data(R),
                        t = j.extend({}, a.Default, j(this).data(), "object" === (void 0 === i ? "undefined" : Jt(i)) && i);
                    if (e || (e = new a(this, t), j(this).data(R, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new Error('No method named "' + i + '"');
                        e[i](n)
                    } else t.show && e.show(n)
                })
            }, ei(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }, {
                key: "Default",
                get: function() {
                    return X
                }
            }]), a
        }(), j(document).on(G.CLICK_DATA_API, ee, function(e) {
            var t = this,
                i = void 0,
                n = ti.getSelectorFromElement(this);
            n && (i = j(n)[0]);
            var a = j(i).data(R) ? "toggle" : j.extend({}, j(i).data(), j(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
            var o = j(i).one(G.SHOW, function(e) {
                e.isDefaultPrevented() || o.one(G.HIDDEN, function() {
                    j(t).is(":visible") && t.focus()
                })
            });
            ne._jQueryInterface.call(j(i), a, this)
        }), j.fn[Y] = ne._jQueryInterface, j.fn[Y].Constructor = ne, j.fn[Y].noConflict = function() {
            return j.fn[Y] = F, ne._jQueryInterface
        }, o = jQuery, x = "scrollspy", C = "." + (T = "bs.scrollspy"), S = o.fn[x], _ = {
            offset: 10,
            method: "auto",
            target: ""
        }, E = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }, k = {
            ACTIVATE: "activate" + C,
            SCROLL: "scroll" + C,
            LOAD_DATA_API: "load" + C + ".data-api"
        }, I = "dropdown-item", A = "active", D = '[data-spy="scroll"]', M = ".active", z = "li", P = ".bew-nav-link", O = ".dropdown", L = ".dropdown-item", N = ".dropdown-toggle", H = "offset", B = "position", W = function() {
            function n(e, t) {
                var i = this;
                b(this, n), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + P + "," + this._config.target + " " + L, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, o(this._scrollElement).on(k.SCROLL, function(e) {
                    return i._process(e)
                }), this.refresh(), this._process()
            }
            return n.prototype.refresh = function() {
                var t = this,
                    e = this._scrollElement !== this._scrollElement.window ? B : H,
                    n = "auto" === this._config.method ? e : this._config.method,
                    a = n === B ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), o.makeArray(o(this._selector)).map(function(e) {
                    var t = void 0,
                        i = ti.getSelectorFromElement(e);
                    return i && (t = o(i)[0]), t && (t.offsetWidth || t.offsetHeight) ? [o(t)[n]().top + a, i] : null
                }).filter(function(e) {
                    return e
                }).sort(function(e, t) {
                    return e[0] - t[0]
                }).forEach(function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                })
            }, n.prototype.dispose = function() {
                o.removeData(this._element, T), o(this._scrollElement).off(C), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n.prototype._getConfig = function(e) {
                if ("string" != typeof(e = o.extend({}, _, e)).target) {
                    var t = o(e.target).attr("id");
                    t || (t = ti.getUID(x), o(e.target).attr("id", t)), e.target = "#" + t
                }
                return ti.typeCheckConfig(x, e, E), e
            }, n.prototype._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n.prototype._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n.prototype._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight
            }, n.prototype._process = function() {
                var e = this._getScrollTop() + this._config.offset,
                    t = this._getScrollHeight(),
                    i = this._config.offset + t - this._getOffsetHeight();
                if (this._scrollHeight !== t && this.refresh(), i <= e) {
                    var n = this._targets[this._targets.length - 1];
                    this._activeTarget !== n && this._activate(n)
                } else {
                    if (this._activeTarget && e < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var a = this._offsets.length; a--;) {
                        this._activeTarget !== this._targets[a] && e >= this._offsets[a] && (void 0 === this._offsets[a + 1] || e < this._offsets[a + 1]) && this._activate(this._targets[a])
                    }
                }
            }, n.prototype._activate = function(t) {
                this._activeTarget = t, this._clear();
                var e = this._selector.split(",");
                e = e.map(function(e) {
                    return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                });
                var i = o(e.join(","));
                i.hasClass(I) ? (i.closest(O).find(N).addClass(A), i.addClass(A)) : i.parents(z).find("> " + P).addClass(A), o(this._scrollElement).trigger(k.ACTIVATE, {
                    relatedTarget: t
                })
            }, n.prototype._clear = function() {
                o(this._selector).filter(M).removeClass(A)
            }, n._jQueryInterface = function(i) {
                return this.each(function() {
                    var e = o(this).data(T),
                        t = "object" === (void 0 === i ? "undefined" : Jt(i)) && i;
                    if (e || (e = new n(this, t), o(this).data(T, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new Error('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, ei(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }, {
                key: "Default",
                get: function() {
                    return _
                }
            }]), n
        }(), o(window).on(k.LOAD_DATA_API, function() {
            for (var e = o.makeArray(o(D)), t = e.length; t--;) {
                var i = o(e[t]);
                W._jQueryInterface.call(i, i.data())
            }
        }), o.fn[x] = W._jQueryInterface, o.fn[x].Constructor = W, o.fn[x].noConflict = function() {
            return o.fn[x] = S, W._jQueryInterface
        }, l = jQuery, e = "." + (a = "bs.tab"), t = l.fn.tab, d = {
            HIDE: "hide" + e,
            HIDDEN: "hidden" + e,
            SHOW: "show" + e,
            SHOWN: "shown" + e,
            CLICK_DATA_API: "click" + e + ".data-api"
        }, s = "dropdown-menu", c = "active", p = "disabled", r = "fade", u = "show", h = ".dropdown", f = "ul:not(.dropdown-menu), ol:not(.dropdown-menu), bew-nav:not(.dropdown-menu)", m = "> .bew-nav-item .fade, > .fade", g = ".active", v = "> .bew-nav-item > .active, > .active", i = '[data-toggle="tab"], [data-toggle="pill"]', y = ".dropdown-toggle", w = "> .dropdown-menu .active", n = function() {
            function n(e) {
                b(this, n), this._element = e
            }
            return n.prototype.show = function() {
                var i = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && l(this._element).hasClass(c) || l(this._element).hasClass(p))) {
                    var e = void 0,
                        n = void 0,
                        t = l(this._element).closest(f)[0],
                        a = ti.getSelectorFromElement(this._element);
                    t && (n = (n = l.makeArray(l(t).find(g)))[n.length - 1]);
                    var o = l.Event(d.HIDE, {
                            relatedTarget: this._element
                        }),
                        s = l.Event(d.SHOW, {
                            relatedTarget: n
                        });
                    if (n && l(n).trigger(o), l(this._element).trigger(s), !s.isDefaultPrevented() && !o.isDefaultPrevented()) {
                        a && (e = l(a)[0]), this._activate(this._element, t);
                        var r = function() {
                            var e = l.Event(d.HIDDEN, {
                                    relatedTarget: i._element
                                }),
                                t = l.Event(d.SHOWN, {
                                    relatedTarget: n
                                });
                            l(n).trigger(e), l(i._element).trigger(t)
                        };
                        e ? this._activate(e, e.parentNode, r) : r()
                    }
                }
            }, n.prototype.dispose = function() {
                l.removeClass(this._element, a), this._element = null
            }, n.prototype._activate = function(e, t, i) {
                var n = this,
                    a = l(t).find(v)[0],
                    o = i && ti.supportsTransitionEnd() && (a && l(a).hasClass(r) || Boolean(l(t).find(m)[0])),
                    s = function() {
                        return n._transitionComplete(e, a, o, i)
                    };
                a && o ? l(a).one(ti.TRANSITION_END, s).emulateTransitionEnd(150) : s(), a && l(a).removeClass(u)
            }, n.prototype._transitionComplete = function(e, t, i, n) {
                if (t) {
                    l(t).removeClass(c);
                    var a = l(t.parentNode).find(w)[0];
                    a && l(a).removeClass(c), t.setAttribute("aria-expanded", !1)
                }
                if (l(e).addClass(c), e.setAttribute("aria-expanded", !0), i ? (ti.reflow(e), l(e).addClass(u)) : l(e).removeClass(r), e.parentNode && l(e.parentNode).hasClass(s)) {
                    var o = l(e).closest(h)[0];
                    o && l(o).find(y).addClass(c), e.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, n._jQueryInterface = function(i) {
                return this.each(function() {
                    var e = l(this),
                        t = e.data(a);
                    if (t || (t = new n(this), e.data(a, t)), "string" == typeof i) {
                        if (void 0 === t[i]) throw new Error('No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, ei(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.0.0-alpha.6"
                }
            }]), n
        }(), l(document).on(d.CLICK_DATA_API, i, function(e) {
            e.preventDefault(), n._jQueryInterface.call(l(this), "show")
        }), l.fn.tab = n._jQueryInterface, l.fn.tab.Constructor = n, l.fn.tab.noConflict = function() {
            return l.fn.tab = t, n._jQueryInterface
        }, function(c) {
            if ("undefined" == typeof Tether) throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");
            var t = "tooltip",
                n = "bs.tooltip",
                e = "." + n,
                i = c.fn[t],
                a = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: "0 0",
                    constraints: [],
                    container: !1
                },
                o = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "string",
                    constraints: "array",
                    container: "(string|element|boolean)"
                },
                s = {
                    TOP: "bottom center",
                    RIGHT: "middle left",
                    BOTTOM: "top center",
                    LEFT: "middle right"
                },
                r = "show",
                p = "out",
                l = {
                    HIDE: "hide" + e,
                    HIDDEN: "hidden" + e,
                    SHOW: "show" + e,
                    SHOWN: "shown" + e,
                    INSERTED: "inserted" + e,
                    CLICK: "click" + e,
                    FOCUSIN: "focusin" + e,
                    FOCUSOUT: "focusout" + e,
                    MOUSEENTER: "mouseenter" + e,
                    MOUSELEAVE: "mouseleave" + e
                },
                u = "fade",
                h = "show",
                f = ".tooltip-inner",
                m = {
                    element: !1,
                    enabled: !1
                },
                g = "hover",
                v = "focus",
                y = "click",
                w = "manual",
                d = function() {
                    function d(e, t) {
                        b(this, d), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._isTransitioning = !1, this._tether = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
                    }
                    return d.prototype.enable = function() {
                        this._isEnabled = !0
                    }, d.prototype.disable = function() {
                        this._isEnabled = !1
                    }, d.prototype.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, d.prototype.toggle = function(e) {
                        if (e) {
                            var t = this.constructor.DATA_KEY,
                                i = c(e.currentTarget).data(t);
                            i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), c(e.currentTarget).data(t, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                        } else {
                            if (c(this.getTipElement()).hasClass(h)) return void this._leave(null, this);
                            this._enter(null, this)
                        }
                    }, d.prototype.dispose = function() {
                        clearTimeout(this._timeout), this.cleanupTether(), c.removeData(this.element, this.constructor.DATA_KEY), c(this.element).off(this.constructor.EVENT_KEY), c(this.element).closest(".modal").off("hide.bs.modal"), this.tip && c(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null
                    }, d.prototype.show = function() {
                        var t = this;
                        if ("none" === c(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var e = c.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            if (this._isTransitioning) throw new Error("Tooltip is transitioning");
                            c(this.element).trigger(e);
                            var i = c.contains(this.element.ownerDocument.documentElement, this.element);
                            if (e.isDefaultPrevented() || !i) return;
                            var n = this.getTipElement(),
                                a = ti.getUID(this.constructor.NAME);
                            n.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && c(n).addClass(u);
                            var o = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement,
                                s = this._getAttachment(o),
                                r = !1 === this.config.container ? document.body : c(this.config.container);
                            c(n).data(this.constructor.DATA_KEY, this).appendTo(r), c(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({
                                attachment: s,
                                element: n,
                                target: this.element,
                                classes: m,
                                classPrefix: "bs-tether",
                                offset: this.config.offset,
                                constraints: this.config.constraints,
                                addTargetClasses: !1
                            }), ti.reflow(n), this._tether.position(), c(n).addClass(h);
                            var l = function() {
                                var e = t._hoverState;
                                t._hoverState = null, t._isTransitioning = !1, c(t.element).trigger(t.constructor.Event.SHOWN), e === p && t._leave(null, t)
                            };
                            if (ti.supportsTransitionEnd() && c(this.tip).hasClass(u)) return this._isTransitioning = !0, void c(this.tip).one(ti.TRANSITION_END, l).emulateTransitionEnd(d._TRANSITION_DURATION);
                            l()
                        }
                    }, d.prototype.hide = function(e) {
                        var t = this,
                            i = this.getTipElement(),
                            n = c.Event(this.constructor.Event.HIDE);
                        if (this._isTransitioning) throw new Error("Tooltip is transitioning");
                        var a = function() {
                            t._hoverState !== r && i.parentNode && i.parentNode.removeChild(i), t.element.removeAttribute("aria-describedby"), c(t.element).trigger(t.constructor.Event.HIDDEN), t._isTransitioning = !1, t.cleanupTether(), e && e()
                        };
                        c(this.element).trigger(n), n.isDefaultPrevented() || (c(i).removeClass(h), this._activeTrigger[y] = !1, this._activeTrigger[v] = !1, this._activeTrigger[g] = !1, ti.supportsTransitionEnd() && c(this.tip).hasClass(u) ? (this._isTransitioning = !0, c(i).one(ti.TRANSITION_END, a).emulateTransitionEnd(150)) : a(), this._hoverState = "")
                    }, d.prototype.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, d.prototype.getTipElement = function() {
                        return this.tip = this.tip || c(this.config.template)[0]
                    }, d.prototype.setContent = function() {
                        var e = c(this.getTipElement());
                        this.setElementContent(e.find(f), this.getTitle()), e.removeClass(u + " " + h), this.cleanupTether()
                    }, d.prototype.setElementContent = function(e, t) {
                        var i = this.config.html;
                        "object" === (void 0 === t ? "undefined" : Jt(t)) && (t.nodeType || t.jquery) ? i ? c(t).parent().is(e) || e.empty().append(t) : e.text(c(t).text()): e[i ? "html" : "text"](t)
                    }, d.prototype.getTitle = function() {
                        var e = this.element.getAttribute("data-original-title");
                        return e || (e = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), e
                    }, d.prototype.cleanupTether = function() {
                        this._tether && this._tether.destroy()
                    }, d.prototype._getAttachment = function(e) {
                        return s[e.toUpperCase()]
                    }, d.prototype._setListeners = function() {
                        var n = this;
                        this.config.trigger.split(" ").forEach(function(e) {
                            if ("click" === e) c(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(e) {
                                return n.toggle(e)
                            });
                            else if (e !== w) {
                                var t = e === g ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN,
                                    i = e === g ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT;
                                c(n.element).on(t, n.config.selector, function(e) {
                                    return n._enter(e)
                                }).on(i, n.config.selector, function(e) {
                                    return n._leave(e)
                                })
                            }
                            c(n.element).closest(".modal").on("hide.bs.modal", function() {
                                return n.hide()
                            })
                        }), this.config.selector ? this.config = c.extend({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, d.prototype._fixTitle = function() {
                        var e = Jt(this.element.getAttribute("data-original-title"));
                        (this.element.getAttribute("title") || "string" !== e) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, d.prototype._enter = function(e, t) {
                        var i = this.constructor.DATA_KEY;
                        return (t = t || c(e.currentTarget).data(i)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), c(e.currentTarget).data(i, t)), e && (t._activeTrigger["focusin" === e.type ? v : g] = !0), c(t.getTipElement()).hasClass(h) || t._hoverState === r ? void(t._hoverState = r) : (clearTimeout(t._timeout), t._hoverState = r, t.config.delay && t.config.delay.show ? void(t._timeout = setTimeout(function() {
                            t._hoverState === r && t.show()
                        }, t.config.delay.show)) : void t.show())
                    }, d.prototype._leave = function(e, t) {
                        var i = this.constructor.DATA_KEY;
                        if ((t = t || c(e.currentTarget).data(i)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), c(e.currentTarget).data(i, t)), e && (t._activeTrigger["focusout" === e.type ? v : g] = !1), !t._isWithActiveTrigger()) return clearTimeout(t._timeout), t._hoverState = p, t.config.delay && t.config.delay.hide ? void(t._timeout = setTimeout(function() {
                            t._hoverState === p && t.hide()
                        }, t.config.delay.hide)) : void t.hide()
                    }, d.prototype._isWithActiveTrigger = function() {
                        for (var e in this._activeTrigger)
                            if (this._activeTrigger[e]) return !0;
                        return !1
                    }, d.prototype._getConfig = function(e) {
                        return (e = c.extend({}, this.constructor.Default, c(this.element).data(), e)).delay && "number" == typeof e.delay && (e.delay = {
                            show: e.delay,
                            hide: e.delay
                        }), ti.typeCheckConfig(t, e, this.constructor.DefaultType), e
                    }, d.prototype._getDelegateConfig = function() {
                        var e = {};
                        if (this.config)
                            for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                        return e
                    }, d._jQueryInterface = function(i) {
                        return this.each(function() {
                            var e = c(this).data(n),
                                t = "object" === (void 0 === i ? "undefined" : Jt(i)) && i;
                            if ((e || !/dispose|hide/.test(i)) && (e || (e = new d(this, t), c(this).data(n, e)), "string" == typeof i)) {
                                if (void 0 === e[i]) throw new Error('No method named "' + i + '"');
                                e[i]()
                            }
                        })
                    }, ei(d, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0-alpha.6"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return t
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return o
                        }
                    }]), d
                }();
            return c.fn[t] = d._jQueryInterface, c.fn[t].Constructor = d, c.fn[t].noConflict = function() {
                return c.fn[t] = i, d._jQueryInterface
            }, d
        }(jQuery));
    jt = jQuery, Yt = "popover", $t = "." + (Rt = "bs.popover"), Ft = jt.fn[Yt], Xt = jt.extend({}, ii.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), qt = jt.extend({}, ii.DefaultType, {
        content: "(string|element|function)"
    }), Gt = "fade", Qt = ".popover-title", Kt = ".popover-content", Ut = {
        HIDE: "hide" + $t,
        HIDDEN: "hidden" + $t,
        SHOW: (Vt = "show") + $t,
        SHOWN: "shown" + $t,
        INSERTED: "inserted" + $t,
        CLICK: "click" + $t,
        FOCUSIN: "focusin" + $t,
        FOCUSOUT: "focusout" + $t,
        MOUSEENTER: "mouseenter" + $t,
        MOUSELEAVE: "mouseleave" + $t
    }, Zt = function(e) {
        function n() {
            return b(this, n),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, e.apply(this, arguments))
        }
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(n, e), n.prototype.isWithContent = function() {
            return this.getTitle() || this._getContent()
        }, n.prototype.getTipElement = function() {
            return this.tip = this.tip || jt(this.config.template)[0]
        }, n.prototype.setContent = function() {
            var e = jt(this.getTipElement());
            this.setElementContent(e.find(Qt), this.getTitle()), this.setElementContent(e.find(Kt), this._getContent()), e.removeClass(Gt + " " + Vt), this.cleanupTether()
        }, n.prototype._getContent = function() {
            return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
        }, n._jQueryInterface = function(i) {
            return this.each(function() {
                var e = jt(this).data(Rt),
                    t = "object" === (void 0 === i ? "undefined" : Jt(i)) ? i : null;
                if ((e || !/destroy|hide/.test(i)) && (e || (e = new n(this, t), jt(this).data(Rt, e)), "string" == typeof i)) {
                    if (void 0 === e[i]) throw new Error('No method named "' + i + '"');
                    e[i]()
                }
            })
        }, ei(n, null, [{
            key: "VERSION",
            get: function() {
                return "4.0.0-alpha.6"
            }
        }, {
            key: "Default",
            get: function() {
                return Xt
            }
        }, {
            key: "NAME",
            get: function() {
                return Yt
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return Rt
            }
        }, {
            key: "Event",
            get: function() {
                return Ut
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return $t
            }
        }, {
            key: "DefaultType",
            get: function() {
                return qt
            }
        }]), n
    }(ii), jt.fn[Yt] = Zt._jQueryInterface, jt.fn[Yt].Constructor = Zt, jt.fn[Yt].noConflict = function() {
        return jt.fn[Yt] = Ft, Zt._jQueryInterface
    }
}(),

//I delete smoothScroll 

function(s, o, a, r) {
    function l(e, t) {
        var i = this;
        "object" == typeof t && (delete t.refresh, delete t.render, s.extend(this, t)), this.$element = s(e), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var n = (this.position + "").toLowerCase().match(/\S+/g) || [];
        if (n.length < 1 && n.push("center"), 1 == n.length && n.push(n[0]), ("top" == n[0] || "bottom" == n[0] || "left" == n[1] || "right" == n[1]) && (n = [n[1], n[0]]), this.positionX != r && (n[0] = this.positionX.toLowerCase()), this.positionY != r && (n[1] = this.positionY.toLowerCase()), i.positionX = n[0], i.positionY = n[1], "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/)) return this.imageSrc && this.iosFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this;
        if (navigator.userAgent.match(/(Android)/)) return this.imageSrc && this.androidFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this;
        this.$mirror = s("<div />").prependTo("body");
        var a = this.$element.find(">.parallax-slider"),
            o = !1;
        0 == a.length ? this.$slider = s("<img />").prependTo(this.$mirror) : (this.$slider = a.prependTo(this.$mirror), o = !0), this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }), this.$slider.addClass("parallax-slider").one("load", function() {
            i.naturalHeight && i.naturalWidth || (i.naturalHeight = this.naturalHeight || this.height || 1, i.naturalWidth = this.naturalWidth || this.width || 1), i.aspectRatio = i.naturalWidth / i.naturalHeight, l.isSetup || l.setup(), l.sliders.push(i), l.isFresh = !1, l.requestRender()
        }), o || (this.$slider[0].src = this.imageSrc), (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || 0 < a.length) && this.$slider.trigger("load")
    }! function() {
        for (var a = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !o.requestAnimationFrame; ++t) o.requestAnimationFrame = o[e[t] + "RequestAnimationFrame"], o.cancelAnimationFrame = o[e[t] + "CancelAnimationFrame"] || o[e[t] + "CancelRequestAnimationFrame"];
        o.requestAnimationFrame || (o.requestAnimationFrame = function(e) {
            var t = (new Date).getTime(),
                i = Math.max(0, 16 - (t - a)),
                n = o.setTimeout(function() {
                    e(t + i)
                }, i);
            return a = t + i, n
        }), o.cancelAnimationFrame || (o.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(), s.extend(l.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !1,
        refresh: function() {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var e = l.winHeight,
                t = l.docHeight,
                i = Math.min(this.boxOffsetTop, t - e),
                n = Math.max(this.boxOffsetTop + this.boxHeight - e, 0),
                a = this.boxHeight + (i - n) * (1 - this.speed) | 0,
                o = (this.boxOffsetTop - i) * (1 - this.speed) | 0;
            if (a * this.aspectRatio >= this.boxWidth) {
                this.imageWidth = a * this.aspectRatio | 0, this.imageHeight = a, this.offsetBaseTop = o;
                var s = this.imageWidth - this.boxWidth;
                this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -s : isNaN(this.positionX) ? -s / 2 | 0 : Math.max(this.positionX, -s)
            } else {
                this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0;
                s = this.imageHeight - a;
                this.offsetBaseTop = "top" == this.positionY ? o : "bottom" == this.positionY ? o - s : isNaN(this.positionY) ? o - s / 2 | 0 : o + Math.max(this.positionY, -s)
            }
        },
        render: function() {
            var e = l.scrollTop,
                t = l.scrollLeft,
                i = this.overScrollFix ? l.overScroll : 0,
                n = e + l.winHeight;
            this.boxOffsetBottom > e && this.boxOffsetTop <= n ? (this.visibility = "visible", this.mirrorTop = this.boxOffsetTop - e, this.mirrorLeft = this.boxOffsetLeft - t, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed)) : this.visibility = "hidden", this.$mirror.css({
                transform: "translate3d(0px, 0px, 0px)",
                visibility: this.visibility,
                top: this.mirrorTop - i,
                left: this.mirrorLeft,
                height: this.boxHeight,
                width: this.boxWidth
            }), this.$slider.css({
                transform: "translate3d(0px, 0px, 0px)",
                position: "absolute",
                top: this.offsetTop,
                left: this.offsetLeft,
                height: this.imageHeight,
                width: this.imageWidth,
                maxWidth: "none"
            })
        }
    }), s.extend(l, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function() {
            if (!this.isReady) {
                var e = s(a),
                    n = s(o),
                    t = function() {
                        l.winHeight = n.height(), l.winWidth = n.width(), l.docHeight = e.height(), l.docWidth = e.width()
                    },
                    i = function() {
                        var e = n.scrollTop(),
                            t = l.docHeight - l.winHeight,
                            i = l.docWidth - l.winWidth;
                        l.scrollTop = Math.max(0, Math.min(t, e)), l.scrollLeft = Math.max(0, Math.min(i, n.scrollLeft())), l.overScroll = Math.max(e - t, Math.min(e, 0))
                    };
                n.on("resize.px.parallax load.px.parallax", function() {
                    t(), l.isFresh = !1, l.requestRender()
                }).on("scroll.px.parallax load.px.parallax", function() {
                    i(), l.requestRender()
                }), t(), i(), this.isReady = !0
            }
        },
        configure: function(e) {
            "object" == typeof e && (delete e.refresh, delete e.render, s.extend(this.prototype, e))
        },
        refresh: function() {
            s.each(this.sliders, function() {
                this.refresh()
            }), this.isFresh = !0
        },
        render: function() {
            this.isFresh || this.refresh(), s.each(this.sliders, function() {
                this.render()
            })
        },
        requestRender: function() {
            var e = this;
            this.isBusy || (this.isBusy = !0, o.requestAnimationFrame(function() {
                e.render(), e.isBusy = !1
            }))
        },
        destroy: function(e) {
            var t, i = s(e).data("px.parallax");
            for (i.$mirror.remove(), t = 0; t < this.sliders.length; t += 1) this.sliders[t] == i && this.sliders.splice(t, 1);
            s(e).data("px.parallax", !1), 0 === this.sliders.length && (s(o).off("scroll.px.parallax resize.px.parallax load.px.parallax"), this.isReady = !1, l.isSetup = !1)
        }
    });
    var e = s.fn.parallax;
    s.fn.parallax = function(i) {
        return this.each(function() {
            var e = s(this),
                t = "object" == typeof i && i;
            this == o || this == a || e.is("body") ? l.configure(t) : e.data("px.parallax") ? "object" == typeof i && s.extend(e.data("px.parallax"), t) : (t = s.extend({}, e.data(), t), e.data("px.parallax", new l(this, t))), "string" == typeof i && ("destroy" == i ? l.destroy(this) : l[i]())
        })
    }, s.fn.parallax.Constructor = l, s.fn.parallax.noConflict = function() {
        return s.fn.parallax = e, this
    }, s(a).ready(".px.parallax.data-api", function() {
        s('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function() {
    return function(i) {
        function n(e) {
            if (a[e]) return a[e].exports;
            var t = a[e] = {
                exports: {},
                id: e,
                loaded: !1
            };
            return i[e].call(t.exports, t, t.exports, n), t.loaded = !0, t.exports
        }
        var a = {};
        return n.m = i, n.c = a, n.p = "dist/", n(0)
    }([function(e, t, i) {
        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            o = n((n(i(1)), i(5))),
            s = n(i(6)),
            r = n(i(7)),
            l = n(i(8)),
            d = n(i(9)),
            c = n(i(10)),
            p = n(i(13)),
            u = [],
            h = !1,
            f = document.all && !window.atob,
            m = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded"
            },
            g = function() {
                return !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0] && (h = !0), h ? (u = (0, c.default)(u, m), (0, d.default)(u, m.once), u) : void 0
            },
            v = function() {
                u = (0, p.default)(), g()
            };
        e.exports = {
            init: function(e) {
                return m = a(m, e), u = (0, p.default)(), !0 === (t = m.disable) || "mobile" === t && l.default.mobile() || "phone" === t && l.default.phone() || "tablet" === t && l.default.tablet() || "function" == typeof t && !0 === t() || f ? void u.forEach(function(e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                }) : (document.querySelector("body").setAttribute("data-aos-easing", m.easing), document.querySelector("body").setAttribute("data-aos-duration", m.duration), document.querySelector("body").setAttribute("data-aos-delay", m.delay), "DOMContentLoaded" === m.startEvent && -1 < ["complete", "interactive"].indexOf(document.readyState) ? g(!0) : "load" === m.startEvent ? window.addEventListener(m.startEvent, function() {
                    g(!0)
                }) : document.addEventListener(m.startEvent, function() {
                    g(!0)
                }), window.addEventListener("resize", (0, s.default)(g, 50, !0)), window.addEventListener("orientationchange", (0, s.default)(g, 50, !0)), window.addEventListener("scroll", (0, o.default)(function() {
                    (0, d.default)(u, m.once)
                }, 99)), document.addEventListener("DOMNodeRemoved", function(e) {
                    var t = e.target;
                    t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, s.default)(v, 50, !0)
                }), (0, r.default)("[data-aos]", v), u);
                var t
            },
            refresh: g,
            refreshHard: v
        }
    }, function(e, t) {}, , , , function(e, t, i) {
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            l = i(6);
        e.exports = function(e, t, i) {
            var n, a, o = !0,
                s = !0;
            if ("function" != typeof e) throw new TypeError("Expected a function");
            return a = void 0 === (n = i) ? "undefined" : r(n), !!n && ("object" == a || "function" == a) && (o = "leading" in i ? !!i.leading : o, s = "trailing" in i ? !!i.trailing : s), l(e, t, {
                leading: o,
                maxWait: t,
                trailing: s
            })
        }
    }, function(e, t) {
        function y(e) {
            var t = void 0 === e ? "undefined" : i(e);
            return !!e && ("object" == t || "function" == t)
        }

        function o(e) {
            return "symbol" == (void 0 === e ? "undefined" : i(e)) || !!(t = e) && "object" == (void 0 === t ? "undefined" : i(t)) && f.call(e) == n;
            var t
        }

        function w(e) {
            if ("number" == typeof e) return e;
            if (o(e)) return s;
            if (y(e)) {
                var t = (i = e.valueOf, (n = y(i) ? f.call(i) : "") == r || n == l ? e.valueOf() : e);
                e = y(t) ? t + "" : t
            }
            var i, n;
            if ("string" != typeof e) return 0 === e ? e : +e;
            e = e.replace(d, "");
            var a = p.test(e);
            return a || u.test(e) ? h(e.slice(2), a ? 2 : 8) : c.test(e) ? s : +e
        }
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
            },
            s = NaN,
            r = "[object Function]",
            l = "[object GeneratorFunction]",
            n = "[object Symbol]",
            d = /^\s+|\s+$/g,
            c = /^[-+]0x[0-9a-f]+$/i,
            p = /^0b[01]+$/i,
            u = /^0o[0-7]+$/i,
            h = parseInt,
            f = Object.prototype.toString,
            b = Math.max,
            x = Math.min,
            T = Date.now;
        e.exports = function(n, a, e) {
            function o(e) {
                var t = d,
                    i = c;
                return d = c = void 0, m = e, u = n.apply(i, t)
            }

            function s(e) {
                var t = e - f;
                return !f || a <= t || t < 0 || v && p <= e - m
            }

            function r() {
                var e, t, i = T();
                return s(i) ? l(i) : void(h = setTimeout(r, (t = a - ((e = i) - f), v ? x(t, p - (e - m)) : t)))
            }

            function l(e) {
                return clearTimeout(h), h = void 0, i && d ? o(e) : (d = c = void 0, u)
            }

            function t() {
                var e, t = T(),
                    i = s(t);
                if (d = arguments, c = this, f = t, i) {
                    if (void 0 === h) return m = e = f, h = setTimeout(r, a), g ? o(e) : u;
                    if (v) return clearTimeout(h), h = setTimeout(r, a), o(f)
                }
                return void 0 === h && (h = setTimeout(r, a)), u
            }
            var d, c, p, u, h, f = 0,
                m = 0,
                g = !1,
                v = !1,
                i = !0;
            if ("function" != typeof n) throw new TypeError("Expected a function");
            return a = w(a) || 0, y(e) && (g = !!e.leading, p = (v = "maxWait" in e) ? b(w(e.maxWait) || 0, a) : p, i = "trailing" in e ? !!e.trailing : i), t.cancel = function() {
                void 0 !== h && clearTimeout(h), f = m = 0, d = c = h = void 0
            }, t.flush = function() {
                return void 0 === h ? u : l(T())
            }, t
        }
    }, function(e, t) {
        function i() {
            for (var e, t, i = 0, n = l.length; i < n; i++) {
                e = l[i];
                for (var a, o = 0, s = (t = r.querySelectorAll(e.selector)).length; o < s; o++)(a = t[o]).ready || (a.ready = !0, e.fn.call(a, a))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = window.document,
            n = window.MutationObserver || window.WebKitMutationObserver,
            l = [],
            a = void 0;
        t.default = function(e, t) {
            l.push({
                selector: e,
                fn: t
            }), !a && n && (a = new n(i)).observe(r.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            }), i()
        }
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function n(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(e, t, i) {
                    return t && n(e.prototype, t), i && n(e, i), e
                }
            }(),
            n = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e)
                }
                return i(e, [{
                    key: "phone",
                    value: function() {
                        var e, t = !1;
                        return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var e, t = !1;
                        return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }]), e
            }();
        t.default = new n
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e, s) {
            var r = window.pageYOffset,
                l = window.innerHeight;
            e.forEach(function(e, t) {
                var i, n, a, o;
                n = l + r, a = s, o = (i = e).node.getAttribute("data-aos-once"), n > i.position ? i.node.classList.add("aos-animate") : void 0 !== o && ("false" === o || !a && "true" !== o) && i.node.classList.remove("aos-animate")
            })
        }
    }, function(e, t, i) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n, a = i(11),
            o = (n = a) && n.__esModule ? n : {
                default: n
            };
        t.default = function(e, i) {
            return e.forEach(function(e, t) {
                e.node.classList.add("aos-init"), e.position = (0, o.default)(e.node, i.offset)
            }), e
        }
    }, function(e, t, i) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n, a = i(12),
            s = (n = a) && n.__esModule ? n : {
                default: n
            };
        t.default = function(e, t) {
            var i = 0,
                n = 0,
                a = window.innerHeight,
                o = {
                    offset: e.getAttribute("data-aos-offset"),
                    anchor: e.getAttribute("data-aos-anchor"),
                    anchorPlacement: e.getAttribute("data-aos-anchor-placement")
                };
            switch (o.offset && !isNaN(o.offset) && (n = parseInt(o.offset)), o.anchor && document.querySelectorAll(o.anchor) && (e = document.querySelectorAll(o.anchor)[0]), i = (0, s.default)(e).top, o.anchorPlacement) {
                case "top-bottom":
                    break;
                case "center-bottom":
                    i += e.offsetHeight / 2;
                    break;
                case "bottom-bottom":
                    i += e.offsetHeight;
                    break;
                case "top-center":
                    i += a / 2;
                    break;
                case "bottom-center":
                    i += a / 2 + e.offsetHeight;
                    break;
                case "center-center":
                    i += a / 2 + e.offsetHeight / 2;
                    break;
                case "top-top":
                    i += a;
                    break;
                case "bottom-top":
                    i += e.offsetHeight + a;
                    break;
                case "center-top":
                    i += e.offsetHeight / 2 + a
            }
            return o.anchorPlacement || o.offset || isNaN(t) || (n = t), i + n
        }
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e) {
            for (var t = 0, i = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), i += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {
                top: i,
                left: t
            }
        }
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e) {
            e = e || document.querySelectorAll("[data-aos]");
            var i = [];
            return [].forEach.call(e, function(e, t) {
                i.push({
                    node: e
                })
            }), i
        }
    }])
}),
function(t, i) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return i(t, e)
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = i(t, require("jquery")) : t.lity = i(t, t.jQuery || t.Zepto)
}("undefined" != typeof window ? window : this, function(e, y) {
    function w(e) {
        var t = E();
        return m && e.length ? (e.one(m, t.resolve), setTimeout(t.resolve, 500)) : t.resolve(), t.promise()
    }

    function b(e, t, i) {
        if (1 === arguments.length) return y.extend({}, e);
        if ("string" == typeof t) {
            if (void 0 === i) return void 0 === e[t] ? null : e[t];
            e[t] = i
        } else y.extend(e, t);
        return this
    }

    function i(e) {
        for (var t, i = decodeURI(e.split("#")[0]).split("&"), n = {}, a = 0, o = i.length; a < o; a++) i[a] && (n[(t = i[a].split("="))[0]] = t[1]);
        return n
    }

    function n(e, t) {
        return e + (-1 < e.indexOf("?") ? "&" : "?") + y.param(t)
    }

    function a(e, t) {
        var i = e.indexOf("#");
        return -1 === i ? t : (0 < i && (e = e.substr(i)), t + e)
    }

    function t(e, t) {
        var i = t.opener() && t.opener().data("lity-desc") || "Image with no description",
            n = y('<img src="' + e + '" alt="' + i + '"/>'),
            a = E(),
            o = function() {
                var e;
                a.reject((e = "Failed loading image", y('<span class="lity-error"/>').append(e)))
            };
        return n.on("load", function() {
            return 0 === this.naturalWidth ? o() : void a.resolve(n)
        }).on("error", o), a.promise()
    }

    function o(e) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + e + '"/></div>'
    }

    function x() {
        return S.documentElement.clientHeight ? S.documentElement.clientHeight : Math.round(_.height())
    }

    function T(e) {
        var t, i, n, a = s();
        a && (27 === e.keyCode && a.close(), 9 === e.keyCode && (t = e, i = a.element().find(d), n = i.index(S.activeElement), t.shiftKey && n <= 0 ? (i.get(i.length - 1).focus(), t.preventDefault()) : t.shiftKey || n !== i.length - 1 || (i.get(0).focus(), t.preventDefault())))
    }

    function C() {
        y.each(I, function(e, t) {
            t.resize()
        })
    }

    function s() {
        return 0 === I.length ? null : I[0]
    }

    function r(e, t, i, n) {
        var a, o, s, r, l, d, c, p, u, h, f, m = this,
            g = !1,
            v = !1;
        t = y.extend({}, M, t), o = y(t.template), m.element = function() {
            return o
        }, m.opener = function() {
            return i
        }, m.options = y.proxy(b, m, t), m.handlers = y.proxy(b, m, t.handlers), m.resize = function() {
            g && !v && s.css("max-height", x() + "px").trigger("lity:resize", [m])
        }, m.close = function() {
            if (g && !v) {
                v = !0, (t = m).element().attr(A, "true"), 1 === I.length && (k.removeClass("lity-active"), _.off({
                    resize: C,
                    keydown: T
                })), ((I = y.grep(I, function(e) {
                    return t !== e
                })).length ? I[0].element() : y(".lity-hidden")).removeClass("lity-hidden").each(function() {
                    var e = y(this),
                        t = e.data(D);
                    t ? e.attr(A, t) : e.removeAttr(A), e.removeData(D)
                });
                var e = E();
                return n && y.contains(o[0], S.activeElement) && n.focus(), s.trigger("lity:close", [m]), o.removeClass("lity-opened").addClass("lity-closed"), w(s.add(o)).always(function() {
                    s.trigger("lity:remove", [m]), o.remove(), o = void 0, e.resolve()
                }), e.promise()
            }
            var t
        }, l = e, d = m, c = t.handlers, p = t.handler, h = "inline", f = y.extend({}, c), p && f[p] ? (u = f[p](l, d), h = p) : (y.each(["inline", "iframe"], function(e, t) {
            delete f[t], f[t] = c[t]
        }), y.each(f, function(e, t) {
            return !t || !(!t.test || t.test(l, d)) || (!1 !== (u = t(l, d)) ? (h = e, !1) : void 0)
        })), a = {
            handler: h,
            content: u || ""
        }, o.attr(A, "false").addClass("lity-loading lity-opened lity-" + a.handler).appendTo("body").focus().on("click", "[data-lity-close]", function(e) {
            y(e.target).is("[data-lity-close]") && m.close()
        }).trigger("lity:open", [m]), r = m, 1 === I.unshift(r) && (k.addClass("lity-active"), _.on({
            resize: C,
            keydown: T
        })), y("body > *").not(r.element()).addClass("lity-hidden").each(function() {
            var e = y(this);
            void 0 === e.data(D) && e.data(D, e.attr(A) || null)
        }).attr(A, "true"), y.when(a.content).always(function(e) {
            s = y(e).css("max-height", x() + "px"), o.find(".lity-loader").each(function() {
                var e = y(this);
                w(e).always(function() {
                    e.remove()
                })
            }), o.removeClass("lity-loading").find(".lity-content").empty().append(s), g = !0, s.trigger("lity:ready", [m])
        })
    }

    function l(e, t, i) {
        e.preventDefault ? (e.preventDefault(), e = (i = y(this)).data("lity-target") || i.attr("href") || i.attr("src")) : i = y(i);
        var n = new r(e, y.extend({}, i.data("lity-options") || i.data("lity"), t), i, S.activeElement);
        if (!e.preventDefault) return n
    }
    var S = e.document,
        _ = y(e),
        E = y.Deferred,
        k = y("html"),
        I = [],
        A = "aria-hidden",
        D = "lity-" + A,
        d = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
        M = {
            handler: null,
            handlers: {
                image: t,
                inline: function(e, t) {
                    var i, n, a;
                    try {
                        i = y(e)
                    } catch (e) {
                        return !1
                    }
                    return !!i.length && (n = y('<i style="display:none !important"/>'), a = i.hasClass("lity-hide"), t.element().one("lity:remove", function() {
                        n.before(i).remove(), a && !i.closest(".lity-content").length && i.addClass("lity-hide")
                    }), i.removeClass("lity-hide").after(n))
                },
                youtube: function(e) {
                    var t = p.exec(e);
                    return !!t && o(a(e, n("https://www.youtube" + (t[2] || "") + ".com/embed/" + t[4], y.extend({
                        autoplay: 1
                    }, i(t[5] || "")))))
                },
                vimeo: function(e) {
                    var t = u.exec(e);
                    return !!t && o(a(e, n("https://player.vimeo.com/video/" + t[3], y.extend({
                        autoplay: 1
                    }, i(t[4] || "")))))
                },
                googlemaps: function(e) {
                    var t = h.exec(e);
                    return !!t && o(a(e, n("https://www.google." + t[3] + "/maps?" + t[6], {
                        output: 0 < t[6].indexOf("layer=c") ? "svembed" : "embed"
                    })))
                },
                facebookvideo: function(e) {
                    var t = f.exec(e);
                    return !!t && (0 !== e.indexOf("http") && (e = "https:" + e), o(a(e, n("https://www.facebook.com/plugins/video.php?href=" + e, y.extend({
                        autoplay: 1
                    }, i(t[4] || ""))))))
                },
                iframe: o
            },
            template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
        },
        c = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        p = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        u = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        h = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        f = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
        m = function() {
            var e = S.createElement("div"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var i in t)
                if (void 0 !== e.style[i]) return t[i];
            return !1
        }();
    return t.test = function(e) {
        return c.test(e)
    }, l.version = "2.2.0", l.options = y.proxy(b, l, M), l.handlers = y.proxy(b, l, M.handlers), l.current = s, y(S).on("click.lity", "[data-lity]", l), l
}),
function() {
    function e(e) {
        e.fn.swiper = function(t) {
            var i;
            return e(this).each(function() {
                var e = new H(this, t);
                i || (i = e)
            }), i
        }
    }
    var N, t, i, n, a, o, s, r, l, d, H = function(e, l) {
        function m(e) {
            return Math.floor(e)
        }

        function t() {
            var e = b.params.autoplay,
                t = b.slides.eq(b.activeIndex);
            t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || b.params.autoplay), b.autoplayTimeoutId = setTimeout(function() {
                b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? l.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
            }, e)
        }

        function r(e, i) {
            var t = N(e.target);
            if (!t.is(i))
                if ("string" == typeof i) t = t.parents(i);
                else if (i.nodeType) {
                var n;
                return t.parents().each(function(e, t) {
                    t === i && (n = i)
                }), n ? i : void 0
            }
            if (0 !== t.length) return t[0]
        }

        function i(e, t) {
            t = t || {};
            var i = new(window.MutationObserver || window.WebkitMutationObserver)(function(e) {
                e.forEach(function(e) {
                    b.onResize(!0), b.emit("onObserverUpdate", b, e)
                })
            });
            i.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }), b.observers.push(i)
        }

        function n(e) {
            e.originalEvent && (e = e.originalEvent);
            var t = e.keyCode || e.charCode;
            if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === t || !b.isHorizontal() && 40 === t)) return !1;
            if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === t || !b.isHorizontal() && 38 === t)) return !1;
            if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === t || 39 === t || 38 === t || 40 === t) {
                    var i = !1;
                    if (0 < b.container.parents("." + b.params.slideClass).length && 0 === b.container.parents("." + b.params.slideActiveClass).length) return;
                    var n = window.pageXOffset,
                        a = window.pageYOffset,
                        o = window.innerWidth,
                        s = window.innerHeight,
                        r = b.container.offset();
                    b.rtl && (r.left = r.left - b.container[0].scrollLeft);
                    for (var l = [
                            [r.left, r.top],
                            [r.left + b.width, r.top],
                            [r.left, r.top + b.height],
                            [r.left + b.width, r.top + b.height]
                        ], d = 0; d < l.length; d++) {
                        var c = l[d];
                        c[0] >= n && c[0] <= n + o && c[1] >= a && c[1] <= a + s && (i = !0)
                    }
                    if (!i) return
                }
                b.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !b.rtl || 37 === t && b.rtl) && b.slideNext(), (37 === t && !b.rtl || 39 === t && b.rtl) && b.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && b.slideNext(), 38 === t && b.slidePrev())
            }
        }

        function a(e) {
            e.originalEvent && (e = e.originalEvent);
            var t, i, n, a, o, s = 0,
                r = b.rtl ? -1 : 1,
                l = (o = a = n = i = 0, "detail" in (t = e) && (n = t.detail), "wheelDelta" in t && (n = -t.wheelDelta / 120), "wheelDeltaY" in t && (n = -t.wheelDeltaY / 120), "wheelDeltaX" in t && (i = -t.wheelDeltaX / 120), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (i = n, n = 0), a = 10 * i, o = 10 * n, "deltaY" in t && (o = t.deltaY), "deltaX" in t && (a = t.deltaX), (a || o) && t.deltaMode && (1 === t.deltaMode ? (a *= 40, o *= 40) : (a *= 800, o *= 800)), a && !i && (i = a < 1 ? -1 : 1), o && !n && (n = o < 1 ? -1 : 1), {
                    spinX: i,
                    spinY: n,
                    pixelX: a,
                    pixelY: o
                });
            if (b.params.mousewheelForceToAxis)
                if (b.isHorizontal()) {
                    if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return;
                    s = l.pixelX * r
                } else {
                    if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return;
                    s = l.pixelY
                } else s = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * r : -l.pixelY;
            if (0 !== s) {
                if (b.params.mousewheelInvert && (s = -s), b.params.freeMode) {
                    var d = b.getWrapperTranslate() + s * b.params.mousewheelSensitivity,
                        c = b.isBeginning,
                        p = b.isEnd;
                    if (d >= b.minTranslate() && (d = b.minTranslate()), d <= b.maxTranslate() && (d = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(d), b.updateProgress(), b.updateActiveIndex(), (!c && b.isBeginning || !p && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function() {
                            b.slideReset()
                        }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), b.emit("onScroll", b, e), b.params.autoplay && b.params.autoplayDisableOnInteraction && b.stopAutoplay(), 0 === d || d === b.maxTranslate()) return
                } else {
                    if (60 < (new window.Date).getTime() - b.mousewheel.lastScrollTime)
                        if (s < 0)
                            if (b.isEnd && !b.params.loop || b.animating) {
                                if (b.params.mousewheelReleaseOnEdges) return !0
                            } else b.slideNext(), b.emit("onScroll", b, e);
                    else if (b.isBeginning && !b.params.loop || b.animating) {
                        if (b.params.mousewheelReleaseOnEdges) return !0
                    } else b.slidePrev(), b.emit("onScroll", b, e);
                    b.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
            }
        }

        function o(e, t) {
            e = N(e);
            var i, n, a, o = b.rtl ? -1 : 1;
            i = e.attr("data-swiper-parallax") || "0", n = e.attr("data-swiper-parallax-x"), a = e.attr("data-swiper-parallax-y"), n || a ? (n = n || "0", a = a || "0") : b.isHorizontal() ? (n = i, a = "0") : (a = i, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * o + "%" : n * t * o + "px", a = 0 <= a.indexOf("%") ? parseInt(a, 10) * t + "%" : a * t + "px", e.transform("translate3d(" + n + ", " + a + ",0px)")
        }

        function s(e) {
            return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
        }
        if (!(this instanceof H)) return new H(e, l);
        var d = {
                direction: "horizontal",
                touchEventsTarget: "container",
                initialSlide: 0,
                speed: 300,
                autoplay: !1,
                autoplayDisableOnInteraction: !0,
                autoplayStopOnLast: !1,
                iOSEdgeSwipeDetection: !1,
                iOSEdgeSwipeThreshold: 20,
                freeMode: !1,
                freeModeMomentum: !0,
                freeModeMomentumRatio: 1,
                freeModeMomentumBounce: !0,
                freeModeMomentumBounceRatio: 1,
                freeModeMomentumVelocityRatio: 1,
                freeModeSticky: !1,
                freeModeMinimumVelocity: .02,
                autoHeight: !1,
                setWrapperSize: !1,
                virtualTranslate: !1,
                effect: "slide",
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                },
                flip: {
                    slideShadows: !0,
                    limitRotation: !0
                },
                cube: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                },
                fade: {
                    crossFade: !1
                },
                parallax: !1,
                zoom: !1,
                zoomMax: 3,
                zoomMin: 1,
                zoomToggle: !0,
                scrollbar: null,
                scrollbarHide: !0,
                scrollbarDraggable: !1,
                scrollbarSnapOnRelease: !1,
                keyboardControl: !1,
                mousewheelControl: !1,
                mousewheelReleaseOnEdges: !1,
                mousewheelInvert: !1,
                mousewheelForceToAxis: !1,
                mousewheelSensitivity: 1,
                mousewheelEventsTarged: "container",
                hashnav: !1,
                hashnavWatchState: !1,
                history: !1,
                replaceState: !1,
                breakpoints: void 0,
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerColumnFill: "column",
                slidesPerGroup: 1,
                centeredSlides: !1,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                roundLengths: !1,
                touchRatio: 1,
                touchAngle: 45,
                simulateTouch: !0,
                shortSwipes: !0,
                longSwipes: !0,
                longSwipesRatio: .5,
                longSwipesMs: 300,
                followFinger: !0,
                onlyExternal: !1,
                threshold: 0,
                touchMoveStopPropagation: !0,
                touchReleaseOnEdges: !1,
                uniqueNavElements: !0,
                pagination: null,
                paginationElement: "span",
                paginationClickable: !1,
                paginationHide: !1,
                paginationBulletRender: null,
                paginationProgressRender: null,
                paginationFractionRender: null,
                paginationCustomRender: null,
                paginationType: "bullets",
                resistance: !0,
                resistanceRatio: .85,
                nextButton: null,
                prevButton: null,
                watchSlidesProgress: !1,
                watchSlidesVisibility: !1,
                grabCursor: !1,
                preventClicks: !0,
                preventClicksPropagation: !0,
                slideToClickedSlide: !1,
                lazyLoading: !1,
                lazyLoadingInPrevNext: !1,
                lazyLoadingInPrevNextAmount: 1,
                lazyLoadingOnTransitionStart: !1,
                preloadImages: !0,
                updateOnImagesReady: !0,
                loop: !1,
                loopAdditionalSlides: 0,
                loopedSlides: null,
                control: void 0,
                controlInverse: !1,
                controlBy: "slide",
                normalizeSlideIndex: !0,
                allowSwipeToPrev: !0,
                allowSwipeToNext: !0,
                swipeHandler: null,
                noSwiping: !0,
                noSwipingClass: "swiper-no-swiping",
                passiveListeners: !0,
                containerModifierClass: "swiper-container-",
                slideClass: "swiper-slide",
                slideActiveClass: "swiper-slide-active",
                slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                slideVisibleClass: "swiper-slide-visible",
                slideDuplicateClass: "swiper-slide-duplicate",
                slideNextClass: "swiper-slide-next",
                slideDuplicateNextClass: "swiper-slide-duplicate-next",
                slidePrevClass: "swiper-slide-prev",
                slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                wrapperClass: "swiper-wrapper",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                buttonDisabledClass: "swiper-button-disabled",
                paginationCurrentClass: "swiper-pagination-current",
                paginationTotalClass: "swiper-pagination-total",
                paginationHiddenClass: "swiper-pagination-hidden",
                paginationProgressbarClass: "swiper-pagination-progressbar",
                paginationClickableClass: "swiper-pagination-clickable",
                paginationModifierClass: "swiper-pagination-",
                lazyLoadingClass: "swiper-lazy",
                lazyStatusLoadingClass: "swiper-lazy-loading",
                lazyStatusLoadedClass: "swiper-lazy-loaded",
                lazyPreloaderClass: "swiper-lazy-preloader",
                notificationClass: "swiper-notification",
                preloaderClass: "preloader",
                zoomContainerClass: "swiper-zoom-container",
                observer: !1,
                observeParents: !1,
                a11y: !1,
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                runCallbacksOnInit: !0
            },
            c = l && l.virtualTranslate;
        l = l || {};
        var p = {};
        for (var u in l)
            if ("object" != typeof l[u] || null === l[u] || l[u].nodeType || l[u] === window || l[u] === document || "undefined" != typeof Dom7 && l[u] instanceof Dom7 || "undefined" != typeof jQuery && l[u] instanceof jQuery) p[u] = l[u];
            else
                for (var h in p[u] = {}, l[u]) p[u][h] = l[u][h];
        for (var f in d)
            if (void 0 === l[f]) l[f] = d[f];
            else if ("object" == typeof l[f])
            for (var g in d[f]) void 0 === l[f][g] && (l[f][g] = d[f][g]);
        var b = this;
        if (b.params = l, b.originalParams = p, b.classNames = [], void 0 !== N && "undefined" != typeof Dom7 && (N = Dom7), (void 0 !== N || (N = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (b.$ = N, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function() {
                if (!b.params.breakpoints) return !1;
                var e, t = !1,
                    i = [];
                for (e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && i.push(e);
                i.sort(function(e, t) {
                    return parseInt(e, 10) > parseInt(t, 10)
                });
                for (var n = 0; n < i.length; n++)(e = i[n]) >= window.innerWidth && !t && (t = e);
                return t || "max"
            }, b.setBreakpoint = function() {
                var e = b.getActiveBreakpoint();
                if (e && b.currentBreakpoint !== e) {
                    var t = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                        i = b.params.loop && t.slidesPerView !== b.params.slidesPerView;
                    for (var n in t) b.params[n] = t[n];
                    b.currentBreakpoint = e, i && b.destroyLoop && b.reLoop(!0)
                }
            }, b.params.breakpoints && b.setBreakpoint(), b.container = N(e), 0 !== b.container.length)) {
            if (1 < b.container.length) {
                var v = [];
                return b.container.each(function() {
                    v.push(new H(this, l))
                }), v
            }(b.container[0].swiper = b).container.data("swiper", b), b.classNames.push(b.params.containerModifierClass + b.params.direction), b.params.freeMode && b.classNames.push(b.params.containerModifierClass + "free-mode"), b.support.flexbox || (b.classNames.push(b.params.containerModifierClass + "no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push(b.params.containerModifierClass + "autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), b.params.touchReleaseOnEdges && (b.params.resistanceRatio = 0), 0 <= ["cube", "coverflow", "flip"].indexOf(b.params.effect) && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push(b.params.containerModifierClass + "3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push(b.params.containerModifierClass + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0, b.params.setWrapperSize = !1), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, b.params.setWrapperSize = !1, void 0 === c && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = N(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && 1 < b.paginationContainer.length && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass(b.params.paginationModifierClass + "clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass(b.params.paginationModifierClass + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = N(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && 1 < b.nextButton.length && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = N(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && 1 < b.prevButton.length && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function() {
                return "horizontal" === b.params.direction
            }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push(b.params.containerModifierClass + "rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), 1 < b.params.slidesPerColumn && b.classNames.push(b.params.containerModifierClass + "multirow"), b.device.android && b.classNames.push(b.params.containerModifierClass + "android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function() {
                (b.params.allowSwipeToNext = !1) === b.params.allowSwipeToPrev && b.params.grabCursor && b.unsetGrabCursor()
            }, b.lockSwipeToPrev = function() {
                (b.params.allowSwipeToPrev = !1) === b.params.allowSwipeToNext && b.params.grabCursor && b.unsetGrabCursor()
            }, b.lockSwipes = function() {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1, b.params.grabCursor && b.unsetGrabCursor()
            }, b.unlockSwipeToNext = function() {
                (b.params.allowSwipeToNext = !0) === b.params.allowSwipeToPrev && b.params.grabCursor && b.setGrabCursor()
            }, b.unlockSwipeToPrev = function() {
                (b.params.allowSwipeToPrev = !0) === b.params.allowSwipeToNext && b.params.grabCursor && b.setGrabCursor()
            }, b.unlockSwipes = function() {
                b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0, b.params.grabCursor && b.setGrabCursor()
            }, b.setGrabCursor = function(e) {
                b.container[0].style.cursor = "move", b.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", b.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", b.container[0].style.cursor = e ? "grabbing" : "grab"
            }, b.unsetGrabCursor = function() {
                b.container[0].style.cursor = ""
            }, b.params.grabCursor && b.setGrabCursor(), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function(e, t, i, n, a, o) {
                function s() {
                    o && o()
                }
                var r;
                e.complete && a ? s() : t ? ((r = new window.Image).onload = s, r.onerror = s, n && (r.sizes = n), i && (r.srcset = i), t && (r.src = t)) : s()
            }, b.preloadImages = function() {
                function e() {
                    null != b && b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                }
                b.imagesToLoad = b.container.find("img");
                for (var t = 0; t < b.imagesToLoad.length; t++) b.loadImage(b.imagesToLoad[t], b.imagesToLoad[t].currentSrc || b.imagesToLoad[t].getAttribute("src"), b.imagesToLoad[t].srcset || b.imagesToLoad[t].getAttribute("srcset"), b.imagesToLoad[t].sizes || b.imagesToLoad[t].getAttribute("sizes"), !0, e)
            }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function() {
                return void 0 === b.autoplayTimeoutId && !!b.params.autoplay && !b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void t())
            }, b.stopAutoplay = function(e) {
                b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
            }, b.pauseAutoplay = function(e) {
                b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, t()) : b.wrapper.transitionEnd(function() {
                    b && (b.autoplayPaused = !1, b.autoplaying ? t() : b.stopAutoplay())
                }))
            }, b.minTranslate = function() {
                return -b.snapGrid[0]
            }, b.maxTranslate = function() {
                return -b.snapGrid[b.snapGrid.length - 1]
            }, b.updateAutoHeight = function() {
                var e, t = [],
                    i = 0;
                if ("auto" !== b.params.slidesPerView && 1 < b.params.slidesPerView)
                    for (e = 0; e < Math.ceil(b.params.slidesPerView); e++) {
                        var n = b.activeIndex + e;
                        if (n > b.slides.length) break;
                        t.push(b.slides.eq(n)[0])
                    } else t.push(b.slides.eq(b.activeIndex)[0]);
                for (e = 0; e < t.length; e++)
                    if (void 0 !== t[e]) {
                        var a = t[e].offsetHeight;
                        i = i < a ? a : i
                    }
                i && b.wrapper.css("height", i + "px")
            }, b.updateContainerSize = function() {
                var e, t;
                e = void 0 !== b.params.width ? b.params.width : b.container[0].clientWidth, t = void 0 !== b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === t && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), t = t - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = t, b.size = b.isHorizontal() ? b.width : b.height)
            }, b.updateSlidesSize = function() {
                b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                var e, t = b.params.spaceBetween,
                    i = -b.params.slidesOffsetBefore,
                    n = 0,
                    a = 0;
                if (void 0 !== b.size) {
                    var o;
                    "string" == typeof t && 0 <= t.indexOf("%") && (t = parseFloat(t.replace("%", "")) / 100 * b.size), b.virtualSize = -t, b.rtl ? b.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : b.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    }), 1 < b.params.slidesPerColumn && (o = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (o = Math.max(o, b.params.slidesPerView * b.params.slidesPerColumn)));
                    var s, r, l = b.params.slidesPerColumn,
                        d = o / l,
                        c = d - (b.params.slidesPerColumn * d - b.slides.length);
                    for (e = 0; e < b.slides.length; e++) {
                        s = 0;
                        var p, u, h, f = b.slides.eq(e);
                        if (1 < b.params.slidesPerColumn) "column" === b.params.slidesPerColumnFill ? (h = e - (u = Math.floor(e / l)) * l, (c < u || u === c && h === l - 1) && ++h >= l && (h = 0, u++), p = u + h * o / l, f.css({
                            "-webkit-box-ordinal-group": p,
                            "-moz-box-ordinal-group": p,
                            "-ms-flex-order": p,
                            "-webkit-order": p,
                            order: p
                        })) : u = e - (h = Math.floor(e / d)) * d, f.css("margin-" + (b.isHorizontal() ? "top" : "left"), 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px").attr("data-swiper-column", u).attr("data-swiper-row", h);
                        "none" !== f.css("display") && ("auto" === b.params.slidesPerView ? (s = b.isHorizontal() ? f.outerWidth(!0) : f.outerHeight(!0), b.params.roundLengths && (s = m(s))) : (s = (b.size - (b.params.slidesPerView - 1) * t) / b.params.slidesPerView, b.params.roundLengths && (s = m(s)), b.isHorizontal() ? b.slides[e].style.width = s + "px" : b.slides[e].style.height = s + "px"), b.slides[e].swiperSlideSize = s, b.slidesSizesGrid.push(s), b.params.centeredSlides ? (i = i + s / 2 + n / 2 + t, 0 === e && (i = i - b.size / 2 - t), Math.abs(i) < .001 && (i = 0), a % b.params.slidesPerGroup == 0 && b.snapGrid.push(i), b.slidesGrid.push(i)) : (a % b.params.slidesPerGroup == 0 && b.snapGrid.push(i), b.slidesGrid.push(i), i = i + s + t), b.virtualSize += s + t, n = s, a++)
                    }
                    if (b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter, b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({
                            width: b.virtualSize + b.params.spaceBetween + "px"
                        }), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({
                            width: b.virtualSize + b.params.spaceBetween + "px"
                        }) : b.wrapper.css({
                            height: b.virtualSize + b.params.spaceBetween + "px"
                        })), 1 < b.params.slidesPerColumn && (b.virtualSize = (s + b.params.spaceBetween) * o, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.isHorizontal() ? b.wrapper.css({
                            width: b.virtualSize + b.params.spaceBetween + "px"
                        }) : b.wrapper.css({
                            height: b.virtualSize + b.params.spaceBetween + "px"
                        }), b.params.centeredSlides)) {
                        for (r = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && r.push(b.snapGrid[e]);
                        b.snapGrid = r
                    }
                    if (!b.params.centeredSlides) {
                        for (r = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && r.push(b.snapGrid[e]);
                        b.snapGrid = r, 1 < Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) && b.snapGrid.push(b.virtualSize - b.size)
                    }
                    0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({
                        marginLeft: t + "px"
                    }) : b.slides.css({
                        marginRight: t + "px"
                    }) : b.slides.css({
                        marginBottom: t + "px"
                    })), b.params.watchSlidesProgress && b.updateSlidesOffset()
                }
            }, b.updateSlidesOffset = function() {
                for (var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
            }, b.currentSlidesPerView = function() {
                var e, t, i = 1;
                if (b.params.centeredSlides) {
                    var n, a = b.slides[b.activeIndex].swiperSlideSize;
                    for (e = b.activeIndex + 1; e < b.slides.length; e++) b.slides[e] && !n && (i++, (a += b.slides[e].swiperSlideSize) > b.size && (n = !0));
                    for (t = b.activeIndex - 1; 0 <= t; t--) b.slides[t] && !n && (i++, (a += b.slides[t].swiperSlideSize) > b.size && (n = !0))
                } else
                    for (e = b.activeIndex + 1; e < b.slides.length; e++) b.slidesGrid[e] - b.slidesGrid[b.activeIndex] < b.size && i++;
                return i
            }, b.updateSlidesProgress = function(e) {
                if (void 0 === e && (e = b.translate || 0), 0 !== b.slides.length) {
                    void 0 === b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                    var t = -e;
                    b.rtl && (t = e), b.slides.removeClass(b.params.slideVisibleClass);
                    for (var i = 0; i < b.slides.length; i++) {
                        var n = b.slides[i],
                            a = (t + (b.params.centeredSlides ? b.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + b.params.spaceBetween);
                        if (b.params.watchSlidesVisibility) {
                            var o = -(t - n.swiperSlideOffset),
                                s = o + b.slidesSizesGrid[i];
                            (0 <= o && o < b.size || 0 < s && s <= b.size || o <= 0 && s >= b.size) && b.slides.eq(i).addClass(b.params.slideVisibleClass)
                        }
                        n.progress = b.rtl ? -a : a
                    }
                }
            }, b.updateProgress = function(e) {
                void 0 === e && (e = b.translate || 0);
                var t = b.maxTranslate() - b.minTranslate(),
                    i = b.isBeginning,
                    n = b.isEnd;
                0 === t ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / t, b.isBeginning = b.progress <= 0, b.isEnd = 1 <= b.progress), b.isBeginning && !i && b.emit("onReachBeginning", b), b.isEnd && !n && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
            }, b.updateActiveIndex = function() {
                var e, t, i, n = b.rtl ? b.translate : -b.translate;
                for (t = 0; t < b.slidesGrid.length; t++) void 0 !== b.slidesGrid[t + 1] ? n >= b.slidesGrid[t] && n < b.slidesGrid[t + 1] - (b.slidesGrid[t + 1] - b.slidesGrid[t]) / 2 ? e = t : n >= b.slidesGrid[t] && n < b.slidesGrid[t + 1] && (e = t + 1) : n >= b.slidesGrid[t] && (e = t);
                b.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), (i = Math.floor(e / b.params.slidesPerGroup)) >= b.snapGrid.length && (i = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = i, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses(), b.updateRealIndex())
            }, b.updateRealIndex = function() {
                b.realIndex = parseInt(b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") || b.activeIndex, 10)
            }, b.updateClasses = function() {
                b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass + " " + b.params.slideDuplicateActiveClass + " " + b.params.slideDuplicateNextClass + " " + b.params.slideDuplicatePrevClass);
                var e = b.slides.eq(b.activeIndex);
                e.addClass(b.params.slideActiveClass), l.loop && (e.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass));
                var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                b.params.loop && 0 === t.length && (t = b.slides.eq(0)).addClass(b.params.slideNextClass);
                var i = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                if (b.params.loop && 0 === i.length && (i = b.slides.eq(-1)).addClass(b.params.slidePrevClass), l.loop && (t.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass), i.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass)), b.paginationContainer && 0 < b.paginationContainer.length) {
                    var n, a = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                    if (b.params.loop ? ((n = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup)) > b.slides.length - 1 - 2 * b.loopedSlides && (n -= b.slides.length - 2 * b.loopedSlides), a - 1 < n && (n -= a), n < 0 && "bullets" !== b.params.paginationType && (n = a + n)) : n = void 0 !== b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && 0 < b.bullets.length && (b.bullets.removeClass(b.params.bulletActiveClass), 1 < b.paginationContainer.length ? b.bullets.each(function() {
                            N(this).index() === n && N(this).addClass(b.params.bulletActiveClass)
                        }) : b.bullets.eq(n).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(n + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(a)), "progress" === b.params.paginationType) {
                        var o = (n + 1) / a,
                            s = o,
                            r = 1;
                        b.isHorizontal() || (r = o, s = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + s + ") scaleY(" + r + ")").transition(b.params.speed)
                    }
                    "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, n + 1, a)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                }
                b.params.loop || (b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
            }, b.updatePagination = function() {
                if (b.params.pagination && b.paginationContainer && 0 < b.paginationContainer.length) {
                    var e = "";
                    if ("bullets" === b.params.paginationType) {
                        for (var t = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, i = 0; i < t; i++) e += b.params.paginationBulletRender ? b.params.paginationBulletRender(b, i, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                        b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                    }
                    "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                }
            }, b.update = function(e) {
                function t() {
                    b.rtl, b.translate, i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses()
                }
                if (b)
                    if (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e) {
                        var i;
                        b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (t(), b.params.autoHeight && b.updateAutoHeight()) : (("auto" === b.params.slidesPerView || 1 < b.params.slidesPerView) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0)) || t()
                    } else b.params.autoHeight && b.updateAutoHeight()
            }, b.onResize = function(e) {
                b.params.breakpoints && b.setBreakpoint();
                var t = b.params.allowSwipeToPrev,
                    i = b.params.allowSwipeToNext;
                b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                var n = !1;
                if (b.params.freeMode) {
                    var a = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                    b.setWrapperTranslate(a), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                } else b.updateClasses(), n = ("auto" === b.params.slidesPerView || 1 < b.params.slidesPerView) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                b.params.lazyLoading && !n && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = t, b.params.allowSwipeToNext = i
            }, b.touchEventsDesktop = {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            }, window.navigator.pointerEnabled ? b.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled && (b.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }), b.touchEvents = {
                start: b.support.touch || !b.params.simulateTouch ? "touchstart" : b.touchEventsDesktop.start,
                move: b.support.touch || !b.params.simulateTouch ? "touchmove" : b.touchEventsDesktop.move,
                end: b.support.touch || !b.params.simulateTouch ? "touchend" : b.touchEventsDesktop.end
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function(e) {
                var t = e ? "off" : "on",
                    i = e ? "removeEventListener" : "addEventListener",
                    n = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                    a = b.support.touch ? n : document,
                    o = !!b.params.nested;
                if (b.browser.ie) n[i](b.touchEvents.start, b.onTouchStart, !1), a[i](b.touchEvents.move, b.onTouchMove, o), a[i](b.touchEvents.end, b.onTouchEnd, !1);
                else {
                    if (b.support.touch) {
                        var s = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        n[i](b.touchEvents.start, b.onTouchStart, s), n[i](b.touchEvents.move, b.onTouchMove, o), n[i](b.touchEvents.end, b.onTouchEnd, s)
                    }(l.simulateTouch && !b.device.ios && !b.device.android || l.simulateTouch && !b.support.touch && b.device.ios) && (n[i]("mousedown", b.onTouchStart, !1), document[i]("mousemove", b.onTouchMove, o), document[i]("mouseup", b.onTouchEnd, !1))
                }
                window[i]("resize", b.onResize), b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.nextButton[t]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[t]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.prevButton[t]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[t]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[t]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[t]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && n[i]("click", b.preventClicks, !0)
            }, b.attachEvents = function() {
                b.initEvents()
            }, b.detachEvents = function() {
                b.initEvents(!0)
            }, b.allowClick = !0, b.preventClicks = function(e) {
                b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
            }, b.onClickNext = function(e) {
                e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext()
            }, b.onClickPrev = function(e) {
                e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev()
            }, b.onClickIndex = function(e) {
                e.preventDefault();
                var t = N(this).index() * b.params.slidesPerGroup;
                b.params.loop && (t += b.loopedSlides), b.slideTo(t)
            }, b.updateClickedSlide = function(e) {
                var t = r(e, "." + b.params.slideClass),
                    i = !1;
                if (t)
                    for (var n = 0; n < b.slides.length; n++) b.slides[n] === t && (i = !0);
                if (!t || !i) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                if (b.clickedSlide = t, b.clickedIndex = N(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                    var a, o = b.clickedIndex,
                        s = "auto" === b.params.slidesPerView ? b.currentSlidesPerView() : b.params.slidesPerView;
                    if (b.params.loop) {
                        if (b.animating) return;
                        a = parseInt(N(b.clickedSlide).attr("data-swiper-slide-index"), 10), b.params.centeredSlides ? o < b.loopedSlides - s / 2 || o > b.slides.length - b.loopedSlides + s / 2 ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                            b.slideTo(o)
                        }, 0)) : b.slideTo(o) : o > b.slides.length - s ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + a + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                            b.slideTo(o)
                        }, 0)) : b.slideTo(o)
                    } else b.slideTo(o)
                }
            };
            var x, T, C, S, y, _, E, w, k, I, A, D, M = "input, select, textarea, button, video",
                z = Date.now(),
                P = [];
            for (var O in b.animating = !1, b.touches = {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                }, b.onTouchStart = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), (A = "touchstart" === e.type) || !("which" in e) || 3 !== e.which) {
                        if (b.params.noSwiping && r(e, "." + b.params.noSwipingClass)) return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || r(e, b.params.swipeHandler)) {
                            var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                i = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
                                if (C = !(T = !(x = !0)), D = y = void 0, b.touches.startX = t, b.touches.startY = i, S = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, 0 < b.params.threshold && (w = !1), "touchstart" !== e.type) {
                                    var n = !0;
                                    N(e.target).is(M) && (n = !1), document.activeElement && N(document.activeElement).is(M) && document.activeElement.blur(), n && e.preventDefault()
                                }
                                b.emit("onTouchStart", b, e)
                            }
                        }
                    }
                }, b.onTouchMove = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), !A || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (b.params.onlyExternal) return b.allowClick = !1, void(x && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, S = Date.now()));
                        if (A && b.params.touchReleaseOnEdges && !b.params.loop)
                            if (b.isHorizontal()) {
                                if (b.touches.currentX < b.touches.startX && b.translate <= b.maxTranslate() || b.touches.currentX > b.touches.startX && b.translate >= b.minTranslate()) return
                            } else if (b.touches.currentY < b.touches.startY && b.translate <= b.maxTranslate() || b.touches.currentY > b.touches.startY && b.translate >= b.minTranslate()) return;
                        if (A && document.activeElement && e.target === document.activeElement && N(e.target).is(M)) return T = !0, void(b.allowClick = !1);
                        if (C && b.emit("onTouchMove", b, e), !(e.targetTouches && 1 < e.targetTouches.length)) {
                            var t;
                            if (b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, void 0 === y) y = !(b.isHorizontal() && b.touches.currentY === b.touches.startY || !b.isHorizontal() && b.touches.currentX === b.touches.startX) && (t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI, b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle);
                            if (y && b.emit("onTouchMoveOpposite", b, e), void 0 === D && b.browser.ieTouch && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (D = !0)), x) {
                                if (y) return void(x = !1);
                                if (D || !b.browser.ieTouch) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), T || (l.loop && b.fixLoop(), E = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), I = !1, !b.params.grabCursor || !0 !== b.params.allowSwipeToNext && !0 !== b.params.allowSwipeToPrev || b.setGrabCursor(!0)), T = !0;
                                    var i = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    i *= b.params.touchRatio, b.rtl && (i = -i), b.swipeDirection = 0 < i ? "prev" : "next", _ = i + E;
                                    var n = !0;
                                    if (0 < i && _ > b.minTranslate() ? (n = !1, b.params.resistance && (_ = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + E + i, b.params.resistanceRatio))) : i < 0 && _ < b.maxTranslate() && (n = !1, b.params.resistance && (_ = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - E - i, b.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && _ < E && (_ = E), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && E < _ && (_ = E), 0 < b.params.threshold) {
                                        if (!(Math.abs(i) > b.params.threshold || w)) return void(_ = E);
                                        if (!w) return w = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, _ = E, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                    }
                                    b.params.followFinger && ((b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === P.length && P.push({
                                        position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                        time: S
                                    }), P.push({
                                        position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                        time: (new window.Date).getTime()
                                    })), b.updateProgress(_), b.setWrapperTranslate(_))
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function(e) {
                    if (e.originalEvent && (e = e.originalEvent), C && b.emit("onTouchEnd", b, e), C = !1, x) {
                        b.params.grabCursor && T && x && (!0 === b.params.allowSwipeToNext || !0 === b.params.allowSwipeToPrev) && b.setGrabCursor(!1);
                        var t, i = Date.now(),
                            n = i - S;
                        if (b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), n < 300 && 300 < i - z && (k && clearTimeout(k), k = setTimeout(function() {
                                b && (b.params.paginationHide && 0 < b.paginationContainer.length && !N(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
                            }, 300)), n < 300 && i - z < 300 && (k && clearTimeout(k), b.emit("onDoubleTap", b, e))), z = Date.now(), setTimeout(function() {
                                b && (b.allowClick = !0)
                            }, 0), !x || !T || !b.swipeDirection || 0 === b.touches.diff || _ === E) return void(x = T = !1);
                        if (x = T = !1, t = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -_, b.params.freeMode) {
                            if (t < -b.minTranslate()) return void b.slideTo(b.activeIndex);
                            if (t > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (1 < P.length) {
                                    var a = P.pop(),
                                        o = P.pop(),
                                        s = a.position - o.position,
                                        r = a.time - o.time;
                                    b.velocity = s / r, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (150 < r || 300 < (new window.Date).getTime() - a.time) && (b.velocity = 0)
                                } else b.velocity = 0;
                                b.velocity = b.velocity * b.params.freeModeMomentumVelocityRatio, P.length = 0;
                                var l = 1e3 * b.params.freeModeMomentumRatio,
                                    d = b.velocity * l,
                                    c = b.translate + d;
                                b.rtl && (c = -c);
                                var p, u = !1,
                                    h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (c < b.maxTranslate()) b.params.freeModeMomentumBounce ? (c + b.maxTranslate() < -h && (c = b.maxTranslate() - h), p = b.maxTranslate(), I = u = !0) : c = b.maxTranslate();
                                else if (c > b.minTranslate()) b.params.freeModeMomentumBounce ? (c - b.minTranslate() > h && (c = b.minTranslate() + h), p = b.minTranslate(), I = u = !0) : c = b.minTranslate();
                                else if (b.params.freeModeSticky) {
                                    var f, m = 0;
                                    for (m = 0; m < b.snapGrid.length; m += 1)
                                        if (b.snapGrid[m] > -c) {
                                            f = m;
                                            break
                                        }
                                    c = Math.abs(b.snapGrid[f] - c) < Math.abs(b.snapGrid[f - 1] - c) || "next" === b.swipeDirection ? b.snapGrid[f] : b.snapGrid[f - 1], b.rtl || (c = -c)
                                }
                                if (0 !== b.velocity) l = b.rtl ? Math.abs((-c - b.translate) / b.velocity) : Math.abs((c - b.translate) / b.velocity);
                                else if (b.params.freeModeSticky) return void b.slideReset();
                                b.params.freeModeMomentumBounce && u ? (b.updateProgress(p), b.setWrapperTransition(l), b.setWrapperTranslate(c), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function() {
                                    b && I && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(p), b.wrapper.transitionEnd(function() {
                                        b && b.onTransitionEnd()
                                    }))
                                })) : b.velocity ? (b.updateProgress(c), b.setWrapperTransition(l), b.setWrapperTranslate(c), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
                                    b && b.onTransitionEnd()
                                }))) : b.updateProgress(c), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || n >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var g, v = 0,
                            y = b.slidesSizesGrid[0];
                        for (g = 0; g < b.slidesGrid.length; g += b.params.slidesPerGroup) void 0 !== b.slidesGrid[g + b.params.slidesPerGroup] ? t >= b.slidesGrid[g] && t < b.slidesGrid[g + b.params.slidesPerGroup] && (v = g, y = b.slidesGrid[g + b.params.slidesPerGroup] - b.slidesGrid[g]) : t >= b.slidesGrid[g] && (v = g, y = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var w = (t - b.slidesGrid[v]) / y;
                        if (n > b.params.longSwipesMs) {
                            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (w >= b.params.longSwipesRatio ? b.slideTo(v + b.params.slidesPerGroup) : b.slideTo(v)), "prev" === b.swipeDirection && (w > 1 - b.params.longSwipesRatio ? b.slideTo(v + b.params.slidesPerGroup) : b.slideTo(v))
                        } else {
                            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(v + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(v)
                        }
                    }
                }, b._slideTo = function(e, t) {
                    return b.slideTo(e, t, !0, !0)
                }, b.slideTo = function(e, t, i, n) {
                    void 0 === i && (i = !0), void 0 === e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var a = -b.snapGrid[b.snapIndex];
                    if (b.params.autoplay && b.autoplaying && (n || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(t) : b.stopAutoplay()), b.updateProgress(a), b.params.normalizeSlideIndex)
                        for (var o = 0; o < b.slidesGrid.length; o++) - Math.floor(100 * a) >= Math.floor(100 * b.slidesGrid[o]) && (e = o);
                    return !(!b.params.allowSwipeToNext && a < b.translate && a < b.minTranslate() || !b.params.allowSwipeToPrev && a > b.translate && a > b.maxTranslate() && (b.activeIndex || 0) !== e || (void 0 === t && (t = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.updateRealIndex(), b.rtl && -a === b.translate || !b.rtl && a === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(a), 1) : (b.updateClasses(), b.onTransitionStart(i), 0 === t || b.browser.lteIE9 ? (b.setWrapperTranslate(a), b.setWrapperTransition(0), b.onTransitionEnd(i)) : (b.setWrapperTranslate(a), b.setWrapperTransition(t), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
                        b && b.onTransitionEnd(i)
                    }))), 0)))
                }, b.onTransitionStart = function(e) {
                    void 0 === e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function(e) {
                    b.animating = !1, b.setWrapperTransition(0), void 0 === e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.history && b.history && b.history.setHistory(b.params.history, b.activeIndex), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function(e, t, i) {
                    return b.params.loop ? !b.animating && (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, i)) : b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, i)
                }, b._slideNext = function(e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function(e, t, i) {
                    return b.params.loop ? !b.animating && (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex - 1, t, e, i)) : b.slideTo(b.activeIndex - 1, t, e, i)
                }, b._slidePrev = function(e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function(e, t, i) {
                    return b.slideTo(b.activeIndex, t, e)
                }, b.disableTouchControl = function() {
                    return b.params.onlyExternal = !0
                }, b.enableTouchControl = function() {
                    return !(b.params.onlyExternal = !1)
                }, b.setWrapperTransition = function(e, t) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, t), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function(e, t, i) {
                    var n = 0,
                        a = 0;
                    b.isHorizontal() ? n = b.rtl ? -e : e : a = e, b.params.roundLengths && (n = m(n), a = m(a)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + n + "px, " + a + "px, 0px)") : b.wrapper.transform("translate(" + n + "px, " + a + "px)")), b.translate = b.isHorizontal() ? n : a;
                    var o = b.maxTranslate() - b.minTranslate();
                    (0 === o ? 0 : (e - b.minTranslate()) / o) !== b.progress && b.updateProgress(e), t && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, i), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function(e, t) {
                    var i, n, a, o;
                    return void 0 === t && (t = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (a = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (6 < (n = a.transform || a.webkitTransform).split(",").length && (n = n.split(", ").map(function(e) {
                        return e.replace(",", ".")
                    }).join(", ")), o = new window.WebKitCSSMatrix("none" === n ? "" : n)) : i = (o = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (n = window.WebKitCSSMatrix ? o.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = window.WebKitCSSMatrix ? o.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), b.rtl && n && (n = -n), n || 0)
                }, b.getWrapperTranslate = function(e) {
                    return void 0 === e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function() {
                    if (b.params.observeParents)
                        for (var e = b.container.parents(), t = 0; t < e.length; t++) i(e[t]);
                    i(b.container[0], {
                        childList: !1
                    }), i(b.wrapper[0], {
                        attributes: !1
                    })
                }, b.disconnectObservers = function() {
                    for (var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function() {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var n = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = n.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > n.length && (b.loopedSlides = n.length);
                    var e, a = [],
                        o = [];
                    for (n.each(function(e, t) {
                            var i = N(this);
                            e < b.loopedSlides && o.push(t), e < n.length && e >= n.length - b.loopedSlides && a.push(t), i.attr("data-swiper-slide-index", e)
                        }), e = 0; e < o.length; e++) b.wrapper.append(N(o[e].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (e = a.length - 1; 0 <= e; e--) b.wrapper.prepend(N(a[e].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function() {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function(e) {
                    var t = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(t + b.loopedSlides, 0, !1)
                }, b.fixLoop = function() {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function(e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)
                        for (var t = 0; t < e.length; t++) e[t] && b.wrapper.append(e[t]);
                    else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function(e) {
                    b.params.loop && b.destroyLoop();
                    var t = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var i = 0; i < e.length; i++) e[i] && b.wrapper.prepend(e[i]);
                        t = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(t, 0, !1)
                }, b.removeSlide = function(e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var t, i = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var n = 0; n < e.length; n++) t = e[n], b.slides[t] && b.slides.eq(t).remove(), t < i && i--;
                        i = Math.max(i, 0)
                    } else t = e, b.slides[t] && b.slides.eq(t).remove(), t < i && i--, i = Math.max(i, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(i + b.loopedSlides, 0, !1) : b.slideTo(i, 0, !1)
                }, b.removeAllSlides = function() {
                    for (var e = [], t = 0; t < b.slides.length; t++) e.push(t);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e),
                                    i = -t[0].swiperSlideOffset;
                                b.params.virtualTranslate || (i -= b.translate);
                                var n = 0;
                                b.isHorizontal() || (n = i, i = 0);
                                var a = b.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({
                                    opacity: a
                                }).transform("translate3d(" + i + "px, " + n + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var i = !1;
                                b.slides.transitionEnd(function() {
                                    if (!i && b) {
                                        i = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    flip: {
                        setTranslate: function() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e),
                                    i = t[0].progress;
                                b.params.flip.limitRotation && (i = Math.max(Math.min(t[0].progress, 1), -1));
                                var n = -180 * i,
                                    a = 0,
                                    o = -t[0].swiperSlideOffset,
                                    s = 0;
                                if (b.isHorizontal() ? b.rtl && (n = -n) : (s = o, a = -n, n = o = 0), t[0].style.zIndex = -Math.abs(Math.round(i)) + b.slides.length, b.params.flip.slideShadows) {
                                    var r = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                                        l = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                                    0 === r.length && (r = N('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(r)), 0 === l.length && (l = N('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(l)), r.length && (r[0].style.opacity = Math.max(-i, 0)), l.length && (l[0].style.opacity = Math.max(i, 0))
                                }
                                t.transform("translate3d(" + o + "px, " + s + "px, 0px) rotateX(" + a + "deg) rotateY(" + n + "deg)")
                            }
                        },
                        setTransition: function(e) {
                            if (b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
                                var i = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function() {
                                    if (!i && b && N(this).hasClass(b.params.slideActiveClass)) {
                                        i = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var e, t = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (0 === (e = b.wrapper.find(".swiper-cube-shadow")).length && (e = N('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({
                                height: b.width + "px"
                            })) : 0 === (e = b.container.find(".swiper-cube-shadow")).length && (e = N('<div class="swiper-cube-shadow"></div>'), b.container.append(e)));
                            for (var i = 0; i < b.slides.length; i++) {
                                var n = b.slides.eq(i),
                                    a = 90 * i,
                                    o = Math.floor(a / 360);
                                b.rtl && (a = -a, o = Math.floor(-a / 360));
                                var s = Math.max(Math.min(n[0].progress, 1), -1),
                                    r = 0,
                                    l = 0,
                                    d = 0;
                                i % 4 == 0 ? (r = 4 * -o * b.size, d = 0) : (i - 1) % 4 == 0 ? (r = 0, d = 4 * -o * b.size) : (i - 2) % 4 == 0 ? (r = b.size + 4 * o * b.size, d = b.size) : (i - 3) % 4 == 0 && (r = -b.size, d = 3 * b.size + 4 * b.size * o), b.rtl && (r = -r), b.isHorizontal() || (l = r, r = 0);
                                var c = "rotateX(" + (b.isHorizontal() ? 0 : -a) + "deg) rotateY(" + (b.isHorizontal() ? a : 0) + "deg) translate3d(" + r + "px, " + l + "px, " + d + "px)";
                                if (s <= 1 && -1 < s && (t = 90 * i + 90 * s, b.rtl && (t = 90 * -i - 90 * s)), n.transform(c), b.params.cube.slideShadows) {
                                    var p = b.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                                        u = b.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                                    0 === p.length && (p = N('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), n.append(p)), 0 === u.length && (u = N('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(u)), p.length && (p[0].style.opacity = Math.max(-s, 0)), u.length && (u[0].style.opacity = Math.max(s, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow)
                                if (b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");
                                else {
                                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                                        f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                                        m = b.params.cube.shadowScale,
                                        g = b.params.cube.shadowScale / f,
                                        v = b.params.cube.shadowOffset;
                                    e.transform("scale3d(" + m + ", 1, " + g + ") translate3d(0px, " + (b.height / 2 + v) + "px, " + -b.height / 2 / g + "px) rotateX(-90deg)")
                                }
                            var y = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + y + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, i = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, n = b.params.coverflow.depth, a = 0, o = b.slides.length; a < o; a++) {
                                var s = b.slides.eq(a),
                                    r = b.slidesSizesGrid[a],
                                    l = (t - s[0].swiperSlideOffset - r / 2) / r * b.params.coverflow.modifier,
                                    d = b.isHorizontal() ? i * l : 0,
                                    c = b.isHorizontal() ? 0 : i * l,
                                    p = -n * Math.abs(l),
                                    u = b.isHorizontal() ? 0 : b.params.coverflow.stretch * l,
                                    h = b.isHorizontal() ? b.params.coverflow.stretch * l : 0;
                                Math.abs(h) < .001 && (h = 0), Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0), Math.abs(d) < .001 && (d = 0), Math.abs(c) < .001 && (c = 0);
                                var f = "translate3d(" + h + "px," + u + "px," + p + "px)  rotateX(" + c + "deg) rotateY(" + d + "deg)";
                                if (s.transform(f), s[0].style.zIndex = 1 - Math.abs(Math.round(l)), b.params.coverflow.slideShadows) {
                                    var m = b.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                                        g = b.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                                    0 === m.length && (m = N('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), s.append(m)), 0 === g.length && (g = N('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(g)), m.length && (m[0].style.opacity = 0 < l ? l : 0), g.length && (g[0].style.opacity = 0 < -l ? -l : 0)
                                }
                            }
                            b.browser.ie && (b.wrapper[0].style.perspectiveOrigin = t + "px 50%")
                        },
                        setTransition: function(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(e, l) {
                        if (void 0 !== e && (void 0 === l && (l = !0), 0 !== b.slides.length)) {
                            var d = b.slides.eq(e),
                                t = d.find("." + b.params.lazyLoadingClass + ":not(." + b.params.lazyStatusLoadedClass + "):not(." + b.params.lazyStatusLoadingClass + ")");
                            !d.hasClass(b.params.lazyLoadingClass) || d.hasClass(b.params.lazyStatusLoadedClass) || d.hasClass(b.params.lazyStatusLoadingClass) || (t = t.add(d[0])), 0 !== t.length && t.each(function() {
                                var n = N(this);
                                n.addClass(b.params.lazyStatusLoadingClass);
                                var a = n.attr("data-background"),
                                    o = n.attr("data-src"),
                                    s = n.attr("data-srcset"),
                                    r = n.attr("data-sizes");
                                b.loadImage(n[0], o || a, s, r, !1, function() {
                                    if (a ? (n.css("background-image", 'url("' + a + '")'), n.removeAttr("data-background")) : (s && (n.attr("srcset", s), n.removeAttr("data-srcset")), r && (n.attr("sizes", r), n.removeAttr("data-sizes")), o && (n.attr("src", o), n.removeAttr("data-src"))), n.addClass(b.params.lazyStatusLoadedClass).removeClass(b.params.lazyStatusLoadingClass), d.find("." + b.params.lazyPreloaderClass + ", ." + b.params.preloaderClass).remove(), b.params.loop && l) {
                                        var e = d.attr("data-swiper-slide-index");
                                        if (d.hasClass(b.params.slideDuplicateClass)) {
                                            var t = b.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                            b.lazy.loadImageInSlide(t.index(), !1)
                                        } else {
                                            var i = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                            b.lazy.loadImageInSlide(i.index(), !1)
                                        }
                                    }
                                    b.emit("onLazyImageReady", b, d[0], n[0])
                                }), b.emit("onLazyImageLoad", b, d[0], n[0])
                            })
                        }
                    },
                    load: function() {
                        var e, t = b.params.slidesPerView;
                        if ("auto" === t && (t = 0), b.lazy.initialImageLoaded || (b.lazy.initialImageLoaded = !0), b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function() {
                            b.lazy.loadImageInSlide(N(this).index())
                        });
                        else if (1 < t)
                            for (e = b.activeIndex; e < b.activeIndex + t; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
                        else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext)
                            if (1 < t || b.params.lazyLoadingInPrevNextAmount && 1 < b.params.lazyLoadingInPrevNextAmount) {
                                var i = b.params.lazyLoadingInPrevNextAmount,
                                    n = t,
                                    a = Math.min(b.activeIndex + n + Math.max(i, n), b.slides.length),
                                    o = Math.max(b.activeIndex - Math.max(n, i), 0);
                                for (e = b.activeIndex + t; e < a; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
                                for (e = o; e < b.activeIndex; e++) b.slides[e] && b.lazy.loadImageInSlide(e)
                            } else {
                                var s = b.wrapper.children("." + b.params.slideNextClass);
                                0 < s.length && b.lazy.loadImageInSlide(s.index());
                                var r = b.wrapper.children("." + b.params.slidePrevClass);
                                0 < r.length && b.lazy.loadImageInSlide(r.index())
                            }
                    },
                    onTransitionStart: function() {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    },
                    onTransitionEnd: function() {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function(e) {
                        var t = b.scrollbar,
                            i = (b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - t.track.offset()[b.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
                            n = -b.minTranslate() * t.moveDivider,
                            a = -b.maxTranslate() * t.moveDivider;
                        i < n ? i = n : a < i && (i = a), i = -i / t.moveDivider, b.updateProgress(i), b.setWrapperTranslate(i, !0)
                    },
                    dragStart: function(e) {
                        var t = b.scrollbar;
                        t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), b.params.scrollbarHide && t.track.css("opacity", 1), b.wrapper.transition(100), t.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    },
                    dragMove: function(e) {
                        var t = b.scrollbar;
                        t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), b.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    },
                    dragEnd: function(e) {
                        var t = b.scrollbar;
                        t.isTouched && (t.isTouched = !1, b.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function() {
                            t.track.css("opacity", 0), t.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    },
                    draggableEvents: !1 !== b.params.simulateTouch || b.support.touch ? b.touchEvents : b.touchEventsDesktop,
                    enableDraggable: function() {
                        var e = b.scrollbar,
                            t = b.support.touch ? e.track : document;
                        N(e.track).on(e.draggableEvents.start, e.dragStart), N(t).on(e.draggableEvents.move, e.dragMove), N(t).on(e.draggableEvents.end, e.dragEnd)
                    },
                    disableDraggable: function() {
                        var e = b.scrollbar,
                            t = b.support.touch ? e.track : document;
                        N(e.track).off(e.draggableEvents.start, e.dragStart), N(t).off(e.draggableEvents.move, e.dragMove), N(t).off(e.draggableEvents.end, e.dragEnd)
                    },
                    set: function() {
                        if (b.params.scrollbar) {
                            var e = b.scrollbar;
                            e.track = N(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && 1 < e.track.length && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = N('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", 1 <= e.divider ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (b.params.scrollbar) {
                            var e, t = b.scrollbar,
                                i = (b.translate, t.dragSize);
                            e = (t.trackSize - t.dragSize) * b.progress, b.rtl && b.isHorizontal() ? 0 < (e = -e) ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e) : e < 0 ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = i + "px") : (b.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = i + "px"), b.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
                                t.track[0].style.opacity = 0, t.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function(e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function(e, t) {
                        var i, n;
                        this.x = e, this.y = t, this.lastIndex = e.length - 1, this.x.length, this.interpolate = function(e) {
                            return e ? (n = r(this.x, e), i = n - 1, (e - this.x[i]) * (this.y[n] - this.y[i]) / (this.x[n] - this.x[i]) + this.y[i]) : 0
                        };
                        var a, o, s, r = function(e, t) {
                            for (o = -1, a = e.length; 1 < a - o;) e[s = a + o >> 1] <= t ? o = s : a = s;
                            return a
                        }
                    },
                    getInterpolateFunction: function(e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    },
                    setTranslate: function(t, e) {
                        function i(e) {
                            t = e.rtl && "horizontal" === e.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(e), a = -b.controller.spline.interpolate(-t)), a && "container" !== b.params.controlBy || (n = (e.maxTranslate() - e.minTranslate()) / (b.maxTranslate() - b.minTranslate()), a = (t - b.minTranslate()) * n + e.minTranslate()), b.params.controlInverse && (a = e.maxTranslate() - a), e.updateProgress(a), e.setWrapperTranslate(a, !1, b), e.updateActiveIndex()
                        }
                        var n, a, o = b.params.control;
                        if (b.isArray(o))
                            for (var s = 0; s < o.length; s++) o[s] !== e && o[s] instanceof H && i(o[s]);
                        else o instanceof H && e !== o && i(o)
                    },
                    setTransition: function(t, e) {
                        function i(e) {
                            e.setWrapperTransition(t, b), 0 !== t && (e.onTransitionStart(), e.wrapper.transitionEnd(function() {
                                a && (e.params.loop && "slide" === b.params.controlBy && e.fixLoop(), e.onTransitionEnd())
                            }))
                        }
                        var n, a = b.params.control;
                        if (b.isArray(a))
                            for (n = 0; n < a.length; n++) a[n] !== e && a[n] instanceof H && i(a[n]);
                        else a instanceof H && e !== a && i(a)
                    }
                }, b.hashnav = {
                    onHashCange: function(e, t) {
                        var i = document.location.hash.replace("#", "");
                        i !== b.slides.eq(b.activeIndex).attr("data-hash") && b.slideTo(b.wrapper.children("." + b.params.slideClass + '[data-hash="' + i + '"]').index())
                    },
                    attachEvents: function(e) {
                        var t = e ? "off" : "on";
                        N(window)[t]("hashchange", b.hashnav.onHashCange)
                    },
                    setHash: function() {
                        if (b.hashnav.initialized && b.params.hashnav)
                            if (b.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + b.slides.eq(b.activeIndex).attr("data-hash") || "");
                            else {
                                var e = b.slides.eq(b.activeIndex),
                                    t = e.attr("data-hash") || e.attr("data-history");
                                document.location.hash = t || ""
                            }
                    },
                    init: function() {
                        if (b.params.hashnav && !b.params.history) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var t = 0, i = b.slides.length; t < i; t++) {
                                    var n = b.slides.eq(t);
                                    if ((n.attr("data-hash") || n.attr("data-history")) === e && !n.hasClass(b.params.slideDuplicateClass)) {
                                        var a = n.index();
                                        b.slideTo(a, 0, b.params.runCallbacksOnInit, !0)
                                    }
                                }
                            b.params.hashnavWatchState && b.hashnav.attachEvents()
                        }
                    },
                    destroy: function() {
                        b.params.hashnavWatchState && b.hashnav.attachEvents(!0)
                    }
                }, b.history = {
                    init: function() {
                        if (b.params.history) {
                            if (!window.history || !window.history.pushState) return b.params.history = !1, void(b.params.hashnav = !0);
                            b.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, b.params.runCallbacksOnInit), b.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                        }
                    },
                    setHistoryPopState: function() {
                        b.history.paths = b.history.getPathValues(), b.history.scrollToSlide(b.params.speed, b.history.paths.value, !1)
                    },
                    getPathValues: function() {
                        var e = window.location.pathname.slice(1).split("/"),
                            t = e.length;
                        return {
                            key: e[t - 2],
                            value: e[t - 1]
                        }
                    },
                    setHistory: function(e, t) {
                        if (b.history.initialized && b.params.history) {
                            var i = b.slides.eq(t),
                                n = this.slugify(i.attr("data-history"));
                            window.location.pathname.includes(e) || (n = e + "/" + n), b.params.replaceState ? window.history.replaceState(null, null, n) : window.history.pushState(null, null, n)
                        }
                    },
                    slugify: function(e) {
                        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                    },
                    scrollToSlide: function(e, t, i) {
                        if (t)
                            for (var n = 0, a = b.slides.length; n < a; n++) {
                                var o = b.slides.eq(n);
                                if (this.slugify(o.attr("data-history")) === t && !o.hasClass(b.params.slideDuplicateClass)) {
                                    var s = o.index();
                                    b.slideTo(s, e, i)
                                }
                            } else b.slideTo(0, e, i)
                    }
                }, b.disableKeyboardControl = function() {
                    b.params.keyboardControl = !1, N(document).off("keydown", n)
                }, b.enableKeyboardControl = function() {
                    b.params.keyboardControl = !0, N(document).on("keydown", n)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl && (b.mousewheel.event = -1 < navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
                    var e = "onwheel",
                        t = e in document;
                    if (!t) {
                        var i = document.createElement("div");
                        i.setAttribute(e, "return;"), t = "function" == typeof i[e]
                    }
                    return !t && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (t = document.implementation.hasFeature("Events.wheel", "3.0")), t
                }() ? "wheel" : "mousewheel"), b.disableMousewheelControl = function() {
                    if (!b.mousewheel.event) return !1;
                    var e = b.container;
                    return "container" !== b.params.mousewheelEventsTarged && (e = N(b.params.mousewheelEventsTarged)), e.off(b.mousewheel.event, a), !0
                }, b.enableMousewheelControl = function() {
                    if (!b.mousewheel.event) return !1;
                    var e = b.container;
                    return "container" !== b.params.mousewheelEventsTarged && (e = N(b.params.mousewheelEventsTarged)), e.on(b.mousewheel.event, a), !0
                }, b.parallax = {
                    setTranslate: function() {
                        b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            o(this, b.progress)
                        }), b.slides.each(function() {
                            var e = N(this);
                            e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                                o(this, Math.min(Math.max(e[0].progress, -1), 1))
                            })
                        })
                    },
                    setTransition: function(i) {
                        void 0 === i && (i = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var e = N(this),
                                t = parseInt(e.attr("data-swiper-parallax-duration"), 10) || i;
                            0 === i && (t = 0), e.transition(t)
                        })
                    }
                }, b.zoom = {
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        slide: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        image: void 0,
                        imageWrap: void 0,
                        zoomMax: b.params.zoomMax
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    },
                    getDistanceBetweenTouches: function(e) {
                        if (e.targetTouches.length < 2) return 1;
                        var t = e.targetTouches[0].pageX,
                            i = e.targetTouches[0].pageY,
                            n = e.targetTouches[1].pageX,
                            a = e.targetTouches[1].pageY;
                        return Math.sqrt(Math.pow(n - t, 2) + Math.pow(a - i, 2))
                    },
                    onGestureStart: function(e) {
                        var t = b.zoom;
                        if (!b.support.gestures) {
                            if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                            t.gesture.scaleStart = t.getDistanceBetweenTouches(e)
                        }
                        return t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = N(this), 0 === t.gesture.slide.length && (t.gesture.slide = b.slides.eq(b.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + b.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || b.params.zoomMax, 0 !== t.gesture.imageWrap.length) ? (t.gesture.image.transition(0), void(t.isScaling = !0)) : void(t.gesture.image = void 0)
                    },
                    onGestureChange: function(e) {
                        var t = b.zoom;
                        if (!b.support.gestures) {
                            if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                            t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
                        }
                        t.gesture.image && 0 !== t.gesture.image.length && (b.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), t.scale < b.params.zoomMin && (t.scale = b.params.zoomMin + 1 - Math.pow(b.params.zoomMin - t.scale + 1, .5)), t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
                    },
                    onGestureEnd: function(e) {
                        var t = b.zoom;
                        !b.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), b.params.zoomMin), t.gesture.image.transition(b.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0))
                    },
                    onTouchStart: function(e, t) {
                        var i = e.zoom;
                        i.gesture.image && 0 !== i.gesture.image.length && (i.image.isTouched || ("android" === e.device.os && t.preventDefault(), i.image.isTouched = !0, i.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, i.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
                    },
                    onTouchMove: function(e) {
                        var t = b.zoom;
                        if (t.gesture.image && 0 !== t.gesture.image.length && (b.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
                            t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, t.image.startX = b.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = b.getTranslate(t.gesture.imageWrap[0], "y") || 0, t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, t.gesture.imageWrap.transition(0), b.rtl && (t.image.startX = -t.image.startX), b.rtl && (t.image.startY = -t.image.startY));
                            var i = t.image.width * t.scale,
                                n = t.image.height * t.scale;
                            if (!(i < t.gesture.slideWidth && n < t.gesture.slideHeight)) {
                                if (t.image.minX = Math.min(t.gesture.slideWidth / 2 - i / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - n / 2, 0), t.image.maxY = -t.image.minY, t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !t.image.isMoved && !t.isScaling) {
                                    if (b.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x) return void(t.image.isTouched = !1);
                                    if (!b.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y) return void(t.image.isTouched = !1)
                                }
                                e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                            }
                        }
                    },
                    onTouchEnd: function(e, t) {
                        var i = e.zoom;
                        if (i.gesture.image && 0 !== i.gesture.image.length) {
                            if (!i.image.isTouched || !i.image.isMoved) return i.image.isTouched = !1, void(i.image.isMoved = !1);
                            i.image.isTouched = !1, i.image.isMoved = !1;
                            var n = 300,
                                a = 300,
                                o = i.velocity.x * n,
                                s = i.image.currentX + o,
                                r = i.velocity.y * a,
                                l = i.image.currentY + r;
                            0 !== i.velocity.x && (n = Math.abs((s - i.image.currentX) / i.velocity.x)), 0 !== i.velocity.y && (a = Math.abs((l - i.image.currentY) / i.velocity.y));
                            var d = Math.max(n, a);
                            i.image.currentX = s, i.image.currentY = l;
                            var c = i.image.width * i.scale,
                                p = i.image.height * i.scale;
                            i.image.minX = Math.min(i.gesture.slideWidth / 2 - c / 2, 0), i.image.maxX = -i.image.minX, i.image.minY = Math.min(i.gesture.slideHeight / 2 - p / 2, 0), i.image.maxY = -i.image.minY, i.image.currentX = Math.max(Math.min(i.image.currentX, i.image.maxX), i.image.minX), i.image.currentY = Math.max(Math.min(i.image.currentY, i.image.maxY), i.image.minY), i.gesture.imageWrap.transition(d).transform("translate3d(" + i.image.currentX + "px, " + i.image.currentY + "px,0)")
                        }
                    },
                    onTransitionEnd: function(e) {
                        var t = e.zoom;
                        t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, t.scale = t.currentScale = 1)
                    },
                    toggleZoom: function(e, t) {
                        var i, n, a, o, s, r, l, d, c, p, u, h, f, m, g, v, y = e.zoom;
                        (y.gesture.slide || (y.gesture.slide = e.clickedSlide ? N(e.clickedSlide) : e.slides.eq(e.activeIndex), y.gesture.image = y.gesture.slide.find("img, svg, canvas"), y.gesture.imageWrap = y.gesture.image.parent("." + e.params.zoomContainerClass)), y.gesture.image && 0 !== y.gesture.image.length) && (n = void 0 === y.image.touchesStart.x && t ? (i = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (i = y.image.touchesStart.x, y.image.touchesStart.y), y.scale && 1 !== y.scale ? (y.scale = y.currentScale = 1, y.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), y.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), y.gesture.slide = void 0) : (y.scale = y.currentScale = y.gesture.imageWrap.attr("data-swiper-zoom") || e.params.zoomMax, t ? (g = y.gesture.slide[0].offsetWidth, v = y.gesture.slide[0].offsetHeight, a = y.gesture.slide.offset().left + g / 2 - i, o = y.gesture.slide.offset().top + v / 2 - n, l = y.gesture.image[0].offsetWidth, d = y.gesture.image[0].offsetHeight, c = l * y.scale, p = d * y.scale, f = -(u = Math.min(g / 2 - c / 2, 0)), m = -(h = Math.min(v / 2 - p / 2, 0)), (s = a * y.scale) < u && (s = u), f < s && (s = f), (r = o * y.scale) < h && (r = h), m < r && (r = m)) : r = s = 0, y.gesture.imageWrap.transition(300).transform("translate3d(" + s + "px, " + r + "px,0)"), y.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")")))
                    },
                    attachEvents: function(e) {
                        var i = e ? "off" : "on";
                        if (b.params.zoom) {
                            var t = (b.slides, !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            });
                            b.support.gestures ? (b.slides[i]("gesturestart", b.zoom.onGestureStart, t), b.slides[i]("gesturechange", b.zoom.onGestureChange, t), b.slides[i]("gestureend", b.zoom.onGestureEnd, t)) : "touchstart" === b.touchEvents.start && (b.slides[i](b.touchEvents.start, b.zoom.onGestureStart, t), b.slides[i](b.touchEvents.move, b.zoom.onGestureChange, t), b.slides[i](b.touchEvents.end, b.zoom.onGestureEnd, t)), b[i]("touchStart", b.zoom.onTouchStart), b.slides.each(function(e, t) {
                                0 < N(t).find("." + b.params.zoomContainerClass).length && N(t)[i](b.touchEvents.move, b.zoom.onTouchMove)
                            }), b[i]("touchEnd", b.zoom.onTouchEnd), b[i]("transitionEnd", b.zoom.onTransitionEnd), b.params.zoomToggle && b.on("doubleTap", b.zoom.toggleZoom)
                        }
                    },
                    init: function() {
                        b.zoom.attachEvents()
                    },
                    destroy: function() {
                        b.zoom.attachEvents(!0)
                    }
                }, b._plugins = [], b.plugins) {
                var L = b.plugins[O](b, b.params[O]);
                L && b._plugins.push(L)
            }
            return b.callPlugins = function(e) {
                for (var t = 0; t < b._plugins.length; t++) e in b._plugins[t] && b._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.emitterEventListeners = {}, b.emit = function(e) {
                var t;
                if (b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), b.emitterEventListeners[e])
                    for (t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, b.on = function(e, t) {
                return e = s(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(t), b
            }, b.off = function(e, t) {
                var i;
                if (e = s(e), void 0 === t) return b.emitterEventListeners[e] = [], b;
                if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                    for (i = 0; i < b.emitterEventListeners[e].length; i++) b.emitterEventListeners[e][i] === t && b.emitterEventListeners[e].splice(i, 1);
                    return b
                }
            }, b.once = function(e, t) {
                e = s(e);
                var i = function() {
                    t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, i)
                };
                return b.on(e, i), b
            }, b.a11y = {
                makeFocusable: function(e) {
                    return e.attr("tabIndex", "0"), e
                },
                addRole: function(e, t) {
                    return e.attr("role", t), e
                },
                addLabel: function(e, t) {
                    return e.attr("aria-label", t), e
                },
                disable: function(e) {
                    return e.attr("aria-disabled", !0), e
                },
                enable: function(e) {
                    return e.attr("aria-disabled", !1), e
                },
                onEnterKey: function(e) {
                    13 === e.keyCode && (N(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : N(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), N(e.target).is("." + b.params.bulletClass) && N(e.target)[0].click())
                },
                liveRegion: N('<span class="' + b.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(e) {
                    var t = b.a11y.liveRegion;
                    0 !== t.length && (t.html(""), t.html(e))
                },
                init: function() {
                    b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), N(b.container).append(b.a11y.liveRegion)
                },
                initPagination: function() {
                    b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function() {
                        var e = N(this);
                        b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                    })
                },
                destroy: function() {
                    b.a11y.liveRegion && 0 < b.a11y.liveRegion.length && b.a11y.liveRegion.remove()
                }
            }, b.init = function() {
                b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.zoom && b.zoom && b.zoom.init(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnavReplaceState && (b.params.replaceState = b.params.hashnavReplaceState), b.params.history && b.history && b.history.init(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
            }, b.cleanupStyles = function() {
                b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && N(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && N(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
            }, b.destroy = function(e, t) {
                b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), t && b.cleanupStyles(), b.disconnectObservers(), b.params.zoom && b.zoom && b.zoom.destroy(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.params.history && !b.params.replaceState && window.removeEventListener("popstate", b.history.setHistoryPopState), b.params.hashnav && b.hashnav && b.hashnav.destroy(), b.emit("onDestroy"), !1 !== e && (b = null)
            }, b.init(), b
        }
    };
    H.prototype = {
        isSafari: (l = window.navigator.userAgent.toLowerCase(), 0 <= l.indexOf("safari") && l.indexOf("chrome") < 0 && l.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function(e) {
            return "[object Array]" === Object.prototype.toString.apply(e)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && 1 < window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && 1 < window.navigator.maxTouchPoints,
            lteIE9: (r = document.createElement("div"), r.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === r.getElementsByTagName("i").length)
        },
        device: (i = window.navigator.userAgent, n = i.match(/(Android);?[\s\/]+([\d.]+)?/), a = i.match(/(iPad).*OS\s([\d_]+)/), o = i.match(/(iPod)(.*OS\s([\d_]+))?/), s = !a && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/), {
            ios: a || s || o,
            android: n
        }),
        support: {
            touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
            transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || (t = document.createElement("div").style, "webkitPerspective" in t || "MozPerspective" in t || "OPerspective" in t || "MsPerspective" in t || "perspective" in t),
            flexbox: function() {
                for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++)
                    if (t[i] in e) return !0
            }(),
            observer: "MutationObserver" in window || "WebkitMutationObserver" in window,
            passiveListener: function() {
                var e = !1;
                try {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, t)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in window
        },
        plugins: {}
    };
    for (var c = ["jQuery", "Zepto", "Dom7"], p = 0; p < c.length; p++) window[c[p]] && e(window[c[p]]);
    (d = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7) && ("transitionEnd" in d.fn || (d.fn.transitionEnd = function(t) {
        function i(e) {
            if (e.target === this)
                for (t.call(this, e), n = 0; n < a.length; n++) o.off(a[n], i)
        }
        var n, a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            o = this;
        if (t)
            for (n = 0; n < a.length; n++) o.on(a[n], i);
        return this
    }), "transform" in d.fn || (d.fn.transform = function(e) {
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
        }
        return this
    }), "transition" in d.fn || (d.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var t = 0; t < this.length; t++) {
            var i = this[t].style;
            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
        }
        return this
    }), "outerWidth" in d.fn || (d.fn.outerWidth = function(e) {
        return 0 < this.length ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    })), window.Swiper = H
}(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
        return window.Swiper
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, function() {
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
            if (e && t) {
                var i = this._events = this._events || {},
                    n = i[e] = i[e] || [];
                return -1 == n.indexOf(t) && n.push(t), this
            }
        }, t.once = function(e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[e] = i[e] || {})[t] = !0, this
            }
        }, t.off = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return -1 != n && i.splice(n, 1), this
            }
        }, t.emitEvent = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = 0,
                    a = i[n];
                t = t || [];
                for (var o = this._onceEvents && this._onceEvents[e]; a;) {
                    var s = o && o[a];
                    s && (this.off(e, a), delete o[a]), a.apply(this, t), a = i[n += s ? 0 : 1]
                }
                return this
            }
        }, t.allOff = t.removeAllListeners = function() {
            delete this._events, delete this._onceEvents
        }, e
    }),
    function(t, i) {
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(e) {
            return i(t, e)
        }) : "object" == typeof module && module.exports ? module.exports = i(t, require("ev-emitter")) : t.imagesLoaded = i(t, t.EvEmitter)
    }("undefined" != typeof window ? window : this, function(t, e) {
        function n(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        function a(e, t, i) {
            return this instanceof a ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = function(e) {
                var t = [];
                if (Array.isArray(e)) t = e;
                else if ("number" == typeof e.length)
                    for (var i = 0; i < e.length; i++) t.push(e[i]);
                else t.push(e);
                return t
            }(e), this.options = n({}, this.options), "function" == typeof t ? i = t : n(this.options, t), i && this.on("always", i), this.getImages(), s && (this.jqDeferred = new s.Deferred), void setTimeout(function() {
                this.check()
            }.bind(this))) : new a(e, t, i)
        }

        function i(e) {
            this.img = e
        }

        function o(e, t) {
            this.url = e, this.element = t, this.img = new Image
        }
        var s = t.jQuery,
            r = t.console;
        (a.prototype = Object.create(e.prototype)).options = {}, a.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, a.prototype.addElementImages = function(e) {
            "IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
            var t = e.nodeType;
            if (t && l[t]) {
                for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var a = i[n];
                    this.addImage(a)
                }
                if ("string" == typeof this.options.background) {
                    var o = e.querySelectorAll(this.options.background);
                    for (n = 0; n < o.length; n++) {
                        var s = o[n];
                        this.addElementBackgroundImages(s)
                    }
                }
            }
        };
        var l = {
            1: !0,
            9: !0,
            11: !0
        };
        return a.prototype.addElementBackgroundImages = function(e) {
            var t = getComputedStyle(e);
            if (t)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                    var a = n && n[2];
                    a && this.addBackground(a, e), n = i.exec(t.backgroundImage)
                }
        }, a.prototype.addImage = function(e) {
            var t = new i(e);
            this.images.push(t)
        }, a.prototype.addBackground = function(e, t) {
            var i = new o(e, t);
            this.images.push(i)
        }, a.prototype.check = function() {
            function t(e, t, i) {
                setTimeout(function() {
                    n.progress(e, t, i)
                })
            }
            var n = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
                e.once("progress", t), e.check()
            }) : void this.complete()
        }, a.prototype.progress = function(e, t, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && r && r.log("progress: " + i, e, t)
        }, a.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, (i.prototype = Object.create(e.prototype)).check = function() {
            return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, i.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, i.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
        }, i.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, i.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, i.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, i.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, (o.prototype = Object.create(i.prototype)).check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, o.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, o.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
        }, a.makeJQueryPlugin = function(e) {
            (e = e || t.jQuery) && ((s = e).fn.imagesLoaded = function(e, t) {
                return new a(this, e, t).jqDeferred.promise(s(this))
            })
        }, a.makeJQueryPlugin(), a
    }),
    function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.shuffle = t()
    }(this, function() {
        function l() {}

        function a(e) {
            return parseFloat(e) || 0
        }

        function o(e, t) {
            var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : window.getComputedStyle(e, null),
                n = a(i[t]);
            return z || "width" !== t ? z || "height" !== t || (n += a(i.paddingTop) + a(i.paddingBottom) + a(i.borderTopWidth) + a(i.borderBottomWidth)) : n += a(i.paddingLeft) + a(i.paddingRight) + a(i.borderLeftWidth) + a(i.borderRightWidth), n
        }

        function i(e, t) {
            var a = x(P, t),
                i = [].slice.call(e),
                o = !1;
            return e.length ? a.randomize ? function(e) {
                for (var t = e.length; t;) {
                    t -= 1;
                    var i = Math.floor(Math.random() * (t + 1)),
                        n = e[i];
                    e[i] = e[t], e[t] = n
                }
                return e
            }(e) : ("function" == typeof a.by && e.sort(function(e, t) {
                if (o) return 0;
                var i = a.by(e[a.key]),
                    n = a.by(t[a.key]);
                return void 0 === i && void 0 === n ? (o = !0, 0) : i < n || "sortFirst" === i || "sortLast" === n ? -1 : n < i || "sortLast" === i || "sortFirst" === n ? 1 : 0
            }), o ? i : (a.reverse && e.reverse(), e)) : []
        }

        function s(e) {
            return !!O[e] && (O[e].element.removeEventListener(L, O[e].listener), !(O[e] = null))
        }

        function r(e, t) {
            var i = L + (N += 1),
                n = function(e) {
                    e.currentTarget === e.target && (s(i), t(e))
                };
            return e.addEventListener(L, n), O[i] = {
                element: e,
                listener: n
            }, i
        }

        function c(e) {
            return Math.max.apply(Math, e)
        }

        function h(e, t, i, n) {
            var a = e / t;
            return Math.abs(Math.round(a) - a) < n && (a = Math.round(a)), Math.min(Math.ceil(a), i)
        }

        function f(e, t, i) {
            if (1 === t) return e;
            for (var n = [], a = 0; a <= i - t; a++) n.push(c(e.slice(a, a + t)));
            return n
        }

        function m(e, t) {
            for (var i = (o = e, Math.min.apply(Math, o)), n = 0, a = e.length; n < a; n++)
                if (e[n] >= i - t && e[n] <= i + t) return n;
            var o;
            return 0
        }

        function p(e, t) {
            return -1 < e.indexOf(t)
        }
        try {
            var e = new window.CustomEvent("test");
            if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
        } catch (e) {
            var t = function(e, t) {
                var i, n;
                return t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                }, (i = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n = i.preventDefault, i.preventDefault = function() {
                    n.call(this);
                    try {
                        Object.defineProperty(this, "defaultPrevented", {
                            get: function() {
                                return !0
                            }
                        })
                    } catch (e) {
                        this.defaultPrevented = !0
                    }
                }, i
            };
            t.prototype = window.Event.prototype, window.CustomEvent = t
        }
        var n, d, u, g = Element.prototype,
            v = g.matches || g.matchesSelector || g.webkitMatchesSelector || g.mozMatchesSelector || g.msMatchesSelector || g.oMatchesSelector,
            y = function(e, t) {
                if (v) return v.call(e, t);
                for (var i = e.parentNode.querySelectorAll(t), n = 0; n < i.length; n++)
                    if (i[n] == e) return !0;
                return !1
            },
            w = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
            b = (d = n = {
                exports: {}
            }, "Set" in w ? "function" == typeof Set.prototype.forEach && (u = !1, new Set([!0]).forEach(function(e) {
                u = e
            }), !0 === u) ? d.exports = function(e) {
                var t = [];
                return new Set(e).forEach(function(e) {
                    t.push(e)
                }), t
            } : d.exports = function(e) {
                var t = new Set;
                return e.filter(function(e) {
                    return !t.has(e) && (t.add(e), !0)
                })
            } : d.exports = function(e) {
                for (var t = [], i = 0; i < e.length; i++) - 1 === t.indexOf(e[i]) && t.push(e[i]);
                return t
            }, n.exports),
            x = function() {
                for (var e = {}, t = 0; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var n in i) T.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            T = Object.prototype.hasOwnProperty,
            C = function(e, t) {
                function i() {
                    s = 0, r = +new Date, o = e.apply(n, a), a = n = null
                }
                var n, a, o, s, r = 0;
                return function() {
                    n = this, a = arguments;
                    var e = new Date - r;
                    return s || (t <= e ? i() : s = setTimeout(i, t - e)), o
                }
            },
            S = function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            },
            _ = function() {
                function n(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(e, t, i) {
                    return t && n(e.prototype, t), i && n(e, i), e
                }
            }(),
            E = function() {
                function i(e, t) {
                    S(this, i), this.x = a(e), this.y = a(t)
                }
                return _(i, null, [{
                    key: "equals",
                    value: function(e, t) {
                        return e.x === t.x && e.y === t.y
                    }
                }]), i
            }(),
            k = {
                BASE: "shuffle",
                SHUFFLE_ITEM: "shuffle-item",
                VISIBLE: "shuffle-item--visible",
                HIDDEN: "shuffle-item--hidden"
            },
            I = 0,
            A = function() {
                function t(e) {
                    S(this, t), I += 1, this.id = I, this.element = e, this.isVisible = !0
                }
                return _(t, [{
                    key: "show",
                    value: function() {
                        this.isVisible = !0, this.element.classList.remove(k.HIDDEN), this.element.classList.add(k.VISIBLE)
                    }
                }, {
                    key: "hide",
                    value: function() {
                        this.isVisible = !1, this.element.classList.remove(k.VISIBLE), this.element.classList.add(k.HIDDEN)
                    }
                }, {
                    key: "init",
                    value: function() {
                        this.addClasses([k.SHUFFLE_ITEM, k.VISIBLE]), this.applyCss(t.Css.INITIAL), this.scale = t.Scale.VISIBLE, this.point = new E
                    }
                }, {
                    key: "addClasses",
                    value: function(e) {
                        var t = this;
                        e.forEach(function(e) {
                            t.element.classList.add(e)
                        })
                    }
                }, {
                    key: "removeClasses",
                    value: function(e) {
                        var t = this;
                        e.forEach(function(e) {
                            t.element.classList.remove(e)
                        })
                    }
                }, {
                    key: "applyCss",
                    value: function(t) {
                        var i = this;
                        Object.keys(t).forEach(function(e) {
                            i.element.style[e] = t[e]
                        })
                    }
                }, {
                    key: "dispose",
                    value: function() {
                        this.removeClasses([k.HIDDEN, k.VISIBLE, k.SHUFFLE_ITEM]), this.element.removeAttribute("style"), this.element = null
                    }
                }]), t
            }();
        A.Css = {
            INITIAL: {
                position: "absolute",
                top: 0,
                left: 0,
                visibility: "visible",
                "will-change": "transform"
            },
            VISIBLE: {
                before: {
                    opacity: 1,
                    visibility: "visible"
                },
                after: {}
            },
            HIDDEN: {
                before: {
                    opacity: 0
                },
                after: {
                    visibility: "hidden"
                }
            }
        }, A.Scale = {
            VISIBLE: 1,
            HIDDEN: .001
        };
        var D = document.body || document.documentElement,
            M = document.createElement("div");
        M.style.cssText = "width:10px;padding:2px;box-sizing:border-box;", D.appendChild(M);
        var z = "10px" === window.getComputedStyle(M, null).width;
        D.removeChild(M);
        var P = {
                reverse: !1,
                by: null,
                randomize: !1,
                key: "element"
            },
            O = {},
            L = "transitionend",
            N = 0,
            H = 0,
            B = function() {
                function d(e) {
                    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                    S(this, d), this.options = x(d.options, t), this.useSizer = !1, this.lastSort = {}, this.group = d.ALL_ITEMS, this.lastFilter = d.ALL_ITEMS, this.isEnabled = !0, this.isDestroyed = !1, this.isInitialized = !1, this._transitions = [], this.isTransitioning = !1, this._queue = [];
                    var i = this._getElementOption(e);
                    if (!i) throw new TypeError("Shuffle needs to be initialized with an element.");
                    this.element = i, this.id = "shuffle_" + H, H += 1, this._init(), this.isInitialized = !0
                }
                return _(d, [{
                    key: "_init",
                    value: function() {
                        this.items = this._getItems(), this.options.sizer = this._getElementOption(this.options.sizer), this.options.sizer && (this.useSizer = !0), this.element.classList.add(d.Classes.BASE), this._initItems(), this._onResize = this._getResizeFunction(), window.addEventListener("resize", this._onResize);
                        var e = window.getComputedStyle(this.element, null),
                            t = d.getSize(this.element).width;
                        this._validateStyles(e), this._setColumns(t), this.filter(this.options.group, this.options.initialSort), this.element.offsetWidth, this._setTransitions(), this.element.style.transition = "height " + this.options.speed + "ms " + this.options.easing
                    }
                }, {
                    key: "_getResizeFunction",
                    value: function() {
                        var e = this._handleResize.bind(this);
                        return this.options.throttle ? this.options.throttle(e, this.options.throttleTime) : e
                    }
                }, {
                    key: "_getElementOption",
                    value: function(e) {
                        return "string" == typeof e ? this.element.querySelector(e) : e && e.nodeType && 1 === e.nodeType ? e : e && e.jquery ? e[0] : null
                    }
                }, {
                    key: "_validateStyles",
                    value: function(e) {
                        "static" === e.position && (this.element.style.position = "relative"), "hidden" !== e.overflow && (this.element.style.overflow = "hidden")
                    }
                }, {
                    key: "_filter",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.lastFilter,
                            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.items,
                            i = this._getFilteredSets(e, t);
                        return this._toggleFilterClasses(i), "string" == typeof(this.lastFilter = e) && (this.group = e), i
                    }
                }, {
                    key: "_getFilteredSets",
                    value: function(t, e) {
                        var i = this,
                            n = [],
                            a = [];
                        return t === d.ALL_ITEMS ? n = e : e.forEach(function(e) {
                            i._doesPassFilter(t, e.element) ? n.push(e) : a.push(e)
                        }), {
                            visible: n,
                            hidden: a
                        }
                    }
                }, {
                    key: "_doesPassFilter",
                    value: function(e, t) {
                        function i(e) {
                            return p(a, e)
                        }
                        if ("function" == typeof e) return e.call(t, t, this);
                        var n = t.getAttribute("data-" + d.FILTER_ATTRIBUTE_KEY),
                            a = this.options.delimeter ? n.split(this.options.delimeter) : JSON.parse(n);
                        return Array.isArray(e) ? this.options.filterMode === d.FilterMode.ANY ? e.some(i) : e.every(i) : p(a, e)
                    }
                }, {
                    key: "_toggleFilterClasses",
                    value: function(e) {
                        var t = e.visible,
                            i = e.hidden;
                        t.forEach(function(e) {
                            e.show()
                        }), i.forEach(function(e) {
                            e.hide()
                        })
                    }
                }, {
                    key: "_initItems",
                    value: function() {
                        (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.items).forEach(function(e) {
                            e.init()
                        })
                    }
                }, {
                    key: "_disposeItems",
                    value: function() {
                        (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.items).forEach(function(e) {
                            e.dispose()
                        })
                    }
                }, {
                    key: "_updateItemCount",
                    value: function() {
                        this.visibleItems = this._getFilteredItems().length
                    }
                }, {
                    key: "_setTransitions",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.items,
                            t = this.options.speed,
                            i = this.options.easing,
                            n = this.options.useTransforms ? "transform " + t + "ms " + i + ", opacity " + t + "ms " + i : "top " + t + "ms " + i + ", left " + t + "ms " + i + ", opacity " + t + "ms " + i;
                        e.forEach(function(e) {
                            e.element.style.transition = n
                        })
                    }
                }, {
                    key: "_getItems",
                    value: function() {
                        var e, t = this;
                        return (e = this.element.children, Array.prototype.slice.call(e)).filter(function(e) {
                            return y(e, t.options.itemSelector)
                        }).map(function(e) {
                            return new A(e)
                        })
                    }
                }, {
                    key: "_updateItemsOrder",
                    value: function() {
                        var t = this.element.children;
                        this.items = i(this.items, {
                            by: function(e) {
                                return Array.prototype.indexOf.call(t, e)
                            }
                        })
                    }
                }, {
                    key: "_getFilteredItems",
                    value: function() {
                        return this.items.filter(function(e) {
                            return e.isVisible
                        })
                    }
                }, {
                    key: "_getConcealedItems",
                    value: function() {
                        return this.items.filter(function(e) {
                            return !e.isVisible
                        })
                    }
                }, {
                    key: "_getColumnSize",
                    value: function(e, t) {
                        var i = void 0;
                        return 0 === (i = "function" == typeof this.options.columnWidth ? this.options.columnWidth(e) : this.useSizer ? d.getSize(this.options.sizer).width : this.options.columnWidth ? this.options.columnWidth : 0 < this.items.length ? d.getSize(this.items[0].element, !0).width : e) && (i = e), i + t
                    }
                }, {
                    key: "_getGutterSize",
                    value: function(e) {
                        return "function" == typeof this.options.gutterWidth ? this.options.gutterWidth(e) : this.useSizer ? o(this.options.sizer, "marginLeft") : this.options.gutterWidth
                    }
                }, {
                    key: "_setColumns",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : d.getSize(this.element).width,
                            t = this._getGutterSize(e),
                            i = this._getColumnSize(e, t),
                            n = (e + t) / i;
                        Math.abs(Math.round(n) - n) < this.options.columnThreshold && (n = Math.round(n)), this.cols = Math.max(Math.floor(n), 1), this.containerWidth = e, this.colWidth = i
                    }
                }, {
                    key: "_setContainerSize",
                    value: function() {
                        this.element.style.height = this._getContainerSize() + "px"
                    }
                }, {
                    key: "_getContainerSize",
                    value: function() {
                        return c(this.positions)
                    }
                }, {
                    key: "_getStaggerAmount",
                    value: function(e) {
                        return Math.min(e * this.options.staggerAmount, this.options.staggerAmountMax)
                    }
                }, {
                    key: "_dispatch",
                    value: function(e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                        return !this.isDestroyed && !(t.shuffle = this).element.dispatchEvent(new CustomEvent(e, {
                            bubbles: !0,
                            cancelable: !1,
                            detail: t
                        }))
                    }
                }, {
                    key: "_resetCols",
                    value: function() {
                        var e = this.cols;
                        for (this.positions = []; e;) e -= 1, this.positions.push(0)
                    }
                }, {
                    key: "_layout",
                    value: function(e) {
                        var r = this,
                            l = 0;
                        e.forEach(function(e) {
                            function t() {
                                e.element.style.transitionDelay = "", e.applyCss(A.Css.VISIBLE.after)
                            }
                            var i = e.point,
                                n = e.scale,
                                a = d.getSize(e.element, !0),
                                o = r._getItemPosition(a);
                            if (E.equals(i, o) && n === A.Scale.VISIBLE) return e.applyCss(A.Css.VISIBLE.before), void t();
                            e.point = o, e.scale = A.Scale.VISIBLE;
                            var s = x(A.Css.VISIBLE.before);
                            s.transitionDelay = r._getStaggerAmount(l) + "ms", r._queue.push({
                                item: e,
                                styles: s,
                                callback: t
                            }), l += 1
                        })
                    }
                }, {
                    key: "_getItemPosition",
                    value: function(e) {
                        return function(e) {
                            for (var t = e.itemSize, i = e.positions, n = e.gridSize, a = e.total, o = e.threshold, s = e.buffer, r = h(t.width, n, a, o), l = f(i, r, a), d = m(l, s), c = new E(Math.round(n * d), Math.round(l[d])), p = l[d] + t.height, u = 0; u < r; u++) i[d + u] = p;
                            return c
                        }({
                            itemSize: e,
                            positions: this.positions,
                            gridSize: this.colWidth,
                            total: this.cols,
                            threshold: this.options.columnThreshold,
                            buffer: this.options.buffer
                        })
                    }
                }, {
                    key: "_shrink",
                    value: function() {
                        var n = this,
                            e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this._getConcealedItems(),
                            a = 0;
                        e.forEach(function(e) {
                            function t() {
                                e.applyCss(A.Css.HIDDEN.after)
                            }
                            if (e.scale === A.Scale.HIDDEN) return e.applyCss(A.Css.HIDDEN.before), void t();
                            e.scale = A.Scale.HIDDEN;
                            var i = x(A.Css.HIDDEN.before);
                            i.transitionDelay = n._getStaggerAmount(a) + "ms", n._queue.push({
                                item: e,
                                styles: i,
                                callback: t
                            }), a += 1
                        })
                    }
                }, {
                    key: "_handleResize",
                    value: function() {
                        this.isEnabled && !this.isDestroyed && d.getSize(this.element).width !== this.containerWidth && this.update()
                    }
                }, {
                    key: "_getStylesForTransition",
                    value: function(e) {
                        var t = e.item,
                            i = e.styles;
                        i.transitionDelay || (i.transitionDelay = "0ms");
                        var n = t.point.x,
                            a = t.point.y;
                        return this.options.useTransforms ? i.transform = "translate(" + n + "px, " + a + "px) scale(" + t.scale + ")" : (i.left = n + "px", i.top = a + "px"), i
                    }
                }, {
                    key: "_whenTransitionDone",
                    value: function(e, t, i) {
                        var n = r(e, function(e) {
                            t(), i(null, e)
                        });
                        this._transitions.push(n)
                    }
                }, {
                    key: "_getTransitionFunction",
                    value: function(t) {
                        var i = this;
                        return function(e) {
                            t.item.applyCss(i._getStylesForTransition(t)), i._whenTransitionDone(t.item.element, t.callback, e)
                        }
                    }
                }, {
                    key: "_processQueue",
                    value: function() {
                        this.isTransitioning && this._cancelMovement();
                        var e = 0 < this.options.speed,
                            t = 0 < this._queue.length;
                        t && e && this.isInitialized ? this._startTransitions(this._queue) : (t && this._styleImmediately(this._queue), this._dispatchLayout()), this._queue.length = 0
                    }
                }, {
                    key: "_startTransitions",
                    value: function(e) {
                        var t = this;
                        this.isTransitioning = !0,
                            function(e, i, n) {
                                function a(i) {
                                    return function(e, t) {
                                        if (!s) {
                                            if (e) return n(e, r), void(s = !0);
                                            r[i] = t, --o || n(null, r)
                                        }
                                    }
                                }
                                n || ("function" == typeof i ? (n = i, i = null) : n = l);
                                var o = e && e.length;
                                if (!o) return n(null, []);
                                var s = !1,
                                    r = new Array(o);
                                e.forEach(i ? function(e, t) {
                                    e.call(i, a(t))
                                } : function(e, t) {
                                    e(a(t))
                                })
                            }(e.map(function(e) {
                                return t._getTransitionFunction(e)
                            }), this._movementFinished.bind(this))
                    }
                }, {
                    key: "_cancelMovement",
                    value: function() {
                        this._transitions.forEach(s), this._transitions.length = 0, this.isTransitioning = !1
                    }
                }, {
                    key: "_styleImmediately",
                    value: function(e) {
                        var t = this;
                        if (e.length) {
                            var i = e.map(function(e) {
                                return e.item.element
                            });
                            d._skipTransitions(i, function() {
                                e.forEach(function(e) {
                                    e.item.applyCss(t._getStylesForTransition(e)), e.callback()
                                })
                            })
                        }
                    }
                }, {
                    key: "_movementFinished",
                    value: function() {
                        this._transitions.length = 0, this.isTransitioning = !1, this._dispatchLayout()
                    }
                }, {
                    key: "_dispatchLayout",
                    value: function() {
                        this._dispatch(d.EventType.LAYOUT)
                    }
                }, {
                    key: "filter",
                    value: function(e, t) {
                        this.isEnabled && ((!e || e && 0 === e.length) && (e = d.ALL_ITEMS), this._filter(e), this._shrink(), this._updateItemCount(), this.sort(t))
                    }
                }, {
                    key: "sort",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.lastSort;
                        if (this.isEnabled) {
                            this._resetCols();
                            var t = this._getFilteredItems();
                            t = i(t, e), this._layout(t), this._processQueue(), this._setContainerSize(), this.lastSort = e
                        }
                    }
                }, {
                    key: "update",
                    value: function(e) {
                        this.isEnabled && (e || this._setColumns(), this.sort())
                    }
                }, {
                    key: "layout",
                    value: function() {
                        this.update(!0)
                    }
                }, {
                    key: "add",
                    value: function(e) {
                        var t = b(e).map(function(e) {
                            return new A(e)
                        });
                        this._initItems(t), this._setTransitions(t), this.items = this.items.concat(t), this._updateItemsOrder(), this.filter(this.lastFilter)
                    }
                }, {
                    key: "disable",
                    value: function() {
                        this.isEnabled = !1
                    }
                }, {
                    key: "enable",
                    value: function(e) {
                        !(this.isEnabled = !0) !== e && this.update()
                    }
                }, {
                    key: "remove",
                    value: function(e) {
                        var t = this;
                        if (e.length) {
                            var i = b(e),
                                n = i.map(function(e) {
                                    return t.getItemByElement(e)
                                }).filter(function(e) {
                                    return !!e
                                });
                            this._toggleFilterClasses({
                                visible: [],
                                hidden: n
                            }), this._shrink(n), this.sort(), this.items = this.items.filter(function(e) {
                                return !p(n, e)
                            }), this._updateItemCount(), this.element.addEventListener(d.EventType.LAYOUT, function e() {
                                t.element.removeEventListener(d.EventType.LAYOUT, e), t._disposeItems(n), i.forEach(function(e) {
                                    e.parentNode.removeChild(e)
                                }), t._dispatch(d.EventType.REMOVED, {
                                    collection: i
                                })
                            })
                        }
                    }
                }, {
                    key: "getItemByElement",
                    value: function(e) {
                        for (var t = this.items.length - 1; 0 <= t; t--)
                            if (this.items[t].element === e) return this.items[t];
                        return null
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this._cancelMovement(), window.removeEventListener("resize", this._onResize), this.element.classList.remove("shuffle"), this.element.removeAttribute("style"), this._disposeItems(), this.items = null, this.options.sizer = null, this.element = null, this._transitions = null, this.isDestroyed = !0
                    }
                }], [{
                    key: "getSize",
                    value: function(e, t) {
                        var i = window.getComputedStyle(e, null),
                            n = o(e, "width", i),
                            a = o(e, "height", i);
                        t && (n += o(e, "marginLeft", i) + o(e, "marginRight", i), a += o(e, "marginTop", i) + o(e, "marginBottom", i));
                        return {
                            width: n,
                            height: a
                        }
                    }
                }, {
                    key: "_skipTransitions",
                    value: function(e, t) {
                        var i = e.map(function(e) {
                            var t = e.style,
                                i = t.transitionDuration,
                                n = t.transitionDelay;
                            return t.transitionDuration = "0ms", t.transitionDelay = "0ms", {
                                duration: i,
                                delay: n
                            }
                        });
                        t(), e[0].offsetWidth, e.forEach(function(e, t) {
                            e.style.transitionDuration = i[t].duration, e.style.transitionDelay = i[t].delay
                        })
                    }
                }]), d
            }();
        return B.ShuffleItem = A, B.ALL_ITEMS = "all", B.FILTER_ATTRIBUTE_KEY = "groups", B.EventType = {
            LAYOUT: "shuffle:layout",
            REMOVED: "shuffle:removed"
        }, B.Classes = k, B.FilterMode = {
            ANY: "any",
            ALL: "all"
        }, B.options = {
            group: B.ALL_ITEMS,
            speed: 250,
            easing: "ease",
            itemSelector: "*",
            sizer: null,
            gutterWidth: 0,
            columnWidth: 0,
            delimeter: null,
            buffer: 0,
            columnThreshold: .01,
            initialSort: null,
            throttle: C,
            throttleTime: 300,
            staggerAmount: 15,
            staggerAmountMax: 250,
            useTransforms: !0,
            filterMode: B.FilterMode.ANY
        }, B.__Point = E, B.__sorter = i, B.__getColumnSpan = h, B.__getAvailablePositions = f, B.__getShortColumn = m, B
    }),
    function() {
        function t(e) {
            if (!e) throw new Error("No options passed to Waypoint constructor");
            if (!e.element) throw new Error("No element option passed to Waypoint constructor");
            if (!e.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + i, this.options = t.Adapter.extend({}, t.defaults, e), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = e.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), o[this.key] = this, i += 1
        }
        var i = 0,
            o = {};
        t.prototype.queueTrigger = function(e) {
            this.group.queueTrigger(this, e)
        }, t.prototype.trigger = function(e) {
            this.enabled && this.callback && this.callback.apply(this, e)
        }, t.prototype.destroy = function() {
            this.context.remove(this), this.group.remove(this), delete o[this.key]
        }, t.prototype.disable = function() {
            return this.enabled = !1, this
        }, t.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, t.prototype.next = function() {
            return this.group.next(this)
        }, t.prototype.previous = function() {
            return this.group.previous(this)
        }, t.invokeAll = function(e) {
            var t = [];
            for (var i in o) t.push(o[i]);
            for (var n = 0, a = t.length; n < a; n++) t[n][e]()
        }, t.destroyAll = function() {
            t.invokeAll("destroy")
        }, t.disableAll = function() {
            t.invokeAll("disable")
        }, t.enableAll = function() {
            for (var e in t.Context.refreshAll(), o) o[e].enabled = !0;
            return this
        }, t.refreshAll = function() {
            t.Context.refreshAll()
        }, t.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, t.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, t.adapters = [], t.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, t.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = t
    }(),
    function() {
        function t(e) {
            window.setTimeout(e, 1e3 / 60)
        }

        function i(e) {
            this.element = e, this.Adapter = g.Adapter, this.adapter = new this.Adapter(e), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, e.waypointContextKey = this.key, a[e.waypointContextKey] = this, n += 1, g.windowContext || (g.windowContext = !0, g.windowContext = new i(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var n = 0,
            a = {},
            g = window.Waypoint,
            e = window.onload;
        i.prototype.add = function(e) {
            var t = e.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[t][e.key] = e, this.refresh()
        }, i.prototype.checkEmpty = function() {
            var e = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                t = this.Adapter.isEmptyObject(this.waypoints.vertical),
                i = this.element == this.element.window;
            e && t && !i && (this.adapter.off(".waypoints"), delete a[this.key])
        }, i.prototype.createThrottledResizeHandler = function() {
            function e() {
                t.handleResize(), t.didResize = !1
            }
            var t = this;
            this.adapter.on("resize.waypoints", function() {
                t.didResize || (t.didResize = !0, g.requestAnimationFrame(e))
            })
        }, i.prototype.createThrottledScrollHandler = function() {
            function e() {
                t.handleScroll(), t.didScroll = !1
            }
            var t = this;
            this.adapter.on("scroll.waypoints", function() {
                (!t.didScroll || g.isTouch) && (t.didScroll = !0, g.requestAnimationFrame(e))
            })
        }, i.prototype.handleResize = function() {
            g.Context.refreshAll()
        }, i.prototype.handleScroll = function() {
            var e = {},
                t = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var i in t) {
                var n = t[i],
                    a = n.newScroll > n.oldScroll ? n.forward : n.backward;
                for (var o in this.waypoints[i]) {
                    var s = this.waypoints[i][o];
                    if (null !== s.triggerPoint) {
                        var r = n.oldScroll < s.triggerPoint,
                            l = n.newScroll >= s.triggerPoint;
                        (r && l || !r && !l) && (s.queueTrigger(a), e[s.group.id] = s.group)
                    }
                }
            }
            for (var d in e) e[d].flushTriggers();
            this.oldScroll = {
                x: t.horizontal.newScroll,
                y: t.vertical.newScroll
            }
        }, i.prototype.innerHeight = function() {
            return this.element == this.element.window ? g.viewportHeight() : this.adapter.innerHeight()
        }, i.prototype.remove = function(e) {
            delete this.waypoints[e.axis][e.key], this.checkEmpty()
        }, i.prototype.innerWidth = function() {
            return this.element == this.element.window ? g.viewportWidth() : this.adapter.innerWidth()
        }, i.prototype.destroy = function() {
            var e = [];
            for (var t in this.waypoints)
                for (var i in this.waypoints[t]) e.push(this.waypoints[t][i]);
            for (var n = 0, a = e.length; n < a; n++) e[n].destroy()
        }, i.prototype.refresh = function() {
            var e, t = this.element == this.element.window,
                i = t ? void 0 : this.adapter.offset(),
                n = {};
            for (var a in this.handleScroll(), e = {
                    horizontal: {
                        contextOffset: t ? 0 : i.left,
                        contextScroll: t ? 0 : this.oldScroll.x,
                        contextDimension: this.innerWidth(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: t ? 0 : i.top,
                        contextScroll: t ? 0 : this.oldScroll.y,
                        contextDimension: this.innerHeight(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                }) {
                var o = e[a];
                for (var s in this.waypoints[a]) {
                    var r, l, d, c, p = this.waypoints[a][s],
                        u = p.options.offset,
                        h = p.triggerPoint,
                        f = 0,
                        m = null == h;
                    p.element !== p.element.window && (f = p.adapter.offset()[o.offsetProp]), "function" == typeof u ? u = u.apply(p) : "string" == typeof u && (u = parseFloat(u), -1 < p.options.offset.indexOf("%") && (u = Math.ceil(o.contextDimension * u / 100))), r = o.contextScroll - o.contextOffset, p.triggerPoint = Math.floor(f + r - u), l = h < o.oldScroll, d = p.triggerPoint >= o.oldScroll, c = !l && !d, !m && (l && d) ? (p.queueTrigger(o.backward), n[p.group.id] = p.group) : !m && c ? (p.queueTrigger(o.forward), n[p.group.id] = p.group) : m && o.oldScroll >= p.triggerPoint && (p.queueTrigger(o.forward), n[p.group.id] = p.group)
                }
            }
            return g.requestAnimationFrame(function() {
                for (var e in n) n[e].flushTriggers()
            }), this
        }, i.findOrCreateByElement = function(e) {
            return i.findByElement(e) || new i(e)
        }, i.refreshAll = function() {
            for (var e in a) a[e].refresh()
        }, i.findByElement = function(e) {
            return a[e.waypointContextKey]
        }, window.onload = function() {
            e && e(), i.refreshAll()
        }, g.requestAnimationFrame = function(e) {
            (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t).call(window, e)
        }, g.Context = i
    }(),
    function() {
        function s(e, t) {
            return e.triggerPoint - t.triggerPoint
        }

        function r(e, t) {
            return t.triggerPoint - e.triggerPoint
        }

        function t(e) {
            this.name = e.name, this.axis = e.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
        }
        var i = {
                vertical: {},
                horizontal: {}
            },
            n = window.Waypoint;
        t.prototype.add = function(e) {
            this.waypoints.push(e)
        }, t.prototype.clearTriggerQueues = function() {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }, t.prototype.flushTriggers = function() {
            for (var e in this.triggerQueues) {
                var t = this.triggerQueues[e],
                    i = "up" === e || "left" === e;
                t.sort(i ? r : s);
                for (var n = 0, a = t.length; n < a; n += 1) {
                    var o = t[n];
                    (o.options.continuous || n === t.length - 1) && o.trigger([e])
                }
            }
            this.clearTriggerQueues()
        }, t.prototype.next = function(e) {
            this.waypoints.sort(s);
            var t = n.Adapter.inArray(e, this.waypoints);
            return t === this.waypoints.length - 1 ? null : this.waypoints[t + 1]
        }, t.prototype.previous = function(e) {
            this.waypoints.sort(s);
            var t = n.Adapter.inArray(e, this.waypoints);
            return t ? this.waypoints[t - 1] : null
        }, t.prototype.queueTrigger = function(e, t) {
            this.triggerQueues[t].push(e)
        }, t.prototype.remove = function(e) {
            var t = n.Adapter.inArray(e, this.waypoints); - 1 < t && this.waypoints.splice(t, 1)
        }, t.prototype.first = function() {
            return this.waypoints[0]
        }, t.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, t.findOrCreate = function(e) {
            return i[e.axis][e.name] || new t(e)
        }, n.Group = t
    }(),
    function() {
        function i(e) {
            this.$element = n(e)
        }
        var n = window.jQuery,
            e = window.Waypoint;
        n.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, t) {
            i.prototype[t] = function() {
                var e = Array.prototype.slice.call(arguments);
                return this.$element[t].apply(this.$element, e)
            }
        }), n.each(["extend", "inArray", "isEmptyObject"], function(e, t) {
            i[t] = n[t]
        }), e.adapters.push({
            name: "jquery",
            Adapter: i
        }), e.Adapter = i
    }(),
    function() {
        function e(n) {
            return function() {
                var t = [],
                    i = arguments[0];
                return n.isFunction(arguments[0]) && ((i = n.extend({}, arguments[1])).handler = arguments[0]), this.each(function() {
                    var e = n.extend({}, i, {
                        element: this
                    });
                    "string" == typeof e.context && (e.context = n(this).closest(e.context)[0]), t.push(new a(e))
                }), t
            }
        }
        var a = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = e(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = e(window.Zepto))
    }(),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
    }(function(o) {
        var s = function(e, t) {
            this.$element = o(e), this.options = o.extend({}, s.DEFAULTS, this.dataOptions(), t), this.init()
        };
        s.DEFAULTS = {
            from: 0,
            to: 0,
            speed: 1e3,
            refreshInterval: 100,
            decimals: 0,
            formatter: function(e, t) {
                return e.toFixed(t.decimals)
            },
            onUpdate: null,
            onComplete: null
        }, s.prototype.init = function() {
            this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops
        }, s.prototype.dataOptions = function() {
            var e = {
                    from: this.$element.data("from"),
                    to: this.$element.data("to"),
                    speed: this.$element.data("speed"),
                    refreshInterval: this.$element.data("refresh-interval"),
                    decimals: this.$element.data("decimals")
                },
                t = Object.keys(e);
            for (var i in t) {
                var n = t[i];
                void 0 === e[n] && delete e[n]
            }
            return e
        }, s.prototype.update = function() {
            this.value += this.increment, this.loopCount++, this.render(), "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value))
        }, s.prototype.render = function() {
            var e = this.options.formatter.call(this.$element, this.value, this.options);
            this.$element.text(e)
        }, s.prototype.restart = function() {
            this.stop(), this.init(), this.start()
        }, s.prototype.start = function() {
            this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval)
        }, s.prototype.stop = function() {
            this.interval && clearInterval(this.interval)
        }, s.prototype.toggle = function() {
            this.interval ? this.stop() : this.start()
        }, o.fn.countTo = function(a) {
            return this.each(function() {
                var e = o(this),
                    t = e.data("countTo"),
                    i = "object" == typeof a ? a : {},
                    n = "string" == typeof a ? a : "start";
                (!t || "object" == typeof a) && (t && t.stop(), e.data("countTo", t = new s(this, i))), t[n].call(t)
            })
        }
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    }(function(a) {
        var o = [],
            t = [],
            n = {
                precision: 100,
                elapse: !1,
                defer: !1
            };
        t.push(/^[0-9]*$/.source), t.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), t.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), t = new RegExp(t.join("|"));
        var g = {
                Y: "years",
                m: "months",
                n: "daysToMonth",
                d: "daysToWeek",
                w: "weeks",
                W: "weeksToMonth",
                H: "hours",
                M: "minutes",
                S: "seconds",
                D: "totalDays",
                I: "totalHours",
                N: "totalMinutes",
                T: "totalSeconds"
            },
            s = function(e, t, i) {
                this.el = e, this.$el = a(e), this.interval = null, this.offset = {}, this.options = a.extend({}, n), this.instanceNumber = o.length, o.push(this), this.$el.data("countdown-instance", this.instanceNumber), i && ("function" == typeof i ? (this.$el.on("update.countdown", i), this.$el.on("stoped.countdown", i), this.$el.on("finish.countdown", i)) : this.options = a.extend({}, n, i)), this.setFinalDate(t), !1 === this.options.defer && this.start()
            };
        a.extend(s.prototype, {
            start: function() {
                null !== this.interval && clearInterval(this.interval);
                var e = this;
                this.update(), this.interval = setInterval(function() {
                    e.update.call(e)
                }, this.options.precision)
            },
            stop: function() {
                clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
            },
            toggle: function() {
                this.interval ? this.stop() : this.start()
            },
            pause: function() {
                this.stop()
            },
            resume: function() {
                this.start()
            },
            remove: function() {
                this.stop.call(this), o[this.instanceNumber] = null, delete this.$el.data().countdownInstance
            },
            setFinalDate: function(e) {
                this.finalDate = function(e) {
                    if (e instanceof Date) return e;
                    if (String(e).match(t)) return String(e).match(/^[0-9]*$/) && (e = Number(e)), String(e).match(/\-/) && (e = String(e).replace(/\-/g, "/")), new Date(e);
                    throw new Error("Couldn't cast `" + e + "` to a date object.")
                }(e)
            },
            update: function() {
                if (0 !== this.$el.closest("html").length) {
                    var e, t = void 0 !== a._data(this.el, "events"),
                        i = new Date;
                    e = this.finalDate.getTime() - i.getTime(), e = Math.ceil(e / 1e3), e = !this.options.elapse && e < 0 ? 0 : Math.abs(e), this.totalSecsLeft !== e && t && (this.totalSecsLeft = e, this.elapsed = i >= this.finalDate, this.offset = {
                        seconds: this.totalSecsLeft % 60,
                        minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                        hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                        days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                        daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                        daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                        weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                        weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                        months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                        years: Math.abs(this.finalDate.getFullYear() - i.getFullYear()),
                        totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                        totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                        totalMinutes: Math.floor(this.totalSecsLeft / 60),
                        totalSeconds: this.totalSecsLeft
                    }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))
                } else this.remove()
            },
            dispatchEvent: function(e) {
                var m, t = a.Event(e + ".countdown");
                t.finalDate = this.finalDate, t.elapsed = this.elapsed, t.offset = a.extend({}, this.offset), t.strftime = (m = this.offset, function(e) {
                    var t, i, n, a, o, s, r = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
                    if (r)
                        for (var l = 0, d = r.length; l < d; ++l) {
                            var c = r[l].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                                p = (o = c[0], s = o.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), new RegExp(s)),
                                u = c[1] || "",
                                h = c[3] || "",
                                f = null;
                            c = c[2], g.hasOwnProperty(c) && (f = g[c], f = Number(m[f])), null !== f && ("!" === u && (i = f, a = n = void 0, n = "s", a = "", (t = h) && (t = t.replace(/(:|;|\s)/gi, "").split(/\,/), n = 1 === t.length ? t[0] : (a = t[0], t[1])), f = 1 < Math.abs(i) ? n : a), "" === u && f < 10 && (f = "0" + f.toString()), e = e.replace(p, f.toString()))
                        }
                    return e.replace(/%%/, "%")
                }), this.$el.trigger(t)
            }
        }), a.fn.countdown = function() {
            var n = Array.prototype.slice.call(arguments, 0);
            return this.each(function() {
                var e = a(this).data("countdown-instance");
                if (void 0 !== e) {
                    var t = o[e],
                        i = n[0];
                    s.prototype.hasOwnProperty(i) ? t[i].apply(t, n.slice(1)) : null === String(i).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (t.setFinalDate.call(t, i), t.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, i))
                } else new s(this, n[0], n[1])
            })
        }
    }),
    function(a) {
        var o = function(e, t) {
            this.el = a(e), this.options = a.extend({}, a.fn.typed.defaults, t), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
        };
        o.prototype = {
            constructor: o,
            init: function() {
                var t = this;
                t.timeout = setTimeout(function() {
                    for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
                    t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
                }, t.startDelay)
            },
            build: function() {
                var i = this;
                if (!0 === this.showCursor && (this.cursor = a('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                    this.strings = [], this.stringsElement.hide(), console.log(this.stringsElement.children());
                    var e = this.stringsElement.children();
                    a.each(e, function(e, t) {
                        i.strings.push(a(t).html())
                    })
                }
                this.init()
            },
            typewrite: function(o, s) {
                if (!0 !== this.stop) {
                    var e = Math.round(70 * Math.random()) + this.typeSpeed,
                        r = this;
                    r.timeout = setTimeout(function() {
                        var e = 0,
                            t = o.substr(s);
                        if ("^" === t.charAt(0)) {
                            var i = 1;
                            /^\^\d+/.test(t) && (i += (t = /\d+/.exec(t)[0]).length, e = parseInt(t)), o = o.substring(0, s) + o.substring(s + i)
                        }
                        if ("html" === r.contentType) {
                            var n = o.substr(s).charAt(0);
                            if ("<" === n || "&" === n) {
                                var a;
                                for (a = "<" === n ? ">" : ";"; o.substr(s + 1).charAt(0) !== a && (o.substr(s).charAt(0), !(++s + 1 > o.length)););
                                s++, a
                            }
                        }
                        r.timeout = setTimeout(function() {
                            if (s === o.length) {
                                if (r.options.onStringTyped(r.arrayPos), r.arrayPos === r.strings.length - 1 && (r.options.callback(), r.curLoop++, !1 === r.loop || r.curLoop === r.loopCount)) return;
                                r.timeout = setTimeout(function() {
                                    r.backspace(o, s)
                                }, r.backDelay)
                            } else {
                                0 === s && r.options.preStringTyped(r.arrayPos);
                                var e = o.substr(0, s + 1);
                                r.attr ? r.el.attr(r.attr, e) : r.isInput ? r.el.val(e) : "html" === r.contentType ? r.el.html(e) : r.el.text(e), s++, r.typewrite(o, s)
                            }
                        }, e)
                    }, e)
                }
            },
            backspace: function(t, i) {
                if (!0 !== this.stop) {
                    var e = Math.round(70 * Math.random()) + this.backSpeed,
                        n = this;
                    n.timeout = setTimeout(function() {
                        if ("html" === n.contentType && ">" === t.substr(i).charAt(0)) {
                            for (;
                                "<" !== t.substr(i - 1).charAt(0) && (t.substr(i).charAt(0), !(--i < 0)););
                            i--, "<"
                        }
                        var e = t.substr(0, i);
                        n.attr ? n.el.attr(n.attr, e) : n.isInput ? n.el.val(e) : "html" === n.contentType ? n.el.html(e) : n.el.text(e), i > n.stopNum ? (i--, n.backspace(t, i)) : i <= n.stopNum && (n.arrayPos++, n.arrayPos === n.strings.length ? (n.arrayPos = 0, n.shuffle && (n.sequence = n.shuffleArray(n.sequence)), n.init()) : n.typewrite(n.strings[n.sequence[n.arrayPos]], i))
                    }, e)
                }
            },
            shuffleArray: function(e) {
                var t, i, n = e.length;
                if (n)
                    for (; --n;) t = e[i = Math.floor(Math.random() * (n + 1))], e[i] = e[n], e[n] = t;
                return e
            },
            reset: function() {
                clearInterval(this.timeout), this.el.attr("id"), this.el.empty(), void 0 !== this.cursor && this.cursor.remove(), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
            }
        }, a.fn.typed = function(n) {
            return this.each(function() {
                var e = a(this),
                    t = e.data("typed"),
                    i = "object" == typeof n && n;
                t && t.reset(), e.data("typed", t = new o(this, i)), "string" == typeof n && t[n]()
            })
        }, a.fn.typed.defaults = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            shuffle: !1,
            backDelay: 500,
            loop: !1,
            loopCount: !1,
            showCursor: !0,
            cursorChar: "|",
            attr: null,
            contentType: "html",
            callback: function() {},
            preStringTyped: function() {},
            onStringTyped: function() {},
            resetCallback: function() {}
        }
    }(window.jQuery),
    function(r, l) {
        function t(n, e) {
            function a() {
                this.x = Math.random() * n.width, this.y = Math.random() * n.height, this.vx = s.velocity - .5 * Math.random(), this.vy = s.velocity - .5 * Math.random(), this.radius = Math.random() * s.star.width
            }
            var t = r(n),
                o = n.getContext("2d"),
                i = {
                    star: {
                        color: "rgba(224, 224, 224, .7)",
                        width: 1
                    },
                    line: {
                        color: "rgba(224, 224, 224, .7)",
                        width: .2
                    },
                    position: {
                        x: 0,
                        y: 0
                    },
                    width: l.innerWidth,
                    height: l.innerHeight,
                    velocity: .1,
                    length: 100,
                    distance: 100,
                    radius: 150,
                    stars: []
                },
                s = r.extend(!0, {}, i, e);
            a.prototype = {
                create: function() {
                    o.beginPath(), o.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1), o.fill()
                },
                animate: function() {
                    var e;
                    for (e = 0; e < s.length; e++) {
                        var t = s.stars[e];
                        t.y < 0 || t.y > n.height ? (t.vx = t.vx, t.vy = -t.vy) : (t.x < 0 || t.x > n.width) && (t.vx = -t.vx, t.vy = t.vy), t.x += t.vx, t.y += t.vy
                    }
                },
                line: function() {
                    var e, t, i, n, a = s.length;
                    for (i = 0; i < a; i++)
                        for (n = 0; n < a; n++) e = s.stars[i], t = s.stars[n], e.x - t.x < s.distance && e.y - t.y < s.distance && e.x - t.x > -s.distance && e.y - t.y > -s.distance && e.x - s.position.x < s.radius && e.y - s.position.y < s.radius && e.x - s.position.x > -s.radius && e.y - s.position.y > -s.radius && (o.beginPath(), o.moveTo(e.x, e.y), o.lineTo(t.x, t.y), o.stroke(), o.closePath())
                }
            }, this.createStars = function() {
                var e, t, i = s.length;
                for (o.clearRect(0, 0, n.width, n.height), t = 0; t < i; t++) s.stars.push(new a), (e = s.stars[t]).create();
                e.line(), e.animate()
            }, this.setCanvas = function() {
                n.width = s.width, n.height = s.height
            }, this.setContext = function() {
                o.fillStyle = s.star.color, o.strokeStyle = s.line.color, o.lineWidth = s.line.width
            }, this.setInitialPosition = function() {
                e && e.hasOwnProperty("position") || (s.position = {
                    x: .5 * n.width,
                    y: .5 * n.height
                })
            }, this.loop = function(e) {
                e(), l.requestAnimationFrame(function() {
                    this.loop(e)
                }.bind(this))
            }, this.bind = function() {
                r(document).on("mousemove", function(e) {
                    s.position.x = e.pageX - t.offset().left, s.position.y = e.pageY - t.offset().top
                })
            }, this.init = function() {
                this.setCanvas(), this.setContext(), this.setInitialPosition(), this.loop(this.createStars), this.bind()
            }
        }
        r.fn.constellation = function(e) {
            return this.each(function() {
                new t(this, e).init()
            })
        }
    }($, window),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
    }(function(u) {
        function t(e) {
            var t = e || window.event,
                i = v.call(arguments, 1),
                n = 0,
                a = 0,
                o = 0,
                s = 0,
                r = 0,
                l = 0;
            if ((e = u.event.fix(t)).type = "mousewheel", "detail" in t && (o = -1 * t.detail), "wheelDelta" in t && (o = t.wheelDelta), "wheelDeltaY" in t && (o = t.wheelDeltaY), "wheelDeltaX" in t && (a = -1 * t.wheelDeltaX), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (a = -1 * o, o = 0), n = 0 === o ? a : o, "deltaY" in t && (n = o = -1 * t.deltaY), "deltaX" in t && (a = t.deltaX, 0 === o && (n = -1 * a)), 0 !== o || 0 !== a) {
                if (1 === t.deltaMode) {
                    var d = u.data(this, "mousewheel-line-height");
                    n *= d, o *= d, a *= d
                } else if (2 === t.deltaMode) {
                    var c = u.data(this, "mousewheel-page-height");
                    n *= c, o *= c, a *= c
                }
                if (s = Math.max(Math.abs(o), Math.abs(a)), (!g || s < g) && (f(t, g = s) && (g /= 40)), f(t, s) && (n /= 40, a /= 40, o /= 40), n = Math[1 <= n ? "floor" : "ceil"](n / g), a = Math[1 <= a ? "floor" : "ceil"](a / g), o = Math[1 <= o ? "floor" : "ceil"](o / g), y.settings.normalizeOffset && this.getBoundingClientRect) {
                    var p = this.getBoundingClientRect();
                    r = e.clientX - p.left, l = e.clientY - p.top
                }
                return e.deltaX = a, e.deltaY = o, e.deltaFactor = g, e.offsetX = r, e.offsetY = l, e.deltaMode = 0, i.unshift(e, n, a, o), m && clearTimeout(m), m = setTimeout(h, 200), (u.event.dispatch || u.event.handle).apply(this, i)
            }
        }

        function h() {
            g = null
        }

        function f(e, t) {
            return y.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 == 0
        }
        var m, g, e = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            i = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            v = Array.prototype.slice;
        if (u.event.fixHooks)
            for (var n = e.length; n;) u.event.fixHooks[e[--n]] = u.event.mouseHooks;
        var y = u.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var e = i.length; e;) this.addEventListener(i[--e], t, !1);
                else this.onmousewheel = t;
                u.data(this, "mousewheel-line-height", y.getLineHeight(this)), u.data(this, "mousewheel-page-height", y.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var e = i.length; e;) this.removeEventListener(i[--e], t, !1);
                else this.onmousewheel = null;
                u.removeData(this, "mousewheel-line-height"), u.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(e) {
                var t = u(e),
                    i = t["offsetParent" in u.fn ? "offsetParent" : "parent"]();
                return i.length || (i = u("body")), parseInt(i.css("fontSize"), 10) || parseInt(t.css("fontSize"), 10) || 16
            },
            getPageHeight: function(e) {
                return u(e).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        u.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }),
    function() {
        if ("objectFit" in document.documentElement.style == 0) {
            var d = function(e, t, i) {
                    var n, a, o, s, r;
                    if ((i = i.split(" ")).length < 2 && (i[1] = i[0]), "x" === e) n = i[0], a = i[1], o = "left", s = "right", r = t.clientWidth;
                    else {
                        if ("y" !== e) return;
                        n = i[1], a = i[0], o = "top", s = "bottom", r = t.clientHeight
                    }
                    return n === o || a === o ? void(t.style[o] = "0") : n === s || a === s ? void(t.style[s] = "0") : "center" === n || "50%" === n ? (t.style[o] = "50%", void(t.style["margin-" + o] = r / -2 + "px")) : 0 <= n.indexOf("%") ? void((n = parseInt(n)) < 50 ? (t.style[o] = n + "%", t.style["margin-" + o] = r * (n / -100) + "px") : (n = 100 - n, t.style[s] = n + "%", t.style["margin-" + s] = r * (n / -100) + "px")) : void(t.style[o] = n)
                },
                n = function(e) {
                    var t = e.dataset ? e.dataset.objectFit : e.getAttribute("data-object-fit"),
                        i = e.dataset ? e.dataset.objectPosition : e.getAttribute("data-object-position");
                    t = t || "cover", i = i || "50% 50%";
                    var n, a, o, s, r, l = e.parentNode;
                    n = l, a = window.getComputedStyle(n, null), o = a.getPropertyValue("position"), s = a.getPropertyValue("overflow"), r = a.getPropertyValue("display"), o && "static" !== o || (n.style.position = "relative"), "hidden" !== s && (n.style.overflow = "hidden"), r && "inline" !== r || (n.style.display = "block"), 0 === n.clientHeight && (n.style.height = "100%"), -1 === n.className.indexOf("object-fit-polyfill") && (n.className = n.className + " object-fit-polyfill"),
                        function(e) {
                            var t = window.getComputedStyle(e, null),
                                i = {
                                    "max-width": "none",
                                    "max-height": "none",
                                    "min-width": "0px",
                                    "min-height": "0px",
                                    top: "auto",
                                    right: "auto",
                                    bottom: "auto",
                                    left: "auto",
                                    "margin-top": "0px",
                                    "margin-right": "0px",
                                    "margin-bottom": "0px",
                                    "margin-left": "0px"
                                };
                            for (var n in i) t.getPropertyValue(n) !== i[n] && (e.style[n] = i[n])
                        }(e), e.style.position = "absolute", e.style.height = "100%", e.style.width = "auto", "scale-down" === t && (e.style.height = "auto", e.clientWidth < l.clientWidth && e.clientHeight < l.clientHeight ? (d("x", e, i), d("y", e, i)) : (t = "contain", e.style.height = "100%")), "none" === t ? (e.style.width = "auto", e.style.height = "auto", d("x", e, i), d("y", e, i)) : "cover" === t && e.clientWidth > l.clientWidth || "contain" === t && e.clientWidth < l.clientWidth ? (e.style.top = "0", e.style.marginTop = "0", d("x", e, i)) : "scale-down" !== t && (e.style.width = "100%", e.style.height = "auto", e.style.left = "0", e.style.marginLeft = "0", d("y", e, i))
                },
                e = function(e) {
                    if (void 0 === e) e = document.querySelectorAll("[data-object-fit]");
                    else if (e && e.nodeName) e = [e];
                    else {
                        if ("object" != typeof e || !e.length || !e[0].nodeName) return !1;
                        e = e
                    }
                    for (var t = 0; t < e.length; t++)
                        if (e[t].nodeName) {
                            var i = e[t].nodeName.toLowerCase();
                            "img" === i ? e[t].complete ? n(e[t]) : e[t].addEventListener("load", function() {
                                n(this)
                            }) : "video" === i && (0 < e[t].readyState ? n(e[t]) : e[t].addEventListener("loadedmetadata", function() {
                                n(this)
                            }))
                        }
                    return !0
                };
            document.addEventListener("DOMContentLoaded", function() {
                e()
            }), window.addEventListener("resize", function() {
                e()
            }), window.objectFitPolyfill = e
        } else window.objectFitPolyfill = function() {
            return !1
        }
    }(), window.jQuery = window.$ = jQuery,
    function(e, t) {
        var i = {
            name: "briefcasewp-extras",
            version: "1.3.4",
            defaults: {
                googleApiKey: "",
                googleAnalyticsId: null,
                smoothScroll: !0,
                contactFormAction: ""
            },
            breakpoint: {
                xs: 576,
                sm: 768,
                md: 992,
                lg: 1200
            }
        };
        window.page = i
    }(jQuery), page.init = function() {
        page.topbar(), page.parallax(), page.swiper(), page.scroll(), page.counter(), page.aos(), page.typing(), page.particle(), page.contact(), page.shuffle(), page.bindValue(), $(document).on("click", '[data-provide~="lightbox"]', lity), $(document).on("click", ".video-wrapper .btn", function() {
            var e = $(this).closest(".video-wrapper");
            if (e.addClass("reveal"), e.find("video").length && e.find("video").get(0).play(), e.find("iframe").length) {
                var t = e.find("iframe");
                0 < t.attr("src").indexOf("?") ? t.get(0).src += "&autoplay=1" : t.get(0).src += "?autoplay=1"
            }
        }), $(document).on("click", ".file-browser", function() {
            var e = $(this),
                t = e.closest(".file-group").find('[type="file"]');
            e.hasClass("form-control") ? setTimeout(function() {
                t.trigger("click")
            }, 300) : t.trigger("click")
        }), $(document).on("change", '.file-group [type="file"]', function() {
            var e = $(this),
                t = e.val().split("\\").pop();
            e.closest(".file-group").find(".file-value").val(t).text(t).focus()
        }), $(window).on("scroll", function() {
            var e = $(this).scrollTop() - 200;
            $(".header.fadeout").css("opacity", 1 - e / window.innerHeight)
        }), $(document.body).on("adding_to_cart", function() {
            $("#added_to_cart_feedback").fadeIn();
            var e = $(".badge-cart-count"),
                t = parseInt(e.text()) + 1;
            e.text(t), setTimeout(function() {
                $("#added_to_cart_feedback").fadeOut()
            }, 5e3)
        }), $(document).on("click", '[data-toggle="searchbox"]', function() {
            var e = $(".searchbox");
            return e.toggleClass("reveal"), e.hasClass("reveal") && e.find("input").focus(), !1
        })
    }, page.bindValue = function() {
        $("[data-bind-radio]").each(function() {
            var e = $(this),
                i = e.data("bind-radio"),
                t = $('input[name="' + i + '"]:checked').val();
            e.text(e.dataAttr(t, e.text())), $('input[name="' + i + '"]').on("change", function() {
                var t = $('input[name="' + i + '"]:checked').val();
                $('[data-bind-radio="' + i + '"]').each(function() {
                    var e = $(this);
                    e.text(e.dataAttr(t, e.text()))
                })
            })
        }), $("[data-bind-href]").each(function() {
            var e = $(this),
                i = e.data("bind-href"),
                t = $('input[name="' + i + '"]:checked').val();
            e.attr("href", e.dataAttr(t)), $('input[name="' + i + '"]').on("change", function() {
                var t = $('input[name="' + i + '"]:checked').val();
                $('[data-bind-href="' + i + '"]').each(function() {
                    var e = $(this);
                    e.attr("href", e.dataAttr(t))
                })
            })
        })
    }, jQuery(function(e) {
        page.init()
    }), page.aos = function() {
        AOS.init({
            offset: 220,
            duration: 1500,
            disable: "mobile"
        })
    }, page.config = function(e) {
        if ("string" == typeof e) return page.defaults[e];
        var t, i, n, a, o;
        $.extend(!0, page.defaults, e), page.defaults.smoothScroll || SmoothScroll.destroy(), $('[data-provide~="map"]').length && void 0 === window["google.maps.Map"] && $.getScript("https://maps.googleapis.com/maps/api/js?key=" + page.defaults.googleApiKey + "&callback=page.map"), page.defaults.googleAnalyticsId && (t = window, i = document, n = "ga", t.GoogleAnalyticsObject = n, t.ga = t.ga || function() {
            (t.ga.q = t.ga.q || []).push(arguments)
        }, t.ga.l = 1 * new Date, a = i.createElement("script"), o = i.getElementsByTagName("script")[0], a.async = 1, a.src = "https://www.google-analytics.com/analytics.js", o.parentNode.insertBefore(a, o), ga("create", page.defaults.googleAnalyticsId, "auto"), ga("send", "pageview"))
    }, page.counter = function() {
        $('[data-provide~="counter"]:not(.counted)').waypoint({
            handler: function(e) {
                $(this.element).countTo().addClass("counted")
            },
            offset: "100%"
        });
        $("[data-countdown]").each(function() {
            var t = "";
            t += '<div class="row gap-items-3">', t += '<div class="col"><h5>%D</h5><small>Day%!D</small></div>', t += '<div class="col"><h5>%H</h5><small>Hour%!H</small></div>', t += '<div class="col"><h5>%M</h5><small>Minute%!M</small></div>', t += '<div class="col"><h5>%S</h5><small>Second%!S</small></div>', t += "</div>", $(this).hasDataAttr("format") && (t = $(this).data("format")), $(this).countdown($(this).data("countdown"), function(e) {
                $(this).html(e.strftime(t))
            })
        })
    }, page.contact = function() {
        var o = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $('[data-form="mailer"]').each(function() {
            var i = $(this),
                e = i.find('[name="email"]'),
                t = i.find('[name="message"]'),
                n = e.closest(".form-group"),
                a = t.closest(".form-group");
            i.on("submit", function() {
                return i.children(".alert-danger").remove(), e.length && (e.val().length < 1 || !o.test(e.val())) ? n.addClass("has-danger") : t.length && t.val().length < 1 ? a.addClass("has-danger") : $.ajax({
                    type: "POST",
                    url: i.attr("action"),
                    data: i.serializeArray()
                }).done(function(e) {
                    var t = $.parseJSON(e);
                    "success" == t.status ? (i.find(".alert-success").fadeIn(1e3), i.find(":input").val("")) : (i.prepend('<div class="alert alert-danger d-block">' + t.message + "</div>"), console.log(t.error))
                }), !1
            }), e.on("focus", function() {
                n.removeClass("has-danger")
            }), t.on("focus", function() {
                a.removeClass("has-danger")
            })
        })
    }, page.map = function() {
        $('[data-provide~="map"]').each(function() {
            var e = {
                lat: "",
                lng: "",
                zoom: 13,
                markerLat: "",
                markerLng: "",
                markerIcon: "",
                style: ""
            };
            e = $.extend(e, page.getDataOptions($(this)));
            var t = new google.maps.Map($(this)[0], {
                    center: {
                        lat: Number(e.lat),
                        lng: Number(e.lng)
                    },
                    zoom: Number(e.zoom)
                }),
                i = new google.maps.Marker({
                    position: {
                        lat: Number(e.markerLat),
                        lng: Number(e.markerLng)
                    },
                    map: t,
                    animation: google.maps.Animation.DROP,
                    icon: e.markerIcon
                }),
                n = new google.maps.InfoWindow({
                    content: $(this).dataAttr("info", "")
                });
            switch (i.addListener("click", function() {
                n.open(t, i)
            }), e.style) {
                case "light":
                    t.set("styles", [{
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#e9e9e9"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            color: "#f5f5f5"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 29
                        }, {
                            weight: .2
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 18
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                            color: "#ffffff"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                            color: "#f5f5f5"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [{
                            color: "#dedede"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#ffffff"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        elementType: "labels.text.fill",
                        stylers: [{
                            saturation: 36
                        }, {
                            color: "#333333"
                        }, {
                            lightness: 40
                        }]
                    }, {
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            color: "#f2f2f2"
                        }, {
                            lightness: 19
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#fefefe"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#fefefe"
                        }, {
                            lightness: 17
                        }, {
                            weight: 1.2
                        }]
                    }]);
                    break;
                case "dark":
                    t.set("styles", [{
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [{
                            saturation: 36
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 40
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }, {
                            weight: 1.2
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 29
                        }, {
                            weight: .2
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 18
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 19
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }]
                    }]);
                    break;
                default:
                    Array.isArray(e.style) && t.set("styles", e.style)
            }
        })
    }, page.parallax = function() {
        $("[data-parallax]").each(function() {
            var e = $(this),
                t = e.data("parallax"),
                i = .3;
            $(this).hasClass("header") && (i = .6), e.parallax({
                imageSrc: t,
                speed: i,
                bleed: 50
            })
        })
    }, page.particle = function() {
        var i = 120;
        $(window).width() < 700 && (i = 25), $(".constellation").each(function() {
            var e = $(this).data("color"),
                t = $(this).data("length");
            $(this).constellation({
                distance: i,
                star: {
                    color: e,
                    width: 1
                },
                line: {
                    color: e,
                    width: .2
                },
                length: t
            })
        })
    }, page.scroll = function() {
        var i = $("html, body");
        $(document).on("click", ".scroll-top", function() {
            return i.animate({
                scrollTop: 0
            }, 600), $(this).blur(), !1
        }), $(document).on("click", "[data-scrollto]", function() {
            var e = "#" + $(this).data("scrollto");
            if (0 < $(e).length) {
                var t = 0;
                $(".topbar.topbar-sticky").length && (t = 60), i.animate({
                    scrollTop: $(e).offset().top - t
                }, 1e3)
            }
            return !1
        });
        var e = location.hash.replace("#", "");
        "" != e && 0 < $("#" + e).length && i.animate({
            scrollTop: $("#" + e).offset().top - 60
        }, 1e3)
    }, page.swiper = function() {
      		
		$(".swiper-container").each(function() {
						
            var t = $(this),
				g = page.getDataOptions(t),
				e = {
                    autoplay: {
						delay: 5000,
					 },
                    speed: 500,
                    loop: true,
					// Default parameters
					slidesPerView: 1,
					spaceBetween: 10,
					centeredSlides:g["centeredSlides"],
					breakpoints: {
                        // when window width is >= 320px
						320: {
						  slidesPerView: 2,
						  spaceBetween: 10
						},
						// when window width is >= 480px
						480: {
						  slidesPerView: 3,
						  spaceBetween: 20
						},
						// when window width is >= 768px
						768: {
						  slidesPerView: g["slidesPerView"],
						  spaceBetween: g["spaceBetween"]
						}
                    },
					navigation: {
						nextEl: t.find(".swiper-button-next").length ? '.swiper-button-next' : '',
						prevEl: t.find(".swiper-button-prev").length ? '.swiper-button-prev' : '',
					},
                };
				console.log(e);
				t.find(".swiper-pagination").length && (e.pagination = ".swiper-pagination", e.paginationClickable = !0), new Swiper(t, e)		

          
		})
    }, page.topbar = function() {
        var t = $("body");
        $(window).on("scroll", function() {
            10 < $(document).scrollTop() ? t.addClass("body-scrolled") : t.removeClass("body-scrolled")
        }), $(document).on("click", ".nav-toggle-click .nav-link", function(e) {
            var t = $(this),
                i = t.closest(".nav-item"),
                n = i.siblings(".nav-item");
            "#" == t.attr("href") && e.preventDefault(), n.removeClass("show"), n.find(".nav-item.show").removeClass("show"), i.toggleClass("show")
        }), $(document).on("click", ".topbar-toggler", function() {
            t.toggleClass("topbar-reveal"), $(".topbar").prepend('<div class="topbar-backdrop"></div>')
        }), $(document).on("click", ".topbar-backdrop", function() {
            t.toggleClass("topbar-reveal"), $(this).remove()
        }), $(document).on("click", ".topbar-reveal .topbar-nav .nav-item > .nav-link", function() {
            var e = $(this),
                t = e.next(".nav-submenu");
            e.closest(".topbar-nav").find(".nav-submenu").not(t).slideUp(), t.slideToggle()
        }), $(document).on("click", ".topbar-reveal .topbar-nav .nav-link", function() {
            var e = $(this).attr("href");
            ($(this).hasDataAttr("scrollto") || 1 < e.length) && (t.removeClass("topbar-reveal"), $(".topbar-backdrop").remove())
        })
    }, page.typing = function() {
        $("[data-typing]").each(function() {
            var e = $(this),
                t = e.data("typing").split(","),
                i = e.dataAttr("delay", 800),
                n = {
                    strings: t,
                    typeSpeed: 50,
                    backDelay: parseInt(i),
                    loop: !0
                };
            n = $.extend(n, page.getDataOptions(e)), e.typed(n)
        })
    }, page.shuffle = function() {
        if (void 0 !== window.shuffle && 0 !== $('[data-provide="shuffle"]').length) {
            var o = window.shuffle;
            o.options.itemSelector = '[data-shuffle="item"]', o.options.sizer = '[data-shuffle="sizer"]', o.options.delimeter = ",", o.options.speed = 500, $('[data-provide="shuffle"]').each(function() {
                var e = $(this).find('[data-shuffle="list"]'),
                    t = $(this).find('[data-shuffle="filter"]'),
                    a = new o(e);
                t.length && $(t).find('[data-shuffle="button"]').each(function() {
                    $(this).on("click", function() {
                        var e, t = $(this),
                            i = t.hasClass("active"),
                            n = t.data("group");
                        $(this).closest('[data-shuffle="filter"]').find('[data-shuffle="button"].active').removeClass("active"), e = i ? (t.removeClass("active"), o.ALL_ITEMS) : (t.addClass("active"), n), a.filter(e)
                    })
                }), $(this).imagesLoaded(function() {
                    a.layout()
                })
            })
        }
    }, page.getDataOptions = function(e, i) {
        var n = {};
        return $.each($(e).data(), function(e, t) {
            if ("provide" != (e = page.dataToOption(e))) {
                if (null != i) switch (i[e]) {
                    case "bool":
                        t = Boolean(t);
                        break;
                    case "num":
                        t = Number(t);
                        break;
                    case "array":
                        t = t.split(",")
                }
                n[e] = t
            }
        }), n
    }, page.optionToData = function(e) {
        return e.replace(/([A-Z])/g, "-$1").toLowerCase()
    }, page.dataToOption = function(e) {
        return e.replace(/-([a-z])/g, function(e) {
            return e[1].toUpperCase()
        })
    }, jQuery.fn.hasDataAttr = function(e) {
        return $(this)[0].hasAttribute("data-" + e)
    }, jQuery.fn.dataAttr = function(e, t) {
        return $(this)[0].getAttribute("data-" + e) || t
    }, jQuery.expr[":"].search = function(e, t, i) {
        return 0 <= $(e).html().toUpperCase().indexOf(i[3].toUpperCase())
    }, jQuery(document).ready(function() {
		if($("#ytbg").length >= 0){
				$('[data-youtube]').youtube_background();
		}		
	});
	
	// Make sure you run this code under Elementor..
	jQuery( window ).on( 'elementor/frontend/init', function() {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function() {
			if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
				if(jQuery("#ytbg").length >= 0){
				jQuery('[data-youtube]').youtube_background();
				}
			}
		});
	} );
	
/* jquery.youtube-background v1.0.4 | Nikola Stamatovic <@stamat> | MIT */

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

(function ($) {
    $.fn.youtube_background = function(params) {
		var YOUTUBE = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
        var $this = $(this);

		var defaults = {
			'pause': false, //deprecated
			'play-button': false,
			'mute-button': false,
			'autoplay': true,
			'muted': true,
			'loop': true,
			'mobile': false,
			'load-background': true
		}

		if (!params) {
			params = defaults;
		} else {
			for (var k in defaults) {
				//load in defaults
				if (!params.hasOwnProperty(k)) {
					params[k] = defaults[k];
				}
			}
		}

		//pause deprecated
		if (params.pause) {
			params['play-button'] = params.pause;
		}

        function onVideoPlayerReady(event) {
			if (params.autoplay) {
				event.target.playVideo();
			}

            $(event.target.a).css({
                "top" : "50%",
                "left" : "50%",
                "transform": "translateX(-50%) translateY(-50%)",
                "position": "absolute"
            });

            var $root = $(event.target.a).parent();

            function onResize() {
                var h = $root.outerHeight() + 100; // since showinfo is deprecated and ignored after September 25, 2018. we add +100 to hide it in the overflow
                var w = $root.outerWidth() + 100;
                var res = 1.77777778;

                if (res > w/h) {
                    $root.find('iframe').width(h*res).height(h);
                } else {
                    $root.find('iframe').width(w).height(w/res);
                }
            }
            $(window).on('resize', onResize);
            onResize();
        }

        function onVideoStateChange(event) {
			//video loop
			if (event.data === 0 && params.loop) {
				event.target.playVideo();
			}
        }

		function build() {
			if (!window.hasOwnProperty('__ytbg_index')) {
				window.__ytbg_index = {};
			}

			//iterate elements
			for (var i = 0; i < $this.length; i++) {
                var $elem = $($this[i]);

                if ($elem.parent().hasClass('youtube-background')) {
                    continue;
                }

				var ytid = $elem.data('youtube');

				if (!ytid) {
					continue;
				}

                var pts = ytid.match(YOUTUBE);
                if (pts && pts.length) {
                    ytid = pts[1];
					YOUTUBE.lastIndex = 0; //regex needs a reset in for loops, I always forget this
                } else {
					continue;
				}

				for (var k in params) {
					var data = $elem.data('ytbg-'+k);
					if (data !== undefined && data !== null) {
						params[k] = data;
					}
				}

				//pause deprecated
				if (params.pause) {
					params['play-button'] = params.pause;
				}

                $elem.wrap('<div class="youtube-background" />');
                var $root = $elem.parent();

				//set css rules
                $root.css({
                    "height" : "100%",
                    "width" : "100%",
                    "z-index": "0",
                    "position": "absolute",
                    "overflow": "hidden",
                    "top": 0, // added by @insad
                    "left": 0,
                    "bottom": 0,
                    "right": 0,
                    "pointer-events": "none" // avoid right mouse click popup menu
                });

				if (params['load-background']) {
					$root.css({
						'background-image': 'url(https://img.youtube.com/vi/'+ytid+'/maxresdefault.jpg)',
						'background-size': 'cover',
						'background-repeat': 'no-repeat',
						'background-position': 'center'
					});
				}

				$root.parent().css({
                    "position": "relative"
                });

				//if mobile browser break
				var is_mobile = false;
				(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) is_mobile = true;})(navigator.userAgent||navigator.vendor||window.opera);

				if (is_mobile && !params.mobile) {
					continue;
				}

				if (params['play-button'] || params['mute-button']) {
					var $vbc = $('<div class="video-background-controls" />');
					$vbc.css({
						'position': 'absolute',
						'z-index': 2,
						'top': '10px',
						'right': '10px'
					});
					$root.parent().append($vbc);
				}

				//add a play toggle button
				if (params['play-button']) {
					var $btn = $('<button class="play-toggle"><i class="fa fa-pause-circle"></i></button>');

					if (!params.autoplay) {
						$btn.addClass('paused');
						$this.find('i').removeClass('fa-pause-circle').addClass('fa-play-circle');
					}

					$btn.on('click', function() {
						var $this = $(this);
						var player = $this.parent().parent().find('.youtube-background').data('yt-player');

						if ($this.hasClass('paused')) {
							$this.removeClass('paused');
							$this.find('i').addClass('fa-pause-circle').removeClass('fa-play-circle');
							if (player) {
								player.playVideo();
							}
						} else {
							$this.addClass('paused');
							$this.find('i').removeClass('fa-pause-circle').addClass('fa-play-circle');
							if (player) {
								player.pauseVideo();
							}
						}
					});
					$root.parent().find('.video-background-controls').append($btn);
				}

				if (params['mute-button']) {
					var $btn = $('<button class="mute-toggle"><i class="fa fa-volume-up"></i></button>');

					if (params.muted) {
						$btn.addClass('muted');
						$btn.find('i').addClass('fa-volume-mute').removeClass('fa-volume-up');
					}

					$btn.on('click', function() {
						var $this = $(this);
						var player = $this.parent().parent().find('.youtube-background').data('yt-player');

						if (!$this.hasClass('muted')) {
							$this.addClass('muted');
							$this.find('i').addClass('fa-volume-mute').removeClass('fa-volume-up');
							if (player) {
								player.mute();
							}
						} else {
							$this.removeClass('muted');
							$this.find('i').removeClass('fa-volume-mute').addClass('fa-volume-up');
							if (player) {
								player.unMute();
							}
						}
					});
					$root.parent().find('.video-background-controls').append($btn);
				}

				//index the instance
				function getRandomIntInclusive(min, max) {
				  min = Math.ceil(min);
				  max = Math.floor(max);
				  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
				}

				var uid = ytid +'-'+ getRandomIntInclusive(0, 999);
				while (window.__ytbg_index.hasOwnProperty(uid)) {
					uid = ytid +'-'+ getRandomIntInclusive(0, 999);
				}

				window.__ytbg_index[uid] = {
					elem: $elem[0],
					ytid: ytid
				};
			}
		}
		build();

        window.onYouTubeIframeAPIReady = function () {
            //instance index iterate
            for (var k in window.__ytbg_index) {
                var entry = window.__ytbg_index[k];
				var $root = $(entry.elem).parent();

                ytp = new YT.Player(entry.elem, {
                    height: '1080',
                    width: '1920',
                    videoId: entry.ytid,
                    playerVars: {
                        'controls': 0,
                        'autoplay': params.autoplay ? 1 : 0,
                        'mute': params.muted ? 1 : 0,
                        'origin': window.location.origin,
                        'loop': params.loop ? 1 : 0,
                        'rel': 0,
						'ecver': 2,
                        'showinfo': 0,
                        'modestbranding': 1
                    },
                    events: {
                        'onReady': onVideoPlayerReady,
                        'onStateChange': onVideoStateChange
                    }
                });

				$root.data('yt-player', ytp);
				delete window.__ytbg_index[k];
            }
        };

        if (window.hasOwnProperty('YT') && window.YT.loaded) {
            window.onYouTubeIframeAPIReady();
        }

 		return $this;
 	};
})(jQuery);