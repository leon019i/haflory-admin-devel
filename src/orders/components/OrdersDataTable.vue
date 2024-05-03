<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold"
          >{{ $t("orders.orders") }} ({{ totalOrders }})</v-card-title
        >

        <v-card-title class="secondary--text font-weight-bold py-0">
          <v-row class="justify-space-between">
            <v-col cols="12" sm="12" md="6">
              <v-row>
                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="orderInput.startTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="orderInput.startTime"
                          readonly
                          outlined
                          :error-messages="errors"
                          :label="$t('orders.fromDate')"
                          prepend-icon="mdi-calendar-month"
                          color="primary"
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$store.getters.rtl ? 'ar' : 'en'"
                        v-model="orderInput.startTime"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu1 = false">{{
                          $t("orders.cancel")
                        }}</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu1.save(orderInput.startTime)"
                          >{{ $t("orders.ok") }}</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="5" class="py-0">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="orderInput.endTime"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="orderInput.endTime"
                          readonly
                          outlined
                          :error-messages="errors"
                          :label="$t('orders.toDate')"
                          prepend-icon="mdi-calendar-month"
                          color="primary"
                          dense
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$store.getters.rtl ? 'ar' : 'en'"
                        v-model="orderInput.endTime"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">{{
                          $t("orders.cancel")
                        }}</v-btn>
                        <v-btn
                          text
                          :loading="btn_loading"
                          color="primary"
                          @click="$refs.menu2.save(orderInput.endTime)"
                          >{{ $t("orders.ok") }}</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </ValidationProvider>
                </v-col>
                <v-col class="pa-1" md="1">
                  <v-icon
                    @click="filterByDate"
                    color="primary"
                    :disabled="!orderInput.startTime || !orderInput.endTime"
                    size="20"
                    >mdi-magnify</v-icon
                  >
                </v-col>
                <v-col class="pa-1" md="1">
                  <v-icon @click="clearDate" color="secondary" size="20"
                    >mdi-close</v-icon
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="search"
                counter
                maxlength="8"
                dense
                :label="$t('product.product.search')"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allOrders"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalOrders"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allOrders
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>
          <template v-slot:item.personalInformation="{ item }">
            <div v-if="!!item.personalInformation">
              <h4 class="grey1--text font-weight-normal my-0 py-0">
                {{ item.personalInformation.name }}
              </h4>
              <h4 class="grey3--text my-0 py-0">
                {{ item.personalInformation.phone }}
              </h4>
            </div>
          </template>
          <template v-slot:item.orderType="{ item }">
            <v-icon v-if="item.orderType == 'SUB_ORDER'" color="primary">
              mdi-alpha-d-circle
            </v-icon>
          </template>

          <template v-slot:item.service="{ item }">
            <v-row>
              <h4 class="grey1--text font-weight-bold my-0 py-0 mx-2">
                {{
                  !!item.service
                    ? $store.getters.rtl
                      ? item.service.nameAr
                      : item.service.nameEn
                    : "-"
                }}
              </h4>
            </v-row>
          </template>

          <template v-slot:item.info="{ item }">
            <v-row>
              <v-icon small @click="showSubService(item)" color=""
                >mdi-alert-circle mdi-rotate-360</v-icon
              >
            </v-row>
          </template>

          <!------------------------------------ driver  ----------------------->
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
          <template v-slot:item.price="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ item.price }}
            </h4>
            <div v-if="!!item.payment">
              <div v-if="!!item.payment.paymentType">
                <h4
                  v-if="item.payment.paymentType == 'COD'"
                  class="red--text font-weight-bold my-0 py-0"
                >
                  {{
                    !!item.payment.paymentType ? item.payment.paymentType : "-"
                  }}
                </h4>

                <h4 v-else class="success--text font-weight-bold my-0 py-0">
                  {{
                    !!item.payment.paymentType ? item.payment.paymentType : "-"
                  }}
                </h4>
              </div>
              <p v-else>-</p>
            </div>
            <p v-else>-</p>
          </template>

          <template v-slot:item.commission="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{ !!item.commission ? item.commission : "-" }}
            </h4>
          </template>

          <template v-slot:item.status="{ item }">
            <v-select
              @change="updateOrderStatus(item.status, item._id)"
              class="pt-4"
              :readonly="item.status == 'DECLINED'"
              background-color="transparent"
              :items="items"
              v-model="item.status"
              dense
              flat
              chips
              hide-selected
              solo
            ></v-select>
          </template>

          <template v-slot:item.date="{ item }">
            <h4 class="font-weight-bold my-0 py-0 gray2--text">
              {{ new Date(parseInt(item.date)).toDateString() }}
            </h4>
            <h4>{{ item.time }}</h4>
          </template>
          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('edit', item)"
                >mdi-pencil
              </v-icon>
              <v-icon
                v-if="item.acceptedBy == null"
                color="primary"
                @click="showDrawer('assign', item)"
                >mdi-account-plus</v-icon
              >
            </v-row>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-row class="mx-0" v-if="item.status == 'ACCEPTED'">
              <!-- v-if="!item.approved" -->
              <v-btn
                class="primary text-none"
                depressed
                @click="unassigntheDriver(item._id)"
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
    <SideDrawer>
      <EditOrders
        v-if="is_drawer == 'EditOrder'"
        :currentOrder="currentOrder"
      />
      <AssignDriver
        v-if="is_drawer == 'AssignDriver'"
        :currentOrder="currentOrder"
      />
    </SideDrawer>
    <OrderStatusConfirmationModal
      @deleteThisItem="deleteThisItem"
      ref="status_modal"
    />
    <UnAssign @unAssignThisDriver="unAssignThisDriver" ref="unassign" />
    <SubServiceModal ref="subservice" :order="currentSubService" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { updateOrderStatus } from "@/orders/methods/update_order_status.js";
import { unAssignDriver } from "@/user/methods/unAssignDriver.js";
import "@/core/methods/validation_rules";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    EditOrders: () =>
      import("@/orders/components/RightSideDrawer/ViewOrders.vue"),
    AssignDriver: () =>
      import("@/orders/components/RightSideDrawer/AssignDriver.vue"),
    OrderStatusConfirmationModal: () =>
      import("@/core/components/Modal/OrderStatusConfirmationModal.vue"),
    UnAssign: () => import("@/core/components/Modal/UnAssignDriverModal.vue"),
    SubServiceModal: () =>
      import("@/core/components/Modal/SubServiceModal.vue"),
  },
  data() {
    return {
      loading: true,
      btn_loading: false,
      search: "",
      filterByStatus: "",
      menu1: false,
      menu2: false,
      orderInput: {
        startTime: null,
        endTime: null,
      },
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        {
          text: this.$t("orders.orderedBy"),
          value: "personalInformation",
        },
        {
          text: "",
          value: "orderType",
        },
        {
          text: this.$t("orders.service"),
          value: "service",
        },
        {
          text: "",
          value: "info",
        },

        {
          text: this.$t("orders.driver"),
          value: "acceptedBy",
        },
        {
          text: this.$t("orders.price"),
          value: "price",
        },
        {
          text: this.$t("orders.commission"),
          value: "commission",
        },
        {
          text: this.$t("orders.status"),
          value: "status",
          width: 195,
          align: "center",
        },
        {
          text: this.$t("orders.dateTime"),
          value: "date",
        },
        { text: "", value: "action" },
        { text: "", value: "actions" },
      ],
      items: ["PENDING", "ACCEPTED", "COMPLETED", "CANCELED", "RESCHEDULED"],
      variables: {
        limit: 10,
        skip: 0,
      },
      options: {
        itemsPerPage: 10,
        page: 1,
      },
      currentOrder: {},
      currentSubService: {},

      allOrders: [],
      totalOrders: 10,
      currentStatus: null,
      currentOrderID: 0,
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  watch: {
    options: {
      handler() {
        (this.variables.limit = this.options.itemsPerPage),
          (this.variables.skip =
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage);
        this.$apollo.queries.orders.refetch({
          limit:
            this.options.itemsPerPage !== -1
              ? this.options.itemsPerPage
              : this.totalOrders,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
        });
      },
      deep: true,
    },
    search: {
      handler() {
        if (this.search.length > 7) {
          this.$apollo.queries.orders.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.totalOrders,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            phone: this.search,
          });
        } else if (this.search.length == 0) {
          this.$apollo.queries.orders.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.totalOrders,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            phone: "",
          });
        }
      },
      deep: true,
    },
    filterByStatus: {
      handler() {
        this.$apollo.queries.orders.refetch({
          limit:
            this.options.itemsPerPage !== -1
              ? this.options.itemsPerPage
              : this.totalOrders,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
          status: this.filterByStatus,
        });
      },
    },
  },
  apollo: {
    orders() {
      return {
        query: require("@/orders/api/queries/orders_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("orders", data);
          this.loading = false;
          // this.btn_loading = false;
          this.allOrders = data.orders.orders;
          this.totalOrders = data.orders.totalCount;
        },
      };
    },
  },
  methods: {
    filterByDate() {
      this.btn_loading = true;
      this.loading = true;
      this.$apollo.queries.orders.refetch({
        limit:
          this.options.itemsPerPage !== -1
            ? this.options.itemsPerPage
            : this.totalOrders,
        skip:
          this.options.page * this.options.itemsPerPage -
          this.options.itemsPerPage,
        fromDate: this.orderInput.startTime,
        toDate: this.orderInput.endTime,
      });
      this.btn_loading = false;
    },
    clearDate() {
      this.orderInput.startTime = "";
      this.orderInput.endTime = "";
      this.$apollo.queries.orders.refetch({
        limit:
          this.options.itemsPerPage !== -1
            ? this.options.itemsPerPage
            : this.totalOrders,
        skip:
          this.options.page * this.options.itemsPerPage -
          this.options.itemsPerPage,
        fromDate: "",
        toDate: "",
      });
      this.btn_loading = false;
    },
    showSubService(item) {
      this.currentSubService = item;
      if (this.currentSubService) this.$refs.subservice.show();
    },
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, seller) {
      this.currentOrder = seller;
      if (action == "edit") {
        this.showSideDrawer("EditOrder");
      } else if ((action = "assign")) {
        this.showSideDrawer("AssignDriver");
      }
    },
    unAssignThisDriver(val) {
      if (val == true) {
        // console.log("true");
        // console.log(this.variables);
        unAssignDriver(this.currentOrderID, this.variables);
      } else {
        // console.log("false");

        location.reload();
      }
    },
    unassigntheDriver(id) {
      // console.log("1");
      (this.currentOrderID = id), this.$refs.unassign.show();
    },

    deleteThisItem(val) {
      if (val == true) {
        updateOrderStatus(this.currentOrderID, this.currentStatus);
      } else {
        location.reload();
      }
    },
    updateOrderStatus(status, id) {
      (this.currentStatus = status),
        (this.currentOrderID = id),
        this.$refs.status_modal.show();
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
</style>