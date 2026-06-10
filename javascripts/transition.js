console.log("transition loaded");

(function () {
  const style = document.createElement("style");
  style.textContent = `
    #pt_overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 99999;
      display: flex;
      pointer-events: all;
      overflow: hidden;
    }
    .pt_col {
      flex: 1;
      height: 100%;
      position: relative;
    }
    .pt_top {
      position: absolute;
      top: 0; left: 0; width: 100%;
      transform-origin: top center;
      will-change: transform;
    }
    .pt_bot {
      position: absolute;
      bottom: 0; left: 0; width: 100%;
      transform-origin: bottom center;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  const GRADIENTS = [
    "linear-gradient(to bottom, #1CD8D2, #0083FE, #20269D)",
    "linear-gradient(to bottom, #EE0979, #CC2B5E, #B20A2C)",
    "linear-gradient(to bottom, #FDFC47, #FF6A00, #EC2F4B)",
    "linear-gradient(to bottom, #89FFFD, #1CD8D2, #1E9600)",
    "linear-gradient(to bottom, #8F94FB, #20269D, #03001E)",
    "linear-gradient(to bottom, #FF6E7F, #EE0979, #DD2476)",
    "linear-gradient(to bottom, #00FFF0, #0099F7, #0083FE)",
    "linear-gradient(to bottom, #FFF200, #FF6A00, #EF32D9)",
    "linear-gradient(to bottom, #F11712, #DD1818, #B20A2C)",
    "linear-gradient(to bottom, #FFFBD5, #FF6E7F, #CC2B5E)",
    "linear-gradient(to bottom, #1E9600, #00FFF0, #89FFFD)",
    "linear-gradient(to bottom, #0083FE, #8F94FB, #EF32D9)",
    "linear-gradient(to bottom, #EC2F4B, #FF6A00, #FDFC47)",
    "linear-gradient(to bottom, #DD2476, #EE0979, #FF6E7F)",
    "linear-gradient(to bottom, #20269D, #0083FE, #1CD8D2)",
    "linear-gradient(to bottom, #FF6A00, #F11712, #DD1818)",
    "linear-gradient(to bottom, #00264A, #0099F7, #89FFFD)",
    "linear-gradient(to bottom, #EF32D9, #8F94FB, #20269D)",
    "linear-gradient(to bottom, #FDFC47, #1E9600, #00FFF0)",
    "linear-gradient(to bottom, #CC2B5E, #B20A2C, #03001E)",
    "linear-gradient(to bottom, #89FFFD, #FDFC47, #FF6A00)",
    "linear-gradient(to bottom, #EE0979, #8F94FB, #0083FE)",
    "linear-gradient(to bottom, #1CD8D2, #1E9600, #20269D)",
    "linear-gradient(to bottom, #FFFBD5, #FFF200, #FF6E7F)",
    "linear-gradient(to bottom, #F11712, #EF32D9, #8F94FB)",
    "linear-gradient(to bottom, #00FFF0, #89FFFD, #FFFBD5)",
    "linear-gradient(to bottom, #FF6A00, #CC2B5E, #20269D)",
    "linear-gradient(to bottom, #DD2476, #FDFC47, #1CD8D2)",
    "linear-gradient(to bottom, #0099F7, #EF32D9, #FF6E7F)",
    "linear-gradient(to bottom, #1E9600, #FDFC47, #FF6A00)",
    "linear-gradient(to bottom, #B20A2C, #DD1818, #FF6A00)",
    "linear-gradient(to bottom, #03001E, #20269D, #8F94FB)",
    "linear-gradient(to bottom, #89FFFD, #0083FE, #EE0979)",
    "linear-gradient(to bottom, #FFF200, #EC2F4B, #B20A2C)",
    "linear-gradient(to bottom, #1CD8D2, #EF32D9, #CC2B5E)",
    "linear-gradient(to bottom, #FDFC47, #89FFFD, #1CD8D2)",
    "linear-gradient(to bottom, #FF6E7F, #FFFBD5, #89FFFD)",
    "linear-gradient(to bottom, #20269D, #EE0979, #FF6A00)",
    "linear-gradient(to bottom, #00FFF0, #1E9600, #0083FE)",
    "linear-gradient(to bottom, #EF32D9, #F11712, #FDFC47)",
  ];

  const COLS = [
    { top: 85, bot: 15 },
    { top: 40, bot: 60 },
    { top: 70, bot: 30 },
    { top: 55, bot: 45 },
    { top: 90, bot: 10 },
    { top: 30, bot: 70 },
    { top: 65, bot: 35 },
    { top: 50, bot: 50 },
    { top: 75, bot: 25 },
    { top: 20, bot: 80 },
    { top: 60, bot: 40 },
    { top: 45, bot: 55 },
    { top: 80, bot: 20 },
    { top: 35, bot: 65 },
    { top: 95, bot: 5 },
    { top: 25, bot: 75 },
    { top: 70, bot: 30 },
    { top: 48, bot: 52 },
    { top: 82, bot: 18 },
    { top: 38, bot: 62 },
  ];

  var gi = 0;
  function ng() {
    return GRADIENTS[gi++ % GRADIENTS.length];
  }

  const overlay = document.createElement("div");
  overlay.id = "pt_overlay";

  COLS.forEach(function (cd) {
    const col = document.createElement("div");
    col.className = "pt_col";

    const top = document.createElement("div");
    top.className = "pt_top";
    top.style.height = cd.top + "%";
    top.style.background = ng();

    const bot = document.createElement("div");
    bot.className = "pt_bot";
    bot.style.height = cd.bot + "%";
    bot.style.background = ng();

    col.appendChild(top);
    col.appendChild(bot);
    overlay.appendChild(col);
  });

  document.body.appendChild(overlay);

  var DELAY = 22;
  var DUR = 600;

  function total_ms() {
    return COLS.length * DELAY + DUR + 80;
  }

  function set_tr(el, i, scale, reverse) {
    var idx = reverse ? COLS.length - 1 - i : i;
    el.style.transition =
      "transform " + DUR + "ms cubic-bezier(0.7,0,0.3,1) " + idx * DELAY + "ms";
    el.style.transform = "scaleY(" + scale + ")";
  }

  function bars_out() {
    overlay.querySelectorAll(".pt_top").forEach(function (el, i) {
      set_tr(el, i, 0, true);
    });
    overlay.querySelectorAll(".pt_bot").forEach(function (el, i) {
      set_tr(el, i, 0, true);
    });
    setTimeout(function () {
      overlay.style.pointerEvents = "none";
      overlay.style.visibility = "hidden";
    }, total_ms());
  }

  function bars_in(callback) {
    overlay.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    overlay.querySelectorAll(".pt_top").forEach(function (el, i) {
      set_tr(el, i, 1, false);
    });
    overlay.querySelectorAll(".pt_bot").forEach(function (el, i) {
      set_tr(el, i, 1, false);
    });
    if (callback) setTimeout(callback, total_ms());
  }

  document.addEventListener("click", function (e) {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;
    if (
      href.startsWith("http") ||
      href.startsWith("//") ||
      href.startsWith("#") ||
      href.startsWith("javascript") ||
      href.startsWith("mailto")
    )
      return;
    e.preventDefault();
    bars_in(function () {
      window.location.href = href;
    });
  });

  window.addEventListener("load", function () {
    const all = overlay.querySelectorAll(".pt_top, .pt_bot");
    all.forEach(function (el) {
      el.style.transition = "none";
      el.style.transform = "scaleY(1)";
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        setTimeout(bars_out, 80);
      });
    });
  });
  window.pt_go = function (href) {
    bars_in(function () {
      window.location.href = href;
    });
  };
})();
