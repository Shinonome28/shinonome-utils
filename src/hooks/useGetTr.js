import { useContext, useEffect, useState } from "react";
import { CurrentLanguageContext } from "../context/userLanguageSettingContext";
import SiteConfiguration from "../siteConfiguration";
import { load as parseYAML } from "js-yaml";
import cacheManager from "../libs/easyCache";

function getQuery(translationDB, prefixs, currentLanguage, fallbackLanguage) {
  if (!Array.isArray(prefixs)) {
    prefixs = [prefixs];
  }
  const entries = translationDB.filter(
    (entry) => prefixs.indexOf(entry.prefix) !== -1
  );
  if (entries.length < 1) {
    return () => "";
  }
  return (key) => {
    for (let entry of entries) {
      const matches = entry.translations.filter((item) => item.key === key);
      if (matches.length >= 1) {
        if (!matches[0][currentLanguage]) {
          return matches[0][fallbackLanguage] || "";
        }
        return matches[0][currentLanguage];
      }
    }
    return "";
  };
}

export default function useGetTr(prefix) {
  const fileName = "translationdb.yaml";
  const userLanguage = useContext(CurrentLanguageContext).currentLanguage;
  const [translationDB, setTranslationDB] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const data = await cacheManager.makeRequest(
        process.env.PUBLIC_URL + "/assets/i18n/" + fileName
      );
      const obj = parseYAML(data);
      setTranslationDB(obj);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fn();
  }, []);

  const tr = getQuery(
    translationDB,
    prefix,
    userLanguage,
    SiteConfiguration.fallbackLanguage
  );
  return tr;
}
