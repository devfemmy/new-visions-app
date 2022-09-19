import { useContext } from 'react';
import { LanguageContext } from '../context/lang';

export const uselang = () => {
  const { lang, setLang } = useContext(LanguageContext);

  return {
    lang,
    setLang,
  };
};
