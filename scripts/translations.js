/* ========================================
   TRANSLATIONS - Arise Band_KE
   English + Swahili i18n support
   ======================================== */

const ARISE_TRANSLATIONS = {
  en: {
    heroTitle: "Welcome to Arise Band_KE",
    heroSubtitle: "Gospel. Groove. Glory.",
    exploreEvents: "Explore Events",
    aboutUs: "About Us",
    upcomingEvents: "Upcoming Events",
    watchListen: "Watch & Listen",
    supportUs: "Support Arise — Pledge Support",
    contactUs: "Reach Out to Arise Band_KE",
    fanWall: "Fan Wall",
    home: "Home",
    bandMembers: "Band Members",
    events: "Events",
    gallery: "Gallery",
    contact: "Contact",
    volunteer: "Volunteer",
    resources: "Resources",
    newsletterTitle: "Stay Connected with Arise",
    newsletterSubtitle: "Get event updates, worship resources & prayer requests.",
    newsletterPlaceholder: "Your email address",
    newsletterBtn: "Subscribe",
    donateVia: "Donate via M-Pesa",
    emailUs: "Email Us",
    missionBanner: "Lifting hearts through gospel music, worship, and community outreach across Kenya.",
    joinUs: "Join Our Ministry",
    giveOnline: "Give Online"
  },
  sw: {
    heroTitle: "Karibu Arise Band_KE",
    heroSubtitle: "Injili. Mdundo. Utukufu.",
    exploreEvents: "Angalia Matukio",
    aboutUs: "Kuhusu Sisi",
    upcomingEvents: "Matukio Yanayokuja",
    watchListen: "Tazama & Sikiliza",
    supportUs: "Tuunge Mkono — Ahadi ya Msaada",
    contactUs: "Wasiliana na Arise Band_KE",
    fanWall: "Ukuta wa Mashabiki",
    home: "Nyumbani",
    bandMembers: "Wanachama wa Bendi",
    events: "Matukio",
    gallery: "Picha",
    contact: "Wasiliana",
    volunteer: "Jitolee",
    resources: "Rasilimali",
    newsletterTitle: "Endelea Kuungana na Arise",
    newsletterSubtitle: "Pata masasisho ya matukio, rasilimali za ibada na maombi.",
    newsletterPlaceholder: "Anwani yako ya barua pepe",
    newsletterBtn: "Jiandikishe",
    donateVia: "Toa kupitia M-Pesa",
    emailUs: "Tutumie Barua Pepe",
    missionBanner: "Kuinua mioyo kupitia muziki wa injili, ibada, na huduma za jamii kote Kenya.",
    joinUs: "Jiunge na Huduma Yetu",
    giveOnline: "Toa Mtandaoni"
  }
};

(function initI18n() {
  function applyTranslations(lang) {
    const t = ARISE_TRANSLATIONS[lang] || ARISE_TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName === 'INPUT' && el.placeholder) {
          el.placeholder = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });
    document.documentElement.lang = lang;
    localStorage.setItem('ariseLang', lang);
    // Update switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  window.setLang = function(lang) {
    applyTranslations(lang);
  };

  // Apply saved or default language on load
  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('ariseLang') || 'en';
    applyTranslations(saved);
  });
})();
