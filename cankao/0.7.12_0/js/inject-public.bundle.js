(() => {
	var t = {
			95512: (t, e) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
						value: !0
					}), e.LATEST_NOTIF = "sharing", e.CHROME_EXT = "chrome-extension://", e.TOBY_PAGE =
					"/toby.html", e.NOTE_PAGE = "/note.html", e.PRIVACY_PAGE = "/privacy.html", e.TERMS_PAGE =
					"/terms.html", e.NOTE_TITLE = "New note", e.TOBY_TITLE = "Toby";
				var r = e.NEW_TAB_CHROME1 = "chrome://newtab",
					n = e.NEW_TAB_CHROME2 = "chrome://new-tab-page",
					o = e.NEW_TAB_FIREFOX1 = "about:home",
					i = e.NEW_TAB_FIREFOX2 = "about:newtab",
					u = e.NEW_TAB_EDGE = "edge://newtab",
					a = (e.NEW_TAB_ALL_BROWSERS = [r, n, o, i, u], e.MY_LISTS = "my-lists", e.UNTITLED_LIST =
						"Untitled collection", e.STAR_LIST = "star-list", e.VIDEO_ID = "203812669", e
						.ENTER_KEY = 13, e.GUEST_TEMP_TEAMID = "TEAMID_GUEST", e.GUEST_TEMP_TEAMNAME =
						"My Collections", e.GUEST_TEMP_GROUPID = "GROUPID_GUEST", e.DEFAULT_GROUP_NAME =
						"My Collections", e.STARRED_GROUP_NAME = "Starred Collections", e
						.INTERVAL_CHECK_CONFIG = 6e4, e.INTERVAL_RECONNECT = 5e3, e.INTERVAL_PING = 2e4, e
						.TOBYOPEN_EVENT = 288e5, e.URL_FULL =
						"https://chrome.google.com/webstore/detail/hddnkoipeenegfoeaoibdmnaalmgkpip", e
						.URL_MINI =
						"https://chrome.google.com/webstore/detail/gfdcgfhkelkdmglklfbndgopaihmoeci", e
						.URL_TOBY = "https://www.gettoby.com"),
					s = (e.URL_FAQ = a + "/faq", e.URL_TERMS = a + "/terms", e.URL_PRIVACY = a + "/privacy", e
						.URL_CONTACT = a + "/contact", e.URL_UNINSTALL = a + "/goodbye", e.URL_BLOG = a +
						"/blogs", e.URL_FEEDBACK = "https://feedback.gettoby.com/", e.URL_FACEBOOK =
						"https://www.facebook.com/TobyForTabs", e.URL_TWITTER =
						"https://twitter.com/TobyForTabs", e.TOBY_USERS = "300,000+", e
						.CONSENT_MARKETING_VERSION = 1, e.CONSENT_TERMS_VERSION = 1, e.CONSENT_PRIVACY_VERSION =
						1, e.SIDEBAR_CLOSED_WIDTH = 20, e.LEFT_SIDEBAR_OPEN_WIDTH = 280, e
						.RIGHT_SIDEBAR_OPEN_WIDTH = 220, e.LEFT_WORK_SIDEBAR_OPEN_WIDTH = 220, e.WS_PERSONAL =
						"personal", e.SPACE_ACCESS_SETTING_TYPE_PRIVATE = "private"),
					c = e.SPACE_ACCESS_SETTING_TYPE_PUBLIC = "public";
				e.ACCESS_SETTIN = {
					"Space Access": s,
					"Organization Access": c
				}
			},
			88506: (t, e) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
						value: !0
					}), e.OPEN_ALL = "__TOBY_OPEN_ALL__", e.OPEN_TOBY = "__TOBY_OPEN_TOBY__", e.CHECK_CONTENT =
					"__TOBY_CHECK_CONTENT__", e.UPDATE_BOARDS = "__TOBY_UPDATE_BOARDS__", e.STATUS_SYNC =
					"__TOBY_STATUS_SYNC__", e.STATUS_TOBY_SYNC = "__TOBY_STATUS_TOBY_SYNC__", e.LOGIN_USER =
					"__TOBY_LOGIN_USER__", e.CHECK_LOGIN = "__TOBY_CHECK_LOGIN__"
			},
			32394: (t, e, r) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.version = function() {
					return (0, n.isExtension)() ? chrome.runtime.getManifest().version : "web"
				};
				var n = r(70774)
			},
			70774: (t, e) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.isFireFox = function() {
					return !1
				}, e.isChrome = function() {
					return !0
				}, e.isExtension = function() {
					return !0
				}, e.isMobile = function() {
					return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator
						.userAgent)
				}, e.isTobyMini = !0
			},
			18322: (t, e, r) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.getDeviceId = function() {
					return o
				};
				var n, o = (0, ((n = r(96329)) && n.__esModule ? n : {
					default: n
				}).default)()
			},
			96329: (t, e) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.default = function() {
					var t = (new Date).getTime();
					return "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
						var r = (t + 16 * Math.random()) % 16 | 0;
						return t = Math.floor(t / 16), ("x" === e ? r : 3 & r | 8).toString(16)
					}))
				}, t.exports = e.default
			},
			67873: (t, e, r) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
					value: !0
				});
				var n, o = (n = r(88239)) && n.__esModule ? n : {
						default: n
					},
					i = r(35227),
					u = {},
					a = function(t) {
						return t.charAt(0).toUpperCase() + t.slice(1)
					};
				["list", "label", "card", "team"].forEach((function(t) {
					var e = a(t),
						r = (0, i.crud)(t);
					u["create" + e] = r.create, u["edit" + e] = r.edit, u["remove" + e] = r.remove
				})), [
					["list", "user"],
					["list", "label"],
					["team", "member"],
					["team", "group"],
					["list", "group"]
				].forEach((function(t) {
					var e = t.map(a),
						r = i.rel.apply(null, t);
					u["add" + e[1] + "To" + e[0]] = r.create, u["remove" + e[1] + "From" + e[0]] = r
						.remove
				})), u.likeCard = function(t, e) {
					return (0, i.post)("cards/" + e + "/likes", {}, t)
				}, u.unlikeCard = function(t, e) {
					return (0, i.del)("cards/" + e + "/likes", t)
				}, u.getPublicList = function(t) {
					return (0, i.get)("public/lists/" + t)
				}, u.updateListsBatch = function(t, e) {
					return (0, i.patch)("lists/batch", e, t)
				}, u.moveListsBatch = function(t, e, r) {
					return (0, i.patch)("lists/move/batch", {
						groupId: e,
						listIds: r
					}, t)
				}, u.mergeListsBatch = function(t, e, r) {
					return (0, i.patch)("lists/merge", {
						toListID: e,
						fromListIDs: r
					}, t)
				}, u.signup = function(t, e, r, n) {
					return (0, i.post)("users", (0, o.default)({
						name: t,
						email: e,
						password: r
					}, n))
				}, u.login = function(t, e) {
					return (0, i.post)("users/login", {
						email: t,
						password: e
					})
				}, u.resetPassword = function(t) {
					return (0, i.post)("users/reset", {
						email: t
					})
				}, u.deleteAccount = function(t) {
					return (0, i.del)("users", t)
				}, u.updateAccount = function(t, e) {
					return (0, i.patch)("users", e, t)
				}, u.changePassword = function(t, e) {
					return (0, i.put)("users/password", e, t)
				}, u.getState = function(t) {
					return (0, i.get)("states", t, !1)
				}, u.getLatestAnnouncements = function(t) {
					return (0, i.get)("public/announcements?timestamp=" + t)
				}, u.updateConfig = function(t, e) {
					return (0, i.put)("config", e, t)
				}, u.getTeams = function(t) {
					return (0, i.get)("teams", t)
				}, u.addMemberToTeam = function(t, e, r) {
					return (0, i.post)("teams/" + e + "/admin/members", {
						email: r
					}, t)
				}, u.removeMemberFromTeam = function(t, e, r) {
					return (0, i.del)("teams/" + e + "/admin/members/" + r, t)
				}, u.addUserEmailToList = function(t, e, r) {
					return (0, i.post)("lists/" + e + "/users", {
						email: r
					}, t)
				}, u.leaveTeam = function(t, e) {
					return (0, i.del)("teams/" + e + "/members/me", t)
				}, u.editUserPermissions = function(t, e, r, n) {
					return (0, i.patch)("teams/" + e + "/admin/members/" + r, n, t)
				}, u.revokeInvite = function(t, e, r) {
					return (0, i.del)("teams/" + e + "/admin/invite", t, !0, {
						email: r
					})
				}, u.addUserEmailToGroup = function(t, e, r, n) {
					return (0, i.post)("teams/" + e + "/groups/" + r + "/members", {
						email: n
					}, t)
				}, u.addUserToGroup = function(t, e, r, n) {
					return (0, i.post)("teams/" + e + "/groups/" + r + "/members", {
						userId: n
					}, t)
				}, u.removeUserFromGroup = function(t, e, r, n) {
					return (0, i.del)("teams/" + e + "/groups/" + r + "/members/" + n, t)
				}, u.addGroupToTeam = function(t, e, r, n) {
					return (0, i.post)("teams/" + e + "/groups", {
						name: r,
						type: n
					}, t)
				}, u.removeGroupFromTeam = function(t, e, r) {
					return (0, i.del)("teams/" + e + "/groups/" + r, t)
				}, u.editGroup = function(t, e, r, n, o) {
					return (0, i.patch)("teams/" + e + "/groups/" + r, {
						name: n,
						version: o
					}, t)
				}, u.fetchPublicSpaces = function(t, e) {
					return (0, i.get)("teams/" + e + "/public_groups", t)
				}, u.addUserToPublicSpace = function(t, e, r, n) {
					return (0, i.post)("teams/" + e + "/groups/" + r + "/members", {
						email: n
					}, t)
				}, u.inviteFriends = function(t, e, r) {
					return (0, i.post)("invite", {
						from: t,
						name: e,
						invite: r
					})
				}, u.getSurvey = function(t) {
					return (0, i.get)("surveys", t)
				}, u.updateSurvey = function(t, e, r) {
					return (0, i.patch)("surveys/" + e + "/", r, t)
				}, e.default = u, t.exports = e.default
			},
			35227: (t, e, r) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
					value: !0
				}), e.rel = e.crud = e.del = e.put = e.patch = e.get = e.post = void 0;
				var n = f(r(88106)),
					o = f(r(94942)),
					i = f(r(36803)),
					u = f(r(63239)),
					a = f(r(46593)),
					s = r(18322),
					c = r(32394);

				function f(t) {
					return t && t.__esModule ? t : {
						default: t
					}
				}
				var l = "https://api2.gettoby.com/v2",
					p = !1,
					h = !1;
				window.toggleDebugAPIDown = function() {
					p = !p, console.log("debugAPIDown: " + p)
				}, window.toggleDebugAPIError = function() {
					h = !h, console.log("debugAPIError: " + h)
				};
				var d = (0, c.version)(),
					v = function(t) {
						var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET",
							r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
							n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
							o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
						if (p) return a.default.reject(new Response(null, {
							status: 502
						}));
						if (h) return a.default.reject(new Response(null, {
							status: 500
						}));
						var i = {};
						i.method = e, o && (i.body = (0, u.default)(o));
						var c = new Headers;
						n && c.append("Content-Type", "application/json"), r && c.append("x-auth-token", r), c
							.append("x-toby-version", d), c.append("x-dev", (0, s.getDeviceId)()), i.headers = i
							.headers || c;
						var f = new Request(l + "/" + t, i);
						return fetch(f).then((function(t) {
							var e = t.status >= 200 && t.status < 300,
								r = t.headers.get("Content-Type");
							return e ? "application/json" === r ? t.json() : t.text() : a.default
								.reject(t)
						}))
					},
					_ = function(t) {
						switch (t) {
							case "POST":
							case "PATCH":
							case "PUT":
								return r = (0, i.default)(o.default.mark((function e(r, n, i, u) {
										return o.default.wrap((function(e) {
											for (;;) switch (e.prev = e.next) {
												case 0:
													return e.abrupt("return", v(r,
														t, i, u, n));
												case 1:
												case "end":
													return e.stop()
											}
										}), e, void 0)
									}))),
									function(t, e, n, o) {
										return r.apply(this, arguments)
									};
							default:
								return e = (0, i.default)(o.default.mark((function e(r, n, i, u) {
										return o.default.wrap((function(e) {
											for (;;) switch (e.prev = e.next) {
												case 0:
													return e.abrupt("return", v(r,
														t, n, i, u));
												case 1:
												case "end":
													return e.stop()
											}
										}), e, void 0)
									}))),
									function(t, r, n, o) {
										return e.apply(this, arguments)
									}
						}
						var e, r
					},
					m = e.post = _("POST"),
					y = (e.get = _("GET"), e.patch = _("PATCH")),
					g = (e.put = _("PUT"), e.del = _("DELETE"));
				e.crud = function(t) {
					return {
						create: function(e, r) {
							return m(t + "s", r, e)
						},
						edit: function(e, r, n) {
							var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
							return y(t + "s/" + r + o, n, e)
						},
						remove: function(e, r) {
							var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
							return g(t + "s/" + r + n, e)
						}
					}
				}, e.rel = function(t, e) {
					return {
						create: function(r, o, i) {
							return m(t + "s/" + o + "/" + e + "s", (0, n.default)({}, e + "Id", i), r)
						},
						remove: function(r, n, o) {
							return g(t + "s/" + n + "/" + e + "s/" + o, r)
						}
					}
				}
			},
			80018: (t, e, r) => {
				"use strict";
				Object.defineProperty(e, "__esModule", {
						value: !0
					}), e.computeNewCards = e.getTabStates = e.isNewTab = e.isTobyOrNoteTab = e.isNoteTab = e
					.isTobyTab = void 0;
				var n = function(t) {
						if (t && t.__esModule) return t;
						var e = {};
						if (null != t)
							for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
						return e.default = t, e
					}(r(95512)),
					o = n.CHROME_EXT,
					i = n.TOBY_PAGE,
					u = n.TOBY_TITLE,
					a = n.NEW_TAB_ALL_BROWSERS,
					s = n.NOTE_PAGE,
					c = e.isTobyTab = function(t) {
						var e;
						return (e = t).url.includes(o) && e.url.includes(i) || function(t) {
							return t.title === u
						}(t) || function(t) {
							return t.title.includes(o) && t.title.includes(i)
						}(t)
					},
					f = e.isNoteTab = function(t) {
						var e;
						return (e = t).url.includes(o) && e.url.includes(s)
					},
					l = e.isTobyOrNoteTab = function(t) {
						return f(t) || c(t)
					},
					p = e.isNewTab = function(t) {
						return t.url && !!a.find((function(e) {
							return t.url.startsWith(e)
						}))
					};
				e.getTabStates = function(t) {
					var e = p(t),
						r = c(t),
						n = l(t);
					return {
						newTab: e,
						tabToby: r,
						isValidTab: e || n
					}
				}, e.computeNewCards = function(t, e) {
					var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
						n = [],
						o = [];
					return e.forEach((function(e) {
						var i = e.pinned,
							u = !r && t && e.id === t.id,
							a = l(e),
							s = p(e);
						i || u || (a || s || o.push(e), n.push(e.id))
					})), {
						addCards: o,
						removeTabs: n
					}
				}
			},
			63239: (t, e, r) => {
				t.exports = {
					default: r(92742),
					__esModule: !0
				}
			},
			52945: (t, e, r) => {
				t.exports = {
					default: r(56981),
					__esModule: !0
				}
			},
			32242: (t, e, r) => {
				t.exports = {
					default: r(33391),
					__esModule: !0
				}
			},
			46593: (t, e, r) => {
				t.exports = {
					default: r(80112),
					__esModule: !0
				}
			},
			36803: (t, e, r) => {
				"use strict";
				e.__esModule = !0;
				var n, o = (n = r(46593)) && n.__esModule ? n : {
					default: n
				};
				e.default = function(t) {
					return function() {
						var e = t.apply(this, arguments);
						return new o.default((function(t, r) {
							return function n(i, u) {
								try {
									var a = e[i](u),
										s = a.value
								} catch (t) {
									return void r(t)
								}
								if (!a.done) return o.default.resolve(s).then((function(
									t) {
									n("next", t)
								}), (function(t) {
									n("throw", t)
								}));
								t(s)
							}("next")
						}))
					}
				}
			},
			88106: (t, e, r) => {
				"use strict";
				e.__esModule = !0;
				var n, o = (n = r(32242)) && n.__esModule ? n : {
					default: n
				};
				e.default = function(t, e, r) {
					return e in t ? (0, o.default)(t, e, {
						value: r,
						enumerable: !0,
						configurable: !0,
						writable: !0
					}) : t[e] = r, t
				}
			},
			88239: (t, e, r) => {
				"use strict";
				e.__esModule = !0;
				var n, o = (n = r(52945)) && n.__esModule ? n : {
					default: n
				};
				e.default = o.default || function(t) {
					for (var e = 1; e < arguments.length; e++) {
						var r = arguments[e];
						for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
					}
					return t
				}
			},
			52548: (t, e, r) => {
				var n = function() {
						return this
					}() || Function("return this")(),
					o = n.regeneratorRuntime && Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime") >=
					0,
					i = o && n.regeneratorRuntime;
				if (n.regeneratorRuntime = void 0, t.exports = r(58544), o) n.regeneratorRuntime = i;
				else try {
					delete n.regeneratorRuntime
				} catch (t) {
					n.regeneratorRuntime = void 0
				}
			},
			58544: t => {
				! function(e) {
					"use strict";
					var r, n = Object.prototype,
						o = n.hasOwnProperty,
						i = "function" == typeof Symbol ? Symbol : {},
						u = i.iterator || "@@iterator",
						a = i.asyncIterator || "@@asyncIterator",
						s = i.toStringTag || "@@toStringTag",
						c = e.regeneratorRuntime;
					if (c) t.exports = c;
					else {
						(c = e.regeneratorRuntime = t.exports).wrap = g;
						var f = "suspendedStart",
							l = "suspendedYield",
							p = "executing",
							h = "completed",
							d = {},
							v = {};
						v[u] = function() {
							return this
						};
						var _ = Object.getPrototypeOf,
							m = _ && _(_(N([])));
						m && m !== n && o.call(m, u) && (v = m);
						var y = x.prototype = E.prototype = Object.create(v);
						b.prototype = y.constructor = x, x.constructor = b, x[s] = b.displayName =
							"GeneratorFunction", c.isGeneratorFunction = function(t) {
								var e = "function" == typeof t && t.constructor;
								return !!e && (e === b || "GeneratorFunction" === (e.displayName || e.name))
							}, c.mark = function(t) {
								return Object.setPrototypeOf ? Object.setPrototypeOf(t, x) : (t.__proto__ = x,
										s in t || (t[s] = "GeneratorFunction")), t.prototype = Object.create(y),
									t
							}, c.awrap = function(t) {
								return {
									__await: t
								}
							}, O(w.prototype), w.prototype[a] = function() {
								return this
							}, c.AsyncIterator = w, c.async = function(t, e, r, n) {
								var o = new w(g(t, e, r, n));
								return c.isGeneratorFunction(e) ? o : o.next().then((function(t) {
									return t.done ? t.value : o.next()
								}))
							}, O(y), y[s] = "Generator", y[u] = function() {
								return this
							}, y.toString = function() {
								return "[object Generator]"
							}, c.keys = function(t) {
								var e = [];
								for (var r in t) e.push(r);
								return e.reverse(),
									function r() {
										for (; e.length;) {
											var n = e.pop();
											if (n in t) return r.value = n, r.done = !1, r
										}
										return r.done = !0, r
									}
							}, c.values = N, A.prototype = {
								constructor: A,
								reset: function(t) {
									if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this
										.done = !1, this.delegate = null, this.method = "next", this.arg =
										r, this.tryEntries.forEach(P), !t)
										for (var e in this) "t" === e.charAt(0) && o.call(this, e) && !
											isNaN(+e.slice(1)) && (this[e] = r)
								},
								stop: function() {
									this.done = !0;
									var t = this.tryEntries[0].completion;
									if ("throw" === t.type) throw t.arg;
									return this.rval
								},
								dispatchException: function(t) {
									if (this.done) throw t;
									var e = this;

									function n(n, o) {
										return a.type = "throw", a.arg = t, e.next = n, o && (e.method =
											"next", e.arg = r), !!o
									}
									for (var i = this.tryEntries.length - 1; i >= 0; --i) {
										var u = this.tryEntries[i],
											a = u.completion;
										if ("root" === u.tryLoc) return n("end");
										if (u.tryLoc <= this.prev) {
											var s = o.call(u, "catchLoc"),
												c = o.call(u, "finallyLoc");
											if (s && c) {
												if (this.prev < u.catchLoc) return n(u.catchLoc, !0);
												if (this.prev < u.finallyLoc) return n(u.finallyLoc)
											} else if (s) {
												if (this.prev < u.catchLoc) return n(u.catchLoc, !0)
											} else {
												if (!c) throw new Error(
													"try statement without catch or finally");
												if (this.prev < u.finallyLoc) return n(u.finallyLoc)
											}
										}
									}
								},
								abrupt: function(t, e) {
									for (var r = this.tryEntries.length - 1; r >= 0; --r) {
										var n = this.tryEntries[r];
										if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev <
											n.finallyLoc) {
											var i = n;
											break
										}
									}
									i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i
										.finallyLoc && (i = null);
									var u = i ? i.completion : {};
									return u.type = t, u.arg = e, i ? (this.method = "next", this.next = i
										.finallyLoc, d) : this.complete(u)
								},
								complete: function(t, e) {
									if ("throw" === t.type) throw t.arg;
									return "break" === t.type || "continue" === t.type ? this.next = t.arg :
										"return" === t.type ? (this.rval = this.arg = t.arg, this.method =
											"return", this.next = "end") : "normal" === t.type && e && (this
											.next = e), d
								},
								finish: function(t) {
									for (var e = this.tryEntries.length - 1; e >= 0; --e) {
										var r = this.tryEntries[e];
										if (r.finallyLoc === t) return this.complete(r.completion, r
											.afterLoc), P(r), d
									}
								},
								catch: function(t) {
									for (var e = this.tryEntries.length - 1; e >= 0; --e) {
										var r = this.tryEntries[e];
										if (r.tryLoc === t) {
											var n = r.completion;
											if ("throw" === n.type) {
												var o = n.arg;
												P(r)
											}
											return o
										}
									}
									throw new Error("illegal catch attempt")
								},
								delegateYield: function(t, e, n) {
									return this.delegate = {
										iterator: N(t),
										resultName: e,
										nextLoc: n
									}, "next" === this.method && (this.arg = r), d
								}
							}
					}

					function g(t, e, r, n) {
						var o = e && e.prototype instanceof E ? e : E,
							i = Object.create(o.prototype),
							u = new A(n || []);
						return i._invoke = function(t, e, r) {
							var n = f;
							return function(o, i) {
								if (n === p) throw new Error("Generator is already running");
								if (n === h) {
									if ("throw" === o) throw i;
									return M()
								}
								for (r.method = o, r.arg = i;;) {
									var u = r.delegate;
									if (u) {
										var a = S(u, r);
										if (a) {
											if (a === d) continue;
											return a
										}
									}
									if ("next" === r.method) r.sent = r._sent = r.arg;
									else if ("throw" === r.method) {
										if (n === f) throw n = h, r.arg;
										r.dispatchException(r.arg)
									} else "return" === r.method && r.abrupt("return", r.arg);
									n = p;
									var s = T(t, e, r);
									if ("normal" === s.type) {
										if (n = r.done ? h : l, s.arg === d) continue;
										return {
											value: s.arg,
											done: r.done
										}
									}
									"throw" === s.type && (n = h, r.method = "throw", r.arg = s.arg)
								}
							}
						}(t, r, u), i
					}

					function T(t, e, r) {
						try {
							return {
								type: "normal",
								arg: t.call(e, r)
							}
						} catch (t) {
							return {
								type: "throw",
								arg: t
							}
						}
					}

					function E() {}

					function b() {}

					function x() {}

					function O(t) {
						["next", "throw", "return"].forEach((function(e) {
							t[e] = function(t) {
								return this._invoke(e, t)
							}
						}))
					}

					function w(t) {
						function e(r, n, i, u) {
							var a = T(t[r], t, n);
							if ("throw" !== a.type) {
								var s = a.arg,
									c = s.value;
								return c && "object" == typeof c && o.call(c, "__await") ? Promise.resolve(c
									.__await).then((function(t) {
									e("next", t, i, u)
								}), (function(t) {
									e("throw", t, i, u)
								})) : Promise.resolve(c).then((function(t) {
									s.value = t, i(s)
								}), u)
							}
							u(a.arg)
						}
						var r;
						this._invoke = function(t, n) {
							function o() {
								return new Promise((function(r, o) {
									e(t, n, r, o)
								}))
							}
							return r = r ? r.then(o, o) : o()
						}
					}

					function S(t, e) {
						var n = t.iterator[e.method];
						if (n === r) {
							if (e.delegate = null, "throw" === e.method) {
								if (t.iterator.return && (e.method = "return", e.arg = r, S(t, e), "throw" === e
										.method)) return d;
								e.method = "throw", e.arg = new TypeError(
									"The iterator does not provide a 'throw' method")
							}
							return d
						}
						var o = T(n, t.iterator, e.arg);
						if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, d;
						var i = o.arg;
						return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e
							.method && (e.method = "next", e.arg = r), e.delegate = null, d) : i : (e
							.method = "throw", e.arg = new TypeError("iterator result is not an object"), e
							.delegate = null, d)
					}

					function L(t) {
						var e = {
							tryLoc: t[0]
						};
						1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this
							.tryEntries.push(e)
					}

					function P(t) {
						var e = t.completion || {};
						e.type = "normal", delete e.arg, t.completion = e
					}

					function A(t) {
						this.tryEntries = [{
							tryLoc: "root"
						}], t.forEach(L, this), this.reset(!0)
					}

					function N(t) {
						if (t) {
							var e = t[u];
							if (e) return e.call(t);
							if ("function" == typeof t.next) return t;
							if (!isNaN(t.length)) {
								var n = -1,
									i = function e() {
										for (; ++n < t.length;)
											if (o.call(t, n)) return e.value = t[n], e.done = !1, e;
										return e.value = r, e.done = !0, e
									};
								return i.next = i
							}
						}
						return {
							next: M
						}
					}

					function M() {
						return {
							value: r,
							done: !0
						}
					}
				}(function() {
					return this
				}() || Function("return this")())
			},
			94942: (t, e, r) => {
				t.exports = r(52548)
			},
			92742: (t, e, r) => {
				var n = r(34579),
					o = n.JSON || (n.JSON = {
						stringify: JSON.stringify
					});
				t.exports = function(t) {
					return o.stringify.apply(o, arguments)
				}
			},
			56981: (t, e, r) => {
				r(72699), t.exports = r(34579).Object.assign
			},
			33391: (t, e, r) => {
				r(31477);
				var n = r(34579).Object;
				t.exports = function(t, e, r) {
					return n.defineProperty(t, e, r)
				}
			},
			80112: (t, e, r) => {
				r(94058), r(91867), r(73871), r(32878), r(95971), r(22526), t.exports = r(34579).Promise
			},
			85663: t => {
				t.exports = function(t) {
					if ("function" != typeof t) throw TypeError(t + " is not a function!");
					return t
				}
			},
			79003: t => {
				t.exports = function() {}
			},
			29142: t => {
				t.exports = function(t, e, r, n) {
					if (!(t instanceof e) || void 0 !== n && n in t) throw TypeError(r +
						": incorrect invocation!");
					return t
				}
			},
			12159: (t, e, r) => {
				var n = r(36727);
				t.exports = function(t) {
					if (!n(t)) throw TypeError(t + " is not an object!");
					return t
				}
			},
			57428: (t, e, r) => {
				var n = r(7932),
					o = r(78728),
					i = r(16531);
				t.exports = function(t) {
					return function(e, r, u) {
						var a, s = n(e),
							c = o(s.length),
							f = i(u, c);
						if (t && r != r) {
							for (; c > f;)
								if ((a = s[f++]) != a) return !0
						} else
							for (; c > f; f++)
								if ((t || f in s) && s[f] === r) return t || f || 0;
						return !t && -1
					}
				}
			},
			14677: (t, e, r) => {
				var n = r(32894),
					o = r(22939)("toStringTag"),
					i = "Arguments" == n(function() {
						return arguments
					}());
				t.exports = function(t) {
					var e, r, u;
					return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(r =
							function(t, e) {
								try {
									return t[e]
								} catch (t) {}
							}(e = Object(t), o)) ? r : i ? n(e) : "Object" == (u = n(e)) && "function" ==
						typeof e.callee ? "Arguments" : u
				}
			},
			32894: t => {
				var e = {}.toString;
				t.exports = function(t) {
					return e.call(t).slice(8, -1)
				}
			},
			34579: t => {
				var e = t.exports = {
					version: "2.6.12"
				};
				"number" == typeof __e && (__e = e)
			},
			19216: (t, e, r) => {
				var n = r(85663);
				t.exports = function(t, e, r) {
					if (n(t), void 0 === e) return t;
					switch (r) {
						case 1:
							return function(r) {
								return t.call(e, r)
							};
						case 2:
							return function(r, n) {
								return t.call(e, r, n)
							};
						case 3:
							return function(r, n, o) {
								return t.call(e, r, n, o)
							}
					}
					return function() {
						return t.apply(e, arguments)
					}
				}
			},
			8333: t => {
				t.exports = function(t) {
					if (null == t) throw TypeError("Can't call method on  " + t);
					return t
				}
			},
			89666: (t, e, r) => {
				t.exports = !r(7929)((function() {
					return 7 != Object.defineProperty({}, "a", {
						get: function() {
							return 7
						}
					}).a
				}))
			},
			97467: (t, e, r) => {
				var n = r(36727),
					o = r(33938).document,
					i = n(o) && n(o.createElement);
				t.exports = function(t) {
					return i ? o.createElement(t) : {}
				}
			},
			73338: t => {
				t.exports =
					"constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf"
					.split(",")
			},
			83856: (t, e, r) => {
				var n = r(33938),
					o = r(34579),
					i = r(19216),
					u = r(41818),
					a = r(27069),
					s = function(t, e, r) {
						var c, f, l, p = t & s.F,
							h = t & s.G,
							d = t & s.S,
							v = t & s.P,
							_ = t & s.B,
							m = t & s.W,
							y = h ? o : o[e] || (o[e] = {}),
							g = y.prototype,
							T = h ? n : d ? n[e] : (n[e] || {}).prototype;
						for (c in h && (r = e), r)(f = !p && T && void 0 !== T[c]) && a(y, c) || (l = f ? T[c] :
							r[c], y[c] = h && "function" != typeof T[c] ? r[c] : _ && f ? i(l, n) : m && T[
								c] == l ? function(t) {
								var e = function(e, r, n) {
									if (this instanceof t) {
										switch (arguments.length) {
											case 0:
												return new t;
											case 1:
												return new t(e);
											case 2:
												return new t(e, r)
										}
										return new t(e, r, n)
									}
									return t.apply(this, arguments)
								};
								return e.prototype = t.prototype, e
							}(l) : v && "function" == typeof l ? i(Function.call, l) : l, v && ((y
								.virtual || (y.virtual = {}))[c] = l, t & s.R && g && !g[c] && u(g, c,
								l)))
					};
				s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t.exports = s
			},
			7929: t => {
				t.exports = function(t) {
					try {
						return !!t()
					} catch (t) {
						return !0
					}
				}
			},
			45576: (t, e, r) => {
				var n = r(19216),
					o = r(95602),
					i = r(45991),
					u = r(12159),
					a = r(78728),
					s = r(83728),
					c = {},
					f = {},
					l = t.exports = function(t, e, r, l, p) {
						var h, d, v, _, m = p ? function() {
								return t
							} : s(t),
							y = n(r, l, e ? 2 : 1),
							g = 0;
						if ("function" != typeof m) throw TypeError(t + " is not iterable!");
						if (i(m)) {
							for (h = a(t.length); h > g; g++)
								if ((_ = e ? y(u(d = t[g])[0], d[1]) : y(t[g])) === c || _ === f) return _
						} else
							for (v = m.call(t); !(d = v.next()).done;)
								if ((_ = o(v, y, d.value, e)) === c || _ === f) return _
					};
				l.BREAK = c, l.RETURN = f
			},
			33938: t => {
				var e = t.exports = "undefined" != typeof window && window.Math == Math ? window :
					"undefined" != typeof self && self.Math == Math ? self : Function("return this")();
				"number" == typeof __g && (__g = e)
			},
			27069: t => {
				var e = {}.hasOwnProperty;
				t.exports = function(t, r) {
					return e.call(t, r)
				}
			},
			41818: (t, e, r) => {
				var n = r(4743),
					o = r(83101);
				t.exports = r(89666) ? function(t, e, r) {
					return n.f(t, e, o(1, r))
				} : function(t, e, r) {
					return t[e] = r, t
				}
			},
			54881: (t, e, r) => {
				var n = r(33938).document;
				t.exports = n && n.documentElement
			},
			33758: (t, e, r) => {
				t.exports = !r(89666) && !r(7929)((function() {
					return 7 != Object.defineProperty(r(97467)("div"), "a", {
						get: function() {
							return 7
						}
					}).a
				}))
			},
			46778: t => {
				t.exports = function(t, e, r) {
					var n = void 0 === r;
					switch (e.length) {
						case 0:
							return n ? t() : t.call(r);
						case 1:
							return n ? t(e[0]) : t.call(r, e[0]);
						case 2:
							return n ? t(e[0], e[1]) : t.call(r, e[0], e[1]);
						case 3:
							return n ? t(e[0], e[1], e[2]) : t.call(r, e[0], e[1], e[2]);
						case 4:
							return n ? t(e[0], e[1], e[2], e[3]) : t.call(r, e[0], e[1], e[2], e[3])
					}
					return t.apply(r, e)
				}
			},
			50799: (t, e, r) => {
				var n = r(32894);
				t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
					return "String" == n(t) ? t.split("") : Object(t)
				}
			},
			45991: (t, e, r) => {
				var n = r(15449),
					o = r(22939)("iterator"),
					i = Array.prototype;
				t.exports = function(t) {
					return void 0 !== t && (n.Array === t || i[o] === t)
				}
			},
			36727: t => {
				t.exports = function(t) {
					return "object" == typeof t ? null !== t : "function" == typeof t
				}
			},
			95602: (t, e, r) => {
				var n = r(12159);
				t.exports = function(t, e, r, o) {
					try {
						return o ? e(n(r)[0], r[1]) : e(r)
					} catch (e) {
						var i = t.return;
						throw void 0 !== i && n(i.call(t)), e
					}
				}
			},
			33945: (t, e, r) => {
				"use strict";
				var n = r(98989),
					o = r(83101),
					i = r(25378),
					u = {};
				r(41818)(u, r(22939)("iterator"), (function() {
					return this
				})), t.exports = function(t, e, r) {
					t.prototype = n(u, {
						next: o(1, r)
					}), i(t, e + " Iterator")
				}
			},
			45700: (t, e, r) => {
				"use strict";
				var n = r(16227),
					o = r(83856),
					i = r(57470),
					u = r(41818),
					a = r(15449),
					s = r(33945),
					c = r(25378),
					f = r(95089),
					l = r(22939)("iterator"),
					p = !([].keys && "next" in [].keys()),
					h = "keys",
					d = "values",
					v = function() {
						return this
					};
				t.exports = function(t, e, r, _, m, y, g) {
					s(r, e, _);
					var T, E, b, x = function(t) {
							if (!p && t in L) return L[t];
							switch (t) {
								case h:
								case d:
									return function() {
										return new r(this, t)
									}
							}
							return function() {
								return new r(this, t)
							}
						},
						O = e + " Iterator",
						w = m == d,
						S = !1,
						L = t.prototype,
						P = L[l] || L["@@iterator"] || m && L[m],
						A = P || x(m),
						N = m ? w ? x("entries") : A : void 0,
						M = "Array" == e && L.entries || P;
					if (M && (b = f(M.call(new t))) !== Object.prototype && b.next && (c(b, O, !0), n ||
							"function" == typeof b[l] || u(b, l, v)), w && P && P.name !== d && (S = !0, A =
							function() {
								return P.call(this)
							}), n && !g || !p && !S && L[l] || u(L, l, A), a[e] = A, a[O] = v, m)
						if (T = {
								values: w ? A : x(d),
								keys: y ? A : x(h),
								entries: N
							}, g)
							for (E in T) E in L || i(L, E, T[E]);
						else o(o.P + o.F * (p || S), e, T);
					return T
				}
			},
			96630: (t, e, r) => {
				var n = r(22939)("iterator"),
					o = !1;
				try {
					var i = [7][n]();
					i.return = function() {
						o = !0
					}, Array.from(i, (function() {
						throw 2
					}))
				} catch (t) {}
				t.exports = function(t, e) {
					if (!e && !o) return !1;
					var r = !1;
					try {
						var i = [7],
							u = i[n]();
						u.next = function() {
							return {
								done: r = !0
							}
						}, i[n] = function() {
							return u
						}, t(i)
					} catch (t) {}
					return r
				}
			},
			85084: t => {
				t.exports = function(t, e) {
					return {
						value: e,
						done: !!t
					}
				}
			},
			15449: t => {
				t.exports = {}
			},
			16227: t => {
				t.exports = !0
			},
			81601: (t, e, r) => {
				var n = r(33938),
					o = r(62569).set,
					i = n.MutationObserver || n.WebKitMutationObserver,
					u = n.process,
					a = n.Promise,
					s = "process" == r(32894)(u);
				t.exports = function() {
					var t, e, r, c = function() {
						var n, o;
						for (s && (n = u.domain) && n.exit(); t;) {
							o = t.fn, t = t.next;
							try {
								o()
							} catch (n) {
								throw t ? r() : e = void 0, n
							}
						}
						e = void 0, n && n.enter()
					};
					if (s) r = function() {
						u.nextTick(c)
					};
					else if (!i || n.navigator && n.navigator.standalone)
						if (a && a.resolve) {
							var f = a.resolve(void 0);
							r = function() {
								f.then(c)
							}
						} else r = function() {
							o.call(n, c)
						};
					else {
						var l = !0,
							p = document.createTextNode("");
						new i(c).observe(p, {
							characterData: !0
						}), r = function() {
							p.data = l = !l
						}
					}
					return function(n) {
						var o = {
							fn: n,
							next: void 0
						};
						e && (e.next = o), t || (t = o, r()), e = o
					}
				}
			},
			59304: (t, e, r) => {
				"use strict";
				var n = r(85663);

				function o(t) {
					var e, r;
					this.promise = new t((function(t, n) {
						if (void 0 !== e || void 0 !== r) throw TypeError(
						"Bad Promise constructor");
						e = t, r = n
					})), this.resolve = n(e), this.reject = n(r)
				}
				t.exports.f = function(t) {
					return new o(t)
				}
			},
			88082: (t, e, r) => {
				"use strict";
				var n = r(89666),
					o = r(46162),
					i = r(48195),
					u = r(86274),
					a = r(66530),
					s = r(50799),
					c = Object.assign;
				t.exports = !c || r(7929)((function() {
					var t = {},
						e = {},
						r = Symbol(),
						n = "abcdefghijklmnopqrst";
					return t[r] = 7, n.split("").forEach((function(t) {
						e[t] = t
					})), 7 != c({}, t)[r] || Object.keys(c({}, e)).join("") != n
				})) ? function(t, e) {
					for (var r = a(t), c = arguments.length, f = 1, l = i.f, p = u.f; c > f;)
						for (var h, d = s(arguments[f++]), v = l ? o(d).concat(l(d)) : o(d), _ = v.length,
								m = 0; _ > m;) h = v[m++], n && !p.call(d, h) || (r[h] = d[h]);
					return r
				} : c
			},
			98989: (t, e, r) => {
				var n = r(12159),
					o = r(57856),
					i = r(73338),
					u = r(58989)("IE_PROTO"),
					a = function() {},
					s = function() {
						var t, e = r(97467)("iframe"),
							n = i.length;
						for (e.style.display = "none", r(54881).appendChild(e), e.src = "javascript:", (t = e
								.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"),
							t.close(), s = t.F; n--;) delete s.prototype[i[n]];
						return s()
					};
				t.exports = Object.create || function(t, e) {
					var r;
					return null !== t ? (a.prototype = n(t), r = new a, a.prototype = null, r[u] = t) : r =
						s(), void 0 === e ? r : o(r, e)
				}
			},
			4743: (t, e, r) => {
				var n = r(12159),
					o = r(33758),
					i = r(33206),
					u = Object.defineProperty;
				e.f = r(89666) ? Object.defineProperty : function(t, e, r) {
					if (n(t), e = i(e, !0), n(r), o) try {
						return u(t, e, r)
					} catch (t) {}
					if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
					return "value" in r && (t[e] = r.value), t
				}
			},
			57856: (t, e, r) => {
				var n = r(4743),
					o = r(12159),
					i = r(46162);
				t.exports = r(89666) ? Object.defineProperties : function(t, e) {
					o(t);
					for (var r, u = i(e), a = u.length, s = 0; a > s;) n.f(t, r = u[s++], e[r]);
					return t
				}
			},
			48195: (t, e) => {
				e.f = Object.getOwnPropertySymbols
			},
			95089: (t, e, r) => {
				var n = r(27069),
					o = r(66530),
					i = r(58989)("IE_PROTO"),
					u = Object.prototype;
				t.exports = Object.getPrototypeOf || function(t) {
					return t = o(t), n(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t
						.constructor ? t.constructor.prototype : t instanceof Object ? u : null
				}
			},
			12963: (t, e, r) => {
				var n = r(27069),
					o = r(7932),
					i = r(57428)(!1),
					u = r(58989)("IE_PROTO");
				t.exports = function(t, e) {
					var r, a = o(t),
						s = 0,
						c = [];
					for (r in a) r != u && n(a, r) && c.push(r);
					for (; e.length > s;) n(a, r = e[s++]) && (~i(c, r) || c.push(r));
					return c
				}
			},
			46162: (t, e, r) => {
				var n = r(12963),
					o = r(73338);
				t.exports = Object.keys || function(t) {
					return n(t, o)
				}
			},
			86274: (t, e) => {
				e.f = {}.propertyIsEnumerable
			},
			10931: t => {
				t.exports = function(t) {
					try {
						return {
							e: !1,
							v: t()
						}
					} catch (t) {
						return {
							e: !0,
							v: t
						}
					}
				}
			},
			87790: (t, e, r) => {
				var n = r(12159),
					o = r(36727),
					i = r(59304);
				t.exports = function(t, e) {
					if (n(t), o(e) && e.constructor === t) return e;
					var r = i.f(t);
					return (0, r.resolve)(e), r.promise
				}
			},
			83101: t => {
				t.exports = function(t, e) {
					return {
						enumerable: !(1 & t),
						configurable: !(2 & t),
						writable: !(4 & t),
						value: e
					}
				}
			},
			48144: (t, e, r) => {
				var n = r(41818);
				t.exports = function(t, e, r) {
					for (var o in e) r && t[o] ? t[o] = e[o] : n(t, o, e[o]);
					return t
				}
			},
			57470: (t, e, r) => {
				t.exports = r(41818)
			},
			39967: (t, e, r) => {
				"use strict";
				var n = r(33938),
					o = r(34579),
					i = r(4743),
					u = r(89666),
					a = r(22939)("species");
				t.exports = function(t) {
					var e = "function" == typeof o[t] ? o[t] : n[t];
					u && e && !e[a] && i.f(e, a, {
						configurable: !0,
						get: function() {
							return this
						}
					})
				}
			},
			25378: (t, e, r) => {
				var n = r(4743).f,
					o = r(27069),
					i = r(22939)("toStringTag");
				t.exports = function(t, e, r) {
					t && !o(t = r ? t : t.prototype, i) && n(t, i, {
						configurable: !0,
						value: e
					})
				}
			},
			58989: (t, e, r) => {
				var n = r(20250)("keys"),
					o = r(65730);
				t.exports = function(t) {
					return n[t] || (n[t] = o(t))
				}
			},
			20250: (t, e, r) => {
				var n = r(34579),
					o = r(33938),
					i = "__core-js_shared__",
					u = o[i] || (o[i] = {});
				(t.exports = function(t, e) {
					return u[t] || (u[t] = void 0 !== e ? e : {})
				})("versions", []).push({
					version: n.version,
					mode: r(16227) ? "pure" : "global",
					copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
				})
			},
			32707: (t, e, r) => {
				var n = r(12159),
					o = r(85663),
					i = r(22939)("species");
				t.exports = function(t, e) {
					var r, u = n(t).constructor;
					return void 0 === u || null == (r = n(u)[i]) ? e : o(r)
				}
			},
			90510: (t, e, r) => {
				var n = r(11052),
					o = r(8333);
				t.exports = function(t) {
					return function(e, r) {
						var i, u, a = String(o(e)),
							s = n(r),
							c = a.length;
						return s < 0 || s >= c ? t ? "" : void 0 : (i = a.charCodeAt(s)) < 55296 || i >
							56319 || s + 1 === c || (u = a.charCodeAt(s + 1)) < 56320 || u > 57343 ? t ?
							a.charAt(s) : i : t ? a.slice(s, s + 2) : u - 56320 + (i - 55296 << 10) +
							65536
					}
				}
			},
			62569: (t, e, r) => {
				var n, o, i, u = r(19216),
					a = r(46778),
					s = r(54881),
					c = r(97467),
					f = r(33938),
					l = f.process,
					p = f.setImmediate,
					h = f.clearImmediate,
					d = f.MessageChannel,
					v = f.Dispatch,
					_ = 0,
					m = {},
					y = function() {
						var t = +this;
						if (m.hasOwnProperty(t)) {
							var e = m[t];
							delete m[t], e()
						}
					},
					g = function(t) {
						y.call(t.data)
					};
				p && h || (p = function(t) {
						for (var e = [], r = 1; arguments.length > r;) e.push(arguments[r++]);
						return m[++_] = function() {
							a("function" == typeof t ? t : Function(t), e)
						}, n(_), _
					}, h = function(t) {
						delete m[t]
					}, "process" == r(32894)(l) ? n = function(t) {
						l.nextTick(u(y, t, 1))
					} : v && v.now ? n = function(t) {
						v.now(u(y, t, 1))
					} : d ? (i = (o = new d).port2, o.port1.onmessage = g, n = u(i.postMessage, i, 1)) : f
					.addEventListener && "function" == typeof postMessage && !f.importScripts ? (n =
						function(t) {
							f.postMessage(t + "", "*")
						}, f.addEventListener("message", g, !1)) : n = "onreadystatechange" in c("script") ?
					function(t) {
						s.appendChild(c("script")).onreadystatechange = function() {
							s.removeChild(this), y.call(t)
						}
					} : function(t) {
						setTimeout(u(y, t, 1), 0)
					}), t.exports = {
					set: p,
					clear: h
				}
			},
			16531: (t, e, r) => {
				var n = r(11052),
					o = Math.max,
					i = Math.min;
				t.exports = function(t, e) {
					return (t = n(t)) < 0 ? o(t + e, 0) : i(t, e)
				}
			},
			11052: t => {
				var e = Math.ceil,
					r = Math.floor;
				t.exports = function(t) {
					return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t)
				}
			},
			7932: (t, e, r) => {
				var n = r(50799),
					o = r(8333);
				t.exports = function(t) {
					return n(o(t))
				}
			},
			78728: (t, e, r) => {
				var n = r(11052),
					o = Math.min;
				t.exports = function(t) {
					return t > 0 ? o(n(t), 9007199254740991) : 0
				}
			},
			66530: (t, e, r) => {
				var n = r(8333);
				t.exports = function(t) {
					return Object(n(t))
				}
			},
			33206: (t, e, r) => {
				var n = r(36727);
				t.exports = function(t, e) {
					if (!n(t)) return t;
					var r, o;
					if (e && "function" == typeof(r = t.toString) && !n(o = r.call(t))) return o;
					if ("function" == typeof(r = t.valueOf) && !n(o = r.call(t))) return o;
					if (!e && "function" == typeof(r = t.toString) && !n(o = r.call(t))) return o;
					throw TypeError("Can't convert object to primitive value")
				}
			},
			65730: t => {
				var e = 0,
					r = Math.random();
				t.exports = function(t) {
					return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36))
				}
			},
			26640: (t, e, r) => {
				var n = r(33938).navigator;
				t.exports = n && n.userAgent || ""
			},
			22939: (t, e, r) => {
				var n = r(20250)("wks"),
					o = r(65730),
					i = r(33938).Symbol,
					u = "function" == typeof i;
				(t.exports = function(t) {
					return n[t] || (n[t] = u && i[t] || (u ? i : o)("Symbol." + t))
				}).store = n
			},
			83728: (t, e, r) => {
				var n = r(14677),
					o = r(22939)("iterator"),
					i = r(15449);
				t.exports = r(34579).getIteratorMethod = function(t) {
					if (null != t) return t[o] || t["@@iterator"] || i[n(t)]
				}
			},
			3882: (t, e, r) => {
				"use strict";
				var n = r(79003),
					o = r(85084),
					i = r(15449),
					u = r(7932);
				t.exports = r(45700)(Array, "Array", (function(t, e) {
					this._t = u(t), this._i = 0, this._k = e
				}), (function() {
					var t = this._t,
						e = this._k,
						r = this._i++;
					return !t || r >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == e ? r :
						"values" == e ? t[r] : [r, t[r]])
				}), "values"), i.Arguments = i.Array, n("keys"), n("values"), n("entries")
			},
			72699: (t, e, r) => {
				var n = r(83856);
				n(n.S + n.F, "Object", {
					assign: r(88082)
				})
			},
			31477: (t, e, r) => {
				var n = r(83856);
				n(n.S + n.F * !r(89666), "Object", {
					defineProperty: r(4743).f
				})
			},
			94058: () => {},
			32878: (t, e, r) => {
				"use strict";
				var n, o, i, u, a = r(16227),
					s = r(33938),
					c = r(19216),
					f = r(14677),
					l = r(83856),
					p = r(36727),
					h = r(85663),
					d = r(29142),
					v = r(45576),
					_ = r(32707),
					m = r(62569).set,
					y = r(81601)(),
					g = r(59304),
					T = r(10931),
					E = r(26640),
					b = r(87790),
					x = "Promise",
					O = s.TypeError,
					w = s.process,
					S = w && w.versions,
					L = S && S.v8 || "",
					P = s.Promise,
					A = "process" == f(w),
					N = function() {},
					M = o = g.f,
					R = !! function() {
						try {
							var t = P.resolve(1),
								e = (t.constructor = {})[r(22939)("species")] = function(t) {
									t(N, N)
								};
							return (A || "function" == typeof PromiseRejectionEvent) && t.then(
								N) instanceof e && 0 !== L.indexOf("6.6") && -1 === E.indexOf("Chrome/66")
						} catch (t) {}
					}(),
					I = function(t) {
						var e;
						return !(!p(t) || "function" != typeof(e = t.then)) && e
					},
					C = function(t, e) {
						if (!t._n) {
							t._n = !0;
							var r = t._c;
							y((function() {
								for (var n = t._v, o = 1 == t._s, i = 0, u = function(e) {
										var r, i, u, a = o ? e.ok : e.fail,
											s = e.resolve,
											c = e.reject,
											f = e.domain;
										try {
											a ? (o || (2 == t._h && G(t), t._h = 1), !0 === a ?
												r = n : (f && f.enter(), r = a(n), f && (f
													.exit(), u = !0)), r === e.promise ? c(
													O("Promise-chain cycle")) : (i = I(r)) ?
												i.call(r, s, c) : s(r)) : c(n)
										} catch (t) {
											f && !u && f.exit(), c(t)
										}
									}; r.length > i;) u(r[i++]);
								t._c = [], t._n = !1, e && !t._h && j(t)
							}))
						}
					},
					j = function(t) {
						m.call(s, (function() {
							var e, r, n, o = t._v,
								i = B(t);
							if (i && (e = T((function() {
									A ? w.emit("unhandledRejection", o, t) : (r = s
										.onunhandledrejection) ? r({
										promise: t,
										reason: o
									}) : (n = s.console) && n.error && n.error(
										"Unhandled promise rejection", o)
								})), t._h = A || B(t) ? 2 : 1), t._a = void 0, i && e.e) throw e.v
						}))
					},
					B = function(t) {
						return 1 !== t._h && 0 === (t._a || t._c).length
					},
					G = function(t) {
						m.call(s, (function() {
							var e;
							A ? w.emit("rejectionHandled", t) : (e = s.onrejectionhandled) && e({
								promise: t,
								reason: t._v
							})
						}))
					},
					k = function(t) {
						var e = this;
						e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), C(
							e, !0))
					},
					U = function(t) {
						var e, r = this;
						if (!r._d) {
							r._d = !0, r = r._w || r;
							try {
								if (r === t) throw O("Promise can't be resolved itself");
								(e = I(t)) ? y((function() {
									var n = {
										_w: r,
										_d: !1
									};
									try {
										e.call(t, c(U, n, 1), c(k, n, 1))
									} catch (t) {
										k.call(n, t)
									}
								})): (r._v = t, r._s = 1, C(r, !1))
							} catch (t) {
								k.call({
									_w: r,
									_d: !1
								}, t)
							}
						}
					};
				R || (P = function(t) {
					d(this, P, x, "_h"), h(t), n.call(this);
					try {
						t(c(U, this, 1), c(k, this, 1))
					} catch (t) {
						k.call(this, t)
					}
				}, (n = function(t) {
					this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0,
						this._h = 0, this._n = !1
				}).prototype = r(48144)(P.prototype, {
					then: function(t, e) {
						var r = M(_(this, P));
						return r.ok = "function" != typeof t || t, r.fail = "function" ==
							typeof e && e, r.domain = A ? w.domain : void 0, this._c.push(r),
							this._a && this._a.push(r), this._s && C(this, !1), r.promise
					},
					catch: function(t) {
						return this.then(void 0, t)
					}
				}), i = function() {
					var t = new n;
					this.promise = t, this.resolve = c(U, t, 1), this.reject = c(k, t, 1)
				}, g.f = M = function(t) {
					return t === P || t === u ? new i(t) : o(t)
				}), l(l.G + l.W + l.F * !R, {
					Promise: P
				}), r(25378)(P, x), r(39967)(x), u = r(34579).Promise, l(l.S + l.F * !R, x, {
					reject: function(t) {
						var e = M(this);
						return (0, e.reject)(t), e.promise
					}
				}), l(l.S + l.F * (a || !R), x, {
					resolve: function(t) {
						return b(a && this === u ? P : this, t)
					}
				}), l(l.S + l.F * !(R && r(96630)((function(t) {
					P.all(t).catch(N)
				}))), x, {
					all: function(t) {
						var e = this,
							r = M(e),
							n = r.resolve,
							o = r.reject,
							i = T((function() {
								var r = [],
									i = 0,
									u = 1;
								v(t, !1, (function(t) {
									var a = i++,
										s = !1;
									r.push(void 0), u++, e.resolve(t).then((
										function(t) {
											s || (s = !0, r[a] = t, --
												u || n(r))
										}), o)
								})), --u || n(r)
							}));
						return i.e && o(i.v), r.promise
					},
					race: function(t) {
						var e = this,
							r = M(e),
							n = r.reject,
							o = T((function() {
								v(t, !1, (function(t) {
									e.resolve(t).then(r.resolve, n)
								}))
							}));
						return o.e && n(o.v), r.promise
					}
				})
			},
			91867: (t, e, r) => {
				"use strict";
				var n = r(90510)(!0);
				r(45700)(String, "String", (function(t) {
					this._t = String(t), this._i = 0
				}), (function() {
					var t, e = this._t,
						r = this._i;
					return r >= e.length ? {
						value: void 0,
						done: !0
					} : (t = n(e, r), this._i += t.length, {
						value: t,
						done: !1
					})
				}))
			},
			95971: (t, e, r) => {
				"use strict";
				var n = r(83856),
					o = r(34579),
					i = r(33938),
					u = r(32707),
					a = r(87790);
				n(n.P + n.R, "Promise", {
					finally: function(t) {
						var e = u(this, o.Promise || i.Promise),
							r = "function" == typeof t;
						return this.then(r ? function(r) {
							return a(e, t()).then((function() {
								return r
							}))
						} : t, r ? function(r) {
							return a(e, t()).then((function() {
								throw r
							}))
						} : t)
					}
				})
			},
			22526: (t, e, r) => {
				"use strict";
				var n = r(83856),
					o = r(59304),
					i = r(10931);
				n(n.S, "Promise", {
					try: function(t) {
						var e = o.f(this),
							r = i(t);
						return (r.e ? e.reject : e.resolve)(r.v), e.promise
					}
				})
			},
			73871: (t, e, r) => {
				r(3882);
				for (var n = r(33938), o = r(41818), i = r(15449), u = r(22939)("toStringTag"), a =
						"CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList"
						.split(","), s = 0; s < a.length; s++) {
					var c = a[s],
						f = n[c],
						l = f && f.prototype;
					l && !l[u] && o(l, u, c), i[c] = i.Array
				}
			}
		},
		e = {};

	function r(n) {
		var o = e[n];
		if (void 0 !== o) return o.exports;
		var i = e[n] = {
			exports: {}
		};
		return t[n](i, i.exports, r), i.exports
	}(() => {
		"use strict";
		var t, e = (t = r(52945)) && t.__esModule ? t : {
				default: t
			},
			n = u(r(67873)),
			o = r(80018),
			i = u(r(88506));

		function u(t) {
			if (t && t.__esModule) return t;
			var e = {};
			if (null != t)
				for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
			return e.default = t, e
		}! function(t) {
			var r, u, a = document.querySelector("#openTabsBtn"),
				s = document.querySelector("#installTobyBtn"),
				c = function(t, e) {
					e.parentNode.insertBefore(t, e.nextSibling)
				},
				f = [];
			r = location.href.split("/").filter((function(t) {
				return "" !== t
			})).reverse()[0], u = console.error, n.getPublicList(r).then((function(t) {
				t.publicToken = r, t.public = !0,
					function(t) {
						f = t.cards
					}(t)
			})).catch(u);
			var l = document.createElement("button");
			l.setAttribute("class", a.getAttribute("class")), l.innerHTML = a.innerHTML, l.onclick =
		function() {
				return function(t) {
					var r = t.map((function(t) {
						return (0, e.default)({}, t, {
							url: (0, o.isNoteTab)(t) ? t.url + "#" + t.id : t.url
						})
					}));
					chrome.runtime.sendMessage(chrome.runtime.id, {
						request: i.OPEN_ALL,
						cards: r
					})
				}(f)
			}, c(l, a), a.parentNode.removeChild(a);
			var p = document.createElement("button");
			p.setAttribute("class", s.getAttribute("class")), p.classList.remove("Button--chrome"), p.classList
				.add("Button--large"), p.innerHTML = "Open Toby", p.onclick = function() {
					chrome.runtime.sendMessage(chrome.runtime.id, {
						request: i.OPEN_TOBY
					})
				}, c(p, s), s.parentNode.removeChild(s)
		}(window)
	})()
})();
