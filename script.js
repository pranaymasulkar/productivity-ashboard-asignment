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
const DAILY_PLAN_DATA = JSON.parse(localStorage.getItem("daily_plans")) || [];
const DAILY_GOALS_DATA = JSON.parse(localStorage.getItem("goals")) || [];

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
          <td><strong>${item.duedate}</strong></td>
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

  const TODO_TITLE = document.getElementById("todoTitle");
  const TODO_DESCRIPTION = document.getElementById("todoDescription");
  const TODO_CATEGORY = document.getElementById("todoCategory");
  const TODO_PRIORITY = document.getElementById("todoPriority");
  const TODO_DUEDATE = document.getElementById("todoDuedate");

  let todoTitle = TODO_TITLE.value;
  let todoDescription = TODO_DESCRIPTION.value;
  let todoCategory = TODO_CATEGORY.value;
  let todoPriority = TODO_PRIORITY.value;
  let todoDuedate = TODO_DUEDATE.value;

  let newTodo = {
    id: Date.now(),
    title: todoTitle,
    description: todoDescription,
    category: todoCategory,
    priority: todoPriority,
    duedate: todoDuedate,
    status: false,
  };
  if (editedTodoId !== null) {
    const todo = TODOS_DATA.find((todo) => todo.id === editedTodoId);
    todo.title = todoTitle;
    todo.description = todoDescription;
    todo.category = todoCategory;
    todo.priority = todoPriority;
    todo.duedate = todoDuedate;

    editedTodoId = null;
    alert("Todo Updated");
  } else {
    TODOS_DATA.push(newTodo);
    alert("Todo Created");
  }

  localStorage.setItem("todos", JSON.stringify(TODOS_DATA));
  ADD_TODO_MODAL.style.display = "none";
  TODO_FORM.reset();
  todoUI(TODOS_DATA);
});

// =================================
// Edit Todo Logic
// =================================

let editedTodoId = null;

function editTodo(id) {
  ADD_TODO_MODAL.style.display = "flex";
  const todo = TODOS_DATA.find((todo) => todo.id === id);
  editedTodoId = id;

  todoTitle.value = todo.title;
  todoDescription.value = todo.description;
  todoCategory.value = todo.category;
  todoPriority.value = todo.priority;
  todoDuedate.value = todo.duedate;
}

// =================================
// Delete Todo Logic
// =================================

function deleteTodo(id) {
  const todos = TODOS_DATA.filter((todo) => todo.id !== id);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoUI(todos);
}

// ================================================================================
// Daily Plan UI Logic
// ================================================================================

const DAILY_PLAN_LIST_TABLE = document.querySelector("#dailyPlanListTable");
function planUI(data) {
  DAILY_PLAN_LIST_TABLE.innerHTML = "";
  data.forEach((item, index) => {
    return (DAILY_PLAN_LIST_TABLE.innerHTML += `
     <tr>
          <td>${index + 1}</td>
          <td><strong>${item.date}</strong></td>
          <td>${item.title}</td>
          <td><strong>${item.description}</strong></td>
          <td><span class="categry">${item.category}</span></td>
          <td><strong>${item.priority}</strong></td>
          <td><strong>${item.date}</strong></td>
          <td>
            <button class="edit-btn" onclick="editPlan(${item.id})">
            <i class="ri-pencil-fill"></i>
            </button>
            <button class="delete-btn" onclick="deletePlan(${item.id})">
            <i class="ri-delete-bin-4-fill"></i>
            </button>
          </td>
        </tr>
  `);
  });
}

// ================================================================================
// Add Daily Plan Logic
// ================================================================================

const DAILY_PLAN_FORM = document.querySelector("#dailyPlanForm");

DAILY_PLAN_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const PLAN_TITLE = document.getElementById("planTitle");
  const PLAN_DESCRIPTION = document.getElementById("planDescription");
  const PLAN_CATEGORY = document.getElementById("planCategory");
  const PLAN_PRIORITY = document.getElementById("planPriority");
  const PLAN_DATE = document.getElementById("planDate");
  const PLAN_TIME = document.getElementById("planTime");

  let planTitle = PLAN_TITLE.value;
  let planDescription = PLAN_DESCRIPTION.value;
  let planCategory = PLAN_CATEGORY.value;
  let planPriority = PLAN_PRIORITY.value;
  let planDate = PLAN_DATE.value;
  let planTime = PLAN_TIME.value;

  let newPlan = {
    id: Date.now(),
    title: planTitle,
    description: planDescription,
    category: planCategory,
    priority: planPriority,
    date: planDate,
    time: planTime,
    status: false,
  };

  if (editPlanId !== null) {
    const plan = DAILY_PLAN_DATA.find((plan) => plan.id === editPlanId);

    plan.title = title;
    plan.description = description;
    plan.category = category;
    plan.priority = priority;
    plan.date = date;
    plan.time = time;

    alert("Plan Update.");
    editPlanId = null;
  } else {
    alert("Plan Added.");
  }

  DAILY_PLAN_DATA.push(newPlan);
  localStorage.setItem("daily_plans", JSON.stringify(DAILY_PLAN_DATA));
  ADD_DAILY_PLAN_MODAL.style.display = "none";
  DAILY_PLAN_FORM.reset();
  planUI(DAILY_PLAN_DATA);
});

// =================================
// Edit Daily Plan Logic
// =================================
let editPlanId = null;

function editPlan(id) {
  ADD_DAILY_PLAN_MODAL.style.display = "flex";
  console.log(id);
  const plan = DAILY_PLAN_DATA.find((plan) => plan.id === id);
  editPlanId = id;

  planTitle.value = plan.title;
  planDescription.value = plan.description;
  planCategory.value = plan.category;
  planPriority.value = plan.priority;
  planDate.value = plan.date;
  planTime.value = plan.time;
}

// =================================
// Delete Daily Plan Logic
// =================================

function deletePlan(id) {
  const plans = DAILY_PLAN_DATA.filter((plan) => plan.id !== id);
  console.log(plans);
  localStorage.setItem("daily_plans", JSON.stringify(plans));
  planUI(plans);
}

// ================================================================================
// Daily Goals Add Logic
// ================================================================================

const DAILY_GOALS_LIST_TABLE = document.querySelector("#dailyGoalsListTable");

function goalUI(data) {
  DAILY_GOALS_LIST_TABLE.innerHTML = "";
  data.forEach((item, index) => {
    return (DAILY_GOALS_LIST_TABLE.innerHTML += `
      <tr>
          <td>${index + 1}</td>
          <td>${index + 1}</td>
          <td>${item.title}</td>
          <td><strong>${item.description}</strong></td>
          <td>
            <button class="edit-btn" onclick="editGoal(${item.id})">
            <i class="ri-pencil-fill"></i>
            </button>
            <button class="delete-btn" onclick="deleteGoal(${item.id})">
            <i class="ri-delete-bin-4-fill"></i>
            </button>
          </td>
        </tr>
    `);
  });
}

// ================================================================================
// Daily Goals Add Logic
// ================================================================================

const DAILY_GOALS_FORM = document.querySelector("#dailyGoalsForm");

DAILY_GOALS_FORM.addEventListener("submit", (e) => {
  ADD_DAILY_GOAL_MODAL.style.display = "flex";
  const GOAL_TITLE = document.getElementById("goalTitle");
  const GOAL_DESCRIPTION = document.getElementById("goalDescription");

  let goalTitle = GOAL_TITLE.value;
  let goalDescription = GOAL_DESCRIPTION.value;

  let newGoal = {
    id: Date.now(),
    title: goalTitle,
    description: goalDescription,
    status: false,
  };

  if (editGoalId !== null) {
    const goal = DAILY_GOALS_DATA.find((goal) => goal.id === editGoalId);

    goal.title = title;
    goal.description = description;

    editGoalId = null;
    alert("Goal Update.");
  } else {
    DAILY_GOALS_DATA.push(newGoal);
    alert("Goal Added.");
  }

  localStorage.setItem("goals", JSON.stringify(DAILY_GOALS_DATA));
  ADD_DAILY_GOAL_MODAL.style.display = "none";
  DAILY_GOALS_FORM.reset();
  goalUI(DAILY_GOALS_DATA);
});

// =================================
// Edit Daily Plan Logic
// =================================

let editGoalId = null;

function editGoal(id) {
  ADD_DAILY_GOAL_MODAL.style.display = "flex";
  const goal = DAILY_GOALS_DATA.find((goal, item) => goal.id === id);
  editGoalId = id;
  goalTitle.value = goal.time;
  goalDescription.value = goal.description;
}

// =================================
// Delete Daily Plan Logic
// =================================

function deleteGoal(id) {
  const goals = DAILY_GOALS_DATA.filter((goal) => goal.id !== id);
  localStorage.setItem("goals", JSON.stringify(goals));
}

// ================================================================================
// Initially Renderd Function
// ================================================================================

const url = "https://zenquotes.io/api/random";

async function fetchQuates() {
  const response = await fetch(url);
  console.log(response, "there are qoutes");
}
fetchQuates();
// ================================================================================
// Initially Renderd Function
// ================================================================================

goalUI(DAILY_GOALS_DATA);
todoUI(TODOS_DATA);
planUI(DAILY_PLAN_DATA);
