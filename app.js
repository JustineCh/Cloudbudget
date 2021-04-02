const dropdown = document.getElementById("my-dropdown");
const serviceDropdown = document.getElementById("dropdown-btn");
const serviceLinks = document.querySelectorAll(".service-container");
const firstNameLabel = document.getElementById("first-name-label");
const lastNameLabel = document.getElementById("last-name-label");
const phoneLabel = document.getElementById("phone-label");
const inputs = document.querySelectorAll("input");
const serviceLabel = document.getElementById("service-label");
const submitBtn = document.getElementById("submit-btn");

function dropdownToggle() {
  dropdown.classList.toggle("show");
}

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
    console.log("disabled");
    submitBtn.disabled = true;
  } else {
    console.log("enabled");
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
      console.log(e.target);
      e.target.classList.add("error");
      showElement(textError);
    }
  }
  maybeEnableOrDisableSubmitBtn();
};

const closeDropdown = function (e) {
  if (e.target !== serviceDropdown) {
    dropdown.classList.remove("show");
  }
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
  console.log("submitted");
  const message = document.querySelector(".message");
  showElement(message);
  inputs.forEach(input => {
    input.value = "";
    input.classList.add("untouched");
  });
  maybeEnableOrDisableSubmitBtn();
  setTimeout(() => {
    hideElement(message);
  }, 3000);
};

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

serviceDropdown.addEventListener("click", dropdownToggle);

document.addEventListener("click", closeDropdown);
serviceLinks.forEach(item => {
  item.addEventListener("click", servicePicked);
});

inputs.forEach(input => {
  input.addEventListener("keyup", notBlankValidator);
});
inputs.forEach(input => {
  input.addEventListener("blur", notBlankValidator);
});
document.getElementById("phone").addEventListener("keyup", phoneValidator);
submitBtn.addEventListener("click", submitForm);
