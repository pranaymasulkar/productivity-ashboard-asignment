// ================================================================================
// Constants
// ================================================================================

const NAV_LINKS = document.querySelectorAll("[data-page]");
const PAGE_SETION = document.querySelectorAll(".pageSection");

// Todo List Modal
const ADD_TODO_MODAL = document.querySelector("#todoModal");
const ADD_TODO_BTN = document.querySelector("#addTodoBtn");
const CLOSE_TODO_MODAL = document.querySelector("#closeTodoModal");
const TODO_FORM = document.querySelector("#todoForm");
const TODO_LIST_TABLE = document.querySelector("#todoListTable");

// Daily Plan Modal
const ADD_DAILY_PLAN_MODAL = document.querySelector("#dailyPlanModal");
const ADD_DAILY_PLAN_BTN = document.querySelector("#addDailyPlan");
const CLOSE_DAILY_PLAN_MODAL = document.querySelector("#closeDailyPlanModal");

// Daily Goals Modal
const ADD_DAILY_GOAL_MODAL = document.querySelector("#dailyGoalsModal");
const ADD_DAILY_GOAL_BTN = document.querySelector("#addDailyGoals");
const CLOSE_DAILY_GOAL_MODAL = document.querySelector("#closeDailyGoalsModal");

// ================================================================================
// Data and local Storage
// ================================================================================

const TODOS_DATA = JSON.parse(localStorage.getItem("todos")) || [];

// ================================================================================
// Page Navigation Logis
// ================================================================================

function removeActiveClass() {
  NAV_LINKS.forEach((link) => {
    link.classList.remove("active");
  });
}

NAV_LINKS.forEach((link) => {
  link.addEventListener("click", () => {
    removeActiveClass();
    showPageId(link.dataset.page);
    link.classList.add("active");
  });
});

function hideAllPages() {
  PAGE_SETION.forEach((page) => (page.style.display = "none"));
}

function showPageId(pageId) {
  hideAllPages();
  const PAGE_ID = document.getElementById(pageId);
  if (PAGE_ID) {
    PAGE_ID.style.display = "block";
  } else {
    console.error(`No page section found with this ${PAGE_ID} page id`);
  }
}

showPageId("dashboard");
document.querySelector('[data-page="dashboard"]').classList.add("active");

// ================================================================================
// Modal Form Open Close Logic
// ================================================================================

modalToggle(ADD_TODO_MODAL, ADD_TODO_BTN, CLOSE_TODO_MODAL);
modalToggle(ADD_DAILY_PLAN_MODAL, ADD_DAILY_PLAN_BTN, CLOSE_DAILY_PLAN_MODAL);
modalToggle(ADD_DAILY_GOAL_MODAL, ADD_DAILY_GOAL_BTN, CLOSE_DAILY_GOAL_MODAL);

function modalToggle(modal, open, close) {
  modal.style.display = "none";
  open.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// ================================================================================
// Add Todo Logic
// ================================================================================

function todoUI(data) {
  TODO_LIST_TABLE.innerHTML = "";
  data.forEach((item, index) => {
    return (TODO_LIST_TABLE.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.title}</td>
          <td><strong>${item.description}</strong></td>
          <td><span class="categry">${item.category}</span></td>
          <td><strong>${item.priority}</strong></td>
          <td><strong>${item.due_date}</strong></td>
          <td>
            <button class="edit-btn" onclick="editTodo(${item.id})">
            <i class="ri-pencil-fill"></i>
            </button>
            <button class="delete-btn" onclick="deleteTodo(${item.id})">
            <i class="ri-delete-bin-4-fill"></i>
            </button>
          </td>
        </tr>
    `);
  });
}

TODO_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputData = new FormData(e.target);

  const title = inputData.get("title");
  const description = inputData.get("description");
  const category = inputData.get("category");
  const priority = inputData.get("priority");
  const due_date = inputData.get("due_date");

  console.log(priority);
  let newTodo = {
    id: Date.now(),
    title,
    description,
    category,
    priority,
    due_date,
    status: false,
  };

  if (editedTodoId) {
    const todo = TODOS_DATA.find((id) => id.id === editedTodoId);
    todo.title = title;
    todo.description = description;
    todo.category = category;
    todo.priority = priority;
    todo.due_date = due_date;

    alert("Todo Updated");
    editedTodoId = null;
  } else {
    TODOS_DATA.push(newTodo);
    alert("Todo Created");
  }

  localStorage.setItem("todos", JSON.stringify(TODOS_DATA));
  ADD_TODO_MODAL.style.display = "none";
  TODO_FORM.reset();
  console.log(TODOS_DATA, "ye hai element");
  todoUI(TODOS_DATA);
});

todoUI(TODOS_DATA);

let editedTodoId = null;

function editTodo(id) {
  ADD_TODO_MODAL.style.display = "flex";
  const todo = TODOS_DATA.find((todo) => todo.id === id);
  editedTodoId = todo;

  title.value = todo.title;
  description.value = todo.description;
  category.value = todo.description;
  priority.value = todo.priority;
  due_date.value = todo.due_date;
}
