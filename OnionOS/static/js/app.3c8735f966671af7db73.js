webpackJsonp(
  [5],
  {
    "/nOM": function (t, e) {},
    "0EBt": function (t, e) {},
    "0Zpu": function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i("J7JO"),
        s = i("po9y"),
        a = i("uscc"),
        o = i("bAPZ"),
        r = i("hNqL"),
        c = i("c27y"),
        l = {
          mqtt: {
            "#": function (t, e) {
              this.$store.dispatch("mqttMessage", { topic: e, data: t });
            },
          },
          name: "ConsoleFrame",
          data: function () {
            return { aboutActive: !1 };
          },
          components: {
            TaskBar: n.default,
            AppView: s.default,
            LoginView: a.default,
            SetupView: o.default,
            Toast: r.default,
            About: c.default,
          },
          created: function () {
            this.$mqtt.subscribe("/console/+");
            var t = function (t) {
              t && "offline" === t.type
                ? this.$store.commit("updateInternetStatus", !1)
                : this.$store.dispatch("checkInternet");
            }.bind(this);
            t(),
              window.addEventListener("online", t),
              window.addEventListener("offline", t),
              this.$store.dispatch("launchApp", { appId: "launcher" }),
              this.$store.dispatch("getDeviceInfo"),
              this.$store.dispatch("initCDK"),
              this.$store.dispatch("refreshAppList");
          },
        },
        d = {
          render: function () {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              { staticClass: "consoleframe" },
              [
                i("TaskBar", {
                  attrs: {
                    id: "taskbar",
                    "solid-bg": "launcher" !== t.$store.getters.activeApp,
                  },
                  on: {
                    about: function (e) {
                      t.aboutActive = !0;
                    },
                  },
                }),
                t._v(" "),
                i("AppView"),
                t._v(" "),
                i("LoginView"),
                t._v(" "),
                i("SetupView"),
                t._v(" "),
                i("Toast"),
                t._v(" "),
                i("About", {
                  attrs: { active: t.aboutActive },
                  on: {
                    close: function (e) {
                      t.aboutActive = !1;
                    },
                  },
                }),
                t._v(" "),
                i("iframe", {
                  attrs: {
                    id: "gaFrame",
                    src: "http://s3-us-west-2.amazonaws.com/onion-cdn/os/GA/index.html",
                  },
                }),
              ],
              1
            );
          },
          staticRenderFns: [],
        };
      var u = i("VU/8")(
        l,
        d,
        !1,
        function (t) {
          i("RgkA");
        },
        "data-v-32d93575",
        null
      );
      e.default = u.exports;
    },
    "7JcZ": function (t, e) {
      t.exports =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIuMDEgMjEuNDlMMjMuNjQgN2MtLjQ1LS4zNC00LjkzLTQtMTEuNjQtNEM1LjI4IDMgLjgxIDYuNjYuMzYgN2wxMS42MyAxNC40OS4wMS4wMS4wMS0uMDF6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==";
    },
    "9kgI": function (t, e) {},
    "B4+s": function (t, e) {
      t.exports =
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwLjUgOS41Yy4yOCAwIC41NS4wNC44MS4wOEwyNCA2Yy0zLjM0LTIuNTEtNy41LTQtMTItNFMzLjM0IDMuNDkgMCA2bDEyIDE2IDMuNS00LjY3VjE0LjVjMC0yLjc2IDIuMjQtNSA1LTV6TTIzIDE2di0xLjVjMC0xLjM4LTEuMTItMi41LTIuNS0yLjVTMTggMTMuMTIgMTggMTQuNVYxNmMtLjU1IDAtMSAuNDUtMSAxdjRjMCAuNTUuNDUgMSAxIDFoNWMuNTUgMCAxLS40NSAxLTF2LTRjMC0uNTUtLjQ1LTEtMS0xem0tMSAwaC0zdi0xLjVjMC0uODMuNjctMS41IDEuNS0xLjVzMS41LjY3IDEuNSAxLjVWMTZ6Ii8+PC9zdmc+";
    },
    E4d3: function (t, e, i) {
      var n = {
        "./About": ["c27y"],
        "./About.vue": ["c27y"],
        "./AppLauncher": ["LyiH", 1],
        "./AppLauncher.vue": ["LyiH", 1],
        "./AppManagerApp": ["pNZA", 3],
        "./AppManagerApp.vue": ["pNZA", 3],
        "./AppView": ["po9y"],
        "./AppView.vue": ["po9y"],
        "./ConsoleFrame": ["0Zpu"],
        "./ConsoleFrame.vue": ["0Zpu"],
        "./ExternalApp": ["//Yz", 0],
        "./ExternalApp.vue": ["//Yz", 0],
        "./IframeApp": ["xSqd"],
        "./IframeApp.vue": ["xSqd"],
        "./LoginForm": ["gosb"],
        "./LoginForm.vue": ["gosb"],
        "./LoginView": ["uscc"],
        "./LoginView.vue": ["uscc"],
        "./PreferencesApp": ["9P2q", 2],
        "./PreferencesApp.vue": ["9P2q", 2],
        "./SetupView": ["bAPZ"],
        "./SetupView.vue": ["bAPZ"],
        "./SoftwareUpgrade": ["KDLF"],
        "./SoftwareUpgrade.vue": ["KDLF"],
        "./TaskBar": ["J7JO"],
        "./TaskBar.vue": ["J7JO"],
        "./Toast": ["hNqL"],
        "./Toast.vue": ["hNqL"],
        "./WifiClientConfig": ["xtvL"],
        "./WifiClientConfig.vue": ["xtvL"],
      };
      function s(t) {
        var e = n[t];
        return e
          ? Promise.all(e.slice(1).map(i.e)).then(function () {
              return i(e[0]);
            })
          : Promise.reject(new Error("Cannot find module '" + t + "'."));
      }
      (s.keys = function () {
        return Object.keys(n);
      }),
        (s.id = "E4d3"),
        (t.exports = s);
    },
    FkBp: function (t, e) {},
    IbZh: function (t, e) {},
    J7JO: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
        render: function () {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i(
            "div",
            { staticClass: "taskbar barAlign", class: { solidBg: t.solidBg } },
            [
              i("div", { staticClass: "taskBarStart barAlign" }, [
                i(
                  "div",
                  { staticClass: "starticon c-hand", on: { click: t.onHome } },
                  [
                    i("img", {
                      attrs: { src: "static/img/icons/onion.svg", alt: "" },
                    }),
                  ]
                ),
              ]),
              t._v(" "),
              i(
                "div",
                { staticClass: "taskBarBody barAlign" },
                t._l(t.$store.getters.runningApps, function (e) {
                  return i(
                    "div",
                    {
                      key: e.id,
                      staticClass: "appIconContainer tooltip tooltip-dir",
                      attrs: { "data-tooltip": e.name },
                      on: {
                        click: function (i) {
                          t.openApp(e.id);
                        },
                        mouseover: function (i) {
                          t.hoverApp = e.id;
                        },
                        mouseout: function (e) {
                          t.hoverApp = "";
                        },
                      },
                    },
                    [
                      i("img", {
                        staticClass: "appIcon",
                        attrs: { src: e.icon },
                      }),
                      t._v(" "),
                      i("i", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.hoverApp === e.id,
                            expression: "hoverApp === app.id",
                          },
                        ],
                        staticClass: "icon icon-cross closeBtn c-hand",
                        on: {
                          click: function (i) {
                            t.closeApp(e.id, i);
                          },
                        },
                      }),
                    ]
                  );
                })
              ),
              t._v(" "),
              i("div", { staticClass: "taskBarEnd barAlign" }, [
                t.$store.getters.isOnline
                  ? t._e()
                  : i(
                      "div",
                      {
                        staticClass: "tooltip tooltip-dir",
                        attrs: {
                          "data-tooltip":
                            "No Internet. Alcune funzionalità non potrebbero funzionare",
                        },
                      },
                      [i("i", { staticClass: "icon icon-stop no-wifi-icon" })]
                    ),
                t._v(" "),
                i(
                  "div",
                  {
                    staticClass: "tooltip tooltip-dir",
                    attrs: { "data-tooltip": "About" },
                    on: { click: t.about },
                  },
                  [
                    i("i", {
                      staticClass: "icon icon-message taskbar-icon c-hand",
                    }),
                  ]
                ),
                t._v(" "),
                i(
                  "div",
                  {
                    staticClass: "tooltip tooltip-dir",
                    attrs: { "data-tooltip": "Logout" },
                    on: { click: t.logout },
                  },
                  [
                    i("i", {
                      staticClass: "icon icon-shutdown taskbar-icon c-hand",
                    }),
                  ]
                ),
              ]),
            ]
          );
        },
        staticRenderFns: [],
      };
      var s = i("VU/8")(
        {
          name: "TaskBar",
          props: { solidBg: !0 },
          data: function () {
            return { hoverApp: "" };
          },
          methods: {
            onHome: function () {
              this.$store.dispatch("launchApp", { appId: "launcher" });
            },
            openApp: function (t) {
              this.$store.dispatch("launchApp", { appId: t });
            },
            closeApp: function (t, e) {
              this.$store.dispatch("closeApp", { appId: t }),
                e.stopPropagation && e.stopPropagation(),
                (this.hoverApp = "");
            },
            logout: function () {
              this.$store.dispatch("logout", {});
            },
            about: function () {
              this.$emit("about");
            },
          },
        },
        n,
        !1,
        function (t) {
          i("iN9j");
        },
        "data-v-a5eb4d82",
        null
      );
      e.default = s.exports;
    },
    KDLF: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i("//Fk"),
        s = i.n(n),
        a = {
          name: "SoftwareUpgrade",
          data: function () {
            return {
              upgradeInfo: {},
              view: {
                isLoading: !0,
                bShowTable: !1,
                bUpgradeButton: !1,
                bProgressBar: !1,
                bShowBlink: !1,
                msg: "",
                labelText: "",
                progress: { value: 0, max: 100 },
              },
              interval: { install: 65 },
            };
          },
          computed: {
            currentFirmware: function () {
              return this.upgradeInfo.device
                ? this.upgradeInfo.device.version +
                    " (b" +
                    this.upgradeInfo.device.build +
                    ")"
                : "X (bY)";
            },
            latestFirmware: function () {
              return this.upgradeInfo.repo
                ? this.upgradeInfo.repo.version +
                    " (b" +
                    this.upgradeInfo.repo.build +
                    ")"
                : "Z (bA)";
            },
            progressPercent: function () {
              return Math.round(
                (100 * this.view.progress.value) / this.view.progress.max
              );
            },
          },
          methods: {
            setView: function (t) {
              switch (t) {
                case "check":
                  (this.view.isLoading = !0),
                    (this.view.bUpgradeButton = !1),
                    (this.view.bProgressBar = !1),
                    (this.view.msg = "Controllo aggiornamenti...");
                  break;
                case "needUpdate":
                  (this.view.isLoading = !1),
                    (this.view.bUpgradeButton = !0),
                    (this.view.msg =
                      "<strong>Nuovo firmware disponibile!</strong><br>Aggiorna la tua wallbox all'ultimo firmware per ottenere tutti i nuovi vantaggi software da Emotion"),
                    (this.view.labelText =
                      "Your Omega will download and install the latest firmware, this process will take about 5 minutes.<br>It's important that you <strong>do NOT unplug your Omega during the update</strong>!");
                  break;
                case "onLatest":
                  (this.view.isLoading = !1),
                    (this.view.bUpgradeButton = !1),
                    (this.view.msg =
                      "Fantastico, sei sulla versione più recente, nessun aggiornamento necessario"),
                    this.$emit("next");
                  break;
                case "downloading":
                  (this.view.isLoading = !0),
                    (this.view.bUpgradeButton = !1),
                    (this.view.bProgressBar = !0),
                    (this.view.msg =
                      "Download degli aggiornamenti in corso, <strong>Non scollegare la tua wallbox</strong>"),
                    (this.view.labelText = "");
                  break;
                case "installing":
                  (this.view.isLoading = !0),
                    (this.view.bUpgradeButton = !1),
                    (this.view.bProgressBar = !0),
                    (this.view.msg =
                      "Installing updates, <strong>do NOT unplug your Omega!</strong>");
                  break;
                case "rebooting":
                  (this.view.isLoading = !0),
                    (this.view.bUpgradeButton = !1),
                    (this.view.bProgressBar = !1),
                    (this.view.msg =
                      "Omega is now <strong>initializing, do NOT unplug your Omega!</strong><br><br>Press Continue when your Omega stops blinking and remains on."),
                    (this.view.bShowBlink = !0),
                    this.$emit("next");
              }
            },
            setProgressBarMax: function (t) {
              this.view.progress.max = t;
            },
            setProgressBarValue: function (t) {
              this.view.progress.value = t;
            },
            upgrade: function () {
              var t = this;
              this.$store
                .dispatch("setInitialSetup", { value: 0 })
                .then(function () {
                  return t.downloadFirmware();
                })
                .then(function () {
                  return t.installFirmware();
                })
                .then(function () {
                  t.setView("rebooting");
                });
            },
            skip: function () {
              this.$emit("success");
            },
            downloadFirmware: function () {
              return new s.a(
                function (t, e) {
                  var i = this;
                  this.setView("downloading"),
                    this.$store
                      .dispatch("handleScript", {
                        code:
                          "wget -O " +
                          this.upgradeInfo.image.local +
                          " " +
                          this.upgradeInfo.image.url +
                          " ",
                      })
                      .then(function (e) {
                        i.$store
                          .dispatch("waitProcess", { pid: e.pid })
                          .then(function () {
                            console.log("download complete"),
                              clearInterval(n),
                              t();
                          });
                      }),
                    this.setProgressBarValue(0),
                    this.setProgressBarMax(this.upgradeInfo.image.size);
                  var n = setInterval(
                    function () {
                      var t = this;
                      this.$store
                        .dispatch("request", {
                          object: "file",
                          method: "stat",
                          params: { path: this.upgradeInfo.image.local },
                        })
                        .then(function (e) {
                          t.setProgressBarValue(e.size);
                        });
                    }.bind(this),
                    250
                  );
                }.bind(this)
              );
            },
            installFirmware: function () {
              return new s.a(
                function (t, e) {
                  var i = this;
                  this.setView("installing"),
                    this.$store
                      .dispatch("handleScript", {
                        code:
                          "sleep 1; sysupgrade " + this.upgradeInfo.image.local,
                      })
                      .then(function () {
                        var e = 0;
                        i.setProgressBarValue(e),
                          i.setProgressBarMax(i.interval.install);
                        var n = setInterval(
                          function () {
                            this.setProgressBarValue(e++);
                          }.bind(i),
                          1e3
                        );
                        setTimeout(function () {
                          clearInterval(n), t();
                        }, 1e3 * (i.interval.install + 5));
                      });
                }.bind(this)
              );
            },
          },
          created: function () {
            var t = this;
            this.setView("check"),
              this.$store
                .dispatch("request", {
                  object: "onion",
                  method: "oupgrade",
                  params: { params: { check: "" } },
                })
                .then(function (e) {
                  (t.upgradeInfo = e),
                    t.upgradeInfo.upgrade
                      ? t.setView("needUpdate")
                      : t.setView("onLatest");
                });
          },
        },
        o = {
          render: function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "container" }, [
              n("div", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.view.isLoading,
                    expression: "view.isLoading",
                  },
                ],
                staticClass: "loading loading-lg upgrade-loading",
              }),
              t._v(" "),
              n("div", {
                staticClass: "upgrade-message",
                domProps: { innerHTML: t._s(t.view.msg) },
              }),
              t._v(" "),
              n("img", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.view.bShowBlink,
                    expression: "view.bShowBlink",
                  },
                ],
                attrs: { src: i("x+Mj") },
              }),
              t._v(" "),
              n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.view.bProgressBar,
                      expression: "view.bProgressBar",
                    },
                  ],
                  staticClass: "bar progress-bar",
                },
                [
                  n("div", {
                    staticClass: "bar-item",
                    style: { width: t.progressPercent + "%" },
                  }),
                ]
              ),
              t._v(" "),
              n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !t.view.isLoading,
                      expression: "!view.isLoading",
                    },
                  ],
                  staticClass: "container",
                },
                [
                  n(
                    "table",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: t.view.bShowTable,
                          expression: "view.bShowTable",
                        },
                      ],
                      staticClass: "table",
                    },
                    [
                      n("tbody", [
                        n("tr", [
                          n("td", [t._v("Current Firmware")]),
                          t._v(" "),
                          n("td", [t._v(t._s(t.currentFirmware))]),
                        ]),
                        t._v(" "),
                        n("tr", [
                          n("td", [t._v("Latest Firmware")]),
                          t._v(" "),
                          n("td", [t._v(t._s(t.latestFirmware))]),
                        ]),
                      ]),
                    ]
                  ),
                  t._v(" "),
                  n("div", { staticClass: "upgrade-controls" }, [
                    n(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.view.bUpgradeButton,
                            expression: "view.bUpgradeButton",
                          },
                        ],
                        staticClass: "btn btn-success upgrade-btn",
                        on: { click: t.upgrade },
                      },
                      [t._v("Update Now")]
                    ),
                  ]),
                ]
              ),
              t._v(" "),
              n("span", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.view.labelText.length > 0,
                    expression: "view.labelText.length > 0",
                  },
                ],
                staticClass: "label message-box",
                domProps: { innerHTML: t._s(t.view.labelText) },
              }),
            ]);
          },
          staticRenderFns: [],
        };
      var r = i("VU/8")(
        a,
        o,
        !1,
        function (t) {
          i("lcN3");
        },
        "data-v-635e8e9a",
        null
      );
      e.default = r.exports;
    },
    NHnr: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i("7+uW"),
        s = (i("i8c9"), i("Wq+4"), i("G0B7")),
        a = i.n(s),
        o = i("BO1k"),
        r = i.n(o),
        c = i("//Fk"),
        l = i.n(c),
        d = i("mvHQ"),
        u = i.n(d),
        p = i("NYxO"),
        v = i("mtWM"),
        m = i.n(v);
      m.a.defaults.headers.post["Content-Type"] = "application/json";
      var h = function (t, e, i, n, s) {
          return new l.a(function (a, o) {
            m.a
              .post(t, {
                jsonrpc: "2.0",
                id: 0,
                method: "call",
                params: [e, i, n, s],
              })
              .then(function (t) {
                t.data &&
                  (t.data.result &&
                  Array.isArray(t.data.result) &&
                  void 0 !== t.data.result[0] &&
                  0 === t.data.result[0]
                    ? a(t.data.result[1])
                    : (console.log("ubus error!"),
                      t.data.error
                        ? o(t.data.error)
                        : t.data.result &&
                          Array.isArray(t.data.result) &&
                          void 0 !== t.data.result[0] &&
                          o(t.data.result[0])));
              })
              .catch(function (t) {
                console.error(t), o(t);
              });
          });
        },
        f = { AccessDenied: -32002 },
        g = function () {
          !(function (t, e) {
            var i = t.amplitude || { _q: [], _iq: {} },
              n = e.createElement("script");
            (n.type = "text/javascript"),
              (n.async = !0),
              (n.src =
                "https://cdn.amplitude.com/libs/amplitude-4.2.1-min.gz.js"),
              (n.onload = function () {
                t.amplitude.runQueuedFunctions
                  ? t.amplitude.runQueuedFunctions()
                  : console.log("[Amplitude] Error: could not load SDK");
              });
            var s = e.getElementsByTagName("script")[0];
            function a(t, e) {
              t.prototype[e] = function () {
                return (
                  this._q.push(
                    [e].concat(Array.prototype.slice.call(arguments, 0))
                  ),
                  this
                );
              };
            }
            s.parentNode.insertBefore(n, s);
            for (
              var o = function () {
                  return (this._q = []), this;
                },
                r = [
                  "add",
                  "append",
                  "clearAll",
                  "prepend",
                  "set",
                  "setOnce",
                  "unset",
                ],
                c = 0;
              c < r.length;
              c++
            )
              a(o, r[c]);
            i.Identify = o;
            for (
              var l = function () {
                  return (this._q = []), this;
                },
                d = [
                  "setProductId",
                  "setQuantity",
                  "setPrice",
                  "setRevenueType",
                  "setEventProperties",
                ],
                u = 0;
              u < d.length;
              u++
            )
              a(l, d[u]);
            i.Revenue = l;
            var p = [
              "init",
              "logEvent",
              "logRevenue",
              "setUserId",
              "setUserProperties",
              "setOptOut",
              "setVersionName",
              "setDomain",
              "setDeviceId",
              "setGlobalUserProperties",
              "identify",
              "clearUserProperties",
              "setGroup",
              "logRevenueV2",
              "regenerateDeviceId",
              "logEventWithTimestamp",
              "logEventWithGroups",
              "setSessionId",
              "resetSessionId",
            ];
            function v(t) {
              function e(e) {
                t[e] = function () {
                  t._q.push(
                    [e].concat(Array.prototype.slice.call(arguments, 0))
                  );
                };
              }
              for (var i = 0; i < p.length; i++) e(p[i]);
            }
            v(i),
              (i.getInstance = function (t) {
                return (
                  (t = (
                    t && 0 !== t.length ? t : "$default_instance"
                  ).toLowerCase()),
                  i._iq.hasOwnProperty(t) ||
                    ((i._iq[t] = { _q: [] }), v(i._iq[t])),
                  i._iq[t]
                );
              }),
              (t.amplitude = i);
          })(window, document),
            window.amplitude
              .getInstance()
              .init("285e8dd4e223767a74f3dd0d8ab990ae");
        },
        w = function (t, e) {
          window.amplitude.getInstance().logEvent(t, e);
        },
        b = i("4P7o"),
        A = i.n(b);
      n.a.use(p.a),
        (window.console.makeId = function () {
          return Math.random().toString(36).substring(2);
        });
      Object({ NODE_ENV: "production" }).DEV_HOST;
      var C = "" + window.location.hostname,
        k = "00000000000000000000000000000000",
        I = new p.a.Store({
          state: {
            system: { online: !1, initialSetup: !1 },
            device: {},
            rpc: {
              username: "",
              password: "",
              token:
                sessionStorage.getItem("_onion_console_session_token") || k,
              url: "http://" + window.location.hostname + "/ubus",
              heartbeatHandel: null,
            },
            mqtt: { subscription: {} },
            apps: {
              active: "launcher",
              running: [],
              available: {
                launcher: {
                  id: "launcher",
                  type: "AppLauncher",
                  name: "Launcher",
                  background: !0,
                },
              },
            },
            appsDefault: {
              active: "launcher",
              running: [],
              available: {
                launcher: {
                  id: "launcher",
                  type: "AppLauncher",
                  name: "Launcher",
                  background: !0,
                },
                "doc-app": {
                  id: "doc-app",
                  type: "IframeApp",
                  name: "Onion Docs",
                  icon: "static/img/icons/docs.svg",
                  params: { url: "https://docs.onion.io", internet: !0 },
                },
                "terminal-app": {
                  id: "terminal-app",
                  type: "IframeApp",
                  name: "Terminal",
                  icon: "static/img/icons/terminal.svg",
                  params: {
                    url: "http://" + window.location.hostname + ":4200",
                  },
                },
                "app-manager-app": {
                  id: "app-manager-app",
                  type: "AppManagerApp",
                  name: "App Manager",
                  icon: "static/img/icons/store.svg",
                },
              },
            },
          },
          mutations: {
            initialSetup: function (t, e) {
              t.system.initialSetup = e;
            },
            registerUser: function (t, e) {
              var i = e.username,
                n = e.password;
              (t.rpc.username = i), (t.rpc.password = n);
            },
            registerSession: function (t, e) {
              e
                ? ((t.rpc.token = e),
                  sessionStorage.setItem("_onion_console_session_token", e))
                : ((t.rpc.token = k),
                  sessionStorage.removeItem("_onion_console_session_token"));
            },
            registerAppHandler: function (t, e, i) {},
            launchApp: function (t, e) {
              for (
                var s = t.apps.available[e], a = !1, o = 0;
                o < t.apps.running.length;
                o++
              ) {
                if (t.apps.running[o].id === s.id) {
                  a = !0;
                  break;
                }
              }
              a ||
                (t.apps.running.push(s),
                "IframeApp" !== s.type &&
                  n.a.component(s.type, function () {
                    return i("E4d3")("./" + s.type);
                  }),
                "launcher" !== e && w("App - Open", { app: e })),
                (t.apps.active = e);
            },
            closeApp: function (t, e) {
              for (var i = 0; i < t.apps.running.length; i++) {
                if (t.apps.running[i].id === e) {
                  t.apps.running.splice(i, 1);
                  break;
                }
              }
            },
            updateInternetStatus: function (t, e) {
              t.system.online = e;
            },
            mqttSubscribe: function (t, e) {
              var i = e.appUid,
                n = e.topic;
              n in t.mqtt.subscription
                ? t.mqtt.subscription[n].push(i)
                : (t.mqtt.subscription[n] = [i]);
            },
            deviceInfo: function (t, e) {
              t.device = e;
            },
            updateAppList: function (t, e) {
              var i = JSON.parse(u()(t.appsDefault.available));
              n.a.set(t.apps, "available", i);
              for (var s = 0; s < e.length; s++) {
                var a = e[s];
                (a.type = a.type || "IframeApp"),
                  (a.icon = "http://" + C + "/apps/" + a.id + "/" + a.icon),
                  (a.params = a.params || {}),
                  "IframeApp" === a.type &&
                    void 0 === a.params.url &&
                    (a.params.url = "http://" + C + "/apps/" + a.id),
                  (a.params.url = a.params.url.replace("{{host}}", C)),
                  n.a.set(t.apps.available, a.id, a);
              }
            },
          },
          actions: {
            httpGetRequest: function (t, e) {
              t.dispatch;
              var i = e.url;
              return m.a.get(i);
            },
            checkInitialSetup: function (t) {
              var e = t.commit,
                i = t.dispatch;
              return new l.a(function (t, n) {
                i("httpGetRequest", {
                  url: "http://" + window.location.hostname + "/cgi-bin/setup",
                }).then(function (i) {
                  null !== i.data.initialSetup &&
                    e("initialSetup", i.data.initialSetup),
                    t();
                });
              });
            },
            setInitialSetup: function (t, e) {
              t.commit;
              var i = t.dispatch,
                n = e.value;
              return new l.a(function (t, e) {
                i("request", {
                  object: "uci",
                  method: "set",
                  params: {
                    config: "onion",
                    section: "console",
                    values: { setup: 1 === n ? "0" : "1" },
                  },
                }).then(function () {
                  i("request", {
                    object: "uci",
                    method: "commit",
                    params: { config: "onion" },
                  }).then(t);
                });
              });
            },
            login: function (t, e) {
              var i = t.commit,
                n = t.state,
                s = t.dispatch,
                a = e.username,
                o = e.password;
              return new l.a(function (t, e) {
                h(n.rpc.url, n.rpc.token, "session", "login", {
                  username: a,
                  password: o,
                })
                  .then(function (e) {
                    i("registerUser", { username: a, password: o }),
                      i("registerSession", e.ubus_rpc_session),
                      s("getDeviceInfo"),
                      s("refreshAppList"),
                      s("startHeartbeat"),
                      t(e);
                  })
                  .catch(function (t) {
                    console.log("login failed"), e(t);
                  });
              });
            },
            logout: function (t) {
              var e = t.commit;
              e("registerUser", { username: "", password: "" }),
                e("registerSession", null);
            },
            getDeviceInfo: function (t) {
              var e = t.commit,
                i = (t.state, t.dispatch);
              if (t.getters.isAuthenticated) {
                var n = i("request", {
                    object: "system",
                    method: "board",
                    params: {},
                  }),
                  s = i("request", {
                    object: "network.device",
                    method: "status",
                    params: {},
                  }),
                  a = i("request", {
                    object: "uci",
                    method: "get",
                    params: { config: "onion", section: "@onion[0]" },
                  });
                l.a.all([n, s, a]).then(function (t) {
                  var i = t[0];
                  (i.mac = {
                    ra0: t[1].ra0.macaddr,
                    apcli0: t[1].apcli0.macaddr,
                    eth0: t[1].eth0.macaddr,
                  }),
                    (i.firmware = {
                      build: t[2].values.build,
                      version: t[2].values.version,
                    }),
                    e("deviceInfo", i),
                    w("OnionOS - Login", i);
                });
              }
            },
            request: function (t, e) {
              t.commit;
              var i = t.state,
                n = t.dispatch,
                s = t.getters,
                a = e.object,
                o = e.method,
                r = e.params;
              return new l.a(function (t, e) {
                s.isAuthenticated
                  ? h(i.rpc.url, i.rpc.token, a, o, r)
                      .then(function (e) {
                        t(e);
                      })
                      .catch(function (t) {
                        console.log(t),
                          t &&
                            t.code === f.AccessDenied &&
                            (n("logout"), console.log("Session expired")),
                          e(t);
                      })
                  : e(Error("Not authenticated"));
              });
            },
            launchApp: function (t, e) {
              (0, t.commit)("launchApp", e.appId);
            },
            closeApp: function (t, e) {
              var i = t.commit;
              t.state;
              i("closeApp", e.appId), i("launchApp", "launcher");
            },
            notifyApp: function (t, e) {
              t.commit;
              var i = e.appUid,
                n = e.eventId,
                s = e.data,
                a = new Event("app-" + i);
              (a.data = { content: s }), (a.name = n), window.dispatchEvent(a);
            },
            checkInternet: function (t) {
              var e = t.commit;
              A()().then(function (t) {
                e("updateInternetStatus", t);
              });
            },
            initCDK: function (t) {
              var e = t.dispatch;
              window.addEventListener(
                "message",
                function (t) {
                  var i = t.data;
                  if (
                    void 0 !== i.event &&
                    void 0 !== i.instance &&
                    void 0 !== i.eventId &&
                    void 0 !== i.content &&
                    i.event.indexOf("Onion.CDK") > -1
                  )
                    switch (i.event.replace("Onion.CDK.", "")) {
                      case "Service":
                        w(i.event, i.content),
                          e("handleService", i).then(function (t) {
                            var e = new Event("app-" + i.instance);
                            (e.data = {
                              content: {
                                command: i.content.command,
                                name: i.content.service,
                                result: t,
                              },
                            }),
                              (e.name = i.event),
                              window.dispatchEvent(e);
                          });
                        break;
                      case "Subscribe":
                        w(i.event, i.content),
                          e("mqttSubscribe", {
                            topic: i.content.topic,
                            appUid: i.instance,
                          });
                        break;
                      case "Command":
                        e("handleCommand", {
                          cmd: i.content.cmd,
                          params: i.content.params,
                        }).then(function (t) {
                          e("notifyApp", {
                            appUid: i.instance,
                            eventId: "Onion.CDK.Command",
                            data: { cmd: i.content.cmd, resp: t.stdout },
                          });
                        });
                        break;
                      case "Toast":
                        console.toast(i.content.message);
                        break;
                      default:
                        console.log("unrecognized CDK event: " + i.event);
                    }
                },
                !1
              );
            },
            handleService: function (t, e) {
              var i = t.dispatch;
              return new l.a(function (t, n) {
                "start" === e.content.command || "stop" === e.content.command
                  ? i("request", {
                      object: "file",
                      method: "exec",
                      params: {
                        command: "/etc/init.d/" + e.content.service,
                        params: [e.content.command],
                      },
                    })
                      .then(function (e) {
                        t(!0);
                      })
                      .catch(function (e) {
                        t(!1);
                      })
                  : "list" === e.content.command
                  ? i("serviceStatus").then(function (i) {
                      i[e.content.service] ? t(!0) : t(!1);
                    })
                  : n(Error("Invalid input"));
              });
            },
            serviceStatus: function (t) {
              return (0, t.dispatch)("request", {
                object: "service",
                method: "list",
                params: {},
              });
            },
            readFile: function (t, e) {
              return (0, t.dispatch)("request", {
                object: "file",
                method: "read",
                params: { path: e.path },
              });
            },
            handleCommand: function (t, e) {
              return (0, t.dispatch)("request", {
                object: "file",
                method: "exec",
                params: { command: e.cmd, params: e.params },
              });
            },
            handleScript: function (t, e) {
              var i = t.dispatch,
                n = e.code,
                s = "/tmp/oos-" + console.makeId() + ".sh";
              return i("request", {
                object: "file",
                method: "write",
                params: { path: s, data: n },
              }).then(function (t) {
                var e = i("request", {
                  object: "onion-helper",
                  method: "background",
                  params: { command: "sh", params: [s] },
                });
                return (
                  e.finally(function () {
                    i("request", {
                      object: "file",
                      method: "exec",
                      params: { command: "rm", params: [s] },
                    }).then(console.log);
                  }),
                  e
                );
              });
            },
            waitProcess: function (t, e) {
              var i = t.dispatch,
                n = e.pid;
              return new l.a(function (t, e) {
                var s = setInterval(function () {
                  i("request", {
                    object: "file",
                    method: "exec",
                    params: { command: "ls", params: ["/proc/" + n + "/stat"] },
                  }).then(function (e) {
                    1 === e.code && (clearInterval(s), t());
                  });
                }, 1e3);
              });
            },
            mqttSubscribe: function (t, e) {
              var i = t.commit;
              t.dispatch;
              i("mqttSubscribe", { appUid: e.appUid, topic: e.topic });
            },
            mqttMessage: function (t, e) {
              var i = t.state,
                n = e.topic,
                s = e.data;
              if (n in i.mqtt.subscription) {
                var a = !0,
                  o = !1,
                  c = void 0;
                try {
                  for (
                    var l, d = r()(i.mqtt.subscription[n]);
                    !(a = (l = d.next()).done);
                    a = !0
                  ) {
                    var u = l.value,
                      p = new Event("app-" + u);
                    (p.data = { content: { topic: n, content: s.toString() } }),
                      (p.name = "Onion.CDK.Message"),
                      window.dispatchEvent(p);
                  }
                } catch (t) {
                  (o = !0), (c = t);
                } finally {
                  try {
                    !a && d.return && d.return();
                  } finally {
                    if (o) throw c;
                  }
                }
              }
            },
            refreshAppList: function (t) {
              var e = t.getters,
                i = t.commit,
                n = (t.state, t.dispatch);
              console.log("on refresh apps"),
                e.isAuthenticated &&
                  n("request", {
                    object: "onion-os",
                    method: "app-list",
                    params: {},
                  }).then(function (t) {
                    t.apps && i("updateAppList", t.apps);
                  });
            },
            startHeartbeat: function (t) {
              var e = t.state,
                i = t.dispatch;
              e.rpc.heartbeatHandel &&
                (clearInterval(e.rpc.heartbeatHandel),
                (e.rpc.heartbeatHandel = null)),
                (e.rpc.heartbeatHandel = setInterval(function () {
                  i("request", {
                    object: "session",
                    method: "access",
                    params: {},
                  });
                }, 6e4));
            },
            logInit: function () {
              g();
            },
            logEvent: function (t, e) {
              w(t, e);
            },
          },
          getters: {
            isAuthenticated: function (t) {
              return t.rpc.token !== k;
            },
            isInitialSetup: function (t) {
              return t.system.initialSetup;
            },
            isOnline: function (t) {
              return t.system.online;
            },
            sessionToken: function (t) {
              return t.rpc.token;
            },
            requestUrl: function (t) {
              return t.rpc.url;
            },
            activeApp: function (t) {
              return t.apps.active;
            },
            runningApps: function (t) {
              for (var e = [], i = 0; i < t.apps.running.length; i++) {
                var n = t.apps.running[i];
                void 0 === n.background && e.push(n);
              }
              return e;
            },
            availableApps: function (t) {
              var e = [];
              for (var i in t.apps.available) {
                var n = t.apps.available[i];
                void 0 === n.background && e.push(n);
              }
              return e;
            },
            deviceInfo: function (t) {
              return t.device;
            },
          },
        }),
        y = {
          name: "App",
          components: { ConsoleFrame: i("0Zpu").default },
          created: function () {
            this.$store.dispatch("checkInitialSetup"),
              this.$store.dispatch("logInit");
          },
        },
        M = {
          render: function () {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { attrs: { id: "app" } }, [e("ConsoleFrame")], 1);
          },
          staticRenderFns: [],
        };
      var L = i("VU/8")(
          y,
          M,
          !1,
          function (t) {
            i("mW+R");
          },
          null,
          null
        ).exports,
        B = i("AYPi"),
        S = i.n(B);
      n.a.config.productionTip = !1;
      Object({ NODE_ENV: "production" }).DEV_HOST;
      n.a.use(a.a, "ws://" + window.location.hostname + ":9001"),
        n.a.use(S.a, { id: "UA-48382427-15" }),
        new n.a({
          el: "#app",
          store: I,
          components: { App: L },
          template: "<App/>",
        });
    },
    RgkA: function (t, e) {},
    "Wq+4": function (t, e) {},
    bAPZ: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i("gosb"),
        s = i("xtvL"),
        a = i("KDLF"),
        o = {
          name: "SetupView",
          components: {
            LoginForm: n.default,
            WifiClientConfig: s.default,
            SoftwareUpgrade: a.default,
          },
          data: function () {
            return {
              initialSetup: !0,
              currentStep: 0,
              steps: [
                {
                  title: "Benvenuto",
                  heading:
                    "Ciao e benvenuto alla procedura guidata di configurazione della Wallbox Emotion.",
                  body: "Ci connetteremo a una rete WiFi e poi aggiorneremo il software del dispositivo. Se ti blocchi, dai un occhio  alla nostra guida introduttiva",
                  next: !0,
                },
                {
                  title: "Login",
                  heading: "Log in",
                  component: "LoginForm",
                  next: !1,
                },
                {
                  title: "WiFi",
                  heading: "Connettiti al WiFi",
                  component: "WifiClientConfig",
                  next: !1,
                  skip: !0,
                },
                {
                  title: "Software",
                  heading: "Software Update",
                  component: "SoftwareUpgrade",
                  next: !1,
                  skip: !0,
                },
                {
                  title: "Riavvio!",
                  heading: "Ottimo!",
                  body: "<strong>Hai configurato con successo la tua wallbox!</strong><br>Ora, spegni e riaccendi la tua wallbox!<br>",
                  done: !0,
                },
              ],
            };
          },
          methods: {
            getProgressColor: function (t) {
              return t <= this.currentStep ? "#9B4B63" : "#bdc3c7";
            },
            next: function () {
              this.currentStep += 1;
            },
            done: function () {
              (this.initialSetup = !1),
                this.$store.dispatch("setInitialSetup", { value: 0 }),
                this.$store.commit("initialSetup", 0);
            },
          },
        },
        r = {
          render: function () {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return t.$store.getters.isInitialSetup
              ? i("div", [
                  i(
                    "div",
                    {
                      staticClass: "modal setup-modal",
                      class: { active: t.$store.getters.isInitialSetup },
                    },
                    [
                      i(
                        "div",
                        { staticClass: "modal-container setup-progress" },
                        [
                          t._m(0),
                          t._v(" "),
                          i(
                            "div",
                            { staticClass: "bar bar-slider" },
                            t._l(t.steps, function (e, n) {
                              return i(
                                "div",
                                {
                                  key: n,
                                  staticClass: "bar-item",
                                  style: {
                                    width:
                                      (n / (t.steps.length - 1)) * 100 + "%",
                                    background: t.getProgressColor(n),
                                    "z-index": t.steps.length - n,
                                  },
                                },
                                [
                                  i(
                                    "button",
                                    {
                                      staticClass:
                                        "bar-slider-btn btn step-btn",
                                      style: {
                                        background: t.getProgressColor(n),
                                      },
                                    },
                                    [
                                      i(
                                        "div",
                                        {
                                          staticClass: "progress-title",
                                          style: {
                                            color: t.getProgressColor(n),
                                          },
                                        },
                                        [t._v(t._s(e.title))]
                                      ),
                                    ]
                                  ),
                                ]
                              );
                            })
                          ),
                        ]
                      ),
                      t._v(" "),
                      t._l(t.steps, function (e, n) {
                        return t.currentStep === n
                          ? i(
                              "div",
                              {
                                key: n,
                                staticClass: "modal-container setup-steps",
                              },
                              [
                                i("div", { staticClass: "modal-body" }, [
                                  e.heading
                                    ? i(
                                        "h4",
                                        { staticClass: "setup-heading" },
                                        [t._v(" " + t._s(e.heading) + " ")]
                                      )
                                    : t._e(),
                                  t._v(" "),
                                  i("div", {
                                    staticClass: "setup-instruction",
                                    domProps: { innerHTML: t._s(e.body) },
                                  }),
                                  t._v(" "),
                                  e.component
                                    ? i(
                                        "div",
                                        { staticClass: "setup-component" },
                                        [
                                          i(e.component, {
                                            tag: "component",
                                            on: {
                                              success: function (e) {
                                                t.currentStep++;
                                              },
                                              next: function (t) {
                                                e.next = !0;
                                              },
                                            },
                                          }),
                                        ],
                                        1
                                      )
                                    : t._e(),
                                ]),
                                t._v(" "),
                                e.next || e.done || e.skip
                                  ? i("div", { staticClass: "modal-footer" }, [
                                      e.next
                                        ? i(
                                            "button",
                                            {
                                              staticClass: "btn",
                                              on: { click: t.next },
                                            },
                                            [t._v("Continua")]
                                          )
                                        : t._e(),
                                      t._v(" "),
                                      e.skip
                                        ? i(
                                            "button",
                                            {
                                              staticClass: "btn btn-link",
                                              on: { click: t.next },
                                            },
                                            [t._v("Skip")]
                                          )
                                        : t._e(),
                                      t._v(" "),
                                      //   e.done
                                      //     ? i(
                                      //         "button",
                                      //         {
                                      //           staticClass: "btn",
                                      //           on: { click: t.done },
                                      //         },
                                      //         [t._v("Enter OnionOS")]
                                      //       )
                                      //     : t._e(),
                                    ])
                                  : t._e(),
                              ]
                            )
                          : t._e();
                      }),
                    ],
                    2
                  ),
                ])
              : t._e();
          },
          staticRenderFns: [
            function () {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { staticClass: "setup-image" }, [
                e("img", {
                  attrs: { src: "static/img//Onion-Logo-Full.png", alt: "" },
                }),
              ]);
            },
          ],
        };
      var c = i("VU/8")(
        o,
        r,
        !1,
        function (t) {
          i("hXiX");
        },
        "data-v-76b4f7a5",
        null
      );
      e.default = c.exports;
    },
    c27y: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
        render: function () {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i(
            "div",
            { staticClass: "modal modal-sm", class: { active: t.active } },
            [
              i("a", { staticClass: "modal-overlay", on: { click: t.close } }),
              t._v(" "),
              i("div", { staticClass: "modal-container" }, [
                i("div", { staticClass: "modal-header" }, [
                  i("a", {
                    staticClass: "btn btn-clear float-right",
                    on: { click: t.close },
                  }),
                ]),
                t._v(" "),
                i("div", { staticClass: "modal-body" }, [
                  i("div", { staticClass: "content" }, [
                    t._m(0),
                    t._v(" "),
                    i("div", { staticClass: "about-text" }, [
                      t._v("\n          OS version: 1.0\n          "),
                      i("br"),
                      t._v(
                        "\n          Kernel: " +
                          t._s(t.$store.getters.deviceInfo.kernel) +
                          "\n          "
                      ),
                      i("br"),
                      t._v(" "),
                      i("br"),
                      t._v(
                        "\n          Device: " +
                          t._s(t.$store.getters.deviceInfo.hostname) +
                          "\n          "
                      ),
                      i("br"),
                      t._v(
                        "\n          Model: " +
                          t._s(t.$store.getters.deviceInfo.model) +
                          "\n        "
                      ),
                    ]),
                  ]),
                ]),
                t._v(" "),
                i("div", { staticClass: "modal-footer" }, [
                  t._v(
                    "\n      © 2018 Onion Corpration All Rights Reserved.\n    "
                  ),
                ]),
              ]),
            ]
          );
        },
        staticRenderFns: [
          function () {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { staticClass: "about-image" }, [
              e("img", { attrs: { src: "static/img/OnionOS.svg", alt: "" } }),
            ]);
          },
        ],
      };
      var s = i("VU/8")(
        {
          name: "About",
          props: { active: !0 },
          methods: {
            close: function () {
              this.$emit("close");
            },
          },
        },
        n,
        !1,
        function (t) {
          i("0EBt");
        },
        "data-v-246997fc",
        null
      );
      e.default = s.exports;
    },
    gosb: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
        render: function () {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i(
            "div",
            {
              staticClass: "login-form",
              on: {
                keyup: function (e) {
                  return "button" in e ||
                    !t._k(e.keyCode, "enter", 13, e.key, "Enter")
                    ? t.login(e)
                    : null;
                },
              },
            },
            [
              i("div", { staticClass: "form-group" }, [
                i(
                  "label",
                  {
                    staticClass: "form-label",
                    attrs: { for: "input-username" },
                  },
                  [t._v("Username")]
                ),
                t._v(" "),
                i("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.username,
                      expression: "username",
                    },
                  ],
                  staticClass: "form-input",
                  attrs: {
                    type: "text",
                    id: "input-username",
                    placeholder: "Device Username",
                  },
                  domProps: { value: t.username },
                  on: {
                    input: function (e) {
                      e.target.composing || (t.username = e.target.value);
                    },
                  },
                }),
              ]),
              t._v(" "),
              i("div", { staticClass: "form-group" }, [
                i(
                  "label",
                  {
                    staticClass: "form-label",
                    attrs: { for: "input-password" },
                  },
                  [t._v("Password")]
                ),
                t._v(" "),
                i("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.password,
                      expression: "password",
                    },
                  ],
                  staticClass: "form-input",
                  attrs: {
                    type: "password",
                    id: "input-password",
                    placeholder: "Device Password",
                  },
                  domProps: { value: t.password },
                  on: {
                    input: function (e) {
                      e.target.composing || (t.password = e.target.value);
                    },
                  },
                }),
              ]),
              t._v(" "),
              i(
                "button",
                {
                  staticClass: "btn btn-success loginButton",
                  on: { click: t.login },
                },
                [t._v("Login")]
              ),
              t._v(" "),
              i("div", { staticClass: "divider login-devider" }),
              t._v(" "),
              t._m(0),
            ]
          );
        },
        staticRenderFns: [
          function () {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              { staticStyle: { color: "#bdc3c7", "text-align": "center" } },
              [
                this._v("Serve aiuto?"),
                e("br"),
                this._v("Leggi qui "),
                e(
                  "a",
                  {
                    attrs: {
                      href: "http://onioniot.com/getstarted",
                      target: "_blank",
                    },
                  },
                  [this._v("la nostra guida")]
                ),
              ]
            );
          },
        ],
      };
      var s = i("VU/8")(
        {
          name: "LoginForm",
          data: function () {
            return { username: "", password: "" };
          },
          methods: {
            login: function () {
              var t = this;
              this.$store
                .dispatch("login", {
                  username: this.username,
                  password: this.password,
                })
                .then(function (e) {
                  t.$emit("success");
                });
            },
          },
        },
        n,
        !1,
        function (t) {
          i("9kgI");
        },
        "data-v-329800c2",
        null
      );
      e.default = s.exports;
    },
    hNqL: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
          name: "Toast",
          data: function () {
            return { toastList: [] };
          },
          props: { timeout: { type: Number, default: 10 } },
          created: function () {
            window.console.toast = this.makeToast;
          },
          methods: {
            makeId: function () {
              return Math.random().toString(36).substring(2);
            },
            makeToast: function (t, e) {
              var i = { title: e, message: t, id: this.makeId(), value: 100 };
              this.toastList.push(i);
              var n = setInterval(
                function () {
                  var t = this.toastList.indexOf(i);
                  if (-1 !== t) {
                    var e = this.toastList[t];
                    (e.value -= 1),
                      e.value <= 0 && (clearInterval(n), this.close(t));
                  } else clearInterval(n);
                }.bind(this),
                (1e3 * this.timeout) / 100
              );
            },
            close: function (t) {
              this.toastList.splice(t, 1);
            },
          },
        },
        s = {
          render: function () {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              { staticClass: "toastPanel" },
              [
                i(
                  "transition-group",
                  { attrs: { name: "list" } },
                  t._l(t.toastList, function (e, n) {
                    return i(
                      "div",
                      { key: e.id, staticClass: "toast toast-item" },
                      [
                        i("button", {
                          staticClass: "btn btn-clear float-right",
                          on: {
                            click: function (e) {
                              t.close(n);
                            },
                          },
                        }),
                        t._v(" "),
                        e.title ? i("h6", [t._v("Title")]) : t._e(),
                        t._v("\n      " + t._s(e.message) + "\n      "),
                        i("div", { staticClass: "bar bar-sm" }, [
                          i("div", {
                            staticClass: "bar-item",
                            style: { width: e.value + "%" },
                          }),
                        ]),
                      ]
                    );
                  })
                ),
              ],
              1
            );
          },
          staticRenderFns: [],
        };
      var a = i("VU/8")(
        n,
        s,
        !1,
        function (t) {
          i("/nOM");
        },
        "data-v-f4677de0",
        null
      );
      e.default = a.exports;
    },
    hXiX: function (t, e) {},
    i8c9: function (t, e) {},
    iN9j: function (t, e) {},
    lcN3: function (t, e) {},
    lx7c: function (t, e) {},
    "mW+R": function (t, e) {},
    po9y: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
          name: "AppView",
          components: { IframeApp: i("xSqd").default },
          data: function () {
            return {};
          },
          methods: { closeApp: function (t) {} },
        },
        s = {
          render: function () {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i(
              "div",
              { staticClass: "appview" },
              t._l(t.$store.state.apps.running, function (e) {
                return i(e.type, {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.id === t.$store.state.apps.active,
                      expression: "app.id === $store.state.apps.active",
                    },
                  ],
                  key: e.id,
                  tag: "component",
                  attrs: { params: e.params },
                });
              })
            );
          },
          staticRenderFns: [],
        };
      var a = i("VU/8")(
        n,
        s,
        !1,
        function (t) {
          i("IbZh");
        },
        "data-v-60532d25",
        null
      );
      e.default = a.exports;
    },
    uscc: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
        render: function () {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i(
            "div",
            {
              staticClass: "modal modal-sm",
              class: { active: !t.$store.getters.isAuthenticated },
            },
            [
              i("div", { staticClass: "modal-container" }, [
                t._m(0),
                t._v(" "),
                i(
                  "div",
                  {
                    staticClass: "modal-body",
                    on: {
                      keyup: function (e) {
                        return "button" in e ||
                          !t._k(e.keyCode, "enter", 13, e.key, "Enter")
                          ? t.login(e)
                          : null;
                      },
                    },
                  },
                  [
                    i("div", { staticClass: "form-group" }, [
                      i(
                        "label",
                        {
                          staticClass: "form-label",
                          attrs: { for: "input-username" },
                        },
                        [t._v("Username")]
                      ),
                      t._v(" "),
                      i("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.username,
                            expression: "username",
                          },
                        ],
                        staticClass: "form-input",
                        attrs: { type: "text", id: "input-username" },
                        domProps: { value: t.username },
                        on: {
                          input: function (e) {
                            e.target.composing || (t.username = e.target.value);
                          },
                        },
                      }),
                    ]),
                    t._v(" "),
                    i("div", { staticClass: "form-group" }, [
                      i(
                        "label",
                        {
                          staticClass: "form-label",
                          attrs: { for: "input-password" },
                        },
                        [t._v("Password")]
                      ),
                      t._v(" "),
                      i("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: t.password,
                            expression: "password",
                          },
                        ],
                        staticClass: "form-input",
                        attrs: { type: "password", id: "input-password" },
                        domProps: { value: t.password },
                        on: {
                          input: function (e) {
                            e.target.composing || (t.password = e.target.value);
                          },
                        },
                      }),
                    ]),
                  ]
                ),
                t._v(" "),
                i("div", { staticClass: "modal-footer" }, [
                  i(
                    "button",
                    {
                      staticClass: "btn btn-success loginButton",
                      on: { click: t.login },
                    },
                    [t._v("Login")]
                  ),
                ]),
              ]),
            ]
          );
        },
        staticRenderFns: [
          function () {
            var t = this.$createElement,
              e = this._self._c || t;
            return e("div", { staticClass: "modal-header" }, [
              e("img", { attrs: { src: "static/img/OnionOS.svg" } }),
            ]);
          },
        ],
      };
      var s = i("VU/8")(
        {
          name: "LoginView",
          data: function () {
            return { username: "", password: "" };
          },
          methods: {
            login: function () {
              this.$store.dispatch("login", {
                username: this.username,
                password: this.password,
              });
            },
          },
        },
        n,
        !1,
        function (t) {
          i("vBNj");
        },
        "data-v-58b24980",
        null
      );
      e.default = s.exports;
    },
    vBNj: function (t, e) {},
    "x+Mj": function (t, e) {
      t.exports =
        "data:image/gif;base64,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";
    },
    xSqd: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = {
          name: "IframeApp",
          data: function () {
            return { AppUid: console.makeId() };
          },
          computed: {
            listenerUid: function () {
              return "app-" + this.AppUid;
            },
          },
          props: { params: {}, loaded: !1 },
          methods: {
            onLoad: function () {
              var t = this.$refs[this.AppUid];
              window.addEventListener(
                this.listenerUid,
                function (e) {
                  t.contentWindow.postMessage(
                    { event: e.name, content: e.data.content },
                    "*"
                  );
                },
                !1
              ),
                t.contentWindow.postMessage(
                  { event: "Onion.CDK.Init", appUid: this.AppUid },
                  "*"
                );
            },
          },
          created: function () {
            console.log("created");
          },
        },
        s = {
          render: function () {
            var t = this,
              e = t.$createElement,
              i = t._self._c || e;
            return i("div", { staticClass: "frameview" }, [
              !t.$store.getters.isOnline && t.params.internet
                ? i("div", { staticClass: "empty" }, [
                    t._m(0),
                    t._v(" "),
                    i("p", { staticClass: "empty-title h5" }, [
                      t._v("This App require an Internet Connection"),
                    ]),
                    t._v(" "),
                    i("p", { staticClass: "empty-subtitle" }, [
                      t._v(
                        "Please make sure your computer is connected to the Internet"
                      ),
                    ]),
                  ])
                : t._e(),
              t._v(" "),
              t.$store.getters.isOnline || !t.params.internet
                ? i("iframe", {
                    ref: t.AppUid,
                    attrs: {
                      src: t.params.url,
                      width: "100%",
                      height: "100%",
                      frameBorder: "0",
                    },
                    on: { load: t.onLoad },
                  })
                : t._e(),
            ]);
          },
          staticRenderFns: [
            function () {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { staticClass: "empty-icon" }, [
                e("i", { staticClass: "icon icon-cross" }),
              ]);
            },
          ],
        };
      var a = i("VU/8")(
        n,
        s,
        !1,
        function (t) {
          i("lx7c");
        },
        "data-v-cf53b736",
        null
      );
      e.default = a.exports;
    },
    xtvL: function (t, e, i) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = i("//Fk"),
        s = i.n(n),
        a = {
          name: "WifiClientConfig",
          data: function () {
            return {
              wifi: {
                radio: "ra0",
                configured: [],
                scanned: [],
                interval: { connectionCheck: 3, connectionTimeout: 45 },
              },
              inputNetwork: { ssid: "", encryption: "", password: "" },
              view: {
                bLoading: !0,
                bModalActive: !1,
                bModalLoading: !1,
                bModalForm: !1,
                bModalCloseAllowed: !0,
                modalButtons: "",
                modalTitle: "",
                modalText: "",
              },
            };
          },
          props: {
            viewConfiguredNetworks: Boolean,
            skipIfConnected: { type: Boolean, default: !0 },
          },
          computed: {
            wifiModalActive: function () {
              return this.view.bModalActive ? "active" : "";
            },
            passwordFormClass: function () {
              return this.validatePassword(
                this.inputNetwork.encryption,
                this.inputNetwork.password
              ).valid
                ? ""
                : "is-error";
            },
            passwordFormShowHint: function () {
              return !0;
            },
            passwordFormHintText: function () {
              var t = this.validatePassword(
                this.inputNetwork.encryption,
                this.inputNetwork.password
              ).err;
              return 0 === t.length && (t = "Password ok"), t;
            },
            joinButtonDisabled: function () {
              return this.validatePassword(
                this.inputNetwork.encryption,
                this.inputNetwork.password
              ).valid
                ? ""
                : "disabled";
            },
            allowClosingModal: function () {
              return this.view.bModalCloseAllowed;
            },
          },
          methods: {
            toggleLoading: function () {
              this.view.bLoading = !this.view.bLoading;
            },
            toggleWifiModal: function () {
              this.view.bModalActive = !this.view.bModalActive;
            },
            openWifiModal: function () {
              this.view.bModalActive = !0;
            },
            closeWifiModal: function () {
              this.view.bModalActive = !1;
            },
            setView: function (t) {
              switch (t) {
                case "listView":
                  this.closeWifiModal();
                  break;
                case "selectedNetwork":
                  (this.view.modalTitle = "WiFi Password"),
                    (this.view.bModalForm = !0),
                    (this.view.bModalCloseAllowed = !0),
                    (this.view.modalButtons = "join"),
                    "none" === this.inputNetwork.encryption &&
                      ((this.view.modalTitle = "Aggiungi Network"),
                      (this.view.bModalForm = !1),
                      (this.view.modalText =
                        'Join "' +
                        this.inputNetwork.ssid +
                        '", an <strong>open, unencrypted</strong> network?')),
                    0 === this.inputNetwork.ssid.length &&
                      ((this.view.modalTitle =
                        "This network has a hidden SSID"),
                      (this.view.bModalForm = !1),
                      (this.view.modalText =
                        'Please try connecting to a network with a visible SSID<br>or<br>connect to this network by following our <a href="http://onioniot.com/docs/omega2-docs/first-time-setup-command-line.html" target="_blank">guide to setup your Omega using the command line'),
                      (this.view.modalButtons = "")),
                    this.openWifiModal();
                  break;
                case "joiningNetwork":
                  (this.view.bModalLoading = !0),
                    (this.view.bModalForm = !1),
                    (this.view.bModalCloseAllowed = !1),
                    (this.view.modalButtons = ""),
                    (this.view.modalTitle =
                      'Aggiungi "' + this.inputNetwork.ssid + '" network'),
                    (this.view.modalText =
                      "Se eri già connesso, il tuo computer potrebbe disconnettersi durante questo processo. Se ciò accade, assicurati di riconnetterti alla tua wallbox");
                  break;
                case "connectionSuccess":
                  (this.view.bModalLoading = !1),
                    (this.view.bModalCloseAllowed = !0),
                    (this.view.modalButtons = ""),
                    (this.view.modalTitle =
                      'Joined "' + this.inputNetwork.ssid + '" network!'),
                    (this.view.modalText =
                      "Successfully connected to WiFi network");
                  break;
                case "connectionFail":
                  (this.view.bModalLoading = !1),
                    (this.view.bModalCloseAllowed = !1),
                    (this.view.modalButtons = "tryAgain"),
                    (this.view.modalTitle = "Could not connect"),
                    (this.view.modalText =
                      'Something went wrong connecting to the "' +
                      this.inputNetwork.ssid +
                      '" network!<br><br>Press <strong>Try Again</strong> to attempt to connect to a different network, or try following our <a href="http://onioniot.com/docs/omega2-docs/first-time-setup-command-line.html" target="_blank">guide to setup your Omega using the command line</a>.'),
                    this.openWifiModal();
                  break;
                case "skipStep":
                  (this.view.bModalLoading = !1),
                    (this.view.bModalCloseAllowed = !1),
                    (this.view.modalButtons = "skip"),
                    (this.view.modalTitle =
                      "Already connected to the internet"),
                    (this.view.modalText =
                      "It looks like your Omega is already connected to the internet, let's skip to the next step"),
                    this.openWifiModal();
              }
            },
            selectedNetwork: function (t, e) {
              (this.inputNetwork.ssid = t),
                (this.inputNetwork.encryption = e),
                (this.inputNetwork.password = ""),
                console.log(
                  "selected network " + t + ", encryption " + e + "!"
                ),
                this.setView("selectedNetwork");
            },
            readNetworkList: function () {
              return new s.a(
                function (t, e) {
                  this.$store
                    .dispatch("request", {
                      object: "onion",
                      method: "wifi-setup",
                      params: { command: "list", params: {} },
                    })
                    .then(function (e) {
                      e.success && t(e.results);
                    })
                    .catch(function (t) {
                      e(t);
                    });
                }.bind(this)
              );
            },
            scanForWifi: function () {
              return new s.a(
                function (t, e) {
                  this.$store
                    .dispatch("request", {
                      object: "onion",
                      method: "wifi-scan",
                      params: { device: this.wifi.radio },
                    })
                    .then(function (i) {
                      i.results && i.results instanceof Array
                        ? t(i.results)
                        : e();
                    })
                    .catch(function (t) {
                      e(t);
                    });
                }.bind(this)
              );
            },
            internetConnectivityCheck: function () {
              return new s.a(
                function (t, e) {
                  this.$store
                    .dispatch("request", {
                      object: "file",
                      method: "exec",
                      params: {
                        command: "wget",
                        params: ["--spider", "http://repo.onioniot.com/"],
                      },
                    })
                    .then(function (i) {
                      void 0 !== i && void 0 !== i.code && 0 === i.code
                        ? t(!0)
                        : e(!1);
                    });
                }.bind(this)
              );
            },
            addNetwork: function (t, e, i) {
              console.log("joining network"),
                this.$store
                  .dispatch("request", {
                    object: "onion",
                    method: "wifi-setup",
                    params: {
                      command: "add",
                      base64: !0,
                      params: {
                        ssid: btoa(t),
                        password: btoa(i),
                        encr: btoa(e),
                      },
                    },
                  })
                  .then(function (t) {
                    console.log();
                  });
            },
            validatePassword: function (t, e) {
              var i = !1,
                n = "";
              switch (t) {
                case "psk":
                case "psk2":
                  e.length < 8
                    ? ((i = !1), (n = "Password must be 8 characters or more"))
                    : e.length > 63
                    ? ((i = !1),
                      (n = "Password must be less than 64 characters"))
                    : (i = !0);
                  break;
                case "wep":
                  5 !== e.length && 13 !== e.length
                    ? ((i = !1),
                      (n = "Password must be either 5 or 13 characters"))
                    : (i = !0);
                  break;
                case "none":
                  i = !0;
                  break;
                default:
                  (i = !1), (n = "Unknown encryption type");
              }
              return { valid: i, err: n };
            },
            joinNetwork: function () {
              this.addNetwork(
                this.inputNetwork.ssid,
                this.inputNetwork.encryption,
                this.inputNetwork.password
              ),
                this.setView("joiningNetwork");
              var t = setInterval(
                  function () {
                    var i = this;
                    this.internetConnectivityCheck()
                      .then(function () {
                        clearInterval(t),
                          clearTimeout(e),
                          console.log(
                            "Device successfully connected to the internet!!"
                          ),
                          i.setView("connectionSuccess"),
                          setTimeout(function () {
                            i.completeWifiConfig();
                          }, 3e3),
                          i.readNetworkList().then(function (t) {
                            i.wifi.configured = t;
                          });
                      })
                      .catch(function (t) {});
                  }.bind(this),
                  1e3 * this.wifi.interval.connectionCheck
                ),
                e = setTimeout(
                  function () {
                    this.setView("connectionFail");
                  }.bind(this),
                  1e3 * this.wifi.interval.connectionTimeout
                );
            },
            completeWifiConfig: function () {
              this.$emit("success");
            },
            skipWifiConfig: function () {
              this.$emit("success");
            },
          },
          created: function () {
            var t = this,
              e = this.readNetworkList();
            e.then(function (e) {
              (t.wifi.configured = e),
                t.skipIfConnected &&
                  t.wifi.configured.length > 0 &&
                  (console.log(
                    "have configured networks, checking for internet connectivity"
                  ),
                  t
                    .internetConnectivityCheck()
                    .then(function (e) {
                      console.log(
                        "device already connected to internet, can skip wifi setup"
                      ),
                        t.setView("skipStep");
                    })
                    .catch(function (t) {
                      console.log("device not connected to internet!");
                    }));
            });
            var i = this.scanForWifi();
            i.then(function (e) {
              t.wifi.scanned = e.sort(function (t, e) {
                return t.rssi <= e.rssi ? -1 : t.rssi > e.rssi ? 1 : 0;
              });
            }),
              s.a.all([e, i]).then(function (e) {
                t.toggleLoading();
              });
          },
        },
        o = {
          render: function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n("div", { staticClass: "container" }, [
              n("div", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.view.bLoading,
                    expression: "view.bLoading",
                  },
                ],
                staticClass: "loading loading-lg",
              }),
              t._v(" "),
              n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value:
                        !t.view.bLoading &&
                        t.viewConfiguredNetworks &&
                        t.wifi.configured.length > 0,
                      expression:
                        "!view.bLoading && viewConfiguredNetworks && wifi.configured.length > 0",
                    },
                  ],
                  staticClass: "card",
                },
                [
                  t._m(0),
                  t._v(" "),
                  n("div", { staticClass: "card-body" }, [
                    n("table", { staticClass: "table table-hover" }, [
                      n(
                        "tbody",
                        t._l(t.wifi.configured, function (e) {
                          return n(
                            "tr",
                            { key: e.ssid, class: { active: e.enabled } },
                            [
                              n("td", [
                                t._v(t._s("" !== e.ssid ? e.ssid : "hidden")),
                              ]),
                              t._v(" "),
                              n("td", { staticClass: "wifi-icons" }, [
                                "none" !== e.encryption
                                  ? n("img", {
                                      attrs: { src: i("B4+s"), alt: "" },
                                    })
                                  : t._e(),
                                t._v(" "),
                                "none" === e.encryption
                                  ? n("img", {
                                      attrs: { src: i("7JcZ"), alt: "" },
                                    })
                                  : t._e(),
                              ]),
                            ]
                          );
                        })
                      ),
                    ]),
                  ]),
                ]
              ),
              t._v(" "),
              n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !t.view.bLoading,
                      expression: "!view.bLoading",
                    },
                  ],
                  staticClass: "card",
                },
                [
                  t._m(1),
                  t._v(" "),
                  n("div", { staticClass: "card-body" }, [
                    n("table", { staticClass: "table table-hover" }, [
                      n(
                        "tbody",
                        t._l(t.wifi.scanned, function (e) {
                          return n(
                            "tr",
                            {
                              key: e.bssid,
                              on: {
                                click: function (i) {
                                  t.selectedNetwork(e.ssid, e.encryption);
                                },
                              },
                            },
                            [
                              e.ssid.length > 0
                                ? n("td", [t._v(t._s(e.ssid))])
                                : n("td", [
                                    n("span", { staticClass: "text-italic" }, [
                                      t._v("Hidden"),
                                    ]),
                                  ]),
                              t._v(" "),
                              n("td", { staticClass: "wifi-icons" }, [
                                "none" !== e.encryption
                                  ? n("img", {
                                      attrs: { src: i("B4+s"), alt: "" },
                                    })
                                  : t._e(),
                                t._v(" "),
                                "none" === e.encryption
                                  ? n("img", {
                                      attrs: { src: i("7JcZ"), alt: "" },
                                    })
                                  : t._e(),
                              ]),
                            ]
                          );
                        })
                      ),
                    ]),
                  ]),
                ]
              ),
              t._v(" "),
              n(
                "div",
                {
                  staticClass: "modal",
                  class: t.wifiModalActive,
                  attrs: { id: "modal-id" },
                },
                [
                  t.allowClosingModal
                    ? n("a", {
                        staticClass: "modal-overlay",
                        attrs: { href: "#close", "aria-label": "Close" },
                        on: { click: t.closeWifiModal },
                      })
                    : n("a", { staticClass: "modal-overlay" }),
                  t._v(" "),
                  n("div", { staticClass: "modal-container" }, [
                    n("div", { staticClass: "modal-header" }, [
                      t.allowClosingModal
                        ? n("a", {
                            staticClass: "btn btn-clear float-right",
                            attrs: { href: "#close", "aria-label": "Close" },
                            on: { click: t.closeWifiModal },
                          })
                        : t._e(),
                      t._v(" "),
                      n("div", { staticClass: "modal-title h5" }, [
                        t._v(t._s(t.view.modalTitle)),
                      ]),
                    ]),
                    t._v(" "),
                    n("div", { staticClass: "modal-body" }, [
                      n("div", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.view.bModalLoading,
                            expression: "view.bModalLoading",
                          },
                        ],
                        staticClass: "loading loading-lg",
                      }),
                      t._v(" "),
                      n(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value:
                                t.view.bModalForm &&
                                "none" !== t.inputNetwork.encryption,
                              expression:
                                "view.bModalForm && inputNetwork.encryption !== 'none'",
                            },
                          ],
                          staticClass: "form-group",
                        },
                        [
                          n(
                            "label",
                            {
                              staticClass: "form-label float-left",
                              attrs: { for: "input-password" },
                            },
                            [
                              t._v(
                                'Inserisci la password "' +
                                  t._s(t.inputNetwork.ssid) +
                                  '"'
                              ),
                            ]
                          ),
                          t._v(" "),
                          n("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: t.inputNetwork.password,
                                expression: "inputNetwork.password",
                              },
                            ],
                            staticClass: "form-input",
                            class: t.passwordFormClass,
                            attrs: {
                              type: "password",
                              id: "input-password",
                              placeholder: "Password",
                            },
                            domProps: { value: t.inputNetwork.password },
                            on: {
                              keyup: function (e) {
                                return "button" in e ||
                                  !t._k(e.keyCode, "enter", 13, e.key, "Enter")
                                  ? t.joinNetwork(e)
                                  : null;
                              },
                              input: function (e) {
                                e.target.composing ||
                                  t.$set(
                                    t.inputNetwork,
                                    "password",
                                    e.target.value
                                  );
                              },
                            },
                          }),
                          t._v(" "),
                          n(
                            "p",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: t.passwordFormShowHint,
                                  expression: "passwordFormShowHint",
                                },
                              ],
                              staticClass: "form-input-hint",
                            },
                            [t._v(t._s(t.passwordFormHintText))]
                          ),
                        ]
                      ),
                      t._v(" "),
                      n("div", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !t.view.bModalForm,
                            expression: "!view.bModalForm",
                          },
                        ],
                        staticClass: "content label",
                        domProps: { innerHTML: t._s(t.view.modalText) },
                      }),
                    ]),
                    t._v(" "),
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: "join" === t.view.modalButtons,
                            expression: "view.modalButtons === 'join'",
                          },
                        ],
                        staticClass: "modal-footer",
                      },
                      [
                        n(
                          "button",
                          {
                            staticClass: "btn float-left",
                            on: {
                              click: function (e) {
                                t.setView("listView");
                              },
                            },
                          },
                          [t._v("Cancel")]
                        ),
                        t._v(" "),
                        n(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            class: t.joinButtonDisabled,
                            on: { click: t.joinNetwork },
                          },
                          [t._v("Join")]
                        ),
                      ]
                    ),
                    t._v(" "),
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value:
                              "tryAgain" === t.view.modalButtons ||
                              "skip" === t.view.modalButtons,
                            expression:
                              "view.modalButtons === 'tryAgain' || view.modalButtons === 'skip'",
                          },
                        ],
                        staticClass: "modal-footer",
                      },
                      [
                        n(
                          "button",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: "tryAgain" === t.view.modalButtons,
                                expression: "view.modalButtons === 'tryAgain'",
                              },
                            ],
                            staticClass: "btn btn-error float-left",
                            on: {
                              click: function (e) {
                                t.setView("listView");
                              },
                            },
                          },
                          [t._v("Try Again")]
                        ),
                        t._v(" "),
                        n(
                          "button",
                          {
                            staticClass: "btn",
                            on: { click: t.skipWifiConfig },
                          },
                          [t._v("Skip Step")]
                        ),
                      ]
                    ),
                  ]),
                ]
              ),
            ]);
          },
          staticRenderFns: [
            function () {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { staticClass: "card-header" }, [
                e("div", { staticClass: "card-title h5" }, [
                  this._v("Wi-Fi Settings"),
                ]),
              ]);
            },
            function () {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("div", { staticClass: "card-header" }, [
                e("div", { staticClass: "card-title h5" }, [
                  this._v("Seleziona la wifi..."),
                ]),
              ]);
            },
          ],
        };
      var r = i("VU/8")(
        a,
        o,
        !1,
        function (t) {
          i("FkBp");
        },
        "data-v-38544937",
        null
      );
      e.default = r.exports;
    },
  },
  ["NHnr"]
);
//# sourceMappingURL=app.3c8735f966671af7db73.js.map
