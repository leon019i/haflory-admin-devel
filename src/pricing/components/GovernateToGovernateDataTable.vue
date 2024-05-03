<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">{{
          $t("pricing.govtToGovt")
        }}</v-card-title>

        <v-data-table
          :headers="headers"
          :items="allGovt"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalProducts"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allGovt
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>

          <template v-slot:item.from="{ item }">
            <div v-if="item.from">
              <h4 class="grey1--text font-weight-bold my-0 py-0">
                {{
                  $store.getters.rlt
                    ? !!item.from.nameAr
                      ? item.from.nameAr
                      : "-"
                    : !!item.from.nameEn
                    ? item.from.nameEn
                    : "-"
                }}
              </h4>
            </div>
            <h4 class="grey1--text font-weight-bold my-0 py-0" v-else>-</h4>
          </template>

          <template v-slot:item.to="{ item }">
            <div v-if="item.to">
              <h4 class="grey1--text font-weight-bold my-0 py-0">
                {{
                  $store.getters.rlt
                    ? !!item.to.nameAr
                      ? item.to.nameAr
                      : "-"
                    : !!item.to.nameEn
                    ? item.to.nameEn
                    : "-"
                }}
              </h4>
            </div>
            <h4 class="grey1--text font-weight-bold my-0 py-0" v-else>-</h4>
          </template>
          <template v-slot:item.price="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.price }}
            </h4>
          </template>
          <template v-slot:item.commission="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.commission }}
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
    <!-- <SideDrawer> -->
    <!-- <ViewOrEditGovernate
        v-if="is_drawer == 'ViewGovernateRule' || is_drawer == 'EditGovernate'"
        :isEditPlace="is_drawer == 'EditGovernate'"
        :currentPlace="currentPlace"
    />-->
    <!-- </SideDrawer> -->
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteGovernorateTransferPrice } from "@/pricing/methods/delete_govt_to_govt.js";

export default {
  components: {
    // SideDrawer: () => import("@/core/components/SideDrawer"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    ViewOrEditGovernate: () =>
      import("@/pricing/components/RightSideDrawer/ViewOrEditRuleGovt.vue"),
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
        { text: this.$t("pricing.fromGovernate"), value: "from" },
        { text: this.$t("pricing.toGovernate"), value: "to" },
        { text: this.$t("pricing.price"), value: "price" },
        { text: this.$t("pricing.commission"), value: "commission" },
        { text: "", value: "action" },
      ],
      currentPlace: {},
      allGovt: [],
      allSellers: [],
      variables: {
        limit: 10,
        skip: 0,
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      totalProducts: 10,
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  apollo: {
    getGovernoratePriceList() {
      return {
        query: require("@/pricing/api/queries/govt_to_govt_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("govts", data);
          this.loading = false;
          this.allGovt = data.getGovernoratePriceList.governoratePrice;
          this.totalProducts = data.getGovernoratePriceList.totalCount;
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
        this.$apollo.queries.getGovernoratePriceList.refetch({
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
  },
  methods: {
    ...mapActions(["showSideDrawer", "updateObject"]),
    showDrawer: function (action, place) {
      this.currentPlace = place;
      // console.log(this.currentPlace);
      if (action == "view") {
        this.showSideDrawer("ViewGovernateRule");
        this.updateObject(this.currentPlace);
      } else if (action == "edit") {
        this.showSideDrawer("EditGovernate");
        this.updateObject(this.currentPlace);
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deleteGovernorateTransferPrice(this.currentPlace, this.variables);
      }
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