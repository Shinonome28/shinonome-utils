import { createContext, useState } from "react";
import SiteConfiguration from "../siteConfiguration";

export const CurrentLanguageContext = createContext();

export default function CurrentLanguageContextProvider(props) {
  let userLanguage = navigator.language;

  for (const entry of SiteConfiguration.languageMapping) {
    if (userLanguage.match(entry[0])) {
      userLanguage = entry[1];
      break;
    }
  }
  if (
    SiteConfiguration.supportLanguages.filter((lang) => lang === userLanguage)
      .length < 1
  ) {
    userLanguage = SiteConfiguration.fallbackLanguage;
  }

  const [currentLanguage, changeCurrentLanguage] = useState(userLanguage);

  return (
    <CurrentLanguageContext.Provider
      value={{
        currentLanguage,
        changeCurrentLanguage,
      }}
    >
      {props.children}
    </CurrentLanguageContext.Provider>
  );
}
