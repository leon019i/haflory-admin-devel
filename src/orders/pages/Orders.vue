<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <OrdersTable />
  </div>
</template>

<script>
export default {
  components: {
    OrdersTable: () => import("@/orders/components/OrdersDataTable.vue"),
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>