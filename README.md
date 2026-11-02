# Marriage & Reception Invitation

A luxury South Indian digital wedding and reception invitation website crafted for **Akhila & Nikhil**, featuring traditional cultural aesthetics, dual-event cards, live countdown, Google Calendar integration, Google Maps navigation, Telugu and English language switching, and interactive music and petal effects.

## Live Configuration
`config.js` is the single source of truth for couple names, parent details, invitation-by families, event dates, times, venues, map links, guest messaging, and music settings.

- **Wedding Ceremony**: **Thursday, 4 December 2026 at 8:09 AM** at **Rama Upender Garden Function Hall, Thorrur**. Live countdown is active.
- **Wedding Reception**: **Saturday, 5 December 2026 at Dinner: 8:00 PM onwards** at **Kiranam & Jaggery Merchants Function Hall, Khammam** with Google Maps link.

Translations are centralized in `translations.js`. English is the first-visit default; a visitor's selected language is stored in browser local storage and falls back to English if a translation is unavailable. Names, venue names, addresses, map URLs, and configured numerical event details remain unchanged.

The layout uses a wide centered desktop container, two-column invitation cards above 900px, balanced tablet behavior, and stacked mobile cards below 900px. The language selector remains in the sticky navigation and stays within the mobile safe area.

## Run locally

### Option 1: Node.js (Recommended)

```powershell
npm start
# or
node server.js
```
Then open `http://localhost:3000`.

### Option 2: Python HTTP Server

```powershell
python -m http.server 8000
```
Then open `http://localhost:8000`.

### Option 3: Direct browser

Double-click `index.html` to open in any web browser.

## Project files

```text
index.html        Main invitation page
style.css         Theme, responsive layout, and animations
template.css      Custom template frame and card overlay styles
script.js         Data binding, countdown, audio, petals, and scroll effects
config.js         Centralized event configuration
translations.js   English and Telugu language strings
server.js         Local HTTP static file server
images/           Wedding, reception, and portrait artwork
```
