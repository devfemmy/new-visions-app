import React, { useState, useMemo, useEffect } from 'react';
import { getUserLang } from '../../utils/getUserLang';

export const LanguageContext = React.createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  const setLanguage = async () => {
    const language = await getUserLang();
    setLang(language);
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  useEffect(() => {
    setLanguage();
  }, []);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
