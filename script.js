// ================================================================================
// Constants
// ================================================================================

const NAV_LINKS = document.querySelectorAll("[data-page]");
const PAGE_SETION = document.querySelectorAll(".pageSection");

// Todo List Modal
const ADD_TODO_MODAL = document.querySelector("#todoModal");
const ADD_TODO_BTN = document.querySelector("#addTodoBtn");
const CLOSE_TODO_MODAL = document.querySelector("#closeTodoModal");
const TODO_LIST_TABLE = document.querySelector("#todoListTable");
const TODO_SUBMIT_BTN = document.querySelector("#todoSUbmitBtn");
const TODO_FORM = document.querySelector("#todoForm");

const DASH_TODO_LIST = document.querySelector("#dashTodoList");
const DASH_DAILY_PLAN_LIST = document.querySelector("#dashDailyPlanList");
const DASH_DAILY_GOALS_LIST = document.querySelector("#dashDailyGoalsList");

// Daily Plan Modal
const ADD_DAILY_PLAN_MODAL = document.querySelector("#dailyPlanModal");
const ADD_DAILY_PLAN_BTN = document.querySelector("#addDailyPlan");
const CLOSE_DAILY_PLAN_MODAL = document.querySelector("#closeDailyPlanModal");
const PLAN_SUBMIT_BTN = document.querySelector("#planSUbmitBtn");
const DAILY_PLAN_FORM = document.querySelector("#dailyPlanForm");

// Daily Goals Modal
const ADD_DAILY_GOAL_MODAL = document.querySelector("#dailyGoalsModal");
const ADD_DAILY_GOAL_BTN = document.querySelector("#addDailyGoals");
const CLOSE_DAILY_GOAL_MODAL = document.querySelector("#closeDailyGoalsModal");
const GOAL_SUBMIT_BTN = document.querySelector("#goalSUbmitBtn");
const DAILY_GOALS_FORM = document.querySelector("#dailyGoalsForm");

// other

const CURRENT_TIME = document.querySelector("#currentTime");
const CURRENT_DATE = document.querySelector("#currentDate");

// Bacground Image

const ADD_BG_IMG_MODAL = document.querySelector("#addBgImageModel");
const bgImagesContainer = document.querySelector("#bgImagesContainer");
const BG_IMG_MODAL = document.querySelector("#bgImageModal");
const CLOSE_BG_IMG_MODAL = document.querySelector("#closeBgImageModal");
const BG_IMG_ADD_FORM = document.querySelector("#bgImageAddForm");
const BG_IMG_CONTAINER = document.querySelector("#bgImagesContainer");

// ================================================================================
// Data and local Storage
// ================================================================================

const TODOS_DATA = JSON.parse(localStorage.getItem("todos")) || [];
const DAILY_PLAN_DATA = JSON.parse(localStorage.getItem("daily_plans")) || [];
const DAILY_GOALS_DATA = JSON.parse(localStorage.getItem("goals")) || [];
const BACGROUND_IMAGES = JSON.parse(localStorage.getItem("backgrouds")) || [];
const THEAM = JSON.parse(localStorage.getItem("theme"));
const CurrentBackground = JSON.parse(
  localStorage.getItem("CurrentBackground"),
) || {
  url: "https://images.unsplash.com/photo-1783410079079-a60cb566e7ad?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
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
const OPEN_TOTO_MODAL = document.querySelector("#openTodoFormModal");
const OPEN_D_PLAN_MODAL = document.querySelector("#openDailyPlanFormModal");
const OPEN_D_GOAL_MODAL = document.querySelector("#openDailyGoalFormModal");

modalOpen(OPEN_TOTO_MODAL, ADD_TODO_MODAL);
modalOpen(OPEN_D_PLAN_MODAL, ADD_DAILY_PLAN_MODAL);
modalOpen(OPEN_D_GOAL_MODAL, ADD_DAILY_GOAL_MODAL);
modalToggle(ADD_TODO_MODAL, ADD_TODO_BTN, CLOSE_TODO_MODAL, TODO_FORM);
modalToggle(
  ADD_DAILY_PLAN_MODAL,
  ADD_DAILY_PLAN_BTN,
  CLOSE_DAILY_PLAN_MODAL,
  DAILY_PLAN_FORM,
);
modalToggle(
  ADD_DAILY_GOAL_MODAL,
  ADD_DAILY_GOAL_BTN,
  CLOSE_DAILY_GOAL_MODAL,
  DAILY_GOALS_FORM,
);
modalToggle(
  BG_IMG_MODAL,
  ADD_BG_IMG_MODAL,
  CLOSE_BG_IMG_MODAL,
  BG_IMG_ADD_FORM,
);
function modalToggle(modal, open, close, form) {
  modal.style.display = "none";
  open.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  close.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
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
  DASH_TODO_LIST.innerHTML = "";
  if (data.length === 0) {
    console.log("No todo");
    DASH_TODO_LIST.innerHTML = `<h2>No Task Found, please add Todo.</h2>`;
    return;
  } else {
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
  TODO_SUBMIT_BTN.textContent = "Update Todo";
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
  const index = TODOS_DATA.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    TODOS_DATA.splice(index, 1);
  }
  localStorage.setItem("todos", JSON.stringify(TODOS_DATA));
  todoUI(TODOS_DATA);
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
  DASH_DAILY_PLAN_LIST.innerHTML = "";
  if (data === 0) {
    DASH_DAILY_PLAN_LIST.innerHTML = `<h2>No Goal Found, please add Goal.</h2>`;
  } else {
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
}

// ================================================================================
// Add Daily Plan Logic
// ================================================================================

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

    plan.title = planTitle;
    plan.description = planDescription;
    plan.category = planCategory;
    plan.priority = planPriority;
    plan.date = planDate;
    plan.time = planTime;

    alert("Plan Update.");
    editPlanId = null;
  } else {
    alert("Plan Added.");
    DAILY_PLAN_DATA.push(newPlan);
  }

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
  PLAN_SUBMIT_BTN.textContent = "Update Plan";
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
  const index = DAILY_PLAN_DATA.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    DAILY_PLAN_DATA.splice(index, 1);
  }
  localStorage.setItem("daily_plans", JSON.stringify(DAILY_PLAN_DATA));
  planUI(DAILY_PLAN_DATA);
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
  DASH_DAILY_GOALS_LIST.innerHTML = "";
  if (data === 0) {
    DASH_DAILY_GOALS_LIST.innerHTML = `<h2>No Goal Found, please add Goal.</h2>`;
    return;
  } else {
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
}

// ================================================================================
// Daily Goals Add Logic
// ================================================================================

DAILY_GOALS_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
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

    goal.title = goalTitle;
    goal.description = goalDescription;

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
  GOAL_SUBMIT_BTN.textContent = "Update Goal";
  const goal = DAILY_GOALS_DATA.find((goal) => goal.id === id);
  editGoalId = id;
  goal.value = goalTitle;
  goal.value = goalDescription;
}

// =================================
// Delete Daily Plan Logic
// =================================

function deleteGoal(id) {
  const index = DAILY_GOALS_DATA.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    DAILY_GOALS_DATA.splice(index, 1);
  }
  localStorage.setItem("goals", JSON.stringify(DAILY_GOALS_DATA));
  goalUI(DAILY_GOALS_DATA);
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

// ================================================================================
// Current Dste And Time function
// ================================================================================

const promoTime = document.getElementById("promoTime");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const promoDefaulttime = document.getElementById("promoDefaulttime");
const promoSortBreck = document.getElementById("promoSortBreck");
const promoLongBreck = document.getElementById("promoLongBreck");

const customMinutes = document.getElementById("customMinutes");

const setCustomTime = document.getElementById("setCustomTime");
const progressBar = document.getElementById("progressBar");
const timeStatus = document.querySelector(".status");
const sessionInfo = document.querySelector(".session-info strong");

let timer = null;
let totalSecond = 25 * 60;
let currentSeconds = totalSecond;
let currentSession = 1;
let isRunning = false;

// ==========================
// Update Timer UI
// ==========================
function updateTimer() {
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;
  promoTime.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = ((totalSecond - currentSeconds) / totalSecond) * 100;
  progressBar.style.width = `${progress}%`;
}

// ==========================
// Start Timer
// ==========================

function startTime() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (currentSeconds > 0) {
      currentSeconds--;
      updateTimer();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Session Completed 🎉");
      currentSession++;
      if (currentSession > 4) {
        currentSession = 1;
      }
      sessionInfo.textContent = currentSession;
    }
  }, 1000);
}

// ==========================
// Pause
// ==========================

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}
// ==========================
// Reset
// ==========================

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  currentSeconds = totalSecond;
  updateTimer();
}

// ==========================
// Change Mode
// ==========================

function changeMode(minutes, text) {
  clearInterval(timer);
  isRunning = false;
  totalSecond = minutes * 60;
  currentSeconds = totalSecond;
  timeStatus.textContent = text;
  updateTimer();
}

// ==========================
// Custom Time
// ==========================

setCustomTime.addEventListener("click", () => {
  const minutes = Number(customMinutes.value);
  if (minutes <= 0) {
    alert("Invalid Minuts");
    return;
  }
  changeMode(minutes, "Custome Timer");
});

promoDefaulttime.classList.add("active");
promoDefaulttime.addEventListener("click", () => {
  promoDefaulttime.classList.add("active");
  promoSortBreck.classList.remove("active");
  promoLongBreck.classList.remove("active");
  startBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
  resetBtn.classList.remove("active");

  changeMode(25, "Focus Mode");
});

promoSortBreck.addEventListener("click", () => {
  promoDefaulttime.classList.remove("active");
  promoSortBreck.classList.add("active");
  promoLongBreck.classList.remove("active");
  startBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
  resetBtn.classList.remove("active");

  changeMode(5, "Short Break");
});

promoLongBreck.addEventListener("click", () => {
  promoDefaulttime.classList.remove("active");
  promoSortBreck.classList.remove("active");
  promoLongBreck.classList.add("active");
  startBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
  resetBtn.classList.remove("active");

  changeMode(15, "Long Break");
});

startBtn.addEventListener("click", () => {
  startBtn.classList.add("active");
  pauseBtn.classList.remove("active");
  resetBtn.classList.remove("active");

  startTime();
});
pauseBtn.addEventListener("click", () => {
  startBtn.classList.remove("active");
  pauseBtn.classList.add("active");
  resetBtn.classList.remove("active");

  pauseTimer();
});
resetBtn.addEventListener("click", () => {
  startBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
  resetBtn.classList.add("active");

  resetTimer();
});
updateTimer();

// ================================================================================
// Theam Chnage functinality
// ================================================================================

const DARK_MODE_BTN = document.querySelector("#dark-mode-btn");
if (THEAM) {
  document.body.classList.add("dark-theme");
  DARK_MODE_BTN.checked = true;
}
DARK_MODE_BTN.addEventListener("change", () => {
  if (DARK_MODE_BTN.checked) {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", JSON.stringify(true));
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", JSON.stringify(false));
  }
});

// ================================================================================
// Background Change
// ================================================================================

function bgUI(data) {
  BG_IMG_CONTAINER.innerHTML = "";
  data.forEach((item) => {
    return (BG_IMG_CONTAINER.innerHTML += `
      <div onclick="setBgImg(${item.id}, this)" class="imageBox">
      <span class="checkCircle"></span>
  <img src="${item.url}"/>
  </div>
  `);
  });
}

BG_IMG_ADD_FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const BG_URL = document.getElementById("bgUrl");
  let BgUrl = BG_URL.value;
  console.log(BgUrl, "Thisis url");
  let newBg = {
    id: Date.now(),
    url: BgUrl,
  };
  BACGROUND_IMAGES.push(newBg);
  localStorage.setItem("backgrouds", JSON.stringify(BACGROUND_IMAGES));
  alert("Background Image Added.");
  BG_IMG_MODAL.style.display = "none";
  BG_IMG_ADD_FORM.reset();
  bgUI(BACGROUND_IMAGES);
  console.log(BACGROUND_IMAGES, "image data");
});

function setBgImg(id, elem) {
  let imageBox = document.querySelectorAll(".imageBox");
  imageBox.forEach((val) => val.classList.remove("active"));

  elem.classList.add("active");
  const bgImg = BACGROUND_IMAGES.find((item) => item.id === id);
  if (!bgImg) return;
  document.body.style.backgroundImage = `url(${bgImg.url})`;
  localStorage.setItem("CurrentBackground", JSON.stringify(bgImg));
}

if (CurrentBackground) {
  document.body.style.backgroundImage = `url(${CurrentBackground.url})`;
  console.log(CurrentBackground.url, "THis is is bg");
}
// ================================================================================
// Initially Renderd Function
// ================================================================================

goalUI(DAILY_GOALS_DATA);
todoUI(TODOS_DATA);
planUI(DAILY_PLAN_DATA);
bgUI(BACGROUND_IMAGES);
