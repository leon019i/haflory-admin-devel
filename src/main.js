import Vue from "vue";
import App from "./core/pages/App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import { createProvider } from "./plugins/vue-apollo";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import "./plugins/registerServiceWorker";
import VueLazyload from "vue-lazyload";
import firebase from "firebase";
import Notifications from "./plugins/notification";
import VueNativeNotification from "./plugins/vue-native-notification";

Vue.use(VueLazyload);

Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
new Vue({
  router,
  store,
  vuetify,
  Notifications,
  VueNativeNotification,
  i18n,
  firebase,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
