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
      fatherName: "Late Kandibanda Ashok Kumar",
      motherName: "Manjula"
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
    "Bonagiri Ravi & Kalyani",
    "Kandibanda Jaya Prakash & Nagalakshmi",
    "Kandibanda Sridhes & Shailaja"
  ],

  // Main Event Dates
  // Format: "YYYY-MM-DDTHH:mm:ss" or null if to be announced
  events: {
    wedding: {
      title: "Wedding Ceremony",
      subTitle: "The Sacred Muhurtham",
      dateFormatted: "26 August 2026",
      weekday: "Wednesday",
      timeFormatted: "11:00 AM onwards",
      targetDateISO: "2026-08-26T11:00:00+05:30",
      countdownEnabled: false,
      venueName: "Srinivasa Gardens, Thorrur",
      venueAddress: "Srinivasa Gardens, Thorrur",
      googleMapsUrl: "https://maps.google.com/?q=Srinivasa+Gardens+Thorrur",
      invitationMessage: "With the divine blessings of our elders and the almighty, we request the honor of your presence as two souls unite in the sacred bond of matrimony.",
      cardImage: "images/wedding_template_original.png",
      sacredOm: "ఓం",
      sacredBlessing: "॥ శ్రీ గణేశాయ నమః ॥"
    },
    reception: {
      title: "Wedding Reception",
      subTitle: "An Evening of Celebration & Dinner",
      dateFormatted: null,
      timeFormatted: null,
      targetDateISO: null,
      venueName: "Kiranam & Jaggery Merchants Function Hall",
      venueAddress: "Ramachandra Nagar Colony, Prakash Nagar, Khammam, Telangana 507003",
      googleMapsUrl: "https://maps.app.goo.gl/q4hfi4xnTwYtdS6PA?g_st=iw",
      invitationMessage: "Join us for an enchanting evening filled with laughter, music, fine cuisine, and togetherness as we celebrate the newlyweds.",
      cardImage: "images/image.png"
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
