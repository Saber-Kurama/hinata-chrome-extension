(() => {
	"use strict";
	var _, e, t, r = {
			88506: (_, e) => {
				Object.defineProperty(e, "__esModule", {
						value: !0
					}), e.OPEN_ALL = "__TOBY_OPEN_ALL__", e.OPEN_TOBY = "__TOBY_OPEN_TOBY__", e.CHECK_CONTENT =
					"__TOBY_CHECK_CONTENT__", e.UPDATE_BOARDS = "__TOBY_UPDATE_BOARDS__", e.STATUS_SYNC =
					"__TOBY_STATUS_SYNC__", e.STATUS_TOBY_SYNC = "__TOBY_STATUS_TOBY_SYNC__", e.LOGIN_USER =
					"__TOBY_LOGIN_USER__", e.CHECK_LOGIN = "__TOBY_CHECK_LOGIN__"
			}
		},
		o = {};
	_ = function _(e) {
			var t = o[e];
			if (void 0 !== t) return t.exports;
			var O = o[e] = {
				exports: {}
			};
			return r[e](O, O.exports, _), O.exports
		}(88506), e = "__toby__user__", t = "__toby__invited__",
		function() {
			var r = localStorage.getItem(e),
				o = localStorage.getItem(t),
				O = o ? JSON.parse(o) : [];
			if (r && r.length > 0) {
				var T = JSON.parse(r);
				localStorage.removeItem(e), localStorage.removeItem(t), chrome.runtime.sendMessage({
					request: _.LOGIN_USER,
					user: T,
					invites: O
				})
			}
		}(), window.addEventListener("message", (function(e) {
			e.source === window && e.data.type && "TOBY_CHECK_LOGIN" === e.data.type && chrome.runtime
				.sendMessage({
					request: _.CHECK_LOGIN
				}, (function(_) {
					_ && (location.href = "/open-toby")
				}))
		}))
})();
