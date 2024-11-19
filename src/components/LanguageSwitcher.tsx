import React from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    electronAPI?: {
      setLanguage: (language: string) => void;
    };
  }
}

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Handle language change
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    if (window.electronAPI?.setLanguage) {
      window.electronAPI.setLanguage(selectedLanguage);
    }
  };

  return (
    <div style={{ }}>
      <select value={i18n.language} onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
