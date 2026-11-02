/**
 * ====================================================================
 * LUXURY WEDDING & RECEPTION INVITATION ENGINE
 * ====================================================================
 * Interactivity: Live Countdown, Cover Transition, WhatsApp & Local RSVP,
 * Canvas Falling Petals, Ambient Audio, and Dynamic Config Binding.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDataBinding();
  initCountdown();
  initPetalAnimation();
  initAudioController();
  initScrollObservers();
  initNavigationSpy();
});

/* ====================================================================
   1. DYNAMIC CONFIG DATA BINDING
   ==================================================================== */
function initDataBinding() {
  if (typeof WEDDING_CONFIG === "undefined") {
    console.warn("WEDDING_CONFIG is not defined. Using inline HTML defaults.");
    return;
  }

  const { couple, events, dearGuest, rsvp } = WEDDING_CONFIG;

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
  setHtml("coverCoupleNames", `<span>${groomFullName}</span><span class="amp">&</span><span>${brideFullName}</span>`);
  setText("navBrand", `${groomShortName[0]} & ${brideShortName[0]}`);
  setText("footerHashtag", couple?.hashtag || `#${groomShortName}Weds${brideShortName}`);

  // Wedding Section
  setText("weddingTitle", events?.wedding?.title || "Wedding Ceremony");
  setText("weddingSubTitle", events?.wedding?.subTitle || "The Sacred Muhurtham");
  setText("weddingCoupleNames", `${groomShortName} & ${brideShortName}`);
  
  if (couple?.groom?.fatherName && couple?.bride?.fatherName) {
    setHtml("weddingParentsNote", `
      Son of <strong>${couple.groom.fatherName}</strong> & <strong>${couple.groom.motherName}</strong><br>
      Daughter of <strong>${couple.bride.fatherName}</strong> & <strong>${couple.bride.motherName}</strong>
    `);
  }

  setText("weddingMessage", events?.wedding?.invitationMessage);
  setText("weddingDate", events?.wedding?.dateFormatted || "To be announced");
  setText("weddingTime", events?.wedding?.timeFormatted || "To be announced");
  setText("weddingVenueName", events?.wedding?.venueName || "To be announced");
  setText("weddingVenueAddress", events?.wedding?.venueAddress || "To be announced");

  const weddingMapBtn = document.getElementById("weddingMapBtn");
  if (weddingMapBtn && events?.wedding?.googleMapsUrl) {
    weddingMapBtn.href = events.wedding.googleMapsUrl;
  }

  // Reception Section
  setText("receptionTitle", events?.reception?.title || "Wedding Reception");
  setText("receptionSubTitle", events?.reception?.subTitle || "An Evening of Celebration & Dinner");
  setText("receptionCoupleNames", `${groomShortName} & ${brideShortName}`);
  setText("receptionMessage", events?.reception?.invitationMessage);
  setText("receptionDate", events?.reception?.dateFormatted || "To be announced");
  setText("receptionTime", events?.reception?.timeFormatted || "To be announced");
  setText("receptionVenueName", events?.reception?.venueName || "To be announced");
  setText("receptionVenueAddress", events?.reception?.venueAddress || "To be announced");

  const receptionMapBtn = document.getElementById("receptionMapBtn");
  if (receptionMapBtn && events?.reception?.googleMapsUrl) {
    receptionMapBtn.href = events.reception.googleMapsUrl;
  }

  // Dear Guest
  setText("guestGreetingTitle", dearGuest?.heading || "Dear Guest");
  setText("guestHeartfeltQuote", `"${dearGuest?.message || "Your presence, blessings and love will make our celebration truly complete."}"`);
  setText("guestCoupleSignature", `${groomShortName} & ${brideShortName}`);
  setText("guestFamilyClosing", dearGuest?.closing || "With love and best compliments from both families.");

  // Contact Persons List
  if (rsvp?.contactPersons && rsvp.contactPersons.length > 0) {
    const listHtml = rsvp.contactPersons.map(cp => `
      <strong>${cp.name}:</strong> <a href="tel:${cp.phone.replace(/[^0-9+]/g, '')}">${cp.phone}</a>
    `).join(" &bull; ");
    setHtml("contactPersonList", listHtml);
  }
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
  const gridEl = document.getElementById("countdownGrid");
  const noteEl = document.getElementById("countdownEventNote");

  if (!targetISO) {
    if (gridEl) {
      gridEl.innerHTML = `
        <div style="font-family:'Playfair Display', serif; font-size:1.3rem; color:#FFE58F; padding:20px;">
          📅 Event Date: To be announced
        </div>
      `;
    }
    return;
  }

  const targetDate = new Date(targetISO).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (gridEl) {
        gridEl.innerHTML = `
          <div style="font-family:'Playfair Display', serif; font-size:1.6rem; color:#FFE58F; padding:15px;">
            🎉 The Celebrations Have Begun! 🎉
          </div>
        `;
      }
      if (noteEl) noteEl.innerText = "Welcome to the Wedding Celebrations!";
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
   4. RSVP FORM VALIDATION & HANDLING
   ==================================================================== */
function validateRsvpForm() {
  let isValid = true;

  const nameInput = document.getElementById("rsvpName");
  const attendanceInput = document.getElementById("rsvpAttendance");
  const countInput = document.getElementById("rsvpCount");

  const fieldName = document.getElementById("fieldGuestName");
  const fieldAtt = document.getElementById("fieldAttendance");
  const fieldCnt = document.getElementById("fieldAttendees");

  // Reset errors
  fieldName.classList.remove("has-error");
  fieldAtt.classList.remove("has-error");
  fieldCnt.classList.remove("has-error");

  // Validate Name
  if (!nameInput.value.trim()) {
    fieldName.classList.add("has-error");
    isValid = false;
  }

  // Validate Attendance
  if (!attendanceInput.value) {
    fieldAtt.classList.add("has-error");
    isValid = false;
  }

  // Validate Attendees count
  const countVal = parseInt(countInput.value, 10);
  if (isNaN(countVal) || countVal < 1 || countVal > 15) {
    fieldCnt.classList.add("has-error");
    isValid = false;
  }

  return isValid;
}

function handleRsvpFormSubmit(event) {
  event.preventDefault();

  if (!validateRsvpForm()) {
    return;
  }

  const guestName = document.getElementById("rsvpName").value.trim();
  const attendance = document.getElementById("rsvpAttendance").value;
  const count = document.getElementById("rsvpCount").value || "1";

  // Display clear local confirmation feedback banner
  const banner = document.getElementById("rsvpFeedbackBanner");
  const messageEl = document.getElementById("rsvpFeedbackMessage");

  if (banner && messageEl) {
    messageEl.innerHTML = `
      <strong>Dear ${escapeHtml(guestName)}</strong>,<br>
      Your attendance confirmation for <strong>${escapeHtml(count)} attendee(s)</strong> (${escapeHtml(attendance)}) has been noted.<br>
      We eagerly await your gracious presence and blessings!
    `;
    banner.classList.add("show");
    banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Persist locally for seamless return visits
  try {
    localStorage.setItem("wedding_guest_rsvp", JSON.stringify({
      guestName, attendance, count, timestamp: new Date().toISOString()
    }));
  } catch (e) {
    // Non-blocking local storage exception
  }
}

function submitViaWhatsApp() {
  if (!validateRsvpForm()) {
    return;
  }

  const guestName = document.getElementById("rsvpName").value.trim();
  const attendance = document.getElementById("rsvpAttendance").value;
  const count = document.getElementById("rsvpCount").value || "1";
  const wishes = document.getElementById("rsvpWishes").value.trim();

  const groom = WEDDING_CONFIG?.couple?.groom?.fullName || "Venkatesh Reddy";
  const bride = WEDDING_CONFIG?.couple?.bride?.fullName || "Ananya Reddy";
  const phone = WEDDING_CONFIG?.rsvp?.whatsappNumber || "919876543210";

  let msg = `🙏 *Wedding RSVP Confirmation*\n\n`;
  msg += `Dear Family,\n`;
  msg += `I am confirming my RSVP for the wedding of *${groom} & ${bride}*.\n\n`;
  msg += `👤 *Guest Name:* ${guestName}\n`;
  msg += `✨ *Attendance:* ${attendance}\n`;
  msg += `👥 *Number of Attendees:* ${count}\n`;

  if (wishes) {
    msg += `💌 *Wishes:* "${wishes}"\n`;
  }

  msg += `\nLooking forward to celebrating with you all! 🌸`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");

  // Also show local confirmation feedback
  handleRsvpFormSubmit(new Event("submit"));
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ====================================================================
   5. AMBIENT MUSIC CONTROLLER
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
      if (label) label.innerText = "Play Music";
      isPlaying = false;
    } else {
      audio.play().then(() => {
        toggleBtn.classList.add("playing");
        if (label) label.innerText = "Pause Music";
        isPlaying = true;
      }).catch(err => {
        console.log("Audio playback was prevented by user/browser gesture policy:", err);
      });
    }
  });
}

/* ====================================================================
   6. FLOATING PETALS CANVAS ANIMATION
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
  const maxPetals = 28;

  // Realistic delicate petal shapes
  for (let i = 0; i < maxPetals; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.2 - 0.6,
      opacity: Math.random() * 0.5 + 0.35,
      color: Math.random() > 0.4 ? "#F4B8C1" : "#FDE8ED" // Soft pinks & blush
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.005) * 0.5 + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(p.size, p.size * 0.5, p.size, p.size * 1.5);
      ctx.quadraticCurveTo(0, p.size * 1.2, -p.size, p.size * 1.5);
      ctx.quadraticCurveTo(-p.size, p.size * 0.5, 0, 0);
      ctx.fill();

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ====================================================================
   7. SCROLL-TRIGGERED REVEAL ANIMATIONS
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
   8. ACTIVE NAVIGATION SPY
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
