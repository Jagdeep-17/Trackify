
const createBtn = document.querySelector(".create-todo");
const todoForm = document.querySelector(".todo");
const submitBtn = document.querySelector(".submit");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const savedTodoBox = document.querySelector(".savedTodo");
const searchTodo = document.querySelector(".searchTodo");
const allTaskBtn = document.querySelector(".allTasks");
const completedTasksBtn = document.querySelector(".completedTasks");
const pendingTasksBtn = document.querySelector(".pendingTasks");
const tagNameDropdown = document.querySelector(".tagName")
const dailyTasksBtn = document.querySelector(".dailyTag");
const studyTasksBtn = document.querySelector(".studyTag");
const personalTasksBtn = document.querySelector(".personalTag");
const tickiBtn = document.querySelector(".ticki");
const tickiDisplay = document.querySelector(".tickiDisplay");
const stopStopwatchBtn = document.querySelector(".stopStopwatch");
const resetStopwatchBtn = document.querySelector(".resetStopwatch");

createBtn.addEventListener("click", function () {
  todoForm.classList.toggle("hidden");
});
tickiBtn.addEventListener("click", function () {
  if (tickiDisplay.classList.contains("flex")) {
    tickiDisplay.classList.remove("flex");
    tickiDisplay.classList.add("hidden");
  } else {
    tickiDisplay.classList.remove("hidden");
    tickiDisplay.classList.add("flex");
  }
});

function showLoader() {
  document.querySelector("#loader").classList.replace("hidden", "flex");
};

function hideLoader() {
  document.querySelector("#loader").classList.replace("flex", "hidden");
};
function formatDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function removeThing() {
  const close = document.querySelector(".remove");
  const notify = document.querySelector(".notification");
  notify.classList.add("hidden");
  notify.classList.remove("flex");

};

function notify(message, type = 'info') {
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    container.className = "fixed top-5 right-5 z-50 flex flex-col gap-3";
    document.body.appendChild(container);
  }

  const notification = document.createElement('div');

  let bgClass = "bg-blue-500";
  if (type === 'success') bgClass = "bg-green-500";
  if (type === 'error') bgClass = "bg-red-500";

  notification.className = `notification flex items-center p-4 rounded shadow-lg text-white ${bgClass}`;

  notification.innerHTML = `
    <span class="mr-4">${message}</span>
    <div class="w-5 h-5 ml-auto cursor-pointer flex-shrink-0 remove">
      <svg viewBox="0 0 20 20" class="w-full h-full">
        <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="white" />
      </svg>
    </div>
  `;

  container.appendChild(notification);

  const closeButton = notification.querySelector(".remove");

  closeButton.addEventListener("click", () => {
    notification.classList.add("hidden");
    notification.classList.remove("flex");

  });
}


// helpers for localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
// analytics engine 
function analytics() {
  let todos = getTodos();
  const todoAnalytics = todos.reduce((accumulate, todo) => {
    //creation
    const createdDate = todo.CreatedAt;
    if (!accumulate[createdDate]) {
      accumulate[createdDate] = { created: 0, completed: 0 };
    }
    accumulate[createdDate].created++;


    // completion
    if (todo.CompletedAt !== null) {
      const completedDate = todo.CompletedAt;
      if (!accumulate[completedDate]) {
        accumulate[completedDate] = { created: 0, completed: 0 };
      } accumulate[completedDate].completed++
    }
    return accumulate;
  }, {});
  return todoAnalytics;
}

function claculateStreak() {
  const analyticsData = analytics();
  const entries = Object.entries(analyticsData)
  const activeDates = [];
  entries.forEach(([date, data]) => {
    if (data.completed > 0) {
      activeDates.push(date);
    }
  });
  activeDates.sort()
  if (activeDates.length === 0) {
    return null;
  }
  let streak = 1;
  let len = activeDates.length;
  for (let i = 1; i < len; i++) {
    const previousDate = activeDates[i - 1];
    const currentDate = activeDates[i];
    const current = new Date(currentDate);
    const previous = new Date(previousDate);

    const difference = current - previous;
    const dayDifference = difference / (1000 * 60 * 60 * 24);
    if (dayDifference === 1) {
      streak++;
    } else {
      streak = 1;
    }
  }
  return streak;
}


function renderHeatmap() {
  const heatmapWrapper =
    document.querySelector(".heatmapWrapper");
  heatmapWrapper.innerHTML = "";

  const analyticsData = analytics();

  const dates = [];
  for (let i = 0; i < 30; i++) {
    const currentdate = new Date();
    currentdate.setDate(currentdate.getDate() - i);
    const formattedDate = currentdate
      .toLocaleDateString("en-CA");
    dates.push(formattedDate);
  }
  dates.reverse();

  dates.forEach(date => {
    const heatCell =
      document.createElement("div");
    let completedCount = 0;
    let createdCount = 0;

    if (analyticsData[date]) {
      completedCount = analyticsData[date].completed;
      createdCount = analyticsData[date].created;
    }
    let intensityClass = "bg-zinc-800";
    if (completedCount === 1) {
      intensityClass = "bg-violet-900"
    }
    else if (completedCount >= 2 && completedCount <= 3) {
      intensityClass = "bg-violet-700";
    } else if (completedCount > 3) {
      intensityClass = "bg-violet-500";
    }
    const readableDate =
      new Date(date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric"
        }
      );
    const tooltip =
      `Date: ${readableDate}
Created: ${createdCount}
Completed: ${completedCount}`;
    heatCell.title = tooltip;
    heatCell.className =
      `h-4 w-4 rounded-[4px]  shrink-0 ${intensityClass}`;

    heatmapWrapper.appendChild(heatCell);
  });


}


function updateStreakUi() {
  const streak = claculateStreak();
  const streakCount = document.querySelector(".streakCount");
  streakCount.textContent = `🔥 ${streak}`;


}



function getFormattedDate() {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Kolkata"
  })
    .format(new Date())
    .split("/")
    .reverse()
    .join("-");
}

// render one todo
function loadTodos(todo) {
  const todoCard = document.createElement("div");

  // UPDATED CARD UI
  todoCard.className =
    "group relative rounded-2xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-sm p-5 shadow-[0_0_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-violet-500/10 hover:z-10";

  todoCard.innerHTML = `
  
    <div class="relative z-10 flex items-start justify-between gap-4">
      
      <div class="flex flex-col gap-3 flex-1 min-w-0">
        
        <h3 class="text-lg font-semibold text-zinc-100 wrap-break-word leading-snug">
          ${todo.Title}
        </h3>

        <p class="text-sm text-zinc-400 wrap-break-word leading-relaxed">
          ${todo.Description}
        </p>

        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-violet-400"></span>

          <small class="text-xs tracking-wide text-zinc-500">
            ${todo.CreatedAt_Display}
          </small>

          <span
          class="rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300 backdrop-blur-md"
        >
          ${todo.Tag}
        </span>
        </div>

      </div>

      ${menutemplate(todo.Id)}

    </div>

    <!-- HOVER GLOW -->
    <div class="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
  `;

  // COMPLETED STATE
  if (todo.CompletedAt !== null) {
    todoCard.classList.add("grayscale", "opacity-60");

  }

  savedTodoBox.appendChild(todoCard);
}


// render all todos
function renderTodos(todos = getTodos()) {
  savedTodoBox.innerHTML = "";

  todos.forEach(todo => {
    loadTodos(todo);
  });
}



function menutemplate(id) {
  return `
  
<div class="relative inline-block group/menu ">

  
  <button
    class="w-10 h-10 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:scale-105 active:scale-95"
  >
    <span class="w-1 h-1 bg-zinc-200 rounded-full"></span>
    <span class="w-1 h-1 bg-zinc-200 rounded-full"></span>
    <span class="w-1 h-1 bg-zinc-200 rounded-full"></span>
  </button>

  
  <div
    class="absolute right-0 top-12 z-50 w-55 rounded-2xl border border-zinc-700 bg-linear-to-br from-zinc-900 to-zinc-800 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible scale-95 transition-all duration-200 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:scale-100"
  >

    <ul class="flex flex-col gap-1">

      
      <li>
        <button
          data-edit="${id}"
          class="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:bg-violet-600 hover:text-white transition-all duration-200"
        >
          Edit
        </button>
      </li>

      
      <li>
        <button
          data-mark-as-completed="${id}"
          class="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:bg-emerald-600 hover:text-white transition-all duration-200"
        >
          Mark As Completed
        </button>
      </li>

      <div class="my-1 border-t border-zinc-700"></div>

      
      <li>
        <button
          data-settings="${id}"
          class="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all duration-200"
        >
          Settings
        </button>
      </li>

      
      <li>
        <button
          data-delete="${id}"
          class="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          Delete
        </button>
      </li>

      <div class="my-1 border-t border-zinc-700"></div>

      
      <li>
        <button
          data-team="${id}"
          class="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-300 hover:bg-fuchsia-700 hover:text-white transition-all duration-200"
        >
          Team Access
        </button>
      </li>

    </ul>

  </div>

</div>
`;
}


// load on start
window.addEventListener("DOMContentLoaded", function () {
  renderTodos();
  renderHeatmap();
  analytics();
  claculateStreak();
  updateStreakUi();
});


// clear inputs
function clearFields() {
  title.value = "";
  description.value = "";
};


// delete logic
savedTodoBox.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest("[data-delete]");
  if (!deleteBtn) return;

  const id = Number(deleteBtn.dataset.delete);
  let todos = getTodos();
  todos = todos.filter(todo => todo.Id !== id)
  saveTodos(todos);
  renderTodos();
});



// editing logic 
let currentlyEditingId = null;
savedTodoBox.addEventListener("click", function (e) {
  const editBtn = e.target.closest("[data-edit]")
  if (!editBtn) return;

  const id = Number(editBtn.dataset.edit)
  let todos = getTodos();
  let editingTodo = todos.find(function (todo) {
    return todo.Id === id;
  })
  title.value = editingTodo.Title
  description.value = editingTodo.Description

  currentlyEditingId = editingTodo.Id
  todoForm.classList.remove("hidden")


});

// mark as completed logic 
savedTodoBox.addEventListener("click", function (e) {
  const markAsCompletedBtn = e.target.closest("[data-mark-as-completed]");
  if (!markAsCompletedBtn) return;
  const id = Number(markAsCompletedBtn.dataset.markAsCompleted);
  let todos = getTodos();

  let markAsCompletedTodo = todos.find(function (todo) {
    return todo.Id === id;
  })
  markAsCompletedTodo.CompletedAt = getFormattedDate();
  saveTodos(todos);
  renderTodos();

})
//allTasks
allTaskBtn.addEventListener("click", function () {
  renderTodos();
})
//completedTasks 
completedTasksBtn.addEventListener("click", function () {
  let allTodos = getTodos();
  let filteredTodo = allTodos.filter(todo => {
    return todo.CompletedAt !== null;

  })
  renderTodos(filteredTodo);
})
//pendingTasks 
pendingTasksBtn.addEventListener("click", function () {
  let alltodos = getTodos();
  let filteredTodo = alltodos.filter(todo => {
    return todo.CompletedAt === null;
  })
  renderTodos(filteredTodo);
})
//Tag filters 
personalTasksBtn.addEventListener("click", function () {
  let alltodos = getTodos();
  let filteredTodo = alltodos.filter(todo => {
    return todo.Tag === "Personal";
  })
  renderTodos(filteredTodo);
})
dailyTasksBtn.addEventListener("click", function () {
  let alltodos = getTodos();
  let filteredTodo = alltodos.filter(todo => {
    return todo.Tag === "Daily";
  })
  renderTodos(filteredTodo);
})
studyTasksBtn.addEventListener("click", function () {
  let alltodos = getTodos();
  let filteredTodo = alltodos.filter(todo => {
    return todo.Tag === "Study";
  })
  renderTodos(filteredTodo);
})


// search 
searchTodo.addEventListener("input", function () {
  let allTodos = getTodos();
  let enteredText = searchTodo.value.toLowerCase();

  if (enteredText === "") {
    renderTodos(allTodos);
    return;
  }
  let filteredTodo = allTodos.filter(todo => {
    let todoTitle = todo.Title.toLowerCase();
    let todoDescription = todo.Description.toLowerCase();

    return (
      todoTitle.includes(enteredText) || todoDescription.includes(enteredText)
    );
  })
  renderTodos(filteredTodo);
})


function displayTime() {
  const tickiWatchTime = document.querySelector(".tickiTime");
  const readableDate =
    new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );
  tickiWatchTime.innerHTML = `${readableDate}`
}


const timeFormatToggler =
  document.querySelector("#switchBox");

function activeTimer() {

  const now = new Date();

  const is12Hr =
    timeFormatToggler.checked;

  let hr = now.getHours();

  if (is12Hr) {

    hr = hr % 12 || 12;
  }

  const min =
    String(now.getMinutes()).padStart(2, "0");

  const sec =
    String(now.getSeconds()).padStart(2, "0");

  document.querySelector(".activeHr").innerHTML =
    String(hr).padStart(2, "0");

  document.querySelector(".activeMin").innerHTML =
    min;

  document.querySelector(".activeSec").innerHTML =
    sec;
}

activeTimer();

setInterval(activeTimer, 1000);

timeFormatToggler.addEventListener(
  "change",
  activeTimer
);


//Ticki swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: ".next",
    prevEl: ".previous",
  },
});

swiper.on("slideChange", () => {
  const activeSlide = swiper.slides[swiper.activeIndex];
  const mode = activeSlide.dataset.mode;
  const currentMode = document.querySelector(".currentMode");

  switch (mode) {
    case "clock":
      currentMode.innerHTML = "Clock";
      break;


    case "stopwatch":
      currentMode.innerHTML = "Stopwatch";
      break;

    default:
      currentMode.innerHTML = "Error";
  }
});


let startedTime = 0;
let timeTaken = 0;
let interval = null;
const secDisplay = document.querySelector(".sec_Stopwatch");
const hrDisplay = document.querySelector(".hr_Stopwatch");
const minDisplay = document.querySelector(".min_Stopwatch");
const startedBtn = document.querySelector(".startedStopwatch ");
startedBtn.addEventListener("click", (e) => {

  startedTime = Date.now() - timeTaken;

  interval = setInterval(() => {
    timeTaken = Date.now() - startedTime;
    const hr = Math.floor(timeTaken / 3600000);

    const min = Math.floor(
      (timeTaken % 3600000) / 60000
    );

    const sec = Math.floor(
      (timeTaken % 60000) / 1000
    );

    secDisplay.innerHTML = " ";
    secDisplay.innerHTML = `${sec}`;
    minDisplay.innerHTML = " ";
    minDisplay.innerHTML = ` ${min}`;
    hrDisplay.innerHTML = " ";
    hrDisplay.innerHTML = `${hr}`;
  });
});

stopStopwatchBtn.addEventListener("click", function () {
  clearInterval(interval);
});


resetStopwatchBtn.addEventListener("click", () => {
  clearInterval(interval);
  startedTime = 0;
  timeTaken = 0;
  hrDisplay.textContent = "00";
  minDisplay.textContent = "00";
  secDisplay.textContent = "00";
});


tickiBtn.addEventListener("click", () => {
  displayTime();

})




// create todo
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let titleText = title.value.trim();
  let descriptionText = description.value.trim();
  let tagvalue = tagNameDropdown.value;
  let createdAtValue = getFormattedDate();

  if (titleText === "" || descriptionText === "") {
    alert("Input field is empty");
    return;
  }

  if (currentlyEditingId !== null) {
    let allTodos = getTodos()
    let editingTodo = allTodos.find(function (todo) {
      return todo.Id === currentlyEditingId;
    })

    editingTodo.Title = titleText;
    editingTodo.Description = descriptionText;
    editingTodo.CreatedAt_Display = "Edited at " + new Date().toLocaleString();
    editingTodo.UpdatedAt = getFormattedDate();
    editingTodo.Tag = tagvalue;
    saveTodos(allTodos)
    renderTodos()
    currentlyEditingId = null;
  }
  else {
    let todo = {
      Title: titleText,
      Description: descriptionText,
      Tag: tagvalue,
      CreatedAt_Display: new Date().toLocaleString(),
      CompletedAt: null,
      CreatedAt: createdAtValue,
      UpdatedAt: null,
      Id: Date.now()
    };

    let todos = getTodos();
    todos.push(todo);

    saveTodos(todos);

    renderTodos();
  }


  clearFields();
  todoForm.classList.add("hidden");
});

function toggleWeather() {
  const el = document.getElementById('weather-expandable');
  const ch = document.getElementById('weather-chevron');
  const lb = document.getElementById('weather-btn-label');
  const open = el.classList.toggle('grid-rows-[1fr]');
  el.classList.toggle('grid-rows-[0fr]', !open);
  ch.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  lb.textContent = open ? 'Show less' : 'Show more';
}



function geoLocation() {
  navigator.geolocation.getCurrentPosition(permissionGranted, permissionDenied);
};

function permissionGranted(Currentposition) {
  let lat = Currentposition.coords.latitude;
  let lon = Currentposition.coords.longitude;
  fetchWeatherData(lat, lon);
};

function permissionDenied() {
  const searchCity = document.querySelector("#searchCity");
  let enteredCity;
  searchCity.classList.replace("hidden", "flex");

  const enteredCityName = document.querySelector("#citySearch")
  enteredCityName.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      enteredCity = enteredCityName.value.trim();

      showCorrdinates(enteredCity);
    }

  });
  enteredCityName.addEventListener("input", () => {
    if (enteredCityName.value.trim() === "") {
      closeCityDropdown();
    }
  });

};


function cityDropdowns(cities) {
  const dropdown_container = document.querySelector(".cityDropdowns");

  dropdown_container.classList.remove("hidden");
  dropdown_container.innerHTML = '';

  if (cities.length === 0) {
    dropdown_container.innerHTML = `<div class="px-4 py-3 text-center text-sm text-gray-400">No cities found</div>`;
    return;
  }




  cities.forEach((city) => {
    const item = document.createElement("div");
    item.className = "flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-purple-50 transition-colors ";
    item.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
      <div class="flex flex-col min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-purple-900 truncate">${city.name}</span>
          <span class="text-xs text-white bg-purple-400 rounded-full px-2 py-0.5 shrink-0">${city.country}</span>
        </div>
        <div class="flex items-center gap-1.5 mt-0.5">
          <span class="text-xs text-purple-400 truncate">${city.state}</span>
          <span class="text-purple-200 text-xs">•</span>
          <span class="text-xs text-purple-300 font-mono shrink-0">${parseFloat(city.lat).toFixed(2)}°, ${parseFloat(city.lon).toFixed(2)}°</span>
        </div>
      </div>
    `;
    dropdown_container.appendChild(item);
    item.addEventListener("click", () => {
      getCoordinatesDropdowns(city);
    });
  });

}

function getCoordinatesDropdowns(city) {
  fetchWeatherData(city.lat, city.lon);
  closeCityDropdown();
};


function closeCityDropdown() {
  document.querySelector(".cityDropdowns").classList.add("hidden");
}

function showCorrdinates(enteredCity) {
  const geoCoding = `http://api.openweathermap.org/geo/1.0/direct?q=${enteredCity}&limit=3&appid=${WEATHER_API_KEY}`
  showLoader();
  fetch(geoCoding)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data", "error");
      }
      return response.json();
    }).then((data) => {
      if (data.length === 0) {
        notify("City not found", "error");
        return;
      }
      if (data.length === 1) {
        const city = data[0];

        fetchWeatherData(city.lat, city.lon);

        return;
      }
      if (data.length > 1) {
        cityDropdowns(data);
        return;
      }

    })
    .catch((error) => {
      console.error(error);
      notify("Something went wrong", "error")

    })
    .finally(() => {
      hideLoader();
    });
};
function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function fetchWeatherData(lat, lon) {
  showLoader();

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  const geoCoding = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
  try {
    const [weatherResponse, geoCodingResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(geoCoding),
      fetch(forecast)
    ]);

    const weatherData = await weatherResponse.json();
    const geocodingData = await geoCodingResponse.json();
    const forecastData = await forecastResponse.json();


    if (weatherData.cod === 404) {
      notify("City not found for weather", "error");
      return;
    }
    if (geocodingData.length === 0) {
      notify("GeoLocation not found", "error");
      return;
    }
    if (forecastData.cod === 404) {
      notify("Not able to access forecast data", "error");
      return;
    }

    renderWeather(weatherData);
    renderGeolocation(geocodingData);
    renderForecast(forecastData);

  } catch (error) {
    console.error(error);
    notify("System error", "error")
  } finally {
    hideLoader();
  }



}
function renderWeather(data) {
  const currentDate = document.querySelector(".currentDateWeather");
  currentDate.innerHTML = formatDate(new Date(data.dt * 1000));
  const temp = Math.round(data.main.temp)
  document.querySelector(".temperature").innerHTML = `${temp}°`;
  const feelsTemp = Math.round(data.main.feels_like);
  document.querySelector(".feelsLike").innerHTML = `Feels like ${feelsTemp}°`
  const weatherStatus = data.weather[0].main;
  document.querySelector(".mainWeatherStatus").innerHTML = weatherStatus;
  const currentTime = document.querySelector(".currentTime");
  function updateTime() {
    const now = new Date();
    currentTime.innerHTML = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  updateTime();
  setInterval(updateTime, 1000);
  const weatherDescription = data.weather[0].description;
  document.querySelector(".weather_description").innerHTML = weatherDescription;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const iconElement = document.querySelector(".weather-icon");
  if (iconElement) {
    iconElement.src = iconUrl;
  }
  const riseTime = formatTime(data.sys.sunrise);
  const setTime = formatTime(data.sys.sunset);
  document.querySelector(".riseTime").innerHTML = `Rise ${riseTime} `
  document.querySelector(".setTime").innerHTML = ` Set ${setTime} `

  const station = data.name;
  document.querySelector(".station").innerHTML = `Weather station in ${station}`
  const humidity = data.main.humidity;
  document.querySelector(".humidity").innerHTML = `${humidity} %`

  const wind_speed = Math.round(data.wind.speed);
  document.querySelector(".wind").innerHTML = `${wind_speed} m/sec`

  const visibility = Math.round(data.visibility / 1000) + " km";
  document.querySelector(".visibility").innerHTML = `${visibility}`
  const pressure = data.main.pressure + "  hPa";
  document.querySelector(".pressure").innerHTML = pressure;

};


function renderGeolocation(city) {

  const { name } = city[0];
  document.querySelector(".cityName").innerHTML = name;
  const state = city[0].state;
  const country = city[0].country;
  document.querySelector(".state").innerHTML = state;
  document.querySelector(".country").innerHTML = country;

}

function renderForecast(data) {
  const dailyForecasts = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  const container = document.querySelector(".forecast_Container");
  container.innerHTML = "";

  dailyForecasts.forEach((item, index) => {
    const date = new Date(item.dt_txt);
    const day = index === 0
      ? "Today"
      : date.toLocaleDateString("en-US", { weekday: "short" });

    const card = document.createElement("div");
    card.className =
      "flex-1 text-center py-3 px-1 " +
      (index === 0
        ? "bg-violet-500/15 border-b-2 border-violet-400/40"
        : "hover:bg-violet-500/[0.06] transition-colors");

    card.innerHTML = `
      <div class="text-[11px] text-violet-400/50 mb-1.5">${day}</div>
      <img
        src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
        alt="${item.weather[0].description}"
        class="w-8 h-8 mx-auto mb-1.5"
      >
      <div class="text-sm font-medium">${Math.round(item.main.temp)}°C</div>
      <div class="text-[11px] text-white/30 mt-0.5">Feels ${Math.round(item.main.feels_like)}°C</div>
    `;

    container.appendChild(card);
  });
}


geoLocation();
let localNewsData = null;
let techNewsData = null;
async function newsAndUpadtaeDashboard() {
  showLoader();
const local =  
`https://newsdata.io/api/1/latest? 
  apikey=${NEWSDATAIO_API_KEY}
  &country=in
  &language=en
  &category=breaking,education,technology
  &timezone=asia/kolkata
  &prioritydomain=top
  &video=0
  &removeduplicate=1
  &size=9`
  const tech = "https://api.currentsapi.services/v1/search?keywords=AI";
  const options = {
  headers: {
    Authorization: CURRENTNEWS_API_KEY,
  },
};

try{
  const [localResponse , techResponse] = await Promise.allSettled([
    fetch(local),
    fetch(tech,options)
  ]);

   if (localResponse.status === "fulfilled") {
      localNewsData = await localResponse.value.json();
    }

    if (techResponse.status === "fulfilled") {
      techNewsData = await techResponse.value.json();
    }

    // Default load  local
    if (localNewsData) {
      renderLocalResponse(localNewsData);
    }
  

}catch(error){
  console.error(error);
      notify("News System Error", "error");

}finally{
  hideLoader();
}

};
const localBtn = document.querySelector(".local_news");
const techBtn = document.querySelector(".tech_news");
 
localBtn.addEventListener("click", () => {
  if (localNewsData) {
    renderLocalResponse(localNewsData);
  }
});

techBtn.addEventListener("click", () => {
  if (techNewsData) {
    renderTechResponse(techNewsData);
  }
});
function renderLocalResponse(data){
const container = document.querySelector(".swiper-wrapper");
container.innerHTML = "";
data.results.forEach((page)=>{
  const item = document.createElement("div")
  item.className = " swiper-slide"
  item.innerHTML = `<div class=""><div class="flex  rounded-3xl p-1.5"> <img
  class="h-24 w-24 object-cover rounded-3xl m-4"
  src="${page.image_url || 'src/assets/logo.svg'}"
  onerror="this.src='src/assets/logo.svg'"
  alt="img"
/>
                  <div class="flex flex-col gap-1 min-w-0 flex-1">
                    <h2 class="text-md mt-6 line-clamp-2 wrap-break-word font-medium">${page.title}</h2>
                    <span class="text-[12px] text-gray-500 ">${page.pubDate}</span>
                    <span class="flex flex-row gap-3"><a href="link" class="text-purple-600truncate max-w-40 block"  target="_blank">${new URL(page.link).hostname}</a>
                    </span>

                  </div>


                </div>

                <div class="flex flex-col gap-2  m-4">
                  <p class="text-gray-500 line-clamp-3 wrap-break-word">${page.description || "No description available"}</p>
                  
                </div>
                </div>`
                container.appendChild(item);
});
console.log("local");

}
function renderTechResponse (data){

const container = document.querySelector(".swiper-wrapper");
container.innerHTML = "";
data.news.forEach((page)=>{
  const item = document.createElement("div")
  item.className = " swiper-slide"
  item.innerHTML = `<div class=""><div class="flex  rounded-3xl p-1.5"> <img
  class="h-24 w-24 object-cover rounded-3xl m-4"
  src="${page.image || 'src/assets/logo.svg'}"
  onerror="this.src='src/assets/logo.svg'"
  alt="img"
/>
                  <div class="flex flex-col gap-1 min-w-0 flex-1">
                    <h2 class="text-md mt-6 line-clamp-2 wrap-break-word font-medium">${page.title}</h2>
                    <span class="text-[12px] text-gray-500 ">${page.published}</span>
                    <span class="flex flex-row gap-3"><a href="link" class="text-purple-600truncate max-w-40 block"  target="_blank">${new URL(page.url).hostname}</a>
                    </span>

                  </div>


                </div>

                <div class="flex flex-col gap-2  m-4">
                  <p class="text-gray-500 line-clamp-3 wrap-break-word">${page.description || "No description available"}</p>
                  
                </div>
                </div>`
                container.appendChild(item);
});
console.log("tech");

}
const techNews_swiper = new Swiper(".techNews_swiper",{
slidesPerView: 1,
autoplay: {
   delay: 5000,
 },
 
});
document
.querySelector(".custom-prev")
.addEventListener("click", ()=> techNews_swiper.slidePrev());

document
.querySelector(".custom-next")
.addEventListener("click", ()=> techNews_swiper.slideNext())
newsAndUpadtaeDashboard()