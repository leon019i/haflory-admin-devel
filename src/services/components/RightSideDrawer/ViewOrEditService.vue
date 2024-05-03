<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">
        {{
          isEditService
            ? $t("services.editService")
            : $t("services.viewService")
        }}
      </h1>

      <ValidationObserver ref="observer" v-slot="{ validate, reset, invalid }">
        <form>
          <v-row align="center">
            <v-col cols="12" sm="12" md="12" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditService"
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
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  :readonly="!isEditService"
                  dense
                  :error-messages="nameArError ? nameArError : errors"
                  :label="$t('services.serviceNameArabic')"
                  color="secondary"
                  v-model="serviceInput.nameAr"
                  @click="nameArError = ''"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-1">
              <v-textarea
                v-model="serviceInput.descriptionEn"
                outlined
                rows="1"
                color="secondary"
                :label="$t('user.seller.description')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-1">
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
                  :readonly="!isEditService"
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
                  :readonly="!isEditService"
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

            <v-col cols="12" sm="12" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  :readonly="!isEditService"
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
              <v-switch
                v-model="serviceInput.active"
                color="secondary"
                :readonly="!isEditService"
              >
                <template #prepend>
                  <v-label>{{ $t("services.isActive") }}</v-label>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <!-- <p class="gray1--text mb-1">Category Image</p> -->
              <image-uploader
                :maxWidth="200"
                :max-height="200"
                :quality="0.5"
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
                    <a>
                      <div v-if="!hasLogo" class="upload-caption gray1--text">
                        <avatar
                          :size="100"
                          :username="'Logo'"
                          :src="
                            'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +
                            serviceInput.avatar
                          "
                        />
                      </div>
                    </a>
                    <p
                      class="upload-caption grey--text my-0"
                      v-if="isEditService"
                    >
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

            <v-col cols="12" sm="12" md="12">
              <p class="primary--text mb-1">{{ $t("services.Subservices") }}</p>
              <v-row
                v-for="(item, index) in serviceInput.subServices"
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
                      :readonly="!isEditService"
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
                      :readonly="!isEditService"
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
                    <v-avatar
                      v-if="item.avatar == null"
                      color="grey3"
                      size="55"
                    >
                      <v-icon size="28" color="light">mdi-camera</v-icon>
                    </v-avatar>
                    <div v-if="item.avatar != null">
                      <img
                        v-if="item.url"
                        class="image-custom-preview"
                        :src="item.url"
                      />
                      <img
                        v-else
                        class="image-custom-preview"
                        :src="
                          'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +
                          item.avatar
                        "
                      />
                    </div>
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
                        <!-- <p
                          class="upload-caption gray1--text my-0"
                          @click="currentIndex(index);"
                          v-if="isEditService"
                        >
                          {{
                          item.avatar != null ? $t('product.product.clicktochange') : $t('product.product.clicktoupload')
                          }}
                        </p>-->

                        <h6
                          class="primary--text my-0"
                          @click="currentIndex(index)"
                          v-if="isEditService"
                        >
                          {{
                            item.avatar != null
                              ? $t("product.product.clicktochange")
                              : $t("product.product.clicktoupload")
                          }}
                          <!-- <span>
                            <v-icon
                              v-if="  item.avatar != null "
                              color="primary"
                              small
                              class="ms-3"
                            >mdi-pencil</v-icon>
                            <v-icon v-else color="primary" small class="ms-3">mdi-upload</v-icon>
                          </span>-->
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
                      :readonly="!isEditService"
                      v-model="item.price"
                      @click="nameArError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      type="number"
                      :min="0"
                      :error-messages="nameArError ? nameArError : errors"
                      :label="$t('services.commisionKd')"
                      color="secondary"
                      :readonly="!isEditService"
                      v-model="item.commission"
                      @click="nameArError = ''"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="1" align="right">
                  <v-btn
                    v-if="isEditService"
                    depressed
                    text
                    color="primary "
                    class="font-weight-bold"
                    x-small
                    @click="_deleteSubService(index, item)"
                  >
                    <v-icon left>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="mt-n6" cols="12" sm="12" md="12" align="right">
              <v-btn
                v-if="isEditService"
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
            <v-col cols="12" sm="6" md="6" v-if="isEditService">
              <EditThisCategoryButton
                :action="editThisCategory"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('services.editService')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { updateService } from "@/services/methods/update_service.js";
import "@/core/methods/validation_rules";
import { addSubServiceToArray } from "@/services/methods/create_sub_service.js";

import imageUploader from "vue-image-upload-resize";
import { b64toBlob } from "@/core/methods/base64_to_blob.js";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import { deleteSubService } from "@/services/methods/delete_sub_service.js";

import Avatar from "vue-avatar";
export default {
  data() {
    return {
      serviceInput: {
        id: this.currentService._id,
        nameEn: this.currentService.nameEn,
        nameAr: this.currentService.nameAr,
        descriptionEn: this.currentService.descriptionEn,
        descriptionAr: this.currentService.descriptionAr,
        order: this.currentService.order,
        active: this.currentService.active,
        price: this.currentService.price,
        commission: this.currentService.commission,
        avatar: this.currentService.avatar,
        subServices:
          this.currentService.subServices != null ? this.subServicesNew() : [],
      },
      nameEnError: "",
      nameArError: "",
      images: [],
      hasImage: false,
      hasLogo: false,
      selectedIndex: 0,
      btn_loading: false,
      subServiceIndex: 0,
      subServiceId: 0,
    };
  },
  components: {
    EditThisCategoryButton: () => import("@/products/components/AddButton.vue"),
    VueUploadMultipleImage,
    Avatar,
    imageUploader,
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
  },
  props: {
    isEditService: {
      type: Boolean,
      default: false,
    },
    currentService: {
      required: true,
    },
  },
  methods: {
    deleteThisItem(val) {
      if (val == true) {
        deleteSubService(this.subServiceId).then((data) => {
          this.serviceInput.subServices.splice(this.subServiceIndex, 1);
        });
      }
    },
    subServicesNew() {
      let arr = [];
      this.currentService.subServices.forEach((element) => {
        arr.push({
          _id: element._id,
          nameEn: element.nameEn,
          nameAr: element.nameAr,
          avatar: element.avatar,
          price: element.price,
          commission: element.commission,
          url: null,
        });
      });
      return arr;
    },
    editThisCategory() {
      this.btn_loading = true;

      this.$refs.observer.validate();
      // console.log(this.serviceInput);
      updateService(this.serviceInput).then((data) => {
        if (!!data.data) {
          this.$store.commit("SHOW_DRAWER");
          this.btn_loading = false;
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
      let subCat = addSubServiceToArray();

      this.serviceInput.subServices.push(subCat);

      // console.log(this.serviceInput.subServices);
    },
    _deleteSubService(index, item) {
      if (item._id) {
        (this.subServiceIndex = index),
          (this.subServiceId = item._id),
          this.$refs.form.show();
      } else {
        this.serviceInput.subServices.splice(index, 1);
      }
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

        self.serviceInput.subServices[self.selectedIndex].url = base64data;
      };

      this.serviceInput.subServices[this.selectedIndex].avatar = output;
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

/* .img-preview {
  width: 100px !important;
  width: auto;
} */
</style>

<style  scoped>
>>> .image-custom-preview {
  height: 50px !important;
  width: 50px !important;
  border-radius: 100px;
}
</style>
