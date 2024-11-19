// src/global.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      openTestWindow: () => void;
      setLanguage: (language: string) => void;
      onLanguageUpdate: (callback: (language: string) => void) => void;
    };
  }
}
