<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t('dashboard.approvePendingToys')}}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allpendingApprovalList"
          :loading="loading"
          :options.sync="options"
          :server-items-length="totalCounts"
          disable-sort
        >
          <template v-slot:item._id="{ item }">
            <p>{{allpendingApprovalList.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4
              class="grey1--text font-weight-bold my-0 py-0"
            >{{ $store.getters.rtl ? item.nameAr : item.nameEn}}</h4>
          </template>

          <template v-slot:item.avatar="{ item }">
            <avatar
              :username="item.nameEn"
              :size="50"
              :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/'+item.avatar[0]"
            />
          </template>
          <template v-slot:item.subCategory="{ item }">
            <h4
              class="font-weight-bold my-0 py-0 gray2--text"
            >{{ !!item.subCategory ? item.subCategory.nameEn : "-" }}</h4>
          </template>
          <template v-slot:item.createdBy="{ item }">
            <h4
              class="font-weight-bold my-0 py-0 gray2--text"
            >{{ !!item.createdBy ? $store.getters.rtl ? item.createdBy.nameAr : item.createdBy.nameEn : "-" }}</h4>
          </template>
          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view',item)">mdi-eye</v-icon>
              <v-icon color="primary" @click="showDrawer('edit',item)">mdi-pencil</v-icon>
              <v-icon color="red" @click="showDrawer('delete',item)">mdi-delete</v-icon>
            </v-row>
          </template>
          <template v-slot:item.approved="{ item }">
            <v-row class="mx-0">
              <v-btn
                v-if="!item.approved"
                class="primary text-none"
                depressed
                @click="changeApprovalStatus(item._id,true)"
              >Approve</v-btn>
              <v-btn v-if="item.approved" color="success roboto-font" depressed>Approved</v-btn>
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
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteProduct } from "@/user/methods/delete_product.js";
import { changeApprovalStatus } from "@/user/methods/approve_toy.js";
import avatar from "vue-avatar";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    ViewOrEditProduct: () =>
      import(
        "@/user/components/Dashboard/RightSideDrawer/ViewOrEditProduct.vue"
      ),
    avatar,
  },
  data() {
    return {
      search: "",
      totalCounts: 100,
      allSellers: [],
      userStatus: false,
      options: {},
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("product.product.productNameEn"), value: "nameEn" },

        {
          text: this.$t("product.product.image"),
          value: "avatar",
        },
        {
          text: this.$t("product.product.category"),
          value: "subCategory",
        },
        {
          text: this.$t("product.product.seller"),
          value: "createdBy",
        },
        {
          text: this.$t("product.product.quantity"),
          value: "quantity",
        },
        { text: "", value: "action" },
        { text: "", value: "approved" },
      ],
      variables: {
        limit: 10,
        skip: 0,
      },
      currentSeller: {},
      allpendingApprovalList: [],
      currentProduct: {},
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    pendingApprovalList() {
      return {
        query: require("@/user/api/queries/pending_approval_list_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("sss", data);
          this.loading = false;
          this.totalCounts = data.pendingApprovalList.totalCount;
          this.allpendingApprovalList = data.pendingApprovalList.products;
        },
      };
    },
  },
  watch: {
    options: {
      handler() {
        this.$apollo.queries.pendingApprovalList.refetch({
          limit:
            this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : 500,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
        });
      },
      deep: true,
    },
  },
  methods: {
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
        deleteProduct(this.currentProduct);
      }
    },
    changeApprovalStatus(id, status) {
      changeApprovalStatus(id, status);
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
</style>