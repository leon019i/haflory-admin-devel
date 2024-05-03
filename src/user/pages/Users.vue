<template>
  <div>
    <div class="pb-12"></div>
    <SellerTable />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SellerTable: () => import("@/user/components/UsersDataTable.vue"),
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>