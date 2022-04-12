let warn = (...e) => {},
	log = (...e) => {};

function storageGet(e, t) {
	return new Promise((r => {
		chrome.storage.local.get(e, (n => r(n[e] || (null == t ? void 0 : t()))))
	}))
}

function storageSet(e, t) {
	return new Promise((r => {
		chrome.storage.local.set({
			[e]: t
		}, (() => r()))
	}))
}
const UNREAD_NOTE_ALARMS = "unread_note_alarms_key",
	CONTEXT_MENU_TITLE = "记个笔记",
	JUEJIN_CN = "掘金",
	NOTE_CREATE_HASH = "#/flash-note/editor",
	NOTE_ACTION_CREATE = "jj_flash_note_action_create",
	JJ_CONTEXT_MENU_ADD = "jj_flash_note_menu_add",
	ppeHeaders = {},
	VERSION_URL = "https://e.juejin.cn/version_api/get",
	CODE_URL_CDN = "https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/global-search.1.0.0.279.js",
	CODE_URL_EXT = "/static/global-search.1.0.0.279.js",
	CODE_KEY = "global-search",
	CHECK_UPDATE_INTERVAL = ["online", "test"].includes("online") ? 6e5 : -1;
async function loadCode() {
	let e = await storageGet(CODE_KEY);
	return e ? (refreshCodeIfNeeded(e).catch((e => warn("refresh code error", e))), e) : await refreshCodeIfNeeded()
}
let lastCheckUpdateAt = -1;
async function refreshCodeIfNeeded(e) {
	let t = !1;
	const r = (null == e ? void 0 : e.version) || "1.0.0.279";
	let n = r;
	if (Date.now() - lastCheckUpdateAt > CHECK_UPDATE_INTERVAL && (lastCheckUpdateAt = Date.now(), t = !0, n =
			await getVersion().catch((e => r))), !t && e) return log(
		"no need check update, return prevCode version", e.version), e;
	let i = !0;
	const o = await fetch(CODE_URL_CDN.replace("1.0.0.279", n), {
		headers: ppeHeaders
	}).then((e => 200 !== e.status ? (i = !1, fetch(CODE_URL_EXT, {
		headers: ppeHeaders
	})) : e)).catch((e => (i = !1, fetch(CODE_URL_EXT, {
		headers: ppeHeaders
	}))));
	if (200 !== o.status) throw new Error(`refresh code error ${o.status}:${o.statusText}`);
	const a = await o.text();
	log(`find latest global-search code version:${n} thumbnail:${a.substr(a.indexOf(n)-10,30)}`);
	const s = {
		content: a,
		lastModified: o.headers.get("last-modified") || "",
		version: n,
		md5: o.headers.get("content-md5") || ""
	};
	return i && storeCode(s), s
}
async function getVersion() {
	const e = await fetch(VERSION_URL, {
		headers: ppeHeaders
	});
	if (200 !== e.status) throw new Error(`${e.status}:${e.statusText}`);
	return await e.text()
}
async function storeCode(e) {
	log(`store code version version:${e.version} thumbnail:${e.content.substr(e.content.indexOf(e.version),30)}`),
		await storageSet(CODE_KEY, e)
}
async function getLogicCode() {
	var e, t, r;
	const n = await storageGet("data");
	if (!(null == (r = null == (t = null == (e = null == n ? void 0 : n.content) ? void 0 : e.state) ? void 0 : t
			.settings.systemSettings.find((e => "enableGlobalSearch" === e.name))) ? void 0 : r.value)) return {
		content: "",
		version: "",
		lastModified: "",
		md5: ""
	};
	try {
		return await loadCode()
	} catch (i) {
		return {
			content: "",
			version: "",
			lastModified: "",
			md5: ""
		}
	}
}

function getInstallChannel() {
	return "webstore"
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var __assign = function() {
	return (__assign = Object.assign || function(e) {
		for (var t, r = 1, n = arguments.length; r < n; r++)
			for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e
	}).apply(this, arguments)
};

function __rest(e, t) {
	var r = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
	if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
		var i = 0;
		for (n = Object.getOwnPropertySymbols(e); i < n.length; i++) t.indexOf(n[i]) < 0 && (r[n[i]] = e[n[i]])
	}
	return r
}

function __values(e) {
	var t = "function" == typeof Symbol && e[Symbol.iterator],
		r = 0;
	return t ? t.call(e) : {
		next: function() {
			return e && r >= e.length && (e = void 0), {
				value: e && e[r++],
				done: !e
			}
		}
	}
}

function __read(e, t) {
	var r = "function" == typeof Symbol && e[Symbol.iterator];
	if (!r) return e;
	var n, i, o = r.call(e),
		a = [];
	try {
		for (;
			(void 0 === t || t-- > 0) && !(n = o.next()).done;) a.push(n.value)
	} catch (s) {
		i = {
			error: s
		}
	} finally {
		try {
			n && !n.done && (r = o.return) && r.call(o)
		} finally {
			if (i) throw i.error
		}
	}
	return a
}

function __spread() {
	for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(__read(arguments[t]));
	return e
}
var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" !=
	typeof self ? self : {};

function createCommonjsModule(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var js_cookie = createCommonjsModule((function(e, t) {
		var r;
		r = function() {
			function e() {
				for (var e = 0, t = {}; e < arguments.length; e++) {
					var r = arguments[e];
					for (var n in r) t[n] = r[n]
				}
				return t
			}

			function t(e) {
				return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
			}
			return function r(n) {
				function i() {}

				function o(t, r, o) {
					if ("undefined" != typeof document) {
						"number" == typeof(o = e({
							path: "/"
						}, i.defaults, o)).expires && (o.expires = new Date(1 * new Date + 864e5 * o
							.expires)), o.expires = o.expires ? o.expires.toUTCString() : "";
						try {
							var a = JSON.stringify(r);
							/^[\{\[]/.test(a) && (r = a)
						} catch (u) {}
						r = n.write ? n.write(r, t) : encodeURIComponent(String(r)).replace(
							/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
							decodeURIComponent), t = encodeURIComponent(String(t)).replace(
							/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g,
							escape);
						var s = "";
						for (var c in o) o[c] && (s += "; " + c, !0 !== o[c] && (s += "=" + o[c].split(
							";")[0]));
						return document.cookie = t + "=" + r + s
					}
				}

				function a(e, r) {
					if ("undefined" != typeof document) {
						for (var i = {}, o = document.cookie ? document.cookie.split("; ") : [], a =
							0; a < o.length; a++) {
							var s = o[a].split("="),
								c = s.slice(1).join("=");
							r || '"' !== c.charAt(0) || (c = c.slice(1, -1));
							try {
								var u = t(s[0]);
								if (c = (n.read || n)(c, u) || t(c), r) try {
									c = JSON.parse(c)
								} catch (l) {}
								if (i[u] = c, e === u) break
							} catch (l) {}
						}
						return e ? i[e] : i
					}
				}
				return i.set = o, i.get = function(e) {
					return a(e, !1)
				}, i.getJSON = function(e) {
					return a(e, !0)
				}, i.remove = function(t, r) {
					o(t, "", e(r, {
						expires: -1
					}))
				}, i.defaults = {}, i.withConverter = r, i
			}((function() {}))
		}, e.exports = r()
	})),
	Memory = function() {
		function e() {
			this.cache = {}
		}
		return e.prototype.setItem = function(e, t) {
			this.cache[e] = t
		}, e.prototype.getItem = function(e) {
			return this.cache[e]
		}, e.prototype.removeItem = function(e) {
			this.cache[e] = void 0
		}, e
	}();

function isSupportLS() {
	try {
		return localStorage.setItem("_ranger-test-key", "hi"), localStorage.getItem("_ranger-test-key"), localStorage
			.removeItem("_ranger-test-key"), !0
	} catch (e) {
		return !1
	}
}

function isSupportSession() {
	try {
		return sessionStorage.setItem("_ranger-test-key", "hi"), sessionStorage.getItem("_ranger-test-key"),
			sessionStorage.removeItem("_ranger-test-key"), !0
	} catch (e) {
		return !1
	}
}
var local = {
		getItem: function(e) {
			try {
				var t = localStorage.getItem(e),
					r = t;
				try {
					t && "string" == typeof t && (r = JSON.parse(t))
				} catch (n) {}
				return r || void 0
			} catch (n) {}
		},
		setItem: function(e, t) {
			try {
				var r = "string" == typeof t ? t : JSON.stringify(t);
				localStorage.setItem(e, r)
			} catch (n) {}
		},
		removeItem: function(e) {
			try {
				localStorage.removeItem(e)
			} catch (t) {}
		},
		getCookie: function(e, t) {
			try {
				return js_cookie.get(e, {
					domain: t || document.domain
				})
			} catch (r) {
				return ""
			}
		},
		setCookie: function(e, t, r, n) {
			try {
				var i = n || document.domain,
					o = +new Date + r;
				js_cookie.set(e, t, {
					expires: new Date(o),
					path: "/",
					domain: i
				})
			} catch (a) {}
		},
		isSupportLS: isSupportLS()
	},
	session = {
		getItem: function(e) {
			try {
				var t = sessionStorage.getItem(e),
					r = t;
				try {
					t && "string" == typeof t && (r = JSON.parse(t))
				} catch (n) {}
				return r || void 0
			} catch (n) {}
		},
		setItem: function(e, t) {
			try {
				var r = "string" == typeof t ? t : JSON.stringify(t);
				sessionStorage.setItem(e, r)
			} catch (n) {}
		},
		removeItem: function(e) {
			try {
				sessionStorage.removeItem(e)
			} catch (t) {}
		},
		isSupportSession: isSupportSession()
	},
	Storage = function() {
		function e(e, t) {
			this._storage = t && "session" === t ? session : !e && local.isSupportLS ? local : new Memory
		}
		return e.prototype.getItem = function(e) {
			return this._storage.getItem(e)
		}, e.prototype.setItem = function(e, t) {
			this._storage.setItem(e, t)
		}, e.prototype.getCookie = function(e, t) {
			return this._storage.getCookie(e, t)
		}, e.prototype.setCookie = function(e, t, r, n) {
			this._storage.setCookie(e, t, r, n)
		}, e.prototype.removeItem = function(e) {
			this._storage.removeItem(e)
		}, e
	}(),
	LOG_URL = {
		cn: "1fz22z22z1nz21z4mz4bz4bz1kz1az21z4az21z1lz21z21z1bz1iz4az1az1mz1k",
		sg: "1fz22z22z1nz21z4mz4bz4bz21z1ez18z1jz1gz49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k",
		va: "1fz22z22z1nz21z4mz4bz4bz1kz18z1jz1gz24z18z49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k"
	},
	WEBID_URL = "/webid",
	TOB_URL = "/tobid",
	REPORT_URL = "/list",
	GIF_URL = "/gif",
	SDK_VERSION = "4.2.7",
	ERROR = {
		NO_URL: 4001,
		IMG_ON: 4e3,
		IMG_CATCH: 4002,
		BEACON_FALSE: 4003,
		XHR_ON: 500,
		RESPONSE: 5001,
		TIMEOUT: 5005
	},
	CACHEKEY = function(e, t) {
		return t ? "__tea_cache_tokens_" + e : "__tea_cache_events_" + e
	},
	CONFIGKEY = function(e) {
		return "__tea_cache_config_" + e
	},
	COOKIEKEY = function(e) {
		return "__tea_cookie_tokens_" + e
	},
	SESSIONKEY = function(e) {
		return "__tea_session_id_" + e
	},
	CEPKEY = function(e) {
		return "__tea_cep_plan_" + e
	},
	getNameSpace = function() {
		if ("undefined" != typeof window) return window.TeaAnalyticsObject
	},
	DOMAINS = {
		cn: "1fz22z22z1nz21z4mz4bz4bz22z1mz19z1jz1mz1ez4az1az22z1mz19z21z1lz21z21z1bz1iz4az1az1mz1k",
		va: "1fz22z22z1nz21z4mz4bz4bz22z1mz19z1jz1mz1ez4az1gz22z1mz19z21z1lz21z21z1bz1iz4az1az1mz1k",
		sg: "1fz22z22z1nz21z4mz4bz4bz22z1mz19z1jz1mz1ez4az22z1mz19z21z1lz21z21z1bz1iz4az1az1mz1k"
	},
	COOKIE_EXPIRE = 6048e5,
	API = "/service/2/abtest_config/",
	STYLE_ID = "__rangers_ab_style__",
	STORAGE_DATA_KEY = "__tea_sdk_ab_version",
	STORAGE_DATA_EXPRIRE = 2592e6,
	ET_TEST_URL = "v1/list_test",
	EDITOR_URL_NEW_ASC =
	"1fz22z22z1nz21z4mz4bz4bz1jz1dz4fz49z1bz18z22z18z4az24z1mz1jz1az1az1bz1lz4az1az1mz1kz4bz1mz19z1hz4bz1bz18z22z18z49z21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz24z1gz21z23z18z1jz49z1cz1bz1gz22z1mz20z49z20z18z1lz1ez1cz20z21z4az1hz21",
	EDITOR_URL_OLD_ASC =
	"1fz22z22z1nz21z4mz4bz4bz21z4fz4az1nz21z22z18z22z1nz4az1az1mz1kz4bz1nz1ez1az4bz22z1cz1az1fz4bz1az1mz1jz1jz1cz1az22z4bz24z1gz21z23z18z1jz49z1cz1bz1gz22z1mz20z4az1hz21",
	VISUAL_URL_ASC =
	"1fz22z22z1nz21z4mz4bz4bz1jz1dz4fz49z1bz18z22z18z4az24z1mz1jz1az1az1bz1lz4az1az1mz1kz4bz1mz19z1hz4bz1bz18z22z18z49z21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz24z1gz21z23z18z1jz49z18z19z49z1az1mz20z1cz4az1hz21",
	VISUAL_URL_RANGER =
	"1fz22z22z1nz21z4mz4bz4bz1jz1dz4fz49z1bz18z22z18z4az24z1mz1jz1az1az1bz1lz4az1az1mz1kz4bz1mz19z1hz4bz1bz18z22z18z49z21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz24z1gz21z23z18z1jz49z18z19z49z1jz1mz18z1bz1cz20z4az1hz21",
	HOT_PIC_URL =
	"1fz22z22z1nz21z4mz4bz4bz1jz1dz4fz49z1bz18z22z18z4az24z1mz1jz1az1az1bz1lz4az1az1mz1kz4bz1mz19z1hz4bz1bz18z22z18z49z21z22z18z22z1gz1az4bz1jz1mz1ez49z21z1bz1iz4bz1az1mz1jz1jz1cz1az22z4bz1fz1cz18z22z1kz18z1nz49z1az1mz20z1c",
	VISUAL_URL_INSPECTOR =
	"1fz22z22z1nz21z4mz4bz4bz1jz1dz4fz49z1bz18z22z18z4az24z1mz1jz1az1az1bz1lz4az1az1mz1kz4bz1mz19z1hz4bz1bz18z22z18z49z21z22z18z22z1gz1az4bz22z1cz21z22z1cz20z4bz21z1bz1iz4bz22z1cz21z22z1cz20z49z1cz24z1cz1lz22z49z1gz1lz21z1nz1cz1az22z1mz20z4az4ez4az4ez4az4cz4az1hz21";

function xhr(e, t, r, n, i, o, a, s) {
	try {
		var c = new XMLHttpRequest,
			u = s || "POST";
		c.open(u, "" + e, !0), c.setRequestHeader("Content-Type", "application/json; charset=utf-8"), i && c
			.setRequestHeader("X-MCS-AppKey", "" + i), a && (c.withCredentials = !0), c.onload = function() {
				if (r) {
					var e = null;
					if (c.responseText) {
						try {
							e = JSON.parse(c.responseText)
						} catch (n) {
							e = {}
						}
						r(e, t)
					}
				}
			};
		try {
			o && (c.timeout = o), o && (c.ontimeout = function() {
				n && n(t, ERROR.TIMEOUT)
			}), c.onerror = function() {
				c.abort(), n && n(t, ERROR.XHR_ON)
			}, c.send(JSON.stringify(t))
		} catch (l) {}
	} catch (l) {}
}
var isSupportBeacon = function() {
		return !(!window.navigator || !window.navigator.sendBeacon)
	},
	NOOP = function() {},
	encodePayload = function(e) {
		var t = "";
		for (var r in e) e.hasOwnProperty(r) && void 0 !== e[r] && (t += "&" + r + "=" + encodeURIComponent(JSON
			.stringify(e[r])));
		return t = "&" === t[0] ? t.slice(1) : t
	},
	sendByImg = function(e, t, r, n) {
		try {
			var i = e.match(/\/v\d\//),
				o = "";
			o = i ? i[0] : -1 !== e.indexOf("/v1/") ? "/v1/" : "/v2/";
			var a = e.split(o)[0];
			if (!a) return void n(e, t, ERROR.NO_URL);
			t.forEach((function(i) {
				var o = encodePayload(i),
					s = new Image(1, 1);
				s.onload = function() {
					s = null, r && r()
				}, s.onerror = function() {
					s = null, n && n(e, t, ERROR.IMG_ON)
				}, s.src = "" + a + GIF_URL + "?" + o
			}))
		} catch (s) {
			n && n(e, t, ERROR.IMG_CATCH, s.message)
		}
	},
	request = function(e, t, r, n, i, o, a, s, c, u) {
		var l = window.navigator.userAgent,
			d = -1 !== window.navigator.appName.indexOf("Microsoft Internet Explorer") && (-1 !== l.indexOf(
				"MSIE 8.0") || -1 !== l.indexOf("MSIE 9.0")),
			p = !!n;
		if (!p && d) sendByImg(e, r, i, o);
		else if (!p && s) return isSupportBeacon() ? (u ? u() : NOOP(), void(window.navigator.sendBeacon(e, JSON
			.stringify(r)) ? i() : o(e, r, ERROR.BEACON_FALSE))) : void sendByImg(e, r, i, o);
		a && delete r.app_key, xhr(e, r, i, o, n, t, c)
	};

function b(e) {
	return e ? (e ^ 16 * Math.random() >> e / 4).toString(10) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
		b)
}
var webid = function() {
	return b().replace(/-/g, "").slice(0, 19)
};

function decrypto(e, t, r) {
	if ("string" == typeof e && "number" == typeof t && "number" == typeof r) {
		var n, i = [];
		r = r <= 25 ? r : r % 25;
		var o = String.fromCharCode(r + 97);
		n = e.split(o);
		for (var a = 0; a < n.length; a++) {
			var s = parseInt(n[a], r);
			s = 1 * s ^ t;
			var c = String.fromCharCode(s);
			i.push(c)
		}
		return i.join("")
	}
}
var decodeUrl = function(e) {
		return decrypto(e, 64, 25)
	},
	UTM = function(e, t, r, n) {
		var i = new Storage(!1),
			o = new Storage(!1, "session"),
			a = e ? "_tea_utm_cache_" + e : "_tea_utm_cache",
			s = e ? "_$utm_from_url_" + e : "_$utm_from_url",
			c = {},
			u = ["tr_shareuser", "tr_admaster", "tr_param1", "tr_param2", "tr_param3", "tr_param4", "$utm_from_url"],
			l = {
				creative_id: Number(t.creative_id),
				ad_id: Number(t.ad_id),
				campaign_id: Number(t.campaign_id),
				utm_source: t.utm_source,
				utm_medium: t.utm_medium,
				utm_campaign: t.utm_campaign,
				utm_term: t.utm_term,
				utm_content: t.utm_content,
				tr_shareuser: t.tr_shareuser,
				tr_admaster: t.tr_admaster,
				tr_param1: t.tr_param1,
				tr_param2: t.tr_param2,
				tr_param3: t.tr_param3,
				tr_param4: t.tr_param4
			},
			d = n;
		try {
			var p = !1;
			for (var f in l) l[f] && (-1 !== u.indexOf(f) ? (c.hasOwnProperty("tracer_data") || (c.tracer_data = {}), c
				.tracer_data[f] = l[f]) : c[f] = l[f], p = !0);
			if (p) o.setItem(s, "1"), i.setCookie(a, JSON.stringify(c), d, r);
			else {
				var h = i.getCookie(a, r);
				h && (c = JSON.parse(h)), i.setCookie(a, h, d, r)
			}
			o.getItem(s) && (c.hasOwnProperty("tracer_data") || (c.tracer_data = {}), c.tracer_data.$utm_from_url = 1)
		} catch (g) {
			return l
		}
		return c
	},
	parseURL = function(e) {
		var t = document.createElement("a");
		return t.href = e, t
	},
	parseUrlQuery = function(e) {
		var t = parseURL(e).search;
		t = t.slice(1);
		var r = {};
		return t.split("&").forEach((function(e) {
			var t, n, i = e.split("=");
			i.length && (t = i[0], n = i[1]);
			try {
				r[t] = decodeURIComponent(void 0 === n ? "" : n)
			} catch (o) {
				r[t] = n
			}
		})), r
	},
	client = function(e, t, r) {
		var n, i, o = window.screen.width,
			a = window.screen.height,
			s = window.navigator.appVersion,
			c = window.navigator.userAgent,
			u = window.navigator.language,
			l = document.referrer,
			d = l ? parseURL(l).hostname : "",
			p = parseUrlQuery(window.location.href),
			f = "",
			h = "",
			g = "",
			_ = "" + parseFloat(s); - 1 !== (n = c.indexOf("Opera")) && (g = "Opera", _ = c.substring(n + 6), -1 !== (
				n = c.indexOf("Version")) && (_ = c.substring(n + 8))), -1 !== c.indexOf("Edge") || -1 !== c.indexOf(
				"Edg") ? (g = "Microsoft Edge", -1 !== c.indexOf("Edge") ? (n = c.indexOf("Edge"), _ = c.substring(n +
				5)) : (n = c.indexOf("Edg"), _ = c.substring(n + 4))) : -1 !== (n = c.indexOf("MSIE")) ? (g =
				"Microsoft Internet Explorer", _ = c.substring(n + 5)) : -1 !== (n = c.indexOf("Lark")) ? (g = "Lark",
				_ = c.substring(n + 5, n + 11)) : -1 !== c.indexOf("Chrome") ? -1 !== (n = c.indexOf(
			"MicroMessenger")) ? (g = "weixin", _ = c.substring(n + 15, n + 20)) : -1 !== (n = c.indexOf(
			"MQQBrowser")) ? (g = "qqbrowser", _ = c.substring(n + 11, n + 15)) : -1 !== (n = c.indexOf("360")) ? (g =
				"360browser", _ = c.substring(c.indexOf("Chrome") + 7)) : -1 !== c.indexOf("baidubrowser") || -1 !== c
			.indexOf("BIDUBrowser") ? (-1 !== c.indexOf("baidubrowser") ? (n = c.indexOf("baidubrowser"), _ = c
				.substring(n + 13, n + 16)) : -1 !== c.indexOf("BIDUBrowser") && (n = c.indexOf("BIDUBrowser"), _ =
				c.substring(n + 12, n + 15)), g = "baidubrowser") : -1 !== (n = c.indexOf("xiaomi")) ? -1 !== c.indexOf(
				"openlanguagexiaomi") ? (g = "openlanguage xiaomi", _ = c.substring(n + 7, n + 13)) : (g = "xiaomi", _ =
				c.substring(n - 7, n - 1)) : -1 !== (n = c.indexOf("TTWebView")) ? (g = "TTWebView", _ = c.substring(n +
				10, n + 23)) : -1 !== (n = c.indexOf("Chrome")) && (g = "Chrome", _ = c.substring(n + 7)) : -1 !== c
			.indexOf("Safari") ? -1 !== (n = c.indexOf("QQ")) ? (g = "qqbrowser", _ = c.substring(n + 10, n + 16)) : -
			1 !== (n = c.indexOf("Safari")) && (g = "Safari", _ = c.substring(n + 7), -1 !== (n = c.indexOf(
				"Version")) && (_ = c.substring(n + 8))) : -1 !== (n = c.indexOf("Firefox")) ? (g = "Firefox", _ = c
				.substring(n + 8)) : -1 !== (n = c.indexOf("MicroMessenger")) ? (g = "weixin", _ = c.substring(n + 15,
				n + 20)) : -1 !== (n = c.indexOf("QQ")) && (g = "qqbrowser", _ = c.substring(n + 3, n + 8)), -1 !== (i =
				_.indexOf(";")) && (_ = _.substring(0, i)), -1 !== (i = _.indexOf(" ")) && (_ = _.substring(0, i)), -
			1 !== (i = _.indexOf(")")) && (_ = _.substring(0, i));
		for (var m, y, v = /Mobile|htc|mini|Android|iP(ad|od|hone)/.test(s) ? "wap" : "web", b = [{
				s: "Windows 10",
				r: /(Windows 10.0|Windows NT 10.0|Windows NT 10.1)/
			}, {
				s: "Windows 8.1",
				r: /(Windows 8.1|Windows NT 6.3)/
			}, {
				s: "Windows 8",
				r: /(Windows 8|Windows NT 6.2)/
			}, {
				s: "Windows 7",
				r: /(Windows 7|Windows NT 6.1)/
			}, {
				s: "Android",
				r: /Android/
			}, {
				s: "Sun OS",
				r: /SunOS/
			}, {
				s: "Linux",
				r: /(Linux|X11)/
			}, {
				s: "iOS",
				r: /(iPhone|iPad|iPod)/
			}, {
				s: "Mac OS X",
				r: /Mac OS X/
			}, {
				s: "Mac OS",
				r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
			}], w = 0; w < b.length; w++) {
			var S = b[w];
			if (S.r.test(c)) {
				f = S.s;
				break
			}
		}

		function E(e, t) {
			var r = e.exec(t);
			return r && r[1] ? r[1] : ""
		}
		switch (/Windows/.test(f) && (h = E(/Windows (.*)/, f), f = "windows"), f) {
			case "Mac OS X":
				m = c, h = (y = RegExp("(?:^|[^A-Z0-9-_]|[^A-Z0-9-]_|sprd-)(?:" +
						"Mac[ +]OS[ +]X(?:[ /](?:Version )?(\\d+(?:[_\\.]\\d+)+))?" + ")", "i").exec(m)) ? y.slice(1)[
					0] : "", f = "mac";
				break;
			case "Android":
				h = function(e) {
					var t = E(/Android ([\.\_\d]+)/, e);
					return t || (t = E(/Android\/([\.\_\d]+)/, e)), t
				}(c), f = "android";
				break;
			case "iOS":
				h = (h = /OS (\d+)_(\d+)_?(\d+)?/.exec(s)) ? h[1] + "." + h[2] + "." + (0 | h[3]) : "", f = "ios"
		}
		var k = UTM(e, p, t, r);
		return {
			browser: g,
			browser_version: _,
			platform: v,
			os_name: f,
			os_version: h,
			userAgent: c,
			screen_width: o,
			screen_height: a,
			device_model: function(e) {
				var t = "";
				try {
					if ("android" === e) navigator.userAgent.split(";").forEach((function(e) {
						e.indexOf("Build/") > -1 && (t = e.slice(0, e.indexOf("Build/")))
					}));
					else if ("ios" === e || "mac" === e || "windows" === e) {
						var r = navigator.userAgent.replace("Mozilla/5.0 (", ""),
							n = r.indexOf(";");
						t = r.slice(0, n)
					}
				} catch (i) {}
				return t.trim()
			}(f),
			language: u,
			referrer: l,
			referrer_host: d,
			creative_id: k.creative_id,
			ad_id: k.ad_id,
			campaign_id: k.campaign_id,
			utm_source: k.utm_source,
			utm_medium: k.utm_medium,
			utm_campaign: k.utm_campaign,
			utm_term: k.utm_term,
			utm_content: k.utm_content,
			tracer_data: k.tracer_data
		}
	},
	Token = function() {
		function e(e, t, r, n) {
			this.enableCustomWebid = !1, this.config = e, this.cfg = t, this.storage = new Storage(!1), this.appInfo = e
				.app_key || e.app_id, this.isNoWebid = e.disable_webid, this.enable_ttwebid = e.enable_ttwebid || !1,
				this.domain = e.channel_domain || decodeUrl(LOG_URL[e.channel]), this.tokenReady = !1, this
				.enableCustomWebid = e.enable_custom_webid, this.checkExp = e.checkExp || !1, this.enableCookie = e
				.cross_subdomain || !1, this.expiresTime = e.cookie_expire || COOKIE_EXPIRE, this.fetchUrl = "" + this
				.domain + WEBID_URL, this.hook = r, this.session = n, this.cookieDomain = e.cookie_domain || ""
		}
		return e.prototype._getToken = function() {
			var e = this;
			try {
				if (this.tokensKey = CACHEKEY(this.appInfo, !0), this.cookieKey = COOKIEKEY(this.appInfo), this
					.enableCustomWebid) return void this.hook.on("custom-webid", (function() {
					e.tokenReady = !0, e.hook.emit("token-ready")
				}));
				if (this._checkEnv()) return;
				var t = this.storage.getItem(this.tokensKey);
				if (this.enable_ttwebid)
					if (t) {
						var r = {
							user_unique_id: t.user_unique_id || "",
							timestamp: Date.now()
						};
						this.storage.setItem(this.tokensKey, r), this._setTtWid(t, !1)
					} else this._setTtWid(t, !0);
				else if (this.enableCookie) {
					var n = this.storage.getCookie(this.cookieKey, this.cookieDomain);
					if (n) {
						var i = (n = JSON.parse(decodeURIComponent(n))).user_unique_id,
							o = n.web_id,
							a = n.timestamp;
						this._setToken(o, i, a)
					} else {
						if (!t) return void this._requestWebId();
						this.storage.setCookie(this.cookieKey, encodeURIComponent(JSON.stringify(t)), this
							.expiresTime, this.cookieDomain), this._checkLocal(t)
					}
				} else {
					if (!t) return void this._requestWebId();
					this._checkLocal(t)
				}
			} catch (s) {
				console.log("" + s.message)
			}
		}, e.prototype._checkEnv = function() {
			if (-1 !== window.navigator.userAgent.indexOf("miniProgram")) {
				var e = parseUrlQuery(window.location.href);
				return !(!e || !e.Web_ID) && (this._setTokenId("" + e.Web_ID), !0)
			}
			return !1
		}, e.prototype._checkLocal = function(e) {
			var t = e.user_unique_id,
				r = e.web_id,
				n = e.timestamp;
			r && t ? this._setToken(r, t, n) : this._requestWebId()
		}, e.prototype._setToken = function(e, t, r) {
			if (this.checkExp) {
				var n = Date.now() - parseFloat(r);
				if (n > 7344e6) return void this._requestWebId();
				if (n > 432e7) return void this._updateWebId(e)
			}
			this.cfg.envInfo.user.user_unique_id = t, this.cfg.envInfo.user.web_id = e, this.storage.setItem(this
				.tokensKey, {
					user_unique_id: t,
					web_id: e,
					timestamp: Date.now()
				}), this.tokenReady = !0
		}, e.prototype._requestWebId = function() {
			this.isNoWebid ? this._setTokenId(webid()) : this._fetchWebId(this.fetchUrl, !1)
		}, e.prototype._updateWebId = function(e) {
			var t = "" + this.domain + WEBID_URL + "/" + e + "/update";
			this._fetchWebId(t, !0)
		}, e.prototype._fetchWebId = function(e, t) {
			var r = this;
			request(e, 3e3, {
				app_key: this.config.app_key,
				app_id: this.config.app_id,
				url: location.href,
				user_agent: window.navigator.userAgent,
				referer: document.referrer,
				user_unique_id: ""
			}, this.config.app_key, (function(e) {
				e && 0 === e.e ? r._setTokenId(e.web_id) : (r.hook.emit("token-error"), console.warn(
					"[]appid: " + r.config.app_id + ", " + (t ? " update" : "get") +
					" webid error, init error~"))
			}), (function() {
				r.hook.emit("token-error"), console.warn("[]appid: " + r.config.app_id +
					", get webid error, init error~")
			}), !0, !1, this.enable_ttwebid)
		}, e.prototype._setTtWid = function(e, t) {
			if (!t) {
				var r = {
						web_id: e.web_id || "",
						timestamp: Date.now()
					},
					n = e.user_unique_id || "";
				this.cfg.envInfo.user.user_unique_id = this.cfg.envInfo.user.user_unique_id || n, this.storage
					.setCookie(this.cookieKey, encodeURIComponent(JSON.stringify(r)), 108e5, this.cookieDomain)
			}
			this.tokenReady = !0, this.hook.emit("token-ready")
		}, e.prototype._setTokenId = function(e) {
			var t = this.cfg.envInfo.user.web_id || e,
				r = {
					web_id: t,
					user_unique_id: this.cfg.envInfo.user.user_unique_id || t,
					timestamp: Date.now()
				};
			this.enableCookie && this.storage.setCookie(this.cookieKey, encodeURIComponent(JSON.stringify(r)), this
					.expiresTime, this.cookieDomain), this.storage.setItem(this.tokensKey, r), this.cfg.envInfo.user
				.web_id = this.cfg.envInfo.user.web_id || t, this.cfg.envInfo.user.user_unique_id = this.cfg.envInfo
				.user.user_unique_id || t, this.tokenReady = !0, this.hook.emit("token-ready")
		}, e.prototype._setUuid = function(e) {
			try {
				var t = this.storage.getItem(this.tokensKey);
				if (e) {
					"string" != typeof e && console.warn("user_unique_id must be string!!! please check");
					var r = String(e);
					if (r === this.cfg.envInfo.user.user_unique_id) return;
					this.cfg.envInfo.user.user_unique_id = r, t && t.user_unique_id ? t.user_unique_id !== r && (t
							.user_unique_id = r) : (t = {}).user_unique_id = r, t.timestamp = Date.now(), this
						.storage.setItem(this.tokensKey, t), this.session._resetSessionId(), this.hook.emit(
							"token-change", "uuid")
				} else this._clearUuid(t)
			} catch (n) {}
		}, e.prototype._clearUuid = function(e) {
			this.enable_ttwebid || e && e.web_id && (this.cfg.envInfo.user.user_unique_id = e.web_id || void 0, e
				.user_unique_id = e.web_id || void 0, e.timestamp = Date.now(), this.storage.setItem(this
					.tokensKey, e))
		}, e.prototype._setWebid = function(e) {
			if (!this.enable_ttwebid) {
				var t = this.storage.getItem(this.tokensKey);
				t && t.web_id ? t.web_id !== e && (t.user_unique_id = t.web_id === t.user_unique_id ? e : t
						.user_unique_id, t.web_id = e) : ((t = {}).web_id = e, t.user_unique_id = e), t.timestamp =
					Date.now(), this.storage.setItem(this.tokensKey, t), this.cfg.envInfo.user.user_unique_id &&
					this.cfg.envInfo.user.user_unique_id !== this.cfg.envInfo.user.web_id || (this.cfg.envInfo.user
						.user_unique_id = e, this.hook.emit("token-change", "uuid")), e !== this.cfg.envInfo.user
					.web_id && (this.cfg.envInfo.user.web_id = e, this.hook.emit("token-change", "webid"))
			}
		}, e.prototype.isTokenReady = function() {
			return this.tokenReady
		}, e.prototype._getTobId = function(e) {
			var t = "" + this.domain + TOB_URL;
			request(t, 3e4, {
				app_id: this.config.app_id,
				user_unique_id: this.cfg.envInfo.user.user_unique_id,
				web_id: this.cfg.envInfo.user.web_id
			}, this.config.app_key, (function(t) {
				t && 0 === t.e ? e(t.tobid) : e(null)
			}), (function() {
				e(null)
			}), !0, !1, this.enable_ttwebid)
		}, e
	}(),
	beforePageUnload = function(e) {
		!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? window.addEventListener("pagehide", e, !1) :
			window.addEventListener("beforeunload", e, !1)
	},
	splitArrayByFilter = function(e, t, r) {
		void 0 === e && (e = []), void 0 === t && (t = function(e) {
			return e
		}), void 0 === r && (r = 20);
		var n, i = [],
			o = 0;
		return e.forEach((function(e) {
			var a = t(e);
			void 0 === n ? n = a : (a !== n || i[o].length >= r) && (o += 1, n = a), i[o] = i[o] || [], i[o]
				.push(e)
		})), i
	},
	EventManager = function() {
		function e(e, t, r, n, i, o, a) {
			this.collect = e, this.cfg = r, this.config = t, this._token = n, this.appInfo = t.app_id || t.app_key, this
				.debugMode = !!t.log, this.evtDataKey = CACHEKEY(this.appInfo, !1);
			var s = t.channel_domain || decodeUrl(LOG_URL[t.channel]);
			if (this.reportUrl = t.report_url ? t.report_url : "" + s + REPORT_URL, this.storage = new Storage(!0), this
				.EventStorage = new Storage(!1), this.maxStorage = t.max_storage_num || -1, this.maxReport = t
				.max_report || 10, this.reportTime = t.reportTime || 30, this.timeout = t.timeout || 1e5, this
				.closeStorage = !0, this.plugin = i, this.session = o, this.match = a, this.filter = t.filter, this
				.plugin) {
				var c = t.enable_storage,
					u = t.disable_storage;
				(c || !1 === u) && (this.closeStorage = !1)
			}
			this.addListener()
		}
		return e.prototype.addListener = function() {
			var e = this;
			window.addEventListener("unload", (function() {
				e.report(!0)
			}), !1), beforePageUnload((function() {
				e.report(!0)
			})), document.addEventListener("visibilitychange", (function() {
				"hidden" === document.visibilityState && e.report(!0)
			}), !1)
		}, e.prototype.setReady = function() {
			this.isReady = !0, this.closeStorage || this.checkStorageEvent(), this.report()
		}, e.prototype.event = function(e) {
			var t = this;
			void 0 === e && (e = []);
			try {
				var r = __spread(e, this.storage.getItem(this.evtDataKey) || []);
				this.storage.setItem(this.evtDataKey, r), this.reportTimer && clearTimeout(this.reportTimer), r
					.length >= this.maxReport ? this.report(!1) : this.reportTimer = setTimeout((function() {
						t.report(!1), t.reportTimer = null
					}), this.reportTime)
			} catch (n) {}
		}, e.prototype.beconEvent = function(e) {
			void 0 === e && (e = []);
			var t = this._mergeEvents(e);
			this._dealData(t, !0)
		}, e.prototype.report = function(e) {
			if (void 0 === e && (e = !1), !this.collect.destroyInstance && this._token.isTokenReady() && this
				.isReady) {
				var t = this.storage.getItem(this.evtDataKey) || [],
					r = this._mergeEvents(t);
				this.storage.removeItem(this.evtDataKey), this._dealData(r, e)
			}
		}, e.prototype.clearEventCache = function() {
			this.report(!1)
		}, e.prototype._mergeEvents = function(e) {
			var t = this;
			if (!e.length) return e;
			var r = this.cfg.get();
			r.header.custom = JSON.stringify(r.header.custom);
			return splitArrayByFilter(e, (function(e) {
				return !t.closeStorage && !!e.params.__disable_storage__
			}), this.maxReport).map((function(e) {
				return __assign({
					events: e.map((function(e) {
						try {
							if (e.event && "applog_trace" !== e.event) {
								var r = __assign({}, t.cfg.get("evtParams"), e
									.params);
								delete r.__disable_storage__;
								var n = [];
								if (t.plugin && t.plugin.ab && t.plugin.ab
									.versions && t.plugin.ab.extVersions) {
									n = [];
									return n = t.config.enable_multilink || -1 !==
										window.location.href.indexOf(
											"multilink=true") ? t.plugin.ab
										.mulilinkVersions.concat(t.plugin.ab
											.extVersions) : t.plugin.ab.versions
										.concat(t.plugin.ab.extVersions),
										__assign({}, e, {
												params: JSON.stringify(r),
												ab_sdk_version: n.join(","),
												session_id: t.session
												._getSessionId()
											})
								}
								return __assign({}, e, {
									params: JSON.stringify(r),
									session_id: t.session._getSessionId()
								})
							}
							return __assign({}, e, {
								params: JSON.stringify(e.params)
							})
						} catch (i) {
							return __assign({}, e, {
								params: JSON.stringify(e.params)
							})
						}
					})),
					user: r.user,
					header: r.header
				}, t.closeStorage ? {} : {
					__disable_storage__: e[0].params.__disable_storage__
				}, {
					verbose: t.debugMode ? 1 : void 0,
					local_time: parseInt("" + (new Date).getTime() / 1e3)
				})
			}))
		}, e.prototype._dealData = function(e, t) {
			var r = this;
			if (!e.length) return e;
			var n = [];
			n = splitArrayByFilter(e, (function(e) {
				return !!e.__disable_storage__
			}), this.maxReport), !this.closeStorage && this.plugin.maxStorage && this.plugin.maxStorage(n, this
				.maxStorage, this.evtDataKey, this.storage);
			var i = {};
			n.forEach((function(e) {
				var n = webid(),
					o = e;
				try {
					r.filter && (o = r.filter(e))
				} catch (s) {}
				if (!r.closeStorage && !e[0].__disable_storage__) {
					var a = JSON.parse(JSON.stringify(e));
					a && a[0] && (a[0].header.__storage_index__ = Date.now()), i[n] = a, r.EventStorage
						.setItem(r.evtDataKey, i)
				}
				r._send(n, o, t), r.match && setTimeout((function() {
					r.match.matchEvent(o)
				}), 0)
			}))
		}, e.prototype._send = function(e, t, r) {
			var n = this;
			this.isSending = !0;
			var i = function() {
				n.isSending = !1
			};
			if (!this.closeStorage) try {
				t && t[0] && t[0].header.__storage_index__ && delete(t = JSON.parse(JSON.stringify(t)))[0]
					.header.__storage_index__
			} catch (o) {}
			this.plugin && this.plugin.et_test && this.plugin.et_test.send(t), request(this.reportUrl, this.timeout,
					t, this.config.app_key, (function(t, r) {
						if (i(), n.plugin && !n.closeStorage) {
							var o = n.EventStorage.getItem(n.evtDataKey) || {};
							Object.keys(o).length ? (delete o[e], n.EventStorage.setItem(n.evtDataKey, o)) : n
								.EventStorage.removeItem(n.evtDataKey)
						}
						t && 0 !== t.e && n.collect && n.collect.tracer && 1 !== n.cfg.staging && n.collect
							.tracer.addErrorCount(r, "f_data", t.e, t)
					}), (function(e, t) {
						i(), n.cfg.get("reportErrorCallback")(e, t), n.collect && n.collect.tracer && 1 !== n
							.cfg.staging && n.collect.tracer.addErrorCount(e, "f_net", t), n.plugin && n.plugin
							.monitor && n.plugin.monitor.sdkError(n.config.app_key, n.reportUrl, e, t)
					}), !1, r, this.config.enable_ttwebid, i), this.plugin && this.plugin.monitor && this.plugin
				.monitor.sdkOnload(this.config.app_key, this.reportUrl, t)
		}, e.prototype.checkStorageEvent = function() {
			var e = this;
			try {
				var t = this.EventStorage.getItem(this.evtDataKey) || {},
					r = Object.keys(t);
				if (r.length > 0) {
					setTimeout((function n() {
						for (var i = [], o = 0; o < e.maxReport; o++) r.length > 0 && i.push(r.shift());
						i.length > 0 && i.forEach((function(r) {
							e._send(r, t[r], !1)
						})), setTimeout(n, 5)
					}), 5)
				}
			} catch (n) {}
		}, e
	}(),
	undef = void 0,
	date = new Date,
	timeZoneMin = date.getTimezoneOffset(),
	timezone = parseInt("" + -timeZoneMin / 60, 10),
	tz_offset = 60 * timeZoneMin,
	ConfigManager = function() {
		function e(e, t, r) {
			this.initConfig = t;
			var n = client(e, t.cookie_domain || "", t.cookie_expire || COOKIE_EXPIRE);
			this.configKey = CONFIGKEY("" + e), this.sessionStorage = new Storage(!1, "session"), this.localStorage =
				new Storage(!1, "local"), r && (this.storage = 1 === r ? this.sessionStorage : this.localStorage), this
				.envInfo = {
					user: {
						user_unique_id: undef,
						user_type: undef,
						user_id: undef,
						user_is_auth: undef,
						user_is_login: undef,
						device_id: undef,
						web_id: undef,
						ip_addr_id: undef,
						ssid: undef
					},
					header: {
						app_id: undef,
						app_name: undef,
						app_install_id: undef,
						install_id: undef,
						app_package: undef,
						app_channel: undef,
						app_version: undef,
						os_name: n.os_name,
						os_version: n.os_version,
						device_model: n.device_model,
						ab_client: undef,
						ab_version: undef,
						ab_sdk_version: undef,
						traffic_type: undef,
						client_ip: undef,
						device_brand: undef,
						os_api: undef,
						access: undef,
						language: n.language,
						region: undef,
						app_language: undef,
						app_region: undef,
						creative_id: n.creative_id,
						ad_id: n.ad_id,
						campaign_id: n.campaign_id,
						log_type: undef,
						rnd: undef,
						platform: n.platform,
						sdk_version: SDK_VERSION,
						sdk_lib: "js",
						province: undef,
						city: undef,
						timezone: timezone,
						tz_offset: tz_offset,
						tz_name: undef,
						sim_region: undef,
						carrier: undef,
						resolution: n.screen_width + "x" + n.screen_height,
						browser: n.browser,
						browser_version: n.browser_version,
						referrer: n.referrer,
						referrer_host: n.referrer_host,
						width: n.screen_width,
						height: n.screen_height,
						screen_width: n.screen_width,
						screen_height: n.screen_height,
						utm_term: n.utm_term,
						utm_content: n.utm_content,
						utm_source: n.utm_source,
						utm_medium: n.utm_medium,
						utm_campaign: n.utm_campaign,
						tracer_data: JSON.stringify(n.tracer_data),
						custom: {},
						wechat_openid: undef,
						wechat_unionid: undef
					}
				}, this.evtParams = {}, this.reportErrorCallback = function() {}
		}
		return e.prototype.set = function(e, t) {
			var r = this;
			if (null == t && (this.delete(e), t = void 0), "evtParams" === e || "_staging_flag" === e) {
				var n;
				n = "evtParams" === e ? t : {
					_staging_flag: Number(t)
				};
				var i = __assign({}, n);
				Object.keys(i).forEach((function(e) {
					r.evtParams[e] = i[e]
				}))
			} else if ("reportErrorCallback" === e && "function" == typeof t) this.reportErrorCallback = t;
			else {
				var o = "";
				if (e.indexOf(".") > -1) {
					var a = e.split(".");
					o = a[0], e = a[1]
				}
				if ("user_unique_id" === e) {
					if (!t) return;
					if (-1 !== ["0", "Null", "None", "", "undefined"].indexOf(t)) return
				}
				"os_version" === e && (e = "" + t), o ? "user" === o || "header" === o ? this.envInfo[o][e] = t :
					this.envInfo.header.custom[e] = t : this.envInfo.user.hasOwnProperty(e) ? ["user_type",
						"ip_addr_id"
					].indexOf(e) > -1 ? this.envInfo.user[e] = t ? Number(t) : t : ["user_id", "web_id",
						"user_unique_id", "ssid"
					].indexOf(e) > -1 ? this.envInfo.user[e] = t ? String(t) : t : ["user_is_auth", "user_is_login"]
					.indexOf(e) > -1 ? this.envInfo.user[e] = Boolean(t) : "device_id" === e && (this.envInfo.user[
						e] = t) : this.envInfo.header.hasOwnProperty(e) ? this.envInfo.header[e] = t : this.envInfo
					.header.custom[e] = t
			}
		}, e.prototype.get = function(e) {
			try {
				return e ? "evtParams" === e ? this.evtParams : "reportErrorCallback" === e ? this[e] : JSON.parse(
					JSON.stringify(this.envInfo[e])) : JSON.parse(JSON.stringify(this.envInfo))
			} catch (t) {
				console.log("get config stringify error ")
			}
		}, e.prototype.setStore = function(e) {
			try {
				var t = this.storage.getItem(this.configKey);
				if (Object.keys(e).length) {
					var r = Object.assign(e, t);
					this.storage.setItem(this.configKey, r)
				}
			} catch (n) {}
		}, e.prototype.getStore = function() {
			try {
				var e = this.storage.getItem(this.configKey);
				return Object.keys(e).length ? e : null
			} catch (t) {
				return null
			}
		}, e.prototype.delete = function(e) {
			try {
				var t = this.storage.getItem(this.configKey);
				t && t.hasOwnProperty(e) && (delete t[e], this.storage.setItem(this.configKey, t))
			} catch (r) {}
		}, e
	}(),
	Logger = function() {
		function e(e, t) {
			this.isLog = t || !1, this.name = e || ""
		}
		var t = e.prototype;
		return t.info = function(e) {
			this.isLog && console.log("[" + this.name + "] " + e)
		}, t.warn = function(e) {
			this.isLog && console.warn("[" + this.name + "] " + e)
		}, t.error = function(e) {
			this.isLog && console.error("[" + this.name + "] " + e)
		}, t.throw = function(e) {
			throw this.error(this.name), new Error(e)
		}, e
	}(),
	Hook = function() {
		function e() {
			this._hooks = {}
		}
		return e.prototype.on = function(e, t) {
			e && t && "function" == typeof t && (this._hooks[e] || (this._hooks[e] = []), this._hooks[e].push(t))
		}, e.prototype.once = function(e, t) {
			var r = this;
			if (e && t && "function" == typeof t) {
				this.on(e, (function n(i) {
					t(i), r.off(e, n)
				}))
			}
		}, e.prototype.off = function(e, t) {
			if (e && this._hooks[e] && this._hooks[e].length)
				if (t) {
					var r = this._hooks[e].indexOf(t); - 1 !== r && this._hooks[e].splice(r, 1)
				} else this._hooks[e] = []
		}, e.prototype.emit = function(e, t) {
			e && this._hooks[e] && this._hooks[e].length && __spread(this._hooks[e]).forEach((function(e) {
				try {
					e(t)
				} catch (r) {}
			}))
		}, e
	}(),
	sessionId = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
			var t = 16 * Math.random() | 0;
			return ("x" === e ? t : 3 & t | 8).toString(16)
		}))
	},
	Session = function() {
		function e(e, t) {
			this.storage = new Storage(!1, "session"), this.sessionKey = SESSIONKEY(e), this.expireTime = t
				.expireTime || 18e5, this.disableSession = t.disable_session, this.disableSession || this
				._setSessionId()
		}
		return e.prototype._updateSessionId = function() {
			var e = this.storage.getItem(this.sessionKey);
			if (e && e.sessionId) {
				var t = e.timestamp;
				Date.now() - t > this.expireTime ? e = {
					sessionId: sessionId(),
					timestamp: Date.now()
				} : e.timestamp = Date.now(), this.storage.setItem(this.sessionKey, e), this._resetExpTime()
			}
		}, e.prototype._setSessionId = function() {
			var e = this,
				t = this.storage.getItem(this.sessionKey);
			t && t.sessionId ? t.timestamp = Date.now() : t = {
				sessionId: sessionId(),
				timestamp: Date.now()
			}, this.storage.setItem(this.sessionKey, t), this.sessionExp = setInterval((function() {
				e._checkEXp()
			}), this.expireTime)
		}, e.prototype._getSessionId = function() {
			var e = this.storage.getItem(this.sessionKey);
			return this.disableSession ? "" : e && e.sessionId ? e.sessionId : ""
		}, e.prototype._resetExpTime = function() {
			var e = this;
			this.sessionExp && (clearInterval(this.sessionExp), this.sessionExp = setInterval((function() {
				e._checkEXp()
			}), this.expireTime))
		}, e.prototype._resetSessionId = function() {
			var e = {
				sessionId: sessionId(),
				timestamp: Date.now()
			};
			this.storage.setItem(this.sessionKey, e)
		}, e.prototype._checkEXp = function() {
			var e = this.storage.getItem(this.sessionKey);
			e && e.sessionId && (Date.now() - e.timestamp + 30 >= this.expireTime && (e = {
				sessionId: sessionId(),
				timestamp: Date.now()
			}, this.storage.setItem(this.sessionKey, e)))
		}, e
	}(),
	EventList = {
		pv: ["predefine_pageview"],
		sdk: ["_be_active", "predefine_page_alive", "predefine_page_close", "__profile_set", "__profile_set_once",
			"__profile_increment", "__profile_unset", "__profile_append"
		],
		autotrack: ["bav2b_click", "bav2b_page", "bav2b_beat", "bav2b_page_statistics", "__bav_click", "__bav_page",
			"__bav_beat", "__bav_page_statistics"
		]
	},
	Tracer = function() {
		function e(e, t, r, n) {
			this.count = {
				pv: 0,
				sdk: 0,
				autotrack: 0,
				log: 0
			}, this.limit = {
				pv: 1,
				sdk: 10,
				autotrack: 10,
				log: 3
			}, this.errorCode = {
				f_net: 0,
				f_data: 0
			}, this.errorInfo = {
				pv: {
					f_net: 0,
					f_data: 0
				},
				sdk: {
					f_net: 0,
					f_data: 0
				},
				autotrack: {
					f_net: 0,
					f_data: 0
				},
				log: {
					f_net: 0,
					f_data: 0
				}
			}, this.collect = e, this.disable_tracer = t.disable_tracer || t.channel_domain, this.ready = !(!t
				.app_id || this.disable_tracer), this.appid = t.app_id, this.process = r, this.event = n;
			var i = t.channel_domain || decodeUrl(LOG_URL[t.channel]);
			this.reportUrl = t.report_url ? t.report_url : "" + i + REPORT_URL, this.listener()
		}
		return e.prototype.addCount = function(e) {
			try {
				if (!this.ready) return;
				if (this.count[e]++, this.count[e] >= this.limit[e]) {
					var t = [];
					for (var r in t = __spread(t, this.processTracer(this.count[e], e, "net")), this.errorInfo[e])
						this.errorInfo[r] && (t = __spread(t, this.processTracer(this.errorInfo[e][r], e, r)));
					t.length && this.sendTracer(t, !0, e, !1)
				}
			} catch (n) {}
		}, e.prototype.addErrorCount = function(e, t, r, n) {
			var i = this;
			try {
				if (!this.ready) return;
				if (e && e.length) {
					var o = e[0].events;
					o && o.length && ("f_data" === t ? (n && n.hasOwnProperty("sc") ? this.errorInfo.log.f_data = o
							.length - n.sc : this.errorInfo.log.f_data = o.length, this.errorCode.f_data = r) :
						o.forEach((function(e) {
							var t = "log";
							for (var n in EventList)
								if (-1 !== EventList[n].indexOf(e.event)) {
									t = n;
									break
								} i.errorInfo[t].f_net++, i.errorCode.f_net = r
						})))
				}
			} catch (a) {}
		}, e.prototype.clearCount = function(e) {
			try {
				e ? (this.count[e] = 0, this.errorInfo[e] = {
					f_net: 0,
					f_data: 0
				}) : (this.count = {
					pv: 0,
					sdk: 0,
					autotrack: 0,
					log: 0
				}, this.errorInfo = {
					pv: {
						f_net: 0,
						f_data: 0
					},
					sdk: {
						f_net: 0,
						f_data: 0
					},
					autotrack: {
						f_net: 0,
						f_data: 0
					},
					log: {
						f_net: 0,
						f_data: 0
					}
				})
			} catch (t) {}
		}, e.prototype.sendTracer = function(e, t, r, n) {
			try {
				if (!this.ready) return;
				if (this.collect.staging) return;
				var i = this.event._mergeEvents(e);
				n && window.navigator.sendBeacon ? window.navigator.sendBeacon(this.reportUrl, JSON.stringify(i)) :
					request(this.reportUrl, 3e5, i, ""), t ? this.clearCount(r) : this.clearCount()
			} catch (o) {}
		}, e.prototype.processTracer = function(e, t, r) {
			try {
				var n = {
					count: e,
					state: r,
					key: t,
					params_for_special: "applog_trace",
					aid: this.appid,
					platform: "web",
					_staging_flag: 1,
					sdk_version: SDK_VERSION
				};
				"f_net" !== r && "f_data" !== r || (n.errorCode = this.errorCode[r]);
				var i = [];
				if (i.push(this.process("applog_trace", n, !0)), i && i.length) return delete i[0].is_bav, i
			} catch (o) {}
		}, e.prototype.listener = function() {
			var e = this;
			this.ready && (document.addEventListener("visibilitychange", (function() {
				e.leavePage()
			})), beforePageUnload((function() {
				e.leavePage()
			})))
		}, e.prototype.leavePage = function() {
			if (this.ready) try {
				var e = [];
				for (var t in this.count)
					if (this.count[t]) {
						var r = this.errorInfo[t];
						for (var n in e = __spread(e, this.processTracer(this.count[t], t, "net")), r) r[n] && (
							e = __spread(e, this.processTracer(r[n], t, n)))
					} e && e.length && this.sendTracer(e, !1, "", !0)
			} catch (i) {}
		}, e
	}(),
	AppBridge = function() {
		function e(e) {
			this.logger = e
		}
		var t = e.prototype;
		return t.bridgeInject = function() {
			try {
				return AppLogBridge ? (this.logger.info("AppLogBridge is injected"), !0) : (this.logger.info(
					"AppLogBridge is not inject"), !1)
			} catch (e) {
				return this.logger.info("AppLogBridge is not inject"), !1
			}
		}, t.hasStarted = function(e) {
			var t = this;
			try {
				this.bridgeInject() ? AppLogBridge.hasStarted((function(r) {
					t.logger.info("AppLogBridge is started? : " + r), e(r)
				})) : e(0)
			} catch (r) {
				this.logger.info("AppLogBridge, error:" + JSON.stringify(r.stack)), e(0)
			}
		}, t.setUserUniqueId = function(e) {
			try {
				AppLogBridge.setUserUniqueId(e)
			} catch (t) {
				this.logger.error("setUserUniqueId error")
			}
		}, t.addHeaderInfo = function(e, t) {
			try {
				AppLogBridge.addHeaderInfo(e, t)
			} catch (r) {
				this.logger.error("addHeaderInfo error")
			}
		}, t.setHeaderInfo = function(e) {
			try {
				AppLogBridge.setHeaderInfo(JSON.stringify(e))
			} catch (t) {
				this.logger.error("setHeaderInfo error")
			}
		}, t.removeHeaderInfo = function(e) {
			try {
				AppLogBridge.removeHeaderInfo(e)
			} catch (t) {
				this.logger.error("removeHeaderInfo error")
			}
		}, t.onEventV3 = function(e, t) {
			try {
				AppLogBridge.onEventV3(e, t)
			} catch (r) {
				this.logger.error("onEventV3 error")
			}
		}, t.profileSet = function(e) {
			try {
				AppLogBridge.profileSet(e)
			} catch (t) {
				this.logger.error("profileSet error")
			}
		}, t.profileSetOnce = function(e) {
			try {
				AppLogBridge.profileSetOnce(e)
			} catch (t) {
				this.logger.error("profileSetOnce error")
			}
		}, t.profileIncrement = function(e) {
			try {
				AppLogBridge.profileIncrement(e)
			} catch (t) {
				this.logger.error("profileIncrement error")
			}
		}, t.profileUnset = function(e) {
			try {
				AppLogBridge.profileUnset(e)
			} catch (t) {
				this.logger.error("profileUnset error")
			}
		}, t.profileAppend = function(e) {
			try {
				AppLogBridge.profileAppend(e)
			} catch (t) {
				this.logger.error("profileAppend error")
			}
		}, e
	}();

function stringify$2(e, t, r) {
	void 0 === t && (t = ""), void 0 === r && (r = {});
	var n = e;
	"/" === (n = n.split("#")[0].split("?")[0])[e.length - 1] && (n = n.substr(0, e.length - 1)), n = "/" === t[0] ? n
		.replace(/(https?:\/\/[\w-]+(\.[\w-]+){1,}(:[0-9]{1,5})?)(\/[.\w-]+)*\/?$/, "$1" + t) : n.replace(
			/(https?:\/\/[\w-]+(\.[\w-]+){1,}(:[0-9]{1,5})?(\/[.\w-]+)*?)(\/[.\w-]+)?\/?$/, "$1/" + t);
	var i = Object.keys(r).map((function(e) {
		return e + "=" + r[e]
	})).join("&");
	return i.length > 0 ? n + "?" + i : n
}
var Ruote = function() {
		function e(e) {
			this.autotrack = !1, this.spa = !1, (e.spa || e.autotrack) && (this.autotrack = !!e.autotrack, this.spa = e
				.spa, this.fncArray = new Map, this.setLocation(), this.hack(), this.storage = new Storage(!0), this
				.storage.setItem("__tea_cache_refer_key", location.href), this.listener())
		}
		return e.prototype.hack = function() {
			var e = this,
				t = window.history.pushState;
			history.pushState = function(r) {
				for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
				"function" == typeof history.onpushstate && history.onpushstate({
					state: r
				});
				var o = t.call.apply(t, __spread([history, r], n)),
					a = e.getPopStateChangeEventData();
				return e.lastLocation = stringify$2(location.href, n[1]), e.storage.setItem(
					"__tea_cache_refer_key", e.lastLocation), e.sendPv(a), o
			};
			var r = history.replaceState;
			history.replaceState = function(t) {
				for (var n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
				"function" == typeof history.onreplacestate && history.onreplacestate({
					state: t
				});
				var o = r.call.apply(r, __spread([history, t], n)),
					a = e.getPopStateChangeEventData();
				return e.lastLocation = stringify$2(location.href, n[1]), e.storage.setItem(
					"__tea_cache_refer_key", e.lastLocation), e.sendPv(a), o
			}
		}, e.prototype.setLocation = function() {
			"undefined" != typeof window && (this.lastLocation = window.location.href)
		}, e.prototype.add = function(e, t) {
			this.fncArray.get(e) || this.fncArray.set(e, t)
		}, e.prototype.init = function(e, t) {
			this.add(e, t), this.fncArray.get(e)(this.getPopStateChangeEventData())
		}, e.prototype.listener = function() {
			var e = this,
				t = null;
			window.addEventListener("hashchange", (function(r) {
				e.lastLocation !== window.location.href && clearTimeout(t)
			})), window.addEventListener("popstate", (function(r) {
				e.lastLocation !== window.location.href && (t = setTimeout((function() {
					e.lastLocation = window.location.href;
					var t = e.getPopStateChangeEventData();
					e.sendPv(t)
				}), 10))
			}))
		}, e.prototype.getPopStateChangeEventData = function() {
			var e = this.pageConfig();
			return e.is_back = 0, e
		}, e.prototype.pageConfig = function() {
			var e = "";
			try {
				e = document.referrer ? document.referrer : this.storage.getItem("__tea_cache_refer_key") || ""
			} catch (t) {}
			return {
				is_html: 1,
				url: location.href,
				referrer: e,
				page_key: location.href,
				refer_page_key: e,
				page_manual_key: "",
				refer_page_manual_key: ""
			}
		}, e.prototype.sendPv = function(e) {
			this.fncArray.forEach((function(t) {
				t(e)
			}))
		}, e
	}(),
	hashCode = function(e) {
		for (var t = 0, r = 0, n = (e += "").length, i = 0; i < n; i++)((t = 31 * t + e.charCodeAt(r++)) >
			0x7fffffffffff || t < -0x800000000000) && (t &= 0xffffffffffff);
		return t < 0 && (t += 0x7ffffffffffff), t
	};

function getCommonParams(e, t, r) {
	return {
		title: t || document.title || location.pathname,
		url: r || location.href,
		url_path: e || location.pathname
	}
}

function getCurrentTime() {
	return Date.now()
}

function getPageStartTime() {
	var e = getNameSpace();
	return window[e] ? window[e].l : getCurrentTime()
}

function isSupVisChange() {
	var e = !1;
	return ["hidden", "msHidden", "webkitHidden"].forEach((function(t) {
		void 0 !== document[t] && (e = !0)
	})), e
}
var PageAlive = function() {
		function e(e, t) {
			var r = this;
			this._sendEvent = function(e) {
					void 0 === e && (e = !1);
					var t = e ? r.options.aliveDTime : getCurrentTime() - r.sessionStartTime;
					t < 0 || getCurrentTime() - r.pageStartTime > r.options.maxDuration || (r.event(
						"predefine_page_alive", __assign({}, getCommonParams(r.url_path, r.title, r.url), {
							duration: t,
							is_support_visibility_change: r.options.sup_vis_change ? 1 : 0,
							startTime: r.sessionStartTime
						}), "sdk"), r.sessionStartTime = getCurrentTime())
				}, this._setUpTimer = function() {
					return r.timerHandler && clearInterval(r.timerHandler), setInterval((function() {
						getCurrentTime() - r.sessionStartTime > r.options.aliveDTime && r._sendEvent(!0)
					}), 1e3)
				}, this._visibilitychange = function() {
					"hidden" === document.visibilityState ? r.timerHandler && (clearInterval(r.timerHandler), r
						._sendEvent()) : "visible" === document.visibilityState && (r.sessionStartTime =
						getCurrentTime(), r.timerHandler = r._setUpTimer())
				}, this._beforeunload = function() {
					document.hidden || r._sendEvent()
				}, this._wtest = function() {
					document.getElementById("wtest").innerHTML = "visibilitychange"
				}, this._dtest = function() {
					document.getElementById("dtest").innerHTML = "dvisibilitychange"
				}, this.event = e, this.config = t, this.isSupVisChange = isSupVisChange(), this.options = {
					maxDuration: 432e5,
					aliveDTime: 6e4,
					sup_vis_change: isSupVisChange()
				}, this.pageStartTime = getPageStartTime(), this.sessionStartTime = this.pageStartTime, this
				.timerHandler = null, this.disableCallback = function() {}
		}
		return e.prototype.enable = function(e, t, r) {
			this.url_path = e, this.url = r, this.title = t, this.disableCallback = this._enablePageAlive()
		}, e.prototype.disable = function() {
			this.disableCallback(), this.pageStartTime = Date.now()
		}, e.prototype._enablePageAlive = function() {
			var e = this;
			return this.timerHandler = this._setUpTimer(), document.addEventListener("visibilitychange", this
					._visibilitychange), beforePageUnload(this._beforeunload),
				function() {
					e._beforeunload(), document.removeEventListener("visibilitychange", e._visibilitychange), window
						.removeEventListener("beforeunload", e._beforeunload), window.removeEventListener(
							"pagehide", e._beforeunload)
				}
		}, e
	}(),
	PageClose = function() {
		function e(e, t) {
			var r = this;
			this._visibilitychange = function() {
					"hidden" === document.visibilityState ? r.activeEndTime = getCurrentTime() : "visible" === document
						.visibilityState && (r.activeEndTime && (r.totalTime += r.activeEndTime - r.activeStartTime, r
							.activeTimes += 1), r.activeEndTime = void 0, r.activeStartTime = getCurrentTime())
				}, this._beforeunload = function() {
					if (r.totalTime += (r.activeEndTime || getCurrentTime()) - r.activeStartTime, r.config.autotrack) {
						try {
							window.sessionStorage.setItem("_tea_cache_duration", JSON.stringify({
								duration: r.totalTime,
								page_title: document.title || location.pathname
							}))
						} catch (e) {}
					}
					r._sendEventPageClose()
				}, this.event = e, this.config = t, this.isSupVisChange = isSupVisChange(), this.options = {
					sup_vis_change: this.isSupVisChange
				}, this.maxDuration = t.maxDuration || 864e5, this.disableCallback = function() {}, this.pageStartTime =
				getPageStartTime(), this._resetData()
		}
		return e.prototype.enable = function(e, t, r) {
			this.url_path = e, this.url = r, this.title = t, this.disableCallback = this._enablePageClose()
		}, e.prototype.disable = function() {
			this.disableCallback()
		}, e.prototype._resetData = function() {
			this.activeStartTime = void 0 === this.activeStartTime ? getPageStartTime() : Date.now(), this
				.activeEndTime = void 0, this.activeTimes = 1, this.totalTime = 0
		}, e.prototype._sendEventPageClose = function() {
			var e = getCurrentTime() - this.pageStartTime;
			this.totalTime < 0 || e < 0 || this.totalTime >= this.maxDuration || (this.event("predefine_page_close",
				__assign({}, getCommonParams(this.url_path, this.title, this.url), {
					active_times: this.activeTimes,
					duration: this.totalTime,
					total_duration: e,
					is_support_visibility_change: this.options.sup_vis_change ? 1 : 0
				}), "sdk"), this.pageStartTime = Date.now(), this._resetData())
		}, e.prototype._enablePageClose = function() {
			var e = this;
			return document.addEventListener("visibilitychange", this._visibilitychange), beforePageUnload(this
					._beforeunload),
				function() {
					e._beforeunload(), document.removeEventListener("visibilitychange", e._visibilitychange), window
						.removeEventListener("beforeunload", e._beforeunload), window.removeEventListener(
							"pagehide", e._beforeunload)
				}
		}, e
	}(),
	StayDuration = function() {
		function e(e, t) {
			this.pageAlive = new PageAlive(e, t), this.pageClose = new PageClose(e, t), this.title = document.title ||
				location.pathname, this.url = location.href, this.url_path = location.pathname, this._enable(this
					.url_path, this.title, this.url)
		}
		return e.prototype._enable = function(e, t, r) {
			this.pageAlive.enable(e, t, r), this.pageClose.enable(e, t, r)
		}, e.prototype._disable = function() {
			this.pageAlive.disable(), this.pageClose.disable()
		}, e.prototype.reset = function(e, t, r) {
			this._disable(), this._enable(e, t, r)
		}, e
	}();

function selfAdjust(e, t) {
	void 0 === e && (e = function() {}), void 0 === t && (t = 1e3);
	var r, n = Date.now() + t;
	return r = window.setTimeout((function i() {
			var o = Date.now() - n;
			e(), n += t, r = window.setTimeout(i, Math.max(0, t - o))
		}), t),
		function() {
			window.clearTimeout(r)
		}
}
var Session$1 = function() {
		function e(e) {
			var t = this;
			this._setInterval = function() {
					t._clearIntervalFunc = selfAdjust((function() {
						t._isSessionhasEvent && t._endCurrentSession()
					}), t.sessionInterval)
				}, this._clearInterval = function() {
					t._clearIntervalFunc && t._clearIntervalFunc()
				}, this.sessionInterval = 6e4, this._eventSenderFunc = e, this._startTime = 0, this._lastTime = 0, this
				._setInterval()
		}
		return e.prototype._endCurrentSession = function() {
			this._eventSenderFunc("_be_active", {
				start_time: this._startTime,
				end_time: this._lastTime,
				url: window.location.href,
				referrer: window.document.referrer
			}, "sdk"), this._isSessionhasEvent = !1, this._startTime = 0
		}, e.prototype.process = function() {
			this._isSessionhasEvent || (this._isSessionhasEvent = !0, this._startTime = +new Date);
			var e = this._lastTime || +new Date;
			this._lastTime = +new Date, this._lastTime - e > this.sessionInterval && (this._clearInterval(), this
				._endCurrentSession(), this._setInterval())
		}, e
	}(),
	SDK_USE_TYPE = "npm",
	Monitor = function() {
		function e(e) {
			this.config = e
		}
		return e.prototype.sdkOnload = function(e, t, r) {
			if (!this.sdkReady) {
				this.sdkReady = !0;
				try {
					if (0 === r.length) return;
					var n = r[0],
						i = n.header,
						o = n.user,
						a = i.app_id,
						s = i.app_name,
						c = i.sdk_version,
						u = o.web_id,
						l = {
							events: [{
								event: "onload",
								params: JSON.stringify({
									app_key: e,
									app_id: a,
									app_name: s || "",
									sdk_version: c,
									sdk_type: SDK_USE_TYPE,
									sdk_config: this.config
								}),
								local_time_ms: Date.now()
							}],
							user: {
								user_unique_id: u
							},
							header: {}
						};
					setTimeout((function() {
						request(t, 3e4, [l], "566f58151b0ed37e")
					}), 16)
				} catch (d) {}
			}
		}, e.prototype.sdkError = function(e, t, r, n) {
			try {
				var i = r[0],
					o = i.user,
					a = i.header,
					s = [];
				r.forEach((function(e) {
					e.events.forEach((function(e) {
						s.push(e)
					}))
				}));
				var c = {
					events: s.map((function(t) {
						return {
							event: "on_error",
							params: JSON.stringify({
								error_code: n,
								app_key: e,
								app_id: a.app_id,
								app_name: a.app_name || "",
								error_event: t.event,
								sdk_version: a.sdk_version,
								local_time_ms: t.local_time_ms,
								tea_event_index: Date.now(),
								params: t.params,
								header: JSON.stringify(a),
								user: JSON.stringify(o)
							}),
							local_time_ms: Date.now()
						}
					})),
					user: {
						user_unique_id: o.user_unique_id
					},
					header: {}
				};
				setTimeout((function() {
					request(t, 3e4, [c], "566f58151b0ed37e")
				}), 16)
			} catch (u) {}
		}, e
	}(),
	getIframeUrl = function() {
		try {
			var e = JSON.parse(atob(window.name));
			return e || void 0
		} catch (t) {
			return
		}
	};

function openOverlayer() {
	if (!document.getElementById(STYLE_ID)) {
		var e = "body { opacity: 0 !important; }",
			t = document.head || document.getElementsByTagName("head")[0],
			r = document.createElement("style");
		r.id = STYLE_ID, r.type = "text/css", r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document
			.createTextNode(e)), t.appendChild(r)
	}
}

function closeOverlayer() {
	var e = document.getElementById(STYLE_ID);
	e && e.parentElement.removeChild(e)
}
var storage = new Storage(!1),
	getStorageKey = function(e) {
		return STORAGE_DATA_KEY + "_" + e
	},
	getCache = function(e) {
		var t = {
			ab_version: [],
			ab_ext_version: [],
			ab_version_multilink: [],
			data: null,
			timestamp: +new Date
		};
		try {
			t = storage.getItem(getStorageKey(e)) || t
		} catch (r) {}
		return t
	},
	_setCache = function(e, t) {
		try {
			var r = getCache(e);
			storage.setItem(getStorageKey(e), __assign({}, r, t))
		} catch (n) {}
	},
	setVersionCache = function(e, t, r) {
		void 0 === r && (r = !1);
		var n = r ? {
			ab_ext_version: t,
			timestamp: Date.now()
		} : {
			ab_version: t,
			timestamp: Date.now()
		};
		_setCache(e, n)
	},
	setMultilinkCache = function(e, t) {
		var r = {
			ab_version_multilink: t,
			timestamp: Date.now()
		};
		_setCache(e, r)
	},
	setDataCache = function(e, t) {
		_setCache(e, {
			data: t
		})
	},
	checkExpiration = function(e) {
		var t = getCache(e),
			r = t.timestamp;
		if (Date.now() - r >= STORAGE_DATA_EXPRIRE) {
			try {
				storage.removeItem(STORAGE_DATA_KEY)
			} catch (n) {}
			return null
		}
		return t
	},
	msgQueueMap = {},
	allowdOrigins = [],
	addAllowdOrigin = function(e) {
		e.length && e.forEach((function(e) {
			allowdOrigins.push(e)
		}))
	};

function dispatchMsg(e, t, r, n) {
	var i = e && e.source || window.opener || window.parent,
		o = e && e.origin || n || "*",
		a = {
			type: t,
			payload: r
		};
	i.postMessage(JSON.stringify(a), o)
}

function receiveMsg(e, t) {
	msgQueueMap[e] = msgQueueMap[e] || [], msgQueueMap[e].push(t)
}

function processMsg(e) {
	if (allowdOrigins.some((function(e) {
			return "*" === e
		})) || allowdOrigins.some((function(t) {
			return e.origin.indexOf(t) > -1
		}))) {
		var t = e.data;
		if ("string" == typeof e.data) try {
			t = JSON.parse(e.data)
		} catch (i) {
			t = void 0
		}
		if (!t) return;
		var r = t.type,
			n = t.payload;
		msgQueueMap[r] && msgQueueMap[r].forEach((function(t) {
			"function" == typeof t && t(e, n)
		}))
	}
}

function init(e, t) {
	delete e.filter, (window.opener || window.parent).postMessage({
		type: "tea:sdk:info",
		config: e,
		version: t
	}, "*"), window.addEventListener("message", processMsg, !1)
}

function loadScript(e, t, r) {
	var n = document.createElement("script");
	n.src = e, n.onerror = function() {
		r(e)
	}, n.onload = function() {
		t()
	}, document.getElementsByTagName("head")[0].appendChild(n)
}
window.TEAVisualEditor = window.TEAVisualEditor || {};
var VISUAL_URL = "",
	isLoaded = !1;

function loadEditorScript(e) {
	var t = e.event,
		r = e.editorUrl;
	e.collectInstance, e.fromSession, isLoaded || (isLoaded = !0, loadScript(r, (function() {
		dispatchMsg(t, "abEditorScriptloadSuccess")
	}), (function() {
		t && dispatchMsg(t, "abEditorScriptloadError"), isLoaded = !1
	})))
}

function readyToLoadEditor(e, t, r, n) {
	addAllowdOrigin(["*"]);
	var i, o = "";
	init(n, SDK_VERSION);
	var a = "";
	try {
		var s = window.performance.getEntriesByType("resource");
		if (s && s.length && (s.forEach((function(e) {
					"script" === e.initiatorType && e.name && -1 !== e.name.indexOf("collect") && (a = e.name)
				})), a || document.currentScript && (a = document.currentScript.src), a && (i = a.split("/")) && i
				.length)) {
			o = "https:/";
			for (var c = 2; c < i.length && c !== i.length - 1; c++) o = o + "/" + i[c];
			o += "/visual-ab-core"
		}
	} catch (u) {}
	receiveMsg("tea:openVisualABEditor", (function(n) {
		var i = n.data;
		if ("string" == typeof n.data) try {
			i = JSON.parse(n.data)
		} catch (u) {
			i = void 0
		}
		if (i) {
			var a = i.lang;
			if (i.appId !== t) return dispatchMsg(n, "appIdError"), void console.error(
				"abtest appid is not belong the page appid please check");
			var s = i.version;
			if (s) VISUAL_URL = o ? "" + o + (s ? "." + s : ".1.0.1") + ".js?query=" + Date.now() :
				decodeUrl(VISUAL_URL_ASC) + "?query=" + Date.now();
			else VISUAL_URL = decodeUrl(VISUAL_URL_ASC) + "?query=" + Date.now();
			window.TEAVisualEditor.lang = a, r && (window.TEAVisualEditor.__ab_domin = r),
		loadEditorScript({
				event: n,
				editorUrl: VISUAL_URL,
				collectInstance: e
			})
		}
	}))
}
var loadMuiltlink = function(e, t, r, n) {
		window.TEAVisualEditor.appId = t, receiveMsg("tea:openTesterEventInspector", (function(t) {
			var r = t.data;
			if ("string" == typeof t.data) try {
				r = JSON.parse(t.data)
			} catch (a) {
				r = void 0
			}
			if (r) {
				var n = r.referrer,
					i = r.lang,
					o = r.appId;
				window.TEAVisualEditor.__editor_ajax_domain = n || "", window.TEAVisualEditor.__ab_appId =
					o || "", window.TEAVisualEditor.lang = i || "", loadEditorScript({
						event: t,
						editorUrl: decodeUrl(VISUAL_URL_INSPECTOR) + "?query=" + Date.now(),
						collectInstance: e
					})
			}
		}))
	},
	VISUAL_RANGER_URL = decodeUrl(VISUAL_URL_RANGER) + "?query=" + Date.now(),
	loadVisual = function(e) {
		window.TEAVisualEditor.__ab_config = e, loadScript(VISUAL_RANGER_URL, (function() {
			console.log("load visual render success")
		}), (function() {
			console.log("load visual render fail")
		}))
	},
	FetchStatus, FetchStatus2, CallbackType, CallbackType2;
FetchStatus2 = FetchStatus || (FetchStatus = {}), FetchStatus2[FetchStatus2.No = 0] = "No", FetchStatus2[FetchStatus2
	.Ing = 1] = "Ing", FetchStatus2[FetchStatus2.Complete = 2] = "Complete", CallbackType2 = CallbackType || (
	CallbackType = {}), CallbackType2[CallbackType2.Var = 0] = "Var", CallbackType2[CallbackType2.All = 1] = "All";
var AB = function() {
		function e(e, t, r) {
			this.appId = 0, this.user = {}, this.header = {}, this.domain = "", this.protocal = location.protocol, this
				.fetchStatus = FetchStatus.No, this.callbacks = [], this.data = null, this.versions = [], this
				.extVersions = [], this.mulilinkVersions = [], this.collector = e;
			var n = this.collector._initConfig,
				i = n.app_id,
				o = n.channel,
				a = n.enable_multilink,
				s = n.multilink_timeout_ms,
				c = n.ab_channel_domain,
				u = n.channel_domain,
				l = n.enable_ab_visual,
				d = n.ab_timeout;
			if (this.appId = i, this.timeout = d || 3e3, this.domain = c || decodeUrl(DOMAINS[o || "cn"]), this
				.domain) {
				this.needOverlay = a || l || !1, this.enable_ab_visual = l, this.enable_multilink = a, this.closeTime =
					s || 500, this.Hook = t;
				var p = u || decodeUrl(LOG_URL[o]);
				this.reportUrl = "" + p + REPORT_URL, this.editCheck(), l && (readyToLoadEditor(e, this.appId, c || "",
					r), "visual-editor" === this.editMode) ? this.collector.destroy() : (a && loadMuiltlink(e, this
					.appId), this._check(), this.wait())
			} else console.warn("sorry, channel in is not support abtest yet~")
		}
		return e.prototype.editCheck = function() {
			var e = getIframeUrl();
			if (e) {
				var t = e.scenario,
					r = e.href;
				t ? "heatmap" === t ? (console.log("heatmap mode"), this.editMode = "heatmap") : "visual-editor" ===
					t && (console.log("visual mode"), this.editMode = "visual-editor") : !r || -1 === r.indexOf(
						"datatester") && -1 === r.indexOf("visual-editor") || (console.log("visual mode"), this
						.editMode = "visual-editor")
			}
		}, e.prototype.checkFromUrl = function() {
			var e = parseUrlQuery(window.location.href);
			return e && e.vid ? e.vid : ""
		}, e.prototype.refetch = function() {
			this._clearCache();
			var e = this.collector._config.get();
			this.init(e)
		}, e.prototype.init = function(e, t) {
			if (!this.collector.destroyInstance)
				if (this.domain) {
					this.config = e;
					var r = e.user,
						n = e.header,
						i = __rest(n, []);
					this.user = __assign({}, r), this.header = __assign({}, n), this._fetch(__assign({}, i), {
						success: t,
						fail: t
					})
				} else console.warn("sorry, channel in is not support abtest yet~")
		}, e.prototype._check = function() {
			var e = this,
				t = checkExpiration(this.appId);
			if (t) {
				var r = t.ab_version,
					n = t.data,
					i = t.ab_ext_version,
					o = t.ab_version_multilink,
					a = this.checkFromUrl();
				a ? this.mulilinkVersions.push(a) : this.mulilinkVersions = o || [], this.extVersions = i, r && r
					.length && (this.versions = r, this.data = n, setTimeout((function() {
						e._configVersions()
					})))
			}
		}, e.prototype.wait = function() {
			var e = this;
			this.needOverlay && (this.isWait || (this.openOverlayer(), this.isWait = !0), setTimeout((function() {
				e.closeOverlayer()
			}), this.closeTime))
		}, e.prototype.getAllVars = function(e) {
			if ("function" != typeof e) throw new Error("callback must be a function");
			var t = {
				callback: e,
				type: CallbackType.All
			};
			this.fetchStatus === FetchStatus.Complete ? this._getAllVars(t) : this.callbacks.push(t)
		}, e.prototype._getAllVars = function(e) {
			(0, e.callback)(this.data ? JSON.parse(JSON.stringify(this.data)) : {})
		}, e.prototype.getVids = function() {
			try {
				var e = getCache(this.appId),
					t = e.ab_version,
					r = e.ab_version_multilink,
					n = e.ab_ext_version,
					i = "",
					o = t.concat(r).concat(n);
				return o && o.length && (i = o.join(",")), i
			} catch (a) {
				return ""
			}
		}, e.prototype.getAbSdkVersion = function(e) {
			e(this.getVids())
		}, e.prototype.getVar = function(e, t, r) {
			if (!e) throw new Error("variable must not be empty");
			if (void 0 === t) throw new Error("variable no default value");
			if ("function" != typeof r) throw new Error("callback must be a function");
			var n = {
				name: e,
				defaultValue: t,
				callback: r,
				type: CallbackType.Var
			};
			if (this.fetchStatus === FetchStatus.Complete) {
				this._getVar(n, e);
				try {
					this.Hook.emit("onAbSdkVersionChange", this.getVids())
				} catch (i) {}
			} else this.callbacks.push(n)
		}, e.prototype._getVar = function(e, t) {
			var r = e.name,
				n = e.defaultValue,
				i = e.callback,
				o = this.data;
			if (o) {
				if ("object" == typeof o[r] && void 0 !== o[r].val) {
					var a = o[r].vid;
					return "$ab_url" === t ? (-1 === this.mulilinkVersions.indexOf(a) && this.mulilinkVersions.push(
						a), this._updateMultilinkVersions()) : (-1 === this.versions.indexOf(a) && this.versions
						.push(a), this._updateVersions()), this._abEvent(a, t, n), void i(o[r].val)
				}
				i(n)
			} else i(n)
		}, e.prototype._abEvent = function(e, t, r) {
			var n = this;
			try {
				if (e) {
					var i = {
							event: "abtest_exposure",
							ab_sdk_version: "" + e,
							params: JSON.stringify({
								app_id: this.appId,
								ab_url: "$ab_url" === t ? r : window.location.href
							}),
							local_time_ms: Date.now()
						},
						o = this.collector._config.get(),
						a = o.header,
						s = o.user;
					a.ab_sdk_version = "" + e, a.custom = JSON.stringify(a.custom);
					var c = {
						events: [i],
						user: s,
						header: a
					};
					"$ab_url" === t ? window.navigator.sendBeacon ? window.navigator.sendBeacon(this.reportUrl, JSON
						.stringify([c])) : request(this.reportUrl, 2e4, [c], "") : setTimeout((function() {
						request(n.reportUrl, 2e4, [c], "")
					}), 16)
				}
			} catch (u) {}
		}, e.prototype.openOverlayer = function() {
			openOverlayer()
		}, e.prototype.closeOverlayer = function() {
			closeOverlayer()
		}, e.prototype._setAbVersion = function(e) {
			this.extVersions = [e], setVersionCache(this.appId, this.extVersions, !0)
		}, e.prototype._updateVersions = function() {
			setVersionCache(this.appId, this.versions), this._configVersions()
		}, e.prototype._updateMultilinkVersions = function() {
			setMultilinkCache(this.appId, this.mulilinkVersions)
		}, e.prototype._configVersions = function() {
			var e = this.versions.join(",");
			e && this.collector.config({
				ab_sdk_version: e
			})
		}, e.prototype._clearCache = function() {
			this.versions = [], this.mulilinkVersions = []
		}, e.prototype._getABconfig = function(e, t) {
			var r = Object.keys(e);
			r && r.length && this.collector.config(e), this.init(this.collector._config.get(), t)
		}, e.prototype._fetchComplete = function(e) {
			var t = this;
			if (e && "[object Object]" == Object.prototype.toString.call(e)) {
				setDataCache(this.appId, e), this.data = e;
				var r = [];
				Object.keys(e).forEach((function(t) {
					var n = e[t].vid;
					n && r.push(n)
				})), -1 !== window.location.href.indexOf("multilink=true") || (this.versions = this.versions
					.filter((function(e) {
						return -1 !== r.indexOf(e)
					})));
				var n = e.$ab_url,
					i = e.$ab_modification;
				if (i && i.val && this.enable_ab_visual) {
					if (this.collector.destroyInstance) return;
					this.getVar("$ab_modification", window.location.href, (function() {
						loadVisual(i.val)
					}))
				} else if (n && this.enable_multilink) {
					var o = n.val,
						a = n.vid;
					o && a && this.getVar("$ab_url", o, (function() {
						if ("heatmap" !== t.editMode) {
							var e = window.location.href; - 1 !== e.indexOf("multilink=true") && (e = t
								.filterUrl(e)), o !== e ? setTimeout((function() {
								if (!t.collector.destroyInstance) {
									var e = "" + o; - 1 !== (e = -1 === e.indexOf("http") ?
											"https://" + e : e).indexOf("?") ? e +=
										"&multilink=true" : e += "?multilink=true",
										parseURL(e).host !== location.host && (e = e +
											"&vid=" + a), window.location.href = e
								}
							}), 50) : t.closeOverlayer()
						}
					}))
				} else this.closeOverlayer()
			}
			this.callbacks.forEach((function(e) {
				t[e.type === CallbackType.Var ? "_getVar" : "_getAllVars"](e, "")
			})), this.callbacks = [], this._updateVersions();
			try {
				this.Hook.emit("onAbSdkVersionChange", this.getVids())
			} catch (s) {}
			this.isWait || this.closeOverlayer()
		}, e.prototype._fetch = function(e, t) {
			var r = this,
				n = void 0 === t ? {} : t,
				i = n.success,
				o = void 0 === i ? function() {} : i,
				a = n.fail,
				s = void 0 === a ? function() {} : a;
			this.fetchStatus = FetchStatus.Ing;
			var c = "" + this.domain + API,
				u = window.location.href,
				l = !1; - 1 !== u.indexOf("multilink=true") && (u = this.filterUrl(u), l = !0);
			var d = l ? this.mulilinkVersions : this.versions;
			xhr(c, {
				header: __assign({
					aid: this.appId
				}, this.user || {}, e || {}, {
					ab_sdk_version: d.join(","),
					ab_url: u
				})
			}, (function(e) {
				r.fetchStatus = FetchStatus.Complete;
				var t = e.data;
				"success" === e.message ? (r._fetchComplete(t), o(t)) : (r._fetchComplete(null), s())
			}), (function() {
				r.fetchStatus = FetchStatus.Complete, s(), r._fetchComplete(null)
			}), "", this.timeout)
		}, e.prototype.filterUrl = function(e) {
			try {
				var t = ""; - 1 !== e.indexOf("&multilink=true") ? t = "&multilink=true[\0-ÿ]*" : -1 !== e.indexOf(
					"?multilink=true") && (t = "\\?multilink=true[\0-ÿ]*");
				var r = new RegExp(t, "g");
				e = e.replace(r, "")
			} catch (n) {}
			return e
		}, e
	}(),
	maxStorage = function(e, t, r, n) {
		if (t) {
			var i = e.filter((function(e) {
				return !e[0].__disable_storage__
			})).length;
			if (i > 0) try {
				var o = n.getItem(r);
				if (o) {
					var a = Object.keys(o),
						s = a.length + i - t;
					if (s > 0) {
						for (var c = a.map((function(e) {
								var t = o[e];
								return {
									id: e,
									index: t && t[0] ? t[0].header.__storage_index__ : +new Date
								}
							})).sort((function(e, t) {
								return e.index - t.index
							})), u = 0; u < s; u++) {
							var l = c.shift();
							l && l.id && o[l.id] && delete o[l.id]
						}
						n.setItem(r, o)
					}
				}
			} catch (d) {}
		}
	},
	Et_Test = function() {
		function e(e) {
			"string" == typeof e.event_verify_url ? this.url = e.event_verify_url + "/" + ET_TEST_URL : console.log(
				"please use correct et_test url")
		}
		return e.prototype.send = function(e) {
			this.url && request(this.url, 3e4, e)
		}, e
	}(),
	Plugin = function(e, t, r, n, i) {
		t && (t.enable_stay_duration && (this.stay = new StayDuration(n, t)), t.disable_session || (this.session =
				new Session$1(r)), t.channel_domain || t.disable_sdk_monitor || (this.monitor = new Monitor(t)), t
			.event_verify_url && (this.et_test = new Et_Test(t)), t.enable_ab_test && (this.ab = new AB(e, i, t)), t
			.max_storage_num && (this.maxStorage = maxStorage))
	},
	Profile = function() {
		function e(e, t, r) {
			this.processEvent = e, this._event = t, this.cache = {}, this.duration = 6e4, this.profileReady = !1, this
				.reportUrl = (r.channel_domain || decodeUrl(LOG_URL[r.channel])) + "/profile/list"
		}
		return e.prototype.start = function() {
			this.profileReady = !0
		}, e.prototype.report = function(e, t) {
			void 0 === t && (t = {});
			try {
				var r = [];
				r.push(this.processEvent(e, t));
				var n = this._event._mergeEvents(r);
				request(this.reportUrl, 3e5, n)
			} catch (i) {}
		}, e.prototype.setProfile = function(e) {
			var t = this._formatParams(e);
			t && Object.keys(t).length && (this._pushCache(t), this.report("__profile_set", __assign({}, t, {
				profile: !0
			})))
		}, e.prototype.setOnceProfile = function(e) {
			var t = this._formatParams(e, !0);
			t && Object.keys(t).length && (this._pushCache(t), this.report("__profile_set_once", __assign({}, t, {
				profile: !0
			})))
		}, e.prototype.incrementProfile = function(e) {
			e ? this.report("__profile_increment", __assign({}, e, {
				profile: !0
			})) : console.warn("please check the params, must be object!!!")
		}, e.prototype.unsetProfile = function(e) {
			if (e) {
				var t = {};
				t[e] = "1", this.report("__profile_unset", __assign({}, t, {
					profile: !0
				}))
			} else console.warn("please check the key, must be string!!!")
		}, e.prototype.appendProfile = function(e) {
			if (e) {
				var t = {};
				for (var r in e) "string" == typeof e[r] || "Array" === Object.prototype.toString.call(e[r]).slice(
					8, -1) ? t[r] = e[r] : console.warn("please check the value of param: " + r +
					", must be string or array !!!");
				Object.keys(t).length && this.report("__profile_append", __assign({}, t, {
					profile: !0
				}))
			} else console.warn("please check the params, must be object!!!")
		}, e.prototype._pushCache = function(e) {
			var t = this;
			Object.keys(e).forEach((function(r) {
				t.cache[r] = {
					val: t._clone(e[r]),
					timestamp: Date.now()
				}
			}))
		}, e.prototype._formatParams = function(e, t) {
			var r = this;
			void 0 === t && (t = !1);
			try {
				if (!e || "[object Object]" !== Object.prototype.toString.call(e)) return void console.warn(
					"please check the params type, must be object !!!");
				var n = {};
				for (var i in e) "string" == typeof e[i] || "number" == typeof e[i] || "Array" === Object.prototype
					.toString.call(e[i]).slice(8, -1) ? n[i] = e[i] : console.warn(
						"please check the value of params:" + i + ", must be string,number,Array !!!");
				var o = Object.keys(n);
				if (!o.length) return;
				var a = Date.now();
				return o.filter((function(n) {
					var i = r.cache[n];
					return t ? !i : !(i && r._compare(i.val, e[n]) && a - i.timestamp < r.duration)
				})).reduce((function(e, t) {
					return e[t] = n[t], e
				}), {})
			} catch (s) {}
		}, e.prototype._compare = function(e, t) {
			try {
				return JSON.stringify(e) === JSON.stringify(t)
			} catch (r) {
				return !1
			}
		}, e.prototype._clone = function(e) {
			try {
				return JSON.parse(JSON.stringify(e))
			} catch (t) {
				return e
			}
		}, e.prototype._unReady = function() {
			console.warn("sdk is not ready, please use this api after start")
		}, e
	}(),
	dayjs_min = createCommonjsModule((function(e, t) {
		e.exports = function() {
			var e = 1e3,
				t = 6e4,
				r = 36e5,
				n = "millisecond",
				i = "second",
				o = "minute",
				a = "hour",
				s = "day",
				c = "week",
				u = "month",
				l = "quarter",
				d = "year",
				p = "date",
				f = "Invalid Date",
				h =
				/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
				g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
				_ = {
					name: "en",
					weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
					months: "January_February_March_April_May_June_July_August_September_October_November_December"
						.split("_")
				},
				m = function(e, t, r) {
					var n = String(e);
					return !n || n.length >= t ? e : "" + Array(t + 1 - n.length).join(r) + e
				},
				y = {
					s: m,
					z: function(e) {
						var t = -e.utcOffset(),
							r = Math.abs(t),
							n = Math.floor(r / 60),
							i = r % 60;
						return (t <= 0 ? "+" : "-") + m(n, 2, "0") + ":" + m(i, 2, "0")
					},
					m: function e(t, r) {
						if (t.date() < r.date()) return -e(r, t);
						var n = 12 * (r.year() - t.year()) + (r.month() - t.month()),
							i = t.clone().add(n, u),
							o = r - i < 0,
							a = t.clone().add(n + (o ? -1 : 1), u);
						return +(-(n + (r - i) / (o ? i - a : a - i)) || 0)
					},
					a: function(e) {
						return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
					},
					p: function(e) {
						return {
							M: u,
							y: d,
							w: c,
							d: s,
							D: p,
							h: a,
							m: o,
							s: i,
							ms: n,
							Q: l
						} [e] || String(e || "").toLowerCase().replace(/s$/, "")
					},
					u: function(e) {
						return void 0 === e
					}
				},
				v = "en",
				b = {};
			b[v] = _;
			var w = function(e) {
					return e instanceof z
				},
				S = function(e, t, r) {
					var n;
					if (!e) return v;
					if ("string" == typeof e) b[e] && (n = e), t && (b[e] = t, n = e);
					else {
						var i = e.name;
						b[i] = e, n = i
					}
					return !r && n && (v = n), n || !r && v
				},
				E = function(e, t) {
					if (w(e)) return e.clone();
					var r = "object" == typeof t ? t : {};
					return r.date = e, r.args = arguments, new z(r)
				},
				k = y;
			k.l = S, k.i = w, k.w = function(e, t) {
				return E(e, {
					locale: t.$L,
					utc: t.$u,
					x: t.$x,
					$offset: t.$offset
				})
			};
			var z = function() {
					function _(e) {
						this.$L = S(e.locale, null, !0), this.parse(e)
					}
					var m = _.prototype;
					return m.parse = function(e) {
						this.$d = function(e) {
							var t = e.date,
								r = e.utc;
							if (null === t) return new Date(NaN);
							if (k.u(t)) return new Date;
							if (t instanceof Date) return new Date(t);
							if ("string" == typeof t && !/Z$/i.test(t)) {
								var n = t.match(h);
								if (n) {
									var i = n[2] - 1 || 0,
										o = (n[7] || "0").substring(0, 3);
									return r ? new Date(Date.UTC(n[1], i, n[3] || 1, n[4] || 0, n[
										5] || 0, n[6] || 0, o)) : new Date(n[1], i, n[3] || 1,
										n[4] || 0, n[5] || 0, n[6] || 0, o)
								}
							}
							return new Date(t)
						}(e), this.$x = e.x || {}, this.init()
					}, m.init = function() {
						var e = this.$d;
						this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this
							.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this
							.$s = e.getSeconds(), this.$ms = e.getMilliseconds()
					}, m.$utils = function() {
						return k
					}, m.isValid = function() {
						return !(this.$d.toString() === f)
					}, m.isSame = function(e, t) {
						var r = E(e);
						return this.startOf(t) <= r && r <= this.endOf(t)
					}, m.isAfter = function(e, t) {
						return E(e) < this.startOf(t)
					}, m.isBefore = function(e, t) {
						return this.endOf(t) < E(e)
					}, m.$g = function(e, t, r) {
						return k.u(e) ? this[t] : this.set(r, e)
					}, m.unix = function() {
						return Math.floor(this.valueOf() / 1e3)
					}, m.valueOf = function() {
						return this.$d.getTime()
					}, m.startOf = function(e, t) {
						var r = this,
							n = !!k.u(t) || t,
							l = k.p(e),
							f = function(e, t) {
								var i = k.w(r.$u ? Date.UTC(r.$y, t, e) : new Date(r.$y, t, e), r);
								return n ? i : i.endOf(s)
							},
							h = function(e, t) {
								return k.w(r.toDate()[e].apply(r.toDate("s"), (n ? [0, 0, 0, 0] : [23,
									59, 59, 999
								]).slice(t)), r)
							},
							g = this.$W,
							_ = this.$M,
							m = this.$D,
							y = "set" + (this.$u ? "UTC" : "");
						switch (l) {
							case d:
								return n ? f(1, 0) : f(31, 11);
							case u:
								return n ? f(1, _) : f(0, _ + 1);
							case c:
								var v = this.$locale().weekStart || 0,
									b = (g < v ? g + 7 : g) - v;
								return f(n ? m - b : m + (6 - b), _);
							case s:
							case p:
								return h(y + "Hours", 0);
							case a:
								return h(y + "Minutes", 1);
							case o:
								return h(y + "Seconds", 2);
							case i:
								return h(y + "Milliseconds", 3);
							default:
								return this.clone()
						}
					}, m.endOf = function(e) {
						return this.startOf(e, !1)
					}, m.$set = function(e, t) {
						var r, c = k.p(e),
							l = "set" + (this.$u ? "UTC" : ""),
							f = (r = {}, r[s] = l + "Date", r[p] = l + "Date", r[u] = l + "Month", r[
								d] = l + "FullYear", r[a] = l + "Hours", r[o] = l + "Minutes", r[i] =
								l + "Seconds", r[n] = l + "Milliseconds", r)[c],
							h = c === s ? this.$D + (t - this.$W) : t;
						if (c === u || c === d) {
							var g = this.clone().set(p, 1);
							g.$d[f](h), g.init(), this.$d = g.set(p, Math.min(this.$D, g.daysInMonth()))
								.$d
						} else f && this.$d[f](h);
						return this.init(), this
					}, m.set = function(e, t) {
						return this.clone().$set(e, t)
					}, m.get = function(e) {
						return this[k.p(e)]()
					}, m.add = function(n, l) {
						var p, f = this;
						n = Number(n);
						var h = k.p(l),
							g = function(e) {
								var t = E(f);
								return k.w(t.date(t.date() + Math.round(e * n)), f)
							};
						if (h === u) return this.set(u, this.$M + n);
						if (h === d) return this.set(d, this.$y + n);
						if (h === s) return g(1);
						if (h === c) return g(7);
						var _ = (p = {}, p[o] = t, p[a] = r, p[i] = e, p)[h] || 1,
							m = this.$d.getTime() + n * _;
						return k.w(m, this)
					}, m.subtract = function(e, t) {
						return this.add(-1 * e, t)
					}, m.format = function(e) {
						var t = this,
							r = this.$locale();
						if (!this.isValid()) return r.invalidDate || f;
						var n = e || "YYYY-MM-DDTHH:mm:ssZ",
							i = k.z(this),
							o = this.$H,
							a = this.$m,
							s = this.$M,
							c = r.weekdays,
							u = r.months,
							l = function(e, r, i, o) {
								return e && (e[r] || e(t, n)) || i[r].substr(0, o)
							},
							d = function(e) {
								return k.s(o % 12 || 12, e, "0")
							},
							p = r.meridiem || function(e, t, r) {
								var n = e < 12 ? "AM" : "PM";
								return r ? n.toLowerCase() : n
							},
							h = {
								YY: String(this.$y).slice(-2),
								YYYY: this.$y,
								M: s + 1,
								MM: k.s(s + 1, 2, "0"),
								MMM: l(r.monthsShort, s, u, 3),
								MMMM: l(u, s),
								D: this.$D,
								DD: k.s(this.$D, 2, "0"),
								d: String(this.$W),
								dd: l(r.weekdaysMin, this.$W, c, 2),
								ddd: l(r.weekdaysShort, this.$W, c, 3),
								dddd: c[this.$W],
								H: String(o),
								HH: k.s(o, 2, "0"),
								h: d(1),
								hh: d(2),
								a: p(o, a, !0),
								A: p(o, a, !1),
								m: String(a),
								mm: k.s(a, 2, "0"),
								s: String(this.$s),
								ss: k.s(this.$s, 2, "0"),
								SSS: k.s(this.$ms, 3, "0"),
								Z: i
							};
						return n.replace(g, (function(e, t) {
							return t || h[e] || i.replace(":", "")
						}))
					}, m.utcOffset = function() {
						return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
					}, m.diff = function(n, p, f) {
						var h, g = k.p(p),
							_ = E(n),
							m = (_.utcOffset() - this.utcOffset()) * t,
							y = this - _,
							v = k.m(this, _);
						return v = (h = {}, h[d] = v / 12, h[u] = v, h[l] = v / 3, h[c] = (y - m) /
							6048e5, h[s] = (y - m) / 864e5, h[a] = y / r, h[o] = y / t, h[i] = y /
							e, h)[g] || y, f ? v : k.a(v)
					}, m.daysInMonth = function() {
						return this.endOf(u).$D
					}, m.$locale = function() {
						return b[this.$L]
					}, m.locale = function(e, t) {
						if (!e) return this.$L;
						var r = this.clone(),
							n = S(e, t, !0);
						return n && (r.$L = n), r
					}, m.clone = function() {
						return k.w(this.$d, this)
					}, m.toDate = function() {
						return new Date(this.valueOf())
					}, m.toJSON = function() {
						return this.isValid() ? this.toISOString() : null
					}, m.toISOString = function() {
						return this.$d.toISOString()
					}, m.toString = function() {
						return this.$d.toUTCString()
					}, _
				}(),
				O = z.prototype;
			return E.prototype = O, [
				["$ms", n],
				["$s", i],
				["$m", o],
				["$H", a],
				["$W", s],
				["$M", u],
				["$y", d],
				["$D", p]
			].forEach((function(e) {
				O[e[1]] = function(t) {
					return this.$g(t, e[0], e[1])
				}
			})), E.extend = function(e, t) {
				return e.$i || (e(t, z, E), e.$i = !0), E
			}, E.locale = S, E.isDayjs = w, E.unix = function(e) {
				return E(1e3 * e)
			}, E.en = b[v], E.Ls = b, E.p = {}, E
		}()
	})),
	duration = createCommonjsModule((function(e, t) {
		var r, n, i, o, a, s, c, u, l, d, p, f, h, g, _, m, y, v, b;
		e.exports = (c = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
			d =
			/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,
			p = {
				years: u = 31536e6,
				months: l = 2592e6,
				days: s = 864e5,
				hours: a = 36e5,
				minutes: o = 6e4,
				seconds: i = 1e3,
				milliseconds: 1,
				weeks: 6048e5
			}, f = function(e) {
				return e instanceof b
			}, h = function(e, t, r) {
				return new b(e, r, t.$l)
			}, g = function(e) {
				return n.p(e) + "s"
			}, _ = function(e) {
				return e < 0
			}, m = function(e) {
				return _(e) ? Math.ceil(e) : Math.floor(e)
			}, y = function(e) {
				return Math.abs(e)
			}, v = function(e, t) {
				return e ? _(e) ? {
					negative: !0,
					format: "" + y(e) + t
				} : {
					negative: !1,
					format: "" + e + t
				} : {
					negative: !1,
					format: ""
				}
			}, b = function() {
				function e(e, t, r) {
					var n = this;
					if (this.$d = {}, this.$l = r, void 0 === e && (this.$ms = 0, this
							.parseFromMilliseconds()), t) return h(e * p[g(t)], this);
					if ("number" == typeof e) return this.$ms = e, this.parseFromMilliseconds(), this;
					if ("object" == typeof e) return Object.keys(e).forEach((function(t) {
						n.$d[g(t)] = e[t]
					})), this.calMilliseconds(), this;
					if ("string" == typeof e) {
						var i = e.match(d);
						if (i) {
							var o = i.slice(2).map((function(e) {
								return Number(e)
							}));
							return this.$d.years = o[0], this.$d.months = o[1], this.$d.weeks = o[2], this
								.$d.days = o[3], this.$d.hours = o[4], this.$d.minutes = o[5], this.$d
								.seconds = o[6], this.calMilliseconds(), this
						}
					}
					return this
				}
				var t = e.prototype;
				return t.calMilliseconds = function() {
					var e = this;
					this.$ms = Object.keys(this.$d).reduce((function(t, r) {
						return t + (e.$d[r] || 0) * p[r]
					}), 0)
				}, t.parseFromMilliseconds = function() {
					var e = this.$ms;
					this.$d.years = m(e / u), e %= u, this.$d.months = m(e / l), e %= l, this.$d.days =
						m(e / s), e %= s, this.$d.hours = m(e / a), e %= a, this.$d.minutes = m(e / o),
						e %= o, this.$d.seconds = m(e / i), e %= i, this.$d.milliseconds = e
				}, t.toISOString = function() {
					var e = v(this.$d.years, "Y"),
						t = v(this.$d.months, "M"),
						r = +this.$d.days || 0;
					this.$d.weeks && (r += 7 * this.$d.weeks);
					var n = v(r, "D"),
						i = v(this.$d.hours, "H"),
						o = v(this.$d.minutes, "M"),
						a = this.$d.seconds || 0;
					this.$d.milliseconds && (a += this.$d.milliseconds / 1e3);
					var s = v(a, "S"),
						c = e.negative || t.negative || n.negative || i.negative || o.negative || s
						.negative,
						u = i.format || o.format || s.format ? "T" : "",
						l = (c ? "-" : "") + "P" + e.format + t.format + n.format + u + i.format + o
						.format + s.format;
					return "P" === l || "-P" === l ? "P0D" : l
				}, t.toJSON = function() {
					return this.toISOString()
				}, t.format = function(e) {
					var t = e || "YYYY-MM-DDTHH:mm:ss",
						r = {
							Y: this.$d.years,
							YY: n.s(this.$d.years, 2, "0"),
							YYYY: n.s(this.$d.years, 4, "0"),
							M: this.$d.months,
							MM: n.s(this.$d.months, 2, "0"),
							D: this.$d.days,
							DD: n.s(this.$d.days, 2, "0"),
							H: this.$d.hours,
							HH: n.s(this.$d.hours, 2, "0"),
							m: this.$d.minutes,
							mm: n.s(this.$d.minutes, 2, "0"),
							s: this.$d.seconds,
							ss: n.s(this.$d.seconds, 2, "0"),
							SSS: n.s(this.$d.milliseconds, 3, "0")
						};
					return t.replace(c, (function(e, t) {
						return t || String(r[e])
					}))
				}, t.as = function(e) {
					return this.$ms / p[g(e)]
				}, t.get = function(e) {
					var t = this.$ms,
						r = g(e);
					return "milliseconds" === r ? t %= 1e3 : t = "weeks" === r ? m(t / p[r]) : this.$d[
						r], 0 === t ? 0 : t
				}, t.add = function(e, t, r) {
					var n;
					return n = t ? e * p[g(t)] : f(e) ? e.$ms : h(e, this).$ms, h(this.$ms + n * (r ? -
						1 : 1), this)
				}, t.subtract = function(e, t) {
					return this.add(e, t, !0)
				}, t.locale = function(e) {
					var t = this.clone();
					return t.$l = e, t
				}, t.clone = function() {
					return h(this.$ms, this)
				}, t.humanize = function(e) {
					return r().add(this.$ms, "ms").locale(this.$l).fromNow(!e)
				}, t.milliseconds = function() {
					return this.get("milliseconds")
				}, t.asMilliseconds = function() {
					return this.as("milliseconds")
				}, t.seconds = function() {
					return this.get("seconds")
				}, t.asSeconds = function() {
					return this.as("seconds")
				}, t.minutes = function() {
					return this.get("minutes")
				}, t.asMinutes = function() {
					return this.as("minutes")
				}, t.hours = function() {
					return this.get("hours")
				}, t.asHours = function() {
					return this.as("hours")
				}, t.days = function() {
					return this.get("days")
				}, t.asDays = function() {
					return this.as("days")
				}, t.weeks = function() {
					return this.get("weeks")
				}, t.asWeeks = function() {
					return this.as("weeks")
				}, t.months = function() {
					return this.get("months")
				}, t.asMonths = function() {
					return this.as("months")
				}, t.years = function() {
					return this.get("years")
				}, t.asYears = function() {
					return this.as("years")
				}, e
			}(),
			function(e, t, i) {
				r = i, n = i().$utils(), i.duration = function(e, t) {
					var r = i.locale();
					return h(e, {
						$l: r
					}, t)
				}, i.isDuration = f;
				var o = t.prototype.add,
					a = t.prototype.subtract;
				t.prototype.add = function(e, t) {
					return f(e) && (e = e.asMilliseconds()), o.bind(this)(e, t)
				}, t.prototype.subtract = function(e, t) {
					return f(e) && (e = e.asMilliseconds()), a.bind(this)(e, t)
				}
			})
	}));
dayjs_min.extend(duration);
var ignoreList = ["__cep_sdk_onboard", "__cep_trigger_sdk", "_be_active"],
	moreOP = ["and", "or", "not"],
	CEP_URL = "/service/2/cep_settings/",
	CepRule = function() {
		function CepRule(e, t, r) {
			this.support = !0, this.currentPlan = 1, this.shouldSendEvent = !1, this.staing = !1, this.test = !1, this
				.cepReady = !1, this.eventCache = [], this.storage = new Storage(!1), this.config = e;
			var n = e.channel_domain || decodeUrl(LOG_URL[e.channel || "cn"]);
			this.url = e.cep_url ? "" + e.cep_url : "" + n + CEP_URL, this.reportUrl = "" + n + REPORT_URL, this.key =
				CEPKEY(e.app_id), this.quotasKey = "__tea_cep_plan_quotas_" + this.config.app_id, this.configManager =
				t, this.hook = r, this.isWait = !1, this.eventCache = [], this.test = t.staging
		}
		return CepRule.prototype.init = function() {
			var e = this,
				t = !0,
				r = 0,
				n = 0,
				i = 0,
				o = !1,
				a = this.storage.getItem(this.key) || {};
			if (a && Object.keys(a).length && (o = !0, r = a.last_update_time, i = a.fetch_interval, n = a
					.config_version || 0, t = Date.now() - r > 1e3 * i), t) {
				var s = this.configManager.get(),
					c = s.header,
					u = s.user;
				xhr(this.url, {
					header: c,
					user: u,
					local_time: Date.now(),
					config_version: n
				}, (function(t) {
					t && 0 === t.code ? (a.fetch_interval = t.fetch_interval, a.data = t.data, a
						.last_update_time = Date.now(), a.config_version = t.config_version, e
						.clearQuotas(), e.initState(t.data), e.storage.setItem(e.key, a), t.data
						.forEach((function(t) {
							e.event("__cep_sdk_onboard", t.plan_id)
						}))) : 304 !== t.code && 400 !== t.code || !o ? console.log("code: " + t
						.code + ", request error，please try leater") : (console.log("code: " + t
							.code + ", use old rules~"), a.last_update_time = Date.now(), e.storage
						.setItem(e.key, a), e.initState(a.data))
				}), (function() {
					o ? (e.planData = a.data, e.initState(a.data)) : (e.support = !1, console.log(
						"request error，please try leater"))
				}))
			} else a.last_update_time = Date.now(), this.storage.setItem(this.key, a), console.log(
				"rule still work, use cache"), this.initState(a.data)
		}, CepRule.prototype.initState = function(e) {
			var t = this;
			e && e.length && (this.stateArray = new Map, this.waitArray = new Map, this.planData = e, e.forEach((
				function(e) {
					var r = new Map;
					if (e.pattern && e.pattern.events) {
						var n = 1 === e.pattern.events.length;
						e.pattern.events.forEach((function(e) {
							r.set(e.id, {
								id: e.id,
								isMatch: !1,
								event: null,
								after: e.after || null,
								connection: e.connection || null,
								window: e.window || null,
								matchTime: 0,
								initTime: Date.now(),
								singleRule: n
							})
						})), t.stateArray.set(e.plan_id, {
							patternState: r,
							singleRule: n,
							pattern: {
								aid: e.aid,
								biz_id: e.biz_id,
								end_time: e.end_time,
								start_time: e.start_time,
								web_sdk_version: e.web_sdk_version,
								stage: e.stage
							},
							quotas: e.quotas
						})
					}
				})), this.cepReady = !0, this.dealCache(), console.log(this.stateArray))
		}, CepRule.prototype.check = function(e) {
			var t = Date.now();
			return Date.now() > 1e3 * e.end_time ? (console.log("event rules:" + e.plan_id + " is over"), !1) : t <
				1e3 * e.start_time || t > 1e3 * e.end_time ? (console.log("rule:" + e.plan_id + " time error"), !
				1) : (this.staing = "testing" === e.staing, !(SDK_VERSION < e.web_sdk_version) || (this.support = !
					1, console.log("you sdk version is old，please update to " + e.web_sdk_version +
					" at least"), !1))
		}, CepRule.prototype.dealCache = function() {
			var e = this;
			if (this.eventCache.length) {
				var t = 1;
				this.eventCache.forEach((function(r) {
					e.matchEvent(r), t++
				})), t === this.eventCache.length && (this.eventCache = [])
			}
		}, CepRule.prototype.matchEvent = function(e) {
			if (this.support && (!this.staing || this.test) && e && e.length) try {
				if (!this.cepReady) return void this.eventCache.push(e);
				var t = e[0],
					r = t.header,
					n = t.user,
					i = t.events;
				i.length && i.reverse();
				for (var o = 0; o < i.length; o++) {
					var a = i[o].event;
					if (-1 !== ignoreList.indexOf(a)) return !1;
					this.matchRule(r, n, i[o])
				}
			} catch (s) {
				return void console.log(s.message)
			}
		}, CepRule.prototype.matchRule = function(e, t, r) {
			try {
				for (var n = 0; n < this.planData.length; n++) {
					var i = this.planData[n],
						o = i.plan_id;
					if (this.check(i) && (this.checkQuotas(o) && i.pattern && i.pattern.events))
						for (var a = i.pattern.events, s = 0; s < a.length; s++) {
							if (this.rule(e, t, r, a[s].condition)) {
								var c = this.stateArray.get(o).patternState,
									u = c.get(a[s].id);
								if (this.stateArray.get(o).singleRule) {
									this.changeStatus(o, a[s].id, r), this.publish([r], o, a[s].id);
									break
								}
								if (!u.isMatch) {
									u.after && c.get(u.after).isMatch ? this.changeStatus(o, a[s].id, r) : u
										.after || this.changeStatus(o, a[s].id, r);
									break
								}
							}
						}
				}
				this.statusCheck()
			} catch (l) {
				return void console.log(l.message)
			}
		}, CepRule.prototype.changeStatus = function(e, t, r) {
			var n = this.stateArray.get(e),
				i = n.patternState.get(t);
			i.isMatch = !0, i.event = r, i.matchTime = r.local_time_ms || Date.now(), n.patternState.set(t, i), this
				.stateArray.set(e, n)
		}, CepRule.prototype.statusCheck = function() {
			var e, t, r, n;
			try {
				for (var i = __values(this.stateArray), o = i.next(); !o.done; o = i.next()) {
					var a = __read(o.value, 2),
						s = a[0],
						c = a[1],
						u = c.patternState;
					if (c.isSingle) break;
					try {
						for (var l = __values(u), d = l.next(); !d.done; d = l.next()) {
							var p = __read(d.value, 2),
								f = p[0],
								h = p[1];
							if (h.after && (!h.after || u.get(h.after).isMatch)) {
								if ("NOT_FOLLOWED_BY" === h.connection) {
									h.isMatch ? this.reset(s, f) : Date.now() - u.get(h.after).matchTime > h
										.window ? this.publish([u.get(h.after).event, h.event], s, f) : this
										.startWait(s, f, h);
									break
								}
								h.isMatch ? h.matchTime - u.get(h.after).matchTime <= h.window ? this.publish([u
										.get(h.after).event, h.event
									], s, f) : this.reset(s, f) : Date.now() - u.get(h.after).matchTime > h.window ?
									this.reset(s, f) : this.startWait(s, f, h);
								break
							}
						}
					} catch (g) {
						r = {
							error: g
						}
					} finally {
						try {
							d && !d.done && (n = l.return) && n.call(l)
						} finally {
							if (r) throw r.error
						}
					}
				}
			} catch (_) {
				e = {
					error: _
				}
			} finally {
				try {
					o && !o.done && (t = i.return) && t.call(i)
				} finally {
					if (e) throw e.error
				}
			}
		}, CepRule.prototype.startWait = function(e, t, r) {
			var n = this;
			try {
				this.waitArray.get(e) || this.waitArray.set(e, new Map);
				var i = this.waitArray.get(e);
				if (!i.get(t)) {
					var o = setTimeout((function() {
						var i = n.stateArray.get(e).patternState,
							o = i.get(t);
						if ("NOT_FOLLOWED_BY" === o.connection) !o.isMatch && i.get(o.after).isMatch ||
							o.matchTime - i.get(o.after).matchTime > r.window ? ((a = n.waitArray.get(e)
								.get(t)).triggerWait = !0, n.waitArray.set(e, n.waitArray.get(e)
								.set(t, a)), n.publish([i.get(o.after).event], e, t)) : n.reset(e, t);
						else if ("FOLLOWED_BY" === o.connection) {
							var a;
							if (o.isMatch && i.get(o.after).isMatch)(a = n.waitArray.get(e).get(t))
								.triggerWait = !0, n.waitArray.set(e, n.waitArray.get(e).set(t, a)), n
								.publish([i.get(o.after).event], e, t);
							else n.reset(e, t)
						}
					}), r.window);
					i.set(t, {
						waitFn: o,
						triggerWait: !1
					}), this.waitArray.set(e, i)
				}
			} catch (a) {
				console.log(a.message, a.stack)
			}
		}, CepRule.prototype.rule = function(e, t, r, n) {
			var i = this;
			try {
				var o = r.event,
					a = r.params;
				if (a = JSON.parse(a), -1 !== moreOP.indexOf(n.op)) {
					var s = n.conditions;
					return function r(s) {
						if (s && s.length) {
							for (var c = !1, u = 0; u < s.length; u++) {
								if (-1 !== moreOP.indexOf(s[u].op) && s[u].hasOwnProperty("conditions"))
								return r(s[u].conditions);
								var l = i.scope(s[u].key),
									d = l.scope,
									p = l.key,
									f = l.key2,
									h = d ? "header" === d ? f ? JSON.parse(e[f])[p] : e[p] : "user" === d ? t[
										p] : a[p] : o,
									g = i.calculate(s[u].op, h, s[u].value);
								if ("or" !== n.op) {
									if (!g) return !1;
									c = g
								} else if (g) return !0
							}
							return c
						}
					}(s)
				}
				var c = this.scope(n.key),
					u = c.scope,
					l = c.key,
					d = c.key2,
					p = u ? "header" === u ? d ? JSON.parse(e[d])[l] : e[l] : "user" === u ? t[l] : a[l] : o;
				return this.calculate(n.op, p, n.value)
			} catch (f) {
				return console.log(f.message), !1
			}
		}, CepRule.prototype.publish = function(e, t, r) {
			try {
				var n = this.configManager.get().user,
					i = {
						biz_id: this.stateArray.get(t).pattern.biz_id,
						plan_id: t,
						uid: n.user_id || "",
						did: n.device_id || "",
						uuid: n.user_unique_id,
						events: e,
						extra: {
							url: window.location.href
						}
					};
				this.hook.emit("__cep_match", i), (window.opener || window.parent).postMessage({
					type: "__cep_match",
					data: i
				}, "*"), this.event("__cep_trigger_sdk", t), this.addQuotas(t), this.reset(t, r), console.log(
					this.stateArray)
			} catch (o) {
				return void console.log(o.message)
			}
		}, CepRule.prototype.addQuotas = function(e) {
			var t = this.stateArray.get(e).quotas;
			if (t && t.length) {
				var r = this.storage.getItem(this.quotasKey) || {};
				r[e] || (r[e] = {
					value: 0,
					lastTime: Date.now()
				});
				var n = r[e].value;
				0 === n && (r[e].lastTime = Date.now()), r[e].value = n + 1, this.storage.setItem(this.quotasKey, r)
			}
		}, CepRule.prototype.checkQuotas = function(e) {
			var t = this.stateArray.get(e).quotas,
				r = this.storage.getItem(this.quotasKey) || {};
			if (r[e] || (r[e] = {
					value: 0,
					lastTime: Date.now()
				}), t && t.length) {
				var n = t[0].granularity,
					i = t[0].value;
				if ("per_keyid" !== t[0].type) return !0;
				var o = this.release(n);
				return "all" === o ? !(r[e].value >= i) || (console.log("plan:" + e + " 达到触发上限了, 本次不再触发"), !1) :
					Date.now() - r[e].lastTime >= o ? (r[e].value = 0, r[e].lastTime = Date.now(), this.storage
						.setItem(this.quotasKey, r), !0) : !(r[e].value >= i) || (console.log("plan:" + e +
						" 达到触发上限了~， 本次不再触发"), !1)
			}
			return !0
		}, CepRule.prototype.clearQuotas = function() {
			this.storage.setItem(this.quotasKey, null)
		}, CepRule.prototype.release = function(e) {
			if ("all" === e) return e;
			var t = dayjs_min.duration(e);
			return t ? t.asMilliseconds() : "all"
		}, CepRule.prototype.reset = function(e, t) {
			var r = this.stateArray.get(e);
			if (r.singleRule) {
				var n = r.patternState.get(t);
				n.isMatch = !1, n.event = null, n.matchTime = 0, n.initTime = Date.now(), r.patternState.set(t, n)
			} else r.patternState.forEach((function(e) {
				e.isMatch = !1, e.event = null, e.matchTime = 0, e.initTime = Date.now()
			}));
			this.stateArray.set(e, r);
			var i = this.waitArray.get(e);
			i && i.get(t) && (clearTimeout(i.get(t).waitFn), i.delete(t))
		}, CepRule.prototype.event = function(e, t) {
			try {
				var r = {
						event: e,
						params: JSON.stringify({
							plan_id: t || "",
							biz_id: this.stateArray.get(t).pattern.biz_id
						}),
						local_time_ms: Date.now()
					},
					n = this.configManager.get(),
					i = n.header,
					o = n.user;
				i.custom = JSON.stringify(i.custom);
				var a = {
					events: [r],
					user: o,
					header: i
				};
				xhr(this.reportUrl, [a])
			} catch (s) {
				return void console.log(s.message)
			}
		}, CepRule.prototype.scope = function(e) {
			var t = "",
				r = "";
			if (e.indexOf(".") > -1) {
				var n = e.split(".");
				t = n[0], e = n[1], "header" === t && "custom" === e && (e = n[2], r = n[1])
			}
			return {
				scope: t,
				key: e,
				key2: r
			}
		}, CepRule.prototype.calculate = function(op, paramA, paramB) {
			try {
				if ("=" === op) return paramA === paramB;
				if (-1 !== ["=", "<", ">", ">=", "<=", "!="].indexOf(op)) return eval("" + paramA + op + paramB);
				if (-1 !== ["in", "contains"].indexOf(op)) return -1 !== paramB.indexOf(paramA);
				if (-1 !== ["is not null", "is null"].indexOf(op)) return "is null" === op ? null == paramA :
					null != paramA;
				if (-1 !== ["startswith", "endswith"].indexOf(op)) {
					if ("startswith" === op) return 0 === paramA.indexOf(paramB);
					var start = paramA.length - paramB.length,
						str = paramA.substr(start, paramB.length);
					return str === paramB
				}
			} catch (e) {
				return console.log(e.message), !1
			}
		}, CepRule
	}();

function isNeedElement(e, t) {
	if (void 0 === t && (t = "list"), !e) return !1;
	if (t && "list" === t) {
		if (["LI", "TR", "DL"].includes(e.nodeName)) return !0;
		if (e.dataset && e.dataset.hasOwnProperty("teaIdx")) return !0;
		if (e.hasAttribute && e.hasAttribute("data-tea-idx")) return !0
	} else {
		if (["A", "BUTTON"].includes(e.nodeName)) return !0;
		if (e.dataset && e.dataset.hasOwnProperty("teaContainer")) return !0;
		if (e.hasAttribute && e.hasAttribute("data-tea-container")) return !0
	}
	return !1
}

function getContainer(e) {
	for (var t = e; t && !isNeedElement(t, "container");) {
		if ("HTML" === t.nodeName || "BODY" === t.nodeName) return e;
		t = t.parentElement
	}
	return t || e
}

function getNodeText(e) {
	var t = "";
	return 3 === e.nodeType ? t = e.textContent.trim() : e.dataset && e.dataset.hasOwnProperty("teaTitle") || e
		.hasAttribute("ata-tea-title") ? t = e.getAttribute("data-tea-title") : e.hasAttribute("title") ? t = e
		.getAttribute("title") : "INPUT" === e.nodeName && ["button", "submit"].includes(e.getAttribute("type")) ? t = e
		.getAttribute("value") : "IMG" === e.nodeName && e.getAttribute("alt") && (t = e.getAttribute("alt")), t.slice(
			0, 200)
}

function getText(e) {
	var t = getContainer(e),
		r = [];
	return function e(t) {
		var n = getNodeText(t);
		if (n && -1 === r.indexOf(n) && r.push(n), t.childNodes.length > 0)
			for (var i = t.childNodes, o = 0; o < i.length; o++) 8 !== i[o].nodeType && e(i[o])
	}(t), r
}

function getTextSingle(e) {
	var t = getContainer(e),
		r = "";
	return function e(t) {
		var n = getNodeText(t);
		if (n && (r += n), t.childNodes.length > 0)
			for (var i = t.childNodes, o = 0; o < i.length; o++) 3 === i[o].nodeType && e(i[o])
	}(t), r
}

function ignore(e) {
	for (var t = e; t && t.parentNode;) {
		if (t.hasAttribute("data-tea-ignore")) return !0;
		if ("HTML" === t.nodeName || "body" === t.nodeName) return !1;
		t = t.parentNode
	}
	return !1
}
var elementLevel = function(e) {
		if (e.children.length) {
			var t = e.children;
			return ![].slice.call(t).some((function(e) {
				return e.children.length > 0
			}))
		}
		return !0
	},
	isSVG = function(e) {
		if ("svg" === e.tagName.toLowerCase()) return !0;
		for (var t = e.parentElement, r = !1; t;) "svg" === t.tagName.toLowerCase() ? (t = null, r = !0) : t = t
			.parentElement;
		return r
	};

function isTrack(e, t) {
	if (1 !== e.nodeType) return !1;
	if (!t.svg && isSVG(e)) return !1;
	if (["HTML", "BODY"].includes(e.tagName.toUpperCase())) return !1;
	var r = e;
	return "none" !== r.style.display && (!!isNeedElement(r, "container") || !!elementLevel(r))
}
var Listener = function() {
		function e(e, t, r) {
			var n = this;
			this.clickEvent = function(e) {
					isTrack(e.target, n.options) && n.eventHandel({
						eventType: "dom",
						eventName: "click"
					}, e)
				}, this.changeEvent = function(e) {
					n.eventHandel({
						eventType: "dom",
						eventName: "change"
					}, e)
				}, this.submitEvent = function(e) {
					n.eventHandel({
						eventType: "dom",
						eventName: "submit"
					}, e)
				}, this.getPageViewEvent = function(e, t) {
					n.eventHandel({
						eventType: "dom",
						eventName: "beat"
					}, __assign({
						beat_type: 0
					}, e)), n.eventHandel({
						eventType: "dom",
						eventName: "page_view"
					}, e)
				}, this.getPageLoadEvent = function(e) {
					n.eventHandel({
						eventType: "dom",
						eventName: "page_statistics"
					}, {
						lcp: e
					})
				}, this.config = t.getConfig().eventConfig, this.options = e, this.beatTime = e.beat, this
				.statistics = !1, this.route = r
		}
		return e.prototype.init = function(e) {
			this.eventHandel = e;
			var t = this.config.mode;
			this.addListener(t)
		}, e.prototype.addListener = function(e) {
			var t = this;
			if ("proxy-capturing" === e && (this.config.click && window.document.addEventListener("click", this
						.clickEvent, !0), this.config.change && window.document.addEventListener("change", this
						.changeEvent, !0), this.config.submit && window.document.addEventListener("submit", this
						.submitEvent, !0), this.config.pv && this.route.init("autotrack", this.getPageViewEvent),
					this.config.beat)) {
				try {
					"complete" === document.readyState ? this.beatEvent(this.beatTime) : window.addEventListener(
						"load", (function() {
							t.beatEvent(t.beatTime)
						}));
					var r = 0,
						n = null;
					window.addEventListener("scroll", (function() {
						clearTimeout(n), n = setTimeout(i, 500), r = document.documentElement
							.scrollTop || document.body.scrollTop
					}));
					var i = function() {
						(document.documentElement.scrollTop || document.body.scrollTop) == r && t.eventHandel({
							eventType: "dom",
							eventName: "beat"
						}, {
							beat_type: 1
						})
					}
				} catch (a) {}
				try {
					var o = window.performance && window.performance.getEntriesByType("paint");
					if (o && o.length) new PerformanceObserver((function(e) {
						var r = e.getEntries(),
							n = r[r.length - 1],
							i = n.renderTime || n.loadTime;
						t.statistics || (t.getPageLoadEvent(i), t.statistics = !0)
					})).observe({
						entryTypes: ["largest-contentful-paint"]
					}), setTimeout((function() {
						t.statistics || (t.getPageLoadEvent(o[0].startTime || 0), t.statistics = !0)
					}), 2e3);
					else this.getPageLoadEvent(0)
				} catch (a) {
					this.getPageLoadEvent(0)
				}
			}
		}, e.prototype.removeListener = function() {
			window.document.removeEventListener("click", this.clickEvent, !0), window.document.removeEventListener(
				"change", this.changeEvent, !0), window.document.removeEventListener("submit", this.submitEvent,
				!0)
		}, e.prototype.beatEvent = function(e) {
			var t = this;
			try {
				var r;
				this.eventHandel({
					eventType: "dom",
					eventName: "beat"
				}, {
					beat_type: 3
				}), this.beatTime && (r = setInterval((function() {
					t.eventHandel({
						eventType: "dom",
						eventName: "beat"
					}, {
						beat_type: 2
					})
				}), e)), beforePageUnload((function() {
					t.eventHandel({
						eventType: "dom",
						eventName: "beat",
						eventSend: "becon"
					}, {
						beat_type: 0
					}), t.beatTime && clearInterval(r)
				}))
			} catch (n) {}
		}, e
	}(),
	defaultConfig = {
		eventConfig: {
			mode: "proxy-capturing",
			submit: !1,
			click: !0,
			change: !1,
			pv: !0,
			beat: !0,
			hashTag: !1,
			impr: !1
		},
		scoutConfig: {
			mode: "xpath"
		}
	},
	Config = function() {
		function e(e) {
			this.config = e
		}
		return e.prototype.getConfig = function() {
			return this.config
		}, e.prototype.setConfig = function(e) {
			return this.config = e
		}, e
	}();

function getPositionData(e) {
	if (e) {
		var t = e.getBoundingClientRect(),
			r = t.width,
			n = t.height;
		return {
			left: t.left,
			top: t.top,
			element_width: r,
			element_height: n
		}
	}
}

function getEventData(e, t) {
	void 0 === e && (e = {}), void 0 === t && (t = {});
	var r = e.clientX,
		n = e.clientY,
		i = t.left,
		o = t.top,
		a = r - i >= 0 ? r - i : 0,
		s = n - o >= 0 ? n - o : 0;
	return {
		touch_x: Math.floor(a),
		touch_y: Math.floor(s)
	}
}

function getXpath(e) {
	for (var t = []; null !== e.parentElement;) t.push(e), e = e.parentElement;
	var r = [],
		n = [];
	return t.forEach((function(e) {
		var t = getXpathIndex(e),
			i = t.str,
			o = t.index;
		r.unshift(i), n.unshift(o)
	})), {
		element_path: "/" + r.join("/"),
		positions: n
	}
}

function getXpathIndex(e) {
	if (null === e) return {
		str: "",
		index: 0
	};
	var t = 0,
		r = e.parentElement;
	if (r)
		for (var n = r.children, i = 0; i < n.length && n[i] !== e; i++) n[i].nodeName === e.nodeName && t++;
	return {
		str: [e.nodeName.toLowerCase(), isNeedElement(e, "list") ? "[]" : ""].join(""),
		index: t
	}
}

function getElementData(e, t, r) {
	var n = {
			element_path: "",
			positions: [],
			texts: []
		},
		i = getPositionData(t),
		o = getEventData(e, i),
		a = i.element_width,
		s = i.element_height,
		c = o.touch_x,
		u = o.touch_y,
		l = getXpath(t),
		d = l.element_path,
		p = l.positions,
		f = getText(t),
		h = window.performance.timing.navigationStart,
		g = Date.now() - h,
		_ = p.map((function(e) {
			return "" + e
		})),
		m = null;
	window.TEAVisualEditor.getOriginXpath && (m = window.TEAVisualEditor.getOriginXpath({
			xpath: d,
			positions: _
		})), n.element_path = m && m.xpath || d, n.positions = m && m.positions || _, r && !r.text && (n.texts = f, n
			.element_title = getTextSingle(t)), n.element_width = Math.floor(a), n.element_height = Math.floor(s), n
		.touch_x = c, n.touch_y = u, n.page_manual_key = "", n.elememt_manual_key = "", n.since_page_start_ms = g, n
		.page_start_ms = h;
	var y = getContainer(t);
	return "A" === y.tagName && (n.href = y.getAttribute("href")), "IMG" === t.tagName && (n.src = t.getAttribute(
		"src")), n
}

function getEventData$1(e, t, r, n) {
	return __assign({
		event: e
	}, getElementData(t, r, n), {
		is_html: 1,
		page_key: window.location.href,
		page_title: document.title
	})
}

function getExtraEventData(e, t) {
	try {
		if ("bav2b_change" === e) return t.hasAttribute("data-tea-track") ? {
			value: t.value
		} : {}
	} catch (r) {
		return {}
	}
}
var EventHandle = function() {
		function e(e) {
			this.ignore = {
				text: !1
			}, this.eventName = e && "tea" === e.custom ? {
				click: "__bav_click",
				page: "__bav_page",
				beat: "__bav_beat",
				static: "__bav_page_statistics"
			} : {
				click: "bav2b_click",
				page: "bav2b_page",
				beat: "bav2b_beat",
				static: "bav2b_page_statistics"
			}, e && !1 === e.text && (this.ignore.text = !0)
		}
		return e.prototype.handleEvent = function(e, t) {
			try {
				if (ignore(e.target)) return null;
				var r = "bav2b_click";
				switch (t) {
					case "click":
						return getEventData$1(r = this.eventName.click, e, e.target, this.ignore);
					case "change":
						return __assign({}, getEventData$1(r = "bav2b_change", e, e.target), getExtraEventData(r, e
							.target));
					case "submit":
						return getEventData$1(r = "bav2b_submit", e, e.target)
				}
			} catch (n) {
				return console.error(n), null
			}
		}, e.prototype.handleViewEvent = function(e) {
			e.event = this.eventName.page, e.page_title = document.title, e.page_total_width = window.innerWidth, e
				.page_total_height = window.innerHeight;
			try {
				var t = window.sessionStorage.getItem("_tea_cache_duration");
				if (t) {
					var r = JSON.parse(t);
					e.refer_page_duration_ms = r ? r.duration : "", e.refer_page_title = r ? r.page_title : ""
				} else e.refer_page_duration_ms = "", e.refer_page_title = "";
				e.scroll_width = document.documentElement.scrollLeft ? document.documentElement.scrollLeft + window
					.innerWidth : window.innerWidth, e.scroll_height = document.documentElement.scrollTop ? document
					.documentElement.scrollTop + window.innerHeight : window.innerHeight, e.page_start_ms = window
					.performance.timing.navigationStart
			} catch (n) {
				console.log("page event error " + JSON.stringify(n))
			}
			return e
		}, e.prototype.handleStatisticsEvent = function(e) {
			var t = {};
			t.event = this.eventName.static, t.is_html = 1, t.page_key = location.href, t.refer_page_key = document
				.referrer || "", t.page_title = document.title, t.page_manual_key = "", t.refer_page_manual_key =
				"";
			try {
				var r = e.lcp,
					n = window.performance.timing,
					i = n.loadEventEnd - n.navigationStart;
				t.page_init_cost_ms = parseInt(r || (i > 0 ? i : 0)), t.page_start_ms = n.navigationStart
			} catch (o) {
				console.log("page_statistics event error " + JSON.stringify(o))
			}
			return t
		}, e.prototype.handleBeadtEvent = function(e) {
			e.event = this.eventName.beat, e.is_html = 1, e.page_title = document.title, e.page_manual_key = "";
			try {
				e.page_total_width = document.documentElement.scrollWidth, e.page_total_height = document
					.documentElement.scrollHeight, e.scroll_width = document.documentElement.scrollLeft + window
					.innerWidth, e.scroll_height = document.documentElement.scrollTop + window.innerHeight, e
					.since_page_start_ms = Date.now() - window.performance.timing.navigationStart, e.page_start_ms =
					window.performance.timing.navigationStart
			} catch (t) {
				console.log("beat event error " + JSON.stringify(t))
			}
			return e
		}, e
	}(),
	Request = function() {
		function e(e, t) {
			this.logFunc = e, this.logFuncBecon = t, this.eventNameList = ["report_click_event", "report_change_event",
				"report_submit_event", "report_exposure_event", "report_page_view_event",
				"report_page_statistics_event", "report_beat_event"
			]
		}
		return e.prototype.send = function(e, t) {
			e.eventName;
			var r = e.eventSend,
				n = t.event;
			delete t.event, r && "becon" === r ? this.logFuncBecon(n, t, "autotrack") : this.logFunc(n, t,
				"autotrack")
		}, e.prototype.get = function(e, t) {
			var r = Object.assign({
				headers: {
					"content-type": "application/json"
				},
				method: "GET"
			}, t);
			fetch(e, r)
		}, e.prototype.post = function(e, t) {
			var r = Object.assign({
				headers: {
					"content-type": "application/json"
				},
				method: "POST"
			}, t);
			fetch(e, r)
		}, e
	}(),
	COOKIE_KEY = "_TEA_VE_OPEN",
	COOKIE_KEY_HOST = "_TEA_VE_APIHOST",
	COOKIE_LANG = "lang",
	COOKIE_EDIT_VERISON = "_VISUAL_EDITOR_V",
	COOKIE_EDIT_URL = "_VISUAL_EDITOR_U";

function checkSession() {
	return "1" === js_cookie.get(COOKIE_KEY)
}

function checkSessionHost() {
	var e = js_cookie.get(COOKIE_KEY_HOST);
	try {
		e = JSON.parse(e)
	} catch (t) {}
	return e
}

function checkEditUrl() {
	return js_cookie.get(COOKIE_EDIT_URL)
}

function setSession() {
	try {
		var e = window.TEAVisualEditor.lang = window.TEAVisualEditor.lang || js_cookie.get(COOKIE_LANG),
			t = window.TEAVisualEditor.__editor_ajax_domain = window.TEAVisualEditor.__editor_ajax_domain || js_cookie
			.get(COOKIE_KEY_HOST),
			r = window.TEAVisualEditor.__editor_verison = window.TEAVisualEditor.__editor_verison || js_cookie.get(
				COOKIE_EDIT_VERISON),
			n = window.TEAVisualEditor.__editor_url = window.TEAVisualEditor.__editor_url || js_cookie.get(
				COOKIE_EDIT_URL),
			i = +new Date,
			o = new Date(i + 18e5);
		js_cookie.set(COOKIE_KEY, "1", {
			expires: o
		}), js_cookie.set(COOKIE_KEY_HOST, t, {
			expires: o
		}), js_cookie.set(COOKIE_EDIT_URL, n, {
			expires: o
		}), js_cookie.set(COOKIE_LANG, e, {
			expires: o
		}), js_cookie.set(COOKIE_EDIT_VERISON, r || "", {
			expires: o
		})
	} catch (a) {
		console.log("set cookie err")
	}
}
window.TEAVisualEditor = window.TEAVisualEditor || {};
var EDITOR_URL = "",
	EDITOR_URL_OLD = window.TEAVisualEditor.__editor_url || decodeUrl(EDITOR_URL_OLD_ASC);
EDITOR_URL_OLD = EDITOR_URL_OLD + "?query=" + Date.now();
var EDITOR_URL_NEW = decodeUrl(EDITOR_URL_NEW_ASC) + "?query=" + Date.now(),
	isLoaded$1 = !1;

function loadEditorScript$1(e) {
	var t = e.event,
		r = e.editorUrl,
		n = e.autoTrackInstance;
	e.fromSession, isLoaded$1 || (isLoaded$1 = !0, loadScript(r, (function() {
		dispatchMsg(t, "editorScriptloadSuccess"), n.destroy()
	}), (function() {
		t && dispatchMsg(t, "editorScriptloadError"), isLoaded$1 = !1
	})))
}

function readyToLoadEditor$1(e, t) {
	window.TEAVisualEditor.appId = t.app_id;
	var r = t.channel_domain,
		n = "";
	if (addAllowdOrigin(["*"]), r) {
		var i, o = "";
		try {
			var a = window.performance.getEntriesByType("resource");
			if (a && a.length && (a.forEach((function(e) {
						"script" === e.initiatorType && e.name && -1 !== e.name.indexOf("collect") && (o = e
							.name)
					})), o || document.currentScript && (o = document.currentScript.src), o && (i = o.split("/")) && i
					.length)) {
				n = "https:/";
				for (var s = 2; s < i.length && s !== i.length - 1; s++) n = n + "/" + i[s];
				n += "/visual-editor-rangers"
			}
		} catch (u) {}
	}
	if (init(t, SDK_VERSION), checkSession()) {
		var c = checkSessionHost();
		if (c) window.TEAVisualEditor.__editor_ajax_domain = c, loadEditorScript$1({
			event: null,
			editorUrl: checkEditUrl() || EDITOR_URL_NEW,
			autoTrackInstance: e,
			fromSession: !1
		});
		else loadEditorScript$1({
			event: null,
			editorUrl: EDITOR_URL_OLD,
			autoTrackInstance: e,
			fromSession: !1
		});
		setSession()
	} else try {
		receiveMsg("tea:openVisualEditor", (function(t) {
			var i = t.data;
			if ("string" == typeof t.data) try {
				i = JSON.parse(t.data)
			} catch (u) {
				i = void 0
			}
			if (i) {
				var o = i.referrer,
					a = i.lang;
				if (o ? (window.TEAVisualEditor.__editor_ajax_domain = o, EDITOR_URL = EDITOR_URL_NEW) :
					EDITOR_URL = EDITOR_URL_OLD, r) {
					var s = i.version;
					EDITOR_URL = n ? "" + n + (s ? "-v" + s : "-v1.0.0") + ".js" : EDITOR_URL_NEW,
						window.TEAVisualEditor.__editor_verison = s
				}
				window.TEAVisualEditor.__editor_url = EDITOR_URL, window.TEAVisualEditor.lang = a,
					loadEditorScript$1({
						event: t,
						editorUrl: EDITOR_URL,
						autoTrackInstance: e
					}), setSession()
			}
		})), window.TEAVisualEditor.openAutotrackEditor = function() {
			loadEditorScript$1({
				event: null,
				editorUrl: window.TEAVisualEditor.__editor_url,
				autoTrackInstance: e
			})
		}
	} catch (u) {
		console.log("receive message error")
	}
	try {
		receiveMsg("tea:openHeatMapCore", (function(t) {
			loadEditorScript$1({
				event: t,
				editorUrl: decodeUrl(HOT_PIC_URL) + ".js?query=" + Date.now(),
				autoTrackInstance: e
			})
		}))
	} catch (u) {
		console.log("openHeatMapCore error")
	}
}
var defaultOpt = {
		hashTag: !1,
		impr: !1
	},
	AutoTrack = function() {
		function e() {
			this.autoTrackStart = !1
		}
		return e.prototype.start = function(e, t, r, n) {
			t = Object.assign(defaultOpt, t), this.destroyed = !1, this.options = t, this.logFunc = e, this
				.logFuncBecon = r, this.Config = new Config(defaultConfig), this.Listener = new Listener(t, this
					.Config, n), this.EventHandle = new EventHandle(t), this.Request = new Request(this.logFunc,
					this.logFuncBecon), this.autoTrackStart = !0, this.init()
		}, e.prototype.init = function() {
			this.Listener.init(this.handle.bind(this))
		}, e.prototype.handle = function(e, t) {
			"dom" === e.eventType && this.handleDom(e, t)
		}, e.prototype.handleDom = function(e, t) {
			try {
				var r = e.eventName;
				if ("click" === r || "change" === r || "submit" === r) {
					var n = this.EventHandle.handleEvent(t, r);
					null !== n && this.Request.send({
						eventType: "custom",
						eventName: "report_" + r + "_event",
						extra: {
							methods: "GET"
						}
					}, n)
				} else if ("page_view" === r || "page_statistics" === r) {
					var i = void 0;
					i = "page_view" === r ? this.EventHandle.handleViewEvent(t) : this.EventHandle
						.handleStatisticsEvent(t), this.Request.send({
							eventType: "custom",
							eventName: "report_${eventName}_event",
							extra: {
								methods: "GET"
							}
						}, i)
				} else if ("beat" === r) {
					var o = this.EventHandle.handleBeadtEvent(t),
						a = e.eventSend;
					this.Request.send({
						eventType: "custom",
						eventName: "report_${eventName}_event",
						extra: {
							methods: "GET"
						},
						eventSend: a
					}, o)
				}
			} catch (s) {
				console.log("handel dom event error " + JSON.stringify(s))
			}
		}, e.prototype.destroy = function() {
			if (!this.autoTrackStart) return console.warn(
				"engine is undefined, make sure you have called autoTrack.start()");
			this.autoTrackStart = !1, this.Listener.removeListener()
		}, e
	}(),
	exportAutoTrack = function(e, t, r, n) {
		var i = new AutoTrack,
			o = e.autotrack;
		if (o) {
			var a = {};
			"object" == typeof o && (a = o), i.start(t, a, r, n), readyToLoadEditor$1(i, e)
		} else i.autoTrackStart && i.destroy();
		return null
	},
	exportMethods = ["profileSet", "profileSetOnce", "profileIncrement", "profileUnset", "profileAppend", "getVar",
		"getAbSdkVersion", "onAbSdkVersionChange", "offAbSdkVersionChange", "getABconfig", "openOverlayer",
		"closeOverlayer", "getAllVars", "setExternalAbVersion", "getToken", "destroy"
	],
	Methods = __spread(["init", "config", "send", "start", "predefinePageView", "beconEvent", "on", "clearEventCache",
		"resetStayDuration", "autoInitializationRangers", "setWebIDviaUnionID", "setWebIDviaOpenID"
	], exportMethods),
	getIndex = (lastEventId = +Date.now() + Number(("" + Math.random()).slice(2, 8)), function() {
		return lastEventId += 1
	}),
	lastEventId, Collector = function() {
		function e(e) {
			var t = this;
			this.is_first_time = !1, this.Native = !1, this.staging = !1, this.sdkload = !1, this.initPv = !0, this
				.predefinePageView = function(e, r) {
					if (void 0 === e && (e = {}), t.sdkload) {
						var n = {
								title: document.title || location.pathname,
								url: location.href,
								url_path: location.pathname,
								time: Date.now(),
								referrer: window.document.referrer,
								$is_first_time: "" + t.is_first_time
							},
							i = __assign({}, n, e);
						r ? t.beconEvent("predefine_pageview", i, "pv") : t.event("predefine_pageview", i, "pv")
					} else t.logger.warn("sdk init error, api can not call")
				}, this.getToken = function(e, r) {
					if (!t.sdkload) return t.logger.warn("sdk init error, api can not call, getToken will return {}"),
						void e({});
					var n = !1,
						i = function(r) {
							if (!n) {
								n = !0;
								var i = t._config.get().user;
								return r && (i.tobid = r), e(__assign({}, i))
							}
						};
					r && setTimeout((function() {
						i()
					}), r);
					try {
						t._token._getTobId((function(e) {
							i(e)
						}))
					} catch (o) {
						i()
					}
				}, this.name = e, this._isSend = !1, this.hook = new Hook, this.storage = new Storage(!1)
		}
		return e.prototype.autoInitializationRangers = function(e) {}, e.prototype.init = function(e) {
			var t = this;
			if (!this._inited)
				if (this._inited = !0, e && "object" == typeof e) {
					this.logger = new Logger(this.name, e.log);
					var r = e.app_id,
						n = e.app_key;
					n || r ? r && "number" != typeof r ? this.logger.warn(
							"app_id param is error, must be number, please check !!!") : n && "string" != typeof n ?
						this.logger.warn("app_key is empty, please check!") : (e.channel_domain || -1 !== ["cn",
								"sg", "va"
							].indexOf(e.channel) || (this.logger.warn("channel must be `cn`, `sg`,`va` !!!"), e
								.channel = "cn"), this.Native = e.Native, this._initConfig = e, this.appBridge =
							new AppBridge(this.logger), this.storage.getItem("__tea_cache_first_" + r) ? this
							.is_first_time = !1 : (this.is_first_time = !0, this.storage.setItem(
								"__tea_cache_first_" + r, "1")), this.sdkload = !0, e.Native && this.appBridge
							.bridgeInject() ? this.appBridge.hasStarted((function(r) {
								r || t._init(e)
							})) : this._init(e)) : this.logger.warn("no app_key or app_id please check !!!")
				} else console.warn("init params is error,please check")
		}, e.prototype._init = function(e) {
			var t = this;
			this.autoPV = !0, this.sdkload = !0, this._initConfig = e, this._config = new ConfigManager(e.app_id, e,
				e.configPersist || 0), this.configPersist = e.configPersist || 0, this._config.set("app_id", e
				.app_id), this.hook.on("token-ready", (function() {
				t.callbackSend ? t._isSend ? t._event && t._event.report() : t.start() : t._event && t
					._event.report()
			})), this._session = new Session(e.app_key || e.app_id, e), this._token = new Token(e, this._config,
				this.hook, this._session), this.plugin = new Plugin(this, e, this.event.bind(this), this
				.beconEvent.bind(this), this.hook), e.cep && (this.match = new CepRule(e, this._config, this
				.hook)), this._event = new EventManager(this, e, this._config, this._token, this.plugin, this
				._session, this.match), this.tracer = new Tracer(this, e, this._processEvent.bind(this), this
				._event), this.spaView = new Ruote(e), this._token._getToken();
			try {
				e.autotrack && exportAutoTrack(e, this.event.bind(this), this.beconEvent.bind(this), this.spaView)
			} catch (r) {
				console.log("e")
			}
		}, e.prototype.config = function(e) {
			var t = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(r) {
				if (r)
					for (var n in e) "user_unique_id" === n ? t.appBridge.setUserUniqueId(e[n]) : e[n] ?
						t.appBridge.addHeaderInfo(n, e[n]) : t.appBridge.removeHeaderInfo(n);
				else t._setConfig(e)
			})) : this._setConfig(e) : this.logger.warn("sdk init error, api can not call")
		}, e.prototype._setConfig = function(e) {
			if (this._inited)
				if (e && "object" == typeof e) {
					e.disable_auto_pv && (this.autoPV = !1, delete e.disable_auto_pv), e._staging_flag && 1 === e
						._staging_flag && (this.staging = !0);
					var t = __assign({}, e);
					if (this.configPersist) {
						var r = this._config.getStore();
						r && (t = Object.assign(r, e)), this._config.setStore(e)
					}
					for (var n in t) "user_unique_id" !== n ? "web_id" !== n ? this._config.set(n, t[n]) : this
						._token._setWebid(t[n]) : this._token._setUuid(t[n])
				} else this.logger.warn("config params is error, please check");
			else this.logger.warn("config must be use after function init")
		}, e.prototype.on = function(e, t) {
			try {
				e && "string" == typeof e && "function" == typeof t && this.hook.on(e, t)
			} catch (r) {}
		}, e.prototype.send = function() {
			this.start()
		}, e.prototype.start = function() {
			var e = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(t) {
				t ? (e.logger.info("jsbrige开启，事件将由原生 sdk进行上报"), e.predefinePageView()) : e._start()
			})) : this._start() : this.logger.warn("sdk init error, api can not call")
		}, e.prototype._start = function() {
			var e = this;
			if (this._token.isTokenReady()) {
				if (this._isSend) return void this.logger.warn(
					"method start can not be use over one time , please check !!");
				this._isSend = !0, this.logger.info("userInfo:" + JSON.stringify(this._config.get("user"))), this
					.logger.info("sdk is ready,version is " + SDK_VERSION + ". you can report now !!!"), this
					.match && this.match.init(), this._event.setReady(), this.autoPV && (this.predefinePageView(),
						this.initPv = !1), this._initConfig.spa && this.spaView.add("spa", this.predefinePageView),
					this.hook.on("token-change", (function(t) {
						e.initPv || "webid" !== t || e._initConfig.enable_custom_webid || e
							.predefinePageView({}, !0), e.logger.info("token change, new userinfo:" + JSON
								.stringify(e._config.get("user"))), "uuid" === t && e.plugin && e.plugin
							.ab && e.plugin.ab.refetch()
					}));
				try {
					(window.opener || window.parent).postMessage("[tea-sdk]ready", "*")
				} catch (t) {}
				this.profile = new Profile(this._processEvent.bind(this), this._event, this._initConfig), this
					.plugin && this.plugin.ab && this.plugin.ab.init(this._config.get())
			} else this.callbackSend = !0
		}, e.prototype.beconEvent = function(e, t, r) {
			var n = this;
			void 0 === t && (t = {});
			var i = r || "log",
				o = [];
			o.push([e, t]), o = o.map((function(e) {
				return n._processEvent(e[0], e[1])
			})), this._dealEvent(!0, o, i), this._addTracerCount(i)
		}, e.prototype.event = function() {
			for (var e = this, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
			if (this.sdkload) {
				var n = __read(t, 1),
					i = n[0],
					o = [];
				"Array" !== Object.prototype.toString.call(i).slice(8, -1) ? o[0] = t : o = t, o = o.map((function(
					t) {
					return e._processEvent(t[0], t[1])
				})), this._dealEvent(!1, o, "log"), this._addTracerCount("log")
			} else this.logger.warn("sdk init error, api can not call")
		}, e.prototype._dealEvent = function(e, t, r) {
			var n = this;
			if (this.sdkload)
				if (this.Native && this.appBridge.bridgeInject()) {
					if ("autotrack" === r || "sdk" === r) return;
					this.appBridge.hasStarted((function(r) {
						r ? t && t.length && t.forEach((function(e) {
							var t = e.event,
								r = e.params;
							n.appBridge.onEventV3(t, JSON.stringify(r))
						})) : n._commonEvent(e, t)
					}))
				} else this._commonEvent(e, t);
			else this.logger.warn("sdk init error, api can not call")
		}, e.prototype._commonEvent = function(e, t) {
			e ? this._event.beconEvent(t) : this._event.event(t), this._session._updateSessionId(), this.plugin &&
				this.plugin.session && this.plugin.session.process()
		}, e.prototype._addTracerCount = function(e) {
			this.sdkload ? this.Native || this.staging || this.tracer.addCount(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype._processEvent = function(e, t) {
			try {
				var r = e;
				/^event\./.test(e) && (r = e.slice(6));
				var n, i = t;
				return "object" != typeof i && (i = {}), i.profile ? delete i.profile : i.event_index = getIndex(),
					i.local_ms ? (n = i.local_ms, delete i.local_ms) : n = +new Date, {
						event: r,
						params: i,
						local_time_ms: n,
						is_bav: this._initConfig.autotrack ? 1 : 0
					}
			} catch (o) {
				return {
					event: e,
					params: t
				}
			}
		}, e.prototype.clearEventCache = function() {
			this._event.clearEventCache()
		}, e.prototype.setWebIDviaUnionID = function(e) {
			if (e) {
				var t = hashCode(e);
				this.config({
					web_id: "" + t,
					wechat_unionid: e
				}), this.hook.emit("custom-webid")
			}
		}, e.prototype.setWebIDviaOpenID = function(e) {
			if (e) {
				var t = hashCode(e);
				this.config({
					web_id: "" + t,
					wechat_openid: e
				}), this.hook.emit("custom-webid")
			}
		}, e.prototype.resetStayDuration = function(e, t, r) {
			this.sdkload ? this.plugin.stay ? this.plugin.stay && this.plugin.stay.reset(e, t, r) : this.logger
				.info("stayDuration is not init") : this.logger.warn("sdk init error, api can not call")
		}, e.prototype.profileSet = function(e) {
			var t = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(r) {
				r ? t.appBridge.profileSet(JSON.stringify(e)) : t.profile && t.profile.setProfile(e)
			})) : this.profile && this.profile.setProfile(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.profileSetOnce = function(e) {
			var t = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(r) {
				r ? t.appBridge.profileSetOnce(JSON.stringify(e)) : t.profile && t.profile
					.setOnceProfile(e)
			})) : this.profile && this.profile.setOnceProfile(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.profileIncrement = function(e) {
			var t = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(r) {
				r ? t.appBridge.profileIncrement(JSON.stringify(e)) : t.profile && t.profile
					.incrementProfile(e)
			})) : this.profile && this.profile.incrementProfile(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.profileUnset = function(e) {
			var t = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(r) {
				r ? t.appBridge.profileUnset(e) : t.profile && t.profile.unsetProfile(e)
			})) : this.profile && this.profile.unsetProfile(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.profileAppend = function(e) {
			var t = this;
			this.sdkload ? this.Native && this.appBridge.bridgeInject() ? this.appBridge.hasStarted((function(r) {
				r ? t.appBridge.profileAppend(JSON.stringify(e)) : t.profile && t.profile.appendProfile(
					e)
			})) : this.profile && this.profile.appendProfile(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.setExternalAbVersion = function(e) {
			this.sdkload ? e && this.plugin.ab && this.plugin.ab._setAbVersion(e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.getVar = function(e, t, r) {
			var n = this;
			if (!this.sdkload) return this.logger.warn(
				"sdk init error, api can not call, getVar return default value"), void r(t);
			this.hook.on("token-error", (function() {
				n.logger.warn("sdk init error, getVar return default value"), r(t)
			})), this.plugin.ab && this.plugin.ab.getVar(e, t, r)
		}, e.prototype.getABconfig = function(e, t) {
			if (!this.sdkload) return this.logger.warn("sdk init error, api can not call, getABconfig return null"),
				void t(null);
			this.plugin.ab && this.plugin.ab._getABconfig(e, t)
		}, e.prototype.getAbSdkVersion = function(e) {
			if (!this.sdkload) return this.logger.warn(
				"sdk init error, api can not call, getAbSdkVersion return null"), void e(null);
			this.plugin.ab && this.plugin.ab.getAbSdkVersion(e)
		}, e.prototype.onAbSdkVersionChange = function(e) {
			this.sdkload ? this.hook.on("onAbSdkVersionChange", e) : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.offAbSdkVersionChange = function(e) {
			this.sdkload ? e ? this.hook.off("onAbSdkVersionChange", e) : this.hook.off("onAbSdkVersionChange") :
				this.logger.warn("sdk init error, api can not call")
		}, e.prototype.openOverlayer = function() {
			this.sdkload ? this.plugin.ab && this.plugin.ab.openOverlayer() : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.closeOverlayer = function() {
			this.sdkload ? this.plugin.ab && this.plugin.ab.closeOverlayer() : this.logger.warn(
				"sdk init error, api can not call")
		}, e.prototype.getAllVars = function(e) {
			var t = this;
			if (!this.sdkload) return this.logger.warn("sdk init error, api can not call, getAllVars return null"),
				void e(null);
			this.hook.on("token-error", (function() {
				t.logger.warn("sdk init error, getallVar return null"), e(null)
			})), this.plugin.ab && this.plugin.ab.getAllVars(e)
		}, e.prototype.destroy = function() {
			this.destroyInstance || (this.destroyInstance = !0, this.hook.off("token-ready"))
		}, e
	}();

function _defineProperty(e, t, r) {
	return t in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e
}
var CollectAsync = function(e) {
		var t = this;
		return _defineProperty(this, "_exportCollect", (function() {
				for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
				t._isProcess ? t._executeCmd.apply(t, r) : (t.cmdQueue.push(r), t._processCmd())
			})), _defineProperty(this, "_processCmd", (function() {
				if (0 !== t.cmdQueue.length) {
					var e, r, n, i, o;
					r = t.cmdQueue, n = "init", i = "0", o = -1, r.forEach((function(e, t) {
						(void 0 !== i ? e[i] : e) === n && (o = t)
					})), -1 !== (e = o) && (t._isProcess = !0, t._executeCmd.apply(t, t.cmdQueue[e]), t
						.cmdQueue.forEach((function(r, n) {
							n !== e && t._executeCmd.apply(t, r)
						})), t.cmdQueue = [])
				}
			})), _defineProperty(this, "_executeCmd", (function() {
				for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
				var i, o, a = r[0];
				Methods.indexOf(a) > -1 ? (i = t.colloctor)[a].apply(i, r.slice(1)) : (o = t.colloctor).event
					.apply(o, r)
			})), this.cmdQueue = [], this.name = e, this.colloctor = new Collector(e), this._isProcess = !1, this
			._alias = {}, this._processCmd(), Methods.forEach((function(e) {
				t._exportCollect[e] = t._exportCollect.bind(t, e)
			})), this._exportCollect
	},
	insMap = {},
	CmdMap = {},
	getInstance = function(e) {
		return insMap[e] || (insMap[e] = new CollectAsync(e)), insMap[e]
	},
	getCmdArray = function(e) {
		return CmdMap[e] || (CmdMap[e] = []), CmdMap[e]
	},
	processCmdArray = function(e) {
		try {
			var t = __read(e),
				r = t[0],
				n = t.slice(1);
			if (!r) return void console.error("the eventName is: " + r + ", error, stop report, please check");
			var i = r.split(".");
			if (1 === i.length) getCmdArray("default").push(__spread([r], n));
			else if (2 === i.length) "event" === i[0] ? getCmdArray("default").push(__spread([r], n)) : getCmdArray(i[
				0]).push(__spread([i[1]], n));
			else {
				var o = i[0],
					a = [i[1], i[2]].join(".");
				getCmdArray(o).push(__spread([a], n))
			}
		} catch (s) {
			console.log(s)
		}
	},
	processCmd = function() {
		defaultClient.q.forEach((function(e) {
			var t = [].slice.call(e);
			"Array" === Object.prototype.toString.call(t[0]).slice(8, -1) ? t.forEach((function(e) {
				processCmdArray(e)
			})) : processCmdArray(t)
		})), Object.keys(CmdMap).forEach((function(e) {
			CmdMap[e].forEach((function(t) {
				getInstance(e).apply(void 0, __spread(t))
			})), CmdMap[e] = []
		})), defaultClient.q = []
	},
	defaultClient = function e() {
		for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
		e.q.push(t), processCmd()
	};

function tea(...e) {
	defaultClient(...e)
}
defaultClient.q = [], defaultClient.l = Date.now(), defaultClient._instanceMap = insMap, defaultClient._instanceCmdMap =
	CmdMap, Methods.forEach((function(e) {
		defaultClient[e] = defaultClient.bind(null, e)
	})), processCmd();
const TEA_APP_ID = 6587;

function initTea() {
	defaultClient.init({
		app_id: TEA_APP_ID,
		channel: "cn",
		log: false,
		enable_ab_test: !1,
		enable_stay_duration: !1
	}), defaultClient.config({
		_staging_flag: 0,
		disable_auto_pv: !0,
		user_is_login: 0,
		platform: "Web"
	}), defaultClient.start()
}
var bridge = {
	getLogicCode: getLogicCode,
	getInstallChannel: getInstallChannel,
	tea: tea
};

function getAugmentedNamespace(e) {
	if (e.__esModule) return e;
	var t = Object.defineProperty({}, "__esModule", {
		value: !0
	});
	return Object.keys(e).forEach((function(r) {
		var n = Object.getOwnPropertyDescriptor(e, r);
		Object.defineProperty(t, r, n.get ? n : {
			enumerable: !0,
			get: function() {
				return e[r]
			}
		})
	})), t
}
var shams = function() {
		if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
		if ("symbol" == typeof Symbol.iterator) return !0;
		var e = {},
			t = Symbol("test"),
			r = Object(t);
		if ("string" == typeof t) return !1;
		if ("[object Symbol]" !== Object.prototype.toString.call(t)) return !1;
		if ("[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
		for (t in e[t] = 42, e) return !1;
		if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
		if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return !1;
		var n = Object.getOwnPropertySymbols(e);
		if (1 !== n.length || n[0] !== t) return !1;
		if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
		if ("function" == typeof Object.getOwnPropertyDescriptor) {
			var i = Object.getOwnPropertyDescriptor(e, t);
			if (42 !== i.value || !0 !== i.enumerable) return !1
		}
		return !0
	},
	origSymbol = "undefined" != typeof Symbol && Symbol,
	hasSymbolSham = shams,
	hasSymbols$1 = function() {
		return "function" == typeof origSymbol && ("function" == typeof Symbol && ("symbol" == typeof origSymbol(
			"foo") && ("symbol" == typeof Symbol("bar") && hasSymbolSham())))
	},
	ERROR_MESSAGE = "Function.prototype.bind called on incompatible ",
	slice = Array.prototype.slice,
	toStr$1 = Object.prototype.toString,
	funcType = "[object Function]",
	implementation$1 = function(e) {
		var t = this;
		if ("function" != typeof t || toStr$1.call(t) !== funcType) throw new TypeError(ERROR_MESSAGE + t);
		for (var r, n = slice.call(arguments, 1), i = function() {
				if (this instanceof r) {
					var i = t.apply(this, n.concat(slice.call(arguments)));
					return Object(i) === i ? i : this
				}
				return t.apply(e, n.concat(slice.call(arguments)))
			}, o = Math.max(0, t.length - n.length), a = [], s = 0; s < o; s++) a.push("$" + s);
		if (r = Function("binder", "return function (" + a.join(",") + "){ return binder.apply(this,arguments); }")(i),
			t.prototype) {
			var c = function() {};
			c.prototype = t.prototype, r.prototype = new c, c.prototype = null
		}
		return r
	},
	implementation = implementation$1,
	functionBind = Function.prototype.bind || implementation,
	bind$1 = functionBind,
	src = bind$1.call(Function.call, Object.prototype.hasOwnProperty),
	undefined$1, $SyntaxError = SyntaxError,
	$Function = Function,
	$TypeError$1 = TypeError,
	getEvalledConstructor = function(e) {
		try {
			return $Function('"use strict"; return (' + e + ").constructor;")()
		} catch (t) {}
	},
	$gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) try {
	$gOPD({}, "")
} catch (e) {
	$gOPD = null
}
var throwTypeError = function() {
		throw new $TypeError$1
	},
	ThrowTypeError = $gOPD ? function() {
		try {
			return throwTypeError
		} catch (e) {
			try {
				return $gOPD(arguments, "callee").get
			} catch (t) {
				return throwTypeError
			}
		}
	}() : throwTypeError,
	hasSymbols = hasSymbols$1(),
	getProto = Object.getPrototypeOf || function(e) {
		return e.__proto__
	},
	needsEval = {},
	TypedArray = "undefined" == typeof Uint8Array ? undefined$1 : getProto(Uint8Array),
	INTRINSICS = {
		"%AggregateError%": "undefined" == typeof AggregateError ? undefined$1 : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? undefined$1 : ArrayBuffer,
		"%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
		"%AsyncFromSyncIteratorPrototype%": undefined$1,
		"%AsyncFunction%": needsEval,
		"%AsyncGenerator%": needsEval,
		"%AsyncGeneratorFunction%": needsEval,
		"%AsyncIteratorPrototype%": needsEval,
		"%Atomics%": "undefined" == typeof Atomics ? undefined$1 : Atomics,
		"%BigInt%": "undefined" == typeof BigInt ? undefined$1 : BigInt,
		"%Boolean%": Boolean,
		"%DataView%": "undefined" == typeof DataView ? undefined$1 : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": Error,
		"%eval%": eval,
		"%EvalError%": EvalError,
		"%Float32Array%": "undefined" == typeof Float32Array ? undefined$1 : Float32Array,
		"%Float64Array%": "undefined" == typeof Float64Array ? undefined$1 : Float64Array,
		"%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? undefined$1 : FinalizationRegistry,
		"%Function%": $Function,
		"%GeneratorFunction%": needsEval,
		"%Int8Array%": "undefined" == typeof Int8Array ? undefined$1 : Int8Array,
		"%Int16Array%": "undefined" == typeof Int16Array ? undefined$1 : Int16Array,
		"%Int32Array%": "undefined" == typeof Int32Array ? undefined$1 : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		"%JSON%": "object" == typeof JSON ? JSON : undefined$1,
		"%Map%": "undefined" == typeof Map ? undefined$1 : Map,
		"%MapIteratorPrototype%": "undefined" != typeof Map && hasSymbols ? getProto((new Map)[Symbol.iterator]()) :
			undefined$1,
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": Object,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": "undefined" == typeof Promise ? undefined$1 : Promise,
		"%Proxy%": "undefined" == typeof Proxy ? undefined$1 : Proxy,
		"%RangeError%": RangeError,
		"%ReferenceError%": ReferenceError,
		"%Reflect%": "undefined" == typeof Reflect ? undefined$1 : Reflect,
		"%RegExp%": RegExp,
		"%Set%": "undefined" == typeof Set ? undefined$1 : Set,
		"%SetIteratorPrototype%": "undefined" != typeof Set && hasSymbols ? getProto((new Set)[Symbol.iterator]()) :
			undefined$1,
		"%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? undefined$1 : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": hasSymbols ? getProto("" [Symbol.iterator]()) : undefined$1,
		"%Symbol%": hasSymbols ? Symbol : undefined$1,
		"%SyntaxError%": $SyntaxError,
		"%ThrowTypeError%": ThrowTypeError,
		"%TypedArray%": TypedArray,
		"%TypeError%": $TypeError$1,
		"%Uint8Array%": "undefined" == typeof Uint8Array ? undefined$1 : Uint8Array,
		"%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? undefined$1 : Uint8ClampedArray,
		"%Uint16Array%": "undefined" == typeof Uint16Array ? undefined$1 : Uint16Array,
		"%Uint32Array%": "undefined" == typeof Uint32Array ? undefined$1 : Uint32Array,
		"%URIError%": URIError,
		"%WeakMap%": "undefined" == typeof WeakMap ? undefined$1 : WeakMap,
		"%WeakRef%": "undefined" == typeof WeakRef ? undefined$1 : WeakRef,
		"%WeakSet%": "undefined" == typeof WeakSet ? undefined$1 : WeakSet
	},
	doEval = function e(t) {
		var r;
		if ("%AsyncFunction%" === t) r = getEvalledConstructor("async function () {}");
		else if ("%GeneratorFunction%" === t) r = getEvalledConstructor("function* () {}");
		else if ("%AsyncGeneratorFunction%" === t) r = getEvalledConstructor("async function* () {}");
		else if ("%AsyncGenerator%" === t) {
			var n = e("%AsyncGeneratorFunction%");
			n && (r = n.prototype)
		} else if ("%AsyncIteratorPrototype%" === t) {
			var i = e("%AsyncGenerator%");
			i && (r = getProto(i.prototype))
		}
		return INTRINSICS[t] = r, r
	},
	LEGACY_ALIASES = {
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": ["Array", "prototype", "entries"],
		"%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
		"%ArrayProto_keys%": ["Array", "prototype", "keys"],
		"%ArrayProto_values%": ["Array", "prototype", "values"],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": ["Object", "prototype", "toString"],
		"%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": ["Promise", "prototype", "then"],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	},
	bind = functionBind,
	hasOwn$1 = src,
	$concat = bind.call(Function.call, Array.prototype.concat),
	$spliceApply = bind.call(Function.apply, Array.prototype.splice),
	$replace = bind.call(Function.call, String.prototype.replace),
	$strSlice = bind.call(Function.call, String.prototype.slice),
	rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
	reEscapeChar = /\\(\\)?/g,
	stringToPath = function(e) {
		var t = $strSlice(e, 0, 1),
			r = $strSlice(e, -1);
		if ("%" === t && "%" !== r) throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
		if ("%" === r && "%" !== t) throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
		var n = [];
		return $replace(e, rePropName, (function(e, t, r, i) {
			n[n.length] = r ? $replace(i, reEscapeChar, "$1") : t || e
		})), n
	},
	getBaseIntrinsic = function(e, t) {
		var r, n = e;
		if (hasOwn$1(LEGACY_ALIASES, n) && (n = "%" + (r = LEGACY_ALIASES[n])[0] + "%"), hasOwn$1(INTRINSICS, n)) {
			var i = INTRINSICS[n];
			if (i === needsEval && (i = doEval(n)), void 0 === i && !t) throw new $TypeError$1("intrinsic " + e +
				" exists, but is not available. Please file an issue!");
			return {
				alias: r,
				name: n,
				value: i
			}
		}
		throw new $SyntaxError("intrinsic " + e + " does not exist!")
	},
	getIntrinsic = function(e, t) {
		if ("string" != typeof e || 0 === e.length) throw new $TypeError$1("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && "boolean" != typeof t) throw new $TypeError$1(
			'"allowMissing" argument must be a boolean');
		var r = stringToPath(e),
			n = r.length > 0 ? r[0] : "",
			i = getBaseIntrinsic("%" + n + "%", t),
			o = i.name,
			a = i.value,
			s = !1,
			c = i.alias;
		c && (n = c[0], $spliceApply(r, $concat([0, 1], c)));
		for (var u = 1, l = !0; u < r.length; u += 1) {
			var d = r[u],
				p = $strSlice(d, 0, 1),
				f = $strSlice(d, -1);
			if (('"' === p || "'" === p || "`" === p || '"' === f || "'" === f || "`" === f) && p !== f)
			throw new $SyntaxError("property names with quotes must have matching quotes");
			if ("constructor" !== d && l || (s = !0), hasOwn$1(INTRINSICS, o = "%" + (n += "." + d) + "%")) a =
				INTRINSICS[o];
			else if (null != a) {
				if (!(d in a)) {
					if (!t) throw new $TypeError$1("base intrinsic for " + e +
						" exists, but the property is not available.");
					return
				}
				if ($gOPD && u + 1 >= r.length) {
					var h = $gOPD(a, d);
					a = (l = !!h) && "get" in h && !("originalValue" in h.get) ? h.get : a[d]
				} else l = hasOwn$1(a, d), a = a[d];
				l && !s && (INTRINSICS[o] = a)
			}
		}
		return a
	},
	callBind$1 = {
		exports: {}
	};
! function(t) {
	var r = functionBind,
		n = getIntrinsic,
		i = n("%Function.prototype.apply%"),
		o = n("%Function.prototype.call%"),
		a = n("%Reflect.apply%", !0) || r.call(o, i),
		s = n("%Object.getOwnPropertyDescriptor%", !0),
		c = n("%Object.defineProperty%", !0),
		u = n("%Math.max%");
	if (c) try {
		c({}, "a", {
			value: 1
		})
	} catch (e) {
		c = null
	}
	t.exports = function(e) {
		var t = a(r, o, arguments);
		if (s && c) {
			var n = s(t, "length");
			n.configurable && c(t, "length", {
				value: 1 + u(0, e.length - (arguments.length - 1))
			})
		}
		return t
	};
	var l = function() {
		return a(r, i, arguments)
	};
	c ? c(t.exports, "apply", {
		value: l
	}) : t.exports.apply = l
}(callBind$1);
var GetIntrinsic$1 = getIntrinsic,
	callBind = callBind$1.exports,
	$indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf")),
	callBound$1 = function(e, t) {
		var r = GetIntrinsic$1(e, !!t);
		return "function" == typeof r && $indexOf(e, ".prototype.") > -1 ? callBind(r) : r
	},
	__viteBrowserExternal = {},
	__viteBrowserExternal$1 = Object.freeze({
		__proto__: null,
		[Symbol.toStringTag]: "Module",
		default: __viteBrowserExternal
	}),
	require$$0 = getAugmentedNamespace(__viteBrowserExternal$1),
	hasMap = "function" == typeof Map && Map.prototype,
	mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype,
		"size") : null,
	mapSize = hasMap && mapSizeDescriptor && "function" == typeof mapSizeDescriptor.get ? mapSizeDescriptor.get : null,
	mapForEach = hasMap && Map.prototype.forEach,
	hasSet = "function" == typeof Set && Set.prototype,
	setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype,
		"size") : null,
	setSize = hasSet && setSizeDescriptor && "function" == typeof setSizeDescriptor.get ? setSizeDescriptor.get : null,
	setForEach = hasSet && Set.prototype.forEach,
	hasWeakMap = "function" == typeof WeakMap && WeakMap.prototype,
	weakMapHas = hasWeakMap ? WeakMap.prototype.has : null,
	hasWeakSet = "function" == typeof WeakSet && WeakSet.prototype,
	weakSetHas = hasWeakSet ? WeakSet.prototype.has : null,
	hasWeakRef = "function" == typeof WeakRef && WeakRef.prototype,
	weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null,
	booleanValueOf = Boolean.prototype.valueOf,
	objectToString = Object.prototype.toString,
	functionToString = Function.prototype.toString,
	match = String.prototype.match,
	bigIntValueOf = "function" == typeof BigInt ? BigInt.prototype.valueOf : null,
	gOPS = Object.getOwnPropertySymbols,
	symToString = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null,
	hasShammedSymbols = "function" == typeof Symbol && "object" == typeof Symbol.iterator,
	isEnumerable = Object.prototype.propertyIsEnumerable,
	gPO = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array
		.prototype ? function(e) {
			return e.__proto__
		} : null),
	inspectCustom = require$$0.custom,
	inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null,
	toStringTag = "function" == typeof Symbol && void 0 !== Symbol.toStringTag ? Symbol.toStringTag : null,
	objectInspect = function e(t, r, n, i) {
		var o = r || {};
		if (has$3(o, "quoteStyle") && "single" !== o.quoteStyle && "double" !== o.quoteStyle) throw new TypeError(
			'option "quoteStyle" must be "single" or "double"');
		if (has$3(o, "maxStringLength") && ("number" == typeof o.maxStringLength ? o.maxStringLength < 0 && o
				.maxStringLength !== 1 / 0 : null !== o.maxStringLength)) throw new TypeError(
			'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
		var a = !has$3(o, "customInspect") || o.customInspect;
		if ("boolean" != typeof a && "symbol" !== a) throw new TypeError(
			"option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (has$3(o, "indent") && null !== o.indent && "\t" !== o.indent && !(parseInt(o.indent, 10) === o.indent && o
				.indent > 0)) throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
		if (void 0 === t) return "undefined";
		if (null === t) return "null";
		if ("boolean" == typeof t) return t ? "true" : "false";
		if ("string" == typeof t) return inspectString(t, o);
		if ("number" == typeof t) return 0 === t ? 1 / 0 / t > 0 ? "0" : "-0" : String(t);
		if ("bigint" == typeof t) return String(t) + "n";
		var s = void 0 === o.depth ? 5 : o.depth;
		if (void 0 === n && (n = 0), n >= s && s > 0 && "object" == typeof t) return isArray$4(t) ? "[Array]" :
			"[Object]";
		var c = getIndent(o, n);
		if (void 0 === i) i = [];
		else if (indexOf(i, t) >= 0) return "[Circular]";

		function u(t, r, a) {
			if (r && (i = i.slice()).push(r), a) {
				var s = {
					depth: o.depth
				};
				return has$3(o, "quoteStyle") && (s.quoteStyle = o.quoteStyle), e(t, s, n + 1, i)
			}
			return e(t, o, n + 1, i)
		}
		if ("function" == typeof t) {
			var l = nameOf(t),
				d = arrObjKeys(t, u);
			return "[Function" + (l ? ": " + l : " (anonymous)") + "]" + (d.length > 0 ? " { " + d.join(", ") + " }" :
				"")
		}
		if (isSymbol(t)) {
			var p = hasShammedSymbols ? String(t).replace(/^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(t);
			return "object" != typeof t || hasShammedSymbols ? p : markBoxed(p)
		}
		if (isElement(t)) {
			for (var f = "<" + String(t.nodeName).toLowerCase(), h = t.attributes || [], g = 0; g < h.length; g++) f +=
				" " + h[g].name + "=" + wrapQuotes(quote(h[g].value), "double", o);
			return f += ">", t.childNodes && t.childNodes.length && (f += "..."), f += "</" + String(t.nodeName)
				.toLowerCase() + ">"
		}
		if (isArray$4(t)) {
			if (0 === t.length) return "[]";
			var _ = arrObjKeys(t, u);
			return c && !singleLineValues(_) ? "[" + indentedJoin(_, c) + "]" : "[ " + _.join(", ") + " ]"
		}
		if (isError(t)) {
			var m = arrObjKeys(t, u);
			return 0 === m.length ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + m.join(", ") + " }"
		}
		if ("object" == typeof t && a) {
			if (inspectSymbol && "function" == typeof t[inspectSymbol]) return t[inspectSymbol]();
			if ("symbol" !== a && "function" == typeof t.inspect) return t.inspect()
		}
		if (isMap(t)) {
			var y = [];
			return mapForEach.call(t, (function(e, r) {
				y.push(u(r, t, !0) + " => " + u(e, t))
			})), collectionOf("Map", mapSize.call(t), y, c)
		}
		if (isSet(t)) {
			var v = [];
			return setForEach.call(t, (function(e) {
				v.push(u(e, t))
			})), collectionOf("Set", setSize.call(t), v, c)
		}
		if (isWeakMap(t)) return weakCollectionOf("WeakMap");
		if (isWeakSet(t)) return weakCollectionOf("WeakSet");
		if (isWeakRef(t)) return weakCollectionOf("WeakRef");
		if (isNumber(t)) return markBoxed(u(Number(t)));
		if (isBigInt(t)) return markBoxed(u(bigIntValueOf.call(t)));
		if (isBoolean(t)) return markBoxed(booleanValueOf.call(t));
		if (isString(t)) return markBoxed(u(String(t)));
		if (!isDate(t) && !isRegExp$1(t)) {
			var b = arrObjKeys(t, u),
				w = gPO ? gPO(t) === Object.prototype : t instanceof Object || t.constructor === Object,
				S = t instanceof Object ? "" : "null prototype",
				E = !w && toStringTag && Object(t) === t && toStringTag in t ? toStr(t).slice(8, -1) : S ? "Object" :
				"",
				k = (w || "function" != typeof t.constructor ? "" : t.constructor.name ? t.constructor.name + " " :
				"") + (E || S ? "[" + [].concat(E || [], S || []).join(": ") + "] " : "");
			return 0 === b.length ? k + "{}" : c ? k + "{" + indentedJoin(b, c) + "}" : k + "{ " + b.join(", ") + " }"
		}
		return String(t)
	};

function wrapQuotes(e, t, r) {
	var n = "double" === (r.quoteStyle || t) ? '"' : "'";
	return n + e + n
}

function quote(e) {
	return String(e).replace(/"/g, "&quot;")
}

function isArray$4(e) {
	return !("[object Array]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isDate(e) {
	return !("[object Date]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isRegExp$1(e) {
	return !("[object RegExp]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isError(e) {
	return !("[object Error]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isString(e) {
	return !("[object String]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isNumber(e) {
	return !("[object Number]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isBoolean(e) {
	return !("[object Boolean]" !== toStr(e) || toStringTag && "object" == typeof e && toStringTag in e)
}

function isSymbol(t) {
	if (hasShammedSymbols) return t && "object" == typeof t && t instanceof Symbol;
	if ("symbol" == typeof t) return !0;
	if (!t || "object" != typeof t || !symToString) return !1;
	try {
		return symToString.call(t), !0
	} catch (e) {}
	return !1
}

function isBigInt(t) {
	if (!t || "object" != typeof t || !bigIntValueOf) return !1;
	try {
		return bigIntValueOf.call(t), !0
	} catch (e) {}
	return !1
}
var hasOwn = Object.prototype.hasOwnProperty || function(e) {
	return e in this
};

function has$3(e, t) {
	return hasOwn.call(e, t)
}

function toStr(e) {
	return objectToString.call(e)
}

function nameOf(e) {
	if (e.name) return e.name;
	var t = match.call(functionToString.call(e), /^function\s*([\w$]+)/);
	return t ? t[1] : null
}

function indexOf(e, t) {
	if (e.indexOf) return e.indexOf(t);
	for (var r = 0, n = e.length; r < n; r++)
		if (e[r] === t) return r;
	return -1
}

function isMap(t) {
	if (!mapSize || !t || "object" != typeof t) return !1;
	try {
		mapSize.call(t);
		try {
			setSize.call(t)
		} catch (r) {
			return !0
		}
		return t instanceof Map
	} catch (e) {}
	return !1
}

function isWeakMap(t) {
	if (!weakMapHas || !t || "object" != typeof t) return !1;
	try {
		weakMapHas.call(t, weakMapHas);
		try {
			weakSetHas.call(t, weakSetHas)
		} catch (r) {
			return !0
		}
		return t instanceof WeakMap
	} catch (e) {}
	return !1
}

function isWeakRef(t) {
	if (!weakRefDeref || !t || "object" != typeof t) return !1;
	try {
		return weakRefDeref.call(t), !0
	} catch (e) {}
	return !1
}

function isSet(t) {
	if (!setSize || !t || "object" != typeof t) return !1;
	try {
		setSize.call(t);
		try {
			mapSize.call(t)
		} catch (r) {
			return !0
		}
		return t instanceof Set
	} catch (e) {}
	return !1
}

function isWeakSet(t) {
	if (!weakSetHas || !t || "object" != typeof t) return !1;
	try {
		weakSetHas.call(t, weakSetHas);
		try {
			weakMapHas.call(t, weakMapHas)
		} catch (r) {
			return !0
		}
		return t instanceof WeakSet
	} catch (e) {}
	return !1
}

function isElement(e) {
	return !(!e || "object" != typeof e) && ("undefined" != typeof HTMLElement && e instanceof HTMLElement ||
		"string" == typeof e.nodeName && "function" == typeof e.getAttribute)
}

function inspectString(e, t) {
	if (e.length > t.maxStringLength) {
		var r = e.length - t.maxStringLength,
			n = "... " + r + " more character" + (r > 1 ? "s" : "");
		return inspectString(e.slice(0, t.maxStringLength), t) + n
	}
	return wrapQuotes(e.replace(/(['\\])/g, "\\$1").replace(/[\x00-\x1f]/g, lowbyte), "single", t)
}

function lowbyte(e) {
	var t = e.charCodeAt(0),
		r = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		} [t];
	return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + t.toString(16).toUpperCase()
}

function markBoxed(e) {
	return "Object(" + e + ")"
}

function weakCollectionOf(e) {
	return e + " { ? }"
}

function collectionOf(e, t, r, n) {
	return e + " (" + t + ") {" + (n ? indentedJoin(r, n) : r.join(", ")) + "}"
}

function singleLineValues(e) {
	for (var t = 0; t < e.length; t++)
		if (indexOf(e[t], "\n") >= 0) return !1;
	return !0
}

function getIndent(e, t) {
	var r;
	if ("\t" === e.indent) r = "\t";
	else {
		if (!("number" == typeof e.indent && e.indent > 0)) return null;
		r = Array(e.indent + 1).join(" ")
	}
	return {
		base: r,
		prev: Array(t + 1).join(r)
	}
}

function indentedJoin(e, t) {
	if (0 === e.length) return "";
	var r = "\n" + t.prev + t.base;
	return r + e.join("," + r) + "\n" + t.prev
}

function arrObjKeys(e, t) {
	var r = isArray$4(e),
		n = [];
	if (r) {
		n.length = e.length;
		for (var i = 0; i < e.length; i++) n[i] = has$3(e, i) ? t(e[i], e) : ""
	}
	var o, a = "function" == typeof gOPS ? gOPS(e) : [];
	if (hasShammedSymbols) {
		o = {};
		for (var s = 0; s < a.length; s++) o["$" + a[s]] = a[s]
	}
	for (var c in e) has$3(e, c) && (r && String(Number(c)) === c && c < e.length || hasShammedSymbols && o["$" +
		c] instanceof Symbol || (/[^\w$]/.test(c) ? n.push(t(c, e) + ": " + t(e[c], e)) : n.push(c + ": " + t(e[c],
			e))));
	if ("function" == typeof gOPS)
		for (var u = 0; u < a.length; u++) isEnumerable.call(e, a[u]) && n.push("[" + t(a[u]) + "]: " + t(e[a[u]], e));
	return n
}
var GetIntrinsic = getIntrinsic,
	callBound = callBound$1,
	inspect = objectInspect,
	$TypeError = GetIntrinsic("%TypeError%"),
	$WeakMap = GetIntrinsic("%WeakMap%", !0),
	$Map = GetIntrinsic("%Map%", !0),
	$weakMapGet = callBound("WeakMap.prototype.get", !0),
	$weakMapSet = callBound("WeakMap.prototype.set", !0),
	$weakMapHas = callBound("WeakMap.prototype.has", !0),
	$mapGet = callBound("Map.prototype.get", !0),
	$mapSet = callBound("Map.prototype.set", !0),
	$mapHas = callBound("Map.prototype.has", !0),
	listGetNode = function(e, t) {
		for (var r, n = e; null !== (r = n.next); n = r)
			if (r.key === t) return n.next = r.next, r.next = e.next, e.next = r, r
	},
	listGet = function(e, t) {
		var r = listGetNode(e, t);
		return r && r.value
	},
	listSet = function(e, t, r) {
		var n = listGetNode(e, t);
		n ? n.value = r : e.next = {
			key: t,
			next: e.next,
			value: r
		}
	},
	listHas = function(e, t) {
		return !!listGetNode(e, t)
	},
	sideChannel = function() {
		var e, t, r, n = {
			assert: function(e) {
				if (!n.has(e)) throw new $TypeError("Side channel does not contain " + inspect(e))
			},
			get: function(n) {
				if ($WeakMap && n && ("object" == typeof n || "function" == typeof n)) {
					if (e) return $weakMapGet(e, n)
				} else if ($Map) {
					if (t) return $mapGet(t, n)
				} else if (r) return listGet(r, n)
			},
			has: function(n) {
				if ($WeakMap && n && ("object" == typeof n || "function" == typeof n)) {
					if (e) return $weakMapHas(e, n)
				} else if ($Map) {
					if (t) return $mapHas(t, n)
				} else if (r) return listHas(r, n);
				return !1
			},
			set: function(n, i) {
				$WeakMap && n && ("object" == typeof n || "function" == typeof n) ? (e || (e = new $WeakMap),
					$weakMapSet(e, n, i)) : $Map ? (t || (t = new $Map), $mapSet(t, n, i)) : (r || (r = {
					key: {},
					next: null
				}), listSet(r, n, i))
			}
		};
		return n
	},
	replace = String.prototype.replace,
	percentTwenties = /%20/g,
	Format = {
		RFC1738: "RFC1738",
		RFC3986: "RFC3986"
	},
	formats$3 = {
		default: Format.RFC3986,
		formatters: {
			RFC1738: function(e) {
				return replace.call(e, percentTwenties, "+")
			},
			RFC3986: function(e) {
				return String(e)
			}
		},
		RFC1738: Format.RFC1738,
		RFC3986: Format.RFC3986
	},
	formats$2 = formats$3,
	has$2 = Object.prototype.hasOwnProperty,
	isArray$3 = Array.isArray,
	hexTable = function() {
		for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
		return e
	}(),
	compactQueue = function(e) {
		for (; e.length > 1;) {
			var t = e.pop(),
				r = t.obj[t.prop];
			if (isArray$3(r)) {
				for (var n = [], i = 0; i < r.length; ++i) void 0 !== r[i] && n.push(r[i]);
				t.obj[t.prop] = n
			}
		}
	},
	arrayToObject = function(e, t) {
		for (var r = t && t.plainObjects ? Object.create(null) : {}, n = 0; n < e.length; ++n) void 0 !== e[n] && (r[
			n] = e[n]);
		return r
	},
	merge = function e(t, r, n) {
		if (!r) return t;
		if ("object" != typeof r) {
			if (isArray$3(t)) t.push(r);
			else {
				if (!t || "object" != typeof t) return [t, r];
				(n && (n.plainObjects || n.allowPrototypes) || !has$2.call(Object.prototype, r)) && (t[r] = !0)
			}
			return t
		}
		if (!t || "object" != typeof t) return [t].concat(r);
		var i = t;
		return isArray$3(t) && !isArray$3(r) && (i = arrayToObject(t, n)), isArray$3(t) && isArray$3(r) ? (r.forEach((
			function(r, i) {
				if (has$2.call(t, i)) {
					var o = t[i];
					o && "object" == typeof o && r && "object" == typeof r ? t[i] = e(o, r, n) : t.push(r)
				} else t[i] = r
			})), t) : Object.keys(r).reduce((function(t, i) {
			var o = r[i];
			return has$2.call(t, i) ? t[i] = e(t[i], o, n) : t[i] = o, t
		}), i)
	},
	assign = function(e, t) {
		return Object.keys(t).reduce((function(e, r) {
			return e[r] = t[r], e
		}), e)
	},
	decode = function(t, r, n) {
		var i = t.replace(/\+/g, " ");
		if ("iso-8859-1" === n) return i.replace(/%[0-9a-f]{2}/gi, unescape);
		try {
			return decodeURIComponent(i)
		} catch (e) {
			return i
		}
	},
	encode = function(e, t, r, n, i) {
		if (0 === e.length) return e;
		var o = e;
		if ("symbol" == typeof e ? o = Symbol.prototype.toString.call(e) : "string" != typeof e && (o = String(e)),
			"iso-8859-1" === r) return escape(o).replace(/%u[0-9a-f]{4}/gi, (function(e) {
			return "%26%23" + parseInt(e.slice(2), 16) + "%3B"
		}));
		for (var a = "", s = 0; s < o.length; ++s) {
			var c = o.charCodeAt(s);
			45 === c || 46 === c || 95 === c || 126 === c || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <=
				122 || i === formats$2.RFC1738 && (40 === c || 41 === c) ? a += o.charAt(s) : c < 128 ? a += hexTable[
				c] : c < 2048 ? a += hexTable[192 | c >> 6] + hexTable[128 | 63 & c] : c < 55296 || c >= 57344 ? a +=
				hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | 63 & c] : (s += 1, c = 65536 + ((
					1023 & c) << 10 | 1023 & o.charCodeAt(s)), a += hexTable[240 | c >> 18] + hexTable[128 | c >>
					12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | 63 & c])
		}
		return a
	},
	compact = function(e) {
		for (var t = [{
				obj: {
					o: e
				},
				prop: "o"
			}], r = [], n = 0; n < t.length; ++n)
			for (var i = t[n], o = i.obj[i.prop], a = Object.keys(o), s = 0; s < a.length; ++s) {
				var c = a[s],
					u = o[c];
				"object" == typeof u && null !== u && -1 === r.indexOf(u) && (t.push({
					obj: o,
					prop: c
				}), r.push(u))
			}
		return compactQueue(t), e
	},
	isRegExp = function(e) {
		return "[object RegExp]" === Object.prototype.toString.call(e)
	},
	isBuffer = function(e) {
		return !(!e || "object" != typeof e) && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
	},
	combine = function(e, t) {
		return [].concat(e, t)
	},
	maybeMap = function(e, t) {
		if (isArray$3(e)) {
			for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
			return r
		}
		return t(e)
	},
	utils$2 = {
		arrayToObject: arrayToObject,
		assign: assign,
		combine: combine,
		compact: compact,
		decode: decode,
		encode: encode,
		isBuffer: isBuffer,
		isRegExp: isRegExp,
		maybeMap: maybeMap,
		merge: merge
	},
	getSideChannel = sideChannel,
	utils$1 = utils$2,
	formats$1 = formats$3,
	has$1 = Object.prototype.hasOwnProperty,
	arrayPrefixGenerators = {
		brackets: function(e) {
			return e + "[]"
		},
		comma: "comma",
		indices: function(e, t) {
			return e + "[" + t + "]"
		},
		repeat: function(e) {
			return e
		}
	},
	isArray$2 = Array.isArray,
	push = Array.prototype.push,
	pushToArray = function(e, t) {
		push.apply(e, isArray$2(t) ? t : [t])
	},
	toISO = Date.prototype.toISOString,
	defaultFormat = formats$1.default,
	defaults$1 = {
		addQueryPrefix: !1,
		allowDots: !1,
		charset: "utf-8",
		charsetSentinel: !1,
		delimiter: "&",
		encode: !0,
		encoder: utils$1.encode,
		encodeValuesOnly: !1,
		format: defaultFormat,
		formatter: formats$1.formatters[defaultFormat],
		indices: !1,
		serializeDate: function(e) {
			return toISO.call(e)
		},
		skipNulls: !1,
		strictNullHandling: !1
	},
	isNonNullishPrimitive = function(e) {
		return "string" == typeof e || "number" == typeof e || "boolean" == typeof e || "symbol" == typeof e ||
			"bigint" == typeof e
	},
	stringify$1 = function e(t, r, n, i, o, a, s, c, u, l, d, p, f, h, g) {
		var _ = t;
		if (g.has(t)) throw new RangeError("Cyclic object value");
		if ("function" == typeof s ? _ = s(r, _) : _ instanceof Date ? _ = l(_) : "comma" === n && isArray$2(_) && (_ =
				utils$1.maybeMap(_, (function(e) {
					return e instanceof Date ? l(e) : e
				}))), null === _) {
			if (i) return a && !f ? a(r, defaults$1.encoder, h, "key", d) : r;
			_ = ""
		}
		if (isNonNullishPrimitive(_) || utils$1.isBuffer(_)) return a ? [p(f ? r : a(r, defaults$1.encoder, h, "key",
			d)) + "=" + p(a(_, defaults$1.encoder, h, "value", d))] : [p(r) + "=" + p(String(_))];
		var m, y = [];
		if (void 0 === _) return y;
		if ("comma" === n && isArray$2(_)) m = [{
			value: _.length > 0 ? _.join(",") || null : void 0
		}];
		else if (isArray$2(s)) m = s;
		else {
			var v = Object.keys(_);
			m = c ? v.sort(c) : v
		}
		for (var b = 0; b < m.length; ++b) {
			var w = m[b],
				S = "object" == typeof w && void 0 !== w.value ? w.value : _[w];
			if (!o || null !== S) {
				var E = isArray$2(_) ? "function" == typeof n ? n(r, w) : r : r + (u ? "." + w : "[" + w + "]");
				g.set(t, !0);
				var k = getSideChannel();
				pushToArray(y, e(S, E, n, i, o, a, s, c, u, l, d, p, f, h, k))
			}
		}
		return y
	},
	normalizeStringifyOptions = function(e) {
		if (!e) return defaults$1;
		if (null !== e.encoder && void 0 !== e.encoder && "function" != typeof e.encoder) throw new TypeError(
			"Encoder has to be a function.");
		var t = e.charset || defaults$1.charset;
		if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError(
			"The charset option must be either utf-8, iso-8859-1, or undefined");
		var r = formats$1.default;
		if (void 0 !== e.format) {
			if (!has$1.call(formats$1.formatters, e.format)) throw new TypeError("Unknown format option provided.");
			r = e.format
		}
		var n = formats$1.formatters[r],
			i = defaults$1.filter;
		return ("function" == typeof e.filter || isArray$2(e.filter)) && (i = e.filter), {
			addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : defaults$1.addQueryPrefix,
			allowDots: void 0 === e.allowDots ? defaults$1.allowDots : !!e.allowDots,
			charset: t,
			charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : defaults$1.charsetSentinel,
			delimiter: void 0 === e.delimiter ? defaults$1.delimiter : e.delimiter,
			encode: "boolean" == typeof e.encode ? e.encode : defaults$1.encode,
			encoder: "function" == typeof e.encoder ? e.encoder : defaults$1.encoder,
			encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : defaults$1
				.encodeValuesOnly,
			filter: i,
			format: r,
			formatter: n,
			serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : defaults$1.serializeDate,
			skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : defaults$1.skipNulls,
			sort: "function" == typeof e.sort ? e.sort : null,
			strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : defaults$1
				.strictNullHandling
		}
	},
	stringify_1 = function(e, t) {
		var r, n = e,
			i = normalizeStringifyOptions(t);
		"function" == typeof i.filter ? n = (0, i.filter)("", n) : isArray$2(i.filter) && (r = i.filter);
		var o, a = [];
		if ("object" != typeof n || null === n) return "";
		o = t && t.arrayFormat in arrayPrefixGenerators ? t.arrayFormat : t && "indices" in t ? t.indices ? "indices" :
			"repeat" : "indices";
		var s = arrayPrefixGenerators[o];
		r || (r = Object.keys(n)), i.sort && r.sort(i.sort);
		for (var c = getSideChannel(), u = 0; u < r.length; ++u) {
			var l = r[u];
			i.skipNulls && null === n[l] || pushToArray(a, stringify$1(n[l], l, s, i.strictNullHandling, i.skipNulls, i
				.encode ? i.encoder : null, i.filter, i.sort, i.allowDots, i.serializeDate, i.format, i
				.formatter, i.encodeValuesOnly, i.charset, c))
		}
		var d = a.join(i.delimiter),
			p = !0 === i.addQueryPrefix ? "?" : "";
		return i.charsetSentinel && ("iso-8859-1" === i.charset ? p += "utf8=%26%2310003%3B&" : p += "utf8=%E2%9C%93&"),
			d.length > 0 ? p + d : ""
	},
	utils = utils$2,
	has = Object.prototype.hasOwnProperty,
	isArray$1 = Array.isArray,
	defaults = {
		allowDots: !1,
		allowPrototypes: !1,
		allowSparse: !1,
		arrayLimit: 20,
		charset: "utf-8",
		charsetSentinel: !1,
		comma: !1,
		decoder: utils.decode,
		delimiter: "&",
		depth: 5,
		ignoreQueryPrefix: !1,
		interpretNumericEntities: !1,
		parameterLimit: 1e3,
		parseArrays: !0,
		plainObjects: !1,
		strictNullHandling: !1
	},
	interpretNumericEntities = function(e) {
		return e.replace(/&#(\d+);/g, (function(e, t) {
			return String.fromCharCode(parseInt(t, 10))
		}))
	},
	parseArrayValue = function(e, t) {
		return e && "string" == typeof e && t.comma && e.indexOf(",") > -1 ? e.split(",") : e
	},
	isoSentinel = "utf8=%26%2310003%3B",
	charsetSentinel = "utf8=%E2%9C%93",
	parseValues = function(e, t) {
		var r, n = {},
			i = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
			o = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
			a = i.split(t.delimiter, o),
			s = -1,
			c = t.charset;
		if (t.charsetSentinel)
			for (r = 0; r < a.length; ++r) 0 === a[r].indexOf("utf8=") && (a[r] === charsetSentinel ? c = "utf-8" : a[
				r] === isoSentinel && (c = "iso-8859-1"), s = r, r = a.length);
		for (r = 0; r < a.length; ++r)
			if (r !== s) {
				var u, l, d = a[r],
					p = d.indexOf("]="),
					f = -1 === p ? d.indexOf("=") : p + 1; - 1 === f ? (u = t.decoder(d, defaults.decoder, c, "key"),
						l = t.strictNullHandling ? null : "") : (u = t.decoder(d.slice(0, f), defaults.decoder, c,
						"key"), l = utils.maybeMap(parseArrayValue(d.slice(f + 1), t), (function(e) {
						return t.decoder(e, defaults.decoder, c, "value")
					}))), l && t.interpretNumericEntities && "iso-8859-1" === c && (l = interpretNumericEntities(l)), d
					.indexOf("[]=") > -1 && (l = isArray$1(l) ? [l] : l), has.call(n, u) ? n[u] = utils.combine(n[u],
					l) : n[u] = l
			} return n
	},
	parseObject = function(e, t, r, n) {
		for (var i = n ? t : parseArrayValue(t, r), o = e.length - 1; o >= 0; --o) {
			var a, s = e[o];
			if ("[]" === s && r.parseArrays) a = [].concat(i);
			else {
				a = r.plainObjects ? Object.create(null) : {};
				var c = "[" === s.charAt(0) && "]" === s.charAt(s.length - 1) ? s.slice(1, -1) : s,
					u = parseInt(c, 10);
				r.parseArrays || "" !== c ? !isNaN(u) && s !== c && String(u) === c && u >= 0 && r.parseArrays && u <= r
					.arrayLimit ? (a = [])[u] = i : a[c] = i : a = {
						0: i
					}
			}
			i = a
		}
		return i
	},
	parseKeys = function(e, t, r, n) {
		if (e) {
			var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
				o = /(\[[^[\]]*])/g,
				a = r.depth > 0 && /(\[[^[\]]*])/.exec(i),
				s = a ? i.slice(0, a.index) : i,
				c = [];
			if (s) {
				if (!r.plainObjects && has.call(Object.prototype, s) && !r.allowPrototypes) return;
				c.push(s)
			}
			for (var u = 0; r.depth > 0 && null !== (a = o.exec(i)) && u < r.depth;) {
				if (u += 1, !r.plainObjects && has.call(Object.prototype, a[1].slice(1, -1)) && !r.allowPrototypes)
					return;
				c.push(a[1])
			}
			return a && c.push("[" + i.slice(a.index) + "]"), parseObject(c, t, r, n)
		}
	},
	normalizeParseOptions = function(e) {
		if (!e) return defaults;
		if (null !== e.decoder && void 0 !== e.decoder && "function" != typeof e.decoder) throw new TypeError(
			"Decoder has to be a function.");
		if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError(
			"The charset option must be either utf-8, iso-8859-1, or undefined");
		var t = void 0 === e.charset ? defaults.charset : e.charset;
		return {
			allowDots: void 0 === e.allowDots ? defaults.allowDots : !!e.allowDots,
			allowPrototypes: "boolean" == typeof e.allowPrototypes ? e.allowPrototypes : defaults.allowPrototypes,
			allowSparse: "boolean" == typeof e.allowSparse ? e.allowSparse : defaults.allowSparse,
			arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : defaults.arrayLimit,
			charset: t,
			charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : defaults.charsetSentinel,
			comma: "boolean" == typeof e.comma ? e.comma : defaults.comma,
			decoder: "function" == typeof e.decoder ? e.decoder : defaults.decoder,
			delimiter: "string" == typeof e.delimiter || utils.isRegExp(e.delimiter) ? e.delimiter : defaults.delimiter,
			depth: "number" == typeof e.depth || !1 === e.depth ? +e.depth : defaults.depth,
			ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
			interpretNumericEntities: "boolean" == typeof e.interpretNumericEntities ? e.interpretNumericEntities :
				defaults.interpretNumericEntities,
			parameterLimit: "number" == typeof e.parameterLimit ? e.parameterLimit : defaults.parameterLimit,
			parseArrays: !1 !== e.parseArrays,
			plainObjects: "boolean" == typeof e.plainObjects ? e.plainObjects : defaults.plainObjects,
			strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : defaults
				.strictNullHandling
		}
	},
	parse$1 = function(e, t) {
		var r = normalizeParseOptions(t);
		if ("" === e || null == e) return r.plainObjects ? Object.create(null) : {};
		for (var n = "string" == typeof e ? parseValues(e, r) : e, i = r.plainObjects ? Object.create(null) : {}, o =
				Object.keys(n), a = 0; a < o.length; ++a) {
			var s = o[a],
				c = parseKeys(s, n[s], r, "string" == typeof e);
			i = utils.merge(i, c, r)
		}
		return !0 === r.allowSparse ? i : utils.compact(i)
	},
	stringify = stringify_1,
	parse = parse$1,
	formats = formats$3,
	lib = {
		formats: formats,
		parse: parse,
		stringify: stringify
	};
async function installContextMenu() {
	chrome.contextMenus.create({
		id: JJ_CONTEXT_MENU_ADD,
		title: CONTEXT_MENU_TITLE,
		type: "normal",
		contexts: ["page", "frame", "selection", "link"]
	}), chrome.contextMenus.onClicked.addListener(((e, t) => {
		if (e.menuItemId === JJ_CONTEXT_MENU_ADD) {
			const r = e.selectionText || e.linkUrl || "",
				n = (null == t ? void 0 : t.title) || "";
			(null == t ? void 0 : t.id) && (log(`create note from page:${n} content:${r} url:${t.url}`),
				showNoteDrawer(NOTE_CREATE_HASH, (e => {
					var t, n;
					return [NOTE_ACTION_CREATE, {
						extra: JSON.stringify({
							title: null != (t = null == e ? void 0 : e.title) ?
								t : "",
							url: null != (n = null == e ? void 0 : e.url) ? n :
								"",
							content: r
						})
					}, 2]
				}), {
					from: 2
				}))
		}
	}))
}

function setupFlashNote() {
	chrome.alarms.onAlarm.addListener((async e => {
		log("new note alarm fired:", e.name);
		const t = await storageGet(UNREAD_NOTE_ALARMS, (() => []));
		t.push(e.name), chrome.browserAction.setBadgeText({
			text: t.length.toString()
		}), storageSet(UNREAD_NOTE_ALARMS, t)
	}))
}

function showNoteDrawer(e, t, r) {
	chrome.tabs.query({
		currentWindow: !0,
		active: !0
	}, (n => {
		var i, o, a, s, c;
		if (n.length <= 0) return;
		const u = n[0];
		if (null == (i = u.url) ? void 0 : i.startsWith("http")) log("show flash note drawer at url:", u
			.url), chrome.tabs.sendMessage(u.id, t(u));
		else if (((null == (o = u.url) ? void 0 : o.startsWith("chrome-extension")) || (null == (a = u
				.url) ? void 0 : a.startsWith("chrome://newtab"))) && ((null == (s = u.title) ? void 0 : s
				.includes(JUEJIN_CN)) || (null == (c = u.title) ? void 0 : c.includes("Juejin")))) {
			let t = chrome.extension.getURL(`main.html${e}`);
			r && Object.keys(r).length && (t += `?${lib.stringify(r)}`), log(
				"show flash note drawer at url:", u.url, "dst:", t), chrome.tabs.update(u.id, {
				url: t
			})
		} else {
			let t = chrome.extension.getURL(`main.html${e}`);
			r && Object.keys(r).length && (t += `?${lib.stringify(r)}`), log(
				"show flash note drawer at url:", u.url, "dst:", t), chrome.tabs.create({
				url: t
			})
		}
	}))
}

function isArray(e) {
	return "[object Array]" === Object.prototype.toString.call(e)
}

function isPromise(e) {
	return "[object Promise]" === Object.prototype.toString.call(e)
}
try {
	initTea()
} catch (err) {}
chrome.runtime.onInstalled.addListener((e => {
	log(`extension update from version ${e.previousVersion} reason:${e.reason} channel:webstore`)
})), installContextMenu().then((() => setupFlashNote())), chrome.runtime.onMessage.addListener(((e, t, r) => {
	var n;
	if (!isArray(e)) return;
	const i = e;
	if (i.length < 1) return;
	const [o, ...a] = i, s = null == (n = bridge[o]) ? void 0 : n.call(bridge, ...a);
	return s ? isPromise(s) ? (s.then((e => {
		e && r(e)
	})), !0) : void r(s) : void 0
}));
