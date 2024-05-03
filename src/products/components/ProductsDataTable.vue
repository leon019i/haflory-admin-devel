<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title
          class="primary--text font-weight-bold"
        >{{ $t('product.product.allToys')}} ({{totalProducts}})</v-card-title>

        <v-card-title class="secondary--text font-weight-bold py-0">
          <v-row class="justify-space-between">
            <v-col cols="12" sm="12" md="6">
              <v-row>
                <p class="pe-2 pa-1">{{ $t('product.product.filters')}}</p>
                <v-autocomplete
                  v-model="filterByCategory"
                  dense
                  outlined
                  solo
                  clearable
                  flat
                  color="secondary"
                  :items="subCategories"
                  item-text="nameEn"
                  item-value="_id"
                  :label="$t('product.product.subCategories')"
                ></v-autocomplete>
                <v-autocomplete
                  class="ms-2"
                  v-model="filterBySeller"
                  clearable
                  dense
                  outlined
                  solo
                  flat
                  color="secondary"
                  :items="allSellers"
                  item-text="user.nameEn"
                  item-value="user._id"
                  :label="$t('user.seller.sellers')"
                ></v-autocomplete>
              </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="search"
                dense
                :label=" $t('product.product.search')"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allProducts"
          :loading="loading"
          :search="search"
          disable-sort
          :options.sync="options"
          :server-items-length="totalProducts"
        >
          <template v-slot:item._id="{ item }">
            <p>{{allProducts.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ $store.getters.rtl ? item.nameAr : item.nameEn}} in
              <span
                class="font-weight-bold secondary--text"
              >{{item.subCategory != null ? $store.getters.rtl ? item.subCategory.nameAr : item.subCategory.nameEn : '-'}}</span>
            </h4>
          </template>
          <template v-slot:item.avatar="{ item }">
            <avatar
              v-if="item.avatar[0] != null"
              :size="50"
              :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +item.avatar[0]"
            />
            <avatar v-else :username="item.nameEn" :size="50" />
          </template>

          <template v-slot:item.active="{ item }">
            <v-switch
              value
              v-model="item.active"
              @change="updateProductStatus(item._id,item.active)"
              color="secondary"
            ></v-switch>
          </template>

          <template v-slot:item.createdBy="{ item }">
            <h4
              class="grey1--text font-weight-bold my-0 py-0"
            >{{ item.createdBy != null ? $store.getters.rtl ?item.createdBy.nameAr : item.createdBy.nameEn : '-'}}</h4>
          </template>
          <template v-slot:item.quantity="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.quantity}}</h4>
          </template>

          <template v-slot:item.featured="{ item }">
            <v-switch
              value
              v-model="item.featured"
              @change="updateFeatured(item._id,item.featured)"
              color="secondary"
            ></v-switch>
          </template>
          <template v-slot:item.order="{ item }">
            <v-text-field
              rounded
              @change="updateOrderStatus(item)"
              color="primary"
              v-model="item.order"
              text
              flat
              type="number"
              :min="1"
              solo
            ></v-text-field>
          </template>
          <template v-slot:item.approved="{ item }">
            <v-avatar size="30" v-if="item.approved" color="success">
              <v-icon dark>mdi-check</v-icon>
            </v-avatar>
            <v-avatar size="30" v-if="!item.approved" color="warning">
              <v-icon dark>mdi-close</v-icon>
            </v-avatar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view',item)">mdi-eye</v-icon>
              <v-icon color="primary" @click="showDrawer('edit',item)">mdi-pencil</v-icon>
              <v-icon color="red" @click="showDrawer('delete',item)">mdi-delete</v-icon>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <SideDrawer>
      <ViewOrEditProduct
        v-if="is_drawer == 'ViewProduct' || is_drawer == 'EditProduct'"
        :isEditProduct="is_drawer == 'EditProduct'"
        :currentProduct="currentProduct"
        :sellersVariables="sellersVariables"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteProduct } from "@/products/methods/delete_product.js";
import { updateProductStatus } from "@/products/methods/update_product_active_status.js";
import { updateProductFeatured } from "@/products/methods/update_product_featured_status.js";
import { updateProduct } from "@/products/methods/update_product.js";
import { isAdmin, isSeller } from "@/user/utlis/helper.js";

import avatar from "vue-avatar";
export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    ViewOrEditProduct: () =>
      import("@/products/components/RightSideDrawer/ViewOrEditProduct.vue"),
    avatar,
  },
  data() {
    return {
      loading: true,
      search: "",
      filterByCategory: "",
      filterBySeller: "",
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("product.product.toyAndCategory"), value: "nameEn" },
        { text: this.$t("product.product.image"), value: "avatar" },
        { text: this.$t("product.product.isActive"), value: "active" },
        { text: this.$t("product.product.seller"), value: "createdBy" },
        {
          text: this.$t("product.product.availableQuantity"),
          value: "quantity",
        },
        { text: this.$t("product.product.isFeatured"), value: "featured" },
        { text: this.$t("product.category.order"), value: "order", width: 145 },
        {
          text: !isAdmin() ? this.$t("product.product.isApproved") : null,
          value: !isAdmin() ? "approved" : null,
        },
        { text: "", value: "action" },
      ],
      variables: {
        limit: 10,
        skip: 0,
      },

      options: {
        itemsPerPage: 10,
        page: 1,
      },
      totalProducts: 10,
      currentProduct: {},
      allProducts: [],
      allSellers: [],
      sellersVariables: {
        limit: 0,
        skip: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  apollo: {
    products() {
      return {
        query: require("@/products/api/queries/product_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("products", data);
          this.loading = false;
          this.allProducts = data.products.products;
          this.totalProducts = data.products.totalCount;
        },
      };
    },
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
  watch: {
    options: {
      handler() {
        (this.sellersVariables.limit = this.options.itemsPerPage),
          (this.sellersVariables.skip =
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage);
        this.$apollo.queries.products.refetch({
          limit:
            this.options.itemsPerPage !== -1
              ? this.options.itemsPerPage
              : this.totalProducts,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
        });
      },
      deep: true,
    },
    search: {
      handler() {
        if (this.search.length > 2) {
          this.$apollo.queries.products.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.totalProducts,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            name: this.search,
          });
        } else if (this.search.length == 0) {
          this.$apollo.queries.products.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.totalProducts,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            name: "",
          });
        }
      },
      deep: true,
    },
    filterByCategory: {
      handler() {
        this.$apollo.queries.products.refetch({
          limit:
            this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : 1000,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
          subCategory: this.filterByCategory,
        });
      },
    },
    filterBySeller: {
      handler() {
        this.$apollo.queries.products.refetch({
          limit:
            this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : 1000,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
          userId: this.filterBySeller,
        });
      },
    },
  },
  methods: {
    isAdmin,
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, product) {
      this.currentProduct = product;

      if (action == "view") {
        this.showSideDrawer("ViewProduct");
      } else if (action == "edit") {
        this.showSideDrawer("EditProduct");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        // let skipLimit = {
        //   limit: this.options.itemsPerPage,
        //   skip:
        //     this.options.page * this.options.itemsPerPage -
        //     this.options.itemsPerPage,
        // };
        deleteProduct(this.currentProduct, this.sellersVariables);
      }
    },
    updateProductStatus(item, value) {
      updateProductStatus(item, value);
    },
    updateFeatured(item, value) {
      updateProductFeatured(item, value);
    },

    updateOrderStatus(item) {
      let productInput = {
        id: item._id,
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        active: item.active,
        descriptionEn: item.descriptionEn,
        descriptionAr: item.descriptionAr,
        createdBy: item.createdBy._id,
        subCategory: item.subCategory._id,
        avatar: item.avatar,
        order: item.order,
        quantity: item.quantity,
        sku: item.sku,
        price: item.price,
        featured: item.featured,
        variants: item.variants,
      };
      // console.log(productInput);
      updateProduct(productInput);
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
>>> .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: transparent;
}
</style>