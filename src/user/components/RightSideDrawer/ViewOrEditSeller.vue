<template>
  <div>
    <v-container class="px-12">
      <h1
        class="primary--text font-weight-bold pb-4"
      >{{isEditSeller ? $t("user.seller.editDriver") : $t("user.seller.viewDriver")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditSeller"
                  outlined
                  dense
                  :label="$t('user.seller.name')"
                  v-model="sellerInput.nameEn"
                  color="secondary"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditSeller"
                  outlined
                  dense
                  :label="$t('user.seller.contactPersonPhone')"
                  color="secondary"
                  :error-messages="errors"
                  type="number"
                  :min="0"
                  v-model="sellerInput.phone"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch :readonly="!isEditSeller" v-model="sellerInput.active" color="secondary">
                <template #prepend>
                  <v-label>Is Active</v-label>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <p class="gray1--text mb-1">{{$t('user.seller.photo')}}</p>

              <image-uploader
                :maxWidth="200"
                :max-height="200"
                :quality="0.9"
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasLogo }]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="blob"
                @input="setLogo"
                class="ms-2"
                id="logo"
              >
                <label for="logo" slot="upload-label">
                  <v-col align="start" class="pa-0 ma-0">
                    <a>
                      <div v-if="!hasLogo" class="upload-caption gray1--text">
                        <avatar
                          :size="100"
                          :username="sellerInput.nameEn"
                          :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +sellerInput.avatar"
                        />
                      </div>
                    </a>
                    <p class="upload-caption grey--text my-0" v-if="isEditSeller">
                      {{
                      hasLogo ? $t('product.product.clicktochange') : $t('product.product.clicktoupload')
                      }}
                    </p>
                  </v-col>
                </label>
              </image-uploader>
            </v-col>
            <v-col cols="12" sm="6" md="6" v-if="isEditSeller">
              <EditThisSellerButton
                :action="editThisSeller"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('user.seller.updateThisDriver')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { updateDriver } from "@/user/methods/update_seller.js";
import "@/core/methods/validation_rules";
import imageUploader from "vue-image-upload-resize";
import Avatar from "vue-avatar";
export default {
  data() {
    return {
      sellerInput: {
        id: this.currentSeller._id,
        nameEn: this.currentSeller.nameEn,
        avatar: this.currentSeller.avatar,
        phone: this.currentSeller.phone,
        active: this.currentSeller.active,
      },
      errorFromApi: "",
      btn_loading: false,
      hasLogo: false,
    };
  },
  components: {
    EditThisSellerButton: () => import("@/user/components/AddButton.vue"),
    imageUploader,
    Avatar,
  },
  props: {
    isEditSeller: {
      type: Boolean,
      default: false,
    },
    currentSeller: {
      required: true,
    },
    sellersVariables: {
      required: true,
    },
  },
  methods: {
    editThisSeller() {
      this.btn_loading = true;
      this.$refs.observer.validate();
      updateDriver(this.sellerInput, this.sellersVariables).then((data) => {
        if (!!data.data) {
          this.$store.commit("SHOW_DRAWER");
          this.btn_loading = false;
        } else {
          if (data.includes("Already exist")) {
            this.errorFromApi = this.$t("inputRules.emailAlreadyExist");
          }
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