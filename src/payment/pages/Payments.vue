<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <PaymentTable />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isAdmin, isSeller } from "@/user/utlis/helper.js";

export default {
  components: {
    PaymentTable: () => import("@/payment/components/PaymentDataTable.vue"),
  },
  methods: {
    isAdmin,
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>