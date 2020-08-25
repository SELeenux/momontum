const userForm = document.querySelector(".js-userForm"),
  userInput = userForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER = "currentUser",
  SHOWING = "showing";

function paintGreeting(text) {
  userForm.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  greeting.innerHTML = `Hello ${text}`;
}

function storeName(text) {
  localStorage.setItem(USER, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = userInput.value;
  console.log(inputValue);
  storeName(inputValue);
  paintGreeting(inputValue);
}

function createName() {
  userForm.classList.add(SHOWING);
  userForm.addEventListener("submit", handleSubmit);
}

function loadName() {
  const CurrentUser = localStorage.getItem(USER);

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