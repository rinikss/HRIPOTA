document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const interactiveElements = document.querySelectorAll(
    ".li-list a, a, button",
  );
  interactiveElements.forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      cursor.classList.add("hover");
    });
    element.addEventListener("mouseleave", function () {
      cursor.classList.remove("hover");
    });
  });
});
