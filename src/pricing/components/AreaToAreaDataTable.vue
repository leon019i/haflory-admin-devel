<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">{{
          $t("pricing.areaToAreaTransfer")
        }}</v-card-title>

        <v-data-table
          :headers="headers"
          :items="allAreas"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalProducts"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allAreas
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
    <SideDrawer>
      <ViewOrEditArea
        v-if="is_drawer == 'ViewAreaRule' || is_drawer == 'EditAreaRule'"
        :isEditPlace="is_drawer == 'EditAreaRule'"
        :currentPlace="currentPlace"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteAreaTransferPrice } from "@/pricing/methods/delete_area_to_area.js";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    ViewOrEditArea: () =>
      import("@/pricing/components/RightSideDrawer/ViewOrEditRuleArea.vue"),
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
        { text: this.$t("pricing.fromArea"), value: "from" },
        { text: this.$t("pricing.toArea"), value: "to" },
        { text: this.$t("pricing.price"), value: "price" },
        { text: this.$t("pricing.commission"), value: "commission" },
        { text: "", value: "action" },
      ],
      currentPlace: {},
      allAreas: [],
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
    getAreaPriceList() {
      return {
        query: require("@/pricing/api/queries/area_to_area_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("Areas", data);
          this.loading = false;
          this.allAreas = data.getAreaPriceList.areaPrice;
          this.totalProducts = data.getAreaPriceList.totalCount;
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
        this.$apollo.queries.getAreaPriceList.refetch({
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
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, place) {
      this.currentPlace = place;

      if (action == "view") {
        this.showSideDrawer("ViewAreaRule");
      } else if (action == "edit") {
        this.showSideDrawer("EditAreaRule");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deleteAreaTransferPrice(this.currentPlace, this.variables);
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