<template>
  <sign-in-frame>
    <v-row>
      <v-spacer></v-spacer>
      <languageSwitch class="mb-12" style="max-width: 150px"></languageSwitch>
    </v-row>
    <h1 class="ms-2 pb-3 secondary--text">
      {{ $t("user.signIn.signInName") }}
    </h1>

    <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
      <form class="px-6">
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-text-field
            outlined
            dense
            color="secondary"
            class="mb-n1 caption primary--text"
            v-model="phone"
            :label="$t('user.phone')"
            @click="errorFromApi = ''"
            :error-messages="errors"
            prepend-inner-icon="mdi-phone"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider rules="required">
          <v-text-field
            outlined
            dense
            color="secondary"
            class="mb-n1 caption primary--text"
            v-model="password"
            :label="$t('user.signIn.password')"
            @click="errorFromApi = ''"
            prepend-inner-icon="mdi-lock"
            :append-icon="password_value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (password_value = !password_value)"
            :type="password_value ? 'password' : 'text'"
            :password_value="password"
          ></v-text-field>
        </ValidationProvider>
        <v-btn
          class="primary text-none float-right"
          depressed
          :loading="btn_loading"
          @click="signin()"
          :disabled="invalid"
          >{{ $t("user.signIn.signInName") }}</v-btn
        >
      </form>
    </ValidationObserver>
    <p v-if="errorFromApi" class="red--text font-weight-bold text-center">
      {{ errorFromApi }}
    </p>

    <v-spacer class="my-12 py-12 hidden-sm-and-up"></v-spacer>
  </sign-in-frame>
</template>

<script>
import { userSignIn } from "../methods/signin.js";
import { onSignin } from "@/plugins/vue-apollo.js";
import "@/core/methods/validation_rules";
export default {
  components: {
    SignInFrame: () => import("@/user/layouts/SignInLayout"),
    languageSwitch: () => import("@/localisation/LanguageSwitcher"),
  },
  data() {
    return {
      btn_loading: false,
      btn_loading: false,
      phone: "",
      password: "",
      password_value: String,
      errorFromApi: null,
    };
  },
  methods: {
    signin() {
      this.btn_loading = true;
      userSignIn(this.phone, this.password).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;
          this.$router.replace({ path: "/" });
        } else {
          if (data.includes("Not Found")) {
            this.errorFromApi = this.$t("user.signIn.invalidLogin");
            this.btn_loading = false;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
>>> .v-icon {
  color: #e74a3b;
}
</style>
