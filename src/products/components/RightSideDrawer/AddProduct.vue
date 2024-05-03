<template>
  <div>
    <v-container class="px-12">
      <h1 class="primary--text font-weight-bold pb-4">{{$t("product.product.addNewToy")}}</h1>
      <ValidationObserver ref="observer" v-slot="{ validate, reset ,invalid }">
        <form>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('product.product.productNameEn')"
                  v-model="productInput.nameEn"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  dense
                  :label="$t('product.product.productNameAr')"
                  v-model="productInput.nameAr"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <v-switch v-model="productInput.active" color="secondary">
                <template #prepend>
                  <v-label>{{$t('product.product.isActive')}}</v-label>
                </template>
              </v-switch>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
                  outlined
                  v-model="productInput.order"
                  type="number"
                  :min="0"
                  dense
                  :label="$t('product.product.productOrder')"
                  color="secondary"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <v-textarea
                v-model="productInput.descriptionEn"
                outlined
                color="secondary"
                :label="$t('product.product.description')"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="py-0">
              <v-textarea
                v-model="productInput.descriptionAr"
                outlined
                color="secondary"
                :label="$t('product.product.descriptionAr')"
              ></v-textarea>
            </v-col>

            <!-- <v-col cols="12" sm="12" md="12">
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
            </v-col>-->

            <v-col cols="12" sm="12" md="12">
              <p class="gray1--text mb-1">{{$t('product.product.photos')}}</p>
              <v-row>
                <v-col
                  v-for="(item,index) in productInput.avatar"
                  :key="index"
                  xs="12"
                  sm="12"
                  md="6"
                  lg="6"
                >
                  <v-row align="center">
                    <v-col cols="8" align="center">
                      <avatar
                        :size="50"
                        @click="currentIndex(index);"
                        v-if="item.avatar == null"
                        :username="'I M G'"
                      />

                      <img v-if="item.avatar != null" class="image-custom-preview" :src="item.url" />
                      <image-uploader
                        :maxWidth="800"
                        :max-height="1400"
                        :quality="0.7"
                        :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                        capture="environment"
                        doNotResize="gif"
                        :autoRotate="true"
                        :preview="false"
                        outputFormat="blob"
                        @input="setImage"
                        @click="currentIndex(index);"
                        class="ms-2"
                      >
                        <label for="fileInput" slot="upload-label">
                          <v-col align="center" class="pa-0 ma-0">
                            <h5 class="primary--text my-0" @click="currentIndex(index);">
                              {{
                              item.avatar != null ? $t('product.product.clicktochange') : $t('product.product.clicktoupload')
                              }}
                              <span>
                                <v-icon
                                  v-if="  item.avatar != null "
                                  color="primary"
                                  small
                                >mdi-pencil</v-icon>
                                <v-icon v-else color="primary" small>mdi-upload</v-icon>
                              </span>
                            </h5>
                          </v-col>
                        </label>
                      </image-uploader>
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        depressed
                        text
                        color="primary "
                        class="font-weight-bold"
                        x-small
                        @click="deleteProductImage(index)"
                      >
                        <v-icon color="red" left>mdi-delete-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
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
                @click="addProductImage"
              >
                <v-icon left small>mdi-plus</v-icon>
                {{$t('product.product.addNewImage')}}
              </v-btn>
            </v-col>

            <v-col v-if="isAdmin()" cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="productInput.createdBy"
                  outlined
                  :error-messages="errors"
                  dense
                  color="secondary"
                  :items="allSellers"
                  item-text="user.nameEn"
                  item-value="user._id"
                  :label="$t('product.product.sellers')"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-autocomplete
                  v-model="productInput.subCategory"
                  outlined
                  dense
                  :error-messages="errors"
                  color="secondary"
                  item-text="nameEn"
                  item-value="_id"
                  :items="subCategories"
                  :label="$t('product.product.categories')"
                >
                  <template v-slot:item="{ item }">
                    <p class="ms-2 primary--text">
                      {{ item.category != null ? ($store.getters.rtl ? item.nameAr : item.nameEn) : '-'}} -
                      <span
                        class="primary--text"
                      >{{item.category != null ? ($store.getters.rtl ? item.category.nameAr: item.category.nameEn) : '-' }}</span>
                    </p>
                  </template>
                </v-autocomplete>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }">
                <v-text-field
                  outlined
                  :error-messages="errors"
                  dense
                  :label="$t('product.product.sizeChart')"
                  color="secondary"
                  v-model="productInput.sizeChart"
                ></v-text-field>
              </ValidationProvider>
            </v-col>

            <v-col cols="12" sm="6" md="6" class="py-0">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-text-field
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
              <v-switch v-model="productInput.featured" color="secondary">
                <template #prepend>
                  <v-label>{{$t('product.product.isFeatured')}}</v-label>
                </template>
              </v-switch>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-row v-for="(item,index) in productInput.variants " :key="index">
                <v-col cols="12" sm="12" md="1" align="right">
                  <p>{{index + 1}}</p>
                </v-col>

                <v-col cols="12" sm="12" md="4" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :error-messages="errors"
                      :label="$t('product.product.varientNameEn')"
                      v-model="item.nameEn"
                      color="secondary"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      outlined
                      dense
                      :error-messages="errors"
                      :label="$t('product.product.varientNameAr')"
                      color="secondary"
                      v-model="item.nameAr"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="2" class="pa-0">
                  <v-text-field
                    dense
                    outlined
                    v-model="item.quantity"
                    class="pa-0"
                    type="number"
                    :min="0"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="1" align="right">
                  <v-btn
                    depressed
                    text
                    color="primary "
                    class="font-weight-bold"
                    x-small
                    @click="deleteVarient(index)"
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
                @click="addVarient"
              >
                <v-icon left small>mdi-plus</v-icon>
                {{$t('product.product.addVarient')}}
              </v-btn>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <AddThisProductButton
                :action="addThisProduct"
                :isLoading="btn_loading"
                :disabled="!invalid"
                :isIcon="false"
                :text="$t('product.product.addThisToy')"
              />
            </v-col>
          </v-row>
        </form>
      </ValidationObserver>
    </v-container>
  </div>
</template>

<script>
import { createProduct } from "@/products/methods/create_product.js";
// import { b64toBlob } from "@/core/methods/base64_to_blob.js";
import "@/core/methods/validation_rules";
import Avatar from "vue-avatar";
import { addProductVarientToArray } from "@/products/methods/create_product_varient.js";
import { isAdmin, isSeller, getCurrentUser } from "@/user/utlis/helper.js";
import { addProductImageToArray } from "@/products/methods/create_product_image.js";
import imageUploader from "vue-image-upload-resize";

export default {
  data: () => ({
    productInput: {
      nameEn: null,
      nameAr: null,
      active: false,
      descriptionEn: null,
      descriptionAr: null,
      createdBy: 0,
      subCategory: 0,
      order: 0,
      sizeChart: null,
      avatar: [],
      quantity: 0,
      sku: null,
      price: 0,
      featured: false,
      variants: [
        {
          nameEn: "",
          nameAr: "",
          quantity: 0,
        },
      ],
    },
    errorFromApi: "",
    hasImage: false,

    sellersVariables: {
      limit: 0,
      skip: 0,
    },
    btn_loading: false,
    user: null,
    images: [],
    allSellers: [],
  }),
  components: {
    AddThisProductButton: () => import("@/products/components/AddButton.vue"),
    Avatar,
    imageUploader,
  },
  created() {
    this.user = getCurrentUser.user;
    this.productInput.createdBy = getCurrentUser.user._id;
  },
  apollo: {
    sellers() {
      return {
        query: require("@/user/api/queries/sellers_query.graphql"),
        variables: this.sellersVariables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("sellers", data);
          this.allSellers = data.sellers.sellers;
        },
      };
    },
    subCategories() {
      return {
        query: require("@/products/api/queries/sub_categories_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log("sub category", data);
        },
      };
    },
  },
  methods: {
    isAdmin,
    addThisProduct() {
      this.btn_loading = true;

      createProduct(this.productInput).then((data) => {
        // console.log(this.productInput);
        if (!!data.data) {
          this.btn_loading = false;

          this.$store.commit("SHOW_DRAWER");
        } else {
          this.btn_loading = false;

          if (data.includes("Already exist")) {
            this.btn_loading = false;

            this.errorFromApi = "Email alredy exist";
          }
        }
      });
    },

    // uploadImageSuccess(formData, index, fileList) {
    //   try {
    //     this.productInput.avatar = fileList.map((item) => b64toBlob(item.path));
    //     // console.log(this.productInput.avatar);
    //     this.productInput.avatar.forEach((element) => {
    //       console.log(element.size);
    //     });
    //   } catch (e) {}
    // },
    // beforeRemove(index, done, fileList) {
    //   var r = confirm("remove image");
    //   if (r == true) {
    //     done();
    //     this.productInput.avatar = fileList.map((item) => b64toBlob(item.path));
    //   } else {
    //   }
    // },
    addVarient() {
      let varient = addProductVarientToArray();
      this.productInput.variants.push(varient);
    },
    deleteVarient(index) {
      // console.log(index);
      this.productInput.variants.splice(index, 1);
    },

    addProductImage() {
      let subCat = addProductImageToArray();
      this.productInput.avatar.push(subCat);
      // console.log(this.productInput.avatar);
    },

    deleteProductImage(index) {
      this.productInput.avatar.splice(index, 1);
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
        self.productInput.avatar[self.selectedIndex].url = base64data;
      };
      this.productInput.avatar[this.selectedIndex].avatar = output;
      // console.log(this.productInput.avatar);
    },
  },
};
</script>

<style>
#fileInput {
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

