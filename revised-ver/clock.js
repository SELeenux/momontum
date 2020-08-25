const Clock = document.querySelector(".js-clock h1");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const secs = date.getSeconds();

  Clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();