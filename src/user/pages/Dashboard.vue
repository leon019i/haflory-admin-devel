<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <CardCounts />
    <OrdersPendingDataTable />
    <!-- <ToyApprovalDataTable v-if="isAdmin()" /> -->
  </div>
</template>
<script>
import { isAdmin, isSeller } from "@/user/utlis/helper.js";

export default {
  components: {
    OrdersPendingDataTable: () =>
      import("@/user/components/Dashboard/OrdersPendingDataTable"),
    ToyApprovalDataTable: () =>
      import("@/user/components/Dashboard/ToyApprovalDataTable"),
    CardCounts: () => import("@/user/components/Dashboard/CardCounts"),
  },
  methods: {
    isAdmin,
  },
};
</script>
