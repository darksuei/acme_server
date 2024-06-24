document.addEventListener("DOMContentLoaded", (event) => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    const hamburger = document.querySelector(".hamburger");
    nav.classList.toggle("active");
  });
});
