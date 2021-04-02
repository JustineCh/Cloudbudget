document.getElementById("hamburger-button").addEventListener("click", () => {
  document.getElementById("hamburger-icon").classList.toggle("fa-times");
  document.getElementById("hamburger-icon").classList.toggle("fa-bars");
  document.getElementById("mobile-navbar-bgc").classList.toggle("open");
  document.getElementById("mobile-navbar").classList.toggle("open");
  document.querySelector(".showcase-content").classList.toggle("open");
  if (document.body.style.position === "fixed") {
    document.body.style.position = "static";
  } else {
    document.body.style.position = "fixed";
  }
});

function changeSlide() {
  const slides = [...document.querySelectorAll("#slider>input")];
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].checked) {
      const indexToChange = (i + 1) % slides.length;

      slides[i].checked = false;
      slides[indexToChange].checked = true;
      break;
    }
  }
}

setInterval(changeSlide, 3000);
