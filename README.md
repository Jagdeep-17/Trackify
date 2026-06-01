# Trackify

Trackify is a frontend task management application built with Vanilla JavaScript. It enables users to create, manage, and track tasks alongside productivity analytics, a built-in weather widget, and a time utility panel — all within a single-page, no-framework interface.

---

## Features

### Task Management
- Create tasks with a title, description, priority level, and category tag
- Edit and delete existing tasks
- Mark tasks as completed or pending
- Real-time search across all tasks
- Filter tasks by status (All, Completed, Pending) and category (Daily, Study, Personal)

### Analytics & Productivity
- Contribution heatmap displaying task activity over the last 30 days
- Daily streak tracking based on consecutive days with completed tasks
- Visual intensity scale on the heatmap reflecting completion volume

### Weather Widget
- Detects user location via the Geolocation API
- Fetches current weather data including temperature, humidity, wind speed, visibility, pressure, and sunrise/sunset times
- Displays a 5-day forecast filtered to midday snapshots
- Supports manual city search with geocoded dropdown suggestions
- Powered by the OpenWeatherMap API

### Ticki Panel
- Floating side panel with a real-time clock (12HR / 24HR toggle)
- Built-in stopwatch with start, stop, and reset controls
- Swiper.js-based slide navigation between clock and stopwatch views

### General
- LocalStorage-based data persistence (no backend required)
- Custom toast notification system with success, error, and info states
- Animated loader overlay for async operations
- Fully responsive layout built with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS |
| Logic | Vanilla JavaScript (ES6+) |
| Slider | Swiper.js |
| Weather Data | OpenWeatherMap API |
| Persistence | Browser LocalStorage |

---

## Project Structure

```
trackify/
├── index.html          # Application shell and UI markup
├── script/
│   └── script.js       # All application logic
├── config.js           # API key configuration
├── dist/
│   └── output.css      # Compiled Tailwind CSS
└── src/
    └── assets/         # Logo and profile image
```

---

## Getting Started

1. Clone the repository.
2. Add your OpenWeatherMap API key to `config.js`:
   ```js
   const WEATHER_API_KEY = "your_api_key_here";
   ```
3. If using Tailwind via CLI, run the build watcher:
   ```bash
   npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
   ```
4. Open `index.html` in a browser. No server or build step is required for runtime.

---

## API Reference

| API | Purpose |
|---|---|
| `openweathermap.org/data/2.5/weather` | Current weather by coordinates |
| `openweathermap.org/data/2.5/forecast` | 5-day forecast by coordinates |
| `api.openweathermap.org/geo/1.0/direct` | City name to coordinates |
| `api.openweathermap.org/geo/1.0/reverse` | Coordinates to city name |

---

## Project Status

Trackify is under active development. Planned additions include:

- Backend integration and user authentication
- Recurring task and due-date management
- Push notification support
- Data export functionality

---

## What I Learned Building This Project

This project was built as a deliberate exercise in frontend fundamentals without relying on frameworks. The key learnings include:

- **State-driven UI rendering** — Managing a central data array in LocalStorage and re-rendering the UI from state on every change, rather than directly mutating the DOM.
- **`Array.reduce()` for analytics** — Using reduce to aggregate task data by date into a structured object that powers both the heatmap and streak logic.
- **Streak algorithm** — Implementing a date-comparison loop that calculates consecutive active days by diffing sorted date strings in milliseconds.
- **Async coordination with `Promise.all()`** — Firing multiple fetch requests (current weather, geocoding, forecast) in parallel and handling them as a single resolved group.
- **Geolocation API** — Requesting browser location permissions and handling both granted and denied states gracefully.
- **CSS custom animations** — Writing multi-step `@keyframes` with staggered `animation-delay` values to produce the loader animation.
- **Dynamic DOM construction** — Building complex card markup entirely through `createElement` and `innerHTML` inside render functions, keeping the HTML file clean.
- **Notification system architecture** — Building a reusable toast system that dynamically injects and removes notification elements without a framework.
- **Tailwind CSS utility composition** — Designing a dark-themed, multi-panel UI using only utility classes and understanding how to handle hover states, backdrop filters, and layered shadows.
- **Third-party library integration** — Embedding and configuring Swiper.js for touch-navigable slides within a floating widget panel.
