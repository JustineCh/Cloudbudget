document.getElementById("hamburger-button").addEventListener("click", () => {
  document.getElementById("hamburger-icon").classList.toggle("fa-times");
  document.getElementById("hamburger-icon").classList.toggle("fa-bars");
  document.getElementById("mobile-navbar-bgc").classList.toggle("open");
  document.getElementById("mobile-navbar").classList.toggle("open");
  document.querySelector(".showcase-content").classList.toggle("open");
});
