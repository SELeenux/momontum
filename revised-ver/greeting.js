const userForm = document.querySelector(".js-userForm"),
  userInput = userForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function paintGreeting(text) {
  userForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}`;
}

function storeName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = userInput.value;
  console.log(inputValue);
  storeName(inputValue);
  paintGreeting(inputValue);
}

function createName() {
  userForm.classList.add(SHOWING_CN);
  userForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const CurrentUser = localStorage.getItem(USER_LS);

  if (CurrentUser === null) {
    createName();
  }
  else {
    paintGreeting(CurrentUser);
  }
}

function init() {
  loadName();
}

init();