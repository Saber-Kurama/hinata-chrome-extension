(() => {
	"use strict";
	window, document.querySelectorAll(".js-Button--install").forEach((function(t) {
		t.innerText = "Open Toby", t.setAttribute("href", "/open-toby")
	})), document.querySelectorAll(".js-Button--installChrome").forEach((function(t) {
		t.setAttribute("href", "/open-toby"), t.querySelector(".js-Button--installChromeText")
			.innerText = "Open Toby"
	}))
})();
