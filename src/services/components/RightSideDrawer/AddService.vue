<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">
        {{ $t("services.addNewServices") }}
      </h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row align="center">
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('services.serviceNameEnglish')"
                  v-model="serviceInput.nameEn"
                  color="secondary"
                  :error-messages="nameEnError ? nameEnError : errors"
                  @click="nameEnError = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  dense
                  :error-messages="nameArError ? nameArError : errors"
                  :label="$t('services.serviceNameArabic')"
                  color="secondary"
                  v-model="serviceInput.nameAr"
                  @click="nameArError = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <v-textarea
                v-model="serviceInput.descriptionEn"
                outlined
                rows="1"
                color="secondary"
                :label="$t('user.seller.description')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <v-textarea
                v-model="serviceInput.descriptionAr"
                outlined
                rows="1"
                color="secondary"
                :label="$t('user.seller.descriptionAr')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('services.priceUnitOrKd')"
                  color="secondary"
                  type="number"
                  :min="0"
                  v-model="serviceInput.price"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('services.commisionKd')"
                  color="secondary"
                  type="number"
                  :min="0"
                  v-model="serviceInput.commission"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <p class="primary--text mb-1">{{ $t("services.photo") }}</p>

              <image-uploader
                :maxWidth="100"
                :max-height="70"
                :quality="0.8"
                :preview="true"
                :className="['fileinput', { 'fileinput--loaded': hasLogo }]"
                :capture="false"
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
                    <div class="upload-caption gray1--text">
                      <v-avatar v-if="!hasLogo" color="grey3" size="80">
                        <v-icon size="42" color="light">mdi-camera</v-icon>
                      </v-avatar>
                    </div>

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
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('services.displayOrder')"
                  v-model="serviceInput.order"
                  type="number"
                  :min="0"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch v-model="serviceInput.active" color="secondary">
                <template #prepend>
                  <v-label>{{ $t("services.isActive") }}</v-label>
                </template>
              </v-switch>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <p class="primary--text mb-1">{{ $t("services.Subservices") }}</p>

              <v-row
                v-for="(item, index) in serviceInput.subservices"
                :key="index"
              >
                <v-col cols="12" sm="12" md="1" align="right">
                  <p>{{ index + 1 }}</p>
                </v-col>

                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :label="$t('services.nameEn')"
                      v-model="item.nameEn"
                      color="secondary"
                      :error-messages="nameEnError ? nameEnError : errors"
                      @click="nameEnError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="6" class="py-0">
                  <ValidationProvider v-slot="{ errors }">
                    <v-text-field
                      outlined
                      dense
                      :error-messages="nameArError ? nameArError : errors"
                      :label="$t('services.nameAr')"
                      color="secondary"
                      v-model="item.nameAr"
                      @click="nameArError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="2" class="mt-n5">
                  <div class="text-center">
                    <!-- <v-icon @click="currentIndex(index);" v-if="item.avatar == null">mdi-camera</v-icon> -->
                    <v-avatar
                      v-if="item.avatar == null"
                      color="grey3"
                      size="55"
                    >
                      <v-icon size="28" color="light">mdi-camera</v-icon>
                    </v-avatar>
                    <img
                      v-if="item.avatar != null"
                      class="image-custom-preview"
                      :src="item.url"
                    />
                  </div>

                  <image-uploader
                    :maxWidth="300"
                    :quality="0.7"
                    :className="[
                      'fileinput',
                      { 'fileinput--loaded': hasImage },
                    ]"
                    :capture="false"
                    doNotResize="gif"
                    :autoRotate="true"
                    :preview="false"
                    outputFormat="blob"
                    @input="setImage"
                    class="ms-2"
                  >
                    <label for="fileInput" slot="upload-label">
                      <v-col align="start" class="pa-0 ma-0">
                        <h6
                          class="primary--text my-0"
                          @click="currentIndex(index)"
                        >
                          {{
                            item.avatar != null
                              ? $t("product.product.clicktochange")
                              : $t("product.product.clicktoupload")
                          }}
                        </h6>
                      </v-col>
                    </label>
                  </image-uploader>
                </v-col>
                <v-col cols="12" sm="12" md="4" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :error-messages="nameArError ? nameArError : errors"
                      :label="$t('services.priceUnitOrKd')"
                      color="secondary"
                      type="number"
                      :min="0"
                      v-model="item.price"
                      @click="nameArError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      type="number"
                      :min="0"
                      dense
                      :error-messages="nameArError ? nameArError : errors"
                      :label="$t('services.commisionKd')"
                      color="secondary"
                      v-model="item.commission"
                      @click="nameArError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="1" align="right">
                  <v-btn
                    depressed
                    text
                    color="primary "
                    class="font-weight-bold"
                    x-small
                    @click="deleteSubCategory(index)"
                  >
                    <v-icon left>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="mt-n6" cols="12" sm="12" md="12" align="right">
              <v-btn
                depressed
                text
                color="primary "
                class="font-weight-bold text-none"
                x-small
                @click="addSubCategory"
              >
                <v-icon left small>mdi-plus</v-icon>
                {{ $t("services.addSubServices") }}
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <AddThisCategoryButton
                :action="addThisCategory"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('services.addThisServices')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createService } from "@/services/methods/create_service.js";
import { addSubServiceToArray } from "@/services/methods/create_sub_service.js";
import imageUploader from "vue-image-upload-resize";

import "@/core/methods/validation_rules";
import { b64toBlob } from "@/core/methods/base64_to_blob.js";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Avatar from "vue-avatar";

export default {
  data() {
    return {
      serviceInput: {
        nameEn: "",
        nameAr: "",
        descriptionEn: "",
        descriptionAr: "",

        order: 0,
        active: false,
        price: 0,
        commission: 0,
        avatar: null,
        subservices: [],
      },
      nameEnError: "",
      nameArError: "",
      images: [],
      hasImage: false,
      hasLogo: false,
      btn_loading: false,

      selectedIndex: 0,
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
      // console.log(this.serviceInput);
      this.btn_loading = true;

      createService(this.serviceInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;
          this.$store.commit("SHOW_DRAWER");
        } else {
          if (data.includes("nameEn_1 dup key")) {
            this.nameEnError = this.$t("inputRules.nameAlreadyExist");
          } else if (data.includes("nameAr_1 dup key")) {
            this.nameArError = this.$t("inputRules.nameAlreadyExist");
          }
          this.btn_loading = false;
        }
      });
    },
    addSubCategory() {
      let subCat = addSubServiceToArray();
      this.serviceInput.subservices.push(subCat);
    },
    deleteSubCategory(index) {
      this.serviceInput.subservices.splice(index, 1);
    },

    currentIndex(index) {
      this.selectedIndex = index;
    },

    setImage(output) {
      this.hasImage = true;
      var reader = new FileReader();
      reader.readAsDataURL(output);
      var self = this;

      reader.onloadend = function () {
        var base64data = reader.result;

        self.serviceInput.subservices[self.selectedIndex].url = base64data;
      };

      this.serviceInput.subservices[this.selectedIndex].avatar = output;
    },
    setLogo(output) {
      this.hasLogo = true;
      this.serviceInput.avatar = output;
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
  height: 75px !important;
  width: 75px !important;
  border-radius: 100px;
}
</style>

<style  scoped>
.image-custom-preview {
  height: 50px !important;
  width: 50px !important;
  border-radius: 100px;
}
</style>
