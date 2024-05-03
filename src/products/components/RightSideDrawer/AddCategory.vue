<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{$t("product.category.addNewToyCategory")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row align="center">
            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('product.category.categoryNameEn')"
                  v-model="categoryInput.nameEn"
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
                  :label="$t('product.category.categoryNameAr')"
                  color="secondary"
                  v-model="categoryInput.nameAr"
                  @click="nameArError = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <p class="gray1--text mb-1">Category Image</p>

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
                          :username="'Logo'"
                          :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/'+categoryInput.avatar"
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
                  v-model="categoryInput.order"
                  type="number"
                  :min="0"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch v-model="categoryInput.active" color="secondary">
                <template #prepend>
                  <v-label>{{$t('product.category.isActive')}}</v-label>
                </template>
              </v-switch>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-row v-for="(item,index) in categoryInput.subCategory" :key="index">
                <v-col cols="12" sm="12" md="1" align="right">
                  <p>{{index + 1}}</p>
                </v-col>
                <v-col cols="12" md="2" class="mt-n5">
                  <div class="text-center">
                    <v-icon @click="currentIndex(index);" v-if="item.avatar == null">mdi-image</v-icon>

                    <img v-if="item.avatar != null" class="image-custom-preview" :src="item.url" />
                  </div>

                  <image-uploader
                    :maxWidth="300"
                    :quality="0.7"
                    :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                    capture="environment"
                    doNotResize="gif"
                    :autoRotate="true"
                    :preview="false"
                    outputFormat="blob"
                    @input="setImage"
                    class="ms-2"
                  >
                    <label for="fileInput" slot="upload-label">
                      <v-col align="start" class="pa-0 ma-0">
                        <h5 class="primary--text my-0" @click="currentIndex(index);">
                          {{
                          item.avatar != null ? $t('product.product.clicktochange') : $t('product.product.clicktoupload')
                          }}
                          <span>
                            <v-icon
                              v-if="  item.avatar != null "
                              color="primary"
                              small
                              class="ms-3"
                            >mdi-pencil</v-icon>
                            <v-icon v-else color="primary" small class="ms-3">mdi-upload</v-icon>
                          </span>
                        </h5>
                      </v-col>
                    </label>
                  </image-uploader>
                </v-col>
                <v-col cols="12" sm="12" md="4" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :label="$t('product.category.categoryNameEn')"
                      v-model="item.nameEn"
                      color="secondary"
                      :error-messages="nameEnError ? nameEnError : errors"
                      @click="nameEnError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4" class="py-0">
                  <ValidationProvider v-slot="{ errors }">
                    <v-text-field
                      outlined
                      dense
                      :error-messages="nameArError ? nameArError : errors"
                      :label="$t('product.category.categoryNameAr')"
                      color="secondary"
                      v-model="item.nameAr"
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
                {{$t('product.category.addSubCategory')}}
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <AddThisCategoryButton
                :action="addThisCategory"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('product.category.addThisCategory')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createCategory } from "@/products/methods/create_category.js";
import { addSubCategoryToArray } from "@/products/methods/create_sub_category.js";
import imageUploader from "vue-image-upload-resize";

import "@/core/methods/validation_rules";
import { b64toBlob } from "@/core/methods/base64_to_blob.js";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import Avatar from "vue-avatar";

export default {
  data() {
    return {
      categoryInput: {
        nameEn: "",
        nameAr: "",
        order: 0,
        active: false,
        avatar: null,
        subCategory: [],
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
      // console.log(this.categoryInput);
      this.btn_loading = true;

      createCategory(this.categoryInput).then((data) => {
        if (!!data.data) {
          this.btn_loading = false;

          this.$store.commit("SHOW_DRAWER");
        } else {
          if (data.includes("nameEn_1 dup key")) {
            this.nameEnError = "This Name alredy exist";
          } else if (data.includes("nameAr_1 dup key")) {
            this.nameArError = "This Name alredy exist";
          }
          this.btn_loading = false;
        }
      });
    },
    addSubCategory() {
      let subCat = addSubCategoryToArray();

      this.categoryInput.subCategory.push(subCat);

      // console.log(this.categoryInput.subCategory);
    },
    deleteSubCategory(index) {
      this.categoryInput.subCategory.splice(index, 1);
    },

    currentIndex(index) {
      this.selectedIndex = index;
    },

    setImage(output) {
      // console.log(output);
      this.hasImage = true;

      var reader = new FileReader();
      reader.readAsDataURL(output);
      var self = this;

      reader.onloadend = function () {
        var base64data = reader.result;

        self.categoryInput.subCategory[self.selectedIndex].url = base64data;
      };

      this.categoryInput.subCategory[this.selectedIndex].avatar = output;
    },
    setLogo(output) {
      this.hasLogo = true;
      this.categoryInput.avatar = output;
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

<style  scoped>
.image-custom-preview {
  height: 50px !important;
  width: 50px !important;
  border-radius: 100px;
}
</style>
