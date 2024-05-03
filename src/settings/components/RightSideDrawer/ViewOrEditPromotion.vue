<template>
  <div>
    <v-container class="px-12">
      <h1
        class="primary--text font-weight-bold pb-4"
      >{{isEditCategory ? $t("settings.editPromotion") : $t("settings.viewPromotion")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row align="center">
            <v-col cols="12" sm="12" md="12">
              <!-- <p class="gray1--text mb-1">{{ $t("settings.image") }}</p> -->

              <image-uploader
                :maxWidth="800"
                :max-height="400"
                :quality="0.5"
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasLogo }]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                outputFormat="blob"
                @input="setLogo"
                class="ms-2"
                id="logo"
              >
                <label for="logo" slot="upload-label">
                  <v-col align="start" class="pa-0 ma-0">
                    <a>
                      <!-- <div v-if="!hasLogo" class="upload-caption gray1--text">
                        <avatar
                          :size="100"
                          :username="'Logo'"
                          :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/'+promotionInput.avatar"
                        />
                      </div>-->
                      <div v-if="promotionInput.avatar">
                        <v-img
                          class="img-preview"
                          :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/'+promotionInput.avatar"
                        />
                      </div>
                    </a>
                    <p class="upload-caption grey--text my-0" v-if="isEditCategory">
                      {{
                      hasLogo ? $t('product.product.clicktochange') : $t('product.product.clicktoupload')
                      }}
                    </p>
                  </v-col>
                </label>
              </image-uploader>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  :readonly="!isEditCategory"
                  dense
                  :label="$t('product.category.order')"
                  v-model="promotionInput.order"
                  type="number"
                  :min="0"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col></v-col>

            <v-col cols="12" sm="6" md="6" v-if="isEditCategory">
              <EditThisPromotionButton
                :action="editThisPromotion"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('settings.updateThisPromotion')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { updatePromotion } from "@/settings/methods/update_promotion.js";

import "@/core/methods/validation_rules";
import imageUploader from "vue-image-upload-resize";

import Avatar from "vue-avatar";
export default {
  data() {
    return {
      promotionInput: {
        id: this.currentPromotion._id,
        order: this.currentPromotion.order,
        avatar: this.currentPromotion.avatar,
      },
      hasLogo: false,
      btn_loading: false,
    };
  },
  components: {
    EditThisPromotionButton: () =>
      import("@/settings/components/AddButton.vue"),
    Avatar,
    imageUploader,
  },
  props: {
    isEditCategory: {
      type: Boolean,
      default: false,
    },
    currentPromotion: {
      required: true,
    },
  },
  methods: {
    editThisPromotion() {
      this.btn_loading = true;

      this.$refs.observer.validate();
      updatePromotion(this.promotionInput).then((data) => {
        if (!!data.data) {
          this.$store.commit("SHOW_DRAWER");
          this.btn_loading = false;
        } else {
          this.btn_loading = false;
        }
      });
    },

    setLogo(output) {
      this.hasLogo = true;
      this.promotionInput.avatar = output;
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
  width: 400px !important;
  width: auto;
}
</style>


