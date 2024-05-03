import i18n from "@/plugins/i18n";
import router from "@/router";
import store from "@/store";

const setLanguage = (locale) => {
  i18n.locale = locale;
  if (locale == "ar") {
    setLanguageAsArabic(locale);
  } else {
    setLanguageAsEnglish(locale);
  }
  return locale;
};

//set english
function setLanguageAsEnglish(locale) {
  store.commit("UPDATE_RTL", false);
  router.push({
    params: { lang: locale },
  });
}

// set arabic
function setLanguageAsArabic(locale) {
  store.commit("UPDATE_RTL", true);
  router.push({
    params: { lang: locale },
  });
}

export { setLanguage };
