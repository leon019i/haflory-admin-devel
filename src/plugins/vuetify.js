import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: false,
    theme: {
        themes: {
            light: {
                primary: "#E74A3B",
                secondary: "#2B2B2B",
                accent: "#FFD15C",
                light: "#E3E0D8",
                red: "#EB5757",
                grey3: "#828282",
                grey5: "#E0E0E0",
                grey6: "#F2F2F2"

            }
        }
    }
});
