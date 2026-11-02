/**
 * ====================================================================
 * LUXURY WEDDING & RECEPTION INVITATION ENGINE
 * ====================================================================
 * Interactivity: Live Countdown, Cover Transition, Subtle Jasmine Motifs,
 * Ambient Audio, and Dynamic Config Binding.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDataBinding();
  initCountdown();
  initPetalAnimation();
  initAudioController();
  initScrollObservers();
  initNavigationSpy();
  initWeddingCardDownload();
});

const LANGUAGE_STORAGE_KEY = "wedding_invitation_language";
let currentLanguage = "en";

/* ====================================================================
   1. DYNAMIC CONFIG DATA BINDING
   ==================================================================== */
function initDataBinding() {
  if (typeof WEDDING_CONFIG === "undefined") {
    console.warn("WEDDING_CONFIG is not defined. Using inline HTML defaults.");
    return;
  }

  const { couple, events, dearGuest } = WEDDING_CONFIG;

  // 1. Couple Names
  const groomFullName = couple?.groom?.fullName || "To be announced";
  const brideFullName = couple?.bride?.fullName || "To be announced";
  const groomShortName = couple?.groom?.shortName || groomFullName.split(" ")[0];
  const brideShortName = couple?.bride?.shortName || brideFullName.split(" ")[0];

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) el.innerText = text;
  };

  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el && html) el.innerHTML = html;
  };

  // Cover
  setHtml("coverCoupleNames", `<span>${brideFullName}</span><span class="amp">&</span><span>${groomFullName}</span>`);
  setText("navBrand", `${brideShortName[0]} & ${groomShortName[0]}`);
  setText("footerHashtag", couple?.hashtag || `#${groomShortName}Weds${brideShortName}`);
  setText("coverDateHighlight", events?.wedding?.dateFormatted?.toUpperCase());

  const weddingTemplateImage = document.getElementById("weddingCardImg");
  if (weddingTemplateImage && events?.wedding?.cardImage) {
    weddingTemplateImage.src = events.wedding.cardImage;
  }
  const receptionTemplateImage = document.getElementById("receptionCardImg");
  if (receptionTemplateImage && events?.reception?.cardImage) {
    receptionTemplateImage.src = events.reception.cardImage;
  }
  setText("templateSacredOm", events?.wedding?.sacredOm || "ఓం");
  setText("templateSacredBlessing", events?.wedding?.sacredBlessing || "॥ శ్రీ గణేశాయ నమః ॥");

  // Wedding Section
  setText("weddingCoupleNames", `${brideShortName} & ${groomShortName}`);
  
  const parentNames = [
    couple?.groom?.fatherName,
    couple?.groom?.motherName,
    couple?.bride?.fatherName,
    couple?.bride?.motherName
  ];
  const parentsNote = document.getElementById("weddingParentsNote");
  if (parentNames.every(Boolean) && parentsNote) {
    setHtml("weddingParentsNote", `
      <span>Daughter of <strong>${couple.bride.fatherName}</strong> & <strong>${couple.bride.motherName}</strong></span><br>
      <span>Son of <strong>${couple.groom.fatherName}</strong> & <strong>${couple.groom.motherName}</strong></span>
    `);
    parentsNote.hidden = false;
  }

  const invitationByList = document.getElementById("invitationByList");
  if (invitationByList && Array.isArray(WEDDING_CONFIG.invitationBy)) {
    invitationByList.replaceChildren(...WEDDING_CONFIG.invitationBy.map((family) => {
      const item = document.createElement("li");
      item.textContent = family;
      return item;
    }));
  }

  setText("weddingDate", formatEventDate(events?.wedding?.targetDateISO, events?.wedding?.dateFormatted));
  setText("weddingVenueName", events?.wedding?.venueName || "To be announced");
  setText("weddingVenueAddress", events?.wedding?.venueAddress || "To be announced");
  setText("templateCoupleNames", `${brideFullName} & ${groomFullName}`);
  setText("templateInvitationMessage", events?.wedding?.invitationMessage || "To be announced");
  setText("templateWeddingDate", formatEventDate(events?.wedding?.targetDateISO, events?.wedding?.dateFormatted));
  setText("templateWeddingTime", events?.wedding?.timeFormatted || "To be announced");
  setText("templateWeddingVenue", events?.wedding?.venueName || "To be announced");
  setText("templateWeddingAddress", events?.wedding?.venueAddress || "To be announced");

  const weddingMapBtn = document.getElementById("weddingMapBtn");
  if (weddingMapBtn && events?.wedding?.googleMapsUrl) {
    weddingMapBtn.href = events.wedding.googleMapsUrl;
  }

  // Reception Section
  setText("receptionCoupleNames", `${brideShortName} & ${groomShortName}`);
  setText("receptionDate", formatEventDate(events?.reception?.targetDateISO, events?.reception?.dateFormatted));
  setText("receptionTime", events?.reception?.timeFormatted || "To be announced");
  setText("receptionVenueName", events?.reception?.venueName || "To be announced");
  setText("receptionVenueAddress", events?.reception?.venueAddress || "To be announced");

  const receptionMapBtn = document.getElementById("receptionMapBtn");
  if (receptionMapBtn) {
    if (events?.reception?.googleMapsUrl) {
      receptionMapBtn.href = events.reception.googleMapsUrl;
    } else {
      receptionMapBtn.closest(".card-action-bar")?.style.setProperty("display", "none");
    }
  }

  // Dear Guest
  setText("guestCoupleSignature", `${brideShortName} & ${groomShortName}`);
  initLanguageSelector();
  applyLanguage(getSavedLanguage());
}

function getSavedLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return TRANSLATIONS?.[savedLanguage] ? savedLanguage : "en";
  } catch {
    return "en";
  }
}

function initLanguageSelector() {
  const selector = document.getElementById("languageSelect");
  if (!selector || selector.dataset.bound === "true") return;

  selector.dataset.bound = "true";
  selector.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}

function applyLanguage(language) {
  const translations = TRANSLATIONS?.[language] || TRANSLATIONS.en;
  currentLanguage = TRANSLATIONS?.[language] ? language : "en";
  document.documentElement.lang = currentLanguage;

  const selector = document.getElementById("languageSelect");
  if (selector) {
    selector.value = currentLanguage;
    selector.setAttribute("aria-label", translations.languageSelect);
  }
  const languageLabel = document.getElementById("languageLabel");
  if (languageLabel) languageLabel.textContent = translations.languageLabel;
  const navigation = document.getElementById("siteNav");
  if (navigation) navigation.setAttribute("aria-label", translations.mainNavigation);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[key]) element.textContent = translations[key];
  });

  const setText = (id, text) => {
    const element = document.getElementById(id);
    if (element && text) element.textContent = text;
  };
  const { events, dearGuest } = WEDDING_CONFIG;
  const wedding = events.wedding;
  const reception = events.reception;

  setText("coverSubtitle", translations.coverSubtitle);
  setText("weddingTitle", translations.weddingTitle);
  setText("weddingSubTitle", translations.weddingSubtitle);
  setText("weddingMessage", translations.weddingMessage);
  setText("templateInvitationMessage", translations.weddingMessage);
  setText("weddingDate", formatEventDate(wedding.targetDateISO, wedding.dateFormatted, translations.dateLocale));
  setText("weddingTime", formatEventTime(wedding.timeFormatted, translations.muhurtham));
  setText("templateWeddingDate", formatEventDate(wedding.targetDateISO, wedding.dateFormatted, translations.dateLocale));
  setText("templateWeddingTime", formatEventTime(wedding.timeFormatted, translations.muhurtham));
  setText("templateWeddingVenue", wedding.venueName || "To be announced");
  setText("templateWeddingAddress", wedding.venueAddress || "To be announced");
  setText("receptionTag", translations.receptionTag);
  setText("receptionTitle", translations.receptionTitle);
  setText("receptionSubTitle", translations.receptionSubtitle);
  setText("receptionMessage", translations.receptionMessage);
  setText("receptionDate", formatEventDate(reception.targetDateISO, reception.dateFormatted, translations.dateLocale));
  setText("receptionTime", formatEventTime(reception.timeFormatted, translations.eveningTime));
  setText("guestGreetingTitle", translations.guestTitle);
  setText("guestHeartfeltQuote", `"${translations.guestMessage}"`);
  setText("guestFamilyClosing", translations.guestClosing);
  setText("countdownEventNote", translations.countdownNote.replace("{date}", formatEventDate(wedding.targetDateISO, wedding.dateFormatted, translations.dateLocale)));
  if (wedding.countdownEnabled === false) {
    const countdownGrid = document.getElementById("countdownGrid");
    if (countdownGrid) {
      countdownGrid.innerHTML = `<div class="countdown-static-message">${translations.countdownPast}</div>`;
    }
  }

  const musicButton = document.getElementById("musicToggleBtn");
  const musicLabel = document.getElementById("musicLabel");
  if (musicLabel) {
    musicLabel.textContent = musicButton?.classList.contains("playing")
      ? translations.musicPause
      : translations.musicLabel;
  }

  if (musicButton) {
    musicButton.setAttribute("aria-label", translations.musicAria);
    musicButton.title = translations.musicTitle;
  }
  document.title = `${translations.weddingTitle} | ${WEDDING_CONFIG.couple.bride.shortName} & ${WEDDING_CONFIG.couple.groom.shortName}`;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  } catch {
    // Language preference is optional when storage is unavailable.
  }
}

function initWeddingCardDownload() {
  const button = document.getElementById("downloadWeddingCard");
  const image = document.getElementById("weddingCardImg");
  if (!button || !image || button.dataset.bound === "true") return;

  button.dataset.bound = "true";
  button.addEventListener("click", async () => {
    try {
      if (!image.complete || !image.naturalWidth) {
        await new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", () => reject(new Error("Wedding template could not be loaded.")), { once: true });
        });
      }

      const { couple, events } = WEDDING_CONFIG;
      const wedding = events.wedding;
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas rendering is unavailable.");

      context.drawImage(image, 0, 0);
      const translations = TRANSLATIONS?.[currentLanguage] || TRANSLATIONS.en;
      const scale = canvas.width / 768;
      const centerX = canvas.width / 2;
      const font = (size, family) => `${Math.round(size * scale)}px ${family}`;
      const drawCentered = (text, y, fontStyle, color, maxWidth = 540) => {
        context.font = fontStyle;
        context.fillStyle = color;
        context.textAlign = "center";
        context.fillText(text, centerX, y * scale, maxWidth * scale);
      };
      const wrap = (text, maxWidth, fontStyle) => {
        context.font = fontStyle;
        const words = text.split(/\s+/);
        const lines = [];
        let line = "";
        words.forEach((word) => {
          const candidate = line ? `${line} ${word}` : word;
          if (context.measureText(candidate).width > maxWidth * scale && line) {
            lines.push(line);
            line = word;
          } else {
            line = candidate;
          }
        });
        if (line) lines.push(line);
        return lines;
      };

      drawCentered(wedding.sacredOm || "ఓం", 190, font(31, "'Noto Serif Telugu', serif"), "#701D25");
      drawCentered(wedding.sacredBlessing || "॥ శ్రీ గణేశాయ నమః ॥", 220, font(18, "'Noto Serif Telugu', serif"), "#701D25");
      drawCentered(translations.salutation, 260, font(11, "'Montserrat', sans-serif"), "#701D25");
      drawCentered(`${couple.bride.fullName} & ${couple.groom.fullName}`, 316, font(28, "'Great Vibes', cursive"), "#701D25");

      const messageFont = font(12, "'Cormorant Garamond', serif");
      const messageLines = wrap(translations.weddingMessage, 520, messageFont);
      messageLines.slice(0, 4).forEach((line, index) => {
        drawCentered(line, 365 + index * 17, messageFont, "#701D25", 520);
      });
      drawCentered(formatEventDate(wedding.targetDateISO, wedding.dateFormatted, translations.dateLocale), 452, font(15, "'Playfair Display', serif"), "#701D25");
      drawCentered(formatEventTime(wedding.timeFormatted, translations.muhurtham), 478, font(13, "'Montserrat', sans-serif"), "#701D25");
      drawCentered(wedding.venueName, 523, font(13, "'Playfair Display', serif"), "#701D25", 560);
      const addressLines = wrap(wedding.venueAddress, 510, font(10, "'Montserrat', sans-serif"));
      addressLines.slice(0, 2).forEach((line, index) => {
        drawCentered(line, 548 + index * 14, font(10, "'Montserrat', sans-serif"), "#701D25", 510);
      });

      const link = document.createElement("a");
      link.download = `wedding-invitation-${currentLanguage}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Unable to download wedding invitation:", error);
    }
  });
}

function formatEventTime(timeText, template) {
  if (!timeText) return "To be announced";
  const time = timeText.match(/\d{1,2}:\d{2}\s?(?:AM|PM)/i)?.[0] || timeText;
  return template.replace("{time}", time);
}

function formatEventDate(targetISO, fallback, locale = "en-IN") {
  if (!targetISO) return fallback || "To be announced";

  const date = new Date(targetISO);
  if (Number.isNaN(date.getTime())) return fallback || "To be announced";

  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata"
  }).format(date);
}

/* ====================================================================
   2. COVER TRANSITION: OPEN INVITATION
   ==================================================================== */
function scrollToInvitation() {
  const weddingSec = document.getElementById("wedding");
  if (weddingSec) {
    weddingSec.scrollIntoView({ behavior: "smooth" });
  }
}

/* ====================================================================
   3. LIVE COUNTDOWN TIMER
   ==================================================================== */
function initCountdown() {
  const targetISO = WEDDING_CONFIG?.events?.wedding?.targetDateISO;
  const countdownEnabled = WEDDING_CONFIG?.events?.wedding?.countdownEnabled !== false;
  const gridEl = document.getElementById("countdownGrid");
  const noteEl = document.getElementById("countdownEventNote");
  const translations = TRANSLATIONS?.[currentLanguage] || TRANSLATIONS.en;

  if (!countdownEnabled) {
    if (gridEl) {
      gridEl.innerHTML = `
        <div class="countdown-static-message">
          ${translations.countdownPast}
        </div>
      `;
    }
    if (noteEl) noteEl.innerText = formatEventDate(
      targetISO,
      WEDDING_CONFIG?.events?.wedding?.dateFormatted,
      translations.dateLocale
    );
    return;
  }

  if (!targetISO) {
    if (gridEl) {
      gridEl.innerHTML = `
        <div style="font-family:'Playfair Display', serif; font-size:1.3rem; color:#FFE58F; padding:20px;">
          📅 ${translations.dateLabel}: To be announced
        </div>
      `;
    }
    return;
  }

  const targetDate = new Date(targetISO).getTime();
  if (Number.isNaN(targetDate)) {
    if (gridEl) gridEl.textContent = "Event date unavailable";
    return;
  }

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (gridEl) {
        gridEl.innerHTML = `
          <div style="font-family:'Playfair Display', serif; font-size:1.6rem; color:#FFE58F; padding:15px;">
            🎉 ${translations.celebrationsBegun} 🎉
          </div>
        `;
      }
      if (noteEl) noteEl.innerText = translations.welcomeCelebrations;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");

    const daysEl = document.getElementById("timerDays");
    const hoursEl = document.getElementById("timerHours");
    const minutesEl = document.getElementById("timerMinutes");
    const secondsEl = document.getElementById("timerSeconds");

    if (daysEl) daysEl.innerText = pad(days);
    if (hoursEl) hoursEl.innerText = pad(hours);
    if (minutesEl) minutesEl.innerText = pad(minutes);
    if (secondsEl) secondsEl.innerText = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

/* ====================================================================
   4. AMBIENT MUSIC CONTROLLER
   ==================================================================== */
function initAudioController() {
  const toggleBtn = document.getElementById("musicToggleBtn");
  const audio = document.getElementById("bgAudio");
  const label = document.getElementById("musicLabel");

  if (!toggleBtn || !audio) return;

  let isPlaying = false;

  toggleBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      toggleBtn.classList.remove("playing");
      if (label) label.innerText = (TRANSLATIONS?.[currentLanguage] || TRANSLATIONS.en).musicLabel;
      isPlaying = false;
    } else {
      audio.play().then(() => {
        toggleBtn.classList.add("playing");
      if (label) label.innerText = (TRANSLATIONS?.[currentLanguage] || TRANSLATIONS.en).musicPause;
        isPlaying = true;
      }).catch(err => {
        console.log("Audio playback was prevented by user/browser gesture policy:", err);
      });
    }
  });
}

/* ====================================================================
   5. FLOATING PETALS CANVAS ANIMATION
   ==================================================================== */
function initPetalAnimation() {
  // Check reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const canvas = document.getElementById("petal-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const maxPetals = window.innerWidth < 600 ? 12 : 18;
  const randomPetalX = () => {
    if (Math.random() < 0.7) {
      const edgeWidth = width * 0.18;
      return Math.random() < 0.5
        ? Math.random() * edgeWidth
        : width - Math.random() * edgeWidth;
    }
    return Math.random() * width;
  };

  // Realistic delicate petal shapes
  for (let i = 0; i < maxPetals; i++) {
    petals.push({
      x: randomPetalX(),
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.2 - 0.6,
      opacity: Math.random() * 0.2 + 0.16,
      color: Math.random() > 0.55 ? "#E8CA82" : "#FFF8E8"
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.005) * 0.35 + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = randomPetalX();
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size, -p.size * 0.45, p.size, p.size * 0.65, 0, p.size);
      ctx.bezierCurveTo(-p.size, p.size * 0.65, -p.size, -p.size * 0.45, 0, -p.size);
      ctx.fill();

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ====================================================================
   6. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ==================================================================== */
function initScrollObservers() {
  const elements = document.querySelectorAll(".reveal-on-scroll");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ====================================================================
   7. ACTIVE NAVIGATION SPY
   ==================================================================== */
function initNavigationSpy() {
  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}
