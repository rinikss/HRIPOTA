document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const interactiveElements = document.querySelectorAll(
    ".li-list a, a, button, p, .first_text, .secnd_text, .block1 p, .btn, .circle, .btn_text, img, div",
  );
  interactiveElements.forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      cursor.classList.add("hover");
    });
    element.addEventListener("mouseleave", function () {
      cursor.classList.remove("hover");
    });
  });

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const frstPic = document.querySelector(".frst_pic");
  const scndPic = document.querySelector(".scnd_pic");
  const thrdPic = document.querySelector(".thrd_pic");

  function goToServices() {
    pt_go("services.html");
  }

  if (frstPic) frstPic.addEventListener("click", goToServices);
  if (scndPic) scndPic.addEventListener("click", goToServices);
  if (thrdPic) thrdPic.addEventListener("click", goToServices);

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const btn = document.querySelector(".btn");
  const formPopup = document.querySelector(".form");
  const formClose = document.querySelector(".close_circle");

  btn.addEventListener("click", function () {
    formPopup.classList.add("show");
  });
  formClose.addEventListener("click", function () {
    formPopup.classList.remove("show");
  });
  formPopup.addEventListener("click", function (e) {
    if (e.target === formPopup) {
      formPopup.classList.remove("show");
    }
  });
  const formSubmit = document.querySelector(".form_submit");
  if (formSubmit) {
    formSubmit.addEventListener("click", function () {
      formPopup.classList.remove("show");
    });
  }

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  class Grain {
    constructor(el) {
      this.patternSize = 150;
      this.patternScaleX = 1;
      this.patternScaleY = 1;
      this.patternRefreshInterval = 3;
      this.patternAlpha = 18;
      this.canvas = el;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.scale(this.patternScaleX, this.patternScaleY);
      this.patternCanvas = document.createElement("canvas");
      this.patternCanvas.width = this.patternSize;
      this.patternCanvas.height = this.patternSize;
      this.patternCtx = this.patternCanvas.getContext("2d");
      this.patternData = this.patternCtx.createImageData(
        this.patternSize,
        this.patternSize,
      );
      this.patternPixelDataLength = this.patternSize * this.patternSize * 4;
      this.resize = this.resize.bind(this);
      this.loop = this.loop.bind(this);
      this.frame = 0;
      window.addEventListener("resize", this.resize);
      this.resize();
      window.requestAnimationFrame(this.loop);
    }

    resize() {
      this.canvas.width = window.innerWidth * devicePixelRatio;
      this.canvas.height =
        document.documentElement.scrollHeight * devicePixelRatio;
      this.canvas.style.width = "100%";
      this.canvas.style.height = document.documentElement.scrollHeight + "px";
    }

    update() {
      const { patternPixelDataLength, patternData, patternAlpha, patternCtx } =
        this;
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    }

    draw() {
      const { ctx, patternCanvas, canvas } = this;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ctx.createPattern(patternCanvas, "repeat");
      ctx.fillRect(0, 0, width, height);
    }

    loop() {
      const shouldDraw = ++this.frame % this.patternRefreshInterval === 0;
      if (shouldDraw) {
        this.update();
        this.draw();
      }
      window.requestAnimationFrame(this.loop);
    }
  }

  const el = document.querySelector(".grain");
  const grain = new Grain(el);

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const block2 = document.querySelector(".block2");

  if (block2) {
    const block2Elements = [
      document.querySelector(".serv_text"),
      document.querySelector(".frst_pic"),
      document.querySelector(".scnd_pic"),
      document.querySelector(".thrd_pic"),
      document.querySelector(".pic_txt1"),
      document.querySelector(".txt1"),
      document.querySelector(".pic_txt2"),
      document.querySelector(".txt2"),
      document.querySelector(".pic_txt3"),
      document.querySelector(".txt3"),
    ];

    let lastScrollY = window.scrollY;
    let animationInProgress = false;
    let currentState = "hidden";

    const style = document.createElement("style");
    style.textContent = `
      .block2-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.6s ease, transform 1.6s ease;
      }
      .block2-element.revealed {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    block2Elements.forEach(function (el) {
      if (el) el.classList.add("block2-element");
    });

    function revealElements() {
      if (animationInProgress || currentState === "revealed") return;
      animationInProgress = true;
      block2Elements.forEach(function (el, index) {
        if (!el) return;
        setTimeout(function () {
          el.classList.add("revealed");
          if (index === block2Elements.length - 1) {
            setTimeout(function () {
              animationInProgress = false;
              currentState = "revealed";
            }, 300);
          }
        }, index * 300);
      });
    }

    function checkScroll() {
      const isBlock2Visible =
        window.scrollY + window.innerHeight > block2.offsetTop + 100;
      if (
        isBlock2Visible &&
        currentState !== "revealed" &&
        !animationInProgress
      ) {
        revealElements();
      }
      lastScrollY = window.scrollY;
    }

    window.addEventListener("scroll", checkScroll);
  }

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  (function () {
    const TOTAL = 5;
    const block3 = document.querySelector(".block3");
    const cards = Array.from(document.querySelectorAll(".block3_card"));
    const items = Array.from(document.querySelectorAll(".block3_item"));
    let current = 0;

    function get_index() {
      const rect = block3.getBoundingClientRect();
      const total_h = block3.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total_h));
      return Math.min(TOTAL - 1, Math.floor(progress * TOTAL));
    }

    function update_cards(active) {
      cards.forEach((card, i) => {
        card.classList.remove(
          "is_active",
          "is_prev",
          "is_next",
          "is_hidden",
          "is_hidden_top",
        );
        if (i === active) card.classList.add("is_active");
        else if (i === active - 1) card.classList.add("is_prev");
        else if (i === active + 1) card.classList.add("is_next");
        else if (i < active) card.classList.add("is_hidden_top");
        else card.classList.add("is_hidden");
      });
    }

    function update_items(active) {
      items.forEach((item, i) => {
        item.classList.remove("is_active", "is_above", "is_below", "is_far");
        const diff = i - active;
        if (diff === 0) item.classList.add("is_active");
        else if (diff === -1) item.classList.add("is_above");
        else if (diff === 1) item.classList.add("is_below");
        else item.classList.add("is_far");
      });
    }

    function on_scroll() {
      const idx = get_index();
      if (idx === current) return;
      current = idx;
      update_cards(current);
      update_items(current);
    }

    update_cards(0);
    update_items(0);
    window.addEventListener("scroll", on_scroll, { passive: true });
  })();

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  document
    .querySelectorAll(".block3_card, .block3_item")
    .forEach(function (el) {
      el.addEventListener("click", function () {
        pt_go("affiche.html");
      });
    });

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const merch_track = document.querySelector(".merch_track");

  if (merch_track) {
    const merch_cards = Array.from(merch_track.querySelectorAll(".merch_card"));

    merch_cards.forEach(function (card) {
      merch_track.appendChild(card.cloneNode(true));
      merch_track.appendChild(card.cloneNode(true));
    });

    var card_w = merch_cards[0].offsetWidth;
    var gap = parseFloat(getComputedStyle(merch_track).gap) || 0;
    var set_w = merch_cards.length * (card_w + gap);

    merch_track.scrollLeft = set_w;

    merch_track.addEventListener("scroll", function () {
      if (merch_track.scrollLeft >= set_w * 2) {
        merch_track.scrollLeft -= set_w;
      }

      if (merch_track.scrollLeft <= 0) {
        merch_track.scrollLeft += set_w;
      }
    });
  }
  document.querySelectorAll(".merch_card").forEach(function (el) {
    el.addEventListener("click", function () {
      pt_go("merch.html");
    });
  });

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const page_abt = document.querySelector(".page_abt");

  if (page_abt) {
    const abt_elements = [
      document.querySelector(".about_title"),
      document.querySelector(".mission_img"),
      document.querySelector(".mission_img + .abt_subtitle"),
      document.querySelector(".mission_img + .abt_subtitle + .abt_text"),
      document.querySelector(".unic_img"),
      document.querySelector(".unic_img + .abt_subtitle"),
      document.querySelector(".unic_img + .abt_subtitle + .abt_text"),
      document.querySelector(".temper_img"),
      document.querySelector(".temper_img + .abt_subtitle"),
      document.querySelector(".temper_img + .abt_subtitle + .abt_text"),
    ];

    let abt_in_progress = false;
    let abt_state = "hidden";

    const abt_style = document.createElement("style");
    abt_style.textContent = `
      .abt_element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.6s ease, transform 1.6s ease;
      }
      .abt_element.revealed {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(abt_style);

    abt_elements.forEach(function (el) {
      if (el) el.classList.add("abt_element");
    });

    function reveal_abt() {
      if (abt_in_progress || abt_state === "revealed") return;
      abt_in_progress = true;
      abt_elements.forEach(function (el, index) {
        if (!el) return;
        setTimeout(function () {
          el.classList.add("revealed");
          if (index === abt_elements.length - 1) {
            setTimeout(function () {
              abt_in_progress = false;
              abt_state = "revealed";
            }, 500);
          }
        }, index * 500);
      });
    }

    function check_abt_scroll() {
      const is_visible =
        window.scrollY + window.innerHeight > page_abt.offsetTop + 100;
      if (is_visible && abt_state !== "revealed" && !abt_in_progress) {
        reveal_abt();
      }
    }

    window.addEventListener("scroll", check_abt_scroll);
  }

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  (function () {
    const page_aff = document.querySelector(".page_aff");
    if (!page_aff) return;

    const TOTAL = 5;
    const aff_cards = Array.from(document.querySelectorAll(".aff_card"));
    const aff_items = Array.from(document.querySelectorAll(".aff_item"));
    let current = 0;

    function get_index() {
      const rect = page_aff.getBoundingClientRect();
      const total_h = page_aff.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total_h));
      return Math.min(TOTAL - 1, Math.floor(progress * TOTAL));
    }

    function update_cards(active) {
      aff_cards.forEach(function (card, i) {
        card.classList.remove(
          "is_active",
          "is_prev",
          "is_next",
          "is_hidden",
          "is_hidden_top",
        );
        if (i === active) card.classList.add("is_active");
        else if (i === active - 1) card.classList.add("is_prev");
        else if (i === active + 1) card.classList.add("is_next");
        else if (i < active) card.classList.add("is_hidden_top");
        else card.classList.add("is_hidden");
      });
    }

    function update_items(active) {
      aff_items.forEach(function (item, i) {
        item.classList.remove("is_active", "is_above", "is_below", "is_far");
        const diff = i - active;
        if (diff === 0) item.classList.add("is_active");
        else if (diff === -1) item.classList.add("is_above");
        else if (diff === 1) item.classList.add("is_below");
        else item.classList.add("is_far");
      });
    }

    function on_scroll() {
      const idx = get_index();
      if (idx === current) return;
      current = idx;
      update_cards(current);
      update_items(current);
    }

    update_cards(0);
    update_items(0);
    window.addEventListener("scroll", on_scroll, { passive: true });

    document.querySelectorAll(".aff_card, .aff_item").forEach(function (el) {
      el.addEventListener("click", function () {
        pt_go("affiche.html");
      });
    });
  })();

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // (function () {
  //   const page_srv = document.querySelector(".page_srv");
  //   if (!page_srv) return;

  //   const srv_blocks = Array.from(
  //     document.querySelectorAll(".srv_block, .srv_title, .srv_divider"),
  //   );

  //   srv_blocks.forEach(function (el) {
  //     el.classList.add("srv_anim");
  //   });

  //   function check_srv() {
  //     srv_blocks.forEach(function (el) {
  //       if (el.classList.contains("revealed")) return;
  //       const rect = el.getBoundingClientRect();
  //       if (rect.top < window.innerHeight - 80) {
  //         el.classList.add("revealed");
  //       }
  //     });
  //   }

  //   window.addEventListener("scroll", check_srv, { passive: true });
  //   check_srv();
  // })();
});
