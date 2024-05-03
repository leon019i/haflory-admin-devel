<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <div>
      <PendingPayments />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isAdmin, isSeller } from "@/user/utlis/helper.js";

export default {
  components: {
    PendingPayments: () => import("@/accounts/components/PendingPayments.vue"),

    AddCategoryButton: () => import("@/accounts/components/AddButton.vue"),
    SideDrawer: () => import("@/core/components/SideDrawer"),
  },
  data() {
    return {
      variables: {
        limit: 0,
        skip: 0,
      },
      totalAmount: 0,
      totalCommision: 0,
      receivedAmount: 0,
    };
  },
  computed: {
    ...mapGetters(["show_drawer", "is_drawer"]),
  },
  apollo: {
    accounts() {
      return {
        query: require("@/accounts/api/queries/payment_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          if (!!data.accounts) {
            if (!!data.accounts.payment) {
              this.totalAmount = data.accounts.payment[0].totalAmount;
              this.totalCommision = data.accounts.payment[0].totalCommission;
              this.receivedAmount = data.accounts.payment[0].paidAmount;
            }
            if (!!data.accounts.transaction) {
              // console.log(data.accounts.transaction);
            }
          }
        },
      };
    },
  },
  methods: {
    isAdmin,
    ...mapActions(["showSideDrawer"]),
    showDrawer: function () {
      this.showSideDrawer("AddTransaction");
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>