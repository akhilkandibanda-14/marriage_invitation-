/**
 * ====================================================================
 * WEDDING & RECEPTION INVITATION CONFIGURATION
 * ====================================================================
 * Edit this file to customize all details: names, dates, venues,
 * addresses, and Google Maps links.
 * Missing or unconfirmed fields will gracefully display "To be announced".
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      fullName: "Nikhil",
      shortName: "Nikhil",
      title: "Groom",
      fatherName: "Kandibanda Ashok Kumar (Late)",
      motherName: "Kandibanda Manjula"
    },
    bride: {
      fullName: "Akhila",
      shortName: "Akhila",
      title: "Bride",
      fatherName: "Bonagiri Ravi",
      motherName: "Kalyani"
    },
    hashtag: "#AkhilaWedsNikhil"
  },

  invitationBy: [
    "Kandibanda Ashok Kumar (Late) & Kandibanda Manjula",
    "Bonagiri Ravi & Kalyani",
    "Kandibanda Jaya Prakash & Nagalakshmi",
    "Kandibanda Sridher & Shailaja"
  ],

  // Main Event Dates
  // Format: "YYYY-MM-DDTHH:mm:ss" or null if to be announced
  events: {
    wedding: {
      title: "Wedding Ceremony",
      subTitle: "The Sacred Muhurtham",
      brideRelation: "Daughter of Bonagiri Ravi & Kalyani",
      dateFormatted: "4 December 2026",
      weekday: "Thursday",
      timeFormatted: "8:09 AM onwards",
      lunchTimeFormatted: "1:00 PM",
      targetDateISO: "2026-12-04T08:09:00+05:30",
      countdownEnabled: true,
      venueName: "Rama Upender Garden Function Hall",
      venueAddress: "Thorrur",
      googleMapsUrl: "https://maps.app.goo.gl/FyN3FBgwAahamsY48?g_st=iw",
      invitationMessage: "With the divine blessings of our elders and the almighty, we request the honor of your presence as two souls unite in the sacred bond of matrimony.",
      cardImage: "images/wedding_template_original.png",
      sacredOm: "ఓం",
      sacredBlessing: "॥ శ్రీ గణేశాయ నమః ॥"
    },
    reception: {
      title: "Wedding Reception",
      subTitle: "An Evening of Celebration & Dinner",
      invitedBy: [
        "Kandibanda Jaya Prakash & Nagalakshmi",
        "Kandibanda Ashok Kumar (Late) & Kandibanda Manjula",
        "Kandibanda Sridher & Shailaja"
      ],
      dateFormatted: "5 December 2026",
      weekday: "Saturday",
      timeFormatted: "Dinner: 8:00 PM onwards",
      targetDateISO: "2026-12-05T20:00:00+05:30",
      venueName: "Kiranam & Jaggery Merchants Function Hall",
      venueAddress: "Khammam",
      googleMapsUrl: "https://maps.app.goo.gl/q4hfi4xnTwYtdS6PA?g_st=iw",
      invitationMessage: "Join us for an enchanting evening filled with laughter, music, fine cuisine, and togetherness as we celebrate the newlyweds.",
      cardImage: "images/reception_template.png"
    }
  },

  // Dear Guest / Personal Message
  dearGuest: {
    heading: "Dear Guest",
    message: "Your presence, blessings and love will make our celebration truly complete. Having you with us on this momentous occasion means the world to our family.",
    closing: "With Love and Blessings"
  },

  // Music settings
  music: {
    enabled: true,
    audioSrc: "https://assets.mixkit.co/music/preview/mixkit-indian-traditional-sitar-and-tabla-song-1049.mp3",
    title: "Auspicious Sitar & Flute Instrumental"
  }
};

// Prevent modifications by runtime code
if (typeof Object.freeze === "function") {
  Object.freeze(WEDDING_CONFIG);
}
