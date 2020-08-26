const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDos"),
  fullMsg = document.querySelector(".js-fullmsg");

const TODOS_LS = "toDos",
  SHOWING = "showing";
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
  if (toDos.length < 5) {
    toDoForm.classList.add(SHOWING);
    fullMsg.classList.remove(SHOWING);
    toDoForm.addEventListener("submit", handleSubmit);
  }
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
  if (toDos.length > 4) {
    toDoForm.classList.remove(SHOWING);
    fullMsg.classList.add(SHOWING);
    fullMsg.innerText = "It's full. Let's go to work now!";
  }
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
    if (ToDosObj.length < 4) {
      toDoForm.classList.add(SHOWING);
      toDoForm.addEventListener("submit", handleSubmit);
    }
    else {
      fullMsg.classList.add(SHOWING);
      fullMsg.innerText = "It's full. Let's go to work now!";
    }
    ToDosObj.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  else {
    toDoForm.classList.add(SHOWING);
    toDoForm.addEventListener("submit", handleSubmit);
  }
}

function init() {
  loadToDos();
}

init();