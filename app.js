const dropdown = document.getElementById("my-dropdown");
const serviceDropdown = document.getElementById("dropdown-btn");
const serviceLinks = document.querySelectorAll(".service-container");
const firstNameLabel = document.getElementById("first-name-label");
const lastNameLabel = document.getElementById("last-name-label");
const phoneLabel = document.getElementById("phone-label");
const inputs = document.querySelectorAll(".contact-form input");
const serviceLabel = document.getElementById("service-label");
const submitBtn = document.getElementById("submit-btn");
const hamburgerBtn = document.getElementById("hamburger-button");
const hamburgerIcon = document.getElementById("hamburger-icon");
const mobileMenuBackground = document.getElementById("mobile-navbar-bgc");
const mobileMenu = document.getElementById("mobile-navbar");
const showcaseContent = document.querySelector(".showcase-content");

function dropdownToggle() {
  dropdown.classList.toggle("show");
}

const closeDropdown = function (e) {
  if (e.target !== serviceDropdown) {
    dropdown.classList.remove("show");
  }
};

const showElement = function (el) {
  el.classList.remove("hide");
};

const hideElement = function (el) {
  el.classList.add("hide");
};

const maybeEnableOrDisableSubmitBtn = function () {
  if (
    document.querySelector("input.error") ||
    document.querySelector("input.untouched")
  ) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

const notBlankValidator = function (e) {
  e.target.classList.remove("untouched");
  const value = e.target.value;
  let textError = e.target.nextElementSibling;
  let textLabel = e.target.previousElementSibling;
  if (value === "") {
    showElement(textError);
    e.target.classList.add("error");
    hideElement(textLabel);
  } else {
    textError.classList.add("hide");
    e.target.classList.remove("error");
    showElement(textLabel);
  }
  maybeEnableOrDisableSubmitBtn();
};

const phoneValidator = function (e) {
  e.target.classList.remove("untouched");
  let textError = e.target.nextElementSibling;
  const allowedChars = new Set("+-()0123456789");
  const typedInChars = new Set(e.target.value);
  for (let char of typedInChars) {
    if (!allowedChars.has(char)) {
      e.target.classList.add("error");
      showElement(textError);
    }
  }
  maybeEnableOrDisableSubmitBtn();
};

const servicePicked = function (e) {
  serviceLinks.forEach(link => {
    link.classList.remove("selected-service");
  });
  const text = e.currentTarget.children[1].innerText;
  serviceDropdown.innerText = text;
  e.currentTarget.classList.add("selected-service");
  dropdown.classList.remove("show");
  showElement(serviceLabel);
};

const clearPickedService = function () {
  serviceLinks.forEach(link => {
    link.classList.remove("selected-service");
  });
  serviceDropdown.innerText = "Select Service";
  hideElement(serviceLabel);
};

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

const submitForm = function () {
  const message = document.querySelector(".message");
  showElement(message);
  inputs.forEach(input => {
    input.value = "";
    input.classList.add("untouched");
    hideElement(input.previousElementSibling);
  });
  clearPickedService();
  maybeEnableOrDisableSubmitBtn();
  setTimeout(() => {
    hideElement(message);
  }, 3000);
};

hamburgerBtn.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("fa-times");
  hamburgerIcon.classList.toggle("fa-bars");
  mobileMenuBackground.classList.toggle("open");
  document.body.addEventListener("click", e => {
    if (e.target !== hamburgerIcon) {
      console.log("nie hamburger");
      mobileMenuBackground.classList.remove("open");
      mobileMenu.classList.remove("open");
      showcaseContent.classList.remove("open");
      hamburgerIcon.classList.remove("fa-times");
      hamburgerIcon.classList.add("fa-bars");
      document.body.style.position = "static";
    }
  });
  mobileMenu.classList.toggle("open");
  showcaseContent.classList.toggle("open");
  if (document.body.style.position === "fixed") {
    document.body.style.position = "static";
  } else {
    document.body.style.position = "fixed";
  }
});

serviceDropdown.addEventListener("click", dropdownToggle);

document.addEventListener("click", closeDropdown);
serviceLinks.forEach(item => {
  item.addEventListener("click", servicePicked);
});

inputs.forEach(input => {
  ["keyup", "blur"].forEach(eventName => {
    input.addEventListener(eventName, notBlankValidator);
  });
});

document.getElementById("phone").addEventListener("keyup", phoneValidator);
submitBtn.addEventListener("click", submitForm);
