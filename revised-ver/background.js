const body = document.querySelector("body");

const IMG_NB = 6;

function changeBgImg(num) {
  const file = `./images/${num}.jpg`;
  body.style.backgroundImage = `url(${file})`;
  body.style.backgroundSize = "cover";
}

function genRandNum() {
  const num = Math.floor(Math.random() * IMG_NB + 1);
  return (num);
}

function init() {
  const randNum = genRandNum();
  changeBgImg(randNum);
}

init();