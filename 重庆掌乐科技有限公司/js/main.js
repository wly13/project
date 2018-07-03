(function(e, t) {
	typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
		if(!e.document) throw new Error("jQuery requires a window with a document");
		return t(e)
	} : t(e)
})(typeof window != "undefined" ? window : this, function(window, noGlobal) {
	function isArraylike(e) {
		var t = "length" in e && e.length,
			n = jQuery.type(e);
		return n === "function" || jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
	}

	function winnow(e, t, n) {
		if(jQuery.isFunction(t)) return jQuery.grep(e, function(e, r) {
			return !!t.call(e, r, e) !== n
		});
		if(t.nodeType) return jQuery.grep(e, function(e) {
			return e === t !== n
		});
		if(typeof t == "string") {
			if(risSimple.test(t)) return jQuery.filter(t, e, n);
			t = jQuery.filter(t, e)
		}
		return jQuery.grep(e, function(e) {
			return indexOf.call(t, e) >= 0 !== n
		})
	}

	function sibling(e, t) {
		while((e = e[t]) && e.nodeType !== 1);
		return e
	}

	function createOptions(e) {
		var t = optionsCache[e] = {};
		return jQuery.each(e.match(rnotwhite) || [], function(e, n) {
			t[n] = !0
		}), t
	}

	function completed() {
		document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
	}

	function Data() {
		Object.defineProperty(this.cache = {}, 0, {
			get: function() {
				return {}
			}
		}), this.expando = jQuery.expando + Data.uid++
	}

	function dataAttr(e, t, n) {
		var r;
		if(n === undefined && e.nodeType === 1) {
			r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
			if(typeof n == "string") {
				try {
					n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? jQuery.parseJSON(n) : n
				} catch(i) {}
				data_user.set(e, t, n)
			} else n = undefined
		}
		return n
	}

	function returnTrue() {
		return !0
	}

	function returnFalse() {
		return !1
	}

	function safeActiveElement() {
		try {
			return document.activeElement
		} catch(e) {}
	}

	function manipulationTarget(e, t) {
		return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}

	function disableScript(e) {
		return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
	}

	function restoreScript(e) {
		var t = rscriptTypeMasked.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function setGlobalEval(e, t) {
		var n = 0,
			r = e.length;
		for(; n < r; n++) data_priv.set(e[n], "globalEval", !t || data_priv.get(t[n], "globalEval"))
	}

	function cloneCopyEvent(e, t) {
		var n, r, i, s, o, u, a, f;
		if(t.nodeType !== 1) return;
		if(data_priv.hasData(e)) {
			s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
			if(f) {
				delete o.handle, o.events = {};
				for(i in f)
					for(n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
			}
		}
		data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
	}

	function getAll(e, t) {
		var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
		return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
	}

	function fixInput(e, t) {
		var n = t.nodeName.toLowerCase();
		if(n === "input" && rcheckableType.test(e.type)) t.checked = e.checked;
		else if(n === "input" || n === "textarea") t.defaultValue = e.defaultValue
	}

	function actualDisplay(e, t) {
		var n, r = jQuery(t.createElement(e)).appendTo(t.body),
			i = window.getDefaultComputedStyle && (n = window.getDefaultComputedStyle(r[0])) ? n.display : jQuery.css(r[0], "display");
		return r.detach(), i
	}

	function defaultDisplay(e) {
		var t = document,
			n = elemdisplay[e];
		if(!n) {
			n = actualDisplay(e, t);
			if(n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = iframe[0].contentDocument, t.write(), t.close(), n = actualDisplay(e, t), iframe.detach();
			elemdisplay[e] = n
		}
		return n
	}

	function curCSS(e, t, n) {
		var r, i, s, o, u = e.style;
		return n = n || getStyles(e), n && (o = n.getPropertyValue(t) || n[t]), n && (o === "" && !jQuery.contains(e.ownerDocument, e) && (o = jQuery.style(e, t)), rnumnonpx.test(o) && rmargin.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), o !== undefined ? o + "" : o
	}

	function addGetHookIf(e, t) {
		return {
			get: function() {
				if(e()) {
					delete this.get;
					return
				}
				return(this.get = t).apply(this, arguments)
			}
		}
	}

	function vendorPropName(e, t) {
		if(t in e) return t;
		var n = t[0].toUpperCase() + t.slice(1),
			r = t,
			i = cssPrefixes.length;
		while(i--) {
			t = cssPrefixes[i] + n;
			if(t in e) return t
		}
		return r
	}

	function setPositiveNumber(e, t, n) {
		var r = rnumsplit.exec(t);
		return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
	}

	function augmentWidthOrHeight(e, t, n, r, i) {
		var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
			o = 0;
		for(; s < 4; s += 2) n === "margin" && (o += jQuery.css(e, n + cssExpand[s], !0, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], !0, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], !0, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i)));
		return o
	}

	function getWidthOrHeight(e, t, n) {
		var r = !0,
			i = t === "width" ? e.offsetWidth : e.offsetHeight,
			s = getStyles(e),
			o = jQuery.css(e, "boxSizing", !1, s) === "border-box";
		if(i <= 0 || i == null) {
			i = curCSS(e, t, s);
			if(i < 0 || i == null) i = e.style[t];
			if(rnumnonpx.test(i)) return i;
			r = o && (support.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
		}
		return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
	}

	function showHide(e, t) {
		var n, r, i, s = [],
			o = 0,
			u = e.length;
		for(; o < u; o++) {
			r = e[o];
			if(!r.style) continue;
			s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", defaultDisplay(r.nodeName)))) : (i = isHidden(r), (n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
		}
		for(o = 0; o < u; o++) {
			r = e[o];
			if(!r.style) continue;
			if(!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
		}
		return e
	}

	function Tween(e, t, n, r, i) {
		return new Tween.prototype.init(e, t, n, r, i)
	}

	function createFxNow() {
		return setTimeout(function() {
			fxNow = undefined
		}), fxNow = jQuery.now()
	}

	function genFx(e, t) {
		var n, r = 0,
			i = {
				height: e
			};
		t = t ? 1 : 0;
		for(; r < 4; r += 2 - t) n = cssExpand[r], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}

	function createTween(e, t, n) {
		var r, i = (tweeners[t] || []).concat(tweeners["*"]),
			s = 0,
			o = i.length;
		for(; s < o; s++)
			if(r = i[s].call(n, t, e)) return r
	}

	function defaultPrefilter(e, t, n) {
		var r, i, s, o, u, a, f, l, c = this,
			h = {},
			p = e.style,
			d = e.nodeType && isHidden(e),
			v = data_priv.get(e, "fxshow");
		n.queue || (u = jQuery._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
			u.unqueued || a()
		}), u.unqueued++, c.always(function() {
			c.always(function() {
				u.unqueued--, jQuery.queue(e, "fx").length || u.empty.fire()
			})
		})), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], f = jQuery.css(e, "display"), l = f === "none" ? data_priv.get(e, "olddisplay") || defaultDisplay(e.nodeName) : f, l === "inline" && jQuery.css(e, "float") === "none" && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always(function() {
			p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
		}));
		for(r in t) {
			i = t[r];
			if(rfxtypes.exec(i)) {
				delete t[r], s = s || i === "toggle";
				if(i === (d ? "hide" : "show")) {
					if(i !== "show" || !v || v[r] === undefined) continue;
					d = !0
				}
				h[r] = v && v[r] || jQuery.style(e, r)
			} else f = undefined
		}
		if(!jQuery.isEmptyObject(h)) {
			v ? "hidden" in v && (d = v.hidden) : v = data_priv.access(e, "fxshow", {}), s && (v.hidden = !d), d ? jQuery(e).show() : c.done(function() {
				jQuery(e).hide()
			}), c.done(function() {
				var t;
				data_priv.remove(e, "fxshow");
				for(t in h) jQuery.style(e, t, h[t])
			});
			for(r in h) o = createTween(d ? v[r] : 0, r, c), r in v || (v[r] = o.start, d && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
		} else(f === "none" ? defaultDisplay(e.nodeName) : f) === "inline" && (p.display = f)
	}

	function propFilter(e, t) {
		var n, r, i, s, o;
		for(n in e) {
			r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
			if(o && "expand" in o) {
				s = o.expand(s), delete e[r];
				for(n in s) n in e || (e[n] = s[n], t[n] = i)
			} else t[r] = i
		}
	}

	function Animation(e, t, n) {
		var r, i, s = 0,
			o = animationPrefilters.length,
			u = jQuery.Deferred().always(function() {
				delete a.elem
			}),
			a = function() {
				if(i) return !1;
				var t = fxNow || createFxNow(),
					n = Math.max(0, f.startTime + f.duration - t),
					r = n / f.duration || 0,
					s = 1 - r,
					o = 0,
					a = f.tweens.length;
				for(; o < a; o++) f.tweens[o].run(s);
				return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
			},
			f = u.promise({
				elem: e,
				props: jQuery.extend({}, t),
				opts: jQuery.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: fxNow || createFxNow(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
					return f.tweens.push(r), r
				},
				stop: function(t) {
					var n = 0,
						r = t ? f.tweens.length : 0;
					if(i) return this;
					i = !0;
					for(; n < r; n++) f.tweens[n].run(1);
					return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
				}
			}),
			l = f.props;
		propFilter(l, f.opts.specialEasing);
		for(; s < o; s++) {
			r = animationPrefilters[s].call(f, e, l, f.opts);
			if(r) return r
		}
		return jQuery.map(l, createTween, f), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {
			elem: e,
			anim: f,
			queue: f.opts.queue
		})), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
	}

	function addToPrefiltersOrTransports(e) {
		return function(t, n) {
			typeof t != "string" && (n = t, t = "*");
			var r, i = 0,
				s = t.toLowerCase().match(rnotwhite) || [];
			if(jQuery.isFunction(n))
				while(r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
		}
	}

	function inspectPrefiltersOrTransports(e, t, n, r) {
		function o(u) {
			var a;
			return i[u] = !0, jQuery.each(e[u] || [], function(e, u) {
				var f = u(t, n, r);
				if(typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
				if(s) return !(a = f)
			}), a
		}
		var i = {},
			s = e === transports;
		return o(t.dataTypes[0]) || !i["*"] && o("*")
	}

	function ajaxExtend(e, t) {
		var n, r, i = jQuery.ajaxSettings.flatOptions || {};
		for(n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
		return r && jQuery.extend(!0, e, r), e
	}

	function ajaxHandleResponses(e, t, n) {
		var r, i, s, o, u = e.contents,
			a = e.dataTypes;
		while(a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
		if(r)
			for(i in u)
				if(u[i] && u[i].test(r)) {
					a.unshift(i);
					break
				}
		if(a[0] in n) s = a[0];
		else {
			for(i in n) {
				if(!a[0] || e.converters[i + " " + a[0]]) {
					s = i;
					break
				}
				o || (o = i)
			}
			s = s || o
		}
		if(s) return s !== a[0] && a.unshift(s), n[s]
	}

	function ajaxConvert(e, t, n, r) {
		var i, s, o, u, a, f = {},
			l = e.dataTypes.slice();
		if(l[1])
			for(o in e.converters) f[o.toLowerCase()] = e.converters[o];
		s = l.shift();
		while(s) {
			e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
			if(s)
				if(s === "*") s = a;
				else if(a !== "*" && a !== s) {
				o = f[a + " " + s] || f["* " + s];
				if(!o)
					for(i in f) {
						u = i.split(" ");
						if(u[1] === s) {
							o = f[a + " " + u[0]] || f["* " + u[0]];
							if(o) {
								o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
								break
							}
						}
					}
				if(o !== !0)
					if(o && e["throws"]) t = o(t);
					else try {
						t = o(t)
					} catch(c) {
						return {
							state: "parsererror",
							error: o ? c : "No conversion from " + a + " to " + s
						}
					}
			}
		}
		return {
			state: "success",
			data: t
		}
	}

	function buildParams(e, t, n, r) {
		var i;
		if(jQuery.isArray(t)) jQuery.each(t, function(t, i) {
			n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
		});
		else if(!n && jQuery.type(t) === "object")
			for(i in t) buildParams(e + "[" + i + "]", t[i], n, r);
		else r(e, t)
	}

	function getWindow(e) {
		return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
	}
	var arr = [],
		slice = arr.slice,
		concat = arr.concat,
		push = arr.push,
		indexOf = arr.indexOf,
		class2type = {},
		toString = class2type.toString,
		hasOwn = class2type.hasOwnProperty,
		support = {},
		document = window.document,
		version = "2.1.4",
		jQuery = function(e, t) {
			return new jQuery.fn.init(e, t)
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(e, t) {
			return t.toUpperCase()
		};
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		length: 0,
		toArray: function() {
			return slice.call(this)
		},
		get: function(e) {
			return e != null ? e < 0 ? this[e + this.length] : this[e] : slice.call(this)
		},
		pushStack: function(e) {
			var t = jQuery.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return jQuery.each(this, e, t)
		},
		map: function(e) {
			return this.pushStack(jQuery.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return this.pushStack(slice.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (e < 0 ? t : 0);
			return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: push,
		sort: arr.sort,
		splice: arr.splice
	}, jQuery.extend = jQuery.fn.extend = function() {
		var e, t, n, r, i, s, o = arguments[0] || {},
			u = 1,
			a = arguments.length,
			f = !1;
		typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), u === a && (o = this, u--);
		for(; u < a; u++)
			if((e = arguments[u]) != null)
				for(t in e) {
					n = o[t], r = e[t];
					if(o === r) continue;
					f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = !1, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
				}
		return o
	}, jQuery.extend({
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function(e) {
			throw new Error(e)
		},
		noop: function() {},
		isFunction: function(e) {
			return jQuery.type(e) === "function"
		},
		isArray: Array.isArray,
		isWindow: function(e) {
			return e != null && e === e.window
		},
		isNumeric: function(e) {
			return !jQuery.isArray(e) && e - parseFloat(e) + 1 >= 0
		},
		isPlainObject: function(e) {
			return jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e) ? !1 : e.constructor && !hasOwn.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
		},
		isEmptyObject: function(e) {
			var t;
			for(t in e) return !1;
			return !0
		},
		type: function(e) {
			return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? class2type[toString.call(e)] || "object" : typeof e
		},
		globalEval: function(code) {
			var script, indirect = eval;
			code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
		},
		camelCase: function(e) {
			return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, n) {
			var r, i = 0,
				s = e.length,
				o = isArraylike(e);
			if(n)
				if(o)
					for(; i < s; i++) {
						r = t.apply(e[i], n);
						if(r === !1) break
					} else
						for(i in e) {
							r = t.apply(e[i], n);
							if(r === !1) break
						} else if(o)
							for(; i < s; i++) {
								r = t.call(e[i], i, e[i]);
								if(r === !1) break
							} else
								for(i in e) {
									r = t.call(e[i], i, e[i]);
									if(r === !1) break
								}
			return e
		},
		trim: function(e) {
			return e == null ? "" : (e + "").replace(rtrim, "")
		},
		makeArray: function(e, t) {
			var n = t || [];
			return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : push.call(n, e)), n
		},
		inArray: function(e, t, n) {
			return t == null ? -1 : indexOf.call(t, e, n)
		},
		merge: function(e, t) {
			var n = +t.length,
				r = 0,
				i = e.length;
			for(; r < n; r++) e[i++] = t[r];
			return e.length = i, e
		},
		grep: function(e, t, n) {
			var r, i = [],
				s = 0,
				o = e.length,
				u = !n;
			for(; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
			return i
		},
		map: function(e, t, n) {
			var r, i = 0,
				s = e.length,
				o = isArraylike(e),
				u = [];
			if(o)
				for(; i < s; i++) r = t(e[i], i, n), r != null && u.push(r);
			else
				for(i in e) r = t(e[i], i, n), r != null && u.push(r);
			return concat.apply([], u)
		},
		guid: 1,
		proxy: function(e, t) {
			var n, r, i;
			return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = slice.call(arguments, 2), i = function() {
				return e.apply(t || this, r.concat(slice.call(arguments)))
			}, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
		},
		now: Date.now,
		support: support
	}), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		class2type["[object " + t + "]"] = t.toLowerCase()
	});
	var Sizzle = function(e) {
		function ot(e, t, r, i) {
			var s, u, f, l, c, d, g, y, S, x;
			(t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [], l = t.nodeType;
			if(typeof e != "string" || !e || l !== 1 && l !== 9 && l !== 11) return r;
			if(!i && v) {
				if(l !== 11 && (s = Z.exec(e)))
					if(f = s[1]) {
						if(l === 9) {
							u = t.getElementById(f);
							if(!u || !u.parentNode) return r;
							if(u.id === f) return r.push(u), r
						} else if(t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
					} else {
						if(s[2]) return D.apply(r, t.getElementsByTagName(e)), r;
						if((f = s[3]) && n.getElementsByClassName) return D.apply(r, t.getElementsByClassName(f)), r
					}
				if(n.qsa && (!m || !m.test(e))) {
					y = g = w, S = t, x = l !== 1 && e;
					if(l === 1 && t.nodeName.toLowerCase() !== "object") {
						d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
						while(c--) d[c] = y + gt(d[c]);
						S = et.test(e) && vt(t.parentNode) || t, x = d.join(",")
					}
					if(x) try {
						return D.apply(r, S.querySelectorAll(x)), r
					} catch(T) {} finally {
						g || t.removeAttribute("id")
					}
				}
			}
			return a(e.replace(z, "$1"), t, r, i)
		}

		function ut() {
			function t(n, i) {
				return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
			}
			var e = [];
			return t
		}

		function at(e) {
			return e[w] = !0, e
		}

		function ft(e) {
			var t = p.createElement("div");
			try {
				return !!e(t)
			} catch(n) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}

		function lt(e, t) {
			var n = e.split("|"),
				i = e.length;
			while(i--) r.attrHandle[n[i]] = t
		}

		function ct(e, t) {
			var n = t && e,
				r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || L) - (~e.sourceIndex || L);
			if(r) return r;
			if(n)
				while(n = n.nextSibling)
					if(n === t) return -1;
			return e ? 1 : -1
		}

		function ht(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return n === "input" && t.type === e
			}
		}

		function pt(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return(n === "input" || n === "button") && t.type === e
			}
		}

		function dt(e) {
			return at(function(t) {
				return t = +t, at(function(n, r) {
					var i, s = e([], n.length, t),
						o = s.length;
					while(o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
				})
			})
		}

		function vt(e) {
			return e && typeof e.getElementsByTagName != "undefined" && e
		}

		function mt() {}

		function gt(e) {
			var t = 0,
				n = e.length,
				r = "";
			for(; t < n; t++) r += e[t].value;
			return r
		}

		function yt(e, t, n) {
			var r = t.dir,
				i = n && r === "parentNode",
				s = x++;
			return t.first ? function(t, n, s) {
				while(t = t[r])
					if(t.nodeType === 1 || i) return e(t, n, s)
			} : function(t, n, o) {
				var u, a, f = [S, s];
				if(o) {
					while(t = t[r])
						if(t.nodeType === 1 || i)
							if(e(t, n, o)) return !0
				} else
					while(t = t[r])
						if(t.nodeType === 1 || i) {
							a = t[w] || (t[w] = {});
							if((u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
							a[r] = f;
							if(f[2] = e(t, n, o)) return !0
						}
			}
		}

		function bt(e) {
			return e.length > 1 ? function(t, n, r) {
				var i = e.length;
				while(i--)
					if(!e[i](t, n, r)) return !1;
				return !0
			} : e[0]
		}

		function wt(e, t, n) {
			var r = 0,
				i = t.length;
			for(; r < i; r++) ot(e, t[r], n);
			return n
		}

		function Et(e, t, n, r, i) {
			var s, o = [],
				u = 0,
				a = e.length,
				f = t != null;
			for(; u < a; u++)
				if(s = e[u])
					if(!n || n(s, r, i)) o.push(s), f && t.push(u);
			return o
		}

		function St(e, t, n, r, i, s) {
			return r && !r[w] && (r = St(r)), i && !i[w] && (i = St(i, s)), at(function(s, o, u, a) {
				var f, l, c, h = [],
					p = [],
					d = o.length,
					v = s || wt(t || "*", u.nodeType ? [u] : u, []),
					m = e && (s || !t) ? Et(v, h, e, u, a) : v,
					g = n ? i || (s ? e : d || r) ? [] : o : m;
				n && n(m, g, u, a);
				if(r) {
					f = Et(g, p), r(f, [], u, a), l = f.length;
					while(l--)
						if(c = f[l]) g[p[l]] = !(m[p[l]] = c)
				}
				if(s) {
					if(i || e) {
						if(i) {
							f = [], l = g.length;
							while(l--)(c = g[l]) && f.push(m[l] = c);
							i(null, g = [], f, a)
						}
						l = g.length;
						while(l--)(c = g[l]) && (f = i ? H(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
					}
				} else g = Et(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : D.apply(o, g)
			})
		}

		function xt(e) {
			var t, n, i, s = e.length,
				o = r.relative[e[0].type],
				u = o || r.relative[" "],
				a = o ? 1 : 0,
				l = yt(function(e) {
					return e === t
				}, u, !0),
				c = yt(function(e) {
					return H(t, e) > -1
				}, u, !0),
				h = [function(e, n, r) {
					var i = !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
					return t = null, i
				}];
			for(; a < s; a++)
				if(n = r.relative[e[a].type]) h = [yt(bt(h), n)];
				else {
					n = r.filter[e[a].type].apply(null, e[a].matches);
					if(n[w]) {
						i = ++a;
						for(; i < s; i++)
							if(r.relative[e[i].type]) break;
						return St(a > 1 && bt(h), a > 1 && gt(e.slice(0, a - 1).concat({
							value: e[a - 2].type === " " ? "*" : ""
						})).replace(z, "$1"), n, a < i && xt(e.slice(a, i)), i < s && xt(e = e.slice(i)), i < s && gt(e))
					}
					h.push(n)
				}
			return bt(h)
		}

		function Tt(e, t) {
			var n = t.length > 0,
				i = e.length > 0,
				s = function(s, o, u, a, l) {
					var c, h, d, v = 0,
						m = "0",
						g = s && [],
						y = [],
						b = f,
						w = s || i && r.find.TAG("*", l),
						E = S += b == null ? 1 : Math.random() || .1,
						x = w.length;
					l && (f = o !== p && o);
					for(; m !== x && (c = w[m]) != null; m++) {
						if(i && c) {
							h = 0;
							while(d = e[h++])
								if(d(c, o, u)) {
									a.push(c);
									break
								}
							l && (S = E)
						}
						n && ((c = !d && c) && v--, s && g.push(c))
					}
					v += m;
					if(n && m !== v) {
						h = 0;
						while(d = t[h++]) d(g, y, o, u);
						if(s) {
							if(v > 0)
								while(m--) !g[m] && !y[m] && (y[m] = M.call(a));
							y = Et(y)
						}
						D.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && ot.uniqueSort(a)
					}
					return l && (S = E, f = b), g
				};
			return n ? at(s) : s
		}
		var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + 1 * new Date,
			E = e.document,
			S = 0,
			x = 0,
			T = ut(),
			N = ut(),
			C = ut(),
			k = function(e, t) {
				return e === t && (c = !0), 0
			},
			L = 1 << 31,
			A = {}.hasOwnProperty,
			O = [],
			M = O.pop,
			_ = O.push,
			D = O.push,
			P = O.slice,
			H = function(e, t) {
				var n = 0,
					r = e.length;
				for(; n < r; n++)
					if(e[n] === t) return n;
				return -1
			},
			B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			j = "[\\x20\\t\\r\\n\\f]",
			F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			I = F.replace("w", "w#"),
			q = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + j + "*\\]",
			R = ":(" + F + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|" + ".*" + ")\\)|)",
			U = new RegExp(j + "+", "g"),
			z = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
			W = new RegExp("^" + j + "*," + j + "*"),
			X = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
			V = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"),
			$ = new RegExp(R),
			J = new RegExp("^" + I + "$"),
			K = {
				ID: new RegExp("^#(" + F + ")"),
				CLASS: new RegExp("^\\.(" + F + ")"),
				TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + q),
				PSEUDO: new RegExp("^" + R),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + B + ")$", "i"),
				needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
			},
			Q = /^(?:input|select|textarea|button)$/i,
			G = /^h\d$/i,
			Y = /^[^{]+\{\s*\[native \w/,
			Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			et = /[+~]/,
			tt = /'|\\/g,
			nt = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"),
			rt = function(e, t, n) {
				var r = "0x" + t - 65536;
				return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
			},
			it = function() {
				h()
			};
		try {
			D.apply(O = P.call(E.childNodes), E.childNodes), O[E.childNodes.length].nodeType
		} catch(st) {
			D = {
				apply: O.length ? function(e, t) {
					_.apply(e, P.call(t))
				} : function(e, t) {
					var n = e.length,
						r = 0;
					while(e[n++] = t[r++]);
					e.length = n - 1
				}
			}
		}
		n = ot.support = {}, s = ot.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? t.nodeName !== "HTML" : !1
		}, h = ot.setDocument = function(e) {
			var t, i, o = e ? e.ownerDocument || e : E;
			if(o === p || o.nodeType !== 9 || !o.documentElement) return p;
			p = o, d = o.documentElement, i = o.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", it, !1) : i.attachEvent && i.attachEvent("onunload", it)), v = !s(o), n.attributes = ft(function(e) {
				return e.className = "i", !e.getAttribute("className")
			}), n.getElementsByTagName = ft(function(e) {
				return e.appendChild(o.createComment("")), !e.getElementsByTagName("*").length
			}), n.getElementsByClassName = Y.test(o.getElementsByClassName), n.getById = ft(function(e) {
				return d.appendChild(e).id = w, !o.getElementsByName || !o.getElementsByName(w).length
			}), n.getById ? (r.find.ID = function(e, t) {
				if(typeof t.getElementById != "undefined" && v) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			}, r.filter.ID = function(e) {
				var t = e.replace(nt, rt);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (delete r.find.ID, r.filter.ID = function(e) {
				var t = e.replace(nt, rt);
				return function(e) {
					var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), r.find.TAG = n.getElementsByTagName ? function(e, t) {
				if(typeof t.getElementsByTagName != "undefined") return t.getElementsByTagName(e);
				if(n.qsa) return t.querySelectorAll(e)
			} : function(e, t) {
				var n, r = [],
					i = 0,
					s = t.getElementsByTagName(e);
				if(e === "*") {
					while(n = s[i++]) n.nodeType === 1 && r.push(n);
					return r
				}
				return s
			}, r.find.CLASS = n.getElementsByClassName && function(e, t) {
				if(v) return t.getElementsByClassName(e)
			}, g = [], m = [];
			if(n.qsa = Y.test(o.querySelectorAll)) ft(function(e) {
				d.appendChild(e).innerHTML = "<a id='" + w + "'></a>" + "<select id='" + w + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + B + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
			}), ft(function(e) {
				var t = o.createElement("input");
				t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
			});
			return(n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ft(function(e) {
				n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", R)
			}), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function(e, t) {
				var n = e.nodeType === 9 ? e.documentElement : e,
					r = t && t.parentNode;
				return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
			} : function(e, t) {
				if(t)
					while(t = t.parentNode)
						if(t === e) return !0;
				return !1
			}, k = t ? function(e, t) {
				if(e === t) return c = !0, 0;
				var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
				return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === o || e.ownerDocument === E && b(E, e) ? -1 : t === o || t.ownerDocument === E && b(E, t) ? 1 : l ? H(l, e) - H(l, t) : 0 : r & 4 ? -1 : 1)
			} : function(e, t) {
				if(e === t) return c = !0, 0;
				var n, r = 0,
					i = e.parentNode,
					s = t.parentNode,
					u = [e],
					a = [t];
				if(!i || !s) return e === o ? -1 : t === o ? 1 : i ? -1 : s ? 1 : l ? H(l, e) - H(l, t) : 0;
				if(i === s) return ct(e, t);
				n = e;
				while(n = n.parentNode) u.unshift(n);
				n = t;
				while(n = n.parentNode) a.unshift(n);
				while(u[r] === a[r]) r++;
				return r ? ct(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
			}, o
		}, ot.matches = function(e, t) {
			return ot(e, null, null, t)
		}, ot.matchesSelector = function(e, t) {
			(e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']");
			if(n.matchesSelector && v && (!g || !g.test(t)) && (!m || !m.test(t))) try {
				var r = y.call(e, t);
				if(r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
			} catch(i) {}
			return ot(t, p, null, [e]).length > 0
		}, ot.contains = function(e, t) {
			return(e.ownerDocument || e) !== p && h(e), b(e, t)
		}, ot.attr = function(e, t) {
			(e.ownerDocument || e) !== p && h(e);
			var i = r.attrHandle[t.toLowerCase()],
				s = i && A.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
			return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
		}, ot.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, ot.uniqueSort = function(e) {
			var t, r = [],
				i = 0,
				s = 0;
			c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
			if(c) {
				while(t = e[s++]) t === e[s] && (i = r.push(s));
				while(i--) e.splice(r[i], 1)
			}
			return l = null, e
		}, i = ot.getText = function(e) {
			var t, n = "",
				r = 0,
				s = e.nodeType;
			if(!s)
				while(t = e[r++]) n += i(t);
			else if(s === 1 || s === 9 || s === 11) {
				if(typeof e.textContent == "string") return e.textContent;
				for(e = e.firstChild; e; e = e.nextSibling) n += i(e)
			} else if(s === 3 || s === 4) return e.nodeValue;
			return n
		}, r = ot.selectors = {
			cacheLength: 50,
			createPseudo: at,
			match: K,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && ot.error(e[0]), e
				},
				PSEUDO: function(e) {
					var t, n = !e[6] && e[2];
					return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					var t = e.replace(nt, rt).toLowerCase();
					return e === "*" ? function() {
						return !0
					} : function(e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				CLASS: function(e) {
					var t = T[e + " "];
					return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && T(e, function(e) {
						return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute != "undefined" && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, t, n) {
					return function(r) {
						var i = ot.attr(r, e);
						return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i.replace(U, " ") + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
					}
				},
				CHILD: function(e, t, n, r, i) {
					var s = e.slice(0, 3) !== "nth",
						o = e.slice(-4) !== "last",
						u = t === "of-type";
					return r === 1 && i === 0 ? function(e) {
						return !!e.parentNode
					} : function(t, n, a) {
						var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
							m = t.parentNode,
							g = u && t.nodeName.toLowerCase(),
							y = !a && !u;
						if(m) {
							if(s) {
								while(v) {
									c = t;
									while(c = c[v])
										if(u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
									d = v = e === "only" && !d && "nextSibling"
								}
								return !0
							}
							d = [o ? m.firstChild : m.lastChild];
							if(o && y) {
								l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
								while(c = ++p && c && c[v] || (h = p = 0) || d.pop())
									if(c.nodeType === 1 && ++h && c === t) {
										l[e] = [S, p, h];
										break
									}
							} else if(y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
							else
								while(c = ++p && c && c[v] || (h = p = 0) || d.pop())
									if((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
										y && ((c[w] || (c[w] = {}))[e] = [S, h]);
										if(c === t) break
									} return h -= i, h === r || h % r === 0 && h / r >= 0
						}
					}
				},
				PSEUDO: function(e, t) {
					var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
					return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
						var r, s = i(e, t),
							o = s.length;
						while(o--) r = H(e, s[o]), e[r] = !(n[r] = s[o])
					}) : function(e) {
						return i(e, 0, n)
					}) : i
				}
			},
			pseudos: {
				not: at(function(e) {
					var t = [],
						n = [],
						r = u(e.replace(z, "$1"));
					return r[w] ? at(function(e, t, n, i) {
						var s, o = r(e, null, i, []),
							u = e.length;
						while(u--)
							if(s = o[u]) e[u] = !(t[u] = s)
					}) : function(e, i, s) {
						return t[0] = e, r(t, null, s, n), t[0] = null, !n.pop()
					}
				}),
				has: at(function(e) {
					return function(t) {
						return ot(e, t).length > 0
					}
				}),
				contains: at(function(e) {
					return e = e.replace(nt, rt),
						function(t) {
							return(t.textContent || t.innerText || i(t)).indexOf(e) > -1
						}
				}),
				lang: at(function(e) {
					return J.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
						function(t) {
							var n;
							do
								if(n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
							return !1
						}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root: function(e) {
					return e === d
				},
				focus: function(e) {
					return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return t === "input" && !!e.checked || t === "option" && !!e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				empty: function(e) {
					for(e = e.firstChild; e; e = e.nextSibling)
						if(e.nodeType < 6) return !1;
					return !0
				},
				parent: function(e) {
					return !r.pseudos.empty(e)
				},
				header: function(e) {
					return G.test(e.nodeName)
				},
				input: function(e) {
					return Q.test(e.nodeName)
				},
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return t === "input" && e.type === "button" || t === "button"
				},
				text: function(e) {
					var t;
					return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
				},
				first: dt(function() {
					return [0]
				}),
				last: dt(function(e, t) {
					return [t - 1]
				}),
				eq: dt(function(e, t, n) {
					return [n < 0 ? n + t : n]
				}),
				even: dt(function(e, t) {
					var n = 0;
					for(; n < t; n += 2) e.push(n);
					return e
				}),
				odd: dt(function(e, t) {
					var n = 1;
					for(; n < t; n += 2) e.push(n);
					return e
				}),
				lt: dt(function(e, t, n) {
					var r = n < 0 ? n + t : n;
					for(; --r >= 0;) e.push(r);
					return e
				}),
				gt: dt(function(e, t, n) {
					var r = n < 0 ? n + t : n;
					for(; ++r < t;) e.push(r);
					return e
				})
			}
		}, r.pseudos.nth = r.pseudos.eq;
		for(t in {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) r.pseudos[t] = ht(t);
		for(t in {
				submit: !0,
				reset: !0
			}) r.pseudos[t] = pt(t);
		return mt.prototype = r.filters = r.pseudos, r.setFilters = new mt, o = ot.tokenize = function(e, t) {
			var n, i, s, o, u, a, f, l = N[e + " "];
			if(l) return t ? 0 : l.slice(0);
			u = e, a = [], f = r.preFilter;
			while(u) {
				if(!n || (i = W.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
				n = !1;
				if(i = X.exec(u)) n = i.shift(), s.push({
					value: n,
					type: i[0].replace(z, " ")
				}), u = u.slice(n.length);
				for(o in r.filter)(i = K[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
					value: n,
					type: o,
					matches: i
				}), u = u.slice(n.length));
				if(!n) break
			}
			return t ? u.length : u ? ot.error(e) : N(e, a).slice(0)
		}, u = ot.compile = function(e, t) {
			var n, r = [],
				i = [],
				s = C[e + " "];
			if(!s) {
				t || (t = o(e)), n = t.length;
				while(n--) s = xt(t[n]), s[w] ? r.push(s) : i.push(s);
				s = C(e, Tt(i, r)), s.selector = e
			}
			return s
		}, a = ot.select = function(e, t, i, s) {
			var a, f, l, c, h, p = typeof e == "function" && e,
				d = !s && o(e = p.selector || e);
			i = i || [];
			if(d.length === 1) {
				f = d[0] = d[0].slice(0);
				if(f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
					t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0];
					if(!t) return i;
					p && (t = t.parentNode), e = e.slice(f.shift().value.length)
				}
				a = K.needsContext.test(e) ? 0 : f.length;
				while(a--) {
					l = f[a];
					if(r.relative[c = l.type]) break;
					if(h = r.find[c])
						if(s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && vt(t.parentNode) || t)) {
							f.splice(a, 1), e = s.length && gt(f);
							if(!e) return D.apply(i, s), i;
							break
						}
				}
			}
			return(p || u(e, d))(s, t, !v, i, et.test(e) && vt(t.parentNode) || t), i
		}, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = ft(function(e) {
			return e.compareDocumentPosition(p.createElement("div")) & 1
		}), ft(function(e) {
			return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
		}) || lt("type|href|height|width", function(e, t, n) {
			if(!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
		}), (!n.attributes || !ft(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
		})) && lt("value", function(e, t, n) {
			if(!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
		}), ft(function(e) {
			return e.getAttribute("disabled") == null
		}) || lt(B, function(e, t, n) {
			var r;
			if(!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
		}), ot
	}(window);
	jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
	var rneedsContext = jQuery.expr.match.needsContext,
		rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		risSimple = /^.[^:#\[\.,]*$/;
	jQuery.filter = function(e, t, n) {
		var r = t[0];
		return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function(e) {
			return e.nodeType === 1
		}))
	}, jQuery.fn.extend({
		find: function(e) {
			var t, n = this.length,
				r = [],
				i = this;
			if(typeof e != "string") return this.pushStack(jQuery(e).filter(function() {
				for(t = 0; t < n; t++)
					if(jQuery.contains(i[t], this)) return !0
			}));
			for(t = 0; t < n; t++) jQuery.find(e, i[t], r);
			return r = this.pushStack(n > 1 ? jQuery.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
		},
		filter: function(e) {
			return this.pushStack(winnow(this, e || [], !1))
		},
		not: function(e) {
			return this.pushStack(winnow(this, e || [], !0))
		},
		is: function(e) {
			return !!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], !1).length
		}
	});
	var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		init = jQuery.fn.init = function(e, t) {
			var n, r;
			if(!e) return this;
			if(typeof e == "string") {
				e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? n = [null, e, null] : n = rquickExpr.exec(e);
				if(n && (n[1] || !t)) {
					if(n[1]) {
						t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
						if(rsingleTag.test(n[1]) && jQuery.isPlainObject(t))
							for(n in t) jQuery.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
						return this
					}
					return r = document.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = document, this.selector = e, this
				}
				return !t || t.jquery ? (t || rootjQuery).find(e) : this.constructor(t).find(e)
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? typeof rootjQuery.ready != "undefined" ? rootjQuery.ready(e) : e(jQuery) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
		};
	init.prototype = jQuery.fn, rootjQuery = jQuery(document);
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		guaranteedUnique = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	jQuery.extend({
		dir: function(e, t, n) {
			var r = [],
				i = n !== undefined;
			while((e = e[t]) && e.nodeType !== 9)
				if(e.nodeType === 1) {
					if(i && jQuery(e).is(n)) break;
					r.push(e)
				}
			return r
		},
		sibling: function(e, t) {
			var n = [];
			for(; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
			return n
		}
	}), jQuery.fn.extend({
		has: function(e) {
			var t = jQuery(e, this),
				n = t.length;
			return this.filter(function() {
				var e = 0;
				for(; e < n; e++)
					if(jQuery.contains(this, t[e])) return !0
			})
		},
		closest: function(e, t) {
			var n, r = 0,
				i = this.length,
				s = [],
				o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
			for(; r < i; r++)
				for(n = this[r]; n && n !== t; n = n.parentNode)
					if(n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
						s.push(n);
						break
					}
			return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
		},
		index: function(e) {
			return e ? typeof e == "string" ? indexOf.call(jQuery(e), this[0]) : indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(e, t))))
		},
		addBack: function(e) {
			return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
		}
	}), jQuery.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && t.nodeType !== 11 ? t : null
		},
		parents: function(e) {
			return jQuery.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return jQuery.dir(e, "parentNode", n)
		},
		next: function(e) {
			return sibling(e, "nextSibling")
		},
		prev: function(e) {
			return sibling(e, "previousSibling")
		},
		nextAll: function(e) {
			return jQuery.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return jQuery.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return jQuery.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return jQuery.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return jQuery.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return jQuery.sibling(e.firstChild)
		},
		contents: function(e) {
			return e.contentDocument || jQuery.merge([], e.childNodes)
		}
	}, function(e, t) {
		jQuery.fn[e] = function(n, r) {
			var i = jQuery.map(this, t, n);
			return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
		}
	});
	var rnotwhite = /\S+/g,
		optionsCache = {};
	jQuery.Callbacks = function(e) {
		e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
		var t, n, r, i, s, o, u = [],
			a = !e.once && [],
			f = function(c) {
				t = e.memory && c, n = !0, o = i || 0, i = 0, s = u.length, r = !0;
				for(; u && o < s; o++)
					if(u[o].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
						t = !1;
						break
					}
				r = !1, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
			},
			l = {
				add: function() {
					if(u) {
						var n = u.length;
						(function o(t) {
							jQuery.each(t, function(t, n) {
								var r = jQuery.type(n);
								r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
							})
						})(arguments), r ? s = u.length : t && (i = n, f(t))
					}
					return this
				},
				remove: function() {
					return u && jQuery.each(arguments, function(e, t) {
						var n;
						while((n = jQuery.inArray(t, u, n)) > -1) u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
					}), this
				},
				has: function(e) {
					return e ? jQuery.inArray(e, u) > -1 : !!u && !!u.length
				},
				empty: function() {
					return u = [], s = 0, this
				},
				disable: function() {
					return u = a = t = undefined, this
				},
				disabled: function() {
					return !u
				},
				lock: function() {
					return a = undefined, t || l.disable(), this
				},
				locked: function() {
					return !a
				},
				fireWith: function(e, t) {
					return u && (!n || a) && (t = t || [], t = [e, t.slice ? t.slice() : t], r ? a.push(t) : f(t)), this
				},
				fire: function() {
					return l.fireWith(this, arguments), this
				},
				fired: function() {
					return !!n
				}
			};
		return l
	}, jQuery.extend({
		Deferred: function(e) {
			var t = [
					["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
					["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
					["notify", "progress", jQuery.Callbacks("memory")]
				],
				n = "pending",
				r = {
					state: function() {
						return n
					},
					always: function() {
						return i.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return jQuery.Deferred(function(n) {
							jQuery.each(t, function(t, s) {
								var o = jQuery.isFunction(e[t]) && e[t];
								i[s[1]](function() {
									var e = o && o.apply(this, arguments);
									e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return e != null ? jQuery.extend(e, r) : r
					}
				},
				i = {};
			return r.pipe = r.then, jQuery.each(t, function(e, s) {
				var o = s[2],
					u = s[3];
				r[s[1]] = o.add, u && o.add(function() {
					n = u
				}, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
					return i[s[0] + "With"](this === i ? r : this, arguments), this
				}, i[s[0] + "With"] = o.fireWith
			}), r.promise(i), e && e.call(i, i), i
		},
		when: function(e) {
			var t = 0,
				n = slice.call(arguments),
				r = n.length,
				i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0,
				s = i === 1 ? e : jQuery.Deferred(),
				o = function(e, t, n) {
					return function(r) {
						t[e] = this, n[e] = arguments.length > 1 ? slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
					}
				},
				u, a, f;
			if(r > 1) {
				u = new Array(r), a = new Array(r), f = new Array(r);
				for(; t < r; t++) n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
			}
			return i || s.resolveWith(f, n), s.promise()
		}
	});
	var readyList;
	jQuery.fn.ready = function(e) {
		return jQuery.ready.promise().done(e), this
	}, jQuery.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? jQuery.readyWait++ : jQuery.ready(!0)
		},
		ready: function(e) {
			if(e === !0 ? --jQuery.readyWait : jQuery.isReady) return;
			jQuery.isReady = !0;
			if(e !== !0 && --jQuery.readyWait > 0) return;
			readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))
		}
	}), jQuery.ready.promise = function(e) {
		return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(e)
	}, jQuery.ready.promise();
	var access = jQuery.access = function(e, t, n, r, i, s, o) {
		var u = 0,
			a = e.length,
			f = n == null;
		if(jQuery.type(n) === "object") {
			i = !0;
			for(u in n) jQuery.access(e, t, u, n[u], !0, s, o)
		} else if(r !== undefined) {
			i = !0, jQuery.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
				return f.call(jQuery(e), n)
			}));
			if(t)
				for(; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
		}
		return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
	};
	jQuery.acceptData = function(e) {
		return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
	}, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
		key: function(e) {
			if(!Data.accepts(e)) return 0;
			var t = {},
				n = e[this.expando];
			if(!n) {
				n = Data.uid++;
				try {
					t[this.expando] = {
						value: n
					}, Object.defineProperties(e, t)
				} catch(r) {
					t[this.expando] = n, jQuery.extend(e, t)
				}
			}
			return this.cache[n] || (this.cache[n] = {}), n
		},
		set: function(e, t, n) {
			var r, i = this.key(e),
				s = this.cache[i];
			if(typeof t == "string") s[t] = n;
			else if(jQuery.isEmptyObject(s)) jQuery.extend(this.cache[i], t);
			else
				for(r in t) s[r] = t[r];
			return s
		},
		get: function(e, t) {
			var n = this.cache[this.key(e)];
			return t === undefined ? n : n[t]
		},
		access: function(e, t, n) {
			var r;
			return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
		},
		remove: function(e, t) {
			var n, r, i, s = this.key(e),
				o = this.cache[s];
			if(t === undefined) this.cache[s] = {};
			else {
				jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(rnotwhite) || [])), n = r.length;
				while(n--) delete o[r[n]]
			}
		},
		hasData: function(e) {
			return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
		},
		discard: function(e) {
			e[this.expando] && delete this.cache[e[this.expando]]
		}
	};
	var data_priv = new Data,
		data_user = new Data,
		rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;
	jQuery.extend({
		hasData: function(e) {
			return data_user.hasData(e) || data_priv.hasData(e)
		},
		data: function(e, t, n) {
			return data_user.access(e, t, n)
		},
		removeData: function(e, t) {
			data_user.remove(e, t)
		},
		_data: function(e, t, n) {
			return data_priv.access(e, t, n)
		},
		_removeData: function(e, t) {
			data_priv.remove(e, t)
		}
	}), jQuery.fn.extend({
		data: function(e, t) {
			var n, r, i, s = this[0],
				o = s && s.attributes;
			if(e === undefined) {
				if(this.length) {
					i = data_user.get(s);
					if(s.nodeType === 1 && !data_priv.get(s, "hasDataAttrs")) {
						n = o.length;
						while(n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.slice(5)), dataAttr(s, r, i[r])));
						data_priv.set(s, "hasDataAttrs", !0)
					}
				}
				return i
			}
			return typeof e == "object" ? this.each(function() {
				data_user.set(this, e)
			}) : access(this, function(t) {
				var n, r = jQuery.camelCase(e);
				if(s && t === undefined) {
					n = data_user.get(s, e);
					if(n !== undefined) return n;
					n = data_user.get(s, r);
					if(n !== undefined) return n;
					n = dataAttr(s, r, undefined);
					if(n !== undefined) return n;
					return
				}
				this.each(function() {
					var n = data_user.get(this, r);
					data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
				})
			}, null, t, arguments.length > 1, null, !0)
		},
		removeData: function(e) {
			return this.each(function() {
				data_user.remove(this, e)
			})
		}
	}), jQuery.extend({
		queue: function(e, t, n) {
			var r;
			if(e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = jQuery.queue(e, t),
				r = n.length,
				i = n.shift(),
				s = jQuery._queueHooks(e, t),
				o = function() {
					jQuery.dequeue(e, t)
				};
			i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return data_priv.get(e, n) || data_priv.access(e, n, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove(e, [t + "queue", n])
				})
			})
		}
	}), jQuery.fn.extend({
		queue: function(e, t) {
			var n = 2;
			return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function() {
				var n = jQuery.queue(this, e, t);
				jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				jQuery.dequeue(this, e)
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, t) {
			var n, r = 1,
				i = jQuery.Deferred(),
				s = this,
				o = this.length,
				u = function() {
					--r || i.resolveWith(s, [s])
				};
			typeof e != "string" && (t = e, e = undefined), e = e || "fx";
			while(o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
			return u(), i.promise(t)
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		cssExpand = ["Top", "Right", "Bottom", "Left"],
		isHidden = function(e, t) {
			return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
		},
		rcheckableType = /^(?:checkbox|radio)$/i;
	(function() {
		var e = document.createDocumentFragment(),
			t = e.appendChild(document.createElement("div")),
			n = document.createElement("input");
		n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), support.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
	})();
	var strundefined = typeof undefined;
	support.focusinBubbles = "onfocusin" in window;
	var rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	jQuery.event = {
		global: {},
		add: function(e, t, n, r, i) {
			var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
			if(!m) return;
			n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function(t) {
				return typeof jQuery !== strundefined && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : undefined
			}), t = (t || "").match(rnotwhite) || [""], f = t.length;
			while(f--) {
				u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
				if(!p) continue;
				c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({
					type: p,
					origType: v,
					data: r,
					handler: n,
					guid: n.guid,
					selector: i,
					needsContext: i && jQuery.expr.match.needsContext.test(i),
					namespace: d.join(".")
				}, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === !1) && e.addEventListener && e.addEventListener(p, o, !1)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = !0
			}
		},
		remove: function(e, t, n, r, i) {
			var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
			if(!m || !(a = m.events)) return;
			t = (t || "").match(rnotwhite) || [""], f = t.length;
			while(f--) {
				u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
				if(!p) {
					for(p in a) jQuery.event.remove(e, p + t[f], n, r, !0);
					continue
				}
				c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
				while(s--) l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
				o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && jQuery.removeEvent(e, p, m.handle), delete a[p])
			}
			jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
		},
		trigger: function(e, t, n, r) {
			var i, s, o, u, a, f, l, c = [n || document],
				h = hasOwn.call(e, "type") ? e.type : e,
				p = hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
			s = o = n = n || document;
			if(n.nodeType === 3 || n.nodeType === 8) return;
			if(rfocusMorph.test(h + jQuery.event.triggered)) return;
			h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
			if(!r && l.trigger && l.trigger.apply(n, t) === !1) return;
			if(!r && !l.noBubble && !jQuery.isWindow(n)) {
				u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
				for(; s; s = s.parentNode) c.push(s), o = s;
				o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
			}
			i = 0;
			while((s = c[i++]) && !e.isPropagationStopped()) e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && f.apply && jQuery.acceptData(s) && (e.result = f.apply(s, t), e.result === !1 && e.preventDefault());
			return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === !1) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
		},
		dispatch: function(e) {
			e = jQuery.event.fix(e);
			var t, n, r, i, s, o = [],
				u = slice.call(arguments),
				a = (data_priv.get(this, "events") || {})[e.type] || [],
				f = jQuery.event.special[e.type] || {};
			u[0] = e, e.delegateTarget = this;
			if(f.preDispatch && f.preDispatch.call(this, e) === !1) return;
			o = jQuery.event.handlers.call(this, e, a), t = 0;
			while((i = o[t++]) && !e.isPropagationStopped()) {
				e.currentTarget = i.elem, n = 0;
				while((s = i.handlers[n++]) && !e.isImmediatePropagationStopped())
					if(!e.namespace_re || e.namespace_re.test(s.namespace)) e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
			}
			return f.postDispatch && f.postDispatch.call(this, e), e.result
		},
		handlers: function(e, t) {
			var n, r, i, s, o = [],
				u = t.delegateCount,
				a = e.target;
			if(u && a.nodeType && (!e.button || e.type !== "click"))
				for(; a !== this; a = a.parentNode || this)
					if(a.disabled !== !0 || e.type !== "click") {
						r = [];
						for(n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
						r.length && o.push({
							elem: a,
							handlers: r
						})
					}
			return u < t.length && o.push({
				elem: this,
				handlers: t.slice(u)
			}), o
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, t) {
				var n, r, i, s = t.button;
				return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
			}
		},
		fix: function(e) {
			if(e[jQuery.expando]) return e;
			var t, n, r, i = e.type,
				s = e,
				o = this.fixHooks[i];
			o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
			while(t--) n = r[t], e[n] = s[n];
			return e.target || (e.target = document), e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if(this !== safeActiveElement() && this.focus) return this.focus(), !1
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if(this === safeActiveElement() && this.blur) return this.blur(), !1
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if(this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
				},
				_default: function(e) {
					return jQuery.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, r) {
			var i = jQuery.extend(new jQuery.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	}, jQuery.removeEvent = function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	}, jQuery.Event = function(e, t) {
		if(!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
		e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
	}, jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
			this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
		}
	}, jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function(e, t) {
		jQuery.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, r = this,
					i = e.relatedTarget,
					s = e.handleObj;
				if(!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
				return n
			}
		}
	}), support.focusinBubbles || jQuery.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = function(e) {
			jQuery.event.simulate(t, e.target, jQuery.event.fix(e), !0)
		};
		jQuery.event.special[t] = {
			setup: function() {
				var r = this.ownerDocument || this,
					i = data_priv.access(r, t);
				i || r.addEventListener(e, n, !0), data_priv.access(r, t, (i || 0) + 1)
			},
			teardown: function() {
				var r = this.ownerDocument || this,
					i = data_priv.access(r, t) - 1;
				i ? data_priv.access(r, t, i) : (r.removeEventListener(e, n, !0), data_priv.remove(r, t))
			}
		}
	}), jQuery.fn.extend({
		on: function(e, t, n, r, i) {
			var s, o;
			if(typeof e == "object") {
				typeof t != "string" && (n = n || t, t = undefined);
				for(o in e) this.on(o, t, n, e[o], i);
				return this
			}
			n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
			if(r === !1) r = returnFalse;
			else if(!r) return this;
			return i === 1 && (s = r, r = function(e) {
				return jQuery().off(e), s.apply(this, arguments)
			}, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function() {
				jQuery.event.add(this, e, r, n, t)
			})
		},
		one: function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off: function(e, t, n) {
			var r, i;
			if(e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
			if(typeof e == "object") {
				for(i in e) this.off(i, t, e[i]);
				return this
			}
			if(t === !1 || typeof t == "function") n = t, t = undefined;
			return n === !1 && (n = returnFalse), this.each(function() {
				jQuery.event.remove(this, e, n, t)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				jQuery.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			if(n) return jQuery.event.trigger(e, t, n, !0)
		}
	});
	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
		clone: function(e, t, n) {
			var r, i, s, o, u = e.cloneNode(!0),
				a = jQuery.contains(e.ownerDocument, e);
			if(!support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
				o = getAll(u), s = getAll(e);
				for(r = 0, i = s.length; r < i; r++) fixInput(s[r], o[r])
			}
			if(t)
				if(n) {
					s = s || getAll(e), o = o || getAll(u);
					for(r = 0, i = s.length; r < i; r++) cloneCopyEvent(s[r], o[r])
				} else cloneCopyEvent(e, u);
			return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
		},
		buildFragment: function(e, t, n, r) {
			var i, s, o, u, a, f, l = t.createDocumentFragment(),
				c = [],
				h = 0,
				p = e.length;
			for(; h < p; h++) {
				i = e[h];
				if(i || i === 0)
					if(jQuery.type(i) === "object") jQuery.merge(c, i.nodeType ? [i] : i);
					else if(!rhtml.test(i)) c.push(t.createTextNode(i));
				else {
					s = s || l.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
					while(f--) s = s.lastChild;
					jQuery.merge(c, s.childNodes), s = l.firstChild, s.textContent = ""
				}
			}
			l.textContent = "", h = 0;
			while(i = c[h++]) {
				if(r && jQuery.inArray(i, r) !== -1) continue;
				a = jQuery.contains(i.ownerDocument, i), s = getAll(l.appendChild(i), "script"), a && setGlobalEval(s);
				if(n) {
					f = 0;
					while(i = s[f++]) rscriptType.test(i.type || "") && n.push(i)
				}
			}
			return l
		},
		cleanData: function(e) {
			var t, n, r, i, s = jQuery.event.special,
				o = 0;
			for(;
				(n = e[o]) !== undefined; o++) {
				if(jQuery.acceptData(n)) {
					i = n[data_priv.expando];
					if(i && (t = data_priv.cache[i])) {
						if(t.events)
							for(r in t.events) s[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle);
						data_priv.cache[i] && delete data_priv.cache[i]
					}
				}
				delete data_user.cache[n[data_user.expando]]
			}
		}
	}), jQuery.fn.extend({
		text: function(e) {
			return access(this, function(e) {
				return e === undefined ? jQuery.text(this) : this.empty().each(function() {
					if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) this.textContent = e
				})
			}, null, e, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(e) {
				if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var t = manipulationTarget(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(e) {
				if(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var t = manipulationTarget(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			var n, r = e ? jQuery.filter(e, this) : this,
				i = 0;
			for(;
				(n = r[i]) != null; i++) !t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		empty: function() {
			var e, t = 0;
			for(;
				(e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
			return this
		},
		clone: function(e, t) {
			return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
				return jQuery.clone(this, e, t)
			})
		},
		html: function(e) {
			return access(this, function(e) {
				var t = this[0] || {},
					n = 0,
					r = this.length;
				if(e === undefined && t.nodeType === 1) return t.innerHTML;
				if(typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
					e = e.replace(rxhtmlTag, "<$1></$2>");
					try {
						for(; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
						t = 0
					} catch(i) {}
				}
				t && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = arguments[0];
			return this.domManip(arguments, function(t) {
				e = this.parentNode, jQuery.cleanData(getAll(this)), e && e.replaceChild(t, this)
			}), e && (e.length || e.nodeType) ? this : this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t) {
			e = concat.apply([], e);
			var n, r, i, s, o, u, a = 0,
				f = this.length,
				l = this,
				c = f - 1,
				h = e[0],
				p = jQuery.isFunction(h);
			if(p || f > 1 && typeof h == "string" && !support.checkClone && rchecked.test(h)) return this.each(function(n) {
				var r = l.eq(n);
				p && (e[0] = h.call(this, n, r.html())), r.domManip(e, t)
			});
			if(f) {
				n = jQuery.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, n.childNodes.length === 1 && (n = r);
				if(r) {
					i = jQuery.map(getAll(n, "script"), disableScript), s = i.length;
					for(; a < f; a++) o = n, a !== c && (o = jQuery.clone(o, !0, !0), s && jQuery.merge(i, getAll(o, "script"))), t.call(this[a], o, a);
					if(s) {
						u = i[i.length - 1].ownerDocument, jQuery.map(i, restoreScript);
						for(a = 0; a < s; a++) o = i[a], rscriptType.test(o.type || "") && !data_priv.access(o, "globalEval") && jQuery.contains(u, o) && (o.src ? jQuery._evalUrl && jQuery._evalUrl(o.src) : jQuery.globalEval(o.textContent.replace(rcleanScript, "")))
					}
				}
			}
			return this
		}
	}), jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		jQuery.fn[e] = function(e) {
			var n, r = [],
				i = jQuery(e),
				s = i.length - 1,
				o = 0;
			for(; o <= s; o++) n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), push.apply(r, n.get());
			return this.pushStack(r)
		}
	});
	var iframe, elemdisplay = {},
		rmargin = /^margin/,
		rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
		getStyles = function(e) {
			return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : window.getComputedStyle(e, null)
		};
	(function() {
		function s() {
			i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i.innerHTML = "", n.appendChild(r);
			var s = window.getComputedStyle(i, null);
			e = s.top !== "1%", t = s.width === "4px", n.removeChild(r)
		}
		var e, t, n = document.documentElement,
			r = document.createElement("div"),
			i = document.createElement("div");
		if(!i.style) return;
		i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = i.style.backgroundClip === "content-box", r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", r.appendChild(i), window.getComputedStyle && jQuery.extend(support, {
			pixelPosition: function() {
				return s(), e
			},
			boxSizingReliable: function() {
				return t == null && s(), t
			},
			reliableMarginRight: function() {
				var e, t = i.appendChild(document.createElement("div"));
				return t.style.cssText = i.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", i.style.width = "1px", n.appendChild(r), e = !parseFloat(window.getComputedStyle(t, null).marginRight), n.removeChild(r), i.removeChild(t), e
			}
		})
	})(), jQuery.swap = function(e, t, n, r) {
		var i, s, o = {};
		for(s in t) o[s] = e.style[s], e.style[s] = t[s];
		i = n.apply(e, r || []);
		for(s in t) e.style[s] = o[s];
		return i
	};
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
		rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];
	jQuery.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if(t) {
						var n = curCSS(e, "opacity");
						return n === "" ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": "cssFloat"
		},
		style: function(e, t, n, r) {
			if(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
			var i, s, o, u = jQuery.camelCase(t),
				a = e.style;
			t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
			if(n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
			s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
			if(n == null || n !== n) return;
			s === "number" && !jQuery.cssNumber[u] && (n += "px"), !support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
			if(!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
		},
		css: function(e, t, n, r) {
			var i, s, o, u = jQuery.camelCase(t);
			return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
		}
	}), jQuery.each(["height", "width"], function(e, t) {
		jQuery.cssHooks[t] = {
			get: function(e, n, r) {
				if(n) return rdisplayswap.test(jQuery.css(e, "display")) && e.offsetWidth === 0 ? jQuery.swap(e, cssShow, function() {
					return getWidthOrHeight(e, t, r)
				}) : getWidthOrHeight(e, t, r)
			},
			set: function(e, n, r) {
				var i = r && getStyles(e);
				return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
			}
		}
	}), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(e, t) {
		if(t) return jQuery.swap(e, {
			display: "inline-block"
		}, curCSS, [e, "marginRight"])
	}), jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		jQuery.cssHooks[e + t] = {
			expand: function(n) {
				var r = 0,
					i = {},
					s = typeof n == "string" ? n.split(" ") : [n];
				for(; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
				return i
			}
		}, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
	}), jQuery.fn.extend({
		css: function(e, t) {
			return access(this, function(e, t, n) {
				var r, i, s = {},
					o = 0;
				if(jQuery.isArray(t)) {
					r = getStyles(e), i = t.length;
					for(; o < i; o++) s[t[o]] = jQuery.css(e, t[o], !1, r);
					return s
				}
				return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
			}, e, t, arguments.length > 1)
		},
		show: function() {
			return showHide(this, !0)
		},
		hide: function() {
			return showHide(this)
		},
		toggle: function(e) {
			return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
				isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
			})
		}
	}), jQuery.Tween = Tween, Tween.prototype = {
		constructor: Tween,
		init: function(e, t, n, r, i, s) {
			this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = Tween.propHooks[this.prop];
			return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = Tween.propHooks[this.prop];
			return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
		}
	}, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
			},
			set: function(e) {
				jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, jQuery.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
	var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [function(e, t) {
				var n = this.createTween(e, t),
					r = n.cur(),
					i = rfxnum.exec(t),
					s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"),
					o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)),
					u = 1,
					a = 20;
				if(o && o[3] !== s) {
					s = s || o[3], i = i || [], o = +r || 1;
					do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
				}
				return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
			}]
		};
	jQuery.Animation = jQuery.extend(Animation, {
			tweener: function(e, t) {
				jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
				var n, r = 0,
					i = e.length;
				for(; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
			},
			prefilter: function(e, t) {
				t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
			}
		}), jQuery.speed = function(e, t, n) {
			var r = e && typeof e == "object" ? jQuery.extend({}, e) : {
				complete: n || !n && t || jQuery.isFunction(e) && e,
				duration: e,
				easing: n && t || t && !jQuery.isFunction(t) && t
			};
			r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
			if(r.queue == null || r.queue === !0) r.queue = "fx";
			return r.old = r.complete, r.complete = function() {
				jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
			}, r
		}, jQuery.fn.extend({
			fadeTo: function(e, t, n, r) {
				return this.filter(isHidden).css("opacity", 0).show().end().animate({
					opacity: t
				}, e, n, r)
			},
			animate: function(e, t, n, r) {
				var i = jQuery.isEmptyObject(e),
					s = jQuery.speed(t, n, r),
					o = function() {
						var t = Animation(this, jQuery.extend({}, e), s);
						(i || data_priv.get(this, "finish")) && t.stop(!0)
					};
				return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
			},
			stop: function(e, t, n) {
				var r = function(e) {
					var t = e.stop;
					delete e.stop, t(n)
				};
				return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
					var t = !0,
						i = e != null && e + "queueHooks",
						s = jQuery.timers,
						o = data_priv.get(this);
					if(i) o[i] && o[i].stop && r(o[i]);
					else
						for(i in o) o[i] && o[i].stop && rrun.test(i) && r(o[i]);
					for(i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
					(t || !n) && jQuery.dequeue(this, e)
				})
			},
			finish: function(e) {
				return e !== !1 && (e = e || "fx"), this.each(function() {
					var t, n = data_priv.get(this),
						r = n[e + "queue"],
						i = n[e + "queueHooks"],
						s = jQuery.timers,
						o = r ? r.length : 0;
					n.finish = !0, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
					for(t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
					for(t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
					delete n.finish
				})
			}
		}), jQuery.each(["toggle", "show", "hide"], function(e, t) {
			var n = jQuery.fn[t];
			jQuery.fn[t] = function(e, r, i) {
				return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
			}
		}), jQuery.each({
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: {
				opacity: "show"
			},
			fadeOut: {
				opacity: "hide"
			},
			fadeToggle: {
				opacity: "toggle"
			}
		}, function(e, t) {
			jQuery.fn[e] = function(e, n, r) {
				return this.animate(t, e, n, r)
			}
		}), jQuery.timers = [], jQuery.fx.tick = function() {
			var e, t = 0,
				n = jQuery.timers;
			fxNow = jQuery.now();
			for(; t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
			n.length || jQuery.fx.stop(), fxNow = undefined
		}, jQuery.fx.timer = function(e) {
			jQuery.timers.push(e), e() ? jQuery.fx.start() : jQuery.timers.pop()
		}, jQuery.fx.interval = 13, jQuery.fx.start = function() {
			timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
		}, jQuery.fx.stop = function() {
			clearInterval(timerId), timerId = null
		}, jQuery.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, jQuery.fn.delay = function(e, t) {
			return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var r = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(r)
				}
			})
		},
		function() {
			var e = document.createElement("input"),
				t = document.createElement("select"),
				n = t.appendChild(document.createElement("option"));
			e.type = "checkbox", support.checkOn = e.value !== "", support.optSelected = n.selected, t.disabled = !0, support.optDisabled = !n.disabled, e = document.createElement("input"), e.value = "t", e.type = "radio", support.radioValue = e.value === "t"
		}();
	var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
	jQuery.fn.extend({
		attr: function(e, t) {
			return access(this, jQuery.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				jQuery.removeAttr(this, e)
			})
		}
	}), jQuery.extend({
		attr: function(e, t, n) {
			var r, i, s = e.nodeType;
			if(!e || s === 3 || s === 8 || s === 2) return;
			if(typeof e.getAttribute === strundefined) return jQuery.prop(e, t, n);
			if(s !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
			if(n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
			if(n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
			jQuery.removeAttr(e, t)
		},
		removeAttr: function(e, t) {
			var n, r, i = 0,
				s = t && t.match(rnotwhite);
			if(s && e.nodeType === 1)
				while(n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if(!support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		}
	}), boolHook = {
		set: function(e, t, n) {
			return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
		}
	}, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(e, t) {
		var n = attrHandle[t] || jQuery.find.attr;
		attrHandle[t] = function(e, t, r) {
			var i, s;
			return r || (s = attrHandle[t], attrHandle[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, attrHandle[t] = s), i
		}
	});
	var rfocusable = /^(?:input|select|textarea|button)$/i;
	jQuery.fn.extend({
		prop: function(e, t) {
			return access(this, jQuery.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return this.each(function() {
				delete this[jQuery.propFix[e] || e]
			})
		}
	}), jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, t, n) {
			var r, i, s, o = e.nodeType;
			if(!e || o === 3 || o === 8 || o === 2) return;
			return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
				}
			}
		}
	}), support.optSelected || (jQuery.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && t.parentNode && t.parentNode.selectedIndex, null
		}
	}), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		jQuery.propFix[this.toLowerCase()] = this
	});
	var rclass = /[\t\r\n\f]/g;
	jQuery.fn.extend({
		addClass: function(e) {
			var t, n, r, i, s, o, u = typeof e == "string" && e,
				a = 0,
				f = this.length;
			if(jQuery.isFunction(e)) return this.each(function(t) {
				jQuery(this).addClass(e.call(this, t, this.className))
			});
			if(u) {
				t = (e || "").match(rnotwhite) || [];
				for(; a < f; a++) {
					n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
					if(r) {
						s = 0;
						while(i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
						o = jQuery.trim(r), n.className !== o && (n.className = o)
					}
				}
			}
			return this
		},
		removeClass: function(e) {
			var t, n, r, i, s, o, u = arguments.length === 0 || typeof e == "string" && e,
				a = 0,
				f = this.length;
			if(jQuery.isFunction(e)) return this.each(function(t) {
				jQuery(this).removeClass(e.call(this, t, this.className))
			});
			if(u) {
				t = (e || "").match(rnotwhite) || [];
				for(; a < f; a++) {
					n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
					if(r) {
						s = 0;
						while(i = t[s++])
							while(r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
						o = e ? jQuery.trim(r) : "", n.className !== o && (n.className = o)
					}
				}
			}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e;
			return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each(function(n) {
				jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function() {
				if(n === "string") {
					var t, r = 0,
						i = jQuery(this),
						s = e.match(rnotwhite) || [];
					while(t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
				} else if(n === strundefined || n === "boolean") this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : data_priv.get(this, "__className__") || ""
			})
		},
		hasClass: function(e) {
			var t = " " + e + " ",
				n = 0,
				r = this.length;
			for(; n < r; n++)
				if(this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) return !0;
			return !1
		}
	});
	var rreturn = /\r/g;
	jQuery.fn.extend({
		val: function(e) {
			var t, n, r, i = this[0];
			if(!arguments.length) {
				if(i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
				return
			}
			return r = jQuery.isFunction(e), this.each(function(n) {
				var i;
				if(this.nodeType !== 1) return;
				r ? i = e.call(this, n, jQuery(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function(e) {
					return e == null ? "" : e + ""
				})), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
				if(!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
			})
		}
	}), jQuery.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = jQuery.find.attr(e, "value");
					return t != null ? t : jQuery.trim(jQuery.text(e))
				}
			},
			select: {
				get: function(e) {
					var t, n, r = e.options,
						i = e.selectedIndex,
						s = e.type === "select-one" || i < 0,
						o = s ? null : [],
						u = s ? i + 1 : r.length,
						a = i < 0 ? u : s ? i : 0;
					for(; a < u; a++) {
						n = r[a];
						if((n.selected || a === i) && (support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
							t = jQuery(n).val();
							if(s) return t;
							o.push(t)
						}
					}
					return o
				},
				set: function(e, t) {
					var n, r, i = e.options,
						s = jQuery.makeArray(t),
						o = i.length;
					while(o--) {
						r = i[o];
						if(r.selected = jQuery.inArray(r.value, s) >= 0) n = !0
					}
					return n || (e.selectedIndex = -1), s
				}
			}
		}
	}), jQuery.each(["radio", "checkbox"], function() {
		jQuery.valHooks[this] = {
			set: function(e, t) {
				if(jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
			}
		}, support.checkOn || (jQuery.valHooks[this].get = function(e) {
			return e.getAttribute("value") === null ? "on" : e.value
		})
	}), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		jQuery.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), jQuery.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function(e, t, n) {
			return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	var nonce = jQuery.now(),
		rquery = /\?/;
	jQuery.parseJSON = function(e) {
		return JSON.parse(e + "")
	}, jQuery.parseXML = function(e) {
		var t, n;
		if(!e || typeof e != "string") return null;
		try {
			n = new DOMParser, t = n.parseFromString(e, "text/xml")
		} catch(r) {
			t = undefined
		}
		return(!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
	};
	var rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*"),
		ajaxLocation = window.location.href,
		ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
	jQuery.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": jQuery.parseJSON,
				"text xml": jQuery.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function(e, t) {
			function S(e, t, s, u) {
				var f, m, g, b, E, S = t;
				if(y === 2) return;
				y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
				if(f) l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 || l.type === "HEAD" ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g);
				else {
					g = S;
					if(e || !S) S = "error", e < 0 && (e = 0)
				}
				w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
			}
			typeof e == "object" && (t = e, e = undefined), t = t || {};
			var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t),
				c = l.context || l,
				h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event,
				p = jQuery.Deferred(),
				d = jQuery.Callbacks("once memory"),
				v = l.statusCode || {},
				m = {},
				g = {},
				y = 0,
				b = "canceled",
				w = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if(y === 2) {
							if(!s) {
								s = {};
								while(t = rheaders.exec(i)) s[t[1].toLowerCase()] = t[2]
							}
							t = s[e.toLowerCase()]
						}
						return t == null ? null : t
					},
					getAllResponseHeaders: function() {
						return y === 2 ? i : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return y || (e = g[n] = g[n] || e, m[e] = t), this
					},
					overrideMimeType: function(e) {
						return y || (l.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if(e)
							if(y < 2)
								for(t in e) v[t] = [v[t], e[t]];
							else w.always(e[w.status]);
						return this
					},
					abort: function(e) {
						var t = e || b;
						return n && n.abort(t), S(0, t), this
					}
				};
			p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
			if(y === 2) return w;
			a = jQuery.event && l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + nonce++) : r + (rquery.test(r) ? "&" : "?") + "_=" + nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
			for(f in l.headers) w.setRequestHeader(f, l.headers[f]);
			if(!l.beforeSend || l.beforeSend.call(c, w, l) !== !1 && y !== 2) {
				b = "abort";
				for(f in {
						success: 1,
						error: 1,
						complete: 1
					}) w[f](l[f]);
				n = inspectPrefiltersOrTransports(transports, l, t, w);
				if(!n) S(-1, "No Transport");
				else {
					w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
						w.abort("timeout")
					}, l.timeout));
					try {
						y = 1, n.send(m, S)
					} catch(E) {
						if(!(y < 2)) throw E;
						S(-1, E)
					}
				}
				return w
			}
			return w.abort()
		},
		getJSON: function(e, t, n) {
			return jQuery.get(e, t, n, "json")
		},
		getScript: function(e, t) {
			return jQuery.get(e, undefined, t, "script")
		}
	}), jQuery.each(["get", "post"], function(e, t) {
		jQuery[t] = function(e, n, r, i) {
			return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
				url: e,
				type: t,
				dataType: i,
				data: n,
				success: r
			})
		}
	}), jQuery._evalUrl = function(e) {
		return jQuery.ajax({
			url: e,
			type: "GET",
			dataType: "script",
			async: !1,
			global: !1,
			"throws": !0
		})
	}, jQuery.fn.extend({
		wrapAll: function(e) {
			var t;
			return jQuery.isFunction(e) ? this.each(function(t) {
				jQuery(this).wrapAll(e.call(this, t))
			}) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
				var e = this;
				while(e.firstElementChild) e = e.firstElementChild;
				return e
			}).append(this)), this)
		},
		wrapInner: function(e) {
			return jQuery.isFunction(e) ? this.each(function(t) {
				jQuery(this).wrapInner(e.call(this, t))
			}) : this.each(function() {
				var t = jQuery(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = jQuery.isFunction(e);
			return this.each(function(n) {
				jQuery(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
			}).end()
		}
	}), jQuery.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0
	}, jQuery.expr.filters.visible = function(e) {
		return !jQuery.expr.filters.hidden(e)
	};
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	jQuery.param = function(e, t) {
		var n, r = [],
			i = function(e, t) {
				t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
		if(jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function() {
			i(this.name, this.value)
		});
		else
			for(n in e) buildParams(n, e[n], t, i);
		return r.join("&").replace(r20, "+")
	}, jQuery.fn.extend({
		serialize: function() {
			return jQuery.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = jQuery.prop(this, "elements");
				return e ? jQuery.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !rcheckableType.test(e))
			}).map(function(e, t) {
				var n = jQuery(this).val();
				return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(rCRLF, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(rCRLF, "\r\n")
				}
			}).get()
		}
	}), jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest
		} catch(e) {}
	};
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			0: 200,
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	window.attachEvent && window.attachEvent("onunload", function() {
		for(var e in xhrCallbacks) xhrCallbacks[e]()
	}), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(e) {
		var t;
		if(support.cors || xhrSupported && !e.crossDomain) return {
			send: function(n, r) {
				var i, s = e.xhr(),
					o = ++xhrId;
				s.open(e.type, e.url, e.async, e.username, e.password);
				if(e.xhrFields)
					for(i in e.xhrFields) s[i] = e.xhrFields[i];
				e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
				for(i in n) s.setRequestHeader(i, n[i]);
				t = function(e) {
					return function() {
						t && (delete xhrCallbacks[o], t = s.onload = s.onerror = null, e === "abort" ? s.abort() : e === "error" ? r(s.status, s.statusText) : r(xhrSuccessStatus[s.status] || s.status, s.statusText, typeof s.responseText == "string" ? {
							text: s.responseText
						} : undefined, s.getAllResponseHeaders()))
					}
				}, s.onload = t(), s.onerror = t("error"), t = xhrCallbacks[o] = t("abort");
				try {
					s.send(e.hasContent && e.data || null)
				} catch(u) {
					if(t) throw u
				}
			},
			abort: function() {
				t && t()
			}
		}
	}), jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return jQuery.globalEval(e), e
			}
		}
	}), jQuery.ajaxPrefilter("script", function(e) {
		e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
	}), jQuery.ajaxTransport("script", function(e) {
		if(e.crossDomain) {
			var t, n;
			return {
				send: function(r, i) {
					t = jQuery("<script>").prop({
						async: !0,
						charset: e.scriptCharset,
						src: e.url
					}).on("load error", n = function(e) {
						t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
					}), document.head.appendChild(t[0])
				},
				abort: function() {
					n && n()
				}
			}
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			return this[e] = !0, e
		}
	}), jQuery.ajaxPrefilter("json jsonp", function(e, t, n) {
		var r, i, s, o = e.jsonp !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
		if(o || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== !1 && (e.url += (rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
			return s || jQuery.error(r + " was not called"), s[0]
		}, e.dataTypes[0] = "json", i = window[r], window[r] = function() {
			s = arguments
		}, n.always(function() {
			window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
		}), "script"
	}), jQuery.parseHTML = function(e, t, n) {
		if(!e || typeof e != "string") return null;
		typeof t == "boolean" && (n = t, t = !1), t = t || document;
		var r = rsingleTag.exec(e),
			i = !n && [];
		return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && i.length && jQuery(i).remove(), jQuery.merge([], r.childNodes))
	};
	var _load = jQuery.fn.load;
	jQuery.fn.load = function(e, t, n) {
		if(typeof e != "string" && _load) return _load.apply(this, arguments);
		var r, i, s, o = this,
			u = e.indexOf(" ");
		return u >= 0 && (r = jQuery.trim(e.slice(u)), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
			url: e,
			type: i,
			dataType: "html",
			data: t
		}).done(function(e) {
			s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
		}).complete(n && function(e, t) {
			o.each(n, s || [e.responseText, t, e])
		}), this
	}, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		jQuery.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), jQuery.expr.filters.animated = function(e) {
		return jQuery.grep(jQuery.timers, function(t) {
			return e === t.elem
		}).length
	};
	var docElem = window.document.documentElement;
	jQuery.offset = {
		setOffset: function(e, t, n) {
			var r, i, s, o, u, a, f, l = jQuery.css(e, "position"),
				c = jQuery(e),
				h = {};
			l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
		}
	}, jQuery.fn.extend({
		offset: function(e) {
			if(arguments.length) return e === undefined ? this : this.each(function(t) {
				jQuery.offset.setOffset(this, e, t)
			});
			var t, n, r = this[0],
				i = {
					top: 0,
					left: 0
				},
				s = r && r.ownerDocument;
			if(!s) return;
			return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {
				top: i.top + n.pageYOffset - t.clientTop,
				left: i.left + n.pageXOffset - t.clientLeft
			}) : i
		},
		position: function() {
			if(!this[0]) return;
			var e, t, n = this[0],
				r = {
					top: 0,
					left: 0
				};
			return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", !0), r.left += jQuery.css(e[0], "borderLeftWidth", !0)), {
				top: t.top - r.top - jQuery.css(n, "marginTop", !0),
				left: t.left - r.left - jQuery.css(n, "marginLeft", !0)
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var e = this.offsetParent || docElem;
				while(e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
				return e || docElem
			})
		}
	}), jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, t) {
		var n = "pageYOffset" === t;
		jQuery.fn[e] = function(r) {
			return access(this, function(e, r, i) {
				var s = getWindow(e);
				if(i === undefined) return s ? s[t] : e[r];
				s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
			}, e, r, arguments.length, null)
		}
	}), jQuery.each(["top", "left"], function(e, t) {
		jQuery.cssHooks[t] = addGetHookIf(support.pixelPosition, function(e, n) {
			if(n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
		})
	}), jQuery.each({
		Height: "height",
		Width: "width"
	}, function(e, t) {
		jQuery.each({
			padding: "inner" + e,
			content: t,
			"": "outer" + e
		}, function(n, r) {
			jQuery.fn[r] = function(r, i) {
				var s = arguments.length && (n || typeof r != "boolean"),
					o = n || (r === !0 || i === !0 ? "margin" : "border");
				return access(this, function(t, n, r) {
					var i;
					return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
				}, t, s ? r : undefined, s, null)
			}
		})
	}), jQuery.fn.size = function() {
		return this.length
	}, jQuery.fn.andSelf = jQuery.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function() {
		return jQuery
	});
	var _jQuery = window.jQuery,
		_$ = window.$;
	return jQuery.noConflict = function(e) {
		return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
	}, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
}),
function(e, t) {
	typeof define == "function" && define.amd ? define("jquery.transit", ["jquery"], t) : typeof exports == "object" ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(e) {
	function r(e) {
		if(e in t.style) return e;
		var n = ["Moz", "Webkit", "O", "ms"],
			r = e.charAt(0).toUpperCase() + e.substr(1);
		for(var i = 0; i < n.length; ++i) {
			var s = n[i] + r;
			if(s in t.style) return s
		}
	}

	function i() {
		return t.style[n.transform] = "", t.style[n.transform] = "rotateY(90deg)", t.style[n.transform] !== ""
	}

	function f(e) {
		return typeof e == "string" && this.parse(e), this
	}

	function l(e, t, n) {
		t === !0 ? e.queue(n) : t ? e.queue(t, n) : e.each(function() {
			n.call(this)
		})
	}

	function c(t) {
		var r = [];
		return e.each(t, function(t) {
			t = e.camelCase(t), t = e.transit.propertyMap[t] || e.cssProps[t] || t, t = d(t), n[t] && (t = d(n[t])), e.inArray(t, r) === -1 && r.push(t)
		}), r
	}

	function h(t, n, r, i) {
		var s = c(t);
		e.cssEase[r] && (r = e.cssEase[r]);
		var o = "" + m(n) + " " + r;
		parseInt(i, 10) > 0 && (o += " " + m(i));
		var u = [];
		return e.each(s, function(e, t) {
			u.push(t + " " + o)
		}), u.join(", ")
	}

	function p(t, r) {
		r || (e.cssNumber[t] = !0), e.transit.propertyMap[t] = n.transform, e.cssHooks[t] = {
			get: function(n) {
				var r = e(n).css("transit:transform");
				return r.get(t)
			},
			set: function(n, r) {
				var i = e(n).css("transit:transform");
				i.setFromString(t, r), e(n).css({
					"transit:transform": i
				})
			}
		}
	}

	function d(e) {
		return e.replace(/([A-Z])/g, function(e) {
			return "-" + e.toLowerCase()
		})
	}

	function v(e, t) {
		return typeof e == "string" && !e.match(/^[\-0-9\.]+$/) ? e : "" + e + t
	}

	function m(t) {
		var n = t;
		return typeof n == "string" && !n.match(/^[\-0-9\.]+/) && (n = e.fx.speeds[n] || e.fx.speeds._default), v(n, "ms")
	}
	e.transit = {
		version: "0.9.12",
		propertyMap: {
			marginLeft: "margin",
			marginRight: "margin",
			marginBottom: "margin",
			marginTop: "margin",
			paddingLeft: "padding",
			paddingRight: "padding",
			paddingBottom: "padding",
			paddingTop: "padding"
		},
		enabled: !0,
		useTransitionEnd: !1
	};
	var t = document.createElement("div"),
		n = {},
		s = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
	n.transition = r("transition"), n.transitionDelay = r("transitionDelay"), n.transform = r("transform"), n.transformOrigin = r("transformOrigin"), n.filter = r("Filter"), n.transform3d = i();
	var o = {
			transition: "transitionend",
			MozTransition: "transitionend",
			OTransition: "oTransitionEnd",
			WebkitTransition: "webkitTransitionEnd",
			msTransition: "MSTransitionEnd"
		},
		u = n.transitionEnd = o[n.transition] || null;
	for(var a in n) n.hasOwnProperty(a) && typeof e.support[a] == "undefined" && (e.support[a] = n[a]);
	return t = null, e.cssEase = {
		_default: "ease",
		"in": "ease-in",
		out: "ease-out",
		"in-out": "ease-in-out",
		snap: "cubic-bezier(0,1,.5,1)",
		easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
		easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
		easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
		easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
		easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
		easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
		easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
		easeOutExpo: "cubic-bezier(.19,1,.22,1)",
		easeInOutExpo: "cubic-bezier(1,0,0,1)",
		easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
		easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
		easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
		easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
		easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
		easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
		easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
		easeOutQuint: "cubic-bezier(.23,1,.32,1)",
		easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
		easeInSine: "cubic-bezier(.47,0,.745,.715)",
		easeOutSine: "cubic-bezier(.39,.575,.565,1)",
		easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
		easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
		easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
		easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
	}, e.cssHooks["transit:transform"] = {
		get: function(t) {
			return e(t).data("transform") || new f
		},
		set: function(t, r) {
			var i = r;
			i instanceof f || (i = new f(i)), n.transform === "WebkitTransform" && !s ? t.style[n.transform] = i.toString(!0) : t.style[n.transform] = i.toString(), e(t).data("transform", i)
		}
	}, e.cssHooks.transform = {
		set: e.cssHooks["transit:transform"].set
	}, e.cssHooks.filter = {
		get: function(e) {
			return e.style[n.filter]
		},
		set: function(e, t) {
			e.style[n.filter] = t
		}
	}, e.fn.jquery < "1.8" && (e.cssHooks.transformOrigin = {
		get: function(e) {
			return e.style[n.transformOrigin]
		},
		set: function(e, t) {
			e.style[n.transformOrigin] = t
		}
	}, e.cssHooks.transition = {
		get: function(e) {
			return e.style[n.transition]
		},
		set: function(e, t) {
			e.style[n.transition] = t
		}
	}), p("scale"), p("scaleX"), p("scaleY"), p("translate"), p("rotate"), p("rotateX"), p("rotateY"), p("rotate3d"), p("perspective"), p("skewX"), p("skewY"), p("x", !0), p("y", !0), f.prototype = {
		setFromString: function(e, t) {
			var n = typeof t == "string" ? t.split(",") : t.constructor === Array ? t : [t];
			n.unshift(e), f.prototype.set.apply(this, n)
		},
		set: function(e) {
			var t = Array.prototype.slice.apply(arguments, [1]);
			this.setter[e] ? this.setter[e].apply(this, t) : this[e] = t.join(",")
		},
		get: function(e) {
			return this.getter[e] ? this.getter[e].apply(this) : this[e] || 0
		},
		setter: {
			rotate: function(e) {
				this.rotate = v(e, "deg")
			},
			rotateX: function(e) {
				this.rotateX = v(e, "deg")
			},
			rotateY: function(e) {
				this.rotateY = v(e, "deg")
			},
			scale: function(e, t) {
				t === undefined && (t = e), this.scale = e + "," + t
			},
			skewX: function(e) {
				this.skewX = v(e, "deg")
			},
			skewY: function(e) {
				this.skewY = v(e, "deg")
			},
			perspective: function(e) {
				this.perspective = v(e, "px")
			},
			x: function(e) {
				this.set("translate", e, null)
			},
			y: function(e) {
				this.set("translate", null, e)
			},
			translate: function(e, t) {
				this._translateX === undefined && (this._translateX = 0), this._translateY === undefined && (this._translateY = 0), e !== null && e !== undefined && (this._translateX = v(e, "px")), t !== null && t !== undefined && (this._translateY = v(t, "px")), this.translate = this._translateX + "," + this._translateY
			}
		},
		getter: {
			x: function() {
				return this._translateX || 0
			},
			y: function() {
				return this._translateY || 0
			},
			scale: function() {
				var e = (this.scale || "1,1").split(",");
				return e[0] && (e[0] = parseFloat(e[0])), e[1] && (e[1] = parseFloat(e[1])), e[0] === e[1] ? e[0] : e
			},
			rotate3d: function() {
				var e = (this.rotate3d || "0,0,0,0deg").split(",");
				for(var t = 0; t <= 3; ++t) e[t] && (e[t] = parseFloat(e[t]));
				return e[3] && (e[3] = v(e[3], "deg")), e
			}
		},
		parse: function(e) {
			var t = this;
			e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(e, n, r) {
				t.setFromString(n, r)
			})
		},
		toString: function(e) {
			var t = [];
			for(var r in this)
				if(this.hasOwnProperty(r)) {
					if(!n.transform3d && (r === "rotateX" || r === "rotateY" || r === "perspective" || r === "transformOrigin")) continue;
					r[0] !== "_" && (e && r === "scale" ? t.push(r + "3d(" + this[r] + ",1)") : e && r === "translate" ? t.push(r + "3d(" + this[r] + ",0)") : t.push(r + "(" + this[r] + ")"))
				}
			return t.join(" ")
		}
	}, e.fn.transition = e.fn.transit = function(t, r, i, s) {
		var o = this,
			a = 0,
			f = !0,
			c = e.extend(!0, {}, t);
		typeof r == "function" && (s = r, r = undefined), typeof r == "object" && (i = r.easing, a = r.delay || 0, f = typeof r.queue == "undefined" ? !0 : r.queue, s = r.complete, r = r.duration), typeof i == "function" && (s = i, i = undefined), typeof c.easing != "undefined" && (i = c.easing, delete c.easing), typeof c.duration != "undefined" && (r = c.duration, delete c.duration), typeof c.complete != "undefined" && (s = c.complete, delete c.complete), typeof c.queue != "undefined" && (f = c.queue, delete c.queue), typeof c.delay != "undefined" && (a = c.delay, delete c.delay), typeof r == "undefined" && (r = e.fx.speeds._default), typeof i == "undefined" && (i = e.cssEase._default), r = m(r);
		var p = h(c, r, i, a),
			d = e.transit.enabled && n.transition,
			v = d ? parseInt(r, 10) + parseInt(a, 10) : 0;
		if(v === 0) {
			var g = function(e) {
				o.css(c), s && s.apply(o), e && e()
			};
			return l(o, f, g), o
		}
		var y = {},
			b = function(t) {
				var r = !1,
					i = function() {
						r && o.unbind(u, i), v > 0 && o.each(function() {
							this.style[n.transition] = y[this] || null
						}), typeof s == "function" && s.apply(o), typeof t == "function" && t()
					};
				v > 0 && u && e.transit.useTransitionEnd ? (r = !0, o.bind(u, i)) : window.setTimeout(i, v), o.each(function() {
					v > 0 && (this.style[n.transition] = p), e(this).css(c)
				})
			},
			w = function(e) {
				this.offsetWidth, b(e)
			};
		return l(o, f, w), this
	}, e.transit.getTransitionValue = h, e
}),
function(e) {
	"use strict";
	typeof define == "function" && define.amd ? define("slick-carousel", ["jquery"], e) : typeof exports != "undefined" ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
	"use strict";
	var t = window.Slick || {};
	t = function() {
		function n(n, r) {
			var i = this,
				s;
			i.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: e(n),
				appendDots: e(n),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function(e, t) {
					return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (t + 1) + "</button>"
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: "",
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3
			}, i.initials = {
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {},
				transformsEnabled: !1,
				unslicked: !1
			}, e.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.hidden = "hidden", i.paused = !1, i.positionProp = null, i.respondTo = null, i.rowCount = 1, i.shouldClick = !0, i.$slider = e(n), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, i.windowTimer = null, s = e(n).data("slick") || {}, i.options = e.extend({}, i.defaults, s, r), i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, typeof document.mozHidden != "undefined" ? (i.hidden = "mozHidden", i.visibilityChange = "mozvisibilitychange") : typeof document.webkitHidden != "undefined" && (i.hidden = "webkitHidden", i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = e.proxy(i.autoPlay, i), i.autoPlayClear = e.proxy(i.autoPlayClear, i), i.changeSlide = e.proxy(i.changeSlide, i), i.clickHandler = e.proxy(i.clickHandler, i), i.selectHandler = e.proxy(i.selectHandler, i), i.setPosition = e.proxy(i.setPosition, i), i.swipeHandler = e.proxy(i.swipeHandler, i), i.dragHandler = e.proxy(i.dragHandler, i), i.keyHandler = e.proxy(i.keyHandler, i), i.autoPlayIterator = e.proxy(i.autoPlayIterator, i), i.instanceUid = t++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, i.registerBreakpoints(), i.init(!0), i.checkResponsive(!0)
		}
		var t = 0;
		return n
	}(), t.prototype.addSlide = t.prototype.slickAdd = function(t, n, r) {
		var i = this;
		if(typeof n == "boolean") r = n, n = null;
		else if(n < 0 || n >= i.slideCount) return !1;
		i.unload(), typeof n == "number" ? n === 0 && i.$slides.length === 0 ? e(t).appendTo(i.$slideTrack) : r ? e(t).insertBefore(i.$slides.eq(n)) : e(t).insertAfter(i.$slides.eq(n)) : r === !0 ? e(t).prependTo(i.$slideTrack) : e(t).appendTo(i.$slideTrack), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slides.each(function(t, n) {
			e(n).attr("data-slick-index", t)
		}), i.$slidesCache = i.$slides, i.reinit()
	}, t.prototype.animateHeight = function() {
		var e = this;
		if(e.options.slidesToShow === 1 && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
			var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
			e.$list.animate({
				height: t
			}, e.options.speed)
		}
	}, t.prototype.animateSlide = function(t, n) {
		var r = {},
			i = this;
		i.animateHeight(), i.options.rtl === !0 && i.options.vertical === !1 && (t = -t), i.transformsEnabled === !1 ? i.options.vertical === !1 ? i.$slideTrack.animate({
			left: t
		}, i.options.speed, i.options.easing, n) : i.$slideTrack.animate({
			top: t
		}, i.options.speed, i.options.easing, n) : i.cssTransitions === !1 ? (i.options.rtl === !0 && (i.currentLeft = -i.currentLeft), e({
			animStart: i.currentLeft
		}).animate({
			animStart: t
		}, {
			duration: i.options.speed,
			easing: i.options.easing,
			step: function(e) {
				e = Math.ceil(e), i.options.vertical === !1 ? (r[i.animType] = "translate(" + e + "px, 0px)", i.$slideTrack.css(r)) : (r[i.animType] = "translate(0px," + e + "px)", i.$slideTrack.css(r))
			},
			complete: function() {
				n && n.call()
			}
		})) : (i.applyTransition(), t = Math.ceil(t), i.options.vertical === !1 ? r[i.animType] = "translate3d(" + t + "px, 0px, 0px)" : r[i.animType] = "translate3d(0px," + t + "px, 0px)", i.$slideTrack.css(r), n && setTimeout(function() {
			i.disableTransition(), n.call()
		}, i.options.speed))
	}, t.prototype.asNavFor = function(t) {
		var n = this,
			r = n.options.asNavFor;
		r && r !== null && (r = e(r).not(n.$slider)), r !== null && typeof r == "object" && r.each(function() {
			var n = e(this).slick("getSlick");
			n.unslicked || n.slideHandler(t, !0)
		})
	}, t.prototype.applyTransition = function(e) {
		var t = this,
			n = {};
		t.options.fade === !1 ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
	}, t.prototype.autoPlay = function() {
		var e = this;
		e.autoPlayTimer && clearInterval(e.autoPlayTimer), e.slideCount > e.options.slidesToShow && e.paused !== !0 && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
	}, t.prototype.autoPlayClear = function() {
		var e = this;
		e.autoPlayTimer && clearInterval(e.autoPlayTimer)
	}, t.prototype.autoPlayIterator = function() {
		var e = this;
		e.options.infinite === !1 ? e.direction === 1 ? (e.currentSlide + 1 === e.slideCount - 1 && (e.direction = 0), e.slideHandler(e.currentSlide + e.options.slidesToScroll)) : (e.currentSlide - 1 === 0 && (e.direction = 1), e.slideHandler(e.currentSlide - e.options.slidesToScroll)) : e.slideHandler(e.currentSlide + e.options.slidesToScroll)
	}, t.prototype.buildArrows = function() {
		var t = this;
		t.options.arrows === !0 && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
			"aria-disabled": "true",
			tabindex: "-1"
		}))
	}, t.prototype.buildDots = function() {
		var t = this,
			n, r;
		if(t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
			r = '<ul class="' + t.options.dotsClass + '">';
			for(n = 0; n <= t.getDotCount(); n += 1) r += "<li>" + t.options.customPaging.call(this, t, n) + "</li>";
			r += "</ul>", t.$dots = e(r).appendTo(t.options.appendDots), t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
		}
	}, t.prototype.buildOut = function() {
		var t = this;
		t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, n) {
			e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
		}), t.$slidesCache = t.$slides, t.$slider.addClass("slick-slider"), t.$slideTrack = t.slideCount === 0 ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0);
		if(t.options.centerMode === !0 || t.options.swipeToSlide === !0) t.options.slidesToScroll = 1;
		e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses(typeof t.currentSlide == "number" ? t.currentSlide : 0), t.options.draggable === !0 && t.$list.addClass("draggable")
	}, t.prototype.buildRows = function() {
		var e = this,
			t, n, r, i, s, o, u;
		i = document.createDocumentFragment(), o = e.$slider.children();
		if(e.options.rows > 1) {
			u = e.options.slidesPerRow * e.options.rows, s = Math.ceil(o.length / u);
			for(t = 0; t < s; t++) {
				var a = document.createElement("div");
				for(n = 0; n < e.options.rows; n++) {
					var f = document.createElement("div");
					for(r = 0; r < e.options.slidesPerRow; r++) {
						var l = t * u + (n * e.options.slidesPerRow + r);
						o.get(l) && f.appendChild(o.get(l))
					}
					a.appendChild(f)
				}
				i.appendChild(a)
			}
			e.$slider.html(i), e.$slider.children().children().children().css({
				width: 100 / e.options.slidesPerRow + "%",
				display: "inline-block"
			})
		}
	}, t.prototype.checkResponsive = function(t, n) {
		var r = this,
			i, s, o, u = !1,
			a = r.$slider.width(),
			f = window.innerWidth || e(window).width();
		r.respondTo === "window" ? o = f : r.respondTo === "slider" ? o = a : r.respondTo === "min" && (o = Math.min(f, a));
		if(r.options.responsive && r.options.responsive.length && r.options.responsive !== null) {
			s = null;
			for(i in r.breakpoints) r.breakpoints.hasOwnProperty(i) && (r.originalSettings.mobileFirst === !1 ? o < r.breakpoints[i] && (s = r.breakpoints[i]) : o > r.breakpoints[i] && (s = r.breakpoints[i]));
			if(s !== null)
				if(r.activeBreakpoint !== null) {
					if(s !== r.activeBreakpoint || n) r.activeBreakpoint = s, r.breakpointSettings[s] === "unslick" ? r.unslick(s) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[s]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), u = s
				} else r.activeBreakpoint = s, r.breakpointSettings[s] === "unslick" ? r.unslick(s) : (r.options = e.extend({}, r.originalSettings, r.breakpointSettings[s]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), u = s;
			else r.activeBreakpoint !== null && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t), u = s);
			!t && u !== !1 && r.$slider.trigger("breakpoint", [r, u])
		}
	}, t.prototype.changeSlide = function(t, n) {
		var r = this,
			i = e(t.target),
			s, o, u;
		i.is("a") && t.preventDefault(), i.is("li") || (i = i.closest("li")), u = r.slideCount % r.options.slidesToScroll !== 0, s = u ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll;
		switch(t.data.message) {
			case "previous":
				o = s === 0 ? r.options.slidesToScroll : r.options.slidesToShow - s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, n);
				break;
			case "next":
				o = s === 0 ? r.options.slidesToScroll : s, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, n);
				break;
			case "index":
				var a = t.data.index === 0 ? 0 : t.data.index || i.index() * r.options.slidesToScroll;
				r.slideHandler(r.checkNavigable(a), !1, n), i.children().trigger("focus");
				break;
			default:
				return
		}
	}, t.prototype.checkNavigable = function(e) {
		var t = this,
			n, r;
		n = t.getNavigableIndexes(), r = 0;
		if(e > n[n.length - 1]) e = n[n.length - 1];
		else
			for(var i in n) {
				if(e < n[i]) {
					e = r;
					break
				}
				r = n[i]
			}
		return e
	}, t.prototype.cleanUpEvents = function() {
		var t = this;
		t.options.dots && t.$dots !== null && (e("li", t.$dots).off("click.slick", t.changeSlide), t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && e("li", t.$dots).off("mouseenter.slick", e.proxy(t.setPaused, t, !0)).off("mouseleave.slick", e.proxy(t.setPaused, t, !1))), t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.$list.off("mouseenter.slick", e.proxy(t.setPaused, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.setPaused, t, !1)), t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
	}, t.prototype.cleanUpRows = function() {
		var e = this,
			t;
		e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.html(t))
	}, t.prototype.clickHandler = function(e) {
		var t = this;
		t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
	}, t.prototype.destroy = function(t) {
		var n = this;
		n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
			e(this).attr("style", e(this).data("originalStyling"))
		}), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
	}, t.prototype.disableTransition = function(e) {
		var t = this,
			n = {};
		n[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
	}, t.prototype.fadeSlide = function(e, t) {
		var n = this;
		n.cssTransitions === !1 ? (n.$slides.eq(e).css({
			zIndex: n.options.zIndex
		}), n.$slides.eq(e).animate({
			opacity: 1
		}, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
			opacity: 1,
			zIndex: n.options.zIndex
		}), t && setTimeout(function() {
			n.disableTransition(e), t.call()
		}, n.options.speed))
	}, t.prototype.fadeSlideOut = function(e) {
		var t = this;
		t.cssTransitions === !1 ? t.$slides.eq(e).animate({
			opacity: 0,
			zIndex: t.options.zIndex - 2
		}, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
			opacity: 0,
			zIndex: t.options.zIndex - 2
		}))
	}, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
		var t = this;
		e !== null && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
	}, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
		var e = this;
		return e.currentSlide
	}, t.prototype.getDotCount = function() {
		var e = this,
			t = 0,
			n = 0,
			r = 0;
		if(e.options.infinite === !0)
			while(t < e.slideCount) ++r, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
		else if(e.options.centerMode === !0) r = e.slideCount;
		else
			while(t < e.slideCount) ++r, t = n + e.options.slidesToShow, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
		return r - 1
	}, t.prototype.getLeft = function(e) {
		var t = this,
			n, r, i = 0,
			s;
		return t.slideOffset = 0, r = t.$slides.first().outerHeight(!0), t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, i = r * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll !== 0 && e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (e > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (e - t.slideCount)) * t.slideWidth * -1, i = (t.options.slidesToShow - (e - t.slideCount)) * r * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, i = t.slideCount % t.options.slidesToScroll * r * -1))) : e + t.options.slidesToShow > t.slideCount && (t.slideOffset = (e + t.options.slidesToShow - t.slideCount) * t.slideWidth, i = (e + t.options.slidesToShow - t.slideCount) * r), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, i = 0), t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), t.options.vertical === !1 ? n = e * t.slideWidth * -1 + t.slideOffset : n = e * r * -1 + i, t.options.variableWidth === !0 && (t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? s = t.$slideTrack.children(".slick-slide").eq(e) : s = t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow), n = s[0] ? s[0].offsetLeft * -1 : 0, t.options.centerMode === !0 && (t.options.infinite === !1 ? s = t.$slideTrack.children(".slick-slide").eq(e) : s = t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow + 1), n = s[0] ? s[0].offsetLeft * -1 : 0, n += (t.$list.width() - s.outerWidth()) / 2)), n
	}, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
		var t = this;
		return t.options[e]
	}, t.prototype.getNavigableIndexes = function() {
		var e = this,
			t = 0,
			n = 0,
			r = [],
			i;
		e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1, n = e.options.slidesToScroll * -1, i = e.slideCount * 2);
		while(t < i) r.push(t), t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
		return r
	}, t.prototype.getSlick = function() {
		return this
	}, t.prototype.getSlideCount = function() {
		var t = this,
			n, r, i;
		return i = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0, t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function(n, s) {
			if(s.offsetLeft - i + e(s).outerWidth() / 2 > t.swipeLeft * -1) return r = s, !1
		}), n = Math.abs(e(r).attr("data-slick-index") - t.currentSlide) || 1, n) : t.options.slidesToScroll
	}, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
		var n = this;
		n.changeSlide({
			data: {
				message: "index",
				index: parseInt(e)
			}
		}, t)
	}, t.prototype.init = function(t) {
		var n = this;
		e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots()), t && n.$slider.trigger("init", [n]), n.options.accessibility === !0 && n.initADA()
	}, t.prototype.initArrowEvents = function() {
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.on("click.slick", {
			message: "previous"
		}, e.changeSlide), e.$nextArrow.on("click.slick", {
			message: "next"
		}, e.changeSlide))
	}, t.prototype.initDotEvents = function() {
		var t = this;
		t.options.dots === !0 && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("click.slick", {
			message: "index"
		}, t.changeSlide), t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.setPaused, t, !0)).on("mouseleave.slick", e.proxy(t.setPaused, t, !1))
	}, t.prototype.initializeEvents = function() {
		var t = this;
		t.initArrowEvents(), t.initDotEvents(), t.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), t.$list.on("mouseenter.slick", e.proxy(t.setPaused, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.setPaused, t, !1)), t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
	}, t.prototype.initUI = function() {
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show(), e.options.autoplay === !0 && e.autoPlay()
	}, t.prototype.keyHandler = function(e) {
		var t = this;
		e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (e.keyCode === 37 && t.options.accessibility === !0 ? t.changeSlide({
			data: {
				message: "previous"
			}
		}) : e.keyCode === 39 && t.options.accessibility === !0 && t.changeSlide({
			data: {
				message: "next"
			}
		}))
	}, t.prototype.lazyLoad = function() {
		function o(t) {
			e("img[data-lazy]", t).each(function() {
				var t = e(this),
					n = e(this).attr("data-lazy"),
					r = document.createElement("img");
				r.onload = function() {
					t.animate({
						opacity: 0
					}, 100, function() {
						t.attr("src", n).animate({
							opacity: 1
						}, 200, function() {
							t.removeAttr("data-lazy").removeClass("slick-loading")
						})
					})
				}, r.src = n
			})
		}
		var t = this,
			n, r, i, s;
		t.options.centerMode === !0 ? t.options.infinite === !0 ? (i = t.currentSlide + (t.options.slidesToShow / 2 + 1), s = i + t.options.slidesToShow + 2) : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), s = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, s = i + t.options.slidesToShow, t.options.fade === !0 && (i > 0 && i--, s <= t.slideCount && s++)), n = t.$slider.find(".slick-slide").slice(i, s), o(n), t.slideCount <= t.options.slidesToShow ? (r = t.$slider.find(".slick-slide"), o(r)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), o(r)) : t.currentSlide === 0 && (r = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), o(r))
	}, t.prototype.loadSlider = function() {
		var e = this;
		e.setPosition(), e.$slideTrack.css({
			opacity: 1
		}), e.$slider.removeClass("slick-loading"), e.initUI(), e.options.lazyLoad === "progressive" && e.progressiveLazyLoad()
	}, t.prototype.next = t.prototype.slickNext = function() {
		var e = this;
		e.changeSlide({
			data: {
				message: "next"
			}
		})
	}, t.prototype.orientationChange = function() {
		var e = this;
		e.checkResponsive(), e.setPosition()
	}, t.prototype.pause = t.prototype.slickPause = function() {
		var e = this;
		e.autoPlayClear(), e.paused = !0
	}, t.prototype.play = t.prototype.slickPlay = function() {
		var e = this;
		e.paused = !1, e.autoPlay()
	}, t.prototype.postSlide = function(e) {
		var t = this;
		t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay === !0 && t.paused === !1 && t.autoPlay(), t.options.accessibility === !0 && t.initADA()
	}, t.prototype.prev = t.prototype.slickPrev = function() {
		var e = this;
		e.changeSlide({
			data: {
				message: "previous"
			}
		})
	}, t.prototype.preventDefault = function(e) {
		e.preventDefault()
	}, t.prototype.progressiveLazyLoad = function() {
		var t = this,
			n, r;
		n = e("img[data-lazy]", t.$slider).length, n > 0 && (r = e("img[data-lazy]", t.$slider).first(), r.attr("src", r.attr("data-lazy")).removeClass("slick-loading").load(function() {
			r.removeAttr("data-lazy"), t.progressiveLazyLoad(), t.options.adaptiveHeight === !0 && t.setPosition()
		}).error(function() {
			r.removeAttr("data-lazy"), t.progressiveLazyLoad()
		}))
	}, t.prototype.refresh = function(t) {
		var n = this,
			r = n.currentSlide;
		n.destroy(!0), e.extend(n, n.initials, {
			currentSlide: r
		}), n.init(), t || n.changeSlide({
			data: {
				message: "index",
				index: r
			}
		}, !1)
	}, t.prototype.registerBreakpoints = function() {
		var t = this,
			n, r, i, s = t.options.responsive || null;
		if(e.type(s) === "array" && s.length) {
			t.respondTo = t.options.respondTo || "window";
			for(n in s) {
				i = t.breakpoints.length - 1, r = s[n].breakpoint;
				if(s.hasOwnProperty(n)) {
					while(i >= 0) t.breakpoints[i] && t.breakpoints[i] === r && t.breakpoints.splice(i, 1), i--;
					t.breakpoints.push(r), t.breakpointSettings[r] = s[n].settings
				}
			}
			t.breakpoints.sort(function(e, n) {
				return t.options.mobileFirst ? e - n : n - e
			})
		}
	}, t.prototype.reinit = function() {
		var t = this;
		t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && t.currentSlide !== 0 && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.checkResponsive(!1, !0), t.options.focusOnSelect === !0 && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses(0), t.setPosition(), t.$slider.trigger("reInit", [t]), t.options.autoplay === !0 && t.focusHandler()
	}, t.prototype.resize = function() {
		var t = this;
		e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
			t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
		}, 50))
	}, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, n) {
		var r = this;
		typeof e == "boolean" ? (t = e, e = t === !0 ? 0 : r.slideCount - 1) : e = t === !0 ? --e : e;
		if(r.slideCount < 1 || e < 0 || e > r.slideCount - 1) return !1;
		r.unload(), n === !0 ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(e).remove(), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slidesCache = r.$slides, r.reinit()
	}, t.prototype.setCSS = function(e) {
		var t = this,
			n = {},
			r, i;
		t.options.rtl === !0 && (e = -e), r = t.positionProp == "left" ? Math.ceil(e) + "px" : "0px", i = t.positionProp == "top" ? Math.ceil(e) + "px" : "0px", n[t.positionProp] = e, t.transformsEnabled === !1 ? t.$slideTrack.css(n) : (n = {}, t.cssTransitions === !1 ? (n[t.animType] = "translate(" + r + ", " + i + ")", t.$slideTrack.css(n)) : (n[t.animType] = "translate3d(" + r + ", " + i + ", 0px)", t.$slideTrack.css(n)))
	}, t.prototype.setDimensions = function() {
		var e = this;
		e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
			padding: "0px " + e.options.centerPadding
		}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
			padding: e.options.centerPadding + " 0px"
		})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
		var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
		e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
	}, t.prototype.setFade = function() {
		var t = this,
			n;
		t.$slides.each(function(r, i) {
			n = t.slideWidth * r * -1, t.options.rtl === !0 ? e(i).css({
				position: "relative",
				right: n,
				top: 0,
				zIndex: t.options.zIndex - 2,
				opacity: 0
			}) : e(i).css({
				position: "relative",
				left: n,
				top: 0,
				zIndex: t.options.zIndex - 2,
				opacity: 0
			})
		}), t.$slides.eq(t.currentSlide).css({
			zIndex: t.options.zIndex - 1,
			opacity: 1
		})
	}, t.prototype.setHeight = function() {
		var e = this;
		if(e.options.slidesToShow === 1 && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
			var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
			e.$list.css("height", t)
		}
	}, t.prototype.setOption = t.prototype.slickSetOption = function(t, n, r) {
		var i = this,
			s, o;
		if(t === "responsive" && e.type(n) === "array")
			for(o in n)
				if(e.type(i.options.responsive) !== "array") i.options.responsive = [n[o]];
				else {
					s = i.options.responsive.length - 1;
					while(s >= 0) i.options.responsive[s].breakpoint === n[o].breakpoint && i.options.responsive.splice(s, 1), s--;
					i.options.responsive.push(n[o])
				}
		else i.options[t] = n;
		r === !0 && (i.unload(), i.reinit())
	}, t.prototype.setPosition = function() {
		var e = this;
		e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
	}, t.prototype.setProps = function() {
		var e = this,
			t = document.body.style;
		e.positionProp = e.options.vertical === !0 ? "top" : "left", e.positionProp === "top" ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), (t.WebkitTransition !== undefined || t.MozTransition !== undefined || t.msTransition !== undefined) && e.options.useCSS === !0 && (e.cssTransitions = !0), e.options.fade && (typeof e.options.zIndex == "number" ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), t.OTransform !== undefined && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", t.perspectiveProperty === undefined && t.webkitPerspective === undefined && (e.animType = !1)), t.MozTransform !== undefined && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", t.perspectiveProperty === undefined && t.MozPerspective === undefined && (e.animType = !1)), t.webkitTransform !== undefined && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", t.perspectiveProperty === undefined && t.webkitPerspective === undefined && (e.animType = !1)), t.msTransform !== undefined && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", t.msTransform === undefined && (e.animType = !1)), t.transform !== undefined && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.animType !== null && e.animType !== !1
	}, t.prototype.setSlideClasses = function(e) {
		var t = this,
			n, r, i, s;
		r = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), t.$slides.eq(e).addClass("slick-current"), t.options.centerMode === !0 ? (n = Math.floor(t.options.slidesToShow / 2), t.options.infinite === !0 && (e >= n && e <= t.slideCount - 1 - n ? t.$slides.slice(e - n, e + n + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = t.options.slidesToShow + e, r.slice(i - n + 1, i + n + 2).addClass("slick-active").attr("aria-hidden", "false")), e === 0 ? r.eq(r.length - 1 - t.options.slidesToShow).addClass("slick-center") : e === t.slideCount - 1 && r.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(e, e + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : r.length <= t.options.slidesToShow ? r.addClass("slick-active").attr("aria-hidden", "false") : (s = t.slideCount % t.options.slidesToShow, i = t.options.infinite === !0 ? t.options.slidesToShow + e : e, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - e < t.options.slidesToShow ? r.slice(i - (t.options.slidesToShow - s), i + s).addClass("slick-active").attr("aria-hidden", "false") : r.slice(i, i + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), t.options.lazyLoad === "ondemand" && t.lazyLoad()
	}, t.prototype.setupInfinite = function() {
		var t = this,
			n, r, i;
		t.options.fade === !0 && (t.options.centerMode = !1);
		if(t.options.infinite === !0 && t.options.fade === !1) {
			r = null;
			if(t.slideCount > t.options.slidesToShow) {
				t.options.centerMode === !0 ? i = t.options.slidesToShow + 1 : i = t.options.slidesToShow;
				for(n = t.slideCount; n > t.slideCount - i; n -= 1) r = n - 1, e(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
				for(n = 0; n < i; n += 1) r = n, e(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
				t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
					e(this).attr("id", "")
				})
			}
		}
	}, t.prototype.setPaused = function(e) {
		var t = this;
		t.options.autoplay === !0 && t.options.pauseOnHover === !0 && (t.paused = e, e ? t.autoPlayClear() : t.autoPlay())
	}, t.prototype.selectHandler = function(t) {
		var n = this,
			r = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
			i = parseInt(r.attr("data-slick-index"));
		i || (i = 0);
		if(n.slideCount <= n.options.slidesToShow) {
			n.setSlideClasses(i), n.asNavFor(i);
			return
		}
		n.slideHandler(i)
	}, t.prototype.slideHandler = function(e, t, n) {
		var r, i, s, o, u = null,
			a = this;
		t = t || !1;
		if(a.animating === !0 && a.options.waitForAnimate === !0) return;
		if(a.options.fade === !0 && a.currentSlide === e) return;
		if(a.slideCount <= a.options.slidesToShow) return;
		t === !1 && a.asNavFor(e), r = e, u = a.getLeft(r), o = a.getLeft(a.currentSlide), a.currentLeft = a.swipeLeft === null ? o : a.swipeLeft;
		if(a.options.infinite === !1 && a.options.centerMode === !1 && (e < 0 || e > a.getDotCount() * a.options.slidesToScroll)) {
			a.options.fade === !1 && (r = a.currentSlide, n !== !0 ? a.animateSlide(o, function() {
				a.postSlide(r)
			}) : a.postSlide(r));
			return
		}
		if(a.options.infinite === !1 && a.options.centerMode === !0 && (e < 0 || e > a.slideCount - a.options.slidesToScroll)) {
			a.options.fade === !1 && (r = a.currentSlide, n !== !0 ? a.animateSlide(o, function() {
				a.postSlide(r)
			}) : a.postSlide(r));
			return
		}
		a.options.autoplay === !0 && clearInterval(a.autoPlayTimer), r < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? i = a.slideCount - a.slideCount % a.options.slidesToScroll : i = a.slideCount + r : r >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? i = 0 : i = r - a.slideCount : i = r, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, i]), s = a.currentSlide, a.currentSlide = i, a.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows();
		if(a.options.fade === !0) {
			n !== !0 ? (a.fadeSlideOut(s), a.fadeSlide(i, function() {
				a.postSlide(i)
			})) : a.postSlide(i), a.animateHeight();
			return
		}
		n !== !0 ? a.animateSlide(u, function() {
			a.postSlide(i)
		}) : a.postSlide(i)
	}, t.prototype.startLoad = function() {
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
	}, t.prototype.swipeDirection = function() {
		var e, t, n, r, i = this;
		return e = i.touchObject.startX - i.touchObject.curX, t = i.touchObject.startY - i.touchObject.curY, n = Math.atan2(t, e), r = Math.round(n * 180 / Math.PI), r < 0 && (r = 360 - Math.abs(r)), r <= 45 && r >= 0 ? i.options.rtl === !1 ? "left" : "right" : r <= 360 && r >= 315 ? i.options.rtl === !1 ? "left" : "right" : r >= 135 && r <= 225 ? i.options.rtl === !1 ? "right" : "left" : i.options.verticalSwiping === !0 ? r >= 35 && r <= 135 ? "left" : "right" : "vertical"
	}, t.prototype.swipeEnd = function(e) {
		var t = this,
			n;
		t.dragging = !1, t.shouldClick = t.touchObject.swipeLength > 10 ? !1 : !0;
		if(t.touchObject.curX === undefined) return !1;
		t.touchObject.edgeHit === !0 && t.$slider.trigger("edge", [t, t.swipeDirection()]);
		if(t.touchObject.swipeLength >= t.touchObject.minSwipe) switch(t.swipeDirection()) {
			case "left":
				n = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount(), t.slideHandler(n), t.currentDirection = 0, t.touchObject = {}, t.$slider.trigger("swipe", [t, "left"]);
				break;
			case "right":
				n = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount(), t.slideHandler(n), t.currentDirection = 1, t.touchObject = {}, t.$slider.trigger("swipe", [t, "right"])
		} else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), t.touchObject = {})
	}, t.prototype.swipeHandler = function(e) {
		var t = this;
		if(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1) return;
		if(t.options.draggable === !1 && e.type.indexOf("mouse") !== -1) return;
		t.touchObject.fingerCount = e.originalEvent && e.originalEvent.touches !== undefined ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold);
		switch(e.data.action) {
			case "start":
				t.swipeStart(e);
				break;
			case "move":
				t.swipeMove(e);
				break;
			case "end":
				t.swipeEnd(e)
		}
	}, t.prototype.swipeMove = function(e) {
		var t = this,
			n = !1,
			r, i, s, o, u;
		u = e.originalEvent !== undefined ? e.originalEvent.touches : null;
		if(!t.dragging || u && u.length !== 1) return !1;
		r = t.getLeft(t.currentSlide), t.touchObject.curX = u !== undefined ? u[0].pageX : e.clientX, t.touchObject.curY = u !== undefined ? u[0].pageY : e.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))), i = t.swipeDirection();
		if(i === "vertical") return;
		e.originalEvent !== undefined && t.touchObject.swipeLength > 4 && e.preventDefault(), o = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), t.options.verticalSwiping === !0 && (o = t.touchObject.curY > t.touchObject.startY ? 1 : -1), s = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, t.options.infinite === !1 && (t.currentSlide === 0 && i === "right" || t.currentSlide >= t.getDotCount() && i === "left") && (s = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.options.vertical === !1 ? t.swipeLeft = r + s * o : t.swipeLeft = r + s * (t.$list.height() / t.listWidth) * o, t.options.verticalSwiping === !0 && (t.swipeLeft = r + s * o);
		if(t.options.fade === !0 || t.options.touchMove === !1) return !1;
		if(t.animating === !0) return t.swipeLeft = null, !1;
		t.setCSS(t.swipeLeft)
	}, t.prototype.swipeStart = function(e) {
		var t = this,
			n;
		if(t.touchObject.fingerCount !== 1 || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
		e.originalEvent !== undefined && e.originalEvent.touches !== undefined && (n = e.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = n !== undefined ? n.pageX : e.clientX, t.touchObject.startY = t.touchObject.curY = n !== undefined ? n.pageY : e.clientY, t.dragging = !0
	}, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
		var e = this;
		e.$slidesCache !== null && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
	}, t.prototype.unload = function() {
		var t = this;
		e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
	}, t.prototype.unslick = function(e) {
		var t = this;
		t.$slider.trigger("unslick", [t, e]), t.destroy()
	}, t.prototype.updateArrows = function() {
		var e = this,
			t;
		t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.currentSlide === 0 ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
	}, t.prototype.updateDots = function() {
		var e = this;
		e.$dots !== null && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
	}, t.prototype.visibility = function() {
		var e = this;
		document[e.hidden] ? (e.paused = !0, e.autoPlayClear()) : e.options.autoplay === !0 && (e.paused = !1, e.autoPlay())
	}, t.prototype.initADA = function() {
		var t = this;
		t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
			"aria-hidden": "true",
			tabindex: "-1"
		}).find("a, input, button, select").attr({
			tabindex: "-1"
		}), t.$slideTrack.attr("role", "listbox"), t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(n) {
			e(this).attr({
				role: "option",
				"aria-describedby": "slick-slide" + t.instanceUid + n + ""
			})
		}), t.$dots !== null && t.$dots.attr("role", "tablist").find("li").each(function(n) {
			e(this).attr({
				role: "presentation",
				"aria-selected": "false",
				"aria-controls": "navigation" + t.instanceUid + n + "",
				id: "slick-slide" + t.instanceUid + n + ""
			})
		}).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), t.activateADA()
	}, t.prototype.activateADA = function() {
		var e = this,
			t = e.$slider.find("*").is(":focus");
		e.$slideTrack.find(".slick-active").attr({
			"aria-hidden": "false",
			tabindex: "0"
		}).find("a, input, button, select").attr({
			tabindex: "0"
		}), t && e.$slideTrack.find(".slick-active").focus()
	}, t.prototype.focusHandler = function() {
		var t = this;
		t.$slider.on("focus.slick blur.slick", "*", function(n) {
			n.stopImmediatePropagation();
			var r = e(this);
			setTimeout(function() {
				t.isPlay && (r.is(":focus") ? (t.autoPlayClear(), t.paused = !0) : (t.paused = !1, t.autoPlay()))
			}, 0)
		})
	}, e.fn.slick = function() {
		var e = this,
			n = arguments[0],
			r = Array.prototype.slice.call(arguments, 1),
			i = e.length,
			s = 0,
			o;
		for(s; s < i; s++) {
			typeof n == "object" || typeof n == "undefined" ? e[s].slick = new t(e[s], n) : o = e[s].slick[n].apply(e[s].slick, r);
			if(typeof o != "undefined") return o
		}
		return e
	}
});
var Zepto = function() {
	function M(e) {
		return e == null ? String(e) : x[T.call(e)] || "object"
	}

	function _(e) {
		return M(e) == "function"
	}

	function D(e) {
		return e != null && e == e.window
	}

	function P(e) {
		return e != null && e.nodeType == e.DOCUMENT_NODE
	}

	function H(e) {
		return M(e) == "object"
	}

	function B(e) {
		return H(e) && !D(e) && Object.getPrototypeOf(e) == Object.prototype
	}

	function j(e) {
		return typeof e.length == "number"
	}

	function F(e) {
		return o.call(e, function(e) {
			return e != null
		})
	}

	function I(e) {
		return e.length > 0 ? n.fn.concat.apply([], e) : e
	}

	function q(e) {
		return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
	}

	function R(e) {
		return e in f ? f[e] : f[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
	}

	function U(e, t) {
		return typeof t == "number" && !l[q(e)] ? t + "px" : t
	}

	function z(e) {
		var t, n;
		return a[e] || (t = u.createElement(e), u.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), a[e] = n), a[e]
	}

	function W(e) {
		return "children" in e ? s.call(e.children) : n.map(e.childNodes, function(e) {
			if(e.nodeType == 1) return e
		})
	}

	function X(n, r, i) {
		for(t in r) i && (B(r[t]) || O(r[t])) ? (B(r[t]) && !B(n[t]) && (n[t] = {}), O(r[t]) && !O(n[t]) && (n[t] = []), X(n[t], r[t], i)) : r[t] !== e && (n[t] = r[t])
	}

	function V(e, t) {
		return t == null ? n(e) : n(e).filter(t)
	}

	function $(e, t, n, r) {
		return _(t) ? t.call(e, n, r) : t
	}

	function J(e, t, n) {
		n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
	}

	function K(t, n) {
		var r = t.className || "",
			i = r && r.baseVal !== e;
		if(n === e) return i ? r.baseVal : r;
		i ? r.baseVal = n : t.className = n
	}

	function Q(e) {
		try {
			return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : +e + "" == e ? +e : /^[\[\{]/.test(e) ? n.parseJSON(e) : e) : e
		} catch(t) {
			return e
		}
	}

	function G(e, t) {
		t(e);
		for(var n = 0, r = e.childNodes.length; n < r; n++) G(e.childNodes[n], t)
	}
	var e, t, n, r, i = [],
		s = i.slice,
		o = i.filter,
		u = window.document,
		a = {},
		f = {},
		l = {
			"column-count": 1,
			columns: 1,
			"font-weight": 1,
			"line-height": 1,
			opacity: 1,
			"z-index": 1,
			zoom: 1
		},
		c = /^\s*<(\w+|!)[^>]*>/,
		h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		d = /^(?:body|html)$/i,
		v = /([A-Z])/g,
		m = ["val", "css", "html", "text", "data", "width", "height", "offset"],
		g = ["after", "prepend", "before", "append"],
		y = u.createElement("table"),
		b = u.createElement("tr"),
		w = {
			tr: u.createElement("tbody"),
			tbody: y,
			thead: y,
			tfoot: y,
			td: b,
			th: b,
			"*": u.createElement("div")
		},
		E = /complete|loaded|interactive/,
		S = /^[\w-]*$/,
		x = {},
		T = x.toString,
		N = {},
		C, k, L = u.createElement("div"),
		A = {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		O = Array.isArray || function(e) {
			return e instanceof Array
		};
	return N.matches = function(e, t) {
		if(!t || !e || e.nodeType !== 1) return !1;
		var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
		if(n) return n.call(e, t);
		var r, i = e.parentNode,
			s = !i;
		return s && (i = L).appendChild(e), r = ~N.qsa(i, t).indexOf(e), s && L.removeChild(e), r
	}, C = function(e) {
		return e.replace(/-+(.)?/g, function(e, t) {
			return t ? t.toUpperCase() : ""
		})
	}, k = function(e) {
		return o.call(e, function(t, n) {
			return e.indexOf(t) == n
		})
	}, N.fragment = function(t, r, i) {
		var o, a, f;
		return h.test(t) && (o = n(u.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(p, "<$1></$2>")), r === e && (r = c.test(t) && RegExp.$1), r in w || (r = "*"), f = w[r], f.innerHTML = "" + t, o = n.each(s.call(f.childNodes), function() {
			f.removeChild(this)
		})), B(i) && (a = n(o), n.each(i, function(e, t) {
			m.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
		})), o
	}, N.Z = function(e, t) {
		return e = e || [], e.__proto__ = n.fn, e.selector = t || "", e
	}, N.isZ = function(e) {
		return e instanceof N.Z
	}, N.init = function(t, r) {
		var i;
		if(!t) return N.Z();
		if(typeof t == "string") {
			t = t.trim();
			if(t[0] == "<" && c.test(t)) i = N.fragment(t, RegExp.$1, r), t = null;
			else {
				if(r !== e) return n(r).find(t);
				i = N.qsa(u, t)
			}
		} else {
			if(_(t)) return n(u).ready(t);
			if(N.isZ(t)) return t;
			if(O(t)) i = F(t);
			else if(H(t)) i = [t], t = null;
			else if(c.test(t)) i = N.fragment(t.trim(), RegExp.$1, r), t = null;
			else {
				if(r !== e) return n(r).find(t);
				i = N.qsa(u, t)
			}
		}
		return N.Z(i, t)
	}, n = function(e, t) {
		return N.init(e, t)
	}, n.extend = function(e) {
		var t, n = s.call(arguments, 1);
		return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function(n) {
			X(e, n, t)
		}), e
	}, N.qsa = function(e, t) {
		var n, r = t[0] == "#",
			i = !r && t[0] == ".",
			o = r || i ? t.slice(1) : t,
			u = S.test(o);
		return P(e) && u && r ? (n = e.getElementById(o)) ? [n] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : s.call(u && !r ? i ? e.getElementsByClassName(o) : e.getElementsByTagName(t) : e.querySelectorAll(t))
	}, n.contains = u.documentElement.contains ? function(e, t) {
		return e !== t && e.contains(t)
	} : function(e, t) {
		while(t && (t = t.parentNode))
			if(t === e) return !0;
		return !1
	}, n.type = M, n.isFunction = _, n.isWindow = D, n.isArray = O, n.isPlainObject = B, n.isEmptyObject = function(e) {
		var t;
		for(t in e) return !1;
		return !0
	}, n.inArray = function(e, t, n) {
		return i.indexOf.call(t, e, n)
	}, n.camelCase = C, n.trim = function(e) {
		return e == null ? "" : String.prototype.trim.call(e)
	}, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function(e, t) {
		var n, r = [],
			i, s;
		if(j(e))
			for(i = 0; i < e.length; i++) n = t(e[i], i), n != null && r.push(n);
		else
			for(s in e) n = t(e[s], s), n != null && r.push(n);
		return I(r)
	}, n.each = function(e, t) {
		var n, r;
		if(j(e)) {
			for(n = 0; n < e.length; n++)
				if(t.call(e[n], n, e[n]) === !1) return e
		} else
			for(r in e)
				if(t.call(e[r], r, e[r]) === !1) return e;
		return e
	}, n.grep = function(e, t) {
		return o.call(e, t)
	}, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		x["[object " + t + "]"] = t.toLowerCase()
	}), n.fn = {
		forEach: i.forEach,
		reduce: i.reduce,
		push: i.push,
		sort: i.sort,
		indexOf: i.indexOf,
		concat: i.concat,
		map: function(e) {
			return n(n.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		slice: function() {
			return n(s.apply(this, arguments))
		},
		ready: function(e) {
			return E.test(u.readyState) && u.body ? e(n) : u.addEventListener("DOMContentLoaded", function() {
				e(n)
			}, !1), this
		},
		get: function(t) {
			return t === e ? s.call(this) : this[t >= 0 ? t : t + this.length]
		},
		toArray: function() {
			return this.get()
		},
		size: function() {
			return this.length
		},
		remove: function() {
			return this.each(function() {
				this.parentNode != null && this.parentNode.removeChild(this)
			})
		},
		each: function(e) {
			return i.every.call(this, function(t, n) {
				return e.call(t, n, t) !== !1
			}), this
		},
		filter: function(e) {
			return _(e) ? this.not(this.not(e)) : n(o.call(this, function(t) {
				return N.matches(t, e)
			}))
		},
		add: function(e, t) {
			return n(k(this.concat(n(e, t))))
		},
		is: function(e) {
			return this.length > 0 && N.matches(this[0], e)
		},
		not: function(t) {
			var r = [];
			if(_(t) && t.call !== e) this.each(function(e) {
				t.call(this, e) || r.push(this)
			});
			else {
				var i = typeof t == "string" ? this.filter(t) : j(t) && _(t.item) ? s.call(t) : n(t);
				this.forEach(function(e) {
					i.indexOf(e) < 0 && r.push(e)
				})
			}
			return n(r)
		},
		has: function(e) {
			return this.filter(function() {
				return H(e) ? n.contains(this, e) : n(this).find(e).size()
			})
		},
		eq: function(e) {
			return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
		},
		first: function() {
			var e = this[0];
			return e && !H(e) ? e : n(e)
		},
		last: function() {
			var e = this[this.length - 1];
			return e && !H(e) ? e : n(e)
		},
		find: function(e) {
			var t, r = this;
			return e ? typeof e == "object" ? t = n(e).filter(function() {
				var e = this;
				return i.some.call(r, function(t) {
					return n.contains(t, e)
				})
			}) : this.length == 1 ? t = n(N.qsa(this[0], e)) : t = this.map(function() {
				return N.qsa(this, e)
			}) : t = n(), t
		},
		closest: function(e, t) {
			var r = this[0],
				i = !1;
			typeof e == "object" && (i = n(e));
			while(r && !(i ? i.indexOf(r) >= 0 : N.matches(r, e))) r = r !== t && !P(r) && r.parentNode;
			return n(r)
		},
		parents: function(e) {
			var t = [],
				r = this;
			while(r.length > 0) r = n.map(r, function(e) {
				if((e = e.parentNode) && !P(e) && t.indexOf(e) < 0) return t.push(e), e
			});
			return V(t, e)
		},
		parent: function(e) {
			return V(k(this.pluck("parentNode")), e)
		},
		children: function(e) {
			return V(this.map(function() {
				return W(this)
			}), e)
		},
		contents: function() {
			return this.map(function() {
				return s.call(this.childNodes)
			})
		},
		siblings: function(e) {
			return V(this.map(function(e, t) {
				return o.call(W(t.parentNode), function(e) {
					return e !== t
				})
			}), e)
		},
		empty: function() {
			return this.each(function() {
				this.innerHTML = ""
			})
		},
		pluck: function(e) {
			return n.map(this, function(t) {
				return t[e]
			})
		},
		show: function() {
			return this.each(function() {
				this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = z(this.nodeName))
			})
		},
		replaceWith: function(e) {
			return this.before(e).remove()
		},
		wrap: function(e) {
			var t = _(e);
			if(this[0] && !t) var r = n(e).get(0),
				i = r.parentNode || this.length > 1;
			return this.each(function(s) {
				n(this).wrapAll(t ? e.call(this, s) : i ? r.cloneNode(!0) : r)
			})
		},
		wrapAll: function(e) {
			if(this[0]) {
				n(this[0]).before(e = n(e));
				var t;
				while((t = e.children()).length) e = t.first();
				n(e).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			var t = _(e);
			return this.each(function(r) {
				var i = n(this),
					s = i.contents(),
					o = t ? e.call(this, r) : e;
				s.length ? s.wrapAll(o) : i.append(o)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				n(this).replaceWith(n(this).children())
			}), this
		},
		clone: function() {
			return this.map(function() {
				return this.cloneNode(!0)
			})
		},
		hide: function() {
			return this.css("display", "none")
		},
		toggle: function(t) {
			return this.each(function() {
				var r = n(this);
				(t === e ? r.css("display") == "none" : t) ? r.show(): r.hide()
			})
		},
		prev: function(e) {
			return n(this.pluck("previousElementSibling")).filter(e || "*")
		},
		next: function(e) {
			return n(this.pluck("nextElementSibling")).filter(e || "*")
		},
		html: function(e) {
			return 0 in arguments ? this.each(function(t) {
				var r = this.innerHTML;
				n(this).empty().append($(this, e, t, r))
			}) : 0 in this ? this[0].innerHTML : null
		},
		text: function(e) {
			return 0 in arguments ? this.each(function(t) {
				var n = $(this, e, t, this.textContent);
				this.textContent = n == null ? "" : "" + n
			}) : 0 in this ? this[0].textContent : null
		},
		attr: function(n, r) {
			var i;
			return typeof n != "string" || 1 in arguments ? this.each(function(e) {
				if(this.nodeType !== 1) return;
				if(H(n))
					for(t in n) J(this, t, n[t]);
				else J(this, n, $(this, r, e, this.getAttribute(n)))
			}) : !this.length || this[0].nodeType !== 1 ? e : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i
		},
		removeAttr: function(e) {
			return this.each(function() {
				this.nodeType === 1 && e.split(" ").forEach(function(e) {
					J(this, e)
				}, this)
			})
		},
		prop: function(e, t) {
			return e = A[e] || e, 1 in arguments ? this.each(function(n) {
				this[e] = $(this, t, n, this[e])
			}) : this[0] && this[0][e]
		},
		data: function(t, n) {
			var r = "data-" + t.replace(v, "-$1").toLowerCase(),
				i = 1 in arguments ? this.attr(r, n) : this.attr(r);
			return i !== null ? Q(i) : e
		},
		val: function(e) {
			return 0 in arguments ? this.each(function(t) {
				this.value = $(this, e, t, this.value)
			}) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function() {
				return this.selected
			}).pluck("value") : this[0].value)
		},
		offset: function(e) {
			if(e) return this.each(function(t) {
				var r = n(this),
					i = $(this, e, t, r.offset()),
					s = r.offsetParent().offset(),
					o = {
						top: i.top - s.top,
						left: i.left - s.left
					};
				r.css("position") == "static" && (o.position = "relative"), r.css(o)
			});
			if(!this.length) return null;
			var t = this[0].getBoundingClientRect();
			return {
				left: t.left + window.pageXOffset,
				top: t.top + window.pageYOffset,
				width: Math.round(t.width),
				height: Math.round(t.height)
			}
		},
		css: function(e, r) {
			if(arguments.length < 2) {
				var i, s = this[0];
				if(!s) return;
				i = getComputedStyle(s, "");
				if(typeof e == "string") return s.style[C(e)] || i.getPropertyValue(e);
				if(O(e)) {
					var o = {};
					return n.each(e, function(e, t) {
						o[t] = s.style[C(t)] || i.getPropertyValue(t)
					}), o
				}
			}
			var u = "";
			if(M(e) == "string") !r && r !== 0 ? this.each(function() {
				this.style.removeProperty(q(e))
			}) : u = q(e) + ":" + U(e, r);
			else
				for(t in e) !e[t] && e[t] !== 0 ? this.each(function() {
					this.style.removeProperty(q(t))
				}) : u += q(t) + ":" + U(t, e[t]) + ";";
			return this.each(function() {
				this.style.cssText += ";" + u
			})
		},
		index: function(e) {
			return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
		},
		hasClass: function(e) {
			return e ? i.some.call(this, function(e) {
				return this.test(K(e))
			}, R(e)) : !1
		},
		addClass: function(e) {
			return e ? this.each(function(t) {
				if(!("className" in this)) return;
				r = [];
				var i = K(this),
					s = $(this, e, t, i);
				s.split(/\s+/g).forEach(function(e) {
					n(this).hasClass(e) || r.push(e)
				}, this), r.length && K(this, i + (i ? " " : "") + r.join(" "))
			}) : this
		},
		removeClass: function(t) {
			return this.each(function(n) {
				if(!("className" in this)) return;
				if(t === e) return K(this, "");
				r = K(this), $(this, t, n, r).split(/\s+/g).forEach(function(e) {
					r = r.replace(R(e), " ")
				}), K(this, r.trim())
			})
		},
		toggleClass: function(t, r) {
			return t ? this.each(function(i) {
				var s = n(this),
					o = $(this, t, i, K(this));
				o.split(/\s+/g).forEach(function(t) {
					(r === e ? !s.hasClass(t) : r) ? s.addClass(t): s.removeClass(t)
				})
			}) : this
		},
		scrollTop: function(t) {
			if(!this.length) return;
			var n = "scrollTop" in this[0];
			return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function() {
				this.scrollTop = t
			} : function() {
				this.scrollTo(this.scrollX, t)
			})
		},
		scrollLeft: function(t) {
			if(!this.length) return;
			var n = "scrollLeft" in this[0];
			return t === e ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function() {
				this.scrollLeft = t
			} : function() {
				this.scrollTo(t, this.scrollY)
			})
		},
		position: function() {
			if(!this.length) return;
			var e = this[0],
				t = this.offsetParent(),
				r = this.offset(),
				i = d.test(t[0].nodeName) ? {
					top: 0,
					left: 0
				} : t.offset();
			return r.top -= parseFloat(n(e).css("margin-top")) || 0, r.left -= parseFloat(n(e).css("margin-left")) || 0, i.top += parseFloat(n(t[0]).css("border-top-width")) || 0, i.left += parseFloat(n(t[0]).css("border-left-width")) || 0, {
				top: r.top - i.top,
				left: r.left - i.left
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var e = this.offsetParent || u.body;
				while(e && !d.test(e.nodeName) && n(e).css("position") == "static") e = e.offsetParent;
				return e
			})
		}
	}, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function(t) {
		var r = t.replace(/./, function(e) {
			return e[0].toUpperCase()
		});
		n.fn[t] = function(i) {
			var s, o = this[0];
			return i === e ? D(o) ? o["inner" + r] : P(o) ? o.documentElement["scroll" + r] : (s = this.offset()) && s[t] : this.each(function(e) {
				o = n(this), o.css(t, $(this, i, e, o[t]()))
			})
		}
	}), g.forEach(function(e, t) {
		var r = t % 2;
		n.fn[e] = function() {
			var e, i = n.map(arguments, function(t) {
					return e = M(t), e == "object" || e == "array" || t == null ? t : N.fragment(t)
				}),
				s, o = this.length > 1;
			return i.length < 1 ? this : this.each(function(e, a) {
				s = r ? a : a.parentNode, a = t == 0 ? a.nextSibling : t == 1 ? a.firstChild : t == 2 ? a : null;
				var f = n.contains(u.documentElement, s);
				i.forEach(function(e) {
					if(o) e = e.cloneNode(!0);
					else if(!s) return n(e).remove();
					s.insertBefore(e, a), f && G(e, function(e) {
						e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML)
					})
				})
			})
		}, n.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function(t) {
			return n(t)[e](this), this
		}
	}), N.Z.prototype = n.fn, N.uniq = k, N.deserializeValue = Q, n.zepto = N, n
}();
window.Zepto = Zepto, window.$ === undefined && (window.$ = Zepto),
	function(e) {
		function c(e) {
			return e._zid || (e._zid = t++)
		}

		function h(e, t, n, r) {
			t = p(t);
			if(t.ns) var i = d(t.ns);
			return(o[c(e)] || []).filter(function(e) {
				return e && (!t.e || e.e == t.e) && (!t.ns || i.test(e.ns)) && (!n || c(e.fn) === c(n)) && (!r || e.sel == r)
			})
		}

		function p(e) {
			var t = ("" + e).split(".");
			return {
				e: t[0],
				ns: t.slice(1).sort().join(" ")
			}
		}

		function d(e) {
			return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
		}

		function v(e, t) {
			return e.del && !a && e.e in f || !!t
		}

		function m(e) {
			return l[e] || a && f[e] || e
		}

		function g(t, r, i, s, u, a, f) {
			var h = c(t),
				d = o[h] || (o[h] = []);
			r.split(/\s/).forEach(function(r) {
				if(r == "ready") return e(document).ready(i);
				var o = p(r);
				o.fn = i, o.sel = u, o.e in l && (i = function(t) {
					var n = t.relatedTarget;
					if(!n || n !== this && !e.contains(this, n)) return o.fn.apply(this, arguments)
				}), o.del = a;
				var c = a || i;
				o.proxy = function(e) {
					e = x(e);
					if(e.isImmediatePropagationStopped()) return;
					e.data = s;
					var r = c.apply(t, e._args == n ? [e] : [e].concat(e._args));
					return r === !1 && (e.preventDefault(), e.stopPropagation()), r
				}, o.i = d.length, d.push(o), "addEventListener" in t && t.addEventListener(m(o.e), o.proxy, v(o, f))
			})
		}

		function y(e, t, n, r, i) {
			var s = c(e);
			(t || "").split(/\s/).forEach(function(t) {
				h(e, t, n, r).forEach(function(t) {
					delete o[s][t.i], "removeEventListener" in e && e.removeEventListener(m(t.e), t.proxy, v(t, i))
				})
			})
		}

		function x(t, r) {
			if(r || !t.isDefaultPrevented) {
				r || (r = t), e.each(S, function(e, n) {
					var i = r[e];
					t[e] = function() {
						return this[n] = b, i && i.apply(r, arguments)
					}, t[n] = w
				});
				if(r.defaultPrevented !== n ? r.defaultPrevented : "returnValue" in r ? r.returnValue === !1 : r.getPreventDefault && r.getPreventDefault()) t.isDefaultPrevented = b
			}
			return t
		}

		function T(e) {
			var t, r = {
				originalEvent: e
			};
			for(t in e) !E.test(t) && e[t] !== n && (r[t] = e[t]);
			return x(r, e)
		}
		var t = 1,
			n, r = Array.prototype.slice,
			i = e.isFunction,
			s = function(e) {
				return typeof e == "string"
			},
			o = {},
			u = {},
			a = "onfocusin" in window,
			f = {
				focus: "focusin",
				blur: "focusout"
			},
			l = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			};
		u.click = u.mousedown = u.mouseup = u.mousemove = "MouseEvents", e.event = {
			add: g,
			remove: y
		}, e.proxy = function(t, n) {
			var o = 2 in arguments && r.call(arguments, 2);
			if(i(t)) {
				var u = function() {
					return t.apply(n, o ? o.concat(r.call(arguments)) : arguments)
				};
				return u._zid = c(t), u
			}
			if(s(n)) return o ? (o.unshift(t[n], t), e.proxy.apply(null, o)) : e.proxy(t[n], t);
			throw new TypeError("expected function")
		}, e.fn.bind = function(e, t, n) {
			return this.on(e, t, n)
		}, e.fn.unbind = function(e, t) {
			return this.off(e, t)
		}, e.fn.one = function(e, t, n, r) {
			return this.on(e, t, n, r, 1)
		};
		var b = function() {
				return !0
			},
			w = function() {
				return !1
			},
			E = /^([A-Z]|returnValue$|layer[XY]$)/,
			S = {
				preventDefault: "isDefaultPrevented",
				stopImmediatePropagation: "isImmediatePropagationStopped",
				stopPropagation: "isPropagationStopped"
			};
		e.fn.delegate = function(e, t, n) {
			return this.on(t, e, n)
		}, e.fn.undelegate = function(e, t, n) {
			return this.off(t, e, n)
		}, e.fn.live = function(t, n) {
			return e(document.body).delegate(this.selector, t, n), this
		}, e.fn.die = function(t, n) {
			return e(document.body).undelegate(this.selector, t, n), this
		}, e.fn.on = function(t, o, u, a, f) {
			var l, c, h = this;
			if(t && !s(t)) return e.each(t, function(e, t) {
				h.on(e, o, u, t, f)
			}), h;
			!s(o) && !i(a) && a !== !1 && (a = u, u = o, o = n);
			if(i(u) || u === !1) a = u, u = n;
			return a === !1 && (a = w), h.each(function(n, i) {
				f && (l = function(e) {
					return y(i, e.type, a), a.apply(this, arguments)
				}), o && (c = function(t) {
					var n, s = e(t.target).closest(o, i).get(0);
					if(s && s !== i) return n = e.extend(T(t), {
						currentTarget: s,
						liveFired: i
					}), (l || a).apply(s, [n].concat(r.call(arguments, 1)))
				}), g(i, t, a, u, o, c || l)
			})
		}, e.fn.off = function(t, r, o) {
			var u = this;
			return t && !s(t) ? (e.each(t, function(e, t) {
				u.off(e, r, t)
			}), u) : (!s(r) && !i(o) && o !== !1 && (o = r, r = n), o === !1 && (o = w), u.each(function() {
				y(this, t, o, r)
			}))
		}, e.fn.trigger = function(t, n) {
			return t = s(t) || e.isPlainObject(t) ? e.Event(t) : x(t), t._args = n, this.each(function() {
				t.type in f && typeof this[t.type] == "function" ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
			})
		}, e.fn.triggerHandler = function(t, n) {
			var r, i;
			return this.each(function(o, u) {
				r = T(s(t) ? e.Event(t) : t), r._args = n, r.target = u, e.each(h(u, t.type || t), function(e, t) {
					i = t.proxy(r);
					if(r.isImmediatePropagationStopped()) return !1
				})
			}), i
		}, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
			e.fn[t] = function(e) {
				return 0 in arguments ? this.bind(t, e) : this.trigger(t)
			}
		}), e.Event = function(e, t) {
			s(e) || (t = e, e = t.type);
			var n = document.createEvent(u[e] || "Events"),
				r = !0;
			if(t)
				for(var i in t) i == "bubbles" ? r = !!t[i] : n[i] = t[i];
			return n.initEvent(e, r, !0), x(n)
		}
	}(Zepto),
	function($) {
		function triggerAndReturn(e, t, n) {
			var r = $.Event(t);
			return $(e).trigger(r, n), !r.isDefaultPrevented()
		}

		function triggerGlobal(e, t, n, r) {
			if(e.global) return triggerAndReturn(t || document, n, r)
		}

		function ajaxStart(e) {
			e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
		}

		function ajaxStop(e) {
			e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
		}

		function ajaxBeforeSend(e, t) {
			var n = t.context;
			if(t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
			triggerGlobal(t, n, "ajaxSend", [e, t])
		}

		function ajaxSuccess(e, t, n, r) {
			var i = n.context,
				s = "success";
			n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), triggerGlobal(n, i, "ajaxSuccess", [t, n, e]), ajaxComplete(s, t, n)
		}

		function ajaxError(e, t, n, r, i) {
			var s = r.context;
			r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), triggerGlobal(r, s, "ajaxError", [n, r, e || t]), ajaxComplete(t, n, r)
		}

		function ajaxComplete(e, t, n) {
			var r = n.context;
			n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
		}

		function empty() {}

		function mimeToDataType(e) {
			return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
		}

		function appendQuery(e, t) {
			return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
		}

		function serializeData(e) {
			e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined)
		}

		function parseArguments(e, t, n, r) {
			return $.isFunction(t) && (r = n, n = t, t = undefined), $.isFunction(n) || (r = n, n = undefined), {
				url: e,
				data: t,
				success: n,
				dataType: r
			}
		}

		function serialize(e, t, n, r) {
			var i, s = $.isArray(t),
				o = $.isPlainObject(t);
			$.each(t, function(t, u) {
				i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u)
			})
		}
		var jsonpID = 0,
			document = window.document,
			key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			scriptTypeRE = /^(?:text|application)\/javascript/i,
			xmlTypeRE = /^(?:text|application)\/xml/i,
			jsonType = "application/json",
			htmlType = "text/html",
			blankRE = /^\s*$/,
			originAnchor = document.createElement("a");
		originAnchor.href = window.location.href, $.active = 0, $.ajaxJSONP = function(e, t) {
			if("type" in e) {
				var n = e.jsonpCallback,
					r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID,
					i = document.createElement("script"),
					s = window[r],
					o, u = function(e) {
						$(i).triggerHandler("error", e || "abort")
					},
					a = {
						abort: u
					},
					f;
				return t && t.promise(a), $(i).on("load error", function(n, u) {
					clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined
				}), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function() {
					o = arguments
				}, i.src = e.url.replace(/\?(.+)=\?/, "?$1=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function() {
					u("timeout")
				}, e.timeout)), a)
			}
			return $.ajax(e)
		}, $.ajaxSettings = {
			type: "GET",
			beforeSend: empty,
			success: empty,
			error: empty,
			complete: empty,
			context: null,
			global: !0,
			xhr: function() {
				return new window.XMLHttpRequest
			},
			accepts: {
				script: "text/javascript, application/javascript, application/x-javascript",
				json: jsonType,
				xml: "application/xml, text/xml",
				html: htmlType,
				text: "text/plain"
			},
			crossDomain: !1,
			timeout: 0,
			processData: !0,
			cache: !0
		}, $.ajax = function(options) {
			var settings = $.extend({}, options || {}),
				deferred = $.Deferred && $.Deferred(),
				urlAnchor;
			for(key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
			ajaxStart(settings), settings.crossDomain || (urlAnchor = document.createElement("a"), urlAnchor.href = settings.url, urlAnchor.href = urlAnchor.href, settings.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host), settings.url || (settings.url = window.location.toString()), serializeData(settings);
			var dataType = settings.dataType,
				hasPlaceholder = /\?.+=\?/.test(settings.url);
			hasPlaceholder && (dataType = "jsonp");
			if(settings.cache === !1 || (!options || options.cache !== !0) && ("script" == dataType || "jsonp" == dataType)) settings.url = appendQuery(settings.url, "_=" + Date.now());
			if("jsonp" == dataType) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
			var mime = settings.accepts[dataType],
				headers = {},
				setHeader = function(e, t) {
					headers[e.toLowerCase()] = [e, t]
				},
				protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
				xhr = settings.xhr(),
				nativeSetHeader = xhr.setRequestHeader,
				abortTimeout;
			deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
			if(mime = settings.mimeType || mime) mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
			(settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
			if(settings.headers)
				for(name in settings.headers) setHeader(name, settings.headers[name]);
			xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
					var result, error = !1;
					if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
						dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
						try {
							dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
						} catch(e) {
							error = e
						}
						error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
					} else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
				}
			};
			if(ajaxBeforeSend(xhr, settings) === !1) return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
			if(settings.xhrFields)
				for(name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
			var async = "async" in settings ? settings.async : !0;
			xhr.open(settings.type, settings.url, async, settings.username, settings.password);
			for(name in headers) nativeSetHeader.apply(xhr, headers[name]);
			return settings.timeout > 0 && (abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
			}, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
		}, $.get = function() {
			return $.ajax(parseArguments.apply(null, arguments))
		}, $.post = function() {
			var e = parseArguments.apply(null, arguments);
			return e.type = "POST", $.ajax(e)
		}, $.getJSON = function() {
			var e = parseArguments.apply(null, arguments);
			return e.dataType = "json", $.ajax(e)
		}, $.fn.load = function(e, t, n) {
			if(!this.length) return this;
			var r = this,
				i = e.split(/\s/),
				s, o = parseArguments(e, t, n),
				u = o.success;
			return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function(e) {
				r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments)
			}, $.ajax(o), this
		};
		var escape = encodeURIComponent;
		$.param = function(e, t) {
			var n = [];
			return n.add = function(e, t) {
				$.isFunction(t) && (t = t()), t == null && (t = ""), this.push(escape(e) + "=" + escape(t))
			}, serialize(n, e, t), n.join("&").replace(/%20/g, "+")
		}
	}(Zepto),
	function(e) {
		e.fn.serializeArray = function() {
			var t, n, r = [],
				i = function(e) {
					if(e.forEach) return e.forEach(i);
					r.push({
						name: t,
						value: e
					})
				};
			return this[0] && e.each(this[0].elements, function(r, s) {
				n = s.type, t = s.name, t && s.nodeName.toLowerCase() != "fieldset" && !s.disabled && n != "submit" && n != "reset" && n != "button" && n != "file" && (n != "radio" && n != "checkbox" || s.checked) && i(e(s).val())
			}), r
		}, e.fn.serialize = function() {
			var e = [];
			return this.serializeArray().forEach(function(t) {
				e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
			}), e.join("&")
		}, e.fn.submit = function(t) {
			if(0 in arguments) this.bind("submit", t);
			else if(this.length) {
				var n = e.Event("submit");
				this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
			}
			return this
		}
	}(Zepto),
	function(e) {
		"__proto__" in {} || e.extend(e.zepto, {
			Z: function(t, n) {
				return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
			},
			isZ: function(t) {
				return e.type(t) === "array" && "__Z" in t
			}
		});
		try {
			getComputedStyle(undefined)
		} catch(t) {
			var n = getComputedStyle;
			window.getComputedStyle = function(e) {
				try {
					return n(e)
				} catch(t) {
					return null
				}
			}
		}
	}(Zepto), define("zepto", function() {}),
	function(e) {
		function a(e, t, n, r) {
			return Math.abs(e - t) >= Math.abs(n - r) ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
		}

		function f() {
			s = null, t.last && (t.el.trigger("longTap"), t = {})
		}

		function l() {
			s && clearTimeout(s), s = null
		}

		function c() {
			n && clearTimeout(n), r && clearTimeout(r), i && clearTimeout(i), s && clearTimeout(s), n = r = i = s = null, t = {}
		}

		function h(e) {
			return(e.pointerType == "touch" || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary
		}

		function p(e, t) {
			return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t
		}
		var t = {},
			n, r, i, s, o = 750,
			u;
		e(document).ready(function() {
			var d, v, m = 0,
				g = 0,
				y, b;
			"MSGesture" in window && (u = new MSGesture, u.target = document.body), e(document).bind("MSGestureEnd", function(e) {
				var n = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
				n && (t.el.trigger("swipe"), t.el.trigger("swipe" + n))
			}).on("touchstart MSPointerDown pointerdown", function(r) {
				if((b = p(r, "down")) && !h(r)) return;
				y = b ? r : r.touches[0], r.touches && r.touches.length === 1 && t.x2 && (t.x2 = undefined, t.y2 = undefined), d = Date.now(), v = d - (t.last || d), t.el = e("tagName" in y.target ? y.target : y.target.parentNode), n && clearTimeout(n), t.x1 = y.pageX, t.y1 = y.pageY, v > 0 && v <= 250 && (t.isDoubleTap = !0), t.last = d, s = setTimeout(f, o), u && b && u.addPointer(r.pointerId)
			}).on("touchmove MSPointerMove pointermove", function(e) {
				if((b = p(e, "move")) && !h(e)) return;
				y = b ? e : e.touches[0], l(), t.x2 = y.pageX, t.y2 = y.pageY, m += Math.abs(t.x1 - t.x2), g += Math.abs(t.y1 - t.y2)
			}).on("touchend MSPointerUp pointerup", function(s) {
				if((b = p(s, "up")) && !h(s)) return;
				l(), t.x2 && Math.abs(t.x1 - t.x2) > 30 || t.y2 && Math.abs(t.y1 - t.y2) > 30 ? i = setTimeout(function() {
					t.el.trigger("swipe"), t.el.trigger("swipe" + a(t.x1, t.x2, t.y1, t.y2)), t = {}
				}, 0) : "last" in t && (m < 30 && g < 30 ? r = setTimeout(function() {
					var r = e.Event("tap");
					r.cancelTouch = c, t.el.trigger(r), t.isDoubleTap ? (t.el && t.el.trigger("doubleTap"), t = {}) : n = setTimeout(function() {
						n = null, t.el && t.el.trigger("singleTap"), t = {}
					}, 250)
				}, 0) : t = {}), m = g = 0
			}).on("touchcancel MSPointerCancel pointercancel", c), e(window).on("scroll", c)
		}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap", "touchend"].forEach(function(t) {
			e.fn[t] = function(e) {
				return this.on(t, e)
			}
		})
	}(Zepto), define("zepto.touch", ["zepto"], function() {}), requirejs.config({
		baseUrl: "./",
		paths: {
			jquery: "../bower_components/jquery/dist/jquery",
			"jquery.transit": "../bower_components/jquery.transit/jquery.transit",
			"slick-carousel": "../bower_components/slick-carousel/slick/slick",
			zepto: "../bower_components/zepto/zepto",
			"zepto.touch": "scripts/zepto.touch"
		},
		shim: {
			"jquery.transit": {
				deps: ["jquery"]
			},
			"slick-carousel": {
				deps: ["jquery"]
			},
			"zepto.touch": {
				deps: ["zepto"]
			}
		}
	}), require(["jquery", "jquery.transit", "slick-carousel", "zepto.touch"], function(e) {
		(function() {
			var t = window.navigator,
				n = t.userAgent,
				r = /iPhone/i,
				i = /ipad/i,
				s = /Windows\sNT\s6.2/i,
				o = /Android/i,
				u = /windows\sphone/i,
				a = /Symbian|Nokia/i;
			if(u.test(n) || r.test(n) || i.test(n) || s.test(n) || o.test(n) || a.test(n)) {
				var f = function() {
						var e = document.documentElement.clientWidth,
							t = document.documentElement.clientHeight;
						e < t && alert("请旋转手机，横屏显示")
					},
					l = "onorientationchange" in window ? "orientationchange" : "resize";
				window.addEventListener(l, function() {
					setTimeout(f, 2e3)
				}, !1), f(), e("body").addClass("plat-mob")
			} else e("#menu").css("display", "block");
			e("#pager").addClass("show")
		})();
		var t = e(window).height(),
			n = e(window).width(),
			r = {
				locked: !1,
				cur_section: 0,
				section_num: e(".section").length,
				init: function() {
					e(window).bind("resize", function() {
						t = e(this).height(), n = e(this).width(), e.each(r.getPrevs(), function(n, r) {
							e(r).css({
								transform: "translateY(" + -t + "px)"
							}).addClass("noTransition")
						});
						for(var i = 0; i < r.section_num; i++) s[i] && s[i].adjustPos()
					});
					var i = (new Date).getTime(),
						o = (new Date).getTime(),
						a = o - i,
						f = 0,
						l = null,
						c = function() {
							clearInterval(l), l = null, f = 0
						},
						h = function(e) {
							e > 0 ? r.next() : r.prev()
						},
						p = document.mozHidden !== undefined ? "DOMMouseScroll" : "mousewheel";
					e(document).bind(p, function(e) {
						var t = p === "mousewheel" ? e.originalEvent.deltaY : e.originalEvent.detail;
						l || (l = setInterval(function() {
							f++, f > 310 && c()
						}, 1)), o = (new Date).getTime(), typeof i != "undefined" && (a = o - i, a > 300 ? (h(t), c()) : f > 300 && (h(t), c())), i = o, e.preventDefault()
					}), e(document).bind("touchmove", function(e) {
						e.preventDefault()
					}), e(document).bind("swipeUp", function(e) {
						h(1), e.preventDefault()
					}), e(document).bind("swipeDown", function(e) {
						h(-1), e.preventDefault()
					});
					var d = !1;
					e(document).unbind("mousemove").bind("mousemove", function(r) {
						if(e("body").hasClass("plat-mob")) return;
						var i = e(".section-bg-moveable");
						d || (i.addClass("transition"), setTimeout(function() {
							i.removeClass("transition")
						}, 500), d = !0);
						var s = -(.5 - r.clientX / n) * 30,
							o = (.5 - r.clientY / t) * 10,
							u = "translateX(" + -s + "px) translateY(" + o + "px)";
						i.css("transform", u)
					}), e("#page-title").bind("click", function() {
						e(this).hasClass("active") ? u.close() : r.gotoSection(0)
					})
				},
				next: function() {
					if(r.locked || r.cur_section >= r.section_num - 1) return;
					r.getCur().transition({
						transform: "translate(0," + -t + "px)",
						duration: 700,
						easing: "cubic-bezier(.825,0,.5,1)",
						complete: function() {
							r.unlock()
						}
					}), i.active(++r.cur_section), s[r.cur_section] && s[r.cur_section].runAnim(), r.lock(), e("#page-title").removeClass("fade-out"), e("#menu").removeClass("active")
				},
				prev: function() {
					if(r.locked || r.cur_section <= 0) return;
					r.getPrev().transition({
						transform: "translate(0,0px)",
						duration: 700,
						easing: "cubic-bezier(.825,0,.5,1)",
						complete: function() {
							r.unlock()
						}
					}), i.active(--r.cur_section), s[r.cur_section] && s[r.cur_section].runAnim(), r.lock(), r.cur_section === 0 ? e("#page-title").addClass("fade-out") : e("#page-title").removeClass("fade-out"), e("#menu").removeClass("active")
				},
				getCur: function() {
					return e(".section").eq(r.cur_section)
				},
				getPrev: function() {
					return e(".section").eq(r.cur_section - 1)
				},
				getNext: function() {
					return e(".section").eq(r.cur_section + 1)
				},
				getPrevs: function(t) {
					var n = [],
						i = typeof t == "undefined" ? r.cur_section : t;
					for(var s = 0; s < i; s++) n.push(e(".section").eq(s));
					return n
				},
				getNexts: function(t, n) {
					var i = [],
						s = typeof t == "undefined" ? r.cur_section : t;
					for(var o = n ? s : s + 1; o < r.section_num; o++) i.push(e(".section").eq(o));
					return i
				},
				lock: function() {
					r.locked = !0
				},
				unlock: function() {
					r.locked = !1
				},
				getAll: function() {
					return e(".section")
				},
				gotoSection: function(n, o, u) {
					if(r.locked || n < 0 || n >= r.section_num || n == r.cur_section) return;
					var a = n > r.cur_section ? "next" : "prev",
						f = a == "next" ? r.getPrevs(n) : r.getNexts(n, !0);
					e.each(f, function(n, i) {
						console.log(u, "noAnim"), a == "next" ? u ? e(i).css({
							transform: "translate(0," + -t + "px)"
						}) : e(i).transition({
							transform: "translate(0," + -t + "px)",
							duration: 700,
							easing: "cubic-bezier(.825,0,.5,1)",
							complete: function() {
								r.unlock()
							}
						}) : u ? e(i).css({
							transform: "translate(0,0px)"
						}) : e(i).transition({
							transform: "translate(0,0px)",
							duration: 700,
							easing: "cubic-bezier(.825,0,.5,1)",
							complete: function() {
								r.unlock()
							}
						})
					}), r.lock(), i.active(r.cur_section = n), s[r.cur_section].runAnim(), r.cur_section === 0 ? e("#page-title").addClass("fade-out") : e("#page-title").removeClass("fade-out"), o != "click" && e("#menu").removeClass("active")
				}
			},
			i = {
				pager_num: e(".section").length,
				init: function() {
					i.getAll().each(function(t, n) {
						e(n).bind("click", function(e) {
							r.gotoSection(t)
						})
					}), i.active(0)
				},
				active: function(e) {
					i.getAll().removeClass("active").eq(e).addClass("active")
				},
				getAll: function() {
					return e(".p-dot")
				}
			},
			s = [];
		s[0] = {
			init: function() {
				s[0].adjustPos()
			},
			adjustPos: function() {
				e(".section-1-anim").css({
					marginLeft: -e(".section-1-anim").width() / 2,
					marginTop: -e(".section-1-anim").height() / 2
				}), s[0].runAnim()
			},
			runAnim: function() {
				r.lock(), console.log("hre"), e(".section-1-anim").css({
					opacity: 0,
					transition: "none"
				}), e(".section-1-anim .section-1-logo").css({
					transform: "translate(0, 50px)",
					transition: "none"
				}), setTimeout(function() {
					e(".section-1-anim").transition({
						opacity: 1,
						duration: 700,
						easing: "cubic-bezier(.825,0,.5,1)",
						complete: function() {
							r.unlock()
						}
					}), e(".section-1-anim .section-1-logo").transition({
						transform: "translate(0, 10px)",
						duration: 700,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					})
				}, 700)
			}
		}, s[1] = {
			init: function() {
				s[1].adjustPos()
			},
			adjustPos: function() {
				e(".section-2 .section-content").css({
					marginLeft: -e(".section-2 .section-content").width() / 2,
					marginTop: -e(".section-2 .section-content").height() / 2
				})
			},
			runAnim: function() {
				r.lock(), e(".section-2-symbol").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), e(".section-2-slogan").css({
					opacity: 0,
					transition: "none"
				}), e(".section-2-words").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), setTimeout(function() {
					e(".section-2-symbol").transition({
						opacity: 1,
						transform: "translate(0, 10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					}), e(".section-2-slogan").transition({
						opacity: 1,
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					}), e(".section-2-words").transition({
						opacity: 1,
						duration: 500,
						transform: "translate(0, -10px)",
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					})
				}, 700)
			}
		}, s[2] = {
			init: function() {
				e(".work-image").each(function(t, n) {
					e(this).bind("click", function(e) {})
				}), s[2].adjustPos()
			},
			adjustPos: function() {
				console.log("adjusting");
				var t = e(".section-3-works").width() * .12,
					n = e(".section-3-works").width() * .244,
					r = e(".section-3-works").width() * .002;
				e(".section-3 .section-3-works img").each(function(i, s) {
					e(s).hasClass("big") ? e(s).css({}) : e(s).css({})
				}), e(".section-3 .section-content").css({
					marginLeft: -e(".section-3 .section-content").width() / 2,
					marginTop: -e(".section-3 .section-content").height() / 2
				})
			},
			runAnim: function() {
				r.lock(), e(".work-image").css({
					opacity: 0,
					transform: "translate(50px,0)",
					transition: "none"
				}), setTimeout(function() {
					e(".work-image").each(function(t, n) {
						e(this).transition({
							opacity: 1,
							transform: "translate(0px, 0)",
							duration: 700,
							easing: "cubic-bezier(.165,.84,.44,1)",
							delay: t * 50
						})
					})
				}, 700)
			}
		}, s[3] = {
			init: function() {
				s[3].adjustPos()
			},
			adjustPos: function() {
				console.log("adjusting"), e(".section-4 .section-content").css({
					marginLeft: -e(".section-4 .section-content").width() / 2,
					marginTop: -e(".section-4 .section-content").height() / 2
				})
			},
			runAnim: function() {
				r.lock(), e(".section-4-words").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), e(".section-4-logos").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), setTimeout(function() {
					e(".section-4-words").transition({
						opacity: 1,
						transform: "translate(0, 10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					}), e(".section-4-logos").transition({
						opacity: 1,
						transform: "translate(0, -10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					})
				}, 700)
			}
		}, s[4] = {
			init: function() {
				s[4].adjustPos(), e(".member-image").slick({
					infinite: !0,
					slidesToShow: 3,
					slidesToScroll: 2,
					prevArrow: ".team-btn-left",
					nextArrow: ".team-btn-right"
				})
			},
			adjustPos: function() {
				console.log("adjusting"), e(".section-5 .section-content").css({
					marginLeft: -e(".section-5 .section-content").width() / 2,
					marginTop: -e(".section-5 .section-content").height() / 2
				})
			},
			runAnim: function() {
				r.lock(), e(".section-5-words").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), e(".team-con").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), e(".team-btn-right").css({
					transform: "translate(-30px, 0)",
					transition: "none"
				}), e(".team-btn-left").css({
					transform: "translate(30px, 0)",
					transition: "none"
				}), setTimeout(function() {
					e(".section-5-words").transition({
						opacity: 1,
						transform: "translate(0, 10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					}), e(".team-con").transition({
						opacity: 1,
						transform: "translate(0, -10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					}), e(".team-btn-right").transition({
						transform: "translate(0px, 0)",
						duration: 500,
						easing: "cubic-bezier(.165,.84,.44,1)"
					}), e(".team-btn-left").transition({
						transform: "translate(0px, 0)",
						duration: 500,
						easing: "cubic-bezier(.165,.84,.44,1)"
					})
				}, 700)
			}
		}, s[5] = {
			init: function() {
				s[5].adjustPos(), e(".section-6-more").bind("click", function(e) {
					window.location.href = "http://blog.sina.com.cn/penglindesign"
				})
			},
			adjustPos: function() {
				console.log("adjusting"), e(".section-6 .section-content").css({
					marginLeft: -e(".section-6 .section-content").width() / 2,
					marginTop: -e(".section-6 .section-content").height() / 2
				})
			},
			runAnim: function() {
				r.lock(), e(".section-6-title").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), e(".section-6-more-anim").css({
					opacity: 0,
					transform: "translate(0,0)",
					transition: "none"
				}), setTimeout(function() {
					e(".section-6-title").transition({
						opacity: 1,
						transform: "translate(0, 10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					}), e(".section-6-more-anim").transition({
						opacity: 1,
						transform: "translate(0, -10px)",
						duration: 500,
						easing: "ease",
						complete: function() {
							r.unlock()
						}
					})
				}, 700)
			}
		};
		var o = {
				init: function() {
					e(".menu-icon").bind("click", function(t) {
						e("#menu").toggleClass("active")
					}), o.getAll().each(function(t, n) {
						e(n).bind("click", function() {
							r.gotoSection(r.section_num - t - 1, "click")
						})
					})
				},
				getAll: function() {
					return e(".menu-items a")
				}
			},
			u = {
				el: e("#works-detail"),
				init: function() {
					var e = document.mozHidden !== undefined ? "DOMMouseScroll" : "mousewheel";
					u.el.bind(e, function(e) {
						e.stopPropagation()
					})
				},
				load: function(t) {
					var n = {
						title: "Colour and Lines",
						content: '<div>A mixture of colour and lines applied across a wide area of themes.</div><div>Enjoi.</div><img style="margin-top:20px;" src="images/section3/detail-demo-1.jpg"><img src="images/section3/detail-demo-2.jpg">'
					};
					u.el.find("#detail-title").html(n.title), u.el.find("#detail-content").html(n.content), u.el.css({
						transform: "scale(1.04)",
						display: "block"
					}), e("#x").css({
						display: "block"
					}), r.lock(), setTimeout(function() {
						u.el.transition({
							opacity: 1,
							transform: "scale(1)",
							duration: 300,
							easing: "cubic-bezier(.165,.84,.44,1)"
						}), e("#x").transition({
							opacity: 1,
							duration: 300,
							easing: "cubic-bezier(.165,.84,.44,1)"
						})
					}, 10), e("#page-title").addClass("active")
				},
				close: function() {
					e("#page-title").removeClass("active"), u.el.transition({
						opacity: 0,
						transform: "scale(1.04)",
						duration: 300,
						easing: "cubic-bezier(.165,.84,.44,1)",
						complete: function() {
							u.el.css({
								display: "none"
							}), r.unlock()
						}
					}), e("#x").transition({
						opacity: 0,
						duration: 300,
						easing: "cubic-bezier(.165,.84,.44,1)",
						complete: function() {
							e("#x").css("display", "none")
						}
					})
				},
				next: function() {},
				prev: function() {}
			};
		r.init(), i.init(), s[0].init(), s[1].init(), s[2].init(), s[3].init(), s[4].init(), s[5].init(), u.init(), o.init();
		var a = function() {
			var e = {},
				t = [],
				n = -1,
				r = window.location.search.substring(1);
			return t = r.split("&"), t.forEach(function(t) {
				n = t.indexOf("=");
				var r = t.substring(0, n),
					i = decodeURIComponent(t.substring(n + 1));
				e[r] = i
			}), e
		}();
		a.section && (r.unlock(), r.gotoSection(a.section, "", !0)), e("#main-loading").remove()
	}), define("scripts/main", function() {});