const t = {};
const e = "juejin-extension-1.0.0.279";
async function n(t, n) {
  let a = t;
  i(t) && (a = t.url.replace("chrome-extension", "https"));
  (await caches.open(e)).put(a, n.clone());
}
async function a(t) {
  let e = t;
  return (
    i(t) && (e = t.url.replace("chrome-extension", "https")), caches.match(e)
  );
}
function c(t) {
  return (
    !(function (t) {
      return (
        t.url.includes("_generated_background_page.html") ||
        t.url.includes("background.js")
      );
    })(t) &&
    !(function (t) {
      return s.some((e) => -1 !== t.url.indexOf(e));
    })(t) &&
    !(function (t) {
      return /main\.html/i.test(t.url);
    })(t) &&
    ((function (t) {
      let e = !1;
      try {
        const n = new URL(t.url);
        e =
          -1 !== n.host.indexOf("bytedance.net") ||
          -1 !== n.host.indexOf("bytescm.com") ||
          -1 !== n.host.indexOf("pstatp.com");
      } catch (n) {
        e =
          -1 !== t.url.indexOf("bytedance.net") ||
          -1 !== t.url.indexOf("bytescm.com") ||
          -1 !== t.url.indexOf("pstatp.com");
      }
      return e;
    })(t) ||
      i(t) ||
      !1)
  );
}
function i(t) {
  return t.url.startsWith("chrome-extension:");
}
const s = [
  "/extension",
  "/user_api",
  "/interact_api",
  "/version_api",
  "/growth_api",
  "/recommend_api",
  "/note_api",
];
const r = ["online", "test"].includes("online") ? 6e5 : -1,
  o = "https://e.juejin.cn/version_api/get";
let u = "",
  h = -1;
async function l() {
  if (
    (!u &&
      (u = await (async function () {
        let n = await caches.match(o);
        n ||
          ((n = await fetch(o, { headers: t })),
          (await caches.open(e)).put(o, n.clone()));
        return await n.text().catch((t) => "");
      })()),
    Date.now() - h > r)
  ) {
    const n = await (async function () {
      const n = await fetch(o, { headers: t });
      (await caches.open(e)).put(o, n.clone());
      return await n.text().catch((t) => "");
    })();
    n && (u = n), (h = Date.now());
  }
}
async function d(e) {
  const a = await (async function (t) {
    const e = new URL(t),
      n =
        "chrome-extension:" === e.protocol
          ? t.replace(
              `${e.protocol}//${e.host}/`,
              "https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/"
            )
          : t;
    return await l(), n.replace("1.0.0.279", u);
  })(e.url);
  e.url;
  try {
    let c = await fetch(a, { headers: t });
    return (
      200 !== c.status && (c.status, (c = await fetch(e, { headers: t }))),
      await n(e, c.clone()),
      c
    );
  } catch (c) {
    return fetch(e, { headers: t });
  }
}
async function f(e) {
  try {
    const c = await a(e);
    if (c)
      return (
        !(function (t) {
          return /\.[a-f0-9]+\.(svg|png|gif|jpe?g)/i.test(t.url);
        })(e) &&
          (async function (e, a) {
            const c = await fetch(e.url, {
              method: "HEAD",
              cache: "no-cache",
              headers: t,
            });
            if (
              (function (t, e) {
                const n =
                    e.headers.get("Content-Md5") ||
                    e.headers.get("content-md5"),
                  a =
                    e.headers.get("Last-Modified") ||
                    e.headers.get("last-modified"),
                  c =
                    t.headers.get("Content-Md5") ||
                    t.headers.get("content-md5"),
                  i =
                    t.headers.get("Last-Modified") ||
                    t.headers.get("last-modified"),
                  s = !((i && a) || (c && n));
                s && e.url;
                if (
                  s ||
                  c !== n ||
                  new Date(i).getTime() < new Date(a).getTime()
                )
                  return e.url, !0;
                return !1;
              })(a, c)
            ) {
              n(e, (await fetch(e, { cache: "no-cache", headers: t })).clone());
            }
          })(e, c),
        c
      );
    const i = await fetch(e.url, { headers: t });
    return n(e, i.clone()), i;
  } catch (c) {
    e.url;
  }
}
self.addEventListener("install", (t) => {
  self.skipWaiting();
}),
  self.addEventListener("activate", (t) => {
    t.waitUntil(
      (async () => {
        try {
          await l(), await clients.claim();
          const t = await caches.keys();
          await Promise.all(
            t.map((t) => {
              if (e !== t) return caches.delete(t);
            })
          );
        } catch (t) {}
      })()
    );
  }),
  self.addEventListener("fetch", (e) => {
    const { request: n } = e;
    if ("GET" === n.method && c(n))
      if ("chrome-extension:" === location.protocol) {
        const c = /\.js$/i.test(n.url);
        e.respondWith(
          c
            ? (async function (e) {
                try {
                  e.url;
                  let t = await a(e);
                  return t ? (d(e), t) : ((t = await d(e)), t);
                } catch (n) {
                  return e.url, fetch(e, { headers: t });
                }
              })(n)
            : f(n)
        );
      } else e.respondWith(f(n));
  });
