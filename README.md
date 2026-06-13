# Trackify

Trackify is a single-page task management dashboard built entirely with vanilla JavaScript and Tailwind CSS. It combines task tracking, productivity analytics, live weather data, and a news feed into one no-framework, no-backend interface that runs entirely in the browser.

---

## Features

### Task Management
- Create tasks with a title, description, category tag, and optional due date/time
- Edit and delete existing tasks
- Mark tasks as completed or pending
- Real-time search across all tasks
- Filter tasks by status (All, Completed, Pending) and category (Daily, Study, Personal)
- Due-date countdown with automatic notifications when a task is approaching or overdue

### Analytics & Productivity
- Contribution heatmap showing task completion activity over the last 30 days
- Daily streak tracking based on consecutive days with completed tasks
- Visual intensity scale on the heatmap reflecting completion volume

### Weather Widget
- Detects the user's location via the Geolocation API
- Fetches current conditions: temperature, humidity, wind speed, visibility, pressure, and sunrise/sunset times
- Displays a 5-day forecast filtered to midday snapshots
- Supports manual city search with geocoded location suggestions
- Powered by the OpenWeatherMap API

### News & Updates Dashboard
- Local news feed powered by the NewsData.io API, with results cached in LocalStorage to reduce repeat requests
- Technology news feed powered by the Currents API
- Swiper-based carousel for browsing headlines

### Ticki Panel
- Floating side panel with a real-time clock (12-hour / 24-hour toggle)
- Built-in stopwatch with start, stop, and reset controls
- Swiper-based navigation between the clock and stopwatch views

### General
- LocalStorage-based persistence — no backend or database required
- Custom toast notification system with success, error, info, and reminder states
- Animated loading overlay for async operations
- Fully responsive layout built with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS |
| Logic | Vanilla JavaScript (ES6+) |
| Carousel | Swiper.js |
| Weather Data | OpenWeatherMap API |
| News Data | NewsData.io API, Currents API |
| Persistence | Browser LocalStorage |

---

## Project Structure

```
trackify/
├── index.html          # Application shell and UI markup
├── script/
│   └── script.js       # All application logic
├── config.js            # API key configuration (not committed)
├── config.example.js    # Template for API key configuration
├── dist/
│   └── output.css       # Compiled Tailwind CSS
└── src/
    └── assets/           # Logo and profile image
```

---

## Getting Started

1. Clone the repository.
2. Copy `config.example.js` to `config.js` and add your API keys:
   ```js
   const WEATHER_API_KEY = "your_openweathermap_api_key";
   const NEWSDATAIO_API_KEY = "your_newsdata_io_api_key";
   const CURRENTNEWS_API_KEY = "your_currents_api_key";
   ```
3. If you're using the Tailwind CLI to make style changes, run the build watcher:
   ```bash
   npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
   ```
4. Open `index.html` in a browser. No server or build step is required to run the app.

> **Note:** `config.js` contains your personal API keys and should not be committed to version control. Keep it listed in `.gitignore`.

---

## API Reference

| API | Endpoint | Purpose |
|---|---|---|
| OpenWeatherMap | `/data/2.5/weather` | Current weather by coordinates |
| OpenWeatherMap | `/data/2.5/forecast` | 5-day forecast by coordinates |
| OpenWeatherMap | `/geo/1.0/direct` | City name to coordinates |
| OpenWeatherMap | `/geo/1.0/reverse` | Coordinates to city name |
| NewsData.io | `/api/1/latest` | Local news headlines |
| Currents API | `/v1/latest-news` | Technology news headlines |

---



## What I Learned Building This Project

This project was built as a deliberate exercise in frontend fundamentals without relying on a framework. Key takeaways include:

- **State-driven UI rendering** — maintaining a central data array in LocalStorage and re-rendering the UI from that state on every change, rather than mutating the DOM directly.
- **`Array.reduce()` for analytics** — aggregating task data by date into a structured object that powers both the heatmap and the streak calculation.
- **Streak algorithm** — implementing a date-comparison loop that calculates consecutive active days by diffing sorted date strings in milliseconds.
- **Async coordination with `Promise.all()` / `Promise.allSettled()`** — firing multiple fetch requests (weather, geocoding, forecast, news) in parallel and handling them as a resolved group, including partial failures.
- **Geolocation API** — requesting browser location permissions and gracefully handling both granted and denied states.
- **Due-date notifications** — comparing stored timestamps against the current time to trigger reminder and overdue alerts.
- **CSS custom animations** — writing multi-step `@keyframes` with staggered `animation-delay` values for the loading overlay.
- **Dynamic DOM construction** — building complex card markup through `createElement` and `innerHTML` inside render functions, keeping the HTML file clean.
- **Notification system architecture** — building a reusable toast system that dynamically injects and removes notification elements without a framework.
- **Tailwind CSS utility composition** — designing a dark-themed, multi-panel UI using only utility classes, including hover states, backdrop filters, and layered shadows.
- **Third-party library integration** — embedding and configuring Swiper.js for touch-navigable carousels within floating widget panels.
