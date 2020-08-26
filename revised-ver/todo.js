const toDoform = document.querySelector(".js-toDoForm"),
  toDoInput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDos");

const TODOS_LS = "toDos";
let toDos = [];

function storetoDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentElement;

  toDoList.removeChild(li);
  const removedToDos = toDos.filter(function (toDos) {
    return toDos.id !== parseInt(li.id);
  });
  toDos = removedToDos;
  storetoDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "📢";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  const toDoObj = {
    id: newId,
    text
  };
  toDos.push(toDoObj);
  storetoDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const toDoValue = toDoInput.value;
  paintToDo(toDoValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const ToDosObj = JSON.parse(loadedToDos);
    ToDosObj.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();