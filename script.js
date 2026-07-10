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

const DASH_TODO_LIST = document.querySelector("#dashTodoList");
const DASH_DAILY_PLAN_LIST = document.querySelector("#dashDailyPlanList");
const DASH_DAILY_GOALS_LIST = document.querySelector("#dashDailyGoalsList");

// Daily Plan Modal
const ADD_DAILY_PLAN_MODAL = document.querySelector("#dailyPlanModal");
const ADD_DAILY_PLAN_BTN = document.querySelector("#addDailyPlan");
const CLOSE_DAILY_PLAN_MODAL = document.querySelector("#closeDailyPlanModal");

// Daily Goals Modal
const ADD_DAILY_GOAL_MODAL = document.querySelector("#dailyGoalsModal");
const ADD_DAILY_GOAL_BTN = document.querySelector("#addDailyGoals");
const CLOSE_DAILY_GOAL_MODAL = document.querySelector("#closeDailyGoalsModal");

// other

const CURRENT_TIME = document.querySelector("#currentTime");
const CURRENT_DATE = document.querySelector("#currentDate");

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
const openTodoFormModal = document.querySelector("#openTodoFormModal");
modalOpen(openTodoFormModal, ADD_TODO_MODAL);
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

function modalOpen(close, modal) {
  close.addEventListener("click", () => {
    modal.style.display = "flex";
    console.log("open");
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
  data.forEach((item, index) => {
    return (DASH_TODO_LIST.innerHTML += `
      <tr>
          <td><input type="checkbox"/> ${item.title}</td>
          <td style="width: 18%; text-align: end;">
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
  data.forEach((item, index) => {
    return (DASH_DAILY_PLAN_LIST.innerHTML += `
     <tr>
          <td style="width="20%"><input type="checkbox"> <strong>${item.date}</strong></td>
          <td>${item.title}</td>
          <td style="width: 20%; text-align: end;">
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
  data.forEach((item, index) => {
    return (DASH_DAILY_GOALS_LIST.innerHTML += `
     <tr>
          <td><input type="checkbox"> <strong>${item.title}</strong></td>
          <td style="width: 20%; text-align: end;">
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

const url = "https://quotes-db.vercel.app/api/random";

const motivationQuote = document.querySelector("#motivationQuote");
let quoteText = null;
async function fetchQuates() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not fetched from api");
    }
    const data = await response.json();
    motivationQuote.innerHTML = `"${data.quote}"`;
    console.log(data.quote, data, "there are qoutes");
  } catch (error) {
    console.error(error);
  }
}
console.log(motivationQuote, "i have");
fetchQuates();

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

// Weather Elements
const cityName = document.querySelector(".location");
const temperature = document.querySelector(".temperature h1");
const feelsLike = document.querySelector(".temperature p");
const weatherCondition = document.querySelector(".weather-condition");

const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

// Weather Code
const weatherCodes = {
  0: "☀️ Clear Sky",
  1: "🌤 Mainly Clear",
  2: "⛅ Partly Cloudy",
  3: "☁️ Overcast",
  45: "🌫 Fog",
  48: "🌫 Dense Fog",
  51: "🌦 Light Drizzle",
  53: "🌦 Moderate Drizzle",
  55: "🌧 Heavy Drizzle",
  61: "🌦 Light Rain",
  63: "🌧 Rain",
  65: "🌧 Heavy Rain",
  71: "❄️ Snow",
  80: "🌦 Rain Showers",
  95: "⛈ Thunderstorm",
};

// Convert City → Latitude & Longitude
async function getCoordinates(city) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${city}`,
  );

  const data = await response.json();

  if (data.length === 0) {
    alert("City Not Found");
    return null;
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].display_name,
  };
}

// Fetch Weather
async function getWeather(city) {
  try {
    const location = await getCoordinates(city);

    if (!location) return;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=sunrise,sunset&timezone=auto`,
    );

    const weather = await weatherResponse.json();

    updateUI(location, weather);
  } catch (error) {
    console.log(error);
  }
}

// Update UI
function updateUI(location, data) {
  cityName.textContent = location.name;

  temperature.textContent = `${data.current.temperature_2m}°C`;

  feelsLike.textContent = `Feels Like ${data.current.apparent_temperature}°C`;

  weatherCondition.textContent = weatherCodes[data.current.weather_code];

  humidity.textContent = `${data.current.relative_humidity_2m}%`;

  wind.textContent = `${data.current.wind_speed_10m} km/h`;

  sunrise.textContent = new Date(data.daily.sunrise[0]).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  sunset.textContent = new Date(data.daily.sunset[0]).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Search Button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please Enter City");
    return;
  }

  getWeather(city);
});

// Enter Key
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather(cityInput.value.trim());
  }
});

// Default Weather
getWeather("Nagpur");
// ================================================================================
// Initially Renderd Function
// ================================================================================

goalUI(DAILY_GOALS_DATA);
todoUI(TODOS_DATA);
planUI(DAILY_PLAN_DATA);

// ================================================================================
// Current Dste And Time function
// ================================================================================

function todayDateTime() {
  const currentTime = new Date().toLocaleTimeString("en-US");
  const currentDate = new Date();
  const currentDateOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formateCurrentTime = Intl.DateTimeFormat(
    "en-Gb",
    currentDateOptions,
  ).format(currentDate);
  CURRENT_TIME.textContent = currentTime;
  CURRENT_DATE.textContent = formateCurrentTime;
}
todayDateTime();
setInterval(todayDateTime, 1000);
