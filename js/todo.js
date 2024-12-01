const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = [];

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});
function addTodo(todo, todoIndex) {
  const todoText = todo || todoInput.value.trim();
  if (todoText.length > 0) {
    if (!todo) {
      allTodos.push(todoText);
    }
    updateTodoList(todo, todoIndex);
    todoInput.value = "";
  }
}
function updateTodoList(todo, todoIndex) {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    let todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}
function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  todoLI.className = "todo";
  todoLI.innerHTML = ` <input type="checkbox" id="${todoId}">
        <label class="custom_checkbox" for="${todoId}">
          <svg fill="transparent" xml version="1.0" encoding="utf-8" width="800px" height="800px" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </label>
        <label for="${todoId}" class="todo-text">
          ${todo}
        </label>
        <button class="trash-icon"><img src="./images/trash.svg" alt=""></button>`;

  const deleteBtn = todoLI.querySelector(".trash-icon");
  deleteBtn.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  return todoLI;
}
function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodo();
  updateTodoList();
}
function saveTodo() {
  const todoJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todoJson);
}
