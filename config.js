/**
 * ====================================================================
 * WEDDING & RECEPTION INVITATION CONFIGURATION
 * ====================================================================
 * Edit this file to customize all details: names, dates, venues,
 * addresses, Google Maps links, and WhatsApp RSVP phone numbers.
 * Missing or unconfirmed fields will gracefully display "To be announced".
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      fullName: "Venkatesh Reddy",
      shortName: "Venkatesh",
      fatherName: "Sri Father's Name",
      motherName: "Smt. Mother's Name",
      title: "Groom"
    },
    bride: {
      fullName: "Ananya Reddy",
      shortName: "Ananya",
      fatherName: "Sri Bride's Father",
      motherName: "Smt. Bride's Mother",
      title: "Bride"
    },
    hashtag: "#VenkyWedsAnu"
  },

  // Main Event Dates
  // Format: "YYYY-MM-DDTHH:mm:ss" or null if to be announced
  events: {
    wedding: {
      title: "Wedding Ceremony",
      subTitle: "The Sacred Muhurtham",
      dateFormatted: "Thursday, December 4, 2026",
      timeFormatted: "Muhurtham: 09:30 AM onwards",
      targetDateISO: "2026-12-04T09:30:00+05:30",
      venueName: "Sri Raja Rajeshwari Kalyana Mandapam",
      venueAddress: "Plot No. 12, Temple Road, Jubilee Hills, Hyderabad, Telangana 500033",
      googleMapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
      invitationMessage: "With the divine blessings of our elders and the almighty, we request the honor of your presence as two souls unite in the sacred bond of matrimony.",
      cardImage: "images/marriage_card.jpg"
    },
    reception: {
      title: "Wedding Reception",
      subTitle: "An Evening of Celebration & Dinner",
      dateFormatted: "Friday, December 5, 2026",
      timeFormatted: "07:00 PM onwards",
      targetDateISO: "2026-12-05T19:00:00+05:30",
      venueName: "The Meridian Banquet",
      venueAddress: "Financial District, Gachibowli, Hyderabad, Telangana 500032",
      googleMapsUrl: "https://maps.google.com/?q=Gachibowli+Hyderabad",
      invitationMessage: "Join us for an enchanting evening filled with laughter, music, fine cuisine, and togetherness as we celebrate the newlyweds.",
      cardImage: "images/reception_card_clean.jpg"
    }
  },

  // Dear Guest / Personal Message
  dearGuest: {
    heading: "Dear Guest",
    message: "Your presence, blessings and love will make our celebration truly complete. Having you with us on this momentous occasion means the world to our family.",
    closing: "With love and best compliments from both the families."
  },

  // RSVP Configuration
  rsvp: {
    // WhatsApp number with country code (e.g., '919876543210' for India). Set to empty string if not using WhatsApp.
    whatsappNumber: "919876543210",
    contactPersons: [
      { name: "Kandibanda Family", phone: "+91 98765 43210" }
    ],
    deadlineText: "Kindly RSVP by November 25, 2026"
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

