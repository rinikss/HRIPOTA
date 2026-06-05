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

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
      const { ctx, patternCanvas, canvas, viewHeight } = this;
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
  // ////////////////////////////////////

  const block2 = document.querySelector(".block2");
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

  let animationsStarted = false;

  const style = document.createElement("style");
  style.textContent = `
  .block2-element {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1s ease, transform 1s ease;
  }
  
  .block2-element.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
  document.head.appendChild(style);

  block2Elements.forEach((el) => {
    if (el) {
      el.classList.add("block2-element");
    }
  });

  function revealBlock2Elements() {
    if (animationsStarted) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const block2Top = block2.offsetTop;

    if (scrollPosition > block2Top + 100) {
      animationsStarted = true;

      block2Elements.forEach((el, index) => {
        if (!el) return;
        setTimeout(() => {
          el.classList.add("revealed");
        }, index * 300);
      });
    }
  }

  window.addEventListener("scroll", revealBlock2Elements);
});
