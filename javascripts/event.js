document.addEventListener("DOMContentLoaded", function () {
  const page_event = document.querySelector(".page_event");
  if (!page_event) return;

  const months = Array.from(document.querySelectorAll(".event_month"));

  months.forEach(function (month) {
    const head = month.querySelector(".event_month_head");
    head.addEventListener("click", function () {
      month.classList.toggle("is_open");
      setTimeout(function () {
        window.dispatchEvent(new Event("resize"));
      }, 450);
    });
  });

  const dates = Array.from(document.querySelectorAll(".event_date"));
  const submit_btn = document.querySelector(".event_submit_btn");

  dates.forEach(function (date_btn) {
    date_btn.addEventListener("click", function () {
      dates.forEach(function (d) {
        d.classList.remove("is_selected");
      });
      date_btn.classList.add("is_selected");

      if (submit_btn) {
        submit_btn.classList.add("is_visible");
        window.dispatchEvent(new Event("resize"));
      }
    });
  });

  const anim_targets = [
    document.querySelector(".event_img"),
    document.querySelector(".event_title"),
    document.querySelector(".event_desc"),
    document.querySelector(".event_months"),
  ];

  anim_targets.forEach(function (el) {
    if (el) el.classList.add("event_anim");
  });

  function check_event_scroll() {
    anim_targets.forEach(function (el) {
      if (!el || el.classList.contains("revealed")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("revealed");
      }
    });
  }

  window.addEventListener("scroll", check_event_scroll, { passive: true });
  check_event_scroll();
});
