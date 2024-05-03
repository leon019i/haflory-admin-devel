<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{$t("product.category.addNewToyCategory")}}</h1>

      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row align="center">
            <v-col cols="12" sm="12" md="12">
              <!-- <p class="gray1--text mb-1">Category Image</p> -->

              <image-uploader
                :maxWidth="800"
                :max-height="400"
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
                          :username="'Logo'"
                          :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/'+promotionInput.avatar"
                        />
                      </div>
                    </a>
                    <p class="upload-caption grey--text my-0">
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
            <v-col cols="12" sm="6" md="6">
              <AddThisCategoryButton
                :action="addThisCategory"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('settings.addThisPromotion')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createPromotion } from "@/settings/methods/create_promotion.js";
import imageUploader from "vue-image-upload-resize";
import "@/core/methods/validation_rules";
import { b64toBlob } from "@/core/methods/base64_to_blob.js";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Avatar from "vue-avatar";

export default {
  data() {
    return {
      promotionInput: {
        order: 0,
        avatar: null,
      },
      hasLogo: false,
      btn_loading: false,
    };
  },
  components: {
    AddThisCategoryButton: () => import("@/products/components/AddButton.vue"),
    VueUploadMultipleImage,
    Avatar,
    imageUploader,
  },

  methods: {
    addThisCategory() {
      // console.log(this.promotionInput);
      this.btn_loading = true;

      createPromotion(this.promotionInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;
          this.$store.commit("SHOW_DRAWER");
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

.img-preview {
  width: 300px !important;
  width: auto;
}
</style>


