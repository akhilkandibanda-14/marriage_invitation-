# 💍 Luxury Digital Wedding & Reception Invitation Website

A mobile-first, luxury digital wedding invitation and reception experience created for **Venkatesh Reddy & Ananya Reddy**.

Inspired by royal Indian wedding heritage and modern luxury aesthetics with an ivory, blush rose, sage green, and champagne gold palette.

---

## 🌟 Key Features & Structure

1. **Cover & Welcome Reveal (`#cover`)**:
   - Full-screen invitation envelope with royal calligraphy headings.
   - Sacred Shloka & Om motif.
   - Smooth **"Open Invitation"** transition into the celebration schedule.

2. **Wedding Ceremony Section (`#wedding`)**:
   - Features the sacred Muhurtham details for **Thursday, December 4, 2026**.
   - Traditional South Indian temple Gopuram, Kalash, and Mangalsutra (Thali) illustration.
   - Direct **"Open Map"** button navigating to the wedding venue.
   - Quick link to the custom WhatsApp card designer.

3. **Reception Invitation Section (`#reception`)**:
   - Dedicated luxury reception section for **Friday, December 5, 2026**.
   - Emerald green, white magnolia florals, and palace garden illustration.
   - Direct **"Open Map"** button for the reception banquet.

4. **Live Event Countdown (`#countdown`)**:
   - Live Days, Hours, Minutes, and Seconds countdown timer.
   - Automatically bound to the ISO date in `config.js`.
   - Handles missing or past dates gracefully ("To be announced" / "Celebrations Begun").

5. **"Dear Guest" Section (`#guest`)**:
   - Heartfelt, personalized message of gratitude and blessings for every visiting family member and friend.

6. **RSVP Flow (`#rsvp`)**:
   - Client-side validated form collecting Guest Name, Attendance choice, and Attendee Count.
   - Inline real-time validation without fake backend claims.
   - Dual action: Immediate local feedback confirmation + 1-click **Confirm Directly via WhatsApp** button.

7. **WhatsApp Card Designer (`card.html`)**:
   - Built-in generator with 2-in-1 tabs for **Marriage (Dec 4)** and **Reception (Dec 5)** cards.
   - Multilingual presets (English, Telugu, Hindi).
   - High-definition 1-click `.jpg` image download ready to forward on WhatsApp!

8. **Aesthetic Enhancements & Accessibility**:
   - Ambient sitar/flute instrumental background audio with persistent toggle.
   - Floating rose and blush flower petals with native canvas animation.
   - Fully supports `@media (prefers-reduced-motion: reduce)`.
   - Accessible ARIA labels and semantic HTML5.

---

## ⚙️ Centralized Configuration (`config.js`)

All event details are centralized in **`config.js`**. Update names, dates, venues, map links, and WhatsApp phone numbers in one place:

```javascript
const WEDDING_CONFIG = {
  couple: {
    groom: {
      fullName: "Venkatesh Reddy",
      shortName: "Venkatesh",
      fatherName: "Sri Father's Name",
      motherName: "Smt. Mother's Name"
    },
    bride: {
      fullName: "Ananya Reddy",
      shortName: "Ananya",
      fatherName: "Sri Bride's Father",
      motherName: "Smt. Bride's Mother"
    },
    hashtag: "#VenkyWedsAnu"
  },
  events: {
    wedding: {
      dateFormatted: "Thursday, December 4, 2026",
      timeFormatted: "Muhurtham: 09:30 AM onwards",
      targetDateISO: "2026-12-04T09:30:00+05:30",
      venueName: "Sri Raja Rajeshwari Kalyana Mandapam",
      venueAddress: "Plot No. 12, Temple Road, Jubilee Hills, Hyderabad, Telangana",
      googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
    },
    reception: {
      dateFormatted: "Friday, December 5, 2026",
      timeFormatted: "07:00 PM onwards",
      targetDateISO: "2026-12-05T19:00:00+05:30",
      venueName: "The Meridian Banquet",
      venueAddress: "Financial District, Gachibowli, Hyderabad, Telangana",
      googleMapsUrl: "https://maps.google.com/?q=Gachibowli+Hyderabad"
    }
  },
  rsvp: {
    whatsappNumber: "919876543210" // Number to receive RSVP confirmations
  }
};
```

---

## 🚀 How to Run Locally

### Option 1: Direct Open in Browser (No Server Needed)
Simply double-click **`index.html`** or in PowerShell:
```powershell
start index.html
```

### Option 2: Local HTTP Server (Python)
```powershell
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option 3: Local HTTP Server (Node.js)
```powershell
npx serve .
```

---

## 🌐 How to Deploy (GitHub Pages / Free Hosting)

### 1. Push to GitHub
```powershell
git add .
git commit -m "feat: Luxury digital wedding & reception invitation website"
git branch -M main
git remote set-url origin https://github.com/akhilkandibanda-14/marriage_invitation-.git
git push -u origin main
```

### 2. Enable GitHub Pages (Free Instant Hosting)
1. Go to your GitHub repository: `https://github.com/akhilkandibanda-14/marriage_invitation-`
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
4. Within 1-2 minutes, your wedding invitation will be live at:
   `https://akhilkandibanda-14.github.io/marriage_invitation-/`

---

## 📁 File Structure
```
c:\mariiage invitation\
├── index.html        # Main luxury digital wedding & reception website
├── style.css         # Responsive styling, color tokens, animations & print media
├── script.js         # Interactive engine (Countdown, Audio, RSVP, Canvas Petals)
├── config.js         # Centralized customizable configuration
├── card.html         # WhatsApp Wedding & Reception card generator
├── README.md         # Documentation & deployment guide
└── images/
    ├── marriage_card.jpg           # Temple Gopuram & Kalash wedding card template
    ├── reception_card_clean.jpg    # Emerald luxury floral & palace reception template
    └── reception_card_original.jpg # Cropped source image
```
