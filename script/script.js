const createBtn = document.querySelector(".create-todo");
const todoForm = document.querySelector(".todo");
const submitBtn = document.querySelector(".submit");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const savedTodoBox = document.querySelector(".savedTodo");
const deleteBtn = document.querySelector("[data-delete]")

createBtn.addEventListener("click", function () {
  todoForm.classList.toggle("hidden");
});

function loadTodos(todo, index) {
  const todoCard = document.createElement("div");

  todoCard.className =
    "bg-amber-300 p-4 rounded-2xl shadow space-y-2";

  todoCard.innerHTML = `
  <div>
  <div class="flex flex-col gap-3">
    <h3 class="text-lg font-bold wrap-break-word">${todo.Title}</h3>
    <p class="text-sm wrap-break-word">${todo.Description}</p>
    <small class="text-xs text-gray-700">${todo.Date}</small>
    </div>
    ${menutemplate(index)}
    </div>
  `;

  savedTodoBox.appendChild(todoCard);
}
function menutemplate(index){
    return `
<div class="relative inline-block group">

  <button
    class="w-10 h-10 rounded-xl bg-[#1e2128] hover:bg-[#2a2d35] flex flex-col items-center justify-center gap-1 transition-all duration-300"
  >
    <span class="w-1 h-1 bg-white rounded-full"></span>
    <span class="w-1 h-1 bg-white rounded-full"></span>
    <span class="w-1 h-1 bg-white rounded-full"></span>
  </button>

  <div
    class="absolute right-0 top-12 w-[220px] bg-gradient-to-br from-[#242832] to-[#251c28] rounded-2xl p-3 shadow-2xl opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 z-50"
  >

    <ul class="flex flex-col gap-1">

      <li>
        <button
          data-edit="${index}"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#7e8590] font-semibold hover:bg-[#5353ff] hover:text-white transition-all duration-300 active:scale-95"
        >
          <svg class="w-5 h-5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
          </svg>
          Edit
        </button>
      </li>

      <li>
        <button
          data-member="${index}"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#7e8590] font-semibold hover:bg-[#5353ff] hover:text-white transition-all duration-300 active:scale-95"
        >
          <svg class="w-5 h-5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M2 21a8 8 0 0 1 13.292-6"></path>
            <circle cx="10" cy="8" r="5"></circle>
            <path d="M19 16v6"></path>
            <path d="M22 19h-6"></path>
          </svg>
          Add Member
        </button>
      </li>

      <div class="border-t border-[#42434a] my-1"></div>

      <li>
        <button
          data-settings="${index}"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#7e8590] font-semibold hover:bg-[#5353ff] hover:text-white transition-all duration-300 active:scale-95"
        >
          <svg class="w-5 h-5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Settings
        </button>
      </li>

      <li>
        <button
          data-delete="${index}"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#7e8590] font-semibold hover:bg-[#8e2a2a] hover:text-white transition-all duration-300 active:scale-95"
        >
          <svg class="w-5 h-5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line x1="10" x2="10" y1="11" y2="17"></line>
            <line x1="14" x2="14" y1="11" y2="17"></line>
          </svg>
          Delete
        </button>
      </li>

      <div class="border-t border-[#42434a] my-1"></div>

      <li>
        <button
          data-team="${index}"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#7e8590] font-semibold hover:bg-[#382d47] hover:text-[#bd89ff] transition-all duration-300 active:scale-95"
        >
          <svg class="w-5 h-5 stroke-current" fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 21a8 8 0 0 0-16 0"></path>
            <circle cx="10" cy="8" r="5"></circle>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
          </svg>
          Team Access
        </button>
      </li>

    </ul>

  </div>

</div>
`

}

window.addEventListener("DOMContentLoaded", function () {
  let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  storedTodos.forEach(function (todo) {
    loadTodos(todo);
  });
});

function clearFields() {
  title.value = "";
  description.value = "";
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let titleText = title.value.trim();
  let descriptionText = description.value.trim();
  let date = new Date().toLocaleString();
  let id = Date.now()

  if (titleText === "" || descriptionText === "") {
    alert("Input field is empty");
    return;
  }

  let todo = {
    Title: titleText,
    Description: descriptionText,
    Date: date,
    Id: id
  };

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  loadTodos(todo);
  clearFields();
  todoForm.classList.add("hidden");
});

