<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">
        {{ $t("user.seller.newDriver") }}
      </h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('user.seller.driverName')"
                  v-model="sellerInput.nameEn"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :error-messages="errorFromApi ? errorFromApi : errors"
                  :label="$t('user.seller.driverPhoneNumber')"
                  color="secondary"
                  type="number"
                  :min="0"
                  v-model="sellerInput.phone"
                  @click="errorFromApi = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                vid="sellerInput.password"
              >
                <v-text-field
                  outlined
                  dense
                  :label="$t('user.seller.driverLoginPassword')"
                  color="secondary"
                  v-model="sellerInput.password"
                  :error-messages="errors"
                  :type="show_password ? 'password' : 'text'"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (show_password = !show_password)"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|confirmed:sellerInput.password"
              >
                <v-text-field
                  outlined
                  dense
                  :label="$t('user.seller.confirmPassword')"
                  color="secondary"
                  :error-messages="errors"
                  :type="show_confirm_password ? 'password' : 'text'"
                  :append-icon="
                    show_confirm_password ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  @click:append="
                    () => (show_confirm_password = !show_confirm_password)
                  "
                  v-model="confirm_password"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch v-model="sellerInput.active" color="secondary">
                <template #prepend>
                  <v-label>Is Active</v-label>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <p class="gray1--text mb-1">{{ $t("user.seller.photo") }}</p>

              <image-uploader
                :maxWidth="200"
                :max-height="200"
                :quality="0.9"
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasLogo }]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="false"
                outputFormat="blob"
                @input="setLogo"
                class="ms-2"
                id="logo"
              >
                <label for="logo" slot="upload-label">
                  <v-col align="start" class="pa-0 ma-0">
                    <a>
                      <div v-if="!hasLogo" class="upload-caption gray1--text">
                        <avatar :size="100" :username="'I M G'" />
                      </div>
                    </a>
                    <p class="upload-caption grey--text my-0">
                      {{
                        hasLogo
                          ? $t("product.product.clicktochange")
                          : $t("product.product.clicktoupload")
                      }}
                    </p>
                  </v-col>
                </label>
              </image-uploader>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <AddThisSellerButton
                :action="addThisSeller"
                :isLoading="btn_loading"
                :disabled="!invalid"
                :isIcon="false"
                :text="$t('user.seller.addThisDriver')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createDriver } from "@/user/methods/create_seller.js";
import "@/core/methods/validation_rules";
import imageUploader from "vue-image-upload-resize";
import Avatar from "vue-avatar";

export default {
  data: () => ({
    sellerInput: {
      nameEn: null,
      nameAr: null,
      email: "",
      password: "",
      phone: "",
      active: false,
      avatar: null,
    },
    confirm_password: "",
    hasLogo: false,
    show_password: "password",
    show_confirm_password: "password",
    errorFromApi: "",
    btn_loading: false,
  }),
  components: {
    AddThisSellerButton: () => import("@/user/components/AddButton.vue"),
    imageUploader,
    Avatar,
  },

  methods: {
    addThisSeller() {
      this.btn_loading = true;
      createDriver(this.sellerInput).then((data) => {
        if (!!data.data) {
          this.$store.commit("SHOW_DRAWER");
          this.btn_loading = false;
        } else {
          // console.log(data);
          if (data.includes("Already exist")) {
            this.errorFromApi = this.$t("inputRules.numberAlreadyExist");
          }
          this.btn_loading = false;
        }
      });
    },
    setLogo(output) {
      this.hasLogo = true;
      this.sellerInput.avatar = output;
    },
  },
};
</script>
<style>
#fileInput {
  display: none;
}

#logo {
  display: none;
}

#cover {
  display: none;
}

.img-preview {
  width: 100px !important;
  width: auto;
}
</style>