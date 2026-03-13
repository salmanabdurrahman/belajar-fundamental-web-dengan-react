/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import translations from "../data/translations";

const LocaleContext = createContext(null);
const LOCALE_STORAGE_KEY = "notes-app-locale";

function getInitialLocale() {
  return localStorage.getItem(LOCALE_STORAGE_KEY) || "id";
}

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale);

  const toggleLocale = useCallback(() => {
    setLocale((currentLocale) => {
      const nextLocale = currentLocale === "id" ? "en" : "id";
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
      return nextLocale;
    });
  }, []);

  const t = useCallback(
    (key) => translations[locale][key] || translations.id[key] || key,
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      toggleLocale,
      t,
    }),
    [locale, toggleLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}

export { LocaleProvider, useLocale };
