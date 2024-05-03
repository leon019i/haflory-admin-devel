<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold"
          >{{ $t("payment.payments") }} ({{ totalPayments }})</v-card-title
        >
        <!-- <v-card-title class="secondary--text font-weight-bold py-0">
          <v-row class="justify-space-between">
            <v-col cols="12" sm="12" md="3">
              <v-row>
                <p class="pe-2">{{ $t('product.product.filters')}}</p>
                <v-autocomplete
                  v-model="filterByStatus"
                  dense
                  outlined
                  solo
                  flat
                  color="secondary"
                  :items="items"
                  :label="$t('orders.status')"
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
        </v-card-title>-->
        <v-data-table
          :headers="headers"
          :items="allPayments"
          :loading="loading"
          disable-sort
          :options.sync="options"
          :server-items-length="totalPayments"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allPayments
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>
          <template v-slot:item.invoiceCustomer="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{
                !!item.invoiceCustomer
                  ? !!item.invoiceCustomer.first_name
                    ? item.invoiceCustomer.first_name
                    : "-"
                  : "-"
              }}
            </h4>
          </template>
          <template v-slot:item.orders.service="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">
              {{
                !!item.orders[0].service
                  ? $store.getters.rtl
                    ? item.orders[0].service.nameAr
                    : item.orders[0].service.nameEn
                  : "-"
              }}
            </h4>
          </template>
          <template v-slot:item.invoiceReference="{ item }">
            <div v-if="item.invoiceReference != null">
              <div v-if="item.invoiceReference.payment != null">
                <h4 class="grey1--text font-weight-bold my-0 py-0">
                  {{ item.invoiceReference.payment }}
                </h4>
              </div>
              <p v-else>-</p>
            </div>
            <p v-else>-</p>
          </template>

          <template v-slot:item.invoiceAmount="{ item }">
            <h4 class="font-weight-bold my-0 py-0 gray2--text">
              {{ !!item.invoiceAmount ? item.invoiceAmount : "-" }}
            </h4>
          </template>
          <!-- <template v-slot:item.createdAt="{ item }">
            <h4
              class="font-weight-bold my-0 py-0 gray2--text"
            >{{ new Date(parseInt(item.createdAt)).toLocaleString() }}</h4>
          </template>-->
          <template v-slot:item.status="{ item }">
            <h4
              v-if="item.status == 'CAPTURED'"
              class="font-weight-bold my-0 py-0 success--text"
            >
              <span class="secondary--text">{{ item.paymentType }} -</span>
              {{ item.status }}
            </h4>
            <h4 v-else class="font-weight-bold my-0 py-0 error--text">
              <span class="secondary--text">{{ item.paymentType }} </span>
              <span v-if="item.status">
                - {{ !!item.status ? item.status : "" }}</span
              >
            </h4>
          </template>
          <!-- <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view',item)">mdi-eye</v-icon>
              <v-icon color="primary" @click="showDrawer('edit',item)">mdi-pencil</v-icon>
              <v-icon color="red" @click="showDrawer('delete',item)">mdi-delete</v-icon>
            </v-row>
          </template>-->
        </v-data-table>
      </v-card>
    </v-container>
    <SideDrawer>
      <ViewPayment
        v-if="is_drawer == 'ViewPayment'"
        :currentPayment="currentPayment"
      />
    </SideDrawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewPayment: () =>
      import("@/payment/components/RightSideDrawer/ViewPayment.vue"),
  },
  data() {
    return {
      search: "",
      totalPayments: 0,
      filterByStatus: "",
      userStatus: false,
      options: {},
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("payment.payedBy"), value: "invoiceCustomer" },
        { text: this.$t("payment.service"), value: "orders.service" },
        { text: this.$t("payment.refereceId"), value: "invoiceReference" },
        { text: this.$t("payment.price"), value: "invoiceAmount" },
        { text: this.$t("payment.status"), value: "status" },

        // { text: this.$t("payment.dateAndTime"), value: "createdAt" },

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
      currentPayment: {},
      allPayments: [],
      items: ["PENDING", "DONE", "CANCELLED"],
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  watch: {
    options: {
      handler() {
        this.$apollo.queries.payments.refetch({
          limit:
            this.options.itemsPerPage !== -1
              ? this.options.itemsPerPage
              : this.totalPayments,
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
          this.$apollo.queries.payments.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.totalpayments,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            transactionId: this.search,
          });
        } else if (this.search.length == 0) {
          this.$apollo.queries.payments.refetch({
            limit:
              this.options.itemsPerPage !== -1
                ? this.options.itemsPerPage
                : this.totalpayments,
            skip:
              this.options.page * this.options.itemsPerPage -
              this.options.itemsPerPage,
            transactionId: "",
          });
        }
      },
      deep: true,
    },
    filterByStatus: {
      handler() {
        this.$apollo.queries.payments.refetch({
          limit:
            this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : 1000,
          skip:
            this.options.page * this.options.itemsPerPage -
            this.options.itemsPerPage,
          status: this.filterByStatus,
        });
      },
    },
  },
  apollo: {
    payments() {
      return {
        query: require("@/payment/api/queries/payments_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          this.loading = false;
          if (data != null) {
            // console.log(".. ^_^ ..", data);
            if (data.payments != null) {
              if (data.payments.payments != null) {
                this.allPayments = data.payments.payments;
                this.totalPayments = data.payments.totalCount;
              }
            }
          }
        },
      };
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, payment) {
      this.currentPayment = payment;
      this.showSideDrawer("ViewPayment");
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
</style>