# Luxury Wedding & Reception Invitation

A mobile-first digital wedding invitation for **Akhila & Nikhil**, styled as a South Indian temple-heritage experience with warm ivory, sandalwood, antique gold, traditional maroon, copper, and emerald accents.

## Included experience

- Opening invitation cover with Om motif, Sanskrit blessing, couple names, date, and reveal button
- Wedding ceremony and reception sections with finalized invitation artwork
- Configured venue details with Google Maps actions
- A clearly marked non-live wedding date display because the configured wedding date has passed
- Dear Guest message
- Subtle jasmine/gold ambient motifs with reduced-motion support
- User-triggered ambient instrumental music with a floating toggle
- Responsive layouts for mobile, tablet, and desktop
- Temple-inspired borders, mango-leaf toranam details, kolam diamonds, and restrained jasmine/gold motion
- Light romantic reception treatment with an inline, low-opacity couple line-art motif
- Ivory/champagne countdown cards with emerald numerals and refined entrance transitions
- Original supplied wedding and reception template artwork is preserved as local image assets
- Wedding template text is rendered separately from `config.js`, with a downloadable composite card
- Supplied couple and family photographs are used as responsive invitation highlights
- English, Telugu, and Hindi translations with a persistent language selector
- Locale-aware weekday/date formatting and Telugu/Devanagari font support

RSVP forms, phone numbers, WhatsApp actions, card customization, and public card-editing controls have been removed. The invitation displays fixed event information from `config.js`.

## Configuration

`config.js` is the single source of truth for couple names, parent details, invitation-by families, event dates, times, venues, map links, guest messaging, and music settings. The wedding date is configured as **Wednesday, 26 August 2026**, at **Srinivasa Gardens, Thorrur**. Its live countdown is intentionally disabled because that date has passed.

Reception is configured for **Saturday, 5 December 2026 at 7:00 PM onwards** at **Kiranam & Jaggery Merchants Function Hall, Khammam** with its Google Maps link.

Translations are centralized in `translations.js`. English is the first-visit default; a visitor's selected language is stored in browser local storage and falls back to English if a translation is unavailable. Names, venue names, addresses, map URLs, and configured numerical event details remain unchanged.

The layout uses a wide centered desktop container, two-column invitation cards above 900px, balanced tablet behavior, and stacked mobile cards below 900px. The language selector remains in the sticky navigation and stays within the mobile safe area.

## Run locally

### Direct browser

Open `index.html` in a browser.

### Local HTTP server

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project files

```text
index.html        Main invitation page
style.css         Theme, responsive layout, and animations
script.js         Data binding, countdown, audio, petals, and scroll effects
config.js         Centralized event configuration
translations.js   English, Telugu, and Hindi language strings
images/           Final wedding and reception artwork
```

No build step or external package installation is required.
