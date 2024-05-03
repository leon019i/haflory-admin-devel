<template>
  <div>
    <v-container class="px-12">
      <h1
        class="primary--text font-weight-bold pb-4"
      >{{isEditProduct ? $t("product.product.editToy") : $t("product.product.viewToy")}}</h1>

      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditProduct"
                  outlined
                  dense
                  :label="$t('product.product.toyName')"
                  v-model="productInput.name"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch :readonly="!isEditProduct" v-model="productInput.active" color="secondary">
                <template #prepend>
                  <v-label>{{$t('product.product.isActive')}}</v-label>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="py-0">
              <v-textarea
                :readonly="!isEditProduct"
                v-model="productInput.description"
                outlined
                color="secondary"
                :label="$t('product.product.description')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="12" class="mt-4">
              <p class="gray1--text mb-1">{{$t('product.product.photos')}}</p>
              <div
                id="my-strictly-unique-vue-upload-multiple-image"
                style="display: flex; justify-content: center;"
              >
                <vue-upload-multiple-image
                  @upload-success="uploadImageSuccess"
                  @before-remove="beforeRemove"
                  :data-images="images"
                  popupText
                  primaryText
                  markIsPrimaryText
                  accept="image/jpeg, image/png, image/jpg"
                  dropText
                  idUpload="myIdUpload"
                  dragText="Drop your images here"
                  browseText="Browse"
                  editUpload="myIdEdit"
                ></vue-upload-multiple-image>
              </div>
            </v-col>
            <!-- <v-col v-if="!hasImage" cols="12" sm="12" md="12" class="py-0 pb-12">
              <v-row v-for="val in productInput.avatar" :key="val">
                <avatar
                  :size="100"
                  :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +val"
                />
              </v-row>
            </v-col>-->
            <v-col v-if="isAdmin()" cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  :readonly="!isEditProduct"
                  v-model="productInput.createdBy"
                  outlined
                  :error-messages="errors"
                  dense
                  color="secondary"
                  :items="allSellers"
                  item-text="user.name"
                  item-value="user._id"
                  :label="$t('product.product.sellers')"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  :readonly="!isEditProduct"
                  v-model="productInput.category"
                  outlined
                  dense
                  :error-messages="errors"
                  color="secondary"
                  item-text="nameEn"
                  item-value="_id"
                  :items="categories"
                  :label="$t('product.product.categories')"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditProduct"
                  outlined
                  :error-messages="errors"
                  dense
                  :label="$t('product.product.materialUsed')"
                  color="secondary"
                  v-model="productInput.material"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditProduct"
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('product.product.sizeChart')"
                  color="secondary"
                  v-model="productInput.sizeChart"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditProduct"
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('product.product.availableQuantity')"
                  color="secondary"
                  type="number"
                  :min="0"
                  v-model="productInput.quantity"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditProduct"
                  outlined
                  dense
                  :error-messages="errors"
                  :label="$t('product.product.sku')"
                  color="secondary"
                  v-model="productInput.sku"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  :readonly="!isEditProduct"
                  outlined
                  :error-messages="errors"
                  dense
                  type="number"
                  :min="0"
                  :label="$t('product.product.price')"
                  color="secondary"
                  v-model="productInput.price"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch
                :readonly="!isEditProduct"
                v-model="productInput.featured"
                color="secondary"
              >
                <template #prepend>
                  <v-label>{{$t('product.product.isFeatured')}}</v-label>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" sm="6" md="6" v-if="isEditProduct">
              <EditThisProductButton
                :action="editThisProduct"
                :disabled="!invalid"
                :isLoading="btn_loading"
                :isIcon="false"
                :text="$t('product.product.editThisProduct')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { updateProduct } from "@/user/methods/update_product.js";
import { b64toBlob } from "@/core/methods/base64_to_blob.js";

import { isAdmin, isSeller } from "@/user/utlis/helper.js";
import { getCurrentUser } from "@/user/utlis/helper.js";
import "@/core/methods/validation_rules";

import Avatar from "vue-avatar";
import VueUploadMultipleImage from "vue-upload-multiple-image";

const displayImage = (avatar) => {
  let array = [];
  avatar.map((item) =>
    array.push({
      path: "https://haflory-dev-files.s3.me-south-1.amazonaws.com/" + item,
      default: 0,
      highlight: 0,
    })
  );
  return array;
};
export default {
  data() {
    return {
      productInput: {
        id: this.currentProduct._id,
        name: this.currentProduct.name,
        active: this.currentProduct.active,
        description: this.currentProduct.description,
        createdBy: this.currentProduct.createdBy._id,
        category: this.currentProduct.category._id,
        material: this.currentProduct.material,
        sizeChart: this.currentProduct.sizeChart,
        avatar: this.currentProduct.avatar,
        quantity: this.currentProduct.quantity,
        sku: this.currentProduct.sku,
        price: this.currentProduct.price,
        featured: this.currentProduct.featured,
      },
      images: displayImage(this.currentProduct.avatar),
      errorFromApi: "",
      hasImage: false,
      sellersVariables: {
        limit: 0,
        skip: 0,
      },
      allSellers: [],
      btn_loading: false,
      user: null,
    };
  },
  components: {
    EditThisProductButton: () => import("@/products/components/AddButton.vue"),
    Avatar,
    VueUploadMultipleImage,
  },

  props: {
    isEditProduct: {
      type: Boolean,
      default: false,
    },
    currentProduct: {
      required: true,
    },
  },
  apollo: {
    sellers() {
      return {
        query: require("@/user/api/queries/sellers_query.graphql"),
        variables: this.sellersVariables,
        result({ data, loading, networkStatus, refetch }) {
          this.allSellers = data.sellers.sellers;
        },
      };
    },
    categories() {
      return {
        query: require("@/products/api/queries/categories_query.graphql"),
      };
    },
  },
  created() {
    this.user = getCurrentUser.user;
    if (!isAdmin()) {
      this.productInput.createdBy = getCurrentUser.user._id;
    }
  },
  methods: {
    editThisProduct() {
      this.btn_loading = true;

      // this.$refs.observer.validate();
      this.$refs.observer.validate();

      updateProduct(this.productInput).then((data) => {
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
    isAdmin,
    uploadImageSuccess(formData, index, fileList) {
      try {
        this.productInput.avatar = [];
        fileList.forEach((element) => {
          if (element.path.includes("base64")) {
            this.productInput.avatar.push(b64toBlob(element.path));
          } else if (element.path.includes("https")) {
            this.productInput.avatar.push(
              element.path.replace(
                "https://haflory-dev-files.s3.me-south-1.amazonaws.com/",
                ""
              )
            );
          }
        });
      } catch (e) {}
    },
    beforeRemove(index, done, fileList) {
      var r = confirm("remove image");
      if (r == true) {
        // fileList[index].splice(0, 1);

        this.productInput.avatar = [];
        fileList.forEach((element, i) => {
          if (i != index) {
            if (element.path.includes("base64")) {
              this.productInput.avatar.push(b64toBlob(element.path));
            } else if (element.path.includes("https")) {
              this.productInput.avatar.push(
                element.path.replace(
                  "https://haflory-dev-files.s3.me-south-1.amazonaws.com/",
                  ""
                )
              );
            }
          }
        });

        done();
      } else {
      }
    },
  },
};
</script>
<style>
.swiper-wrapper {
  width: 400px;
}
</style>
 <style  scoped>
>>> .display-flex > .image-edit {
  display: none;
}
</style>