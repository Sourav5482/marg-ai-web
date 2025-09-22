import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  EN: {
    home: "Home",
    features: "Features",
    tracker: "Bus Tracker",
    booking: "Ticket",
    dashboard: "Dashboard",
    contact: "Contact",
    sos: "SOS",
    welcome: "Welcome",
    // ...add more keys as needed
  },
  HI: {
    home: "होम",
    features: "विशेषताएँ",
    tracker: "बस ट्रैकर",
    booking: "टिकट",
    dashboard: "डैशबोर्ड",
    contact: "संपर्क करें",
    sos: "सहायता",
    welcome: "स्वागत है",
    // ...add more keys as needed
  },
  BN: {
    home: "হোম",
    features: "বৈশিষ্ট্য",
    tracker: "বাস ট্র্যাকার",
    booking: "টিকিট",
    dashboard: "ড্যাশবোর্ড",
    contact: "যোগাযোগ",
    sos: "এসওএস",
    welcome: "স্বাগতম",
    // ...add more keys as needed
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "EN");

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}