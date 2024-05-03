<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t("user.seller.allDrivers") }} ({{ totalSellers }})
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            dense
            :label="$t('product.product.search')"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allSellers"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalSellers"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allSellers
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ $store.getters.rtl ? item.nameAr : item.nameEn }}
            </h4>
          </template>

          <template v-slot:item.phone="{ item }">
            <h4 class="font-weight-bold my-0 py-0 gray2--text">
              {{ !!item.phone ? item.phone : "Not Found" }}
            </h4>
          </template>

          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view', item)"
                >mdi-eye</v-icon
              >
              <v-icon color="primary" @click="showDrawer('edit', item)"
                >mdi-pencil</v-icon
              >
              <v-icon color="red" @click="showDrawer('delete', item)"
                >mdi-delete</v-icon
              >
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <SideDrawer>
      <ViewOrEditSeller
        v-if="is_drawer == 'ViewSeller' || is_drawer == 'EditSeller'"
        :isEditSeller="is_drawer == 'EditSeller'"
        :currentSeller="currentSeller"
        :sellersVariables="variables"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSellers } from "@/user/methods/get_sellers.js";
import { deleteDriver } from "@/user/methods/delete_seller.js";
import { updateSellerStatus } from "@/user/methods/update_seller_status.js";
import { updateDriver } from "@/user/methods/update_seller.js";

export default {
  components: {
    AddSellerButton: () => import("@/user/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewOrEditSeller: () =>
      import("@/user/components/RightSideDrawer/ViewOrEditSeller.vue"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
  },
  data() {
    return {
      search: "",
      totalSellers: 10,
      userStatus: false,
      allSellers: [],
      options: {},
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("user.name"), value: "nameEn" },

        {
          text: this.$t("user.seller.contactPersonPhone"),
          value: "phone",
        },

        { text: "", value: "action" },
      ],
      variables: {
        limit: 10,
        skip: 0,
      },
      currentSeller: {},
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    drivers() {
      return {
        query: require("@/user/api/queries/sellers_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data.drivers);
          this.loading = false;
          this.totalSellers = data.drivers.totalCount;
          this.allSellers = data.drivers.user;
        },
      };
    },
  },
  watch: {
    options: {
      handler() {
        (this.variables.limit = this.options.itemsPerPage),
          (this.variables.skip =
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage);
        this.$apollo.queries.drivers.refetch({
          limit:
            this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : 500,
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
          this.$apollo.queries.drivers.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.allSellers,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            name: this.search,
          });
        } else if (this.search.length == 0) {
          this.$apollo.queries.drivers.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.allSellers,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            name: "",
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, seller) {
      this.currentSeller = seller;
      if (action == "view") {
        this.showSideDrawer("ViewSeller");
      } else if (action == "edit") {
        this.showSideDrawer("EditSeller");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deleteDriver(this.currentSeller, this.variables);
      }
    },
    updateSellerStatus(item, value) {
      updateSellerStatus(item, value);
    },
    updateOrder(item) {
      let sellerInput = {
        id: item._id,
        nameEn: item.user.nameEn,
        nameAr: item.user.nameAr,
        email: item.user.email,
        descriptionEn: item.descriptionEn,
        descriptionAr: item.descriptionAr,
        avatar: item.user.avatar,
        email: item.user.email,
        phone: item.user.phone,
        order: item.order,
        address: item.address,
        contactPerson: item.contactPerson,
        contactEmail: item.contactEmail,
        commission: item.commission,
        active: item.user.active,
        commissionType: item.commissionType,
      };

      updateDriver(sellerInput);
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