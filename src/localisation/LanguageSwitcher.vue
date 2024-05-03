<template>
  <div class="me-5">
    <v-select
      v-model="set_language"
      :items="languages"
      item-text="title"
      item-value="language"
      menu-props="auto"
      hide-details
      prepend-icon="mdi-web"
      single-line
      dense
      v-on:change="changeLocale"
    ></v-select>
  </div>
</template>

<script>
import languages from "./languages.json";
import i18n from "@/plugins/i18n";
import { setLanguage } from "@/user/methods/change_language";

export default {
  data() {
    return {
      languages: languages,
      set_language: i18n.locale,
    };
  },
  methods: {
    changeLocale(locale) {
      let currentLocale = setLanguage(locale);
      if (currentLocale == "ar") {
        this.$vuetify.rtl = true;
      } else {
        this.$vuetify.rtl = false;
      }
    },
  },
};
</script>

