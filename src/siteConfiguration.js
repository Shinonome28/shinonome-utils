const SiteConfiguration = {
  supportLanguages: ["zh", "en"],
  fallbackLanguage: "en",
  languageMapping: [
    [/^en.*/, "en"],
    [/^zh.*/, "zh"],
  ],
};

Object.freeze(SiteConfiguration);

export default SiteConfiguration;
