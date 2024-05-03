<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t("dashboard.pendingOrders") }} ({{ totalOrdersPending }})
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allPendingOrders"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalOrdersPending"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allPendingOrders
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>
          <template v-slot:item.personalInformation="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.personalInformation.name }}
            </h4>
            <h4 class="grey3--text font-weight-bold my-0 py-0">
              {{ item.personalInformation.phone }}
            </h4>
          </template>
          <template v-slot:item.orderType="{ item }">
            <v-icon v-if="item.orderType == 'SUB_ORDER'" color="primary">
              mdi-alpha-d-circle
            </v-icon>
          </template>
          <template v-slot:item.acceptedBy="{ item }">
            <h4
              v-if="item.acceptedBy != null"
              class="grey1--text font-weight-bold my-0 py-0"
            >
              {{
                item.acceptedBy != null
                  ? $store.getters.rtl
                    ? item.acceptedBy.nameAr
                    : item.acceptedBy.nameEn
                  : "-"
              }}
            </h4>
            <h4 v-else class="grey1--text font-weight-bold my-0 py-0">-</h4>
          </template>
          <template v-slot:item.service="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{
                !!item.service
                  ? $store.getters.rtl
                    ? item.service.nameAr
                    : item.service.nameEn
                  : "-"
              }}
            </h4>
          </template>
          <template v-slot:item.price="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.price }}
            </h4>
            <div v-if="!!item.payment">
              <div v-if="!!item.payment.status">
                <h4
                  v-if="item.payment.status == 'UNPAID'"
                  class="red--text font-weight-bold my-0 py-0"
                >
                  {{ !!item.payment.status ? item.payment.status : "-" }}
                </h4>

                <h4 v-else class="grey1--text font-weight-bold my-0 py-0">
                  {{ !!item.payment.status ? item.payment.status : "-" }}
                </h4>
              </div>
            </div>
          </template>
          <template v-slot:item.date="{ item }">
            <h4 class="font-weight-bold my-0 py-0 gray2--text">
              {{ new Date(parseInt(item.date)).getDate() }}/{{
                new Date(parseInt(item.date)).getMonth()
              }}/{{ new Date(parseInt(item.date)).getFullYear() }} -
              {{ item.time }}
            </h4>
          </template>
          <template v-slot:item.action="{ item }">
            <v-row class="mx-0" v-if="item.status == 'ACCEPTED'">
              <!-- v-if="!item.approved" -->
              <v-btn
                class="primary text-none"
                depressed
                @click="unassignDriver(item._id)"
                >{{ $t("dashboard.unassign") }}</v-btn
              >
              <!-- <v-btn
                v-if="item.approved"
                color="success roboto-font"
                depressed
              >{{ $t('dashboard.unassigned') }}</v-btn>-->
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <OrderStatusConfirmationModal
      @deleteThisItem="deleteThisItem"
      ref="status_modal"
    />
  </div>
</template>

<script>
import { unAssignDriver } from "@/user/methods/unAssignDriver.js";
import { isAdmin, isSeller } from "@/user/utlis/helper.js";
export default {
  components: {
    OrderStatusConfirmationModal: () =>
      import("@/core/components/Modal/OrderStatusConfirmationModal.vue"),
  },
  data() {
    return {
      search: "",
      totalOrdersPending: 100,

      userStatus: false,
      options: {},
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        {
          text: this.$t("dashboard.orderedBy"),
          value: "personalInformation",
        },
        {
          text: "",
          value: "orderType",
        },
        {
          text: this.$t("dashboard.service"),
          value: "service",
        },
        {
          text: this.$t("dashboard.driver"),
          value: "acceptedBy",
        },
        {
          text: this.$t("dashboard.price"),
          value: "price",
        },
        {
          text: this.$t("dashboard.dateTime"),
          value: "date",
        },
        { text: "", value: "action" },
      ],
      variables: {
        limit: 10,
        skip: 0,
      },
      items: ["PENDING", "DISPATCHED", "DELIVERED", "DECLINED"],
      allPendingOrders: [],
      currentStatus: null,
      currentOrderID: 0,
    };
  },

  apollo: {
    pendingOrders() {
      return {
        query: require("@/user/api/queries/pending_orders_query.graphql"),

        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("res", data);

          this.totalOrdersPending = data.pendingOrders.totalCount;
          this.allPendingOrders = data.pendingOrders.orders;
          this.loading = false;
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

        this.$apollo.queries.pendingOrders.refetch({
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
    // unAssignDriver(status, id) {
    //   unAssignDriver(id, status);
    // },
    deleteThisItem(val) {
      if (val == true) {
        unAssignDriver(this.currentOrderID, this.variables);
      } else {
        // location.reload();
      }
    },
    unassignDriver(id) {
      (this.currentOrderID = id), this.$refs.status_modal.show();
    },
    isAdmin,
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
</style>