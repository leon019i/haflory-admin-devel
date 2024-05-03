<template>
  <v-container class="px-12">
    <h1 class="primary--text font-weight-bold pb-4">
      {{ $t("user.editProfile") }}
    </h1>
    <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
      <form>
        <v-row>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <v-text-field
                outlined
                dense
                :label="$t('user.signIn.currentPassword')"
                color="secondary"
                v-model="currentPassword"
                :error-messages="errorFromApi != null ? errorFromApi : errors"
                :type="show_current_password ? 'password' : 'text'"
                :append-icon="show_current_password ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="
                  () => (show_current_password = !show_current_password)
                "
                @click="errorFromApi = ''"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="password"
            >
              <v-text-field
                outlined
                dense
                :label="$t('user.signIn.password')"
                color="secondary"
                v-model="password"
                :error-messages="errors"
                :type="show_password ? 'password' : 'text'"
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (show_password = !show_password)"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="12" class="py-0">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|confirmed:password"
            >
              <v-text-field
                outlined
                dense
                :label="$t('user.seller.confirmPassword')"
                color="secondary"
                :error-messages="errors"
                :type="show_confirm_password ? 'password' : 'text'"
                :append-icon="show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="
                  () => (show_confirm_password = !show_confirm_password)
                "
                v-model="confirm_password"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <EditThisSellerButton
              :action="updateUserPassword"
              :disabled="!invalid"
              :isLoading="btn_loading"
              :alignButton="'center'"
              :isIcon="false"
              :text="$t('user.update_password')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-container>
              <div align="left">
                <v-btn
                  text
                  class="text-none red--text"
                  depressed
                  @click="cancelBtn"
                  >{{ $t("user.cancel") }}</v-btn
                >
              </div>
            </v-container>
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { updatePassword } from "@/user/methods/update_password.js";

import "@/core/methods/validation_rules";

export default {
  data() {
    return {
      btn_loading: false,
      errorFromApi: "",
      password: "",
      confirm_password: "",
      currentPassword: "",
      show_password: "password",
      show_current_password: "password",
      show_confirm_password: "password",
      showUpdatePassForm: false,
    };
  },
  components: {
    EditThisSellerButton: () => import("@/user/components/AddButton.vue"),
  },

  methods: {
    updateUserPassword() {
      this.btn_loading = true;
      this.$refs.observer.validate();

      updatePassword(this.currentPassword, this.password).then((data) => {
        // console.log("error", data);

        if (!!data.data) {
          // console.log("error", data);
          this.btn_loading = false;
          this.$emit("action", true);
        } else {
          this.btn_loading = false;
          // console.log("error", data);
          if (data.includes("Wrong password")) {
            this.errorFromApi = this.$t("user.wrong_password");
          } else {
            this.$emit("action", true);
          }
        }
      });
    },
    cancelBtn() {
      this.$emit("action", true);
    },
  },
};
</script>
