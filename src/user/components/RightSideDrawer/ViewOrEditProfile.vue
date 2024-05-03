<template>
  <div>
    <v-container class="px-12" v-if="!showUpdatePassForm">
      <h1 class="primary--text font-weight-bold pb-4">
        {{ $t("user.editProfile") }}
      </h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('user.nameEn')"
                  v-model="userInput.nameEn"
                  color="secondary"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('user.nameAr')"
                  v-model="userInput.nameAr"
                  color="secondary"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <v-text-field
                  outlined
                  dense
                  :error-messages="errorFromApi ? errorFromApi : errors"
                  :label="$t('user.email')"
                  color="secondary"
                  v-model="userInput.email"
                  @click="errorFromApi = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="mt-4">
              <p class="gray1--text mb-1">{{ $t("user.photo") }}</p>

              <image-uploader
                :maxWidth="300"
                :quality="0.7"
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="blob"
                @input="setImage"
                :multiple="true"
              >
                <label for="fileInput" slot="upload-label">
                  <v-col align="start" class="pa-0 ma-0">
                    <a>
                      <div v-if="!hasImage" class="upload-caption gray1--text">
                        <avatar
                          :size="100"
                          :username="userInput.nameEn"
                          :src="
                            'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +
                            userInput.avatar
                          "
                        />
                      </div>
                    </a>
                    <p class="upload-caption grey--text my-0">
                      {{
                        hasImage
                          ? $t("product.product.clicktochange")
                          : $t("product.product.clicktoupload")
                      }}
                    </p>
                  </v-col>
                </label>
              </image-uploader>
            </v-col>
            <!-- <v-col v-if="!hasImage" cols="12" sm="12" md="12" class="py-0 pb-12">
              <avatar
                :size="100"
                :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +userInput.avatar"
                :username="userInput.nameEn"
              />
            </v-col> -->
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('user.phone')"
                  color="secondary"
                  :error-messages="errors"
                  type="number"
                  :min="0"
                  v-model="userInput.phone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <!-- <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch v-model="userInput.active" color="secondary">
                <template #prepend>
                  <v-label>{{ $t('user.isActive')}}</v-label>
                </template>
              </v-switch>
            </v-col>-->
            <v-col cols="12" sm="12" md="12" class="mt-4">
              <p class="gray1--text mb-1">{{ $t("user.lang") }}</p>
              <v-col cols="12" sm="6" class="py-2">
                <v-btn-toggle
                  v-model="language"
                  tile
                  dense
                  group
                  color="primary"
                >
                  <v-btn
                    @click="changeLocale('en')"
                    class="text-none"
                    value="en"
                    >English</v-btn
                  >
                  <v-btn value="ar" @click="changeLocale('ar')">عربى</v-btn>
                </v-btn-toggle>
              </v-col>
            </v-col>
            <v-col cols="4" sm="4" md="3">
              <v-row>
                <EditThisSellerButton
                  :action="editThisSeller"
                  :disabled="!invalid"
                  :isLoading="btn_loading"
                  :isIcon="false"
                  :text="$t('user.editThisUser')"
                />
              </v-row>
            </v-col>

            <v-col cols="4" sm="4" md="4">
              <v-container>
                <div>
                  <v-btn
                    class="text-none red--text mt-1 font-weight-bold"
                    depressed
                    text
                    @click="showUpdatePassForm = true"
                    >{{ $t("user.update_password_1") }}</v-btn
                  >
                </div>
              </v-container>
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
    <div v-if="showUpdatePassForm">
      <UpdatePasswordForm @action="showOrHideForm" />
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/user/methods/update_user.js";
import { updatePassword } from "@/user/methods/update_password.js";
import { getCurrentUser } from "@/user/utlis/helper.js";
import "@/core/methods/validation_rules";
import Avatar from "vue-avatar";
import ImageUploader from "vue-image-upload-resize";
import i18n from "@/plugins/i18n";
import { setLanguage } from "@/user/methods/change_language";
export default {
  data() {
    return {
      userInput: {
        id: getCurrentUser.user._id,
        nameEn: getCurrentUser.user.nameEn,
        nameAr: getCurrentUser.user.nameAr,
        email: getCurrentUser.user.email,
        phone: getCurrentUser.user.phone,
        avatar: getCurrentUser.user.avatar,
        // active: getCurrentUser.user.active,
      },
      btn_loading: false,
      errorFromApi: "",
      hasImage: false,
      language: i18n.locale,
      showUpdatePassForm: false,
    };
  },
  components: {
    EditThisSellerButton: () => import("@/user/components/AddButton.vue"),
    UpdatePasswordForm: () =>
      import("@/user/components/RightSideDrawer/UpdatePassword.vue"),
    ImageUploader,
    Avatar,
  },

  methods: {
    editThisSeller() {
      this.btn_loading = true;
      // this.$refs.observer.validate();
      this.$refs.observer.validate();
      updateUser(this.userInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;

          localStorage.setItem(
            "HAFLORY_USER",
            JSON.stringify(data.data.updateUser)
          );
          var self = this;
          setInterval(function () {
            location.reload();
          }, 1000);

          this.$store.commit("SHOW_DRAWER");
        } else {
          if (data.includes("Already exist")) {
            this.errorFromApi = "Email alredy exist";
          }
        }
      });
    },
    showOrHideForm(val) {
      // console.log(val);
      this.showUpdatePassForm = false;
    },
    setImage(output) {
      this.hasImage = true;
      this.userInput.avatar = output;
    },
    changeLocale(locale) {
      // console.log(locale);
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
<style scoped>
>>> .img-preview {
  max-height: 200px;
  max-width: 200px;
}
</style>
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

/* .img-preview {
  width: 100px !important;
  width: auto;
} */
</style>